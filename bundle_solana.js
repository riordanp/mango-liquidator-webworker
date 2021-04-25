var solanaWeb3 = (function (exports) {
  'use strict';

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function getAugmentedNamespace(n) {
  	if (n.__esModule) return n;
  	var a = Object.defineProperty({}, '__esModule', {value: true});
  	Object.keys(n).forEach(function (k) {
  		var d = Object.getOwnPropertyDescriptor(n, k);
  		Object.defineProperty(a, k, d.get ? d : {
  			enumerable: true,
  			get: function () {
  				return n[k];
  			}
  		});
  	});
  	return a;
  }

  function createCommonjsModule(fn) {
    var module = { exports: {} };
  	return fn(module, module.exports), module.exports;
  }

  function commonjsRequire (path) {
  	throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
  }

  var _nodeResolve_empty = {};

  var _nodeResolve_empty$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': _nodeResolve_empty
  });

  var require$$0$1 = /*@__PURE__*/getAugmentedNamespace(_nodeResolve_empty$1);

  var naclFast = createCommonjsModule(function (module) {
  (function(nacl) {

  // Ported in 2014 by Dmitry Chestnykh and Devi Mandiri.
  // Public domain.
  //
  // Implementation derived from TweetNaCl version 20140427.
  // See for details: http://tweetnacl.cr.yp.to/

  var gf = function(init) {
    var i, r = new Float64Array(16);
    if (init) for (i = 0; i < init.length; i++) r[i] = init[i];
    return r;
  };

  //  Pluggable, initialized in high-level API below.
  var randombytes = function(/* x, n */) { throw new Error('no PRNG'); };

  var _0 = new Uint8Array(16);
  var _9 = new Uint8Array(32); _9[0] = 9;

  var gf0 = gf(),
      gf1 = gf([1]),
      _121665 = gf([0xdb41, 1]),
      D = gf([0x78a3, 0x1359, 0x4dca, 0x75eb, 0xd8ab, 0x4141, 0x0a4d, 0x0070, 0xe898, 0x7779, 0x4079, 0x8cc7, 0xfe73, 0x2b6f, 0x6cee, 0x5203]),
      D2 = gf([0xf159, 0x26b2, 0x9b94, 0xebd6, 0xb156, 0x8283, 0x149a, 0x00e0, 0xd130, 0xeef3, 0x80f2, 0x198e, 0xfce7, 0x56df, 0xd9dc, 0x2406]),
      X = gf([0xd51a, 0x8f25, 0x2d60, 0xc956, 0xa7b2, 0x9525, 0xc760, 0x692c, 0xdc5c, 0xfdd6, 0xe231, 0xc0a4, 0x53fe, 0xcd6e, 0x36d3, 0x2169]),
      Y = gf([0x6658, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666]),
      I = gf([0xa0b0, 0x4a0e, 0x1b27, 0xc4ee, 0xe478, 0xad2f, 0x1806, 0x2f43, 0xd7a7, 0x3dfb, 0x0099, 0x2b4d, 0xdf0b, 0x4fc1, 0x2480, 0x2b83]);

  function ts64(x, i, h, l) {
    x[i]   = (h >> 24) & 0xff;
    x[i+1] = (h >> 16) & 0xff;
    x[i+2] = (h >>  8) & 0xff;
    x[i+3] = h & 0xff;
    x[i+4] = (l >> 24)  & 0xff;
    x[i+5] = (l >> 16)  & 0xff;
    x[i+6] = (l >>  8)  & 0xff;
    x[i+7] = l & 0xff;
  }

  function vn(x, xi, y, yi, n) {
    var i,d = 0;
    for (i = 0; i < n; i++) d |= x[xi+i]^y[yi+i];
    return (1 & ((d - 1) >>> 8)) - 1;
  }

  function crypto_verify_16(x, xi, y, yi) {
    return vn(x,xi,y,yi,16);
  }

  function crypto_verify_32(x, xi, y, yi) {
    return vn(x,xi,y,yi,32);
  }

  function core_salsa20(o, p, k, c) {
    var j0  = c[ 0] & 0xff | (c[ 1] & 0xff)<<8 | (c[ 2] & 0xff)<<16 | (c[ 3] & 0xff)<<24,
        j1  = k[ 0] & 0xff | (k[ 1] & 0xff)<<8 | (k[ 2] & 0xff)<<16 | (k[ 3] & 0xff)<<24,
        j2  = k[ 4] & 0xff | (k[ 5] & 0xff)<<8 | (k[ 6] & 0xff)<<16 | (k[ 7] & 0xff)<<24,
        j3  = k[ 8] & 0xff | (k[ 9] & 0xff)<<8 | (k[10] & 0xff)<<16 | (k[11] & 0xff)<<24,
        j4  = k[12] & 0xff | (k[13] & 0xff)<<8 | (k[14] & 0xff)<<16 | (k[15] & 0xff)<<24,
        j5  = c[ 4] & 0xff | (c[ 5] & 0xff)<<8 | (c[ 6] & 0xff)<<16 | (c[ 7] & 0xff)<<24,
        j6  = p[ 0] & 0xff | (p[ 1] & 0xff)<<8 | (p[ 2] & 0xff)<<16 | (p[ 3] & 0xff)<<24,
        j7  = p[ 4] & 0xff | (p[ 5] & 0xff)<<8 | (p[ 6] & 0xff)<<16 | (p[ 7] & 0xff)<<24,
        j8  = p[ 8] & 0xff | (p[ 9] & 0xff)<<8 | (p[10] & 0xff)<<16 | (p[11] & 0xff)<<24,
        j9  = p[12] & 0xff | (p[13] & 0xff)<<8 | (p[14] & 0xff)<<16 | (p[15] & 0xff)<<24,
        j10 = c[ 8] & 0xff | (c[ 9] & 0xff)<<8 | (c[10] & 0xff)<<16 | (c[11] & 0xff)<<24,
        j11 = k[16] & 0xff | (k[17] & 0xff)<<8 | (k[18] & 0xff)<<16 | (k[19] & 0xff)<<24,
        j12 = k[20] & 0xff | (k[21] & 0xff)<<8 | (k[22] & 0xff)<<16 | (k[23] & 0xff)<<24,
        j13 = k[24] & 0xff | (k[25] & 0xff)<<8 | (k[26] & 0xff)<<16 | (k[27] & 0xff)<<24,
        j14 = k[28] & 0xff | (k[29] & 0xff)<<8 | (k[30] & 0xff)<<16 | (k[31] & 0xff)<<24,
        j15 = c[12] & 0xff | (c[13] & 0xff)<<8 | (c[14] & 0xff)<<16 | (c[15] & 0xff)<<24;

    var x0 = j0, x1 = j1, x2 = j2, x3 = j3, x4 = j4, x5 = j5, x6 = j6, x7 = j7,
        x8 = j8, x9 = j9, x10 = j10, x11 = j11, x12 = j12, x13 = j13, x14 = j14,
        x15 = j15, u;

    for (var i = 0; i < 20; i += 2) {
      u = x0 + x12 | 0;
      x4 ^= u<<7 | u>>>(32-7);
      u = x4 + x0 | 0;
      x8 ^= u<<9 | u>>>(32-9);
      u = x8 + x4 | 0;
      x12 ^= u<<13 | u>>>(32-13);
      u = x12 + x8 | 0;
      x0 ^= u<<18 | u>>>(32-18);

      u = x5 + x1 | 0;
      x9 ^= u<<7 | u>>>(32-7);
      u = x9 + x5 | 0;
      x13 ^= u<<9 | u>>>(32-9);
      u = x13 + x9 | 0;
      x1 ^= u<<13 | u>>>(32-13);
      u = x1 + x13 | 0;
      x5 ^= u<<18 | u>>>(32-18);

      u = x10 + x6 | 0;
      x14 ^= u<<7 | u>>>(32-7);
      u = x14 + x10 | 0;
      x2 ^= u<<9 | u>>>(32-9);
      u = x2 + x14 | 0;
      x6 ^= u<<13 | u>>>(32-13);
      u = x6 + x2 | 0;
      x10 ^= u<<18 | u>>>(32-18);

      u = x15 + x11 | 0;
      x3 ^= u<<7 | u>>>(32-7);
      u = x3 + x15 | 0;
      x7 ^= u<<9 | u>>>(32-9);
      u = x7 + x3 | 0;
      x11 ^= u<<13 | u>>>(32-13);
      u = x11 + x7 | 0;
      x15 ^= u<<18 | u>>>(32-18);

      u = x0 + x3 | 0;
      x1 ^= u<<7 | u>>>(32-7);
      u = x1 + x0 | 0;
      x2 ^= u<<9 | u>>>(32-9);
      u = x2 + x1 | 0;
      x3 ^= u<<13 | u>>>(32-13);
      u = x3 + x2 | 0;
      x0 ^= u<<18 | u>>>(32-18);

      u = x5 + x4 | 0;
      x6 ^= u<<7 | u>>>(32-7);
      u = x6 + x5 | 0;
      x7 ^= u<<9 | u>>>(32-9);
      u = x7 + x6 | 0;
      x4 ^= u<<13 | u>>>(32-13);
      u = x4 + x7 | 0;
      x5 ^= u<<18 | u>>>(32-18);

      u = x10 + x9 | 0;
      x11 ^= u<<7 | u>>>(32-7);
      u = x11 + x10 | 0;
      x8 ^= u<<9 | u>>>(32-9);
      u = x8 + x11 | 0;
      x9 ^= u<<13 | u>>>(32-13);
      u = x9 + x8 | 0;
      x10 ^= u<<18 | u>>>(32-18);

      u = x15 + x14 | 0;
      x12 ^= u<<7 | u>>>(32-7);
      u = x12 + x15 | 0;
      x13 ^= u<<9 | u>>>(32-9);
      u = x13 + x12 | 0;
      x14 ^= u<<13 | u>>>(32-13);
      u = x14 + x13 | 0;
      x15 ^= u<<18 | u>>>(32-18);
    }
     x0 =  x0 +  j0 | 0;
     x1 =  x1 +  j1 | 0;
     x2 =  x2 +  j2 | 0;
     x3 =  x3 +  j3 | 0;
     x4 =  x4 +  j4 | 0;
     x5 =  x5 +  j5 | 0;
     x6 =  x6 +  j6 | 0;
     x7 =  x7 +  j7 | 0;
     x8 =  x8 +  j8 | 0;
     x9 =  x9 +  j9 | 0;
    x10 = x10 + j10 | 0;
    x11 = x11 + j11 | 0;
    x12 = x12 + j12 | 0;
    x13 = x13 + j13 | 0;
    x14 = x14 + j14 | 0;
    x15 = x15 + j15 | 0;

    o[ 0] = x0 >>>  0 & 0xff;
    o[ 1] = x0 >>>  8 & 0xff;
    o[ 2] = x0 >>> 16 & 0xff;
    o[ 3] = x0 >>> 24 & 0xff;

    o[ 4] = x1 >>>  0 & 0xff;
    o[ 5] = x1 >>>  8 & 0xff;
    o[ 6] = x1 >>> 16 & 0xff;
    o[ 7] = x1 >>> 24 & 0xff;

    o[ 8] = x2 >>>  0 & 0xff;
    o[ 9] = x2 >>>  8 & 0xff;
    o[10] = x2 >>> 16 & 0xff;
    o[11] = x2 >>> 24 & 0xff;

    o[12] = x3 >>>  0 & 0xff;
    o[13] = x3 >>>  8 & 0xff;
    o[14] = x3 >>> 16 & 0xff;
    o[15] = x3 >>> 24 & 0xff;

    o[16] = x4 >>>  0 & 0xff;
    o[17] = x4 >>>  8 & 0xff;
    o[18] = x4 >>> 16 & 0xff;
    o[19] = x4 >>> 24 & 0xff;

    o[20] = x5 >>>  0 & 0xff;
    o[21] = x5 >>>  8 & 0xff;
    o[22] = x5 >>> 16 & 0xff;
    o[23] = x5 >>> 24 & 0xff;

    o[24] = x6 >>>  0 & 0xff;
    o[25] = x6 >>>  8 & 0xff;
    o[26] = x6 >>> 16 & 0xff;
    o[27] = x6 >>> 24 & 0xff;

    o[28] = x7 >>>  0 & 0xff;
    o[29] = x7 >>>  8 & 0xff;
    o[30] = x7 >>> 16 & 0xff;
    o[31] = x7 >>> 24 & 0xff;

    o[32] = x8 >>>  0 & 0xff;
    o[33] = x8 >>>  8 & 0xff;
    o[34] = x8 >>> 16 & 0xff;
    o[35] = x8 >>> 24 & 0xff;

    o[36] = x9 >>>  0 & 0xff;
    o[37] = x9 >>>  8 & 0xff;
    o[38] = x9 >>> 16 & 0xff;
    o[39] = x9 >>> 24 & 0xff;

    o[40] = x10 >>>  0 & 0xff;
    o[41] = x10 >>>  8 & 0xff;
    o[42] = x10 >>> 16 & 0xff;
    o[43] = x10 >>> 24 & 0xff;

    o[44] = x11 >>>  0 & 0xff;
    o[45] = x11 >>>  8 & 0xff;
    o[46] = x11 >>> 16 & 0xff;
    o[47] = x11 >>> 24 & 0xff;

    o[48] = x12 >>>  0 & 0xff;
    o[49] = x12 >>>  8 & 0xff;
    o[50] = x12 >>> 16 & 0xff;
    o[51] = x12 >>> 24 & 0xff;

    o[52] = x13 >>>  0 & 0xff;
    o[53] = x13 >>>  8 & 0xff;
    o[54] = x13 >>> 16 & 0xff;
    o[55] = x13 >>> 24 & 0xff;

    o[56] = x14 >>>  0 & 0xff;
    o[57] = x14 >>>  8 & 0xff;
    o[58] = x14 >>> 16 & 0xff;
    o[59] = x14 >>> 24 & 0xff;

    o[60] = x15 >>>  0 & 0xff;
    o[61] = x15 >>>  8 & 0xff;
    o[62] = x15 >>> 16 & 0xff;
    o[63] = x15 >>> 24 & 0xff;
  }

  function core_hsalsa20(o,p,k,c) {
    var j0  = c[ 0] & 0xff | (c[ 1] & 0xff)<<8 | (c[ 2] & 0xff)<<16 | (c[ 3] & 0xff)<<24,
        j1  = k[ 0] & 0xff | (k[ 1] & 0xff)<<8 | (k[ 2] & 0xff)<<16 | (k[ 3] & 0xff)<<24,
        j2  = k[ 4] & 0xff | (k[ 5] & 0xff)<<8 | (k[ 6] & 0xff)<<16 | (k[ 7] & 0xff)<<24,
        j3  = k[ 8] & 0xff | (k[ 9] & 0xff)<<8 | (k[10] & 0xff)<<16 | (k[11] & 0xff)<<24,
        j4  = k[12] & 0xff | (k[13] & 0xff)<<8 | (k[14] & 0xff)<<16 | (k[15] & 0xff)<<24,
        j5  = c[ 4] & 0xff | (c[ 5] & 0xff)<<8 | (c[ 6] & 0xff)<<16 | (c[ 7] & 0xff)<<24,
        j6  = p[ 0] & 0xff | (p[ 1] & 0xff)<<8 | (p[ 2] & 0xff)<<16 | (p[ 3] & 0xff)<<24,
        j7  = p[ 4] & 0xff | (p[ 5] & 0xff)<<8 | (p[ 6] & 0xff)<<16 | (p[ 7] & 0xff)<<24,
        j8  = p[ 8] & 0xff | (p[ 9] & 0xff)<<8 | (p[10] & 0xff)<<16 | (p[11] & 0xff)<<24,
        j9  = p[12] & 0xff | (p[13] & 0xff)<<8 | (p[14] & 0xff)<<16 | (p[15] & 0xff)<<24,
        j10 = c[ 8] & 0xff | (c[ 9] & 0xff)<<8 | (c[10] & 0xff)<<16 | (c[11] & 0xff)<<24,
        j11 = k[16] & 0xff | (k[17] & 0xff)<<8 | (k[18] & 0xff)<<16 | (k[19] & 0xff)<<24,
        j12 = k[20] & 0xff | (k[21] & 0xff)<<8 | (k[22] & 0xff)<<16 | (k[23] & 0xff)<<24,
        j13 = k[24] & 0xff | (k[25] & 0xff)<<8 | (k[26] & 0xff)<<16 | (k[27] & 0xff)<<24,
        j14 = k[28] & 0xff | (k[29] & 0xff)<<8 | (k[30] & 0xff)<<16 | (k[31] & 0xff)<<24,
        j15 = c[12] & 0xff | (c[13] & 0xff)<<8 | (c[14] & 0xff)<<16 | (c[15] & 0xff)<<24;

    var x0 = j0, x1 = j1, x2 = j2, x3 = j3, x4 = j4, x5 = j5, x6 = j6, x7 = j7,
        x8 = j8, x9 = j9, x10 = j10, x11 = j11, x12 = j12, x13 = j13, x14 = j14,
        x15 = j15, u;

    for (var i = 0; i < 20; i += 2) {
      u = x0 + x12 | 0;
      x4 ^= u<<7 | u>>>(32-7);
      u = x4 + x0 | 0;
      x8 ^= u<<9 | u>>>(32-9);
      u = x8 + x4 | 0;
      x12 ^= u<<13 | u>>>(32-13);
      u = x12 + x8 | 0;
      x0 ^= u<<18 | u>>>(32-18);

      u = x5 + x1 | 0;
      x9 ^= u<<7 | u>>>(32-7);
      u = x9 + x5 | 0;
      x13 ^= u<<9 | u>>>(32-9);
      u = x13 + x9 | 0;
      x1 ^= u<<13 | u>>>(32-13);
      u = x1 + x13 | 0;
      x5 ^= u<<18 | u>>>(32-18);

      u = x10 + x6 | 0;
      x14 ^= u<<7 | u>>>(32-7);
      u = x14 + x10 | 0;
      x2 ^= u<<9 | u>>>(32-9);
      u = x2 + x14 | 0;
      x6 ^= u<<13 | u>>>(32-13);
      u = x6 + x2 | 0;
      x10 ^= u<<18 | u>>>(32-18);

      u = x15 + x11 | 0;
      x3 ^= u<<7 | u>>>(32-7);
      u = x3 + x15 | 0;
      x7 ^= u<<9 | u>>>(32-9);
      u = x7 + x3 | 0;
      x11 ^= u<<13 | u>>>(32-13);
      u = x11 + x7 | 0;
      x15 ^= u<<18 | u>>>(32-18);

      u = x0 + x3 | 0;
      x1 ^= u<<7 | u>>>(32-7);
      u = x1 + x0 | 0;
      x2 ^= u<<9 | u>>>(32-9);
      u = x2 + x1 | 0;
      x3 ^= u<<13 | u>>>(32-13);
      u = x3 + x2 | 0;
      x0 ^= u<<18 | u>>>(32-18);

      u = x5 + x4 | 0;
      x6 ^= u<<7 | u>>>(32-7);
      u = x6 + x5 | 0;
      x7 ^= u<<9 | u>>>(32-9);
      u = x7 + x6 | 0;
      x4 ^= u<<13 | u>>>(32-13);
      u = x4 + x7 | 0;
      x5 ^= u<<18 | u>>>(32-18);

      u = x10 + x9 | 0;
      x11 ^= u<<7 | u>>>(32-7);
      u = x11 + x10 | 0;
      x8 ^= u<<9 | u>>>(32-9);
      u = x8 + x11 | 0;
      x9 ^= u<<13 | u>>>(32-13);
      u = x9 + x8 | 0;
      x10 ^= u<<18 | u>>>(32-18);

      u = x15 + x14 | 0;
      x12 ^= u<<7 | u>>>(32-7);
      u = x12 + x15 | 0;
      x13 ^= u<<9 | u>>>(32-9);
      u = x13 + x12 | 0;
      x14 ^= u<<13 | u>>>(32-13);
      u = x14 + x13 | 0;
      x15 ^= u<<18 | u>>>(32-18);
    }

    o[ 0] = x0 >>>  0 & 0xff;
    o[ 1] = x0 >>>  8 & 0xff;
    o[ 2] = x0 >>> 16 & 0xff;
    o[ 3] = x0 >>> 24 & 0xff;

    o[ 4] = x5 >>>  0 & 0xff;
    o[ 5] = x5 >>>  8 & 0xff;
    o[ 6] = x5 >>> 16 & 0xff;
    o[ 7] = x5 >>> 24 & 0xff;

    o[ 8] = x10 >>>  0 & 0xff;
    o[ 9] = x10 >>>  8 & 0xff;
    o[10] = x10 >>> 16 & 0xff;
    o[11] = x10 >>> 24 & 0xff;

    o[12] = x15 >>>  0 & 0xff;
    o[13] = x15 >>>  8 & 0xff;
    o[14] = x15 >>> 16 & 0xff;
    o[15] = x15 >>> 24 & 0xff;

    o[16] = x6 >>>  0 & 0xff;
    o[17] = x6 >>>  8 & 0xff;
    o[18] = x6 >>> 16 & 0xff;
    o[19] = x6 >>> 24 & 0xff;

    o[20] = x7 >>>  0 & 0xff;
    o[21] = x7 >>>  8 & 0xff;
    o[22] = x7 >>> 16 & 0xff;
    o[23] = x7 >>> 24 & 0xff;

    o[24] = x8 >>>  0 & 0xff;
    o[25] = x8 >>>  8 & 0xff;
    o[26] = x8 >>> 16 & 0xff;
    o[27] = x8 >>> 24 & 0xff;

    o[28] = x9 >>>  0 & 0xff;
    o[29] = x9 >>>  8 & 0xff;
    o[30] = x9 >>> 16 & 0xff;
    o[31] = x9 >>> 24 & 0xff;
  }

  function crypto_core_salsa20(out,inp,k,c) {
    core_salsa20(out,inp,k,c);
  }

  function crypto_core_hsalsa20(out,inp,k,c) {
    core_hsalsa20(out,inp,k,c);
  }

  var sigma = new Uint8Array([101, 120, 112, 97, 110, 100, 32, 51, 50, 45, 98, 121, 116, 101, 32, 107]);
              // "expand 32-byte k"

  function crypto_stream_salsa20_xor(c,cpos,m,mpos,b,n,k) {
    var z = new Uint8Array(16), x = new Uint8Array(64);
    var u, i;
    for (i = 0; i < 16; i++) z[i] = 0;
    for (i = 0; i < 8; i++) z[i] = n[i];
    while (b >= 64) {
      crypto_core_salsa20(x,z,k,sigma);
      for (i = 0; i < 64; i++) c[cpos+i] = m[mpos+i] ^ x[i];
      u = 1;
      for (i = 8; i < 16; i++) {
        u = u + (z[i] & 0xff) | 0;
        z[i] = u & 0xff;
        u >>>= 8;
      }
      b -= 64;
      cpos += 64;
      mpos += 64;
    }
    if (b > 0) {
      crypto_core_salsa20(x,z,k,sigma);
      for (i = 0; i < b; i++) c[cpos+i] = m[mpos+i] ^ x[i];
    }
    return 0;
  }

  function crypto_stream_salsa20(c,cpos,b,n,k) {
    var z = new Uint8Array(16), x = new Uint8Array(64);
    var u, i;
    for (i = 0; i < 16; i++) z[i] = 0;
    for (i = 0; i < 8; i++) z[i] = n[i];
    while (b >= 64) {
      crypto_core_salsa20(x,z,k,sigma);
      for (i = 0; i < 64; i++) c[cpos+i] = x[i];
      u = 1;
      for (i = 8; i < 16; i++) {
        u = u + (z[i] & 0xff) | 0;
        z[i] = u & 0xff;
        u >>>= 8;
      }
      b -= 64;
      cpos += 64;
    }
    if (b > 0) {
      crypto_core_salsa20(x,z,k,sigma);
      for (i = 0; i < b; i++) c[cpos+i] = x[i];
    }
    return 0;
  }

  function crypto_stream(c,cpos,d,n,k) {
    var s = new Uint8Array(32);
    crypto_core_hsalsa20(s,n,k,sigma);
    var sn = new Uint8Array(8);
    for (var i = 0; i < 8; i++) sn[i] = n[i+16];
    return crypto_stream_salsa20(c,cpos,d,sn,s);
  }

  function crypto_stream_xor(c,cpos,m,mpos,d,n,k) {
    var s = new Uint8Array(32);
    crypto_core_hsalsa20(s,n,k,sigma);
    var sn = new Uint8Array(8);
    for (var i = 0; i < 8; i++) sn[i] = n[i+16];
    return crypto_stream_salsa20_xor(c,cpos,m,mpos,d,sn,s);
  }

  /*
  * Port of Andrew Moon's Poly1305-donna-16. Public domain.
  * https://github.com/floodyberry/poly1305-donna
  */

  var poly1305 = function(key) {
    this.buffer = new Uint8Array(16);
    this.r = new Uint16Array(10);
    this.h = new Uint16Array(10);
    this.pad = new Uint16Array(8);
    this.leftover = 0;
    this.fin = 0;

    var t0, t1, t2, t3, t4, t5, t6, t7;

    t0 = key[ 0] & 0xff | (key[ 1] & 0xff) << 8; this.r[0] = ( t0                     ) & 0x1fff;
    t1 = key[ 2] & 0xff | (key[ 3] & 0xff) << 8; this.r[1] = ((t0 >>> 13) | (t1 <<  3)) & 0x1fff;
    t2 = key[ 4] & 0xff | (key[ 5] & 0xff) << 8; this.r[2] = ((t1 >>> 10) | (t2 <<  6)) & 0x1f03;
    t3 = key[ 6] & 0xff | (key[ 7] & 0xff) << 8; this.r[3] = ((t2 >>>  7) | (t3 <<  9)) & 0x1fff;
    t4 = key[ 8] & 0xff | (key[ 9] & 0xff) << 8; this.r[4] = ((t3 >>>  4) | (t4 << 12)) & 0x00ff;
    this.r[5] = ((t4 >>>  1)) & 0x1ffe;
    t5 = key[10] & 0xff | (key[11] & 0xff) << 8; this.r[6] = ((t4 >>> 14) | (t5 <<  2)) & 0x1fff;
    t6 = key[12] & 0xff | (key[13] & 0xff) << 8; this.r[7] = ((t5 >>> 11) | (t6 <<  5)) & 0x1f81;
    t7 = key[14] & 0xff | (key[15] & 0xff) << 8; this.r[8] = ((t6 >>>  8) | (t7 <<  8)) & 0x1fff;
    this.r[9] = ((t7 >>>  5)) & 0x007f;

    this.pad[0] = key[16] & 0xff | (key[17] & 0xff) << 8;
    this.pad[1] = key[18] & 0xff | (key[19] & 0xff) << 8;
    this.pad[2] = key[20] & 0xff | (key[21] & 0xff) << 8;
    this.pad[3] = key[22] & 0xff | (key[23] & 0xff) << 8;
    this.pad[4] = key[24] & 0xff | (key[25] & 0xff) << 8;
    this.pad[5] = key[26] & 0xff | (key[27] & 0xff) << 8;
    this.pad[6] = key[28] & 0xff | (key[29] & 0xff) << 8;
    this.pad[7] = key[30] & 0xff | (key[31] & 0xff) << 8;
  };

  poly1305.prototype.blocks = function(m, mpos, bytes) {
    var hibit = this.fin ? 0 : (1 << 11);
    var t0, t1, t2, t3, t4, t5, t6, t7, c;
    var d0, d1, d2, d3, d4, d5, d6, d7, d8, d9;

    var h0 = this.h[0],
        h1 = this.h[1],
        h2 = this.h[2],
        h3 = this.h[3],
        h4 = this.h[4],
        h5 = this.h[5],
        h6 = this.h[6],
        h7 = this.h[7],
        h8 = this.h[8],
        h9 = this.h[9];

    var r0 = this.r[0],
        r1 = this.r[1],
        r2 = this.r[2],
        r3 = this.r[3],
        r4 = this.r[4],
        r5 = this.r[5],
        r6 = this.r[6],
        r7 = this.r[7],
        r8 = this.r[8],
        r9 = this.r[9];

    while (bytes >= 16) {
      t0 = m[mpos+ 0] & 0xff | (m[mpos+ 1] & 0xff) << 8; h0 += ( t0                     ) & 0x1fff;
      t1 = m[mpos+ 2] & 0xff | (m[mpos+ 3] & 0xff) << 8; h1 += ((t0 >>> 13) | (t1 <<  3)) & 0x1fff;
      t2 = m[mpos+ 4] & 0xff | (m[mpos+ 5] & 0xff) << 8; h2 += ((t1 >>> 10) | (t2 <<  6)) & 0x1fff;
      t3 = m[mpos+ 6] & 0xff | (m[mpos+ 7] & 0xff) << 8; h3 += ((t2 >>>  7) | (t3 <<  9)) & 0x1fff;
      t4 = m[mpos+ 8] & 0xff | (m[mpos+ 9] & 0xff) << 8; h4 += ((t3 >>>  4) | (t4 << 12)) & 0x1fff;
      h5 += ((t4 >>>  1)) & 0x1fff;
      t5 = m[mpos+10] & 0xff | (m[mpos+11] & 0xff) << 8; h6 += ((t4 >>> 14) | (t5 <<  2)) & 0x1fff;
      t6 = m[mpos+12] & 0xff | (m[mpos+13] & 0xff) << 8; h7 += ((t5 >>> 11) | (t6 <<  5)) & 0x1fff;
      t7 = m[mpos+14] & 0xff | (m[mpos+15] & 0xff) << 8; h8 += ((t6 >>>  8) | (t7 <<  8)) & 0x1fff;
      h9 += ((t7 >>> 5)) | hibit;

      c = 0;

      d0 = c;
      d0 += h0 * r0;
      d0 += h1 * (5 * r9);
      d0 += h2 * (5 * r8);
      d0 += h3 * (5 * r7);
      d0 += h4 * (5 * r6);
      c = (d0 >>> 13); d0 &= 0x1fff;
      d0 += h5 * (5 * r5);
      d0 += h6 * (5 * r4);
      d0 += h7 * (5 * r3);
      d0 += h8 * (5 * r2);
      d0 += h9 * (5 * r1);
      c += (d0 >>> 13); d0 &= 0x1fff;

      d1 = c;
      d1 += h0 * r1;
      d1 += h1 * r0;
      d1 += h2 * (5 * r9);
      d1 += h3 * (5 * r8);
      d1 += h4 * (5 * r7);
      c = (d1 >>> 13); d1 &= 0x1fff;
      d1 += h5 * (5 * r6);
      d1 += h6 * (5 * r5);
      d1 += h7 * (5 * r4);
      d1 += h8 * (5 * r3);
      d1 += h9 * (5 * r2);
      c += (d1 >>> 13); d1 &= 0x1fff;

      d2 = c;
      d2 += h0 * r2;
      d2 += h1 * r1;
      d2 += h2 * r0;
      d2 += h3 * (5 * r9);
      d2 += h4 * (5 * r8);
      c = (d2 >>> 13); d2 &= 0x1fff;
      d2 += h5 * (5 * r7);
      d2 += h6 * (5 * r6);
      d2 += h7 * (5 * r5);
      d2 += h8 * (5 * r4);
      d2 += h9 * (5 * r3);
      c += (d2 >>> 13); d2 &= 0x1fff;

      d3 = c;
      d3 += h0 * r3;
      d3 += h1 * r2;
      d3 += h2 * r1;
      d3 += h3 * r0;
      d3 += h4 * (5 * r9);
      c = (d3 >>> 13); d3 &= 0x1fff;
      d3 += h5 * (5 * r8);
      d3 += h6 * (5 * r7);
      d3 += h7 * (5 * r6);
      d3 += h8 * (5 * r5);
      d3 += h9 * (5 * r4);
      c += (d3 >>> 13); d3 &= 0x1fff;

      d4 = c;
      d4 += h0 * r4;
      d4 += h1 * r3;
      d4 += h2 * r2;
      d4 += h3 * r1;
      d4 += h4 * r0;
      c = (d4 >>> 13); d4 &= 0x1fff;
      d4 += h5 * (5 * r9);
      d4 += h6 * (5 * r8);
      d4 += h7 * (5 * r7);
      d4 += h8 * (5 * r6);
      d4 += h9 * (5 * r5);
      c += (d4 >>> 13); d4 &= 0x1fff;

      d5 = c;
      d5 += h0 * r5;
      d5 += h1 * r4;
      d5 += h2 * r3;
      d5 += h3 * r2;
      d5 += h4 * r1;
      c = (d5 >>> 13); d5 &= 0x1fff;
      d5 += h5 * r0;
      d5 += h6 * (5 * r9);
      d5 += h7 * (5 * r8);
      d5 += h8 * (5 * r7);
      d5 += h9 * (5 * r6);
      c += (d5 >>> 13); d5 &= 0x1fff;

      d6 = c;
      d6 += h0 * r6;
      d6 += h1 * r5;
      d6 += h2 * r4;
      d6 += h3 * r3;
      d6 += h4 * r2;
      c = (d6 >>> 13); d6 &= 0x1fff;
      d6 += h5 * r1;
      d6 += h6 * r0;
      d6 += h7 * (5 * r9);
      d6 += h8 * (5 * r8);
      d6 += h9 * (5 * r7);
      c += (d6 >>> 13); d6 &= 0x1fff;

      d7 = c;
      d7 += h0 * r7;
      d7 += h1 * r6;
      d7 += h2 * r5;
      d7 += h3 * r4;
      d7 += h4 * r3;
      c = (d7 >>> 13); d7 &= 0x1fff;
      d7 += h5 * r2;
      d7 += h6 * r1;
      d7 += h7 * r0;
      d7 += h8 * (5 * r9);
      d7 += h9 * (5 * r8);
      c += (d7 >>> 13); d7 &= 0x1fff;

      d8 = c;
      d8 += h0 * r8;
      d8 += h1 * r7;
      d8 += h2 * r6;
      d8 += h3 * r5;
      d8 += h4 * r4;
      c = (d8 >>> 13); d8 &= 0x1fff;
      d8 += h5 * r3;
      d8 += h6 * r2;
      d8 += h7 * r1;
      d8 += h8 * r0;
      d8 += h9 * (5 * r9);
      c += (d8 >>> 13); d8 &= 0x1fff;

      d9 = c;
      d9 += h0 * r9;
      d9 += h1 * r8;
      d9 += h2 * r7;
      d9 += h3 * r6;
      d9 += h4 * r5;
      c = (d9 >>> 13); d9 &= 0x1fff;
      d9 += h5 * r4;
      d9 += h6 * r3;
      d9 += h7 * r2;
      d9 += h8 * r1;
      d9 += h9 * r0;
      c += (d9 >>> 13); d9 &= 0x1fff;

      c = (((c << 2) + c)) | 0;
      c = (c + d0) | 0;
      d0 = c & 0x1fff;
      c = (c >>> 13);
      d1 += c;

      h0 = d0;
      h1 = d1;
      h2 = d2;
      h3 = d3;
      h4 = d4;
      h5 = d5;
      h6 = d6;
      h7 = d7;
      h8 = d8;
      h9 = d9;

      mpos += 16;
      bytes -= 16;
    }
    this.h[0] = h0;
    this.h[1] = h1;
    this.h[2] = h2;
    this.h[3] = h3;
    this.h[4] = h4;
    this.h[5] = h5;
    this.h[6] = h6;
    this.h[7] = h7;
    this.h[8] = h8;
    this.h[9] = h9;
  };

  poly1305.prototype.finish = function(mac, macpos) {
    var g = new Uint16Array(10);
    var c, mask, f, i;

    if (this.leftover) {
      i = this.leftover;
      this.buffer[i++] = 1;
      for (; i < 16; i++) this.buffer[i] = 0;
      this.fin = 1;
      this.blocks(this.buffer, 0, 16);
    }

    c = this.h[1] >>> 13;
    this.h[1] &= 0x1fff;
    for (i = 2; i < 10; i++) {
      this.h[i] += c;
      c = this.h[i] >>> 13;
      this.h[i] &= 0x1fff;
    }
    this.h[0] += (c * 5);
    c = this.h[0] >>> 13;
    this.h[0] &= 0x1fff;
    this.h[1] += c;
    c = this.h[1] >>> 13;
    this.h[1] &= 0x1fff;
    this.h[2] += c;

    g[0] = this.h[0] + 5;
    c = g[0] >>> 13;
    g[0] &= 0x1fff;
    for (i = 1; i < 10; i++) {
      g[i] = this.h[i] + c;
      c = g[i] >>> 13;
      g[i] &= 0x1fff;
    }
    g[9] -= (1 << 13);

    mask = (c ^ 1) - 1;
    for (i = 0; i < 10; i++) g[i] &= mask;
    mask = ~mask;
    for (i = 0; i < 10; i++) this.h[i] = (this.h[i] & mask) | g[i];

    this.h[0] = ((this.h[0]       ) | (this.h[1] << 13)                    ) & 0xffff;
    this.h[1] = ((this.h[1] >>>  3) | (this.h[2] << 10)                    ) & 0xffff;
    this.h[2] = ((this.h[2] >>>  6) | (this.h[3] <<  7)                    ) & 0xffff;
    this.h[3] = ((this.h[3] >>>  9) | (this.h[4] <<  4)                    ) & 0xffff;
    this.h[4] = ((this.h[4] >>> 12) | (this.h[5] <<  1) | (this.h[6] << 14)) & 0xffff;
    this.h[5] = ((this.h[6] >>>  2) | (this.h[7] << 11)                    ) & 0xffff;
    this.h[6] = ((this.h[7] >>>  5) | (this.h[8] <<  8)                    ) & 0xffff;
    this.h[7] = ((this.h[8] >>>  8) | (this.h[9] <<  5)                    ) & 0xffff;

    f = this.h[0] + this.pad[0];
    this.h[0] = f & 0xffff;
    for (i = 1; i < 8; i++) {
      f = (((this.h[i] + this.pad[i]) | 0) + (f >>> 16)) | 0;
      this.h[i] = f & 0xffff;
    }

    mac[macpos+ 0] = (this.h[0] >>> 0) & 0xff;
    mac[macpos+ 1] = (this.h[0] >>> 8) & 0xff;
    mac[macpos+ 2] = (this.h[1] >>> 0) & 0xff;
    mac[macpos+ 3] = (this.h[1] >>> 8) & 0xff;
    mac[macpos+ 4] = (this.h[2] >>> 0) & 0xff;
    mac[macpos+ 5] = (this.h[2] >>> 8) & 0xff;
    mac[macpos+ 6] = (this.h[3] >>> 0) & 0xff;
    mac[macpos+ 7] = (this.h[3] >>> 8) & 0xff;
    mac[macpos+ 8] = (this.h[4] >>> 0) & 0xff;
    mac[macpos+ 9] = (this.h[4] >>> 8) & 0xff;
    mac[macpos+10] = (this.h[5] >>> 0) & 0xff;
    mac[macpos+11] = (this.h[5] >>> 8) & 0xff;
    mac[macpos+12] = (this.h[6] >>> 0) & 0xff;
    mac[macpos+13] = (this.h[6] >>> 8) & 0xff;
    mac[macpos+14] = (this.h[7] >>> 0) & 0xff;
    mac[macpos+15] = (this.h[7] >>> 8) & 0xff;
  };

  poly1305.prototype.update = function(m, mpos, bytes) {
    var i, want;

    if (this.leftover) {
      want = (16 - this.leftover);
      if (want > bytes)
        want = bytes;
      for (i = 0; i < want; i++)
        this.buffer[this.leftover + i] = m[mpos+i];
      bytes -= want;
      mpos += want;
      this.leftover += want;
      if (this.leftover < 16)
        return;
      this.blocks(this.buffer, 0, 16);
      this.leftover = 0;
    }

    if (bytes >= 16) {
      want = bytes - (bytes % 16);
      this.blocks(m, mpos, want);
      mpos += want;
      bytes -= want;
    }

    if (bytes) {
      for (i = 0; i < bytes; i++)
        this.buffer[this.leftover + i] = m[mpos+i];
      this.leftover += bytes;
    }
  };

  function crypto_onetimeauth(out, outpos, m, mpos, n, k) {
    var s = new poly1305(k);
    s.update(m, mpos, n);
    s.finish(out, outpos);
    return 0;
  }

  function crypto_onetimeauth_verify(h, hpos, m, mpos, n, k) {
    var x = new Uint8Array(16);
    crypto_onetimeauth(x,0,m,mpos,n,k);
    return crypto_verify_16(h,hpos,x,0);
  }

  function crypto_secretbox(c,m,d,n,k) {
    var i;
    if (d < 32) return -1;
    crypto_stream_xor(c,0,m,0,d,n,k);
    crypto_onetimeauth(c, 16, c, 32, d - 32, c);
    for (i = 0; i < 16; i++) c[i] = 0;
    return 0;
  }

  function crypto_secretbox_open(m,c,d,n,k) {
    var i;
    var x = new Uint8Array(32);
    if (d < 32) return -1;
    crypto_stream(x,0,32,n,k);
    if (crypto_onetimeauth_verify(c, 16,c, 32,d - 32,x) !== 0) return -1;
    crypto_stream_xor(m,0,c,0,d,n,k);
    for (i = 0; i < 32; i++) m[i] = 0;
    return 0;
  }

  function set25519(r, a) {
    var i;
    for (i = 0; i < 16; i++) r[i] = a[i]|0;
  }

  function car25519(o) {
    var i, v, c = 1;
    for (i = 0; i < 16; i++) {
      v = o[i] + c + 65535;
      c = Math.floor(v / 65536);
      o[i] = v - c * 65536;
    }
    o[0] += c-1 + 37 * (c-1);
  }

  function sel25519(p, q, b) {
    var t, c = ~(b-1);
    for (var i = 0; i < 16; i++) {
      t = c & (p[i] ^ q[i]);
      p[i] ^= t;
      q[i] ^= t;
    }
  }

  function pack25519(o, n) {
    var i, j, b;
    var m = gf(), t = gf();
    for (i = 0; i < 16; i++) t[i] = n[i];
    car25519(t);
    car25519(t);
    car25519(t);
    for (j = 0; j < 2; j++) {
      m[0] = t[0] - 0xffed;
      for (i = 1; i < 15; i++) {
        m[i] = t[i] - 0xffff - ((m[i-1]>>16) & 1);
        m[i-1] &= 0xffff;
      }
      m[15] = t[15] - 0x7fff - ((m[14]>>16) & 1);
      b = (m[15]>>16) & 1;
      m[14] &= 0xffff;
      sel25519(t, m, 1-b);
    }
    for (i = 0; i < 16; i++) {
      o[2*i] = t[i] & 0xff;
      o[2*i+1] = t[i]>>8;
    }
  }

  function neq25519(a, b) {
    var c = new Uint8Array(32), d = new Uint8Array(32);
    pack25519(c, a);
    pack25519(d, b);
    return crypto_verify_32(c, 0, d, 0);
  }

  function par25519(a) {
    var d = new Uint8Array(32);
    pack25519(d, a);
    return d[0] & 1;
  }

  function unpack25519(o, n) {
    var i;
    for (i = 0; i < 16; i++) o[i] = n[2*i] + (n[2*i+1] << 8);
    o[15] &= 0x7fff;
  }

  function A(o, a, b) {
    for (var i = 0; i < 16; i++) o[i] = a[i] + b[i];
  }

  function Z(o, a, b) {
    for (var i = 0; i < 16; i++) o[i] = a[i] - b[i];
  }

  function M(o, a, b) {
    var v, c,
       t0 = 0,  t1 = 0,  t2 = 0,  t3 = 0,  t4 = 0,  t5 = 0,  t6 = 0,  t7 = 0,
       t8 = 0,  t9 = 0, t10 = 0, t11 = 0, t12 = 0, t13 = 0, t14 = 0, t15 = 0,
      t16 = 0, t17 = 0, t18 = 0, t19 = 0, t20 = 0, t21 = 0, t22 = 0, t23 = 0,
      t24 = 0, t25 = 0, t26 = 0, t27 = 0, t28 = 0, t29 = 0, t30 = 0,
      b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3],
      b4 = b[4],
      b5 = b[5],
      b6 = b[6],
      b7 = b[7],
      b8 = b[8],
      b9 = b[9],
      b10 = b[10],
      b11 = b[11],
      b12 = b[12],
      b13 = b[13],
      b14 = b[14],
      b15 = b[15];

    v = a[0];
    t0 += v * b0;
    t1 += v * b1;
    t2 += v * b2;
    t3 += v * b3;
    t4 += v * b4;
    t5 += v * b5;
    t6 += v * b6;
    t7 += v * b7;
    t8 += v * b8;
    t9 += v * b9;
    t10 += v * b10;
    t11 += v * b11;
    t12 += v * b12;
    t13 += v * b13;
    t14 += v * b14;
    t15 += v * b15;
    v = a[1];
    t1 += v * b0;
    t2 += v * b1;
    t3 += v * b2;
    t4 += v * b3;
    t5 += v * b4;
    t6 += v * b5;
    t7 += v * b6;
    t8 += v * b7;
    t9 += v * b8;
    t10 += v * b9;
    t11 += v * b10;
    t12 += v * b11;
    t13 += v * b12;
    t14 += v * b13;
    t15 += v * b14;
    t16 += v * b15;
    v = a[2];
    t2 += v * b0;
    t3 += v * b1;
    t4 += v * b2;
    t5 += v * b3;
    t6 += v * b4;
    t7 += v * b5;
    t8 += v * b6;
    t9 += v * b7;
    t10 += v * b8;
    t11 += v * b9;
    t12 += v * b10;
    t13 += v * b11;
    t14 += v * b12;
    t15 += v * b13;
    t16 += v * b14;
    t17 += v * b15;
    v = a[3];
    t3 += v * b0;
    t4 += v * b1;
    t5 += v * b2;
    t6 += v * b3;
    t7 += v * b4;
    t8 += v * b5;
    t9 += v * b6;
    t10 += v * b7;
    t11 += v * b8;
    t12 += v * b9;
    t13 += v * b10;
    t14 += v * b11;
    t15 += v * b12;
    t16 += v * b13;
    t17 += v * b14;
    t18 += v * b15;
    v = a[4];
    t4 += v * b0;
    t5 += v * b1;
    t6 += v * b2;
    t7 += v * b3;
    t8 += v * b4;
    t9 += v * b5;
    t10 += v * b6;
    t11 += v * b7;
    t12 += v * b8;
    t13 += v * b9;
    t14 += v * b10;
    t15 += v * b11;
    t16 += v * b12;
    t17 += v * b13;
    t18 += v * b14;
    t19 += v * b15;
    v = a[5];
    t5 += v * b0;
    t6 += v * b1;
    t7 += v * b2;
    t8 += v * b3;
    t9 += v * b4;
    t10 += v * b5;
    t11 += v * b6;
    t12 += v * b7;
    t13 += v * b8;
    t14 += v * b9;
    t15 += v * b10;
    t16 += v * b11;
    t17 += v * b12;
    t18 += v * b13;
    t19 += v * b14;
    t20 += v * b15;
    v = a[6];
    t6 += v * b0;
    t7 += v * b1;
    t8 += v * b2;
    t9 += v * b3;
    t10 += v * b4;
    t11 += v * b5;
    t12 += v * b6;
    t13 += v * b7;
    t14 += v * b8;
    t15 += v * b9;
    t16 += v * b10;
    t17 += v * b11;
    t18 += v * b12;
    t19 += v * b13;
    t20 += v * b14;
    t21 += v * b15;
    v = a[7];
    t7 += v * b0;
    t8 += v * b1;
    t9 += v * b2;
    t10 += v * b3;
    t11 += v * b4;
    t12 += v * b5;
    t13 += v * b6;
    t14 += v * b7;
    t15 += v * b8;
    t16 += v * b9;
    t17 += v * b10;
    t18 += v * b11;
    t19 += v * b12;
    t20 += v * b13;
    t21 += v * b14;
    t22 += v * b15;
    v = a[8];
    t8 += v * b0;
    t9 += v * b1;
    t10 += v * b2;
    t11 += v * b3;
    t12 += v * b4;
    t13 += v * b5;
    t14 += v * b6;
    t15 += v * b7;
    t16 += v * b8;
    t17 += v * b9;
    t18 += v * b10;
    t19 += v * b11;
    t20 += v * b12;
    t21 += v * b13;
    t22 += v * b14;
    t23 += v * b15;
    v = a[9];
    t9 += v * b0;
    t10 += v * b1;
    t11 += v * b2;
    t12 += v * b3;
    t13 += v * b4;
    t14 += v * b5;
    t15 += v * b6;
    t16 += v * b7;
    t17 += v * b8;
    t18 += v * b9;
    t19 += v * b10;
    t20 += v * b11;
    t21 += v * b12;
    t22 += v * b13;
    t23 += v * b14;
    t24 += v * b15;
    v = a[10];
    t10 += v * b0;
    t11 += v * b1;
    t12 += v * b2;
    t13 += v * b3;
    t14 += v * b4;
    t15 += v * b5;
    t16 += v * b6;
    t17 += v * b7;
    t18 += v * b8;
    t19 += v * b9;
    t20 += v * b10;
    t21 += v * b11;
    t22 += v * b12;
    t23 += v * b13;
    t24 += v * b14;
    t25 += v * b15;
    v = a[11];
    t11 += v * b0;
    t12 += v * b1;
    t13 += v * b2;
    t14 += v * b3;
    t15 += v * b4;
    t16 += v * b5;
    t17 += v * b6;
    t18 += v * b7;
    t19 += v * b8;
    t20 += v * b9;
    t21 += v * b10;
    t22 += v * b11;
    t23 += v * b12;
    t24 += v * b13;
    t25 += v * b14;
    t26 += v * b15;
    v = a[12];
    t12 += v * b0;
    t13 += v * b1;
    t14 += v * b2;
    t15 += v * b3;
    t16 += v * b4;
    t17 += v * b5;
    t18 += v * b6;
    t19 += v * b7;
    t20 += v * b8;
    t21 += v * b9;
    t22 += v * b10;
    t23 += v * b11;
    t24 += v * b12;
    t25 += v * b13;
    t26 += v * b14;
    t27 += v * b15;
    v = a[13];
    t13 += v * b0;
    t14 += v * b1;
    t15 += v * b2;
    t16 += v * b3;
    t17 += v * b4;
    t18 += v * b5;
    t19 += v * b6;
    t20 += v * b7;
    t21 += v * b8;
    t22 += v * b9;
    t23 += v * b10;
    t24 += v * b11;
    t25 += v * b12;
    t26 += v * b13;
    t27 += v * b14;
    t28 += v * b15;
    v = a[14];
    t14 += v * b0;
    t15 += v * b1;
    t16 += v * b2;
    t17 += v * b3;
    t18 += v * b4;
    t19 += v * b5;
    t20 += v * b6;
    t21 += v * b7;
    t22 += v * b8;
    t23 += v * b9;
    t24 += v * b10;
    t25 += v * b11;
    t26 += v * b12;
    t27 += v * b13;
    t28 += v * b14;
    t29 += v * b15;
    v = a[15];
    t15 += v * b0;
    t16 += v * b1;
    t17 += v * b2;
    t18 += v * b3;
    t19 += v * b4;
    t20 += v * b5;
    t21 += v * b6;
    t22 += v * b7;
    t23 += v * b8;
    t24 += v * b9;
    t25 += v * b10;
    t26 += v * b11;
    t27 += v * b12;
    t28 += v * b13;
    t29 += v * b14;
    t30 += v * b15;

    t0  += 38 * t16;
    t1  += 38 * t17;
    t2  += 38 * t18;
    t3  += 38 * t19;
    t4  += 38 * t20;
    t5  += 38 * t21;
    t6  += 38 * t22;
    t7  += 38 * t23;
    t8  += 38 * t24;
    t9  += 38 * t25;
    t10 += 38 * t26;
    t11 += 38 * t27;
    t12 += 38 * t28;
    t13 += 38 * t29;
    t14 += 38 * t30;
    // t15 left as is

    // first car
    c = 1;
    v =  t0 + c + 65535; c = Math.floor(v / 65536);  t0 = v - c * 65536;
    v =  t1 + c + 65535; c = Math.floor(v / 65536);  t1 = v - c * 65536;
    v =  t2 + c + 65535; c = Math.floor(v / 65536);  t2 = v - c * 65536;
    v =  t3 + c + 65535; c = Math.floor(v / 65536);  t3 = v - c * 65536;
    v =  t4 + c + 65535; c = Math.floor(v / 65536);  t4 = v - c * 65536;
    v =  t5 + c + 65535; c = Math.floor(v / 65536);  t5 = v - c * 65536;
    v =  t6 + c + 65535; c = Math.floor(v / 65536);  t6 = v - c * 65536;
    v =  t7 + c + 65535; c = Math.floor(v / 65536);  t7 = v - c * 65536;
    v =  t8 + c + 65535; c = Math.floor(v / 65536);  t8 = v - c * 65536;
    v =  t9 + c + 65535; c = Math.floor(v / 65536);  t9 = v - c * 65536;
    v = t10 + c + 65535; c = Math.floor(v / 65536); t10 = v - c * 65536;
    v = t11 + c + 65535; c = Math.floor(v / 65536); t11 = v - c * 65536;
    v = t12 + c + 65535; c = Math.floor(v / 65536); t12 = v - c * 65536;
    v = t13 + c + 65535; c = Math.floor(v / 65536); t13 = v - c * 65536;
    v = t14 + c + 65535; c = Math.floor(v / 65536); t14 = v - c * 65536;
    v = t15 + c + 65535; c = Math.floor(v / 65536); t15 = v - c * 65536;
    t0 += c-1 + 37 * (c-1);

    // second car
    c = 1;
    v =  t0 + c + 65535; c = Math.floor(v / 65536);  t0 = v - c * 65536;
    v =  t1 + c + 65535; c = Math.floor(v / 65536);  t1 = v - c * 65536;
    v =  t2 + c + 65535; c = Math.floor(v / 65536);  t2 = v - c * 65536;
    v =  t3 + c + 65535; c = Math.floor(v / 65536);  t3 = v - c * 65536;
    v =  t4 + c + 65535; c = Math.floor(v / 65536);  t4 = v - c * 65536;
    v =  t5 + c + 65535; c = Math.floor(v / 65536);  t5 = v - c * 65536;
    v =  t6 + c + 65535; c = Math.floor(v / 65536);  t6 = v - c * 65536;
    v =  t7 + c + 65535; c = Math.floor(v / 65536);  t7 = v - c * 65536;
    v =  t8 + c + 65535; c = Math.floor(v / 65536);  t8 = v - c * 65536;
    v =  t9 + c + 65535; c = Math.floor(v / 65536);  t9 = v - c * 65536;
    v = t10 + c + 65535; c = Math.floor(v / 65536); t10 = v - c * 65536;
    v = t11 + c + 65535; c = Math.floor(v / 65536); t11 = v - c * 65536;
    v = t12 + c + 65535; c = Math.floor(v / 65536); t12 = v - c * 65536;
    v = t13 + c + 65535; c = Math.floor(v / 65536); t13 = v - c * 65536;
    v = t14 + c + 65535; c = Math.floor(v / 65536); t14 = v - c * 65536;
    v = t15 + c + 65535; c = Math.floor(v / 65536); t15 = v - c * 65536;
    t0 += c-1 + 37 * (c-1);

    o[ 0] = t0;
    o[ 1] = t1;
    o[ 2] = t2;
    o[ 3] = t3;
    o[ 4] = t4;
    o[ 5] = t5;
    o[ 6] = t6;
    o[ 7] = t7;
    o[ 8] = t8;
    o[ 9] = t9;
    o[10] = t10;
    o[11] = t11;
    o[12] = t12;
    o[13] = t13;
    o[14] = t14;
    o[15] = t15;
  }

  function S(o, a) {
    M(o, a, a);
  }

  function inv25519(o, i) {
    var c = gf();
    var a;
    for (a = 0; a < 16; a++) c[a] = i[a];
    for (a = 253; a >= 0; a--) {
      S(c, c);
      if(a !== 2 && a !== 4) M(c, c, i);
    }
    for (a = 0; a < 16; a++) o[a] = c[a];
  }

  function pow2523(o, i) {
    var c = gf();
    var a;
    for (a = 0; a < 16; a++) c[a] = i[a];
    for (a = 250; a >= 0; a--) {
        S(c, c);
        if(a !== 1) M(c, c, i);
    }
    for (a = 0; a < 16; a++) o[a] = c[a];
  }

  function crypto_scalarmult(q, n, p) {
    var z = new Uint8Array(32);
    var x = new Float64Array(80), r, i;
    var a = gf(), b = gf(), c = gf(),
        d = gf(), e = gf(), f = gf();
    for (i = 0; i < 31; i++) z[i] = n[i];
    z[31]=(n[31]&127)|64;
    z[0]&=248;
    unpack25519(x,p);
    for (i = 0; i < 16; i++) {
      b[i]=x[i];
      d[i]=a[i]=c[i]=0;
    }
    a[0]=d[0]=1;
    for (i=254; i>=0; --i) {
      r=(z[i>>>3]>>>(i&7))&1;
      sel25519(a,b,r);
      sel25519(c,d,r);
      A(e,a,c);
      Z(a,a,c);
      A(c,b,d);
      Z(b,b,d);
      S(d,e);
      S(f,a);
      M(a,c,a);
      M(c,b,e);
      A(e,a,c);
      Z(a,a,c);
      S(b,a);
      Z(c,d,f);
      M(a,c,_121665);
      A(a,a,d);
      M(c,c,a);
      M(a,d,f);
      M(d,b,x);
      S(b,e);
      sel25519(a,b,r);
      sel25519(c,d,r);
    }
    for (i = 0; i < 16; i++) {
      x[i+16]=a[i];
      x[i+32]=c[i];
      x[i+48]=b[i];
      x[i+64]=d[i];
    }
    var x32 = x.subarray(32);
    var x16 = x.subarray(16);
    inv25519(x32,x32);
    M(x16,x16,x32);
    pack25519(q,x16);
    return 0;
  }

  function crypto_scalarmult_base(q, n) {
    return crypto_scalarmult(q, n, _9);
  }

  function crypto_box_keypair(y, x) {
    randombytes(x, 32);
    return crypto_scalarmult_base(y, x);
  }

  function crypto_box_beforenm(k, y, x) {
    var s = new Uint8Array(32);
    crypto_scalarmult(s, x, y);
    return crypto_core_hsalsa20(k, _0, s, sigma);
  }

  var crypto_box_afternm = crypto_secretbox;
  var crypto_box_open_afternm = crypto_secretbox_open;

  function crypto_box(c, m, d, n, y, x) {
    var k = new Uint8Array(32);
    crypto_box_beforenm(k, y, x);
    return crypto_box_afternm(c, m, d, n, k);
  }

  function crypto_box_open(m, c, d, n, y, x) {
    var k = new Uint8Array(32);
    crypto_box_beforenm(k, y, x);
    return crypto_box_open_afternm(m, c, d, n, k);
  }

  var K = [
    0x428a2f98, 0xd728ae22, 0x71374491, 0x23ef65cd,
    0xb5c0fbcf, 0xec4d3b2f, 0xe9b5dba5, 0x8189dbbc,
    0x3956c25b, 0xf348b538, 0x59f111f1, 0xb605d019,
    0x923f82a4, 0xaf194f9b, 0xab1c5ed5, 0xda6d8118,
    0xd807aa98, 0xa3030242, 0x12835b01, 0x45706fbe,
    0x243185be, 0x4ee4b28c, 0x550c7dc3, 0xd5ffb4e2,
    0x72be5d74, 0xf27b896f, 0x80deb1fe, 0x3b1696b1,
    0x9bdc06a7, 0x25c71235, 0xc19bf174, 0xcf692694,
    0xe49b69c1, 0x9ef14ad2, 0xefbe4786, 0x384f25e3,
    0x0fc19dc6, 0x8b8cd5b5, 0x240ca1cc, 0x77ac9c65,
    0x2de92c6f, 0x592b0275, 0x4a7484aa, 0x6ea6e483,
    0x5cb0a9dc, 0xbd41fbd4, 0x76f988da, 0x831153b5,
    0x983e5152, 0xee66dfab, 0xa831c66d, 0x2db43210,
    0xb00327c8, 0x98fb213f, 0xbf597fc7, 0xbeef0ee4,
    0xc6e00bf3, 0x3da88fc2, 0xd5a79147, 0x930aa725,
    0x06ca6351, 0xe003826f, 0x14292967, 0x0a0e6e70,
    0x27b70a85, 0x46d22ffc, 0x2e1b2138, 0x5c26c926,
    0x4d2c6dfc, 0x5ac42aed, 0x53380d13, 0x9d95b3df,
    0x650a7354, 0x8baf63de, 0x766a0abb, 0x3c77b2a8,
    0x81c2c92e, 0x47edaee6, 0x92722c85, 0x1482353b,
    0xa2bfe8a1, 0x4cf10364, 0xa81a664b, 0xbc423001,
    0xc24b8b70, 0xd0f89791, 0xc76c51a3, 0x0654be30,
    0xd192e819, 0xd6ef5218, 0xd6990624, 0x5565a910,
    0xf40e3585, 0x5771202a, 0x106aa070, 0x32bbd1b8,
    0x19a4c116, 0xb8d2d0c8, 0x1e376c08, 0x5141ab53,
    0x2748774c, 0xdf8eeb99, 0x34b0bcb5, 0xe19b48a8,
    0x391c0cb3, 0xc5c95a63, 0x4ed8aa4a, 0xe3418acb,
    0x5b9cca4f, 0x7763e373, 0x682e6ff3, 0xd6b2b8a3,
    0x748f82ee, 0x5defb2fc, 0x78a5636f, 0x43172f60,
    0x84c87814, 0xa1f0ab72, 0x8cc70208, 0x1a6439ec,
    0x90befffa, 0x23631e28, 0xa4506ceb, 0xde82bde9,
    0xbef9a3f7, 0xb2c67915, 0xc67178f2, 0xe372532b,
    0xca273ece, 0xea26619c, 0xd186b8c7, 0x21c0c207,
    0xeada7dd6, 0xcde0eb1e, 0xf57d4f7f, 0xee6ed178,
    0x06f067aa, 0x72176fba, 0x0a637dc5, 0xa2c898a6,
    0x113f9804, 0xbef90dae, 0x1b710b35, 0x131c471b,
    0x28db77f5, 0x23047d84, 0x32caab7b, 0x40c72493,
    0x3c9ebe0a, 0x15c9bebc, 0x431d67c4, 0x9c100d4c,
    0x4cc5d4be, 0xcb3e42b6, 0x597f299c, 0xfc657e2a,
    0x5fcb6fab, 0x3ad6faec, 0x6c44198c, 0x4a475817
  ];

  function crypto_hashblocks_hl(hh, hl, m, n) {
    var wh = new Int32Array(16), wl = new Int32Array(16),
        bh0, bh1, bh2, bh3, bh4, bh5, bh6, bh7,
        bl0, bl1, bl2, bl3, bl4, bl5, bl6, bl7,
        th, tl, i, j, h, l, a, b, c, d;

    var ah0 = hh[0],
        ah1 = hh[1],
        ah2 = hh[2],
        ah3 = hh[3],
        ah4 = hh[4],
        ah5 = hh[5],
        ah6 = hh[6],
        ah7 = hh[7],

        al0 = hl[0],
        al1 = hl[1],
        al2 = hl[2],
        al3 = hl[3],
        al4 = hl[4],
        al5 = hl[5],
        al6 = hl[6],
        al7 = hl[7];

    var pos = 0;
    while (n >= 128) {
      for (i = 0; i < 16; i++) {
        j = 8 * i + pos;
        wh[i] = (m[j+0] << 24) | (m[j+1] << 16) | (m[j+2] << 8) | m[j+3];
        wl[i] = (m[j+4] << 24) | (m[j+5] << 16) | (m[j+6] << 8) | m[j+7];
      }
      for (i = 0; i < 80; i++) {
        bh0 = ah0;
        bh1 = ah1;
        bh2 = ah2;
        bh3 = ah3;
        bh4 = ah4;
        bh5 = ah5;
        bh6 = ah6;
        bh7 = ah7;

        bl0 = al0;
        bl1 = al1;
        bl2 = al2;
        bl3 = al3;
        bl4 = al4;
        bl5 = al5;
        bl6 = al6;
        bl7 = al7;

        // add
        h = ah7;
        l = al7;

        a = l & 0xffff; b = l >>> 16;
        c = h & 0xffff; d = h >>> 16;

        // Sigma1
        h = ((ah4 >>> 14) | (al4 << (32-14))) ^ ((ah4 >>> 18) | (al4 << (32-18))) ^ ((al4 >>> (41-32)) | (ah4 << (32-(41-32))));
        l = ((al4 >>> 14) | (ah4 << (32-14))) ^ ((al4 >>> 18) | (ah4 << (32-18))) ^ ((ah4 >>> (41-32)) | (al4 << (32-(41-32))));

        a += l & 0xffff; b += l >>> 16;
        c += h & 0xffff; d += h >>> 16;

        // Ch
        h = (ah4 & ah5) ^ (~ah4 & ah6);
        l = (al4 & al5) ^ (~al4 & al6);

        a += l & 0xffff; b += l >>> 16;
        c += h & 0xffff; d += h >>> 16;

        // K
        h = K[i*2];
        l = K[i*2+1];

        a += l & 0xffff; b += l >>> 16;
        c += h & 0xffff; d += h >>> 16;

        // w
        h = wh[i%16];
        l = wl[i%16];

        a += l & 0xffff; b += l >>> 16;
        c += h & 0xffff; d += h >>> 16;

        b += a >>> 16;
        c += b >>> 16;
        d += c >>> 16;

        th = c & 0xffff | d << 16;
        tl = a & 0xffff | b << 16;

        // add
        h = th;
        l = tl;

        a = l & 0xffff; b = l >>> 16;
        c = h & 0xffff; d = h >>> 16;

        // Sigma0
        h = ((ah0 >>> 28) | (al0 << (32-28))) ^ ((al0 >>> (34-32)) | (ah0 << (32-(34-32)))) ^ ((al0 >>> (39-32)) | (ah0 << (32-(39-32))));
        l = ((al0 >>> 28) | (ah0 << (32-28))) ^ ((ah0 >>> (34-32)) | (al0 << (32-(34-32)))) ^ ((ah0 >>> (39-32)) | (al0 << (32-(39-32))));

        a += l & 0xffff; b += l >>> 16;
        c += h & 0xffff; d += h >>> 16;

        // Maj
        h = (ah0 & ah1) ^ (ah0 & ah2) ^ (ah1 & ah2);
        l = (al0 & al1) ^ (al0 & al2) ^ (al1 & al2);

        a += l & 0xffff; b += l >>> 16;
        c += h & 0xffff; d += h >>> 16;

        b += a >>> 16;
        c += b >>> 16;
        d += c >>> 16;

        bh7 = (c & 0xffff) | (d << 16);
        bl7 = (a & 0xffff) | (b << 16);

        // add
        h = bh3;
        l = bl3;

        a = l & 0xffff; b = l >>> 16;
        c = h & 0xffff; d = h >>> 16;

        h = th;
        l = tl;

        a += l & 0xffff; b += l >>> 16;
        c += h & 0xffff; d += h >>> 16;

        b += a >>> 16;
        c += b >>> 16;
        d += c >>> 16;

        bh3 = (c & 0xffff) | (d << 16);
        bl3 = (a & 0xffff) | (b << 16);

        ah1 = bh0;
        ah2 = bh1;
        ah3 = bh2;
        ah4 = bh3;
        ah5 = bh4;
        ah6 = bh5;
        ah7 = bh6;
        ah0 = bh7;

        al1 = bl0;
        al2 = bl1;
        al3 = bl2;
        al4 = bl3;
        al5 = bl4;
        al6 = bl5;
        al7 = bl6;
        al0 = bl7;

        if (i%16 === 15) {
          for (j = 0; j < 16; j++) {
            // add
            h = wh[j];
            l = wl[j];

            a = l & 0xffff; b = l >>> 16;
            c = h & 0xffff; d = h >>> 16;

            h = wh[(j+9)%16];
            l = wl[(j+9)%16];

            a += l & 0xffff; b += l >>> 16;
            c += h & 0xffff; d += h >>> 16;

            // sigma0
            th = wh[(j+1)%16];
            tl = wl[(j+1)%16];
            h = ((th >>> 1) | (tl << (32-1))) ^ ((th >>> 8) | (tl << (32-8))) ^ (th >>> 7);
            l = ((tl >>> 1) | (th << (32-1))) ^ ((tl >>> 8) | (th << (32-8))) ^ ((tl >>> 7) | (th << (32-7)));

            a += l & 0xffff; b += l >>> 16;
            c += h & 0xffff; d += h >>> 16;

            // sigma1
            th = wh[(j+14)%16];
            tl = wl[(j+14)%16];
            h = ((th >>> 19) | (tl << (32-19))) ^ ((tl >>> (61-32)) | (th << (32-(61-32)))) ^ (th >>> 6);
            l = ((tl >>> 19) | (th << (32-19))) ^ ((th >>> (61-32)) | (tl << (32-(61-32)))) ^ ((tl >>> 6) | (th << (32-6)));

            a += l & 0xffff; b += l >>> 16;
            c += h & 0xffff; d += h >>> 16;

            b += a >>> 16;
            c += b >>> 16;
            d += c >>> 16;

            wh[j] = (c & 0xffff) | (d << 16);
            wl[j] = (a & 0xffff) | (b << 16);
          }
        }
      }

      // add
      h = ah0;
      l = al0;

      a = l & 0xffff; b = l >>> 16;
      c = h & 0xffff; d = h >>> 16;

      h = hh[0];
      l = hl[0];

      a += l & 0xffff; b += l >>> 16;
      c += h & 0xffff; d += h >>> 16;

      b += a >>> 16;
      c += b >>> 16;
      d += c >>> 16;

      hh[0] = ah0 = (c & 0xffff) | (d << 16);
      hl[0] = al0 = (a & 0xffff) | (b << 16);

      h = ah1;
      l = al1;

      a = l & 0xffff; b = l >>> 16;
      c = h & 0xffff; d = h >>> 16;

      h = hh[1];
      l = hl[1];

      a += l & 0xffff; b += l >>> 16;
      c += h & 0xffff; d += h >>> 16;

      b += a >>> 16;
      c += b >>> 16;
      d += c >>> 16;

      hh[1] = ah1 = (c & 0xffff) | (d << 16);
      hl[1] = al1 = (a & 0xffff) | (b << 16);

      h = ah2;
      l = al2;

      a = l & 0xffff; b = l >>> 16;
      c = h & 0xffff; d = h >>> 16;

      h = hh[2];
      l = hl[2];

      a += l & 0xffff; b += l >>> 16;
      c += h & 0xffff; d += h >>> 16;

      b += a >>> 16;
      c += b >>> 16;
      d += c >>> 16;

      hh[2] = ah2 = (c & 0xffff) | (d << 16);
      hl[2] = al2 = (a & 0xffff) | (b << 16);

      h = ah3;
      l = al3;

      a = l & 0xffff; b = l >>> 16;
      c = h & 0xffff; d = h >>> 16;

      h = hh[3];
      l = hl[3];

      a += l & 0xffff; b += l >>> 16;
      c += h & 0xffff; d += h >>> 16;

      b += a >>> 16;
      c += b >>> 16;
      d += c >>> 16;

      hh[3] = ah3 = (c & 0xffff) | (d << 16);
      hl[3] = al3 = (a & 0xffff) | (b << 16);

      h = ah4;
      l = al4;

      a = l & 0xffff; b = l >>> 16;
      c = h & 0xffff; d = h >>> 16;

      h = hh[4];
      l = hl[4];

      a += l & 0xffff; b += l >>> 16;
      c += h & 0xffff; d += h >>> 16;

      b += a >>> 16;
      c += b >>> 16;
      d += c >>> 16;

      hh[4] = ah4 = (c & 0xffff) | (d << 16);
      hl[4] = al4 = (a & 0xffff) | (b << 16);

      h = ah5;
      l = al5;

      a = l & 0xffff; b = l >>> 16;
      c = h & 0xffff; d = h >>> 16;

      h = hh[5];
      l = hl[5];

      a += l & 0xffff; b += l >>> 16;
      c += h & 0xffff; d += h >>> 16;

      b += a >>> 16;
      c += b >>> 16;
      d += c >>> 16;

      hh[5] = ah5 = (c & 0xffff) | (d << 16);
      hl[5] = al5 = (a & 0xffff) | (b << 16);

      h = ah6;
      l = al6;

      a = l & 0xffff; b = l >>> 16;
      c = h & 0xffff; d = h >>> 16;

      h = hh[6];
      l = hl[6];

      a += l & 0xffff; b += l >>> 16;
      c += h & 0xffff; d += h >>> 16;

      b += a >>> 16;
      c += b >>> 16;
      d += c >>> 16;

      hh[6] = ah6 = (c & 0xffff) | (d << 16);
      hl[6] = al6 = (a & 0xffff) | (b << 16);

      h = ah7;
      l = al7;

      a = l & 0xffff; b = l >>> 16;
      c = h & 0xffff; d = h >>> 16;

      h = hh[7];
      l = hl[7];

      a += l & 0xffff; b += l >>> 16;
      c += h & 0xffff; d += h >>> 16;

      b += a >>> 16;
      c += b >>> 16;
      d += c >>> 16;

      hh[7] = ah7 = (c & 0xffff) | (d << 16);
      hl[7] = al7 = (a & 0xffff) | (b << 16);

      pos += 128;
      n -= 128;
    }

    return n;
  }

  function crypto_hash(out, m, n) {
    var hh = new Int32Array(8),
        hl = new Int32Array(8),
        x = new Uint8Array(256),
        i, b = n;

    hh[0] = 0x6a09e667;
    hh[1] = 0xbb67ae85;
    hh[2] = 0x3c6ef372;
    hh[3] = 0xa54ff53a;
    hh[4] = 0x510e527f;
    hh[5] = 0x9b05688c;
    hh[6] = 0x1f83d9ab;
    hh[7] = 0x5be0cd19;

    hl[0] = 0xf3bcc908;
    hl[1] = 0x84caa73b;
    hl[2] = 0xfe94f82b;
    hl[3] = 0x5f1d36f1;
    hl[4] = 0xade682d1;
    hl[5] = 0x2b3e6c1f;
    hl[6] = 0xfb41bd6b;
    hl[7] = 0x137e2179;

    crypto_hashblocks_hl(hh, hl, m, n);
    n %= 128;

    for (i = 0; i < n; i++) x[i] = m[b-n+i];
    x[n] = 128;

    n = 256-128*(n<112?1:0);
    x[n-9] = 0;
    ts64(x, n-8,  (b / 0x20000000) | 0, b << 3);
    crypto_hashblocks_hl(hh, hl, x, n);

    for (i = 0; i < 8; i++) ts64(out, 8*i, hh[i], hl[i]);

    return 0;
  }

  function add(p, q) {
    var a = gf(), b = gf(), c = gf(),
        d = gf(), e = gf(), f = gf(),
        g = gf(), h = gf(), t = gf();

    Z(a, p[1], p[0]);
    Z(t, q[1], q[0]);
    M(a, a, t);
    A(b, p[0], p[1]);
    A(t, q[0], q[1]);
    M(b, b, t);
    M(c, p[3], q[3]);
    M(c, c, D2);
    M(d, p[2], q[2]);
    A(d, d, d);
    Z(e, b, a);
    Z(f, d, c);
    A(g, d, c);
    A(h, b, a);

    M(p[0], e, f);
    M(p[1], h, g);
    M(p[2], g, f);
    M(p[3], e, h);
  }

  function cswap(p, q, b) {
    var i;
    for (i = 0; i < 4; i++) {
      sel25519(p[i], q[i], b);
    }
  }

  function pack(r, p) {
    var tx = gf(), ty = gf(), zi = gf();
    inv25519(zi, p[2]);
    M(tx, p[0], zi);
    M(ty, p[1], zi);
    pack25519(r, ty);
    r[31] ^= par25519(tx) << 7;
  }

  function scalarmult(p, q, s) {
    var b, i;
    set25519(p[0], gf0);
    set25519(p[1], gf1);
    set25519(p[2], gf1);
    set25519(p[3], gf0);
    for (i = 255; i >= 0; --i) {
      b = (s[(i/8)|0] >> (i&7)) & 1;
      cswap(p, q, b);
      add(q, p);
      add(p, p);
      cswap(p, q, b);
    }
  }

  function scalarbase(p, s) {
    var q = [gf(), gf(), gf(), gf()];
    set25519(q[0], X);
    set25519(q[1], Y);
    set25519(q[2], gf1);
    M(q[3], X, Y);
    scalarmult(p, q, s);
  }

  function crypto_sign_keypair(pk, sk, seeded) {
    var d = new Uint8Array(64);
    var p = [gf(), gf(), gf(), gf()];
    var i;

    if (!seeded) randombytes(sk, 32);
    crypto_hash(d, sk, 32);
    d[0] &= 248;
    d[31] &= 127;
    d[31] |= 64;

    scalarbase(p, d);
    pack(pk, p);

    for (i = 0; i < 32; i++) sk[i+32] = pk[i];
    return 0;
  }

  var L = new Float64Array([0xed, 0xd3, 0xf5, 0x5c, 0x1a, 0x63, 0x12, 0x58, 0xd6, 0x9c, 0xf7, 0xa2, 0xde, 0xf9, 0xde, 0x14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x10]);

  function modL(r, x) {
    var carry, i, j, k;
    for (i = 63; i >= 32; --i) {
      carry = 0;
      for (j = i - 32, k = i - 12; j < k; ++j) {
        x[j] += carry - 16 * x[i] * L[j - (i - 32)];
        carry = Math.floor((x[j] + 128) / 256);
        x[j] -= carry * 256;
      }
      x[j] += carry;
      x[i] = 0;
    }
    carry = 0;
    for (j = 0; j < 32; j++) {
      x[j] += carry - (x[31] >> 4) * L[j];
      carry = x[j] >> 8;
      x[j] &= 255;
    }
    for (j = 0; j < 32; j++) x[j] -= carry * L[j];
    for (i = 0; i < 32; i++) {
      x[i+1] += x[i] >> 8;
      r[i] = x[i] & 255;
    }
  }

  function reduce(r) {
    var x = new Float64Array(64), i;
    for (i = 0; i < 64; i++) x[i] = r[i];
    for (i = 0; i < 64; i++) r[i] = 0;
    modL(r, x);
  }

  // Note: difference from C - smlen returned, not passed as argument.
  function crypto_sign(sm, m, n, sk) {
    var d = new Uint8Array(64), h = new Uint8Array(64), r = new Uint8Array(64);
    var i, j, x = new Float64Array(64);
    var p = [gf(), gf(), gf(), gf()];

    crypto_hash(d, sk, 32);
    d[0] &= 248;
    d[31] &= 127;
    d[31] |= 64;

    var smlen = n + 64;
    for (i = 0; i < n; i++) sm[64 + i] = m[i];
    for (i = 0; i < 32; i++) sm[32 + i] = d[32 + i];

    crypto_hash(r, sm.subarray(32), n+32);
    reduce(r);
    scalarbase(p, r);
    pack(sm, p);

    for (i = 32; i < 64; i++) sm[i] = sk[i];
    crypto_hash(h, sm, n + 64);
    reduce(h);

    for (i = 0; i < 64; i++) x[i] = 0;
    for (i = 0; i < 32; i++) x[i] = r[i];
    for (i = 0; i < 32; i++) {
      for (j = 0; j < 32; j++) {
        x[i+j] += h[i] * d[j];
      }
    }

    modL(sm.subarray(32), x);
    return smlen;
  }

  function unpackneg(r, p) {
    var t = gf(), chk = gf(), num = gf(),
        den = gf(), den2 = gf(), den4 = gf(),
        den6 = gf();

    set25519(r[2], gf1);
    unpack25519(r[1], p);
    S(num, r[1]);
    M(den, num, D);
    Z(num, num, r[2]);
    A(den, r[2], den);

    S(den2, den);
    S(den4, den2);
    M(den6, den4, den2);
    M(t, den6, num);
    M(t, t, den);

    pow2523(t, t);
    M(t, t, num);
    M(t, t, den);
    M(t, t, den);
    M(r[0], t, den);

    S(chk, r[0]);
    M(chk, chk, den);
    if (neq25519(chk, num)) M(r[0], r[0], I);

    S(chk, r[0]);
    M(chk, chk, den);
    if (neq25519(chk, num)) return -1;

    if (par25519(r[0]) === (p[31]>>7)) Z(r[0], gf0, r[0]);

    M(r[3], r[0], r[1]);
    return 0;
  }

  function crypto_sign_open(m, sm, n, pk) {
    var i;
    var t = new Uint8Array(32), h = new Uint8Array(64);
    var p = [gf(), gf(), gf(), gf()],
        q = [gf(), gf(), gf(), gf()];

    if (n < 64) return -1;

    if (unpackneg(q, pk)) return -1;

    for (i = 0; i < n; i++) m[i] = sm[i];
    for (i = 0; i < 32; i++) m[i+32] = pk[i];
    crypto_hash(h, m, n);
    reduce(h);
    scalarmult(p, q, h);

    scalarbase(q, sm.subarray(32));
    add(p, q);
    pack(t, p);

    n -= 64;
    if (crypto_verify_32(sm, 0, t, 0)) {
      for (i = 0; i < n; i++) m[i] = 0;
      return -1;
    }

    for (i = 0; i < n; i++) m[i] = sm[i + 64];
    return n;
  }

  var crypto_secretbox_KEYBYTES = 32,
      crypto_secretbox_NONCEBYTES = 24,
      crypto_secretbox_ZEROBYTES = 32,
      crypto_secretbox_BOXZEROBYTES = 16,
      crypto_scalarmult_BYTES = 32,
      crypto_scalarmult_SCALARBYTES = 32,
      crypto_box_PUBLICKEYBYTES = 32,
      crypto_box_SECRETKEYBYTES = 32,
      crypto_box_BEFORENMBYTES = 32,
      crypto_box_NONCEBYTES = crypto_secretbox_NONCEBYTES,
      crypto_box_ZEROBYTES = crypto_secretbox_ZEROBYTES,
      crypto_box_BOXZEROBYTES = crypto_secretbox_BOXZEROBYTES,
      crypto_sign_BYTES = 64,
      crypto_sign_PUBLICKEYBYTES = 32,
      crypto_sign_SECRETKEYBYTES = 64,
      crypto_sign_SEEDBYTES = 32,
      crypto_hash_BYTES = 64;

  nacl.lowlevel = {
    crypto_core_hsalsa20: crypto_core_hsalsa20,
    crypto_stream_xor: crypto_stream_xor,
    crypto_stream: crypto_stream,
    crypto_stream_salsa20_xor: crypto_stream_salsa20_xor,
    crypto_stream_salsa20: crypto_stream_salsa20,
    crypto_onetimeauth: crypto_onetimeauth,
    crypto_onetimeauth_verify: crypto_onetimeauth_verify,
    crypto_verify_16: crypto_verify_16,
    crypto_verify_32: crypto_verify_32,
    crypto_secretbox: crypto_secretbox,
    crypto_secretbox_open: crypto_secretbox_open,
    crypto_scalarmult: crypto_scalarmult,
    crypto_scalarmult_base: crypto_scalarmult_base,
    crypto_box_beforenm: crypto_box_beforenm,
    crypto_box_afternm: crypto_box_afternm,
    crypto_box: crypto_box,
    crypto_box_open: crypto_box_open,
    crypto_box_keypair: crypto_box_keypair,
    crypto_hash: crypto_hash,
    crypto_sign: crypto_sign,
    crypto_sign_keypair: crypto_sign_keypair,
    crypto_sign_open: crypto_sign_open,

    crypto_secretbox_KEYBYTES: crypto_secretbox_KEYBYTES,
    crypto_secretbox_NONCEBYTES: crypto_secretbox_NONCEBYTES,
    crypto_secretbox_ZEROBYTES: crypto_secretbox_ZEROBYTES,
    crypto_secretbox_BOXZEROBYTES: crypto_secretbox_BOXZEROBYTES,
    crypto_scalarmult_BYTES: crypto_scalarmult_BYTES,
    crypto_scalarmult_SCALARBYTES: crypto_scalarmult_SCALARBYTES,
    crypto_box_PUBLICKEYBYTES: crypto_box_PUBLICKEYBYTES,
    crypto_box_SECRETKEYBYTES: crypto_box_SECRETKEYBYTES,
    crypto_box_BEFORENMBYTES: crypto_box_BEFORENMBYTES,
    crypto_box_NONCEBYTES: crypto_box_NONCEBYTES,
    crypto_box_ZEROBYTES: crypto_box_ZEROBYTES,
    crypto_box_BOXZEROBYTES: crypto_box_BOXZEROBYTES,
    crypto_sign_BYTES: crypto_sign_BYTES,
    crypto_sign_PUBLICKEYBYTES: crypto_sign_PUBLICKEYBYTES,
    crypto_sign_SECRETKEYBYTES: crypto_sign_SECRETKEYBYTES,
    crypto_sign_SEEDBYTES: crypto_sign_SEEDBYTES,
    crypto_hash_BYTES: crypto_hash_BYTES,

    gf: gf,
    D: D,
    L: L,
    pack25519: pack25519,
    unpack25519: unpack25519,
    M: M,
    A: A,
    S: S,
    Z: Z,
    pow2523: pow2523,
    add: add,
    set25519: set25519,
    modL: modL,
    scalarmult: scalarmult,
    scalarbase: scalarbase,
  };

  /* High-level API */

  function checkLengths(k, n) {
    if (k.length !== crypto_secretbox_KEYBYTES) throw new Error('bad key size');
    if (n.length !== crypto_secretbox_NONCEBYTES) throw new Error('bad nonce size');
  }

  function checkBoxLengths(pk, sk) {
    if (pk.length !== crypto_box_PUBLICKEYBYTES) throw new Error('bad public key size');
    if (sk.length !== crypto_box_SECRETKEYBYTES) throw new Error('bad secret key size');
  }

  function checkArrayTypes() {
    for (var i = 0; i < arguments.length; i++) {
      if (!(arguments[i] instanceof Uint8Array))
        throw new TypeError('unexpected type, use Uint8Array');
    }
  }

  function cleanup(arr) {
    for (var i = 0; i < arr.length; i++) arr[i] = 0;
  }

  nacl.randomBytes = function(n) {
    var b = new Uint8Array(n);
    randombytes(b, n);
    return b;
  };

  nacl.secretbox = function(msg, nonce, key) {
    checkArrayTypes(msg, nonce, key);
    checkLengths(key, nonce);
    var m = new Uint8Array(crypto_secretbox_ZEROBYTES + msg.length);
    var c = new Uint8Array(m.length);
    for (var i = 0; i < msg.length; i++) m[i+crypto_secretbox_ZEROBYTES] = msg[i];
    crypto_secretbox(c, m, m.length, nonce, key);
    return c.subarray(crypto_secretbox_BOXZEROBYTES);
  };

  nacl.secretbox.open = function(box, nonce, key) {
    checkArrayTypes(box, nonce, key);
    checkLengths(key, nonce);
    var c = new Uint8Array(crypto_secretbox_BOXZEROBYTES + box.length);
    var m = new Uint8Array(c.length);
    for (var i = 0; i < box.length; i++) c[i+crypto_secretbox_BOXZEROBYTES] = box[i];
    if (c.length < 32) return null;
    if (crypto_secretbox_open(m, c, c.length, nonce, key) !== 0) return null;
    return m.subarray(crypto_secretbox_ZEROBYTES);
  };

  nacl.secretbox.keyLength = crypto_secretbox_KEYBYTES;
  nacl.secretbox.nonceLength = crypto_secretbox_NONCEBYTES;
  nacl.secretbox.overheadLength = crypto_secretbox_BOXZEROBYTES;

  nacl.scalarMult = function(n, p) {
    checkArrayTypes(n, p);
    if (n.length !== crypto_scalarmult_SCALARBYTES) throw new Error('bad n size');
    if (p.length !== crypto_scalarmult_BYTES) throw new Error('bad p size');
    var q = new Uint8Array(crypto_scalarmult_BYTES);
    crypto_scalarmult(q, n, p);
    return q;
  };

  nacl.scalarMult.base = function(n) {
    checkArrayTypes(n);
    if (n.length !== crypto_scalarmult_SCALARBYTES) throw new Error('bad n size');
    var q = new Uint8Array(crypto_scalarmult_BYTES);
    crypto_scalarmult_base(q, n);
    return q;
  };

  nacl.scalarMult.scalarLength = crypto_scalarmult_SCALARBYTES;
  nacl.scalarMult.groupElementLength = crypto_scalarmult_BYTES;

  nacl.box = function(msg, nonce, publicKey, secretKey) {
    var k = nacl.box.before(publicKey, secretKey);
    return nacl.secretbox(msg, nonce, k);
  };

  nacl.box.before = function(publicKey, secretKey) {
    checkArrayTypes(publicKey, secretKey);
    checkBoxLengths(publicKey, secretKey);
    var k = new Uint8Array(crypto_box_BEFORENMBYTES);
    crypto_box_beforenm(k, publicKey, secretKey);
    return k;
  };

  nacl.box.after = nacl.secretbox;

  nacl.box.open = function(msg, nonce, publicKey, secretKey) {
    var k = nacl.box.before(publicKey, secretKey);
    return nacl.secretbox.open(msg, nonce, k);
  };

  nacl.box.open.after = nacl.secretbox.open;

  nacl.box.keyPair = function() {
    var pk = new Uint8Array(crypto_box_PUBLICKEYBYTES);
    var sk = new Uint8Array(crypto_box_SECRETKEYBYTES);
    crypto_box_keypair(pk, sk);
    return {publicKey: pk, secretKey: sk};
  };

  nacl.box.keyPair.fromSecretKey = function(secretKey) {
    checkArrayTypes(secretKey);
    if (secretKey.length !== crypto_box_SECRETKEYBYTES)
      throw new Error('bad secret key size');
    var pk = new Uint8Array(crypto_box_PUBLICKEYBYTES);
    crypto_scalarmult_base(pk, secretKey);
    return {publicKey: pk, secretKey: new Uint8Array(secretKey)};
  };

  nacl.box.publicKeyLength = crypto_box_PUBLICKEYBYTES;
  nacl.box.secretKeyLength = crypto_box_SECRETKEYBYTES;
  nacl.box.sharedKeyLength = crypto_box_BEFORENMBYTES;
  nacl.box.nonceLength = crypto_box_NONCEBYTES;
  nacl.box.overheadLength = nacl.secretbox.overheadLength;

  nacl.sign = function(msg, secretKey) {
    checkArrayTypes(msg, secretKey);
    if (secretKey.length !== crypto_sign_SECRETKEYBYTES)
      throw new Error('bad secret key size');
    var signedMsg = new Uint8Array(crypto_sign_BYTES+msg.length);
    crypto_sign(signedMsg, msg, msg.length, secretKey);
    return signedMsg;
  };

  nacl.sign.open = function(signedMsg, publicKey) {
    checkArrayTypes(signedMsg, publicKey);
    if (publicKey.length !== crypto_sign_PUBLICKEYBYTES)
      throw new Error('bad public key size');
    var tmp = new Uint8Array(signedMsg.length);
    var mlen = crypto_sign_open(tmp, signedMsg, signedMsg.length, publicKey);
    if (mlen < 0) return null;
    var m = new Uint8Array(mlen);
    for (var i = 0; i < m.length; i++) m[i] = tmp[i];
    return m;
  };

  nacl.sign.detached = function(msg, secretKey) {
    var signedMsg = nacl.sign(msg, secretKey);
    var sig = new Uint8Array(crypto_sign_BYTES);
    for (var i = 0; i < sig.length; i++) sig[i] = signedMsg[i];
    return sig;
  };

  nacl.sign.detached.verify = function(msg, sig, publicKey) {
    checkArrayTypes(msg, sig, publicKey);
    if (sig.length !== crypto_sign_BYTES)
      throw new Error('bad signature size');
    if (publicKey.length !== crypto_sign_PUBLICKEYBYTES)
      throw new Error('bad public key size');
    var sm = new Uint8Array(crypto_sign_BYTES + msg.length);
    var m = new Uint8Array(crypto_sign_BYTES + msg.length);
    var i;
    for (i = 0; i < crypto_sign_BYTES; i++) sm[i] = sig[i];
    for (i = 0; i < msg.length; i++) sm[i+crypto_sign_BYTES] = msg[i];
    return (crypto_sign_open(m, sm, sm.length, publicKey) >= 0);
  };

  nacl.sign.keyPair = function() {
    var pk = new Uint8Array(crypto_sign_PUBLICKEYBYTES);
    var sk = new Uint8Array(crypto_sign_SECRETKEYBYTES);
    crypto_sign_keypair(pk, sk);
    return {publicKey: pk, secretKey: sk};
  };

  nacl.sign.keyPair.fromSecretKey = function(secretKey) {
    checkArrayTypes(secretKey);
    if (secretKey.length !== crypto_sign_SECRETKEYBYTES)
      throw new Error('bad secret key size');
    var pk = new Uint8Array(crypto_sign_PUBLICKEYBYTES);
    for (var i = 0; i < pk.length; i++) pk[i] = secretKey[32+i];
    return {publicKey: pk, secretKey: new Uint8Array(secretKey)};
  };

  nacl.sign.keyPair.fromSeed = function(seed) {
    checkArrayTypes(seed);
    if (seed.length !== crypto_sign_SEEDBYTES)
      throw new Error('bad seed size');
    var pk = new Uint8Array(crypto_sign_PUBLICKEYBYTES);
    var sk = new Uint8Array(crypto_sign_SECRETKEYBYTES);
    for (var i = 0; i < 32; i++) sk[i] = seed[i];
    crypto_sign_keypair(pk, sk, true);
    return {publicKey: pk, secretKey: sk};
  };

  nacl.sign.publicKeyLength = crypto_sign_PUBLICKEYBYTES;
  nacl.sign.secretKeyLength = crypto_sign_SECRETKEYBYTES;
  nacl.sign.seedLength = crypto_sign_SEEDBYTES;
  nacl.sign.signatureLength = crypto_sign_BYTES;

  nacl.hash = function(msg) {
    checkArrayTypes(msg);
    var h = new Uint8Array(crypto_hash_BYTES);
    crypto_hash(h, msg, msg.length);
    return h;
  };

  nacl.hash.hashLength = crypto_hash_BYTES;

  nacl.verify = function(x, y) {
    checkArrayTypes(x, y);
    // Zero length arguments are considered not equal.
    if (x.length === 0 || y.length === 0) return false;
    if (x.length !== y.length) return false;
    return (vn(x, 0, y, 0, x.length) === 0) ? true : false;
  };

  nacl.setPRNG = function(fn) {
    randombytes = fn;
  };

  (function() {
    // Initialize PRNG if environment provides CSPRNG.
    // If not, methods calling randombytes will throw.
    var crypto = typeof self !== 'undefined' ? (self.crypto || self.msCrypto) : null;
    if (crypto && crypto.getRandomValues) {
      // Browsers.
      var QUOTA = 65536;
      nacl.setPRNG(function(x, n) {
        var i, v = new Uint8Array(n);
        for (i = 0; i < n; i += QUOTA) {
          crypto.getRandomValues(v.subarray(i, i + Math.min(n - i, QUOTA)));
        }
        for (i = 0; i < n; i++) x[i] = v[i];
        cleanup(v);
      });
    } else if (typeof commonjsRequire !== 'undefined') {
      // Node.js.
      crypto = require$$0$1;
      if (crypto && crypto.randomBytes) {
        nacl.setPRNG(function(x, n) {
          var i, v = crypto.randomBytes(n);
          for (i = 0; i < n; i++) x[i] = v[i];
          cleanup(v);
        });
      }
    }
  })();

  })(module.exports ? module.exports : (self.nacl = self.nacl || {}));
  });

  var byteLength_1 = byteLength;
  var toByteArray_1 = toByteArray;
  var fromByteArray_1 = fromByteArray;

  var lookup = [];
  var revLookup = [];
  var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;

  var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  for (var i$1 = 0, len = code.length; i$1 < len; ++i$1) {
    lookup[i$1] = code[i$1];
    revLookup[code.charCodeAt(i$1)] = i$1;
  }

  // Support decoding URL-safe base64 strings, as Node.js does.
  // See: https://en.wikipedia.org/wiki/Base64#URL_applications
  revLookup['-'.charCodeAt(0)] = 62;
  revLookup['_'.charCodeAt(0)] = 63;

  function getLens (b64) {
    var len = b64.length;

    if (len % 4 > 0) {
      throw new Error('Invalid string. Length must be a multiple of 4')
    }

    // Trim off extra bytes after placeholder bytes are found
    // See: https://github.com/beatgammit/base64-js/issues/42
    var validLen = b64.indexOf('=');
    if (validLen === -1) validLen = len;

    var placeHoldersLen = validLen === len
      ? 0
      : 4 - (validLen % 4);

    return [validLen, placeHoldersLen]
  }

  // base64 is 4/3 + up to two characters of the original data
  function byteLength (b64) {
    var lens = getLens(b64);
    var validLen = lens[0];
    var placeHoldersLen = lens[1];
    return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
  }

  function _byteLength (b64, validLen, placeHoldersLen) {
    return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
  }

  function toByteArray (b64) {
    var tmp;
    var lens = getLens(b64);
    var validLen = lens[0];
    var placeHoldersLen = lens[1];

    var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));

    var curByte = 0;

    // if there are placeholders, only get up to the last complete 4 chars
    var len = placeHoldersLen > 0
      ? validLen - 4
      : validLen;

    var i;
    for (i = 0; i < len; i += 4) {
      tmp =
        (revLookup[b64.charCodeAt(i)] << 18) |
        (revLookup[b64.charCodeAt(i + 1)] << 12) |
        (revLookup[b64.charCodeAt(i + 2)] << 6) |
        revLookup[b64.charCodeAt(i + 3)];
      arr[curByte++] = (tmp >> 16) & 0xFF;
      arr[curByte++] = (tmp >> 8) & 0xFF;
      arr[curByte++] = tmp & 0xFF;
    }

    if (placeHoldersLen === 2) {
      tmp =
        (revLookup[b64.charCodeAt(i)] << 2) |
        (revLookup[b64.charCodeAt(i + 1)] >> 4);
      arr[curByte++] = tmp & 0xFF;
    }

    if (placeHoldersLen === 1) {
      tmp =
        (revLookup[b64.charCodeAt(i)] << 10) |
        (revLookup[b64.charCodeAt(i + 1)] << 4) |
        (revLookup[b64.charCodeAt(i + 2)] >> 2);
      arr[curByte++] = (tmp >> 8) & 0xFF;
      arr[curByte++] = tmp & 0xFF;
    }

    return arr
  }

  function tripletToBase64 (num) {
    return lookup[num >> 18 & 0x3F] +
      lookup[num >> 12 & 0x3F] +
      lookup[num >> 6 & 0x3F] +
      lookup[num & 0x3F]
  }

  function encodeChunk (uint8, start, end) {
    var tmp;
    var output = [];
    for (var i = start; i < end; i += 3) {
      tmp =
        ((uint8[i] << 16) & 0xFF0000) +
        ((uint8[i + 1] << 8) & 0xFF00) +
        (uint8[i + 2] & 0xFF);
      output.push(tripletToBase64(tmp));
    }
    return output.join('')
  }

  function fromByteArray (uint8) {
    var tmp;
    var len = uint8.length;
    var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes
    var parts = [];
    var maxChunkLength = 16383; // must be multiple of 3

    // go through the array every three bytes, we'll deal with trailing stuff later
    for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
      parts.push(encodeChunk(
        uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
      ));
    }

    // pad the end with zeros, but make sure to not forget the extra bytes
    if (extraBytes === 1) {
      tmp = uint8[len - 1];
      parts.push(
        lookup[tmp >> 2] +
        lookup[(tmp << 4) & 0x3F] +
        '=='
      );
    } else if (extraBytes === 2) {
      tmp = (uint8[len - 2] << 8) + uint8[len - 1];
      parts.push(
        lookup[tmp >> 10] +
        lookup[(tmp >> 4) & 0x3F] +
        lookup[(tmp << 2) & 0x3F] +
        '='
      );
    }

    return parts.join('')
  }

  var base64Js = {
  	byteLength: byteLength_1,
  	toByteArray: toByteArray_1,
  	fromByteArray: fromByteArray_1
  };

  /*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
  var read = function (buffer, offset, isLE, mLen, nBytes) {
    var e, m;
    var eLen = (nBytes * 8) - mLen - 1;
    var eMax = (1 << eLen) - 1;
    var eBias = eMax >> 1;
    var nBits = -7;
    var i = isLE ? (nBytes - 1) : 0;
    var d = isLE ? -1 : 1;
    var s = buffer[offset + i];

    i += d;

    e = s & ((1 << (-nBits)) - 1);
    s >>= (-nBits);
    nBits += eLen;
    for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

    m = e & ((1 << (-nBits)) - 1);
    e >>= (-nBits);
    nBits += mLen;
    for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

    if (e === 0) {
      e = 1 - eBias;
    } else if (e === eMax) {
      return m ? NaN : ((s ? -1 : 1) * Infinity)
    } else {
      m = m + Math.pow(2, mLen);
      e = e - eBias;
    }
    return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
  };

  var write = function (buffer, value, offset, isLE, mLen, nBytes) {
    var e, m, c;
    var eLen = (nBytes * 8) - mLen - 1;
    var eMax = (1 << eLen) - 1;
    var eBias = eMax >> 1;
    var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0);
    var i = isLE ? 0 : (nBytes - 1);
    var d = isLE ? 1 : -1;
    var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

    value = Math.abs(value);

    if (isNaN(value) || value === Infinity) {
      m = isNaN(value) ? 1 : 0;
      e = eMax;
    } else {
      e = Math.floor(Math.log(value) / Math.LN2);
      if (value * (c = Math.pow(2, -e)) < 1) {
        e--;
        c *= 2;
      }
      if (e + eBias >= 1) {
        value += rt / c;
      } else {
        value += rt * Math.pow(2, 1 - eBias);
      }
      if (value * c >= 2) {
        e++;
        c /= 2;
      }

      if (e + eBias >= eMax) {
        m = 0;
        e = eMax;
      } else if (e + eBias >= 1) {
        m = ((value * c) - 1) * Math.pow(2, mLen);
        e = e + eBias;
      } else {
        m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
        e = 0;
      }
    }

    for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

    e = (e << mLen) | m;
    eLen += mLen;
    for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

    buffer[offset + i - d] |= s * 128;
  };

  var ieee754 = {
  	read: read,
  	write: write
  };

  /*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   */

  var buffer = createCommonjsModule(function (module, exports) {



  const customInspectSymbol =
    (typeof Symbol === 'function' && typeof Symbol['for'] === 'function') // eslint-disable-line dot-notation
      ? Symbol['for']('nodejs.util.inspect.custom') // eslint-disable-line dot-notation
      : null;

  exports.Buffer = Buffer;
  exports.SlowBuffer = SlowBuffer;
  exports.INSPECT_MAX_BYTES = 50;

  const K_MAX_LENGTH = 0x7fffffff;
  exports.kMaxLength = K_MAX_LENGTH;

  /**
   * If `Buffer.TYPED_ARRAY_SUPPORT`:
   *   === true    Use Uint8Array implementation (fastest)
   *   === false   Print warning and recommend using `buffer` v4.x which has an Object
   *               implementation (most compatible, even IE6)
   *
   * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
   * Opera 11.6+, iOS 4.2+.
   *
   * We report that the browser does not support typed arrays if the are not subclassable
   * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
   * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
   * for __proto__ and has a buggy typed array implementation.
   */
  Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport();

  if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
      typeof console.error === 'function') {
    console.error(
      'This browser lacks typed array (Uint8Array) support which is required by ' +
      '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
    );
  }

  function typedArraySupport () {
    // Can typed array instances can be augmented?
    try {
      const arr = new Uint8Array(1);
      const proto = { foo: function () { return 42 } };
      Object.setPrototypeOf(proto, Uint8Array.prototype);
      Object.setPrototypeOf(arr, proto);
      return arr.foo() === 42
    } catch (e) {
      return false
    }
  }

  Object.defineProperty(Buffer.prototype, 'parent', {
    enumerable: true,
    get: function () {
      if (!Buffer.isBuffer(this)) return undefined
      return this.buffer
    }
  });

  Object.defineProperty(Buffer.prototype, 'offset', {
    enumerable: true,
    get: function () {
      if (!Buffer.isBuffer(this)) return undefined
      return this.byteOffset
    }
  });

  function createBuffer (length) {
    if (length > K_MAX_LENGTH) {
      throw new RangeError('The value "' + length + '" is invalid for option "size"')
    }
    // Return an augmented `Uint8Array` instance
    const buf = new Uint8Array(length);
    Object.setPrototypeOf(buf, Buffer.prototype);
    return buf
  }

  /**
   * The Buffer constructor returns instances of `Uint8Array` that have their
   * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
   * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
   * and the `Uint8Array` methods. Square bracket notation works as expected -- it
   * returns a single octet.
   *
   * The `Uint8Array` prototype remains unmodified.
   */

  function Buffer (arg, encodingOrOffset, length) {
    // Common case.
    if (typeof arg === 'number') {
      if (typeof encodingOrOffset === 'string') {
        throw new TypeError(
          'The "string" argument must be of type string. Received type number'
        )
      }
      return allocUnsafe(arg)
    }
    return from(arg, encodingOrOffset, length)
  }

  Buffer.poolSize = 8192; // not used by this implementation

  function from (value, encodingOrOffset, length) {
    if (typeof value === 'string') {
      return fromString(value, encodingOrOffset)
    }

    if (ArrayBuffer.isView(value)) {
      return fromArrayView(value)
    }

    if (value == null) {
      throw new TypeError(
        'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
        'or Array-like Object. Received type ' + (typeof value)
      )
    }

    if (isInstance(value, ArrayBuffer) ||
        (value && isInstance(value.buffer, ArrayBuffer))) {
      return fromArrayBuffer(value, encodingOrOffset, length)
    }

    if (typeof SharedArrayBuffer !== 'undefined' &&
        (isInstance(value, SharedArrayBuffer) ||
        (value && isInstance(value.buffer, SharedArrayBuffer)))) {
      return fromArrayBuffer(value, encodingOrOffset, length)
    }

    if (typeof value === 'number') {
      throw new TypeError(
        'The "value" argument must not be of type number. Received type number'
      )
    }

    const valueOf = value.valueOf && value.valueOf();
    if (valueOf != null && valueOf !== value) {
      return Buffer.from(valueOf, encodingOrOffset, length)
    }

    const b = fromObject(value);
    if (b) return b

    if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&
        typeof value[Symbol.toPrimitive] === 'function') {
      return Buffer.from(value[Symbol.toPrimitive]('string'), encodingOrOffset, length)
    }

    throw new TypeError(
      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
      'or Array-like Object. Received type ' + (typeof value)
    )
  }

  /**
   * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
   * if value is a number.
   * Buffer.from(str[, encoding])
   * Buffer.from(array)
   * Buffer.from(buffer)
   * Buffer.from(arrayBuffer[, byteOffset[, length]])
   **/
  Buffer.from = function (value, encodingOrOffset, length) {
    return from(value, encodingOrOffset, length)
  };

  // Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
  // https://github.com/feross/buffer/pull/148
  Object.setPrototypeOf(Buffer.prototype, Uint8Array.prototype);
  Object.setPrototypeOf(Buffer, Uint8Array);

  function assertSize (size) {
    if (typeof size !== 'number') {
      throw new TypeError('"size" argument must be of type number')
    } else if (size < 0) {
      throw new RangeError('The value "' + size + '" is invalid for option "size"')
    }
  }

  function alloc (size, fill, encoding) {
    assertSize(size);
    if (size <= 0) {
      return createBuffer(size)
    }
    if (fill !== undefined) {
      // Only pay attention to encoding if it's a string. This
      // prevents accidentally sending in a number that would
      // be interpreted as a start offset.
      return typeof encoding === 'string'
        ? createBuffer(size).fill(fill, encoding)
        : createBuffer(size).fill(fill)
    }
    return createBuffer(size)
  }

  /**
   * Creates a new filled Buffer instance.
   * alloc(size[, fill[, encoding]])
   **/
  Buffer.alloc = function (size, fill, encoding) {
    return alloc(size, fill, encoding)
  };

  function allocUnsafe (size) {
    assertSize(size);
    return createBuffer(size < 0 ? 0 : checked(size) | 0)
  }

  /**
   * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
   * */
  Buffer.allocUnsafe = function (size) {
    return allocUnsafe(size)
  };
  /**
   * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
   */
  Buffer.allocUnsafeSlow = function (size) {
    return allocUnsafe(size)
  };

  function fromString (string, encoding) {
    if (typeof encoding !== 'string' || encoding === '') {
      encoding = 'utf8';
    }

    if (!Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }

    const length = byteLength(string, encoding) | 0;
    let buf = createBuffer(length);

    const actual = buf.write(string, encoding);

    if (actual !== length) {
      // Writing a hex string, for example, that contains invalid characters will
      // cause everything after the first invalid character to be ignored. (e.g.
      // 'abxxcd' will be treated as 'ab')
      buf = buf.slice(0, actual);
    }

    return buf
  }

  function fromArrayLike (array) {
    const length = array.length < 0 ? 0 : checked(array.length) | 0;
    const buf = createBuffer(length);
    for (let i = 0; i < length; i += 1) {
      buf[i] = array[i] & 255;
    }
    return buf
  }

  function fromArrayView (arrayView) {
    if (isInstance(arrayView, Uint8Array)) {
      const copy = new Uint8Array(arrayView);
      return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength)
    }
    return fromArrayLike(arrayView)
  }

  function fromArrayBuffer (array, byteOffset, length) {
    if (byteOffset < 0 || array.byteLength < byteOffset) {
      throw new RangeError('"offset" is outside of buffer bounds')
    }

    if (array.byteLength < byteOffset + (length || 0)) {
      throw new RangeError('"length" is outside of buffer bounds')
    }

    let buf;
    if (byteOffset === undefined && length === undefined) {
      buf = new Uint8Array(array);
    } else if (length === undefined) {
      buf = new Uint8Array(array, byteOffset);
    } else {
      buf = new Uint8Array(array, byteOffset, length);
    }

    // Return an augmented `Uint8Array` instance
    Object.setPrototypeOf(buf, Buffer.prototype);

    return buf
  }

  function fromObject (obj) {
    if (Buffer.isBuffer(obj)) {
      const len = checked(obj.length) | 0;
      const buf = createBuffer(len);

      if (buf.length === 0) {
        return buf
      }

      obj.copy(buf, 0, 0, len);
      return buf
    }

    if (obj.length !== undefined) {
      if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
        return createBuffer(0)
      }
      return fromArrayLike(obj)
    }

    if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
      return fromArrayLike(obj.data)
    }
  }

  function checked (length) {
    // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
    // length is NaN (which is otherwise coerced to zero.)
    if (length >= K_MAX_LENGTH) {
      throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                           'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
    }
    return length | 0
  }

  function SlowBuffer (length) {
    if (+length != length) { // eslint-disable-line eqeqeq
      length = 0;
    }
    return Buffer.alloc(+length)
  }

  Buffer.isBuffer = function isBuffer (b) {
    return b != null && b._isBuffer === true &&
      b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
  };

  Buffer.compare = function compare (a, b) {
    if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength);
    if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength);
    if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
      throw new TypeError(
        'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
      )
    }

    if (a === b) return 0

    let x = a.length;
    let y = b.length;

    for (let i = 0, len = Math.min(x, y); i < len; ++i) {
      if (a[i] !== b[i]) {
        x = a[i];
        y = b[i];
        break
      }
    }

    if (x < y) return -1
    if (y < x) return 1
    return 0
  };

  Buffer.isEncoding = function isEncoding (encoding) {
    switch (String(encoding).toLowerCase()) {
      case 'hex':
      case 'utf8':
      case 'utf-8':
      case 'ascii':
      case 'latin1':
      case 'binary':
      case 'base64':
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return true
      default:
        return false
    }
  };

  Buffer.concat = function concat (list, length) {
    if (!Array.isArray(list)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }

    if (list.length === 0) {
      return Buffer.alloc(0)
    }

    let i;
    if (length === undefined) {
      length = 0;
      for (i = 0; i < list.length; ++i) {
        length += list[i].length;
      }
    }

    const buffer = Buffer.allocUnsafe(length);
    let pos = 0;
    for (i = 0; i < list.length; ++i) {
      let buf = list[i];
      if (isInstance(buf, Uint8Array)) {
        if (pos + buf.length > buffer.length) {
          if (!Buffer.isBuffer(buf)) buf = Buffer.from(buf);
          buf.copy(buffer, pos);
        } else {
          Uint8Array.prototype.set.call(
            buffer,
            buf,
            pos
          );
        }
      } else if (!Buffer.isBuffer(buf)) {
        throw new TypeError('"list" argument must be an Array of Buffers')
      } else {
        buf.copy(buffer, pos);
      }
      pos += buf.length;
    }
    return buffer
  };

  function byteLength (string, encoding) {
    if (Buffer.isBuffer(string)) {
      return string.length
    }
    if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
      return string.byteLength
    }
    if (typeof string !== 'string') {
      throw new TypeError(
        'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
        'Received type ' + typeof string
      )
    }

    const len = string.length;
    const mustMatch = (arguments.length > 2 && arguments[2] === true);
    if (!mustMatch && len === 0) return 0

    // Use a for loop to avoid recursion
    let loweredCase = false;
    for (;;) {
      switch (encoding) {
        case 'ascii':
        case 'latin1':
        case 'binary':
          return len
        case 'utf8':
        case 'utf-8':
          return utf8ToBytes(string).length
        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
          return len * 2
        case 'hex':
          return len >>> 1
        case 'base64':
          return base64ToBytes(string).length
        default:
          if (loweredCase) {
            return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
          }
          encoding = ('' + encoding).toLowerCase();
          loweredCase = true;
      }
    }
  }
  Buffer.byteLength = byteLength;

  function slowToString (encoding, start, end) {
    let loweredCase = false;

    // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
    // property of a typed array.

    // This behaves neither like String nor Uint8Array in that we set start/end
    // to their upper/lower bounds if the value passed is out of range.
    // undefined is handled specially as per ECMA-262 6th Edition,
    // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
    if (start === undefined || start < 0) {
      start = 0;
    }
    // Return early if start > this.length. Done here to prevent potential uint32
    // coercion fail below.
    if (start > this.length) {
      return ''
    }

    if (end === undefined || end > this.length) {
      end = this.length;
    }

    if (end <= 0) {
      return ''
    }

    // Force coercion to uint32. This will also coerce falsey/NaN values to 0.
    end >>>= 0;
    start >>>= 0;

    if (end <= start) {
      return ''
    }

    if (!encoding) encoding = 'utf8';

    while (true) {
      switch (encoding) {
        case 'hex':
          return hexSlice(this, start, end)

        case 'utf8':
        case 'utf-8':
          return utf8Slice(this, start, end)

        case 'ascii':
          return asciiSlice(this, start, end)

        case 'latin1':
        case 'binary':
          return latin1Slice(this, start, end)

        case 'base64':
          return base64Slice(this, start, end)

        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
          return utf16leSlice(this, start, end)

        default:
          if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
          encoding = (encoding + '').toLowerCase();
          loweredCase = true;
      }
    }
  }

  // This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
  // to detect a Buffer instance. It's not possible to use `instanceof Buffer`
  // reliably in a browserify context because there could be multiple different
  // copies of the 'buffer' package in use. This method works even for Buffer
  // instances that were created from another copy of the `buffer` package.
  // See: https://github.com/feross/buffer/issues/154
  Buffer.prototype._isBuffer = true;

  function swap (b, n, m) {
    const i = b[n];
    b[n] = b[m];
    b[m] = i;
  }

  Buffer.prototype.swap16 = function swap16 () {
    const len = this.length;
    if (len % 2 !== 0) {
      throw new RangeError('Buffer size must be a multiple of 16-bits')
    }
    for (let i = 0; i < len; i += 2) {
      swap(this, i, i + 1);
    }
    return this
  };

  Buffer.prototype.swap32 = function swap32 () {
    const len = this.length;
    if (len % 4 !== 0) {
      throw new RangeError('Buffer size must be a multiple of 32-bits')
    }
    for (let i = 0; i < len; i += 4) {
      swap(this, i, i + 3);
      swap(this, i + 1, i + 2);
    }
    return this
  };

  Buffer.prototype.swap64 = function swap64 () {
    const len = this.length;
    if (len % 8 !== 0) {
      throw new RangeError('Buffer size must be a multiple of 64-bits')
    }
    for (let i = 0; i < len; i += 8) {
      swap(this, i, i + 7);
      swap(this, i + 1, i + 6);
      swap(this, i + 2, i + 5);
      swap(this, i + 3, i + 4);
    }
    return this
  };

  Buffer.prototype.toString = function toString () {
    const length = this.length;
    if (length === 0) return ''
    if (arguments.length === 0) return utf8Slice(this, 0, length)
    return slowToString.apply(this, arguments)
  };

  Buffer.prototype.toLocaleString = Buffer.prototype.toString;

  Buffer.prototype.equals = function equals (b) {
    if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
    if (this === b) return true
    return Buffer.compare(this, b) === 0
  };

  Buffer.prototype.inspect = function inspect () {
    let str = '';
    const max = exports.INSPECT_MAX_BYTES;
    str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim();
    if (this.length > max) str += ' ... ';
    return '<Buffer ' + str + '>'
  };
  if (customInspectSymbol) {
    Buffer.prototype[customInspectSymbol] = Buffer.prototype.inspect;
  }

  Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
    if (isInstance(target, Uint8Array)) {
      target = Buffer.from(target, target.offset, target.byteLength);
    }
    if (!Buffer.isBuffer(target)) {
      throw new TypeError(
        'The "target" argument must be one of type Buffer or Uint8Array. ' +
        'Received type ' + (typeof target)
      )
    }

    if (start === undefined) {
      start = 0;
    }
    if (end === undefined) {
      end = target ? target.length : 0;
    }
    if (thisStart === undefined) {
      thisStart = 0;
    }
    if (thisEnd === undefined) {
      thisEnd = this.length;
    }

    if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
      throw new RangeError('out of range index')
    }

    if (thisStart >= thisEnd && start >= end) {
      return 0
    }
    if (thisStart >= thisEnd) {
      return -1
    }
    if (start >= end) {
      return 1
    }

    start >>>= 0;
    end >>>= 0;
    thisStart >>>= 0;
    thisEnd >>>= 0;

    if (this === target) return 0

    let x = thisEnd - thisStart;
    let y = end - start;
    const len = Math.min(x, y);

    const thisCopy = this.slice(thisStart, thisEnd);
    const targetCopy = target.slice(start, end);

    for (let i = 0; i < len; ++i) {
      if (thisCopy[i] !== targetCopy[i]) {
        x = thisCopy[i];
        y = targetCopy[i];
        break
      }
    }

    if (x < y) return -1
    if (y < x) return 1
    return 0
  };

  // Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
  // OR the last index of `val` in `buffer` at offset <= `byteOffset`.
  //
  // Arguments:
  // - buffer - a Buffer to search
  // - val - a string, Buffer, or number
  // - byteOffset - an index into `buffer`; will be clamped to an int32
  // - encoding - an optional encoding, relevant is val is a string
  // - dir - true for indexOf, false for lastIndexOf
  function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
    // Empty buffer means no match
    if (buffer.length === 0) return -1

    // Normalize byteOffset
    if (typeof byteOffset === 'string') {
      encoding = byteOffset;
      byteOffset = 0;
    } else if (byteOffset > 0x7fffffff) {
      byteOffset = 0x7fffffff;
    } else if (byteOffset < -0x80000000) {
      byteOffset = -0x80000000;
    }
    byteOffset = +byteOffset; // Coerce to Number.
    if (numberIsNaN(byteOffset)) {
      // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
      byteOffset = dir ? 0 : (buffer.length - 1);
    }

    // Normalize byteOffset: negative offsets start from the end of the buffer
    if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
    if (byteOffset >= buffer.length) {
      if (dir) return -1
      else byteOffset = buffer.length - 1;
    } else if (byteOffset < 0) {
      if (dir) byteOffset = 0;
      else return -1
    }

    // Normalize val
    if (typeof val === 'string') {
      val = Buffer.from(val, encoding);
    }

    // Finally, search either indexOf (if dir is true) or lastIndexOf
    if (Buffer.isBuffer(val)) {
      // Special case: looking for empty string/buffer always fails
      if (val.length === 0) {
        return -1
      }
      return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
    } else if (typeof val === 'number') {
      val = val & 0xFF; // Search for a byte value [0-255]
      if (typeof Uint8Array.prototype.indexOf === 'function') {
        if (dir) {
          return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
        } else {
          return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
        }
      }
      return arrayIndexOf(buffer, [val], byteOffset, encoding, dir)
    }

    throw new TypeError('val must be string, number or Buffer')
  }

  function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
    let indexSize = 1;
    let arrLength = arr.length;
    let valLength = val.length;

    if (encoding !== undefined) {
      encoding = String(encoding).toLowerCase();
      if (encoding === 'ucs2' || encoding === 'ucs-2' ||
          encoding === 'utf16le' || encoding === 'utf-16le') {
        if (arr.length < 2 || val.length < 2) {
          return -1
        }
        indexSize = 2;
        arrLength /= 2;
        valLength /= 2;
        byteOffset /= 2;
      }
    }

    function read (buf, i) {
      if (indexSize === 1) {
        return buf[i]
      } else {
        return buf.readUInt16BE(i * indexSize)
      }
    }

    let i;
    if (dir) {
      let foundIndex = -1;
      for (i = byteOffset; i < arrLength; i++) {
        if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
          if (foundIndex === -1) foundIndex = i;
          if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
        } else {
          if (foundIndex !== -1) i -= i - foundIndex;
          foundIndex = -1;
        }
      }
    } else {
      if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
      for (i = byteOffset; i >= 0; i--) {
        let found = true;
        for (let j = 0; j < valLength; j++) {
          if (read(arr, i + j) !== read(val, j)) {
            found = false;
            break
          }
        }
        if (found) return i
      }
    }

    return -1
  }

  Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
    return this.indexOf(val, byteOffset, encoding) !== -1
  };

  Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
    return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
  };

  Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
    return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
  };

  function hexWrite (buf, string, offset, length) {
    offset = Number(offset) || 0;
    const remaining = buf.length - offset;
    if (!length) {
      length = remaining;
    } else {
      length = Number(length);
      if (length > remaining) {
        length = remaining;
      }
    }

    const strLen = string.length;

    if (length > strLen / 2) {
      length = strLen / 2;
    }
    let i;
    for (i = 0; i < length; ++i) {
      const parsed = parseInt(string.substr(i * 2, 2), 16);
      if (numberIsNaN(parsed)) return i
      buf[offset + i] = parsed;
    }
    return i
  }

  function utf8Write (buf, string, offset, length) {
    return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
  }

  function asciiWrite (buf, string, offset, length) {
    return blitBuffer(asciiToBytes(string), buf, offset, length)
  }

  function base64Write (buf, string, offset, length) {
    return blitBuffer(base64ToBytes(string), buf, offset, length)
  }

  function ucs2Write (buf, string, offset, length) {
    return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
  }

  Buffer.prototype.write = function write (string, offset, length, encoding) {
    // Buffer#write(string)
    if (offset === undefined) {
      encoding = 'utf8';
      length = this.length;
      offset = 0;
    // Buffer#write(string, encoding)
    } else if (length === undefined && typeof offset === 'string') {
      encoding = offset;
      length = this.length;
      offset = 0;
    // Buffer#write(string, offset[, length][, encoding])
    } else if (isFinite(offset)) {
      offset = offset >>> 0;
      if (isFinite(length)) {
        length = length >>> 0;
        if (encoding === undefined) encoding = 'utf8';
      } else {
        encoding = length;
        length = undefined;
      }
    } else {
      throw new Error(
        'Buffer.write(string, encoding, offset[, length]) is no longer supported'
      )
    }

    const remaining = this.length - offset;
    if (length === undefined || length > remaining) length = remaining;

    if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
      throw new RangeError('Attempt to write outside buffer bounds')
    }

    if (!encoding) encoding = 'utf8';

    let loweredCase = false;
    for (;;) {
      switch (encoding) {
        case 'hex':
          return hexWrite(this, string, offset, length)

        case 'utf8':
        case 'utf-8':
          return utf8Write(this, string, offset, length)

        case 'ascii':
        case 'latin1':
        case 'binary':
          return asciiWrite(this, string, offset, length)

        case 'base64':
          // Warning: maxLength not taken into account in base64Write
          return base64Write(this, string, offset, length)

        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
          return ucs2Write(this, string, offset, length)

        default:
          if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
          encoding = ('' + encoding).toLowerCase();
          loweredCase = true;
      }
    }
  };

  Buffer.prototype.toJSON = function toJSON () {
    return {
      type: 'Buffer',
      data: Array.prototype.slice.call(this._arr || this, 0)
    }
  };

  function base64Slice (buf, start, end) {
    if (start === 0 && end === buf.length) {
      return base64Js.fromByteArray(buf)
    } else {
      return base64Js.fromByteArray(buf.slice(start, end))
    }
  }

  function utf8Slice (buf, start, end) {
    end = Math.min(buf.length, end);
    const res = [];

    let i = start;
    while (i < end) {
      const firstByte = buf[i];
      let codePoint = null;
      let bytesPerSequence = (firstByte > 0xEF)
        ? 4
        : (firstByte > 0xDF)
            ? 3
            : (firstByte > 0xBF)
                ? 2
                : 1;

      if (i + bytesPerSequence <= end) {
        let secondByte, thirdByte, fourthByte, tempCodePoint;

        switch (bytesPerSequence) {
          case 1:
            if (firstByte < 0x80) {
              codePoint = firstByte;
            }
            break
          case 2:
            secondByte = buf[i + 1];
            if ((secondByte & 0xC0) === 0x80) {
              tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F);
              if (tempCodePoint > 0x7F) {
                codePoint = tempCodePoint;
              }
            }
            break
          case 3:
            secondByte = buf[i + 1];
            thirdByte = buf[i + 2];
            if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
              tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F);
              if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
                codePoint = tempCodePoint;
              }
            }
            break
          case 4:
            secondByte = buf[i + 1];
            thirdByte = buf[i + 2];
            fourthByte = buf[i + 3];
            if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
              tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F);
              if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
                codePoint = tempCodePoint;
              }
            }
        }
      }

      if (codePoint === null) {
        // we did not generate a valid codePoint so insert a
        // replacement char (U+FFFD) and advance only 1 byte
        codePoint = 0xFFFD;
        bytesPerSequence = 1;
      } else if (codePoint > 0xFFFF) {
        // encode to utf16 (surrogate pair dance)
        codePoint -= 0x10000;
        res.push(codePoint >>> 10 & 0x3FF | 0xD800);
        codePoint = 0xDC00 | codePoint & 0x3FF;
      }

      res.push(codePoint);
      i += bytesPerSequence;
    }

    return decodeCodePointsArray(res)
  }

  // Based on http://stackoverflow.com/a/22747272/680742, the browser with
  // the lowest limit is Chrome, with 0x10000 args.
  // We go 1 magnitude less, for safety
  const MAX_ARGUMENTS_LENGTH = 0x1000;

  function decodeCodePointsArray (codePoints) {
    const len = codePoints.length;
    if (len <= MAX_ARGUMENTS_LENGTH) {
      return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
    }

    // Decode in chunks to avoid "call stack size exceeded".
    let res = '';
    let i = 0;
    while (i < len) {
      res += String.fromCharCode.apply(
        String,
        codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
      );
    }
    return res
  }

  function asciiSlice (buf, start, end) {
    let ret = '';
    end = Math.min(buf.length, end);

    for (let i = start; i < end; ++i) {
      ret += String.fromCharCode(buf[i] & 0x7F);
    }
    return ret
  }

  function latin1Slice (buf, start, end) {
    let ret = '';
    end = Math.min(buf.length, end);

    for (let i = start; i < end; ++i) {
      ret += String.fromCharCode(buf[i]);
    }
    return ret
  }

  function hexSlice (buf, start, end) {
    const len = buf.length;

    if (!start || start < 0) start = 0;
    if (!end || end < 0 || end > len) end = len;

    let out = '';
    for (let i = start; i < end; ++i) {
      out += hexSliceLookupTable[buf[i]];
    }
    return out
  }

  function utf16leSlice (buf, start, end) {
    const bytes = buf.slice(start, end);
    let res = '';
    // If bytes.length is odd, the last 8 bits must be ignored (same as node.js)
    for (let i = 0; i < bytes.length - 1; i += 2) {
      res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256));
    }
    return res
  }

  Buffer.prototype.slice = function slice (start, end) {
    const len = this.length;
    start = ~~start;
    end = end === undefined ? len : ~~end;

    if (start < 0) {
      start += len;
      if (start < 0) start = 0;
    } else if (start > len) {
      start = len;
    }

    if (end < 0) {
      end += len;
      if (end < 0) end = 0;
    } else if (end > len) {
      end = len;
    }

    if (end < start) end = start;

    const newBuf = this.subarray(start, end);
    // Return an augmented `Uint8Array` instance
    Object.setPrototypeOf(newBuf, Buffer.prototype);

    return newBuf
  };

  /*
   * Need to make sure that buffer isn't trying to write out of bounds.
   */
  function checkOffset (offset, ext, length) {
    if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
    if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
  }

  Buffer.prototype.readUintLE =
  Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) checkOffset(offset, byteLength, this.length);

    let val = this[offset];
    let mul = 1;
    let i = 0;
    while (++i < byteLength && (mul *= 0x100)) {
      val += this[offset + i] * mul;
    }

    return val
  };

  Buffer.prototype.readUintBE =
  Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) {
      checkOffset(offset, byteLength, this.length);
    }

    let val = this[offset + --byteLength];
    let mul = 1;
    while (byteLength > 0 && (mul *= 0x100)) {
      val += this[offset + --byteLength] * mul;
    }

    return val
  };

  Buffer.prototype.readUint8 =
  Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 1, this.length);
    return this[offset]
  };

  Buffer.prototype.readUint16LE =
  Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 2, this.length);
    return this[offset] | (this[offset + 1] << 8)
  };

  Buffer.prototype.readUint16BE =
  Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 2, this.length);
    return (this[offset] << 8) | this[offset + 1]
  };

  Buffer.prototype.readUint32LE =
  Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);

    return ((this[offset]) |
        (this[offset + 1] << 8) |
        (this[offset + 2] << 16)) +
        (this[offset + 3] * 0x1000000)
  };

  Buffer.prototype.readUint32BE =
  Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);

    return (this[offset] * 0x1000000) +
      ((this[offset + 1] << 16) |
      (this[offset + 2] << 8) |
      this[offset + 3])
  };

  Buffer.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE (offset) {
    offset = offset >>> 0;
    validateNumber(offset, 'offset');
    const first = this[offset];
    const last = this[offset + 7];
    if (first === undefined || last === undefined) {
      boundsError(offset, this.length - 8);
    }

    const lo = first +
      this[++offset] * 2 ** 8 +
      this[++offset] * 2 ** 16 +
      this[++offset] * 2 ** 24;

    const hi = this[++offset] +
      this[++offset] * 2 ** 8 +
      this[++offset] * 2 ** 16 +
      last * 2 ** 24;

    return BigInt(lo) + (BigInt(hi) << BigInt(32))
  });

  Buffer.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE (offset) {
    offset = offset >>> 0;
    validateNumber(offset, 'offset');
    const first = this[offset];
    const last = this[offset + 7];
    if (first === undefined || last === undefined) {
      boundsError(offset, this.length - 8);
    }

    const hi = first * 2 ** 24 +
      this[++offset] * 2 ** 16 +
      this[++offset] * 2 ** 8 +
      this[++offset];

    const lo = this[++offset] * 2 ** 24 +
      this[++offset] * 2 ** 16 +
      this[++offset] * 2 ** 8 +
      last;

    return (BigInt(hi) << BigInt(32)) + BigInt(lo)
  });

  Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) checkOffset(offset, byteLength, this.length);

    let val = this[offset];
    let mul = 1;
    let i = 0;
    while (++i < byteLength && (mul *= 0x100)) {
      val += this[offset + i] * mul;
    }
    mul *= 0x80;

    if (val >= mul) val -= Math.pow(2, 8 * byteLength);

    return val
  };

  Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) checkOffset(offset, byteLength, this.length);

    let i = byteLength;
    let mul = 1;
    let val = this[offset + --i];
    while (i > 0 && (mul *= 0x100)) {
      val += this[offset + --i] * mul;
    }
    mul *= 0x80;

    if (val >= mul) val -= Math.pow(2, 8 * byteLength);

    return val
  };

  Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 1, this.length);
    if (!(this[offset] & 0x80)) return (this[offset])
    return ((0xff - this[offset] + 1) * -1)
  };

  Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 2, this.length);
    const val = this[offset] | (this[offset + 1] << 8);
    return (val & 0x8000) ? val | 0xFFFF0000 : val
  };

  Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 2, this.length);
    const val = this[offset + 1] | (this[offset] << 8);
    return (val & 0x8000) ? val | 0xFFFF0000 : val
  };

  Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);

    return (this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16) |
      (this[offset + 3] << 24)
  };

  Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);

    return (this[offset] << 24) |
      (this[offset + 1] << 16) |
      (this[offset + 2] << 8) |
      (this[offset + 3])
  };

  Buffer.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE (offset) {
    offset = offset >>> 0;
    validateNumber(offset, 'offset');
    const first = this[offset];
    const last = this[offset + 7];
    if (first === undefined || last === undefined) {
      boundsError(offset, this.length - 8);
    }

    const val = this[offset + 4] +
      this[offset + 5] * 2 ** 8 +
      this[offset + 6] * 2 ** 16 +
      (last << 24); // Overflow

    return (BigInt(val) << BigInt(32)) +
      BigInt(first +
      this[++offset] * 2 ** 8 +
      this[++offset] * 2 ** 16 +
      this[++offset] * 2 ** 24)
  });

  Buffer.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE (offset) {
    offset = offset >>> 0;
    validateNumber(offset, 'offset');
    const first = this[offset];
    const last = this[offset + 7];
    if (first === undefined || last === undefined) {
      boundsError(offset, this.length - 8);
    }

    const val = (first << 24) + // Overflow
      this[++offset] * 2 ** 16 +
      this[++offset] * 2 ** 8 +
      this[++offset];

    return (BigInt(val) << BigInt(32)) +
      BigInt(this[++offset] * 2 ** 24 +
      this[++offset] * 2 ** 16 +
      this[++offset] * 2 ** 8 +
      last)
  });

  Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return ieee754.read(this, offset, true, 23, 4)
  };

  Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return ieee754.read(this, offset, false, 23, 4)
  };

  Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 8, this.length);
    return ieee754.read(this, offset, true, 52, 8)
  };

  Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 8, this.length);
    return ieee754.read(this, offset, false, 52, 8)
  };

  function checkInt (buf, value, offset, ext, max, min) {
    if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
    if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
    if (offset + ext > buf.length) throw new RangeError('Index out of range')
  }

  Buffer.prototype.writeUintLE =
  Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) {
      const maxBytes = Math.pow(2, 8 * byteLength) - 1;
      checkInt(this, value, offset, byteLength, maxBytes, 0);
    }

    let mul = 1;
    let i = 0;
    this[offset] = value & 0xFF;
    while (++i < byteLength && (mul *= 0x100)) {
      this[offset + i] = (value / mul) & 0xFF;
    }

    return offset + byteLength
  };

  Buffer.prototype.writeUintBE =
  Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) {
      const maxBytes = Math.pow(2, 8 * byteLength) - 1;
      checkInt(this, value, offset, byteLength, maxBytes, 0);
    }

    let i = byteLength - 1;
    let mul = 1;
    this[offset + i] = value & 0xFF;
    while (--i >= 0 && (mul *= 0x100)) {
      this[offset + i] = (value / mul) & 0xFF;
    }

    return offset + byteLength
  };

  Buffer.prototype.writeUint8 =
  Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
    this[offset] = (value & 0xff);
    return offset + 1
  };

  Buffer.prototype.writeUint16LE =
  Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
    this[offset] = (value & 0xff);
    this[offset + 1] = (value >>> 8);
    return offset + 2
  };

  Buffer.prototype.writeUint16BE =
  Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
    this[offset] = (value >>> 8);
    this[offset + 1] = (value & 0xff);
    return offset + 2
  };

  Buffer.prototype.writeUint32LE =
  Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
    this[offset + 3] = (value >>> 24);
    this[offset + 2] = (value >>> 16);
    this[offset + 1] = (value >>> 8);
    this[offset] = (value & 0xff);
    return offset + 4
  };

  Buffer.prototype.writeUint32BE =
  Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
    this[offset] = (value >>> 24);
    this[offset + 1] = (value >>> 16);
    this[offset + 2] = (value >>> 8);
    this[offset + 3] = (value & 0xff);
    return offset + 4
  };

  function wrtBigUInt64LE (buf, value, offset, min, max) {
    checkIntBI(value, min, max, buf, offset, 7);

    let lo = Number(value & BigInt(0xffffffff));
    buf[offset++] = lo;
    lo = lo >> 8;
    buf[offset++] = lo;
    lo = lo >> 8;
    buf[offset++] = lo;
    lo = lo >> 8;
    buf[offset++] = lo;
    let hi = Number(value >> BigInt(32) & BigInt(0xffffffff));
    buf[offset++] = hi;
    hi = hi >> 8;
    buf[offset++] = hi;
    hi = hi >> 8;
    buf[offset++] = hi;
    hi = hi >> 8;
    buf[offset++] = hi;
    return offset
  }

  function wrtBigUInt64BE (buf, value, offset, min, max) {
    checkIntBI(value, min, max, buf, offset, 7);

    let lo = Number(value & BigInt(0xffffffff));
    buf[offset + 7] = lo;
    lo = lo >> 8;
    buf[offset + 6] = lo;
    lo = lo >> 8;
    buf[offset + 5] = lo;
    lo = lo >> 8;
    buf[offset + 4] = lo;
    let hi = Number(value >> BigInt(32) & BigInt(0xffffffff));
    buf[offset + 3] = hi;
    hi = hi >> 8;
    buf[offset + 2] = hi;
    hi = hi >> 8;
    buf[offset + 1] = hi;
    hi = hi >> 8;
    buf[offset] = hi;
    return offset + 8
  }

  Buffer.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE (value, offset = 0) {
    return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt('0xffffffffffffffff'))
  });

  Buffer.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE (value, offset = 0) {
    return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt('0xffffffffffffffff'))
  });

  Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
      const limit = Math.pow(2, (8 * byteLength) - 1);

      checkInt(this, value, offset, byteLength, limit - 1, -limit);
    }

    let i = 0;
    let mul = 1;
    let sub = 0;
    this[offset] = value & 0xFF;
    while (++i < byteLength && (mul *= 0x100)) {
      if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
        sub = 1;
      }
      this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
    }

    return offset + byteLength
  };

  Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
      const limit = Math.pow(2, (8 * byteLength) - 1);

      checkInt(this, value, offset, byteLength, limit - 1, -limit);
    }

    let i = byteLength - 1;
    let mul = 1;
    let sub = 0;
    this[offset + i] = value & 0xFF;
    while (--i >= 0 && (mul *= 0x100)) {
      if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
        sub = 1;
      }
      this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
    }

    return offset + byteLength
  };

  Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
    if (value < 0) value = 0xff + value + 1;
    this[offset] = (value & 0xff);
    return offset + 1
  };

  Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
    this[offset] = (value & 0xff);
    this[offset + 1] = (value >>> 8);
    return offset + 2
  };

  Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
    this[offset] = (value >>> 8);
    this[offset + 1] = (value & 0xff);
    return offset + 2
  };

  Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
    this[offset] = (value & 0xff);
    this[offset + 1] = (value >>> 8);
    this[offset + 2] = (value >>> 16);
    this[offset + 3] = (value >>> 24);
    return offset + 4
  };

  Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
    if (value < 0) value = 0xffffffff + value + 1;
    this[offset] = (value >>> 24);
    this[offset + 1] = (value >>> 16);
    this[offset + 2] = (value >>> 8);
    this[offset + 3] = (value & 0xff);
    return offset + 4
  };

  Buffer.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE (value, offset = 0) {
    return wrtBigUInt64LE(this, value, offset, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'))
  });

  Buffer.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE (value, offset = 0) {
    return wrtBigUInt64BE(this, value, offset, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'))
  });

  function checkIEEE754 (buf, value, offset, ext, max, min) {
    if (offset + ext > buf.length) throw new RangeError('Index out of range')
    if (offset < 0) throw new RangeError('Index out of range')
  }

  function writeFloat (buf, value, offset, littleEndian, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
      checkIEEE754(buf, value, offset, 4);
    }
    ieee754.write(buf, value, offset, littleEndian, 23, 4);
    return offset + 4
  }

  Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
    return writeFloat(this, value, offset, true, noAssert)
  };

  Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
    return writeFloat(this, value, offset, false, noAssert)
  };

  function writeDouble (buf, value, offset, littleEndian, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
      checkIEEE754(buf, value, offset, 8);
    }
    ieee754.write(buf, value, offset, littleEndian, 52, 8);
    return offset + 8
  }

  Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
    return writeDouble(this, value, offset, true, noAssert)
  };

  Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
    return writeDouble(this, value, offset, false, noAssert)
  };

  // copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
  Buffer.prototype.copy = function copy (target, targetStart, start, end) {
    if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
    if (!start) start = 0;
    if (!end && end !== 0) end = this.length;
    if (targetStart >= target.length) targetStart = target.length;
    if (!targetStart) targetStart = 0;
    if (end > 0 && end < start) end = start;

    // Copy 0 bytes; we're done
    if (end === start) return 0
    if (target.length === 0 || this.length === 0) return 0

    // Fatal error conditions
    if (targetStart < 0) {
      throw new RangeError('targetStart out of bounds')
    }
    if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
    if (end < 0) throw new RangeError('sourceEnd out of bounds')

    // Are we oob?
    if (end > this.length) end = this.length;
    if (target.length - targetStart < end - start) {
      end = target.length - targetStart + start;
    }

    const len = end - start;

    if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
      // Use built-in when available, missing from IE11
      this.copyWithin(targetStart, start, end);
    } else {
      Uint8Array.prototype.set.call(
        target,
        this.subarray(start, end),
        targetStart
      );
    }

    return len
  };

  // Usage:
  //    buffer.fill(number[, offset[, end]])
  //    buffer.fill(buffer[, offset[, end]])
  //    buffer.fill(string[, offset[, end]][, encoding])
  Buffer.prototype.fill = function fill (val, start, end, encoding) {
    // Handle string cases:
    if (typeof val === 'string') {
      if (typeof start === 'string') {
        encoding = start;
        start = 0;
        end = this.length;
      } else if (typeof end === 'string') {
        encoding = end;
        end = this.length;
      }
      if (encoding !== undefined && typeof encoding !== 'string') {
        throw new TypeError('encoding must be a string')
      }
      if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
        throw new TypeError('Unknown encoding: ' + encoding)
      }
      if (val.length === 1) {
        const code = val.charCodeAt(0);
        if ((encoding === 'utf8' && code < 128) ||
            encoding === 'latin1') {
          // Fast path: If `val` fits into a single byte, use that numeric value.
          val = code;
        }
      }
    } else if (typeof val === 'number') {
      val = val & 255;
    } else if (typeof val === 'boolean') {
      val = Number(val);
    }

    // Invalid ranges are not set to a default, so can range check early.
    if (start < 0 || this.length < start || this.length < end) {
      throw new RangeError('Out of range index')
    }

    if (end <= start) {
      return this
    }

    start = start >>> 0;
    end = end === undefined ? this.length : end >>> 0;

    if (!val) val = 0;

    let i;
    if (typeof val === 'number') {
      for (i = start; i < end; ++i) {
        this[i] = val;
      }
    } else {
      const bytes = Buffer.isBuffer(val)
        ? val
        : Buffer.from(val, encoding);
      const len = bytes.length;
      if (len === 0) {
        throw new TypeError('The value "' + val +
          '" is invalid for argument "value"')
      }
      for (i = 0; i < end - start; ++i) {
        this[i + start] = bytes[i % len];
      }
    }

    return this
  };

  // CUSTOM ERRORS
  // =============

  // Simplified versions from Node, changed for Buffer-only usage
  const errors = {};
  function E (sym, getMessage, Base) {
    errors[sym] = class NodeError extends Base {
      constructor () {
        super();

        Object.defineProperty(this, 'message', {
          value: getMessage.apply(this, arguments),
          writable: true,
          configurable: true
        });

        // Add the error code to the name to include it in the stack trace.
        this.name = `${this.name} [${sym}]`;
        // Access the stack to generate the error message including the error code
        // from the name.
        this.stack; // eslint-disable-line no-unused-expressions
        // Reset the name to the actual name.
        delete this.name;
      }

      get code () {
        return sym
      }

      set code (value) {
        Object.defineProperty(this, 'code', {
          configurable: true,
          enumerable: true,
          value,
          writable: true
        });
      }

      toString () {
        return `${this.name} [${sym}]: ${this.message}`
      }
    };
  }

  E('ERR_BUFFER_OUT_OF_BOUNDS',
    function (name) {
      if (name) {
        return `${name} is outside of buffer bounds`
      }

      return 'Attempt to access memory outside buffer bounds'
    }, RangeError);
  E('ERR_INVALID_ARG_TYPE',
    function (name, actual) {
      return `The "${name}" argument must be of type number. Received type ${typeof actual}`
    }, TypeError);
  E('ERR_OUT_OF_RANGE',
    function (str, range, input) {
      let msg = `The value of "${str}" is out of range.`;
      let received = input;
      if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
        received = addNumericalSeparator(String(input));
      } else if (typeof input === 'bigint') {
        received = String(input);
        if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
          received = addNumericalSeparator(received);
        }
        received += 'n';
      }
      msg += ` It must be ${range}. Received ${received}`;
      return msg
    }, RangeError);

  function addNumericalSeparator (val) {
    let res = '';
    let i = val.length;
    const start = val[0] === '-' ? 1 : 0;
    for (; i >= start + 4; i -= 3) {
      res = `_${val.slice(i - 3, i)}${res}`;
    }
    return `${val.slice(0, i)}${res}`
  }

  // CHECK FUNCTIONS
  // ===============

  function checkBounds (buf, offset, byteLength) {
    validateNumber(offset, 'offset');
    if (buf[offset] === undefined || buf[offset + byteLength] === undefined) {
      boundsError(offset, buf.length - (byteLength + 1));
    }
  }

  function checkIntBI (value, min, max, buf, offset, byteLength) {
    if (value > max || value < min) {
      const n = typeof min === 'bigint' ? 'n' : '';
      let range;
      if (byteLength > 3) {
        if (min === 0 || min === BigInt(0)) {
          range = `>= 0${n} and < 2${n} ** ${(byteLength + 1) * 8}${n}`;
        } else {
          range = `>= -(2${n} ** ${(byteLength + 1) * 8 - 1}${n}) and < 2 ** ` +
                  `${(byteLength + 1) * 8 - 1}${n}`;
        }
      } else {
        range = `>= ${min}${n} and <= ${max}${n}`;
      }
      throw new errors.ERR_OUT_OF_RANGE('value', range, value)
    }
    checkBounds(buf, offset, byteLength);
  }

  function validateNumber (value, name) {
    if (typeof value !== 'number') {
      throw new errors.ERR_INVALID_ARG_TYPE(name, 'number', value)
    }
  }

  function boundsError (value, length, type) {
    if (Math.floor(value) !== value) {
      validateNumber(value, type);
      throw new errors.ERR_OUT_OF_RANGE(type || 'offset', 'an integer', value)
    }

    if (length < 0) {
      throw new errors.ERR_BUFFER_OUT_OF_BOUNDS()
    }

    throw new errors.ERR_OUT_OF_RANGE(type || 'offset',
                                      `>= ${type ? 1 : 0} and <= ${length}`,
                                      value)
  }

  // HELPER FUNCTIONS
  // ================

  const INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;

  function base64clean (str) {
    // Node takes equal signs as end of the Base64 encoding
    str = str.split('=')[0];
    // Node strips out invalid characters like \n and \t from the string, base64-js does not
    str = str.trim().replace(INVALID_BASE64_RE, '');
    // Node converts strings with length < 2 to ''
    if (str.length < 2) return ''
    // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
    while (str.length % 4 !== 0) {
      str = str + '=';
    }
    return str
  }

  function utf8ToBytes (string, units) {
    units = units || Infinity;
    let codePoint;
    const length = string.length;
    let leadSurrogate = null;
    const bytes = [];

    for (let i = 0; i < length; ++i) {
      codePoint = string.charCodeAt(i);

      // is surrogate component
      if (codePoint > 0xD7FF && codePoint < 0xE000) {
        // last char was a lead
        if (!leadSurrogate) {
          // no lead yet
          if (codePoint > 0xDBFF) {
            // unexpected trail
            if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
            continue
          } else if (i + 1 === length) {
            // unpaired lead
            if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
            continue
          }

          // valid lead
          leadSurrogate = codePoint;

          continue
        }

        // 2 leads in a row
        if (codePoint < 0xDC00) {
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          leadSurrogate = codePoint;
          continue
        }

        // valid surrogate pair
        codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
      } else if (leadSurrogate) {
        // valid bmp char, but last char was a lead
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
      }

      leadSurrogate = null;

      // encode utf8
      if (codePoint < 0x80) {
        if ((units -= 1) < 0) break
        bytes.push(codePoint);
      } else if (codePoint < 0x800) {
        if ((units -= 2) < 0) break
        bytes.push(
          codePoint >> 0x6 | 0xC0,
          codePoint & 0x3F | 0x80
        );
      } else if (codePoint < 0x10000) {
        if ((units -= 3) < 0) break
        bytes.push(
          codePoint >> 0xC | 0xE0,
          codePoint >> 0x6 & 0x3F | 0x80,
          codePoint & 0x3F | 0x80
        );
      } else if (codePoint < 0x110000) {
        if ((units -= 4) < 0) break
        bytes.push(
          codePoint >> 0x12 | 0xF0,
          codePoint >> 0xC & 0x3F | 0x80,
          codePoint >> 0x6 & 0x3F | 0x80,
          codePoint & 0x3F | 0x80
        );
      } else {
        throw new Error('Invalid code point')
      }
    }

    return bytes
  }

  function asciiToBytes (str) {
    const byteArray = [];
    for (let i = 0; i < str.length; ++i) {
      // Node's code seems to be doing this and not & 0x7F..
      byteArray.push(str.charCodeAt(i) & 0xFF);
    }
    return byteArray
  }

  function utf16leToBytes (str, units) {
    let c, hi, lo;
    const byteArray = [];
    for (let i = 0; i < str.length; ++i) {
      if ((units -= 2) < 0) break

      c = str.charCodeAt(i);
      hi = c >> 8;
      lo = c % 256;
      byteArray.push(lo);
      byteArray.push(hi);
    }

    return byteArray
  }

  function base64ToBytes (str) {
    return base64Js.toByteArray(base64clean(str))
  }

  function blitBuffer (src, dst, offset, length) {
    let i;
    for (i = 0; i < length; ++i) {
      if ((i + offset >= dst.length) || (i >= src.length)) break
      dst[i + offset] = src[i];
    }
    return i
  }

  // ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
  // the `instanceof` check but they should be treated as of that type.
  // See: https://github.com/feross/buffer/issues/166
  function isInstance (obj, type) {
    return obj instanceof type ||
      (obj != null && obj.constructor != null && obj.constructor.name != null &&
        obj.constructor.name === type.name)
  }
  function numberIsNaN (obj) {
    // For IE11 support
    return obj !== obj // eslint-disable-line no-self-compare
  }

  // Create lookup table for `toString('hex')`
  // See: https://github.com/feross/buffer/issues/219
  const hexSliceLookupTable = (function () {
    const alphabet = '0123456789abcdef';
    const table = new Array(256);
    for (let i = 0; i < 16; ++i) {
      const i16 = i * 16;
      for (let j = 0; j < 16; ++j) {
        table[i16 + j] = alphabet[i] + alphabet[j];
      }
    }
    return table
  })();

  // Return not function with Error if BigInt not supported
  function defineBigIntMethod (fn) {
    return typeof BigInt === 'undefined' ? BufferBigIntNotDefined : fn
  }

  function BufferBigIntNotDefined () {
    throw new Error('BigInt not supported')
  }
  });

  const toBuffer = arr => {
    if (arr instanceof buffer.Buffer) {
      return arr;
    } else if (arr instanceof Uint8Array) {
      return buffer.Buffer.from(arr.buffer, arr.byteOffset, arr.byteLength);
    } else {
      return buffer.Buffer.from(arr);
    }
  };

  var bn = createCommonjsModule(function (module) {
  (function (module, exports) {

    // Utils
    function assert (val, msg) {
      if (!val) throw new Error(msg || 'Assertion failed');
    }

    // Could use `inherits` module, but don't want to move from single file
    // architecture yet.
    function inherits (ctor, superCtor) {
      ctor.super_ = superCtor;
      var TempCtor = function () {};
      TempCtor.prototype = superCtor.prototype;
      ctor.prototype = new TempCtor();
      ctor.prototype.constructor = ctor;
    }

    // BN

    function BN (number, base, endian) {
      if (BN.isBN(number)) {
        return number;
      }

      this.negative = 0;
      this.words = null;
      this.length = 0;

      // Reduction context
      this.red = null;

      if (number !== null) {
        if (base === 'le' || base === 'be') {
          endian = base;
          base = 10;
        }

        this._init(number || 0, base || 10, endian || 'be');
      }
    }
    if (typeof module === 'object') {
      module.exports = BN;
    } else {
      exports.BN = BN;
    }

    BN.BN = BN;
    BN.wordSize = 26;

    var Buffer;
    try {
      if (typeof window !== 'undefined' && typeof window.Buffer !== 'undefined') {
        Buffer = window.Buffer;
      } else {
        Buffer = require$$0$1.Buffer;
      }
    } catch (e) {
    }

    BN.isBN = function isBN (num) {
      if (num instanceof BN) {
        return true;
      }

      return num !== null && typeof num === 'object' &&
        num.constructor.wordSize === BN.wordSize && Array.isArray(num.words);
    };

    BN.max = function max (left, right) {
      if (left.cmp(right) > 0) return left;
      return right;
    };

    BN.min = function min (left, right) {
      if (left.cmp(right) < 0) return left;
      return right;
    };

    BN.prototype._init = function init (number, base, endian) {
      if (typeof number === 'number') {
        return this._initNumber(number, base, endian);
      }

      if (typeof number === 'object') {
        return this._initArray(number, base, endian);
      }

      if (base === 'hex') {
        base = 16;
      }
      assert(base === (base | 0) && base >= 2 && base <= 36);

      number = number.toString().replace(/\s+/g, '');
      var start = 0;
      if (number[0] === '-') {
        start++;
        this.negative = 1;
      }

      if (start < number.length) {
        if (base === 16) {
          this._parseHex(number, start, endian);
        } else {
          this._parseBase(number, base, start);
          if (endian === 'le') {
            this._initArray(this.toArray(), base, endian);
          }
        }
      }
    };

    BN.prototype._initNumber = function _initNumber (number, base, endian) {
      if (number < 0) {
        this.negative = 1;
        number = -number;
      }
      if (number < 0x4000000) {
        this.words = [number & 0x3ffffff];
        this.length = 1;
      } else if (number < 0x10000000000000) {
        this.words = [
          number & 0x3ffffff,
          (number / 0x4000000) & 0x3ffffff
        ];
        this.length = 2;
      } else {
        assert(number < 0x20000000000000); // 2 ^ 53 (unsafe)
        this.words = [
          number & 0x3ffffff,
          (number / 0x4000000) & 0x3ffffff,
          1
        ];
        this.length = 3;
      }

      if (endian !== 'le') return;

      // Reverse the bytes
      this._initArray(this.toArray(), base, endian);
    };

    BN.prototype._initArray = function _initArray (number, base, endian) {
      // Perhaps a Uint8Array
      assert(typeof number.length === 'number');
      if (number.length <= 0) {
        this.words = [0];
        this.length = 1;
        return this;
      }

      this.length = Math.ceil(number.length / 3);
      this.words = new Array(this.length);
      for (var i = 0; i < this.length; i++) {
        this.words[i] = 0;
      }

      var j, w;
      var off = 0;
      if (endian === 'be') {
        for (i = number.length - 1, j = 0; i >= 0; i -= 3) {
          w = number[i] | (number[i - 1] << 8) | (number[i - 2] << 16);
          this.words[j] |= (w << off) & 0x3ffffff;
          this.words[j + 1] = (w >>> (26 - off)) & 0x3ffffff;
          off += 24;
          if (off >= 26) {
            off -= 26;
            j++;
          }
        }
      } else if (endian === 'le') {
        for (i = 0, j = 0; i < number.length; i += 3) {
          w = number[i] | (number[i + 1] << 8) | (number[i + 2] << 16);
          this.words[j] |= (w << off) & 0x3ffffff;
          this.words[j + 1] = (w >>> (26 - off)) & 0x3ffffff;
          off += 24;
          if (off >= 26) {
            off -= 26;
            j++;
          }
        }
      }
      return this._strip();
    };

    function parseHex4Bits (string, index) {
      var c = string.charCodeAt(index);
      // '0' - '9'
      if (c >= 48 && c <= 57) {
        return c - 48;
      // 'A' - 'F'
      } else if (c >= 65 && c <= 70) {
        return c - 55;
      // 'a' - 'f'
      } else if (c >= 97 && c <= 102) {
        return c - 87;
      } else {
        assert(false, 'Invalid character in ' + string);
      }
    }

    function parseHexByte (string, lowerBound, index) {
      var r = parseHex4Bits(string, index);
      if (index - 1 >= lowerBound) {
        r |= parseHex4Bits(string, index - 1) << 4;
      }
      return r;
    }

    BN.prototype._parseHex = function _parseHex (number, start, endian) {
      // Create possibly bigger array to ensure that it fits the number
      this.length = Math.ceil((number.length - start) / 6);
      this.words = new Array(this.length);
      for (var i = 0; i < this.length; i++) {
        this.words[i] = 0;
      }

      // 24-bits chunks
      var off = 0;
      var j = 0;

      var w;
      if (endian === 'be') {
        for (i = number.length - 1; i >= start; i -= 2) {
          w = parseHexByte(number, start, i) << off;
          this.words[j] |= w & 0x3ffffff;
          if (off >= 18) {
            off -= 18;
            j += 1;
            this.words[j] |= w >>> 26;
          } else {
            off += 8;
          }
        }
      } else {
        var parseLength = number.length - start;
        for (i = parseLength % 2 === 0 ? start + 1 : start; i < number.length; i += 2) {
          w = parseHexByte(number, start, i) << off;
          this.words[j] |= w & 0x3ffffff;
          if (off >= 18) {
            off -= 18;
            j += 1;
            this.words[j] |= w >>> 26;
          } else {
            off += 8;
          }
        }
      }

      this._strip();
    };

    function parseBase (str, start, end, mul) {
      var r = 0;
      var b = 0;
      var len = Math.min(str.length, end);
      for (var i = start; i < len; i++) {
        var c = str.charCodeAt(i) - 48;

        r *= mul;

        // 'a'
        if (c >= 49) {
          b = c - 49 + 0xa;

        // 'A'
        } else if (c >= 17) {
          b = c - 17 + 0xa;

        // '0' - '9'
        } else {
          b = c;
        }
        assert(c >= 0 && b < mul, 'Invalid character');
        r += b;
      }
      return r;
    }

    BN.prototype._parseBase = function _parseBase (number, base, start) {
      // Initialize as zero
      this.words = [0];
      this.length = 1;

      // Find length of limb in base
      for (var limbLen = 0, limbPow = 1; limbPow <= 0x3ffffff; limbPow *= base) {
        limbLen++;
      }
      limbLen--;
      limbPow = (limbPow / base) | 0;

      var total = number.length - start;
      var mod = total % limbLen;
      var end = Math.min(total, total - mod) + start;

      var word = 0;
      for (var i = start; i < end; i += limbLen) {
        word = parseBase(number, i, i + limbLen, base);

        this.imuln(limbPow);
        if (this.words[0] + word < 0x4000000) {
          this.words[0] += word;
        } else {
          this._iaddn(word);
        }
      }

      if (mod !== 0) {
        var pow = 1;
        word = parseBase(number, i, number.length, base);

        for (i = 0; i < mod; i++) {
          pow *= base;
        }

        this.imuln(pow);
        if (this.words[0] + word < 0x4000000) {
          this.words[0] += word;
        } else {
          this._iaddn(word);
        }
      }

      this._strip();
    };

    BN.prototype.copy = function copy (dest) {
      dest.words = new Array(this.length);
      for (var i = 0; i < this.length; i++) {
        dest.words[i] = this.words[i];
      }
      dest.length = this.length;
      dest.negative = this.negative;
      dest.red = this.red;
    };

    function move (dest, src) {
      dest.words = src.words;
      dest.length = src.length;
      dest.negative = src.negative;
      dest.red = src.red;
    }

    BN.prototype._move = function _move (dest) {
      move(dest, this);
    };

    BN.prototype.clone = function clone () {
      var r = new BN(null);
      this.copy(r);
      return r;
    };

    BN.prototype._expand = function _expand (size) {
      while (this.length < size) {
        this.words[this.length++] = 0;
      }
      return this;
    };

    // Remove leading `0` from `this`
    BN.prototype._strip = function strip () {
      while (this.length > 1 && this.words[this.length - 1] === 0) {
        this.length--;
      }
      return this._normSign();
    };

    BN.prototype._normSign = function _normSign () {
      // -0 = 0
      if (this.length === 1 && this.words[0] === 0) {
        this.negative = 0;
      }
      return this;
    };

    // Check Symbol.for because not everywhere where Symbol defined
    // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol#Browser_compatibility
    if (typeof Symbol !== 'undefined' && typeof Symbol.for === 'function') {
      try {
        BN.prototype[Symbol.for('nodejs.util.inspect.custom')] = inspect;
      } catch (e) {
        BN.prototype.inspect = inspect;
      }
    } else {
      BN.prototype.inspect = inspect;
    }

    function inspect () {
      return (this.red ? '<BN-R: ' : '<BN: ') + this.toString(16) + '>';
    }

    /*

    var zeros = [];
    var groupSizes = [];
    var groupBases = [];

    var s = '';
    var i = -1;
    while (++i < BN.wordSize) {
      zeros[i] = s;
      s += '0';
    }
    groupSizes[0] = 0;
    groupSizes[1] = 0;
    groupBases[0] = 0;
    groupBases[1] = 0;
    var base = 2 - 1;
    while (++base < 36 + 1) {
      var groupSize = 0;
      var groupBase = 1;
      while (groupBase < (1 << BN.wordSize) / base) {
        groupBase *= base;
        groupSize += 1;
      }
      groupSizes[base] = groupSize;
      groupBases[base] = groupBase;
    }

    */

    var zeros = [
      '',
      '0',
      '00',
      '000',
      '0000',
      '00000',
      '000000',
      '0000000',
      '00000000',
      '000000000',
      '0000000000',
      '00000000000',
      '000000000000',
      '0000000000000',
      '00000000000000',
      '000000000000000',
      '0000000000000000',
      '00000000000000000',
      '000000000000000000',
      '0000000000000000000',
      '00000000000000000000',
      '000000000000000000000',
      '0000000000000000000000',
      '00000000000000000000000',
      '000000000000000000000000',
      '0000000000000000000000000'
    ];

    var groupSizes = [
      0, 0,
      25, 16, 12, 11, 10, 9, 8,
      8, 7, 7, 7, 7, 6, 6,
      6, 6, 6, 6, 6, 5, 5,
      5, 5, 5, 5, 5, 5, 5,
      5, 5, 5, 5, 5, 5, 5
    ];

    var groupBases = [
      0, 0,
      33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216,
      43046721, 10000000, 19487171, 35831808, 62748517, 7529536, 11390625,
      16777216, 24137569, 34012224, 47045881, 64000000, 4084101, 5153632,
      6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149,
      24300000, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176
    ];

    BN.prototype.toString = function toString (base, padding) {
      base = base || 10;
      padding = padding | 0 || 1;

      var out;
      if (base === 16 || base === 'hex') {
        out = '';
        var off = 0;
        var carry = 0;
        for (var i = 0; i < this.length; i++) {
          var w = this.words[i];
          var word = (((w << off) | carry) & 0xffffff).toString(16);
          carry = (w >>> (24 - off)) & 0xffffff;
          if (carry !== 0 || i !== this.length - 1) {
            out = zeros[6 - word.length] + word + out;
          } else {
            out = word + out;
          }
          off += 2;
          if (off >= 26) {
            off -= 26;
            i--;
          }
        }
        if (carry !== 0) {
          out = carry.toString(16) + out;
        }
        while (out.length % padding !== 0) {
          out = '0' + out;
        }
        if (this.negative !== 0) {
          out = '-' + out;
        }
        return out;
      }

      if (base === (base | 0) && base >= 2 && base <= 36) {
        // var groupSize = Math.floor(BN.wordSize * Math.LN2 / Math.log(base));
        var groupSize = groupSizes[base];
        // var groupBase = Math.pow(base, groupSize);
        var groupBase = groupBases[base];
        out = '';
        var c = this.clone();
        c.negative = 0;
        while (!c.isZero()) {
          var r = c.modrn(groupBase).toString(base);
          c = c.idivn(groupBase);

          if (!c.isZero()) {
            out = zeros[groupSize - r.length] + r + out;
          } else {
            out = r + out;
          }
        }
        if (this.isZero()) {
          out = '0' + out;
        }
        while (out.length % padding !== 0) {
          out = '0' + out;
        }
        if (this.negative !== 0) {
          out = '-' + out;
        }
        return out;
      }

      assert(false, 'Base should be between 2 and 36');
    };

    BN.prototype.toNumber = function toNumber () {
      var ret = this.words[0];
      if (this.length === 2) {
        ret += this.words[1] * 0x4000000;
      } else if (this.length === 3 && this.words[2] === 0x01) {
        // NOTE: at this stage it is known that the top bit is set
        ret += 0x10000000000000 + (this.words[1] * 0x4000000);
      } else if (this.length > 2) {
        assert(false, 'Number can only safely store up to 53 bits');
      }
      return (this.negative !== 0) ? -ret : ret;
    };

    BN.prototype.toJSON = function toJSON () {
      return this.toString(16, 2);
    };

    if (Buffer) {
      BN.prototype.toBuffer = function toBuffer (endian, length) {
        return this.toArrayLike(Buffer, endian, length);
      };
    }

    BN.prototype.toArray = function toArray (endian, length) {
      return this.toArrayLike(Array, endian, length);
    };

    var allocate = function allocate (ArrayType, size) {
      if (ArrayType.allocUnsafe) {
        return ArrayType.allocUnsafe(size);
      }
      return new ArrayType(size);
    };

    BN.prototype.toArrayLike = function toArrayLike (ArrayType, endian, length) {
      this._strip();

      var byteLength = this.byteLength();
      var reqLength = length || Math.max(1, byteLength);
      assert(byteLength <= reqLength, 'byte array longer than desired length');
      assert(reqLength > 0, 'Requested array length <= 0');

      var res = allocate(ArrayType, reqLength);
      var postfix = endian === 'le' ? 'LE' : 'BE';
      this['_toArrayLike' + postfix](res, byteLength);
      return res;
    };

    BN.prototype._toArrayLikeLE = function _toArrayLikeLE (res, byteLength) {
      var position = 0;
      var carry = 0;

      for (var i = 0, shift = 0; i < this.length; i++) {
        var word = (this.words[i] << shift) | carry;

        res[position++] = word & 0xff;
        if (position < res.length) {
          res[position++] = (word >> 8) & 0xff;
        }
        if (position < res.length) {
          res[position++] = (word >> 16) & 0xff;
        }

        if (shift === 6) {
          if (position < res.length) {
            res[position++] = (word >> 24) & 0xff;
          }
          carry = 0;
          shift = 0;
        } else {
          carry = word >>> 24;
          shift += 2;
        }
      }

      if (position < res.length) {
        res[position++] = carry;

        while (position < res.length) {
          res[position++] = 0;
        }
      }
    };

    BN.prototype._toArrayLikeBE = function _toArrayLikeBE (res, byteLength) {
      var position = res.length - 1;
      var carry = 0;

      for (var i = 0, shift = 0; i < this.length; i++) {
        var word = (this.words[i] << shift) | carry;

        res[position--] = word & 0xff;
        if (position >= 0) {
          res[position--] = (word >> 8) & 0xff;
        }
        if (position >= 0) {
          res[position--] = (word >> 16) & 0xff;
        }

        if (shift === 6) {
          if (position >= 0) {
            res[position--] = (word >> 24) & 0xff;
          }
          carry = 0;
          shift = 0;
        } else {
          carry = word >>> 24;
          shift += 2;
        }
      }

      if (position >= 0) {
        res[position--] = carry;

        while (position >= 0) {
          res[position--] = 0;
        }
      }
    };

    if (Math.clz32) {
      BN.prototype._countBits = function _countBits (w) {
        return 32 - Math.clz32(w);
      };
    } else {
      BN.prototype._countBits = function _countBits (w) {
        var t = w;
        var r = 0;
        if (t >= 0x1000) {
          r += 13;
          t >>>= 13;
        }
        if (t >= 0x40) {
          r += 7;
          t >>>= 7;
        }
        if (t >= 0x8) {
          r += 4;
          t >>>= 4;
        }
        if (t >= 0x02) {
          r += 2;
          t >>>= 2;
        }
        return r + t;
      };
    }

    BN.prototype._zeroBits = function _zeroBits (w) {
      // Short-cut
      if (w === 0) return 26;

      var t = w;
      var r = 0;
      if ((t & 0x1fff) === 0) {
        r += 13;
        t >>>= 13;
      }
      if ((t & 0x7f) === 0) {
        r += 7;
        t >>>= 7;
      }
      if ((t & 0xf) === 0) {
        r += 4;
        t >>>= 4;
      }
      if ((t & 0x3) === 0) {
        r += 2;
        t >>>= 2;
      }
      if ((t & 0x1) === 0) {
        r++;
      }
      return r;
    };

    // Return number of used bits in a BN
    BN.prototype.bitLength = function bitLength () {
      var w = this.words[this.length - 1];
      var hi = this._countBits(w);
      return (this.length - 1) * 26 + hi;
    };

    function toBitArray (num) {
      var w = new Array(num.bitLength());

      for (var bit = 0; bit < w.length; bit++) {
        var off = (bit / 26) | 0;
        var wbit = bit % 26;

        w[bit] = (num.words[off] >>> wbit) & 0x01;
      }

      return w;
    }

    // Number of trailing zero bits
    BN.prototype.zeroBits = function zeroBits () {
      if (this.isZero()) return 0;

      var r = 0;
      for (var i = 0; i < this.length; i++) {
        var b = this._zeroBits(this.words[i]);
        r += b;
        if (b !== 26) break;
      }
      return r;
    };

    BN.prototype.byteLength = function byteLength () {
      return Math.ceil(this.bitLength() / 8);
    };

    BN.prototype.toTwos = function toTwos (width) {
      if (this.negative !== 0) {
        return this.abs().inotn(width).iaddn(1);
      }
      return this.clone();
    };

    BN.prototype.fromTwos = function fromTwos (width) {
      if (this.testn(width - 1)) {
        return this.notn(width).iaddn(1).ineg();
      }
      return this.clone();
    };

    BN.prototype.isNeg = function isNeg () {
      return this.negative !== 0;
    };

    // Return negative clone of `this`
    BN.prototype.neg = function neg () {
      return this.clone().ineg();
    };

    BN.prototype.ineg = function ineg () {
      if (!this.isZero()) {
        this.negative ^= 1;
      }

      return this;
    };

    // Or `num` with `this` in-place
    BN.prototype.iuor = function iuor (num) {
      while (this.length < num.length) {
        this.words[this.length++] = 0;
      }

      for (var i = 0; i < num.length; i++) {
        this.words[i] = this.words[i] | num.words[i];
      }

      return this._strip();
    };

    BN.prototype.ior = function ior (num) {
      assert((this.negative | num.negative) === 0);
      return this.iuor(num);
    };

    // Or `num` with `this`
    BN.prototype.or = function or (num) {
      if (this.length > num.length) return this.clone().ior(num);
      return num.clone().ior(this);
    };

    BN.prototype.uor = function uor (num) {
      if (this.length > num.length) return this.clone().iuor(num);
      return num.clone().iuor(this);
    };

    // And `num` with `this` in-place
    BN.prototype.iuand = function iuand (num) {
      // b = min-length(num, this)
      var b;
      if (this.length > num.length) {
        b = num;
      } else {
        b = this;
      }

      for (var i = 0; i < b.length; i++) {
        this.words[i] = this.words[i] & num.words[i];
      }

      this.length = b.length;

      return this._strip();
    };

    BN.prototype.iand = function iand (num) {
      assert((this.negative | num.negative) === 0);
      return this.iuand(num);
    };

    // And `num` with `this`
    BN.prototype.and = function and (num) {
      if (this.length > num.length) return this.clone().iand(num);
      return num.clone().iand(this);
    };

    BN.prototype.uand = function uand (num) {
      if (this.length > num.length) return this.clone().iuand(num);
      return num.clone().iuand(this);
    };

    // Xor `num` with `this` in-place
    BN.prototype.iuxor = function iuxor (num) {
      // a.length > b.length
      var a;
      var b;
      if (this.length > num.length) {
        a = this;
        b = num;
      } else {
        a = num;
        b = this;
      }

      for (var i = 0; i < b.length; i++) {
        this.words[i] = a.words[i] ^ b.words[i];
      }

      if (this !== a) {
        for (; i < a.length; i++) {
          this.words[i] = a.words[i];
        }
      }

      this.length = a.length;

      return this._strip();
    };

    BN.prototype.ixor = function ixor (num) {
      assert((this.negative | num.negative) === 0);
      return this.iuxor(num);
    };

    // Xor `num` with `this`
    BN.prototype.xor = function xor (num) {
      if (this.length > num.length) return this.clone().ixor(num);
      return num.clone().ixor(this);
    };

    BN.prototype.uxor = function uxor (num) {
      if (this.length > num.length) return this.clone().iuxor(num);
      return num.clone().iuxor(this);
    };

    // Not ``this`` with ``width`` bitwidth
    BN.prototype.inotn = function inotn (width) {
      assert(typeof width === 'number' && width >= 0);

      var bytesNeeded = Math.ceil(width / 26) | 0;
      var bitsLeft = width % 26;

      // Extend the buffer with leading zeroes
      this._expand(bytesNeeded);

      if (bitsLeft > 0) {
        bytesNeeded--;
      }

      // Handle complete words
      for (var i = 0; i < bytesNeeded; i++) {
        this.words[i] = ~this.words[i] & 0x3ffffff;
      }

      // Handle the residue
      if (bitsLeft > 0) {
        this.words[i] = ~this.words[i] & (0x3ffffff >> (26 - bitsLeft));
      }

      // And remove leading zeroes
      return this._strip();
    };

    BN.prototype.notn = function notn (width) {
      return this.clone().inotn(width);
    };

    // Set `bit` of `this`
    BN.prototype.setn = function setn (bit, val) {
      assert(typeof bit === 'number' && bit >= 0);

      var off = (bit / 26) | 0;
      var wbit = bit % 26;

      this._expand(off + 1);

      if (val) {
        this.words[off] = this.words[off] | (1 << wbit);
      } else {
        this.words[off] = this.words[off] & ~(1 << wbit);
      }

      return this._strip();
    };

    // Add `num` to `this` in-place
    BN.prototype.iadd = function iadd (num) {
      var r;

      // negative + positive
      if (this.negative !== 0 && num.negative === 0) {
        this.negative = 0;
        r = this.isub(num);
        this.negative ^= 1;
        return this._normSign();

      // positive + negative
      } else if (this.negative === 0 && num.negative !== 0) {
        num.negative = 0;
        r = this.isub(num);
        num.negative = 1;
        return r._normSign();
      }

      // a.length > b.length
      var a, b;
      if (this.length > num.length) {
        a = this;
        b = num;
      } else {
        a = num;
        b = this;
      }

      var carry = 0;
      for (var i = 0; i < b.length; i++) {
        r = (a.words[i] | 0) + (b.words[i] | 0) + carry;
        this.words[i] = r & 0x3ffffff;
        carry = r >>> 26;
      }
      for (; carry !== 0 && i < a.length; i++) {
        r = (a.words[i] | 0) + carry;
        this.words[i] = r & 0x3ffffff;
        carry = r >>> 26;
      }

      this.length = a.length;
      if (carry !== 0) {
        this.words[this.length] = carry;
        this.length++;
      // Copy the rest of the words
      } else if (a !== this) {
        for (; i < a.length; i++) {
          this.words[i] = a.words[i];
        }
      }

      return this;
    };

    // Add `num` to `this`
    BN.prototype.add = function add (num) {
      var res;
      if (num.negative !== 0 && this.negative === 0) {
        num.negative = 0;
        res = this.sub(num);
        num.negative ^= 1;
        return res;
      } else if (num.negative === 0 && this.negative !== 0) {
        this.negative = 0;
        res = num.sub(this);
        this.negative = 1;
        return res;
      }

      if (this.length > num.length) return this.clone().iadd(num);

      return num.clone().iadd(this);
    };

    // Subtract `num` from `this` in-place
    BN.prototype.isub = function isub (num) {
      // this - (-num) = this + num
      if (num.negative !== 0) {
        num.negative = 0;
        var r = this.iadd(num);
        num.negative = 1;
        return r._normSign();

      // -this - num = -(this + num)
      } else if (this.negative !== 0) {
        this.negative = 0;
        this.iadd(num);
        this.negative = 1;
        return this._normSign();
      }

      // At this point both numbers are positive
      var cmp = this.cmp(num);

      // Optimization - zeroify
      if (cmp === 0) {
        this.negative = 0;
        this.length = 1;
        this.words[0] = 0;
        return this;
      }

      // a > b
      var a, b;
      if (cmp > 0) {
        a = this;
        b = num;
      } else {
        a = num;
        b = this;
      }

      var carry = 0;
      for (var i = 0; i < b.length; i++) {
        r = (a.words[i] | 0) - (b.words[i] | 0) + carry;
        carry = r >> 26;
        this.words[i] = r & 0x3ffffff;
      }
      for (; carry !== 0 && i < a.length; i++) {
        r = (a.words[i] | 0) + carry;
        carry = r >> 26;
        this.words[i] = r & 0x3ffffff;
      }

      // Copy rest of the words
      if (carry === 0 && i < a.length && a !== this) {
        for (; i < a.length; i++) {
          this.words[i] = a.words[i];
        }
      }

      this.length = Math.max(this.length, i);

      if (a !== this) {
        this.negative = 1;
      }

      return this._strip();
    };

    // Subtract `num` from `this`
    BN.prototype.sub = function sub (num) {
      return this.clone().isub(num);
    };

    function smallMulTo (self, num, out) {
      out.negative = num.negative ^ self.negative;
      var len = (self.length + num.length) | 0;
      out.length = len;
      len = (len - 1) | 0;

      // Peel one iteration (compiler can't do it, because of code complexity)
      var a = self.words[0] | 0;
      var b = num.words[0] | 0;
      var r = a * b;

      var lo = r & 0x3ffffff;
      var carry = (r / 0x4000000) | 0;
      out.words[0] = lo;

      for (var k = 1; k < len; k++) {
        // Sum all words with the same `i + j = k` and accumulate `ncarry`,
        // note that ncarry could be >= 0x3ffffff
        var ncarry = carry >>> 26;
        var rword = carry & 0x3ffffff;
        var maxJ = Math.min(k, num.length - 1);
        for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
          var i = (k - j) | 0;
          a = self.words[i] | 0;
          b = num.words[j] | 0;
          r = a * b + rword;
          ncarry += (r / 0x4000000) | 0;
          rword = r & 0x3ffffff;
        }
        out.words[k] = rword | 0;
        carry = ncarry | 0;
      }
      if (carry !== 0) {
        out.words[k] = carry | 0;
      } else {
        out.length--;
      }

      return out._strip();
    }

    // TODO(indutny): it may be reasonable to omit it for users who don't need
    // to work with 256-bit numbers, otherwise it gives 20% improvement for 256-bit
    // multiplication (like elliptic secp256k1).
    var comb10MulTo = function comb10MulTo (self, num, out) {
      var a = self.words;
      var b = num.words;
      var o = out.words;
      var c = 0;
      var lo;
      var mid;
      var hi;
      var a0 = a[0] | 0;
      var al0 = a0 & 0x1fff;
      var ah0 = a0 >>> 13;
      var a1 = a[1] | 0;
      var al1 = a1 & 0x1fff;
      var ah1 = a1 >>> 13;
      var a2 = a[2] | 0;
      var al2 = a2 & 0x1fff;
      var ah2 = a2 >>> 13;
      var a3 = a[3] | 0;
      var al3 = a3 & 0x1fff;
      var ah3 = a3 >>> 13;
      var a4 = a[4] | 0;
      var al4 = a4 & 0x1fff;
      var ah4 = a4 >>> 13;
      var a5 = a[5] | 0;
      var al5 = a5 & 0x1fff;
      var ah5 = a5 >>> 13;
      var a6 = a[6] | 0;
      var al6 = a6 & 0x1fff;
      var ah6 = a6 >>> 13;
      var a7 = a[7] | 0;
      var al7 = a7 & 0x1fff;
      var ah7 = a7 >>> 13;
      var a8 = a[8] | 0;
      var al8 = a8 & 0x1fff;
      var ah8 = a8 >>> 13;
      var a9 = a[9] | 0;
      var al9 = a9 & 0x1fff;
      var ah9 = a9 >>> 13;
      var b0 = b[0] | 0;
      var bl0 = b0 & 0x1fff;
      var bh0 = b0 >>> 13;
      var b1 = b[1] | 0;
      var bl1 = b1 & 0x1fff;
      var bh1 = b1 >>> 13;
      var b2 = b[2] | 0;
      var bl2 = b2 & 0x1fff;
      var bh2 = b2 >>> 13;
      var b3 = b[3] | 0;
      var bl3 = b3 & 0x1fff;
      var bh3 = b3 >>> 13;
      var b4 = b[4] | 0;
      var bl4 = b4 & 0x1fff;
      var bh4 = b4 >>> 13;
      var b5 = b[5] | 0;
      var bl5 = b5 & 0x1fff;
      var bh5 = b5 >>> 13;
      var b6 = b[6] | 0;
      var bl6 = b6 & 0x1fff;
      var bh6 = b6 >>> 13;
      var b7 = b[7] | 0;
      var bl7 = b7 & 0x1fff;
      var bh7 = b7 >>> 13;
      var b8 = b[8] | 0;
      var bl8 = b8 & 0x1fff;
      var bh8 = b8 >>> 13;
      var b9 = b[9] | 0;
      var bl9 = b9 & 0x1fff;
      var bh9 = b9 >>> 13;

      out.negative = self.negative ^ num.negative;
      out.length = 19;
      /* k = 0 */
      lo = Math.imul(al0, bl0);
      mid = Math.imul(al0, bh0);
      mid = (mid + Math.imul(ah0, bl0)) | 0;
      hi = Math.imul(ah0, bh0);
      var w0 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
      c = (((hi + (mid >>> 13)) | 0) + (w0 >>> 26)) | 0;
      w0 &= 0x3ffffff;
      /* k = 1 */
      lo = Math.imul(al1, bl0);
      mid = Math.imul(al1, bh0);
      mid = (mid + Math.imul(ah1, bl0)) | 0;
      hi = Math.imul(ah1, bh0);
      lo = (lo + Math.imul(al0, bl1)) | 0;
      mid = (mid + Math.imul(al0, bh1)) | 0;
      mid = (mid + Math.imul(ah0, bl1)) | 0;
      hi = (hi + Math.imul(ah0, bh1)) | 0;
      var w1 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
      c = (((hi + (mid >>> 13)) | 0) + (w1 >>> 26)) | 0;
      w1 &= 0x3ffffff;
      /* k = 2 */
      lo = Math.imul(al2, bl0);
      mid = Math.imul(al2, bh0);
      mid = (mid + Math.imul(ah2, bl0)) | 0;
      hi = Math.imul(ah2, bh0);
      lo = (lo + Math.imul(al1, bl1)) | 0;
      mid = (mid + Math.imul(al1, bh1)) | 0;
      mid = (mid + Math.imul(ah1, bl1)) | 0;
      hi = (hi + Math.imul(ah1, bh1)) | 0;
      lo = (lo + Math.imul(al0, bl2)) | 0;
      mid = (mid + Math.imul(al0, bh2)) | 0;
      mid = (mid + Math.imul(ah0, bl2)) | 0;
      hi = (hi + Math.imul(ah0, bh2)) | 0;
      var w2 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
      c = (((hi + (mid >>> 13)) | 0) + (w2 >>> 26)) | 0;
      w2 &= 0x3ffffff;
      /* k = 3 */
      lo = Math.imul(al3, bl0);
      mid = Math.imul(al3, bh0);
      mid = (mid + Math.imul(ah3, bl0)) | 0;
      hi = Math.imul(ah3, bh0);
      lo = (lo + Math.imul(al2, bl1)) | 0;
      mid = (mid + Math.imul(al2, bh1)) | 0;
      mid = (mid + Math.imul(ah2, bl1)) | 0;
      hi = (hi + Math.imul(ah2, bh1)) | 0;
      lo = (lo + Math.imul(al1, bl2)) | 0;
      mid = (mid + Math.imul(al1, bh2)) | 0;
      mid = (mid + Math.imul(ah1, bl2)) | 0;
      hi = (hi + Math.imul(ah1, bh2)) | 0;
      lo = (lo + Math.imul(al0, bl3)) | 0;
      mid = (mid + Math.imul(al0, bh3)) | 0;
      mid = (mid + Math.imul(ah0, bl3)) | 0;
      hi = (hi + Math.imul(ah0, bh3)) | 0;
      var w3 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
      c = (((hi + (mid >>> 13)) | 0) + (w3 >>> 26)) | 0;
      w3 &= 0x3ffffff;
      /* k = 4 */
      lo = Math.imul(al4, bl0);
      mid = Math.imul(al4, bh0);
      mid = (mid + Math.imul(ah4, bl0)) | 0;
      hi = Math.imul(ah4, bh0);
      lo = (lo + Math.imul(al3, bl1)) | 0;
      mid = (mid + Math.imul(al3, bh1)) | 0;
      mid = (mid + Math.imul(ah3, bl1)) | 0;
      hi = (hi + Math.imul(ah3, bh1)) | 0;
      lo = (lo + Math.imul(al2, bl2)) | 0;
      mid = (mid + Math.imul(al2, bh2)) | 0;
      mid = (mid + Math.imul(ah2, bl2)) | 0;
      hi = (hi + Math.imul(ah2, bh2)) | 0;
      lo = (lo + Math.imul(al1, bl3)) | 0;
      mid = (mid + Math.imul(al1, bh3)) | 0;
      mid = (mid + Math.imul(ah1, bl3)) | 0;
      hi = (hi + Math.imul(ah1, bh3)) | 0;
      lo = (lo + Math.imul(al0, bl4)) | 0;
      mid = (mid + Math.imul(al0, bh4)) | 0;
      mid = (mid + Math.imul(ah0, bl4)) | 0;
      hi = (hi + Math.imul(ah0, bh4)) | 0;
      var w4 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
      c = (((hi + (mid >>> 13)) | 0) + (w4 >>> 26)) | 0;
      w4 &= 0x3ffffff;
      /* k = 5 */
      lo = Math.imul(al5, bl0);
      mid = Math.imul(al5, bh0);
      mid = (mid + Math.imul(ah5, bl0)) | 0;
      hi = Math.imul(ah5, bh0);
      lo = (lo + Math.imul(al4, bl1)) | 0;
      mid = (mid + Math.imul(al4, bh1)) | 0;
      mid = (mid + Math.imul(ah4, bl1)) | 0;
      hi = (hi + Math.imul(ah4, bh1)) | 0;
      lo = (lo + Math.imul(al3, bl2)) | 0;
      mid = (mid + Math.imul(al3, bh2)) | 0;
      mid = (mid + Math.imul(ah3, bl2)) | 0;
      hi = (hi + Math.imul(ah3, bh2)) | 0;
      lo = (lo + Math.imul(al2, bl3)) | 0;
      mid = (mid + Math.imul(al2, bh3)) | 0;
      mid = (mid + Math.imul(ah2, bl3)) | 0;
      hi = (hi + Math.imul(ah2, bh3)) | 0;
      lo = (lo + Math.imul(al1, bl4)) | 0;
      mid = (mid + Math.imul(al1, bh4)) | 0;
      mid = (mid + Math.imul(ah1, bl4)) | 0;
      hi = (hi + Math.imul(ah1, bh4)) | 0;
      lo = (lo + Math.imul(al0, bl5)) | 0;
      mid = (mid + Math.imul(al0, bh5)) | 0;
      mid = (mid + Math.imul(ah0, bl5)) | 0;
      hi = (hi + Math.imul(ah0, bh5)) | 0;
      var w5 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
      c = (((hi + (mid >>> 13)) | 0) + (w5 >>> 26)) | 0;
      w5 &= 0x3ffffff;
      /* k = 6 */
      lo = Math.imul(al6, bl0);
      mid = Math.imul(al6, bh0);
      mid = (mid + Math.imul(ah6, bl0)) | 0;
      hi = Math.imul(ah6, bh0);
      lo = (lo + Math.imul(al5, bl1)) | 0;
      mid = (mid + Math.imul(al5, bh1)) | 0;
      mid = (mid + Math.imul(ah5, bl1)) | 0;
      hi = (hi + Math.imul(ah5, bh1)) | 0;
      lo = (lo + Math.imul(al4, bl2)) | 0;
      mid = (mid + Math.imul(al4, bh2)) | 0;
      mid = (mid + Math.imul(ah4, bl2)) | 0;
      hi = (hi + Math.imul(ah4, bh2)) | 0;
      lo = (lo + Math.imul(al3, bl3)) | 0;
      mid = (mid + Math.imul(al3, bh3)) | 0;
      mid = (mid + Math.imul(ah3, bl3)) | 0;
      hi = (hi + Math.imul(ah3, bh3)) | 0;
      lo = (lo + Math.imul(al2, bl4)) | 0;
      mid = (mid + Math.imul(al2, bh4)) | 0;
      mid = (mid + Math.imul(ah2, bl4)) | 0;
      hi = (hi + Math.imul(ah2, bh4)) | 0;
      lo = (lo + Math.imul(al1, bl5)) | 0;
      mid = (mid + Math.imul(al1, bh5)) | 0;
      mid = (mid + Math.imul(ah1, bl5)) | 0;
      hi = (hi + Math.imul(ah1, bh5)) | 0;
      lo = (lo + Math.imul(al0, bl6)) | 0;
      mid = (mid + Math.imul(al0, bh6)) | 0;
      mid = (mid + Math.imul(ah0, bl6)) | 0;
      hi = (hi + Math.imul(ah0, bh6)) | 0;
      var w6 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
      c = (((hi + (mid >>> 13)) | 0) + (w6 >>> 26)) | 0;
      w6 &= 0x3ffffff;
      /* k = 7 */
      lo = Math.imul(al7, bl0);
      mid = Math.imul(al7, bh0);
      mid = (mid + Math.imul(ah7, bl0)) | 0;
      hi = Math.imul(ah7, bh0);
      lo = (lo + Math.imul(al6, bl1)) | 0;
      mid = (mid + Math.imul(al6, bh1)) | 0;
      mid = (mid + Math.imul(ah6, bl1)) | 0;
      hi = (hi + Math.imul(ah6, bh1)) | 0;
      lo = (lo + Math.imul(al5, bl2)) | 0;
      mid = (mid + Math.imul(al5, bh2)) | 0;
      mid = (mid + Math.imul(ah5, bl2)) | 0;
      hi = (hi + Math.imul(ah5, bh2)) | 0;
      lo = (lo + Math.imul(al4, bl3)) | 0;
      mid = (mid + Math.imul(al4, bh3)) | 0;
      mid = (mid + Math.imul(ah4, bl3)) | 0;
      hi = (hi + Math.imul(ah4, bh3)) | 0;
      lo = (lo + Math.imul(al3, bl4)) | 0;
      mid = (mid + Math.imul(al3, bh4)) | 0;
      mid = (mid + Math.imul(ah3, bl4)) | 0;
      hi = (hi + Math.imul(ah3, bh4)) | 0;
      lo = (lo + Math.imul(al2, bl5)) | 0;
      mid = (mid + Math.imul(al2, bh5)) | 0;
      mid = (mid + Math.imul(ah2, bl5)) | 0;
      hi = (hi + Math.imul(ah2, bh5)) | 0;
      lo = (lo + Math.imul(al1, bl6)) | 0;
      mid = (mid + Math.imul(al1, bh6)) | 0;
      mid = (mid + Math.imul(ah1, bl6)) | 0;
      hi = (hi + Math.imul(ah1, bh6)) | 0;
      lo = (lo + Math.imul(al0, bl7)) | 0;
      mid = (mid + Math.imul(al0, bh7)) | 0;
      mid = (mid + Math.imul(ah0, bl7)) | 0;
      hi = (hi + Math.imul(ah0, bh7)) | 0;
      var w7 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
      c = (((hi + (mid >>> 13)) | 0) + (w7 >>> 26)) | 0;
      w7 &= 0x3ffffff;
      /* k = 8 */
      lo = Math.imul(al8, bl0);
      mid = Math.imul(al8, bh0);
      mid = (mid + Math.imul(ah8, bl0)) | 0;
      hi = Math.imul(ah8, bh0);
      lo = (lo + Math.imul(al7, bl1)) | 0;
      mid = (mid + Math.imul(al7, bh1)) | 0;
      mid = (mid + Math.imul(ah7, bl1)) | 0;
      hi = (hi + Math.imul(ah7, bh1)) | 0;
      lo = (lo + Math.imul(al6, bl2)) | 0;
      mid = (mid + Math.imul(al6, bh2)) | 0;
      mid = (mid + Math.imul(ah6, bl2)) | 0;
      hi = (hi + Math.imul(ah6, bh2)) | 0;
      lo = (lo + Math.imul(al5, bl3)) | 0;
      mid = (mid + Math.imul(al5, bh3)) | 0;
      mid = (mid + Math.imul(ah5, bl3)) | 0;
      hi = (hi + Math.imul(ah5, bh3)) | 0;
      lo = (lo + Math.imul(al4, bl4)) | 0;
      mid = (mid + Math.imul(al4, bh4)) | 0;
      mid = (mid + Math.imul(ah4, bl4)) | 0;
      hi = (hi + Math.imul(ah4, bh4)) | 0;
      lo = (lo + Math.imul(al3, bl5)) | 0;
      mid = (mid + Math.imul(al3, bh5)) | 0;
      mid = (mid + Math.imul(ah3, bl5)) | 0;
      hi = (hi + Math.imul(ah3, bh5)) | 0;
      lo = (lo + Math.imul(al2, bl6)) | 0;
      mid = (mid + Math.imul(al2, bh6)) | 0;
      mid = (mid + Math.imul(ah2, bl6)) | 0;
      hi = (hi + Math.imul(ah2, bh6)) | 0;
      lo = (lo + Math.imul(al1, bl7)) | 0;
      mid = (mid + Math.imul(al1, bh7)) | 0;
      mid = (mid + Math.imul(ah1, bl7)) | 0;
      hi = (hi + Math.imul(ah1, bh7)) | 0;
      lo = (lo + Math.imul(al0, bl8)) | 0;
      mid = (mid + Math.imul(al0, bh8)) | 0;
      mid = (mid + Math.imul(ah0, bl8)) | 0;
      hi = (hi + Math.imul(ah0, bh8)) | 0;
      var w8 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
      c = (((hi + (mid >>> 13)) | 0) + (w8 >>> 26)) | 0;
      w8 &= 0x3ffffff;
      /* k = 9 */
      lo = Math.imul(al9, bl0);
      mid = Math.imul(al9, bh0);
      mid = (mid + Math.imul(ah9, bl0)) | 0;
      hi = Math.imul(ah9, bh0);
      lo = (lo + Math.imul(al8, bl1)) | 0;
      mid = (mid + Math.imul(al8, bh1)) | 0;
      mid = (mid + Math.imul(ah8, bl1)) | 0;
      hi = (hi + Math.imul(ah8, bh1)) | 0;
      lo = (lo + Math.imul(al7, bl2)) | 0;
      mid = (mid + Math.imul(al7, bh2)) | 0;
      mid = (mid + Math.imul(ah7, bl2)) | 0;
      hi = (hi + Math.imul(ah7, bh2)) | 0;
      lo = (lo + Math.imul(al6, bl3)) | 0;
      mid = (mid + Math.imul(al6, bh3)) | 0;
      mid = (mid + Math.imul(ah6, bl3)) | 0;
      hi = (hi + Math.imul(ah6, bh3)) | 0;
      lo = (lo + Math.imul(al5, bl4)) | 0;
      mid = (mid + Math.imul(al5, bh4)) | 0;
      mid = (mid + Math.imul(ah5, bl4)) | 0;
      hi = (hi + Math.imul(ah5, bh4)) | 0;
      lo = (lo + Math.imul(al4, bl5)) | 0;
      mid = (mid + Math.imul(al4, bh5)) | 0;
      mid = (mid + Math.imul(ah4, bl5)) | 0;
      hi = (hi + Math.imul(ah4, bh5)) | 0;
      lo = (lo + Math.imul(al3, bl6)) | 0;
      mid = (mid + Math.imul(al3, bh6)) | 0;
      mid = (mid + Math.imul(ah3, bl6)) | 0;
      hi = (hi + Math.imul(ah3, bh6)) | 0;
      lo = (lo + Math.imul(al2, bl7)) | 0;
      mid = (mid + Math.imul(al2, bh7)) | 0;
      mid = (mid + Math.imul(ah2, bl7)) | 0;
      hi = (hi + Math.imul(ah2, bh7)) | 0;
      lo = (lo + Math.imul(al1, bl8)) | 0;
      mid = (mid + Math.imul(al1, bh8)) | 0;
      mid = (mid + Math.imul(ah1, bl8)) | 0;
      hi = (hi + Math.imul(ah1, bh8)) | 0;
      lo = (lo + Math.imul(al0, bl9)) | 0;
      mid = (mid + Math.imul(al0, bh9)) | 0;
      mid = (mid + Math.imul(ah0, bl9)) | 0;
      hi = (hi + Math.imul(ah0, bh9)) | 0;
      var w9 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
      c = (((hi + (mid >>> 13)) | 0) + (w9 >>> 26)) | 0;
      w9 &= 0x3ffffff;
      /* k = 10 */
      lo = Math.imul(al9, bl1);
      mid = Math.imul(al9, bh1);
      mid = (mid + Math.imul(ah9, bl1)) | 0;
      hi = Math.imul(ah9, bh1);
      lo = (lo + Math.imul(al8, bl2)) | 0;
      mid = (mid + Math.imul(al8, bh2)) | 0;
      mid = (mid + Math.imul(ah8, bl2)) | 0;
      hi = (hi + Math.imul(ah8, bh2)) | 0;
      lo = (lo + Math.imul(al7, bl3)) | 0;
      mid = (mid + Math.imul(al7, bh3)) | 0;
      mid = (mid + Math.imul(ah7, bl3)) | 0;
      hi = (hi + Math.imul(ah7, bh3)) | 0;
      lo = (lo + Math.imul(al6, bl4)) | 0;
      mid = (mid + Math.imul(al6, bh4)) | 0;
      mid = (mid + Math.imul(ah6, bl4)) | 0;
      hi = (hi + Math.imul(ah6, bh4)) | 0;
      lo = (lo + Math.imul(al5, bl5)) | 0;
      mid = (mid + Math.imul(al5, bh5)) | 0;
      mid = (mid + Math.imul(ah5, bl5)) | 0;
      hi = (hi + Math.imul(ah5, bh5)) | 0;
      lo = (lo + Math.imul(al4, bl6)) | 0;
      mid = (mid + Math.imul(al4, bh6)) | 0;
      mid = (mid + Math.imul(ah4, bl6)) | 0;
      hi = (hi + Math.imul(ah4, bh6)) | 0;
      lo = (lo + Math.imul(al3, bl7)) | 0;
      mid = (mid + Math.imul(al3, bh7)) | 0;
      mid = (mid + Math.imul(ah3, bl7)) | 0;
      hi = (hi + Math.imul(ah3, bh7)) | 0;
      lo = (lo + Math.imul(al2, bl8)) | 0;
      mid = (mid + Math.imul(al2, bh8)) | 0;
      mid = (mid + Math.imul(ah2, bl8)) | 0;
      hi = (hi + Math.imul(ah2, bh8)) | 0;
      lo = (lo + Math.imul(al1, bl9)) | 0;
      mid = (mid + Math.imul(al1, bh9)) | 0;
      mid = (mid + Math.imul(ah1, bl9)) | 0;
      hi = (hi + Math.imul(ah1, bh9)) | 0;
      var w10 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
      c = (((hi + (mid >>> 13)) | 0) + (w10 >>> 26)) | 0;
      w10 &= 0x3ffffff;
      /* k = 11 */
      lo = Math.imul(al9, bl2);
      mid = Math.imul(al9, bh2);
      mid = (mid + Math.imul(ah9, bl2)) | 0;
      hi = Math.imul(ah9, bh2);
      lo = (lo + Math.imul(al8, bl3)) | 0;
      mid = (mid + Math.imul(al8, bh3)) | 0;
      mid = (mid + Math.imul(ah8, bl3)) | 0;
      hi = (hi + Math.imul(ah8, bh3)) | 0;
      lo = (lo + Math.imul(al7, bl4)) | 0;
      mid = (mid + Math.imul(al7, bh4)) | 0;
      mid = (mid + Math.imul(ah7, bl4)) | 0;
      hi = (hi + Math.imul(ah7, bh4)) | 0;
      lo = (lo + Math.imul(al6, bl5)) | 0;
      mid = (mid + Math.imul(al6, bh5)) | 0;
      mid = (mid + Math.imul(ah6, bl5)) | 0;
      hi = (hi + Math.imul(ah6, bh5)) | 0;
      lo = (lo + Math.imul(al5, bl6)) | 0;
      mid = (mid + Math.imul(al5, bh6)) | 0;
      mid = (mid + Math.imul(ah5, bl6)) | 0;
      hi = (hi + Math.imul(ah5, bh6)) | 0;
      lo = (lo + Math.imul(al4, bl7)) | 0;
      mid = (mid + Math.imul(al4, bh7)) | 0;
      mid = (mid + Math.imul(ah4, bl7)) | 0;
      hi = (hi + Math.imul(ah4, bh7)) | 0;
      lo = (lo + Math.imul(al3, bl8)) | 0;
      mid = (mid + Math.imul(al3, bh8)) | 0;
      mid = (mid + Math.imul(ah3, bl8)) | 0;
      hi = (hi + Math.imul(ah3, bh8)) | 0;
      lo = (lo + Math.imul(al2, bl9)) | 0;
      mid = (mid + Math.imul(al2, bh9)) | 0;
      mid = (mid + Math.imul(ah2, bl9)) | 0;
      hi = (hi + Math.imul(ah2, bh9)) | 0;
      var w11 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
      c = (((hi + (mid >>> 13)) | 0) + (w11 >>> 26)) | 0;
      w11 &= 0x3ffffff;
      /* k = 12 */
      lo = Math.imul(al9, bl3);
      mid = Math.imul(al9, bh3);
      mid = (mid + Math.imul(ah9, bl3)) | 0;
      hi = Math.imul(ah9, bh3);
      lo = (lo + Math.imul(al8, bl4)) | 0;
      mid = (mid + Math.imul(al8, bh4)) | 0;
      mid = (mid + Math.imul(ah8, bl4)) | 0;
      hi = (hi + Math.imul(ah8, bh4)) | 0;
      lo = (lo + Math.imul(al7, bl5)) | 0;
      mid = (mid + Math.imul(al7, bh5)) | 0;
      mid = (mid + Math.imul(ah7, bl5)) | 0;
      hi = (hi + Math.imul(ah7, bh5)) | 0;
      lo = (lo + Math.imul(al6, bl6)) | 0;
      mid = (mid + Math.imul(al6, bh6)) | 0;
      mid = (mid + Math.imul(ah6, bl6)) | 0;
      hi = (hi + Math.imul(ah6, bh6)) | 0;
      lo = (lo + Math.imul(al5, bl7)) | 0;
      mid = (mid + Math.imul(al5, bh7)) | 0;
      mid = (mid + Math.imul(ah5, bl7)) | 0;
      hi = (hi + Math.imul(ah5, bh7)) | 0;
      lo = (lo + Math.imul(al4, bl8)) | 0;
      mid = (mid + Math.imul(al4, bh8)) | 0;
      mid = (mid + Math.imul(ah4, bl8)) | 0;
      hi = (hi + Math.imul(ah4, bh8)) | 0;
      lo = (lo + Math.imul(al3, bl9)) | 0;
      mid = (mid + Math.imul(al3, bh9)) | 0;
      mid = (mid + Math.imul(ah3, bl9)) | 0;
      hi = (hi + Math.imul(ah3, bh9)) | 0;
      var w12 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
      c = (((hi + (mid >>> 13)) | 0) + (w12 >>> 26)) | 0;
      w12 &= 0x3ffffff;
      /* k = 13 */
      lo = Math.imul(al9, bl4);
      mid = Math.imul(al9, bh4);
      mid = (mid + Math.imul(ah9, bl4)) | 0;
      hi = Math.imul(ah9, bh4);
      lo = (lo + Math.imul(al8, bl5)) | 0;
      mid = (mid + Math.imul(al8, bh5)) | 0;
      mid = (mid + Math.imul(ah8, bl5)) | 0;
      hi = (hi + Math.imul(ah8, bh5)) | 0;
      lo = (lo + Math.imul(al7, bl6)) | 0;
      mid = (mid + Math.imul(al7, bh6)) | 0;
      mid = (mid + Math.imul(ah7, bl6)) | 0;
      hi = (hi + Math.imul(ah7, bh6)) | 0;
      lo = (lo + Math.imul(al6, bl7)) | 0;
      mid = (mid + Math.imul(al6, bh7)) | 0;
      mid = (mid + Math.imul(ah6, bl7)) | 0;
      hi = (hi + Math.imul(ah6, bh7)) | 0;
      lo = (lo + Math.imul(al5, bl8)) | 0;
      mid = (mid + Math.imul(al5, bh8)) | 0;
      mid = (mid + Math.imul(ah5, bl8)) | 0;
      hi = (hi + Math.imul(ah5, bh8)) | 0;
      lo = (lo + Math.imul(al4, bl9)) | 0;
      mid = (mid + Math.imul(al4, bh9)) | 0;
      mid = (mid + Math.imul(ah4, bl9)) | 0;
      hi = (hi + Math.imul(ah4, bh9)) | 0;
      var w13 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
      c = (((hi + (mid >>> 13)) | 0) + (w13 >>> 26)) | 0;
      w13 &= 0x3ffffff;
      /* k = 14 */
      lo = Math.imul(al9, bl5);
      mid = Math.imul(al9, bh5);
      mid = (mid + Math.imul(ah9, bl5)) | 0;
      hi = Math.imul(ah9, bh5);
      lo = (lo + Math.imul(al8, bl6)) | 0;
      mid = (mid + Math.imul(al8, bh6)) | 0;
      mid = (mid + Math.imul(ah8, bl6)) | 0;
      hi = (hi + Math.imul(ah8, bh6)) | 0;
      lo = (lo + Math.imul(al7, bl7)) | 0;
      mid = (mid + Math.imul(al7, bh7)) | 0;
      mid = (mid + Math.imul(ah7, bl7)) | 0;
      hi = (hi + Math.imul(ah7, bh7)) | 0;
      lo = (lo + Math.imul(al6, bl8)) | 0;
      mid = (mid + Math.imul(al6, bh8)) | 0;
      mid = (mid + Math.imul(ah6, bl8)) | 0;
      hi = (hi + Math.imul(ah6, bh8)) | 0;
      lo = (lo + Math.imul(al5, bl9)) | 0;
      mid = (mid + Math.imul(al5, bh9)) | 0;
      mid = (mid + Math.imul(ah5, bl9)) | 0;
      hi = (hi + Math.imul(ah5, bh9)) | 0;
      var w14 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
      c = (((hi + (mid >>> 13)) | 0) + (w14 >>> 26)) | 0;
      w14 &= 0x3ffffff;
      /* k = 15 */
      lo = Math.imul(al9, bl6);
      mid = Math.imul(al9, bh6);
      mid = (mid + Math.imul(ah9, bl6)) | 0;
      hi = Math.imul(ah9, bh6);
      lo = (lo + Math.imul(al8, bl7)) | 0;
      mid = (mid + Math.imul(al8, bh7)) | 0;
      mid = (mid + Math.imul(ah8, bl7)) | 0;
      hi = (hi + Math.imul(ah8, bh7)) | 0;
      lo = (lo + Math.imul(al7, bl8)) | 0;
      mid = (mid + Math.imul(al7, bh8)) | 0;
      mid = (mid + Math.imul(ah7, bl8)) | 0;
      hi = (hi + Math.imul(ah7, bh8)) | 0;
      lo = (lo + Math.imul(al6, bl9)) | 0;
      mid = (mid + Math.imul(al6, bh9)) | 0;
      mid = (mid + Math.imul(ah6, bl9)) | 0;
      hi = (hi + Math.imul(ah6, bh9)) | 0;
      var w15 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
      c = (((hi + (mid >>> 13)) | 0) + (w15 >>> 26)) | 0;
      w15 &= 0x3ffffff;
      /* k = 16 */
      lo = Math.imul(al9, bl7);
      mid = Math.imul(al9, bh7);
      mid = (mid + Math.imul(ah9, bl7)) | 0;
      hi = Math.imul(ah9, bh7);
      lo = (lo + Math.imul(al8, bl8)) | 0;
      mid = (mid + Math.imul(al8, bh8)) | 0;
      mid = (mid + Math.imul(ah8, bl8)) | 0;
      hi = (hi + Math.imul(ah8, bh8)) | 0;
      lo = (lo + Math.imul(al7, bl9)) | 0;
      mid = (mid + Math.imul(al7, bh9)) | 0;
      mid = (mid + Math.imul(ah7, bl9)) | 0;
      hi = (hi + Math.imul(ah7, bh9)) | 0;
      var w16 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
      c = (((hi + (mid >>> 13)) | 0) + (w16 >>> 26)) | 0;
      w16 &= 0x3ffffff;
      /* k = 17 */
      lo = Math.imul(al9, bl8);
      mid = Math.imul(al9, bh8);
      mid = (mid + Math.imul(ah9, bl8)) | 0;
      hi = Math.imul(ah9, bh8);
      lo = (lo + Math.imul(al8, bl9)) | 0;
      mid = (mid + Math.imul(al8, bh9)) | 0;
      mid = (mid + Math.imul(ah8, bl9)) | 0;
      hi = (hi + Math.imul(ah8, bh9)) | 0;
      var w17 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
      c = (((hi + (mid >>> 13)) | 0) + (w17 >>> 26)) | 0;
      w17 &= 0x3ffffff;
      /* k = 18 */
      lo = Math.imul(al9, bl9);
      mid = Math.imul(al9, bh9);
      mid = (mid + Math.imul(ah9, bl9)) | 0;
      hi = Math.imul(ah9, bh9);
      var w18 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
      c = (((hi + (mid >>> 13)) | 0) + (w18 >>> 26)) | 0;
      w18 &= 0x3ffffff;
      o[0] = w0;
      o[1] = w1;
      o[2] = w2;
      o[3] = w3;
      o[4] = w4;
      o[5] = w5;
      o[6] = w6;
      o[7] = w7;
      o[8] = w8;
      o[9] = w9;
      o[10] = w10;
      o[11] = w11;
      o[12] = w12;
      o[13] = w13;
      o[14] = w14;
      o[15] = w15;
      o[16] = w16;
      o[17] = w17;
      o[18] = w18;
      if (c !== 0) {
        o[19] = c;
        out.length++;
      }
      return out;
    };

    // Polyfill comb
    if (!Math.imul) {
      comb10MulTo = smallMulTo;
    }

    function bigMulTo (self, num, out) {
      out.negative = num.negative ^ self.negative;
      out.length = self.length + num.length;

      var carry = 0;
      var hncarry = 0;
      for (var k = 0; k < out.length - 1; k++) {
        // Sum all words with the same `i + j = k` and accumulate `ncarry`,
        // note that ncarry could be >= 0x3ffffff
        var ncarry = hncarry;
        hncarry = 0;
        var rword = carry & 0x3ffffff;
        var maxJ = Math.min(k, num.length - 1);
        for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
          var i = k - j;
          var a = self.words[i] | 0;
          var b = num.words[j] | 0;
          var r = a * b;

          var lo = r & 0x3ffffff;
          ncarry = (ncarry + ((r / 0x4000000) | 0)) | 0;
          lo = (lo + rword) | 0;
          rword = lo & 0x3ffffff;
          ncarry = (ncarry + (lo >>> 26)) | 0;

          hncarry += ncarry >>> 26;
          ncarry &= 0x3ffffff;
        }
        out.words[k] = rword;
        carry = ncarry;
        ncarry = hncarry;
      }
      if (carry !== 0) {
        out.words[k] = carry;
      } else {
        out.length--;
      }

      return out._strip();
    }

    function jumboMulTo (self, num, out) {
      // Temporary disable, see https://github.com/indutny/bn.js/issues/211
      // var fftm = new FFTM();
      // return fftm.mulp(self, num, out);
      return bigMulTo(self, num, out);
    }

    BN.prototype.mulTo = function mulTo (num, out) {
      var res;
      var len = this.length + num.length;
      if (this.length === 10 && num.length === 10) {
        res = comb10MulTo(this, num, out);
      } else if (len < 63) {
        res = smallMulTo(this, num, out);
      } else if (len < 1024) {
        res = bigMulTo(this, num, out);
      } else {
        res = jumboMulTo(this, num, out);
      }

      return res;
    };

    // Multiply `this` by `num`
    BN.prototype.mul = function mul (num) {
      var out = new BN(null);
      out.words = new Array(this.length + num.length);
      return this.mulTo(num, out);
    };

    // Multiply employing FFT
    BN.prototype.mulf = function mulf (num) {
      var out = new BN(null);
      out.words = new Array(this.length + num.length);
      return jumboMulTo(this, num, out);
    };

    // In-place Multiplication
    BN.prototype.imul = function imul (num) {
      return this.clone().mulTo(num, this);
    };

    BN.prototype.imuln = function imuln (num) {
      var isNegNum = num < 0;
      if (isNegNum) num = -num;

      assert(typeof num === 'number');
      assert(num < 0x4000000);

      // Carry
      var carry = 0;
      for (var i = 0; i < this.length; i++) {
        var w = (this.words[i] | 0) * num;
        var lo = (w & 0x3ffffff) + (carry & 0x3ffffff);
        carry >>= 26;
        carry += (w / 0x4000000) | 0;
        // NOTE: lo is 27bit maximum
        carry += lo >>> 26;
        this.words[i] = lo & 0x3ffffff;
      }

      if (carry !== 0) {
        this.words[i] = carry;
        this.length++;
      }

      return isNegNum ? this.ineg() : this;
    };

    BN.prototype.muln = function muln (num) {
      return this.clone().imuln(num);
    };

    // `this` * `this`
    BN.prototype.sqr = function sqr () {
      return this.mul(this);
    };

    // `this` * `this` in-place
    BN.prototype.isqr = function isqr () {
      return this.imul(this.clone());
    };

    // Math.pow(`this`, `num`)
    BN.prototype.pow = function pow (num) {
      var w = toBitArray(num);
      if (w.length === 0) return new BN(1);

      // Skip leading zeroes
      var res = this;
      for (var i = 0; i < w.length; i++, res = res.sqr()) {
        if (w[i] !== 0) break;
      }

      if (++i < w.length) {
        for (var q = res.sqr(); i < w.length; i++, q = q.sqr()) {
          if (w[i] === 0) continue;

          res = res.mul(q);
        }
      }

      return res;
    };

    // Shift-left in-place
    BN.prototype.iushln = function iushln (bits) {
      assert(typeof bits === 'number' && bits >= 0);
      var r = bits % 26;
      var s = (bits - r) / 26;
      var carryMask = (0x3ffffff >>> (26 - r)) << (26 - r);
      var i;

      if (r !== 0) {
        var carry = 0;

        for (i = 0; i < this.length; i++) {
          var newCarry = this.words[i] & carryMask;
          var c = ((this.words[i] | 0) - newCarry) << r;
          this.words[i] = c | carry;
          carry = newCarry >>> (26 - r);
        }

        if (carry) {
          this.words[i] = carry;
          this.length++;
        }
      }

      if (s !== 0) {
        for (i = this.length - 1; i >= 0; i--) {
          this.words[i + s] = this.words[i];
        }

        for (i = 0; i < s; i++) {
          this.words[i] = 0;
        }

        this.length += s;
      }

      return this._strip();
    };

    BN.prototype.ishln = function ishln (bits) {
      // TODO(indutny): implement me
      assert(this.negative === 0);
      return this.iushln(bits);
    };

    // Shift-right in-place
    // NOTE: `hint` is a lowest bit before trailing zeroes
    // NOTE: if `extended` is present - it will be filled with destroyed bits
    BN.prototype.iushrn = function iushrn (bits, hint, extended) {
      assert(typeof bits === 'number' && bits >= 0);
      var h;
      if (hint) {
        h = (hint - (hint % 26)) / 26;
      } else {
        h = 0;
      }

      var r = bits % 26;
      var s = Math.min((bits - r) / 26, this.length);
      var mask = 0x3ffffff ^ ((0x3ffffff >>> r) << r);
      var maskedWords = extended;

      h -= s;
      h = Math.max(0, h);

      // Extended mode, copy masked part
      if (maskedWords) {
        for (var i = 0; i < s; i++) {
          maskedWords.words[i] = this.words[i];
        }
        maskedWords.length = s;
      }

      if (s === 0) ; else if (this.length > s) {
        this.length -= s;
        for (i = 0; i < this.length; i++) {
          this.words[i] = this.words[i + s];
        }
      } else {
        this.words[0] = 0;
        this.length = 1;
      }

      var carry = 0;
      for (i = this.length - 1; i >= 0 && (carry !== 0 || i >= h); i--) {
        var word = this.words[i] | 0;
        this.words[i] = (carry << (26 - r)) | (word >>> r);
        carry = word & mask;
      }

      // Push carried bits as a mask
      if (maskedWords && carry !== 0) {
        maskedWords.words[maskedWords.length++] = carry;
      }

      if (this.length === 0) {
        this.words[0] = 0;
        this.length = 1;
      }

      return this._strip();
    };

    BN.prototype.ishrn = function ishrn (bits, hint, extended) {
      // TODO(indutny): implement me
      assert(this.negative === 0);
      return this.iushrn(bits, hint, extended);
    };

    // Shift-left
    BN.prototype.shln = function shln (bits) {
      return this.clone().ishln(bits);
    };

    BN.prototype.ushln = function ushln (bits) {
      return this.clone().iushln(bits);
    };

    // Shift-right
    BN.prototype.shrn = function shrn (bits) {
      return this.clone().ishrn(bits);
    };

    BN.prototype.ushrn = function ushrn (bits) {
      return this.clone().iushrn(bits);
    };

    // Test if n bit is set
    BN.prototype.testn = function testn (bit) {
      assert(typeof bit === 'number' && bit >= 0);
      var r = bit % 26;
      var s = (bit - r) / 26;
      var q = 1 << r;

      // Fast case: bit is much higher than all existing words
      if (this.length <= s) return false;

      // Check bit and return
      var w = this.words[s];

      return !!(w & q);
    };

    // Return only lowers bits of number (in-place)
    BN.prototype.imaskn = function imaskn (bits) {
      assert(typeof bits === 'number' && bits >= 0);
      var r = bits % 26;
      var s = (bits - r) / 26;

      assert(this.negative === 0, 'imaskn works only with positive numbers');

      if (this.length <= s) {
        return this;
      }

      if (r !== 0) {
        s++;
      }
      this.length = Math.min(s, this.length);

      if (r !== 0) {
        var mask = 0x3ffffff ^ ((0x3ffffff >>> r) << r);
        this.words[this.length - 1] &= mask;
      }

      return this._strip();
    };

    // Return only lowers bits of number
    BN.prototype.maskn = function maskn (bits) {
      return this.clone().imaskn(bits);
    };

    // Add plain number `num` to `this`
    BN.prototype.iaddn = function iaddn (num) {
      assert(typeof num === 'number');
      assert(num < 0x4000000);
      if (num < 0) return this.isubn(-num);

      // Possible sign change
      if (this.negative !== 0) {
        if (this.length === 1 && (this.words[0] | 0) <= num) {
          this.words[0] = num - (this.words[0] | 0);
          this.negative = 0;
          return this;
        }

        this.negative = 0;
        this.isubn(num);
        this.negative = 1;
        return this;
      }

      // Add without checks
      return this._iaddn(num);
    };

    BN.prototype._iaddn = function _iaddn (num) {
      this.words[0] += num;

      // Carry
      for (var i = 0; i < this.length && this.words[i] >= 0x4000000; i++) {
        this.words[i] -= 0x4000000;
        if (i === this.length - 1) {
          this.words[i + 1] = 1;
        } else {
          this.words[i + 1]++;
        }
      }
      this.length = Math.max(this.length, i + 1);

      return this;
    };

    // Subtract plain number `num` from `this`
    BN.prototype.isubn = function isubn (num) {
      assert(typeof num === 'number');
      assert(num < 0x4000000);
      if (num < 0) return this.iaddn(-num);

      if (this.negative !== 0) {
        this.negative = 0;
        this.iaddn(num);
        this.negative = 1;
        return this;
      }

      this.words[0] -= num;

      if (this.length === 1 && this.words[0] < 0) {
        this.words[0] = -this.words[0];
        this.negative = 1;
      } else {
        // Carry
        for (var i = 0; i < this.length && this.words[i] < 0; i++) {
          this.words[i] += 0x4000000;
          this.words[i + 1] -= 1;
        }
      }

      return this._strip();
    };

    BN.prototype.addn = function addn (num) {
      return this.clone().iaddn(num);
    };

    BN.prototype.subn = function subn (num) {
      return this.clone().isubn(num);
    };

    BN.prototype.iabs = function iabs () {
      this.negative = 0;

      return this;
    };

    BN.prototype.abs = function abs () {
      return this.clone().iabs();
    };

    BN.prototype._ishlnsubmul = function _ishlnsubmul (num, mul, shift) {
      var len = num.length + shift;
      var i;

      this._expand(len);

      var w;
      var carry = 0;
      for (i = 0; i < num.length; i++) {
        w = (this.words[i + shift] | 0) + carry;
        var right = (num.words[i] | 0) * mul;
        w -= right & 0x3ffffff;
        carry = (w >> 26) - ((right / 0x4000000) | 0);
        this.words[i + shift] = w & 0x3ffffff;
      }
      for (; i < this.length - shift; i++) {
        w = (this.words[i + shift] | 0) + carry;
        carry = w >> 26;
        this.words[i + shift] = w & 0x3ffffff;
      }

      if (carry === 0) return this._strip();

      // Subtraction overflow
      assert(carry === -1);
      carry = 0;
      for (i = 0; i < this.length; i++) {
        w = -(this.words[i] | 0) + carry;
        carry = w >> 26;
        this.words[i] = w & 0x3ffffff;
      }
      this.negative = 1;

      return this._strip();
    };

    BN.prototype._wordDiv = function _wordDiv (num, mode) {
      var shift = this.length - num.length;

      var a = this.clone();
      var b = num;

      // Normalize
      var bhi = b.words[b.length - 1] | 0;
      var bhiBits = this._countBits(bhi);
      shift = 26 - bhiBits;
      if (shift !== 0) {
        b = b.ushln(shift);
        a.iushln(shift);
        bhi = b.words[b.length - 1] | 0;
      }

      // Initialize quotient
      var m = a.length - b.length;
      var q;

      if (mode !== 'mod') {
        q = new BN(null);
        q.length = m + 1;
        q.words = new Array(q.length);
        for (var i = 0; i < q.length; i++) {
          q.words[i] = 0;
        }
      }

      var diff = a.clone()._ishlnsubmul(b, 1, m);
      if (diff.negative === 0) {
        a = diff;
        if (q) {
          q.words[m] = 1;
        }
      }

      for (var j = m - 1; j >= 0; j--) {
        var qj = (a.words[b.length + j] | 0) * 0x4000000 +
          (a.words[b.length + j - 1] | 0);

        // NOTE: (qj / bhi) is (0x3ffffff * 0x4000000 + 0x3ffffff) / 0x2000000 max
        // (0x7ffffff)
        qj = Math.min((qj / bhi) | 0, 0x3ffffff);

        a._ishlnsubmul(b, qj, j);
        while (a.negative !== 0) {
          qj--;
          a.negative = 0;
          a._ishlnsubmul(b, 1, j);
          if (!a.isZero()) {
            a.negative ^= 1;
          }
        }
        if (q) {
          q.words[j] = qj;
        }
      }
      if (q) {
        q._strip();
      }
      a._strip();

      // Denormalize
      if (mode !== 'div' && shift !== 0) {
        a.iushrn(shift);
      }

      return {
        div: q || null,
        mod: a
      };
    };

    // NOTE: 1) `mode` can be set to `mod` to request mod only,
    //       to `div` to request div only, or be absent to
    //       request both div & mod
    //       2) `positive` is true if unsigned mod is requested
    BN.prototype.divmod = function divmod (num, mode, positive) {
      assert(!num.isZero());

      if (this.isZero()) {
        return {
          div: new BN(0),
          mod: new BN(0)
        };
      }

      var div, mod, res;
      if (this.negative !== 0 && num.negative === 0) {
        res = this.neg().divmod(num, mode);

        if (mode !== 'mod') {
          div = res.div.neg();
        }

        if (mode !== 'div') {
          mod = res.mod.neg();
          if (positive && mod.negative !== 0) {
            mod.iadd(num);
          }
        }

        return {
          div: div,
          mod: mod
        };
      }

      if (this.negative === 0 && num.negative !== 0) {
        res = this.divmod(num.neg(), mode);

        if (mode !== 'mod') {
          div = res.div.neg();
        }

        return {
          div: div,
          mod: res.mod
        };
      }

      if ((this.negative & num.negative) !== 0) {
        res = this.neg().divmod(num.neg(), mode);

        if (mode !== 'div') {
          mod = res.mod.neg();
          if (positive && mod.negative !== 0) {
            mod.isub(num);
          }
        }

        return {
          div: res.div,
          mod: mod
        };
      }

      // Both numbers are positive at this point

      // Strip both numbers to approximate shift value
      if (num.length > this.length || this.cmp(num) < 0) {
        return {
          div: new BN(0),
          mod: this
        };
      }

      // Very short reduction
      if (num.length === 1) {
        if (mode === 'div') {
          return {
            div: this.divn(num.words[0]),
            mod: null
          };
        }

        if (mode === 'mod') {
          return {
            div: null,
            mod: new BN(this.modrn(num.words[0]))
          };
        }

        return {
          div: this.divn(num.words[0]),
          mod: new BN(this.modrn(num.words[0]))
        };
      }

      return this._wordDiv(num, mode);
    };

    // Find `this` / `num`
    BN.prototype.div = function div (num) {
      return this.divmod(num, 'div', false).div;
    };

    // Find `this` % `num`
    BN.prototype.mod = function mod (num) {
      return this.divmod(num, 'mod', false).mod;
    };

    BN.prototype.umod = function umod (num) {
      return this.divmod(num, 'mod', true).mod;
    };

    // Find Round(`this` / `num`)
    BN.prototype.divRound = function divRound (num) {
      var dm = this.divmod(num);

      // Fast case - exact division
      if (dm.mod.isZero()) return dm.div;

      var mod = dm.div.negative !== 0 ? dm.mod.isub(num) : dm.mod;

      var half = num.ushrn(1);
      var r2 = num.andln(1);
      var cmp = mod.cmp(half);

      // Round down
      if (cmp < 0 || (r2 === 1 && cmp === 0)) return dm.div;

      // Round up
      return dm.div.negative !== 0 ? dm.div.isubn(1) : dm.div.iaddn(1);
    };

    BN.prototype.modrn = function modrn (num) {
      var isNegNum = num < 0;
      if (isNegNum) num = -num;

      assert(num <= 0x3ffffff);
      var p = (1 << 26) % num;

      var acc = 0;
      for (var i = this.length - 1; i >= 0; i--) {
        acc = (p * acc + (this.words[i] | 0)) % num;
      }

      return isNegNum ? -acc : acc;
    };

    // WARNING: DEPRECATED
    BN.prototype.modn = function modn (num) {
      return this.modrn(num);
    };

    // In-place division by number
    BN.prototype.idivn = function idivn (num) {
      var isNegNum = num < 0;
      if (isNegNum) num = -num;

      assert(num <= 0x3ffffff);

      var carry = 0;
      for (var i = this.length - 1; i >= 0; i--) {
        var w = (this.words[i] | 0) + carry * 0x4000000;
        this.words[i] = (w / num) | 0;
        carry = w % num;
      }

      this._strip();
      return isNegNum ? this.ineg() : this;
    };

    BN.prototype.divn = function divn (num) {
      return this.clone().idivn(num);
    };

    BN.prototype.egcd = function egcd (p) {
      assert(p.negative === 0);
      assert(!p.isZero());

      var x = this;
      var y = p.clone();

      if (x.negative !== 0) {
        x = x.umod(p);
      } else {
        x = x.clone();
      }

      // A * x + B * y = x
      var A = new BN(1);
      var B = new BN(0);

      // C * x + D * y = y
      var C = new BN(0);
      var D = new BN(1);

      var g = 0;

      while (x.isEven() && y.isEven()) {
        x.iushrn(1);
        y.iushrn(1);
        ++g;
      }

      var yp = y.clone();
      var xp = x.clone();

      while (!x.isZero()) {
        for (var i = 0, im = 1; (x.words[0] & im) === 0 && i < 26; ++i, im <<= 1);
        if (i > 0) {
          x.iushrn(i);
          while (i-- > 0) {
            if (A.isOdd() || B.isOdd()) {
              A.iadd(yp);
              B.isub(xp);
            }

            A.iushrn(1);
            B.iushrn(1);
          }
        }

        for (var j = 0, jm = 1; (y.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1);
        if (j > 0) {
          y.iushrn(j);
          while (j-- > 0) {
            if (C.isOdd() || D.isOdd()) {
              C.iadd(yp);
              D.isub(xp);
            }

            C.iushrn(1);
            D.iushrn(1);
          }
        }

        if (x.cmp(y) >= 0) {
          x.isub(y);
          A.isub(C);
          B.isub(D);
        } else {
          y.isub(x);
          C.isub(A);
          D.isub(B);
        }
      }

      return {
        a: C,
        b: D,
        gcd: y.iushln(g)
      };
    };

    // This is reduced incarnation of the binary EEA
    // above, designated to invert members of the
    // _prime_ fields F(p) at a maximal speed
    BN.prototype._invmp = function _invmp (p) {
      assert(p.negative === 0);
      assert(!p.isZero());

      var a = this;
      var b = p.clone();

      if (a.negative !== 0) {
        a = a.umod(p);
      } else {
        a = a.clone();
      }

      var x1 = new BN(1);
      var x2 = new BN(0);

      var delta = b.clone();

      while (a.cmpn(1) > 0 && b.cmpn(1) > 0) {
        for (var i = 0, im = 1; (a.words[0] & im) === 0 && i < 26; ++i, im <<= 1);
        if (i > 0) {
          a.iushrn(i);
          while (i-- > 0) {
            if (x1.isOdd()) {
              x1.iadd(delta);
            }

            x1.iushrn(1);
          }
        }

        for (var j = 0, jm = 1; (b.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1);
        if (j > 0) {
          b.iushrn(j);
          while (j-- > 0) {
            if (x2.isOdd()) {
              x2.iadd(delta);
            }

            x2.iushrn(1);
          }
        }

        if (a.cmp(b) >= 0) {
          a.isub(b);
          x1.isub(x2);
        } else {
          b.isub(a);
          x2.isub(x1);
        }
      }

      var res;
      if (a.cmpn(1) === 0) {
        res = x1;
      } else {
        res = x2;
      }

      if (res.cmpn(0) < 0) {
        res.iadd(p);
      }

      return res;
    };

    BN.prototype.gcd = function gcd (num) {
      if (this.isZero()) return num.abs();
      if (num.isZero()) return this.abs();

      var a = this.clone();
      var b = num.clone();
      a.negative = 0;
      b.negative = 0;

      // Remove common factor of two
      for (var shift = 0; a.isEven() && b.isEven(); shift++) {
        a.iushrn(1);
        b.iushrn(1);
      }

      do {
        while (a.isEven()) {
          a.iushrn(1);
        }
        while (b.isEven()) {
          b.iushrn(1);
        }

        var r = a.cmp(b);
        if (r < 0) {
          // Swap `a` and `b` to make `a` always bigger than `b`
          var t = a;
          a = b;
          b = t;
        } else if (r === 0 || b.cmpn(1) === 0) {
          break;
        }

        a.isub(b);
      } while (true);

      return b.iushln(shift);
    };

    // Invert number in the field F(num)
    BN.prototype.invm = function invm (num) {
      return this.egcd(num).a.umod(num);
    };

    BN.prototype.isEven = function isEven () {
      return (this.words[0] & 1) === 0;
    };

    BN.prototype.isOdd = function isOdd () {
      return (this.words[0] & 1) === 1;
    };

    // And first word and num
    BN.prototype.andln = function andln (num) {
      return this.words[0] & num;
    };

    // Increment at the bit position in-line
    BN.prototype.bincn = function bincn (bit) {
      assert(typeof bit === 'number');
      var r = bit % 26;
      var s = (bit - r) / 26;
      var q = 1 << r;

      // Fast case: bit is much higher than all existing words
      if (this.length <= s) {
        this._expand(s + 1);
        this.words[s] |= q;
        return this;
      }

      // Add bit and propagate, if needed
      var carry = q;
      for (var i = s; carry !== 0 && i < this.length; i++) {
        var w = this.words[i] | 0;
        w += carry;
        carry = w >>> 26;
        w &= 0x3ffffff;
        this.words[i] = w;
      }
      if (carry !== 0) {
        this.words[i] = carry;
        this.length++;
      }
      return this;
    };

    BN.prototype.isZero = function isZero () {
      return this.length === 1 && this.words[0] === 0;
    };

    BN.prototype.cmpn = function cmpn (num) {
      var negative = num < 0;

      if (this.negative !== 0 && !negative) return -1;
      if (this.negative === 0 && negative) return 1;

      this._strip();

      var res;
      if (this.length > 1) {
        res = 1;
      } else {
        if (negative) {
          num = -num;
        }

        assert(num <= 0x3ffffff, 'Number is too big');

        var w = this.words[0] | 0;
        res = w === num ? 0 : w < num ? -1 : 1;
      }
      if (this.negative !== 0) return -res | 0;
      return res;
    };

    // Compare two numbers and return:
    // 1 - if `this` > `num`
    // 0 - if `this` == `num`
    // -1 - if `this` < `num`
    BN.prototype.cmp = function cmp (num) {
      if (this.negative !== 0 && num.negative === 0) return -1;
      if (this.negative === 0 && num.negative !== 0) return 1;

      var res = this.ucmp(num);
      if (this.negative !== 0) return -res | 0;
      return res;
    };

    // Unsigned comparison
    BN.prototype.ucmp = function ucmp (num) {
      // At this point both numbers have the same sign
      if (this.length > num.length) return 1;
      if (this.length < num.length) return -1;

      var res = 0;
      for (var i = this.length - 1; i >= 0; i--) {
        var a = this.words[i] | 0;
        var b = num.words[i] | 0;

        if (a === b) continue;
        if (a < b) {
          res = -1;
        } else if (a > b) {
          res = 1;
        }
        break;
      }
      return res;
    };

    BN.prototype.gtn = function gtn (num) {
      return this.cmpn(num) === 1;
    };

    BN.prototype.gt = function gt (num) {
      return this.cmp(num) === 1;
    };

    BN.prototype.gten = function gten (num) {
      return this.cmpn(num) >= 0;
    };

    BN.prototype.gte = function gte (num) {
      return this.cmp(num) >= 0;
    };

    BN.prototype.ltn = function ltn (num) {
      return this.cmpn(num) === -1;
    };

    BN.prototype.lt = function lt (num) {
      return this.cmp(num) === -1;
    };

    BN.prototype.lten = function lten (num) {
      return this.cmpn(num) <= 0;
    };

    BN.prototype.lte = function lte (num) {
      return this.cmp(num) <= 0;
    };

    BN.prototype.eqn = function eqn (num) {
      return this.cmpn(num) === 0;
    };

    BN.prototype.eq = function eq (num) {
      return this.cmp(num) === 0;
    };

    //
    // A reduce context, could be using montgomery or something better, depending
    // on the `m` itself.
    //
    BN.red = function red (num) {
      return new Red(num);
    };

    BN.prototype.toRed = function toRed (ctx) {
      assert(!this.red, 'Already a number in reduction context');
      assert(this.negative === 0, 'red works only with positives');
      return ctx.convertTo(this)._forceRed(ctx);
    };

    BN.prototype.fromRed = function fromRed () {
      assert(this.red, 'fromRed works only with numbers in reduction context');
      return this.red.convertFrom(this);
    };

    BN.prototype._forceRed = function _forceRed (ctx) {
      this.red = ctx;
      return this;
    };

    BN.prototype.forceRed = function forceRed (ctx) {
      assert(!this.red, 'Already a number in reduction context');
      return this._forceRed(ctx);
    };

    BN.prototype.redAdd = function redAdd (num) {
      assert(this.red, 'redAdd works only with red numbers');
      return this.red.add(this, num);
    };

    BN.prototype.redIAdd = function redIAdd (num) {
      assert(this.red, 'redIAdd works only with red numbers');
      return this.red.iadd(this, num);
    };

    BN.prototype.redSub = function redSub (num) {
      assert(this.red, 'redSub works only with red numbers');
      return this.red.sub(this, num);
    };

    BN.prototype.redISub = function redISub (num) {
      assert(this.red, 'redISub works only with red numbers');
      return this.red.isub(this, num);
    };

    BN.prototype.redShl = function redShl (num) {
      assert(this.red, 'redShl works only with red numbers');
      return this.red.shl(this, num);
    };

    BN.prototype.redMul = function redMul (num) {
      assert(this.red, 'redMul works only with red numbers');
      this.red._verify2(this, num);
      return this.red.mul(this, num);
    };

    BN.prototype.redIMul = function redIMul (num) {
      assert(this.red, 'redMul works only with red numbers');
      this.red._verify2(this, num);
      return this.red.imul(this, num);
    };

    BN.prototype.redSqr = function redSqr () {
      assert(this.red, 'redSqr works only with red numbers');
      this.red._verify1(this);
      return this.red.sqr(this);
    };

    BN.prototype.redISqr = function redISqr () {
      assert(this.red, 'redISqr works only with red numbers');
      this.red._verify1(this);
      return this.red.isqr(this);
    };

    // Square root over p
    BN.prototype.redSqrt = function redSqrt () {
      assert(this.red, 'redSqrt works only with red numbers');
      this.red._verify1(this);
      return this.red.sqrt(this);
    };

    BN.prototype.redInvm = function redInvm () {
      assert(this.red, 'redInvm works only with red numbers');
      this.red._verify1(this);
      return this.red.invm(this);
    };

    // Return negative clone of `this` % `red modulo`
    BN.prototype.redNeg = function redNeg () {
      assert(this.red, 'redNeg works only with red numbers');
      this.red._verify1(this);
      return this.red.neg(this);
    };

    BN.prototype.redPow = function redPow (num) {
      assert(this.red && !num.red, 'redPow(normalNum)');
      this.red._verify1(this);
      return this.red.pow(this, num);
    };

    // Prime numbers with efficient reduction
    var primes = {
      k256: null,
      p224: null,
      p192: null,
      p25519: null
    };

    // Pseudo-Mersenne prime
    function MPrime (name, p) {
      // P = 2 ^ N - K
      this.name = name;
      this.p = new BN(p, 16);
      this.n = this.p.bitLength();
      this.k = new BN(1).iushln(this.n).isub(this.p);

      this.tmp = this._tmp();
    }

    MPrime.prototype._tmp = function _tmp () {
      var tmp = new BN(null);
      tmp.words = new Array(Math.ceil(this.n / 13));
      return tmp;
    };

    MPrime.prototype.ireduce = function ireduce (num) {
      // Assumes that `num` is less than `P^2`
      // num = HI * (2 ^ N - K) + HI * K + LO = HI * K + LO (mod P)
      var r = num;
      var rlen;

      do {
        this.split(r, this.tmp);
        r = this.imulK(r);
        r = r.iadd(this.tmp);
        rlen = r.bitLength();
      } while (rlen > this.n);

      var cmp = rlen < this.n ? -1 : r.ucmp(this.p);
      if (cmp === 0) {
        r.words[0] = 0;
        r.length = 1;
      } else if (cmp > 0) {
        r.isub(this.p);
      } else {
        if (r.strip !== undefined) {
          // r is a BN v4 instance
          r.strip();
        } else {
          // r is a BN v5 instance
          r._strip();
        }
      }

      return r;
    };

    MPrime.prototype.split = function split (input, out) {
      input.iushrn(this.n, 0, out);
    };

    MPrime.prototype.imulK = function imulK (num) {
      return num.imul(this.k);
    };

    function K256 () {
      MPrime.call(
        this,
        'k256',
        'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f');
    }
    inherits(K256, MPrime);

    K256.prototype.split = function split (input, output) {
      // 256 = 9 * 26 + 22
      var mask = 0x3fffff;

      var outLen = Math.min(input.length, 9);
      for (var i = 0; i < outLen; i++) {
        output.words[i] = input.words[i];
      }
      output.length = outLen;

      if (input.length <= 9) {
        input.words[0] = 0;
        input.length = 1;
        return;
      }

      // Shift by 9 limbs
      var prev = input.words[9];
      output.words[output.length++] = prev & mask;

      for (i = 10; i < input.length; i++) {
        var next = input.words[i] | 0;
        input.words[i - 10] = ((next & mask) << 4) | (prev >>> 22);
        prev = next;
      }
      prev >>>= 22;
      input.words[i - 10] = prev;
      if (prev === 0 && input.length > 10) {
        input.length -= 10;
      } else {
        input.length -= 9;
      }
    };

    K256.prototype.imulK = function imulK (num) {
      // K = 0x1000003d1 = [ 0x40, 0x3d1 ]
      num.words[num.length] = 0;
      num.words[num.length + 1] = 0;
      num.length += 2;

      // bounded at: 0x40 * 0x3ffffff + 0x3d0 = 0x100000390
      var lo = 0;
      for (var i = 0; i < num.length; i++) {
        var w = num.words[i] | 0;
        lo += w * 0x3d1;
        num.words[i] = lo & 0x3ffffff;
        lo = w * 0x40 + ((lo / 0x4000000) | 0);
      }

      // Fast length reduction
      if (num.words[num.length - 1] === 0) {
        num.length--;
        if (num.words[num.length - 1] === 0) {
          num.length--;
        }
      }
      return num;
    };

    function P224 () {
      MPrime.call(
        this,
        'p224',
        'ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001');
    }
    inherits(P224, MPrime);

    function P192 () {
      MPrime.call(
        this,
        'p192',
        'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff');
    }
    inherits(P192, MPrime);

    function P25519 () {
      // 2 ^ 255 - 19
      MPrime.call(
        this,
        '25519',
        '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed');
    }
    inherits(P25519, MPrime);

    P25519.prototype.imulK = function imulK (num) {
      // K = 0x13
      var carry = 0;
      for (var i = 0; i < num.length; i++) {
        var hi = (num.words[i] | 0) * 0x13 + carry;
        var lo = hi & 0x3ffffff;
        hi >>>= 26;

        num.words[i] = lo;
        carry = hi;
      }
      if (carry !== 0) {
        num.words[num.length++] = carry;
      }
      return num;
    };

    // Exported mostly for testing purposes, use plain name instead
    BN._prime = function prime (name) {
      // Cached version of prime
      if (primes[name]) return primes[name];

      var prime;
      if (name === 'k256') {
        prime = new K256();
      } else if (name === 'p224') {
        prime = new P224();
      } else if (name === 'p192') {
        prime = new P192();
      } else if (name === 'p25519') {
        prime = new P25519();
      } else {
        throw new Error('Unknown prime ' + name);
      }
      primes[name] = prime;

      return prime;
    };

    //
    // Base reduction engine
    //
    function Red (m) {
      if (typeof m === 'string') {
        var prime = BN._prime(m);
        this.m = prime.p;
        this.prime = prime;
      } else {
        assert(m.gtn(1), 'modulus must be greater than 1');
        this.m = m;
        this.prime = null;
      }
    }

    Red.prototype._verify1 = function _verify1 (a) {
      assert(a.negative === 0, 'red works only with positives');
      assert(a.red, 'red works only with red numbers');
    };

    Red.prototype._verify2 = function _verify2 (a, b) {
      assert((a.negative | b.negative) === 0, 'red works only with positives');
      assert(a.red && a.red === b.red,
        'red works only with red numbers');
    };

    Red.prototype.imod = function imod (a) {
      if (this.prime) return this.prime.ireduce(a)._forceRed(this);

      move(a, a.umod(this.m)._forceRed(this));
      return a;
    };

    Red.prototype.neg = function neg (a) {
      if (a.isZero()) {
        return a.clone();
      }

      return this.m.sub(a)._forceRed(this);
    };

    Red.prototype.add = function add (a, b) {
      this._verify2(a, b);

      var res = a.add(b);
      if (res.cmp(this.m) >= 0) {
        res.isub(this.m);
      }
      return res._forceRed(this);
    };

    Red.prototype.iadd = function iadd (a, b) {
      this._verify2(a, b);

      var res = a.iadd(b);
      if (res.cmp(this.m) >= 0) {
        res.isub(this.m);
      }
      return res;
    };

    Red.prototype.sub = function sub (a, b) {
      this._verify2(a, b);

      var res = a.sub(b);
      if (res.cmpn(0) < 0) {
        res.iadd(this.m);
      }
      return res._forceRed(this);
    };

    Red.prototype.isub = function isub (a, b) {
      this._verify2(a, b);

      var res = a.isub(b);
      if (res.cmpn(0) < 0) {
        res.iadd(this.m);
      }
      return res;
    };

    Red.prototype.shl = function shl (a, num) {
      this._verify1(a);
      return this.imod(a.ushln(num));
    };

    Red.prototype.imul = function imul (a, b) {
      this._verify2(a, b);
      return this.imod(a.imul(b));
    };

    Red.prototype.mul = function mul (a, b) {
      this._verify2(a, b);
      return this.imod(a.mul(b));
    };

    Red.prototype.isqr = function isqr (a) {
      return this.imul(a, a.clone());
    };

    Red.prototype.sqr = function sqr (a) {
      return this.mul(a, a);
    };

    Red.prototype.sqrt = function sqrt (a) {
      if (a.isZero()) return a.clone();

      var mod3 = this.m.andln(3);
      assert(mod3 % 2 === 1);

      // Fast case
      if (mod3 === 3) {
        var pow = this.m.add(new BN(1)).iushrn(2);
        return this.pow(a, pow);
      }

      // Tonelli-Shanks algorithm (Totally unoptimized and slow)
      //
      // Find Q and S, that Q * 2 ^ S = (P - 1)
      var q = this.m.subn(1);
      var s = 0;
      while (!q.isZero() && q.andln(1) === 0) {
        s++;
        q.iushrn(1);
      }
      assert(!q.isZero());

      var one = new BN(1).toRed(this);
      var nOne = one.redNeg();

      // Find quadratic non-residue
      // NOTE: Max is such because of generalized Riemann hypothesis.
      var lpow = this.m.subn(1).iushrn(1);
      var z = this.m.bitLength();
      z = new BN(2 * z * z).toRed(this);

      while (this.pow(z, lpow).cmp(nOne) !== 0) {
        z.redIAdd(nOne);
      }

      var c = this.pow(z, q);
      var r = this.pow(a, q.addn(1).iushrn(1));
      var t = this.pow(a, q);
      var m = s;
      while (t.cmp(one) !== 0) {
        var tmp = t;
        for (var i = 0; tmp.cmp(one) !== 0; i++) {
          tmp = tmp.redSqr();
        }
        assert(i < m);
        var b = this.pow(c, new BN(1).iushln(m - i - 1));

        r = r.redMul(b);
        c = b.redSqr();
        t = t.redMul(c);
        m = i;
      }

      return r;
    };

    Red.prototype.invm = function invm (a) {
      var inv = a._invmp(this.m);
      if (inv.negative !== 0) {
        inv.negative = 0;
        return this.imod(inv).redNeg();
      } else {
        return this.imod(inv);
      }
    };

    Red.prototype.pow = function pow (a, num) {
      if (num.isZero()) return new BN(1).toRed(this);
      if (num.cmpn(1) === 0) return a.clone();

      var windowSize = 4;
      var wnd = new Array(1 << windowSize);
      wnd[0] = new BN(1).toRed(this);
      wnd[1] = a;
      for (var i = 2; i < wnd.length; i++) {
        wnd[i] = this.mul(wnd[i - 1], a);
      }

      var res = wnd[0];
      var current = 0;
      var currentLen = 0;
      var start = num.bitLength() % 26;
      if (start === 0) {
        start = 26;
      }

      for (i = num.length - 1; i >= 0; i--) {
        var word = num.words[i];
        for (var j = start - 1; j >= 0; j--) {
          var bit = (word >> j) & 1;
          if (res !== wnd[0]) {
            res = this.sqr(res);
          }

          if (bit === 0 && current === 0) {
            currentLen = 0;
            continue;
          }

          current <<= 1;
          current |= bit;
          currentLen++;
          if (currentLen !== windowSize && (i !== 0 || j !== 0)) continue;

          res = this.mul(res, wnd[current]);
          currentLen = 0;
          current = 0;
        }
        start = 26;
      }

      return res;
    };

    Red.prototype.convertTo = function convertTo (num) {
      var r = num.umod(this.m);

      return r === num ? r.clone() : r;
    };

    Red.prototype.convertFrom = function convertFrom (num) {
      var res = num.clone();
      res.red = null;
      return res;
    };

    //
    // Montgomery method engine
    //

    BN.mont = function mont (num) {
      return new Mont(num);
    };

    function Mont (m) {
      Red.call(this, m);

      this.shift = this.m.bitLength();
      if (this.shift % 26 !== 0) {
        this.shift += 26 - (this.shift % 26);
      }

      this.r = new BN(1).iushln(this.shift);
      this.r2 = this.imod(this.r.sqr());
      this.rinv = this.r._invmp(this.m);

      this.minv = this.rinv.mul(this.r).isubn(1).div(this.m);
      this.minv = this.minv.umod(this.r);
      this.minv = this.r.sub(this.minv);
    }
    inherits(Mont, Red);

    Mont.prototype.convertTo = function convertTo (num) {
      return this.imod(num.ushln(this.shift));
    };

    Mont.prototype.convertFrom = function convertFrom (num) {
      var r = this.imod(num.mul(this.rinv));
      r.red = null;
      return r;
    };

    Mont.prototype.imul = function imul (a, b) {
      if (a.isZero() || b.isZero()) {
        a.words[0] = 0;
        a.length = 1;
        return a;
      }

      var t = a.imul(b);
      var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
      var u = t.isub(c).iushrn(this.shift);
      var res = u;

      if (u.cmp(this.m) >= 0) {
        res = u.isub(this.m);
      } else if (u.cmpn(0) < 0) {
        res = u.iadd(this.m);
      }

      return res._forceRed(this);
    };

    Mont.prototype.mul = function mul (a, b) {
      if (a.isZero() || b.isZero()) return new BN(0)._forceRed(this);

      var t = a.mul(b);
      var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
      var u = t.isub(c).iushrn(this.shift);
      var res = u;
      if (u.cmp(this.m) >= 0) {
        res = u.isub(this.m);
      } else if (u.cmpn(0) < 0) {
        res = u.iadd(this.m);
      }

      return res._forceRed(this);
    };

    Mont.prototype.invm = function invm (a) {
      // (AR)^-1 * R^2 = (A^-1 * R^-1) * R^2 = A^-1 * R
      var res = this.imod(a._invmp(this.m).mul(this.r2));
      return res._forceRed(this);
    };
  })(module, commonjsGlobal);
  });

  /* eslint-disable node/no-deprecated-api */

  var safeBuffer = createCommonjsModule(function (module, exports) {
  var Buffer = buffer.Buffer;

  // alternative to using Object.keys for old browsers
  function copyProps (src, dst) {
    for (var key in src) {
      dst[key] = src[key];
    }
  }
  if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
    module.exports = buffer;
  } else {
    // Copy properties from require('buffer')
    copyProps(buffer, exports);
    exports.Buffer = SafeBuffer;
  }

  function SafeBuffer (arg, encodingOrOffset, length) {
    return Buffer(arg, encodingOrOffset, length)
  }

  // Copy static methods from Buffer
  copyProps(Buffer, SafeBuffer);

  SafeBuffer.from = function (arg, encodingOrOffset, length) {
    if (typeof arg === 'number') {
      throw new TypeError('Argument must not be a number')
    }
    return Buffer(arg, encodingOrOffset, length)
  };

  SafeBuffer.alloc = function (size, fill, encoding) {
    if (typeof size !== 'number') {
      throw new TypeError('Argument must be a number')
    }
    var buf = Buffer(size);
    if (fill !== undefined) {
      if (typeof encoding === 'string') {
        buf.fill(fill, encoding);
      } else {
        buf.fill(fill);
      }
    } else {
      buf.fill(0);
    }
    return buf
  };

  SafeBuffer.allocUnsafe = function (size) {
    if (typeof size !== 'number') {
      throw new TypeError('Argument must be a number')
    }
    return Buffer(size)
  };

  SafeBuffer.allocUnsafeSlow = function (size) {
    if (typeof size !== 'number') {
      throw new TypeError('Argument must be a number')
    }
    return buffer.SlowBuffer(size)
  };
  });

  // base-x encoding
  // Forked from https://github.com/cryptocoinjs/bs58
  // Originally written by Mike Hearn for BitcoinJ
  // Copyright (c) 2011 Google Inc
  // Ported to JavaScript by Stefan Thomas
  // Merged Buffer refactorings from base58-native by Stephen Pair
  // Copyright (c) 2013 BitPay Inc

  var Buffer = safeBuffer.Buffer;

  var baseX = function base (ALPHABET) {
    var ALPHABET_MAP = {};
    var BASE = ALPHABET.length;
    var LEADER = ALPHABET.charAt(0);

    // pre-compute lookup table
    for (var z = 0; z < ALPHABET.length; z++) {
      var x = ALPHABET.charAt(z);

      if (ALPHABET_MAP[x] !== undefined) throw new TypeError(x + ' is ambiguous')
      ALPHABET_MAP[x] = z;
    }

    function encode (source) {
      if (source.length === 0) return ''

      var digits = [0];
      for (var i = 0; i < source.length; ++i) {
        for (var j = 0, carry = source[i]; j < digits.length; ++j) {
          carry += digits[j] << 8;
          digits[j] = carry % BASE;
          carry = (carry / BASE) | 0;
        }

        while (carry > 0) {
          digits.push(carry % BASE);
          carry = (carry / BASE) | 0;
        }
      }

      var string = '';

      // deal with leading zeros
      for (var k = 0; source[k] === 0 && k < source.length - 1; ++k) string += LEADER;
      // convert digits to a string
      for (var q = digits.length - 1; q >= 0; --q) string += ALPHABET[digits[q]];

      return string
    }

    function decodeUnsafe (string) {
      if (typeof string !== 'string') throw new TypeError('Expected String')
      if (string.length === 0) return Buffer.allocUnsafe(0)

      var bytes = [0];
      for (var i = 0; i < string.length; i++) {
        var value = ALPHABET_MAP[string[i]];
        if (value === undefined) return

        for (var j = 0, carry = value; j < bytes.length; ++j) {
          carry += bytes[j] * BASE;
          bytes[j] = carry & 0xff;
          carry >>= 8;
        }

        while (carry > 0) {
          bytes.push(carry & 0xff);
          carry >>= 8;
        }
      }

      // deal with leading zeros
      for (var k = 0; string[k] === LEADER && k < string.length - 1; ++k) {
        bytes.push(0);
      }

      return Buffer.from(bytes.reverse())
    }

    function decode (string) {
      var buffer = decodeUnsafe(string);
      if (buffer) return buffer

      throw new Error('Non-base' + BASE + ' character')
    }

    return {
      encode: encode,
      decodeUnsafe: decodeUnsafe,
      decode: decode
    }
  };

  var ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

  var bs58 = baseX(ALPHABET);

  /* eslint-env browser */

  // Ponyfill for `globalThis`
  const _globalThis = (() => {
  	if (typeof globalThis !== 'undefined') {
  		return globalThis;
  	}

  	if (typeof self !== 'undefined') {
  		return self;
  	}

  	/* istanbul ignore next */
  	if (typeof window !== 'undefined') {
  		return window;
  	}

  	/* istanbul ignore next */
  	if (typeof commonjsGlobal !== 'undefined') {
  		return commonjsGlobal;
  	}
  })();

  const bufferToHex = buffer => {
  	const view = new DataView(buffer);

  	let hexCodes = '';
  	for (let i = 0; i < view.byteLength; i += 4) {
  		hexCodes += view.getUint32(i).toString(16).padStart(8, '0');
  	}

  	return hexCodes;
  };

  const create$1 = algorithm => async (buffer, options) => {
  	if (typeof buffer === 'string') {
  		buffer = new _globalThis.TextEncoder().encode(buffer);
  	}

  	options = {
  		outputFormat: 'hex',
  		...options
  	};

  	const hash = await _globalThis.crypto.subtle.digest(algorithm, buffer);

  	return options.outputFormat === 'hex' ? bufferToHex(hash) : hash;
  };
  var sha256$1 = create$1('SHA-256');

  /**
   * Maximum length of derived pubkey seed
   */

  const MAX_SEED_LENGTH = 32;
  /**
   * A public key
   */

  class PublicKey {
    /** @internal */

    /**
     * Create a new PublicKey object
     * @param value ed25519 public key as buffer or base-58 encoded string
     */
    constructor(value) {
      _defineProperty(this, "_bn", void 0);

      if (typeof value === 'string') {
        // assume base 58 encoding by default
        const decoded = bs58.decode(value);

        if (decoded.length != 32) {
          throw new Error("Invalid public key input");
        }

        this._bn = new bn(decoded);
      } else {
        this._bn = new bn(value);
      }

      if (this._bn.byteLength() > 32) {
        throw new Error("Invalid public key input");
      }
    }
    /**
     * Checks if two publicKeys are equal
     */


    equals(publicKey) {
      return this._bn.eq(publicKey._bn);
    }
    /**
     * Return the base-58 representation of the public key
     */


    toBase58() {
      return bs58.encode(this.toBytes());
    }
    /**
     * Return the byte array representation of the public key
     */


    toBytes() {
      return this.toBuffer();
    }
    /**
     * Return the Buffer representation of the public key
     */


    toBuffer() {
      const b = this._bn.toArrayLike(buffer.Buffer);

      if (b.length === 32) {
        return b;
      }

      const zeroPad = buffer.Buffer.alloc(32);
      b.copy(zeroPad, 32 - b.length);
      return zeroPad;
    }
    /**
     * Return the base-58 representation of the public key
     */


    toString() {
      return this.toBase58();
    }
    /**
     * Derive a public key from another key, a seed, and a program ID.
     */


    static async createWithSeed(fromPublicKey, seed, programId) {
      const buffer$1 = buffer.Buffer.concat([fromPublicKey.toBuffer(), buffer.Buffer.from(seed), programId.toBuffer()]);
      const hash = await sha256$1(new Uint8Array(buffer$1));
      return new PublicKey(buffer.Buffer.from(hash, 'hex'));
    }
    /**
     * Derive a program address from seeds and a program ID.
     */


    static async createProgramAddress(seeds, programId) {
      let buffer$1 = buffer.Buffer.alloc(0);
      seeds.forEach(function (seed) {
        if (seed.length > MAX_SEED_LENGTH) {
          throw new Error("Max seed length exceeded");
        }

        buffer$1 = buffer.Buffer.concat([buffer$1, toBuffer(seed)]);
      });
      buffer$1 = buffer.Buffer.concat([buffer$1, programId.toBuffer(), buffer.Buffer.from('ProgramDerivedAddress')]);
      let hash = await sha256$1(new Uint8Array(buffer$1));
      let publicKeyBytes = new bn(hash, 16).toArray(undefined, 32);

      if (is_on_curve(publicKeyBytes)) {
        throw new Error("Invalid seeds, address must fall off the curve");
      }

      return new PublicKey(publicKeyBytes);
    }
    /**
     * Find a valid program address
     *
     * Valid program addresses must fall off the ed25519 curve.  This function
     * iterates a nonce until it finds one that when combined with the seeds
     * results in a valid program address.
     */


    static async findProgramAddress(seeds, programId) {
      let nonce = 255;
      let address;

      while (nonce != 0) {
        try {
          const seedsWithNonce = seeds.concat(buffer.Buffer.from([nonce]));
          address = await this.createProgramAddress(seedsWithNonce, programId);
        } catch (err) {
          nonce--;
          continue;
        }

        return [address, nonce];
      }

      throw new Error("Unable to find a viable program address nonce");
    }

  } // @ts-ignore

  let naclLowLevel = naclFast.lowlevel; // Check that a pubkey is on the curve.
  // This function and its dependents were sourced from:
  // https://github.com/dchest/tweetnacl-js/blob/f1ec050ceae0861f34280e62498b1d3ed9c350c6/nacl.js#L792

  function is_on_curve(p) {
    var r = [naclLowLevel.gf(), naclLowLevel.gf(), naclLowLevel.gf(), naclLowLevel.gf()];
    var t = naclLowLevel.gf(),
        chk = naclLowLevel.gf(),
        num = naclLowLevel.gf(),
        den = naclLowLevel.gf(),
        den2 = naclLowLevel.gf(),
        den4 = naclLowLevel.gf(),
        den6 = naclLowLevel.gf();
    naclLowLevel.set25519(r[2], gf1);
    naclLowLevel.unpack25519(r[1], p);
    naclLowLevel.S(num, r[1]);
    naclLowLevel.M(den, num, naclLowLevel.D);
    naclLowLevel.Z(num, num, r[2]);
    naclLowLevel.A(den, r[2], den);
    naclLowLevel.S(den2, den);
    naclLowLevel.S(den4, den2);
    naclLowLevel.M(den6, den4, den2);
    naclLowLevel.M(t, den6, num);
    naclLowLevel.M(t, t, den);
    naclLowLevel.pow2523(t, t);
    naclLowLevel.M(t, t, num);
    naclLowLevel.M(t, t, den);
    naclLowLevel.M(t, t, den);
    naclLowLevel.M(r[0], t, den);
    naclLowLevel.S(chk, r[0]);
    naclLowLevel.M(chk, chk, den);
    if (neq25519(chk, num)) naclLowLevel.M(r[0], r[0], I);
    naclLowLevel.S(chk, r[0]);
    naclLowLevel.M(chk, chk, den);
    if (neq25519(chk, num)) return 0;
    return 1;
  }

  let gf1 = naclLowLevel.gf([1]);
  let I = naclLowLevel.gf([0xa0b0, 0x4a0e, 0x1b27, 0xc4ee, 0xe478, 0xad2f, 0x1806, 0x2f43, 0xd7a7, 0x3dfb, 0x0099, 0x2b4d, 0xdf0b, 0x4fc1, 0x2480, 0x2b83]);

  function neq25519(a, b) {
    var c = new Uint8Array(32),
        d = new Uint8Array(32);
    naclLowLevel.pack25519(c, a);
    naclLowLevel.pack25519(d, b);
    return naclLowLevel.crypto_verify_32(c, 0, d, 0);
  }

  /**
   * An account key pair (public and secret keys).
   */

  class Account {
    /** @internal */

    /**
     * Create a new Account object
     *
     * If the secretKey parameter is not provided a new key pair is randomly
     * created for the account
     *
     * @param secretKey Secret key for the account
     */
    constructor(secretKey) {
      _defineProperty(this, "_keypair", void 0);

      if (secretKey) {
        this._keypair = naclFast.sign.keyPair.fromSecretKey(toBuffer(secretKey));
      } else {
        this._keypair = naclFast.sign.keyPair();
      }
    }
    /**
     * The public key for this account
     */


    get publicKey() {
      return new PublicKey(this._keypair.publicKey);
    }
    /**
     * The **unencrypted** secret key for this account
     */


    get secretKey() {
      return toBuffer(this._keypair.secretKey);
    }

  }

  const BPF_LOADER_DEPRECATED_PROGRAM_ID = new PublicKey('BPFLoader1111111111111111111111111111111111');

  var global$1 = (typeof global !== "undefined" ? global :
    typeof self !== "undefined" ? self :
    typeof window !== "undefined" ? window : {});

  // shim for using process in browser
  // based off https://github.com/defunctzombie/node-process/blob/master/browser.js

  function defaultSetTimout() {
      throw new Error('setTimeout has not been defined');
  }
  function defaultClearTimeout () {
      throw new Error('clearTimeout has not been defined');
  }
  var cachedSetTimeout = defaultSetTimout;
  var cachedClearTimeout = defaultClearTimeout;
  if (typeof global$1.setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
  }
  if (typeof global$1.clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
  }

  function runTimeout(fun) {
      if (cachedSetTimeout === setTimeout) {
          //normal enviroments in sane situations
          return setTimeout(fun, 0);
      }
      // if setTimeout wasn't available but was latter defined
      if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
          cachedSetTimeout = setTimeout;
          return setTimeout(fun, 0);
      }
      try {
          // when when somebody has screwed with setTimeout but no I.E. maddness
          return cachedSetTimeout(fun, 0);
      } catch(e){
          try {
              // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
              return cachedSetTimeout.call(null, fun, 0);
          } catch(e){
              // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
              return cachedSetTimeout.call(this, fun, 0);
          }
      }


  }
  function runClearTimeout(marker) {
      if (cachedClearTimeout === clearTimeout) {
          //normal enviroments in sane situations
          return clearTimeout(marker);
      }
      // if clearTimeout wasn't available but was latter defined
      if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
          cachedClearTimeout = clearTimeout;
          return clearTimeout(marker);
      }
      try {
          // when when somebody has screwed with setTimeout but no I.E. maddness
          return cachedClearTimeout(marker);
      } catch (e){
          try {
              // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
              return cachedClearTimeout.call(null, marker);
          } catch (e){
              // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
              // Some versions of I.E. have different rules for clearTimeout vs setTimeout
              return cachedClearTimeout.call(this, marker);
          }
      }



  }
  var queue = [];
  var draining = false;
  var currentQueue;
  var queueIndex = -1;

  function cleanUpNextTick() {
      if (!draining || !currentQueue) {
          return;
      }
      draining = false;
      if (currentQueue.length) {
          queue = currentQueue.concat(queue);
      } else {
          queueIndex = -1;
      }
      if (queue.length) {
          drainQueue();
      }
  }

  function drainQueue() {
      if (draining) {
          return;
      }
      var timeout = runTimeout(cleanUpNextTick);
      draining = true;

      var len = queue.length;
      while(len) {
          currentQueue = queue;
          queue = [];
          while (++queueIndex < len) {
              if (currentQueue) {
                  currentQueue[queueIndex].run();
              }
          }
          queueIndex = -1;
          len = queue.length;
      }
      currentQueue = null;
      draining = false;
      runClearTimeout(timeout);
  }
  function nextTick(fun) {
      var args = new Array(arguments.length - 1);
      if (arguments.length > 1) {
          for (var i = 1; i < arguments.length; i++) {
              args[i - 1] = arguments[i];
          }
      }
      queue.push(new Item(fun, args));
      if (queue.length === 1 && !draining) {
          runTimeout(drainQueue);
      }
  }
  // v8 likes predictible objects
  function Item(fun, array) {
      this.fun = fun;
      this.array = array;
  }
  Item.prototype.run = function () {
      this.fun.apply(null, this.array);
  };
  var title = 'browser';
  var platform = 'browser';
  var browser$2 = true;
  var env = {};
  var argv = [];
  var version$1 = ''; // empty string to avoid regexp issues
  var versions = {};
  var release = {};
  var config = {};

  function noop() {}

  var on = noop;
  var addListener = noop;
  var once = noop;
  var off = noop;
  var removeListener = noop;
  var removeAllListeners = noop;
  var emit = noop;

  function binding(name) {
      throw new Error('process.binding is not supported');
  }

  function cwd () { return '/' }
  function chdir (dir) {
      throw new Error('process.chdir is not supported');
  }function umask() { return 0; }

  // from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js
  var performance = global$1.performance || {};
  var performanceNow =
    performance.now        ||
    performance.mozNow     ||
    performance.msNow      ||
    performance.oNow       ||
    performance.webkitNow  ||
    function(){ return (new Date()).getTime() };

  // generate timestamp or delta
  // see http://nodejs.org/api/process.html#process_process_hrtime
  function hrtime(previousTimestamp){
    var clocktime = performanceNow.call(performance)*1e-3;
    var seconds = Math.floor(clocktime);
    var nanoseconds = Math.floor((clocktime%1)*1e9);
    if (previousTimestamp) {
      seconds = seconds - previousTimestamp[0];
      nanoseconds = nanoseconds - previousTimestamp[1];
      if (nanoseconds<0) {
        seconds--;
        nanoseconds += 1e9;
      }
    }
    return [seconds,nanoseconds]
  }

  var startTime = new Date();
  function uptime() {
    var currentTime = new Date();
    var dif = currentTime - startTime;
    return dif / 1000;
  }

  var browser$1$1 = {
    nextTick: nextTick,
    title: title,
    browser: browser$2,
    env: env,
    argv: argv,
    version: version$1,
    versions: versions,
    on: on,
    addListener: addListener,
    once: once,
    off: off,
    removeListener: removeListener,
    removeAllListeners: removeAllListeners,
    emit: emit,
    binding: binding,
    cwd: cwd,
    chdir: chdir,
    umask: umask,
    hrtime: hrtime,
    platform: platform,
    release: release,
    config: config,
    uptime: uptime
  };

  var inherits$1;
  if (typeof Object.create === 'function'){
    inherits$1 = function inherits(ctor, superCtor) {
      // implementation from standard node.js 'util' module
      ctor.super_ = superCtor;
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
    };
  } else {
    inherits$1 = function inherits(ctor, superCtor) {
      ctor.super_ = superCtor;
      var TempCtor = function () {};
      TempCtor.prototype = superCtor.prototype;
      ctor.prototype = new TempCtor();
      ctor.prototype.constructor = ctor;
    };
  }
  var inherits$2 = inherits$1;

  /**
   * Echos the value of a value. Trys to print the value out
   * in the best way possible given the different types.
   *
   * @param {Object} obj The object to print out.
   * @param {Object} opts Optional options object that alters the output.
   */
  /* legacy: obj, showHidden, depth, colors*/
  function inspect$1(obj, opts) {
    // default options
    var ctx = {
      seen: [],
      stylize: stylizeNoColor
    };
    // legacy...
    if (arguments.length >= 3) ctx.depth = arguments[2];
    if (arguments.length >= 4) ctx.colors = arguments[3];
    if (isBoolean(opts)) {
      // legacy...
      ctx.showHidden = opts;
    } else if (opts) {
      // got an "options" object
      _extend(ctx, opts);
    }
    // set default options
    if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
    if (isUndefined(ctx.depth)) ctx.depth = 2;
    if (isUndefined(ctx.colors)) ctx.colors = false;
    if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
    if (ctx.colors) ctx.stylize = stylizeWithColor;
    return formatValue(ctx, obj, ctx.depth);
  }

  // http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
  inspect$1.colors = {
    'bold' : [1, 22],
    'italic' : [3, 23],
    'underline' : [4, 24],
    'inverse' : [7, 27],
    'white' : [37, 39],
    'grey' : [90, 39],
    'black' : [30, 39],
    'blue' : [34, 39],
    'cyan' : [36, 39],
    'green' : [32, 39],
    'magenta' : [35, 39],
    'red' : [31, 39],
    'yellow' : [33, 39]
  };

  // Don't use 'blue' not visible on cmd.exe
  inspect$1.styles = {
    'special': 'cyan',
    'number': 'yellow',
    'boolean': 'yellow',
    'undefined': 'grey',
    'null': 'bold',
    'string': 'green',
    'date': 'magenta',
    // "name": intentionally not styling
    'regexp': 'red'
  };


  function stylizeWithColor(str, styleType) {
    var style = inspect$1.styles[styleType];

    if (style) {
      return '\u001b[' + inspect$1.colors[style][0] + 'm' + str +
             '\u001b[' + inspect$1.colors[style][1] + 'm';
    } else {
      return str;
    }
  }


  function stylizeNoColor(str, styleType) {
    return str;
  }


  function arrayToHash(array) {
    var hash = {};

    array.forEach(function(val, idx) {
      hash[val] = true;
    });

    return hash;
  }


  function formatValue(ctx, value, recurseTimes) {
    // Provide a hook for user-specified inspect functions.
    // Check that value is an object with an inspect function on it
    if (ctx.customInspect &&
        value &&
        isFunction(value.inspect) &&
        // Filter out the util module, it's inspect function is special
        value.inspect !== inspect$1 &&
        // Also filter out any prototype objects using the circular check.
        !(value.constructor && value.constructor.prototype === value)) {
      var ret = value.inspect(recurseTimes, ctx);
      if (!isString(ret)) {
        ret = formatValue(ctx, ret, recurseTimes);
      }
      return ret;
    }

    // Primitive types cannot have properties
    var primitive = formatPrimitive(ctx, value);
    if (primitive) {
      return primitive;
    }

    // Look up the keys of the object.
    var keys = Object.keys(value);
    var visibleKeys = arrayToHash(keys);

    if (ctx.showHidden) {
      keys = Object.getOwnPropertyNames(value);
    }

    // IE doesn't make error fields non-enumerable
    // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
    if (isError(value)
        && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
      return formatError(value);
    }

    // Some type of object without properties can be shortcutted.
    if (keys.length === 0) {
      if (isFunction(value)) {
        var name = value.name ? ': ' + value.name : '';
        return ctx.stylize('[Function' + name + ']', 'special');
      }
      if (isRegExp(value)) {
        return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
      }
      if (isDate(value)) {
        return ctx.stylize(Date.prototype.toString.call(value), 'date');
      }
      if (isError(value)) {
        return formatError(value);
      }
    }

    var base = '', array = false, braces = ['{', '}'];

    // Make Array say that they are Array
    if (isArray$1(value)) {
      array = true;
      braces = ['[', ']'];
    }

    // Make functions say that they are functions
    if (isFunction(value)) {
      var n = value.name ? ': ' + value.name : '';
      base = ' [Function' + n + ']';
    }

    // Make RegExps say that they are RegExps
    if (isRegExp(value)) {
      base = ' ' + RegExp.prototype.toString.call(value);
    }

    // Make dates with properties first say the date
    if (isDate(value)) {
      base = ' ' + Date.prototype.toUTCString.call(value);
    }

    // Make error with message first say the error
    if (isError(value)) {
      base = ' ' + formatError(value);
    }

    if (keys.length === 0 && (!array || value.length == 0)) {
      return braces[0] + base + braces[1];
    }

    if (recurseTimes < 0) {
      if (isRegExp(value)) {
        return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
      } else {
        return ctx.stylize('[Object]', 'special');
      }
    }

    ctx.seen.push(value);

    var output;
    if (array) {
      output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
    } else {
      output = keys.map(function(key) {
        return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
      });
    }

    ctx.seen.pop();

    return reduceToSingleString(output, base, braces);
  }


  function formatPrimitive(ctx, value) {
    if (isUndefined(value))
      return ctx.stylize('undefined', 'undefined');
    if (isString(value)) {
      var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                               .replace(/'/g, "\\'")
                                               .replace(/\\"/g, '"') + '\'';
      return ctx.stylize(simple, 'string');
    }
    if (isNumber(value))
      return ctx.stylize('' + value, 'number');
    if (isBoolean(value))
      return ctx.stylize('' + value, 'boolean');
    // For some reason typeof null is "object", so special case here.
    if (isNull(value))
      return ctx.stylize('null', 'null');
  }


  function formatError(value) {
    return '[' + Error.prototype.toString.call(value) + ']';
  }


  function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
    var output = [];
    for (var i = 0, l = value.length; i < l; ++i) {
      if (hasOwnProperty$1(value, String(i))) {
        output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
            String(i), true));
      } else {
        output.push('');
      }
    }
    keys.forEach(function(key) {
      if (!key.match(/^\d+$/)) {
        output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
            key, true));
      }
    });
    return output;
  }


  function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
    var name, str, desc;
    desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
    if (desc.get) {
      if (desc.set) {
        str = ctx.stylize('[Getter/Setter]', 'special');
      } else {
        str = ctx.stylize('[Getter]', 'special');
      }
    } else {
      if (desc.set) {
        str = ctx.stylize('[Setter]', 'special');
      }
    }
    if (!hasOwnProperty$1(visibleKeys, key)) {
      name = '[' + key + ']';
    }
    if (!str) {
      if (ctx.seen.indexOf(desc.value) < 0) {
        if (isNull(recurseTimes)) {
          str = formatValue(ctx, desc.value, null);
        } else {
          str = formatValue(ctx, desc.value, recurseTimes - 1);
        }
        if (str.indexOf('\n') > -1) {
          if (array) {
            str = str.split('\n').map(function(line) {
              return '  ' + line;
            }).join('\n').substr(2);
          } else {
            str = '\n' + str.split('\n').map(function(line) {
              return '   ' + line;
            }).join('\n');
          }
        }
      } else {
        str = ctx.stylize('[Circular]', 'special');
      }
    }
    if (isUndefined(name)) {
      if (array && key.match(/^\d+$/)) {
        return str;
      }
      name = JSON.stringify('' + key);
      if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
        name = name.substr(1, name.length - 2);
        name = ctx.stylize(name, 'name');
      } else {
        name = name.replace(/'/g, "\\'")
                   .replace(/\\"/g, '"')
                   .replace(/(^"|"$)/g, "'");
        name = ctx.stylize(name, 'string');
      }
    }

    return name + ': ' + str;
  }


  function reduceToSingleString(output, base, braces) {
    var length = output.reduce(function(prev, cur) {
      if (cur.indexOf('\n') >= 0) ;
      return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
    }, 0);

    if (length > 60) {
      return braces[0] +
             (base === '' ? '' : base + '\n ') +
             ' ' +
             output.join(',\n  ') +
             ' ' +
             braces[1];
    }

    return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
  }


  // NOTE: These type checking functions intentionally don't use `instanceof`
  // because it is fragile and can be easily faked with `Object.create()`.
  function isArray$1(ar) {
    return Array.isArray(ar);
  }

  function isBoolean(arg) {
    return typeof arg === 'boolean';
  }

  function isNull(arg) {
    return arg === null;
  }

  function isNullOrUndefined(arg) {
    return arg == null;
  }

  function isNumber(arg) {
    return typeof arg === 'number';
  }

  function isString(arg) {
    return typeof arg === 'string';
  }

  function isUndefined(arg) {
    return arg === void 0;
  }

  function isRegExp(re) {
    return isObject$1(re) && objectToString(re) === '[object RegExp]';
  }

  function isObject$1(arg) {
    return typeof arg === 'object' && arg !== null;
  }

  function isDate(d) {
    return isObject$1(d) && objectToString(d) === '[object Date]';
  }

  function isError(e) {
    return isObject$1(e) &&
        (objectToString(e) === '[object Error]' || e instanceof Error);
  }

  function isFunction(arg) {
    return typeof arg === 'function';
  }

  function isPrimitive(arg) {
    return arg === null ||
           typeof arg === 'boolean' ||
           typeof arg === 'number' ||
           typeof arg === 'string' ||
           typeof arg === 'symbol' ||  // ES6 symbol
           typeof arg === 'undefined';
  }

  function objectToString(o) {
    return Object.prototype.toString.call(o);
  }

  function _extend(origin, add) {
    // Don't do anything if add isn't an object
    if (!add || !isObject$1(add)) return origin;

    var keys = Object.keys(add);
    var i = keys.length;
    while (i--) {
      origin[keys[i]] = add[keys[i]];
    }
    return origin;
  }
  function hasOwnProperty$1(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  }

  function compare(a, b) {
    if (a === b) {
      return 0;
    }

    var x = a.length;
    var y = b.length;

    for (var i = 0, len = Math.min(x, y); i < len; ++i) {
      if (a[i] !== b[i]) {
        x = a[i];
        y = b[i];
        break;
      }
    }

    if (x < y) {
      return -1;
    }
    if (y < x) {
      return 1;
    }
    return 0;
  }
  var hasOwn = Object.prototype.hasOwnProperty;

  var objectKeys$1 = Object.keys || function (obj) {
    var keys = [];
    for (var key in obj) {
      if (hasOwn.call(obj, key)) keys.push(key);
    }
    return keys;
  };
  var pSlice = Array.prototype.slice;
  var _functionsHaveNames;
  function functionsHaveNames() {
    if (typeof _functionsHaveNames !== 'undefined') {
      return _functionsHaveNames;
    }
    return _functionsHaveNames = (function () {
      return function foo() {}.name === 'foo';
    }());
  }
  function pToString (obj) {
    return Object.prototype.toString.call(obj);
  }
  function isView(arrbuf) {
    if (buffer.isBuffer(arrbuf)) {
      return false;
    }
    if (typeof global$1.ArrayBuffer !== 'function') {
      return false;
    }
    if (typeof ArrayBuffer.isView === 'function') {
      return ArrayBuffer.isView(arrbuf);
    }
    if (!arrbuf) {
      return false;
    }
    if (arrbuf instanceof DataView) {
      return true;
    }
    if (arrbuf.buffer && arrbuf.buffer instanceof ArrayBuffer) {
      return true;
    }
    return false;
  }
  // 1. The assert module provides functions that throw
  // AssertionError's when particular conditions are not met. The
  // assert module must conform to the following interface.

  function assert$d(value, message) {
    if (!value) fail(value, true, message, '==', ok);
  }

  // 2. The AssertionError is defined in assert.
  // new assert.AssertionError({ message: message,
  //                             actual: actual,
  //                             expected: expected })

  var regex = /\s*function\s+([^\(\s]*)\s*/;
  // based on https://github.com/ljharb/function.prototype.name/blob/adeeeec8bfcc6068b187d7d9fb3d5bb1d3a30899/implementation.js
  function getName(func) {
    if (!isFunction(func)) {
      return;
    }
    if (functionsHaveNames()) {
      return func.name;
    }
    var str = func.toString();
    var match = str.match(regex);
    return match && match[1];
  }
  assert$d.AssertionError = AssertionError;
  function AssertionError(options) {
    this.name = 'AssertionError';
    this.actual = options.actual;
    this.expected = options.expected;
    this.operator = options.operator;
    if (options.message) {
      this.message = options.message;
      this.generatedMessage = false;
    } else {
      this.message = getMessage(this);
      this.generatedMessage = true;
    }
    var stackStartFunction = options.stackStartFunction || fail;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, stackStartFunction);
    } else {
      // non v8 browsers so we can have a stacktrace
      var err = new Error();
      if (err.stack) {
        var out = err.stack;

        // try to strip useless frames
        var fn_name = getName(stackStartFunction);
        var idx = out.indexOf('\n' + fn_name);
        if (idx >= 0) {
          // once we have located the function frame
          // we need to strip out everything before it (and its line)
          var next_line = out.indexOf('\n', idx + 1);
          out = out.substring(next_line + 1);
        }

        this.stack = out;
      }
    }
  }

  // assert.AssertionError instanceof Error
  inherits$2(AssertionError, Error);

  function truncate(s, n) {
    if (typeof s === 'string') {
      return s.length < n ? s : s.slice(0, n);
    } else {
      return s;
    }
  }
  function inspect(something) {
    if (functionsHaveNames() || !isFunction(something)) {
      return inspect$1(something);
    }
    var rawname = getName(something);
    var name = rawname ? ': ' + rawname : '';
    return '[Function' +  name + ']';
  }
  function getMessage(self) {
    return truncate(inspect(self.actual), 128) + ' ' +
           self.operator + ' ' +
           truncate(inspect(self.expected), 128);
  }

  // At present only the three keys mentioned above are used and
  // understood by the spec. Implementations or sub modules can pass
  // other keys to the AssertionError's constructor - they will be
  // ignored.

  // 3. All of the following functions must throw an AssertionError
  // when a corresponding condition is not met, with a message that
  // may be undefined if not provided.  All assertion methods provide
  // both the actual and expected values to the assertion error for
  // display purposes.

  function fail(actual, expected, message, operator, stackStartFunction) {
    throw new AssertionError({
      message: message,
      actual: actual,
      expected: expected,
      operator: operator,
      stackStartFunction: stackStartFunction
    });
  }

  // EXTENSION! allows for well behaved errors defined elsewhere.
  assert$d.fail = fail;

  // 4. Pure assertion tests whether a value is truthy, as determined
  // by !!guard.
  // assert.ok(guard, message_opt);
  // This statement is equivalent to assert.equal(true, !!guard,
  // message_opt);. To test strictly for the value true, use
  // assert.strictEqual(true, guard, message_opt);.

  function ok(value, message) {
    if (!value) fail(value, true, message, '==', ok);
  }
  assert$d.ok = ok;

  // 5. The equality assertion tests shallow, coercive equality with
  // ==.
  // assert.equal(actual, expected, message_opt);
  assert$d.equal = equal;
  function equal(actual, expected, message) {
    if (actual != expected) fail(actual, expected, message, '==', equal);
  }

  // 6. The non-equality assertion tests for whether two objects are not equal
  // with != assert.notEqual(actual, expected, message_opt);
  assert$d.notEqual = notEqual;
  function notEqual(actual, expected, message) {
    if (actual == expected) {
      fail(actual, expected, message, '!=', notEqual);
    }
  }

  // 7. The equivalence assertion tests a deep equality relation.
  // assert.deepEqual(actual, expected, message_opt);
  assert$d.deepEqual = deepEqual;
  function deepEqual(actual, expected, message) {
    if (!_deepEqual(actual, expected, false)) {
      fail(actual, expected, message, 'deepEqual', deepEqual);
    }
  }
  assert$d.deepStrictEqual = deepStrictEqual;
  function deepStrictEqual(actual, expected, message) {
    if (!_deepEqual(actual, expected, true)) {
      fail(actual, expected, message, 'deepStrictEqual', deepStrictEqual);
    }
  }

  function _deepEqual(actual, expected, strict, memos) {
    // 7.1. All identical values are equivalent, as determined by ===.
    if (actual === expected) {
      return true;
    } else if (buffer.isBuffer(actual) && buffer.isBuffer(expected)) {
      return compare(actual, expected) === 0;

    // 7.2. If the expected value is a Date object, the actual value is
    // equivalent if it is also a Date object that refers to the same time.
    } else if (isDate(actual) && isDate(expected)) {
      return actual.getTime() === expected.getTime();

    // 7.3 If the expected value is a RegExp object, the actual value is
    // equivalent if it is also a RegExp object with the same source and
    // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
    } else if (isRegExp(actual) && isRegExp(expected)) {
      return actual.source === expected.source &&
             actual.global === expected.global &&
             actual.multiline === expected.multiline &&
             actual.lastIndex === expected.lastIndex &&
             actual.ignoreCase === expected.ignoreCase;

    // 7.4. Other pairs that do not both pass typeof value == 'object',
    // equivalence is determined by ==.
    } else if ((actual === null || typeof actual !== 'object') &&
               (expected === null || typeof expected !== 'object')) {
      return strict ? actual === expected : actual == expected;

    // If both values are instances of typed arrays, wrap their underlying
    // ArrayBuffers in a Buffer each to increase performance
    // This optimization requires the arrays to have the same type as checked by
    // Object.prototype.toString (aka pToString). Never perform binary
    // comparisons for Float*Arrays, though, since e.g. +0 === -0 but their
    // bit patterns are not identical.
    } else if (isView(actual) && isView(expected) &&
               pToString(actual) === pToString(expected) &&
               !(actual instanceof Float32Array ||
                 actual instanceof Float64Array)) {
      return compare(new Uint8Array(actual.buffer),
                     new Uint8Array(expected.buffer)) === 0;

    // 7.5 For all other Object pairs, including Array objects, equivalence is
    // determined by having the same number of owned properties (as verified
    // with Object.prototype.hasOwnProperty.call), the same set of keys
    // (although not necessarily the same order), equivalent values for every
    // corresponding key, and an identical 'prototype' property. Note: this
    // accounts for both named and indexed properties on Arrays.
    } else if (buffer.isBuffer(actual) !== buffer.isBuffer(expected)) {
      return false;
    } else {
      memos = memos || {actual: [], expected: []};

      var actualIndex = memos.actual.indexOf(actual);
      if (actualIndex !== -1) {
        if (actualIndex === memos.expected.indexOf(expected)) {
          return true;
        }
      }

      memos.actual.push(actual);
      memos.expected.push(expected);

      return objEquiv(actual, expected, strict, memos);
    }
  }

  function isArguments(object) {
    return Object.prototype.toString.call(object) == '[object Arguments]';
  }

  function objEquiv(a, b, strict, actualVisitedObjects) {
    if (a === null || a === undefined || b === null || b === undefined)
      return false;
    // if one is a primitive, the other must be same
    if (isPrimitive(a) || isPrimitive(b))
      return a === b;
    if (strict && Object.getPrototypeOf(a) !== Object.getPrototypeOf(b))
      return false;
    var aIsArgs = isArguments(a);
    var bIsArgs = isArguments(b);
    if ((aIsArgs && !bIsArgs) || (!aIsArgs && bIsArgs))
      return false;
    if (aIsArgs) {
      a = pSlice.call(a);
      b = pSlice.call(b);
      return _deepEqual(a, b, strict);
    }
    var ka = objectKeys$1(a);
    var kb = objectKeys$1(b);
    var key, i;
    // having the same number of owned properties (keys incorporates
    // hasOwnProperty)
    if (ka.length !== kb.length)
      return false;
    //the same set of keys (although not necessarily the same order),
    ka.sort();
    kb.sort();
    //~~~cheap key test
    for (i = ka.length - 1; i >= 0; i--) {
      if (ka[i] !== kb[i])
        return false;
    }
    //equivalent values for every corresponding key, and
    //~~~possibly expensive deep test
    for (i = ka.length - 1; i >= 0; i--) {
      key = ka[i];
      if (!_deepEqual(a[key], b[key], strict, actualVisitedObjects))
        return false;
    }
    return true;
  }

  // 8. The non-equivalence assertion tests for any deep inequality.
  // assert.notDeepEqual(actual, expected, message_opt);
  assert$d.notDeepEqual = notDeepEqual;
  function notDeepEqual(actual, expected, message) {
    if (_deepEqual(actual, expected, false)) {
      fail(actual, expected, message, 'notDeepEqual', notDeepEqual);
    }
  }

  assert$d.notDeepStrictEqual = notDeepStrictEqual;
  function notDeepStrictEqual(actual, expected, message) {
    if (_deepEqual(actual, expected, true)) {
      fail(actual, expected, message, 'notDeepStrictEqual', notDeepStrictEqual);
    }
  }


  // 9. The strict equality assertion tests strict equality, as determined by ===.
  // assert.strictEqual(actual, expected, message_opt);
  assert$d.strictEqual = strictEqual;
  function strictEqual(actual, expected, message) {
    if (actual !== expected) {
      fail(actual, expected, message, '===', strictEqual);
    }
  }

  // 10. The strict non-equality assertion tests for strict inequality, as
  // determined by !==.  assert.notStrictEqual(actual, expected, message_opt);
  assert$d.notStrictEqual = notStrictEqual;
  function notStrictEqual(actual, expected, message) {
    if (actual === expected) {
      fail(actual, expected, message, '!==', notStrictEqual);
    }
  }

  function expectedException(actual, expected) {
    if (!actual || !expected) {
      return false;
    }

    if (Object.prototype.toString.call(expected) == '[object RegExp]') {
      return expected.test(actual);
    }

    try {
      if (actual instanceof expected) {
        return true;
      }
    } catch (e) {
      // Ignore.  The instanceof check doesn't work for arrow functions.
    }

    if (Error.isPrototypeOf(expected)) {
      return false;
    }

    return expected.call({}, actual) === true;
  }

  function _tryBlock(block) {
    var error;
    try {
      block();
    } catch (e) {
      error = e;
    }
    return error;
  }

  function _throws(shouldThrow, block, expected, message) {
    var actual;

    if (typeof block !== 'function') {
      throw new TypeError('"block" argument must be a function');
    }

    if (typeof expected === 'string') {
      message = expected;
      expected = null;
    }

    actual = _tryBlock(block);

    message = (expected && expected.name ? ' (' + expected.name + ').' : '.') +
              (message ? ' ' + message : '.');

    if (shouldThrow && !actual) {
      fail(actual, expected, 'Missing expected exception' + message);
    }

    var userProvidedMessage = typeof message === 'string';
    var isUnwantedException = !shouldThrow && isError(actual);
    var isUnexpectedException = !shouldThrow && actual && !expected;

    if ((isUnwantedException &&
        userProvidedMessage &&
        expectedException(actual, expected)) ||
        isUnexpectedException) {
      fail(actual, expected, 'Got unwanted exception' + message);
    }

    if ((shouldThrow && actual && expected &&
        !expectedException(actual, expected)) || (!shouldThrow && actual)) {
      throw actual;
    }
  }

  // 11. Expected to throw an error:
  // assert.throws(block, Error_opt, message_opt);
  assert$d.throws = throws;
  function throws(block, /*optional*/error, /*optional*/message) {
    _throws(true, block, error, message);
  }

  // EXTENSION! This is annoying to write outside this module.
  assert$d.doesNotThrow = doesNotThrow;
  function doesNotThrow(block, /*optional*/error, /*optional*/message) {
    _throws(false, block, error, message);
  }

  assert$d.ifError = ifError;
  function ifError(err) {
    if (err) throw err;
  }

  var assert$e = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': assert$d,
    AssertionError: AssertionError,
    fail: fail,
    ok: ok,
    assert: ok,
    equal: equal,
    notEqual: notEqual,
    deepEqual: deepEqual,
    deepStrictEqual: deepStrictEqual,
    notDeepEqual: notDeepEqual,
    notDeepStrictEqual: notDeepStrictEqual,
    strictEqual: strictEqual,
    notStrictEqual: notStrictEqual,
    throws: throws,
    doesNotThrow: doesNotThrow,
    ifError: ifError
  });

  var assert$c = /*@__PURE__*/getAugmentedNamespace(assert$e);

  /**
   * Base class for layout objects.
   *
   * **NOTE** This is an abstract base class; you can create instances
   * if it amuses you, but they won't support the {@link
   * Layout#encode|encode} or {@link Layout#decode|decode} functions.
   *
   * @param {Number} span - Initializer for {@link Layout#span|span}.  The
   * parameter must be an integer; a negative value signifies that the
   * span is {@link Layout#getSpan|value-specific}.
   *
   * @param {string} [property] - Initializer for {@link
   * Layout#property|property}.
   *
   * @abstract
   */
  class Layout {
    constructor(span, property) {
      if (!Number.isInteger(span)) {
        throw new TypeError('span must be an integer');
      }

      /** The span of the layout in bytes.
       *
       * Positive values are generally expected.
       *
       * Zero will only appear in {@link Constant}s and in {@link
       * Sequence}s where the {@link Sequence#count|count} is zero.
       *
       * A negative value indicates that the span is value-specific, and
       * must be obtained using {@link Layout#getSpan|getSpan}. */
      this.span = span;

      /** The property name used when this layout is represented in an
       * Object.
       *
       * Used only for layouts that {@link Layout#decode|decode} to Object
       * instances.  If left undefined the span of the unnamed layout will
       * be treated as padding: it will not be mutated by {@link
       * Layout#encode|encode} nor represented as a property in the
       * decoded Object. */
      this.property = property;
    }

    /** Function to create an Object into which decoded properties will
     * be written.
     *
     * Used only for layouts that {@link Layout#decode|decode} to Object
     * instances, which means:
     * * {@link Structure}
     * * {@link Union}
     * * {@link VariantLayout}
     * * {@link BitStructure}
     *
     * If left undefined the JavaScript representation of these layouts
     * will be Object instances.
     *
     * See {@link bindConstructorLayout}.
     */
    makeDestinationObject() {
      return {};
    }

    /**
     * Decode from a Buffer into an JavaScript value.
     *
     * @param {Buffer} b - the buffer from which encoded data is read.
     *
     * @param {Number} [offset] - the offset at which the encoded data
     * starts.  If absent a zero offset is inferred.
     *
     * @returns {(Number|Array|Object)} - the value of the decoded data.
     *
     * @abstract
     */
    decode(b, offset) {
      throw new Error('Layout is abstract');
    }

    /**
     * Encode a JavaScript value into a Buffer.
     *
     * @param {(Number|Array|Object)} src - the value to be encoded into
     * the buffer.  The type accepted depends on the (sub-)type of {@link
     * Layout}.
     *
     * @param {Buffer} b - the buffer into which encoded data will be
     * written.
     *
     * @param {Number} [offset] - the offset at which the encoded data
     * starts.  If absent a zero offset is inferred.
     *
     * @returns {Number} - the number of bytes encoded, including the
     * space skipped for internal padding, but excluding data such as
     * {@link Sequence#count|lengths} when stored {@link
     * ExternalLayout|externally}.  This is the adjustment to `offset`
     * producing the offset where data for the next layout would be
     * written.
     *
     * @abstract
     */
    encode(src, b, offset) {
      throw new Error('Layout is abstract');
    }

    /**
     * Calculate the span of a specific instance of a layout.
     *
     * @param {Buffer} b - the buffer that contains an encoded instance.
     *
     * @param {Number} [offset] - the offset at which the encoded instance
     * starts.  If absent a zero offset is inferred.
     *
     * @return {Number} - the number of bytes covered by the layout
     * instance.  If this method is not overridden in a subclass the
     * definition-time constant {@link Layout#span|span} will be
     * returned.
     *
     * @throws {RangeError} - if the length of the value cannot be
     * determined.
     */
    getSpan(b, offset) {
      if (0 > this.span) {
        throw new RangeError('indeterminate span');
      }
      return this.span;
    }

    /**
     * Replicate the layout using a new property.
     *
     * This function must be used to get a structurally-equivalent layout
     * with a different name since all {@link Layout} instances are
     * immutable.
     *
     * **NOTE** This is a shallow copy.  All fields except {@link
     * Layout#property|property} are strictly equal to the origin layout.
     *
     * @param {String} property - the value for {@link
     * Layout#property|property} in the replica.
     *
     * @returns {Layout} - the copy with {@link Layout#property|property}
     * set to `property`.
     */
    replicate(property) {
      const rv = Object.create(this.constructor.prototype);
      Object.assign(rv, this);
      rv.property = property;
      return rv;
    }

    /**
     * Create an object from layout properties and an array of values.
     *
     * **NOTE** This function returns `undefined` if invoked on a layout
     * that does not return its value as an Object.  Objects are
     * returned for things that are a {@link Structure}, which includes
     * {@link VariantLayout|variant layouts} if they are structures, and
     * excludes {@link Union}s.  If you want this feature for a union
     * you must use {@link Union.getVariant|getVariant} to select the
     * desired layout.
     *
     * @param {Array} values - an array of values that correspond to the
     * default order for properties.  As with {@link Layout#decode|decode}
     * layout elements that have no property name are skipped when
     * iterating over the array values.  Only the top-level properties are
     * assigned; arguments are not assigned to properties of contained
     * layouts.  Any unused values are ignored.
     *
     * @return {(Object|undefined)}
     */
    fromArray(values) {
      return undefined;
    }
  }

  /* Provide text that carries a name (such as for a function that will
   * be throwing an error) annotated with the property of a given layout
   * (such as one for which the value was unacceptable).
   *
   * @ignore */
  function nameWithProperty(name, lo) {
    if (lo.property) {
      return name + '[' + lo.property + ']';
    }
    return name;
  }

  /**
   * An object that behaves like a layout but does not consume space
   * within its containing layout.
   *
   * This is primarily used to obtain metadata about a member, such as a
   * {@link OffsetLayout} that can provide data about a {@link
   * Layout#getSpan|value-specific span}.
   *
   * **NOTE** This is an abstract base class; you can create instances
   * if it amuses you, but they won't support {@link
   * ExternalLayout#isCount|isCount} or other {@link Layout} functions.
   *
   * @param {Number} span - initializer for {@link Layout#span|span}.
   * The parameter can range from 1 through 6.
   *
   * @param {string} [property] - initializer for {@link
   * Layout#property|property}.
   *
   * @abstract
   * @augments {Layout}
   */
  class ExternalLayout extends Layout {
    /**
     * Return `true` iff the external layout decodes to an unsigned
     * integer layout.
     *
     * In that case it can be used as the source of {@link
     * Sequence#count|Sequence counts}, {@link Blob#length|Blob lengths},
     * or as {@link UnionLayoutDiscriminator#layout|external union
     * discriminators}.
     *
     * @abstract
     */
    isCount() {
      throw new Error('ExternalLayout is abstract');
    }
  }

  /**
   * An {@link ExternalLayout} that supports accessing a {@link Layout}
   * at a fixed offset from the start of another Layout.  The offset may
   * be before, within, or after the base layout.
   *
   * *Factory*: {@link module:Layout.offset|offset}
   *
   * @param {Layout} layout - initializer for {@link
   * OffsetLayout#layout|layout}, modulo `property`.
   *
   * @param {Number} [offset] - Initializes {@link
   * OffsetLayout#offset|offset}.  Defaults to zero.
   *
   * @param {string} [property] - Optional new property name for a
   * {@link Layout#replicate| replica} of `layout` to be used as {@link
   * OffsetLayout#layout|layout}.  If not provided the `layout` is used
   * unchanged.
   *
   * @augments {Layout}
   */
  class OffsetLayout extends ExternalLayout {
    constructor(layout, offset, property) {
      if (!(layout instanceof Layout)) {
        throw new TypeError('layout must be a Layout');
      }

      if (undefined === offset) {
        offset = 0;
      } else if (!Number.isInteger(offset)) {
        throw new TypeError('offset must be integer or undefined');
      }

      super(layout.span, property || layout.property);

      /** The subordinated layout. */
      this.layout = layout;

      /** The location of {@link OffsetLayout#layout} relative to the
       * start of another layout.
       *
       * The value may be positive or negative, but an error will thrown
       * if at the point of use it goes outside the span of the Buffer
       * being accessed.  */
      this.offset = offset;
    }

    /** @override */
    isCount() {
      return ((this.layout instanceof UInt)
              || (this.layout instanceof UIntBE));
    }

    /** @override */
    decode(b, offset) {
      if (undefined === offset) {
        offset = 0;
      }
      return this.layout.decode(b, offset + this.offset);
    }

    /** @override */
    encode(src, b, offset) {
      if (undefined === offset) {
        offset = 0;
      }
      return this.layout.encode(src, b, offset + this.offset);
    }
  }

  /**
   * Represent an unsigned integer in little-endian format.
   *
   * *Factory*: {@link module:Layout.u8|u8}, {@link
   *  module:Layout.u16|u16}, {@link module:Layout.u24|u24}, {@link
   *  module:Layout.u32|u32}, {@link module:Layout.u40|u40}, {@link
   *  module:Layout.u48|u48}
   *
   * @param {Number} span - initializer for {@link Layout#span|span}.
   * The parameter can range from 1 through 6.
   *
   * @param {string} [property] - initializer for {@link
   * Layout#property|property}.
   *
   * @augments {Layout}
   */
  class UInt extends Layout {
    constructor(span, property) {
      super(span, property);
      if (6 < this.span) {
        throw new RangeError('span must not exceed 6 bytes');
      }
    }

    /** @override */
    decode(b, offset) {
      if (undefined === offset) {
        offset = 0;
      }
      return b.readUIntLE(offset, this.span);
    }

    /** @override */
    encode(src, b, offset) {
      if (undefined === offset) {
        offset = 0;
      }
      b.writeUIntLE(src, offset, this.span);
      return this.span;
    }
  }

  /**
   * Represent an unsigned integer in big-endian format.
   *
   * *Factory*: {@link module:Layout.u8be|u8be}, {@link
   * module:Layout.u16be|u16be}, {@link module:Layout.u24be|u24be},
   * {@link module:Layout.u32be|u32be}, {@link
   * module:Layout.u40be|u40be}, {@link module:Layout.u48be|u48be}
   *
   * @param {Number} span - initializer for {@link Layout#span|span}.
   * The parameter can range from 1 through 6.
   *
   * @param {string} [property] - initializer for {@link
   * Layout#property|property}.
   *
   * @augments {Layout}
   */
  class UIntBE extends Layout {
    constructor(span, property) {
      super( span, property);
      if (6 < this.span) {
        throw new RangeError('span must not exceed 6 bytes');
      }
    }

    /** @override */
    decode(b, offset) {
      if (undefined === offset) {
        offset = 0;
      }
      return b.readUIntBE(offset, this.span);
    }

    /** @override */
    encode(src, b, offset) {
      if (undefined === offset) {
        offset = 0;
      }
      b.writeUIntBE(src, offset, this.span);
      return this.span;
    }
  }

  const V2E32 = Math.pow(2, 32);

  /* True modulus high and low 32-bit words, where low word is always
   * non-negative. */
  function divmodInt64(src) {
    const hi32 = Math.floor(src / V2E32);
    const lo32 = src - (hi32 * V2E32);
    // assert.equal(roundedInt64(hi32, lo32), src);
    // assert(0 <= lo32);
    return {hi32, lo32};
  }
  /* Reconstruct Number from quotient and non-negative remainder */
  function roundedInt64(hi32, lo32) {
    return hi32 * V2E32 + lo32;
  }

  /**
   * Represent an unsigned 64-bit integer in little-endian format when
   * encoded and as a near integral JavaScript Number when decoded.
   *
   * *Factory*: {@link module:Layout.nu64|nu64}
   *
   * **NOTE** Values with magnitude greater than 2^52 may not decode to
   * the exact value of the encoded representation.
   *
   * @augments {Layout}
   */
  class NearUInt64 extends Layout {
    constructor(property) {
      super(8, property);
    }

    /** @override */
    decode(b, offset) {
      if (undefined === offset) {
        offset = 0;
      }
      const lo32 = b.readUInt32LE(offset);
      const hi32 = b.readUInt32LE(offset + 4);
      return roundedInt64(hi32, lo32);
    }

    /** @override */
    encode(src, b, offset) {
      if (undefined === offset) {
        offset = 0;
      }
      const split = divmodInt64(src);
      b.writeUInt32LE(split.lo32, offset);
      b.writeUInt32LE(split.hi32, offset + 4);
      return 8;
    }
  }

  /**
   * Represent a signed 64-bit integer in little-endian format when
   * encoded and as a near integral JavaScript Number when decoded.
   *
   * *Factory*: {@link module:Layout.ns64|ns64}
   *
   * **NOTE** Values with magnitude greater than 2^52 may not decode to
   * the exact value of the encoded representation.
   *
   * @augments {Layout}
   */
  class NearInt64 extends Layout {
    constructor(property) {
      super(8, property);
    }

    /** @override */
    decode(b, offset) {
      if (undefined === offset) {
        offset = 0;
      }
      const lo32 = b.readUInt32LE(offset);
      const hi32 = b.readInt32LE(offset + 4);
      return roundedInt64(hi32, lo32);
    }

    /** @override */
    encode(src, b, offset) {
      if (undefined === offset) {
        offset = 0;
      }
      const split = divmodInt64(src);
      b.writeUInt32LE(split.lo32, offset);
      b.writeInt32LE(split.hi32, offset + 4);
      return 8;
    }
  }

  /**
   * Represent a contiguous sequence of a specific layout as an Array.
   *
   * *Factory*: {@link module:Layout.seq|seq}
   *
   * @param {Layout} elementLayout - initializer for {@link
   * Sequence#elementLayout|elementLayout}.
   *
   * @param {(Number|ExternalLayout)} count - initializer for {@link
   * Sequence#count|count}.  The parameter must be either a positive
   * integer or an instance of {@link ExternalLayout}.
   *
   * @param {string} [property] - initializer for {@link
   * Layout#property|property}.
   *
   * @augments {Layout}
   */
  class Sequence extends Layout {
    constructor(elementLayout, count, property) {
      if (!(elementLayout instanceof Layout)) {
        throw new TypeError('elementLayout must be a Layout');
      }
      if (!(((count instanceof ExternalLayout) && count.isCount())
            || (Number.isInteger(count) && (0 <= count)))) {
        throw new TypeError('count must be non-negative integer '
                            + 'or an unsigned integer ExternalLayout');
      }
      let span = -1;
      if ((!(count instanceof ExternalLayout))
          && (0 < elementLayout.span)) {
        span = count * elementLayout.span;
      }

      super(span, property);

      /** The layout for individual elements of the sequence. */
      this.elementLayout = elementLayout;

      /** The number of elements in the sequence.
       *
       * This will be either a non-negative integer or an instance of
       * {@link ExternalLayout} for which {@link
       * ExternalLayout#isCount|isCount()} is `true`. */
      this.count = count;
    }

    /** @override */
    getSpan(b, offset) {
      if (0 <= this.span) {
        return this.span;
      }
      if (undefined === offset) {
        offset = 0;
      }
      let span = 0;
      let count = this.count;
      if (count instanceof ExternalLayout) {
        count = count.decode(b, offset);
      }
      if (0 < this.elementLayout.span) {
        span = count * this.elementLayout.span;
      } else {
        let idx = 0;
        while (idx < count) {
          span += this.elementLayout.getSpan(b, offset + span);
          ++idx;
        }
      }
      return span;
    }

    /** @override */
    decode(b, offset) {
      if (undefined === offset) {
        offset = 0;
      }
      const rv = [];
      let i = 0;
      let count = this.count;
      if (count instanceof ExternalLayout) {
        count = count.decode(b, offset);
      }
      while (i < count) {
        rv.push(this.elementLayout.decode(b, offset));
        offset += this.elementLayout.getSpan(b, offset);
        i += 1;
      }
      return rv;
    }

    /** Implement {@link Layout#encode|encode} for {@link Sequence}.
     *
     * **NOTE** If `src` is shorter than {@link Sequence#count|count} then
     * the unused space in the buffer is left unchanged.  If `src` is
     * longer than {@link Sequence#count|count} the unneeded elements are
     * ignored.
     *
     * **NOTE** If {@link Layout#count|count} is an instance of {@link
     * ExternalLayout} then the length of `src` will be encoded as the
     * count after `src` is encoded. */
    encode(src, b, offset) {
      if (undefined === offset) {
        offset = 0;
      }
      const elo = this.elementLayout;
      const span = src.reduce((span, v) => {
        return span + elo.encode(v, b, offset + span);
      }, 0);
      if (this.count instanceof ExternalLayout) {
        this.count.encode(src.length, b, offset);
      }
      return span;
    }
  }

  /**
   * Represent a contiguous sequence of arbitrary layout elements as an
   * Object.
   *
   * *Factory*: {@link module:Layout.struct|struct}
   *
   * **NOTE** The {@link Layout#span|span} of the structure is variable
   * if any layout in {@link Structure#fields|fields} has a variable
   * span.  When {@link Layout#encode|encoding} we must have a value for
   * all variable-length fields, or we wouldn't be able to figure out
   * how much space to use for storage.  We can only identify the value
   * for a field when it has a {@link Layout#property|property}.  As
   * such, although a structure may contain both unnamed fields and
   * variable-length fields, it cannot contain an unnamed
   * variable-length field.
   *
   * @param {Layout[]} fields - initializer for {@link
   * Structure#fields|fields}.  An error is raised if this contains a
   * variable-length field for which a {@link Layout#property|property}
   * is not defined.
   *
   * @param {string} [property] - initializer for {@link
   * Layout#property|property}.
   *
   * @param {Boolean} [decodePrefixes] - initializer for {@link
   * Structure#decodePrefixes|property}.
   *
   * @throws {Error} - if `fields` contains an unnamed variable-length
   * layout.
   *
   * @augments {Layout}
   */
  class Structure extends Layout {
    constructor(fields, property, decodePrefixes) {
      if (!(Array.isArray(fields)
            && fields.reduce((acc, v) => acc && (v instanceof Layout), true))) {
        throw new TypeError('fields must be array of Layout instances');
      }
      if (('boolean' === typeof property)
          && (undefined === decodePrefixes)) {
        decodePrefixes = property;
        property = undefined;
      }

      /* Verify absence of unnamed variable-length fields. */
      for (const fd of fields) {
        if ((0 > fd.span)
            && (undefined === fd.property)) {
          throw new Error('fields cannot contain unnamed variable-length layout');
        }
      }

      let span = -1;
      try {
        span = fields.reduce((span, fd) => span + fd.getSpan(), 0);
      } catch (e) {
      }
      super(span, property);

      /** The sequence of {@link Layout} values that comprise the
       * structure.
       *
       * The individual elements need not be the same type, and may be
       * either scalar or aggregate layouts.  If a member layout leaves
       * its {@link Layout#property|property} undefined the
       * corresponding region of the buffer associated with the element
       * will not be mutated.
       *
       * @type {Layout[]} */
      this.fields = fields;

      /** Control behavior of {@link Layout#decode|decode()} given short
       * buffers.
       *
       * In some situations a structure many be extended with additional
       * fields over time, with older installations providing only a
       * prefix of the full structure.  If this property is `true`
       * decoding will accept those buffers and leave subsequent fields
       * undefined, as long as the buffer ends at a field boundary.
       * Defaults to `false`. */
      this.decodePrefixes = !!decodePrefixes;
    }

    /** @override */
    getSpan(b, offset) {
      if (0 <= this.span) {
        return this.span;
      }
      if (undefined === offset) {
        offset = 0;
      }
      let span = 0;
      try {
        span = this.fields.reduce((span, fd) => {
          const fsp = fd.getSpan(b, offset);
          offset += fsp;
          return span + fsp;
        }, 0);
      } catch (e) {
        throw new RangeError('indeterminate span');
      }
      return span;
    }

    /** @override */
    decode(b, offset) {
      if (undefined === offset) {
        offset = 0;
      }
      const dest = this.makeDestinationObject();
      for (const fd of this.fields) {
        if (undefined !== fd.property) {
          dest[fd.property] = fd.decode(b, offset);
        }
        offset += fd.getSpan(b, offset);
        if (this.decodePrefixes
            && (b.length === offset)) {
          break;
        }
      }
      return dest;
    }

    /** Implement {@link Layout#encode|encode} for {@link Structure}.
     *
     * If `src` is missing a property for a member with a defined {@link
     * Layout#property|property} the corresponding region of the buffer is
     * left unmodified. */
    encode(src, b, offset) {
      if (undefined === offset) {
        offset = 0;
      }
      const firstOffset = offset;
      let lastOffset = 0;
      let lastWrote = 0;
      for (const fd of this.fields) {
        let span = fd.span;
        lastWrote = (0 < span) ? span : 0;
        if (undefined === fd.property) {
          /* By construction the field must be fixed-length (because
           * unnamed variable-length fields are disallowed when
           * encoding).  But check it anyway. */
          assert$c(0 < span);
        } else {
          const fv = src[fd.property];
          if (undefined !== fv) {
            lastWrote = fd.encode(fv, b, offset);
            if (0 > span) {
              /* Read the as-encoded span, which is not necessarily the
               * same as what we wrote. */
              span = fd.getSpan(b, offset);
            }
          }
        }
        lastOffset = offset;
        offset += span;
      }
      /* Use (lastOffset + lastWrote) instead of offset because the last
       * item may have had a dynamic length and we don't want to include
       * the padding between it and the end of the space reserved for
       * it. */
      return (lastOffset + lastWrote) - firstOffset;
    }

    /** @override */
    fromArray(values) {
      const dest = this.makeDestinationObject();
      for (const fd of this.fields) {
        if ((undefined !== fd.property)
            && (0 < values.length)) {
          dest[fd.property] = values.shift();
        }
      }
      return dest;
    }

    /**
     * Get access to the layout of a given property.
     *
     * @param {String} property - the structure member of interest.
     *
     * @return {Layout} - the layout associated with `property`, or
     * undefined if there is no such property.
     */
    layoutFor(property) {
      if ('string' !== typeof property) {
        throw new TypeError('property must be string');
      }
      for (const fd of this.fields) {
        if (fd.property === property) {
          return fd;
        }
      }
    }

    /**
     * Get the offset of a structure member.
     *
     * @param {String} property - the structure member of interest.
     *
     * @return {Number} - the offset in bytes to the start of `property`
     * within the structure, or undefined if `property` is not a field
     * within the structure.  If the property is a member but follows a
     * variable-length structure member a negative number will be
     * returned.
     */
    offsetOf(property) {
      if ('string' !== typeof property) {
        throw new TypeError('property must be string');
      }
      let offset = 0;
      for (const fd of this.fields) {
        if (fd.property === property) {
          return offset;
        }
        if (0 > fd.span) {
          offset = -1;
        } else if (0 <= offset) {
          offset += fd.span;
        }
      }
    }
  }
  /* eslint-enable no-extend-native */

  /**
   * Contain a fixed-length block of arbitrary data, represented as a
   * Buffer.
   *
   * *Factory*: {@link module:Layout.blob|blob}
   *
   * @param {(Number|ExternalLayout)} length - initializes {@link
   * Blob#length|length}.
   *
   * @param {String} [property] - initializer for {@link
   * Layout#property|property}.
   *
   * @augments {Layout}
   */
  class Blob extends Layout {
    constructor(length, property) {
      if (!(((length instanceof ExternalLayout) && length.isCount())
            || (Number.isInteger(length) && (0 <= length)))) {
        throw new TypeError('length must be positive integer '
                            + 'or an unsigned integer ExternalLayout');
      }

      let span = -1;
      if (!(length instanceof ExternalLayout)) {
        span = length;
      }
      super(span, property);

      /** The number of bytes in the blob.
       *
       * This may be a non-negative integer, or an instance of {@link
       * ExternalLayout} that satisfies {@link
       * ExternalLayout#isCount|isCount()}. */
      this.length = length;
    }

    /** @override */
    getSpan(b, offset) {
      let span = this.span;
      if (0 > span) {
        span = this.length.decode(b, offset);
      }
      return span;
    }

    /** @override */
    decode(b, offset) {
      if (undefined === offset) {
        offset = 0;
      }
      let span = this.span;
      if (0 > span) {
        span = this.length.decode(b, offset);
      }
      return b.slice(offset, offset + span);
    }

    /** Implement {@link Layout#encode|encode} for {@link Blob}.
     *
     * **NOTE** If {@link Layout#count|count} is an instance of {@link
     * ExternalLayout} then the length of `src` will be encoded as the
     * count after `src` is encoded. */
    encode(src, b, offset) {
      let span = this.length;
      if (this.length instanceof ExternalLayout) {
        span = src.length;
      }
      if (!((src instanceof buffer.Buffer)
            && (span === src.length))) {
        throw new TypeError(nameWithProperty('Blob.encode', this)
                            + ' requires (length ' + span + ') Buffer as src');
      }
      if ((offset + span) > b.length) {
        throw new RangeError('encoding overruns Buffer');
      }
      b.write(src.toString('hex'), offset, span, 'hex');
      if (this.length instanceof ExternalLayout) {
        this.length.encode(span, b, offset);
      }
      return span;
    }
  }

  /** Factory for {@link OffsetLayout}. */
  var offset = ((layout, offset, property) => new OffsetLayout(layout, offset, property));

  /** Factory for {@link UInt|unsigned int layouts} spanning one
   * byte. */
  var u8 = (property => new UInt(1, property));

  /** Factory for {@link UInt|little-endian unsigned int layouts}
   * spanning two bytes. */
  var u16 = (property => new UInt(2, property));

  /** Factory for {@link UInt|little-endian unsigned int layouts}
   * spanning four bytes. */
  var u32 = (property => new UInt(4, property));

  /** Factory for {@link NearUInt64|little-endian unsigned int
   * layouts} interpreted as Numbers. */
  var nu64 = (property => new NearUInt64(property));

  /** Factory for {@link NearInt64|little-endian signed int layouts}
   * interpreted as Numbers. */
  var ns64 = (property => new NearInt64(property));

  /** Factory for {@link Structure} values. */
  var struct = ((fields, property, decodePrefixes) => new Structure(fields, property, decodePrefixes));

  /** Factory for {@link Sequence} values. */
  var seq = ((elementLayout, count, property) => new Sequence(elementLayout, count, property));

  /** Factory for {@link Blob} values. */
  var blob = ((length, property) => new Blob(length, property));

  /**
   * Layout for a public key
   */

  const publicKey = (property = 'publicKey') => {
    return blob(32, property);
  };
  /**
   * Layout for a Rust String type
   */

  const rustString = (property = 'string') => {
    const rsl = struct([u32('length'), u32('lengthPadding'), blob(offset(u32(), -8), 'chars')], property);

    const _decode = rsl.decode.bind(rsl);

    const _encode = rsl.encode.bind(rsl);

    rsl.decode = (buffer, offset) => {
      const data = _decode(buffer, offset);

      return data.chars.toString('utf8');
    };

    rsl.encode = (str, buffer$1, offset) => {
      const data = {
        chars: buffer.Buffer.from(str, 'utf8')
      };
      return _encode(data, buffer$1, offset);
    };

    rsl.alloc = str => {
      return u32().span + u32().span + buffer.Buffer.from(str, 'utf8').length;
    };

    return rsl;
  };
  /**
   * Layout for an Authorized object
   */

  const authorized = (property = 'authorized') => {
    return struct([publicKey('staker'), publicKey('withdrawer')], property);
  };
  /**
   * Layout for a Lockup object
   */

  const lockup = (property = 'lockup') => {
    return struct([ns64('unixTimestamp'), ns64('epoch'), publicKey('custodian')], property);
  };
  function getAlloc(type, fields) {
    let alloc = 0;
    type.layout.fields.forEach(item => {
      if (item.span >= 0) {
        alloc += item.span;
      } else if (typeof item.alloc === 'function') {
        alloc += item.alloc(fields[item.property]);
      }
    });
    return alloc;
  }

  function decodeLength(bytes) {
    let len = 0;
    let size = 0;

    for (;;) {
      let elem = bytes.shift();
      len |= (elem & 0x7f) << size * 7;
      size += 1;

      if ((elem & 0x80) === 0) {
        break;
      }
    }

    return len;
  }
  function encodeLength(bytes, len) {
    let rem_len = len;

    for (;;) {
      let elem = rem_len & 0x7f;
      rem_len >>= 7;

      if (rem_len == 0) {
        bytes.push(elem);
        break;
      } else {
        elem |= 0x80;
        bytes.push(elem);
      }
    }
  }

  /**
   * The message header, identifying signed and read-only account
   */

  const PUBKEY_LENGTH = 32;
  /**
   * List of instructions to be processed atomically
   */

  class Message {
    constructor(args) {
      _defineProperty(this, "header", void 0);

      _defineProperty(this, "accountKeys", void 0);

      _defineProperty(this, "recentBlockhash", void 0);

      _defineProperty(this, "instructions", void 0);

      this.header = args.header;
      this.accountKeys = args.accountKeys.map(account => new PublicKey(account));
      this.recentBlockhash = args.recentBlockhash;
      this.instructions = args.instructions;
    }

    isAccountWritable(index) {
      return index < this.header.numRequiredSignatures - this.header.numReadonlySignedAccounts || index >= this.header.numRequiredSignatures && index < this.accountKeys.length - this.header.numReadonlyUnsignedAccounts;
    }

    serialize() {
      const numKeys = this.accountKeys.length;
      let keyCount = [];
      encodeLength(keyCount, numKeys);
      const instructions = this.instructions.map(instruction => {
        const {
          accounts,
          programIdIndex
        } = instruction;
        const data = bs58.decode(instruction.data);
        let keyIndicesCount = [];
        encodeLength(keyIndicesCount, accounts.length);
        let dataCount = [];
        encodeLength(dataCount, data.length);
        return {
          programIdIndex,
          keyIndicesCount: buffer.Buffer.from(keyIndicesCount),
          keyIndices: buffer.Buffer.from(accounts),
          dataLength: buffer.Buffer.from(dataCount),
          data
        };
      });
      let instructionCount = [];
      encodeLength(instructionCount, instructions.length);
      let instructionBuffer = buffer.Buffer.alloc(PACKET_DATA_SIZE);
      buffer.Buffer.from(instructionCount).copy(instructionBuffer);
      let instructionBufferLength = instructionCount.length;
      instructions.forEach(instruction => {
        const instructionLayout = struct([u8('programIdIndex'), blob(instruction.keyIndicesCount.length, 'keyIndicesCount'), seq(u8('keyIndex'), instruction.keyIndices.length, 'keyIndices'), blob(instruction.dataLength.length, 'dataLength'), seq(u8('userdatum'), instruction.data.length, 'data')]);
        const length = instructionLayout.encode(instruction, instructionBuffer, instructionBufferLength);
        instructionBufferLength += length;
      });
      instructionBuffer = instructionBuffer.slice(0, instructionBufferLength);
      const signDataLayout = struct([blob(1, 'numRequiredSignatures'), blob(1, 'numReadonlySignedAccounts'), blob(1, 'numReadonlyUnsignedAccounts'), blob(keyCount.length, 'keyCount'), seq(publicKey('key'), numKeys, 'keys'), publicKey('recentBlockhash')]);
      const transaction = {
        numRequiredSignatures: buffer.Buffer.from([this.header.numRequiredSignatures]),
        numReadonlySignedAccounts: buffer.Buffer.from([this.header.numReadonlySignedAccounts]),
        numReadonlyUnsignedAccounts: buffer.Buffer.from([this.header.numReadonlyUnsignedAccounts]),
        keyCount: buffer.Buffer.from(keyCount),
        keys: this.accountKeys.map(key => toBuffer(key.toBytes())),
        recentBlockhash: bs58.decode(this.recentBlockhash)
      };
      let signData = buffer.Buffer.alloc(2048);
      const length = signDataLayout.encode(transaction, signData);
      instructionBuffer.copy(signData, length);
      return signData.slice(0, length + instructionBuffer.length);
    }
    /**
     * Decode a compiled message into a Message object.
     */


    static from(buffer$1) {
      // Slice up wire data
      let byteArray = [...buffer$1];
      const numRequiredSignatures = byteArray.shift();
      const numReadonlySignedAccounts = byteArray.shift();
      const numReadonlyUnsignedAccounts = byteArray.shift();
      const accountCount = decodeLength(byteArray);
      let accountKeys = [];

      for (let i = 0; i < accountCount; i++) {
        const account = byteArray.slice(0, PUBKEY_LENGTH);
        byteArray = byteArray.slice(PUBKEY_LENGTH);
        accountKeys.push(bs58.encode(buffer.Buffer.from(account)));
      }

      const recentBlockhash = byteArray.slice(0, PUBKEY_LENGTH);
      byteArray = byteArray.slice(PUBKEY_LENGTH);
      const instructionCount = decodeLength(byteArray);
      let instructions = [];

      for (let i = 0; i < instructionCount; i++) {
        const programIdIndex = byteArray.shift();
        const accountCount = decodeLength(byteArray);
        const accounts = byteArray.slice(0, accountCount);
        byteArray = byteArray.slice(accountCount);
        const dataLength = decodeLength(byteArray);
        const dataSlice = byteArray.slice(0, dataLength);
        const data = bs58.encode(buffer.Buffer.from(dataSlice));
        byteArray = byteArray.slice(dataLength);
        instructions.push({
          programIdIndex,
          accounts,
          data
        });
      }

      const messageArgs = {
        header: {
          numRequiredSignatures,
          numReadonlySignedAccounts,
          numReadonlyUnsignedAccounts
        },
        recentBlockhash: bs58.encode(buffer.Buffer.from(recentBlockhash)),
        accountKeys,
        instructions
      };
      return new Message(messageArgs);
    }

  }

  /**
   * Transaction signature as base-58 encoded string
   */

  /**
   * Default (empty) signature
   *
   * Signatures are 64 bytes in length
   */
  const DEFAULT_SIGNATURE = buffer.Buffer.alloc(64).fill(0);
  /**
   * Maximum over-the-wire size of a Transaction
   *
   * 1280 is IPv6 minimum MTU
   * 40 bytes is the size of the IPv6 header
   * 8 bytes is the size of the fragment header
   */

  const PACKET_DATA_SIZE = 1280 - 40 - 8;
  const SIGNATURE_LENGTH = 64;
  /**
   * Account metadata used to define instructions
   */

  /**
   * Transaction Instruction class
   */
  class TransactionInstruction {
    /**
     * Public keys to include in this transaction
     * Boolean represents whether this pubkey needs to sign the transaction
     */

    /**
     * Program Id to execute
     */

    /**
     * Program input
     */
    constructor(opts) {
      _defineProperty(this, "keys", void 0);

      _defineProperty(this, "programId", void 0);

      _defineProperty(this, "data", buffer.Buffer.alloc(0));

      this.programId = opts.programId;
      this.keys = opts.keys;

      if (opts.data) {
        this.data = opts.data;
      }
    }

  }
  /**
   * Pair of signature and corresponding public key
   */

  /**
   * Transaction class
   */
  class Transaction {
    /**
     * Signatures for the transaction.  Typically created by invoking the
     * `sign()` method
     */

    /**
     * The first (payer) Transaction signature
     */
    get signature() {
      if (this.signatures.length > 0) {
        return this.signatures[0].signature;
      }

      return null;
    }
    /**
     * The transaction fee payer
     */


    /**
     * Construct an empty Transaction
     */
    constructor(opts) {
      _defineProperty(this, "signatures", []);

      _defineProperty(this, "feePayer", void 0);

      _defineProperty(this, "instructions", []);

      _defineProperty(this, "recentBlockhash", void 0);

      _defineProperty(this, "nonceInfo", void 0);

      opts && Object.assign(this, opts);
    }
    /**
     * Add one or more instructions to this Transaction
     */


    add(...items) {
      if (items.length === 0) {
        throw new Error('No instructions');
      }

      items.forEach(item => {
        if ('instructions' in item) {
          this.instructions = this.instructions.concat(item.instructions);
        } else if ('data' in item && 'programId' in item && 'keys' in item) {
          this.instructions.push(item);
        } else {
          this.instructions.push(new TransactionInstruction(item));
        }
      });
      return this;
    }
    /**
     * Compile transaction data
     */


    compileMessage() {
      const {
        nonceInfo
      } = this;

      if (nonceInfo && this.instructions[0] != nonceInfo.nonceInstruction) {
        this.recentBlockhash = nonceInfo.nonce;
        this.instructions.unshift(nonceInfo.nonceInstruction);
      }

      const {
        recentBlockhash
      } = this;

      if (!recentBlockhash) {
        throw new Error('Transaction recentBlockhash required');
      }

      if (this.instructions.length < 1) {
        throw new Error('No instructions provided');
      }

      let feePayer;

      if (this.feePayer) {
        feePayer = this.feePayer;
      } else if (this.signatures.length > 0 && this.signatures[0].publicKey) {
        // Use implicit fee payer
        feePayer = this.signatures[0].publicKey;
      } else {
        throw new Error('Transaction fee payer required');
      }

      for (let i = 0; i < this.instructions.length; i++) {
        if (this.instructions[i].programId === undefined) {
          throw new Error("Transaction instruction index ".concat(i, " has undefined program id"));
        }
      }

      const programIds = [];
      const accountMetas = [];
      this.instructions.forEach(instruction => {
        instruction.keys.forEach(accountMeta => {
          accountMetas.push({ ...accountMeta
          });
        });
        const programId = instruction.programId.toString();

        if (!programIds.includes(programId)) {
          programIds.push(programId);
        }
      }); // Append programID account metas

      programIds.forEach(programId => {
        accountMetas.push({
          pubkey: new PublicKey(programId),
          isSigner: false,
          isWritable: false
        });
      }); // Sort. Prioritizing first by signer, then by writable

      accountMetas.sort(function (x, y) {
        const checkSigner = x.isSigner === y.isSigner ? 0 : x.isSigner ? -1 : 1;
        const checkWritable = x.isWritable === y.isWritable ? 0 : x.isWritable ? -1 : 1;
        return checkSigner || checkWritable;
      }); // Cull duplicate account metas

      const uniqueMetas = [];
      accountMetas.forEach(accountMeta => {
        const pubkeyString = accountMeta.pubkey.toString();
        const uniqueIndex = uniqueMetas.findIndex(x => {
          return x.pubkey.toString() === pubkeyString;
        });

        if (uniqueIndex > -1) {
          uniqueMetas[uniqueIndex].isWritable = uniqueMetas[uniqueIndex].isWritable || accountMeta.isWritable;
        } else {
          uniqueMetas.push(accountMeta);
        }
      }); // Move fee payer to the front

      const feePayerIndex = uniqueMetas.findIndex(x => {
        return x.pubkey.equals(feePayer);
      });

      if (feePayerIndex > -1) {
        const [payerMeta] = uniqueMetas.splice(feePayerIndex, 1);
        payerMeta.isSigner = true;
        payerMeta.isWritable = true;
        uniqueMetas.unshift(payerMeta);
      } else {
        uniqueMetas.unshift({
          pubkey: feePayer,
          isSigner: true,
          isWritable: true
        });
      } // Disallow unknown signers


      for (const signature of this.signatures) {
        const uniqueIndex = uniqueMetas.findIndex(x => {
          return x.pubkey.equals(signature.publicKey);
        });

        if (uniqueIndex > -1) {
          if (!uniqueMetas[uniqueIndex].isSigner) {
            uniqueMetas[uniqueIndex].isSigner = true;
            console.warn('Transaction references a signature that is unnecessary, ' + 'only the fee payer and instruction signer accounts should sign a transaction. ' + 'This behavior is deprecated and will throw an error in the next major version release.');
          }
        } else {
          throw new Error("unknown signer: ".concat(signature.publicKey.toString()));
        }
      }

      let numRequiredSignatures = 0;
      let numReadonlySignedAccounts = 0;
      let numReadonlyUnsignedAccounts = 0; // Split out signing from non-signing keys and count header values

      const signedKeys = [];
      const unsignedKeys = [];
      uniqueMetas.forEach(({
        pubkey,
        isSigner,
        isWritable
      }) => {
        if (isSigner) {
          signedKeys.push(pubkey.toString());
          numRequiredSignatures += 1;

          if (!isWritable) {
            numReadonlySignedAccounts += 1;
          }
        } else {
          unsignedKeys.push(pubkey.toString());

          if (!isWritable) {
            numReadonlyUnsignedAccounts += 1;
          }
        }
      });
      const accountKeys = signedKeys.concat(unsignedKeys);
      const instructions = this.instructions.map(instruction => {
        const {
          data,
          programId
        } = instruction;
        return {
          programIdIndex: accountKeys.indexOf(programId.toString()),
          accounts: instruction.keys.map(meta => accountKeys.indexOf(meta.pubkey.toString())),
          data: bs58.encode(data)
        };
      });
      instructions.forEach(instruction => {
        assert$d(instruction.programIdIndex >= 0);
        instruction.accounts.forEach(keyIndex => assert$d(keyIndex >= 0));
      });
      return new Message({
        header: {
          numRequiredSignatures,
          numReadonlySignedAccounts,
          numReadonlyUnsignedAccounts
        },
        accountKeys,
        recentBlockhash,
        instructions
      });
    }
    /**
     * @internal
     */


    _compile() {
      const message = this.compileMessage();
      const signedKeys = message.accountKeys.slice(0, message.header.numRequiredSignatures);

      if (this.signatures.length === signedKeys.length) {
        const valid = this.signatures.every((pair, index) => {
          return signedKeys[index].equals(pair.publicKey);
        });
        if (valid) return message;
      }

      this.signatures = signedKeys.map(publicKey => ({
        signature: null,
        publicKey
      }));
      return message;
    }
    /**
     * Get a buffer of the Transaction data that need to be covered by signatures
     */


    serializeMessage() {
      return this._compile().serialize();
    }
    /**
     * Specify the public keys which will be used to sign the Transaction.
     * The first signer will be used as the transaction fee payer account.
     *
     * Signatures can be added with either `partialSign` or `addSignature`
     *
     * @deprecated Deprecated since v0.84.0. Only the fee payer needs to be
     * specified and it can be set in the Transaction constructor or with the
     * `feePayer` property.
     */


    setSigners(...signers) {
      if (signers.length === 0) {
        throw new Error('No signers');
      }

      const seen = new Set();
      this.signatures = signers.filter(publicKey => {
        const key = publicKey.toString();

        if (seen.has(key)) {
          return false;
        } else {
          seen.add(key);
          return true;
        }
      }).map(publicKey => ({
        signature: null,
        publicKey
      }));
    }
    /**
     * Sign the Transaction with the specified accounts. Multiple signatures may
     * be applied to a Transaction. The first signature is considered "primary"
     * and is used identify and confirm transactions.
     *
     * If the Transaction `feePayer` is not set, the first signer will be used
     * as the transaction fee payer account.
     *
     * Transaction fields should not be modified after the first call to `sign`,
     * as doing so may invalidate the signature and cause the Transaction to be
     * rejected.
     *
     * The Transaction must be assigned a valid `recentBlockhash` before invoking this method
     */


    sign(...signers) {
      if (signers.length === 0) {
        throw new Error('No signers');
      } // Dedupe signers


      const seen = new Set();
      const uniqueSigners = [];

      for (const signer of signers) {
        const key = signer.publicKey.toString();

        if (seen.has(key)) {
          continue;
        } else {
          seen.add(key);
          uniqueSigners.push(signer);
        }
      }

      this.signatures = uniqueSigners.map(signer => ({
        signature: null,
        publicKey: signer.publicKey
      }));

      const message = this._compile();

      this._partialSign(message, ...uniqueSigners);

      this._verifySignatures(message.serialize(), true);
    }
    /**
     * Partially sign a transaction with the specified accounts. All accounts must
     * correspond to either the fee payer or a signer account in the transaction
     * instructions.
     *
     * All the caveats from the `sign` method apply to `partialSign`
     */


    partialSign(...signers) {
      if (signers.length === 0) {
        throw new Error('No signers');
      } // Dedupe signers


      const seen = new Set();
      const uniqueSigners = [];

      for (const signer of signers) {
        const key = signer.publicKey.toString();

        if (seen.has(key)) {
          continue;
        } else {
          seen.add(key);
          uniqueSigners.push(signer);
        }
      }

      const message = this._compile();

      this._partialSign(message, ...uniqueSigners);
    }
    /**
     * @internal
     */


    _partialSign(message, ...signers) {
      const signData = message.serialize();
      signers.forEach(signer => {
        const signature = naclFast.sign.detached(signData, signer.secretKey);

        this._addSignature(signer.publicKey, toBuffer(signature));
      });
    }
    /**
     * Add an externally created signature to a transaction. The public key
     * must correspond to either the fee payer or a signer account in the transaction
     * instructions.
     */


    addSignature(pubkey, signature) {
      this._compile(); // Ensure signatures array is populated


      this._addSignature(pubkey, signature);
    }
    /**
     * @internal
     */


    _addSignature(pubkey, signature) {
      assert$d(signature.length === 64);
      const index = this.signatures.findIndex(sigpair => pubkey.equals(sigpair.publicKey));

      if (index < 0) {
        throw new Error("unknown signer: ".concat(pubkey.toString()));
      }

      this.signatures[index].signature = buffer.Buffer.from(signature);
    }
    /**
     * Verify signatures of a complete, signed Transaction
     */


    verifySignatures() {
      return this._verifySignatures(this.serializeMessage(), true);
    }
    /**
     * @internal
     */


    _verifySignatures(signData, requireAllSignatures) {
      for (const {
        signature,
        publicKey
      } of this.signatures) {
        if (signature === null) {
          if (requireAllSignatures) {
            return false;
          }
        } else {
          if (!naclFast.sign.detached.verify(signData, signature, publicKey.toBuffer())) {
            return false;
          }
        }
      }

      return true;
    }
    /**
     * Serialize the Transaction in the wire format.
     */


    serialize(config) {
      const {
        requireAllSignatures,
        verifySignatures
      } = Object.assign({
        requireAllSignatures: true,
        verifySignatures: true
      }, config);
      const signData = this.serializeMessage();

      if (verifySignatures && !this._verifySignatures(signData, requireAllSignatures)) {
        throw new Error('Signature verification failed');
      }

      return this._serialize(signData);
    }
    /**
     * @internal
     */


    _serialize(signData) {
      const {
        signatures
      } = this;
      const signatureCount = [];
      encodeLength(signatureCount, signatures.length);
      const transactionLength = signatureCount.length + signatures.length * 64 + signData.length;
      const wireTransaction = buffer.Buffer.alloc(transactionLength);
      assert$d(signatures.length < 256);
      buffer.Buffer.from(signatureCount).copy(wireTransaction, 0);
      signatures.forEach(({
        signature
      }, index) => {
        if (signature !== null) {
          assert$d(signature.length === 64, "signature has invalid length");
          buffer.Buffer.from(signature).copy(wireTransaction, signatureCount.length + index * 64);
        }
      });
      signData.copy(wireTransaction, signatureCount.length + signatures.length * 64);
      assert$d(wireTransaction.length <= PACKET_DATA_SIZE, "Transaction too large: ".concat(wireTransaction.length, " > ").concat(PACKET_DATA_SIZE));
      return wireTransaction;
    }
    /**
     * Deprecated method
     * @internal
     */


    get keys() {
      assert$d(this.instructions.length === 1);
      return this.instructions[0].keys.map(keyObj => keyObj.pubkey);
    }
    /**
     * Deprecated method
     * @internal
     */


    get programId() {
      assert$d(this.instructions.length === 1);
      return this.instructions[0].programId;
    }
    /**
     * Deprecated method
     * @internal
     */


    get data() {
      assert$d(this.instructions.length === 1);
      return this.instructions[0].data;
    }
    /**
     * Parse a wire transaction into a Transaction object.
     */


    static from(buffer$1) {
      // Slice up wire data
      let byteArray = [...buffer$1];
      const signatureCount = decodeLength(byteArray);
      let signatures = [];

      for (let i = 0; i < signatureCount; i++) {
        const signature = byteArray.slice(0, SIGNATURE_LENGTH);
        byteArray = byteArray.slice(SIGNATURE_LENGTH);
        signatures.push(bs58.encode(buffer.Buffer.from(signature)));
      }

      return Transaction.populate(Message.from(byteArray), signatures);
    }
    /**
     * Populate Transaction object from message and signatures
     */


    static populate(message, signatures) {
      const transaction = new Transaction();
      transaction.recentBlockhash = message.recentBlockhash;

      if (message.header.numRequiredSignatures > 0) {
        transaction.feePayer = message.accountKeys[0];
      }

      signatures.forEach((signature, index) => {
        const sigPubkeyPair = {
          signature: signature == bs58.encode(DEFAULT_SIGNATURE) ? null : bs58.decode(signature),
          publicKey: message.accountKeys[index]
        };
        transaction.signatures.push(sigPubkeyPair);
      });
      message.instructions.forEach(instruction => {
        const keys = instruction.accounts.map(account => {
          const pubkey = message.accountKeys[account];
          return {
            pubkey,
            isSigner: transaction.signatures.some(keyObj => keyObj.publicKey.toString() === pubkey.toString()),
            isWritable: message.isAccountWritable(account)
          };
        });
        transaction.instructions.push(new TransactionInstruction({
          keys,
          programId: message.accountKeys[instruction.programIdIndex],
          data: bs58.decode(instruction.data)
        }));
      });
      return transaction;
    }

  }

  const SYSVAR_CLOCK_PUBKEY = new PublicKey('SysvarC1ock11111111111111111111111111111111');
  const SYSVAR_RECENT_BLOCKHASHES_PUBKEY = new PublicKey('SysvarRecentB1ockHashes11111111111111111111');
  const SYSVAR_RENT_PUBKEY = new PublicKey('SysvarRent111111111111111111111111111111111');
  const SYSVAR_REWARDS_PUBKEY = new PublicKey('SysvarRewards111111111111111111111111111111');
  const SYSVAR_STAKE_HISTORY_PUBKEY = new PublicKey('SysvarStakeHistory1111111111111111111111111');
  const SYSVAR_INSTRUCTIONS_PUBKEY = new PublicKey('Sysvar1nstructions1111111111111111111111111');

  /**
   * Sign, send and confirm a transaction.
   *
   * If `commitment` option is not specified, defaults to 'max' commitment.
   *
   * @param {Connection} connection
   * @param {Transaction} transaction
   * @param {Array<Account>} signers
   * @param {ConfirmOptions} [options]
   * @returns {Promise<TransactionSignature>}
   */
  async function sendAndConfirmTransaction(connection, transaction, signers, options) {
    const sendOptions = options && {
      skipPreflight: options.skipPreflight,
      preflightCommitment: options.preflightCommitment || options.commitment
    };
    const signature = await connection.sendTransaction(transaction, signers, sendOptions);
    const status = (await connection.confirmTransaction(signature, options && options.commitment)).value;

    if (status.err) {
      throw new Error("Transaction ".concat(signature, " failed (").concat(JSON.stringify(status), ")"));
    }

    return signature;
  }

  // zzz
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * @internal
   */

  /**
   * Populate a buffer of instruction data using an InstructionType
   * @internal
   */
  function encodeData(type, fields) {
    const allocLength = type.layout.span >= 0 ? type.layout.span : getAlloc(type, fields);
    const data = buffer.Buffer.alloc(allocLength);
    const layoutFields = Object.assign({
      instruction: type.index
    }, fields);
    type.layout.encode(layoutFields, data);
    return data;
  }
  /**
   * Decode instruction data buffer using an InstructionType
   * @internal
   */

  function decodeData(type, buffer) {
    let data;

    try {
      data = type.layout.decode(buffer);
    } catch (err) {
      throw new Error('invalid instruction; ' + err);
    }

    if (data.instruction !== type.index) {
      throw new Error("invalid instruction; instruction index mismatch ".concat(data.instruction, " != ").concat(type.index));
    }

    return data;
  }

  // @ts-ignore
  /**
   * https://github.com/solana-labs/solana/blob/90bedd7e067b5b8f3ddbb45da00a4e9cabb22c62/sdk/src/fee_calculator.rs#L7-L11
   *
   * @internal
   */

  const FeeCalculatorLayout = nu64('lamportsPerSignature');
  /**
   * Calculator for transaction fees.
   */

  /**
   * See https://github.com/solana-labs/solana/blob/0ea2843ec9cdc517572b8e62c959f41b55cf4453/sdk/src/nonce_state.rs#L29-L32
   *
   * @internal
   */

  const NonceAccountLayout = struct([u32('version'), u32('state'), publicKey('authorizedPubkey'), publicKey('nonce'), struct([FeeCalculatorLayout], 'feeCalculator')]);
  const NONCE_ACCOUNT_LENGTH = NonceAccountLayout.span;

  /**
   * NonceAccount class
   */
  class NonceAccount {
    /**
     * @internal
     */
    constructor(args) {
      _defineProperty(this, "authorizedPubkey", void 0);

      _defineProperty(this, "nonce", void 0);

      _defineProperty(this, "feeCalculator", void 0);

      this.authorizedPubkey = args.authorizedPubkey;
      this.nonce = args.nonce;
      this.feeCalculator = args.feeCalculator;
    }
    /**
     * Deserialize NonceAccount from the account data.
     *
     * @param buffer account data
     * @return NonceAccount
     */


    static fromAccountData(buffer) {
      const nonceAccount = NonceAccountLayout.decode(toBuffer(buffer), 0);
      return new NonceAccount({
        authorizedPubkey: new PublicKey(nonceAccount.authorizedPubkey),
        nonce: new PublicKey(nonceAccount.nonce).toString(),
        feeCalculator: nonceAccount.feeCalculator
      });
    }

  }

  /**
   * Create account system transaction params
   */

  /**
   * System Instruction class
   */
  class SystemInstruction {
    /**
     * @internal
     */
    constructor() {}
    /**
     * Decode a system instruction and retrieve the instruction type.
     */


    static decodeInstructionType(instruction) {
      this.checkProgramId(instruction.programId);
      const instructionTypeLayout = u32('instruction');
      const typeIndex = instructionTypeLayout.decode(instruction.data);
      let type;

      for (const [ixType, layout] of Object.entries(SYSTEM_INSTRUCTION_LAYOUTS)) {
        if (layout.index == typeIndex) {
          type = ixType;
          break;
        }
      }

      if (!type) {
        throw new Error('Instruction type incorrect; not a SystemInstruction');
      }

      return type;
    }
    /**
     * Decode a create account system instruction and retrieve the instruction params.
     */


    static decodeCreateAccount(instruction) {
      this.checkProgramId(instruction.programId);
      this.checkKeyLength(instruction.keys, 2);
      const {
        lamports,
        space,
        programId
      } = decodeData(SYSTEM_INSTRUCTION_LAYOUTS.Create, instruction.data);
      return {
        fromPubkey: instruction.keys[0].pubkey,
        newAccountPubkey: instruction.keys[1].pubkey,
        lamports,
        space,
        programId: new PublicKey(programId)
      };
    }
    /**
     * Decode a transfer system instruction and retrieve the instruction params.
     */


    static decodeTransfer(instruction) {
      this.checkProgramId(instruction.programId);
      this.checkKeyLength(instruction.keys, 2);
      const {
        lamports
      } = decodeData(SYSTEM_INSTRUCTION_LAYOUTS.Transfer, instruction.data);
      return {
        fromPubkey: instruction.keys[0].pubkey,
        toPubkey: instruction.keys[1].pubkey,
        lamports
      };
    }
    /**
     * Decode a transfer with seed system instruction and retrieve the instruction params.
     */


    static decodeTransferWithSeed(instruction) {
      this.checkProgramId(instruction.programId);
      this.checkKeyLength(instruction.keys, 3);
      const {
        lamports,
        seed,
        programId
      } = decodeData(SYSTEM_INSTRUCTION_LAYOUTS.TransferWithSeed, instruction.data);
      return {
        fromPubkey: instruction.keys[0].pubkey,
        basePubkey: instruction.keys[1].pubkey,
        toPubkey: instruction.keys[2].pubkey,
        lamports,
        seed,
        programId: new PublicKey(programId)
      };
    }
    /**
     * Decode an allocate system instruction and retrieve the instruction params.
     */


    static decodeAllocate(instruction) {
      this.checkProgramId(instruction.programId);
      this.checkKeyLength(instruction.keys, 1);
      const {
        space
      } = decodeData(SYSTEM_INSTRUCTION_LAYOUTS.Allocate, instruction.data);
      return {
        accountPubkey: instruction.keys[0].pubkey,
        space
      };
    }
    /**
     * Decode an allocate with seed system instruction and retrieve the instruction params.
     */


    static decodeAllocateWithSeed(instruction) {
      this.checkProgramId(instruction.programId);
      this.checkKeyLength(instruction.keys, 1);
      const {
        base,
        seed,
        space,
        programId
      } = decodeData(SYSTEM_INSTRUCTION_LAYOUTS.AllocateWithSeed, instruction.data);
      return {
        accountPubkey: instruction.keys[0].pubkey,
        basePubkey: new PublicKey(base),
        seed,
        space,
        programId: new PublicKey(programId)
      };
    }
    /**
     * Decode an assign system instruction and retrieve the instruction params.
     */


    static decodeAssign(instruction) {
      this.checkProgramId(instruction.programId);
      this.checkKeyLength(instruction.keys, 1);
      const {
        programId
      } = decodeData(SYSTEM_INSTRUCTION_LAYOUTS.Assign, instruction.data);
      return {
        accountPubkey: instruction.keys[0].pubkey,
        programId: new PublicKey(programId)
      };
    }
    /**
     * Decode an assign with seed system instruction and retrieve the instruction params.
     */


    static decodeAssignWithSeed(instruction) {
      this.checkProgramId(instruction.programId);
      this.checkKeyLength(instruction.keys, 1);
      const {
        base,
        seed,
        programId
      } = decodeData(SYSTEM_INSTRUCTION_LAYOUTS.AssignWithSeed, instruction.data);
      return {
        accountPubkey: instruction.keys[0].pubkey,
        basePubkey: new PublicKey(base),
        seed,
        programId: new PublicKey(programId)
      };
    }
    /**
     * Decode a create account with seed system instruction and retrieve the instruction params.
     */


    static decodeCreateWithSeed(instruction) {
      this.checkProgramId(instruction.programId);
      this.checkKeyLength(instruction.keys, 2);
      const {
        base,
        seed,
        lamports,
        space,
        programId
      } = decodeData(SYSTEM_INSTRUCTION_LAYOUTS.CreateWithSeed, instruction.data);
      return {
        fromPubkey: instruction.keys[0].pubkey,
        newAccountPubkey: instruction.keys[1].pubkey,
        basePubkey: new PublicKey(base),
        seed,
        lamports,
        space,
        programId: new PublicKey(programId)
      };
    }
    /**
     * Decode a nonce initialize system instruction and retrieve the instruction params.
     */


    static decodeNonceInitialize(instruction) {
      this.checkProgramId(instruction.programId);
      this.checkKeyLength(instruction.keys, 3);
      const {
        authorized
      } = decodeData(SYSTEM_INSTRUCTION_LAYOUTS.InitializeNonceAccount, instruction.data);
      return {
        noncePubkey: instruction.keys[0].pubkey,
        authorizedPubkey: new PublicKey(authorized)
      };
    }
    /**
     * Decode a nonce advance system instruction and retrieve the instruction params.
     */


    static decodeNonceAdvance(instruction) {
      this.checkProgramId(instruction.programId);
      this.checkKeyLength(instruction.keys, 3);
      decodeData(SYSTEM_INSTRUCTION_LAYOUTS.AdvanceNonceAccount, instruction.data);
      return {
        noncePubkey: instruction.keys[0].pubkey,
        authorizedPubkey: instruction.keys[2].pubkey
      };
    }
    /**
     * Decode a nonce withdraw system instruction and retrieve the instruction params.
     */


    static decodeNonceWithdraw(instruction) {
      this.checkProgramId(instruction.programId);
      this.checkKeyLength(instruction.keys, 5);
      const {
        lamports
      } = decodeData(SYSTEM_INSTRUCTION_LAYOUTS.WithdrawNonceAccount, instruction.data);
      return {
        noncePubkey: instruction.keys[0].pubkey,
        toPubkey: instruction.keys[1].pubkey,
        authorizedPubkey: instruction.keys[4].pubkey,
        lamports
      };
    }
    /**
     * Decode a nonce authorize system instruction and retrieve the instruction params.
     */


    static decodeNonceAuthorize(instruction) {
      this.checkProgramId(instruction.programId);
      this.checkKeyLength(instruction.keys, 2);
      const {
        authorized
      } = decodeData(SYSTEM_INSTRUCTION_LAYOUTS.AuthorizeNonceAccount, instruction.data);
      return {
        noncePubkey: instruction.keys[0].pubkey,
        authorizedPubkey: instruction.keys[1].pubkey,
        newAuthorizedPubkey: new PublicKey(authorized)
      };
    }
    /**
     * @internal
     */


    static checkProgramId(programId) {
      if (!programId.equals(SystemProgram.programId)) {
        throw new Error('invalid instruction; programId is not SystemProgram');
      }
    }
    /**
     * @internal
     */


    static checkKeyLength(keys, expectedLength) {
      if (keys.length < expectedLength) {
        throw new Error("invalid instruction; found ".concat(keys.length, " keys, expected at least ").concat(expectedLength));
      }
    }

  }
  /**
   * An enumeration of valid SystemInstructionType's
   */

  /**
   * An enumeration of valid system InstructionType's
   * @internal
   */
  const SYSTEM_INSTRUCTION_LAYOUTS = Object.freeze({
    Create: {
      index: 0,
      layout: struct([u32('instruction'), ns64('lamports'), ns64('space'), publicKey('programId')])
    },
    Assign: {
      index: 1,
      layout: struct([u32('instruction'), publicKey('programId')])
    },
    Transfer: {
      index: 2,
      layout: struct([u32('instruction'), ns64('lamports')])
    },
    CreateWithSeed: {
      index: 3,
      layout: struct([u32('instruction'), publicKey('base'), rustString('seed'), ns64('lamports'), ns64('space'), publicKey('programId')])
    },
    AdvanceNonceAccount: {
      index: 4,
      layout: struct([u32('instruction')])
    },
    WithdrawNonceAccount: {
      index: 5,
      layout: struct([u32('instruction'), ns64('lamports')])
    },
    InitializeNonceAccount: {
      index: 6,
      layout: struct([u32('instruction'), publicKey('authorized')])
    },
    AuthorizeNonceAccount: {
      index: 7,
      layout: struct([u32('instruction'), publicKey('authorized')])
    },
    Allocate: {
      index: 8,
      layout: struct([u32('instruction'), ns64('space')])
    },
    AllocateWithSeed: {
      index: 9,
      layout: struct([u32('instruction'), publicKey('base'), rustString('seed'), ns64('space'), publicKey('programId')])
    },
    AssignWithSeed: {
      index: 10,
      layout: struct([u32('instruction'), publicKey('base'), rustString('seed'), publicKey('programId')])
    },
    TransferWithSeed: {
      index: 11,
      layout: struct([u32('instruction'), ns64('lamports'), rustString('seed'), publicKey('programId')])
    }
  });
  /**
   * Factory class for transactions to interact with the System program
   */

  class SystemProgram {
    /**
     * @internal
     */
    constructor() {}
    /**
     * Public key that identifies the System program
     */


    /**
     * Generate a transaction instruction that creates a new account
     */
    static createAccount(params) {
      const type = SYSTEM_INSTRUCTION_LAYOUTS.Create;
      const data = encodeData(type, {
        lamports: params.lamports,
        space: params.space,
        programId: toBuffer(params.programId.toBuffer())
      });
      return new TransactionInstruction({
        keys: [{
          pubkey: params.fromPubkey,
          isSigner: true,
          isWritable: true
        }, {
          pubkey: params.newAccountPubkey,
          isSigner: true,
          isWritable: true
        }],
        programId: this.programId,
        data
      });
    }
    /**
     * Generate a transaction instruction that transfers lamports from one account to another
     */


    static transfer(params) {
      let data;
      let keys;

      if ('basePubkey' in params) {
        const type = SYSTEM_INSTRUCTION_LAYOUTS.TransferWithSeed;
        data = encodeData(type, {
          lamports: params.lamports,
          seed: params.seed,
          programId: toBuffer(params.programId.toBuffer())
        });
        keys = [{
          pubkey: params.fromPubkey,
          isSigner: false,
          isWritable: true
        }, {
          pubkey: params.basePubkey,
          isSigner: true,
          isWritable: false
        }, {
          pubkey: params.toPubkey,
          isSigner: false,
          isWritable: true
        }];
      } else {
        const type = SYSTEM_INSTRUCTION_LAYOUTS.Transfer;
        data = encodeData(type, {
          lamports: params.lamports
        });
        keys = [{
          pubkey: params.fromPubkey,
          isSigner: true,
          isWritable: true
        }, {
          pubkey: params.toPubkey,
          isSigner: false,
          isWritable: true
        }];
      }

      return new TransactionInstruction({
        keys,
        programId: this.programId,
        data
      });
    }
    /**
     * Generate a transaction instruction that assigns an account to a program
     */


    static assign(params) {
      let data;
      let keys;

      if ('basePubkey' in params) {
        const type = SYSTEM_INSTRUCTION_LAYOUTS.AssignWithSeed;
        data = encodeData(type, {
          base: toBuffer(params.basePubkey.toBuffer()),
          seed: params.seed,
          programId: toBuffer(params.programId.toBuffer())
        });
        keys = [{
          pubkey: params.accountPubkey,
          isSigner: false,
          isWritable: true
        }, {
          pubkey: params.basePubkey,
          isSigner: true,
          isWritable: false
        }];
      } else {
        const type = SYSTEM_INSTRUCTION_LAYOUTS.Assign;
        data = encodeData(type, {
          programId: toBuffer(params.programId.toBuffer())
        });
        keys = [{
          pubkey: params.accountPubkey,
          isSigner: true,
          isWritable: true
        }];
      }

      return new TransactionInstruction({
        keys,
        programId: this.programId,
        data
      });
    }
    /**
     * Generate a transaction instruction that creates a new account at
     *   an address generated with `from`, a seed, and programId
     */


    static createAccountWithSeed(params) {
      const type = SYSTEM_INSTRUCTION_LAYOUTS.CreateWithSeed;
      const data = encodeData(type, {
        base: toBuffer(params.basePubkey.toBuffer()),
        seed: params.seed,
        lamports: params.lamports,
        space: params.space,
        programId: toBuffer(params.programId.toBuffer())
      });
      let keys = [{
        pubkey: params.fromPubkey,
        isSigner: true,
        isWritable: true
      }, {
        pubkey: params.newAccountPubkey,
        isSigner: false,
        isWritable: true
      }];

      if (params.basePubkey != params.fromPubkey) {
        keys.push({
          pubkey: params.basePubkey,
          isSigner: true,
          isWritable: false
        });
      }

      return new TransactionInstruction({
        keys,
        programId: this.programId,
        data
      });
    }
    /**
     * Generate a transaction that creates a new Nonce account
     */


    static createNonceAccount(params) {
      const transaction = new Transaction();

      if ('basePubkey' in params && 'seed' in params) {
        transaction.add(SystemProgram.createAccountWithSeed({
          fromPubkey: params.fromPubkey,
          newAccountPubkey: params.noncePubkey,
          basePubkey: params.basePubkey,
          seed: params.seed,
          lamports: params.lamports,
          space: NONCE_ACCOUNT_LENGTH,
          programId: this.programId
        }));
      } else {
        transaction.add(SystemProgram.createAccount({
          fromPubkey: params.fromPubkey,
          newAccountPubkey: params.noncePubkey,
          lamports: params.lamports,
          space: NONCE_ACCOUNT_LENGTH,
          programId: this.programId
        }));
      }

      const initParams = {
        noncePubkey: params.noncePubkey,
        authorizedPubkey: params.authorizedPubkey
      };
      transaction.add(this.nonceInitialize(initParams));
      return transaction;
    }
    /**
     * Generate an instruction to initialize a Nonce account
     */


    static nonceInitialize(params) {
      const type = SYSTEM_INSTRUCTION_LAYOUTS.InitializeNonceAccount;
      const data = encodeData(type, {
        authorized: toBuffer(params.authorizedPubkey.toBuffer())
      });
      const instructionData = {
        keys: [{
          pubkey: params.noncePubkey,
          isSigner: false,
          isWritable: true
        }, {
          pubkey: SYSVAR_RECENT_BLOCKHASHES_PUBKEY,
          isSigner: false,
          isWritable: false
        }, {
          pubkey: SYSVAR_RENT_PUBKEY,
          isSigner: false,
          isWritable: false
        }],
        programId: this.programId,
        data
      };
      return new TransactionInstruction(instructionData);
    }
    /**
     * Generate an instruction to advance the nonce in a Nonce account
     */


    static nonceAdvance(params) {
      const type = SYSTEM_INSTRUCTION_LAYOUTS.AdvanceNonceAccount;
      const data = encodeData(type);
      const instructionData = {
        keys: [{
          pubkey: params.noncePubkey,
          isSigner: false,
          isWritable: true
        }, {
          pubkey: SYSVAR_RECENT_BLOCKHASHES_PUBKEY,
          isSigner: false,
          isWritable: false
        }, {
          pubkey: params.authorizedPubkey,
          isSigner: true,
          isWritable: false
        }],
        programId: this.programId,
        data
      };
      return new TransactionInstruction(instructionData);
    }
    /**
     * Generate a transaction instruction that withdraws lamports from a Nonce account
     */


    static nonceWithdraw(params) {
      const type = SYSTEM_INSTRUCTION_LAYOUTS.WithdrawNonceAccount;
      const data = encodeData(type, {
        lamports: params.lamports
      });
      return new TransactionInstruction({
        keys: [{
          pubkey: params.noncePubkey,
          isSigner: false,
          isWritable: true
        }, {
          pubkey: params.toPubkey,
          isSigner: false,
          isWritable: true
        }, {
          pubkey: SYSVAR_RECENT_BLOCKHASHES_PUBKEY,
          isSigner: false,
          isWritable: false
        }, {
          pubkey: SYSVAR_RENT_PUBKEY,
          isSigner: false,
          isWritable: false
        }, {
          pubkey: params.authorizedPubkey,
          isSigner: true,
          isWritable: false
        }],
        programId: this.programId,
        data
      });
    }
    /**
     * Generate a transaction instruction that authorizes a new PublicKey as the authority
     * on a Nonce account.
     */


    static nonceAuthorize(params) {
      const type = SYSTEM_INSTRUCTION_LAYOUTS.AuthorizeNonceAccount;
      const data = encodeData(type, {
        authorized: toBuffer(params.newAuthorizedPubkey.toBuffer())
      });
      return new TransactionInstruction({
        keys: [{
          pubkey: params.noncePubkey,
          isSigner: false,
          isWritable: true
        }, {
          pubkey: params.authorizedPubkey,
          isSigner: true,
          isWritable: false
        }],
        programId: this.programId,
        data
      });
    }
    /**
     * Generate a transaction instruction that allocates space in an account without funding
     */


    static allocate(params) {
      let data;
      let keys;

      if ('basePubkey' in params) {
        const type = SYSTEM_INSTRUCTION_LAYOUTS.AllocateWithSeed;
        data = encodeData(type, {
          base: toBuffer(params.basePubkey.toBuffer()),
          seed: params.seed,
          space: params.space,
          programId: toBuffer(params.programId.toBuffer())
        });
        keys = [{
          pubkey: params.accountPubkey,
          isSigner: false,
          isWritable: true
        }, {
          pubkey: params.basePubkey,
          isSigner: true,
          isWritable: false
        }];
      } else {
        const type = SYSTEM_INSTRUCTION_LAYOUTS.Allocate;
        data = encodeData(type, {
          space: params.space
        });
        keys = [{
          pubkey: params.accountPubkey,
          isSigner: true,
          isWritable: true
        }];
      }

      return new TransactionInstruction({
        keys,
        programId: this.programId,
        data
      });
    }

  }

  _defineProperty(SystemProgram, "programId", new PublicKey('11111111111111111111111111111111'));

  // rest of the Transaction fields
  //
  // TODO: replace 300 with a proper constant for the size of the other
  // Transaction fields

  const CHUNK_SIZE = PACKET_DATA_SIZE - 300;
  /**
   * Program loader interface
   */

  class Loader {
    /**
     * @internal
     */
    constructor() {}
    /**
     * Amount of program data placed in each load Transaction
     */


    /**
     * Minimum number of signatures required to load a program not including
     * retries
     *
     * Can be used to calculate transaction fees
     */
    static getMinNumSignatures(dataLength) {
      return 2 * ( // Every transaction requires two signatures (payer + program)
      Math.ceil(dataLength / Loader.chunkSize) + 1 + // Add one for Create transaction
      1) // Add one for Finalize transaction
      ;
    }
    /**
     * Loads a generic program
     *
     * @param connection The connection to use
     * @param payer System account that pays to load the program
     * @param program Account to load the program into
     * @param programId Public key that identifies the loader
     * @param data Program octets
     * @return true if program was loaded successfully, false if program was already loaded
     */


    static async load(connection, payer, program, programId, data) {
      {
        const balanceNeeded = await connection.getMinimumBalanceForRentExemption(data.length); // Fetch program account info to check if it has already been created

        const programInfo = await connection.getAccountInfo(program.publicKey, 'confirmed');
        let transaction = null;

        if (programInfo !== null) {
          if (programInfo.executable) {
            console.error('Program load failed, account is already executable');
            return false;
          }

          if (programInfo.data.length !== data.length) {
            transaction = transaction || new Transaction();
            transaction.add(SystemProgram.allocate({
              accountPubkey: program.publicKey,
              space: data.length
            }));
          }

          if (!programInfo.owner.equals(programId)) {
            transaction = transaction || new Transaction();
            transaction.add(SystemProgram.assign({
              accountPubkey: program.publicKey,
              programId
            }));
          }

          if (programInfo.lamports < balanceNeeded) {
            transaction = transaction || new Transaction();
            transaction.add(SystemProgram.transfer({
              fromPubkey: payer.publicKey,
              toPubkey: program.publicKey,
              lamports: balanceNeeded - programInfo.lamports
            }));
          }
        } else {
          transaction = new Transaction().add(SystemProgram.createAccount({
            fromPubkey: payer.publicKey,
            newAccountPubkey: program.publicKey,
            lamports: balanceNeeded > 0 ? balanceNeeded : 1,
            space: data.length,
            programId
          }));
        } // If the account is already created correctly, skip this step
        // and proceed directly to loading instructions


        if (transaction !== null) {
          await sendAndConfirmTransaction(connection, transaction, [payer, program], {
            commitment: 'confirmed'
          });
        }
      }
      const dataLayout = struct([u32('instruction'), u32('offset'), u32('bytesLength'), u32('bytesLengthPadding'), seq(u8('byte'), offset(u32(), -8), 'bytes')]);
      const chunkSize = Loader.chunkSize;
      let offset$1 = 0;
      let array = data;
      let transactions = [];

      while (array.length > 0) {
        const bytes = array.slice(0, chunkSize);
        const data = buffer.Buffer.alloc(chunkSize + 16);
        dataLayout.encode({
          instruction: 0,
          // Load instruction
          offset: offset$1,
          bytes
        }, data);
        const transaction = new Transaction().add({
          keys: [{
            pubkey: program.publicKey,
            isSigner: true,
            isWritable: true
          }],
          programId,
          data
        });
        transactions.push(sendAndConfirmTransaction(connection, transaction, [payer, program], {
          commitment: 'confirmed'
        })); // Delay between sends in an attempt to reduce rate limit errors

        if (connection._rpcEndpoint.includes('solana.com')) {
          const REQUESTS_PER_SECOND = 4;
          await sleep(1000 / REQUESTS_PER_SECOND);
        }

        offset$1 += chunkSize;
        array = array.slice(chunkSize);
      }

      await Promise.all(transactions); // Finalize the account loaded with program data for execution

      {
        const dataLayout = struct([u32('instruction')]);
        const data = buffer.Buffer.alloc(dataLayout.span);
        dataLayout.encode({
          instruction: 1 // Finalize instruction

        }, data);
        const transaction = new Transaction().add({
          keys: [{
            pubkey: program.publicKey,
            isSigner: true,
            isWritable: true
          }, {
            pubkey: SYSVAR_RENT_PUBKEY,
            isSigner: false,
            isWritable: false
          }],
          programId,
          data
        });
        await sendAndConfirmTransaction(connection, transaction, [payer, program], {
          commitment: 'confirmed'
        });
      } // success

      return true;
    }

  }

  _defineProperty(Loader, "chunkSize", CHUNK_SIZE);

  const BPF_LOADER_PROGRAM_ID = new PublicKey('BPFLoader2111111111111111111111111111111111');
  /**
   * Factory class for transactions to interact with a program loader
   */

  class BpfLoader {
    /**
     * Minimum number of signatures required to load a program not including
     * retries
     *
     * Can be used to calculate transaction fees
     */
    static getMinNumSignatures(dataLength) {
      return Loader.getMinNumSignatures(dataLength);
    }
    /**
     * Load a BPF program
     *
     * @param connection The connection to use
     * @param payer Account that will pay program loading fees
     * @param program Account to load the program into
     * @param elf The entire ELF containing the BPF program
     * @param loaderProgramId The program id of the BPF loader to use
     * @return true if program was loaded successfully, false if program was already loaded
     */


    static load(connection, payer, program, elf, loaderProgramId) {
      return Loader.load(connection, payer, program, loaderProgramId, elf);
    }

  }

  /** Highest positive signed 32-bit float value */
  const maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1

  /** Bootstring parameters */
  const base$1 = 36;
  const tMin = 1;
  const tMax = 26;
  const skew = 38;
  const damp = 700;
  const initialBias = 72;
  const initialN = 128; // 0x80
  const delimiter = '-'; // '\x2D'
  const regexNonASCII = /[^\0-\x7E]/; // non-ASCII chars
  const regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g; // RFC 3490 separators

  /** Error messages */
  const errors$1 = {
  	'overflow': 'Overflow: input needs wider integers to process',
  	'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
  	'invalid-input': 'Invalid input'
  };

  /** Convenience shortcuts */
  const baseMinusTMin = base$1 - tMin;
  const floor = Math.floor;
  const stringFromCharCode = String.fromCharCode;

  /*--------------------------------------------------------------------------*/

  /**
   * A generic error utility function.
   * @private
   * @param {String} type The error type.
   * @returns {Error} Throws a `RangeError` with the applicable error message.
   */
  function error(type) {
  	throw new RangeError(errors$1[type]);
  }

  /**
   * A generic `Array#map` utility function.
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} callback The function that gets called for every array
   * item.
   * @returns {Array} A new array of values returned by the callback function.
   */
  function map$1(array, fn) {
  	const result = [];
  	let length = array.length;
  	while (length--) {
  		result[length] = fn(array[length]);
  	}
  	return result;
  }

  /**
   * A simple `Array#map`-like wrapper to work with domain name strings or email
   * addresses.
   * @private
   * @param {String} domain The domain name or email address.
   * @param {Function} callback The function that gets called for every
   * character.
   * @returns {Array} A new string of characters returned by the callback
   * function.
   */
  function mapDomain(string, fn) {
  	const parts = string.split('@');
  	let result = '';
  	if (parts.length > 1) {
  		// In email addresses, only the domain name should be punycoded. Leave
  		// the local part (i.e. everything up to `@`) intact.
  		result = parts[0] + '@';
  		string = parts[1];
  	}
  	// Avoid `split(regex)` for IE8 compatibility. See #17.
  	string = string.replace(regexSeparators, '\x2E');
  	const labels = string.split('.');
  	const encoded = map$1(labels, fn).join('.');
  	return result + encoded;
  }

  /**
   * Creates an array containing the numeric code points of each Unicode
   * character in the string. While JavaScript uses UCS-2 internally,
   * this function will convert a pair of surrogate halves (each of which
   * UCS-2 exposes as separate characters) into a single code point,
   * matching UTF-16.
   * @see `punycode.ucs2.encode`
   * @see <https://mathiasbynens.be/notes/javascript-encoding>
   * @memberOf punycode.ucs2
   * @name decode
   * @param {String} string The Unicode input string (UCS-2).
   * @returns {Array} The new array of code points.
   */
  function ucs2decode(string) {
  	const output = [];
  	let counter = 0;
  	const length = string.length;
  	while (counter < length) {
  		const value = string.charCodeAt(counter++);
  		if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
  			// It's a high surrogate, and there is a next character.
  			const extra = string.charCodeAt(counter++);
  			if ((extra & 0xFC00) == 0xDC00) { // Low surrogate.
  				output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
  			} else {
  				// It's an unmatched surrogate; only append this code unit, in case the
  				// next code unit is the high surrogate of a surrogate pair.
  				output.push(value);
  				counter--;
  			}
  		} else {
  			output.push(value);
  		}
  	}
  	return output;
  }

  /**
   * Converts a digit/integer into a basic code point.
   * @see `basicToDigit()`
   * @private
   * @param {Number} digit The numeric value of a basic code point.
   * @returns {Number} The basic code point whose value (when used for
   * representing integers) is `digit`, which needs to be in the range
   * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
   * used; else, the lowercase form is used. The behavior is undefined
   * if `flag` is non-zero and `digit` has no uppercase form.
   */
  const digitToBasic = function(digit, flag) {
  	//  0..25 map to ASCII a..z or A..Z
  	// 26..35 map to ASCII 0..9
  	return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
  };

  /**
   * Bias adaptation function as per section 3.4 of RFC 3492.
   * https://tools.ietf.org/html/rfc3492#section-3.4
   * @private
   */
  const adapt = function(delta, numPoints, firstTime) {
  	let k = 0;
  	delta = firstTime ? floor(delta / damp) : delta >> 1;
  	delta += floor(delta / numPoints);
  	for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base$1) {
  		delta = floor(delta / baseMinusTMin);
  	}
  	return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
  };

  /**
   * Converts a string of Unicode symbols (e.g. a domain name label) to a
   * Punycode string of ASCII-only symbols.
   * @memberOf punycode
   * @param {String} input The string of Unicode symbols.
   * @returns {String} The resulting Punycode string of ASCII-only symbols.
   */
  const encode = function(input) {
  	const output = [];

  	// Convert the input in UCS-2 to an array of Unicode code points.
  	input = ucs2decode(input);

  	// Cache the length.
  	let inputLength = input.length;

  	// Initialize the state.
  	let n = initialN;
  	let delta = 0;
  	let bias = initialBias;

  	// Handle the basic code points.
  	for (const currentValue of input) {
  		if (currentValue < 0x80) {
  			output.push(stringFromCharCode(currentValue));
  		}
  	}

  	let basicLength = output.length;
  	let handledCPCount = basicLength;

  	// `handledCPCount` is the number of code points that have been handled;
  	// `basicLength` is the number of basic code points.

  	// Finish the basic string with a delimiter unless it's empty.
  	if (basicLength) {
  		output.push(delimiter);
  	}

  	// Main encoding loop:
  	while (handledCPCount < inputLength) {

  		// All non-basic code points < n have been handled already. Find the next
  		// larger one:
  		let m = maxInt;
  		for (const currentValue of input) {
  			if (currentValue >= n && currentValue < m) {
  				m = currentValue;
  			}
  		}

  		// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
  		// but guard against overflow.
  		const handledCPCountPlusOne = handledCPCount + 1;
  		if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
  			error('overflow');
  		}

  		delta += (m - n) * handledCPCountPlusOne;
  		n = m;

  		for (const currentValue of input) {
  			if (currentValue < n && ++delta > maxInt) {
  				error('overflow');
  			}
  			if (currentValue == n) {
  				// Represent delta as a generalized variable-length integer.
  				let q = delta;
  				for (let k = base$1; /* no condition */; k += base$1) {
  					const t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
  					if (q < t) {
  						break;
  					}
  					const qMinusT = q - t;
  					const baseMinusT = base$1 - t;
  					output.push(
  						stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
  					);
  					q = floor(qMinusT / baseMinusT);
  				}

  				output.push(stringFromCharCode(digitToBasic(q, 0)));
  				bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
  				delta = 0;
  				++handledCPCount;
  			}
  		}

  		++delta;
  		++n;

  	}
  	return output.join('');
  };

  /**
   * Converts a Unicode string representing a domain name or an email address to
   * Punycode. Only the non-ASCII parts of the domain name will be converted,
   * i.e. it doesn't matter if you call it with a domain that's already in
   * ASCII.
   * @memberOf punycode
   * @param {String} input The domain name or email address to convert, as a
   * Unicode string.
   * @returns {String} The Punycode representation of the given domain name or
   * email address.
   */
  const toASCII = function(input) {
  	return mapDomain(input, function(string) {
  		return regexNonASCII.test(string)
  			? 'xn--' + encode(string)
  			: string;
  	});
  };

  // Copyright Joyent, Inc. and other Node contributors.
  //
  // Permission is hereby granted, free of charge, to any person obtaining a
  // copy of this software and associated documentation files (the
  // "Software"), to deal in the Software without restriction, including
  // without limitation the rights to use, copy, modify, merge, publish,
  // distribute, sublicense, and/or sell copies of the Software, and to permit
  // persons to whom the Software is furnished to do so, subject to the
  // following conditions:
  //
  // The above copyright notice and this permission notice shall be included
  // in all copies or substantial portions of the Software.
  //
  // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
  // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
  // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
  // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
  // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
  // USE OR OTHER DEALINGS IN THE SOFTWARE.


  // If obj.hasOwnProperty has been overridden, then calling
  // obj.hasOwnProperty(prop) will break.
  // See: https://github.com/joyent/node/issues/1707
  function hasOwnProperty(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  }
  var isArray = Array.isArray || function (xs) {
    return Object.prototype.toString.call(xs) === '[object Array]';
  };
  function stringifyPrimitive(v) {
    switch (typeof v) {
      case 'string':
        return v;

      case 'boolean':
        return v ? 'true' : 'false';

      case 'number':
        return isFinite(v) ? v : '';

      default:
        return '';
    }
  }

  function stringify (obj, sep, eq, name) {
    sep = sep || '&';
    eq = eq || '=';
    if (obj === null) {
      obj = undefined;
    }

    if (typeof obj === 'object') {
      return map(objectKeys(obj), function(k) {
        var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
        if (isArray(obj[k])) {
          return map(obj[k], function(v) {
            return ks + encodeURIComponent(stringifyPrimitive(v));
          }).join(sep);
        } else {
          return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
        }
      }).join(sep);

    }

    if (!name) return '';
    return encodeURIComponent(stringifyPrimitive(name)) + eq +
           encodeURIComponent(stringifyPrimitive(obj));
  }
  function map (xs, f) {
    if (xs.map) return xs.map(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
      res.push(f(xs[i], i));
    }
    return res;
  }

  var objectKeys = Object.keys || function (obj) {
    var res = [];
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
    }
    return res;
  };

  function parse$1(qs, sep, eq, options) {
    sep = sep || '&';
    eq = eq || '=';
    var obj = {};

    if (typeof qs !== 'string' || qs.length === 0) {
      return obj;
    }

    var regexp = /\+/g;
    qs = qs.split(sep);

    var maxKeys = 1000;
    if (options && typeof options.maxKeys === 'number') {
      maxKeys = options.maxKeys;
    }

    var len = qs.length;
    // maxKeys <= 0 means that we should not limit keys count
    if (maxKeys > 0 && len > maxKeys) {
      len = maxKeys;
    }

    for (var i = 0; i < len; ++i) {
      var x = qs[i].replace(regexp, '%20'),
          idx = x.indexOf(eq),
          kstr, vstr, k, v;

      if (idx >= 0) {
        kstr = x.substr(0, idx);
        vstr = x.substr(idx + 1);
      } else {
        kstr = x;
        vstr = '';
      }

      k = decodeURIComponent(kstr);
      v = decodeURIComponent(vstr);

      if (!hasOwnProperty(obj, k)) {
        obj[k] = v;
      } else if (isArray(obj[k])) {
        obj[k].push(v);
      } else {
        obj[k] = [obj[k], v];
      }
    }

    return obj;
  }

  // Copyright Joyent, Inc. and other Node contributors.
  function Url() {
    this.protocol = null;
    this.slashes = null;
    this.auth = null;
    this.host = null;
    this.port = null;
    this.hostname = null;
    this.hash = null;
    this.search = null;
    this.query = null;
    this.pathname = null;
    this.path = null;
    this.href = null;
  }

  // Reference: RFC 3986, RFC 1808, RFC 2396

  // define these here so at least they only have to be
  // compiled once on the first module load.
  var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,

    // Special case for a simple path URL
    simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

    // RFC 2396: characters reserved for delimiting URLs.
    // We actually just auto-escape these.
    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

    // RFC 2396: characters not allowed for various reasons.
    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
    autoEscape = ['\''].concat(unwise),
    // Characters that are never ever allowed in a hostname.
    // Note that any invalid chars are also handled, but these
    // are the ones that are *expected* to be seen, so we fast-path
    // them.
    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
    hostEndingChars = ['/', '?', '#'],
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
    // protocols that can allow "unsafe" and "unwise" chars.
    unsafeProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that never have a hostname.
    hostlessProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that always contain a // bit.
    slashedProtocol = {
      'http': true,
      'https': true,
      'ftp': true,
      'gopher': true,
      'file': true,
      'http:': true,
      'https:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    };

  function urlParse(url, parseQueryString, slashesDenoteHost) {
    if (url && isObject$1(url) && url instanceof Url) return url;

    var u = new Url;
    u.parse(url, parseQueryString, slashesDenoteHost);
    return u;
  }
  Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
    return parse(this, url, parseQueryString, slashesDenoteHost);
  };

  function parse(self, url, parseQueryString, slashesDenoteHost) {
    if (!isString(url)) {
      throw new TypeError('Parameter \'url\' must be a string, not ' + typeof url);
    }

    // Copy chrome, IE, opera backslash-handling behavior.
    // Back slashes before the query string get converted to forward slashes
    // See: https://code.google.com/p/chromium/issues/detail?id=25916
    var queryIndex = url.indexOf('?'),
      splitter =
      (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
      uSplit = url.split(splitter),
      slashRegex = /\\/g;
    uSplit[0] = uSplit[0].replace(slashRegex, '/');
    url = uSplit.join(splitter);

    var rest = url;

    // trim before proceeding.
    // This is to support parse stuff like "  http://foo.com  \n"
    rest = rest.trim();

    if (!slashesDenoteHost && url.split('#').length === 1) {
      // Try fast path regexp
      var simplePath = simplePathPattern.exec(rest);
      if (simplePath) {
        self.path = rest;
        self.href = rest;
        self.pathname = simplePath[1];
        if (simplePath[2]) {
          self.search = simplePath[2];
          if (parseQueryString) {
            self.query = parse$1(self.search.substr(1));
          } else {
            self.query = self.search.substr(1);
          }
        } else if (parseQueryString) {
          self.search = '';
          self.query = {};
        }
        return self;
      }
    }

    var proto = protocolPattern.exec(rest);
    if (proto) {
      proto = proto[0];
      var lowerProto = proto.toLowerCase();
      self.protocol = lowerProto;
      rest = rest.substr(proto.length);
    }

    // figure out if it's got a host
    // user@server is *always* interpreted as a hostname, and url
    // resolution will treat //foo/bar as host=foo,path=bar because that's
    // how the browser resolves relative URLs.
    if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
      var slashes = rest.substr(0, 2) === '//';
      if (slashes && !(proto && hostlessProtocol[proto])) {
        rest = rest.substr(2);
        self.slashes = true;
      }
    }
    var i, hec, l, p;
    if (!hostlessProtocol[proto] &&
      (slashes || (proto && !slashedProtocol[proto]))) {

      // there's a hostname.
      // the first instance of /, ?, ;, or # ends the host.
      //
      // If there is an @ in the hostname, then non-host chars *are* allowed
      // to the left of the last @ sign, unless some host-ending character
      // comes *before* the @-sign.
      // URLs are obnoxious.
      //
      // ex:
      // http://a@b@c/ => user:a@b host:c
      // http://a@b?@c => user:a host:c path:/?@c

      // v0.12 TODO(isaacs): This is not quite how Chrome does things.
      // Review our test case against browsers more comprehensively.

      // find the first instance of any hostEndingChars
      var hostEnd = -1;
      for (i = 0; i < hostEndingChars.length; i++) {
        hec = rest.indexOf(hostEndingChars[i]);
        if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
          hostEnd = hec;
      }

      // at this point, either we have an explicit point where the
      // auth portion cannot go past, or the last @ char is the decider.
      var auth, atSign;
      if (hostEnd === -1) {
        // atSign can be anywhere.
        atSign = rest.lastIndexOf('@');
      } else {
        // atSign must be in auth portion.
        // http://a@b/c@d => host:b auth:a path:/c@d
        atSign = rest.lastIndexOf('@', hostEnd);
      }

      // Now we have a portion which is definitely the auth.
      // Pull that off.
      if (atSign !== -1) {
        auth = rest.slice(0, atSign);
        rest = rest.slice(atSign + 1);
        self.auth = decodeURIComponent(auth);
      }

      // the host is the remaining to the left of the first non-host char
      hostEnd = -1;
      for (i = 0; i < nonHostChars.length; i++) {
        hec = rest.indexOf(nonHostChars[i]);
        if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
          hostEnd = hec;
      }
      // if we still have not hit it, then the entire thing is a host.
      if (hostEnd === -1)
        hostEnd = rest.length;

      self.host = rest.slice(0, hostEnd);
      rest = rest.slice(hostEnd);

      // pull out port.
      parseHost(self);

      // we've indicated that there is a hostname,
      // so even if it's empty, it has to be present.
      self.hostname = self.hostname || '';

      // if hostname begins with [ and ends with ]
      // assume that it's an IPv6 address.
      var ipv6Hostname = self.hostname[0] === '[' &&
        self.hostname[self.hostname.length - 1] === ']';

      // validate a little.
      if (!ipv6Hostname) {
        var hostparts = self.hostname.split(/\./);
        for (i = 0, l = hostparts.length; i < l; i++) {
          var part = hostparts[i];
          if (!part) continue;
          if (!part.match(hostnamePartPattern)) {
            var newpart = '';
            for (var j = 0, k = part.length; j < k; j++) {
              if (part.charCodeAt(j) > 127) {
                // we replace non-ASCII char with a temporary placeholder
                // we need this to make sure size of hostname is not
                // broken by replacing non-ASCII by nothing
                newpart += 'x';
              } else {
                newpart += part[j];
              }
            }
            // we test again with ASCII char only
            if (!newpart.match(hostnamePartPattern)) {
              var validParts = hostparts.slice(0, i);
              var notHost = hostparts.slice(i + 1);
              var bit = part.match(hostnamePartStart);
              if (bit) {
                validParts.push(bit[1]);
                notHost.unshift(bit[2]);
              }
              if (notHost.length) {
                rest = '/' + notHost.join('.') + rest;
              }
              self.hostname = validParts.join('.');
              break;
            }
          }
        }
      }

      if (self.hostname.length > hostnameMaxLen) {
        self.hostname = '';
      } else {
        // hostnames are always lower case.
        self.hostname = self.hostname.toLowerCase();
      }

      if (!ipv6Hostname) {
        // IDNA Support: Returns a punycoded representation of "domain".
        // It only converts parts of the domain name that
        // have non-ASCII characters, i.e. it doesn't matter if
        // you call it with a domain that already is ASCII-only.
        self.hostname = toASCII(self.hostname);
      }

      p = self.port ? ':' + self.port : '';
      var h = self.hostname || '';
      self.host = h + p;
      self.href += self.host;

      // strip [ and ] from the hostname
      // the host field still retains them, though
      if (ipv6Hostname) {
        self.hostname = self.hostname.substr(1, self.hostname.length - 2);
        if (rest[0] !== '/') {
          rest = '/' + rest;
        }
      }
    }

    // now rest is set to the post-host stuff.
    // chop off any delim chars.
    if (!unsafeProtocol[lowerProto]) {

      // First, make 100% sure that any "autoEscape" chars get
      // escaped, even if encodeURIComponent doesn't think they
      // need to be.
      for (i = 0, l = autoEscape.length; i < l; i++) {
        var ae = autoEscape[i];
        if (rest.indexOf(ae) === -1)
          continue;
        var esc = encodeURIComponent(ae);
        if (esc === ae) {
          esc = escape(ae);
        }
        rest = rest.split(ae).join(esc);
      }
    }


    // chop off from the tail first.
    var hash = rest.indexOf('#');
    if (hash !== -1) {
      // got a fragment string.
      self.hash = rest.substr(hash);
      rest = rest.slice(0, hash);
    }
    var qm = rest.indexOf('?');
    if (qm !== -1) {
      self.search = rest.substr(qm);
      self.query = rest.substr(qm + 1);
      if (parseQueryString) {
        self.query = parse$1(self.query);
      }
      rest = rest.slice(0, qm);
    } else if (parseQueryString) {
      // no query string, but parseQueryString still requested
      self.search = '';
      self.query = {};
    }
    if (rest) self.pathname = rest;
    if (slashedProtocol[lowerProto] &&
      self.hostname && !self.pathname) {
      self.pathname = '/';
    }

    //to support http.request
    if (self.pathname || self.search) {
      p = self.pathname || '';
      var s = self.search || '';
      self.path = p + s;
    }

    // finally, reconstruct the href based on what has been validated.
    self.href = format(self);
    return self;
  }

  // format a parsed object into a url string
  function urlFormat(obj) {
    // ensure it's an object, and not a string url.
    // If it's an obj, this is a no-op.
    // this way, you can call url_format() on strings
    // to clean up potentially wonky urls.
    if (isString(obj)) obj = parse({}, obj);
    return format(obj);
  }

  function format(self) {
    var auth = self.auth || '';
    if (auth) {
      auth = encodeURIComponent(auth);
      auth = auth.replace(/%3A/i, ':');
      auth += '@';
    }

    var protocol = self.protocol || '',
      pathname = self.pathname || '',
      hash = self.hash || '',
      host = false,
      query = '';

    if (self.host) {
      host = auth + self.host;
    } else if (self.hostname) {
      host = auth + (self.hostname.indexOf(':') === -1 ?
        self.hostname :
        '[' + this.hostname + ']');
      if (self.port) {
        host += ':' + self.port;
      }
    }

    if (self.query &&
      isObject$1(self.query) &&
      Object.keys(self.query).length) {
      query = stringify(self.query);
    }

    var search = self.search || (query && ('?' + query)) || '';

    if (protocol && protocol.substr(-1) !== ':') protocol += ':';

    // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
    // unless they had them to begin with.
    if (self.slashes ||
      (!protocol || slashedProtocol[protocol]) && host !== false) {
      host = '//' + (host || '');
      if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
    } else if (!host) {
      host = '';
    }

    if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
    if (search && search.charAt(0) !== '?') search = '?' + search;

    pathname = pathname.replace(/[?#]/g, function(match) {
      return encodeURIComponent(match);
    });
    search = search.replace('#', '%23');

    return protocol + host + pathname + search + hash;
  }

  Url.prototype.format = function() {
    return format(this);
  };

  Url.prototype.resolve = function(relative) {
    return this.resolveObject(urlParse(relative, false, true)).format();
  };

  Url.prototype.resolveObject = function(relative) {
    if (isString(relative)) {
      var rel = new Url();
      rel.parse(relative, false, true);
      relative = rel;
    }

    var result = new Url();
    var tkeys = Object.keys(this);
    for (var tk = 0; tk < tkeys.length; tk++) {
      var tkey = tkeys[tk];
      result[tkey] = this[tkey];
    }

    // hash is always overridden, no matter what.
    // even href="" will remove it.
    result.hash = relative.hash;

    // if the relative url is empty, then there's nothing left to do here.
    if (relative.href === '') {
      result.href = result.format();
      return result;
    }

    // hrefs like //foo/bar always cut to the protocol.
    if (relative.slashes && !relative.protocol) {
      // take everything except the protocol from relative
      var rkeys = Object.keys(relative);
      for (var rk = 0; rk < rkeys.length; rk++) {
        var rkey = rkeys[rk];
        if (rkey !== 'protocol')
          result[rkey] = relative[rkey];
      }

      //urlParse appends trailing / to urls like http://www.example.com
      if (slashedProtocol[result.protocol] &&
        result.hostname && !result.pathname) {
        result.path = result.pathname = '/';
      }

      result.href = result.format();
      return result;
    }
    var relPath;
    if (relative.protocol && relative.protocol !== result.protocol) {
      // if it's a known url protocol, then changing
      // the protocol does weird things
      // first, if it's not file:, then we MUST have a host,
      // and if there was a path
      // to begin with, then we MUST have a path.
      // if it is file:, then the host is dropped,
      // because that's known to be hostless.
      // anything else is assumed to be absolute.
      if (!slashedProtocol[relative.protocol]) {
        var keys = Object.keys(relative);
        for (var v = 0; v < keys.length; v++) {
          var k = keys[v];
          result[k] = relative[k];
        }
        result.href = result.format();
        return result;
      }

      result.protocol = relative.protocol;
      if (!relative.host && !hostlessProtocol[relative.protocol]) {
        relPath = (relative.pathname || '').split('/');
        while (relPath.length && !(relative.host = relPath.shift()));
        if (!relative.host) relative.host = '';
        if (!relative.hostname) relative.hostname = '';
        if (relPath[0] !== '') relPath.unshift('');
        if (relPath.length < 2) relPath.unshift('');
        result.pathname = relPath.join('/');
      } else {
        result.pathname = relative.pathname;
      }
      result.search = relative.search;
      result.query = relative.query;
      result.host = relative.host || '';
      result.auth = relative.auth;
      result.hostname = relative.hostname || relative.host;
      result.port = relative.port;
      // to support http.request
      if (result.pathname || result.search) {
        var p = result.pathname || '';
        var s = result.search || '';
        result.path = p + s;
      }
      result.slashes = result.slashes || relative.slashes;
      result.href = result.format();
      return result;
    }

    var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
      isRelAbs = (
        relative.host ||
        relative.pathname && relative.pathname.charAt(0) === '/'
      ),
      mustEndAbs = (isRelAbs || isSourceAbs ||
        (result.host && relative.pathname)),
      removeAllDots = mustEndAbs,
      srcPath = result.pathname && result.pathname.split('/') || [],
      psychotic = result.protocol && !slashedProtocol[result.protocol];
    relPath = relative.pathname && relative.pathname.split('/') || [];
    // if the url is a non-slashed url, then relative
    // links like ../.. should be able
    // to crawl up to the hostname, as well.  This is strange.
    // result.protocol has already been set by now.
    // Later on, put the first path part into the host field.
    if (psychotic) {
      result.hostname = '';
      result.port = null;
      if (result.host) {
        if (srcPath[0] === '') srcPath[0] = result.host;
        else srcPath.unshift(result.host);
      }
      result.host = '';
      if (relative.protocol) {
        relative.hostname = null;
        relative.port = null;
        if (relative.host) {
          if (relPath[0] === '') relPath[0] = relative.host;
          else relPath.unshift(relative.host);
        }
        relative.host = null;
      }
      mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
    }
    var authInHost;
    if (isRelAbs) {
      // it's absolute.
      result.host = (relative.host || relative.host === '') ?
        relative.host : result.host;
      result.hostname = (relative.hostname || relative.hostname === '') ?
        relative.hostname : result.hostname;
      result.search = relative.search;
      result.query = relative.query;
      srcPath = relPath;
      // fall through to the dot-handling below.
    } else if (relPath.length) {
      // it's relative
      // throw away the existing file, and take the new path instead.
      if (!srcPath) srcPath = [];
      srcPath.pop();
      srcPath = srcPath.concat(relPath);
      result.search = relative.search;
      result.query = relative.query;
    } else if (!isNullOrUndefined(relative.search)) {
      // just pull out the search.
      // like href='?foo'.
      // Put this after the other two cases because it simplifies the booleans
      if (psychotic) {
        result.hostname = result.host = srcPath.shift();
        //occationaly the auth can get stuck only in host
        //this especially happens in cases like
        //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
        authInHost = result.host && result.host.indexOf('@') > 0 ?
          result.host.split('@') : false;
        if (authInHost) {
          result.auth = authInHost.shift();
          result.host = result.hostname = authInHost.shift();
        }
      }
      result.search = relative.search;
      result.query = relative.query;
      //to support http.request
      if (!isNull(result.pathname) || !isNull(result.search)) {
        result.path = (result.pathname ? result.pathname : '') +
          (result.search ? result.search : '');
      }
      result.href = result.format();
      return result;
    }

    if (!srcPath.length) {
      // no path at all.  easy.
      // we've already handled the other stuff above.
      result.pathname = null;
      //to support http.request
      if (result.search) {
        result.path = '/' + result.search;
      } else {
        result.path = null;
      }
      result.href = result.format();
      return result;
    }

    // if a url ENDs in . or .., then it must get a trailing slash.
    // however, if it ends in anything else non-slashy,
    // then it must NOT get a trailing slash.
    var last = srcPath.slice(-1)[0];
    var hasTrailingSlash = (
      (result.host || relative.host || srcPath.length > 1) &&
      (last === '.' || last === '..') || last === '');

    // strip single dots, resolve double dots to parent dir
    // if the path tries to go above the root, `up` ends up > 0
    var up = 0;
    for (var i = srcPath.length; i >= 0; i--) {
      last = srcPath[i];
      if (last === '.') {
        srcPath.splice(i, 1);
      } else if (last === '..') {
        srcPath.splice(i, 1);
        up++;
      } else if (up) {
        srcPath.splice(i, 1);
        up--;
      }
    }

    // if the path is allowed to go above the root, restore leading ..s
    if (!mustEndAbs && !removeAllDots) {
      for (; up--; up) {
        srcPath.unshift('..');
      }
    }

    if (mustEndAbs && srcPath[0] !== '' &&
      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
      srcPath.unshift('');
    }

    if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
      srcPath.push('');
    }

    var isAbsolute = srcPath[0] === '' ||
      (srcPath[0] && srcPath[0].charAt(0) === '/');

    // put the host back
    if (psychotic) {
      result.hostname = result.host = isAbsolute ? '' :
        srcPath.length ? srcPath.shift() : '';
      //occationaly the auth can get stuck only in host
      //this especially happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
      authInHost = result.host && result.host.indexOf('@') > 0 ?
        result.host.split('@') : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }

    mustEndAbs = mustEndAbs || (result.host && srcPath.length);

    if (mustEndAbs && !isAbsolute) {
      srcPath.unshift('');
    }

    if (!srcPath.length) {
      result.pathname = null;
      result.path = null;
    } else {
      result.pathname = srcPath.join('/');
    }

    //to support request.http
    if (!isNull(result.pathname) || !isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : '') +
        (result.search ? result.search : '');
    }
    result.auth = relative.auth || result.auth;
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  };

  Url.prototype.parseHost = function() {
    return parseHost(this);
  };

  function parseHost(self) {
    var host = self.host;
    var port = portPattern.exec(host);
    if (port) {
      port = port[0];
      if (port !== ':') {
        self.port = port.substr(1);
      }
      host = host.substr(0, host.length - port.length);
    }
    if (host) self.hostname = host;
  }

  var browser$1 = createCommonjsModule(function (module, exports) {

  // ref: https://github.com/tc39/proposal-global
  var getGlobal = function () {
  	// the only reliable means to get the global object is
  	// `Function('return this')()`
  	// However, this causes CSP violations in Chrome apps.
  	if (typeof self !== 'undefined') { return self; }
  	if (typeof window !== 'undefined') { return window; }
  	if (typeof global !== 'undefined') { return global; }
  	throw new Error('unable to locate global object');
  };

  var global = getGlobal();

  module.exports = exports = global.fetch;

  // Needed for TypeScript and Webpack.
  if (global.fetch) {
  	exports.default = global.fetch.bind(global);
  }

  exports.Headers = global.Headers;
  exports.Request = global.Request;
  exports.Response = global.Response;
  });

  /**
   * A `StructFailure` represents a single specific failure in validation.
   */

  /**
   * `StructError` objects are thrown (or returned) when validation fails.
   *
   * Validation logic is design to exit early for maximum performance. The error
   * represents the first error encountered during validation. For more detail,
   * the `error.failures` property is a generator function that can be run to
   * continue validation and receive all the failures in the data.
   */
  class StructError extends TypeError {
    constructor(failure, failures) {
      let cached;
      const {
        message,
        ...rest
      } = failure;
      const {
        path
      } = failure;
      const msg = path.length === 0 ? message : "At path: " + path.join('.') + " -- " + message;
      super(msg);
      Object.assign(this, rest);
      this.name = this.constructor.name;

      this.failures = () => {
        var _cached;

        return (_cached = cached) != null ? _cached : cached = [failure, ...failures()];
      };
    }

  }

  /**
   * Check if a value is an iterator.
   */
  function isIterable(x) {
    return isObject(x) && typeof x[Symbol.iterator] === 'function';
  }
  /**
   * Check if a value is a plain object.
   */


  function isObject(x) {
    return typeof x === 'object' && x != null;
  }
  /**
   * Return a value as a printable string.
   */

  function print(value) {
    return typeof value === 'string' ? JSON.stringify(value) : "" + value;
  }
  /**
   * Shifts (removes and returns) the first value from the `input` iterator.
   * Like `Array.prototype.shift()` but for an `Iterator`.
   */

  function shiftIterator(input) {
    const {
      done,
      value
    } = input.next();
    return done ? undefined : value;
  }
  /**
   * Convert a single validation result to a failure.
   */

  function toFailure(result, context, struct, value) {
    if (result === true) {
      return;
    } else if (result === false) {
      result = {};
    } else if (typeof result === 'string') {
      result = {
        message: result
      };
    }

    const {
      path,
      branch
    } = context;
    const {
      type
    } = struct;
    const {
      refinement,
      message = "Expected a value of type `" + type + "`" + (refinement ? " with refinement `" + refinement + "`" : '') + ", but received: `" + print(value) + "`"
    } = result;
    return {
      value,
      type,
      refinement,
      key: path[path.length - 1],
      path,
      branch,
      ...result,
      message
    };
  }
  /**
   * Convert a validation result to an iterable of failures.
   */

  function* toFailures(result, context, struct, value) {
    if (!isIterable(result)) {
      result = [result];
    }

    for (const r of result) {
      const failure = toFailure(r, context, struct, value);

      if (failure) {
        yield failure;
      }
    }
  }
  /**
   * Check a value against a struct, traversing deeply into nested values, and
   * returning an iterator of failures or success.
   */

  function* run(value, struct, options = {}) {
    const {
      path = [],
      branch = [value],
      coerce = false,
      mask = false
    } = options;
    const ctx = {
      path,
      branch
    };

    if (coerce) {
      value = struct.coercer(value, ctx);

      if (mask && struct.type !== 'type' && isObject(struct.schema) && isObject(value) && !Array.isArray(value)) {
        for (const key in value) {
          if (struct.schema[key] === undefined) {
            delete value[key];
          }
        }
      }
    }

    let valid = true;

    for (const failure of struct.validator(value, ctx)) {
      valid = false;
      yield [failure, undefined];
    }

    for (let [k, v, s] of struct.entries(value, ctx)) {
      const ts = run(v, s, {
        path: k === undefined ? path : [...path, k],
        branch: k === undefined ? branch : [...branch, v],
        coerce,
        mask
      });

      for (const t of ts) {
        if (t[0]) {
          valid = false;
          yield [t[0], undefined];
        } else if (coerce) {
          v = t[1];

          if (k === undefined) {
            value = v;
          } else if (value instanceof Map) {
            value.set(k, v);
          } else if (value instanceof Set) {
            value.add(v);
          } else if (isObject(value)) {
            value[k] = v;
          }
        }
      }
    }

    if (valid) {
      for (const failure of struct.refiner(value, ctx)) {
        valid = false;
        yield [failure, undefined];
      }
    }

    if (valid) {
      yield [undefined, value];
    }
  }

  /**
   * `Struct` objects encapsulate the validation logic for a specific type of
   * values. Once constructed, you use the `assert`, `is` or `validate` helpers to
   * validate unknown input data against the struct.
   */

  class Struct {
    constructor(props) {
      const {
        type,
        schema,
        validator,
        refiner,
        coercer = value => value,
        entries = function* () {}
      } = props;
      this.type = type;
      this.schema = schema;
      this.entries = entries;
      this.coercer = coercer;

      if (validator) {
        this.validator = (value, context) => {
          const result = validator(value, context);
          return toFailures(result, context, this, value);
        };
      } else {
        this.validator = () => [];
      }

      if (refiner) {
        this.refiner = (value, context) => {
          const result = refiner(value, context);
          return toFailures(result, context, this, value);
        };
      } else {
        this.refiner = () => [];
      }
    }
    /**
     * Assert that a value passes the struct's validation, throwing if it doesn't.
     */


    assert(value) {
      return assert$b(value, this);
    }
    /**
     * Create a value with the struct's coercion logic, then validate it.
     */


    create(value) {
      return create(value, this);
    }
    /**
     * Check if a value passes the struct's validation.
     */


    is(value) {
      return is(value, this);
    }
    /**
     * Mask a value, coercing and validating it, but returning only the subset of
     * properties defined by the struct's schema.
     */


    mask(value) {
      return mask(value, this);
    }
    /**
     * Validate a value with the struct's validation logic, returning a tuple
     * representing the result.
     *
     * You may optionally pass `true` for the `withCoercion` argument to coerce
     * the value before attempting to validate it. If you do, the result will
     * contain the coerced result when successful.
     */


    validate(value, options = {}) {
      return validate(value, this, options);
    }

  }
  /**
   * Assert that a value passes a struct, throwing if it doesn't.
   */

  function assert$b(value, struct) {
    const result = validate(value, struct);

    if (result[0]) {
      throw result[0];
    }
  }
  /**
   * Create a value with the coercion logic of struct and validate it.
   */

  function create(value, struct) {
    const result = validate(value, struct, {
      coerce: true
    });

    if (result[0]) {
      throw result[0];
    } else {
      return result[1];
    }
  }
  /**
   * Mask a value, returning only the subset of properties defined by a struct.
   */

  function mask(value, struct) {
    const result = validate(value, struct, {
      coerce: true,
      mask: true
    });

    if (result[0]) {
      throw result[0];
    } else {
      return result[1];
    }
  }
  /**
   * Check if a value passes a struct.
   */

  function is(value, struct) {
    const result = validate(value, struct);
    return !result[0];
  }
  /**
   * Validate a value against a struct, returning an error if invalid, or the
   * value (with potential coercion) if valid.
   */

  function validate(value, struct, options = {}) {
    const tuples = run(value, struct, options);
    const tuple = shiftIterator(tuples);

    if (tuple[0]) {
      const error = new StructError(tuple[0], function* () {
        for (const t of tuples) {
          if (t[0]) {
            yield t[0];
          }
        }
      });
      return [error, undefined];
    } else {
      const v = tuple[1];
      return [undefined, v];
    }
  }
  /**
   * Define a new struct type with a custom validation function.
   */

  function define(name, validator) {
    return new Struct({
      type: name,
      schema: null,
      validator
    });
  }

  /**
   * Ensure that any value passes validation.
   */

  function any() {
    return define('any', () => true);
  }
  function array(Element) {
    return new Struct({
      type: 'array',
      schema: Element,

      *entries(value) {
        if (Element && Array.isArray(value)) {
          for (const [i, v] of value.entries()) {
            yield [i, v, Element];
          }
        }
      },

      coercer(value) {
        return Array.isArray(value) ? value.slice() : value;
      },

      validator(value) {
        return Array.isArray(value) || "Expected an array value, but received: " + print(value);
      }

    });
  }
  /**
   * Ensure that a value is a boolean.
   */

  function boolean() {
    return define('boolean', value => {
      return typeof value === 'boolean';
    });
  }
  /**
   * Ensure that a value is an instance of a specific class.
   */

  function instance(Class) {
    return define('instance', value => {
      return value instanceof Class || "Expected a `" + Class.name + "` instance, but received: " + print(value);
    });
  }
  function literal(constant) {
    const description = print(constant);
    const t = typeof constant;
    return new Struct({
      type: 'literal',
      schema: t === 'string' || t === 'number' || t === 'boolean' ? constant : null,

      validator(value) {
        return value === constant || "Expected the literal `" + description + "`, but received: " + print(value);
      }

    });
  }
  /**
   * Ensure that no value ever passes validation.
   */

  function never() {
    return define('never', () => false);
  }
  /**
   * Augment an existing struct to allow `null` values.
   */

  function nullable(struct) {
    return new Struct({ ...struct,
      validator: (value, ctx) => value === null || struct.validator(value, ctx),
      refiner: (value, ctx) => value === null || struct.refiner(value, ctx)
    });
  }
  /**
   * Ensure that a value is a number.
   */

  function number() {
    return define('number', value => {
      return typeof value === 'number' && !isNaN(value) || "Expected a number, but received: " + print(value);
    });
  }
  /**
   * Augment a struct to allow `undefined` values.
   */

  function optional(struct) {
    return new Struct({ ...struct,
      validator: (value, ctx) => value === undefined || struct.validator(value, ctx),
      refiner: (value, ctx) => value === undefined || struct.refiner(value, ctx)
    });
  }
  /**
   * Ensure that a value is an object with keys and values of specific types, but
   * without ensuring any specific shape of properties.
   *
   * Like TypeScript's `Record` utility.
   */

  function record(Key, Value) {
    return new Struct({
      type: 'record',
      schema: null,

      *entries(value) {
        if (isObject(value)) {
          for (const k in value) {
            const v = value[k];
            yield [k, k, Key];
            yield [k, v, Value];
          }
        }
      },

      validator(value) {
        return isObject(value) || "Expected an object, but received: " + print(value);
      }

    });
  }
  /**
   * Ensure that a value is a string.
   */

  function string() {
    return define('string', value => {
      return typeof value === 'string' || "Expected a string, but received: " + print(value);
    });
  }
  function tuple(Elements) {
    const Never = never();
    return new Struct({
      type: 'tuple',
      schema: null,

      *entries(value) {
        if (Array.isArray(value)) {
          const length = Math.max(Elements.length, value.length);

          for (let i = 0; i < length; i++) {
            yield [i, value[i], Elements[i] || Never];
          }
        }
      },

      validator(value) {
        return Array.isArray(value) || "Expected an array, but received: " + print(value);
      }

    });
  }
  /**
   * Ensure that a value has a set of known properties of specific types.
   *
   * Note: Unrecognized properties are allowed and untouched. This is similar to
   * how TypeScript's structural typing works.
   */

  function type(schema) {
    const keys = Object.keys(schema);
    return new Struct({
      type: 'type',
      schema,

      *entries(value) {
        if (isObject(value)) {
          for (const k of keys) {
            yield [k, value[k], schema[k]];
          }
        }
      },

      validator(value) {
        return isObject(value) || "Expected an object, but received: " + print(value);
      }

    });
  }
  function union(Structs) {
    const description = Structs.map(s => s.type).join(' | ');
    return new Struct({
      type: 'union',
      schema: null,

      validator(value, ctx) {
        const failures = [];

        for (const S of Structs) {
          const [...tuples] = run(value, S, ctx);
          const [first] = tuples;

          if (!first[0]) {
            return [];
          } else {
            for (const [failure] of tuples) {
              if (failure) {
                failures.push(failure);
              }
            }
          }
        }

        return ["Expected the value to satisfy a union of `" + description + "`, but received: " + print(value), ...failures];
      }

    });
  }
  /**
   * Ensure that any value passes validation, without widening its type to `any`.
   */

  function unknown() {
    return define('unknown', () => true);
  }

  /**
   * Augment a `Struct` to add an additional coercion step to its input.
   *
   * This allows you to transform input data before validating it, to increase the
   * likelihood that it passes validation—for example for default values, parsing
   * different formats, etc.
   *
   * Note: You must use `create(value, Struct)` on the value to have the coercion
   * take effect! Using simply `assert()` or `is()` will not use coercion.
   */

  function coerce(struct, condition, coercer) {
    return new Struct({ ...struct,
      coercer: (value, ctx) => {
        return is(value, condition) ? struct.coercer(coercer(value, ctx), ctx) : struct.coercer(value, ctx);
      }
    });
  }

  var interopRequireDefault = createCommonjsModule(function (module) {
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      "default": obj
    };
  }

  module.exports = _interopRequireDefault;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
  });

  var classCallCheck = createCommonjsModule(function (module) {
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  module.exports = _classCallCheck;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
  });

  var setPrototypeOf = createCommonjsModule(function (module) {
  function _setPrototypeOf(o, p) {
    module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    module.exports["default"] = module.exports, module.exports.__esModule = true;
    return _setPrototypeOf(o, p);
  }

  module.exports = _setPrototypeOf;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
  });

  var inherits = createCommonjsModule(function (module) {
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) setPrototypeOf(subClass, superClass);
  }

  module.exports = _inherits;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
  });

  var _typeof_1 = createCommonjsModule(function (module) {
  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      module.exports = _typeof = function _typeof(obj) {
        return typeof obj;
      };

      module.exports["default"] = module.exports, module.exports.__esModule = true;
    } else {
      module.exports = _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };

      module.exports["default"] = module.exports, module.exports.__esModule = true;
    }

    return _typeof(obj);
  }

  module.exports = _typeof;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
  });

  var assertThisInitialized = createCommonjsModule(function (module) {
  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  module.exports = _assertThisInitialized;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
  });

  var possibleConstructorReturn = createCommonjsModule(function (module) {
  var _typeof = _typeof_1["default"];



  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
      return call;
    }

    return assertThisInitialized(self);
  }

  module.exports = _possibleConstructorReturn;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
  });

  var getPrototypeOf = createCommonjsModule(function (module) {
  function _getPrototypeOf(o) {
    module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    module.exports["default"] = module.exports, module.exports.__esModule = true;
    return _getPrototypeOf(o);
  }

  module.exports = _getPrototypeOf;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
  });

  var createClass = createCommonjsModule(function (module) {
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  module.exports = _createClass;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
  });

  var eventemitter3 = createCommonjsModule(function (module) {

  var has = Object.prototype.hasOwnProperty
    , prefix = '~';

  /**
   * Constructor to create a storage for our `EE` objects.
   * An `Events` instance is a plain object whose properties are event names.
   *
   * @constructor
   * @private
   */
  function Events() {}

  //
  // We try to not inherit from `Object.prototype`. In some engines creating an
  // instance in this way is faster than calling `Object.create(null)` directly.
  // If `Object.create(null)` is not supported we prefix the event names with a
  // character to make sure that the built-in object properties are not
  // overridden or used as an attack vector.
  //
  if (Object.create) {
    Events.prototype = Object.create(null);

    //
    // This hack is needed because the `__proto__` property is still inherited in
    // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
    //
    if (!new Events().__proto__) prefix = false;
  }

  /**
   * Representation of a single event listener.
   *
   * @param {Function} fn The listener function.
   * @param {*} context The context to invoke the listener with.
   * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
   * @constructor
   * @private
   */
  function EE(fn, context, once) {
    this.fn = fn;
    this.context = context;
    this.once = once || false;
  }

  /**
   * Add a listener for a given event.
   *
   * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
   * @param {(String|Symbol)} event The event name.
   * @param {Function} fn The listener function.
   * @param {*} context The context to invoke the listener with.
   * @param {Boolean} once Specify if the listener is a one-time listener.
   * @returns {EventEmitter}
   * @private
   */
  function addListener(emitter, event, fn, context, once) {
    if (typeof fn !== 'function') {
      throw new TypeError('The listener must be a function');
    }

    var listener = new EE(fn, context || emitter, once)
      , evt = prefix ? prefix + event : event;

    if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
    else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
    else emitter._events[evt] = [emitter._events[evt], listener];

    return emitter;
  }

  /**
   * Clear event by name.
   *
   * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
   * @param {(String|Symbol)} evt The Event name.
   * @private
   */
  function clearEvent(emitter, evt) {
    if (--emitter._eventsCount === 0) emitter._events = new Events();
    else delete emitter._events[evt];
  }

  /**
   * Minimal `EventEmitter` interface that is molded against the Node.js
   * `EventEmitter` interface.
   *
   * @constructor
   * @public
   */
  function EventEmitter() {
    this._events = new Events();
    this._eventsCount = 0;
  }

  /**
   * Return an array listing the events for which the emitter has registered
   * listeners.
   *
   * @returns {Array}
   * @public
   */
  EventEmitter.prototype.eventNames = function eventNames() {
    var names = []
      , events
      , name;

    if (this._eventsCount === 0) return names;

    for (name in (events = this._events)) {
      if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
    }

    if (Object.getOwnPropertySymbols) {
      return names.concat(Object.getOwnPropertySymbols(events));
    }

    return names;
  };

  /**
   * Return the listeners registered for a given event.
   *
   * @param {(String|Symbol)} event The event name.
   * @returns {Array} The registered listeners.
   * @public
   */
  EventEmitter.prototype.listeners = function listeners(event) {
    var evt = prefix ? prefix + event : event
      , handlers = this._events[evt];

    if (!handlers) return [];
    if (handlers.fn) return [handlers.fn];

    for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
      ee[i] = handlers[i].fn;
    }

    return ee;
  };

  /**
   * Return the number of listeners listening to a given event.
   *
   * @param {(String|Symbol)} event The event name.
   * @returns {Number} The number of listeners.
   * @public
   */
  EventEmitter.prototype.listenerCount = function listenerCount(event) {
    var evt = prefix ? prefix + event : event
      , listeners = this._events[evt];

    if (!listeners) return 0;
    if (listeners.fn) return 1;
    return listeners.length;
  };

  /**
   * Calls each of the listeners registered for a given event.
   *
   * @param {(String|Symbol)} event The event name.
   * @returns {Boolean} `true` if the event had listeners, else `false`.
   * @public
   */
  EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
    var evt = prefix ? prefix + event : event;

    if (!this._events[evt]) return false;

    var listeners = this._events[evt]
      , len = arguments.length
      , args
      , i;

    if (listeners.fn) {
      if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

      switch (len) {
        case 1: return listeners.fn.call(listeners.context), true;
        case 2: return listeners.fn.call(listeners.context, a1), true;
        case 3: return listeners.fn.call(listeners.context, a1, a2), true;
        case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
        case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
        case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
      }

      for (i = 1, args = new Array(len -1); i < len; i++) {
        args[i - 1] = arguments[i];
      }

      listeners.fn.apply(listeners.context, args);
    } else {
      var length = listeners.length
        , j;

      for (i = 0; i < length; i++) {
        if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

        switch (len) {
          case 1: listeners[i].fn.call(listeners[i].context); break;
          case 2: listeners[i].fn.call(listeners[i].context, a1); break;
          case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
          case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
          default:
            if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
              args[j - 1] = arguments[j];
            }

            listeners[i].fn.apply(listeners[i].context, args);
        }
      }
    }

    return true;
  };

  /**
   * Add a listener for a given event.
   *
   * @param {(String|Symbol)} event The event name.
   * @param {Function} fn The listener function.
   * @param {*} [context=this] The context to invoke the listener with.
   * @returns {EventEmitter} `this`.
   * @public
   */
  EventEmitter.prototype.on = function on(event, fn, context) {
    return addListener(this, event, fn, context, false);
  };

  /**
   * Add a one-time listener for a given event.
   *
   * @param {(String|Symbol)} event The event name.
   * @param {Function} fn The listener function.
   * @param {*} [context=this] The context to invoke the listener with.
   * @returns {EventEmitter} `this`.
   * @public
   */
  EventEmitter.prototype.once = function once(event, fn, context) {
    return addListener(this, event, fn, context, true);
  };

  /**
   * Remove the listeners of a given event.
   *
   * @param {(String|Symbol)} event The event name.
   * @param {Function} fn Only remove the listeners that match this function.
   * @param {*} context Only remove the listeners that have this context.
   * @param {Boolean} once Only remove one-time listeners.
   * @returns {EventEmitter} `this`.
   * @public
   */
  EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
    var evt = prefix ? prefix + event : event;

    if (!this._events[evt]) return this;
    if (!fn) {
      clearEvent(this, evt);
      return this;
    }

    var listeners = this._events[evt];

    if (listeners.fn) {
      if (
        listeners.fn === fn &&
        (!once || listeners.once) &&
        (!context || listeners.context === context)
      ) {
        clearEvent(this, evt);
      }
    } else {
      for (var i = 0, events = [], length = listeners.length; i < length; i++) {
        if (
          listeners[i].fn !== fn ||
          (once && !listeners[i].once) ||
          (context && listeners[i].context !== context)
        ) {
          events.push(listeners[i]);
        }
      }

      //
      // Reset the array, or remove it completely if we have no more listeners.
      //
      if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
      else clearEvent(this, evt);
    }

    return this;
  };

  /**
   * Remove all listeners, or those of the specified event.
   *
   * @param {(String|Symbol)} [event] The event name.
   * @returns {EventEmitter} `this`.
   * @public
   */
  EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
    var evt;

    if (event) {
      evt = prefix ? prefix + event : event;
      if (this._events[evt]) clearEvent(this, evt);
    } else {
      this._events = new Events();
      this._eventsCount = 0;
    }

    return this;
  };

  //
  // Alias methods names because people roll like that.
  //
  EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
  EventEmitter.prototype.addListener = EventEmitter.prototype.on;

  //
  // Expose the prefix.
  //
  EventEmitter.prefixed = prefix;

  //
  // Allow `EventEmitter` to be imported as module namespace.
  //
  EventEmitter.EventEmitter = EventEmitter;

  //
  // Expose the module.
  //
  {
    module.exports = EventEmitter;
  }
  });

  /**
   * WebSocket implements a browser-side WebSocket specification.
   * @module Client
   */

  var websocket_browser = createCommonjsModule(function (module, exports) {



  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports["default"] = _default;

  var _classCallCheck2 = interopRequireDefault(classCallCheck);

  var _createClass2 = interopRequireDefault(createClass);

  var _inherits2 = interopRequireDefault(inherits);

  var _possibleConstructorReturn2 = interopRequireDefault(possibleConstructorReturn);

  var _getPrototypeOf2 = interopRequireDefault(getPrototypeOf);



  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  var WebSocketBrowserImpl = /*#__PURE__*/function (_EventEmitter) {
    (0, _inherits2["default"])(WebSocketBrowserImpl, _EventEmitter);

    var _super = _createSuper(WebSocketBrowserImpl);

    /** Instantiate a WebSocket class
     * @constructor
     * @param {String} address - url to a websocket server
     * @param {(Object)} options - websocket options
     * @param {(String|Array)} protocols - a list of protocols
     * @return {WebSocketBrowserImpl} - returns a WebSocket instance
     */
    function WebSocketBrowserImpl(address, options, protocols) {
      var _this;

      (0, _classCallCheck2["default"])(this, WebSocketBrowserImpl);
      _this = _super.call(this);
      _this.socket = new WebSocket(address, protocols);

      _this.socket.onopen = function () {
        return _this.emit("open");
      };

      _this.socket.onmessage = function (event) {
        return _this.emit("message", event.data);
      };

      _this.socket.onerror = function (error) {
        return _this.emit("error", error);
      };

      _this.socket.onclose = function (event) {
        _this.emit("close", event.code, event.reason);
      };

      return _this;
    }
    /**
     * Sends data through a websocket connection
     * @method
     * @param {(String|Object)} data - data to be sent via websocket
     * @param {Object} optionsOrCallback - ws options
     * @param {Function} callback - a callback called once the data is sent
     * @return {Undefined}
     */


    (0, _createClass2["default"])(WebSocketBrowserImpl, [{
      key: "send",
      value: function send(data, optionsOrCallback, callback) {
        var cb = callback || optionsOrCallback;

        try {
          this.socket.send(data);
          cb();
        } catch (error) {
          cb(error);
        }
      }
      /**
       * Closes an underlying socket
       * @method
       * @param {Number} code - status code explaining why the connection is being closed
       * @param {String} reason - a description why the connection is closing
       * @return {Undefined}
       * @throws {Error}
       */

    }, {
      key: "close",
      value: function close(code, reason) {
        this.socket.close(code, reason);
      }
    }, {
      key: "addEventListener",
      value: function addEventListener(type, listener, options) {
        this.socket.addEventListener(type, listener, options);
      }
    }]);
    return WebSocketBrowserImpl;
  }(eventemitter3.EventEmitter);
  /**
   * factory method for common WebSocket instance
   * @method
   * @param {String} address - url to a websocket server
   * @param {(Object)} options - websocket options
   * @return {Undefined}
   */


  function _default(address, options) {
    return new WebSocketBrowserImpl(address, options);
  }
  });

  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  var runtime_1 = createCommonjsModule(function (module) {
  var runtime = (function (exports) {

    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var undefined$1; // More compressible than void 0.
    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

    function define(obj, key, value) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
      return obj[key];
    }
    try {
      // IE 8 has a broken Object.defineProperty that only works on DOM objects.
      define({}, "");
    } catch (err) {
      define = function(obj, key, value) {
        return obj[key] = value;
      };
    }

    function wrap(innerFn, outerFn, self, tryLocsList) {
      // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
      var generator = Object.create(protoGenerator.prototype);
      var context = new Context(tryLocsList || []);

      // The ._invoke method unifies the implementations of the .next,
      // .throw, and .return methods.
      generator._invoke = makeInvokeMethod(innerFn, self, context);

      return generator;
    }
    exports.wrap = wrap;

    // Try/catch helper to minimize deoptimizations. Returns a completion
    // record like context.tryEntries[i].completion. This interface could
    // have been (and was previously) designed to take a closure to be
    // invoked without arguments, but in all the cases we care about we
    // already have an existing method we want to call, so there's no need
    // to create a new function object. We can even get away with assuming
    // the method takes exactly one argument, since that happens to be true
    // in every case, so we don't have to touch the arguments object. The
    // only additional allocation required is the completion record, which
    // has a stable shape and so hopefully should be cheap to allocate.
    function tryCatch(fn, obj, arg) {
      try {
        return { type: "normal", arg: fn.call(obj, arg) };
      } catch (err) {
        return { type: "throw", arg: err };
      }
    }

    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed";

    // Returning this object from the innerFn has the same effect as
    // breaking out of the dispatch switch statement.
    var ContinueSentinel = {};

    // Dummy constructor functions that we use as the .constructor and
    // .constructor.prototype properties for functions that return Generator
    // objects. For full spec compliance, you may wish to configure your
    // minifier not to mangle the names of these two functions.
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}

    // This is a polyfill for %IteratorPrototype% for environments that
    // don't natively support it.
    var IteratorPrototype = {};
    IteratorPrototype[iteratorSymbol] = function () {
      return this;
    };

    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    if (NativeIteratorPrototype &&
        NativeIteratorPrototype !== Op &&
        hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
      // This environment has a native %IteratorPrototype%; use it instead
      // of the polyfill.
      IteratorPrototype = NativeIteratorPrototype;
    }

    var Gp = GeneratorFunctionPrototype.prototype =
      Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
    GeneratorFunctionPrototype.constructor = GeneratorFunction;
    GeneratorFunction.displayName = define(
      GeneratorFunctionPrototype,
      toStringTagSymbol,
      "GeneratorFunction"
    );

    // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.
    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function(method) {
        define(prototype, method, function(arg) {
          return this._invoke(method, arg);
        });
      });
    }

    exports.isGeneratorFunction = function(genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor
        ? ctor === GeneratorFunction ||
          // For the native GeneratorFunction constructor, the best we can
          // do is to check its .name property.
          (ctor.displayName || ctor.name) === "GeneratorFunction"
        : false;
    };

    exports.mark = function(genFun) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
      } else {
        genFun.__proto__ = GeneratorFunctionPrototype;
        define(genFun, toStringTagSymbol, "GeneratorFunction");
      }
      genFun.prototype = Object.create(Gp);
      return genFun;
    };

    // Within the body of any async function, `await x` is transformed to
    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
    // `hasOwn.call(value, "__await")` to determine if the yielded value is
    // meant to be awaited.
    exports.awrap = function(arg) {
      return { __await: arg };
    };

    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);
        if (record.type === "throw") {
          reject(record.arg);
        } else {
          var result = record.arg;
          var value = result.value;
          if (value &&
              typeof value === "object" &&
              hasOwn.call(value, "__await")) {
            return PromiseImpl.resolve(value.__await).then(function(value) {
              invoke("next", value, resolve, reject);
            }, function(err) {
              invoke("throw", err, resolve, reject);
            });
          }

          return PromiseImpl.resolve(value).then(function(unwrapped) {
            // When a yielded Promise is resolved, its final value becomes
            // the .value of the Promise<{value,done}> result for the
            // current iteration.
            result.value = unwrapped;
            resolve(result);
          }, function(error) {
            // If a rejected Promise was yielded, throw the rejection back
            // into the async generator function so it can be handled there.
            return invoke("throw", error, resolve, reject);
          });
        }
      }

      var previousPromise;

      function enqueue(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function(resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }

        return previousPromise =
          // If enqueue has been called before, then we want to wait until
          // all previous Promises have been resolved before calling invoke,
          // so that results are always delivered in the correct order. If
          // enqueue has not been called before, then it is important to
          // call invoke immediately, without waiting on a callback to fire,
          // so that the async generator function has the opportunity to do
          // any necessary setup in a predictable way. This predictability
          // is why the Promise constructor synchronously invokes its
          // executor callback, and why async functions synchronously
          // execute code before the first await. Since we implement simple
          // async functions in terms of async generators, it is especially
          // important to get this right, even though it requires care.
          previousPromise ? previousPromise.then(
            callInvokeWithMethodAndArg,
            // Avoid propagating failures to Promises returned by later
            // invocations of the iterator.
            callInvokeWithMethodAndArg
          ) : callInvokeWithMethodAndArg();
      }

      // Define the unified helper method that is used to implement .next,
      // .throw, and .return (see defineIteratorMethods).
      this._invoke = enqueue;
    }

    defineIteratorMethods(AsyncIterator.prototype);
    AsyncIterator.prototype[asyncIteratorSymbol] = function () {
      return this;
    };
    exports.AsyncIterator = AsyncIterator;

    // Note that simple async functions are implemented on top of
    // AsyncIterator objects; they just return a Promise for the value of
    // the final result produced by the iterator.
    exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      if (PromiseImpl === void 0) PromiseImpl = Promise;

      var iter = new AsyncIterator(
        wrap(innerFn, outerFn, self, tryLocsList),
        PromiseImpl
      );

      return exports.isGeneratorFunction(outerFn)
        ? iter // If outerFn is a generator, return the full iterator.
        : iter.next().then(function(result) {
            return result.done ? result.value : iter.next();
          });
    };

    function makeInvokeMethod(innerFn, self, context) {
      var state = GenStateSuspendedStart;

      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }

        if (state === GenStateCompleted) {
          if (method === "throw") {
            throw arg;
          }

          // Be forgiving, per 25.3.3.3.3 of the spec:
          // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
          return doneResult();
        }

        context.method = method;
        context.arg = arg;

        while (true) {
          var delegate = context.delegate;
          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);
            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if (context.method === "next") {
            // Setting context._sent for legacy support of Babel's
            // function.sent implementation.
            context.sent = context._sent = context.arg;

          } else if (context.method === "throw") {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw context.arg;
            }

            context.dispatchException(context.arg);

          } else if (context.method === "return") {
            context.abrupt("return", context.arg);
          }

          state = GenStateExecuting;

          var record = tryCatch(innerFn, self, context);
          if (record.type === "normal") {
            // If an exception is thrown from innerFn, we leave state ===
            // GenStateExecuting and loop back for another invocation.
            state = context.done
              ? GenStateCompleted
              : GenStateSuspendedYield;

            if (record.arg === ContinueSentinel) {
              continue;
            }

            return {
              value: record.arg,
              done: context.done
            };

          } else if (record.type === "throw") {
            state = GenStateCompleted;
            // Dispatch the exception by looping back around to the
            // context.dispatchException(context.arg) call above.
            context.method = "throw";
            context.arg = record.arg;
          }
        }
      };
    }

    // Call delegate.iterator[context.method](context.arg) and handle the
    // result, either by returning a { value, done } result from the
    // delegate iterator, or by modifying context.method and context.arg,
    // setting context.delegate to null, and returning the ContinueSentinel.
    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];
      if (method === undefined$1) {
        // A .throw or .return when the delegate iterator has no .throw
        // method always terminates the yield* loop.
        context.delegate = null;

        if (context.method === "throw") {
          // Note: ["return"] must be used for ES3 parsing compatibility.
          if (delegate.iterator["return"]) {
            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            context.method = "return";
            context.arg = undefined$1;
            maybeInvokeDelegate(delegate, context);

            if (context.method === "throw") {
              // If maybeInvokeDelegate(context) changed context.method from
              // "return" to "throw", let that override the TypeError below.
              return ContinueSentinel;
            }
          }

          context.method = "throw";
          context.arg = new TypeError(
            "The iterator does not provide a 'throw' method");
        }

        return ContinueSentinel;
      }

      var record = tryCatch(method, delegate.iterator, context.arg);

      if (record.type === "throw") {
        context.method = "throw";
        context.arg = record.arg;
        context.delegate = null;
        return ContinueSentinel;
      }

      var info = record.arg;

      if (! info) {
        context.method = "throw";
        context.arg = new TypeError("iterator result is not an object");
        context.delegate = null;
        return ContinueSentinel;
      }

      if (info.done) {
        // Assign the result of the finished delegate to the temporary
        // variable specified by delegate.resultName (see delegateYield).
        context[delegate.resultName] = info.value;

        // Resume execution at the desired location (see delegateYield).
        context.next = delegate.nextLoc;

        // If context.method was "throw" but the delegate handled the
        // exception, let the outer generator proceed normally. If
        // context.method was "next", forget context.arg since it has been
        // "consumed" by the delegate iterator. If context.method was
        // "return", allow the original .return call to continue in the
        // outer generator.
        if (context.method !== "return") {
          context.method = "next";
          context.arg = undefined$1;
        }

      } else {
        // Re-yield the result returned by the delegate method.
        return info;
      }

      // The delegate iterator is finished, so forget it and continue with
      // the outer generator.
      context.delegate = null;
      return ContinueSentinel;
    }

    // Define Generator.prototype.{next,throw,return} in terms of the
    // unified ._invoke helper method.
    defineIteratorMethods(Gp);

    define(Gp, toStringTagSymbol, "Generator");

    // A Generator should always return itself as the iterator object when the
    // @@iterator function is called on it. Some browsers' implementations of the
    // iterator prototype chain incorrectly implement this, causing the Generator
    // object to not be returned from this call. This ensures that doesn't happen.
    // See https://github.com/facebook/regenerator/issues/274 for more details.
    Gp[iteratorSymbol] = function() {
      return this;
    };

    Gp.toString = function() {
      return "[object Generator]";
    };

    function pushTryEntry(locs) {
      var entry = { tryLoc: locs[0] };

      if (1 in locs) {
        entry.catchLoc = locs[1];
      }

      if (2 in locs) {
        entry.finallyLoc = locs[2];
        entry.afterLoc = locs[3];
      }

      this.tryEntries.push(entry);
    }

    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal";
      delete record.arg;
      entry.completion = record;
    }

    function Context(tryLocsList) {
      // The root entry object (effectively a try statement without a catch
      // or a finally block) gives us a place to store values thrown from
      // locations where there is no enclosing try statement.
      this.tryEntries = [{ tryLoc: "root" }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }

    exports.keys = function(object) {
      var keys = [];
      for (var key in object) {
        keys.push(key);
      }
      keys.reverse();

      // Rather than returning an object with a next method, we keep
      // things simple and return the next function itself.
      return function next() {
        while (keys.length) {
          var key = keys.pop();
          if (key in object) {
            next.value = key;
            next.done = false;
            return next;
          }
        }

        // To avoid creating an additional object, we just hang the .value
        // and .done properties off the next function object itself. This
        // also ensures that the minifier will not anonymize the function.
        next.done = true;
        return next;
      };
    };

    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];
        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }

        if (typeof iterable.next === "function") {
          return iterable;
        }

        if (!isNaN(iterable.length)) {
          var i = -1, next = function next() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                next.value = iterable[i];
                next.done = false;
                return next;
              }
            }

            next.value = undefined$1;
            next.done = true;

            return next;
          };

          return next.next = next;
        }
      }

      // Return an iterator with no values.
      return { next: doneResult };
    }
    exports.values = values;

    function doneResult() {
      return { value: undefined$1, done: true };
    }

    Context.prototype = {
      constructor: Context,

      reset: function(skipTempReset) {
        this.prev = 0;
        this.next = 0;
        // Resetting context._sent for legacy support of Babel's
        // function.sent implementation.
        this.sent = this._sent = undefined$1;
        this.done = false;
        this.delegate = null;

        this.method = "next";
        this.arg = undefined$1;

        this.tryEntries.forEach(resetTryEntry);

        if (!skipTempReset) {
          for (var name in this) {
            // Not sure about the optimal order of these conditions:
            if (name.charAt(0) === "t" &&
                hasOwn.call(this, name) &&
                !isNaN(+name.slice(1))) {
              this[name] = undefined$1;
            }
          }
        }
      },

      stop: function() {
        this.done = true;

        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;
        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }

        return this.rval;
      },

      dispatchException: function(exception) {
        if (this.done) {
          throw exception;
        }

        var context = this;
        function handle(loc, caught) {
          record.type = "throw";
          record.arg = exception;
          context.next = loc;

          if (caught) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            context.method = "next";
            context.arg = undefined$1;
          }

          return !! caught;
        }

        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;

          if (entry.tryLoc === "root") {
            // Exception thrown outside of any try block that could handle
            // it, so set the completion value of the entire function to
            // throw the exception.
            return handle("end");
          }

          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc");
            var hasFinally = hasOwn.call(entry, "finallyLoc");

            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }

            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }

            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }

            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      },

      abrupt: function(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc <= this.prev &&
              hasOwn.call(entry, "finallyLoc") &&
              this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }

        if (finallyEntry &&
            (type === "break" ||
             type === "continue") &&
            finallyEntry.tryLoc <= arg &&
            arg <= finallyEntry.finallyLoc) {
          // Ignore the finally entry if control is not jumping to a
          // location outside the try/catch block.
          finallyEntry = null;
        }

        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;

        if (finallyEntry) {
          this.method = "next";
          this.next = finallyEntry.finallyLoc;
          return ContinueSentinel;
        }

        return this.complete(record);
      },

      complete: function(record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }

        if (record.type === "break" ||
            record.type === "continue") {
          this.next = record.arg;
        } else if (record.type === "return") {
          this.rval = this.arg = record.arg;
          this.method = "return";
          this.next = "end";
        } else if (record.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }

        return ContinueSentinel;
      },

      finish: function(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },

      "catch": function(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;
            if (record.type === "throw") {
              var thrown = record.arg;
              resetTryEntry(entry);
            }
            return thrown;
          }
        }

        // The context.catch method must only be called with a location
        // argument that corresponds to a known catch block.
        throw new Error("illegal catch attempt");
      },

      delegateYield: function(iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        };

        if (this.method === "next") {
          // Deliberately forget the last sent value so that we don't
          // accidentally pass it on to the delegate.
          this.arg = undefined$1;
        }

        return ContinueSentinel;
      }
    };

    // Regardless of whether this script is executing as a CommonJS module
    // or not, return the runtime object so that we can declare the variable
    // regeneratorRuntime in the outer scope, which allows this module to be
    // injected easily by `bin/regenerator --include-runtime script.js`.
    return exports;

  }(
    // If this script is executing as a CommonJS module, use module.exports
    // as the regeneratorRuntime namespace. Otherwise create a new empty
    // object. Either way, the resulting object will be used to initialize
    // the regeneratorRuntime variable at the top of this file.
    module.exports 
  ));

  try {
    regeneratorRuntime = runtime;
  } catch (accidentalStrictMode) {
    // This module should not be running in strict mode, so the above
    // assignment should always work unless something is misconfigured. Just
    // in case runtime.js accidentally runs in strict mode, we can escape
    // strict mode using a global Function call. This could conceivably fail
    // if a Content Security Policy forbids using Function, but in that case
    // the proper solution is to fix the accidental strict mode problem. If
    // you've misconfigured your bundler to force strict mode and applied a
    // CSP to forbid Function, and you're not willing to fix either of those
    // problems, please detail your unique predicament in a GitHub issue.
    Function("r", "regeneratorRuntime = r")(runtime);
  }
  });

  var regenerator = runtime_1;

  var asyncToGenerator = createCommonjsModule(function (module) {
  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
          args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }

  module.exports = _asyncToGenerator;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
  });

  /*!
  Copyright (C) 2013-2017 by Andrea Giammarchi - @WebReflection

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.

  */
  var
    // should be a not so common char
    // possibly one JSON does not encode
    // possibly one encodeURIComponent does not encode
    // right now this char is '~' but this might change in the future
    specialChar = '~',
    safeSpecialChar = '\\x' + (
      '0' + specialChar.charCodeAt(0).toString(16)
    ).slice(-2),
    escapedSafeSpecialChar = '\\' + safeSpecialChar,
    specialCharRG = new RegExp(safeSpecialChar, 'g'),
    safeSpecialCharRG = new RegExp(escapedSafeSpecialChar, 'g'),

    safeStartWithSpecialCharRG = new RegExp('(?:^|([^\\\\]))' + escapedSafeSpecialChar),

    indexOf = [].indexOf || function(v){
      for(var i=this.length;i--&&this[i]!==v;);
      return i;
    },
    $String = String  // there's no way to drop warnings in JSHint
                      // about new String ... well, I need that here!
                      // faked, and happy linter!
  ;

  function generateReplacer(value, replacer, resolve) {
    var
      doNotIgnore = false,
      inspect = !!replacer,
      path = [],
      all  = [value],
      seen = [value],
      mapp = [resolve ? specialChar : '[Circular]'],
      last = value,
      lvl  = 1,
      i, fn
    ;
    if (inspect) {
      fn = typeof replacer === 'object' ?
        function (key, value) {
          return key !== '' && replacer.indexOf(key) < 0 ? void 0 : value;
        } :
        replacer;
    }
    return function(key, value) {
      // the replacer has rights to decide
      // if a new object should be returned
      // or if there's some key to drop
      // let's call it here rather than "too late"
      if (inspect) value = fn.call(this, key, value);

      // first pass should be ignored, since it's just the initial object
      if (doNotIgnore) {
        if (last !== this) {
          i = lvl - indexOf.call(all, this) - 1;
          lvl -= i;
          all.splice(lvl, all.length);
          path.splice(lvl - 1, path.length);
          last = this;
        }
        // console.log(lvl, key, path);
        if (typeof value === 'object' && value) {
      	// if object isn't referring to parent object, add to the
          // object path stack. Otherwise it is already there.
          if (indexOf.call(all, value) < 0) {
            all.push(last = value);
          }
          lvl = all.length;
          i = indexOf.call(seen, value);
          if (i < 0) {
            i = seen.push(value) - 1;
            if (resolve) {
              // key cannot contain specialChar but could be not a string
              path.push(('' + key).replace(specialCharRG, safeSpecialChar));
              mapp[i] = specialChar + path.join(specialChar);
            } else {
              mapp[i] = mapp[0];
            }
          } else {
            value = mapp[i];
          }
        } else {
          if (typeof value === 'string' && resolve) {
            // ensure no special char involved on deserialization
            // in this case only first char is important
            // no need to replace all value (better performance)
            value = value .replace(safeSpecialChar, escapedSafeSpecialChar)
                          .replace(specialChar, safeSpecialChar);
          }
        }
      } else {
        doNotIgnore = true;
      }
      return value;
    };
  }

  function retrieveFromPath(current, keys) {
    for(var i = 0, length = keys.length; i < length; current = current[
      // keys should be normalized back here
      keys[i++].replace(safeSpecialCharRG, specialChar)
    ]);
    return current;
  }

  function generateReviver(reviver) {
    return function(key, value) {
      var isString = typeof value === 'string';
      if (isString && value.charAt(0) === specialChar) {
        return new $String(value.slice(1));
      }
      if (key === '') value = regenerate(value, value, {});
      // again, only one needed, do not use the RegExp for this replacement
      // only keys need the RegExp
      if (isString) value = value .replace(safeStartWithSpecialCharRG, '$1' + specialChar)
                                  .replace(escapedSafeSpecialChar, safeSpecialChar);
      return reviver ? reviver.call(this, key, value) : value;
    };
  }

  function regenerateArray(root, current, retrieve) {
    for (var i = 0, length = current.length; i < length; i++) {
      current[i] = regenerate(root, current[i], retrieve);
    }
    return current;
  }

  function regenerateObject(root, current, retrieve) {
    for (var key in current) {
      if (current.hasOwnProperty(key)) {
        current[key] = regenerate(root, current[key], retrieve);
      }
    }
    return current;
  }

  function regenerate(root, current, retrieve) {
    return current instanceof Array ?
      // fast Array reconstruction
      regenerateArray(root, current, retrieve) :
      (
        current instanceof $String ?
          (
            // root is an empty string
            current.length ?
              (
                retrieve.hasOwnProperty(current) ?
                  retrieve[current] :
                  retrieve[current] = retrieveFromPath(
                    root, current.split(specialChar)
                  )
              ) :
              root
          ) :
          (
            current instanceof Object ?
              // dedicated Object parser
              regenerateObject(root, current, retrieve) :
              // value as it is
              current
          )
      )
    ;
  }

  var CircularJSON = {
    stringify: function stringify(value, replacer, space, doNotResolve) {
      return CircularJSON.parser.stringify(
        value,
        generateReplacer(value, replacer, !doNotResolve),
        space
      );
    },
    parse: function parse(text, reviver) {
      return CircularJSON.parser.parse(
        text,
        generateReviver(reviver)
      );
    },
    // A parser should be an API 1:1 compatible with JSON
    // it should expose stringify and parse methods.
    // The default parser is the native JSON.
    parser: JSON
  };

  var circularJson_node = CircularJSON;

  var client = createCommonjsModule(function (module, exports) {



  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports["default"] = void 0;

  var _regenerator = interopRequireDefault(regenerator);

  var _asyncToGenerator2 = interopRequireDefault(asyncToGenerator);

  var _typeof2 = interopRequireDefault(_typeof_1);

  var _classCallCheck2 = interopRequireDefault(classCallCheck);

  var _createClass2 = interopRequireDefault(createClass);

  var _inherits2 = interopRequireDefault(inherits);

  var _possibleConstructorReturn2 = interopRequireDefault(possibleConstructorReturn);

  var _getPrototypeOf2 = interopRequireDefault(getPrototypeOf);



  var _circularJson = interopRequireDefault(circularJson_node);

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  var CommonClient = /*#__PURE__*/function (_EventEmitter) {
    (0, _inherits2["default"])(CommonClient, _EventEmitter);

    var _super = _createSuper(CommonClient);

    /**
     * Instantiate a Client class.
     * @constructor
     * @param {webSocketFactory} webSocketFactory - factory method for WebSocket
     * @param {String} address - url to a websocket server
     * @param {Object} options - ws options object with reconnect parameters
     * @param {Function} generate_request_id - custom generation request Id
     * @return {CommonClient}
     */
    function CommonClient(webSocketFactory) {
      var _this;

      var address = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "ws://localhost:8080";

      var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
          _ref$autoconnect = _ref.autoconnect,
          autoconnect = _ref$autoconnect === void 0 ? true : _ref$autoconnect,
          _ref$reconnect = _ref.reconnect,
          reconnect = _ref$reconnect === void 0 ? true : _ref$reconnect,
          _ref$reconnect_interv = _ref.reconnect_interval,
          reconnect_interval = _ref$reconnect_interv === void 0 ? 1000 : _ref$reconnect_interv,
          _ref$max_reconnects = _ref.max_reconnects,
          max_reconnects = _ref$max_reconnects === void 0 ? 5 : _ref$max_reconnects;

      var generate_request_id = arguments.length > 3 ? arguments[3] : undefined;
      (0, _classCallCheck2["default"])(this, CommonClient);
      _this = _super.call(this);
      _this.webSocketFactory = webSocketFactory;
      _this.queue = {};
      _this.rpc_id = 0;
      _this.address = address;
      _this.autoconnect = autoconnect;
      _this.ready = false;
      _this.reconnect = reconnect;
      _this.reconnect_interval = reconnect_interval;
      _this.max_reconnects = max_reconnects;
      _this.current_reconnects = 0;

      _this.generate_request_id = generate_request_id || function () {
        return ++_this.rpc_id;
      };

      if (_this.autoconnect) _this._connect(_this.address, {
        autoconnect: _this.autoconnect,
        reconnect: _this.reconnect,
        reconnect_interval: _this.reconnect_interval,
        max_reconnects: _this.max_reconnects
      });
      return _this;
    }
    /**
     * Connects to a defined server if not connected already.
     * @method
     * @return {Undefined}
     */


    (0, _createClass2["default"])(CommonClient, [{
      key: "connect",
      value: function connect() {
        if (this.socket) return;

        this._connect(this.address, {
          autoconnect: this.autoconnect,
          reconnect: this.reconnect,
          reconnect_interval: this.reconnect_interval,
          max_reconnects: this.max_reconnects
        });
      }
      /**
       * Calls a registered RPC method on server.
       * @method
       * @param {String} method - RPC method name
       * @param {Object|Array} params - optional method parameters
       * @param {Number} timeout - RPC reply timeout value
       * @param {Object} ws_opts - options passed to ws
       * @return {Promise}
       */

    }, {
      key: "call",
      value: function call(method, params, timeout, ws_opts) {
        var _this2 = this;

        if (!ws_opts && "object" === (0, _typeof2["default"])(timeout)) {
          ws_opts = timeout;
          timeout = null;
        }

        return new Promise(function (resolve, reject) {
          if (!_this2.ready) return reject(new Error("socket not ready"));

          var rpc_id = _this2.generate_request_id(method, params);

          var message = {
            jsonrpc: "2.0",
            method: method,
            params: params || null,
            id: rpc_id
          };

          _this2.socket.send(JSON.stringify(message), ws_opts, function (error) {
            if (error) return reject(error);
            _this2.queue[rpc_id] = {
              promise: [resolve, reject]
            };

            if (timeout) {
              _this2.queue[rpc_id].timeout = setTimeout(function () {
                _this2.queue[rpc_id] = null;
                reject(new Error("reply timeout"));
              }, timeout);
            }
          });
        });
      }
      /**
       * Logins with the other side of the connection.
       * @method
       * @param {Object} params - Login credentials object
       * @return {Promise}
       */

    }, {
      key: "login",
      value: function () {
        var _login = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(params) {
          var resp;
          return _regenerator["default"].wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return this.call("rpc.login", params);

                case 2:
                  resp = _context.sent;

                  if (resp) {
                    _context.next = 5;
                    break;
                  }

                  throw new Error("authentication failed");

                case 5:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function login(_x) {
          return _login.apply(this, arguments);
        }

        return login;
      }()
      /**
       * Fetches a list of client's methods registered on server.
       * @method
       * @return {Array}
       */

    }, {
      key: "listMethods",
      value: function () {
        var _listMethods = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
          return _regenerator["default"].wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return this.call("__listMethods");

                case 2:
                  return _context2.abrupt("return", _context2.sent);

                case 3:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        function listMethods() {
          return _listMethods.apply(this, arguments);
        }

        return listMethods;
      }()
      /**
       * Sends a JSON-RPC 2.0 notification to server.
       * @method
       * @param {String} method - RPC method name
       * @param {Object} params - optional method parameters
       * @return {Promise}
       */

    }, {
      key: "notify",
      value: function notify(method, params) {
        var _this3 = this;

        return new Promise(function (resolve, reject) {
          if (!_this3.ready) return reject(new Error("socket not ready"));
          var message = {
            jsonrpc: "2.0",
            method: method,
            params: params || null
          };

          _this3.socket.send(JSON.stringify(message), function (error) {
            if (error) return reject(error);
            resolve();
          });
        });
      }
      /**
       * Subscribes for a defined event.
       * @method
       * @param {String|Array} event - event name
       * @return {Undefined}
       * @throws {Error}
       */

    }, {
      key: "subscribe",
      value: function () {
        var _subscribe = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(event) {
          var result;
          return _regenerator["default"].wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  if (typeof event === "string") event = [event];
                  _context3.next = 3;
                  return this.call("rpc.on", event);

                case 3:
                  result = _context3.sent;

                  if (!(typeof event === "string" && result[event] !== "ok")) {
                    _context3.next = 6;
                    break;
                  }

                  throw new Error("Failed subscribing to an event '" + event + "' with: " + result[event]);

                case 6:
                  return _context3.abrupt("return", result);

                case 7:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, this);
        }));

        function subscribe(_x2) {
          return _subscribe.apply(this, arguments);
        }

        return subscribe;
      }()
      /**
       * Unsubscribes from a defined event.
       * @method
       * @param {String|Array} event - event name
       * @return {Undefined}
       * @throws {Error}
       */

    }, {
      key: "unsubscribe",
      value: function () {
        var _unsubscribe = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(event) {
          var result;
          return _regenerator["default"].wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  if (typeof event === "string") event = [event];
                  _context4.next = 3;
                  return this.call("rpc.off", event);

                case 3:
                  result = _context4.sent;

                  if (!(typeof event === "string" && result[event] !== "ok")) {
                    _context4.next = 6;
                    break;
                  }

                  throw new Error("Failed unsubscribing from an event with: " + result);

                case 6:
                  return _context4.abrupt("return", result);

                case 7:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4, this);
        }));

        function unsubscribe(_x3) {
          return _unsubscribe.apply(this, arguments);
        }

        return unsubscribe;
      }()
      /**
       * Closes a WebSocket connection gracefully.
       * @method
       * @param {Number} code - socket close code
       * @param {String} data - optional data to be sent before closing
       * @return {Undefined}
       */

    }, {
      key: "close",
      value: function close(code, data) {
        this.socket.close(code || 1000, data);
      }
      /**
       * Connection/Message handler.
       * @method
       * @private
       * @param {String} address - WebSocket API address
       * @param {Object} options - ws options object
       * @return {Undefined}
       */

    }, {
      key: "_connect",
      value: function _connect(address, options) {
        var _this4 = this;

        this.socket = this.webSocketFactory(address, options);
        this.socket.addEventListener("open", function () {
          _this4.ready = true;

          _this4.emit("open");

          _this4.current_reconnects = 0;
        });
        this.socket.addEventListener("message", function (_ref2) {
          var message = _ref2.data;
          if (message instanceof ArrayBuffer) message = buffer.Buffer.from(message).toString();

          try {
            message = _circularJson["default"].parse(message);
          } catch (error) {
            return;
          } // check if any listeners are attached and forward event


          if (message.notification && _this4.listeners(message.notification).length) {
            if (!Object.keys(message.params).length) return _this4.emit(message.notification);
            var args = [message.notification];
            if (message.params.constructor === Object) args.push(message.params);else // using for-loop instead of unshift/spread because performance is better
              for (var i = 0; i < message.params.length; i++) {
                args.push(message.params[i]);
              } // run as microtask so that pending queue messages are resolved first
            // eslint-disable-next-line prefer-spread

            return Promise.resolve().then(function () {
              _this4.emit.apply(_this4, args);
            });
          }

          if (!_this4.queue[message.id]) {
            // general JSON RPC 2.0 events
            if (message.method && message.params) {
              // run as microtask so that pending queue messages are resolved first
              return Promise.resolve().then(function () {
                _this4.emit(message.method, message.params);
              });
            }

            return;
          } // reject early since server's response is invalid


          if ("error" in message === "result" in message) _this4.queue[message.id].promise[1](new Error("Server response malformed. Response must include either \"result\"" + " or \"error\", but not both."));
          if (_this4.queue[message.id].timeout) clearTimeout(_this4.queue[message.id].timeout);
          if (message.error) _this4.queue[message.id].promise[1](message.error);else _this4.queue[message.id].promise[0](message.result);
          _this4.queue[message.id] = null;
        });
        this.socket.addEventListener("error", function (error) {
          return _this4.emit("error", error);
        });
        this.socket.addEventListener("close", function (_ref3) {
          var code = _ref3.code,
              reason = _ref3.reason;
          if (_this4.ready) // Delay close event until internal state is updated
            setTimeout(function () {
              return _this4.emit("close", code, reason);
            }, 0);
          _this4.ready = false;
          _this4.socket = undefined;
          if (code === 1000) return;
          _this4.current_reconnects++;
          if (_this4.reconnect && (_this4.max_reconnects > _this4.current_reconnects || _this4.max_reconnects === 0)) setTimeout(function () {
            return _this4._connect(address, options);
          }, _this4.reconnect_interval);
        });
      }
    }]);
    return CommonClient;
  }(eventemitter3.EventEmitter);

  exports["default"] = CommonClient;
  });

  var index_browser = createCommonjsModule(function (module, exports) {



  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Client = void 0;

  var _classCallCheck2 = interopRequireDefault(classCallCheck);

  var _inherits2 = interopRequireDefault(inherits);

  var _possibleConstructorReturn2 = interopRequireDefault(possibleConstructorReturn);

  var _getPrototypeOf2 = interopRequireDefault(getPrototypeOf);

  var _websocket = interopRequireDefault(websocket_browser);

  var _client = interopRequireDefault(client);

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  var Client = /*#__PURE__*/function (_CommonClient) {
    (0, _inherits2["default"])(Client, _CommonClient);

    var _super = _createSuper(Client);

    function Client() {
      var address = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "ws://localhost:8080";

      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref$autoconnect = _ref.autoconnect,
          autoconnect = _ref$autoconnect === void 0 ? true : _ref$autoconnect,
          _ref$reconnect = _ref.reconnect,
          reconnect = _ref$reconnect === void 0 ? true : _ref$reconnect,
          _ref$reconnect_interv = _ref.reconnect_interval,
          reconnect_interval = _ref$reconnect_interv === void 0 ? 1000 : _ref$reconnect_interv,
          _ref$max_reconnects = _ref.max_reconnects,
          max_reconnects = _ref$max_reconnects === void 0 ? 5 : _ref$max_reconnects;

      var generate_request_id = arguments.length > 2 ? arguments[2] : undefined;
      (0, _classCallCheck2["default"])(this, Client);
      return _super.call(this, _websocket["default"], address, {
        autoconnect: autoconnect,
        reconnect: reconnect,
        reconnect_interval: reconnect_interval,
        max_reconnects: max_reconnects
      }, generate_request_id);
    }

    return Client;
  }(_client["default"]);

  exports.Client = Client;
  });

  var rngBrowser = createCommonjsModule(function (module) {
  // Unique ID creation requires a high quality random # generator.  In the
  // browser this is a little complicated due to unknown quality of Math.random()
  // and inconsistent support for the `crypto` API.  We do the best we can via
  // feature-detection

  // getRandomValues needs to be invoked in a context where "this" is a Crypto
  // implementation. Also, find the complete implementation of crypto on IE11.
  var getRandomValues = (typeof(crypto) != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto)) ||
                        (typeof(msCrypto) != 'undefined' && typeof window.msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto));

  if (getRandomValues) {
    // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
    var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

    module.exports = function whatwgRNG() {
      getRandomValues(rnds8);
      return rnds8;
    };
  } else {
    // Math.random()-based (RNG)
    //
    // If all else fails, use Math.random().  It's fast, but is of unspecified
    // quality.
    var rnds = new Array(16);

    module.exports = function mathRNG() {
      for (var i = 0, r; i < 16; i++) {
        if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
        rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
      }

      return rnds;
    };
  }
  });

  /**
   * Convert array of 16 byte values to UUID string format of the form:
   * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
   */
  var byteToHex = [];
  for (var i = 0; i < 256; ++i) {
    byteToHex[i] = (i + 0x100).toString(16).substr(1);
  }

  function bytesToUuid(buf, offset) {
    var i = offset || 0;
    var bth = byteToHex;
    // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
    return ([
      bth[buf[i++]], bth[buf[i++]],
      bth[buf[i++]], bth[buf[i++]], '-',
      bth[buf[i++]], bth[buf[i++]], '-',
      bth[buf[i++]], bth[buf[i++]], '-',
      bth[buf[i++]], bth[buf[i++]], '-',
      bth[buf[i++]], bth[buf[i++]],
      bth[buf[i++]], bth[buf[i++]],
      bth[buf[i++]], bth[buf[i++]]
    ]).join('');
  }

  var bytesToUuid_1 = bytesToUuid;

  function v4(options, buf, offset) {
    var i = buf && offset || 0;

    if (typeof(options) == 'string') {
      buf = options === 'binary' ? new Array(16) : null;
      options = null;
    }
    options = options || {};

    var rnds = options.random || (options.rng || rngBrowser)();

    // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
    rnds[6] = (rnds[6] & 0x0f) | 0x40;
    rnds[8] = (rnds[8] & 0x3f) | 0x80;

    // Copy bytes to buffer, if provided
    if (buf) {
      for (var ii = 0; ii < 16; ++ii) {
        buf[i + ii] = rnds[ii];
      }
    }

    return buf || bytesToUuid_1(rnds);
  }

  var v4_1 = v4;

  /**
   *  Generates a JSON-RPC 1.0 or 2.0 request
   *  @param {String} method Name of method to call
   *  @param {Array|Object} params Array of parameters passed to the method as specified, or an object of parameter names and corresponding value
   *  @param {String|Number|null} [id] Request ID can be a string, number, null for explicit notification or left out for automatic generation
   *  @param {Object} [options]
   *  @param {Number} [options.version=2] JSON-RPC version to use (1 or 2)
   *  @param {Function} [options.generator] Passed the request, and the options object and is expected to return a request ID
   *  @throws {TypeError} If any of the parameters are invalid
   *  @return {Object} A JSON-RPC 1.0 or 2.0 request
   *  @memberOf Utils
   */
  const generateRequest = function(method, params, id, options) {
    if(typeof method !== 'string') {
      throw new TypeError(method + ' must be a string');
    }

    options = options || {};

    const request = {
      method: method
    };

    // assume that we are doing a 2.0 request unless specified differently
    if(typeof options.version === 'undefined' || options.version !== 1) {
      request.jsonrpc = '2.0';
    }

    if(params) {

      // params given, but invalid?
      if(typeof params !== 'object' && !Array.isArray(params)) {
        throw new TypeError(params + ' must be an object, array or omitted');
      }

      request.params = params;

    }

    // if id was left out, generate one (null means explicit notification)
    if(typeof(id) === 'undefined') {
      const generator = typeof options.generator === 'function' ? options.generator : function() { return v4_1(); };
      request.id = generator(request, options);
    } else {
      request.id = id;
    }

    return request;
  };

  var generateRequest_1 = generateRequest;

  /**
   * Constructor for a Jayson Browser Client that does not depend any node.js core libraries
   * @class ClientBrowser
   * @param {Function} callServer Method that calls the server, receives the stringified request and a regular node-style callback
   * @param {Object} [options]
   * @param {Function} [options.reviver] Reviver function for JSON
   * @param {Function} [options.replacer] Replacer function for JSON
   * @param {Number} [options.version=2] JSON-RPC version to use (1|2)
   * @param {Function} [options.generator] Function to use for generating request IDs
   * @return {ClientBrowser}
   */
  const ClientBrowser = function(callServer, options) {
    if(!(this instanceof ClientBrowser)) {
      return new ClientBrowser(callServer, options);
    }

    if (!options) {
      options = {};
    }

    this.options = {
      reviver: typeof options.reviver !== 'undefined' ? options.reviver : null,
      replacer: typeof options.replacer !== 'undefined' ? options.replacer : null,
      generator: typeof options.generator !== 'undefined' ? options.generator : function() { return v4_1(); },
      version: typeof options.version !== 'undefined' ? options.version : 2,
    };

    this.callServer = callServer;
  };

  var browser = ClientBrowser;

  /**
   *  Creates a request and dispatches it if given a callback.
   *  @param {String|Array} method A batch request if passed an Array, or a method name if passed a String
   *  @param {Array|Object} [params] Parameters for the method
   *  @param {String|Number} [id] Optional id. If undefined an id will be generated. If null it creates a notification request
   *  @param {Function} [callback] Request callback. If specified, executes the request rather than only returning it.
   *  @throws {TypeError} Invalid parameters
   *  @return {Object} JSON-RPC 1.0 or 2.0 compatible request
   */
  ClientBrowser.prototype.request = function(method, params, id, callback) {
    const self = this;
    let request = null;

    // is this a batch request?
    const isBatch = Array.isArray(method) && typeof params === 'function';

    if (this.options.version === 1 && isBatch) {
      throw new TypeError('JSON-RPC 1.0 does not support batching');
    }

    // is this a raw request?
    const isRaw = !isBatch && method && typeof method === 'object' && typeof params === 'function';

    if(isBatch || isRaw) {
      callback = params;
      request = method;
    } else {
      if(typeof id === 'function') {
        callback = id;
        // specifically undefined because "null" is a notification request
        id = undefined;
      }

      const hasCallback = typeof callback === 'function';

      try {
        request = generateRequest_1(method, params, id, {
          generator: this.options.generator,
          version: this.options.version
        });
      } catch(err) {
        if(hasCallback) {
          return callback(err);
        }
        throw err;
      }

      // no callback means we should just return a raw request
      if(!hasCallback) {
        return request;
      }

    }

    let message;
    try {
      message = JSON.stringify(request, this.options.replacer);
    } catch(err) {
      return callback(err);
    }

    this.callServer(message, function(err, response) {
      self._parseResponse(err, response, callback);
    });

    // always return the raw request
    return request;
  };

  /**
   * Parses a response from a server
   * @param {Object} err Error to pass on that is unrelated to the actual response
   * @param {String} responseText JSON-RPC 1.0 or 2.0 response
   * @param {Function} callback Callback that will receive different arguments depending on the amount of parameters
   * @private
   */
  ClientBrowser.prototype._parseResponse = function(err, responseText, callback) {
    if(err) {
      callback(err);
      return;
    }

    if(!responseText) {
      // empty response text, assume that is correct because it could be a
      // notification which jayson does not give any body for
      return callback();
    }

    let response;
    try {
      response = JSON.parse(responseText, this.options.reviver);
    } catch(err) {
      return callback(err);
    }

    if(callback.length === 3) {
      // if callback length is 3, we split callback arguments on error and response

      // is batch response?
      if(Array.isArray(response)) {

        // neccesary to split strictly on validity according to spec here
        const isError = function(res) {
          return typeof res.error !== 'undefined';
        };

        const isNotError = function (res) {
          return !isError(res);
        };

        return callback(null, response.filter(isError), response.filter(isNotError));
      
      } else {

        // split regardless of validity
        return callback(null, response.error, response.result);
      
      }
    
    }

    callback(null, response);
  };

  // TODO: These constants should be removed in favor of reading them out of a
  // Syscall account

  /**
   * @internal
   */
  const NUM_TICKS_PER_SECOND = 160;
  /**
   * @internal
   */

  const DEFAULT_TICKS_PER_SLOT = 64;
  /**
   * @internal
   */

  const NUM_SLOTS_PER_SECOND = NUM_TICKS_PER_SECOND / DEFAULT_TICKS_PER_SLOT;
  /**
   * @internal
   */

  const MS_PER_SLOT = 1000 / NUM_SLOTS_PER_SECOND;

  function promiseTimeout(promise, timeoutMs) {
    let timeoutId;
    const timeoutPromise = new Promise(resolve => {
      timeoutId = setTimeout(() => resolve(null), timeoutMs);
    });
    return Promise.race([promise, timeoutPromise]).then(result => {
      clearTimeout(timeoutId);
      return result;
    });
  }

  const PublicKeyFromString = coerce(instance(PublicKey), string(), value => new PublicKey(value));
  const RawAccountDataResult = tuple([string(), literal('base64')]);
  const BufferFromRawAccountData = coerce(instance(buffer.Buffer), RawAccountDataResult, value => buffer.Buffer.from(value[0], 'base64'));
  /**
   * Attempt to use a recent blockhash for up to 30 seconds
   * @internal
   */

  const BLOCKHASH_CACHE_TIMEOUT_MS = 30 * 1000;

  /**
   * @internal
   */
  function createRpcResult(result) {
    return union([type({
      jsonrpc: literal('2.0'),
      id: string(),
      result
    }), type({
      jsonrpc: literal('2.0'),
      id: string(),
      error: type({
        code: unknown(),
        message: string(),
        data: optional(any())
      })
    })]);
  }

  const UnknownRpcResult = createRpcResult(unknown());
  /**
   * @internal
   */

  function jsonRpcResult(schema) {
    return coerce(createRpcResult(schema), UnknownRpcResult, value => {
      if ('error' in value) {
        return value;
      } else {
        return { ...value,
          result: create(value.result, schema)
        };
      }
    });
  }
  /**
   * @internal
   */


  function jsonRpcResultAndContext(value) {
    return jsonRpcResult(type({
      context: type({
        slot: number()
      }),
      value
    }));
  }
  /**
   * @internal
   */


  function notificationResultAndContext(value) {
    return type({
      context: type({
        slot: number()
      }),
      value
    });
  }
  /**
   * The level of commitment desired when querying state
   * <pre>
   *   'processed': Query the most recent block which has reached 1 confirmation by the connected node
   *   'confirmed': Query the most recent block which has reached 1 confirmation by the cluster
   *   'finalized': Query the most recent block which has been finalized by the cluster
   * </pre>
   */


  const GetInflationGovernorResult = type({
    foundation: number(),
    foundationTerm: number(),
    initial: number(),
    taper: number(),
    terminal: number()
  });
  /**
   * Information about the current epoch
   */

  const GetEpochInfoResult = type({
    epoch: number(),
    slotIndex: number(),
    slotsInEpoch: number(),
    absoluteSlot: number(),
    blockHeight: optional(number()),
    transactionCount: optional(number())
  });
  /**
   * Epoch schedule
   * (see https://docs.solana.com/terminology#epoch)
   */

  const GetEpochScheduleResult = type({
    slotsPerEpoch: number(),
    leaderScheduleSlotOffset: number(),
    warmup: boolean(),
    firstNormalEpoch: number(),
    firstNormalSlot: number()
  });
  /**
   * Leader schedule
   * (see https://docs.solana.com/terminology#leader-schedule)
   */

  const GetLeaderScheduleResult = record(string(), array(number()));
  /**
   * Transaction error or null
   */

  const TransactionErrorResult = nullable(union([type({}), string()]));
  /**
   * Signature status for a transaction
   */

  const SignatureStatusResult = type({
    err: TransactionErrorResult
  });
  /**
   * Transaction signature received notification
   */

  const SignatureReceivedResult = literal('receivedSignature');
  /**
   * Version info for a node
   */

  const VersionResult = type({
    'solana-core': string(),
    'feature-set': optional(number())
  });
  const SimulatedTransactionResponseStruct = jsonRpcResultAndContext(type({
    err: nullable(union([type({}), string()])),
    logs: nullable(array(string()))
  }));

  function createRpcClient(url, useHttps) {

    const clientBrowser = new browser(async (request, callback) => {
      const agent = undefined;
      const options = {
        method: 'POST',
        body: request,
        agent,
        headers: {
          'Content-Type': 'application/json'
        }
      };

      try {
        let too_many_requests_retries = 5;
        let res;
        let waitTime = 500;

        for (;;) {
          res = await browser$1(url, options);

          if (res.status !== 429
          /* Too many requests */
          ) {
              break;
            }

          too_many_requests_retries -= 1;

          if (too_many_requests_retries === 0) {
            break;
          }

          console.log("Server responded with ".concat(res.status, " ").concat(res.statusText, ".  Retrying after ").concat(waitTime, "ms delay..."));
          await sleep(waitTime);
          waitTime *= 2;
        }

        const text = await res.text();

        if (res.ok) {
          callback(null, text);
        } else {
          callback(new Error("".concat(res.status, " ").concat(res.statusText, ": ").concat(text)));
        }
      } catch (err) {
        callback(err);
      } finally {
      }
    }, {});
    return clientBrowser;
  }

  function createRpcRequest(client) {
    return (method, args) => {
      return new Promise((resolve, reject) => {
        client.request(method, args, (err, response) => {
          if (err) {
            reject(err);
            return;
          }

          resolve(response);
        });
      });
    };
  }

  function createRpcBatchRequest(client) {
    return requests => {
      return new Promise((resolve, reject) => {
        // Do nothing if requests is empty
        if (requests.length === 0) resolve([]);
        const batch = requests.map(params => {
          return client.request(params.methodName, params.args);
        });
        client.request(batch, (err, response) => {
          if (err) {
            reject(err);
            return;
          }

          resolve(response);
        });
      });
    };
  }
  /**
   * Expected JSON RPC response for the "getInflationGovernor" message
   */


  const GetInflationGovernorRpcResult = jsonRpcResult(GetInflationGovernorResult);
  /**
   * Expected JSON RPC response for the "getEpochInfo" message
   */

  const GetEpochInfoRpcResult = jsonRpcResult(GetEpochInfoResult);
  /**
   * Expected JSON RPC response for the "getEpochSchedule" message
   */

  const GetEpochScheduleRpcResult = jsonRpcResult(GetEpochScheduleResult);
  /**
   * Expected JSON RPC response for the "getLeaderSchedule" message
   */

  const GetLeaderScheduleRpcResult = jsonRpcResult(GetLeaderScheduleResult);
  /**
   * Expected JSON RPC response for the "minimumLedgerSlot" and "getFirstAvailableBlock" messages
   */

  const SlotRpcResult = jsonRpcResult(number());
  /**
   * Supply
   */

  /**
   * Expected JSON RPC response for the "getSupply" message
   */
  const GetSupplyRpcResult = jsonRpcResultAndContext(type({
    total: number(),
    circulating: number(),
    nonCirculating: number(),
    nonCirculatingAccounts: array(PublicKeyFromString)
  }));
  /**
   * Token amount object which returns a token amount in different formats
   * for various client use cases.
   */

  /**
   * Expected JSON RPC structure for token amounts
   */
  const TokenAmountResult = type({
    amount: string(),
    uiAmount: nullable(number()),
    decimals: number(),
    uiAmountString: optional(string())
  });
  /**
   * Token address and balance.
   */

  /**
   * Expected JSON RPC response for the "getTokenLargestAccounts" message
   */
  const GetTokenLargestAccountsResult = jsonRpcResultAndContext(array(type({
    address: PublicKeyFromString,
    amount: string(),
    uiAmount: nullable(number()),
    decimals: number(),
    uiAmountString: optional(string())
  })));
  /**
   * Expected JSON RPC response for the "getTokenAccountsByOwner" message
   */

  const GetTokenAccountsByOwner = jsonRpcResultAndContext(array(type({
    pubkey: PublicKeyFromString,
    account: type({
      executable: boolean(),
      owner: PublicKeyFromString,
      lamports: number(),
      data: BufferFromRawAccountData,
      rentEpoch: number()
    })
  })));
  const ParsedAccountDataResult = type({
    program: string(),
    parsed: unknown(),
    space: number()
  });
  /**
   * Expected JSON RPC response for the "getTokenAccountsByOwner" message with parsed data
   */

  const GetParsedTokenAccountsByOwner = jsonRpcResultAndContext(array(type({
    pubkey: PublicKeyFromString,
    account: type({
      executable: boolean(),
      owner: PublicKeyFromString,
      lamports: number(),
      data: ParsedAccountDataResult,
      rentEpoch: number()
    })
  })));
  /**
   * Pair of an account address and its balance
   */

  /**
   * Expected JSON RPC response for the "getLargestAccounts" message
   */
  const GetLargestAccountsRpcResult = jsonRpcResultAndContext(array(type({
    lamports: number(),
    address: PublicKeyFromString
  })));
  /**
   * @internal
   */

  const AccountInfoResult = type({
    executable: boolean(),
    owner: PublicKeyFromString,
    lamports: number(),
    data: BufferFromRawAccountData,
    rentEpoch: number()
  });
  /**
   * @internal
   */

  const KeyedAccountInfoResult = type({
    pubkey: PublicKeyFromString,
    account: AccountInfoResult
  });
  const ParsedOrRawAccountData = coerce(union([instance(buffer.Buffer), ParsedAccountDataResult]), union([RawAccountDataResult, ParsedAccountDataResult]), value => {
    if (Array.isArray(value)) {
      return create(value, BufferFromRawAccountData);
    } else {
      return value;
    }
  });
  /**
   * @internal
   */

  const ParsedAccountInfoResult = type({
    executable: boolean(),
    owner: PublicKeyFromString,
    lamports: number(),
    data: ParsedOrRawAccountData,
    rentEpoch: number()
  });
  const KeyedParsedAccountInfoResult = type({
    pubkey: PublicKeyFromString,
    account: ParsedAccountInfoResult
  });
  /**
   * @internal
   */

  const StakeActivationResult = type({
    state: union([literal('active'), literal('inactive'), literal('activating'), literal('deactivating')]),
    active: number(),
    inactive: number()
  });
  /**
   * Expected JSON RPC response for the "getConfirmedSignaturesForAddress2" message
   */

  const GetConfirmedSignaturesForAddress2RpcResult = jsonRpcResult(array(type({
    signature: string(),
    slot: number(),
    err: TransactionErrorResult,
    memo: nullable(string()),
    blockTime: optional(nullable(number()))
  })));
  /***
   * Expected JSON RPC response for the "accountNotification" message
   */

  const AccountNotificationResult = type({
    subscription: number(),
    result: notificationResultAndContext(AccountInfoResult)
  });
  /**
   * @internal
   */

  const ProgramAccountInfoResult = type({
    pubkey: PublicKeyFromString,
    account: AccountInfoResult
  });
  /***
   * Expected JSON RPC response for the "programNotification" message
   */

  const ProgramAccountNotificationResult = type({
    subscription: number(),
    result: notificationResultAndContext(ProgramAccountInfoResult)
  });
  /**
   * @internal
   */

  const SlotInfoResult = type({
    parent: number(),
    slot: number(),
    root: number()
  });
  /**
   * Expected JSON RPC response for the "slotNotification" message
   */

  const SlotNotificationResult = type({
    subscription: number(),
    result: SlotInfoResult
  });
  /**
   * Expected JSON RPC response for the "signatureNotification" message
   */

  const SignatureNotificationResult = type({
    subscription: number(),
    result: notificationResultAndContext(union([SignatureStatusResult, SignatureReceivedResult]))
  });
  /**
   * Expected JSON RPC response for the "rootNotification" message
   */

  const RootNotificationResult = type({
    subscription: number(),
    result: number()
  });
  const ContactInfoResult = type({
    pubkey: string(),
    gossip: nullable(string()),
    tpu: nullable(string()),
    rpc: nullable(string()),
    version: nullable(string())
  });
  const VoteAccountInfoResult = type({
    votePubkey: string(),
    nodePubkey: string(),
    activatedStake: number(),
    epochVoteAccount: boolean(),
    epochCredits: array(tuple([number(), number(), number()])),
    commission: number(),
    lastVote: number(),
    rootSlot: nullable(number())
  });
  /**
   * Expected JSON RPC response for the "getVoteAccounts" message
   */

  const GetVoteAccounts = jsonRpcResult(type({
    current: array(VoteAccountInfoResult),
    delinquent: array(VoteAccountInfoResult)
  }));
  const ConfirmationStatus = union([literal('processed'), literal('confirmed'), literal('finalized')]);
  const SignatureStatusResponse = type({
    slot: number(),
    confirmations: nullable(number()),
    err: TransactionErrorResult,
    confirmationStatus: optional(ConfirmationStatus)
  });
  /**
   * Expected JSON RPC response for the "getSignatureStatuses" message
   */

  const GetSignatureStatusesRpcResult = jsonRpcResultAndContext(array(nullable(SignatureStatusResponse)));
  /**
   * Expected JSON RPC response for the "getMinimumBalanceForRentExemption" message
   */

  const GetMinimumBalanceForRentExemptionRpcResult = jsonRpcResult(number());
  /**
   * @internal
   */

  const ConfirmedTransactionResult = type({
    signatures: array(string()),
    message: type({
      accountKeys: array(string()),
      header: type({
        numRequiredSignatures: number(),
        numReadonlySignedAccounts: number(),
        numReadonlyUnsignedAccounts: number()
      }),
      instructions: array(type({
        accounts: array(number()),
        data: string(),
        programIdIndex: number()
      })),
      recentBlockhash: string()
    })
  });
  const TransactionFromConfirmed = coerce(instance(Transaction), ConfirmedTransactionResult, result => {
    const {
      message,
      signatures
    } = result;
    return Transaction.populate(new Message(message), signatures);
  });
  const ParsedInstructionResult = type({
    parsed: unknown(),
    program: string(),
    programId: PublicKeyFromString
  });
  const RawInstructionResult = type({
    accounts: array(PublicKeyFromString),
    data: string(),
    programId: PublicKeyFromString
  });
  const InstructionResult = union([RawInstructionResult, ParsedInstructionResult]);
  const UnknownInstructionResult = union([type({
    parsed: unknown(),
    program: string(),
    programId: string()
  }), type({
    accounts: array(string()),
    data: string(),
    programId: string()
  })]);
  const ParsedOrRawInstruction = coerce(InstructionResult, UnknownInstructionResult, value => {
    if ('accounts' in value) {
      return create(value, RawInstructionResult);
    } else {
      return create(value, ParsedInstructionResult);
    }
  });
  /**
   * @internal
   */

  const ParsedConfirmedTransactionResult = type({
    signatures: array(string()),
    message: type({
      accountKeys: array(type({
        pubkey: PublicKeyFromString,
        signer: boolean(),
        writable: boolean()
      })),
      instructions: array(ParsedOrRawInstruction),
      recentBlockhash: string()
    })
  });
  const TokenBalanceResult = type({
    accountIndex: number(),
    mint: string(),
    uiTokenAmount: TokenAmountResult
  });
  /**
   * @internal
   */

  const ConfirmedTransactionMetaResult = type({
    err: TransactionErrorResult,
    fee: number(),
    innerInstructions: optional(nullable(array(type({
      index: number(),
      instructions: array(type({
        accounts: array(number()),
        data: string(),
        programIdIndex: number()
      }))
    })))),
    preBalances: array(number()),
    postBalances: array(number()),
    logMessages: optional(nullable(array(string()))),
    preTokenBalances: optional(nullable(array(TokenBalanceResult))),
    postTokenBalances: optional(nullable(array(TokenBalanceResult)))
  });
  /**
   * @internal
   */

  const ParsedConfirmedTransactionMetaResult = type({
    err: TransactionErrorResult,
    fee: number(),
    innerInstructions: optional(nullable(array(type({
      index: number(),
      instructions: array(ParsedOrRawInstruction)
    })))),
    preBalances: array(number()),
    postBalances: array(number()),
    logMessages: optional(nullable(array(string()))),
    preTokenBalances: optional(nullable(array(TokenBalanceResult))),
    postTokenBalances: optional(nullable(array(TokenBalanceResult)))
  });
  /**
   * Expected JSON RPC response for the "getConfirmedBlock" message
   */

  const GetConfirmedBlockRpcResult = jsonRpcResult(nullable(type({
    blockhash: string(),
    previousBlockhash: string(),
    parentSlot: number(),
    transactions: array(type({
      transaction: TransactionFromConfirmed,
      meta: nullable(ConfirmedTransactionMetaResult)
    })),
    rewards: optional(array(type({
      pubkey: string(),
      lamports: number(),
      postBalance: nullable(number()),
      rewardType: nullable(string())
    }))),
    blockTime: nullable(number())
  })));
  /**
   * Expected JSON RPC response for the "getConfirmedBlockSignatures" message
   */

  const GetConfirmedBlockSignaturesRpcResult = jsonRpcResult(nullable(type({
    blockhash: string(),
    previousBlockhash: string(),
    parentSlot: number(),
    signatures: array(string()),
    blockTime: nullable(number())
  })));
  /**
   * Expected JSON RPC response for the "getConfirmedTransaction" message
   */

  const GetConfirmedTransactionRpcResult = jsonRpcResult(nullable(type({
    slot: number(),
    transaction: TransactionFromConfirmed,
    meta: ConfirmedTransactionMetaResult,
    blockTime: optional(nullable(number()))
  })));
  /**
   * Expected JSON RPC response for the "getConfirmedTransaction" message
   */

  const GetParsedConfirmedTransactionRpcResult = jsonRpcResult(nullable(type({
    slot: number(),
    transaction: ParsedConfirmedTransactionResult,
    meta: nullable(ParsedConfirmedTransactionMetaResult),
    blockTime: optional(nullable(number()))
  })));
  /**
   * Expected JSON RPC response for the "getRecentBlockhash" message
   */

  const GetRecentBlockhashAndContextRpcResult = jsonRpcResultAndContext(type({
    blockhash: string(),
    feeCalculator: type({
      lamportsPerSignature: number()
    })
  }));
  const PerfSampleResult = type({
    slot: number(),
    numTransactions: number(),
    numSlots: number(),
    samplePeriodSecs: number()
  });
  /*
   * Expected JSON RPC response for "getRecentPerformanceSamples" message
   */

  const GetRecentPerformanceSamplesRpcResult = jsonRpcResult(array(PerfSampleResult));
  /**
   * Expected JSON RPC response for the "getFeeCalculatorForBlockhash" message
   */

  const GetFeeCalculatorRpcResult = jsonRpcResultAndContext(nullable(type({
    feeCalculator: type({
      lamportsPerSignature: number()
    })
  })));
  /**
   * Expected JSON RPC response for the "requestAirdrop" message
   */

  const RequestAirdropRpcResult = jsonRpcResult(string());
  /**
   * Expected JSON RPC response for the "sendTransaction" message
   */

  const SendTransactionRpcResult = jsonRpcResult(string());
  /**
   * Information about the latest slot being processed by a node
   */

  /**
   * @internal
   */
  const LogsResult = type({
    err: TransactionErrorResult,
    logs: array(string()),
    signature: string()
  });
  /**
   * Logs result.
   */

  /**
   * Expected JSON RPC response for the "logsNotification" message.
   */
  const LogsNotificationResult = type({
    result: notificationResultAndContext(LogsResult),
    subscription: number()
  });
  /**
   * Filter for log subscriptions.
   */

  /**
   * A connection to a fullnode JSON RPC endpoint
   */
  class Connection {
    /** @internal */

    /** @internal */

    /** @internal */

    /** @internal */

    /** @internal */

    /** @internal */

    /** @internal */

    /** @internal */

    /** @internal */

    /** @internal */

    /** @internal */

    /** @internal */

    /** @internal */

    /** @internal */

    /** @internal */

    /** @internal */

    /** @internal */

    /** @internal */

    /** @internal */

    /** @internal */

    /** @internal */

    /** @internal */

    /** @internal */

    /** @internal */

    /**
     * Establish a JSON RPC connection
     *
     * @param endpoint URL to the fullnode JSON RPC endpoint
     * @param commitment optional default commitment level
     */
    constructor(endpoint, commitment) {
      _defineProperty(this, "_commitment", void 0);

      _defineProperty(this, "_rpcEndpoint", void 0);

      _defineProperty(this, "_rpcClient", void 0);

      _defineProperty(this, "_rpcRequest", void 0);

      _defineProperty(this, "_rpcBatchRequest", void 0);

      _defineProperty(this, "_rpcWebSocket", void 0);

      _defineProperty(this, "_rpcWebSocketConnected", false);

      _defineProperty(this, "_rpcWebSocketHeartbeat", null);

      _defineProperty(this, "_rpcWebSocketIdleTimeout", null);

      _defineProperty(this, "_disableBlockhashCaching", false);

      _defineProperty(this, "_pollingBlockhash", false);

      _defineProperty(this, "_blockhashInfo", void 0);

      _defineProperty(this, "_accountChangeSubscriptionCounter", 0);

      _defineProperty(this, "_accountChangeSubscriptions", {});

      _defineProperty(this, "_programAccountChangeSubscriptionCounter", 0);

      _defineProperty(this, "_programAccountChangeSubscriptions", {});

      _defineProperty(this, "_rootSubscriptionCounter", 0);

      _defineProperty(this, "_rootSubscriptions", {});

      _defineProperty(this, "_signatureSubscriptionCounter", 0);

      _defineProperty(this, "_signatureSubscriptions", {});

      _defineProperty(this, "_slotSubscriptionCounter", 0);

      _defineProperty(this, "_slotSubscriptions", {});

      _defineProperty(this, "_logsSubscriptionCounter", 0);

      _defineProperty(this, "_logsSubscriptions", {});

      this._rpcEndpoint = endpoint;
      let url = urlParse(endpoint);
      const useHttps = url.protocol === 'https:';
      this._rpcClient = createRpcClient(url.href);
      this._rpcRequest = createRpcRequest(this._rpcClient);
      this._rpcBatchRequest = createRpcBatchRequest(this._rpcClient);
      this._commitment = commitment;
      this._blockhashInfo = {
        recentBlockhash: null,
        lastFetch: 0,
        transactionSignatures: [],
        simulatedSignatures: []
      };
      url.protocol = useHttps ? 'wss:' : 'ws:';
      url.host = ''; // Only shift the port by +1 as a convention for ws(s) only if given endpoint
      // is explictly specifying the endpoint port (HTTP-based RPC), assuming
      // we're directly trying to connect to solana-validator's ws listening port.
      // When the endpoint omits the port, we're connecting to the protocol
      // default ports: http(80) or https(443) and it's assumed we're behind a reverse
      // proxy which manages WebSocket upgrade and backend port redirection.

      if (url.port !== null) {
        url.port = String(Number(url.port) + 1);
      }

      this._rpcWebSocket = new index_browser.Client(urlFormat(url), {
        autoconnect: false,
        max_reconnects: Infinity
      });

      this._rpcWebSocket.on('open', this._wsOnOpen.bind(this));

      this._rpcWebSocket.on('error', this._wsOnError.bind(this));

      this._rpcWebSocket.on('close', this._wsOnClose.bind(this));

      this._rpcWebSocket.on('accountNotification', this._wsOnAccountNotification.bind(this));

      this._rpcWebSocket.on('programNotification', this._wsOnProgramAccountNotification.bind(this));

      this._rpcWebSocket.on('slotNotification', this._wsOnSlotNotification.bind(this));

      this._rpcWebSocket.on('signatureNotification', this._wsOnSignatureNotification.bind(this));

      this._rpcWebSocket.on('rootNotification', this._wsOnRootNotification.bind(this));

      this._rpcWebSocket.on('logsNotification', this._wsOnLogsNotification.bind(this));
    }
    /**
     * The default commitment used for requests
     */


    get commitment() {
      return this._commitment;
    }
    /**
     * Fetch the balance for the specified public key, return with context
     */


    async getBalanceAndContext(publicKey, commitment) {
      const args = this._buildArgs([publicKey.toBase58()], commitment);

      const unsafeRes = await this._rpcRequest('getBalance', args);
      const res = create(unsafeRes, jsonRpcResultAndContext(number()));

      if ('error' in res) {
        throw new Error('failed to get balance for ' + publicKey.toBase58() + ': ' + res.error.message);
      }

      return res.result;
    }
    /**
     * Fetch the balance for the specified public key
     */


    async getBalance(publicKey, commitment) {
      return await this.getBalanceAndContext(publicKey, commitment).then(x => x.value).catch(e => {
        throw new Error('failed to get balance of account ' + publicKey.toBase58() + ': ' + e);
      });
    }
    /**
     * Fetch the estimated production time of a block
     */


    async getBlockTime(slot) {
      const unsafeRes = await this._rpcRequest('getBlockTime', [slot]);
      const res = create(unsafeRes, jsonRpcResult(nullable(number())));

      if ('error' in res) {
        throw new Error('failed to get block time for slot ' + slot + ': ' + res.error.message);
      }

      return res.result;
    }
    /**
     * Fetch the lowest slot that the node has information about in its ledger.
     * This value may increase over time if the node is configured to purge older ledger data
     */


    async getMinimumLedgerSlot() {
      const unsafeRes = await this._rpcRequest('minimumLedgerSlot', []);
      const res = create(unsafeRes, jsonRpcResult(number()));

      if ('error' in res) {
        throw new Error('failed to get minimum ledger slot: ' + res.error.message);
      }

      return res.result;
    }
    /**
     * Fetch the slot of the lowest confirmed block that has not been purged from the ledger
     */


    async getFirstAvailableBlock() {
      const unsafeRes = await this._rpcRequest('getFirstAvailableBlock', []);
      const res = create(unsafeRes, SlotRpcResult);

      if ('error' in res) {
        throw new Error('failed to get first available block: ' + res.error.message);
      }

      return res.result;
    }
    /**
     * Fetch information about the current supply
     */


    async getSupply(commitment) {
      const args = this._buildArgs([], commitment);

      const unsafeRes = await this._rpcRequest('getSupply', args);
      const res = create(unsafeRes, GetSupplyRpcResult);

      if ('error' in res) {
        throw new Error('failed to get supply: ' + res.error.message);
      }

      return res.result;
    }
    /**
     * Fetch the current supply of a token mint
     */


    async getTokenSupply(tokenMintAddress, commitment) {
      const args = this._buildArgs([tokenMintAddress.toBase58()], commitment);

      const unsafeRes = await this._rpcRequest('getTokenSupply', args);
      const res = create(unsafeRes, jsonRpcResultAndContext(TokenAmountResult));

      if ('error' in res) {
        throw new Error('failed to get token supply: ' + res.error.message);
      }

      return res.result;
    }
    /**
     * Fetch the current balance of a token account
     */


    async getTokenAccountBalance(tokenAddress, commitment) {
      const args = this._buildArgs([tokenAddress.toBase58()], commitment);

      const unsafeRes = await this._rpcRequest('getTokenAccountBalance', args);
      const res = create(unsafeRes, jsonRpcResultAndContext(TokenAmountResult));

      if ('error' in res) {
        throw new Error('failed to get token account balance: ' + res.error.message);
      }

      return res.result;
    }
    /**
     * Fetch all the token accounts owned by the specified account
     *
     * @return {Promise<RpcResponseAndContext<Array<{pubkey: PublicKey, account: AccountInfo<Buffer>}>>>}
     */


    async getTokenAccountsByOwner(ownerAddress, filter, commitment) {
      let _args = [ownerAddress.toBase58()];

      if ('mint' in filter) {
        _args.push({
          mint: filter.mint.toBase58()
        });
      } else {
        _args.push({
          programId: filter.programId.toBase58()
        });
      }

      const args = this._buildArgs(_args, commitment, 'base64');

      const unsafeRes = await this._rpcRequest('getTokenAccountsByOwner', args);
      const res = create(unsafeRes, GetTokenAccountsByOwner);

      if ('error' in res) {
        throw new Error('failed to get token accounts owned by account ' + ownerAddress.toBase58() + ': ' + res.error.message);
      }

      return res.result;
    }
    /**
     * Fetch parsed token accounts owned by the specified account
     *
     * @return {Promise<RpcResponseAndContext<Array<{pubkey: PublicKey, account: AccountInfo<ParsedAccountData>}>>>}
     */


    async getParsedTokenAccountsByOwner(ownerAddress, filter, commitment) {
      let _args = [ownerAddress.toBase58()];

      if ('mint' in filter) {
        _args.push({
          mint: filter.mint.toBase58()
        });
      } else {
        _args.push({
          programId: filter.programId.toBase58()
        });
      }

      const args = this._buildArgs(_args, commitment, 'jsonParsed');

      const unsafeRes = await this._rpcRequest('getTokenAccountsByOwner', args);
      const res = create(unsafeRes, GetParsedTokenAccountsByOwner);

      if ('error' in res) {
        throw new Error('failed to get token accounts owned by account ' + ownerAddress.toBase58() + ': ' + res.error.message);
      }

      return res.result;
    }
    /**
     * Fetch the 20 largest accounts with their current balances
     */


    async getLargestAccounts(config) {
      const arg = { ...config,
        commitment: config && config.commitment || this.commitment
      };
      const args = arg.filter || arg.commitment ? [arg] : [];
      const unsafeRes = await this._rpcRequest('getLargestAccounts', args);
      const res = create(unsafeRes, GetLargestAccountsRpcResult);

      if ('error' in res) {
        throw new Error('failed to get largest accounts: ' + res.error.message);
      }

      return res.result;
    }
    /**
     * Fetch the 20 largest token accounts with their current balances
     * for a given mint.
     */


    async getTokenLargestAccounts(mintAddress, commitment) {
      const args = this._buildArgs([mintAddress.toBase58()], commitment);

      const unsafeRes = await this._rpcRequest('getTokenLargestAccounts', args);
      const res = create(unsafeRes, GetTokenLargestAccountsResult);

      if ('error' in res) {
        throw new Error('failed to get token largest accounts: ' + res.error.message);
      }

      return res.result;
    }
    /**
     * Fetch all the account info for the specified public key, return with context
     */


    async getAccountInfoAndContext(publicKey, commitment) {
      const args = this._buildArgs([publicKey.toBase58()], commitment, 'base64');

      const unsafeRes = await this._rpcRequest('getAccountInfo', args);
      const res = create(unsafeRes, jsonRpcResultAndContext(nullable(AccountInfoResult)));

      if ('error' in res) {
        throw new Error('failed to get info about account ' + publicKey.toBase58() + ': ' + res.error.message);
      }

      return res.result;
    }
    /**
     * Fetch parsed account info for the specified public key
     */


    async getParsedAccountInfo(publicKey, commitment) {
      const args = this._buildArgs([publicKey.toBase58()], commitment, 'jsonParsed');

      const unsafeRes = await this._rpcRequest('getAccountInfo', args);
      const res = create(unsafeRes, jsonRpcResultAndContext(nullable(ParsedAccountInfoResult)));

      if ('error' in res) {
        throw new Error('failed to get info about account ' + publicKey.toBase58() + ': ' + res.error.message);
      }

      return res.result;
    }
    /**
     * Fetch all the account info for the specified public key
     */


    async getAccountInfo(publicKey, commitment) {
      try {
        const res = await this.getAccountInfoAndContext(publicKey, commitment);
        return res.value;
      } catch (e) {
        throw new Error('failed to get info about account ' + publicKey.toBase58() + ': ' + e);
      }
    }
    /**
     * Returns epoch activation information for a stake account that has been delegated
     */


    async getStakeActivation(publicKey, commitment, epoch) {
      const args = this._buildArgs([publicKey.toBase58()], commitment, undefined, epoch !== undefined ? {
        epoch
      } : undefined);

      const unsafeRes = await this._rpcRequest('getStakeActivation', args);
      const res = create(unsafeRes, jsonRpcResult(StakeActivationResult));

      if ('error' in res) {
        throw new Error("failed to get Stake Activation ".concat(publicKey.toBase58(), ": ").concat(res.error.message));
      }

      return res.result;
    }
    /**
     * Fetch all the accounts owned by the specified program id
     *
     * @return {Promise<Array<{pubkey: PublicKey, account: AccountInfo<Buffer>}>>}
     */


    async getProgramAccounts(programId, configOrCommitment) {
      const extra = {};
      let commitment;
      let encoding;

      if (configOrCommitment) {
        if (typeof configOrCommitment === 'string') {
          commitment = configOrCommitment;
        } else {
          commitment = configOrCommitment.commitment;
          encoding = configOrCommitment.encoding;

          if (configOrCommitment.dataSlice) {
            extra.dataSlice = configOrCommitment.dataSlice;
          }

          if (configOrCommitment.filters) {
            extra.filters = configOrCommitment.filters;
          }
        }
      }

      const args = this._buildArgs([programId.toBase58()], commitment, encoding || 'base64', extra);

      const unsafeRes = await this._rpcRequest('getProgramAccounts', args);
      const res = create(unsafeRes, jsonRpcResult(array(KeyedAccountInfoResult)));

      if ('error' in res) {
        throw new Error('failed to get accounts owned by program ' + programId.toBase58() + ': ' + res.error.message);
      }

      return res.result;
    }
    /**
     * Fetch and parse all the accounts owned by the specified program id
     *
     * @return {Promise<Array<{pubkey: PublicKey, account: AccountInfo<Buffer | ParsedAccountData>}>>}
     */


    async getParsedProgramAccounts(programId, configOrCommitment) {
      const extra = {};
      let commitment;

      if (configOrCommitment) {
        if (typeof configOrCommitment === 'string') {
          commitment = configOrCommitment;
        } else {
          commitment = configOrCommitment.commitment;

          if (configOrCommitment.filters) {
            extra.filters = configOrCommitment.filters;
          }
        }
      }

      const args = this._buildArgs([programId.toBase58()], commitment, 'jsonParsed', extra);

      const unsafeRes = await this._rpcRequest('getProgramAccounts', args);
      const res = create(unsafeRes, jsonRpcResult(array(KeyedParsedAccountInfoResult)));

      if ('error' in res) {
        throw new Error('failed to get accounts owned by program ' + programId.toBase58() + ': ' + res.error.message);
      }

      return res.result;
    }
    /**
     * Confirm the transaction identified by the specified signature.
     */


    async confirmTransaction(signature, commitment) {
      let decodedSignature;

      try {
        decodedSignature = bs58.decode(signature);
      } catch (err) {
        throw new Error('signature must be base58 encoded: ' + signature);
      }

      assert$d(decodedSignature.length === 64, 'signature has invalid length');
      const start = Date.now();
      const subscriptionCommitment = commitment || this.commitment;
      let subscriptionId;
      let response = null;
      const confirmPromise = new Promise((resolve, reject) => {
        try {
          subscriptionId = this.onSignature(signature, (result, context) => {
            subscriptionId = undefined;
            response = {
              context,
              value: result
            };
            resolve(null);
          }, subscriptionCommitment);
        } catch (err) {
          reject(err);
        }
      });
      let timeoutMs = 60 * 1000;

      switch (subscriptionCommitment) {
        case 'processed':
        case 'recent':
        case 'single':
        case 'confirmed':
        case 'singleGossip':
          {
            timeoutMs = 30 * 1000;
            break;
          }
      }

      try {
        await promiseTimeout(confirmPromise, timeoutMs);
      } finally {
        if (subscriptionId) {
          this.removeSignatureListener(subscriptionId);
        }
      }

      if (response === null) {
        const duration = (Date.now() - start) / 1000;
        throw new Error("Transaction was not confirmed in ".concat(duration.toFixed(2), " seconds. It is unknown if it succeeded or failed. Check signature ").concat(signature, " using the Solana Explorer or CLI tools."));
      }

      return response;
    }
    /**
     * Return the list of nodes that are currently participating in the cluster
     */


    async getClusterNodes() {
      const unsafeRes = await this._rpcRequest('getClusterNodes', []);
      const res = create(unsafeRes, jsonRpcResult(array(ContactInfoResult)));

      if ('error' in res) {
        throw new Error('failed to get cluster nodes: ' + res.error.message);
      }

      return res.result;
    }
    /**
     * Return the list of nodes that are currently participating in the cluster
     */


    async getVoteAccounts(commitment) {
      const args = this._buildArgs([], commitment);

      const unsafeRes = await this._rpcRequest('getVoteAccounts', args);
      const res = create(unsafeRes, GetVoteAccounts);

      if ('error' in res) {
        throw new Error('failed to get vote accounts: ' + res.error.message);
      }

      return res.result;
    }
    /**
     * Fetch the current slot that the node is processing
     */


    async getSlot(commitment) {
      const args = this._buildArgs([], commitment);

      const unsafeRes = await this._rpcRequest('getSlot', args);
      const res = create(unsafeRes, jsonRpcResult(number()));

      if ('error' in res) {
        throw new Error('failed to get slot: ' + res.error.message);
      }

      return res.result;
    }
    /**
     * Fetch the current slot leader of the cluster
     */


    async getSlotLeader(commitment) {
      const args = this._buildArgs([], commitment);

      const unsafeRes = await this._rpcRequest('getSlotLeader', args);
      const res = create(unsafeRes, jsonRpcResult(string()));

      if ('error' in res) {
        throw new Error('failed to get slot leader: ' + res.error.message);
      }

      return res.result;
    }
    /**
     * Fetch the current status of a signature
     */


    async getSignatureStatus(signature, config) {
      const {
        context,
        value: values
      } = await this.getSignatureStatuses([signature], config);
      assert$d(values.length === 1);
      const value = values[0];
      return {
        context,
        value
      };
    }
    /**
     * Fetch the current statuses of a batch of signatures
     */


    async getSignatureStatuses(signatures, config) {
      const params = [signatures];

      if (config) {
        params.push(config);
      }

      const unsafeRes = await this._rpcRequest('getSignatureStatuses', params);
      const res = create(unsafeRes, GetSignatureStatusesRpcResult);

      if ('error' in res) {
        throw new Error('failed to get signature status: ' + res.error.message);
      }

      return res.result;
    }
    /**
     * Fetch the current transaction count of the cluster
     */


    async getTransactionCount(commitment) {
      const args = this._buildArgs([], commitment);

      const unsafeRes = await this._rpcRequest('getTransactionCount', args);
      const res = create(unsafeRes, jsonRpcResult(number()));

      if ('error' in res) {
        throw new Error('failed to get transaction count: ' + res.error.message);
      }

      return res.result;
    }
    /**
     * Fetch the current total currency supply of the cluster in lamports
     * @deprecated Deprecated since v1.2.8. Use `Connection.getSupply()` instead.
     */


    async getTotalSupply(commitment) {
      const args = this._buildArgs([], commitment);

      const unsafeRes = await this._rpcRequest('getSupply', args);
      const res = create(unsafeRes, GetSupplyRpcResult);

      if ('error' in res) {
        throw new Error('failed to get total supply: ' + res.error.message);
      }

      return res.result.value.total;
    }
    /**
     * Fetch the cluster InflationGovernor parameters
     */


    async getInflationGovernor(commitment) {
      const args = this._buildArgs([], commitment);

      const unsafeRes = await this._rpcRequest('getInflationGovernor', args);
      const res = create(unsafeRes, GetInflationGovernorRpcResult);

      if ('error' in res) {
        throw new Error('failed to get inflation: ' + res.error.message);
      }

      return res.result;
    }
    /**
     * Fetch the Epoch Info parameters
     */


    async getEpochInfo(commitment) {
      const args = this._buildArgs([], commitment);

      const unsafeRes = await this._rpcRequest('getEpochInfo', args);
      const res = create(unsafeRes, GetEpochInfoRpcResult);

      if ('error' in res) {
        throw new Error('failed to get epoch info: ' + res.error.message);
      }

      return res.result;
    }
    /**
     * Fetch the Epoch Schedule parameters
     */


    async getEpochSchedule() {
      const unsafeRes = await this._rpcRequest('getEpochSchedule', []);
      const res = create(unsafeRes, GetEpochScheduleRpcResult);

      if ('error' in res) {
        throw new Error('failed to get epoch schedule: ' + res.error.message);
      }

      return res.result;
    }
    /**
     * Fetch the leader schedule for the current epoch
     * @return {Promise<RpcResponseAndContext<LeaderSchedule>>}
     */


    async getLeaderSchedule() {
      const unsafeRes = await this._rpcRequest('getLeaderSchedule', []);
      const res = create(unsafeRes, GetLeaderScheduleRpcResult);

      if ('error' in res) {
        throw new Error('failed to get leader schedule: ' + res.error.message);
      }

      return res.result;
    }
    /**
     * Fetch the minimum balance needed to exempt an account of `dataLength`
     * size from rent
     */


    async getMinimumBalanceForRentExemption(dataLength, commitment) {
      const args = this._buildArgs([dataLength], commitment);

      const unsafeRes = await this._rpcRequest('getMinimumBalanceForRentExemption', args);
      const res = create(unsafeRes, GetMinimumBalanceForRentExemptionRpcResult);

      if ('error' in res) {
        console.warn('Unable to fetch minimum balance for rent exemption');
        return 0;
      }

      return res.result;
    }
    /**
     * Fetch a recent blockhash from the cluster, return with context
     * @return {Promise<RpcResponseAndContext<{blockhash: Blockhash, feeCalculator: FeeCalculator}>>}
     */


    async getRecentBlockhashAndContext(commitment) {
      const args = this._buildArgs([], commitment);

      const unsafeRes = await this._rpcRequest('getRecentBlockhash', args);
      const res = create(unsafeRes, GetRecentBlockhashAndContextRpcResult);

      if ('error' in res) {
        throw new Error('failed to get recent blockhash: ' + res.error.message);
      }

      return res.result;
    }
    /**
     * Fetch recent performance samples
     * @return {Promise<Array<PerfSample>>}
     */


    async getRecentPerformanceSamples(limit) {
      const args = this._buildArgs(limit ? [limit] : []);

      const unsafeRes = await this._rpcRequest('getRecentPerformanceSamples', args);
      const res = create(unsafeRes, GetRecentPerformanceSamplesRpcResult);

      if ('error' in res) {
        throw new Error('failed to get recent performance samples: ' + res.error.message);
      }

      return res.result;
    }
    /**
     * Fetch the fee calculator for a recent blockhash from the cluster, return with context
     */


    async getFeeCalculatorForBlockhash(blockhash, commitment) {
      const args = this._buildArgs([blockhash], commitment);

      const unsafeRes = await this._rpcRequest('getFeeCalculatorForBlockhash', args);
      const res = create(unsafeRes, GetFeeCalculatorRpcResult);

      if ('error' in res) {
        throw new Error('failed to get fee calculator: ' + res.error.message);
      }

      const {
        context,
        value
      } = res.result;
      return {
        context,
        value: value !== null ? value.feeCalculator : null
      };
    }
    /**
     * Fetch a recent blockhash from the cluster
     * @return {Promise<{blockhash: Blockhash, feeCalculator: FeeCalculator}>}
     */


    async getRecentBlockhash(commitment) {
      try {
        const res = await this.getRecentBlockhashAndContext(commitment);
        return res.value;
      } catch (e) {
        throw new Error('failed to get recent blockhash: ' + e);
      }
    }
    /**
     * Fetch the node version
     */


    async getVersion() {
      const unsafeRes = await this._rpcRequest('getVersion', []);
      const res = create(unsafeRes, jsonRpcResult(VersionResult));

      if ('error' in res) {
        throw new Error('failed to get version: ' + res.error.message);
      }

      return res.result;
    }
    /**
     * Fetch a list of Transactions and transaction statuses from the cluster
     * for a confirmed block
     */


    async getConfirmedBlock(slot) {
      const unsafeRes = await this._rpcRequest('getConfirmedBlock', [slot]);
      const res = create(unsafeRes, GetConfirmedBlockRpcResult);

      if ('error' in res) {
        throw new Error('failed to get confirmed block: ' + res.error.message);
      }

      const result = res.result;

      if (!result) {
        throw new Error('Confirmed block ' + slot + ' not found');
      }

      return result;
    }
    /**
     * Fetch a list of Signatures from the cluster for a confirmed block, excluding rewards
     */


    async getConfirmedBlockSignatures(slot) {
      const unsafeRes = await this._rpcRequest('getConfirmedBlock', [slot, {
        transactionDetails: 'signatures',
        rewards: false
      }]);
      const res = create(unsafeRes, GetConfirmedBlockSignaturesRpcResult);

      if ('error' in res) {
        throw new Error('failed to get confirmed block: ' + res.error.message);
      }

      const result = res.result;

      if (!result) {
        throw new Error('Confirmed block ' + slot + ' not found');
      }

      return result;
    }
    /**
     * Fetch a transaction details for a confirmed transaction
     */


    async getConfirmedTransaction(signature) {
      const unsafeRes = await this._rpcRequest('getConfirmedTransaction', [signature]);
      const res = create(unsafeRes, GetConfirmedTransactionRpcResult);

      if ('error' in res) {
        throw new Error('failed to get confirmed transaction: ' + res.error.message);
      }

      return res.result;
    }
    /**
     * Fetch parsed transaction details for a confirmed transaction
     */


    async getParsedConfirmedTransaction(signature) {
      const unsafeRes = await this._rpcRequest('getConfirmedTransaction', [signature, 'jsonParsed']);
      const res = create(unsafeRes, GetParsedConfirmedTransactionRpcResult);

      if ('error' in res) {
        throw new Error('failed to get confirmed transaction: ' + res.error.message);
      }

      return res.result;
    }
    /**
     * Fetch parsed transaction details for a batch of confirmed transactions
     */


    async getParsedConfirmedTransactions(signatures) {
      const batch = signatures.map(signature => {
        return {
          methodName: 'getConfirmedTransaction',
          args: [signature, 'jsonParsed']
        };
      });
      const unsafeRes = await this._rpcBatchRequest(batch);
      const res = unsafeRes.map(unsafeRes => {
        const res = create(unsafeRes, GetParsedConfirmedTransactionRpcResult);

        if ('error' in res) {
          throw new Error('failed to get confirmed transactions: ' + res.error.message);
        }

        return res.result;
      });
      return res;
    }
    /**
     * Fetch a list of all the confirmed signatures for transactions involving an address
     * within a specified slot range. Max range allowed is 10,000 slots.
     * @deprecated Deprecated since v1.3. Use `Connection.getConfirmedSignaturesForAddress2()` instead.
     *
     * @param address queried address
     * @param startSlot start slot, inclusive
     * @param endSlot end slot, inclusive
     */


    async getConfirmedSignaturesForAddress(address, startSlot, endSlot) {
      let options = {};
      let firstAvailableBlock = await this.getFirstAvailableBlock();

      while (!('until' in options)) {
        startSlot--;

        if (startSlot <= 0 || startSlot < firstAvailableBlock) {
          break;
        }

        try {
          const block = await this.getConfirmedBlockSignatures(startSlot);

          if (block.signatures.length > 0) {
            options.until = block.signatures[block.signatures.length - 1].toString();
          }
        } catch (err) {
          if (err.message.includes('skipped')) {
            continue;
          } else {
            throw err;
          }
        }
      }

      let highestConfirmedRoot = await this.getSlot('finalized');

      while (!('before' in options)) {
        endSlot++;

        if (endSlot > highestConfirmedRoot) {
          break;
        }

        try {
          const block = await this.getConfirmedBlockSignatures(endSlot);

          if (block.signatures.length > 0) {
            options.before = block.signatures[block.signatures.length - 1].toString();
          }
        } catch (err) {
          if (err.message.includes('skipped')) {
            continue;
          } else {
            throw err;
          }
        }
      }

      const confirmedSignatureInfo = await this.getConfirmedSignaturesForAddress2(address, options);
      return confirmedSignatureInfo.map(info => info.signature);
    }
    /**
     * Returns confirmed signatures for transactions involving an
     * address backwards in time from the provided signature or most recent confirmed block
     *
     *
     * @param address queried address
     * @param options
     */


    async getConfirmedSignaturesForAddress2(address, options) {
      const unsafeRes = await this._rpcRequest('getConfirmedSignaturesForAddress2', [address.toBase58(), options]);
      const res = create(unsafeRes, GetConfirmedSignaturesForAddress2RpcResult);

      if ('error' in res) {
        throw new Error('failed to get confirmed signatures for address: ' + res.error.message);
      }

      return res.result;
    }
    /**
     * Fetch the contents of a Nonce account from the cluster, return with context
     */


    async getNonceAndContext(nonceAccount, commitment) {
      const {
        context,
        value: accountInfo
      } = await this.getAccountInfoAndContext(nonceAccount, commitment);
      let value = null;

      if (accountInfo !== null) {
        value = NonceAccount.fromAccountData(accountInfo.data);
      }

      return {
        context,
        value
      };
    }
    /**
     * Fetch the contents of a Nonce account from the cluster
     */


    async getNonce(nonceAccount, commitment) {
      return await this.getNonceAndContext(nonceAccount, commitment).then(x => x.value).catch(e => {
        throw new Error('failed to get nonce for account ' + nonceAccount.toBase58() + ': ' + e);
      });
    }
    /**
     * Request an allocation of lamports to the specified account
     */


    async requestAirdrop(to, amount) {
      const unsafeRes = await this._rpcRequest('requestAirdrop', [to.toBase58(), amount]);
      const res = create(unsafeRes, RequestAirdropRpcResult);

      if ('error' in res) {
        throw new Error('airdrop to ' + to.toBase58() + ' failed: ' + res.error.message);
      }

      return res.result;
    }
    /**
     * @internal
     */


    async _recentBlockhash(disableCache) {
      if (!disableCache) {
        // Wait for polling to finish
        while (this._pollingBlockhash) {
          await sleep(100);
        }

        const timeSinceFetch = Date.now() - this._blockhashInfo.lastFetch;

        const expired = timeSinceFetch >= BLOCKHASH_CACHE_TIMEOUT_MS;

        if (this._blockhashInfo.recentBlockhash !== null && !expired) {
          return this._blockhashInfo.recentBlockhash;
        }
      }

      return await this._pollNewBlockhash();
    }
    /**
     * @internal
     */


    async _pollNewBlockhash() {
      this._pollingBlockhash = true;

      try {
        const startTime = Date.now();

        for (let i = 0; i < 50; i++) {
          const {
            blockhash
          } = await this.getRecentBlockhash('finalized');

          if (this._blockhashInfo.recentBlockhash != blockhash) {
            this._blockhashInfo = {
              recentBlockhash: blockhash,
              lastFetch: Date.now(),
              transactionSignatures: [],
              simulatedSignatures: []
            };
            return blockhash;
          } // Sleep for approximately half a slot


          await sleep(MS_PER_SLOT / 2);
        }

        throw new Error("Unable to obtain a new blockhash after ".concat(Date.now() - startTime, "ms"));
      } finally {
        this._pollingBlockhash = false;
      }
    }
    /**
     * Simulate a transaction
     */


    async simulateTransaction(transaction, signers) {
      if (transaction.nonceInfo && signers) {
        transaction.sign(...signers);
      } else {
        let disableCache = this._disableBlockhashCaching;

        for (;;) {
          transaction.recentBlockhash = await this._recentBlockhash(disableCache);
          if (!signers) break;
          transaction.sign(...signers);

          if (!transaction.signature) {
            throw new Error('!signature'); // should never happen
          }

          const signature = transaction.signature.toString('base64');

          if (!this._blockhashInfo.simulatedSignatures.includes(signature) && !this._blockhashInfo.transactionSignatures.includes(signature)) {
            // The signature of this transaction has not been seen before with the
            // current recentBlockhash, all done. Let's break
            this._blockhashInfo.simulatedSignatures.push(signature);

            break;
          } else {
            // This transaction would be treated as duplicate (its derived signature
            // matched to one of already recorded signatures).
            // So, we must fetch a new blockhash for a different signature by disabling
            // our cache not to wait for the cache expiration (BLOCKHASH_CACHE_TIMEOUT_MS).
            disableCache = true;
          }
        }
      }

      const signData = transaction.serializeMessage();

      const wireTransaction = transaction._serialize(signData);

      const encodedTransaction = wireTransaction.toString('base64');
      const config = {
        encoding: 'base64',
        commitment: this.commitment
      };

      if (signers) {
        config.sigVerify = true;
      }

      const args = [encodedTransaction, config];
      const unsafeRes = await this._rpcRequest('simulateTransaction', args);
      const res = create(unsafeRes, SimulatedTransactionResponseStruct);

      if ('error' in res) {
        throw new Error('failed to simulate transaction: ' + res.error.message);
      }

      return res.result;
    }
    /**
     * Sign and send a transaction
     */


    async sendTransaction(transaction, signers, options) {
      if (transaction.nonceInfo) {
        transaction.sign(...signers);
      } else {
        let disableCache = this._disableBlockhashCaching;

        for (;;) {
          transaction.recentBlockhash = await this._recentBlockhash(disableCache);
          transaction.sign(...signers);

          if (!transaction.signature) {
            throw new Error('!signature'); // should never happen
          }

          const signature = transaction.signature.toString('base64');

          if (!this._blockhashInfo.transactionSignatures.includes(signature)) {
            // The signature of this transaction has not been seen before with the
            // current recentBlockhash, all done. Let's break
            this._blockhashInfo.transactionSignatures.push(signature);

            break;
          } else {
            // This transaction would be treated as duplicate (its derived signature
            // matched to one of already recorded signatures).
            // So, we must fetch a new blockhash for a different signature by disabling
            // our cache not to wait for the cache expiration (BLOCKHASH_CACHE_TIMEOUT_MS).
            disableCache = true;
          }
        }
      }

      const wireTransaction = transaction.serialize();
      return await this.sendRawTransaction(wireTransaction, options);
    }
    /**
     * Send a transaction that has already been signed and serialized into the
     * wire format
     */


    async sendRawTransaction(rawTransaction, options) {
      const encodedTransaction = toBuffer(rawTransaction).toString('base64');
      const result = await this.sendEncodedTransaction(encodedTransaction, options);
      return result;
    }
    /**
     * Send a transaction that has already been signed, serialized into the
     * wire format, and encoded as a base64 string
     */


    async sendEncodedTransaction(encodedTransaction, options) {
      const config = {
        encoding: 'base64'
      };
      const skipPreflight = options && options.skipPreflight;
      const preflightCommitment = options && options.preflightCommitment || this.commitment;

      if (skipPreflight) {
        config.skipPreflight = skipPreflight;
      }

      if (preflightCommitment) {
        config.preflightCommitment = preflightCommitment;
      }

      const args = [encodedTransaction, config];
      const unsafeRes = await this._rpcRequest('sendTransaction', args);
      const res = create(unsafeRes, SendTransactionRpcResult);

      if ('error' in res) {
        if ('data' in res.error) {
          const logs = res.error.data.logs;

          if (logs && Array.isArray(logs)) {
            const traceIndent = '\n    ';
            const logTrace = traceIndent + logs.join(traceIndent);
            console.error(res.error.message, logTrace);
          }
        }

        throw new Error('failed to send transaction: ' + res.error.message);
      }

      return res.result;
    }
    /**
     * @internal
     */


    _wsOnOpen() {
      this._rpcWebSocketConnected = true;
      this._rpcWebSocketHeartbeat = setInterval(() => {
        // Ping server every 5s to prevent idle timeouts
        this._rpcWebSocket.notify('ping').catch(() => {});
      }, 5000);

      this._updateSubscriptions();
    }
    /**
     * @internal
     */


    _wsOnError(err) {
      console.error('ws error:', err.message);
    }
    /**
     * @internal
     */


    _wsOnClose(code) {
      if (this._rpcWebSocketHeartbeat) {
        clearInterval(this._rpcWebSocketHeartbeat);
        this._rpcWebSocketHeartbeat = null;
      }

      if (code === 1000) {
        // explicit close, check if any subscriptions have been made since close
        this._updateSubscriptions();

        return;
      } // implicit close, prepare subscriptions for auto-reconnect


      this._resetSubscriptions();
    }
    /**
     * @internal
     */


    async _subscribe(sub, rpcMethod, rpcArgs) {
      if (sub.subscriptionId == null) {
        sub.subscriptionId = 'subscribing';

        try {
          const id = await this._rpcWebSocket.call(rpcMethod, rpcArgs);

          if (typeof id === 'number' && sub.subscriptionId === 'subscribing') {
            // eslint-disable-next-line require-atomic-updates
            sub.subscriptionId = id;
          }
        } catch (err) {
          if (sub.subscriptionId === 'subscribing') {
            // eslint-disable-next-line require-atomic-updates
            sub.subscriptionId = null;
          }

          console.error("".concat(rpcMethod, " error for argument"), rpcArgs, err.message);
        }
      }
    }
    /**
     * @internal
     */


    async _unsubscribe(sub, rpcMethod) {
      const subscriptionId = sub.subscriptionId;

      if (subscriptionId != null && typeof subscriptionId != 'string') {
        const unsubscribeId = subscriptionId;

        try {
          await this._rpcWebSocket.call(rpcMethod, [unsubscribeId]);
        } catch (err) {
          console.error("".concat(rpcMethod, " error:"), err.message);
        }
      }
    }
    /**
     * @internal
     */


    _resetSubscriptions() {
      Object.values(this._accountChangeSubscriptions).forEach(s => s.subscriptionId = null);
      Object.values(this._programAccountChangeSubscriptions).forEach(s => s.subscriptionId = null);
      Object.values(this._signatureSubscriptions).forEach(s => s.subscriptionId = null);
      Object.values(this._slotSubscriptions).forEach(s => s.subscriptionId = null);
      Object.values(this._rootSubscriptions).forEach(s => s.subscriptionId = null);
    }
    /**
     * @internal
     */


    _updateSubscriptions() {
      const accountKeys = Object.keys(this._accountChangeSubscriptions).map(Number);
      const programKeys = Object.keys(this._programAccountChangeSubscriptions).map(Number);
      const slotKeys = Object.keys(this._slotSubscriptions).map(Number);
      const signatureKeys = Object.keys(this._signatureSubscriptions).map(Number);
      const rootKeys = Object.keys(this._rootSubscriptions).map(Number);
      const logsKeys = Object.keys(this._logsSubscriptions).map(Number);

      if (accountKeys.length === 0 && programKeys.length === 0 && slotKeys.length === 0 && signatureKeys.length === 0 && rootKeys.length === 0 && logsKeys.length === 0) {
        if (this._rpcWebSocketConnected) {
          this._rpcWebSocketConnected = false;
          this._rpcWebSocketIdleTimeout = setTimeout(() => {
            this._rpcWebSocketIdleTimeout = null;

            this._rpcWebSocket.close();
          }, 500);
        }

        return;
      }

      if (this._rpcWebSocketIdleTimeout !== null) {
        clearTimeout(this._rpcWebSocketIdleTimeout);
        this._rpcWebSocketIdleTimeout = null;
        this._rpcWebSocketConnected = true;
      }

      if (!this._rpcWebSocketConnected) {
        this._rpcWebSocket.connect();

        return;
      }

      for (let id of accountKeys) {
        const sub = this._accountChangeSubscriptions[id];

        this._subscribe(sub, 'accountSubscribe', this._buildArgs([sub.publicKey], sub.commitment, 'base64'));
      }

      for (let id of programKeys) {
        const sub = this._programAccountChangeSubscriptions[id];

        this._subscribe(sub, 'programSubscribe', this._buildArgs([sub.programId], sub.commitment, 'base64'));
      }

      for (let id of slotKeys) {
        const sub = this._slotSubscriptions[id];

        this._subscribe(sub, 'slotSubscribe', []);
      }

      for (let id of signatureKeys) {
        const sub = this._signatureSubscriptions[id];
        const args = [sub.signature];
        if (sub.options) args.push(sub.options);

        this._subscribe(sub, 'signatureSubscribe', args);
      }

      for (let id of rootKeys) {
        const sub = this._rootSubscriptions[id];

        this._subscribe(sub, 'rootSubscribe', []);
      }

      for (let id of logsKeys) {
        const sub = this._logsSubscriptions[id];
        let filter;

        if (typeof sub.filter === 'object') {
          filter = {
            mentions: [sub.filter.toString()]
          };
        } else {
          filter = sub.filter;
        }

        this._subscribe(sub, 'logsSubscribe', this._buildArgs([filter], sub.commitment));
      }
    }
    /**
     * @internal
     */


    _wsOnAccountNotification(notification) {
      const res = create(notification, AccountNotificationResult);

      for (const sub of Object.values(this._accountChangeSubscriptions)) {
        if (sub.subscriptionId === res.subscription) {
          sub.callback(res.result.value, res.result.context);
          return;
        }
      }
    }
    /**
     * Register a callback to be invoked whenever the specified account changes
     *
     * @param publicKey Public key of the account to monitor
     * @param callback Function to invoke whenever the account is changed
     * @param commitment Specify the commitment level account changes must reach before notification
     * @return subscription id
     */


    onAccountChange(publicKey, callback, commitment) {
      const id = ++this._accountChangeSubscriptionCounter;
      this._accountChangeSubscriptions[id] = {
        publicKey: publicKey.toBase58(),
        callback,
        commitment,
        subscriptionId: null
      };

      this._updateSubscriptions();

      return id;
    }
    /**
     * Deregister an account notification callback
     *
     * @param id subscription id to deregister
     */


    async removeAccountChangeListener(id) {
      if (this._accountChangeSubscriptions[id]) {
        const subInfo = this._accountChangeSubscriptions[id];
        delete this._accountChangeSubscriptions[id];
        await this._unsubscribe(subInfo, 'accountUnsubscribe');

        this._updateSubscriptions();
      } else {
        throw new Error("Unknown account change id: ".concat(id));
      }
    }
    /**
     * @internal
     */


    _wsOnProgramAccountNotification(notification) {
      const res = create(notification, ProgramAccountNotificationResult);

      for (const sub of Object.values(this._programAccountChangeSubscriptions)) {
        if (sub.subscriptionId === res.subscription) {
          const {
            value,
            context
          } = res.result;
          sub.callback({
            accountId: value.pubkey,
            accountInfo: value.account
          }, context);
          return;
        }
      }
    }
    /**
     * Register a callback to be invoked whenever accounts owned by the
     * specified program change
     *
     * @param programId Public key of the program to monitor
     * @param callback Function to invoke whenever the account is changed
     * @param commitment Specify the commitment level account changes must reach before notification
     * @return subscription id
     */


    onProgramAccountChange(programId, callback, commitment) {
      const id = ++this._programAccountChangeSubscriptionCounter;
      this._programAccountChangeSubscriptions[id] = {
        programId: programId.toBase58(),
        callback,
        commitment,
        subscriptionId: null
      };

      this._updateSubscriptions();

      return id;
    }
    /**
     * Deregister an account notification callback
     *
     * @param id subscription id to deregister
     */


    async removeProgramAccountChangeListener(id) {
      if (this._programAccountChangeSubscriptions[id]) {
        const subInfo = this._programAccountChangeSubscriptions[id];
        delete this._programAccountChangeSubscriptions[id];
        await this._unsubscribe(subInfo, 'programUnsubscribe');

        this._updateSubscriptions();
      } else {
        throw new Error("Unknown program account change id: ".concat(id));
      }
    }
    /**
     * Registers a callback to be invoked whenever logs are emitted.
     */


    onLogs(filter, callback, commitment) {
      const id = ++this._logsSubscriptionCounter;
      this._logsSubscriptions[id] = {
        filter,
        callback,
        commitment,
        subscriptionId: null
      };

      this._updateSubscriptions();

      return id;
    }
    /**
     * Deregister a logs callback.
     *
     * @param id subscription id to deregister.
     */


    async removeOnLogsListener(id) {
      if (!this._logsSubscriptions[id]) {
        throw new Error("Unknown logs id: ".concat(id));
      }

      const subInfo = this._logsSubscriptions[id];
      delete this._logsSubscriptions[id];
      await this._unsubscribe(subInfo, 'logsUnsubscribe');

      this._updateSubscriptions();
    }
    /**
     * @internal
     */


    _wsOnLogsNotification(notification) {
      const res = create(notification, LogsNotificationResult);
      const keys = Object.keys(this._logsSubscriptions).map(Number);

      for (let id of keys) {
        const sub = this._logsSubscriptions[id];

        if (sub.subscriptionId === res.subscription) {
          sub.callback(res.result.value, res.result.context);
          return;
        }
      }
    }
    /**
     * @internal
     */


    _wsOnSlotNotification(notification) {
      const res = create(notification, SlotNotificationResult);

      for (const sub of Object.values(this._slotSubscriptions)) {
        if (sub.subscriptionId === res.subscription) {
          sub.callback(res.result);
          return;
        }
      }
    }
    /**
     * Register a callback to be invoked upon slot changes
     *
     * @param callback Function to invoke whenever the slot changes
     * @return subscription id
     */


    onSlotChange(callback) {
      const id = ++this._slotSubscriptionCounter;
      this._slotSubscriptions[id] = {
        callback,
        subscriptionId: null
      };

      this._updateSubscriptions();

      return id;
    }
    /**
     * Deregister a slot notification callback
     *
     * @param id subscription id to deregister
     */


    async removeSlotChangeListener(id) {
      if (this._slotSubscriptions[id]) {
        const subInfo = this._slotSubscriptions[id];
        delete this._slotSubscriptions[id];
        await this._unsubscribe(subInfo, 'slotUnsubscribe');

        this._updateSubscriptions();
      } else {
        throw new Error("Unknown slot change id: ".concat(id));
      }
    }
    /**
     * @internal
     */


    _buildArgs(args, override, encoding, extra) {
      const commitment = override || this._commitment;

      if (commitment || encoding || extra) {
        let options = {};

        if (encoding) {
          options.encoding = encoding;
        }

        if (commitment) {
          options.commitment = commitment;
        }

        if (extra) {
          options = Object.assign(options, extra);
        }

        args.push(options);
      }

      return args;
    }
    /**
     * @internal
     */


    _wsOnSignatureNotification(notification) {
      const res = create(notification, SignatureNotificationResult);

      for (const [id, sub] of Object.entries(this._signatureSubscriptions)) {
        if (sub.subscriptionId === res.subscription) {
          if (res.result.value === 'receivedSignature') {
            sub.callback({
              type: 'received'
            }, res.result.context);
          } else {
            // Signatures subscriptions are auto-removed by the RPC service so
            // no need to explicitly send an unsubscribe message
            delete this._signatureSubscriptions[Number(id)];

            this._updateSubscriptions();

            sub.callback({
              type: 'status',
              result: res.result.value
            }, res.result.context);
          }

          return;
        }
      }
    }
    /**
     * Register a callback to be invoked upon signature updates
     *
     * @param signature Transaction signature string in base 58
     * @param callback Function to invoke on signature notifications
     * @param commitment Specify the commitment level signature must reach before notification
     * @return subscription id
     */


    onSignature(signature, callback, commitment) {
      const id = ++this._signatureSubscriptionCounter;
      this._signatureSubscriptions[id] = {
        signature,
        callback: (notification, context) => {
          if (notification.type === 'status') {
            callback(notification.result, context);
          }
        },
        options: {
          commitment
        },
        subscriptionId: null
      };

      this._updateSubscriptions();

      return id;
    }
    /**
     * Register a callback to be invoked when a transaction is
     * received and/or processed.
     *
     * @param signature Transaction signature string in base 58
     * @param callback Function to invoke on signature notifications
     * @param options Enable received notifications and set the commitment
     *   level that signature must reach before notification
     * @return subscription id
     */


    onSignatureWithOptions(signature, callback, options) {
      const id = ++this._signatureSubscriptionCounter;
      this._signatureSubscriptions[id] = {
        signature,
        callback,
        options,
        subscriptionId: null
      };

      this._updateSubscriptions();

      return id;
    }
    /**
     * Deregister a signature notification callback
     *
     * @param id subscription id to deregister
     */


    async removeSignatureListener(id) {
      if (this._signatureSubscriptions[id]) {
        const subInfo = this._signatureSubscriptions[id];
        delete this._signatureSubscriptions[id];
        await this._unsubscribe(subInfo, 'signatureUnsubscribe');

        this._updateSubscriptions();
      } else {
        throw new Error("Unknown signature result id: ".concat(id));
      }
    }
    /**
     * @internal
     */


    _wsOnRootNotification(notification) {
      const res = create(notification, RootNotificationResult);

      for (const sub of Object.values(this._rootSubscriptions)) {
        if (sub.subscriptionId === res.subscription) {
          sub.callback(res.result);
          return;
        }
      }
    }
    /**
     * Register a callback to be invoked upon root changes
     *
     * @param callback Function to invoke whenever the root changes
     * @return subscription id
     */


    onRootChange(callback) {
      const id = ++this._rootSubscriptionCounter;
      this._rootSubscriptions[id] = {
        callback,
        subscriptionId: null
      };

      this._updateSubscriptions();

      return id;
    }
    /**
     * Deregister a root notification callback
     *
     * @param id subscription id to deregister
     */


    async removeRootChangeListener(id) {
      if (this._rootSubscriptions[id]) {
        const subInfo = this._rootSubscriptions[id];
        delete this._rootSubscriptions[id];
        await this._unsubscribe(subInfo, 'rootUnsubscribe');

        this._updateSubscriptions();
      } else {
        throw new Error("Unknown root change id: ".concat(id));
      }
    }

  }

  /**
   * Address of the stake config account which configures the rate
   * of stake warmup and cooldown as well as the slashing penalty.
   */

  const STAKE_CONFIG_ID = new PublicKey('StakeConfig11111111111111111111111111111111');
  /**
   * Stake account authority info
   */

  class Authorized {
    /** stake authority */

    /** withdraw authority */

    /**
     * Create a new Authorized object
     * @param staker the stake authority
     * @param withdrawer the withdraw authority
     */
    constructor(staker, withdrawer) {
      _defineProperty(this, "staker", void 0);

      _defineProperty(this, "withdrawer", void 0);

      this.staker = staker;
      this.withdrawer = withdrawer;
    }

  }
  /**
   * Stake account lockup info
   */

  class Lockup {
    /** Unix timestamp of lockup expiration */

    /** Epoch of lockup expiration */

    /** Lockup custodian authority */

    /**
     * Create a new Lockup object
     */
    constructor(unixTimestamp, epoch, custodian) {
      _defineProperty(this, "unixTimestamp", void 0);

      _defineProperty(this, "epoch", void 0);

      _defineProperty(this, "custodian", void 0);

      this.unixTimestamp = unixTimestamp;
      this.epoch = epoch;
      this.custodian = custodian;
    }

  }
  /**
   * Create stake account transaction params
   */

  /**
   * Stake Instruction class
   */
  class StakeInstruction {
    /**
     * @internal
     */
    constructor() {}
    /**
     * Decode a stake instruction and retrieve the instruction type.
     */


    static decodeInstructionType(instruction) {
      this.checkProgramId(instruction.programId);
      const instructionTypeLayout = u32('instruction');
      const typeIndex = instructionTypeLayout.decode(instruction.data);
      let type;

      for (const [ixType, layout] of Object.entries(STAKE_INSTRUCTION_LAYOUTS)) {
        if (layout.index == typeIndex) {
          type = ixType;
          break;
        }
      }

      if (!type) {
        throw new Error('Instruction type incorrect; not a StakeInstruction');
      }

      return type;
    }
    /**
     * Decode a initialize stake instruction and retrieve the instruction params.
     */


    static decodeInitialize(instruction) {
      this.checkProgramId(instruction.programId);
      this.checkKeyLength(instruction.keys, 2);
      const {
        authorized,
        lockup
      } = decodeData(STAKE_INSTRUCTION_LAYOUTS.Initialize, instruction.data);
      return {
        stakePubkey: instruction.keys[0].pubkey,
        authorized: new Authorized(new PublicKey(authorized.staker), new PublicKey(authorized.withdrawer)),
        lockup: new Lockup(lockup.unixTimestamp, lockup.epoch, new PublicKey(lockup.custodian))
      };
    }
    /**
     * Decode a delegate stake instruction and retrieve the instruction params.
     */


    static decodeDelegate(instruction) {
      this.checkProgramId(instruction.programId);
      this.checkKeyLength(instruction.keys, 6);
      decodeData(STAKE_INSTRUCTION_LAYOUTS.Delegate, instruction.data);
      return {
        stakePubkey: instruction.keys[0].pubkey,
        votePubkey: instruction.keys[1].pubkey,
        authorizedPubkey: instruction.keys[5].pubkey
      };
    }
    /**
     * Decode an authorize stake instruction and retrieve the instruction params.
     */


    static decodeAuthorize(instruction) {
      this.checkProgramId(instruction.programId);
      this.checkKeyLength(instruction.keys, 3);
      const {
        newAuthorized,
        stakeAuthorizationType
      } = decodeData(STAKE_INSTRUCTION_LAYOUTS.Authorize, instruction.data);
      const o = {
        stakePubkey: instruction.keys[0].pubkey,
        authorizedPubkey: instruction.keys[2].pubkey,
        newAuthorizedPubkey: new PublicKey(newAuthorized),
        stakeAuthorizationType: {
          index: stakeAuthorizationType
        }
      };

      if (instruction.keys.length > 3) {
        o.custodianPubkey = instruction.keys[3].pubkey;
      }

      return o;
    }
    /**
     * Decode an authorize-with-seed stake instruction and retrieve the instruction params.
     */


    static decodeAuthorizeWithSeed(instruction) {
      this.checkProgramId(instruction.programId);
      this.checkKeyLength(instruction.keys, 2);
      const {
        newAuthorized,
        stakeAuthorizationType,
        authoritySeed,
        authorityOwner
      } = decodeData(STAKE_INSTRUCTION_LAYOUTS.AuthorizeWithSeed, instruction.data);
      const o = {
        stakePubkey: instruction.keys[0].pubkey,
        authorityBase: instruction.keys[1].pubkey,
        authoritySeed: authoritySeed,
        authorityOwner: new PublicKey(authorityOwner),
        newAuthorizedPubkey: new PublicKey(newAuthorized),
        stakeAuthorizationType: {
          index: stakeAuthorizationType
        }
      };

      if (instruction.keys.length > 3) {
        o.custodianPubkey = instruction.keys[3].pubkey;
      }

      return o;
    }
    /**
     * Decode a split stake instruction and retrieve the instruction params.
     */


    static decodeSplit(instruction) {
      this.checkProgramId(instruction.programId);
      this.checkKeyLength(instruction.keys, 3);
      const {
        lamports
      } = decodeData(STAKE_INSTRUCTION_LAYOUTS.Split, instruction.data);
      return {
        stakePubkey: instruction.keys[0].pubkey,
        splitStakePubkey: instruction.keys[1].pubkey,
        authorizedPubkey: instruction.keys[2].pubkey,
        lamports
      };
    }
    /**
     * Decode a withdraw stake instruction and retrieve the instruction params.
     */


    static decodeWithdraw(instruction) {
      this.checkProgramId(instruction.programId);
      this.checkKeyLength(instruction.keys, 5);
      const {
        lamports
      } = decodeData(STAKE_INSTRUCTION_LAYOUTS.Withdraw, instruction.data);
      const o = {
        stakePubkey: instruction.keys[0].pubkey,
        toPubkey: instruction.keys[1].pubkey,
        authorizedPubkey: instruction.keys[4].pubkey,
        lamports
      };

      if (instruction.keys.length > 5) {
        o.custodianPubkey = instruction.keys[5].pubkey;
      }

      return o;
    }
    /**
     * Decode a deactivate stake instruction and retrieve the instruction params.
     */


    static decodeDeactivate(instruction) {
      this.checkProgramId(instruction.programId);
      this.checkKeyLength(instruction.keys, 3);
      decodeData(STAKE_INSTRUCTION_LAYOUTS.Deactivate, instruction.data);
      return {
        stakePubkey: instruction.keys[0].pubkey,
        authorizedPubkey: instruction.keys[2].pubkey
      };
    }
    /**
     * @internal
     */


    static checkProgramId(programId) {
      if (!programId.equals(StakeProgram.programId)) {
        throw new Error('invalid instruction; programId is not StakeProgram');
      }
    }
    /**
     * @internal
     */


    static checkKeyLength(keys, expectedLength) {
      if (keys.length < expectedLength) {
        throw new Error("invalid instruction; found ".concat(keys.length, " keys, expected at least ").concat(expectedLength));
      }
    }

  }
  /**
   * An enumeration of valid StakeInstructionType's
   */

  /**
   * An enumeration of valid stake InstructionType's
   * @internal
   */
  const STAKE_INSTRUCTION_LAYOUTS = Object.freeze({
    Initialize: {
      index: 0,
      layout: struct([u32('instruction'), authorized(), lockup()])
    },
    Authorize: {
      index: 1,
      layout: struct([u32('instruction'), publicKey('newAuthorized'), u32('stakeAuthorizationType')])
    },
    Delegate: {
      index: 2,
      layout: struct([u32('instruction')])
    },
    Split: {
      index: 3,
      layout: struct([u32('instruction'), ns64('lamports')])
    },
    Withdraw: {
      index: 4,
      layout: struct([u32('instruction'), ns64('lamports')])
    },
    Deactivate: {
      index: 5,
      layout: struct([u32('instruction')])
    },
    AuthorizeWithSeed: {
      index: 8,
      layout: struct([u32('instruction'), publicKey('newAuthorized'), u32('stakeAuthorizationType'), rustString('authoritySeed'), publicKey('authorityOwner')])
    }
  });
  /**
   * Stake authorization type
   */

  /**
   * An enumeration of valid StakeAuthorizationLayout's
   */
  const StakeAuthorizationLayout = Object.freeze({
    Staker: {
      index: 0
    },
    Withdrawer: {
      index: 1
    }
  });
  /**
   * Factory class for transactions to interact with the Stake program
   */

  class StakeProgram {
    /**
     * @internal
     */
    constructor() {}
    /**
     * Public key that identifies the Stake program
     */


    /**
     * Generate an Initialize instruction to add to a Stake Create transaction
     */
    static initialize(params) {
      const {
        stakePubkey,
        authorized,
        lockup
      } = params;
      const type = STAKE_INSTRUCTION_LAYOUTS.Initialize;
      const data = encodeData(type, {
        authorized: {
          staker: toBuffer(authorized.staker.toBuffer()),
          withdrawer: toBuffer(authorized.withdrawer.toBuffer())
        },
        lockup: {
          unixTimestamp: lockup.unixTimestamp,
          epoch: lockup.epoch,
          custodian: toBuffer(lockup.custodian.toBuffer())
        }
      });
      const instructionData = {
        keys: [{
          pubkey: stakePubkey,
          isSigner: false,
          isWritable: true
        }, {
          pubkey: SYSVAR_RENT_PUBKEY,
          isSigner: false,
          isWritable: false
        }],
        programId: this.programId,
        data
      };
      return new TransactionInstruction(instructionData);
    }
    /**
     * Generate a Transaction that creates a new Stake account at
     *   an address generated with `from`, a seed, and the Stake programId
     */


    static createAccountWithSeed(params) {
      const transaction = new Transaction();
      transaction.add(SystemProgram.createAccountWithSeed({
        fromPubkey: params.fromPubkey,
        newAccountPubkey: params.stakePubkey,
        basePubkey: params.basePubkey,
        seed: params.seed,
        lamports: params.lamports,
        space: this.space,
        programId: this.programId
      }));
      const {
        stakePubkey,
        authorized,
        lockup
      } = params;
      return transaction.add(this.initialize({
        stakePubkey,
        authorized,
        lockup
      }));
    }
    /**
     * Generate a Transaction that creates a new Stake account
     */


    static createAccount(params) {
      const transaction = new Transaction();
      transaction.add(SystemProgram.createAccount({
        fromPubkey: params.fromPubkey,
        newAccountPubkey: params.stakePubkey,
        lamports: params.lamports,
        space: this.space,
        programId: this.programId
      }));
      const {
        stakePubkey,
        authorized,
        lockup
      } = params;
      return transaction.add(this.initialize({
        stakePubkey,
        authorized,
        lockup
      }));
    }
    /**
     * Generate a Transaction that delegates Stake tokens to a validator
     * Vote PublicKey. This transaction can also be used to redelegate Stake
     * to a new validator Vote PublicKey.
     */


    static delegate(params) {
      const {
        stakePubkey,
        authorizedPubkey,
        votePubkey
      } = params;
      const type = STAKE_INSTRUCTION_LAYOUTS.Delegate;
      const data = encodeData(type);
      return new Transaction().add({
        keys: [{
          pubkey: stakePubkey,
          isSigner: false,
          isWritable: true
        }, {
          pubkey: votePubkey,
          isSigner: false,
          isWritable: false
        }, {
          pubkey: SYSVAR_CLOCK_PUBKEY,
          isSigner: false,
          isWritable: false
        }, {
          pubkey: SYSVAR_STAKE_HISTORY_PUBKEY,
          isSigner: false,
          isWritable: false
        }, {
          pubkey: STAKE_CONFIG_ID,
          isSigner: false,
          isWritable: false
        }, {
          pubkey: authorizedPubkey,
          isSigner: true,
          isWritable: false
        }],
        programId: this.programId,
        data
      });
    }
    /**
     * Generate a Transaction that authorizes a new PublicKey as Staker
     * or Withdrawer on the Stake account.
     */


    static authorize(params) {
      const {
        stakePubkey,
        authorizedPubkey,
        newAuthorizedPubkey,
        stakeAuthorizationType,
        custodianPubkey
      } = params;
      const type = STAKE_INSTRUCTION_LAYOUTS.Authorize;
      const data = encodeData(type, {
        newAuthorized: toBuffer(newAuthorizedPubkey.toBuffer()),
        stakeAuthorizationType: stakeAuthorizationType.index
      });
      const keys = [{
        pubkey: stakePubkey,
        isSigner: false,
        isWritable: true
      }, {
        pubkey: SYSVAR_CLOCK_PUBKEY,
        isSigner: false,
        isWritable: true
      }, {
        pubkey: authorizedPubkey,
        isSigner: true,
        isWritable: false
      }];

      if (custodianPubkey) {
        keys.push({
          pubkey: custodianPubkey,
          isSigner: false,
          isWritable: false
        });
      }

      return new Transaction().add({
        keys,
        programId: this.programId,
        data
      });
    }
    /**
     * Generate a Transaction that authorizes a new PublicKey as Staker
     * or Withdrawer on the Stake account.
     */


    static authorizeWithSeed(params) {
      const {
        stakePubkey,
        authorityBase,
        authoritySeed,
        authorityOwner,
        newAuthorizedPubkey,
        stakeAuthorizationType,
        custodianPubkey
      } = params;
      const type = STAKE_INSTRUCTION_LAYOUTS.AuthorizeWithSeed;
      const data = encodeData(type, {
        newAuthorized: toBuffer(newAuthorizedPubkey.toBuffer()),
        stakeAuthorizationType: stakeAuthorizationType.index,
        authoritySeed: authoritySeed,
        authorityOwner: toBuffer(authorityOwner.toBuffer())
      });
      const keys = [{
        pubkey: stakePubkey,
        isSigner: false,
        isWritable: true
      }, {
        pubkey: authorityBase,
        isSigner: true,
        isWritable: false
      }, {
        pubkey: SYSVAR_CLOCK_PUBKEY,
        isSigner: false,
        isWritable: false
      }];

      if (custodianPubkey) {
        keys.push({
          pubkey: custodianPubkey,
          isSigner: false,
          isWritable: false
        });
      }

      return new Transaction().add({
        keys,
        programId: this.programId,
        data
      });
    }
    /**
     * Generate a Transaction that splits Stake tokens into another stake account
     */


    static split(params) {
      const {
        stakePubkey,
        authorizedPubkey,
        splitStakePubkey,
        lamports
      } = params;
      const transaction = new Transaction();
      transaction.add(SystemProgram.createAccount({
        fromPubkey: authorizedPubkey,
        newAccountPubkey: splitStakePubkey,
        lamports: 0,
        space: this.space,
        programId: this.programId
      }));
      const type = STAKE_INSTRUCTION_LAYOUTS.Split;
      const data = encodeData(type, {
        lamports
      });
      return transaction.add({
        keys: [{
          pubkey: stakePubkey,
          isSigner: false,
          isWritable: true
        }, {
          pubkey: splitStakePubkey,
          isSigner: false,
          isWritable: true
        }, {
          pubkey: authorizedPubkey,
          isSigner: true,
          isWritable: false
        }],
        programId: this.programId,
        data
      });
    }
    /**
     * Generate a Transaction that withdraws deactivated Stake tokens.
     */


    static withdraw(params) {
      const {
        stakePubkey,
        authorizedPubkey,
        toPubkey,
        lamports,
        custodianPubkey
      } = params;
      const type = STAKE_INSTRUCTION_LAYOUTS.Withdraw;
      const data = encodeData(type, {
        lamports
      });
      const keys = [{
        pubkey: stakePubkey,
        isSigner: false,
        isWritable: true
      }, {
        pubkey: toPubkey,
        isSigner: false,
        isWritable: true
      }, {
        pubkey: SYSVAR_CLOCK_PUBKEY,
        isSigner: false,
        isWritable: false
      }, {
        pubkey: SYSVAR_STAKE_HISTORY_PUBKEY,
        isSigner: false,
        isWritable: false
      }, {
        pubkey: authorizedPubkey,
        isSigner: true,
        isWritable: false
      }];

      if (custodianPubkey) {
        keys.push({
          pubkey: custodianPubkey,
          isSigner: false,
          isWritable: false
        });
      }

      return new Transaction().add({
        keys,
        programId: this.programId,
        data
      });
    }
    /**
     * Generate a Transaction that deactivates Stake tokens.
     */


    static deactivate(params) {
      const {
        stakePubkey,
        authorizedPubkey
      } = params;
      const type = STAKE_INSTRUCTION_LAYOUTS.Deactivate;
      const data = encodeData(type);
      return new Transaction().add({
        keys: [{
          pubkey: stakePubkey,
          isSigner: false,
          isWritable: true
        }, {
          pubkey: SYSVAR_CLOCK_PUBKEY,
          isSigner: false,
          isWritable: false
        }, {
          pubkey: authorizedPubkey,
          isSigner: true,
          isWritable: false
        }],
        programId: this.programId,
        data
      });
    }

  }

  _defineProperty(StakeProgram, "programId", new PublicKey('Stake11111111111111111111111111111111111111'));

  _defineProperty(StakeProgram, "space", 200);

  const errors = {
    IMPOSSIBLE_CASE: 'Impossible case. Please create issue.',
    TWEAK_ADD:
      'The tweak was out of range or the resulted private key is invalid',
    TWEAK_MUL: 'The tweak was out of range or equal to zero',
    CONTEXT_RANDOMIZE_UNKNOW: 'Unknow error on context randomization',
    SECKEY_INVALID: 'Private Key is invalid',
    PUBKEY_PARSE: 'Public Key could not be parsed',
    PUBKEY_SERIALIZE: 'Public Key serialization error',
    PUBKEY_COMBINE: 'The sum of the public keys is not valid',
    SIG_PARSE: 'Signature could not be parsed',
    SIGN: 'The nonce generation function failed, or the private key was invalid',
    RECOVER: 'Public key could not be recover',
    ECDH: 'Scalar was invalid (zero or overflow)'
  };

  function assert$a (cond, msg) {
    if (!cond) throw new Error(msg)
  }

  function isUint8Array (name, value, length) {
    assert$a(value instanceof Uint8Array, `Expected ${name} to be an Uint8Array`);

    if (length !== undefined) {
      if (Array.isArray(length)) {
        const numbers = length.join(', ');
        const msg = `Expected ${name} to be an Uint8Array with length [${numbers}]`;
        assert$a(length.includes(value.length), msg);
      } else {
        const msg = `Expected ${name} to be an Uint8Array with length ${length}`;
        assert$a(value.length === length, msg);
      }
    }
  }

  function isCompressed (value) {
    assert$a(toTypeString(value) === 'Boolean', 'Expected compressed to be a Boolean');
  }

  function getAssertedOutput (output = (len) => new Uint8Array(len), length) {
    if (typeof output === 'function') output = output(length);
    isUint8Array('output', output, length);
    return output
  }

  function toTypeString (value) {
    return Object.prototype.toString.call(value).slice(8, -1)
  }

  var lib = (secp256k1) => {
    return {
      contextRandomize (seed) {
        assert$a(
          seed === null || seed instanceof Uint8Array,
          'Expected seed to be an Uint8Array or null'
        );
        if (seed !== null) isUint8Array('seed', seed, 32);

        switch (secp256k1.contextRandomize(seed)) {
          case 1:
            throw new Error(errors.CONTEXT_RANDOMIZE_UNKNOW)
        }
      },

      privateKeyVerify (seckey) {
        isUint8Array('private key', seckey, 32);

        return secp256k1.privateKeyVerify(seckey) === 0
      },

      privateKeyNegate (seckey) {
        isUint8Array('private key', seckey, 32);

        switch (secp256k1.privateKeyNegate(seckey)) {
          case 0:
            return seckey
          case 1:
            throw new Error(errors.IMPOSSIBLE_CASE)
        }
      },

      privateKeyTweakAdd (seckey, tweak) {
        isUint8Array('private key', seckey, 32);
        isUint8Array('tweak', tweak, 32);

        switch (secp256k1.privateKeyTweakAdd(seckey, tweak)) {
          case 0:
            return seckey
          case 1:
            throw new Error(errors.TWEAK_ADD)
        }
      },

      privateKeyTweakMul (seckey, tweak) {
        isUint8Array('private key', seckey, 32);
        isUint8Array('tweak', tweak, 32);

        switch (secp256k1.privateKeyTweakMul(seckey, tweak)) {
          case 0:
            return seckey
          case 1:
            throw new Error(errors.TWEAK_MUL)
        }
      },

      publicKeyVerify (pubkey) {
        isUint8Array('public key', pubkey, [33, 65]);

        return secp256k1.publicKeyVerify(pubkey) === 0
      },

      publicKeyCreate (seckey, compressed = true, output) {
        isUint8Array('private key', seckey, 32);
        isCompressed(compressed);
        output = getAssertedOutput(output, compressed ? 33 : 65);

        switch (secp256k1.publicKeyCreate(output, seckey)) {
          case 0:
            return output
          case 1:
            throw new Error(errors.SECKEY_INVALID)
          case 2:
            throw new Error(errors.PUBKEY_SERIALIZE)
        }
      },

      publicKeyConvert (pubkey, compressed = true, output) {
        isUint8Array('public key', pubkey, [33, 65]);
        isCompressed(compressed);
        output = getAssertedOutput(output, compressed ? 33 : 65);

        switch (secp256k1.publicKeyConvert(output, pubkey)) {
          case 0:
            return output
          case 1:
            throw new Error(errors.PUBKEY_PARSE)
          case 2:
            throw new Error(errors.PUBKEY_SERIALIZE)
        }
      },

      publicKeyNegate (pubkey, compressed = true, output) {
        isUint8Array('public key', pubkey, [33, 65]);
        isCompressed(compressed);
        output = getAssertedOutput(output, compressed ? 33 : 65);

        switch (secp256k1.publicKeyNegate(output, pubkey)) {
          case 0:
            return output
          case 1:
            throw new Error(errors.PUBKEY_PARSE)
          case 2:
            throw new Error(errors.IMPOSSIBLE_CASE)
          case 3:
            throw new Error(errors.PUBKEY_SERIALIZE)
        }
      },

      publicKeyCombine (pubkeys, compressed = true, output) {
        assert$a(Array.isArray(pubkeys), 'Expected public keys to be an Array');
        assert$a(pubkeys.length > 0, 'Expected public keys array will have more than zero items');
        for (const pubkey of pubkeys) {
          isUint8Array('public key', pubkey, [33, 65]);
        }
        isCompressed(compressed);
        output = getAssertedOutput(output, compressed ? 33 : 65);

        switch (secp256k1.publicKeyCombine(output, pubkeys)) {
          case 0:
            return output
          case 1:
            throw new Error(errors.PUBKEY_PARSE)
          case 2:
            throw new Error(errors.PUBKEY_COMBINE)
          case 3:
            throw new Error(errors.PUBKEY_SERIALIZE)
        }
      },

      publicKeyTweakAdd (pubkey, tweak, compressed = true, output) {
        isUint8Array('public key', pubkey, [33, 65]);
        isUint8Array('tweak', tweak, 32);
        isCompressed(compressed);
        output = getAssertedOutput(output, compressed ? 33 : 65);

        switch (secp256k1.publicKeyTweakAdd(output, pubkey, tweak)) {
          case 0:
            return output
          case 1:
            throw new Error(errors.PUBKEY_PARSE)
          case 2:
            throw new Error(errors.TWEAK_ADD)
        }
      },

      publicKeyTweakMul (pubkey, tweak, compressed = true, output) {
        isUint8Array('public key', pubkey, [33, 65]);
        isUint8Array('tweak', tweak, 32);
        isCompressed(compressed);
        output = getAssertedOutput(output, compressed ? 33 : 65);

        switch (secp256k1.publicKeyTweakMul(output, pubkey, tweak)) {
          case 0:
            return output
          case 1:
            throw new Error(errors.PUBKEY_PARSE)
          case 2:
            throw new Error(errors.TWEAK_MUL)
        }
      },

      signatureNormalize (sig) {
        isUint8Array('signature', sig, 64);

        switch (secp256k1.signatureNormalize(sig)) {
          case 0:
            return sig
          case 1:
            throw new Error(errors.SIG_PARSE)
        }
      },

      signatureExport (sig, output) {
        isUint8Array('signature', sig, 64);
        output = getAssertedOutput(output, 72);

        const obj = { output, outputlen: 72 };
        switch (secp256k1.signatureExport(obj, sig)) {
          case 0:
            return output.slice(0, obj.outputlen)
          case 1:
            throw new Error(errors.SIG_PARSE)
          case 2:
            throw new Error(errors.IMPOSSIBLE_CASE)
        }
      },

      signatureImport (sig, output) {
        isUint8Array('signature', sig);
        output = getAssertedOutput(output, 64);

        switch (secp256k1.signatureImport(output, sig)) {
          case 0:
            return output
          case 1:
            throw new Error(errors.SIG_PARSE)
          case 2:
            throw new Error(errors.IMPOSSIBLE_CASE)
        }
      },

      ecdsaSign (msg32, seckey, options = {}, output) {
        isUint8Array('message', msg32, 32);
        isUint8Array('private key', seckey, 32);
        assert$a(toTypeString(options) === 'Object', 'Expected options to be an Object');
        if (options.data !== undefined) isUint8Array('options.data', options.data);
        if (options.noncefn !== undefined) assert$a(toTypeString(options.noncefn) === 'Function', 'Expected options.noncefn to be a Function');
        output = getAssertedOutput(output, 64);

        const obj = { signature: output, recid: null };
        switch (secp256k1.ecdsaSign(obj, msg32, seckey, options.data, options.noncefn)) {
          case 0:
            return obj
          case 1:
            throw new Error(errors.SIGN)
          case 2:
            throw new Error(errors.IMPOSSIBLE_CASE)
        }
      },

      ecdsaVerify (sig, msg32, pubkey) {
        isUint8Array('signature', sig, 64);
        isUint8Array('message', msg32, 32);
        isUint8Array('public key', pubkey, [33, 65]);

        switch (secp256k1.ecdsaVerify(sig, msg32, pubkey)) {
          case 0:
            return true
          case 3:
            return false
          case 1:
            throw new Error(errors.SIG_PARSE)
          case 2:
            throw new Error(errors.PUBKEY_PARSE)
        }
      },

      ecdsaRecover (sig, recid, msg32, compressed = true, output) {
        isUint8Array('signature', sig, 64);
        assert$a(
          toTypeString(recid) === 'Number' &&
            recid >= 0 &&
            recid <= 3,
          'Expected recovery id to be a Number within interval [0, 3]'
        );
        isUint8Array('message', msg32, 32);
        isCompressed(compressed);
        output = getAssertedOutput(output, compressed ? 33 : 65);

        switch (secp256k1.ecdsaRecover(output, sig, recid, msg32)) {
          case 0:
            return output
          case 1:
            throw new Error(errors.SIG_PARSE)
          case 2:
            throw new Error(errors.RECOVER)
          case 3:
            throw new Error(errors.IMPOSSIBLE_CASE)
        }
      },

      ecdh (pubkey, seckey, options = {}, output) {
        isUint8Array('public key', pubkey, [33, 65]);
        isUint8Array('private key', seckey, 32);
        assert$a(toTypeString(options) === 'Object', 'Expected options to be an Object');
        if (options.data !== undefined) isUint8Array('options.data', options.data);
        if (options.hashfn !== undefined) {
          assert$a(toTypeString(options.hashfn) === 'Function', 'Expected options.hashfn to be a Function');
          if (options.xbuf !== undefined) isUint8Array('options.xbuf', options.xbuf, 32);
          if (options.ybuf !== undefined) isUint8Array('options.ybuf', options.ybuf, 32);
          isUint8Array('output', output);
        } else {
          output = getAssertedOutput(output, 32);
        }

        switch (secp256k1.ecdh(output, pubkey, seckey, options.data, options.hashfn, options.xbuf, options.ybuf)) {
          case 0:
            return output
          case 1:
            throw new Error(errors.PUBKEY_PARSE)
          case 2:
            throw new Error(errors.ECDH)
        }
      }
    }
  };

  var name = "elliptic";
  var version = "6.5.4";
  var description = "EC cryptography";
  var main = "lib/elliptic.js";
  var files = [
  	"lib"
  ];
  var scripts = {
  	lint: "eslint lib test",
  	"lint:fix": "npm run lint -- --fix",
  	unit: "istanbul test _mocha --reporter=spec test/index.js",
  	test: "npm run lint && npm run unit",
  	version: "grunt dist && git add dist/"
  };
  var repository = {
  	type: "git",
  	url: "git@github.com:indutny/elliptic"
  };
  var keywords = [
  	"EC",
  	"Elliptic",
  	"curve",
  	"Cryptography"
  ];
  var author = "Fedor Indutny <fedor@indutny.com>";
  var license = "MIT";
  var bugs = {
  	url: "https://github.com/indutny/elliptic/issues"
  };
  var homepage = "https://github.com/indutny/elliptic";
  var devDependencies = {
  	brfs: "^2.0.2",
  	coveralls: "^3.1.0",
  	eslint: "^7.6.0",
  	grunt: "^1.2.1",
  	"grunt-browserify": "^5.3.0",
  	"grunt-cli": "^1.3.2",
  	"grunt-contrib-connect": "^3.0.0",
  	"grunt-contrib-copy": "^1.0.0",
  	"grunt-contrib-uglify": "^5.0.0",
  	"grunt-mocha-istanbul": "^5.0.2",
  	"grunt-saucelabs": "^9.0.1",
  	istanbul: "^0.4.5",
  	mocha: "^8.0.1"
  };
  var dependencies = {
  	"bn.js": "^4.11.9",
  	brorand: "^1.1.0",
  	"hash.js": "^1.0.0",
  	"hmac-drbg": "^1.0.1",
  	inherits: "^2.0.4",
  	"minimalistic-assert": "^1.0.1",
  	"minimalistic-crypto-utils": "^1.0.1"
  };
  var _resolved = "https://registry.npmjs.org/elliptic/-/elliptic-6.5.4.tgz";
  var _integrity = "sha512-iLhC6ULemrljPZb+QutR5TQGB+pdW6KGD5RSegS+8sorOZT+rdQFbsQFJgvN3eRqNALqJer4oQ16YvJHlU8hzQ==";
  var _from = "elliptic@6.5.4";
  var require$$0 = {
  	name: name,
  	version: version,
  	description: description,
  	main: main,
  	files: files,
  	scripts: scripts,
  	repository: repository,
  	keywords: keywords,
  	author: author,
  	license: license,
  	bugs: bugs,
  	homepage: homepage,
  	devDependencies: devDependencies,
  	dependencies: dependencies,
  	_resolved: _resolved,
  	_integrity: _integrity,
  	_from: _from
  };

  var minimalisticAssert = assert$9;

  function assert$9(val, msg) {
    if (!val)
      throw new Error(msg || 'Assertion failed');
  }

  assert$9.equal = function assertEqual(l, r, msg) {
    if (l != r)
      throw new Error(msg || ('Assertion failed: ' + l + ' != ' + r));
  };

  var utils_1$1 = createCommonjsModule(function (module, exports) {

  var utils = exports;

  function toArray(msg, enc) {
    if (Array.isArray(msg))
      return msg.slice();
    if (!msg)
      return [];
    var res = [];
    if (typeof msg !== 'string') {
      for (var i = 0; i < msg.length; i++)
        res[i] = msg[i] | 0;
      return res;
    }
    if (enc === 'hex') {
      msg = msg.replace(/[^a-z0-9]+/ig, '');
      if (msg.length % 2 !== 0)
        msg = '0' + msg;
      for (var i = 0; i < msg.length; i += 2)
        res.push(parseInt(msg[i] + msg[i + 1], 16));
    } else {
      for (var i = 0; i < msg.length; i++) {
        var c = msg.charCodeAt(i);
        var hi = c >> 8;
        var lo = c & 0xff;
        if (hi)
          res.push(hi, lo);
        else
          res.push(lo);
      }
    }
    return res;
  }
  utils.toArray = toArray;

  function zero2(word) {
    if (word.length === 1)
      return '0' + word;
    else
      return word;
  }
  utils.zero2 = zero2;

  function toHex(msg) {
    var res = '';
    for (var i = 0; i < msg.length; i++)
      res += zero2(msg[i].toString(16));
    return res;
  }
  utils.toHex = toHex;

  utils.encode = function encode(arr, enc) {
    if (enc === 'hex')
      return toHex(arr);
    else
      return arr;
  };
  });

  var utils_1 = createCommonjsModule(function (module, exports) {

  var utils = exports;




  utils.assert = minimalisticAssert;
  utils.toArray = utils_1$1.toArray;
  utils.zero2 = utils_1$1.zero2;
  utils.toHex = utils_1$1.toHex;
  utils.encode = utils_1$1.encode;

  // Represent num in a w-NAF form
  function getNAF(num, w, bits) {
    var naf = new Array(Math.max(num.bitLength(), bits) + 1);
    naf.fill(0);

    var ws = 1 << (w + 1);
    var k = num.clone();

    for (var i = 0; i < naf.length; i++) {
      var z;
      var mod = k.andln(ws - 1);
      if (k.isOdd()) {
        if (mod > (ws >> 1) - 1)
          z = (ws >> 1) - mod;
        else
          z = mod;
        k.isubn(z);
      } else {
        z = 0;
      }

      naf[i] = z;
      k.iushrn(1);
    }

    return naf;
  }
  utils.getNAF = getNAF;

  // Represent k1, k2 in a Joint Sparse Form
  function getJSF(k1, k2) {
    var jsf = [
      [],
      [],
    ];

    k1 = k1.clone();
    k2 = k2.clone();
    var d1 = 0;
    var d2 = 0;
    var m8;
    while (k1.cmpn(-d1) > 0 || k2.cmpn(-d2) > 0) {
      // First phase
      var m14 = (k1.andln(3) + d1) & 3;
      var m24 = (k2.andln(3) + d2) & 3;
      if (m14 === 3)
        m14 = -1;
      if (m24 === 3)
        m24 = -1;
      var u1;
      if ((m14 & 1) === 0) {
        u1 = 0;
      } else {
        m8 = (k1.andln(7) + d1) & 7;
        if ((m8 === 3 || m8 === 5) && m24 === 2)
          u1 = -m14;
        else
          u1 = m14;
      }
      jsf[0].push(u1);

      var u2;
      if ((m24 & 1) === 0) {
        u2 = 0;
      } else {
        m8 = (k2.andln(7) + d2) & 7;
        if ((m8 === 3 || m8 === 5) && m14 === 2)
          u2 = -m24;
        else
          u2 = m24;
      }
      jsf[1].push(u2);

      // Second phase
      if (2 * d1 === u1 + 1)
        d1 = 1 - d1;
      if (2 * d2 === u2 + 1)
        d2 = 1 - d2;
      k1.iushrn(1);
      k2.iushrn(1);
    }

    return jsf;
  }
  utils.getJSF = getJSF;

  function cachedProperty(obj, name, computer) {
    var key = '_' + name;
    obj.prototype[name] = function cachedProperty() {
      return this[key] !== undefined ? this[key] :
        this[key] = computer.call(this);
    };
  }
  utils.cachedProperty = cachedProperty;

  function parseBytes(bytes) {
    return typeof bytes === 'string' ? utils.toArray(bytes, 'hex') :
      bytes;
  }
  utils.parseBytes = parseBytes;

  function intFromLE(bytes) {
    return new bn(bytes, 'hex', 'le');
  }
  utils.intFromLE = intFromLE;
  });

  var r$1;

  var brorand = function rand(len) {
    if (!r$1)
      r$1 = new Rand(null);

    return r$1.generate(len);
  };

  function Rand(rand) {
    this.rand = rand;
  }
  var Rand_1 = Rand;

  Rand.prototype.generate = function generate(len) {
    return this._rand(len);
  };

  // Emulate crypto API using randy
  Rand.prototype._rand = function _rand(n) {
    if (this.rand.getBytes)
      return this.rand.getBytes(n);

    var res = new Uint8Array(n);
    for (var i = 0; i < res.length; i++)
      res[i] = this.rand.getByte();
    return res;
  };

  if (typeof self === 'object') {
    if (self.crypto && self.crypto.getRandomValues) {
      // Modern browsers
      Rand.prototype._rand = function _rand(n) {
        var arr = new Uint8Array(n);
        self.crypto.getRandomValues(arr);
        return arr;
      };
    } else if (self.msCrypto && self.msCrypto.getRandomValues) {
      // IE
      Rand.prototype._rand = function _rand(n) {
        var arr = new Uint8Array(n);
        self.msCrypto.getRandomValues(arr);
        return arr;
      };

    // Safari's WebWorkers do not have `crypto`
    } else if (typeof window === 'object') {
      // Old junk
      Rand.prototype._rand = function() {
        throw new Error('Not implemented yet');
      };
    }
  } else {
    // Node.js or Web worker with no crypto support
    try {
      var crypto$1 = require$$0$1;
      if (typeof crypto$1.randomBytes !== 'function')
        throw new Error('Not supported');

      Rand.prototype._rand = function _rand(n) {
        return crypto$1.randomBytes(n);
      };
    } catch (e) {
    }
  }
  brorand.Rand = Rand_1;

  var getNAF = utils_1.getNAF;
  var getJSF = utils_1.getJSF;
  var assert$8 = utils_1.assert;

  function BaseCurve(type, conf) {
    this.type = type;
    this.p = new bn(conf.p, 16);

    // Use Montgomery, when there is no fast reduction for the prime
    this.red = conf.prime ? bn.red(conf.prime) : bn.mont(this.p);

    // Useful for many curves
    this.zero = new bn(0).toRed(this.red);
    this.one = new bn(1).toRed(this.red);
    this.two = new bn(2).toRed(this.red);

    // Curve configuration, optional
    this.n = conf.n && new bn(conf.n, 16);
    this.g = conf.g && this.pointFromJSON(conf.g, conf.gRed);

    // Temporary arrays
    this._wnafT1 = new Array(4);
    this._wnafT2 = new Array(4);
    this._wnafT3 = new Array(4);
    this._wnafT4 = new Array(4);

    this._bitLength = this.n ? this.n.bitLength() : 0;

    // Generalized Greg Maxwell's trick
    var adjustCount = this.n && this.p.div(this.n);
    if (!adjustCount || adjustCount.cmpn(100) > 0) {
      this.redN = null;
    } else {
      this._maxwellTrick = true;
      this.redN = this.n.toRed(this.red);
    }
  }
  var base = BaseCurve;

  BaseCurve.prototype.point = function point() {
    throw new Error('Not implemented');
  };

  BaseCurve.prototype.validate = function validate() {
    throw new Error('Not implemented');
  };

  BaseCurve.prototype._fixedNafMul = function _fixedNafMul(p, k) {
    assert$8(p.precomputed);
    var doubles = p._getDoubles();

    var naf = getNAF(k, 1, this._bitLength);
    var I = (1 << (doubles.step + 1)) - (doubles.step % 2 === 0 ? 2 : 1);
    I /= 3;

    // Translate into more windowed form
    var repr = [];
    var j;
    var nafW;
    for (j = 0; j < naf.length; j += doubles.step) {
      nafW = 0;
      for (var l = j + doubles.step - 1; l >= j; l--)
        nafW = (nafW << 1) + naf[l];
      repr.push(nafW);
    }

    var a = this.jpoint(null, null, null);
    var b = this.jpoint(null, null, null);
    for (var i = I; i > 0; i--) {
      for (j = 0; j < repr.length; j++) {
        nafW = repr[j];
        if (nafW === i)
          b = b.mixedAdd(doubles.points[j]);
        else if (nafW === -i)
          b = b.mixedAdd(doubles.points[j].neg());
      }
      a = a.add(b);
    }
    return a.toP();
  };

  BaseCurve.prototype._wnafMul = function _wnafMul(p, k) {
    var w = 4;

    // Precompute window
    var nafPoints = p._getNAFPoints(w);
    w = nafPoints.wnd;
    var wnd = nafPoints.points;

    // Get NAF form
    var naf = getNAF(k, w, this._bitLength);

    // Add `this`*(N+1) for every w-NAF index
    var acc = this.jpoint(null, null, null);
    for (var i = naf.length - 1; i >= 0; i--) {
      // Count zeroes
      for (var l = 0; i >= 0 && naf[i] === 0; i--)
        l++;
      if (i >= 0)
        l++;
      acc = acc.dblp(l);

      if (i < 0)
        break;
      var z = naf[i];
      assert$8(z !== 0);
      if (p.type === 'affine') {
        // J +- P
        if (z > 0)
          acc = acc.mixedAdd(wnd[(z - 1) >> 1]);
        else
          acc = acc.mixedAdd(wnd[(-z - 1) >> 1].neg());
      } else {
        // J +- J
        if (z > 0)
          acc = acc.add(wnd[(z - 1) >> 1]);
        else
          acc = acc.add(wnd[(-z - 1) >> 1].neg());
      }
    }
    return p.type === 'affine' ? acc.toP() : acc;
  };

  BaseCurve.prototype._wnafMulAdd = function _wnafMulAdd(defW,
    points,
    coeffs,
    len,
    jacobianResult) {
    var wndWidth = this._wnafT1;
    var wnd = this._wnafT2;
    var naf = this._wnafT3;

    // Fill all arrays
    var max = 0;
    var i;
    var j;
    var p;
    for (i = 0; i < len; i++) {
      p = points[i];
      var nafPoints = p._getNAFPoints(defW);
      wndWidth[i] = nafPoints.wnd;
      wnd[i] = nafPoints.points;
    }

    // Comb small window NAFs
    for (i = len - 1; i >= 1; i -= 2) {
      var a = i - 1;
      var b = i;
      if (wndWidth[a] !== 1 || wndWidth[b] !== 1) {
        naf[a] = getNAF(coeffs[a], wndWidth[a], this._bitLength);
        naf[b] = getNAF(coeffs[b], wndWidth[b], this._bitLength);
        max = Math.max(naf[a].length, max);
        max = Math.max(naf[b].length, max);
        continue;
      }

      var comb = [
        points[a], /* 1 */
        null, /* 3 */
        null, /* 5 */
        points[b], /* 7 */
      ];

      // Try to avoid Projective points, if possible
      if (points[a].y.cmp(points[b].y) === 0) {
        comb[1] = points[a].add(points[b]);
        comb[2] = points[a].toJ().mixedAdd(points[b].neg());
      } else if (points[a].y.cmp(points[b].y.redNeg()) === 0) {
        comb[1] = points[a].toJ().mixedAdd(points[b]);
        comb[2] = points[a].add(points[b].neg());
      } else {
        comb[1] = points[a].toJ().mixedAdd(points[b]);
        comb[2] = points[a].toJ().mixedAdd(points[b].neg());
      }

      var index = [
        -3, /* -1 -1 */
        -1, /* -1 0 */
        -5, /* -1 1 */
        -7, /* 0 -1 */
        0, /* 0 0 */
        7, /* 0 1 */
        5, /* 1 -1 */
        1, /* 1 0 */
        3,  /* 1 1 */
      ];

      var jsf = getJSF(coeffs[a], coeffs[b]);
      max = Math.max(jsf[0].length, max);
      naf[a] = new Array(max);
      naf[b] = new Array(max);
      for (j = 0; j < max; j++) {
        var ja = jsf[0][j] | 0;
        var jb = jsf[1][j] | 0;

        naf[a][j] = index[(ja + 1) * 3 + (jb + 1)];
        naf[b][j] = 0;
        wnd[a] = comb;
      }
    }

    var acc = this.jpoint(null, null, null);
    var tmp = this._wnafT4;
    for (i = max; i >= 0; i--) {
      var k = 0;

      while (i >= 0) {
        var zero = true;
        for (j = 0; j < len; j++) {
          tmp[j] = naf[j][i] | 0;
          if (tmp[j] !== 0)
            zero = false;
        }
        if (!zero)
          break;
        k++;
        i--;
      }
      if (i >= 0)
        k++;
      acc = acc.dblp(k);
      if (i < 0)
        break;

      for (j = 0; j < len; j++) {
        var z = tmp[j];
        if (z === 0)
          continue;
        else if (z > 0)
          p = wnd[j][(z - 1) >> 1];
        else if (z < 0)
          p = wnd[j][(-z - 1) >> 1].neg();

        if (p.type === 'affine')
          acc = acc.mixedAdd(p);
        else
          acc = acc.add(p);
      }
    }
    // Zeroify references
    for (i = 0; i < len; i++)
      wnd[i] = null;

    if (jacobianResult)
      return acc;
    else
      return acc.toP();
  };

  function BasePoint(curve, type) {
    this.curve = curve;
    this.type = type;
    this.precomputed = null;
  }
  BaseCurve.BasePoint = BasePoint;

  BasePoint.prototype.eq = function eq(/*other*/) {
    throw new Error('Not implemented');
  };

  BasePoint.prototype.validate = function validate() {
    return this.curve.validate(this);
  };

  BaseCurve.prototype.decodePoint = function decodePoint(bytes, enc) {
    bytes = utils_1.toArray(bytes, enc);

    var len = this.p.byteLength();

    // uncompressed, hybrid-odd, hybrid-even
    if ((bytes[0] === 0x04 || bytes[0] === 0x06 || bytes[0] === 0x07) &&
        bytes.length - 1 === 2 * len) {
      if (bytes[0] === 0x06)
        assert$8(bytes[bytes.length - 1] % 2 === 0);
      else if (bytes[0] === 0x07)
        assert$8(bytes[bytes.length - 1] % 2 === 1);

      var res =  this.point(bytes.slice(1, 1 + len),
        bytes.slice(1 + len, 1 + 2 * len));

      return res;
    } else if ((bytes[0] === 0x02 || bytes[0] === 0x03) &&
                bytes.length - 1 === len) {
      return this.pointFromX(bytes.slice(1, 1 + len), bytes[0] === 0x03);
    }
    throw new Error('Unknown point format');
  };

  BasePoint.prototype.encodeCompressed = function encodeCompressed(enc) {
    return this.encode(enc, true);
  };

  BasePoint.prototype._encode = function _encode(compact) {
    var len = this.curve.p.byteLength();
    var x = this.getX().toArray('be', len);

    if (compact)
      return [ this.getY().isEven() ? 0x02 : 0x03 ].concat(x);

    return [ 0x04 ].concat(x, this.getY().toArray('be', len));
  };

  BasePoint.prototype.encode = function encode(enc, compact) {
    return utils_1.encode(this._encode(compact), enc);
  };

  BasePoint.prototype.precompute = function precompute(power) {
    if (this.precomputed)
      return this;

    var precomputed = {
      doubles: null,
      naf: null,
      beta: null,
    };
    precomputed.naf = this._getNAFPoints(8);
    precomputed.doubles = this._getDoubles(4, power);
    precomputed.beta = this._getBeta();
    this.precomputed = precomputed;

    return this;
  };

  BasePoint.prototype._hasDoubles = function _hasDoubles(k) {
    if (!this.precomputed)
      return false;

    var doubles = this.precomputed.doubles;
    if (!doubles)
      return false;

    return doubles.points.length >= Math.ceil((k.bitLength() + 1) / doubles.step);
  };

  BasePoint.prototype._getDoubles = function _getDoubles(step, power) {
    if (this.precomputed && this.precomputed.doubles)
      return this.precomputed.doubles;

    var doubles = [ this ];
    var acc = this;
    for (var i = 0; i < power; i += step) {
      for (var j = 0; j < step; j++)
        acc = acc.dbl();
      doubles.push(acc);
    }
    return {
      step: step,
      points: doubles,
    };
  };

  BasePoint.prototype._getNAFPoints = function _getNAFPoints(wnd) {
    if (this.precomputed && this.precomputed.naf)
      return this.precomputed.naf;

    var res = [ this ];
    var max = (1 << wnd) - 1;
    var dbl = max === 1 ? null : this.dbl();
    for (var i = 1; i < max; i++)
      res[i] = res[i - 1].add(dbl);
    return {
      wnd: wnd,
      points: res,
    };
  };

  BasePoint.prototype._getBeta = function _getBeta() {
    return null;
  };

  BasePoint.prototype.dblp = function dblp(k) {
    var r = this;
    for (var i = 0; i < k; i++)
      r = r.dbl();
    return r;
  };

  var inherits_browser$1 = createCommonjsModule(function (module) {
  if (typeof Object.create === 'function') {
    // implementation from standard node.js 'util' module
    module.exports = function inherits(ctor, superCtor) {
      if (superCtor) {
        ctor.super_ = superCtor;
        ctor.prototype = Object.create(superCtor.prototype, {
          constructor: {
            value: ctor,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
      }
    };
  } else {
    // old school shim for old browsers
    module.exports = function inherits(ctor, superCtor) {
      if (superCtor) {
        ctor.super_ = superCtor;
        var TempCtor = function () {};
        TempCtor.prototype = superCtor.prototype;
        ctor.prototype = new TempCtor();
        ctor.prototype.constructor = ctor;
      }
    };
  }
  });

  var assert$7 = utils_1.assert;

  function ShortCurve(conf) {
    base.call(this, 'short', conf);

    this.a = new bn(conf.a, 16).toRed(this.red);
    this.b = new bn(conf.b, 16).toRed(this.red);
    this.tinv = this.two.redInvm();

    this.zeroA = this.a.fromRed().cmpn(0) === 0;
    this.threeA = this.a.fromRed().sub(this.p).cmpn(-3) === 0;

    // If the curve is endomorphic, precalculate beta and lambda
    this.endo = this._getEndomorphism(conf);
    this._endoWnafT1 = new Array(4);
    this._endoWnafT2 = new Array(4);
  }
  inherits_browser$1(ShortCurve, base);
  var short = ShortCurve;

  ShortCurve.prototype._getEndomorphism = function _getEndomorphism(conf) {
    // No efficient endomorphism
    if (!this.zeroA || !this.g || !this.n || this.p.modn(3) !== 1)
      return;

    // Compute beta and lambda, that lambda * P = (beta * Px; Py)
    var beta;
    var lambda;
    if (conf.beta) {
      beta = new bn(conf.beta, 16).toRed(this.red);
    } else {
      var betas = this._getEndoRoots(this.p);
      // Choose the smallest beta
      beta = betas[0].cmp(betas[1]) < 0 ? betas[0] : betas[1];
      beta = beta.toRed(this.red);
    }
    if (conf.lambda) {
      lambda = new bn(conf.lambda, 16);
    } else {
      // Choose the lambda that is matching selected beta
      var lambdas = this._getEndoRoots(this.n);
      if (this.g.mul(lambdas[0]).x.cmp(this.g.x.redMul(beta)) === 0) {
        lambda = lambdas[0];
      } else {
        lambda = lambdas[1];
        assert$7(this.g.mul(lambda).x.cmp(this.g.x.redMul(beta)) === 0);
      }
    }

    // Get basis vectors, used for balanced length-two representation
    var basis;
    if (conf.basis) {
      basis = conf.basis.map(function(vec) {
        return {
          a: new bn(vec.a, 16),
          b: new bn(vec.b, 16),
        };
      });
    } else {
      basis = this._getEndoBasis(lambda);
    }

    return {
      beta: beta,
      lambda: lambda,
      basis: basis,
    };
  };

  ShortCurve.prototype._getEndoRoots = function _getEndoRoots(num) {
    // Find roots of for x^2 + x + 1 in F
    // Root = (-1 +- Sqrt(-3)) / 2
    //
    var red = num === this.p ? this.red : bn.mont(num);
    var tinv = new bn(2).toRed(red).redInvm();
    var ntinv = tinv.redNeg();

    var s = new bn(3).toRed(red).redNeg().redSqrt().redMul(tinv);

    var l1 = ntinv.redAdd(s).fromRed();
    var l2 = ntinv.redSub(s).fromRed();
    return [ l1, l2 ];
  };

  ShortCurve.prototype._getEndoBasis = function _getEndoBasis(lambda) {
    // aprxSqrt >= sqrt(this.n)
    var aprxSqrt = this.n.ushrn(Math.floor(this.n.bitLength() / 2));

    // 3.74
    // Run EGCD, until r(L + 1) < aprxSqrt
    var u = lambda;
    var v = this.n.clone();
    var x1 = new bn(1);
    var y1 = new bn(0);
    var x2 = new bn(0);
    var y2 = new bn(1);

    // NOTE: all vectors are roots of: a + b * lambda = 0 (mod n)
    var a0;
    var b0;
    // First vector
    var a1;
    var b1;
    // Second vector
    var a2;
    var b2;

    var prevR;
    var i = 0;
    var r;
    var x;
    while (u.cmpn(0) !== 0) {
      var q = v.div(u);
      r = v.sub(q.mul(u));
      x = x2.sub(q.mul(x1));
      var y = y2.sub(q.mul(y1));

      if (!a1 && r.cmp(aprxSqrt) < 0) {
        a0 = prevR.neg();
        b0 = x1;
        a1 = r.neg();
        b1 = x;
      } else if (a1 && ++i === 2) {
        break;
      }
      prevR = r;

      v = u;
      u = r;
      x2 = x1;
      x1 = x;
      y2 = y1;
      y1 = y;
    }
    a2 = r.neg();
    b2 = x;

    var len1 = a1.sqr().add(b1.sqr());
    var len2 = a2.sqr().add(b2.sqr());
    if (len2.cmp(len1) >= 0) {
      a2 = a0;
      b2 = b0;
    }

    // Normalize signs
    if (a1.negative) {
      a1 = a1.neg();
      b1 = b1.neg();
    }
    if (a2.negative) {
      a2 = a2.neg();
      b2 = b2.neg();
    }

    return [
      { a: a1, b: b1 },
      { a: a2, b: b2 },
    ];
  };

  ShortCurve.prototype._endoSplit = function _endoSplit(k) {
    var basis = this.endo.basis;
    var v1 = basis[0];
    var v2 = basis[1];

    var c1 = v2.b.mul(k).divRound(this.n);
    var c2 = v1.b.neg().mul(k).divRound(this.n);

    var p1 = c1.mul(v1.a);
    var p2 = c2.mul(v2.a);
    var q1 = c1.mul(v1.b);
    var q2 = c2.mul(v2.b);

    // Calculate answer
    var k1 = k.sub(p1).sub(p2);
    var k2 = q1.add(q2).neg();
    return { k1: k1, k2: k2 };
  };

  ShortCurve.prototype.pointFromX = function pointFromX(x, odd) {
    x = new bn(x, 16);
    if (!x.red)
      x = x.toRed(this.red);

    var y2 = x.redSqr().redMul(x).redIAdd(x.redMul(this.a)).redIAdd(this.b);
    var y = y2.redSqrt();
    if (y.redSqr().redSub(y2).cmp(this.zero) !== 0)
      throw new Error('invalid point');

    // XXX Is there any way to tell if the number is odd without converting it
    // to non-red form?
    var isOdd = y.fromRed().isOdd();
    if (odd && !isOdd || !odd && isOdd)
      y = y.redNeg();

    return this.point(x, y);
  };

  ShortCurve.prototype.validate = function validate(point) {
    if (point.inf)
      return true;

    var x = point.x;
    var y = point.y;

    var ax = this.a.redMul(x);
    var rhs = x.redSqr().redMul(x).redIAdd(ax).redIAdd(this.b);
    return y.redSqr().redISub(rhs).cmpn(0) === 0;
  };

  ShortCurve.prototype._endoWnafMulAdd =
      function _endoWnafMulAdd(points, coeffs, jacobianResult) {
        var npoints = this._endoWnafT1;
        var ncoeffs = this._endoWnafT2;
        for (var i = 0; i < points.length; i++) {
          var split = this._endoSplit(coeffs[i]);
          var p = points[i];
          var beta = p._getBeta();

          if (split.k1.negative) {
            split.k1.ineg();
            p = p.neg(true);
          }
          if (split.k2.negative) {
            split.k2.ineg();
            beta = beta.neg(true);
          }

          npoints[i * 2] = p;
          npoints[i * 2 + 1] = beta;
          ncoeffs[i * 2] = split.k1;
          ncoeffs[i * 2 + 1] = split.k2;
        }
        var res = this._wnafMulAdd(1, npoints, ncoeffs, i * 2, jacobianResult);

        // Clean-up references to points and coefficients
        for (var j = 0; j < i * 2; j++) {
          npoints[j] = null;
          ncoeffs[j] = null;
        }
        return res;
      };

  function Point$2(curve, x, y, isRed) {
    base.BasePoint.call(this, curve, 'affine');
    if (x === null && y === null) {
      this.x = null;
      this.y = null;
      this.inf = true;
    } else {
      this.x = new bn(x, 16);
      this.y = new bn(y, 16);
      // Force redgomery representation when loading from JSON
      if (isRed) {
        this.x.forceRed(this.curve.red);
        this.y.forceRed(this.curve.red);
      }
      if (!this.x.red)
        this.x = this.x.toRed(this.curve.red);
      if (!this.y.red)
        this.y = this.y.toRed(this.curve.red);
      this.inf = false;
    }
  }
  inherits_browser$1(Point$2, base.BasePoint);

  ShortCurve.prototype.point = function point(x, y, isRed) {
    return new Point$2(this, x, y, isRed);
  };

  ShortCurve.prototype.pointFromJSON = function pointFromJSON(obj, red) {
    return Point$2.fromJSON(this, obj, red);
  };

  Point$2.prototype._getBeta = function _getBeta() {
    if (!this.curve.endo)
      return;

    var pre = this.precomputed;
    if (pre && pre.beta)
      return pre.beta;

    var beta = this.curve.point(this.x.redMul(this.curve.endo.beta), this.y);
    if (pre) {
      var curve = this.curve;
      var endoMul = function(p) {
        return curve.point(p.x.redMul(curve.endo.beta), p.y);
      };
      pre.beta = beta;
      beta.precomputed = {
        beta: null,
        naf: pre.naf && {
          wnd: pre.naf.wnd,
          points: pre.naf.points.map(endoMul),
        },
        doubles: pre.doubles && {
          step: pre.doubles.step,
          points: pre.doubles.points.map(endoMul),
        },
      };
    }
    return beta;
  };

  Point$2.prototype.toJSON = function toJSON() {
    if (!this.precomputed)
      return [ this.x, this.y ];

    return [ this.x, this.y, this.precomputed && {
      doubles: this.precomputed.doubles && {
        step: this.precomputed.doubles.step,
        points: this.precomputed.doubles.points.slice(1),
      },
      naf: this.precomputed.naf && {
        wnd: this.precomputed.naf.wnd,
        points: this.precomputed.naf.points.slice(1),
      },
    } ];
  };

  Point$2.fromJSON = function fromJSON(curve, obj, red) {
    if (typeof obj === 'string')
      obj = JSON.parse(obj);
    var res = curve.point(obj[0], obj[1], red);
    if (!obj[2])
      return res;

    function obj2point(obj) {
      return curve.point(obj[0], obj[1], red);
    }

    var pre = obj[2];
    res.precomputed = {
      beta: null,
      doubles: pre.doubles && {
        step: pre.doubles.step,
        points: [ res ].concat(pre.doubles.points.map(obj2point)),
      },
      naf: pre.naf && {
        wnd: pre.naf.wnd,
        points: [ res ].concat(pre.naf.points.map(obj2point)),
      },
    };
    return res;
  };

  Point$2.prototype.inspect = function inspect() {
    if (this.isInfinity())
      return '<EC Point Infinity>';
    return '<EC Point x: ' + this.x.fromRed().toString(16, 2) +
        ' y: ' + this.y.fromRed().toString(16, 2) + '>';
  };

  Point$2.prototype.isInfinity = function isInfinity() {
    return this.inf;
  };

  Point$2.prototype.add = function add(p) {
    // O + P = P
    if (this.inf)
      return p;

    // P + O = P
    if (p.inf)
      return this;

    // P + P = 2P
    if (this.eq(p))
      return this.dbl();

    // P + (-P) = O
    if (this.neg().eq(p))
      return this.curve.point(null, null);

    // P + Q = O
    if (this.x.cmp(p.x) === 0)
      return this.curve.point(null, null);

    var c = this.y.redSub(p.y);
    if (c.cmpn(0) !== 0)
      c = c.redMul(this.x.redSub(p.x).redInvm());
    var nx = c.redSqr().redISub(this.x).redISub(p.x);
    var ny = c.redMul(this.x.redSub(nx)).redISub(this.y);
    return this.curve.point(nx, ny);
  };

  Point$2.prototype.dbl = function dbl() {
    if (this.inf)
      return this;

    // 2P = O
    var ys1 = this.y.redAdd(this.y);
    if (ys1.cmpn(0) === 0)
      return this.curve.point(null, null);

    var a = this.curve.a;

    var x2 = this.x.redSqr();
    var dyinv = ys1.redInvm();
    var c = x2.redAdd(x2).redIAdd(x2).redIAdd(a).redMul(dyinv);

    var nx = c.redSqr().redISub(this.x.redAdd(this.x));
    var ny = c.redMul(this.x.redSub(nx)).redISub(this.y);
    return this.curve.point(nx, ny);
  };

  Point$2.prototype.getX = function getX() {
    return this.x.fromRed();
  };

  Point$2.prototype.getY = function getY() {
    return this.y.fromRed();
  };

  Point$2.prototype.mul = function mul(k) {
    k = new bn(k, 16);
    if (this.isInfinity())
      return this;
    else if (this._hasDoubles(k))
      return this.curve._fixedNafMul(this, k);
    else if (this.curve.endo)
      return this.curve._endoWnafMulAdd([ this ], [ k ]);
    else
      return this.curve._wnafMul(this, k);
  };

  Point$2.prototype.mulAdd = function mulAdd(k1, p2, k2) {
    var points = [ this, p2 ];
    var coeffs = [ k1, k2 ];
    if (this.curve.endo)
      return this.curve._endoWnafMulAdd(points, coeffs);
    else
      return this.curve._wnafMulAdd(1, points, coeffs, 2);
  };

  Point$2.prototype.jmulAdd = function jmulAdd(k1, p2, k2) {
    var points = [ this, p2 ];
    var coeffs = [ k1, k2 ];
    if (this.curve.endo)
      return this.curve._endoWnafMulAdd(points, coeffs, true);
    else
      return this.curve._wnafMulAdd(1, points, coeffs, 2, true);
  };

  Point$2.prototype.eq = function eq(p) {
    return this === p ||
           this.inf === p.inf &&
               (this.inf || this.x.cmp(p.x) === 0 && this.y.cmp(p.y) === 0);
  };

  Point$2.prototype.neg = function neg(_precompute) {
    if (this.inf)
      return this;

    var res = this.curve.point(this.x, this.y.redNeg());
    if (_precompute && this.precomputed) {
      var pre = this.precomputed;
      var negate = function(p) {
        return p.neg();
      };
      res.precomputed = {
        naf: pre.naf && {
          wnd: pre.naf.wnd,
          points: pre.naf.points.map(negate),
        },
        doubles: pre.doubles && {
          step: pre.doubles.step,
          points: pre.doubles.points.map(negate),
        },
      };
    }
    return res;
  };

  Point$2.prototype.toJ = function toJ() {
    if (this.inf)
      return this.curve.jpoint(null, null, null);

    var res = this.curve.jpoint(this.x, this.y, this.curve.one);
    return res;
  };

  function JPoint(curve, x, y, z) {
    base.BasePoint.call(this, curve, 'jacobian');
    if (x === null && y === null && z === null) {
      this.x = this.curve.one;
      this.y = this.curve.one;
      this.z = new bn(0);
    } else {
      this.x = new bn(x, 16);
      this.y = new bn(y, 16);
      this.z = new bn(z, 16);
    }
    if (!this.x.red)
      this.x = this.x.toRed(this.curve.red);
    if (!this.y.red)
      this.y = this.y.toRed(this.curve.red);
    if (!this.z.red)
      this.z = this.z.toRed(this.curve.red);

    this.zOne = this.z === this.curve.one;
  }
  inherits_browser$1(JPoint, base.BasePoint);

  ShortCurve.prototype.jpoint = function jpoint(x, y, z) {
    return new JPoint(this, x, y, z);
  };

  JPoint.prototype.toP = function toP() {
    if (this.isInfinity())
      return this.curve.point(null, null);

    var zinv = this.z.redInvm();
    var zinv2 = zinv.redSqr();
    var ax = this.x.redMul(zinv2);
    var ay = this.y.redMul(zinv2).redMul(zinv);

    return this.curve.point(ax, ay);
  };

  JPoint.prototype.neg = function neg() {
    return this.curve.jpoint(this.x, this.y.redNeg(), this.z);
  };

  JPoint.prototype.add = function add(p) {
    // O + P = P
    if (this.isInfinity())
      return p;

    // P + O = P
    if (p.isInfinity())
      return this;

    // 12M + 4S + 7A
    var pz2 = p.z.redSqr();
    var z2 = this.z.redSqr();
    var u1 = this.x.redMul(pz2);
    var u2 = p.x.redMul(z2);
    var s1 = this.y.redMul(pz2.redMul(p.z));
    var s2 = p.y.redMul(z2.redMul(this.z));

    var h = u1.redSub(u2);
    var r = s1.redSub(s2);
    if (h.cmpn(0) === 0) {
      if (r.cmpn(0) !== 0)
        return this.curve.jpoint(null, null, null);
      else
        return this.dbl();
    }

    var h2 = h.redSqr();
    var h3 = h2.redMul(h);
    var v = u1.redMul(h2);

    var nx = r.redSqr().redIAdd(h3).redISub(v).redISub(v);
    var ny = r.redMul(v.redISub(nx)).redISub(s1.redMul(h3));
    var nz = this.z.redMul(p.z).redMul(h);

    return this.curve.jpoint(nx, ny, nz);
  };

  JPoint.prototype.mixedAdd = function mixedAdd(p) {
    // O + P = P
    if (this.isInfinity())
      return p.toJ();

    // P + O = P
    if (p.isInfinity())
      return this;

    // 8M + 3S + 7A
    var z2 = this.z.redSqr();
    var u1 = this.x;
    var u2 = p.x.redMul(z2);
    var s1 = this.y;
    var s2 = p.y.redMul(z2).redMul(this.z);

    var h = u1.redSub(u2);
    var r = s1.redSub(s2);
    if (h.cmpn(0) === 0) {
      if (r.cmpn(0) !== 0)
        return this.curve.jpoint(null, null, null);
      else
        return this.dbl();
    }

    var h2 = h.redSqr();
    var h3 = h2.redMul(h);
    var v = u1.redMul(h2);

    var nx = r.redSqr().redIAdd(h3).redISub(v).redISub(v);
    var ny = r.redMul(v.redISub(nx)).redISub(s1.redMul(h3));
    var nz = this.z.redMul(h);

    return this.curve.jpoint(nx, ny, nz);
  };

  JPoint.prototype.dblp = function dblp(pow) {
    if (pow === 0)
      return this;
    if (this.isInfinity())
      return this;
    if (!pow)
      return this.dbl();

    var i;
    if (this.curve.zeroA || this.curve.threeA) {
      var r = this;
      for (i = 0; i < pow; i++)
        r = r.dbl();
      return r;
    }

    // 1M + 2S + 1A + N * (4S + 5M + 8A)
    // N = 1 => 6M + 6S + 9A
    var a = this.curve.a;
    var tinv = this.curve.tinv;

    var jx = this.x;
    var jy = this.y;
    var jz = this.z;
    var jz4 = jz.redSqr().redSqr();

    // Reuse results
    var jyd = jy.redAdd(jy);
    for (i = 0; i < pow; i++) {
      var jx2 = jx.redSqr();
      var jyd2 = jyd.redSqr();
      var jyd4 = jyd2.redSqr();
      var c = jx2.redAdd(jx2).redIAdd(jx2).redIAdd(a.redMul(jz4));

      var t1 = jx.redMul(jyd2);
      var nx = c.redSqr().redISub(t1.redAdd(t1));
      var t2 = t1.redISub(nx);
      var dny = c.redMul(t2);
      dny = dny.redIAdd(dny).redISub(jyd4);
      var nz = jyd.redMul(jz);
      if (i + 1 < pow)
        jz4 = jz4.redMul(jyd4);

      jx = nx;
      jz = nz;
      jyd = dny;
    }

    return this.curve.jpoint(jx, jyd.redMul(tinv), jz);
  };

  JPoint.prototype.dbl = function dbl() {
    if (this.isInfinity())
      return this;

    if (this.curve.zeroA)
      return this._zeroDbl();
    else if (this.curve.threeA)
      return this._threeDbl();
    else
      return this._dbl();
  };

  JPoint.prototype._zeroDbl = function _zeroDbl() {
    var nx;
    var ny;
    var nz;
    // Z = 1
    if (this.zOne) {
      // hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-0.html
      //     #doubling-mdbl-2007-bl
      // 1M + 5S + 14A

      // XX = X1^2
      var xx = this.x.redSqr();
      // YY = Y1^2
      var yy = this.y.redSqr();
      // YYYY = YY^2
      var yyyy = yy.redSqr();
      // S = 2 * ((X1 + YY)^2 - XX - YYYY)
      var s = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
      s = s.redIAdd(s);
      // M = 3 * XX + a; a = 0
      var m = xx.redAdd(xx).redIAdd(xx);
      // T = M ^ 2 - 2*S
      var t = m.redSqr().redISub(s).redISub(s);

      // 8 * YYYY
      var yyyy8 = yyyy.redIAdd(yyyy);
      yyyy8 = yyyy8.redIAdd(yyyy8);
      yyyy8 = yyyy8.redIAdd(yyyy8);

      // X3 = T
      nx = t;
      // Y3 = M * (S - T) - 8 * YYYY
      ny = m.redMul(s.redISub(t)).redISub(yyyy8);
      // Z3 = 2*Y1
      nz = this.y.redAdd(this.y);
    } else {
      // hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-0.html
      //     #doubling-dbl-2009-l
      // 2M + 5S + 13A

      // A = X1^2
      var a = this.x.redSqr();
      // B = Y1^2
      var b = this.y.redSqr();
      // C = B^2
      var c = b.redSqr();
      // D = 2 * ((X1 + B)^2 - A - C)
      var d = this.x.redAdd(b).redSqr().redISub(a).redISub(c);
      d = d.redIAdd(d);
      // E = 3 * A
      var e = a.redAdd(a).redIAdd(a);
      // F = E^2
      var f = e.redSqr();

      // 8 * C
      var c8 = c.redIAdd(c);
      c8 = c8.redIAdd(c8);
      c8 = c8.redIAdd(c8);

      // X3 = F - 2 * D
      nx = f.redISub(d).redISub(d);
      // Y3 = E * (D - X3) - 8 * C
      ny = e.redMul(d.redISub(nx)).redISub(c8);
      // Z3 = 2 * Y1 * Z1
      nz = this.y.redMul(this.z);
      nz = nz.redIAdd(nz);
    }

    return this.curve.jpoint(nx, ny, nz);
  };

  JPoint.prototype._threeDbl = function _threeDbl() {
    var nx;
    var ny;
    var nz;
    // Z = 1
    if (this.zOne) {
      // hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-3.html
      //     #doubling-mdbl-2007-bl
      // 1M + 5S + 15A

      // XX = X1^2
      var xx = this.x.redSqr();
      // YY = Y1^2
      var yy = this.y.redSqr();
      // YYYY = YY^2
      var yyyy = yy.redSqr();
      // S = 2 * ((X1 + YY)^2 - XX - YYYY)
      var s = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
      s = s.redIAdd(s);
      // M = 3 * XX + a
      var m = xx.redAdd(xx).redIAdd(xx).redIAdd(this.curve.a);
      // T = M^2 - 2 * S
      var t = m.redSqr().redISub(s).redISub(s);
      // X3 = T
      nx = t;
      // Y3 = M * (S - T) - 8 * YYYY
      var yyyy8 = yyyy.redIAdd(yyyy);
      yyyy8 = yyyy8.redIAdd(yyyy8);
      yyyy8 = yyyy8.redIAdd(yyyy8);
      ny = m.redMul(s.redISub(t)).redISub(yyyy8);
      // Z3 = 2 * Y1
      nz = this.y.redAdd(this.y);
    } else {
      // hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-3.html#doubling-dbl-2001-b
      // 3M + 5S

      // delta = Z1^2
      var delta = this.z.redSqr();
      // gamma = Y1^2
      var gamma = this.y.redSqr();
      // beta = X1 * gamma
      var beta = this.x.redMul(gamma);
      // alpha = 3 * (X1 - delta) * (X1 + delta)
      var alpha = this.x.redSub(delta).redMul(this.x.redAdd(delta));
      alpha = alpha.redAdd(alpha).redIAdd(alpha);
      // X3 = alpha^2 - 8 * beta
      var beta4 = beta.redIAdd(beta);
      beta4 = beta4.redIAdd(beta4);
      var beta8 = beta4.redAdd(beta4);
      nx = alpha.redSqr().redISub(beta8);
      // Z3 = (Y1 + Z1)^2 - gamma - delta
      nz = this.y.redAdd(this.z).redSqr().redISub(gamma).redISub(delta);
      // Y3 = alpha * (4 * beta - X3) - 8 * gamma^2
      var ggamma8 = gamma.redSqr();
      ggamma8 = ggamma8.redIAdd(ggamma8);
      ggamma8 = ggamma8.redIAdd(ggamma8);
      ggamma8 = ggamma8.redIAdd(ggamma8);
      ny = alpha.redMul(beta4.redISub(nx)).redISub(ggamma8);
    }

    return this.curve.jpoint(nx, ny, nz);
  };

  JPoint.prototype._dbl = function _dbl() {
    var a = this.curve.a;

    // 4M + 6S + 10A
    var jx = this.x;
    var jy = this.y;
    var jz = this.z;
    var jz4 = jz.redSqr().redSqr();

    var jx2 = jx.redSqr();
    var jy2 = jy.redSqr();

    var c = jx2.redAdd(jx2).redIAdd(jx2).redIAdd(a.redMul(jz4));

    var jxd4 = jx.redAdd(jx);
    jxd4 = jxd4.redIAdd(jxd4);
    var t1 = jxd4.redMul(jy2);
    var nx = c.redSqr().redISub(t1.redAdd(t1));
    var t2 = t1.redISub(nx);

    var jyd8 = jy2.redSqr();
    jyd8 = jyd8.redIAdd(jyd8);
    jyd8 = jyd8.redIAdd(jyd8);
    jyd8 = jyd8.redIAdd(jyd8);
    var ny = c.redMul(t2).redISub(jyd8);
    var nz = jy.redAdd(jy).redMul(jz);

    return this.curve.jpoint(nx, ny, nz);
  };

  JPoint.prototype.trpl = function trpl() {
    if (!this.curve.zeroA)
      return this.dbl().add(this);

    // hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-0.html#tripling-tpl-2007-bl
    // 5M + 10S + ...

    // XX = X1^2
    var xx = this.x.redSqr();
    // YY = Y1^2
    var yy = this.y.redSqr();
    // ZZ = Z1^2
    var zz = this.z.redSqr();
    // YYYY = YY^2
    var yyyy = yy.redSqr();
    // M = 3 * XX + a * ZZ2; a = 0
    var m = xx.redAdd(xx).redIAdd(xx);
    // MM = M^2
    var mm = m.redSqr();
    // E = 6 * ((X1 + YY)^2 - XX - YYYY) - MM
    var e = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
    e = e.redIAdd(e);
    e = e.redAdd(e).redIAdd(e);
    e = e.redISub(mm);
    // EE = E^2
    var ee = e.redSqr();
    // T = 16*YYYY
    var t = yyyy.redIAdd(yyyy);
    t = t.redIAdd(t);
    t = t.redIAdd(t);
    t = t.redIAdd(t);
    // U = (M + E)^2 - MM - EE - T
    var u = m.redIAdd(e).redSqr().redISub(mm).redISub(ee).redISub(t);
    // X3 = 4 * (X1 * EE - 4 * YY * U)
    var yyu4 = yy.redMul(u);
    yyu4 = yyu4.redIAdd(yyu4);
    yyu4 = yyu4.redIAdd(yyu4);
    var nx = this.x.redMul(ee).redISub(yyu4);
    nx = nx.redIAdd(nx);
    nx = nx.redIAdd(nx);
    // Y3 = 8 * Y1 * (U * (T - U) - E * EE)
    var ny = this.y.redMul(u.redMul(t.redISub(u)).redISub(e.redMul(ee)));
    ny = ny.redIAdd(ny);
    ny = ny.redIAdd(ny);
    ny = ny.redIAdd(ny);
    // Z3 = (Z1 + E)^2 - ZZ - EE
    var nz = this.z.redAdd(e).redSqr().redISub(zz).redISub(ee);

    return this.curve.jpoint(nx, ny, nz);
  };

  JPoint.prototype.mul = function mul(k, kbase) {
    k = new bn(k, kbase);

    return this.curve._wnafMul(this, k);
  };

  JPoint.prototype.eq = function eq(p) {
    if (p.type === 'affine')
      return this.eq(p.toJ());

    if (this === p)
      return true;

    // x1 * z2^2 == x2 * z1^2
    var z2 = this.z.redSqr();
    var pz2 = p.z.redSqr();
    if (this.x.redMul(pz2).redISub(p.x.redMul(z2)).cmpn(0) !== 0)
      return false;

    // y1 * z2^3 == y2 * z1^3
    var z3 = z2.redMul(this.z);
    var pz3 = pz2.redMul(p.z);
    return this.y.redMul(pz3).redISub(p.y.redMul(z3)).cmpn(0) === 0;
  };

  JPoint.prototype.eqXToP = function eqXToP(x) {
    var zs = this.z.redSqr();
    var rx = x.toRed(this.curve.red).redMul(zs);
    if (this.x.cmp(rx) === 0)
      return true;

    var xc = x.clone();
    var t = this.curve.redN.redMul(zs);
    for (;;) {
      xc.iadd(this.curve.n);
      if (xc.cmp(this.curve.p) >= 0)
        return false;

      rx.redIAdd(t);
      if (this.x.cmp(rx) === 0)
        return true;
    }
  };

  JPoint.prototype.inspect = function inspect() {
    if (this.isInfinity())
      return '<EC JPoint Infinity>';
    return '<EC JPoint x: ' + this.x.toString(16, 2) +
        ' y: ' + this.y.toString(16, 2) +
        ' z: ' + this.z.toString(16, 2) + '>';
  };

  JPoint.prototype.isInfinity = function isInfinity() {
    // XXX This code assumes that zero is always zero in red
    return this.z.cmpn(0) === 0;
  };

  function MontCurve(conf) {
    base.call(this, 'mont', conf);

    this.a = new bn(conf.a, 16).toRed(this.red);
    this.b = new bn(conf.b, 16).toRed(this.red);
    this.i4 = new bn(4).toRed(this.red).redInvm();
    this.two = new bn(2).toRed(this.red);
    this.a24 = this.i4.redMul(this.a.redAdd(this.two));
  }
  inherits_browser$1(MontCurve, base);
  var mont = MontCurve;

  MontCurve.prototype.validate = function validate(point) {
    var x = point.normalize().x;
    var x2 = x.redSqr();
    var rhs = x2.redMul(x).redAdd(x2.redMul(this.a)).redAdd(x);
    var y = rhs.redSqrt();

    return y.redSqr().cmp(rhs) === 0;
  };

  function Point$1(curve, x, z) {
    base.BasePoint.call(this, curve, 'projective');
    if (x === null && z === null) {
      this.x = this.curve.one;
      this.z = this.curve.zero;
    } else {
      this.x = new bn(x, 16);
      this.z = new bn(z, 16);
      if (!this.x.red)
        this.x = this.x.toRed(this.curve.red);
      if (!this.z.red)
        this.z = this.z.toRed(this.curve.red);
    }
  }
  inherits_browser$1(Point$1, base.BasePoint);

  MontCurve.prototype.decodePoint = function decodePoint(bytes, enc) {
    return this.point(utils_1.toArray(bytes, enc), 1);
  };

  MontCurve.prototype.point = function point(x, z) {
    return new Point$1(this, x, z);
  };

  MontCurve.prototype.pointFromJSON = function pointFromJSON(obj) {
    return Point$1.fromJSON(this, obj);
  };

  Point$1.prototype.precompute = function precompute() {
    // No-op
  };

  Point$1.prototype._encode = function _encode() {
    return this.getX().toArray('be', this.curve.p.byteLength());
  };

  Point$1.fromJSON = function fromJSON(curve, obj) {
    return new Point$1(curve, obj[0], obj[1] || curve.one);
  };

  Point$1.prototype.inspect = function inspect() {
    if (this.isInfinity())
      return '<EC Point Infinity>';
    return '<EC Point x: ' + this.x.fromRed().toString(16, 2) +
        ' z: ' + this.z.fromRed().toString(16, 2) + '>';
  };

  Point$1.prototype.isInfinity = function isInfinity() {
    // XXX This code assumes that zero is always zero in red
    return this.z.cmpn(0) === 0;
  };

  Point$1.prototype.dbl = function dbl() {
    // http://hyperelliptic.org/EFD/g1p/auto-montgom-xz.html#doubling-dbl-1987-m-3
    // 2M + 2S + 4A

    // A = X1 + Z1
    var a = this.x.redAdd(this.z);
    // AA = A^2
    var aa = a.redSqr();
    // B = X1 - Z1
    var b = this.x.redSub(this.z);
    // BB = B^2
    var bb = b.redSqr();
    // C = AA - BB
    var c = aa.redSub(bb);
    // X3 = AA * BB
    var nx = aa.redMul(bb);
    // Z3 = C * (BB + A24 * C)
    var nz = c.redMul(bb.redAdd(this.curve.a24.redMul(c)));
    return this.curve.point(nx, nz);
  };

  Point$1.prototype.add = function add() {
    throw new Error('Not supported on Montgomery curve');
  };

  Point$1.prototype.diffAdd = function diffAdd(p, diff) {
    // http://hyperelliptic.org/EFD/g1p/auto-montgom-xz.html#diffadd-dadd-1987-m-3
    // 4M + 2S + 6A

    // A = X2 + Z2
    var a = this.x.redAdd(this.z);
    // B = X2 - Z2
    var b = this.x.redSub(this.z);
    // C = X3 + Z3
    var c = p.x.redAdd(p.z);
    // D = X3 - Z3
    var d = p.x.redSub(p.z);
    // DA = D * A
    var da = d.redMul(a);
    // CB = C * B
    var cb = c.redMul(b);
    // X5 = Z1 * (DA + CB)^2
    var nx = diff.z.redMul(da.redAdd(cb).redSqr());
    // Z5 = X1 * (DA - CB)^2
    var nz = diff.x.redMul(da.redISub(cb).redSqr());
    return this.curve.point(nx, nz);
  };

  Point$1.prototype.mul = function mul(k) {
    var t = k.clone();
    var a = this; // (N / 2) * Q + Q
    var b = this.curve.point(null, null); // (N / 2) * Q
    var c = this; // Q

    for (var bits = []; t.cmpn(0) !== 0; t.iushrn(1))
      bits.push(t.andln(1));

    for (var i = bits.length - 1; i >= 0; i--) {
      if (bits[i] === 0) {
        // N * Q + Q = ((N / 2) * Q + Q)) + (N / 2) * Q
        a = a.diffAdd(b, c);
        // N * Q = 2 * ((N / 2) * Q + Q))
        b = b.dbl();
      } else {
        // N * Q = ((N / 2) * Q + Q) + ((N / 2) * Q)
        b = a.diffAdd(b, c);
        // N * Q + Q = 2 * ((N / 2) * Q + Q)
        a = a.dbl();
      }
    }
    return b;
  };

  Point$1.prototype.mulAdd = function mulAdd() {
    throw new Error('Not supported on Montgomery curve');
  };

  Point$1.prototype.jumlAdd = function jumlAdd() {
    throw new Error('Not supported on Montgomery curve');
  };

  Point$1.prototype.eq = function eq(other) {
    return this.getX().cmp(other.getX()) === 0;
  };

  Point$1.prototype.normalize = function normalize() {
    this.x = this.x.redMul(this.z.redInvm());
    this.z = this.curve.one;
    return this;
  };

  Point$1.prototype.getX = function getX() {
    // Normalize coordinates
    this.normalize();

    return this.x.fromRed();
  };

  var assert$6 = utils_1.assert;

  function EdwardsCurve(conf) {
    // NOTE: Important as we are creating point in Base.call()
    this.twisted = (conf.a | 0) !== 1;
    this.mOneA = this.twisted && (conf.a | 0) === -1;
    this.extended = this.mOneA;

    base.call(this, 'edwards', conf);

    this.a = new bn(conf.a, 16).umod(this.red.m);
    this.a = this.a.toRed(this.red);
    this.c = new bn(conf.c, 16).toRed(this.red);
    this.c2 = this.c.redSqr();
    this.d = new bn(conf.d, 16).toRed(this.red);
    this.dd = this.d.redAdd(this.d);

    assert$6(!this.twisted || this.c.fromRed().cmpn(1) === 0);
    this.oneC = (conf.c | 0) === 1;
  }
  inherits_browser$1(EdwardsCurve, base);
  var edwards = EdwardsCurve;

  EdwardsCurve.prototype._mulA = function _mulA(num) {
    if (this.mOneA)
      return num.redNeg();
    else
      return this.a.redMul(num);
  };

  EdwardsCurve.prototype._mulC = function _mulC(num) {
    if (this.oneC)
      return num;
    else
      return this.c.redMul(num);
  };

  // Just for compatibility with Short curve
  EdwardsCurve.prototype.jpoint = function jpoint(x, y, z, t) {
    return this.point(x, y, z, t);
  };

  EdwardsCurve.prototype.pointFromX = function pointFromX(x, odd) {
    x = new bn(x, 16);
    if (!x.red)
      x = x.toRed(this.red);

    var x2 = x.redSqr();
    var rhs = this.c2.redSub(this.a.redMul(x2));
    var lhs = this.one.redSub(this.c2.redMul(this.d).redMul(x2));

    var y2 = rhs.redMul(lhs.redInvm());
    var y = y2.redSqrt();
    if (y.redSqr().redSub(y2).cmp(this.zero) !== 0)
      throw new Error('invalid point');

    var isOdd = y.fromRed().isOdd();
    if (odd && !isOdd || !odd && isOdd)
      y = y.redNeg();

    return this.point(x, y);
  };

  EdwardsCurve.prototype.pointFromY = function pointFromY(y, odd) {
    y = new bn(y, 16);
    if (!y.red)
      y = y.toRed(this.red);

    // x^2 = (y^2 - c^2) / (c^2 d y^2 - a)
    var y2 = y.redSqr();
    var lhs = y2.redSub(this.c2);
    var rhs = y2.redMul(this.d).redMul(this.c2).redSub(this.a);
    var x2 = lhs.redMul(rhs.redInvm());

    if (x2.cmp(this.zero) === 0) {
      if (odd)
        throw new Error('invalid point');
      else
        return this.point(this.zero, y);
    }

    var x = x2.redSqrt();
    if (x.redSqr().redSub(x2).cmp(this.zero) !== 0)
      throw new Error('invalid point');

    if (x.fromRed().isOdd() !== odd)
      x = x.redNeg();

    return this.point(x, y);
  };

  EdwardsCurve.prototype.validate = function validate(point) {
    if (point.isInfinity())
      return true;

    // Curve: A * X^2 + Y^2 = C^2 * (1 + D * X^2 * Y^2)
    point.normalize();

    var x2 = point.x.redSqr();
    var y2 = point.y.redSqr();
    var lhs = x2.redMul(this.a).redAdd(y2);
    var rhs = this.c2.redMul(this.one.redAdd(this.d.redMul(x2).redMul(y2)));

    return lhs.cmp(rhs) === 0;
  };

  function Point(curve, x, y, z, t) {
    base.BasePoint.call(this, curve, 'projective');
    if (x === null && y === null && z === null) {
      this.x = this.curve.zero;
      this.y = this.curve.one;
      this.z = this.curve.one;
      this.t = this.curve.zero;
      this.zOne = true;
    } else {
      this.x = new bn(x, 16);
      this.y = new bn(y, 16);
      this.z = z ? new bn(z, 16) : this.curve.one;
      this.t = t && new bn(t, 16);
      if (!this.x.red)
        this.x = this.x.toRed(this.curve.red);
      if (!this.y.red)
        this.y = this.y.toRed(this.curve.red);
      if (!this.z.red)
        this.z = this.z.toRed(this.curve.red);
      if (this.t && !this.t.red)
        this.t = this.t.toRed(this.curve.red);
      this.zOne = this.z === this.curve.one;

      // Use extended coordinates
      if (this.curve.extended && !this.t) {
        this.t = this.x.redMul(this.y);
        if (!this.zOne)
          this.t = this.t.redMul(this.z.redInvm());
      }
    }
  }
  inherits_browser$1(Point, base.BasePoint);

  EdwardsCurve.prototype.pointFromJSON = function pointFromJSON(obj) {
    return Point.fromJSON(this, obj);
  };

  EdwardsCurve.prototype.point = function point(x, y, z, t) {
    return new Point(this, x, y, z, t);
  };

  Point.fromJSON = function fromJSON(curve, obj) {
    return new Point(curve, obj[0], obj[1], obj[2]);
  };

  Point.prototype.inspect = function inspect() {
    if (this.isInfinity())
      return '<EC Point Infinity>';
    return '<EC Point x: ' + this.x.fromRed().toString(16, 2) +
        ' y: ' + this.y.fromRed().toString(16, 2) +
        ' z: ' + this.z.fromRed().toString(16, 2) + '>';
  };

  Point.prototype.isInfinity = function isInfinity() {
    // XXX This code assumes that zero is always zero in red
    return this.x.cmpn(0) === 0 &&
      (this.y.cmp(this.z) === 0 ||
      (this.zOne && this.y.cmp(this.curve.c) === 0));
  };

  Point.prototype._extDbl = function _extDbl() {
    // hyperelliptic.org/EFD/g1p/auto-twisted-extended-1.html
    //     #doubling-dbl-2008-hwcd
    // 4M + 4S

    // A = X1^2
    var a = this.x.redSqr();
    // B = Y1^2
    var b = this.y.redSqr();
    // C = 2 * Z1^2
    var c = this.z.redSqr();
    c = c.redIAdd(c);
    // D = a * A
    var d = this.curve._mulA(a);
    // E = (X1 + Y1)^2 - A - B
    var e = this.x.redAdd(this.y).redSqr().redISub(a).redISub(b);
    // G = D + B
    var g = d.redAdd(b);
    // F = G - C
    var f = g.redSub(c);
    // H = D - B
    var h = d.redSub(b);
    // X3 = E * F
    var nx = e.redMul(f);
    // Y3 = G * H
    var ny = g.redMul(h);
    // T3 = E * H
    var nt = e.redMul(h);
    // Z3 = F * G
    var nz = f.redMul(g);
    return this.curve.point(nx, ny, nz, nt);
  };

  Point.prototype._projDbl = function _projDbl() {
    // hyperelliptic.org/EFD/g1p/auto-twisted-projective.html
    //     #doubling-dbl-2008-bbjlp
    //     #doubling-dbl-2007-bl
    // and others
    // Generally 3M + 4S or 2M + 4S

    // B = (X1 + Y1)^2
    var b = this.x.redAdd(this.y).redSqr();
    // C = X1^2
    var c = this.x.redSqr();
    // D = Y1^2
    var d = this.y.redSqr();

    var nx;
    var ny;
    var nz;
    var e;
    var h;
    var j;
    if (this.curve.twisted) {
      // E = a * C
      e = this.curve._mulA(c);
      // F = E + D
      var f = e.redAdd(d);
      if (this.zOne) {
        // X3 = (B - C - D) * (F - 2)
        nx = b.redSub(c).redSub(d).redMul(f.redSub(this.curve.two));
        // Y3 = F * (E - D)
        ny = f.redMul(e.redSub(d));
        // Z3 = F^2 - 2 * F
        nz = f.redSqr().redSub(f).redSub(f);
      } else {
        // H = Z1^2
        h = this.z.redSqr();
        // J = F - 2 * H
        j = f.redSub(h).redISub(h);
        // X3 = (B-C-D)*J
        nx = b.redSub(c).redISub(d).redMul(j);
        // Y3 = F * (E - D)
        ny = f.redMul(e.redSub(d));
        // Z3 = F * J
        nz = f.redMul(j);
      }
    } else {
      // E = C + D
      e = c.redAdd(d);
      // H = (c * Z1)^2
      h = this.curve._mulC(this.z).redSqr();
      // J = E - 2 * H
      j = e.redSub(h).redSub(h);
      // X3 = c * (B - E) * J
      nx = this.curve._mulC(b.redISub(e)).redMul(j);
      // Y3 = c * E * (C - D)
      ny = this.curve._mulC(e).redMul(c.redISub(d));
      // Z3 = E * J
      nz = e.redMul(j);
    }
    return this.curve.point(nx, ny, nz);
  };

  Point.prototype.dbl = function dbl() {
    if (this.isInfinity())
      return this;

    // Double in extended coordinates
    if (this.curve.extended)
      return this._extDbl();
    else
      return this._projDbl();
  };

  Point.prototype._extAdd = function _extAdd(p) {
    // hyperelliptic.org/EFD/g1p/auto-twisted-extended-1.html
    //     #addition-add-2008-hwcd-3
    // 8M

    // A = (Y1 - X1) * (Y2 - X2)
    var a = this.y.redSub(this.x).redMul(p.y.redSub(p.x));
    // B = (Y1 + X1) * (Y2 + X2)
    var b = this.y.redAdd(this.x).redMul(p.y.redAdd(p.x));
    // C = T1 * k * T2
    var c = this.t.redMul(this.curve.dd).redMul(p.t);
    // D = Z1 * 2 * Z2
    var d = this.z.redMul(p.z.redAdd(p.z));
    // E = B - A
    var e = b.redSub(a);
    // F = D - C
    var f = d.redSub(c);
    // G = D + C
    var g = d.redAdd(c);
    // H = B + A
    var h = b.redAdd(a);
    // X3 = E * F
    var nx = e.redMul(f);
    // Y3 = G * H
    var ny = g.redMul(h);
    // T3 = E * H
    var nt = e.redMul(h);
    // Z3 = F * G
    var nz = f.redMul(g);
    return this.curve.point(nx, ny, nz, nt);
  };

  Point.prototype._projAdd = function _projAdd(p) {
    // hyperelliptic.org/EFD/g1p/auto-twisted-projective.html
    //     #addition-add-2008-bbjlp
    //     #addition-add-2007-bl
    // 10M + 1S

    // A = Z1 * Z2
    var a = this.z.redMul(p.z);
    // B = A^2
    var b = a.redSqr();
    // C = X1 * X2
    var c = this.x.redMul(p.x);
    // D = Y1 * Y2
    var d = this.y.redMul(p.y);
    // E = d * C * D
    var e = this.curve.d.redMul(c).redMul(d);
    // F = B - E
    var f = b.redSub(e);
    // G = B + E
    var g = b.redAdd(e);
    // X3 = A * F * ((X1 + Y1) * (X2 + Y2) - C - D)
    var tmp = this.x.redAdd(this.y).redMul(p.x.redAdd(p.y)).redISub(c).redISub(d);
    var nx = a.redMul(f).redMul(tmp);
    var ny;
    var nz;
    if (this.curve.twisted) {
      // Y3 = A * G * (D - a * C)
      ny = a.redMul(g).redMul(d.redSub(this.curve._mulA(c)));
      // Z3 = F * G
      nz = f.redMul(g);
    } else {
      // Y3 = A * G * (D - C)
      ny = a.redMul(g).redMul(d.redSub(c));
      // Z3 = c * F * G
      nz = this.curve._mulC(f).redMul(g);
    }
    return this.curve.point(nx, ny, nz);
  };

  Point.prototype.add = function add(p) {
    if (this.isInfinity())
      return p;
    if (p.isInfinity())
      return this;

    if (this.curve.extended)
      return this._extAdd(p);
    else
      return this._projAdd(p);
  };

  Point.prototype.mul = function mul(k) {
    if (this._hasDoubles(k))
      return this.curve._fixedNafMul(this, k);
    else
      return this.curve._wnafMul(this, k);
  };

  Point.prototype.mulAdd = function mulAdd(k1, p, k2) {
    return this.curve._wnafMulAdd(1, [ this, p ], [ k1, k2 ], 2, false);
  };

  Point.prototype.jmulAdd = function jmulAdd(k1, p, k2) {
    return this.curve._wnafMulAdd(1, [ this, p ], [ k1, k2 ], 2, true);
  };

  Point.prototype.normalize = function normalize() {
    if (this.zOne)
      return this;

    // Normalize coordinates
    var zi = this.z.redInvm();
    this.x = this.x.redMul(zi);
    this.y = this.y.redMul(zi);
    if (this.t)
      this.t = this.t.redMul(zi);
    this.z = this.curve.one;
    this.zOne = true;
    return this;
  };

  Point.prototype.neg = function neg() {
    return this.curve.point(this.x.redNeg(),
      this.y,
      this.z,
      this.t && this.t.redNeg());
  };

  Point.prototype.getX = function getX() {
    this.normalize();
    return this.x.fromRed();
  };

  Point.prototype.getY = function getY() {
    this.normalize();
    return this.y.fromRed();
  };

  Point.prototype.eq = function eq(other) {
    return this === other ||
           this.getX().cmp(other.getX()) === 0 &&
           this.getY().cmp(other.getY()) === 0;
  };

  Point.prototype.eqXToP = function eqXToP(x) {
    var rx = x.toRed(this.curve.red).redMul(this.z);
    if (this.x.cmp(rx) === 0)
      return true;

    var xc = x.clone();
    var t = this.curve.redN.redMul(this.z);
    for (;;) {
      xc.iadd(this.curve.n);
      if (xc.cmp(this.curve.p) >= 0)
        return false;

      rx.redIAdd(t);
      if (this.x.cmp(rx) === 0)
        return true;
    }
  };

  // Compatibility with BaseCurve
  Point.prototype.toP = Point.prototype.normalize;
  Point.prototype.mixedAdd = Point.prototype.add;

  var curve_1 = createCommonjsModule(function (module, exports) {

  var curve = exports;

  curve.base = base;
  curve.short = short;
  curve.mont = mont;
  curve.edwards = edwards;
  });

  var inherits_browser = createCommonjsModule(function (module) {
  if (typeof Object.create === 'function') {
    // implementation from standard node.js 'util' module
    module.exports = function inherits(ctor, superCtor) {
      ctor.super_ = superCtor;
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
    };
  } else {
    // old school shim for old browsers
    module.exports = function inherits(ctor, superCtor) {
      ctor.super_ = superCtor;
      var TempCtor = function () {};
      TempCtor.prototype = superCtor.prototype;
      ctor.prototype = new TempCtor();
      ctor.prototype.constructor = ctor;
    };
  }
  });

  var inherits_1 = inherits_browser;

  function isSurrogatePair(msg, i) {
    if ((msg.charCodeAt(i) & 0xFC00) !== 0xD800) {
      return false;
    }
    if (i < 0 || i + 1 >= msg.length) {
      return false;
    }
    return (msg.charCodeAt(i + 1) & 0xFC00) === 0xDC00;
  }

  function toArray(msg, enc) {
    if (Array.isArray(msg))
      return msg.slice();
    if (!msg)
      return [];
    var res = [];
    if (typeof msg === 'string') {
      if (!enc) {
        // Inspired by stringToUtf8ByteArray() in closure-library by Google
        // https://github.com/google/closure-library/blob/8598d87242af59aac233270742c8984e2b2bdbe0/closure/goog/crypt/crypt.js#L117-L143
        // Apache License 2.0
        // https://github.com/google/closure-library/blob/master/LICENSE
        var p = 0;
        for (var i = 0; i < msg.length; i++) {
          var c = msg.charCodeAt(i);
          if (c < 128) {
            res[p++] = c;
          } else if (c < 2048) {
            res[p++] = (c >> 6) | 192;
            res[p++] = (c & 63) | 128;
          } else if (isSurrogatePair(msg, i)) {
            c = 0x10000 + ((c & 0x03FF) << 10) + (msg.charCodeAt(++i) & 0x03FF);
            res[p++] = (c >> 18) | 240;
            res[p++] = ((c >> 12) & 63) | 128;
            res[p++] = ((c >> 6) & 63) | 128;
            res[p++] = (c & 63) | 128;
          } else {
            res[p++] = (c >> 12) | 224;
            res[p++] = ((c >> 6) & 63) | 128;
            res[p++] = (c & 63) | 128;
          }
        }
      } else if (enc === 'hex') {
        msg = msg.replace(/[^a-z0-9]+/ig, '');
        if (msg.length % 2 !== 0)
          msg = '0' + msg;
        for (i = 0; i < msg.length; i += 2)
          res.push(parseInt(msg[i] + msg[i + 1], 16));
      }
    } else {
      for (i = 0; i < msg.length; i++)
        res[i] = msg[i] | 0;
    }
    return res;
  }
  var toArray_1 = toArray;

  function toHex(msg) {
    var res = '';
    for (var i = 0; i < msg.length; i++)
      res += zero2(msg[i].toString(16));
    return res;
  }
  var toHex_1 = toHex;

  function htonl(w) {
    var res = (w >>> 24) |
              ((w >>> 8) & 0xff00) |
              ((w << 8) & 0xff0000) |
              ((w & 0xff) << 24);
    return res >>> 0;
  }
  var htonl_1 = htonl;

  function toHex32(msg, endian) {
    var res = '';
    for (var i = 0; i < msg.length; i++) {
      var w = msg[i];
      if (endian === 'little')
        w = htonl(w);
      res += zero8(w.toString(16));
    }
    return res;
  }
  var toHex32_1 = toHex32;

  function zero2(word) {
    if (word.length === 1)
      return '0' + word;
    else
      return word;
  }
  var zero2_1 = zero2;

  function zero8(word) {
    if (word.length === 7)
      return '0' + word;
    else if (word.length === 6)
      return '00' + word;
    else if (word.length === 5)
      return '000' + word;
    else if (word.length === 4)
      return '0000' + word;
    else if (word.length === 3)
      return '00000' + word;
    else if (word.length === 2)
      return '000000' + word;
    else if (word.length === 1)
      return '0000000' + word;
    else
      return word;
  }
  var zero8_1 = zero8;

  function join32(msg, start, end, endian) {
    var len = end - start;
    minimalisticAssert(len % 4 === 0);
    var res = new Array(len / 4);
    for (var i = 0, k = start; i < res.length; i++, k += 4) {
      var w;
      if (endian === 'big')
        w = (msg[k] << 24) | (msg[k + 1] << 16) | (msg[k + 2] << 8) | msg[k + 3];
      else
        w = (msg[k + 3] << 24) | (msg[k + 2] << 16) | (msg[k + 1] << 8) | msg[k];
      res[i] = w >>> 0;
    }
    return res;
  }
  var join32_1 = join32;

  function split32(msg, endian) {
    var res = new Array(msg.length * 4);
    for (var i = 0, k = 0; i < msg.length; i++, k += 4) {
      var m = msg[i];
      if (endian === 'big') {
        res[k] = m >>> 24;
        res[k + 1] = (m >>> 16) & 0xff;
        res[k + 2] = (m >>> 8) & 0xff;
        res[k + 3] = m & 0xff;
      } else {
        res[k + 3] = m >>> 24;
        res[k + 2] = (m >>> 16) & 0xff;
        res[k + 1] = (m >>> 8) & 0xff;
        res[k] = m & 0xff;
      }
    }
    return res;
  }
  var split32_1 = split32;

  function rotr32$1(w, b) {
    return (w >>> b) | (w << (32 - b));
  }
  var rotr32_1 = rotr32$1;

  function rotl32$2(w, b) {
    return (w << b) | (w >>> (32 - b));
  }
  var rotl32_1 = rotl32$2;

  function sum32$3(a, b) {
    return (a + b) >>> 0;
  }
  var sum32_1 = sum32$3;

  function sum32_3$1(a, b, c) {
    return (a + b + c) >>> 0;
  }
  var sum32_3_1 = sum32_3$1;

  function sum32_4$2(a, b, c, d) {
    return (a + b + c + d) >>> 0;
  }
  var sum32_4_1 = sum32_4$2;

  function sum32_5$2(a, b, c, d, e) {
    return (a + b + c + d + e) >>> 0;
  }
  var sum32_5_1 = sum32_5$2;

  function sum64$1(buf, pos, ah, al) {
    var bh = buf[pos];
    var bl = buf[pos + 1];

    var lo = (al + bl) >>> 0;
    var hi = (lo < al ? 1 : 0) + ah + bh;
    buf[pos] = hi >>> 0;
    buf[pos + 1] = lo;
  }
  var sum64_1 = sum64$1;

  function sum64_hi$1(ah, al, bh, bl) {
    var lo = (al + bl) >>> 0;
    var hi = (lo < al ? 1 : 0) + ah + bh;
    return hi >>> 0;
  }
  var sum64_hi_1 = sum64_hi$1;

  function sum64_lo$1(ah, al, bh, bl) {
    var lo = al + bl;
    return lo >>> 0;
  }
  var sum64_lo_1 = sum64_lo$1;

  function sum64_4_hi$1(ah, al, bh, bl, ch, cl, dh, dl) {
    var carry = 0;
    var lo = al;
    lo = (lo + bl) >>> 0;
    carry += lo < al ? 1 : 0;
    lo = (lo + cl) >>> 0;
    carry += lo < cl ? 1 : 0;
    lo = (lo + dl) >>> 0;
    carry += lo < dl ? 1 : 0;

    var hi = ah + bh + ch + dh + carry;
    return hi >>> 0;
  }
  var sum64_4_hi_1 = sum64_4_hi$1;

  function sum64_4_lo$1(ah, al, bh, bl, ch, cl, dh, dl) {
    var lo = al + bl + cl + dl;
    return lo >>> 0;
  }
  var sum64_4_lo_1 = sum64_4_lo$1;

  function sum64_5_hi$1(ah, al, bh, bl, ch, cl, dh, dl, eh, el) {
    var carry = 0;
    var lo = al;
    lo = (lo + bl) >>> 0;
    carry += lo < al ? 1 : 0;
    lo = (lo + cl) >>> 0;
    carry += lo < cl ? 1 : 0;
    lo = (lo + dl) >>> 0;
    carry += lo < dl ? 1 : 0;
    lo = (lo + el) >>> 0;
    carry += lo < el ? 1 : 0;

    var hi = ah + bh + ch + dh + eh + carry;
    return hi >>> 0;
  }
  var sum64_5_hi_1 = sum64_5_hi$1;

  function sum64_5_lo$1(ah, al, bh, bl, ch, cl, dh, dl, eh, el) {
    var lo = al + bl + cl + dl + el;

    return lo >>> 0;
  }
  var sum64_5_lo_1 = sum64_5_lo$1;

  function rotr64_hi$1(ah, al, num) {
    var r = (al << (32 - num)) | (ah >>> num);
    return r >>> 0;
  }
  var rotr64_hi_1 = rotr64_hi$1;

  function rotr64_lo$1(ah, al, num) {
    var r = (ah << (32 - num)) | (al >>> num);
    return r >>> 0;
  }
  var rotr64_lo_1 = rotr64_lo$1;

  function shr64_hi$1(ah, al, num) {
    return ah >>> num;
  }
  var shr64_hi_1 = shr64_hi$1;

  function shr64_lo$1(ah, al, num) {
    var r = (ah << (32 - num)) | (al >>> num);
    return r >>> 0;
  }
  var shr64_lo_1 = shr64_lo$1;

  var utils = {
  	inherits: inherits_1,
  	toArray: toArray_1,
  	toHex: toHex_1,
  	htonl: htonl_1,
  	toHex32: toHex32_1,
  	zero2: zero2_1,
  	zero8: zero8_1,
  	join32: join32_1,
  	split32: split32_1,
  	rotr32: rotr32_1,
  	rotl32: rotl32_1,
  	sum32: sum32_1,
  	sum32_3: sum32_3_1,
  	sum32_4: sum32_4_1,
  	sum32_5: sum32_5_1,
  	sum64: sum64_1,
  	sum64_hi: sum64_hi_1,
  	sum64_lo: sum64_lo_1,
  	sum64_4_hi: sum64_4_hi_1,
  	sum64_4_lo: sum64_4_lo_1,
  	sum64_5_hi: sum64_5_hi_1,
  	sum64_5_lo: sum64_5_lo_1,
  	rotr64_hi: rotr64_hi_1,
  	rotr64_lo: rotr64_lo_1,
  	shr64_hi: shr64_hi_1,
  	shr64_lo: shr64_lo_1
  };

  function BlockHash$4() {
    this.pending = null;
    this.pendingTotal = 0;
    this.blockSize = this.constructor.blockSize;
    this.outSize = this.constructor.outSize;
    this.hmacStrength = this.constructor.hmacStrength;
    this.padLength = this.constructor.padLength / 8;
    this.endian = 'big';

    this._delta8 = this.blockSize / 8;
    this._delta32 = this.blockSize / 32;
  }
  var BlockHash_1 = BlockHash$4;

  BlockHash$4.prototype.update = function update(msg, enc) {
    // Convert message to array, pad it, and join into 32bit blocks
    msg = utils.toArray(msg, enc);
    if (!this.pending)
      this.pending = msg;
    else
      this.pending = this.pending.concat(msg);
    this.pendingTotal += msg.length;

    // Enough data, try updating
    if (this.pending.length >= this._delta8) {
      msg = this.pending;

      // Process pending data in blocks
      var r = msg.length % this._delta8;
      this.pending = msg.slice(msg.length - r, msg.length);
      if (this.pending.length === 0)
        this.pending = null;

      msg = utils.join32(msg, 0, msg.length - r, this.endian);
      for (var i = 0; i < msg.length; i += this._delta32)
        this._update(msg, i, i + this._delta32);
    }

    return this;
  };

  BlockHash$4.prototype.digest = function digest(enc) {
    this.update(this._pad());
    minimalisticAssert(this.pending === null);

    return this._digest(enc);
  };

  BlockHash$4.prototype._pad = function pad() {
    var len = this.pendingTotal;
    var bytes = this._delta8;
    var k = bytes - ((len + this.padLength) % bytes);
    var res = new Array(k + this.padLength);
    res[0] = 0x80;
    for (var i = 1; i < k; i++)
      res[i] = 0;

    // Append length
    len <<= 3;
    if (this.endian === 'big') {
      for (var t = 8; t < this.padLength; t++)
        res[i++] = 0;

      res[i++] = 0;
      res[i++] = 0;
      res[i++] = 0;
      res[i++] = 0;
      res[i++] = (len >>> 24) & 0xff;
      res[i++] = (len >>> 16) & 0xff;
      res[i++] = (len >>> 8) & 0xff;
      res[i++] = len & 0xff;
    } else {
      res[i++] = len & 0xff;
      res[i++] = (len >>> 8) & 0xff;
      res[i++] = (len >>> 16) & 0xff;
      res[i++] = (len >>> 24) & 0xff;
      res[i++] = 0;
      res[i++] = 0;
      res[i++] = 0;
      res[i++] = 0;

      for (t = 8; t < this.padLength; t++)
        res[i++] = 0;
    }

    return res;
  };

  var common$1 = {
  	BlockHash: BlockHash_1
  };

  var rotr32 = utils.rotr32;

  function ft_1$1(s, x, y, z) {
    if (s === 0)
      return ch32$1(x, y, z);
    if (s === 1 || s === 3)
      return p32(x, y, z);
    if (s === 2)
      return maj32$1(x, y, z);
  }
  var ft_1_1 = ft_1$1;

  function ch32$1(x, y, z) {
    return (x & y) ^ ((~x) & z);
  }
  var ch32_1 = ch32$1;

  function maj32$1(x, y, z) {
    return (x & y) ^ (x & z) ^ (y & z);
  }
  var maj32_1 = maj32$1;

  function p32(x, y, z) {
    return x ^ y ^ z;
  }
  var p32_1 = p32;

  function s0_256$1(x) {
    return rotr32(x, 2) ^ rotr32(x, 13) ^ rotr32(x, 22);
  }
  var s0_256_1 = s0_256$1;

  function s1_256$1(x) {
    return rotr32(x, 6) ^ rotr32(x, 11) ^ rotr32(x, 25);
  }
  var s1_256_1 = s1_256$1;

  function g0_256$1(x) {
    return rotr32(x, 7) ^ rotr32(x, 18) ^ (x >>> 3);
  }
  var g0_256_1 = g0_256$1;

  function g1_256$1(x) {
    return rotr32(x, 17) ^ rotr32(x, 19) ^ (x >>> 10);
  }
  var g1_256_1 = g1_256$1;

  var common = {
  	ft_1: ft_1_1,
  	ch32: ch32_1,
  	maj32: maj32_1,
  	p32: p32_1,
  	s0_256: s0_256_1,
  	s1_256: s1_256_1,
  	g0_256: g0_256_1,
  	g1_256: g1_256_1
  };

  var rotl32$1 = utils.rotl32;
  var sum32$2 = utils.sum32;
  var sum32_5$1 = utils.sum32_5;
  var ft_1 = common.ft_1;
  var BlockHash$3 = common$1.BlockHash;

  var sha1_K = [
    0x5A827999, 0x6ED9EBA1,
    0x8F1BBCDC, 0xCA62C1D6
  ];

  function SHA1() {
    if (!(this instanceof SHA1))
      return new SHA1();

    BlockHash$3.call(this);
    this.h = [
      0x67452301, 0xefcdab89, 0x98badcfe,
      0x10325476, 0xc3d2e1f0 ];
    this.W = new Array(80);
  }

  utils.inherits(SHA1, BlockHash$3);
  var _1 = SHA1;

  SHA1.blockSize = 512;
  SHA1.outSize = 160;
  SHA1.hmacStrength = 80;
  SHA1.padLength = 64;

  SHA1.prototype._update = function _update(msg, start) {
    var W = this.W;

    for (var i = 0; i < 16; i++)
      W[i] = msg[start + i];

    for(; i < W.length; i++)
      W[i] = rotl32$1(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);

    var a = this.h[0];
    var b = this.h[1];
    var c = this.h[2];
    var d = this.h[3];
    var e = this.h[4];

    for (i = 0; i < W.length; i++) {
      var s = ~~(i / 20);
      var t = sum32_5$1(rotl32$1(a, 5), ft_1(s, b, c, d), e, W[i], sha1_K[s]);
      e = d;
      d = c;
      c = rotl32$1(b, 30);
      b = a;
      a = t;
    }

    this.h[0] = sum32$2(this.h[0], a);
    this.h[1] = sum32$2(this.h[1], b);
    this.h[2] = sum32$2(this.h[2], c);
    this.h[3] = sum32$2(this.h[3], d);
    this.h[4] = sum32$2(this.h[4], e);
  };

  SHA1.prototype._digest = function digest(enc) {
    if (enc === 'hex')
      return utils.toHex32(this.h, 'big');
    else
      return utils.split32(this.h, 'big');
  };

  var sum32$1 = utils.sum32;
  var sum32_4$1 = utils.sum32_4;
  var sum32_5 = utils.sum32_5;
  var ch32 = common.ch32;
  var maj32 = common.maj32;
  var s0_256 = common.s0_256;
  var s1_256 = common.s1_256;
  var g0_256 = common.g0_256;
  var g1_256 = common.g1_256;

  var BlockHash$2 = common$1.BlockHash;

  var sha256_K = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5,
    0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
    0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
    0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7,
    0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
    0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3,
    0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5,
    0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
    0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
  ];

  function SHA256() {
    if (!(this instanceof SHA256))
      return new SHA256();

    BlockHash$2.call(this);
    this.h = [
      0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
      0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
    ];
    this.k = sha256_K;
    this.W = new Array(64);
  }
  utils.inherits(SHA256, BlockHash$2);
  var _256 = SHA256;

  SHA256.blockSize = 512;
  SHA256.outSize = 256;
  SHA256.hmacStrength = 192;
  SHA256.padLength = 64;

  SHA256.prototype._update = function _update(msg, start) {
    var W = this.W;

    for (var i = 0; i < 16; i++)
      W[i] = msg[start + i];
    for (; i < W.length; i++)
      W[i] = sum32_4$1(g1_256(W[i - 2]), W[i - 7], g0_256(W[i - 15]), W[i - 16]);

    var a = this.h[0];
    var b = this.h[1];
    var c = this.h[2];
    var d = this.h[3];
    var e = this.h[4];
    var f = this.h[5];
    var g = this.h[6];
    var h = this.h[7];

    minimalisticAssert(this.k.length === W.length);
    for (i = 0; i < W.length; i++) {
      var T1 = sum32_5(h, s1_256(e), ch32(e, f, g), this.k[i], W[i]);
      var T2 = sum32$1(s0_256(a), maj32(a, b, c));
      h = g;
      g = f;
      f = e;
      e = sum32$1(d, T1);
      d = c;
      c = b;
      b = a;
      a = sum32$1(T1, T2);
    }

    this.h[0] = sum32$1(this.h[0], a);
    this.h[1] = sum32$1(this.h[1], b);
    this.h[2] = sum32$1(this.h[2], c);
    this.h[3] = sum32$1(this.h[3], d);
    this.h[4] = sum32$1(this.h[4], e);
    this.h[5] = sum32$1(this.h[5], f);
    this.h[6] = sum32$1(this.h[6], g);
    this.h[7] = sum32$1(this.h[7], h);
  };

  SHA256.prototype._digest = function digest(enc) {
    if (enc === 'hex')
      return utils.toHex32(this.h, 'big');
    else
      return utils.split32(this.h, 'big');
  };

  function SHA224() {
    if (!(this instanceof SHA224))
      return new SHA224();

    _256.call(this);
    this.h = [
      0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939,
      0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4 ];
  }
  utils.inherits(SHA224, _256);
  var _224 = SHA224;

  SHA224.blockSize = 512;
  SHA224.outSize = 224;
  SHA224.hmacStrength = 192;
  SHA224.padLength = 64;

  SHA224.prototype._digest = function digest(enc) {
    // Just truncate output
    if (enc === 'hex')
      return utils.toHex32(this.h.slice(0, 7), 'big');
    else
      return utils.split32(this.h.slice(0, 7), 'big');
  };

  var rotr64_hi = utils.rotr64_hi;
  var rotr64_lo = utils.rotr64_lo;
  var shr64_hi = utils.shr64_hi;
  var shr64_lo = utils.shr64_lo;
  var sum64 = utils.sum64;
  var sum64_hi = utils.sum64_hi;
  var sum64_lo = utils.sum64_lo;
  var sum64_4_hi = utils.sum64_4_hi;
  var sum64_4_lo = utils.sum64_4_lo;
  var sum64_5_hi = utils.sum64_5_hi;
  var sum64_5_lo = utils.sum64_5_lo;

  var BlockHash$1 = common$1.BlockHash;

  var sha512_K = [
    0x428a2f98, 0xd728ae22, 0x71374491, 0x23ef65cd,
    0xb5c0fbcf, 0xec4d3b2f, 0xe9b5dba5, 0x8189dbbc,
    0x3956c25b, 0xf348b538, 0x59f111f1, 0xb605d019,
    0x923f82a4, 0xaf194f9b, 0xab1c5ed5, 0xda6d8118,
    0xd807aa98, 0xa3030242, 0x12835b01, 0x45706fbe,
    0x243185be, 0x4ee4b28c, 0x550c7dc3, 0xd5ffb4e2,
    0x72be5d74, 0xf27b896f, 0x80deb1fe, 0x3b1696b1,
    0x9bdc06a7, 0x25c71235, 0xc19bf174, 0xcf692694,
    0xe49b69c1, 0x9ef14ad2, 0xefbe4786, 0x384f25e3,
    0x0fc19dc6, 0x8b8cd5b5, 0x240ca1cc, 0x77ac9c65,
    0x2de92c6f, 0x592b0275, 0x4a7484aa, 0x6ea6e483,
    0x5cb0a9dc, 0xbd41fbd4, 0x76f988da, 0x831153b5,
    0x983e5152, 0xee66dfab, 0xa831c66d, 0x2db43210,
    0xb00327c8, 0x98fb213f, 0xbf597fc7, 0xbeef0ee4,
    0xc6e00bf3, 0x3da88fc2, 0xd5a79147, 0x930aa725,
    0x06ca6351, 0xe003826f, 0x14292967, 0x0a0e6e70,
    0x27b70a85, 0x46d22ffc, 0x2e1b2138, 0x5c26c926,
    0x4d2c6dfc, 0x5ac42aed, 0x53380d13, 0x9d95b3df,
    0x650a7354, 0x8baf63de, 0x766a0abb, 0x3c77b2a8,
    0x81c2c92e, 0x47edaee6, 0x92722c85, 0x1482353b,
    0xa2bfe8a1, 0x4cf10364, 0xa81a664b, 0xbc423001,
    0xc24b8b70, 0xd0f89791, 0xc76c51a3, 0x0654be30,
    0xd192e819, 0xd6ef5218, 0xd6990624, 0x5565a910,
    0xf40e3585, 0x5771202a, 0x106aa070, 0x32bbd1b8,
    0x19a4c116, 0xb8d2d0c8, 0x1e376c08, 0x5141ab53,
    0x2748774c, 0xdf8eeb99, 0x34b0bcb5, 0xe19b48a8,
    0x391c0cb3, 0xc5c95a63, 0x4ed8aa4a, 0xe3418acb,
    0x5b9cca4f, 0x7763e373, 0x682e6ff3, 0xd6b2b8a3,
    0x748f82ee, 0x5defb2fc, 0x78a5636f, 0x43172f60,
    0x84c87814, 0xa1f0ab72, 0x8cc70208, 0x1a6439ec,
    0x90befffa, 0x23631e28, 0xa4506ceb, 0xde82bde9,
    0xbef9a3f7, 0xb2c67915, 0xc67178f2, 0xe372532b,
    0xca273ece, 0xea26619c, 0xd186b8c7, 0x21c0c207,
    0xeada7dd6, 0xcde0eb1e, 0xf57d4f7f, 0xee6ed178,
    0x06f067aa, 0x72176fba, 0x0a637dc5, 0xa2c898a6,
    0x113f9804, 0xbef90dae, 0x1b710b35, 0x131c471b,
    0x28db77f5, 0x23047d84, 0x32caab7b, 0x40c72493,
    0x3c9ebe0a, 0x15c9bebc, 0x431d67c4, 0x9c100d4c,
    0x4cc5d4be, 0xcb3e42b6, 0x597f299c, 0xfc657e2a,
    0x5fcb6fab, 0x3ad6faec, 0x6c44198c, 0x4a475817
  ];

  function SHA512() {
    if (!(this instanceof SHA512))
      return new SHA512();

    BlockHash$1.call(this);
    this.h = [
      0x6a09e667, 0xf3bcc908,
      0xbb67ae85, 0x84caa73b,
      0x3c6ef372, 0xfe94f82b,
      0xa54ff53a, 0x5f1d36f1,
      0x510e527f, 0xade682d1,
      0x9b05688c, 0x2b3e6c1f,
      0x1f83d9ab, 0xfb41bd6b,
      0x5be0cd19, 0x137e2179 ];
    this.k = sha512_K;
    this.W = new Array(160);
  }
  utils.inherits(SHA512, BlockHash$1);
  var _512 = SHA512;

  SHA512.blockSize = 1024;
  SHA512.outSize = 512;
  SHA512.hmacStrength = 192;
  SHA512.padLength = 128;

  SHA512.prototype._prepareBlock = function _prepareBlock(msg, start) {
    var W = this.W;

    // 32 x 32bit words
    for (var i = 0; i < 32; i++)
      W[i] = msg[start + i];
    for (; i < W.length; i += 2) {
      var c0_hi = g1_512_hi(W[i - 4], W[i - 3]);  // i - 2
      var c0_lo = g1_512_lo(W[i - 4], W[i - 3]);
      var c1_hi = W[i - 14];  // i - 7
      var c1_lo = W[i - 13];
      var c2_hi = g0_512_hi(W[i - 30], W[i - 29]);  // i - 15
      var c2_lo = g0_512_lo(W[i - 30], W[i - 29]);
      var c3_hi = W[i - 32];  // i - 16
      var c3_lo = W[i - 31];

      W[i] = sum64_4_hi(
        c0_hi, c0_lo,
        c1_hi, c1_lo,
        c2_hi, c2_lo,
        c3_hi, c3_lo);
      W[i + 1] = sum64_4_lo(
        c0_hi, c0_lo,
        c1_hi, c1_lo,
        c2_hi, c2_lo,
        c3_hi, c3_lo);
    }
  };

  SHA512.prototype._update = function _update(msg, start) {
    this._prepareBlock(msg, start);

    var W = this.W;

    var ah = this.h[0];
    var al = this.h[1];
    var bh = this.h[2];
    var bl = this.h[3];
    var ch = this.h[4];
    var cl = this.h[5];
    var dh = this.h[6];
    var dl = this.h[7];
    var eh = this.h[8];
    var el = this.h[9];
    var fh = this.h[10];
    var fl = this.h[11];
    var gh = this.h[12];
    var gl = this.h[13];
    var hh = this.h[14];
    var hl = this.h[15];

    minimalisticAssert(this.k.length === W.length);
    for (var i = 0; i < W.length; i += 2) {
      var c0_hi = hh;
      var c0_lo = hl;
      var c1_hi = s1_512_hi(eh, el);
      var c1_lo = s1_512_lo(eh, el);
      var c2_hi = ch64_hi(eh, el, fh, fl, gh);
      var c2_lo = ch64_lo(eh, el, fh, fl, gh, gl);
      var c3_hi = this.k[i];
      var c3_lo = this.k[i + 1];
      var c4_hi = W[i];
      var c4_lo = W[i + 1];

      var T1_hi = sum64_5_hi(
        c0_hi, c0_lo,
        c1_hi, c1_lo,
        c2_hi, c2_lo,
        c3_hi, c3_lo,
        c4_hi, c4_lo);
      var T1_lo = sum64_5_lo(
        c0_hi, c0_lo,
        c1_hi, c1_lo,
        c2_hi, c2_lo,
        c3_hi, c3_lo,
        c4_hi, c4_lo);

      c0_hi = s0_512_hi(ah, al);
      c0_lo = s0_512_lo(ah, al);
      c1_hi = maj64_hi(ah, al, bh, bl, ch);
      c1_lo = maj64_lo(ah, al, bh, bl, ch, cl);

      var T2_hi = sum64_hi(c0_hi, c0_lo, c1_hi, c1_lo);
      var T2_lo = sum64_lo(c0_hi, c0_lo, c1_hi, c1_lo);

      hh = gh;
      hl = gl;

      gh = fh;
      gl = fl;

      fh = eh;
      fl = el;

      eh = sum64_hi(dh, dl, T1_hi, T1_lo);
      el = sum64_lo(dl, dl, T1_hi, T1_lo);

      dh = ch;
      dl = cl;

      ch = bh;
      cl = bl;

      bh = ah;
      bl = al;

      ah = sum64_hi(T1_hi, T1_lo, T2_hi, T2_lo);
      al = sum64_lo(T1_hi, T1_lo, T2_hi, T2_lo);
    }

    sum64(this.h, 0, ah, al);
    sum64(this.h, 2, bh, bl);
    sum64(this.h, 4, ch, cl);
    sum64(this.h, 6, dh, dl);
    sum64(this.h, 8, eh, el);
    sum64(this.h, 10, fh, fl);
    sum64(this.h, 12, gh, gl);
    sum64(this.h, 14, hh, hl);
  };

  SHA512.prototype._digest = function digest(enc) {
    if (enc === 'hex')
      return utils.toHex32(this.h, 'big');
    else
      return utils.split32(this.h, 'big');
  };

  function ch64_hi(xh, xl, yh, yl, zh) {
    var r = (xh & yh) ^ ((~xh) & zh);
    if (r < 0)
      r += 0x100000000;
    return r;
  }

  function ch64_lo(xh, xl, yh, yl, zh, zl) {
    var r = (xl & yl) ^ ((~xl) & zl);
    if (r < 0)
      r += 0x100000000;
    return r;
  }

  function maj64_hi(xh, xl, yh, yl, zh) {
    var r = (xh & yh) ^ (xh & zh) ^ (yh & zh);
    if (r < 0)
      r += 0x100000000;
    return r;
  }

  function maj64_lo(xh, xl, yh, yl, zh, zl) {
    var r = (xl & yl) ^ (xl & zl) ^ (yl & zl);
    if (r < 0)
      r += 0x100000000;
    return r;
  }

  function s0_512_hi(xh, xl) {
    var c0_hi = rotr64_hi(xh, xl, 28);
    var c1_hi = rotr64_hi(xl, xh, 2);  // 34
    var c2_hi = rotr64_hi(xl, xh, 7);  // 39

    var r = c0_hi ^ c1_hi ^ c2_hi;
    if (r < 0)
      r += 0x100000000;
    return r;
  }

  function s0_512_lo(xh, xl) {
    var c0_lo = rotr64_lo(xh, xl, 28);
    var c1_lo = rotr64_lo(xl, xh, 2);  // 34
    var c2_lo = rotr64_lo(xl, xh, 7);  // 39

    var r = c0_lo ^ c1_lo ^ c2_lo;
    if (r < 0)
      r += 0x100000000;
    return r;
  }

  function s1_512_hi(xh, xl) {
    var c0_hi = rotr64_hi(xh, xl, 14);
    var c1_hi = rotr64_hi(xh, xl, 18);
    var c2_hi = rotr64_hi(xl, xh, 9);  // 41

    var r = c0_hi ^ c1_hi ^ c2_hi;
    if (r < 0)
      r += 0x100000000;
    return r;
  }

  function s1_512_lo(xh, xl) {
    var c0_lo = rotr64_lo(xh, xl, 14);
    var c1_lo = rotr64_lo(xh, xl, 18);
    var c2_lo = rotr64_lo(xl, xh, 9);  // 41

    var r = c0_lo ^ c1_lo ^ c2_lo;
    if (r < 0)
      r += 0x100000000;
    return r;
  }

  function g0_512_hi(xh, xl) {
    var c0_hi = rotr64_hi(xh, xl, 1);
    var c1_hi = rotr64_hi(xh, xl, 8);
    var c2_hi = shr64_hi(xh, xl, 7);

    var r = c0_hi ^ c1_hi ^ c2_hi;
    if (r < 0)
      r += 0x100000000;
    return r;
  }

  function g0_512_lo(xh, xl) {
    var c0_lo = rotr64_lo(xh, xl, 1);
    var c1_lo = rotr64_lo(xh, xl, 8);
    var c2_lo = shr64_lo(xh, xl, 7);

    var r = c0_lo ^ c1_lo ^ c2_lo;
    if (r < 0)
      r += 0x100000000;
    return r;
  }

  function g1_512_hi(xh, xl) {
    var c0_hi = rotr64_hi(xh, xl, 19);
    var c1_hi = rotr64_hi(xl, xh, 29);  // 61
    var c2_hi = shr64_hi(xh, xl, 6);

    var r = c0_hi ^ c1_hi ^ c2_hi;
    if (r < 0)
      r += 0x100000000;
    return r;
  }

  function g1_512_lo(xh, xl) {
    var c0_lo = rotr64_lo(xh, xl, 19);
    var c1_lo = rotr64_lo(xl, xh, 29);  // 61
    var c2_lo = shr64_lo(xh, xl, 6);

    var r = c0_lo ^ c1_lo ^ c2_lo;
    if (r < 0)
      r += 0x100000000;
    return r;
  }

  function SHA384() {
    if (!(this instanceof SHA384))
      return new SHA384();

    _512.call(this);
    this.h = [
      0xcbbb9d5d, 0xc1059ed8,
      0x629a292a, 0x367cd507,
      0x9159015a, 0x3070dd17,
      0x152fecd8, 0xf70e5939,
      0x67332667, 0xffc00b31,
      0x8eb44a87, 0x68581511,
      0xdb0c2e0d, 0x64f98fa7,
      0x47b5481d, 0xbefa4fa4 ];
  }
  utils.inherits(SHA384, _512);
  var _384 = SHA384;

  SHA384.blockSize = 1024;
  SHA384.outSize = 384;
  SHA384.hmacStrength = 192;
  SHA384.padLength = 128;

  SHA384.prototype._digest = function digest(enc) {
    if (enc === 'hex')
      return utils.toHex32(this.h.slice(0, 12), 'big');
    else
      return utils.split32(this.h.slice(0, 12), 'big');
  };

  var sha1 = _1;
  var sha224 = _224;
  var sha256 = _256;
  var sha384 = _384;
  var sha512 = _512;

  var sha = {
  	sha1: sha1,
  	sha224: sha224,
  	sha256: sha256,
  	sha384: sha384,
  	sha512: sha512
  };

  var rotl32 = utils.rotl32;
  var sum32 = utils.sum32;
  var sum32_3 = utils.sum32_3;
  var sum32_4 = utils.sum32_4;
  var BlockHash = common$1.BlockHash;

  function RIPEMD160() {
    if (!(this instanceof RIPEMD160))
      return new RIPEMD160();

    BlockHash.call(this);

    this.h = [ 0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0 ];
    this.endian = 'little';
  }
  utils.inherits(RIPEMD160, BlockHash);
  var ripemd160 = RIPEMD160;

  RIPEMD160.blockSize = 512;
  RIPEMD160.outSize = 160;
  RIPEMD160.hmacStrength = 192;
  RIPEMD160.padLength = 64;

  RIPEMD160.prototype._update = function update(msg, start) {
    var A = this.h[0];
    var B = this.h[1];
    var C = this.h[2];
    var D = this.h[3];
    var E = this.h[4];
    var Ah = A;
    var Bh = B;
    var Ch = C;
    var Dh = D;
    var Eh = E;
    for (var j = 0; j < 80; j++) {
      var T = sum32(
        rotl32(
          sum32_4(A, f(j, B, C, D), msg[r[j] + start], K(j)),
          s[j]),
        E);
      A = E;
      E = D;
      D = rotl32(C, 10);
      C = B;
      B = T;
      T = sum32(
        rotl32(
          sum32_4(Ah, f(79 - j, Bh, Ch, Dh), msg[rh[j] + start], Kh(j)),
          sh[j]),
        Eh);
      Ah = Eh;
      Eh = Dh;
      Dh = rotl32(Ch, 10);
      Ch = Bh;
      Bh = T;
    }
    T = sum32_3(this.h[1], C, Dh);
    this.h[1] = sum32_3(this.h[2], D, Eh);
    this.h[2] = sum32_3(this.h[3], E, Ah);
    this.h[3] = sum32_3(this.h[4], A, Bh);
    this.h[4] = sum32_3(this.h[0], B, Ch);
    this.h[0] = T;
  };

  RIPEMD160.prototype._digest = function digest(enc) {
    if (enc === 'hex')
      return utils.toHex32(this.h, 'little');
    else
      return utils.split32(this.h, 'little');
  };

  function f(j, x, y, z) {
    if (j <= 15)
      return x ^ y ^ z;
    else if (j <= 31)
      return (x & y) | ((~x) & z);
    else if (j <= 47)
      return (x | (~y)) ^ z;
    else if (j <= 63)
      return (x & z) | (y & (~z));
    else
      return x ^ (y | (~z));
  }

  function K(j) {
    if (j <= 15)
      return 0x00000000;
    else if (j <= 31)
      return 0x5a827999;
    else if (j <= 47)
      return 0x6ed9eba1;
    else if (j <= 63)
      return 0x8f1bbcdc;
    else
      return 0xa953fd4e;
  }

  function Kh(j) {
    if (j <= 15)
      return 0x50a28be6;
    else if (j <= 31)
      return 0x5c4dd124;
    else if (j <= 47)
      return 0x6d703ef3;
    else if (j <= 63)
      return 0x7a6d76e9;
    else
      return 0x00000000;
  }

  var r = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
    7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8,
    3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12,
    1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2,
    4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13
  ];

  var rh = [
    5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12,
    6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2,
    15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13,
    8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14,
    12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11
  ];

  var s = [
    11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8,
    7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12,
    11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5,
    11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12,
    9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6
  ];

  var sh = [
    8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6,
    9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11,
    9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5,
    15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8,
    8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11
  ];

  var ripemd = {
  	ripemd160: ripemd160
  };

  function Hmac(hash, key, enc) {
    if (!(this instanceof Hmac))
      return new Hmac(hash, key, enc);
    this.Hash = hash;
    this.blockSize = hash.blockSize / 8;
    this.outSize = hash.outSize / 8;
    this.inner = null;
    this.outer = null;

    this._init(utils.toArray(key, enc));
  }
  var hmac = Hmac;

  Hmac.prototype._init = function init(key) {
    // Shorten key, if needed
    if (key.length > this.blockSize)
      key = new this.Hash().update(key).digest();
    minimalisticAssert(key.length <= this.blockSize);

    // Add padding to key
    for (var i = key.length; i < this.blockSize; i++)
      key.push(0);

    for (i = 0; i < key.length; i++)
      key[i] ^= 0x36;
    this.inner = new this.Hash().update(key);

    // 0x36 ^ 0x5c = 0x6a
    for (i = 0; i < key.length; i++)
      key[i] ^= 0x6a;
    this.outer = new this.Hash().update(key);
  };

  Hmac.prototype.update = function update(msg, enc) {
    this.inner.update(msg, enc);
    return this;
  };

  Hmac.prototype.digest = function digest(enc) {
    this.outer.update(this.inner.digest());
    return this.outer.digest(enc);
  };

  var hash_1 = createCommonjsModule(function (module, exports) {
  var hash = exports;

  hash.utils = utils;
  hash.common = common$1;
  hash.sha = sha;
  hash.ripemd = ripemd;
  hash.hmac = hmac;

  // Proxy hash functions to the main object
  hash.sha1 = hash.sha.sha1;
  hash.sha256 = hash.sha.sha256;
  hash.sha224 = hash.sha.sha224;
  hash.sha384 = hash.sha.sha384;
  hash.sha512 = hash.sha.sha512;
  hash.ripemd160 = hash.ripemd.ripemd160;
  });

  var secp256k1 = {
    doubles: {
      step: 4,
      points: [
        [
          'e60fce93b59e9ec53011aabc21c23e97b2a31369b87a5ae9c44ee89e2a6dec0a',
          'f7e3507399e595929db99f34f57937101296891e44d23f0be1f32cce69616821',
        ],
        [
          '8282263212c609d9ea2a6e3e172de238d8c39cabd5ac1ca10646e23fd5f51508',
          '11f8a8098557dfe45e8256e830b60ace62d613ac2f7b17bed31b6eaff6e26caf',
        ],
        [
          '175e159f728b865a72f99cc6c6fc846de0b93833fd2222ed73fce5b551e5b739',
          'd3506e0d9e3c79eba4ef97a51ff71f5eacb5955add24345c6efa6ffee9fed695',
        ],
        [
          '363d90d447b00c9c99ceac05b6262ee053441c7e55552ffe526bad8f83ff4640',
          '4e273adfc732221953b445397f3363145b9a89008199ecb62003c7f3bee9de9',
        ],
        [
          '8b4b5f165df3c2be8c6244b5b745638843e4a781a15bcd1b69f79a55dffdf80c',
          '4aad0a6f68d308b4b3fbd7813ab0da04f9e336546162ee56b3eff0c65fd4fd36',
        ],
        [
          '723cbaa6e5db996d6bf771c00bd548c7b700dbffa6c0e77bcb6115925232fcda',
          '96e867b5595cc498a921137488824d6e2660a0653779494801dc069d9eb39f5f',
        ],
        [
          'eebfa4d493bebf98ba5feec812c2d3b50947961237a919839a533eca0e7dd7fa',
          '5d9a8ca3970ef0f269ee7edaf178089d9ae4cdc3a711f712ddfd4fdae1de8999',
        ],
        [
          '100f44da696e71672791d0a09b7bde459f1215a29b3c03bfefd7835b39a48db0',
          'cdd9e13192a00b772ec8f3300c090666b7ff4a18ff5195ac0fbd5cd62bc65a09',
        ],
        [
          'e1031be262c7ed1b1dc9227a4a04c017a77f8d4464f3b3852c8acde6e534fd2d',
          '9d7061928940405e6bb6a4176597535af292dd419e1ced79a44f18f29456a00d',
        ],
        [
          'feea6cae46d55b530ac2839f143bd7ec5cf8b266a41d6af52d5e688d9094696d',
          'e57c6b6c97dce1bab06e4e12bf3ecd5c981c8957cc41442d3155debf18090088',
        ],
        [
          'da67a91d91049cdcb367be4be6ffca3cfeed657d808583de33fa978bc1ec6cb1',
          '9bacaa35481642bc41f463f7ec9780e5dec7adc508f740a17e9ea8e27a68be1d',
        ],
        [
          '53904faa0b334cdda6e000935ef22151ec08d0f7bb11069f57545ccc1a37b7c0',
          '5bc087d0bc80106d88c9eccac20d3c1c13999981e14434699dcb096b022771c8',
        ],
        [
          '8e7bcd0bd35983a7719cca7764ca906779b53a043a9b8bcaeff959f43ad86047',
          '10b7770b2a3da4b3940310420ca9514579e88e2e47fd68b3ea10047e8460372a',
        ],
        [
          '385eed34c1cdff21e6d0818689b81bde71a7f4f18397e6690a841e1599c43862',
          '283bebc3e8ea23f56701de19e9ebf4576b304eec2086dc8cc0458fe5542e5453',
        ],
        [
          '6f9d9b803ecf191637c73a4413dfa180fddf84a5947fbc9c606ed86c3fac3a7',
          '7c80c68e603059ba69b8e2a30e45c4d47ea4dd2f5c281002d86890603a842160',
        ],
        [
          '3322d401243c4e2582a2147c104d6ecbf774d163db0f5e5313b7e0e742d0e6bd',
          '56e70797e9664ef5bfb019bc4ddaf9b72805f63ea2873af624f3a2e96c28b2a0',
        ],
        [
          '85672c7d2de0b7da2bd1770d89665868741b3f9af7643397721d74d28134ab83',
          '7c481b9b5b43b2eb6374049bfa62c2e5e77f17fcc5298f44c8e3094f790313a6',
        ],
        [
          '948bf809b1988a46b06c9f1919413b10f9226c60f668832ffd959af60c82a0a',
          '53a562856dcb6646dc6b74c5d1c3418c6d4dff08c97cd2bed4cb7f88d8c8e589',
        ],
        [
          '6260ce7f461801c34f067ce0f02873a8f1b0e44dfc69752accecd819f38fd8e8',
          'bc2da82b6fa5b571a7f09049776a1ef7ecd292238051c198c1a84e95b2b4ae17',
        ],
        [
          'e5037de0afc1d8d43d8348414bbf4103043ec8f575bfdc432953cc8d2037fa2d',
          '4571534baa94d3b5f9f98d09fb990bddbd5f5b03ec481f10e0e5dc841d755bda',
        ],
        [
          'e06372b0f4a207adf5ea905e8f1771b4e7e8dbd1c6a6c5b725866a0ae4fce725',
          '7a908974bce18cfe12a27bb2ad5a488cd7484a7787104870b27034f94eee31dd',
        ],
        [
          '213c7a715cd5d45358d0bbf9dc0ce02204b10bdde2a3f58540ad6908d0559754',
          '4b6dad0b5ae462507013ad06245ba190bb4850f5f36a7eeddff2c27534b458f2',
        ],
        [
          '4e7c272a7af4b34e8dbb9352a5419a87e2838c70adc62cddf0cc3a3b08fbd53c',
          '17749c766c9d0b18e16fd09f6def681b530b9614bff7dd33e0b3941817dcaae6',
        ],
        [
          'fea74e3dbe778b1b10f238ad61686aa5c76e3db2be43057632427e2840fb27b6',
          '6e0568db9b0b13297cf674deccb6af93126b596b973f7b77701d3db7f23cb96f',
        ],
        [
          '76e64113f677cf0e10a2570d599968d31544e179b760432952c02a4417bdde39',
          'c90ddf8dee4e95cf577066d70681f0d35e2a33d2b56d2032b4b1752d1901ac01',
        ],
        [
          'c738c56b03b2abe1e8281baa743f8f9a8f7cc643df26cbee3ab150242bcbb891',
          '893fb578951ad2537f718f2eacbfbbbb82314eef7880cfe917e735d9699a84c3',
        ],
        [
          'd895626548b65b81e264c7637c972877d1d72e5f3a925014372e9f6588f6c14b',
          'febfaa38f2bc7eae728ec60818c340eb03428d632bb067e179363ed75d7d991f',
        ],
        [
          'b8da94032a957518eb0f6433571e8761ceffc73693e84edd49150a564f676e03',
          '2804dfa44805a1e4d7c99cc9762808b092cc584d95ff3b511488e4e74efdf6e7',
        ],
        [
          'e80fea14441fb33a7d8adab9475d7fab2019effb5156a792f1a11778e3c0df5d',
          'eed1de7f638e00771e89768ca3ca94472d155e80af322ea9fcb4291b6ac9ec78',
        ],
        [
          'a301697bdfcd704313ba48e51d567543f2a182031efd6915ddc07bbcc4e16070',
          '7370f91cfb67e4f5081809fa25d40f9b1735dbf7c0a11a130c0d1a041e177ea1',
        ],
        [
          '90ad85b389d6b936463f9d0512678de208cc330b11307fffab7ac63e3fb04ed4',
          'e507a3620a38261affdcbd9427222b839aefabe1582894d991d4d48cb6ef150',
        ],
        [
          '8f68b9d2f63b5f339239c1ad981f162ee88c5678723ea3351b7b444c9ec4c0da',
          '662a9f2dba063986de1d90c2b6be215dbbea2cfe95510bfdf23cbf79501fff82',
        ],
        [
          'e4f3fb0176af85d65ff99ff9198c36091f48e86503681e3e6686fd5053231e11',
          '1e63633ad0ef4f1c1661a6d0ea02b7286cc7e74ec951d1c9822c38576feb73bc',
        ],
        [
          '8c00fa9b18ebf331eb961537a45a4266c7034f2f0d4e1d0716fb6eae20eae29e',
          'efa47267fea521a1a9dc343a3736c974c2fadafa81e36c54e7d2a4c66702414b',
        ],
        [
          'e7a26ce69dd4829f3e10cec0a9e98ed3143d084f308b92c0997fddfc60cb3e41',
          '2a758e300fa7984b471b006a1aafbb18d0a6b2c0420e83e20e8a9421cf2cfd51',
        ],
        [
          'b6459e0ee3662ec8d23540c223bcbdc571cbcb967d79424f3cf29eb3de6b80ef',
          '67c876d06f3e06de1dadf16e5661db3c4b3ae6d48e35b2ff30bf0b61a71ba45',
        ],
        [
          'd68a80c8280bb840793234aa118f06231d6f1fc67e73c5a5deda0f5b496943e8',
          'db8ba9fff4b586d00c4b1f9177b0e28b5b0e7b8f7845295a294c84266b133120',
        ],
        [
          '324aed7df65c804252dc0270907a30b09612aeb973449cea4095980fc28d3d5d',
          '648a365774b61f2ff130c0c35aec1f4f19213b0c7e332843967224af96ab7c84',
        ],
        [
          '4df9c14919cde61f6d51dfdbe5fee5dceec4143ba8d1ca888e8bd373fd054c96',
          '35ec51092d8728050974c23a1d85d4b5d506cdc288490192ebac06cad10d5d',
        ],
        [
          '9c3919a84a474870faed8a9c1cc66021523489054d7f0308cbfc99c8ac1f98cd',
          'ddb84f0f4a4ddd57584f044bf260e641905326f76c64c8e6be7e5e03d4fc599d',
        ],
        [
          '6057170b1dd12fdf8de05f281d8e06bb91e1493a8b91d4cc5a21382120a959e5',
          '9a1af0b26a6a4807add9a2daf71df262465152bc3ee24c65e899be932385a2a8',
        ],
        [
          'a576df8e23a08411421439a4518da31880cef0fba7d4df12b1a6973eecb94266',
          '40a6bf20e76640b2c92b97afe58cd82c432e10a7f514d9f3ee8be11ae1b28ec8',
        ],
        [
          '7778a78c28dec3e30a05fe9629de8c38bb30d1f5cf9a3a208f763889be58ad71',
          '34626d9ab5a5b22ff7098e12f2ff580087b38411ff24ac563b513fc1fd9f43ac',
        ],
        [
          '928955ee637a84463729fd30e7afd2ed5f96274e5ad7e5cb09eda9c06d903ac',
          'c25621003d3f42a827b78a13093a95eeac3d26efa8a8d83fc5180e935bcd091f',
        ],
        [
          '85d0fef3ec6db109399064f3a0e3b2855645b4a907ad354527aae75163d82751',
          '1f03648413a38c0be29d496e582cf5663e8751e96877331582c237a24eb1f962',
        ],
        [
          'ff2b0dce97eece97c1c9b6041798b85dfdfb6d8882da20308f5404824526087e',
          '493d13fef524ba188af4c4dc54d07936c7b7ed6fb90e2ceb2c951e01f0c29907',
        ],
        [
          '827fbbe4b1e880ea9ed2b2e6301b212b57f1ee148cd6dd28780e5e2cf856e241',
          'c60f9c923c727b0b71bef2c67d1d12687ff7a63186903166d605b68baec293ec',
        ],
        [
          'eaa649f21f51bdbae7be4ae34ce6e5217a58fdce7f47f9aa7f3b58fa2120e2b3',
          'be3279ed5bbbb03ac69a80f89879aa5a01a6b965f13f7e59d47a5305ba5ad93d',
        ],
        [
          'e4a42d43c5cf169d9391df6decf42ee541b6d8f0c9a137401e23632dda34d24f',
          '4d9f92e716d1c73526fc99ccfb8ad34ce886eedfa8d8e4f13a7f7131deba9414',
        ],
        [
          '1ec80fef360cbdd954160fadab352b6b92b53576a88fea4947173b9d4300bf19',
          'aeefe93756b5340d2f3a4958a7abbf5e0146e77f6295a07b671cdc1cc107cefd',
        ],
        [
          '146a778c04670c2f91b00af4680dfa8bce3490717d58ba889ddb5928366642be',
          'b318e0ec3354028add669827f9d4b2870aaa971d2f7e5ed1d0b297483d83efd0',
        ],
        [
          'fa50c0f61d22e5f07e3acebb1aa07b128d0012209a28b9776d76a8793180eef9',
          '6b84c6922397eba9b72cd2872281a68a5e683293a57a213b38cd8d7d3f4f2811',
        ],
        [
          'da1d61d0ca721a11b1a5bf6b7d88e8421a288ab5d5bba5220e53d32b5f067ec2',
          '8157f55a7c99306c79c0766161c91e2966a73899d279b48a655fba0f1ad836f1',
        ],
        [
          'a8e282ff0c9706907215ff98e8fd416615311de0446f1e062a73b0610d064e13',
          '7f97355b8db81c09abfb7f3c5b2515888b679a3e50dd6bd6cef7c73111f4cc0c',
        ],
        [
          '174a53b9c9a285872d39e56e6913cab15d59b1fa512508c022f382de8319497c',
          'ccc9dc37abfc9c1657b4155f2c47f9e6646b3a1d8cb9854383da13ac079afa73',
        ],
        [
          '959396981943785c3d3e57edf5018cdbe039e730e4918b3d884fdff09475b7ba',
          '2e7e552888c331dd8ba0386a4b9cd6849c653f64c8709385e9b8abf87524f2fd',
        ],
        [
          'd2a63a50ae401e56d645a1153b109a8fcca0a43d561fba2dbb51340c9d82b151',
          'e82d86fb6443fcb7565aee58b2948220a70f750af484ca52d4142174dcf89405',
        ],
        [
          '64587e2335471eb890ee7896d7cfdc866bacbdbd3839317b3436f9b45617e073',
          'd99fcdd5bf6902e2ae96dd6447c299a185b90a39133aeab358299e5e9faf6589',
        ],
        [
          '8481bde0e4e4d885b3a546d3e549de042f0aa6cea250e7fd358d6c86dd45e458',
          '38ee7b8cba5404dd84a25bf39cecb2ca900a79c42b262e556d64b1b59779057e',
        ],
        [
          '13464a57a78102aa62b6979ae817f4637ffcfed3c4b1ce30bcd6303f6caf666b',
          '69be159004614580ef7e433453ccb0ca48f300a81d0942e13f495a907f6ecc27',
        ],
        [
          'bc4a9df5b713fe2e9aef430bcc1dc97a0cd9ccede2f28588cada3a0d2d83f366',
          'd3a81ca6e785c06383937adf4b798caa6e8a9fbfa547b16d758d666581f33c1',
        ],
        [
          '8c28a97bf8298bc0d23d8c749452a32e694b65e30a9472a3954ab30fe5324caa',
          '40a30463a3305193378fedf31f7cc0eb7ae784f0451cb9459e71dc73cbef9482',
        ],
        [
          '8ea9666139527a8c1dd94ce4f071fd23c8b350c5a4bb33748c4ba111faccae0',
          '620efabbc8ee2782e24e7c0cfb95c5d735b783be9cf0f8e955af34a30e62b945',
        ],
        [
          'dd3625faef5ba06074669716bbd3788d89bdde815959968092f76cc4eb9a9787',
          '7a188fa3520e30d461da2501045731ca941461982883395937f68d00c644a573',
        ],
        [
          'f710d79d9eb962297e4f6232b40e8f7feb2bc63814614d692c12de752408221e',
          'ea98e67232d3b3295d3b535532115ccac8612c721851617526ae47a9c77bfc82',
        ],
      ],
    },
    naf: {
      wnd: 7,
      points: [
        [
          'f9308a019258c31049344f85f89d5229b531c845836f99b08601f113bce036f9',
          '388f7b0f632de8140fe337e62a37f3566500a99934c2231b6cb9fd7584b8e672',
        ],
        [
          '2f8bde4d1a07209355b4a7250a5c5128e88b84bddc619ab7cba8d569b240efe4',
          'd8ac222636e5e3d6d4dba9dda6c9c426f788271bab0d6840dca87d3aa6ac62d6',
        ],
        [
          '5cbdf0646e5db4eaa398f365f2ea7a0e3d419b7e0330e39ce92bddedcac4f9bc',
          '6aebca40ba255960a3178d6d861a54dba813d0b813fde7b5a5082628087264da',
        ],
        [
          'acd484e2f0c7f65309ad178a9f559abde09796974c57e714c35f110dfc27ccbe',
          'cc338921b0a7d9fd64380971763b61e9add888a4375f8e0f05cc262ac64f9c37',
        ],
        [
          '774ae7f858a9411e5ef4246b70c65aac5649980be5c17891bbec17895da008cb',
          'd984a032eb6b5e190243dd56d7b7b365372db1e2dff9d6a8301d74c9c953c61b',
        ],
        [
          'f28773c2d975288bc7d1d205c3748651b075fbc6610e58cddeeddf8f19405aa8',
          'ab0902e8d880a89758212eb65cdaf473a1a06da521fa91f29b5cb52db03ed81',
        ],
        [
          'd7924d4f7d43ea965a465ae3095ff41131e5946f3c85f79e44adbcf8e27e080e',
          '581e2872a86c72a683842ec228cc6defea40af2bd896d3a5c504dc9ff6a26b58',
        ],
        [
          'defdea4cdb677750a420fee807eacf21eb9898ae79b9768766e4faa04a2d4a34',
          '4211ab0694635168e997b0ead2a93daeced1f4a04a95c0f6cfb199f69e56eb77',
        ],
        [
          '2b4ea0a797a443d293ef5cff444f4979f06acfebd7e86d277475656138385b6c',
          '85e89bc037945d93b343083b5a1c86131a01f60c50269763b570c854e5c09b7a',
        ],
        [
          '352bbf4a4cdd12564f93fa332ce333301d9ad40271f8107181340aef25be59d5',
          '321eb4075348f534d59c18259dda3e1f4a1b3b2e71b1039c67bd3d8bcf81998c',
        ],
        [
          '2fa2104d6b38d11b0230010559879124e42ab8dfeff5ff29dc9cdadd4ecacc3f',
          '2de1068295dd865b64569335bd5dd80181d70ecfc882648423ba76b532b7d67',
        ],
        [
          '9248279b09b4d68dab21a9b066edda83263c3d84e09572e269ca0cd7f5453714',
          '73016f7bf234aade5d1aa71bdea2b1ff3fc0de2a887912ffe54a32ce97cb3402',
        ],
        [
          'daed4f2be3a8bf278e70132fb0beb7522f570e144bf615c07e996d443dee8729',
          'a69dce4a7d6c98e8d4a1aca87ef8d7003f83c230f3afa726ab40e52290be1c55',
        ],
        [
          'c44d12c7065d812e8acf28d7cbb19f9011ecd9e9fdf281b0e6a3b5e87d22e7db',
          '2119a460ce326cdc76c45926c982fdac0e106e861edf61c5a039063f0e0e6482',
        ],
        [
          '6a245bf6dc698504c89a20cfded60853152b695336c28063b61c65cbd269e6b4',
          'e022cf42c2bd4a708b3f5126f16a24ad8b33ba48d0423b6efd5e6348100d8a82',
        ],
        [
          '1697ffa6fd9de627c077e3d2fe541084ce13300b0bec1146f95ae57f0d0bd6a5',
          'b9c398f186806f5d27561506e4557433a2cf15009e498ae7adee9d63d01b2396',
        ],
        [
          '605bdb019981718b986d0f07e834cb0d9deb8360ffb7f61df982345ef27a7479',
          '2972d2de4f8d20681a78d93ec96fe23c26bfae84fb14db43b01e1e9056b8c49',
        ],
        [
          '62d14dab4150bf497402fdc45a215e10dcb01c354959b10cfe31c7e9d87ff33d',
          '80fc06bd8cc5b01098088a1950eed0db01aa132967ab472235f5642483b25eaf',
        ],
        [
          '80c60ad0040f27dade5b4b06c408e56b2c50e9f56b9b8b425e555c2f86308b6f',
          '1c38303f1cc5c30f26e66bad7fe72f70a65eed4cbe7024eb1aa01f56430bd57a',
        ],
        [
          '7a9375ad6167ad54aa74c6348cc54d344cc5dc9487d847049d5eabb0fa03c8fb',
          'd0e3fa9eca8726909559e0d79269046bdc59ea10c70ce2b02d499ec224dc7f7',
        ],
        [
          'd528ecd9b696b54c907a9ed045447a79bb408ec39b68df504bb51f459bc3ffc9',
          'eecf41253136e5f99966f21881fd656ebc4345405c520dbc063465b521409933',
        ],
        [
          '49370a4b5f43412ea25f514e8ecdad05266115e4a7ecb1387231808f8b45963',
          '758f3f41afd6ed428b3081b0512fd62a54c3f3afbb5b6764b653052a12949c9a',
        ],
        [
          '77f230936ee88cbbd73df930d64702ef881d811e0e1498e2f1c13eb1fc345d74',
          '958ef42a7886b6400a08266e9ba1b37896c95330d97077cbbe8eb3c7671c60d6',
        ],
        [
          'f2dac991cc4ce4b9ea44887e5c7c0bce58c80074ab9d4dbaeb28531b7739f530',
          'e0dedc9b3b2f8dad4da1f32dec2531df9eb5fbeb0598e4fd1a117dba703a3c37',
        ],
        [
          '463b3d9f662621fb1b4be8fbbe2520125a216cdfc9dae3debcba4850c690d45b',
          '5ed430d78c296c3543114306dd8622d7c622e27c970a1de31cb377b01af7307e',
        ],
        [
          'f16f804244e46e2a09232d4aff3b59976b98fac14328a2d1a32496b49998f247',
          'cedabd9b82203f7e13d206fcdf4e33d92a6c53c26e5cce26d6579962c4e31df6',
        ],
        [
          'caf754272dc84563b0352b7a14311af55d245315ace27c65369e15f7151d41d1',
          'cb474660ef35f5f2a41b643fa5e460575f4fa9b7962232a5c32f908318a04476',
        ],
        [
          '2600ca4b282cb986f85d0f1709979d8b44a09c07cb86d7c124497bc86f082120',
          '4119b88753c15bd6a693b03fcddbb45d5ac6be74ab5f0ef44b0be9475a7e4b40',
        ],
        [
          '7635ca72d7e8432c338ec53cd12220bc01c48685e24f7dc8c602a7746998e435',
          '91b649609489d613d1d5e590f78e6d74ecfc061d57048bad9e76f302c5b9c61',
        ],
        [
          '754e3239f325570cdbbf4a87deee8a66b7f2b33479d468fbc1a50743bf56cc18',
          '673fb86e5bda30fb3cd0ed304ea49a023ee33d0197a695d0c5d98093c536683',
        ],
        [
          'e3e6bd1071a1e96aff57859c82d570f0330800661d1c952f9fe2694691d9b9e8',
          '59c9e0bba394e76f40c0aa58379a3cb6a5a2283993e90c4167002af4920e37f5',
        ],
        [
          '186b483d056a033826ae73d88f732985c4ccb1f32ba35f4b4cc47fdcf04aa6eb',
          '3b952d32c67cf77e2e17446e204180ab21fb8090895138b4a4a797f86e80888b',
        ],
        [
          'df9d70a6b9876ce544c98561f4be4f725442e6d2b737d9c91a8321724ce0963f',
          '55eb2dafd84d6ccd5f862b785dc39d4ab157222720ef9da217b8c45cf2ba2417',
        ],
        [
          '5edd5cc23c51e87a497ca815d5dce0f8ab52554f849ed8995de64c5f34ce7143',
          'efae9c8dbc14130661e8cec030c89ad0c13c66c0d17a2905cdc706ab7399a868',
        ],
        [
          '290798c2b6476830da12fe02287e9e777aa3fba1c355b17a722d362f84614fba',
          'e38da76dcd440621988d00bcf79af25d5b29c094db2a23146d003afd41943e7a',
        ],
        [
          'af3c423a95d9f5b3054754efa150ac39cd29552fe360257362dfdecef4053b45',
          'f98a3fd831eb2b749a93b0e6f35cfb40c8cd5aa667a15581bc2feded498fd9c6',
        ],
        [
          '766dbb24d134e745cccaa28c99bf274906bb66b26dcf98df8d2fed50d884249a',
          '744b1152eacbe5e38dcc887980da38b897584a65fa06cedd2c924f97cbac5996',
        ],
        [
          '59dbf46f8c94759ba21277c33784f41645f7b44f6c596a58ce92e666191abe3e',
          'c534ad44175fbc300f4ea6ce648309a042ce739a7919798cd85e216c4a307f6e',
        ],
        [
          'f13ada95103c4537305e691e74e9a4a8dd647e711a95e73cb62dc6018cfd87b8',
          'e13817b44ee14de663bf4bc808341f326949e21a6a75c2570778419bdaf5733d',
        ],
        [
          '7754b4fa0e8aced06d4167a2c59cca4cda1869c06ebadfb6488550015a88522c',
          '30e93e864e669d82224b967c3020b8fa8d1e4e350b6cbcc537a48b57841163a2',
        ],
        [
          '948dcadf5990e048aa3874d46abef9d701858f95de8041d2a6828c99e2262519',
          'e491a42537f6e597d5d28a3224b1bc25df9154efbd2ef1d2cbba2cae5347d57e',
        ],
        [
          '7962414450c76c1689c7b48f8202ec37fb224cf5ac0bfa1570328a8a3d7c77ab',
          '100b610ec4ffb4760d5c1fc133ef6f6b12507a051f04ac5760afa5b29db83437',
        ],
        [
          '3514087834964b54b15b160644d915485a16977225b8847bb0dd085137ec47ca',
          'ef0afbb2056205448e1652c48e8127fc6039e77c15c2378b7e7d15a0de293311',
        ],
        [
          'd3cc30ad6b483e4bc79ce2c9dd8bc54993e947eb8df787b442943d3f7b527eaf',
          '8b378a22d827278d89c5e9be8f9508ae3c2ad46290358630afb34db04eede0a4',
        ],
        [
          '1624d84780732860ce1c78fcbfefe08b2b29823db913f6493975ba0ff4847610',
          '68651cf9b6da903e0914448c6cd9d4ca896878f5282be4c8cc06e2a404078575',
        ],
        [
          '733ce80da955a8a26902c95633e62a985192474b5af207da6df7b4fd5fc61cd4',
          'f5435a2bd2badf7d485a4d8b8db9fcce3e1ef8e0201e4578c54673bc1dc5ea1d',
        ],
        [
          '15d9441254945064cf1a1c33bbd3b49f8966c5092171e699ef258dfab81c045c',
          'd56eb30b69463e7234f5137b73b84177434800bacebfc685fc37bbe9efe4070d',
        ],
        [
          'a1d0fcf2ec9de675b612136e5ce70d271c21417c9d2b8aaaac138599d0717940',
          'edd77f50bcb5a3cab2e90737309667f2641462a54070f3d519212d39c197a629',
        ],
        [
          'e22fbe15c0af8ccc5780c0735f84dbe9a790badee8245c06c7ca37331cb36980',
          'a855babad5cd60c88b430a69f53a1a7a38289154964799be43d06d77d31da06',
        ],
        [
          '311091dd9860e8e20ee13473c1155f5f69635e394704eaa74009452246cfa9b3',
          '66db656f87d1f04fffd1f04788c06830871ec5a64feee685bd80f0b1286d8374',
        ],
        [
          '34c1fd04d301be89b31c0442d3e6ac24883928b45a9340781867d4232ec2dbdf',
          '9414685e97b1b5954bd46f730174136d57f1ceeb487443dc5321857ba73abee',
        ],
        [
          'f219ea5d6b54701c1c14de5b557eb42a8d13f3abbcd08affcc2a5e6b049b8d63',
          '4cb95957e83d40b0f73af4544cccf6b1f4b08d3c07b27fb8d8c2962a400766d1',
        ],
        [
          'd7b8740f74a8fbaab1f683db8f45de26543a5490bca627087236912469a0b448',
          'fa77968128d9c92ee1010f337ad4717eff15db5ed3c049b3411e0315eaa4593b',
        ],
        [
          '32d31c222f8f6f0ef86f7c98d3a3335ead5bcd32abdd94289fe4d3091aa824bf',
          '5f3032f5892156e39ccd3d7915b9e1da2e6dac9e6f26e961118d14b8462e1661',
        ],
        [
          '7461f371914ab32671045a155d9831ea8793d77cd59592c4340f86cbc18347b5',
          '8ec0ba238b96bec0cbdddcae0aa442542eee1ff50c986ea6b39847b3cc092ff6',
        ],
        [
          'ee079adb1df1860074356a25aa38206a6d716b2c3e67453d287698bad7b2b2d6',
          '8dc2412aafe3be5c4c5f37e0ecc5f9f6a446989af04c4e25ebaac479ec1c8c1e',
        ],
        [
          '16ec93e447ec83f0467b18302ee620f7e65de331874c9dc72bfd8616ba9da6b5',
          '5e4631150e62fb40d0e8c2a7ca5804a39d58186a50e497139626778e25b0674d',
        ],
        [
          'eaa5f980c245f6f038978290afa70b6bd8855897f98b6aa485b96065d537bd99',
          'f65f5d3e292c2e0819a528391c994624d784869d7e6ea67fb18041024edc07dc',
        ],
        [
          '78c9407544ac132692ee1910a02439958ae04877151342ea96c4b6b35a49f51',
          'f3e0319169eb9b85d5404795539a5e68fa1fbd583c064d2462b675f194a3ddb4',
        ],
        [
          '494f4be219a1a77016dcd838431aea0001cdc8ae7a6fc688726578d9702857a5',
          '42242a969283a5f339ba7f075e36ba2af925ce30d767ed6e55f4b031880d562c',
        ],
        [
          'a598a8030da6d86c6bc7f2f5144ea549d28211ea58faa70ebf4c1e665c1fe9b5',
          '204b5d6f84822c307e4b4a7140737aec23fc63b65b35f86a10026dbd2d864e6b',
        ],
        [
          'c41916365abb2b5d09192f5f2dbeafec208f020f12570a184dbadc3e58595997',
          '4f14351d0087efa49d245b328984989d5caf9450f34bfc0ed16e96b58fa9913',
        ],
        [
          '841d6063a586fa475a724604da03bc5b92a2e0d2e0a36acfe4c73a5514742881',
          '73867f59c0659e81904f9a1c7543698e62562d6744c169ce7a36de01a8d6154',
        ],
        [
          '5e95bb399a6971d376026947f89bde2f282b33810928be4ded112ac4d70e20d5',
          '39f23f366809085beebfc71181313775a99c9aed7d8ba38b161384c746012865',
        ],
        [
          '36e4641a53948fd476c39f8a99fd974e5ec07564b5315d8bf99471bca0ef2f66',
          'd2424b1b1abe4eb8164227b085c9aa9456ea13493fd563e06fd51cf5694c78fc',
        ],
        [
          '336581ea7bfbbb290c191a2f507a41cf5643842170e914faeab27c2c579f726',
          'ead12168595fe1be99252129b6e56b3391f7ab1410cd1e0ef3dcdcabd2fda224',
        ],
        [
          '8ab89816dadfd6b6a1f2634fcf00ec8403781025ed6890c4849742706bd43ede',
          '6fdcef09f2f6d0a044e654aef624136f503d459c3e89845858a47a9129cdd24e',
        ],
        [
          '1e33f1a746c9c5778133344d9299fcaa20b0938e8acff2544bb40284b8c5fb94',
          '60660257dd11b3aa9c8ed618d24edff2306d320f1d03010e33a7d2057f3b3b6',
        ],
        [
          '85b7c1dcb3cec1b7ee7f30ded79dd20a0ed1f4cc18cbcfcfa410361fd8f08f31',
          '3d98a9cdd026dd43f39048f25a8847f4fcafad1895d7a633c6fed3c35e999511',
        ],
        [
          '29df9fbd8d9e46509275f4b125d6d45d7fbe9a3b878a7af872a2800661ac5f51',
          'b4c4fe99c775a606e2d8862179139ffda61dc861c019e55cd2876eb2a27d84b',
        ],
        [
          'a0b1cae06b0a847a3fea6e671aaf8adfdfe58ca2f768105c8082b2e449fce252',
          'ae434102edde0958ec4b19d917a6a28e6b72da1834aff0e650f049503a296cf2',
        ],
        [
          '4e8ceafb9b3e9a136dc7ff67e840295b499dfb3b2133e4ba113f2e4c0e121e5',
          'cf2174118c8b6d7a4b48f6d534ce5c79422c086a63460502b827ce62a326683c',
        ],
        [
          'd24a44e047e19b6f5afb81c7ca2f69080a5076689a010919f42725c2b789a33b',
          '6fb8d5591b466f8fc63db50f1c0f1c69013f996887b8244d2cdec417afea8fa3',
        ],
        [
          'ea01606a7a6c9cdd249fdfcfacb99584001edd28abbab77b5104e98e8e3b35d4',
          '322af4908c7312b0cfbfe369f7a7b3cdb7d4494bc2823700cfd652188a3ea98d',
        ],
        [
          'af8addbf2b661c8a6c6328655eb96651252007d8c5ea31be4ad196de8ce2131f',
          '6749e67c029b85f52a034eafd096836b2520818680e26ac8f3dfbcdb71749700',
        ],
        [
          'e3ae1974566ca06cc516d47e0fb165a674a3dabcfca15e722f0e3450f45889',
          '2aeabe7e4531510116217f07bf4d07300de97e4874f81f533420a72eeb0bd6a4',
        ],
        [
          '591ee355313d99721cf6993ffed1e3e301993ff3ed258802075ea8ced397e246',
          'b0ea558a113c30bea60fc4775460c7901ff0b053d25ca2bdeee98f1a4be5d196',
        ],
        [
          '11396d55fda54c49f19aa97318d8da61fa8584e47b084945077cf03255b52984',
          '998c74a8cd45ac01289d5833a7beb4744ff536b01b257be4c5767bea93ea57a4',
        ],
        [
          '3c5d2a1ba39c5a1790000738c9e0c40b8dcdfd5468754b6405540157e017aa7a',
          'b2284279995a34e2f9d4de7396fc18b80f9b8b9fdd270f6661f79ca4c81bd257',
        ],
        [
          'cc8704b8a60a0defa3a99a7299f2e9c3fbc395afb04ac078425ef8a1793cc030',
          'bdd46039feed17881d1e0862db347f8cf395b74fc4bcdc4e940b74e3ac1f1b13',
        ],
        [
          'c533e4f7ea8555aacd9777ac5cad29b97dd4defccc53ee7ea204119b2889b197',
          '6f0a256bc5efdf429a2fb6242f1a43a2d9b925bb4a4b3a26bb8e0f45eb596096',
        ],
        [
          'c14f8f2ccb27d6f109f6d08d03cc96a69ba8c34eec07bbcf566d48e33da6593',
          'c359d6923bb398f7fd4473e16fe1c28475b740dd098075e6c0e8649113dc3a38',
        ],
        [
          'a6cbc3046bc6a450bac24789fa17115a4c9739ed75f8f21ce441f72e0b90e6ef',
          '21ae7f4680e889bb130619e2c0f95a360ceb573c70603139862afd617fa9b9f',
        ],
        [
          '347d6d9a02c48927ebfb86c1359b1caf130a3c0267d11ce6344b39f99d43cc38',
          '60ea7f61a353524d1c987f6ecec92f086d565ab687870cb12689ff1e31c74448',
        ],
        [
          'da6545d2181db8d983f7dcb375ef5866d47c67b1bf31c8cf855ef7437b72656a',
          '49b96715ab6878a79e78f07ce5680c5d6673051b4935bd897fea824b77dc208a',
        ],
        [
          'c40747cc9d012cb1a13b8148309c6de7ec25d6945d657146b9d5994b8feb1111',
          '5ca560753be2a12fc6de6caf2cb489565db936156b9514e1bb5e83037e0fa2d4',
        ],
        [
          '4e42c8ec82c99798ccf3a610be870e78338c7f713348bd34c8203ef4037f3502',
          '7571d74ee5e0fb92a7a8b33a07783341a5492144cc54bcc40a94473693606437',
        ],
        [
          '3775ab7089bc6af823aba2e1af70b236d251cadb0c86743287522a1b3b0dedea',
          'be52d107bcfa09d8bcb9736a828cfa7fac8db17bf7a76a2c42ad961409018cf7',
        ],
        [
          'cee31cbf7e34ec379d94fb814d3d775ad954595d1314ba8846959e3e82f74e26',
          '8fd64a14c06b589c26b947ae2bcf6bfa0149ef0be14ed4d80f448a01c43b1c6d',
        ],
        [
          'b4f9eaea09b6917619f6ea6a4eb5464efddb58fd45b1ebefcdc1a01d08b47986',
          '39e5c9925b5a54b07433a4f18c61726f8bb131c012ca542eb24a8ac07200682a',
        ],
        [
          'd4263dfc3d2df923a0179a48966d30ce84e2515afc3dccc1b77907792ebcc60e',
          '62dfaf07a0f78feb30e30d6295853ce189e127760ad6cf7fae164e122a208d54',
        ],
        [
          '48457524820fa65a4f8d35eb6930857c0032acc0a4a2de422233eeda897612c4',
          '25a748ab367979d98733c38a1fa1c2e7dc6cc07db2d60a9ae7a76aaa49bd0f77',
        ],
        [
          'dfeeef1881101f2cb11644f3a2afdfc2045e19919152923f367a1767c11cceda',
          'ecfb7056cf1de042f9420bab396793c0c390bde74b4bbdff16a83ae09a9a7517',
        ],
        [
          '6d7ef6b17543f8373c573f44e1f389835d89bcbc6062ced36c82df83b8fae859',
          'cd450ec335438986dfefa10c57fea9bcc521a0959b2d80bbf74b190dca712d10',
        ],
        [
          'e75605d59102a5a2684500d3b991f2e3f3c88b93225547035af25af66e04541f',
          'f5c54754a8f71ee540b9b48728473e314f729ac5308b06938360990e2bfad125',
        ],
        [
          'eb98660f4c4dfaa06a2be453d5020bc99a0c2e60abe388457dd43fefb1ed620c',
          '6cb9a8876d9cb8520609af3add26cd20a0a7cd8a9411131ce85f44100099223e',
        ],
        [
          '13e87b027d8514d35939f2e6892b19922154596941888336dc3563e3b8dba942',
          'fef5a3c68059a6dec5d624114bf1e91aac2b9da568d6abeb2570d55646b8adf1',
        ],
        [
          'ee163026e9fd6fe017c38f06a5be6fc125424b371ce2708e7bf4491691e5764a',
          '1acb250f255dd61c43d94ccc670d0f58f49ae3fa15b96623e5430da0ad6c62b2',
        ],
        [
          'b268f5ef9ad51e4d78de3a750c2dc89b1e626d43505867999932e5db33af3d80',
          '5f310d4b3c99b9ebb19f77d41c1dee018cf0d34fd4191614003e945a1216e423',
        ],
        [
          'ff07f3118a9df035e9fad85eb6c7bfe42b02f01ca99ceea3bf7ffdba93c4750d',
          '438136d603e858a3a5c440c38eccbaddc1d2942114e2eddd4740d098ced1f0d8',
        ],
        [
          '8d8b9855c7c052a34146fd20ffb658bea4b9f69e0d825ebec16e8c3ce2b526a1',
          'cdb559eedc2d79f926baf44fb84ea4d44bcf50fee51d7ceb30e2e7f463036758',
        ],
        [
          '52db0b5384dfbf05bfa9d472d7ae26dfe4b851ceca91b1eba54263180da32b63',
          'c3b997d050ee5d423ebaf66a6db9f57b3180c902875679de924b69d84a7b375',
        ],
        [
          'e62f9490d3d51da6395efd24e80919cc7d0f29c3f3fa48c6fff543becbd43352',
          '6d89ad7ba4876b0b22c2ca280c682862f342c8591f1daf5170e07bfd9ccafa7d',
        ],
        [
          '7f30ea2476b399b4957509c88f77d0191afa2ff5cb7b14fd6d8e7d65aaab1193',
          'ca5ef7d4b231c94c3b15389a5f6311e9daff7bb67b103e9880ef4bff637acaec',
        ],
        [
          '5098ff1e1d9f14fb46a210fada6c903fef0fb7b4a1dd1d9ac60a0361800b7a00',
          '9731141d81fc8f8084d37c6e7542006b3ee1b40d60dfe5362a5b132fd17ddc0',
        ],
        [
          '32b78c7de9ee512a72895be6b9cbefa6e2f3c4ccce445c96b9f2c81e2778ad58',
          'ee1849f513df71e32efc3896ee28260c73bb80547ae2275ba497237794c8753c',
        ],
        [
          'e2cb74fddc8e9fbcd076eef2a7c72b0ce37d50f08269dfc074b581550547a4f7',
          'd3aa2ed71c9dd2247a62df062736eb0baddea9e36122d2be8641abcb005cc4a4',
        ],
        [
          '8438447566d4d7bedadc299496ab357426009a35f235cb141be0d99cd10ae3a8',
          'c4e1020916980a4da5d01ac5e6ad330734ef0d7906631c4f2390426b2edd791f',
        ],
        [
          '4162d488b89402039b584c6fc6c308870587d9c46f660b878ab65c82c711d67e',
          '67163e903236289f776f22c25fb8a3afc1732f2b84b4e95dbda47ae5a0852649',
        ],
        [
          '3fad3fa84caf0f34f0f89bfd2dcf54fc175d767aec3e50684f3ba4a4bf5f683d',
          'cd1bc7cb6cc407bb2f0ca647c718a730cf71872e7d0d2a53fa20efcdfe61826',
        ],
        [
          '674f2600a3007a00568c1a7ce05d0816c1fb84bf1370798f1c69532faeb1a86b',
          '299d21f9413f33b3edf43b257004580b70db57da0b182259e09eecc69e0d38a5',
        ],
        [
          'd32f4da54ade74abb81b815ad1fb3b263d82d6c692714bcff87d29bd5ee9f08f',
          'f9429e738b8e53b968e99016c059707782e14f4535359d582fc416910b3eea87',
        ],
        [
          '30e4e670435385556e593657135845d36fbb6931f72b08cb1ed954f1e3ce3ff6',
          '462f9bce619898638499350113bbc9b10a878d35da70740dc695a559eb88db7b',
        ],
        [
          'be2062003c51cc3004682904330e4dee7f3dcd10b01e580bf1971b04d4cad297',
          '62188bc49d61e5428573d48a74e1c655b1c61090905682a0d5558ed72dccb9bc',
        ],
        [
          '93144423ace3451ed29e0fb9ac2af211cb6e84a601df5993c419859fff5df04a',
          '7c10dfb164c3425f5c71a3f9d7992038f1065224f72bb9d1d902a6d13037b47c',
        ],
        [
          'b015f8044f5fcbdcf21ca26d6c34fb8197829205c7b7d2a7cb66418c157b112c',
          'ab8c1e086d04e813744a655b2df8d5f83b3cdc6faa3088c1d3aea1454e3a1d5f',
        ],
        [
          'd5e9e1da649d97d89e4868117a465a3a4f8a18de57a140d36b3f2af341a21b52',
          '4cb04437f391ed73111a13cc1d4dd0db1693465c2240480d8955e8592f27447a',
        ],
        [
          'd3ae41047dd7ca065dbf8ed77b992439983005cd72e16d6f996a5316d36966bb',
          'bd1aeb21ad22ebb22a10f0303417c6d964f8cdd7df0aca614b10dc14d125ac46',
        ],
        [
          '463e2763d885f958fc66cdd22800f0a487197d0a82e377b49f80af87c897b065',
          'bfefacdb0e5d0fd7df3a311a94de062b26b80c61fbc97508b79992671ef7ca7f',
        ],
        [
          '7985fdfd127c0567c6f53ec1bb63ec3158e597c40bfe747c83cddfc910641917',
          '603c12daf3d9862ef2b25fe1de289aed24ed291e0ec6708703a5bd567f32ed03',
        ],
        [
          '74a1ad6b5f76e39db2dd249410eac7f99e74c59cb83d2d0ed5ff1543da7703e9',
          'cc6157ef18c9c63cd6193d83631bbea0093e0968942e8c33d5737fd790e0db08',
        ],
        [
          '30682a50703375f602d416664ba19b7fc9bab42c72747463a71d0896b22f6da3',
          '553e04f6b018b4fa6c8f39e7f311d3176290d0e0f19ca73f17714d9977a22ff8',
        ],
        [
          '9e2158f0d7c0d5f26c3791efefa79597654e7a2b2464f52b1ee6c1347769ef57',
          '712fcdd1b9053f09003a3481fa7762e9ffd7c8ef35a38509e2fbf2629008373',
        ],
        [
          '176e26989a43c9cfeba4029c202538c28172e566e3c4fce7322857f3be327d66',
          'ed8cc9d04b29eb877d270b4878dc43c19aefd31f4eee09ee7b47834c1fa4b1c3',
        ],
        [
          '75d46efea3771e6e68abb89a13ad747ecf1892393dfc4f1b7004788c50374da8',
          '9852390a99507679fd0b86fd2b39a868d7efc22151346e1a3ca4726586a6bed8',
        ],
        [
          '809a20c67d64900ffb698c4c825f6d5f2310fb0451c869345b7319f645605721',
          '9e994980d9917e22b76b061927fa04143d096ccc54963e6a5ebfa5f3f8e286c1',
        ],
        [
          '1b38903a43f7f114ed4500b4eac7083fdefece1cf29c63528d563446f972c180',
          '4036edc931a60ae889353f77fd53de4a2708b26b6f5da72ad3394119daf408f9',
        ],
      ],
    },
  };

  var curves_1 = createCommonjsModule(function (module, exports) {

  var curves = exports;





  var assert = utils_1.assert;

  function PresetCurve(options) {
    if (options.type === 'short')
      this.curve = new curve_1.short(options);
    else if (options.type === 'edwards')
      this.curve = new curve_1.edwards(options);
    else
      this.curve = new curve_1.mont(options);
    this.g = this.curve.g;
    this.n = this.curve.n;
    this.hash = options.hash;

    assert(this.g.validate(), 'Invalid curve');
    assert(this.g.mul(this.n).isInfinity(), 'Invalid curve, G*N != O');
  }
  curves.PresetCurve = PresetCurve;

  function defineCurve(name, options) {
    Object.defineProperty(curves, name, {
      configurable: true,
      enumerable: true,
      get: function() {
        var curve = new PresetCurve(options);
        Object.defineProperty(curves, name, {
          configurable: true,
          enumerable: true,
          value: curve,
        });
        return curve;
      },
    });
  }

  defineCurve('p192', {
    type: 'short',
    prime: 'p192',
    p: 'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff',
    a: 'ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc',
    b: '64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1',
    n: 'ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831',
    hash: hash_1.sha256,
    gRed: false,
    g: [
      '188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012',
      '07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811',
    ],
  });

  defineCurve('p224', {
    type: 'short',
    prime: 'p224',
    p: 'ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001',
    a: 'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe',
    b: 'b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4',
    n: 'ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d',
    hash: hash_1.sha256,
    gRed: false,
    g: [
      'b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21',
      'bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34',
    ],
  });

  defineCurve('p256', {
    type: 'short',
    prime: null,
    p: 'ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff',
    a: 'ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc',
    b: '5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b',
    n: 'ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551',
    hash: hash_1.sha256,
    gRed: false,
    g: [
      '6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296',
      '4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5',
    ],
  });

  defineCurve('p384', {
    type: 'short',
    prime: null,
    p: 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
       'fffffffe ffffffff 00000000 00000000 ffffffff',
    a: 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
       'fffffffe ffffffff 00000000 00000000 fffffffc',
    b: 'b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f ' +
       '5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef',
    n: 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 ' +
       'f4372ddf 581a0db2 48b0a77a ecec196a ccc52973',
    hash: hash_1.sha384,
    gRed: false,
    g: [
      'aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 ' +
      '5502f25d bf55296c 3a545e38 72760ab7',
      '3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 ' +
      '0a60b1ce 1d7e819d 7a431d7c 90ea0e5f',
    ],
  });

  defineCurve('p521', {
    type: 'short',
    prime: null,
    p: '000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
       'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
       'ffffffff ffffffff ffffffff ffffffff ffffffff',
    a: '000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
       'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
       'ffffffff ffffffff ffffffff ffffffff fffffffc',
    b: '00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b ' +
       '99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd ' +
       '3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00',
    n: '000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
       'ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 ' +
       'f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409',
    hash: hash_1.sha512,
    gRed: false,
    g: [
      '000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 ' +
      '053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 ' +
      'a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66',
      '00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 ' +
      '579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 ' +
      '3fad0761 353c7086 a272c240 88be9476 9fd16650',
    ],
  });

  defineCurve('curve25519', {
    type: 'mont',
    prime: 'p25519',
    p: '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed',
    a: '76d06',
    b: '1',
    n: '1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed',
    hash: hash_1.sha256,
    gRed: false,
    g: [
      '9',
    ],
  });

  defineCurve('ed25519', {
    type: 'edwards',
    prime: 'p25519',
    p: '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed',
    a: '-1',
    c: '1',
    // -121665 * (121666^(-1)) (mod P)
    d: '52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3',
    n: '1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed',
    hash: hash_1.sha256,
    gRed: false,
    g: [
      '216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a',

      // 4/5
      '6666666666666666666666666666666666666666666666666666666666666658',
    ],
  });

  var pre;
  try {
    pre = secp256k1;
  } catch (e) {
    pre = undefined;
  }

  defineCurve('secp256k1', {
    type: 'short',
    prime: 'k256',
    p: 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f',
    a: '0',
    b: '7',
    n: 'ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141',
    h: '1',
    hash: hash_1.sha256,

    // Precomputed endomorphism
    beta: '7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee',
    lambda: '5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72',
    basis: [
      {
        a: '3086d221a7d46bcde86c90e49284eb15',
        b: '-e4437ed6010e88286f547fa90abfe4c3',
      },
      {
        a: '114ca50f7a8e2f3f657c1108d9d44cfd8',
        b: '3086d221a7d46bcde86c90e49284eb15',
      },
    ],

    gRed: false,
    g: [
      '79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798',
      '483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8',
      pre,
    ],
  });
  });

  function HmacDRBG(options) {
    if (!(this instanceof HmacDRBG))
      return new HmacDRBG(options);
    this.hash = options.hash;
    this.predResist = !!options.predResist;

    this.outLen = this.hash.outSize;
    this.minEntropy = options.minEntropy || this.hash.hmacStrength;

    this._reseed = null;
    this.reseedInterval = null;
    this.K = null;
    this.V = null;

    var entropy = utils_1$1.toArray(options.entropy, options.entropyEnc || 'hex');
    var nonce = utils_1$1.toArray(options.nonce, options.nonceEnc || 'hex');
    var pers = utils_1$1.toArray(options.pers, options.persEnc || 'hex');
    minimalisticAssert(entropy.length >= (this.minEntropy / 8),
           'Not enough entropy. Minimum is: ' + this.minEntropy + ' bits');
    this._init(entropy, nonce, pers);
  }
  var hmacDrbg = HmacDRBG;

  HmacDRBG.prototype._init = function init(entropy, nonce, pers) {
    var seed = entropy.concat(nonce).concat(pers);

    this.K = new Array(this.outLen / 8);
    this.V = new Array(this.outLen / 8);
    for (var i = 0; i < this.V.length; i++) {
      this.K[i] = 0x00;
      this.V[i] = 0x01;
    }

    this._update(seed);
    this._reseed = 1;
    this.reseedInterval = 0x1000000000000;  // 2^48
  };

  HmacDRBG.prototype._hmac = function hmac() {
    return new hash_1.hmac(this.hash, this.K);
  };

  HmacDRBG.prototype._update = function update(seed) {
    var kmac = this._hmac()
                   .update(this.V)
                   .update([ 0x00 ]);
    if (seed)
      kmac = kmac.update(seed);
    this.K = kmac.digest();
    this.V = this._hmac().update(this.V).digest();
    if (!seed)
      return;

    this.K = this._hmac()
                 .update(this.V)
                 .update([ 0x01 ])
                 .update(seed)
                 .digest();
    this.V = this._hmac().update(this.V).digest();
  };

  HmacDRBG.prototype.reseed = function reseed(entropy, entropyEnc, add, addEnc) {
    // Optional entropy enc
    if (typeof entropyEnc !== 'string') {
      addEnc = add;
      add = entropyEnc;
      entropyEnc = null;
    }

    entropy = utils_1$1.toArray(entropy, entropyEnc);
    add = utils_1$1.toArray(add, addEnc);

    minimalisticAssert(entropy.length >= (this.minEntropy / 8),
           'Not enough entropy. Minimum is: ' + this.minEntropy + ' bits');

    this._update(entropy.concat(add || []));
    this._reseed = 1;
  };

  HmacDRBG.prototype.generate = function generate(len, enc, add, addEnc) {
    if (this._reseed > this.reseedInterval)
      throw new Error('Reseed is required');

    // Optional encoding
    if (typeof enc !== 'string') {
      addEnc = add;
      add = enc;
      enc = null;
    }

    // Optional additional data
    if (add) {
      add = utils_1$1.toArray(add, addEnc || 'hex');
      this._update(add);
    }

    var temp = [];
    while (temp.length < len) {
      this.V = this._hmac().update(this.V).digest();
      temp = temp.concat(this.V);
    }

    var res = temp.slice(0, len);
    this._update(add);
    this._reseed++;
    return utils_1$1.encode(res, enc);
  };

  var assert$5 = utils_1.assert;

  function KeyPair$1(ec, options) {
    this.ec = ec;
    this.priv = null;
    this.pub = null;

    // KeyPair(ec, { priv: ..., pub: ... })
    if (options.priv)
      this._importPrivate(options.priv, options.privEnc);
    if (options.pub)
      this._importPublic(options.pub, options.pubEnc);
  }
  var key$1 = KeyPair$1;

  KeyPair$1.fromPublic = function fromPublic(ec, pub, enc) {
    if (pub instanceof KeyPair$1)
      return pub;

    return new KeyPair$1(ec, {
      pub: pub,
      pubEnc: enc,
    });
  };

  KeyPair$1.fromPrivate = function fromPrivate(ec, priv, enc) {
    if (priv instanceof KeyPair$1)
      return priv;

    return new KeyPair$1(ec, {
      priv: priv,
      privEnc: enc,
    });
  };

  KeyPair$1.prototype.validate = function validate() {
    var pub = this.getPublic();

    if (pub.isInfinity())
      return { result: false, reason: 'Invalid public key' };
    if (!pub.validate())
      return { result: false, reason: 'Public key is not a point' };
    if (!pub.mul(this.ec.curve.n).isInfinity())
      return { result: false, reason: 'Public key * N != O' };

    return { result: true, reason: null };
  };

  KeyPair$1.prototype.getPublic = function getPublic(compact, enc) {
    // compact is optional argument
    if (typeof compact === 'string') {
      enc = compact;
      compact = null;
    }

    if (!this.pub)
      this.pub = this.ec.g.mul(this.priv);

    if (!enc)
      return this.pub;

    return this.pub.encode(enc, compact);
  };

  KeyPair$1.prototype.getPrivate = function getPrivate(enc) {
    if (enc === 'hex')
      return this.priv.toString(16, 2);
    else
      return this.priv;
  };

  KeyPair$1.prototype._importPrivate = function _importPrivate(key, enc) {
    this.priv = new bn(key, enc || 16);

    // Ensure that the priv won't be bigger than n, otherwise we may fail
    // in fixed multiplication method
    this.priv = this.priv.umod(this.ec.curve.n);
  };

  KeyPair$1.prototype._importPublic = function _importPublic(key, enc) {
    if (key.x || key.y) {
      // Montgomery points only have an `x` coordinate.
      // Weierstrass/Edwards points on the other hand have both `x` and
      // `y` coordinates.
      if (this.ec.curve.type === 'mont') {
        assert$5(key.x, 'Need x coordinate');
      } else if (this.ec.curve.type === 'short' ||
                 this.ec.curve.type === 'edwards') {
        assert$5(key.x && key.y, 'Need both x and y coordinate');
      }
      this.pub = this.ec.curve.point(key.x, key.y);
      return;
    }
    this.pub = this.ec.curve.decodePoint(key, enc);
  };

  // ECDH
  KeyPair$1.prototype.derive = function derive(pub) {
    if(!pub.validate()) {
      assert$5(pub.validate(), 'public point not validated');
    }
    return pub.mul(this.priv).getX();
  };

  // ECDSA
  KeyPair$1.prototype.sign = function sign(msg, enc, options) {
    return this.ec.sign(msg, this, enc, options);
  };

  KeyPair$1.prototype.verify = function verify(msg, signature) {
    return this.ec.verify(msg, signature, this);
  };

  KeyPair$1.prototype.inspect = function inspect() {
    return '<Key priv: ' + (this.priv && this.priv.toString(16, 2)) +
           ' pub: ' + (this.pub && this.pub.inspect()) + ' >';
  };

  var assert$4 = utils_1.assert;

  function Signature$1(options, enc) {
    if (options instanceof Signature$1)
      return options;

    if (this._importDER(options, enc))
      return;

    assert$4(options.r && options.s, 'Signature without r or s');
    this.r = new bn(options.r, 16);
    this.s = new bn(options.s, 16);
    if (options.recoveryParam === undefined)
      this.recoveryParam = null;
    else
      this.recoveryParam = options.recoveryParam;
  }
  var signature$1 = Signature$1;

  function Position() {
    this.place = 0;
  }

  function getLength(buf, p) {
    var initial = buf[p.place++];
    if (!(initial & 0x80)) {
      return initial;
    }
    var octetLen = initial & 0xf;

    // Indefinite length or overflow
    if (octetLen === 0 || octetLen > 4) {
      return false;
    }

    var val = 0;
    for (var i = 0, off = p.place; i < octetLen; i++, off++) {
      val <<= 8;
      val |= buf[off];
      val >>>= 0;
    }

    // Leading zeroes
    if (val <= 0x7f) {
      return false;
    }

    p.place = off;
    return val;
  }

  function rmPadding(buf) {
    var i = 0;
    var len = buf.length - 1;
    while (!buf[i] && !(buf[i + 1] & 0x80) && i < len) {
      i++;
    }
    if (i === 0) {
      return buf;
    }
    return buf.slice(i);
  }

  Signature$1.prototype._importDER = function _importDER(data, enc) {
    data = utils_1.toArray(data, enc);
    var p = new Position();
    if (data[p.place++] !== 0x30) {
      return false;
    }
    var len = getLength(data, p);
    if (len === false) {
      return false;
    }
    if ((len + p.place) !== data.length) {
      return false;
    }
    if (data[p.place++] !== 0x02) {
      return false;
    }
    var rlen = getLength(data, p);
    if (rlen === false) {
      return false;
    }
    var r = data.slice(p.place, rlen + p.place);
    p.place += rlen;
    if (data[p.place++] !== 0x02) {
      return false;
    }
    var slen = getLength(data, p);
    if (slen === false) {
      return false;
    }
    if (data.length !== slen + p.place) {
      return false;
    }
    var s = data.slice(p.place, slen + p.place);
    if (r[0] === 0) {
      if (r[1] & 0x80) {
        r = r.slice(1);
      } else {
        // Leading zeroes
        return false;
      }
    }
    if (s[0] === 0) {
      if (s[1] & 0x80) {
        s = s.slice(1);
      } else {
        // Leading zeroes
        return false;
      }
    }

    this.r = new bn(r);
    this.s = new bn(s);
    this.recoveryParam = null;

    return true;
  };

  function constructLength(arr, len) {
    if (len < 0x80) {
      arr.push(len);
      return;
    }
    var octets = 1 + (Math.log(len) / Math.LN2 >>> 3);
    arr.push(octets | 0x80);
    while (--octets) {
      arr.push((len >>> (octets << 3)) & 0xff);
    }
    arr.push(len);
  }

  Signature$1.prototype.toDER = function toDER(enc) {
    var r = this.r.toArray();
    var s = this.s.toArray();

    // Pad values
    if (r[0] & 0x80)
      r = [ 0 ].concat(r);
    // Pad values
    if (s[0] & 0x80)
      s = [ 0 ].concat(s);

    r = rmPadding(r);
    s = rmPadding(s);

    while (!s[0] && !(s[1] & 0x80)) {
      s = s.slice(1);
    }
    var arr = [ 0x02 ];
    constructLength(arr, r.length);
    arr = arr.concat(r);
    arr.push(0x02);
    constructLength(arr, s.length);
    var backHalf = arr.concat(s);
    var res = [ 0x30 ];
    constructLength(res, backHalf.length);
    res = res.concat(backHalf);
    return utils_1.encode(res, enc);
  };

  var assert$3 = utils_1.assert;




  function EC$1(options) {
    if (!(this instanceof EC$1))
      return new EC$1(options);

    // Shortcut `elliptic.ec(curve-name)`
    if (typeof options === 'string') {
      assert$3(Object.prototype.hasOwnProperty.call(curves_1, options),
        'Unknown curve ' + options);

      options = curves_1[options];
    }

    // Shortcut for `elliptic.ec(elliptic.curves.curveName)`
    if (options instanceof curves_1.PresetCurve)
      options = { curve: options };

    this.curve = options.curve.curve;
    this.n = this.curve.n;
    this.nh = this.n.ushrn(1);
    this.g = this.curve.g;

    // Point on curve
    this.g = options.curve.g;
    this.g.precompute(options.curve.n.bitLength() + 1);

    // Hash for function for DRBG
    this.hash = options.hash || options.curve.hash;
  }
  var ec$1 = EC$1;

  EC$1.prototype.keyPair = function keyPair(options) {
    return new key$1(this, options);
  };

  EC$1.prototype.keyFromPrivate = function keyFromPrivate(priv, enc) {
    return key$1.fromPrivate(this, priv, enc);
  };

  EC$1.prototype.keyFromPublic = function keyFromPublic(pub, enc) {
    return key$1.fromPublic(this, pub, enc);
  };

  EC$1.prototype.genKeyPair = function genKeyPair(options) {
    if (!options)
      options = {};

    // Instantiate Hmac_DRBG
    var drbg = new hmacDrbg({
      hash: this.hash,
      pers: options.pers,
      persEnc: options.persEnc || 'utf8',
      entropy: options.entropy || brorand(this.hash.hmacStrength),
      entropyEnc: options.entropy && options.entropyEnc || 'utf8',
      nonce: this.n.toArray(),
    });

    var bytes = this.n.byteLength();
    var ns2 = this.n.sub(new bn(2));
    for (;;) {
      var priv = new bn(drbg.generate(bytes));
      if (priv.cmp(ns2) > 0)
        continue;

      priv.iaddn(1);
      return this.keyFromPrivate(priv);
    }
  };

  EC$1.prototype._truncateToN = function _truncateToN(msg, truncOnly) {
    var delta = msg.byteLength() * 8 - this.n.bitLength();
    if (delta > 0)
      msg = msg.ushrn(delta);
    if (!truncOnly && msg.cmp(this.n) >= 0)
      return msg.sub(this.n);
    else
      return msg;
  };

  EC$1.prototype.sign = function sign(msg, key, enc, options) {
    if (typeof enc === 'object') {
      options = enc;
      enc = null;
    }
    if (!options)
      options = {};

    key = this.keyFromPrivate(key, enc);
    msg = this._truncateToN(new bn(msg, 16));

    // Zero-extend key to provide enough entropy
    var bytes = this.n.byteLength();
    var bkey = key.getPrivate().toArray('be', bytes);

    // Zero-extend nonce to have the same byte size as N
    var nonce = msg.toArray('be', bytes);

    // Instantiate Hmac_DRBG
    var drbg = new hmacDrbg({
      hash: this.hash,
      entropy: bkey,
      nonce: nonce,
      pers: options.pers,
      persEnc: options.persEnc || 'utf8',
    });

    // Number of bytes to generate
    var ns1 = this.n.sub(new bn(1));

    for (var iter = 0; ; iter++) {
      var k = options.k ?
        options.k(iter) :
        new bn(drbg.generate(this.n.byteLength()));
      k = this._truncateToN(k, true);
      if (k.cmpn(1) <= 0 || k.cmp(ns1) >= 0)
        continue;

      var kp = this.g.mul(k);
      if (kp.isInfinity())
        continue;

      var kpX = kp.getX();
      var r = kpX.umod(this.n);
      if (r.cmpn(0) === 0)
        continue;

      var s = k.invm(this.n).mul(r.mul(key.getPrivate()).iadd(msg));
      s = s.umod(this.n);
      if (s.cmpn(0) === 0)
        continue;

      var recoveryParam = (kp.getY().isOdd() ? 1 : 0) |
                          (kpX.cmp(r) !== 0 ? 2 : 0);

      // Use complement of `s`, if it is > `n / 2`
      if (options.canonical && s.cmp(this.nh) > 0) {
        s = this.n.sub(s);
        recoveryParam ^= 1;
      }

      return new signature$1({ r: r, s: s, recoveryParam: recoveryParam });
    }
  };

  EC$1.prototype.verify = function verify(msg, signature, key, enc) {
    msg = this._truncateToN(new bn(msg, 16));
    key = this.keyFromPublic(key, enc);
    signature = new signature$1(signature, 'hex');

    // Perform primitive values validation
    var r = signature.r;
    var s = signature.s;
    if (r.cmpn(1) < 0 || r.cmp(this.n) >= 0)
      return false;
    if (s.cmpn(1) < 0 || s.cmp(this.n) >= 0)
      return false;

    // Validate signature
    var sinv = s.invm(this.n);
    var u1 = sinv.mul(msg).umod(this.n);
    var u2 = sinv.mul(r).umod(this.n);
    var p;

    if (!this.curve._maxwellTrick) {
      p = this.g.mulAdd(u1, key.getPublic(), u2);
      if (p.isInfinity())
        return false;

      return p.getX().umod(this.n).cmp(r) === 0;
    }

    // NOTE: Greg Maxwell's trick, inspired by:
    // https://git.io/vad3K

    p = this.g.jmulAdd(u1, key.getPublic(), u2);
    if (p.isInfinity())
      return false;

    // Compare `p.x` of Jacobian point with `r`,
    // this will do `p.x == r * p.z^2` instead of multiplying `p.x` by the
    // inverse of `p.z^2`
    return p.eqXToP(r);
  };

  EC$1.prototype.recoverPubKey = function(msg, signature, j, enc) {
    assert$3((3 & j) === j, 'The recovery param is more than two bits');
    signature = new signature$1(signature, enc);

    var n = this.n;
    var e = new bn(msg);
    var r = signature.r;
    var s = signature.s;

    // A set LSB signifies that the y-coordinate is odd
    var isYOdd = j & 1;
    var isSecondKey = j >> 1;
    if (r.cmp(this.curve.p.umod(this.curve.n)) >= 0 && isSecondKey)
      throw new Error('Unable to find sencond key candinate');

    // 1.1. Let x = r + jn.
    if (isSecondKey)
      r = this.curve.pointFromX(r.add(this.curve.n), isYOdd);
    else
      r = this.curve.pointFromX(r, isYOdd);

    var rInv = signature.r.invm(n);
    var s1 = n.sub(e).mul(rInv).umod(n);
    var s2 = s.mul(rInv).umod(n);

    // 1.6.1 Compute Q = r^-1 (sR -  eG)
    //               Q = r^-1 (sR + -eG)
    return this.g.mulAdd(s1, r, s2);
  };

  EC$1.prototype.getKeyRecoveryParam = function(e, signature, Q, enc) {
    signature = new signature$1(signature, enc);
    if (signature.recoveryParam !== null)
      return signature.recoveryParam;

    for (var i = 0; i < 4; i++) {
      var Qprime;
      try {
        Qprime = this.recoverPubKey(e, signature, i);
      } catch (e) {
        continue;
      }

      if (Qprime.eq(Q))
        return i;
    }
    throw new Error('Unable to find valid recovery factor');
  };

  var assert$2 = utils_1.assert;
  var parseBytes$2 = utils_1.parseBytes;
  var cachedProperty$1 = utils_1.cachedProperty;

  /**
  * @param {EDDSA} eddsa - instance
  * @param {Object} params - public/private key parameters
  *
  * @param {Array<Byte>} [params.secret] - secret seed bytes
  * @param {Point} [params.pub] - public key point (aka `A` in eddsa terms)
  * @param {Array<Byte>} [params.pub] - public key point encoded as bytes
  *
  */
  function KeyPair(eddsa, params) {
    this.eddsa = eddsa;
    this._secret = parseBytes$2(params.secret);
    if (eddsa.isPoint(params.pub))
      this._pub = params.pub;
    else
      this._pubBytes = parseBytes$2(params.pub);
  }

  KeyPair.fromPublic = function fromPublic(eddsa, pub) {
    if (pub instanceof KeyPair)
      return pub;
    return new KeyPair(eddsa, { pub: pub });
  };

  KeyPair.fromSecret = function fromSecret(eddsa, secret) {
    if (secret instanceof KeyPair)
      return secret;
    return new KeyPair(eddsa, { secret: secret });
  };

  KeyPair.prototype.secret = function secret() {
    return this._secret;
  };

  cachedProperty$1(KeyPair, 'pubBytes', function pubBytes() {
    return this.eddsa.encodePoint(this.pub());
  });

  cachedProperty$1(KeyPair, 'pub', function pub() {
    if (this._pubBytes)
      return this.eddsa.decodePoint(this._pubBytes);
    return this.eddsa.g.mul(this.priv());
  });

  cachedProperty$1(KeyPair, 'privBytes', function privBytes() {
    var eddsa = this.eddsa;
    var hash = this.hash();
    var lastIx = eddsa.encodingLength - 1;

    var a = hash.slice(0, eddsa.encodingLength);
    a[0] &= 248;
    a[lastIx] &= 127;
    a[lastIx] |= 64;

    return a;
  });

  cachedProperty$1(KeyPair, 'priv', function priv() {
    return this.eddsa.decodeInt(this.privBytes());
  });

  cachedProperty$1(KeyPair, 'hash', function hash() {
    return this.eddsa.hash().update(this.secret()).digest();
  });

  cachedProperty$1(KeyPair, 'messagePrefix', function messagePrefix() {
    return this.hash().slice(this.eddsa.encodingLength);
  });

  KeyPair.prototype.sign = function sign(message) {
    assert$2(this._secret, 'KeyPair can only verify');
    return this.eddsa.sign(message, this);
  };

  KeyPair.prototype.verify = function verify(message, sig) {
    return this.eddsa.verify(message, sig, this);
  };

  KeyPair.prototype.getSecret = function getSecret(enc) {
    assert$2(this._secret, 'KeyPair is public only');
    return utils_1.encode(this.secret(), enc);
  };

  KeyPair.prototype.getPublic = function getPublic(enc) {
    return utils_1.encode(this.pubBytes(), enc);
  };

  var key = KeyPair;

  var assert$1 = utils_1.assert;
  var cachedProperty = utils_1.cachedProperty;
  var parseBytes$1 = utils_1.parseBytes;

  /**
  * @param {EDDSA} eddsa - eddsa instance
  * @param {Array<Bytes>|Object} sig -
  * @param {Array<Bytes>|Point} [sig.R] - R point as Point or bytes
  * @param {Array<Bytes>|bn} [sig.S] - S scalar as bn or bytes
  * @param {Array<Bytes>} [sig.Rencoded] - R point encoded
  * @param {Array<Bytes>} [sig.Sencoded] - S scalar encoded
  */
  function Signature(eddsa, sig) {
    this.eddsa = eddsa;

    if (typeof sig !== 'object')
      sig = parseBytes$1(sig);

    if (Array.isArray(sig)) {
      sig = {
        R: sig.slice(0, eddsa.encodingLength),
        S: sig.slice(eddsa.encodingLength),
      };
    }

    assert$1(sig.R && sig.S, 'Signature without R or S');

    if (eddsa.isPoint(sig.R))
      this._R = sig.R;
    if (sig.S instanceof bn)
      this._S = sig.S;

    this._Rencoded = Array.isArray(sig.R) ? sig.R : sig.Rencoded;
    this._Sencoded = Array.isArray(sig.S) ? sig.S : sig.Sencoded;
  }

  cachedProperty(Signature, 'S', function S() {
    return this.eddsa.decodeInt(this.Sencoded());
  });

  cachedProperty(Signature, 'R', function R() {
    return this.eddsa.decodePoint(this.Rencoded());
  });

  cachedProperty(Signature, 'Rencoded', function Rencoded() {
    return this.eddsa.encodePoint(this.R());
  });

  cachedProperty(Signature, 'Sencoded', function Sencoded() {
    return this.eddsa.encodeInt(this.S());
  });

  Signature.prototype.toBytes = function toBytes() {
    return this.Rencoded().concat(this.Sencoded());
  };

  Signature.prototype.toHex = function toHex() {
    return utils_1.encode(this.toBytes(), 'hex').toUpperCase();
  };

  var signature = Signature;

  var assert = utils_1.assert;
  var parseBytes = utils_1.parseBytes;



  function EDDSA(curve) {
    assert(curve === 'ed25519', 'only tested with ed25519 so far');

    if (!(this instanceof EDDSA))
      return new EDDSA(curve);

    curve = curves_1[curve].curve;
    this.curve = curve;
    this.g = curve.g;
    this.g.precompute(curve.n.bitLength() + 1);

    this.pointClass = curve.point().constructor;
    this.encodingLength = Math.ceil(curve.n.bitLength() / 8);
    this.hash = hash_1.sha512;
  }

  var eddsa = EDDSA;

  /**
  * @param {Array|String} message - message bytes
  * @param {Array|String|KeyPair} secret - secret bytes or a keypair
  * @returns {Signature} - signature
  */
  EDDSA.prototype.sign = function sign(message, secret) {
    message = parseBytes(message);
    var key = this.keyFromSecret(secret);
    var r = this.hashInt(key.messagePrefix(), message);
    var R = this.g.mul(r);
    var Rencoded = this.encodePoint(R);
    var s_ = this.hashInt(Rencoded, key.pubBytes(), message)
      .mul(key.priv());
    var S = r.add(s_).umod(this.curve.n);
    return this.makeSignature({ R: R, S: S, Rencoded: Rencoded });
  };

  /**
  * @param {Array} message - message bytes
  * @param {Array|String|Signature} sig - sig bytes
  * @param {Array|String|Point|KeyPair} pub - public key
  * @returns {Boolean} - true if public key matches sig of message
  */
  EDDSA.prototype.verify = function verify(message, sig, pub) {
    message = parseBytes(message);
    sig = this.makeSignature(sig);
    var key = this.keyFromPublic(pub);
    var h = this.hashInt(sig.Rencoded(), key.pubBytes(), message);
    var SG = this.g.mul(sig.S());
    var RplusAh = sig.R().add(key.pub().mul(h));
    return RplusAh.eq(SG);
  };

  EDDSA.prototype.hashInt = function hashInt() {
    var hash = this.hash();
    for (var i = 0; i < arguments.length; i++)
      hash.update(arguments[i]);
    return utils_1.intFromLE(hash.digest()).umod(this.curve.n);
  };

  EDDSA.prototype.keyFromPublic = function keyFromPublic(pub) {
    return key.fromPublic(this, pub);
  };

  EDDSA.prototype.keyFromSecret = function keyFromSecret(secret) {
    return key.fromSecret(this, secret);
  };

  EDDSA.prototype.makeSignature = function makeSignature(sig) {
    if (sig instanceof signature)
      return sig;
    return new signature(this, sig);
  };

  /**
  * * https://tools.ietf.org/html/draft-josefsson-eddsa-ed25519-03#section-5.2
  *
  * EDDSA defines methods for encoding and decoding points and integers. These are
  * helper convenience methods, that pass along to utility functions implied
  * parameters.
  *
  */
  EDDSA.prototype.encodePoint = function encodePoint(point) {
    var enc = point.getY().toArray('le', this.encodingLength);
    enc[this.encodingLength - 1] |= point.getX().isOdd() ? 0x80 : 0;
    return enc;
  };

  EDDSA.prototype.decodePoint = function decodePoint(bytes) {
    bytes = utils_1.parseBytes(bytes);

    var lastIx = bytes.length - 1;
    var normed = bytes.slice(0, lastIx).concat(bytes[lastIx] & ~0x80);
    var xIsOdd = (bytes[lastIx] & 0x80) !== 0;

    var y = utils_1.intFromLE(normed);
    return this.curve.pointFromY(y, xIsOdd);
  };

  EDDSA.prototype.encodeInt = function encodeInt(num) {
    return num.toArray('le', this.encodingLength);
  };

  EDDSA.prototype.decodeInt = function decodeInt(bytes) {
    return utils_1.intFromLE(bytes);
  };

  EDDSA.prototype.isPoint = function isPoint(val) {
    return val instanceof this.pointClass;
  };

  var elliptic_1 = createCommonjsModule(function (module, exports) {

  var elliptic = exports;

  elliptic.version = require$$0.version;
  elliptic.utils = utils_1;
  elliptic.rand = brorand;
  elliptic.curve = curve_1;
  elliptic.curves = curves_1;

  // Protocols
  elliptic.ec = ec$1;
  elliptic.eddsa = eddsa;
  });

  const EC = elliptic_1.ec;

  const ec = new EC('secp256k1');
  const ecparams = ec.curve;

  // Hack, we can not use bn.js@5, while elliptic uses bn.js@4
  // See https://github.com/indutny/elliptic/issues/191#issuecomment-569888758
  const BN = ecparams.n.constructor;

  function loadCompressedPublicKey (first, xbuf) {
    let x = new BN(xbuf);

    // overflow
    if (x.cmp(ecparams.p) >= 0) return null
    x = x.toRed(ecparams.red);

    // compute corresponding Y
    let y = x.redSqr().redIMul(x).redIAdd(ecparams.b).redSqrt();
    if ((first === 0x03) !== y.isOdd()) y = y.redNeg();

    return ec.keyPair({ pub: { x: x, y: y } })
  }

  function loadUncompressedPublicKey (first, xbuf, ybuf) {
    let x = new BN(xbuf);
    let y = new BN(ybuf);

    // overflow
    if (x.cmp(ecparams.p) >= 0 || y.cmp(ecparams.p) >= 0) return null

    x = x.toRed(ecparams.red);
    y = y.toRed(ecparams.red);

    // is odd flag
    if ((first === 0x06 || first === 0x07) && y.isOdd() !== (first === 0x07)) return null

    // x*x*x + b = y*y
    const x3 = x.redSqr().redIMul(x);
    if (!y.redSqr().redISub(x3.redIAdd(ecparams.b)).isZero()) return null

    return ec.keyPair({ pub: { x: x, y: y } })
  }

  function loadPublicKey (pubkey) {
    // length should be validated in interface
    const first = pubkey[0];
    switch (first) {
      case 0x02:
      case 0x03:
        if (pubkey.length !== 33) return null
        return loadCompressedPublicKey(first, pubkey.subarray(1, 33))
      case 0x04:
      case 0x06:
      case 0x07:
        if (pubkey.length !== 65) return null
        return loadUncompressedPublicKey(first, pubkey.subarray(1, 33), pubkey.subarray(33, 65))
      default:
        return null
    }
  }

  function savePublicKey (output, point) {
    const pubkey = point.encode(null, output.length === 33);
    // Loop should be faster because we do not need create extra Uint8Array
    // output.set(new Uint8Array(pubkey))
    for (let i = 0; i < output.length; ++i) output[i] = pubkey[i];
  }

  var elliptic$1 = {
    contextRandomize () {
      return 0
    },

    privateKeyVerify (seckey) {
      const bn = new BN(seckey);
      return bn.cmp(ecparams.n) < 0 && !bn.isZero() ? 0 : 1
    },

    privateKeyNegate (seckey) {
      const bn = new BN(seckey);
      const negate = ecparams.n.sub(bn).umod(ecparams.n).toArrayLike(Uint8Array, 'be', 32);
      seckey.set(negate);
      return 0
    },

    privateKeyTweakAdd (seckey, tweak) {
      const bn = new BN(tweak);
      if (bn.cmp(ecparams.n) >= 0) return 1

      bn.iadd(new BN(seckey));
      if (bn.cmp(ecparams.n) >= 0) bn.isub(ecparams.n);
      if (bn.isZero()) return 1

      const tweaked = bn.toArrayLike(Uint8Array, 'be', 32);
      seckey.set(tweaked);

      return 0
    },

    privateKeyTweakMul (seckey, tweak) {
      let bn = new BN(tweak);
      if (bn.cmp(ecparams.n) >= 0 || bn.isZero()) return 1

      bn.imul(new BN(seckey));
      if (bn.cmp(ecparams.n) >= 0) bn = bn.umod(ecparams.n);

      const tweaked = bn.toArrayLike(Uint8Array, 'be', 32);
      seckey.set(tweaked);

      return 0
    },

    publicKeyVerify (pubkey) {
      const pair = loadPublicKey(pubkey);
      return pair === null ? 1 : 0
    },

    publicKeyCreate (output, seckey) {
      const bn = new BN(seckey);
      if (bn.cmp(ecparams.n) >= 0 || bn.isZero()) return 1

      const point = ec.keyFromPrivate(seckey).getPublic();
      savePublicKey(output, point);

      return 0
    },

    publicKeyConvert (output, pubkey) {
      const pair = loadPublicKey(pubkey);
      if (pair === null) return 1

      const point = pair.getPublic();
      savePublicKey(output, point);

      return 0
    },

    publicKeyNegate (output, pubkey) {
      const pair = loadPublicKey(pubkey);
      if (pair === null) return 1

      const point = pair.getPublic();
      point.y = point.y.redNeg();
      savePublicKey(output, point);

      return 0
    },

    publicKeyCombine (output, pubkeys) {
      const pairs = new Array(pubkeys.length);
      for (let i = 0; i < pubkeys.length; ++i) {
        pairs[i] = loadPublicKey(pubkeys[i]);
        if (pairs[i] === null) return 1
      }

      let point = pairs[0].getPublic();
      for (let i = 1; i < pairs.length; ++i) point = point.add(pairs[i].pub);
      if (point.isInfinity()) return 2

      savePublicKey(output, point);

      return 0
    },

    publicKeyTweakAdd (output, pubkey, tweak) {
      const pair = loadPublicKey(pubkey);
      if (pair === null) return 1

      tweak = new BN(tweak);
      if (tweak.cmp(ecparams.n) >= 0) return 2

      const point = pair.getPublic().add(ecparams.g.mul(tweak));
      if (point.isInfinity()) return 2

      savePublicKey(output, point);

      return 0
    },

    publicKeyTweakMul (output, pubkey, tweak) {
      const pair = loadPublicKey(pubkey);
      if (pair === null) return 1

      tweak = new BN(tweak);
      if (tweak.cmp(ecparams.n) >= 0 || tweak.isZero()) return 2

      const point = pair.getPublic().mul(tweak);
      savePublicKey(output, point);

      return 0
    },

    signatureNormalize (sig) {
      const r = new BN(sig.subarray(0, 32));
      const s = new BN(sig.subarray(32, 64));
      if (r.cmp(ecparams.n) >= 0 || s.cmp(ecparams.n) >= 0) return 1

      if (s.cmp(ec.nh) === 1) {
        sig.set(ecparams.n.sub(s).toArrayLike(Uint8Array, 'be', 32), 32);
      }

      return 0
    },

    // Copied 1-to-1 from https://github.com/bitcoinjs/bip66/blob/master/index.js
    // Adapted for Uint8Array instead Buffer
    signatureExport (obj, sig) {
      const sigR = sig.subarray(0, 32);
      const sigS = sig.subarray(32, 64);
      if (new BN(sigR).cmp(ecparams.n) >= 0) return 1
      if (new BN(sigS).cmp(ecparams.n) >= 0) return 1

      const { output } = obj;

      // Prepare R
      let r = output.subarray(4, 4 + 33);
      r[0] = 0x00;
      r.set(sigR, 1);

      let lenR = 33;
      let posR = 0;
      for (; lenR > 1 && r[posR] === 0x00 && !(r[posR + 1] & 0x80); --lenR, ++posR);

      r = r.subarray(posR);
      if (r[0] & 0x80) return 1
      if (lenR > 1 && (r[0] === 0x00) && !(r[1] & 0x80)) return 1

      // Prepare S
      let s = output.subarray(6 + 33, 6 + 33 + 33);
      s[0] = 0x00;
      s.set(sigS, 1);

      let lenS = 33;
      let posS = 0;
      for (; lenS > 1 && s[posS] === 0x00 && !(s[posS + 1] & 0x80); --lenS, ++posS);

      s = s.subarray(posS);
      if (s[0] & 0x80) return 1
      if (lenS > 1 && (s[0] === 0x00) && !(s[1] & 0x80)) return 1

      // Set output length for return
      obj.outputlen = 6 + lenR + lenS;

      // Output in specified format
      // 0x30 [total-length] 0x02 [R-length] [R] 0x02 [S-length] [S]
      output[0] = 0x30;
      output[1] = obj.outputlen - 2;
      output[2] = 0x02;
      output[3] = r.length;
      output.set(r, 4);
      output[4 + lenR] = 0x02;
      output[5 + lenR] = s.length;
      output.set(s, 6 + lenR);

      return 0
    },

    // Copied 1-to-1 from https://github.com/bitcoinjs/bip66/blob/master/index.js
    // Adapted for Uint8Array instead Buffer
    signatureImport (output, sig) {
      if (sig.length < 8) return 1
      if (sig.length > 72) return 1
      if (sig[0] !== 0x30) return 1
      if (sig[1] !== sig.length - 2) return 1
      if (sig[2] !== 0x02) return 1

      const lenR = sig[3];
      if (lenR === 0) return 1
      if (5 + lenR >= sig.length) return 1
      if (sig[4 + lenR] !== 0x02) return 1

      const lenS = sig[5 + lenR];
      if (lenS === 0) return 1
      if ((6 + lenR + lenS) !== sig.length) return 1

      if (sig[4] & 0x80) return 1
      if (lenR > 1 && (sig[4] === 0x00) && !(sig[5] & 0x80)) return 1

      if (sig[lenR + 6] & 0x80) return 1
      if (lenS > 1 && (sig[lenR + 6] === 0x00) && !(sig[lenR + 7] & 0x80)) return 1

      let sigR = sig.subarray(4, 4 + lenR);
      if (sigR.length === 33 && sigR[0] === 0x00) sigR = sigR.subarray(1);
      if (sigR.length > 32) return 1

      let sigS = sig.subarray(6 + lenR);
      if (sigS.length === 33 && sigS[0] === 0x00) sigS = sigS.slice(1);
      if (sigS.length > 32) throw new Error('S length is too long')

      let r = new BN(sigR);
      if (r.cmp(ecparams.n) >= 0) r = new BN(0);

      let s = new BN(sig.subarray(6 + lenR));
      if (s.cmp(ecparams.n) >= 0) s = new BN(0);

      output.set(r.toArrayLike(Uint8Array, 'be', 32), 0);
      output.set(s.toArrayLike(Uint8Array, 'be', 32), 32);

      return 0
    },

    ecdsaSign (obj, message, seckey, data, noncefn) {
      if (noncefn) {
        const _noncefn = noncefn;
        noncefn = (counter) => {
          const nonce = _noncefn(message, seckey, null, data, counter);

          const isValid = nonce instanceof Uint8Array && nonce.length === 32;
          if (!isValid) throw new Error('This is the way')

          return new BN(nonce)
        };
      }

      const d = new BN(seckey);
      if (d.cmp(ecparams.n) >= 0 || d.isZero()) return 1

      let sig;
      try {
        sig = ec.sign(message, seckey, { canonical: true, k: noncefn, pers: data });
      } catch (err) {
        return 1
      }

      obj.signature.set(sig.r.toArrayLike(Uint8Array, 'be', 32), 0);
      obj.signature.set(sig.s.toArrayLike(Uint8Array, 'be', 32), 32);
      obj.recid = sig.recoveryParam;

      return 0
    },

    ecdsaVerify (sig, msg32, pubkey) {
      const sigObj = { r: sig.subarray(0, 32), s: sig.subarray(32, 64) };

      const sigr = new BN(sigObj.r);
      const sigs = new BN(sigObj.s);
      if (sigr.cmp(ecparams.n) >= 0 || sigs.cmp(ecparams.n) >= 0) return 1
      if (sigs.cmp(ec.nh) === 1 || sigr.isZero() || sigs.isZero()) return 3

      const pair = loadPublicKey(pubkey);
      if (pair === null) return 2

      const point = pair.getPublic();
      const isValid = ec.verify(msg32, sigObj, point);
      return isValid ? 0 : 3
    },

    ecdsaRecover (output, sig, recid, msg32) {
      const sigObj = { r: sig.slice(0, 32), s: sig.slice(32, 64) };

      const sigr = new BN(sigObj.r);
      const sigs = new BN(sigObj.s);
      if (sigr.cmp(ecparams.n) >= 0 || sigs.cmp(ecparams.n) >= 0) return 1

      if (sigr.isZero() || sigs.isZero()) return 2

      // Can throw `throw new Error('Unable to find sencond key candinate');`
      let point;
      try {
        point = ec.recoverPubKey(msg32, sigObj, recid);
      } catch (err) {
        return 2
      }

      savePublicKey(output, point);

      return 0
    },

    ecdh (output, pubkey, seckey, data, hashfn, xbuf, ybuf) {
      const pair = loadPublicKey(pubkey);
      if (pair === null) return 1

      const scalar = new BN(seckey);
      if (scalar.cmp(ecparams.n) >= 0 || scalar.isZero()) return 2

      const point = pair.getPublic().mul(scalar);

      if (hashfn === undefined) {
        const data = point.encode(null, true);
        const sha256 = ec.hash().update(data).digest();
        for (let i = 0; i < 32; ++i) output[i] = sha256[i];
      } else {
        if (!xbuf) xbuf = new Uint8Array(32);
        const x = point.getX().toArray('be', 32);
        for (let i = 0; i < 32; ++i) xbuf[i] = x[i];

        if (!ybuf) ybuf = new Uint8Array(32);
        const y = point.getY().toArray('be', 32);
        for (let i = 0; i < 32; ++i) ybuf[i] = y[i];

        const hash = hashfn(xbuf, ybuf, data);

        const isValid = hash instanceof Uint8Array && hash.length === output.length;
        if (!isValid) return 2

        output.set(hash);
      }

      return 0
    }
  };

  var elliptic = lib(elliptic$1);

  var sha3 = createCommonjsModule(function (module) {
  /*jslint bitwise: true */
  (function () {

    var INPUT_ERROR = 'input is invalid type';
    var FINALIZE_ERROR = 'finalize already called';
    var WINDOW = typeof window === 'object';
    var root = WINDOW ? window : {};
    if (root.JS_SHA3_NO_WINDOW) {
      WINDOW = false;
    }
    var WEB_WORKER = !WINDOW && typeof self === 'object';
    var NODE_JS = !root.JS_SHA3_NO_NODE_JS && typeof browser$1$1 === 'object' && browser$1$1.versions && browser$1$1.versions.node;
    if (NODE_JS) {
      root = commonjsGlobal;
    } else if (WEB_WORKER) {
      root = self;
    }
    var COMMON_JS = !root.JS_SHA3_NO_COMMON_JS && 'object' === 'object' && module.exports;
    var ARRAY_BUFFER = !root.JS_SHA3_NO_ARRAY_BUFFER && typeof ArrayBuffer !== 'undefined';
    var HEX_CHARS = '0123456789abcdef'.split('');
    var SHAKE_PADDING = [31, 7936, 2031616, 520093696];
    var CSHAKE_PADDING = [4, 1024, 262144, 67108864];
    var KECCAK_PADDING = [1, 256, 65536, 16777216];
    var PADDING = [6, 1536, 393216, 100663296];
    var SHIFT = [0, 8, 16, 24];
    var RC = [1, 0, 32898, 0, 32906, 2147483648, 2147516416, 2147483648, 32907, 0, 2147483649,
      0, 2147516545, 2147483648, 32777, 2147483648, 138, 0, 136, 0, 2147516425, 0,
      2147483658, 0, 2147516555, 0, 139, 2147483648, 32905, 2147483648, 32771,
      2147483648, 32770, 2147483648, 128, 2147483648, 32778, 0, 2147483658, 2147483648,
      2147516545, 2147483648, 32896, 2147483648, 2147483649, 0, 2147516424, 2147483648];
    var BITS = [224, 256, 384, 512];
    var SHAKE_BITS = [128, 256];
    var OUTPUT_TYPES = ['hex', 'buffer', 'arrayBuffer', 'array', 'digest'];
    var CSHAKE_BYTEPAD = {
      '128': 168,
      '256': 136
    };

    if (root.JS_SHA3_NO_NODE_JS || !Array.isArray) {
      Array.isArray = function (obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
      };
    }

    if (ARRAY_BUFFER && (root.JS_SHA3_NO_ARRAY_BUFFER_IS_VIEW || !ArrayBuffer.isView)) {
      ArrayBuffer.isView = function (obj) {
        return typeof obj === 'object' && obj.buffer && obj.buffer.constructor === ArrayBuffer;
      };
    }

    var createOutputMethod = function (bits, padding, outputType) {
      return function (message) {
        return new Keccak(bits, padding, bits).update(message)[outputType]();
      };
    };

    var createShakeOutputMethod = function (bits, padding, outputType) {
      return function (message, outputBits) {
        return new Keccak(bits, padding, outputBits).update(message)[outputType]();
      };
    };

    var createCshakeOutputMethod = function (bits, padding, outputType) {
      return function (message, outputBits, n, s) {
        return methods['cshake' + bits].update(message, outputBits, n, s)[outputType]();
      };
    };

    var createKmacOutputMethod = function (bits, padding, outputType) {
      return function (key, message, outputBits, s) {
        return methods['kmac' + bits].update(key, message, outputBits, s)[outputType]();
      };
    };

    var createOutputMethods = function (method, createMethod, bits, padding) {
      for (var i = 0; i < OUTPUT_TYPES.length; ++i) {
        var type = OUTPUT_TYPES[i];
        method[type] = createMethod(bits, padding, type);
      }
      return method;
    };

    var createMethod = function (bits, padding) {
      var method = createOutputMethod(bits, padding, 'hex');
      method.create = function () {
        return new Keccak(bits, padding, bits);
      };
      method.update = function (message) {
        return method.create().update(message);
      };
      return createOutputMethods(method, createOutputMethod, bits, padding);
    };

    var createShakeMethod = function (bits, padding) {
      var method = createShakeOutputMethod(bits, padding, 'hex');
      method.create = function (outputBits) {
        return new Keccak(bits, padding, outputBits);
      };
      method.update = function (message, outputBits) {
        return method.create(outputBits).update(message);
      };
      return createOutputMethods(method, createShakeOutputMethod, bits, padding);
    };

    var createCshakeMethod = function (bits, padding) {
      var w = CSHAKE_BYTEPAD[bits];
      var method = createCshakeOutputMethod(bits, padding, 'hex');
      method.create = function (outputBits, n, s) {
        if (!n && !s) {
          return methods['shake' + bits].create(outputBits);
        } else {
          return new Keccak(bits, padding, outputBits).bytepad([n, s], w);
        }
      };
      method.update = function (message, outputBits, n, s) {
        return method.create(outputBits, n, s).update(message);
      };
      return createOutputMethods(method, createCshakeOutputMethod, bits, padding);
    };

    var createKmacMethod = function (bits, padding) {
      var w = CSHAKE_BYTEPAD[bits];
      var method = createKmacOutputMethod(bits, padding, 'hex');
      method.create = function (key, outputBits, s) {
        return new Kmac(bits, padding, outputBits).bytepad(['KMAC', s], w).bytepad([key], w);
      };
      method.update = function (key, message, outputBits, s) {
        return method.create(key, outputBits, s).update(message);
      };
      return createOutputMethods(method, createKmacOutputMethod, bits, padding);
    };

    var algorithms = [
      { name: 'keccak', padding: KECCAK_PADDING, bits: BITS, createMethod: createMethod },
      { name: 'sha3', padding: PADDING, bits: BITS, createMethod: createMethod },
      { name: 'shake', padding: SHAKE_PADDING, bits: SHAKE_BITS, createMethod: createShakeMethod },
      { name: 'cshake', padding: CSHAKE_PADDING, bits: SHAKE_BITS, createMethod: createCshakeMethod },
      { name: 'kmac', padding: CSHAKE_PADDING, bits: SHAKE_BITS, createMethod: createKmacMethod }
    ];

    var methods = {}, methodNames = [];

    for (var i = 0; i < algorithms.length; ++i) {
      var algorithm = algorithms[i];
      var bits = algorithm.bits;
      for (var j = 0; j < bits.length; ++j) {
        var methodName = algorithm.name + '_' + bits[j];
        methodNames.push(methodName);
        methods[methodName] = algorithm.createMethod(bits[j], algorithm.padding);
        if (algorithm.name !== 'sha3') {
          var newMethodName = algorithm.name + bits[j];
          methodNames.push(newMethodName);
          methods[newMethodName] = methods[methodName];
        }
      }
    }

    function Keccak(bits, padding, outputBits) {
      this.blocks = [];
      this.s = [];
      this.padding = padding;
      this.outputBits = outputBits;
      this.reset = true;
      this.finalized = false;
      this.block = 0;
      this.start = 0;
      this.blockCount = (1600 - (bits << 1)) >> 5;
      this.byteCount = this.blockCount << 2;
      this.outputBlocks = outputBits >> 5;
      this.extraBytes = (outputBits & 31) >> 3;

      for (var i = 0; i < 50; ++i) {
        this.s[i] = 0;
      }
    }

    Keccak.prototype.update = function (message) {
      if (this.finalized) {
        throw new Error(FINALIZE_ERROR);
      }
      var notString, type = typeof message;
      if (type !== 'string') {
        if (type === 'object') {
          if (message === null) {
            throw new Error(INPUT_ERROR);
          } else if (ARRAY_BUFFER && message.constructor === ArrayBuffer) {
            message = new Uint8Array(message);
          } else if (!Array.isArray(message)) {
            if (!ARRAY_BUFFER || !ArrayBuffer.isView(message)) {
              throw new Error(INPUT_ERROR);
            }
          }
        } else {
          throw new Error(INPUT_ERROR);
        }
        notString = true;
      }
      var blocks = this.blocks, byteCount = this.byteCount, length = message.length,
        blockCount = this.blockCount, index = 0, s = this.s, i, code;

      while (index < length) {
        if (this.reset) {
          this.reset = false;
          blocks[0] = this.block;
          for (i = 1; i < blockCount + 1; ++i) {
            blocks[i] = 0;
          }
        }
        if (notString) {
          for (i = this.start; index < length && i < byteCount; ++index) {
            blocks[i >> 2] |= message[index] << SHIFT[i++ & 3];
          }
        } else {
          for (i = this.start; index < length && i < byteCount; ++index) {
            code = message.charCodeAt(index);
            if (code < 0x80) {
              blocks[i >> 2] |= code << SHIFT[i++ & 3];
            } else if (code < 0x800) {
              blocks[i >> 2] |= (0xc0 | (code >> 6)) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
            } else if (code < 0xd800 || code >= 0xe000) {
              blocks[i >> 2] |= (0xe0 | (code >> 12)) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | ((code >> 6) & 0x3f)) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
            } else {
              code = 0x10000 + (((code & 0x3ff) << 10) | (message.charCodeAt(++index) & 0x3ff));
              blocks[i >> 2] |= (0xf0 | (code >> 18)) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | ((code >> 12) & 0x3f)) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | ((code >> 6) & 0x3f)) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
            }
          }
        }
        this.lastByteIndex = i;
        if (i >= byteCount) {
          this.start = i - byteCount;
          this.block = blocks[blockCount];
          for (i = 0; i < blockCount; ++i) {
            s[i] ^= blocks[i];
          }
          f(s);
          this.reset = true;
        } else {
          this.start = i;
        }
      }
      return this;
    };

    Keccak.prototype.encode = function (x, right) {
      var o = x & 255, n = 1;
      var bytes = [o];
      x = x >> 8;
      o = x & 255;
      while (o > 0) {
        bytes.unshift(o);
        x = x >> 8;
        o = x & 255;
        ++n;
      }
      if (right) {
        bytes.push(n);
      } else {
        bytes.unshift(n);
      }
      this.update(bytes);
      return bytes.length;
    };

    Keccak.prototype.encodeString = function (str) {
      var notString, type = typeof str;
      if (type !== 'string') {
        if (type === 'object') {
          if (str === null) {
            throw new Error(INPUT_ERROR);
          } else if (ARRAY_BUFFER && str.constructor === ArrayBuffer) {
            str = new Uint8Array(str);
          } else if (!Array.isArray(str)) {
            if (!ARRAY_BUFFER || !ArrayBuffer.isView(str)) {
              throw new Error(INPUT_ERROR);
            }
          }
        } else {
          throw new Error(INPUT_ERROR);
        }
        notString = true;
      }
      var bytes = 0, length = str.length;
      if (notString) {
        bytes = length;
      } else {
        for (var i = 0; i < str.length; ++i) {
          var code = str.charCodeAt(i);
          if (code < 0x80) {
            bytes += 1;
          } else if (code < 0x800) {
            bytes += 2;
          } else if (code < 0xd800 || code >= 0xe000) {
            bytes += 3;
          } else {
            code = 0x10000 + (((code & 0x3ff) << 10) | (str.charCodeAt(++i) & 0x3ff));
            bytes += 4;
          }
        }
      }
      bytes += this.encode(bytes * 8);
      this.update(str);
      return bytes;
    };

    Keccak.prototype.bytepad = function (strs, w) {
      var bytes = this.encode(w);
      for (var i = 0; i < strs.length; ++i) {
        bytes += this.encodeString(strs[i]);
      }
      var paddingBytes = w - bytes % w;
      var zeros = [];
      zeros.length = paddingBytes;
      this.update(zeros);
      return this;
    };

    Keccak.prototype.finalize = function () {
      if (this.finalized) {
        return;
      }
      this.finalized = true;
      var blocks = this.blocks, i = this.lastByteIndex, blockCount = this.blockCount, s = this.s;
      blocks[i >> 2] |= this.padding[i & 3];
      if (this.lastByteIndex === this.byteCount) {
        blocks[0] = blocks[blockCount];
        for (i = 1; i < blockCount + 1; ++i) {
          blocks[i] = 0;
        }
      }
      blocks[blockCount - 1] |= 0x80000000;
      for (i = 0; i < blockCount; ++i) {
        s[i] ^= blocks[i];
      }
      f(s);
    };

    Keccak.prototype.toString = Keccak.prototype.hex = function () {
      this.finalize();

      var blockCount = this.blockCount, s = this.s, outputBlocks = this.outputBlocks,
        extraBytes = this.extraBytes, i = 0, j = 0;
      var hex = '', block;
      while (j < outputBlocks) {
        for (i = 0; i < blockCount && j < outputBlocks; ++i, ++j) {
          block = s[i];
          hex += HEX_CHARS[(block >> 4) & 0x0F] + HEX_CHARS[block & 0x0F] +
            HEX_CHARS[(block >> 12) & 0x0F] + HEX_CHARS[(block >> 8) & 0x0F] +
            HEX_CHARS[(block >> 20) & 0x0F] + HEX_CHARS[(block >> 16) & 0x0F] +
            HEX_CHARS[(block >> 28) & 0x0F] + HEX_CHARS[(block >> 24) & 0x0F];
        }
        if (j % blockCount === 0) {
          f(s);
          i = 0;
        }
      }
      if (extraBytes) {
        block = s[i];
        hex += HEX_CHARS[(block >> 4) & 0x0F] + HEX_CHARS[block & 0x0F];
        if (extraBytes > 1) {
          hex += HEX_CHARS[(block >> 12) & 0x0F] + HEX_CHARS[(block >> 8) & 0x0F];
        }
        if (extraBytes > 2) {
          hex += HEX_CHARS[(block >> 20) & 0x0F] + HEX_CHARS[(block >> 16) & 0x0F];
        }
      }
      return hex;
    };

    Keccak.prototype.arrayBuffer = function () {
      this.finalize();

      var blockCount = this.blockCount, s = this.s, outputBlocks = this.outputBlocks,
        extraBytes = this.extraBytes, i = 0, j = 0;
      var bytes = this.outputBits >> 3;
      var buffer;
      if (extraBytes) {
        buffer = new ArrayBuffer((outputBlocks + 1) << 2);
      } else {
        buffer = new ArrayBuffer(bytes);
      }
      var array = new Uint32Array(buffer);
      while (j < outputBlocks) {
        for (i = 0; i < blockCount && j < outputBlocks; ++i, ++j) {
          array[j] = s[i];
        }
        if (j % blockCount === 0) {
          f(s);
        }
      }
      if (extraBytes) {
        array[i] = s[i];
        buffer = buffer.slice(0, bytes);
      }
      return buffer;
    };

    Keccak.prototype.buffer = Keccak.prototype.arrayBuffer;

    Keccak.prototype.digest = Keccak.prototype.array = function () {
      this.finalize();

      var blockCount = this.blockCount, s = this.s, outputBlocks = this.outputBlocks,
        extraBytes = this.extraBytes, i = 0, j = 0;
      var array = [], offset, block;
      while (j < outputBlocks) {
        for (i = 0; i < blockCount && j < outputBlocks; ++i, ++j) {
          offset = j << 2;
          block = s[i];
          array[offset] = block & 0xFF;
          array[offset + 1] = (block >> 8) & 0xFF;
          array[offset + 2] = (block >> 16) & 0xFF;
          array[offset + 3] = (block >> 24) & 0xFF;
        }
        if (j % blockCount === 0) {
          f(s);
        }
      }
      if (extraBytes) {
        offset = j << 2;
        block = s[i];
        array[offset] = block & 0xFF;
        if (extraBytes > 1) {
          array[offset + 1] = (block >> 8) & 0xFF;
        }
        if (extraBytes > 2) {
          array[offset + 2] = (block >> 16) & 0xFF;
        }
      }
      return array;
    };

    function Kmac(bits, padding, outputBits) {
      Keccak.call(this, bits, padding, outputBits);
    }

    Kmac.prototype = new Keccak();

    Kmac.prototype.finalize = function () {
      this.encode(this.outputBits, true);
      return Keccak.prototype.finalize.call(this);
    };

    var f = function (s) {
      var h, l, n, c0, c1, c2, c3, c4, c5, c6, c7, c8, c9,
        b0, b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12, b13, b14, b15, b16, b17,
        b18, b19, b20, b21, b22, b23, b24, b25, b26, b27, b28, b29, b30, b31, b32, b33,
        b34, b35, b36, b37, b38, b39, b40, b41, b42, b43, b44, b45, b46, b47, b48, b49;
      for (n = 0; n < 48; n += 2) {
        c0 = s[0] ^ s[10] ^ s[20] ^ s[30] ^ s[40];
        c1 = s[1] ^ s[11] ^ s[21] ^ s[31] ^ s[41];
        c2 = s[2] ^ s[12] ^ s[22] ^ s[32] ^ s[42];
        c3 = s[3] ^ s[13] ^ s[23] ^ s[33] ^ s[43];
        c4 = s[4] ^ s[14] ^ s[24] ^ s[34] ^ s[44];
        c5 = s[5] ^ s[15] ^ s[25] ^ s[35] ^ s[45];
        c6 = s[6] ^ s[16] ^ s[26] ^ s[36] ^ s[46];
        c7 = s[7] ^ s[17] ^ s[27] ^ s[37] ^ s[47];
        c8 = s[8] ^ s[18] ^ s[28] ^ s[38] ^ s[48];
        c9 = s[9] ^ s[19] ^ s[29] ^ s[39] ^ s[49];

        h = c8 ^ ((c2 << 1) | (c3 >>> 31));
        l = c9 ^ ((c3 << 1) | (c2 >>> 31));
        s[0] ^= h;
        s[1] ^= l;
        s[10] ^= h;
        s[11] ^= l;
        s[20] ^= h;
        s[21] ^= l;
        s[30] ^= h;
        s[31] ^= l;
        s[40] ^= h;
        s[41] ^= l;
        h = c0 ^ ((c4 << 1) | (c5 >>> 31));
        l = c1 ^ ((c5 << 1) | (c4 >>> 31));
        s[2] ^= h;
        s[3] ^= l;
        s[12] ^= h;
        s[13] ^= l;
        s[22] ^= h;
        s[23] ^= l;
        s[32] ^= h;
        s[33] ^= l;
        s[42] ^= h;
        s[43] ^= l;
        h = c2 ^ ((c6 << 1) | (c7 >>> 31));
        l = c3 ^ ((c7 << 1) | (c6 >>> 31));
        s[4] ^= h;
        s[5] ^= l;
        s[14] ^= h;
        s[15] ^= l;
        s[24] ^= h;
        s[25] ^= l;
        s[34] ^= h;
        s[35] ^= l;
        s[44] ^= h;
        s[45] ^= l;
        h = c4 ^ ((c8 << 1) | (c9 >>> 31));
        l = c5 ^ ((c9 << 1) | (c8 >>> 31));
        s[6] ^= h;
        s[7] ^= l;
        s[16] ^= h;
        s[17] ^= l;
        s[26] ^= h;
        s[27] ^= l;
        s[36] ^= h;
        s[37] ^= l;
        s[46] ^= h;
        s[47] ^= l;
        h = c6 ^ ((c0 << 1) | (c1 >>> 31));
        l = c7 ^ ((c1 << 1) | (c0 >>> 31));
        s[8] ^= h;
        s[9] ^= l;
        s[18] ^= h;
        s[19] ^= l;
        s[28] ^= h;
        s[29] ^= l;
        s[38] ^= h;
        s[39] ^= l;
        s[48] ^= h;
        s[49] ^= l;

        b0 = s[0];
        b1 = s[1];
        b32 = (s[11] << 4) | (s[10] >>> 28);
        b33 = (s[10] << 4) | (s[11] >>> 28);
        b14 = (s[20] << 3) | (s[21] >>> 29);
        b15 = (s[21] << 3) | (s[20] >>> 29);
        b46 = (s[31] << 9) | (s[30] >>> 23);
        b47 = (s[30] << 9) | (s[31] >>> 23);
        b28 = (s[40] << 18) | (s[41] >>> 14);
        b29 = (s[41] << 18) | (s[40] >>> 14);
        b20 = (s[2] << 1) | (s[3] >>> 31);
        b21 = (s[3] << 1) | (s[2] >>> 31);
        b2 = (s[13] << 12) | (s[12] >>> 20);
        b3 = (s[12] << 12) | (s[13] >>> 20);
        b34 = (s[22] << 10) | (s[23] >>> 22);
        b35 = (s[23] << 10) | (s[22] >>> 22);
        b16 = (s[33] << 13) | (s[32] >>> 19);
        b17 = (s[32] << 13) | (s[33] >>> 19);
        b48 = (s[42] << 2) | (s[43] >>> 30);
        b49 = (s[43] << 2) | (s[42] >>> 30);
        b40 = (s[5] << 30) | (s[4] >>> 2);
        b41 = (s[4] << 30) | (s[5] >>> 2);
        b22 = (s[14] << 6) | (s[15] >>> 26);
        b23 = (s[15] << 6) | (s[14] >>> 26);
        b4 = (s[25] << 11) | (s[24] >>> 21);
        b5 = (s[24] << 11) | (s[25] >>> 21);
        b36 = (s[34] << 15) | (s[35] >>> 17);
        b37 = (s[35] << 15) | (s[34] >>> 17);
        b18 = (s[45] << 29) | (s[44] >>> 3);
        b19 = (s[44] << 29) | (s[45] >>> 3);
        b10 = (s[6] << 28) | (s[7] >>> 4);
        b11 = (s[7] << 28) | (s[6] >>> 4);
        b42 = (s[17] << 23) | (s[16] >>> 9);
        b43 = (s[16] << 23) | (s[17] >>> 9);
        b24 = (s[26] << 25) | (s[27] >>> 7);
        b25 = (s[27] << 25) | (s[26] >>> 7);
        b6 = (s[36] << 21) | (s[37] >>> 11);
        b7 = (s[37] << 21) | (s[36] >>> 11);
        b38 = (s[47] << 24) | (s[46] >>> 8);
        b39 = (s[46] << 24) | (s[47] >>> 8);
        b30 = (s[8] << 27) | (s[9] >>> 5);
        b31 = (s[9] << 27) | (s[8] >>> 5);
        b12 = (s[18] << 20) | (s[19] >>> 12);
        b13 = (s[19] << 20) | (s[18] >>> 12);
        b44 = (s[29] << 7) | (s[28] >>> 25);
        b45 = (s[28] << 7) | (s[29] >>> 25);
        b26 = (s[38] << 8) | (s[39] >>> 24);
        b27 = (s[39] << 8) | (s[38] >>> 24);
        b8 = (s[48] << 14) | (s[49] >>> 18);
        b9 = (s[49] << 14) | (s[48] >>> 18);

        s[0] = b0 ^ (~b2 & b4);
        s[1] = b1 ^ (~b3 & b5);
        s[10] = b10 ^ (~b12 & b14);
        s[11] = b11 ^ (~b13 & b15);
        s[20] = b20 ^ (~b22 & b24);
        s[21] = b21 ^ (~b23 & b25);
        s[30] = b30 ^ (~b32 & b34);
        s[31] = b31 ^ (~b33 & b35);
        s[40] = b40 ^ (~b42 & b44);
        s[41] = b41 ^ (~b43 & b45);
        s[2] = b2 ^ (~b4 & b6);
        s[3] = b3 ^ (~b5 & b7);
        s[12] = b12 ^ (~b14 & b16);
        s[13] = b13 ^ (~b15 & b17);
        s[22] = b22 ^ (~b24 & b26);
        s[23] = b23 ^ (~b25 & b27);
        s[32] = b32 ^ (~b34 & b36);
        s[33] = b33 ^ (~b35 & b37);
        s[42] = b42 ^ (~b44 & b46);
        s[43] = b43 ^ (~b45 & b47);
        s[4] = b4 ^ (~b6 & b8);
        s[5] = b5 ^ (~b7 & b9);
        s[14] = b14 ^ (~b16 & b18);
        s[15] = b15 ^ (~b17 & b19);
        s[24] = b24 ^ (~b26 & b28);
        s[25] = b25 ^ (~b27 & b29);
        s[34] = b34 ^ (~b36 & b38);
        s[35] = b35 ^ (~b37 & b39);
        s[44] = b44 ^ (~b46 & b48);
        s[45] = b45 ^ (~b47 & b49);
        s[6] = b6 ^ (~b8 & b0);
        s[7] = b7 ^ (~b9 & b1);
        s[16] = b16 ^ (~b18 & b10);
        s[17] = b17 ^ (~b19 & b11);
        s[26] = b26 ^ (~b28 & b20);
        s[27] = b27 ^ (~b29 & b21);
        s[36] = b36 ^ (~b38 & b30);
        s[37] = b37 ^ (~b39 & b31);
        s[46] = b46 ^ (~b48 & b40);
        s[47] = b47 ^ (~b49 & b41);
        s[8] = b8 ^ (~b0 & b2);
        s[9] = b9 ^ (~b1 & b3);
        s[18] = b18 ^ (~b10 & b12);
        s[19] = b19 ^ (~b11 & b13);
        s[28] = b28 ^ (~b20 & b22);
        s[29] = b29 ^ (~b21 & b23);
        s[38] = b38 ^ (~b30 & b32);
        s[39] = b39 ^ (~b31 & b33);
        s[48] = b48 ^ (~b40 & b42);
        s[49] = b49 ^ (~b41 & b43);

        s[0] ^= RC[n];
        s[1] ^= RC[n + 1];
      }
    };

    if (COMMON_JS) {
      module.exports = methods;
    } else {
      for (i = 0; i < methodNames.length; ++i) {
        root[methodNames[i]] = methods[methodNames[i]];
      }
    }
  })();
  });

  const {
    publicKeyCreate,
    ecdsaSign
  } = elliptic;
  const PRIVATE_KEY_BYTES = 32;
  const ETHEREUM_ADDRESS_BYTES = 20;
  const PUBLIC_KEY_BYTES = 64;
  const SIGNATURE_OFFSETS_SERIALIZED_SIZE = 11;
  /**
   * Params for creating an secp256k1 instruction using a public key
   */

  const SECP256K1_INSTRUCTION_LAYOUT = struct([u8('numSignatures'), u16('signatureOffset'), u8('signatureInstructionIndex'), u16('ethAddressOffset'), u8('ethAddressInstructionIndex'), u16('messageDataOffset'), u16('messageDataSize'), u8('messageInstructionIndex'), blob(20, 'ethAddress'), blob(64, 'signature'), u8('recoveryId')]);
  class Secp256k1Program {
    /**
     * @internal
     */
    constructor() {}
    /**
     * Public key that identifies the secp256k1 program
     */


    /**
     * Construct an Ethereum address from a secp256k1 public key buffer.
     * @param {Buffer} publicKey a 64 byte secp256k1 public key buffer
     */
    static publicKeyToEthAddress(publicKey) {
      assert$d(publicKey.length === PUBLIC_KEY_BYTES, "Public key must be ".concat(PUBLIC_KEY_BYTES, " bytes but received ").concat(publicKey.length, " bytes"));

      try {
        return buffer.Buffer.from(sha3.keccak_256.update(toBuffer(publicKey)).digest()).slice(-ETHEREUM_ADDRESS_BYTES);
      } catch (error) {
        throw new Error("Error constructing Ethereum address: ".concat(error));
      }
    }
    /**
     * Create an secp256k1 instruction with a public key. The public key
     * must be a buffer that is 64 bytes long.
     */


    static createInstructionWithPublicKey(params) {
      const {
        publicKey,
        message,
        signature,
        recoveryId
      } = params;
      return Secp256k1Program.createInstructionWithEthAddress({
        ethAddress: Secp256k1Program.publicKeyToEthAddress(publicKey),
        message,
        signature,
        recoveryId
      });
    }
    /**
     * Create an secp256k1 instruction with an Ethereum address. The address
     * must be a hex string or a buffer that is 20 bytes long.
     */


    static createInstructionWithEthAddress(params) {
      const {
        ethAddress: rawAddress,
        message,
        signature,
        recoveryId
      } = params;
      let ethAddress;

      if (typeof rawAddress === 'string') {
        if (rawAddress.startsWith('0x')) {
          ethAddress = buffer.Buffer.from(rawAddress.substr(2), 'hex');
        } else {
          ethAddress = buffer.Buffer.from(rawAddress, 'hex');
        }
      } else {
        ethAddress = rawAddress;
      }

      assert$d(ethAddress.length === ETHEREUM_ADDRESS_BYTES, "Address must be ".concat(ETHEREUM_ADDRESS_BYTES, " bytes but received ").concat(ethAddress.length, " bytes"));
      const dataStart = 1 + SIGNATURE_OFFSETS_SERIALIZED_SIZE;
      const ethAddressOffset = dataStart;
      const signatureOffset = dataStart + ethAddress.length;
      const messageDataOffset = signatureOffset + signature.length + 1;
      const numSignatures = 1;
      const instructionData = buffer.Buffer.alloc(SECP256K1_INSTRUCTION_LAYOUT.span + message.length);
      SECP256K1_INSTRUCTION_LAYOUT.encode({
        numSignatures,
        signatureOffset,
        signatureInstructionIndex: 0,
        ethAddressOffset,
        ethAddressInstructionIndex: 0,
        messageDataOffset,
        messageDataSize: message.length,
        messageInstructionIndex: 0,
        signature: toBuffer(signature),
        ethAddress: toBuffer(ethAddress),
        recoveryId
      }, instructionData);
      instructionData.fill(toBuffer(message), SECP256K1_INSTRUCTION_LAYOUT.span);
      return new TransactionInstruction({
        keys: [],
        programId: Secp256k1Program.programId,
        data: instructionData
      });
    }
    /**
     * Create an secp256k1 instruction with a private key. The private key
     * must be a buffer that is 32 bytes long.
     */


    static createInstructionWithPrivateKey(params) {
      const {
        privateKey: pkey,
        message
      } = params;
      assert$d(pkey.length === PRIVATE_KEY_BYTES, "Private key must be ".concat(PRIVATE_KEY_BYTES, " bytes but received ").concat(pkey.length, " bytes"));

      try {
        const privateKey = toBuffer(pkey);
        const publicKey = publicKeyCreate(privateKey, false).slice(1); // throw away leading byte

        const messageHash = buffer.Buffer.from(sha3.keccak_256.update(toBuffer(message)).digest());
        const {
          signature,
          recid: recoveryId
        } = ecdsaSign(messageHash, privateKey);
        return this.createInstructionWithPublicKey({
          publicKey,
          message,
          signature,
          recoveryId
        });
      } catch (error) {
        throw new Error("Error creating instruction; ".concat(error));
      }
    }

  }

  _defineProperty(Secp256k1Program, "programId", new PublicKey('KeccakSecp256k11111111111111111111111111111'));

  const VALIDATOR_INFO_KEY = new PublicKey('Va1idator1nfo111111111111111111111111111111');
  /**
   * @internal
   */

  const InfoString = type({
    name: string(),
    website: optional(string()),
    details: optional(string()),
    keybaseUsername: optional(string())
  });
  /**
   * ValidatorInfo class
   */

  class ValidatorInfo {
    /**
     * validator public key
     */

    /**
     * validator information
     */

    /**
     * Construct a valid ValidatorInfo
     *
     * @param key validator public key
     * @param info validator information
     */
    constructor(key, info) {
      _defineProperty(this, "key", void 0);

      _defineProperty(this, "info", void 0);

      this.key = key;
      this.info = info;
    }
    /**
     * Deserialize ValidatorInfo from the config account data. Exactly two config
     * keys are required in the data.
     *
     * @param buffer config account data
     * @return null if info was not found
     */


    static fromConfigData(buffer$1) {
      const PUBKEY_LENGTH = 32;
      let byteArray = [...buffer$1];
      const configKeyCount = decodeLength(byteArray);
      if (configKeyCount !== 2) return null;
      const configKeys = [];

      for (let i = 0; i < 2; i++) {
        const publicKey = new PublicKey(byteArray.slice(0, PUBKEY_LENGTH));
        byteArray = byteArray.slice(PUBKEY_LENGTH);
        const isSigner = byteArray.slice(0, 1)[0] === 1;
        byteArray = byteArray.slice(1);
        configKeys.push({
          publicKey,
          isSigner
        });
      }

      if (configKeys[0].publicKey.equals(VALIDATOR_INFO_KEY)) {
        if (configKeys[1].isSigner) {
          const rawInfo = rustString().decode(buffer.Buffer.from(byteArray));
          const info = JSON.parse(rawInfo);
          assert$b(info, InfoString);
          return new ValidatorInfo(configKeys[1].publicKey, info);
        }
      }

      return null;
    }

  }

  const VOTE_PROGRAM_ID = new PublicKey('Vote111111111111111111111111111111111111111');

  /**
   * See https://github.com/solana-labs/solana/blob/8a12ed029cfa38d4a45400916c2463fb82bbec8c/programs/vote_api/src/vote_state.rs#L68-L88
   *
   * @internal
   */
  const VoteAccountLayout = struct([publicKey('nodePubkey'), publicKey('authorizedVoterPubkey'), publicKey('authorizedWithdrawerPubkey'), u8('commission'), nu64(), // votes.length
  seq(struct([nu64('slot'), u32('confirmationCount')]), offset(u32(), -8), 'votes'), u8('rootSlotValid'), nu64('rootSlot'), nu64('epoch'), nu64('credits'), nu64('lastEpochCredits'), nu64(), // epochCredits.length
  seq(struct([nu64('epoch'), nu64('credits'), nu64('prevCredits')]), offset(u32(), -8), 'epochCredits')]);

  /**
   * VoteAccount class
   */
  class VoteAccount {
    /**
     * @internal
     */
    constructor(args) {
      _defineProperty(this, "nodePubkey", void 0);

      _defineProperty(this, "authorizedVoterPubkey", void 0);

      _defineProperty(this, "authorizedWithdrawerPubkey", void 0);

      _defineProperty(this, "commission", void 0);

      _defineProperty(this, "votes", void 0);

      _defineProperty(this, "rootSlot", void 0);

      _defineProperty(this, "epoch", void 0);

      _defineProperty(this, "credits", void 0);

      _defineProperty(this, "lastEpochCredits", void 0);

      _defineProperty(this, "epochCredits", void 0);

      this.nodePubkey = args.nodePubkey;
      this.authorizedVoterPubkey = args.authorizedVoterPubkey;
      this.authorizedWithdrawerPubkey = args.authorizedWithdrawerPubkey;
      this.commission = args.commission;
      this.votes = args.votes;
      this.rootSlot = args.rootSlot;
      this.epoch = args.epoch;
      this.credits = args.credits;
      this.lastEpochCredits = args.lastEpochCredits;
      this.epochCredits = args.epochCredits;
    }
    /**
     * Deserialize VoteAccount from the account data.
     *
     * @param buffer account data
     * @return VoteAccount
     */


    static fromAccountData(buffer) {
      const va = VoteAccountLayout.decode(toBuffer(buffer), 0);
      let rootSlot = va.rootSlot;

      if (!va.rootSlotValid) {
        rootSlot = null;
      }

      return new VoteAccount({
        nodePubkey: new PublicKey(va.nodePubkey),
        authorizedVoterPubkey: new PublicKey(va.authorizedVoterPubkey),
        authorizedWithdrawerPubkey: new PublicKey(va.authorizedWithdrawerPubkey),
        commission: va.commission,
        votes: va.votes,
        rootSlot,
        epoch: va.epoch,
        credits: va.credits,
        lastEpochCredits: va.lastEpochCredits,
        epochCredits: va.epochCredits
      });
    }

  }

  /**
   * Send and confirm a raw transaction
   *
   * If `commitment` option is not specified, defaults to 'max' commitment.
   *
   * @param {Connection} connection
   * @param {Buffer} rawTransaction
   * @param {ConfirmOptions} [options]
   * @returns {Promise<TransactionSignature>}
   */
  async function sendAndConfirmRawTransaction(connection, rawTransaction, options) {
    const sendOptions = options && {
      skipPreflight: options.skipPreflight,
      preflightCommitment: options.preflightCommitment || options.commitment
    };
    const signature = await connection.sendRawTransaction(rawTransaction, sendOptions);
    const status = (await connection.confirmTransaction(signature, options && options.commitment)).value;

    if (status.err) {
      throw new Error("Raw transaction ".concat(signature, " failed (").concat(JSON.stringify(status), ")"));
    }

    return signature;
  }

  const endpoint = {
    http: {
      devnet: 'http://devnet.solana.com',
      testnet: 'http://testnet.solana.com',
      'mainnet-beta': 'http://api.mainnet-beta.solana.com'
    },
    https: {
      devnet: 'https://devnet.solana.com',
      testnet: 'https://testnet.solana.com',
      'mainnet-beta': 'https://api.mainnet-beta.solana.com'
    }
  };

  /**
   * Retrieves the RPC API URL for the specified cluster
   */
  function clusterApiUrl(cluster, tls) {
    const key = tls === false ? 'http' : 'https';

    if (!cluster) {
      return endpoint[key]['devnet'];
    }

    const url = endpoint[key][cluster];

    if (!url) {
      throw new Error("Unknown ".concat(key, " cluster: ").concat(cluster));
    }

    return url;
  }

  /**
   * There are 1-billion lamports in one SOL
   */

  const LAMPORTS_PER_SOL = 1000000000;

  exports.Account = Account;
  exports.Authorized = Authorized;
  exports.BLOCKHASH_CACHE_TIMEOUT_MS = BLOCKHASH_CACHE_TIMEOUT_MS;
  exports.BPF_LOADER_DEPRECATED_PROGRAM_ID = BPF_LOADER_DEPRECATED_PROGRAM_ID;
  exports.BPF_LOADER_PROGRAM_ID = BPF_LOADER_PROGRAM_ID;
  exports.BpfLoader = BpfLoader;
  exports.Connection = Connection;
  exports.FeeCalculatorLayout = FeeCalculatorLayout;
  exports.LAMPORTS_PER_SOL = LAMPORTS_PER_SOL;
  exports.Loader = Loader;
  exports.Lockup = Lockup;
  exports.MAX_SEED_LENGTH = MAX_SEED_LENGTH;
  exports.Message = Message;
  exports.NONCE_ACCOUNT_LENGTH = NONCE_ACCOUNT_LENGTH;
  exports.NonceAccount = NonceAccount;
  exports.PACKET_DATA_SIZE = PACKET_DATA_SIZE;
  exports.PublicKey = PublicKey;
  exports.STAKE_CONFIG_ID = STAKE_CONFIG_ID;
  exports.STAKE_INSTRUCTION_LAYOUTS = STAKE_INSTRUCTION_LAYOUTS;
  exports.SYSTEM_INSTRUCTION_LAYOUTS = SYSTEM_INSTRUCTION_LAYOUTS;
  exports.SYSVAR_CLOCK_PUBKEY = SYSVAR_CLOCK_PUBKEY;
  exports.SYSVAR_INSTRUCTIONS_PUBKEY = SYSVAR_INSTRUCTIONS_PUBKEY;
  exports.SYSVAR_RECENT_BLOCKHASHES_PUBKEY = SYSVAR_RECENT_BLOCKHASHES_PUBKEY;
  exports.SYSVAR_RENT_PUBKEY = SYSVAR_RENT_PUBKEY;
  exports.SYSVAR_REWARDS_PUBKEY = SYSVAR_REWARDS_PUBKEY;
  exports.SYSVAR_STAKE_HISTORY_PUBKEY = SYSVAR_STAKE_HISTORY_PUBKEY;
  exports.Secp256k1Program = Secp256k1Program;
  exports.StakeAuthorizationLayout = StakeAuthorizationLayout;
  exports.StakeInstruction = StakeInstruction;
  exports.StakeProgram = StakeProgram;
  exports.SystemInstruction = SystemInstruction;
  exports.SystemProgram = SystemProgram;
  exports.Transaction = Transaction;
  exports.TransactionInstruction = TransactionInstruction;
  exports.VALIDATOR_INFO_KEY = VALIDATOR_INFO_KEY;
  exports.VOTE_PROGRAM_ID = VOTE_PROGRAM_ID;
  exports.ValidatorInfo = ValidatorInfo;
  exports.VoteAccount = VoteAccount;
  exports.clusterApiUrl = clusterApiUrl;
  exports.sendAndConfirmRawTransaction = sendAndConfirmRawTransaction;
  exports.sendAndConfirmTransaction = sendAndConfirmTransaction;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

}({}));
//# sourceMappingURL=index.iife.js.map
