importScripts(
  'bundle_solana.js',
  'bundle_serum.js',
  'bundle_mango.js',
)

const {
  Account, 
  Connection,
  PublicKey,
  Transaction,
  SYSVAR_CLOCK_PUBKEY,
  TransactionInstruction,
} = solanaWeb3

const {
  findLargestTokenAccountForOwner,
  getMultipleAccounts,
  IDS,
  MangoClient,
  MangoGroup, MarginAccount,
  nativeToUi,
  NUM_MARKETS,
  NUM_TOKENS,
  parseTokenAccount,
  parseTokenAccountData,
  tokenToDecimals,
  makeForceCancelOrdersInstruction,
  encodeMangoInstruction,
//  makePartialLiquidateInstruction,
} = Mango

const {
  Market,
  OpenOrders,
} = Serum

const state = {
    started: false
}
const ports = []

const priceCheckInterval = 5000
const accountsCheckInterval = 30000
const cluster = 'mainnet-beta'
const group_name = 'BTC_ETH_USDT'
const targets = [0.1, 2]
const clusterUrl = Mango.IDS.cluster_urls[cluster]
const programId = new PublicKey(Mango.IDS[cluster].mango_program_id)
const dexProgramId = new PublicKey(Mango.IDS[cluster].dex_program_id)
const mangoGroupPk = new PublicKey(Mango.IDS[cluster].mango_groups[group_name].mango_group_pk)

let keyPair = []
let accounts = []

const liquidating = {}

onconnect = function(e) {
    console.log('Connection')    
    console.log(state)

    let port = e.ports[0]
    ports.push(port)
    port.postMessage({ message: 'state', data: state })
    port.onmessage = function(e) {
      switch(e.data.message) {
          case 'start':
            if(!state.started) {
              if(!e.data.data) {
                postToAll('log', 'Failed to start liquidator. Missing Keypair.')
                break;
              }
              keyPair = e.data.data
              state.started = true
              refreshAccounts()
              refreshPrices()
            }
            break
          case 'stop':
            state.started = false
            break    
      }
      console.log(state)
     postToAll('state', state)
    }  
}

async function refreshAccounts() {
  try {
    console.log('refreshAccounts')
    const client = new Mango.MangoClient()
    const connection = new Connection(clusterUrl, 'singleGossip')
    const mangoGroup = await client.getMangoGroup(connection, mangoGroupPk)
    accounts = await client.getAllMarginAccounts(connection, programId, mangoGroup)
    console.log('Accounts Length: ', accounts.length)
  } catch (err) {
    console.error(err)
    postToAll('log', `Error refreshing accounts: ${err.message}`)
  } finally {
    if(state.started) {
      setTimeout(refreshAccounts, accountsCheckInterval)
    }
  }
}

async function refreshPrices() {
  try {
    console.log('refreshPrices')
    const client = new Mango.MangoClient()
    const connection = new Connection(clusterUrl, 'singleGossip')
    const mangoGroup = await client.getMangoGroup(connection, mangoGroupPk)
    let prices = await mangoGroup.getPrices(connection)

    for(let account of accounts) {
      const assetsVal = account.getAssetsVal(mangoGroup, prices)
      const liabsVal = account.getLiabsVal(mangoGroup, prices)
      const collateralRatio = (assetsVal / liabsVal)
      //const collateralRatio = account.getCollateralRatio(mangoGroup, prices)
      if(collateralRatio < mangoGroup.maintCollRatio) {        
        const deficit = liabsVal * mangoGroup.initCollRatio - assetsVal
        if(collateralRatio < 0.01 || liabsVal < 0.1 || deficit < 0.1) {
          //console.log(`skipped account ${account.publicKey.toBase58()} with cr ${collateralRatio}`, account)
          continue
        }
        console.log(`account ${account.publicKey.toBase58()} with cr ${collateralRatio}`)
        // if(!liquidating[account.publicKey.toBase58()]) {
          liquidate(account, prices).then((data) => {
            postToAll('log', `Liquidated an account ${data.liqueePublicKey}`)
          }).catch((err) => {
            postToAll('log', `Error liquidating account: ${err.message}`)
          })
        // } else {
        //   console.log(`account ${account.publicKey.toBase58()} already liquidating`)
        // }
      }
    }
  } catch (err) {
    console.error(err)
    postToAll('log', `Error refreshing prices: ${err.message}`)
  } finally {
    if(state.started) {
      setTimeout(refreshPrices, priceCheckInterval)
    }
  }
}

async function liquidate(account, prices) {
  console.log('liquidate', account, prices)
  const client = new Mango.MangoClient()
  const connection = new Connection(clusterUrl, 'singleGossip')
  const mangoGroup = await client.getMangoGroup(connection, mangoGroupPk)
  const payer = new Account(keyPair)
  
  const tokenWallets = (await Promise.all(
    mangoGroup.tokens.map(
      (mint) => findLargestTokenAccountForOwner(connection, payer.publicKey, mint).then(
        (response) => response.publicKey
      )
    )
  ))

  const markets = await Promise.all(mangoGroup.spotMarkets.map(
    (pk) => Market.load(connection, pk, {skipPreflight: true, commitment: 'singleGossip'}, dexProgramId)
  ))

  const cancelLimit = 5  
  const [vaultAccs, liqorAccs] = await Promise.all([
    getMultipleAccounts(connection, mangoGroup.vaults),
    getMultipleAccounts(connection, tokenWallets),
  ])

  const vaultValues = vaultAccs.map(
    (a, i) => nativeToUi(parseTokenAccountData(a.accountInfo.data).amount, mangoGroup.mintDecimals[i])
  )
  const liqorTokenValues = liqorAccs.map(
    (a) => parseTokenAccount(a.accountInfo.data).amount
  )
  const liqorTokenUi = liqorAccs.map(
    (a, i) => nativeToUi(parseTokenAccountData(a.accountInfo.data).amount, mangoGroup.mintDecimals[i])
  )

  let maxMarketIndex = -1
  let maxMarketVal = 0
  for (let i = 0; i < NUM_MARKETS; i++) {
    const openOrdersAccount = account.openOrdersAccounts[i]
    if (openOrdersAccount === undefined) {
      continue
    }
    const marketVal = openOrdersAccount.quoteTokenTotal.toNumber() + openOrdersAccount.baseTokenTotal.toNumber() * prices[i]
    if (marketVal > maxMarketVal) {
      maxMarketIndex = i
      maxMarketVal = marketVal
    }
  }
  const transaction = new Transaction()
  if (maxMarketIndex !== -1) {
    // force cancel orders on this particular market
    const spotMarket = markets[maxMarketIndex]
    const [bids, asks] = await Promise.all([spotMarket.loadBids(connection), spotMarket.loadAsks(connection)])
    const openOrdersAccount = account.openOrdersAccounts[maxMarketIndex]
    if (openOrdersAccount === undefined) {
      throw new Error('openOrdersAccount === undefined')
    }
    let numOrders = spotMarket.filterForOpenOrders(bids, asks, [openOrdersAccount]).length
    const dexSigner = await PublicKey.createProgramAddress(
      [
        spotMarket.publicKey.toBuffer(),
        spotMarket['_decoded'].vaultSignerNonce.toArrayLike(Buffer, 'le', 8)
      ],
      spotMarket.programId
    )

    for (let i = 0; i < 10; i++) {
      const instruction = makeForceCancelOrdersInstruction(
        programId,
        mangoGroup.publicKey,
        payer.publicKey,
        account.publicKey,
        mangoGroup.vaults[maxMarketIndex],
        mangoGroup.vaults[NUM_TOKENS-1],
        spotMarket.publicKey,
        spotMarket.bidsAddress,
        spotMarket.asksAddress,
        mangoGroup.signerKey,
        spotMarket['_decoded'].eventQueue,
        spotMarket['_decoded'].baseVault,
        spotMarket['_decoded'].quoteVault,
        dexSigner,
        spotMarket.programId,
        account.openOrders,
        mangoGroup.oracles,
        new BN(cancelLimit)
      )
      transaction.add(instruction)
      numOrders -= cancelLimit
      if (numOrders <= 0) {
        break
      }
    }
  }

  // Find the market with the highest borrows and lowest deposits
  const deposits = account.getAssets(mangoGroup)
  const borrows = account.getLiabs(mangoGroup)
  let minNet = 0
  let minNetIndex = -1
  let maxNet = 0
  let maxNetIndex = NUM_TOKENS-1
  for (let i = 0; i < NUM_TOKENS; i++) {
    const netDeposit = (deposits[i] - borrows[i]) * prices[i]
    if (netDeposit < minNet) {
      minNet = netDeposit
      minNetIndex = i
    } else if (netDeposit > maxNet) {
      maxNet = netDeposit
      maxNetIndex = i
    }
  }
  liquidating[account.publicKey.toBase58()] = true
  transaction.add(makePartialLiquidateInstruction(
    programId,
    mangoGroup.publicKey,
    payer.publicKey,
    liqorAccs[minNetIndex].publicKey,
    liqorAccs[maxNetIndex].publicKey,
    account.publicKey,
    mangoGroup.vaults[minNetIndex],
    mangoGroup.vaults[maxNetIndex],
    mangoGroup.signerKey,
    account.openOrders,
    mangoGroup.oracles,
    liqorTokenValues[minNetIndex]
  ))

  await client.sendTransaction(connection, transaction, payer, [])
  liquidating[account.publicKey.toBase58()] = false
  return { liqueePublicKey: account.publicKey }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function postToAll(message, data) {
  for(let port of ports) {
    port.postMessage({ message: message, data: data })
  }
}

function makePartialLiquidateInstruction(
  programId,
  mangoGroup,
  liqor,
  liqorInTokenWallet,
  liqorOutTokenWallet,
  liqeeMarginAccount,
  inTokenVault,
  outTokenVault,
  signerKey,
  openOrders,
  oracles,
  maxDeposit,
) {
  const keys = [
    { isSigner: false, isWritable: true, pubkey: mangoGroup },
    { isSigner: true, isWritable: false, pubkey: liqor },
    { isSigner: false, isWritable: true, pubkey: liqorInTokenWallet },
    { isSigner: false, isWritable: true, pubkey: liqorOutTokenWallet },
    { isSigner: false, isWritable: true, pubkey: liqeeMarginAccount },
    { isSigner: false, isWritable: true, pubkey: inTokenVault },
    { isSigner: false, isWritable: true, pubkey: outTokenVault },
    { isSigner: false, isWritable: false, pubkey: signerKey },
    { isSigner: false, isWritable: false, pubkey: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA') },
    { isSigner: false, isWritable: false, pubkey: SYSVAR_CLOCK_PUBKEY },
    ...openOrders.map((pubkey) => ({
      isSigner: false,
      isWritable: false,
      pubkey,
    })),
    ...oracles.map((pubkey) => ({
      isSigner: false,
      isWritable: false,
      pubkey,
    })),
  ];
  const data = encodeMangoInstruction({ PartialLiquidate: { maxDeposit } });

  return new TransactionInstruction({ keys, data, programId });
}
