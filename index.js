const $toggle = document.getElementById('toggle');
const $wallet = document.getElementById('wallet');
const $log = document.getElementById('log');
let state = {
    started: undefined,
    wallet: undefined,
    accounts: undefined,
}

if(!!window.SharedWorker) {
    const worker = new SharedWorker('worker.js');
    worker.port.onmessage = (e) => {
        switch(e.data.message) {
            case 'state':
                const newState = e.data.data;
                $toggle.innerText = newState.started ? 'Stop Liquidator' : 'Start Liquidator';
                if(state.started !== undefined && state.started != newState.started) {
                    log(newState.started ? 'Liquidator started.' : log('Liquidator stopped.'));
                }
                state = newState;
                break;
            case 'log':
                log(e.data)
                break;
            default:
                console.log('Unknown message from worker:', e.data)
        }
    }

    $toggle.addEventListener('click', (ev) => {
        if(!state.started) {
            worker.port.postMessage('start');
        } else {
            worker.port.postMessage('stop');
        }
    });
    $wallet.addEventListener('click', (ev) => {
        state.wallet = new SolWalletAdapter('https://www.sollet.io');
        state.wallet.on('connect', (pk) => {
            console.log('Connected to ' + pk.toBase58())
        });
        state.wallet.on('disconnect', () => console.log('Disconnected'));
        state.wallet.connect();
    });
} else {
    alert('Error: You browser does not support SharedWorker');
}

function log(message) {
    if(message && message.length) {
        $log.appendChild(el(`<span><span class="date">${new Date().toISOString()}</span> ${message}<br></span>`));
    }
}

function el(html) {
    var template = document.createElement('template');
    template.innerHTML = html.trim();
    return template.content.firstChild;
}
