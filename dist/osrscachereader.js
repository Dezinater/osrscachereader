(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["osrscachereader"] = factory();
	else
		root["osrscachereader"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 818:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
var __webpack_unused_export__;


__webpack_unused_export__ = ({
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined";

var isNode = typeof process !== "undefined" && process.versions != null && process.versions.node != null;

var isWebWorker = (typeof self === "undefined" ? "undefined" : _typeof(self)) === "object" && self.constructor && self.constructor.name === "DedicatedWorkerGlobalScope";

/**
 * @see https://github.com/jsdom/jsdom/releases/tag/12.0.0
 * @see https://github.com/jsdom/jsdom/issues/1537
 */
var isJsDom = typeof window !== "undefined" && window.name === "nodejs" || typeof navigator !== "undefined" && (navigator.userAgent.includes("Node.js") || navigator.userAgent.includes("jsdom"));

var isDeno = typeof Deno !== "undefined" && typeof Deno.version !== "undefined" && typeof Deno.version.deno !== "undefined";

exports.jU = isBrowser;
__webpack_unused_export__ = isWebWorker;
__webpack_unused_export__ = isNode;
__webpack_unused_export__ = isJsDom;
__webpack_unused_export__ = isDeno;

/***/ }),

/***/ 264:
/***/ ((module) => {

"use strict";
/*! bz2 (C) 2019-present SheetJS LLC */



(function bz2() {
// https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/util/compress/bzip2/crctable.c
  const crc32Table = [
    0x00000000, 0x04c11db7, 0x09823b6e, 0x0d4326d9, 0x130476dc, 0x17c56b6b, 0x1a864db2, 0x1e475005,
    0x2608edb8, 0x22c9f00f, 0x2f8ad6d6, 0x2b4bcb61, 0x350c9b64, 0x31cd86d3, 0x3c8ea00a, 0x384fbdbd,
    0x4c11db70, 0x48d0c6c7, 0x4593e01e, 0x4152fda9, 0x5f15adac, 0x5bd4b01b, 0x569796c2, 0x52568b75,
    0x6a1936c8, 0x6ed82b7f, 0x639b0da6, 0x675a1011, 0x791d4014, 0x7ddc5da3, 0x709f7b7a, 0x745e66cd,
    0x9823b6e0, 0x9ce2ab57, 0x91a18d8e, 0x95609039, 0x8b27c03c, 0x8fe6dd8b, 0x82a5fb52, 0x8664e6e5,
    0xbe2b5b58, 0xbaea46ef, 0xb7a96036, 0xb3687d81, 0xad2f2d84, 0xa9ee3033, 0xa4ad16ea, 0xa06c0b5d,
    0xd4326d90, 0xd0f37027, 0xddb056fe, 0xd9714b49, 0xc7361b4c, 0xc3f706fb, 0xceb42022, 0xca753d95,
    0xf23a8028, 0xf6fb9d9f, 0xfbb8bb46, 0xff79a6f1, 0xe13ef6f4, 0xe5ffeb43, 0xe8bccd9a, 0xec7dd02d,
    0x34867077, 0x30476dc0, 0x3d044b19, 0x39c556ae, 0x278206ab, 0x23431b1c, 0x2e003dc5, 0x2ac12072,
    0x128e9dcf, 0x164f8078, 0x1b0ca6a1, 0x1fcdbb16, 0x018aeb13, 0x054bf6a4, 0x0808d07d, 0x0cc9cdca,
    0x7897ab07, 0x7c56b6b0, 0x71159069, 0x75d48dde, 0x6b93dddb, 0x6f52c06c, 0x6211e6b5, 0x66d0fb02,
    0x5e9f46bf, 0x5a5e5b08, 0x571d7dd1, 0x53dc6066, 0x4d9b3063, 0x495a2dd4, 0x44190b0d, 0x40d816ba,
    0xaca5c697, 0xa864db20, 0xa527fdf9, 0xa1e6e04e, 0xbfa1b04b, 0xbb60adfc, 0xb6238b25, 0xb2e29692,
    0x8aad2b2f, 0x8e6c3698, 0x832f1041, 0x87ee0df6, 0x99a95df3, 0x9d684044, 0x902b669d, 0x94ea7b2a,
    0xe0b41de7, 0xe4750050, 0xe9362689, 0xedf73b3e, 0xf3b06b3b, 0xf771768c, 0xfa325055, 0xfef34de2,
    0xc6bcf05f, 0xc27dede8, 0xcf3ecb31, 0xcbffd686, 0xd5b88683, 0xd1799b34, 0xdc3abded, 0xd8fba05a,
    0x690ce0ee, 0x6dcdfd59, 0x608edb80, 0x644fc637, 0x7a089632, 0x7ec98b85, 0x738aad5c, 0x774bb0eb,
    0x4f040d56, 0x4bc510e1, 0x46863638, 0x42472b8f, 0x5c007b8a, 0x58c1663d, 0x558240e4, 0x51435d53,
    0x251d3b9e, 0x21dc2629, 0x2c9f00f0, 0x285e1d47, 0x36194d42, 0x32d850f5, 0x3f9b762c, 0x3b5a6b9b,
    0x0315d626, 0x07d4cb91, 0x0a97ed48, 0x0e56f0ff, 0x1011a0fa, 0x14d0bd4d, 0x19939b94, 0x1d528623,
    0xf12f560e, 0xf5ee4bb9, 0xf8ad6d60, 0xfc6c70d7, 0xe22b20d2, 0xe6ea3d65, 0xeba91bbc, 0xef68060b,
    0xd727bbb6, 0xd3e6a601, 0xdea580d8, 0xda649d6f, 0xc423cd6a, 0xc0e2d0dd, 0xcda1f604, 0xc960ebb3,
    0xbd3e8d7e, 0xb9ff90c9, 0xb4bcb610, 0xb07daba7, 0xae3afba2, 0xaafbe615, 0xa7b8c0cc, 0xa379dd7b,
    0x9b3660c6, 0x9ff77d71, 0x92b45ba8, 0x9675461f, 0x8832161a, 0x8cf30bad, 0x81b02d74, 0x857130c3,
    0x5d8a9099, 0x594b8d2e, 0x5408abf7, 0x50c9b640, 0x4e8ee645, 0x4a4ffbf2, 0x470cdd2b, 0x43cdc09c,
    0x7b827d21, 0x7f436096, 0x7200464f, 0x76c15bf8, 0x68860bfd, 0x6c47164a, 0x61043093, 0x65c52d24,
    0x119b4be9, 0x155a565e, 0x18197087, 0x1cd86d30, 0x029f3d35, 0x065e2082, 0x0b1d065b, 0x0fdc1bec,
    0x3793a651, 0x3352bbe6, 0x3e119d3f, 0x3ad08088, 0x2497d08d, 0x2056cd3a, 0x2d15ebe3, 0x29d4f654,
    0xc5a92679, 0xc1683bce, 0xcc2b1d17, 0xc8ea00a0, 0xd6ad50a5, 0xd26c4d12, 0xdf2f6bcb, 0xdbee767c,
    0xe3a1cbc1, 0xe760d676, 0xea23f0af, 0xeee2ed18, 0xf0a5bd1d, 0xf464a0aa, 0xf9278673, 0xfde69bc4,
    0x89b8fd09, 0x8d79e0be, 0x803ac667, 0x84fbdbd0, 0x9abc8bd5, 0x9e7d9662, 0x933eb0bb, 0x97ffad0c,
    0xafb010b1, 0xab710d06, 0xa6322bdf, 0xa2f33668, 0xbcb4666d, 0xb8757bda, 0xb5365d03, 0xb1f740b4,
  ];

  // generated from 1 << i, except for 32
  const masks = [
    0x00000000, 0x00000001, 0x00000003, 0x00000007,
    0x0000000f, 0x0000001f, 0x0000003f, 0x0000007f,
    0x000000ff, 0x000001ff, 0x000003ff, 0x000007ff,
    0x00000fff, 0x00001fff, 0x00003fff, 0x00007fff,
    0x0000ffff, 0x0001ffff, 0x0003ffff, 0x0007ffff,
    0x000fffff, 0x001fffff, 0x003fffff, 0x007fffff,
    0x00ffffff, 0x01ffffff, 0x03ffffff, 0x07ffffff,
    0x0fffffff, 0x1fffffff, 0x3fffffff, -0x80000000,
  ];

  function createOrderedHuffmanTable(lengths) {
    const z = [];
    for (let i = 0; i < lengths.length; i += 1) {
      z.push([i, lengths[i]]);
    }
    z.push([lengths.length, -1]);
    const table = [];
    let start = z[0][0];
    let bits = z[0][1];
    for (let i = 0; i < z.length; i += 1) {
      const finish = z[i][0];
      const endbits = z[i][1];
      if (bits) {
        for (let code = start; code < finish; code += 1) {
          table.push({ code, bits, symbol: undefined });
        }
      }
      start = finish;
      bits = endbits;
      if (endbits === -1) {
        break;
      }
    }
    table.sort((a, b) => ((a.bits - b.bits) || (a.code - b.code)));
    let tempBits = 0;
    let symbol = -1;
    const fastAccess = [];
    let current;
    for (let i = 0; i < table.length; i += 1) {
      const t = table[i];
      symbol += 1;
      if (t.bits !== tempBits) {
        symbol <<= t.bits - tempBits;
        tempBits = t.bits;
        current = fastAccess[tempBits] = {};
      }
      t.symbol = symbol;
      current[symbol] = t;
    }
    return {
      table,
      fastAccess,
    };
  }

  function bwtReverse(src, primary) {
    if (primary < 0 || primary >= src.length) {
      throw RangeError('Out of bound');
    }
    const unsorted = src.slice();
    src.sort((a, b) => a - b);
    const start = {};
    for (let i = src.length - 1; i >= 0; i -= 1) {
      start[src[i]] = i;
    }
    const links = [];
    for (let i = 0; i < src.length; i += 1) {
      links.push(start[unsorted[i]]++); // eslint-disable-line no-plusplus
    }
    let i;
    const first = src[i = primary];
    const ret = [];
    for (let j = 1; j < src.length; j += 1) {
      const x = src[i = links[i]];
      if (x === undefined) {
        ret.push(255);
      } else {
        ret.push(x);
      }
    }
    ret.push(first);
    ret.reverse();
    return ret;
  }

  function decompress(bytes, checkCRC = false) {
    let index = 0;
    let bitfield = 0;
    let bits = 0;
    const read = (n) => {
      if (n >= 32) {
        const nd = n >> 1;
        return read(nd) * (1 << nd) + read(n - nd);
      }
      while (bits < n) {
        bitfield = (bitfield << 8) + bytes[index];
        index += 1;
        bits += 8;
      }
      const m = masks[n];
      const r = (bitfield >> (bits - n)) & m;
      bits -= n;
      bitfield &= ~(m << bits);
      return r;
    };

    const magic = read(16);
    if (magic !== 0x425A) { // 'BZ'
      throw new Error('Invalid magic');
    }
    const method = read(8);
    if (method !== 0x68) { // h for huffman
      throw new Error('Invalid method');
    }

    let blocksize = read(8);
    if (blocksize >= 49 && blocksize <= 57) { // 1..9
      blocksize -= 48;
    } else {
      throw new Error('Invalid blocksize');
    }

    let out = new Uint8Array(bytes.length * 1.5);
    let outIndex = 0;
    let newCRC = -1;
    while (true) {
      const blocktype = read(48);
      const crc = read(32) | 0;
      if (blocktype === 0x314159265359) {
        if (read(1)) {
          throw new Error('do not support randomised');
        }
        const pointer = read(24);
        const used = [];
        const usedGroups = read(16);
        for (let i = 1 << 15; i > 0; i >>= 1) {
          if (!(usedGroups & i)) {
            for (let j = 0; j < 16; j += 1) {
              used.push(false);
            }
            continue; // eslint-disable-line no-continue
          }
          const usedChars = read(16);
          for (let j = 1 << 15; j > 0; j >>= 1) {
            used.push(!!(usedChars & j));
          }
        }
        const groups = read(3);
        if (groups < 2 || groups > 6) {
          throw new Error('Invalid number of huffman groups');
        }
        const selectorsUsed = read(15);
        const selectors = [];
        const mtf = Array.from({ length: groups }, (_, i) => i);
        for (let i = 0; i < selectorsUsed; i += 1) {
          let c = 0;
          while (read(1)) {
            c += 1;
            if (c >= groups) {
              throw new Error('MTF table out of range');
            }
          }
          const v = mtf[c];
          for (let j = c; j > 0; mtf[j] = mtf[--j]) { // eslint-disable-line no-plusplus
          // nothing
          }
          selectors.push(v);
          mtf[0] = v;
        }
        const symbolsInUse = used.reduce((a, b) => a + b, 0) + 2;
        const tables = [];
        for (let i = 0; i < groups; i += 1) {
          let length = read(5);
          const lengths = [];
          for (let j = 0; j < symbolsInUse; j += 1) {
            if (length < 0 || length > 20) {
              throw new Error('Huffman group length outside range');
            }
            while (read(1)) {
              length -= (read(1) * 2) - 1;
            }
            lengths.push(length);
          }
          tables.push(createOrderedHuffmanTable(lengths));
        }
        const favourites = [];
        for (let i = 0; i < used.length - 1; i += 1) {
          if (used[i]) {
            favourites.push(i);
          }
        }
        let decoded = 0;
        let selectorPointer = 0;
        let t;
        let r;
        let repeat = 0;
        let repeatPower = 0;
        const buffer = [];
        while (true) {
          decoded -= 1;
          if (decoded <= 0) {
            decoded = 50;
            if (selectorPointer <= selectors.length) {
              t = tables[selectors[selectorPointer]];
              selectorPointer += 1;
            }
          }
          for (const b in t.fastAccess) {
            if (!Object.prototype.hasOwnProperty.call(t.fastAccess, b)) {
              continue; // eslint-disable-line no-continue
            }
            if (bits < b) {
              bitfield = (bitfield << 8) + bytes[index];
              index += 1;
              bits += 8;
            }
            r = t.fastAccess[b][bitfield >> (bits - b)];
            if (r) {
              bitfield &= masks[bits -= b];
              r = r.code;
              break;
            }
          }
          if (r >= 0 && r <= 1) {
            if (repeat === 0) {
              repeatPower = 1;
            }
            repeat += repeatPower << r;
            repeatPower <<= 1;
            continue; // eslint-disable-line no-continue
          } else {
            const v = favourites[0];
            for (; repeat > 0; repeat -= 1) {
              buffer.push(v);
            }
          }
          if (r === symbolsInUse - 1) {
            break;
          } else {
            const v = favourites[r - 1];
            // eslint-disable-next-line no-plusplus
            for (let j = r - 1; j > 0; favourites[j] = favourites[--j]) {
            // nothing
            }
            favourites[0] = v;
            buffer.push(v);
          }
        }
        const nt = bwtReverse(buffer, pointer);
        let i = 0;
        while (i < nt.length) {
          const c = nt[i];
          let count = 1;
          if ((i < nt.length - 4)
            && nt[i + 1] === c
            && nt[i + 2] === c
            && nt[i + 3] === c) {
            count = nt[i + 4] + 4;
            i += 5;
          } else {
            i += 1;
          }
          if (outIndex + count >= out.length) {
            const old = out;
            out = new Uint8Array(old.length * 2);
            out.set(old);
          }
          for (let j = 0; j < count; j += 1) {
            if (checkCRC) {
              newCRC = (newCRC << 8) ^ crc32Table[((newCRC >> 24) ^ c) & 0xff];
            }
            out[outIndex] = c;
            outIndex += 1;
          }
        }
        if (checkCRC) {
          const calculatedCRC = newCRC ^ -1;
          if (calculatedCRC !== crc) {
            throw new Error(`CRC mismatch: ${calculatedCRC} !== ${crc}`);
          }
          newCRC = -1;
        }
      } else if (blocktype === 0x177245385090) {
        read(bits & 0x07); // pad align
        break;
      } else {
        throw new Error('Invalid bz2 blocktype');
      }
    }
    return out.subarray(0, outIndex);
  }

  const exports = { decompress };

  if (typeof window !== 'undefined') {
    window.bz2 = exports; // eslint-disable-line no-undef
  } else {
    module.exports = exports;
  }
}());


/***/ }),

/***/ 292:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var __webpack_unused_export__;
/* globals document, ImageData */

const parseFont = __webpack_require__(850)

__webpack_unused_export__ = parseFont

exports.vL = function (width, height) {
  return Object.assign(document.createElement('canvas'), { width: width, height: height })
}

__webpack_unused_export__ = function (array, width, height) {
  // Browser implementation of ImageData looks at the number of arguments passed
  switch (arguments.length) {
    case 0: return new ImageData()
    case 1: return new ImageData(array)
    case 2: return new ImageData(array, width)
    default: return new ImageData(array, width, height)
  }
}

__webpack_unused_export__ = function (src, options) {
  return new Promise(function (resolve, reject) {
    const image = Object.assign(document.createElement('img'), options)

    function cleanup () {
      image.onload = null
      image.onerror = null
    }

    image.onload = function () { cleanup(); resolve(image) }
    image.onerror = function () { cleanup(); reject(new Error('Failed to load the image "' + src + '"')) }

    image.src = src
  })
}


/***/ }),

/***/ 850:
/***/ ((module) => {

"use strict";


/**
 * Font RegExp helpers.
 */

const weights = 'bold|bolder|lighter|[1-9]00'
const styles = 'italic|oblique'
const variants = 'small-caps'
const stretches = 'ultra-condensed|extra-condensed|condensed|semi-condensed|semi-expanded|expanded|extra-expanded|ultra-expanded'
const units = 'px|pt|pc|in|cm|mm|%|em|ex|ch|rem|q'
const string = '\'([^\']+)\'|"([^"]+)"|[\\w\\s-]+'

// [ [ <‘font-style’> || <font-variant-css21> || <‘font-weight’> || <‘font-stretch’> ]?
//    <‘font-size’> [ / <‘line-height’> ]? <‘font-family’> ]
// https://drafts.csswg.org/css-fonts-3/#font-prop
const weightRe = new RegExp(`(${weights}) +`, 'i')
const styleRe = new RegExp(`(${styles}) +`, 'i')
const variantRe = new RegExp(`(${variants}) +`, 'i')
const stretchRe = new RegExp(`(${stretches}) +`, 'i')
const sizeFamilyRe = new RegExp(
  `([\\d\\.]+)(${units}) *((?:${string})( *, *(?:${string}))*)`)

/**
 * Cache font parsing.
 */

const cache = {}

const defaultHeight = 16 // pt, common browser default

/**
 * Parse font `str`.
 *
 * @param {String} str
 * @return {Object} Parsed font. `size` is in device units. `unit` is the unit
 *   appearing in the input string.
 * @api private
 */

module.exports = str => {
  // Cached
  if (cache[str]) return cache[str]

  // Try for required properties first.
  const sizeFamily = sizeFamilyRe.exec(str)
  if (!sizeFamily) return // invalid

  // Default values and required properties
  const font = {
    weight: 'normal',
    style: 'normal',
    stretch: 'normal',
    variant: 'normal',
    size: parseFloat(sizeFamily[1]),
    unit: sizeFamily[2],
    family: sizeFamily[3].replace(/["']/g, '').replace(/ *, */g, ',')
  }

  // Optional, unordered properties.
  let weight, style, variant, stretch
  // Stop search at `sizeFamily.index`
  const substr = str.substring(0, sizeFamily.index)
  if ((weight = weightRe.exec(substr))) font.weight = weight[1]
  if ((style = styleRe.exec(substr))) font.style = style[1]
  if ((variant = variantRe.exec(substr))) font.variant = variant[1]
  if ((stretch = stretchRe.exec(substr))) font.stretch = stretch[1]

  // Convert to device units. (`font.unit` is the original unit)
  // TODO: ch, ex
  switch (font.unit) {
    case 'pt':
      font.size /= 0.75
      break
    case 'pc':
      font.size *= 16
      break
    case 'in':
      font.size *= 96
      break
    case 'cm':
      font.size *= 96.0 / 2.54
      break
    case 'mm':
      font.size *= 96.0 / 25.4
      break
    case '%':
      // TODO disabled because existing unit tests assume 100
      // font.size *= defaultHeight / 100 / 0.75
      break
    case 'em':
    case 'rem':
      font.size *= defaultHeight / 0.75
      break
    case 'q':
      font.size *= 96 / 25.4 / 4
      break
  }

  return (cache[str] = font)
}


/***/ }),

/***/ 793:
/***/ ((module) => {

(function () {
	'use strict';

	var table = [],
		poly = 0xEDB88320; // reverse polynomial

	// build the table
	function makeTable() {
		var c, n, k;

		for (n = 0; n < 256; n += 1) {
			c = n;
			for (k = 0; k < 8; k += 1) {
				if (c & 1) {
					c = poly ^ (c >>> 1);
				} else {
					c = c >>> 1;
				}
			}
			table[n] = c >>> 0;
		}
	}

	function strToArr(str) {
		// sweet hack to turn string into a 'byte' array
		return Array.prototype.map.call(str, function (c) {
			return c.charCodeAt(0);
		});
	}

	/*
	 * Compute CRC of array directly.
	 *
	 * This is slower for repeated calls, so append mode is not supported.
	 */
	function crcDirect(arr) {
		var crc = -1, // initial contents of LFBSR
			i, j, l, temp;

		for (i = 0, l = arr.length; i < l; i += 1) {
			temp = (crc ^ arr[i]) & 0xff;

			// read 8 bits one at a time
			for (j = 0; j < 8; j += 1) {
				if ((temp & 1) === 1) {
					temp = (temp >>> 1) ^ poly;
				} else {
					temp = (temp >>> 1);
				}
			}
			crc = (crc >>> 8) ^ temp;
		}

		// flip bits
		return crc ^ -1;
	}

	/*
	 * Compute CRC with the help of a pre-calculated table.
	 *
	 * This supports append mode, if the second parameter is set.
	 */
	function crcTable(arr, append) {
		var crc, i, l;

		// if we're in append mode, don't reset crc
		// if arr is null or undefined, reset table and return
		if (typeof crcTable.crc === 'undefined' || !append || !arr) {
			crcTable.crc = 0 ^ -1;

			if (!arr) {
				return;
			}
		}

		// store in temp variable for minor speed gain
		crc = crcTable.crc;

		for (i = 0, l = arr.length; i < l; i += 1) {
			crc = (crc >>> 8) ^ table[(crc ^ arr[i]) & 0xff];
		}

		crcTable.crc = crc;

		return crc ^ -1;
	}

	// build the table
	// this isn't that costly, and most uses will be for table assisted mode
	makeTable();

	module.exports = function (val, direct) {
		var val = (typeof val === 'string') ? strToArr(val) : val,
			ret = direct ? crcDirect(val) : crcTable(val);

		// convert to 2's complement hex
		return (ret >>> 0).toString(16);
	};
	module.exports.direct = crcDirect;
	module.exports.table = crcTable;
}());


/***/ }),

/***/ 762:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

(function () {
	'use strict';

	module.exports = {
		'inflate': __webpack_require__(689),
		'deflate': __webpack_require__(881)
	};
}());


/***/ }),

/***/ 881:
/***/ ((module) => {

/*
 * $Id: rawdeflate.js,v 0.3 2009/03/01 19:05:05 dankogai Exp dankogai $
 *
 * Original:
 *   http://www.onicos.com/staff/iz/amuse/javascript/expert/deflate.txt
 */

/* Copyright (C) 1999 Masanao Izumo <iz@onicos.co.jp>
 * Version: 1.0.1
 * LastModified: Dec 25 1999
 */

/* Interface:
 * data = deflate(src);
 */

(function () {
	/* constant parameters */
	var WSIZE = 32768, // Sliding Window size
		STORED_BLOCK = 0,
		STATIC_TREES = 1,
		DYN_TREES = 2,

	/* for deflate */
		DEFAULT_LEVEL = 6,
		FULL_SEARCH = false,
		INBUFSIZ = 32768, // Input buffer size
		//INBUF_EXTRA = 64, // Extra buffer
		OUTBUFSIZ = 1024 * 8,
		window_size = 2 * WSIZE,
		MIN_MATCH = 3,
		MAX_MATCH = 258,
		BITS = 16,
	// for SMALL_MEM
		LIT_BUFSIZE = 0x2000,
//		HASH_BITS = 13,
	//for MEDIUM_MEM
	//	LIT_BUFSIZE = 0x4000,
	//	HASH_BITS = 14,
	// for BIG_MEM
	//	LIT_BUFSIZE = 0x8000,
		HASH_BITS = 15,
		DIST_BUFSIZE = LIT_BUFSIZE,
		HASH_SIZE = 1 << HASH_BITS,
		HASH_MASK = HASH_SIZE - 1,
		WMASK = WSIZE - 1,
		NIL = 0, // Tail of hash chains
		TOO_FAR = 4096,
		MIN_LOOKAHEAD = MAX_MATCH + MIN_MATCH + 1,
		MAX_DIST = WSIZE - MIN_LOOKAHEAD,
		SMALLEST = 1,
		MAX_BITS = 15,
		MAX_BL_BITS = 7,
		LENGTH_CODES = 29,
		LITERALS = 256,
		END_BLOCK = 256,
		L_CODES = LITERALS + 1 + LENGTH_CODES,
		D_CODES = 30,
		BL_CODES = 19,
		REP_3_6 = 16,
		REPZ_3_10 = 17,
		REPZ_11_138 = 18,
		HEAP_SIZE = 2 * L_CODES + 1,
		H_SHIFT = parseInt((HASH_BITS + MIN_MATCH - 1) / MIN_MATCH, 10),

	/* variables */
		free_queue,
		qhead,
		qtail,
		initflag,
		outbuf = null,
		outcnt,
		outoff,
		complete,
		window,
		d_buf,
		l_buf,
		prev,
		bi_buf,
		bi_valid,
		block_start,
		ins_h,
		hash_head,
		prev_match,
		match_available,
		match_length,
		prev_length,
		strstart,
		match_start,
		eofile,
		lookahead,
		max_chain_length,
		max_lazy_match,
		compr_level,
		good_match,
		nice_match,
		dyn_ltree,
		dyn_dtree,
		static_ltree,
		static_dtree,
		bl_tree,
		l_desc,
		d_desc,
		bl_desc,
		bl_count,
		heap,
		heap_len,
		heap_max,
		depth,
		length_code,
		dist_code,
		base_length,
		base_dist,
		flag_buf,
		last_lit,
		last_dist,
		last_flags,
		flags,
		flag_bit,
		opt_len,
		static_len,
		deflate_data,
		deflate_pos;

	if (LIT_BUFSIZE > INBUFSIZ) {
		console.error("error: INBUFSIZ is too small");
	}
	if ((WSIZE << 1) > (1 << BITS)) {
		console.error("error: WSIZE is too large");
	}
	if (HASH_BITS > BITS - 1) {
		console.error("error: HASH_BITS is too large");
	}
	if (HASH_BITS < 8 || MAX_MATCH !== 258) {
		console.error("error: Code too clever");
	}

	/* objects (deflate) */

	function DeflateCT() {
		this.fc = 0; // frequency count or bit string
		this.dl = 0; // father node in Huffman tree or length of bit string
	}

	function DeflateTreeDesc() {
		this.dyn_tree = null; // the dynamic tree
		this.static_tree = null; // corresponding static tree or NULL
		this.extra_bits = null; // extra bits for each code or NULL
		this.extra_base = 0; // base index for extra_bits
		this.elems = 0; // max number of elements in the tree
		this.max_length = 0; // max bit length for the codes
		this.max_code = 0; // largest code with non zero frequency
	}

	/* Values for max_lazy_match, good_match and max_chain_length, depending on
	 * the desired pack level (0..9). The values given below have been tuned to
	 * exclude worst case performance for pathological files. Better values may be
	 * found for specific files.
	 */
	function DeflateConfiguration(a, b, c, d) {
		this.good_length = a; // reduce lazy search above this match length
		this.max_lazy = b; // do not perform lazy search above this match length
		this.nice_length = c; // quit search above this match length
		this.max_chain = d;
	}

	function DeflateBuffer() {
		this.next = null;
		this.len = 0;
		this.ptr = []; // new Array(OUTBUFSIZ); // ptr.length is never read
		this.off = 0;
	}

	/* constant tables */
	var extra_lbits = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0];
	var extra_dbits = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13];
	var extra_blbits = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7];
	var bl_order = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
	var configuration_table = [
		new DeflateConfiguration(0, 0, 0, 0),
		new DeflateConfiguration(4, 4, 8, 4),
		new DeflateConfiguration(4, 5, 16, 8),
		new DeflateConfiguration(4, 6, 32, 32),
		new DeflateConfiguration(4, 4, 16, 16),
		new DeflateConfiguration(8, 16, 32, 32),
		new DeflateConfiguration(8, 16, 128, 128),
		new DeflateConfiguration(8, 32, 128, 256),
		new DeflateConfiguration(32, 128, 258, 1024),
		new DeflateConfiguration(32, 258, 258, 4096)
	];


	/* routines (deflate) */

	function deflate_start(level) {
		var i;

		if (!level) {
			level = DEFAULT_LEVEL;
		} else if (level < 1) {
			level = 1;
		} else if (level > 9) {
			level = 9;
		}

		compr_level = level;
		initflag = false;
		eofile = false;
		if (outbuf !== null) {
			return;
		}

		free_queue = qhead = qtail = null;
		outbuf = []; // new Array(OUTBUFSIZ); // outbuf.length never called
		window = []; // new Array(window_size); // window.length never called
		d_buf = []; // new Array(DIST_BUFSIZE); // d_buf.length never called
		l_buf = []; // new Array(INBUFSIZ + INBUF_EXTRA); // l_buf.length never called
		prev = []; // new Array(1 << BITS); // prev.length never called

		dyn_ltree = [];
		for (i = 0; i < HEAP_SIZE; i++) {
			dyn_ltree[i] = new DeflateCT();
		}
		dyn_dtree = [];
		for (i = 0; i < 2 * D_CODES + 1; i++) {
			dyn_dtree[i] = new DeflateCT();
		}
		static_ltree = [];
		for (i = 0; i < L_CODES + 2; i++) {
			static_ltree[i] = new DeflateCT();
		}
		static_dtree = [];
		for (i = 0; i < D_CODES; i++) {
			static_dtree[i] = new DeflateCT();
		}
		bl_tree = [];
		for (i = 0; i < 2 * BL_CODES + 1; i++) {
			bl_tree[i] = new DeflateCT();
		}
		l_desc = new DeflateTreeDesc();
		d_desc = new DeflateTreeDesc();
		bl_desc = new DeflateTreeDesc();
		bl_count = []; // new Array(MAX_BITS+1); // bl_count.length never called
		heap = []; // new Array(2*L_CODES+1); // heap.length never called
		depth = []; // new Array(2*L_CODES+1); // depth.length never called
		length_code = []; // new Array(MAX_MATCH-MIN_MATCH+1); // length_code.length never called
		dist_code = []; // new Array(512); // dist_code.length never called
		base_length = []; // new Array(LENGTH_CODES); // base_length.length never called
		base_dist = []; // new Array(D_CODES); // base_dist.length never called
		flag_buf = []; // new Array(parseInt(LIT_BUFSIZE / 8, 10)); // flag_buf.length never called
	}

	function deflate_end() {
		free_queue = qhead = qtail = null;
		outbuf = null;
		window = null;
		d_buf = null;
		l_buf = null;
		prev = null;
		dyn_ltree = null;
		dyn_dtree = null;
		static_ltree = null;
		static_dtree = null;
		bl_tree = null;
		l_desc = null;
		d_desc = null;
		bl_desc = null;
		bl_count = null;
		heap = null;
		depth = null;
		length_code = null;
		dist_code = null;
		base_length = null;
		base_dist = null;
		flag_buf = null;
	}

	function reuse_queue(p) {
		p.next = free_queue;
		free_queue = p;
	}

	function new_queue() {
		var p;

		if (free_queue !== null) {
			p = free_queue;
			free_queue = free_queue.next;
		} else {
			p = new DeflateBuffer();
		}
		p.next = null;
		p.len = p.off = 0;

		return p;
	}

	function head1(i) {
		return prev[WSIZE + i];
	}

	function head2(i, val) {
		return (prev[WSIZE + i] = val);
	}

	/* put_byte is used for the compressed output, put_ubyte for the
	 * uncompressed output. However unlzw() uses window for its
	 * suffix table instead of its output buffer, so it does not use put_ubyte
	 * (to be cleaned up).
	 */
	function put_byte(c) {
		outbuf[outoff + outcnt++] = c;
		if (outoff + outcnt === OUTBUFSIZ) {
			qoutbuf();
		}
	}

	/* Output a 16 bit value, lsb first */
	function put_short(w) {
		w &= 0xffff;
		if (outoff + outcnt < OUTBUFSIZ - 2) {
			outbuf[outoff + outcnt++] = (w & 0xff);
			outbuf[outoff + outcnt++] = (w >>> 8);
		} else {
			put_byte(w & 0xff);
			put_byte(w >>> 8);
		}
	}

	/* ==========================================================================
	 * Insert string s in the dictionary and set match_head to the previous head
	 * of the hash chain (the most recent string with same hash key). Return
	 * the previous length of the hash chain.
	 * IN  assertion: all calls to to INSERT_STRING are made with consecutive
	 *    input characters and the first MIN_MATCH bytes of s are valid
	 *    (except for the last MIN_MATCH-1 bytes of the input file).
	 */
	function INSERT_STRING() {
		ins_h = ((ins_h << H_SHIFT) ^ (window[strstart + MIN_MATCH - 1] & 0xff)) & HASH_MASK;
		hash_head = head1(ins_h);
		prev[strstart & WMASK] = hash_head;
		head2(ins_h, strstart);
	}

	/* Send a code of the given tree. c and tree must not have side effects */
	function SEND_CODE(c, tree) {
		send_bits(tree[c].fc, tree[c].dl);
	}

	/* Mapping from a distance to a distance code. dist is the distance - 1 and
	 * must not have side effects. dist_code[256] and dist_code[257] are never
	 * used.
	 */
	function D_CODE(dist) {
		return (dist < 256 ? dist_code[dist] : dist_code[256 + (dist >> 7)]) & 0xff;
	}

	/* ==========================================================================
	 * Compares to subtrees, using the tree depth as tie breaker when
	 * the subtrees have equal frequency. This minimizes the worst case length.
	 */
	function SMALLER(tree, n, m) {
		return tree[n].fc < tree[m].fc || (tree[n].fc === tree[m].fc && depth[n] <= depth[m]);
	}

	/* ==========================================================================
	 * read string data
	 */
	function read_buff(buff, offset, n) {
		var i;
		for (i = 0; i < n && deflate_pos < deflate_data.length; i++) {
			buff[offset + i] = deflate_data[deflate_pos++] & 0xff;
		}
		return i;
	}

	/* ==========================================================================
	 * Initialize the "longest match" routines for a new file
	 */
	function lm_init() {
		var j;

		// Initialize the hash table. */
		for (j = 0; j < HASH_SIZE; j++) {
			// head2(j, NIL);
			prev[WSIZE + j] = 0;
		}
		// prev will be initialized on the fly */

		// Set the default configuration parameters:
		max_lazy_match = configuration_table[compr_level].max_lazy;
		good_match = configuration_table[compr_level].good_length;
		if (!FULL_SEARCH) {
			nice_match = configuration_table[compr_level].nice_length;
		}
		max_chain_length = configuration_table[compr_level].max_chain;

		strstart = 0;
		block_start = 0;

		lookahead = read_buff(window, 0, 2 * WSIZE);
		if (lookahead <= 0) {
			eofile = true;
			lookahead = 0;
			return;
		}
		eofile = false;
		// Make sure that we always have enough lookahead. This is important
		// if input comes from a device such as a tty.
		while (lookahead < MIN_LOOKAHEAD && !eofile) {
			fill_window();
		}

		// If lookahead < MIN_MATCH, ins_h is garbage, but this is
		// not important since only literal bytes will be emitted.
		ins_h = 0;
		for (j = 0; j < MIN_MATCH - 1; j++) {
			// UPDATE_HASH(ins_h, window[j]);
			ins_h = ((ins_h << H_SHIFT) ^ (window[j] & 0xff)) & HASH_MASK;
		}
	}

	/* ==========================================================================
	 * Set match_start to the longest match starting at the given string and
	 * return its length. Matches shorter or equal to prev_length are discarded,
	 * in which case the result is equal to prev_length and match_start is
	 * garbage.
	 * IN assertions: cur_match is the head of the hash chain for the current
	 *   string (strstart) and its distance is <= MAX_DIST, and prev_length >= 1
	 */
	function longest_match(cur_match) {
		var chain_length = max_chain_length; // max hash chain length
		var scanp = strstart; // current string
		var matchp; // matched string
		var len; // length of current match
		var best_len = prev_length; // best match length so far

		// Stop when cur_match becomes <= limit. To simplify the code,
		// we prevent matches with the string of window index 0.
		var limit = (strstart > MAX_DIST ? strstart - MAX_DIST : NIL);

		var strendp = strstart + MAX_MATCH;
		var scan_end1 = window[scanp + best_len - 1];
		var scan_end = window[scanp + best_len];

		var i, broke;

		// Do not waste too much time if we already have a good match: */
		if (prev_length >= good_match) {
			chain_length >>= 2;
		}

		// Assert(encoder->strstart <= window_size-MIN_LOOKAHEAD, "insufficient lookahead");

		do {
			// Assert(cur_match < encoder->strstart, "no future");
			matchp = cur_match;

			// Skip to next match if the match length cannot increase
			// or if the match length is less than 2:
			if (window[matchp + best_len] !== scan_end  ||
					window[matchp + best_len - 1] !== scan_end1 ||
					window[matchp] !== window[scanp] ||
					window[++matchp] !== window[scanp + 1]) {
				continue;
			}

			// The check at best_len-1 can be removed because it will be made
			// again later. (This heuristic is not always a win.)
			// It is not necessary to compare scan[2] and match[2] since they
			// are always equal when the other bytes match, given that
			// the hash keys are equal and that HASH_BITS >= 8.
			scanp += 2;
			matchp++;

			// We check for insufficient lookahead only every 8th comparison;
			// the 256th check will be made at strstart+258.
			while (scanp < strendp) {
				broke = false;
				for (i = 0; i < 8; i += 1) {
					scanp += 1;
					matchp += 1;
					if (window[scanp] !== window[matchp]) {
						broke = true;
						break;
					}
				}

				if (broke) {
					break;
				}
			}

			len = MAX_MATCH - (strendp - scanp);
			scanp = strendp - MAX_MATCH;

			if (len > best_len) {
				match_start = cur_match;
				best_len = len;
				if (FULL_SEARCH) {
					if (len >= MAX_MATCH) {
						break;
					}
				} else {
					if (len >= nice_match) {
						break;
					}
				}

				scan_end1 = window[scanp + best_len - 1];
				scan_end = window[scanp + best_len];
			}
		} while ((cur_match = prev[cur_match & WMASK]) > limit && --chain_length !== 0);

		return best_len;
	}

	/* ==========================================================================
	 * Fill the window when the lookahead becomes insufficient.
	 * Updates strstart and lookahead, and sets eofile if end of input file.
	 * IN assertion: lookahead < MIN_LOOKAHEAD && strstart + lookahead > 0
	 * OUT assertions: at least one byte has been read, or eofile is set;
	 *    file reads are performed for at least two bytes (required for the
	 *    translate_eol option).
	 */
	function fill_window() {
		var n, m;

	 // Amount of free space at the end of the window.
		var more = window_size - lookahead - strstart;

		// If the window is almost full and there is insufficient lookahead,
		// move the upper half to the lower one to make room in the upper half.
		if (more === -1) {
			// Very unlikely, but possible on 16 bit machine if strstart == 0
			// and lookahead == 1 (input done one byte at time)
			more--;
		} else if (strstart >= WSIZE + MAX_DIST) {
			// By the IN assertion, the window is not empty so we can't confuse
			// more == 0 with more == 64K on a 16 bit machine.
			// Assert(window_size == (ulg)2*WSIZE, "no sliding with BIG_MEM");

			// System.arraycopy(window, WSIZE, window, 0, WSIZE);
			for (n = 0; n < WSIZE; n++) {
				window[n] = window[n + WSIZE];
			}

			match_start -= WSIZE;
			strstart    -= WSIZE; /* we now have strstart >= MAX_DIST: */
			block_start -= WSIZE;

			for (n = 0; n < HASH_SIZE; n++) {
				m = head1(n);
				head2(n, m >= WSIZE ? m - WSIZE : NIL);
			}
			for (n = 0; n < WSIZE; n++) {
			// If n is not on any hash chain, prev[n] is garbage but
			// its value will never be used.
				m = prev[n];
				prev[n] = (m >= WSIZE ? m - WSIZE : NIL);
			}
			more += WSIZE;
		}
		// At this point, more >= 2
		if (!eofile) {
			n = read_buff(window, strstart + lookahead, more);
			if (n <= 0) {
				eofile = true;
			} else {
				lookahead += n;
			}
		}
	}

	/* ==========================================================================
	 * Processes a new input file and return its compressed length. This
	 * function does not perform lazy evaluationof matches and inserts
	 * new strings in the dictionary only for unmatched strings or for short
	 * matches. It is used only for the fast compression options.
	 */
	function deflate_fast() {
		while (lookahead !== 0 && qhead === null) {
			var flush; // set if current block must be flushed

			// Insert the string window[strstart .. strstart+2] in the
			// dictionary, and set hash_head to the head of the hash chain:
			INSERT_STRING();

			// Find the longest match, discarding those <= prev_length.
			// At this point we have always match_length < MIN_MATCH
			if (hash_head !== NIL && strstart - hash_head <= MAX_DIST) {
				// To simplify the code, we prevent matches with the string
				// of window index 0 (in particular we have to avoid a match
				// of the string with itself at the start of the input file).
				match_length = longest_match(hash_head);
				// longest_match() sets match_start */
				if (match_length > lookahead) {
					match_length = lookahead;
				}
			}
			if (match_length >= MIN_MATCH) {
				// check_match(strstart, match_start, match_length);

				flush = ct_tally(strstart - match_start, match_length - MIN_MATCH);
				lookahead -= match_length;

				// Insert new strings in the hash table only if the match length
				// is not too large. This saves time but degrades compression.
				if (match_length <= max_lazy_match) {
					match_length--; // string at strstart already in hash table
					do {
						strstart++;
						INSERT_STRING();
						// strstart never exceeds WSIZE-MAX_MATCH, so there are
						// always MIN_MATCH bytes ahead. If lookahead < MIN_MATCH
						// these bytes are garbage, but it does not matter since
						// the next lookahead bytes will be emitted as literals.
					} while (--match_length !== 0);
					strstart++;
				} else {
					strstart += match_length;
					match_length = 0;
					ins_h = window[strstart] & 0xff;
					// UPDATE_HASH(ins_h, window[strstart + 1]);
					ins_h = ((ins_h << H_SHIFT) ^ (window[strstart + 1] & 0xff)) & HASH_MASK;

				//#if MIN_MATCH !== 3
				//		Call UPDATE_HASH() MIN_MATCH-3 more times
				//#endif

				}
			} else {
				// No match, output a literal byte */
				flush = ct_tally(0, window[strstart] & 0xff);
				lookahead--;
				strstart++;
			}
			if (flush) {
				flush_block(0);
				block_start = strstart;
			}

			// Make sure that we always have enough lookahead, except
			// at the end of the input file. We need MAX_MATCH bytes
			// for the next match, plus MIN_MATCH bytes to insert the
			// string following the next match.
			while (lookahead < MIN_LOOKAHEAD && !eofile) {
				fill_window();
			}
		}
	}

	function deflate_better() {
		// Process the input block. */
		while (lookahead !== 0 && qhead === null) {
			// Insert the string window[strstart .. strstart+2] in the
			// dictionary, and set hash_head to the head of the hash chain:
			INSERT_STRING();

			// Find the longest match, discarding those <= prev_length.
			prev_length = match_length;
			prev_match = match_start;
			match_length = MIN_MATCH - 1;

			if (hash_head !== NIL && prev_length < max_lazy_match && strstart - hash_head <= MAX_DIST) {
				// To simplify the code, we prevent matches with the string
				// of window index 0 (in particular we have to avoid a match
				// of the string with itself at the start of the input file).
				match_length = longest_match(hash_head);
				// longest_match() sets match_start */
				if (match_length > lookahead) {
					match_length = lookahead;
				}

				// Ignore a length 3 match if it is too distant: */
				if (match_length === MIN_MATCH && strstart - match_start > TOO_FAR) {
					// If prev_match is also MIN_MATCH, match_start is garbage
					// but we will ignore the current match anyway.
					match_length--;
				}
			}
			// If there was a match at the previous step and the current
			// match is not better, output the previous match:
			if (prev_length >= MIN_MATCH && match_length <= prev_length) {
				var flush; // set if current block must be flushed

				// check_match(strstart - 1, prev_match, prev_length);
				flush = ct_tally(strstart - 1 - prev_match, prev_length - MIN_MATCH);

				// Insert in hash table all strings up to the end of the match.
				// strstart-1 and strstart are already inserted.
				lookahead -= prev_length - 1;
				prev_length -= 2;
				do {
					strstart++;
					INSERT_STRING();
					// strstart never exceeds WSIZE-MAX_MATCH, so there are
					// always MIN_MATCH bytes ahead. If lookahead < MIN_MATCH
					// these bytes are garbage, but it does not matter since the
					// next lookahead bytes will always be emitted as literals.
				} while (--prev_length !== 0);
				match_available = false;
				match_length = MIN_MATCH - 1;
				strstart++;
				if (flush) {
					flush_block(0);
					block_start = strstart;
				}
			} else if (match_available) {
				// If there was no match at the previous position, output a
				// single literal. If there was a match but the current match
				// is longer, truncate the previous match to a single literal.
				if (ct_tally(0, window[strstart - 1] & 0xff)) {
					flush_block(0);
					block_start = strstart;
				}
				strstart++;
				lookahead--;
			} else {
				// There is no previous match to compare with, wait for
				// the next step to decide.
				match_available = true;
				strstart++;
				lookahead--;
			}

			// Make sure that we always have enough lookahead, except
			// at the end of the input file. We need MAX_MATCH bytes
			// for the next match, plus MIN_MATCH bytes to insert the
			// string following the next match.
			while (lookahead < MIN_LOOKAHEAD && !eofile) {
				fill_window();
			}
		}
	}

	function init_deflate() {
		if (eofile) {
			return;
		}
		bi_buf = 0;
		bi_valid = 0;
		ct_init();
		lm_init();

		qhead = null;
		outcnt = 0;
		outoff = 0;

		if (compr_level <= 3) {
			prev_length = MIN_MATCH - 1;
			match_length = 0;
		} else {
			match_length = MIN_MATCH - 1;
			match_available = false;
		}

		complete = false;
	}

	/* ==========================================================================
	 * Same as above, but achieves better compression. We use a lazy
	 * evaluation for matches: a match is finally adopted only if there is
	 * no better match at the next window position.
	 */
	function deflate_internal(buff, off, buff_size) {
		var n;

		if (!initflag) {
			init_deflate();
			initflag = true;
			if (lookahead === 0) { // empty
				complete = true;
				return 0;
			}
		}

		n = qcopy(buff, off, buff_size);
		if (n === buff_size) {
			return buff_size;
		}

		if (complete) {
			return n;
		}

		if (compr_level <= 3) {
			// optimized for speed
			deflate_fast();
		} else {
			deflate_better();
		}

		if (lookahead === 0) {
			if (match_available) {
				ct_tally(0, window[strstart - 1] & 0xff);
			}
			flush_block(1);
			complete = true;
		}

		return n + qcopy(buff, n + off, buff_size - n);
	}

	function qcopy(buff, off, buff_size) {
		var n, i, j;

		n = 0;
		while (qhead !== null && n < buff_size) {
			i = buff_size - n;
			if (i > qhead.len) {
				i = qhead.len;
			}
			// System.arraycopy(qhead.ptr, qhead.off, buff, off + n, i);
			for (j = 0; j < i; j++) {
				buff[off + n + j] = qhead.ptr[qhead.off + j];
			}

			qhead.off += i;
			qhead.len -= i;
			n += i;
			if (qhead.len === 0) {
				var p;
				p = qhead;
				qhead = qhead.next;
				reuse_queue(p);
			}
		}

		if (n === buff_size) {
			return n;
		}

		if (outoff < outcnt) {
			i = buff_size - n;
			if (i > outcnt - outoff) {
				i = outcnt - outoff;
			}
			// System.arraycopy(outbuf, outoff, buff, off + n, i);
			for (j = 0; j < i; j++) {
				buff[off + n + j] = outbuf[outoff + j];
			}
			outoff += i;
			n += i;
			if (outcnt === outoff) {
				outcnt = outoff = 0;
			}
		}
		return n;
	}

	/* ==========================================================================
	 * Allocate the match buffer, initialize the various tables and save the
	 * location of the internal file attribute (ascii/binary) and method
	 * (DEFLATE/STORE).
	 */
	function ct_init() {
		var n; // iterates over tree elements
		var bits; // bit counter
		var length; // length value
		var code; // code value
		var dist; // distance index

		if (static_dtree[0].dl !== 0) {
			return; // ct_init already called
		}

		l_desc.dyn_tree = dyn_ltree;
		l_desc.static_tree = static_ltree;
		l_desc.extra_bits = extra_lbits;
		l_desc.extra_base = LITERALS + 1;
		l_desc.elems = L_CODES;
		l_desc.max_length = MAX_BITS;
		l_desc.max_code = 0;

		d_desc.dyn_tree = dyn_dtree;
		d_desc.static_tree = static_dtree;
		d_desc.extra_bits = extra_dbits;
		d_desc.extra_base = 0;
		d_desc.elems = D_CODES;
		d_desc.max_length = MAX_BITS;
		d_desc.max_code = 0;

		bl_desc.dyn_tree = bl_tree;
		bl_desc.static_tree = null;
		bl_desc.extra_bits = extra_blbits;
		bl_desc.extra_base = 0;
		bl_desc.elems = BL_CODES;
		bl_desc.max_length = MAX_BL_BITS;
		bl_desc.max_code = 0;

	 // Initialize the mapping length (0..255) -> length code (0..28)
		length = 0;
		for (code = 0; code < LENGTH_CODES - 1; code++) {
			base_length[code] = length;
			for (n = 0; n < (1 << extra_lbits[code]); n++) {
				length_code[length++] = code;
			}
		}
	 // Assert (length === 256, "ct_init: length !== 256");

		// Note that the length 255 (match length 258) can be represented
		// in two different ways: code 284 + 5 bits or code 285, so we
		// overwrite length_code[255] to use the best encoding:
		length_code[length - 1] = code;

		// Initialize the mapping dist (0..32K) -> dist code (0..29) */
		dist = 0;
		for (code = 0; code < 16; code++) {
			base_dist[code] = dist;
			for (n = 0; n < (1 << extra_dbits[code]); n++) {
				dist_code[dist++] = code;
			}
		}
		// Assert (dist === 256, "ct_init: dist !== 256");
		// from now on, all distances are divided by 128
		for (dist >>= 7; code < D_CODES; code++) {
			base_dist[code] = dist << 7;
			for (n = 0; n < (1 << (extra_dbits[code] - 7)); n++) {
				dist_code[256 + dist++] = code;
			}
		}
		// Assert (dist === 256, "ct_init: 256+dist !== 512");

		// Construct the codes of the static literal tree
		for (bits = 0; bits <= MAX_BITS; bits++) {
			bl_count[bits] = 0;
		}
		n = 0;
		while (n <= 143) {
			static_ltree[n++].dl = 8;
			bl_count[8]++;
		}
		while (n <= 255) {
			static_ltree[n++].dl = 9;
			bl_count[9]++;
		}
		while (n <= 279) {
			static_ltree[n++].dl = 7;
			bl_count[7]++;
		}
		while (n <= 287) {
			static_ltree[n++].dl = 8;
			bl_count[8]++;
		}
		// Codes 286 and 287 do not exist, but we must include them in the
		// tree construction to get a canonical Huffman tree (longest code
		// all ones)
		gen_codes(static_ltree, L_CODES + 1);

		// The static distance tree is trivial: */
		for (n = 0; n < D_CODES; n++) {
			static_dtree[n].dl = 5;
			static_dtree[n].fc = bi_reverse(n, 5);
		}

		// Initialize the first block of the first file:
		init_block();
	}

	/* ==========================================================================
	 * Initialize a new block.
	 */
	function init_block() {
		var n; // iterates over tree elements

		// Initialize the trees.
		for (n = 0; n < L_CODES;  n++) {
			dyn_ltree[n].fc = 0;
		}
		for (n = 0; n < D_CODES;  n++) {
			dyn_dtree[n].fc = 0;
		}
		for (n = 0; n < BL_CODES; n++) {
			bl_tree[n].fc = 0;
		}

		dyn_ltree[END_BLOCK].fc = 1;
		opt_len = static_len = 0;
		last_lit = last_dist = last_flags = 0;
		flags = 0;
		flag_bit = 1;
	}

	/* ==========================================================================
	 * Restore the heap property by moving down the tree starting at node k,
	 * exchanging a node with the smallest of its two sons if necessary, stopping
	 * when the heap property is re-established (each father smaller than its
	 * two sons).
	 *
	 * @param tree- tree to restore
	 * @param k- node to move down
	 */
	function pqdownheap(tree, k) {
		var v = heap[k],
			j = k << 1; // left son of k

		while (j <= heap_len) {
			// Set j to the smallest of the two sons:
			if (j < heap_len && SMALLER(tree, heap[j + 1], heap[j])) {
				j++;
			}

			// Exit if v is smaller than both sons
			if (SMALLER(tree, v, heap[j])) {
				break;
			}

			// Exchange v with the smallest son
			heap[k] = heap[j];
			k = j;

			// And continue down the tree, setting j to the left son of k
			j <<= 1;
		}
		heap[k] = v;
	}

	/* ==========================================================================
	 * Compute the optimal bit lengths for a tree and update the total bit length
	 * for the current block.
	 * IN assertion: the fields freq and dad are set, heap[heap_max] and
	 *    above are the tree nodes sorted by increasing frequency.
	 * OUT assertions: the field len is set to the optimal bit length, the
	 *     array bl_count contains the frequencies for each bit length.
	 *     The length opt_len is updated; static_len is also updated if stree is
	 *     not null.
	 */
	function gen_bitlen(desc) { // the tree descriptor
		var tree = desc.dyn_tree;
		var extra = desc.extra_bits;
		var base = desc.extra_base;
		var max_code = desc.max_code;
		var max_length = desc.max_length;
		var stree = desc.static_tree;
		var h; // heap index
		var n, m; // iterate over the tree elements
		var bits; // bit length
		var xbits; // extra bits
		var f; // frequency
		var overflow = 0; // number of elements with bit length too large

		for (bits = 0; bits <= MAX_BITS; bits++) {
			bl_count[bits] = 0;
		}

		// In a first pass, compute the optimal bit lengths (which may
		// overflow in the case of the bit length tree).
		tree[heap[heap_max]].dl = 0; // root of the heap

		for (h = heap_max + 1; h < HEAP_SIZE; h++) {
			n = heap[h];
			bits = tree[tree[n].dl].dl + 1;
			if (bits > max_length) {
				bits = max_length;
				overflow++;
			}
			tree[n].dl = bits;
			// We overwrite tree[n].dl which is no longer needed

			if (n > max_code) {
				continue; // not a leaf node
			}

			bl_count[bits]++;
			xbits = 0;
			if (n >= base) {
				xbits = extra[n - base];
			}
			f = tree[n].fc;
			opt_len += f * (bits + xbits);
			if (stree !== null) {
				static_len += f * (stree[n].dl + xbits);
			}
		}
		if (overflow === 0) {
			return;
		}

		// This happens for example on obj2 and pic of the Calgary corpus

		// Find the first bit length which could increase:
		do {
			bits = max_length - 1;
			while (bl_count[bits] === 0) {
				bits--;
			}
			bl_count[bits]--; // move one leaf down the tree
			bl_count[bits + 1] += 2; // move one overflow item as its brother
			bl_count[max_length]--;
			// The brother of the overflow item also moves one step up,
			// but this does not affect bl_count[max_length]
			overflow -= 2;
		} while (overflow > 0);

		// Now recompute all bit lengths, scanning in increasing frequency.
		// h is still equal to HEAP_SIZE. (It is simpler to reconstruct all
		// lengths instead of fixing only the wrong ones. This idea is taken
		// from 'ar' written by Haruhiko Okumura.)
		for (bits = max_length; bits !== 0; bits--) {
			n = bl_count[bits];
			while (n !== 0) {
				m = heap[--h];
				if (m > max_code) {
					continue;
				}
				if (tree[m].dl !== bits) {
					opt_len += (bits - tree[m].dl) * tree[m].fc;
					tree[m].fc = bits;
				}
				n--;
			}
		}
	}

	  /* ==========================================================================
	   * Generate the codes for a given tree and bit counts (which need not be
	   * optimal).
	   * IN assertion: the array bl_count contains the bit length statistics for
	   * the given tree and the field len is set for all tree elements.
	   * OUT assertion: the field code is set for all tree elements of non
	   *     zero code length.
	   * @param tree- the tree to decorate
	   * @param max_code- largest code with non-zero frequency
	   */
	function gen_codes(tree, max_code) {
		var next_code = []; // new Array(MAX_BITS + 1); // next code value for each bit length
		var code = 0; // running code value
		var bits; // bit index
		var n; // code index

		// The distribution counts are first used to generate the code values
		// without bit reversal.
		for (bits = 1; bits <= MAX_BITS; bits++) {
			code = ((code + bl_count[bits - 1]) << 1);
			next_code[bits] = code;
		}

		// Check that the bit counts in bl_count are consistent. The last code
		// must be all ones.
		// Assert (code + encoder->bl_count[MAX_BITS]-1 === (1<<MAX_BITS)-1, "inconsistent bit counts");
		// Tracev((stderr,"\ngen_codes: max_code %d ", max_code));

		for (n = 0; n <= max_code; n++) {
			var len = tree[n].dl;
			if (len === 0) {
				continue;
			}
			// Now reverse the bits
			tree[n].fc = bi_reverse(next_code[len]++, len);

			// Tracec(tree !== static_ltree, (stderr,"\nn %3d %c l %2d c %4x (%x) ", n, (isgraph(n) ? n : ' '), len, tree[n].fc, next_code[len]-1));
		}
	}

	/* ==========================================================================
	 * Construct one Huffman tree and assigns the code bit strings and lengths.
	 * Update the total bit length for the current block.
	 * IN assertion: the field freq is set for all tree elements.
	 * OUT assertions: the fields len and code are set to the optimal bit length
	 *     and corresponding code. The length opt_len is updated; static_len is
	 *     also updated if stree is not null. The field max_code is set.
	 */
	function build_tree(desc) { // the tree descriptor
		var tree = desc.dyn_tree;
		var stree = desc.static_tree;
		var elems = desc.elems;
		var n, m; // iterate over heap elements
		var max_code = -1; // largest code with non zero frequency
		var node = elems; // next internal node of the tree

		// Construct the initial heap, with least frequent element in
		// heap[SMALLEST]. The sons of heap[n] are heap[2*n] and heap[2*n+1].
		// heap[0] is not used.
		heap_len = 0;
		heap_max = HEAP_SIZE;

		for (n = 0; n < elems; n++) {
			if (tree[n].fc !== 0) {
				heap[++heap_len] = max_code = n;
				depth[n] = 0;
			} else {
				tree[n].dl = 0;
			}
		}

		// The pkzip format requires that at least one distance code exists,
		// and that at least one bit should be sent even if there is only one
		// possible code. So to avoid special checks later on we force at least
		// two codes of non zero frequency.
		while (heap_len < 2) {
			var xnew = heap[++heap_len] = (max_code < 2 ? ++max_code : 0);
			tree[xnew].fc = 1;
			depth[xnew] = 0;
			opt_len--;
			if (stree !== null) {
				static_len -= stree[xnew].dl;
			}
			// new is 0 or 1 so it does not have extra bits
		}
		desc.max_code = max_code;

		// The elements heap[heap_len/2+1 .. heap_len] are leaves of the tree,
		// establish sub-heaps of increasing lengths:
		for (n = heap_len >> 1; n >= 1; n--) {
			pqdownheap(tree, n);
		}

		// Construct the Huffman tree by repeatedly combining the least two
		// frequent nodes.
		do {
			n = heap[SMALLEST];
			heap[SMALLEST] = heap[heap_len--];
			pqdownheap(tree, SMALLEST);

			m = heap[SMALLEST]; // m = node of next least frequency

			// keep the nodes sorted by frequency
			heap[--heap_max] = n;
			heap[--heap_max] = m;

			// Create a new node father of n and m
			tree[node].fc = tree[n].fc + tree[m].fc;
			//	depth[node] = (char)(MAX(depth[n], depth[m]) + 1);
			if (depth[n] > depth[m] + 1) {
				depth[node] = depth[n];
			} else {
				depth[node] = depth[m] + 1;
			}
			tree[n].dl = tree[m].dl = node;

			// and insert the new node in the heap
			heap[SMALLEST] = node++;
			pqdownheap(tree, SMALLEST);

		} while (heap_len >= 2);

		heap[--heap_max] = heap[SMALLEST];

		// At this point, the fields freq and dad are set. We can now
		// generate the bit lengths.
		gen_bitlen(desc);

		// The field len is now set, we can generate the bit codes
		gen_codes(tree, max_code);
	}

	/* ==========================================================================
	 * Scan a literal or distance tree to determine the frequencies of the codes
	 * in the bit length tree. Updates opt_len to take into account the repeat
	 * counts. (The contribution of the bit length codes will be added later
	 * during the construction of bl_tree.)
	 *
	 * @param tree- the tree to be scanned
	 * @param max_code- and its largest code of non zero frequency
	 */
	function scan_tree(tree, max_code) {
		var n, // iterates over all tree elements
			prevlen = -1, // last emitted length
			curlen, // length of current code
			nextlen = tree[0].dl, // length of next code
			count = 0, // repeat count of the current code
			max_count = 7, // max repeat count
			min_count = 4; // min repeat count

		if (nextlen === 0) {
			max_count = 138;
			min_count = 3;
		}
		tree[max_code + 1].dl = 0xffff; // guard

		for (n = 0; n <= max_code; n++) {
			curlen = nextlen;
			nextlen = tree[n + 1].dl;
			if (++count < max_count && curlen === nextlen) {
				continue;
			} else if (count < min_count) {
				bl_tree[curlen].fc += count;
			} else if (curlen !== 0) {
				if (curlen !== prevlen) {
					bl_tree[curlen].fc++;
				}
				bl_tree[REP_3_6].fc++;
			} else if (count <= 10) {
				bl_tree[REPZ_3_10].fc++;
			} else {
				bl_tree[REPZ_11_138].fc++;
			}
			count = 0; prevlen = curlen;
			if (nextlen === 0) {
				max_count = 138;
				min_count = 3;
			} else if (curlen === nextlen) {
				max_count = 6;
				min_count = 3;
			} else {
				max_count = 7;
				min_count = 4;
			}
		}
	}

	/* ==========================================================================
	 * Send a literal or distance tree in compressed form, using the codes in
	 * bl_tree.
	 *
	 * @param tree- the tree to be scanned
	 * @param max_code- and its largest code of non zero frequency
	 */
	function send_tree(tree, max_code) {
		var n; // iterates over all tree elements
		var prevlen = -1; // last emitted length
		var curlen; // length of current code
		var nextlen = tree[0].dl; // length of next code
		var count = 0; // repeat count of the current code
		var max_count = 7; // max repeat count
		var min_count = 4; // min repeat count

		// tree[max_code+1].dl = -1; */  /* guard already set */
		if (nextlen === 0) {
			max_count = 138;
			min_count = 3;
		}

		for (n = 0; n <= max_code; n++) {
			curlen = nextlen;
			nextlen = tree[n + 1].dl;
			if (++count < max_count && curlen === nextlen) {
				continue;
			} else if (count < min_count) {
				do {
					SEND_CODE(curlen, bl_tree);
				} while (--count !== 0);
			} else if (curlen !== 0) {
				if (curlen !== prevlen) {
					SEND_CODE(curlen, bl_tree);
					count--;
				}
			// Assert(count >= 3 && count <= 6, " 3_6?");
				SEND_CODE(REP_3_6, bl_tree);
				send_bits(count - 3, 2);
			} else if (count <= 10) {
				SEND_CODE(REPZ_3_10, bl_tree);
				send_bits(count - 3, 3);
			} else {
				SEND_CODE(REPZ_11_138, bl_tree);
				send_bits(count - 11, 7);
			}
			count = 0;
			prevlen = curlen;
			if (nextlen === 0) {
				max_count = 138;
				min_count = 3;
			} else if (curlen === nextlen) {
				max_count = 6;
				min_count = 3;
			} else {
				max_count = 7;
				min_count = 4;
			}
		}
	}

	/* ==========================================================================
	 * Construct the Huffman tree for the bit lengths and return the index in
	 * bl_order of the last bit length code to send.
	 */
	function build_bl_tree() {
		var max_blindex; // index of last bit length code of non zero freq

		// Determine the bit length frequencies for literal and distance trees
		scan_tree(dyn_ltree, l_desc.max_code);
		scan_tree(dyn_dtree, d_desc.max_code);

		// Build the bit length tree:
		build_tree(bl_desc);
		// opt_len now includes the length of the tree representations, except
		// the lengths of the bit lengths codes and the 5+5+4 bits for the counts.

		// Determine the number of bit length codes to send. The pkzip format
		// requires that at least 4 bit length codes be sent. (appnote.txt says
		// 3 but the actual value used is 4.)
		for (max_blindex = BL_CODES - 1; max_blindex >= 3; max_blindex--) {
			if (bl_tree[bl_order[max_blindex]].dl !== 0) {
				break;
			}
		}
		// Update opt_len to include the bit length tree and counts */
		opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;
		// Tracev((stderr, "\ndyn trees: dyn %ld, stat %ld",
		// encoder->opt_len, encoder->static_len));

		return max_blindex;
	}

	/* ==========================================================================
	 * Send the header for a block using dynamic Huffman trees: the counts, the
	 * lengths of the bit length codes, the literal tree and the distance tree.
	 * IN assertion: lcodes >= 257, dcodes >= 1, blcodes >= 4.
	 */
	function send_all_trees(lcodes, dcodes, blcodes) { // number of codes for each tree
		var rank; // index in bl_order

		// Assert (lcodes >= 257 && dcodes >= 1 && blcodes >= 4, "not enough codes");
		// Assert (lcodes <= L_CODES && dcodes <= D_CODES && blcodes <= BL_CODES, "too many codes");
		// Tracev((stderr, "\nbl counts: "));
		send_bits(lcodes - 257, 5); // not +255 as stated in appnote.txt
		send_bits(dcodes - 1,   5);
		send_bits(blcodes - 4,  4); // not -3 as stated in appnote.txt
		for (rank = 0; rank < blcodes; rank++) {
			// Tracev((stderr, "\nbl code %2d ", bl_order[rank]));
			send_bits(bl_tree[bl_order[rank]].dl, 3);
		}

		// send the literal tree
		send_tree(dyn_ltree, lcodes - 1);

		// send the distance tree
		send_tree(dyn_dtree, dcodes - 1);
	}

	/* ==========================================================================
	 * Determine the best encoding for the current block: dynamic trees, static
	 * trees or store, and output the encoded block to the zip file.
	 */
	function flush_block(eof) { // true if this is the last block for a file
		var opt_lenb, static_lenb, // opt_len and static_len in bytes
			max_blindex, // index of last bit length code of non zero freq
			stored_len, // length of input block
			i;

		stored_len = strstart - block_start;
		flag_buf[last_flags] = flags; // Save the flags for the last 8 items

		// Construct the literal and distance trees
		build_tree(l_desc);
		// Tracev((stderr, "\nlit data: dyn %ld, stat %ld",
		// encoder->opt_len, encoder->static_len));

		build_tree(d_desc);
		// Tracev((stderr, "\ndist data: dyn %ld, stat %ld",
		// encoder->opt_len, encoder->static_len));
		// At this point, opt_len and static_len are the total bit lengths of
		// the compressed block data, excluding the tree representations.

		// Build the bit length tree for the above two trees, and get the index
		// in bl_order of the last bit length code to send.
		max_blindex = build_bl_tree();

	 // Determine the best encoding. Compute first the block length in bytes
		opt_lenb = (opt_len + 3 + 7) >> 3;
		static_lenb = (static_len + 3 + 7) >> 3;

	//  Trace((stderr, "\nopt %lu(%lu) stat %lu(%lu) stored %lu lit %u dist %u ", opt_lenb, encoder->opt_len, static_lenb, encoder->static_len, stored_len, encoder->last_lit, encoder->last_dist));

		if (static_lenb <= opt_lenb) {
			opt_lenb = static_lenb;
		}
		if (stored_len + 4 <= opt_lenb && block_start >= 0) { // 4: two words for the lengths
			// The test buf !== NULL is only necessary if LIT_BUFSIZE > WSIZE.
			// Otherwise we can't have processed more than WSIZE input bytes since
			// the last block flush, because compression would have been
			// successful. If LIT_BUFSIZE <= WSIZE, it is never too late to
			// transform a block into a stored block.
			send_bits((STORED_BLOCK << 1) + eof, 3);  /* send block type */
			bi_windup();         /* align on byte boundary */
			put_short(stored_len);
			put_short(~stored_len);

			// copy block
			/*
				p = &window[block_start];
				for (i = 0; i < stored_len; i++) {
					put_byte(p[i]);
				}
			*/
			for (i = 0; i < stored_len; i++) {
				put_byte(window[block_start + i]);
			}
		} else if (static_lenb === opt_lenb) {
			send_bits((STATIC_TREES << 1) + eof, 3);
			compress_block(static_ltree, static_dtree);
		} else {
			send_bits((DYN_TREES << 1) + eof, 3);
			send_all_trees(l_desc.max_code + 1, d_desc.max_code + 1, max_blindex + 1);
			compress_block(dyn_ltree, dyn_dtree);
		}

		init_block();

		if (eof !== 0) {
			bi_windup();
		}
	}

	/* ==========================================================================
	 * Save the match info and tally the frequency counts. Return true if
	 * the current block must be flushed.
	 *
	 * @param dist- distance of matched string
	 * @param lc- (match length - MIN_MATCH) or unmatched char (if dist === 0)
	 */
	function ct_tally(dist, lc) {
		l_buf[last_lit++] = lc;
		if (dist === 0) {
			// lc is the unmatched char
			dyn_ltree[lc].fc++;
		} else {
			// Here, lc is the match length - MIN_MATCH
			dist--; // dist = match distance - 1
			// Assert((ush)dist < (ush)MAX_DIST && (ush)lc <= (ush)(MAX_MATCH-MIN_MATCH) && (ush)D_CODE(dist) < (ush)D_CODES,  "ct_tally: bad match");

			dyn_ltree[length_code[lc] + LITERALS + 1].fc++;
			dyn_dtree[D_CODE(dist)].fc++;

			d_buf[last_dist++] = dist;
			flags |= flag_bit;
		}
		flag_bit <<= 1;

		// Output the flags if they fill a byte
		if ((last_lit & 7) === 0) {
			flag_buf[last_flags++] = flags;
			flags = 0;
			flag_bit = 1;
		}
		// Try to guess if it is profitable to stop the current block here
		if (compr_level > 2 && (last_lit & 0xfff) === 0) {
			// Compute an upper bound for the compressed length
			var out_length = last_lit * 8;
			var in_length = strstart - block_start;
			var dcode;

			for (dcode = 0; dcode < D_CODES; dcode++) {
				out_length += dyn_dtree[dcode].fc * (5 + extra_dbits[dcode]);
			}
			out_length >>= 3;
			// Trace((stderr,"\nlast_lit %u, last_dist %u, in %ld, out ~%ld(%ld%%) ", encoder->last_lit, encoder->last_dist, in_length, out_length, 100L - out_length*100L/in_length));
			if (last_dist < parseInt(last_lit / 2, 10) && out_length < parseInt(in_length / 2, 10)) {
				return true;
			}
		}
		return (last_lit === LIT_BUFSIZE - 1 || last_dist === DIST_BUFSIZE);
		// We avoid equality with LIT_BUFSIZE because of wraparound at 64K
		// on 16 bit machines and because stored blocks are restricted to
		// 64K-1 bytes.
	}

	  /* ==========================================================================
	   * Send the block data compressed using the given Huffman trees
	   *
	   * @param ltree- literal tree
	   * @param dtree- distance tree
	   */
	function compress_block(ltree, dtree) {
		var dist; // distance of matched string
		var lc; // match length or unmatched char (if dist === 0)
		var lx = 0; // running index in l_buf
		var dx = 0; // running index in d_buf
		var fx = 0; // running index in flag_buf
		var flag = 0; // current flags
		var code; // the code to send
		var extra; // number of extra bits to send

		if (last_lit !== 0) {
			do {
				if ((lx & 7) === 0) {
					flag = flag_buf[fx++];
				}
				lc = l_buf[lx++] & 0xff;
				if ((flag & 1) === 0) {
					SEND_CODE(lc, ltree); /* send a literal byte */
					//	Tracecv(isgraph(lc), (stderr," '%c' ", lc));
				} else {
					// Here, lc is the match length - MIN_MATCH
					code = length_code[lc];
					SEND_CODE(code + LITERALS + 1, ltree); // send the length code
					extra = extra_lbits[code];
					if (extra !== 0) {
						lc -= base_length[code];
						send_bits(lc, extra); // send the extra length bits
					}
					dist = d_buf[dx++];
					// Here, dist is the match distance - 1
					code = D_CODE(dist);
					//	Assert (code < D_CODES, "bad d_code");

					SEND_CODE(code, dtree); // send the distance code
					extra = extra_dbits[code];
					if (extra !== 0) {
						dist -= base_dist[code];
						send_bits(dist, extra); // send the extra distance bits
					}
				} // literal or match pair ?
				flag >>= 1;
			} while (lx < last_lit);
		}

		SEND_CODE(END_BLOCK, ltree);
	}

	/* ==========================================================================
	 * Send a value on a given number of bits.
	 * IN assertion: length <= 16 and value fits in length bits.
	 *
	 * @param value- value to send
	 * @param length- number of bits
	 */
	var Buf_size = 16; // bit size of bi_buf
	function send_bits(value, length) {
		// If not enough room in bi_buf, use (valid) bits from bi_buf and
		// (16 - bi_valid) bits from value, leaving (width - (16-bi_valid))
		// unused bits in value.
		if (bi_valid > Buf_size - length) {
			bi_buf |= (value << bi_valid);
			put_short(bi_buf);
			bi_buf = (value >> (Buf_size - bi_valid));
			bi_valid += length - Buf_size;
		} else {
			bi_buf |= value << bi_valid;
			bi_valid += length;
		}
	}

	/* ==========================================================================
	 * Reverse the first len bits of a code, using straightforward code (a faster
	 * method would use a table)
	 * IN assertion: 1 <= len <= 15
	 *
	 * @param code- the value to invert
	 * @param len- its bit length
	 */
	function bi_reverse(code, len) {
		var res = 0;
		do {
			res |= code & 1;
			code >>= 1;
			res <<= 1;
		} while (--len > 0);
		return res >> 1;
	}

	/* ==========================================================================
	 * Write out any remaining bits in an incomplete byte.
	 */
	function bi_windup() {
		if (bi_valid > 8) {
			put_short(bi_buf);
		} else if (bi_valid > 0) {
			put_byte(bi_buf);
		}
		bi_buf = 0;
		bi_valid = 0;
	}

	function qoutbuf() {
		var q, i;
		if (outcnt !== 0) {
			q = new_queue();
			if (qhead === null) {
				qhead = qtail = q;
			} else {
				qtail = qtail.next = q;
			}
			q.len = outcnt - outoff;
			// System.arraycopy(outbuf, outoff, q.ptr, 0, q.len);
			for (i = 0; i < q.len; i++) {
				q.ptr[i] = outbuf[outoff + i];
			}
			outcnt = outoff = 0;
		}
	}

	function deflate(arr, level) {
		var i, j, buff;

		deflate_data = arr;
		deflate_pos = 0;
		if (typeof level === "undefined") {
			level = DEFAULT_LEVEL;
		}
		deflate_start(level);

		buff = [];

		do {
			i = deflate_internal(buff, buff.length, 1024);
		} while (i > 0);

		deflate_data = null; // G.C.
		return buff;
	}

	module.exports = deflate;
	module.exports.DEFAULT_LEVEL = DEFAULT_LEVEL;
}());


/***/ }),

/***/ 689:
/***/ ((module) => {

/*
 * $Id: rawinflate.js,v 0.2 2009/03/01 18:32:24 dankogai Exp $
 *
 * original:
 * http://www.onicos.com/staff/iz/amuse/javascript/expert/inflate.txt
 */

/* Copyright (C) 1999 Masanao Izumo <iz@onicos.co.jp>
 * Version: 1.0.0.1
 * LastModified: Dec 25 1999
 */

/* Interface:
 * data = inflate(src);
 */

(function () {
	/* constant parameters */
	var WSIZE = 32768, // Sliding Window size
		STORED_BLOCK = 0,
		STATIC_TREES = 1,
		DYN_TREES = 2,

	/* for inflate */
		lbits = 9, // bits in base literal/length lookup table
		dbits = 6, // bits in base distance lookup table

	/* variables (inflate) */
		slide,
		wp, // current position in slide
		fixed_tl = null, // inflate static
		fixed_td, // inflate static
		fixed_bl, // inflate static
		fixed_bd, // inflate static
		bit_buf, // bit buffer
		bit_len, // bits in bit buffer
		method,
		eof,
		copy_leng,
		copy_dist,
		tl, // literal length decoder table
		td, // literal distance decoder table
		bl, // number of bits decoded by tl
		bd, // number of bits decoded by td

		inflate_data,
		inflate_pos,


/* constant tables (inflate) */
		MASK_BITS = [
			0x0000,
			0x0001, 0x0003, 0x0007, 0x000f, 0x001f, 0x003f, 0x007f, 0x00ff,
			0x01ff, 0x03ff, 0x07ff, 0x0fff, 0x1fff, 0x3fff, 0x7fff, 0xffff
		],
		// Tables for deflate from PKZIP's appnote.txt.
		// Copy lengths for literal codes 257..285
		cplens = [
			3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31,
			35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0
		],
/* note: see note #13 above about the 258 in this list. */
		// Extra bits for literal codes 257..285
		cplext = [
			0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2,
			3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 99, 99 // 99==invalid
		],
		// Copy offsets for distance codes 0..29
		cpdist = [
			1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193,
			257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145,
			8193, 12289, 16385, 24577
		],
		// Extra bits for distance codes
		cpdext = [
			0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6,
			7, 7, 8, 8, 9, 9, 10, 10, 11, 11,
			12, 12, 13, 13
		],
		// Order of the bit length code lengths
		border = [
			16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15
		];
	/* objects (inflate) */

	function HuftList() {
		this.next = null;
		this.list = null;
	}

	function HuftNode() {
		this.e = 0; // number of extra bits or operation
		this.b = 0; // number of bits in this code or subcode

		// union
		this.n = 0; // literal, length base, or distance base
		this.t = null; // (HuftNode) pointer to next level of table
	}

	/*
	 * @param b-  code lengths in bits (all assumed <= BMAX)
	 * @param n- number of codes (assumed <= N_MAX)
	 * @param s- number of simple-valued codes (0..s-1)
	 * @param d- list of base values for non-simple codes
	 * @param e- list of extra bits for non-simple codes
	 * @param mm- maximum lookup bits
	 */
	function HuftBuild(b, n, s, d, e, mm) {
		this.BMAX = 16; // maximum bit length of any code
		this.N_MAX = 288; // maximum number of codes in any set
		this.status = 0; // 0: success, 1: incomplete table, 2: bad input
		this.root = null; // (HuftList) starting table
		this.m = 0; // maximum lookup bits, returns actual

	/* Given a list of code lengths and a maximum table size, make a set of
	   tables to decode that set of codes. Return zero on success, one if
	   the given code set is incomplete (the tables are still built in this
	   case), two if the input is invalid (all zero length codes or an
	   oversubscribed set of lengths), and three if not enough memory.
	   The code with value 256 is special, and the tables are constructed
	   so that no bits beyond that code are fetched when that code is
	   decoded. */
		var a; // counter for codes of length k
		var c = [];
		var el; // length of EOB code (value 256)
		var f; // i repeats in table every f entries
		var g; // maximum code length
		var h; // table level
		var i; // counter, current code
		var j; // counter
		var k; // number of bits in current code
		var lx = [];
		var p; // pointer into c[], b[], or v[]
		var pidx; // index of p
		var q; // (HuftNode) points to current table
		var r = new HuftNode(); // table entry for structure assignment
		var u = [];
		var v = [];
		var w;
		var x = [];
		var xp; // pointer into x or c
		var y; // number of dummy codes added
		var z; // number of entries in current table
		var o;
		var tail; // (HuftList)

		tail = this.root = null;

		// bit length count table
		for (i = 0; i < this.BMAX + 1; i++) {
			c[i] = 0;
		}
		// stack of bits per table
		for (i = 0; i < this.BMAX + 1; i++) {
			lx[i] = 0;
		}
		// HuftNode[BMAX][]  table stack
		for (i = 0; i < this.BMAX; i++) {
			u[i] = null;
		}
		// values in order of bit length
		for (i = 0; i < this.N_MAX; i++) {
			v[i] = 0;
		}
		// bit offsets, then code stack
		for (i = 0; i < this.BMAX + 1; i++) {
			x[i] = 0;
		}

		// Generate counts for each bit length
		el = n > 256 ? b[256] : this.BMAX; // set length of EOB code, if any
		p = b; pidx = 0;
		i = n;
		do {
			c[p[pidx]]++; // assume all entries <= BMAX
			pidx++;
		} while (--i > 0);
		if (c[0] === n) { // null input--all zero length codes
			this.root = null;
			this.m = 0;
			this.status = 0;
			return;
		}

		// Find minimum and maximum length, bound *m by those
		for (j = 1; j <= this.BMAX; j++) {
			if (c[j] !== 0) {
				break;
			}
		}
		k = j; // minimum code length
		if (mm < j) {
			mm = j;
		}
		for (i = this.BMAX; i !== 0; i--) {
			if (c[i] !== 0) {
				break;
			}
		}
		g = i; // maximum code length
		if (mm > i) {
			mm = i;
		}

		// Adjust last length count to fill out codes, if needed
		for (y = 1 << j; j < i; j++, y <<= 1) {
			if ((y -= c[j]) < 0) {
				this.status = 2; // bad input: more codes than bits
				this.m = mm;
				return;
			}
		}
		if ((y -= c[i]) < 0) {
			this.status = 2;
			this.m = mm;
			return;
		}
		c[i] += y;

		// Generate starting offsets into the value table for each length
		x[1] = j = 0;
		p = c;
		pidx = 1;
		xp = 2;
		while (--i > 0) { // note that i == g from above
			x[xp++] = (j += p[pidx++]);
		}

		// Make a table of values in order of bit lengths
		p = b; pidx = 0;
		i = 0;
		do {
			if ((j = p[pidx++]) !== 0) {
				v[x[j]++] = i;
			}
		} while (++i < n);
		n = x[g]; // set n to length of v

		// Generate the Huffman codes and for each, make the table entries
		x[0] = i = 0; // first Huffman code is zero
		p = v; pidx = 0; // grab values in bit order
		h = -1; // no tables yet--level -1
		w = lx[0] = 0; // no bits decoded yet
		q = null; // ditto
		z = 0; // ditto

		// go through the bit lengths (k already is bits in shortest code)
		for (null; k <= g; k++) {
			a = c[k];
			while (a-- > 0) {
				// here i is the Huffman code of length k bits for value p[pidx]
				// make tables up to required level
				while (k > w + lx[1 + h]) {
					w += lx[1 + h]; // add bits already decoded
					h++;

					// compute minimum size table less than or equal to *m bits
					z = (z = g - w) > mm ? mm : z; // upper limit
					if ((f = 1 << (j = k - w)) > a + 1) { // try a k-w bit table
						// too few codes for k-w bit table
						f -= a + 1; // deduct codes from patterns left
						xp = k;
						while (++j < z) { // try smaller tables up to z bits
							if ((f <<= 1) <= c[++xp]) {
								break; // enough codes to use up j bits
							}
							f -= c[xp]; // else deduct codes from patterns
						}
					}
					if (w + j > el && w < el) {
						j = el - w; // make EOB code end at table
					}
					z = 1 << j; // table entries for j-bit table
					lx[1 + h] = j; // set table size in stack

					// allocate and link in new table
					q = [];
					for (o = 0; o < z; o++) {
						q[o] = new HuftNode();
					}

					if (!tail) {
						tail = this.root = new HuftList();
					} else {
						tail = tail.next = new HuftList();
					}
					tail.next = null;
					tail.list = q;
					u[h] = q; // table starts after link

					/* connect to last table, if there is one */
					if (h > 0) {
						x[h] = i; // save pattern for backing up
						r.b = lx[h]; // bits to dump before this table
						r.e = 16 + j; // bits in this table
						r.t = q; // pointer to this table
						j = (i & ((1 << w) - 1)) >> (w - lx[h]);
						u[h - 1][j].e = r.e;
						u[h - 1][j].b = r.b;
						u[h - 1][j].n = r.n;
						u[h - 1][j].t = r.t;
					}
				}

				// set up table entry in r
				r.b = k - w;
				if (pidx >= n) {
					r.e = 99; // out of values--invalid code
				} else if (p[pidx] < s) {
					r.e = (p[pidx] < 256 ? 16 : 15); // 256 is end-of-block code
					r.n = p[pidx++]; // simple code is just the value
				} else {
					r.e = e[p[pidx] - s]; // non-simple--look up in lists
					r.n = d[p[pidx++] - s];
				}

				// fill code-like entries with r //
				f = 1 << (k - w);
				for (j = i >> w; j < z; j += f) {
					q[j].e = r.e;
					q[j].b = r.b;
					q[j].n = r.n;
					q[j].t = r.t;
				}

				// backwards increment the k-bit code i
				for (j = 1 << (k - 1); (i & j) !== 0; j >>= 1) {
					i ^= j;
				}
				i ^= j;

				// backup over finished tables
				while ((i & ((1 << w) - 1)) !== x[h]) {
					w -= lx[h]; // don't need to update q
					h--;
				}
			}
		}

		/* return actual size of base table */
		this.m = lx[1];

		/* Return true (1) if we were given an incomplete table */
		this.status = ((y !== 0 && g !== 1) ? 1 : 0);
	}


	/* routines (inflate) */

	function GET_BYTE() {
		if (inflate_data.length === inflate_pos) {
			return -1;
		}
		return inflate_data[inflate_pos++] & 0xff;
	}

	function NEEDBITS(n) {
		while (bit_len < n) {
			bit_buf |= GET_BYTE() << bit_len;
			bit_len += 8;
		}
	}

	function GETBITS(n) {
		return bit_buf & MASK_BITS[n];
	}

	function DUMPBITS(n) {
		bit_buf >>= n;
		bit_len -= n;
	}

	function inflate_codes(buff, off, size) {
		// inflate (decompress) the codes in a deflated (compressed) block.
		// Return an error code or zero if it all goes ok.
		var e; // table entry flag/number of extra bits
		var t; // (HuftNode) pointer to table entry
		var n;

		if (size === 0) {
			return 0;
		}

		// inflate the coded data
		n = 0;
		for (;;) { // do until end of block
			NEEDBITS(bl);
			t = tl.list[GETBITS(bl)];
			e = t.e;
			while (e > 16) {
				if (e === 99) {
					return -1;
				}
				DUMPBITS(t.b);
				e -= 16;
				NEEDBITS(e);
				t = t.t[GETBITS(e)];
				e = t.e;
			}
			DUMPBITS(t.b);

			if (e === 16) { // then it's a literal
				wp &= WSIZE - 1;
				buff[off + n++] = slide[wp++] = t.n;
				if (n === size) {
					return size;
				}
				continue;
			}

			// exit if end of block
			if (e === 15) {
				break;
			}

			// it's an EOB or a length

			// get length of block to copy
			NEEDBITS(e);
			copy_leng = t.n + GETBITS(e);
			DUMPBITS(e);

			// decode distance of block to copy
			NEEDBITS(bd);
			t = td.list[GETBITS(bd)];
			e = t.e;

			while (e > 16) {
				if (e === 99) {
					return -1;
				}
				DUMPBITS(t.b);
				e -= 16;
				NEEDBITS(e);
				t = t.t[GETBITS(e)];
				e = t.e;
			}
			DUMPBITS(t.b);
			NEEDBITS(e);
			copy_dist = wp - t.n - GETBITS(e);
			DUMPBITS(e);

			// do the copy
			while (copy_leng > 0 && n < size) {
				copy_leng--;
				copy_dist &= WSIZE - 1;
				wp &= WSIZE - 1;
				buff[off + n++] = slide[wp++] = slide[copy_dist++];
			}

			if (n === size) {
				return size;
			}
		}

		method = -1; // done
		return n;
	}

	function inflate_stored(buff, off, size) {
		/* "decompress" an inflated type 0 (stored) block. */
		var n;

		// go to byte boundary
		n = bit_len & 7;
		DUMPBITS(n);

		// get the length and its complement
		NEEDBITS(16);
		n = GETBITS(16);
		DUMPBITS(16);
		NEEDBITS(16);
		if (n !== ((~bit_buf) & 0xffff)) {
			return -1; // error in compressed data
		}
		DUMPBITS(16);

		// read and output the compressed data
		copy_leng = n;

		n = 0;
		while (copy_leng > 0 && n < size) {
			copy_leng--;
			wp &= WSIZE - 1;
			NEEDBITS(8);
			buff[off + n++] = slide[wp++] = GETBITS(8);
			DUMPBITS(8);
		}

		if (copy_leng === 0) {
			method = -1; // done
		}
		return n;
	}

	function inflate_fixed(buff, off, size) {
		// decompress an inflated type 1 (fixed Huffman codes) block.  We should
		// either replace this with a custom decoder, or at least precompute the
		// Huffman tables.

		// if first time, set up tables for fixed blocks
		if (!fixed_tl) {
			var i; // temporary variable
			var l = []; // 288 length list for huft_build (initialized below)
			var h; // HuftBuild

			// literal table
			for (i = 0; i < 144; i++) {
				l[i] = 8;
			}
			for (null; i < 256; i++) {
				l[i] = 9;
			}
			for (null; i < 280; i++) {
				l[i] = 7;
			}
			for (null; i < 288; i++) { // make a complete, but wrong code set
				l[i] = 8;
			}
			fixed_bl = 7;

			h = new HuftBuild(l, 288, 257, cplens, cplext, fixed_bl);
			if (h.status !== 0) {
				console.error("HufBuild error: " + h.status);
				return -1;
			}
			fixed_tl = h.root;
			fixed_bl = h.m;

			// distance table
			for (i = 0; i < 30; i++) { // make an incomplete code set
				l[i] = 5;
			}
			fixed_bd = 5;

			h = new HuftBuild(l, 30, 0, cpdist, cpdext, fixed_bd);
			if (h.status > 1) {
				fixed_tl = null;
				console.error("HufBuild error: " + h.status);
				return -1;
			}
			fixed_td = h.root;
			fixed_bd = h.m;
		}

		tl = fixed_tl;
		td = fixed_td;
		bl = fixed_bl;
		bd = fixed_bd;
		return inflate_codes(buff, off, size);
	}

	function inflate_dynamic(buff, off, size) {
		// decompress an inflated type 2 (dynamic Huffman codes) block.
		var i; // temporary variables
		var j;
		var l; // last length
		var n; // number of lengths to get
		var t; // (HuftNode) literal/length code table
		var nb; // number of bit length codes
		var nl; // number of literal/length codes
		var nd; // number of distance codes
		var ll = [];
		var h; // (HuftBuild)

		// literal/length and distance code lengths
		for (i = 0; i < 286 + 30; i++) {
			ll[i] = 0;
		}

		// read in table lengths
		NEEDBITS(5);
		nl = 257 + GETBITS(5); // number of literal/length codes
		DUMPBITS(5);
		NEEDBITS(5);
		nd = 1 + GETBITS(5); // number of distance codes
		DUMPBITS(5);
		NEEDBITS(4);
		nb = 4 + GETBITS(4); // number of bit length codes
		DUMPBITS(4);
		if (nl > 286 || nd > 30) {
			return -1; // bad lengths
		}

		// read in bit-length-code lengths
		for (j = 0; j < nb; j++) {
			NEEDBITS(3);
			ll[border[j]] = GETBITS(3);
			DUMPBITS(3);
		}
		for (null; j < 19; j++) {
			ll[border[j]] = 0;
		}

		// build decoding table for trees--single level, 7 bit lookup
		bl = 7;
		h = new HuftBuild(ll, 19, 19, null, null, bl);
		if (h.status !== 0) {
			return -1; // incomplete code set
		}

		tl = h.root;
		bl = h.m;

		// read in literal and distance code lengths
		n = nl + nd;
		i = l = 0;
		while (i < n) {
			NEEDBITS(bl);
			t = tl.list[GETBITS(bl)];
			j = t.b;
			DUMPBITS(j);
			j = t.n;
			if (j < 16) { // length of code in bits (0..15)
				ll[i++] = l = j; // save last length in l
			} else if (j === 16) { // repeat last length 3 to 6 times
				NEEDBITS(2);
				j = 3 + GETBITS(2);
				DUMPBITS(2);
				if (i + j > n) {
					return -1;
				}
				while (j-- > 0) {
					ll[i++] = l;
				}
			} else if (j === 17) { // 3 to 10 zero length codes
				NEEDBITS(3);
				j = 3 + GETBITS(3);
				DUMPBITS(3);
				if (i + j > n) {
					return -1;
				}
				while (j-- > 0) {
					ll[i++] = 0;
				}
				l = 0;
			} else { // j === 18: 11 to 138 zero length codes
				NEEDBITS(7);
				j = 11 + GETBITS(7);
				DUMPBITS(7);
				if (i + j > n) {
					return -1;
				}
				while (j-- > 0) {
					ll[i++] = 0;
				}
				l = 0;
			}
		}

		// build the decoding tables for literal/length and distance codes
		bl = lbits;
		h = new HuftBuild(ll, nl, 257, cplens, cplext, bl);
		if (bl === 0) { // no literals or lengths
			h.status = 1;
		}
		if (h.status !== 0) {
			if (h.status !== 1) {
				return -1; // incomplete code set
			}
			// **incomplete literal tree**
		}
		tl = h.root;
		bl = h.m;

		for (i = 0; i < nd; i++) {
			ll[i] = ll[i + nl];
		}
		bd = dbits;
		h = new HuftBuild(ll, nd, 0, cpdist, cpdext, bd);
		td = h.root;
		bd = h.m;

		if (bd === 0 && nl > 257) { // lengths but no distances
			// **incomplete distance tree**
			return -1;
		}
/*
		if (h.status === 1) {
			// **incomplete distance tree**
		}
*/
		if (h.status !== 0) {
			return -1;
		}

		// decompress until an end-of-block code
		return inflate_codes(buff, off, size);
	}

	function inflate_start() {
		if (!slide) {
			slide = []; // new Array(2 * WSIZE); // slide.length is never called
		}
		wp = 0;
		bit_buf = 0;
		bit_len = 0;
		method = -1;
		eof = false;
		copy_leng = copy_dist = 0;
		tl = null;
	}

	function inflate_internal(buff, off, size) {
		// decompress an inflated entry
		var n, i;

		n = 0;
		while (n < size) {
			if (eof && method === -1) {
				return n;
			}

			if (copy_leng > 0) {
				if (method !== STORED_BLOCK) {
					// STATIC_TREES or DYN_TREES
					while (copy_leng > 0 && n < size) {
						copy_leng--;
						copy_dist &= WSIZE - 1;
						wp &= WSIZE - 1;
						buff[off + n++] = slide[wp++] = slide[copy_dist++];
					}
				} else {
					while (copy_leng > 0 && n < size) {
						copy_leng--;
						wp &= WSIZE - 1;
						NEEDBITS(8);
						buff[off + n++] = slide[wp++] = GETBITS(8);
						DUMPBITS(8);
					}
					if (copy_leng === 0) {
						method = -1; // done
					}
				}
				if (n === size) {
					return n;
				}
			}

			if (method === -1) {
				if (eof) {
					break;
				}

				// read in last block bit
				NEEDBITS(1);
				if (GETBITS(1) !== 0) {
					eof = true;
				}
				DUMPBITS(1);

				// read in block type
				NEEDBITS(2);
				method = GETBITS(2);
				DUMPBITS(2);
				tl = null;
				copy_leng = 0;
			}

			switch (method) {
			case STORED_BLOCK:
				i = inflate_stored(buff, off + n, size - n);
				break;

			case STATIC_TREES:
				if (tl) {
					i = inflate_codes(buff, off + n, size - n);
				} else {
					i = inflate_fixed(buff, off + n, size - n);
				}
				break;

			case DYN_TREES:
				if (tl) {
					i = inflate_codes(buff, off + n, size - n);
				} else {
					i = inflate_dynamic(buff, off + n, size - n);
				}
				break;

			default: // error
				i = -1;
				break;
			}

			if (i === -1) {
				if (eof) {
					return 0;
				}
				return -1;
			}
			n += i;
		}
		return n;
	}

	function inflate(arr) {
		var buff = [], i;

		inflate_start();
		inflate_data = arr;
		inflate_pos = 0;

		do {
			i = inflate_internal(buff, buff.length, 1024);
		} while (i > 0);
		inflate_data = null; // G.C.
		return buff;
	}

	module.exports = inflate;
}());


/***/ }),

/***/ 606:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

(function () {
	'use strict';

	var crc32 = __webpack_require__(793),
		deflate = __webpack_require__(762),
		// magic numbers marking this file as GZIP
		ID1 = 0x1F,
		ID2 = 0x8B,
		compressionMethods = {
			'deflate': 8
		},
		possibleFlags = {
			'FTEXT': 0x01,
			'FHCRC': 0x02,
			'FEXTRA': 0x04,
			'FNAME': 0x08,
			'FCOMMENT': 0x10
		},
		osMap = {
			'fat': 0, // FAT file system (DOS, OS/2, NT) + PKZIPW 2.50 VFAT, NTFS
			'amiga': 1, // Amiga
			'vmz': 2, // VMS (VAX or Alpha AXP)
			'unix': 3, // Unix
			'vm/cms': 4, // VM/CMS
			'atari': 5, // Atari
			'hpfs': 6, // HPFS file system (OS/2, NT 3.x)
			'macintosh': 7, // Macintosh
			'z-system': 8, // Z-System
			'cplm': 9, // CP/M
			'tops-20': 10, // TOPS-20
			'ntfs': 11, // NTFS file system (NT)
			'qdos': 12, // SMS/QDOS
			'acorn': 13, // Acorn RISC OS
			'vfat': 14, // VFAT file system (Win95, NT)
			'vms': 15, // MVS (code also taken for PRIMOS)
			'beos': 16, // BeOS (BeBox or PowerMac)
			'tandem': 17, // Tandem/NSK
			'theos': 18 // THEOS
		},
		os = 'unix',
		DEFAULT_LEVEL = 6;

	function putByte(n, arr) {
		arr.push(n & 0xFF);
	}

	// LSB first
	function putShort(n, arr) {
		arr.push(n & 0xFF);
		arr.push(n >>> 8);
	}

	// LSB first
	function putLong(n, arr) {
		putShort(n & 0xffff, arr);
		putShort(n >>> 16, arr);
	}

	function putString(s, arr) {
		var i, len = s.length;
		for (i = 0; i < len; i += 1) {
			putByte(s.charCodeAt(i), arr);
		}
	}

	function readByte(arr) {
		return arr.shift();
	}

	function readShort(arr) {
		return arr.shift() | (arr.shift() << 8);
	}

	function readLong(arr) {
		var n1 = readShort(arr),
			n2 = readShort(arr);

		// JavaScript can't handle bits in the position 32
		// we'll emulate this by removing the left-most bit (if it exists)
		// and add it back in via multiplication, which does work
		if (n2 > 32768) {
			n2 -= 32768;

			return ((n2 << 16) | n1) + 32768 * Math.pow(2, 16);
		}

		return (n2 << 16) | n1;
	}

	function readString(arr) {
		var charArr = [];

		// turn all bytes into chars until the terminating null
		while (arr[0] !== 0) {
			charArr.push(String.fromCharCode(arr.shift()));
		}

		// throw away terminating null
		arr.shift();

		// join all characters into a cohesive string
		return charArr.join('');
	}

	/*
	 * Reads n number of bytes and return as an array.
	 *
	 * @param arr- Array of bytes to read from
	 * @param n- Number of bytes to read
	 */
	function readBytes(arr, n) {
		var i, ret = [];
		for (i = 0; i < n; i += 1) {
			ret.push(arr.shift());
		}

		return ret;
	}

	/*
	 * ZIPs a file in GZIP format. The format is as given by the spec, found at:
	 * http://www.gzip.org/zlib/rfc-gzip.html
	 *
	 * Omitted parts in this implementation:
	 */
	function zip(data, options) {
		var flags = 0,
			level,
			crc, out = [];

		if (!options) {
			options = {};
		}
		level = options.level || DEFAULT_LEVEL;

		if (typeof data === 'string') {
			data = Array.prototype.map.call(data, function (char) {
				return char.charCodeAt(0);
			});
		}

		// magic number marking this file as GZIP
		putByte(ID1, out);
		putByte(ID2, out);

		putByte(compressionMethods['deflate'], out);

		if (options.name) {
			flags |= possibleFlags['FNAME'];
		}

		putByte(flags, out);
		putLong(options.timestamp || parseInt(Date.now() / 1000, 10), out);

		// put deflate args (extra flags)
		if (level === 1) {
			// fastest algorithm
			putByte(4, out);
		} else if (level === 9) {
			// maximum compression (fastest algorithm)
			putByte(2, out);
		} else {
			putByte(0, out);
		}

		// OS identifier
		putByte(osMap[os], out);

		if (options.name) {
			// ignore the directory part
			putString(options.name.substring(options.name.lastIndexOf('/') + 1), out);

			// terminating null
			putByte(0, out);
		}

		deflate.deflate(data, level).forEach(function (byte) {
			putByte(byte, out);
		});

		putLong(parseInt(crc32(data), 16), out);
		putLong(data.length, out);

		return out;
	}

	function unzip(data, options) {
		// start with a copy of the array
		var arr = Array.prototype.slice.call(data, 0),
			t,
			compressionMethod,
			flags,
			mtime,
			xFlags,
			key,
			os,
			crc,
			size,
			res;

		// check the first two bytes for the magic numbers
		if (readByte(arr) !== ID1 || readByte(arr) !== ID2) {
			throw 'Not a GZIP file';
		}

		t = readByte(arr);
		t = Object.keys(compressionMethods).some(function (key) {
			compressionMethod = key;
			return compressionMethods[key] === t;
		});

		if (!t) {
			throw 'Unsupported compression method';
		}

		flags = readByte(arr);
		mtime = readLong(arr);
		xFlags = readByte(arr);
		t = readByte(arr);
		Object.keys(osMap).some(function (key) {
			if (osMap[key] === t) {
				os = key;
				return true;
			}
		});

		// just throw away the bytes for now
		if (flags & possibleFlags['FEXTRA']) {
			t = readShort(arr);
			readBytes(arr, t);
		}

		// just throw away for now
		if (flags & possibleFlags['FNAME']) {
			readString(arr);
		}

		// just throw away for now
		if (flags & possibleFlags['FCOMMENT']) {
			readString(arr);
		}

		// just throw away for now
		if (flags & possibleFlags['FHCRC']) {
			readShort(arr);
		}

		if (compressionMethod === 'deflate') {
			// give deflate everything but the last 8 bytes
			// the last 8 bytes are for the CRC32 checksum and filesize
			res = deflate.inflate(arr.splice(0, arr.length - 8));
		}

		if (flags & possibleFlags['FTEXT']) {
			res = Array.prototype.map.call(res, function (byte) {
				return String.fromCharCode(byte);
			}).join('');
		}

		crc = readLong(arr);
		if (crc !== parseInt(crc32(res), 16)) {
			throw 'Checksum does not match';
		}

		size = readLong(arr);
		if (size !== res.length) {
			throw 'Size of decompressed file not correct';
		}

		return res;
	}

	module.exports = {
		zip: zip,
		unzip: unzip,
		get DEFAULT_LEVEL() {
			return DEFAULT_LEVEL;
		}
	};
}());


/***/ }),

/***/ 763:
/***/ ((module) => {

/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
module.exports = Worker;

/***/ }),

/***/ 423:
/***/ (() => {

DataView.prototype.addPosition = function (pos) {
	if (this.pos == undefined)
		this.setPosition(0);

	this.setPosition(this.getPosition() + pos)
}

DataView.prototype.setPosition = function (pos) {
	//if(pos < 0)
	//	throw "Stream read position cannot be less than 0";

	this.pos = pos;
}

DataView.prototype.getPosition = function () {
	if (this.pos == undefined)
		this.setPosition(0);

	return this.pos;
}

DataView.prototype.readFloat32 = function () { //byte
	let val = 0;
	try {
		val = this.getFloat32(this.getPosition());
	} catch (error) {
		throw error;
	}
	this.addPosition(4);
	return val;
}

DataView.prototype.readFloat64 = function () { //byte
	let val = 0;
	try {
		val = this.getFloat64(this.getPosition());
	} catch (error) {
		throw error;
	}
	this.addPosition(8);
	return val;
}

DataView.prototype.readUint8 = function () { //byte
	let val = 0;
	try {
		val = this.getUint8(this.getPosition());
	} catch (error) {
		throw error;
	}
	this.addPosition(1);
	return val;
}
DataView.prototype.readUint16 = function () { //short
	let val = 0;
	try {
		val = this.getUint16(this.getPosition());
	} catch (error) {
		throw error;
	}
	this.addPosition(2);
	return val;
}
DataView.prototype.readUint24 = function () {
	let val = 0;
	try {
		val = this.getUint24(this.getPosition());
	} catch (error) {
		throw error;
	}
	this.addPosition(3);
	return val;
}
DataView.prototype.readUint32 = function () { //int
	let val = 0;
	try {
		val = this.getUint32(this.getPosition());
	} catch (error) {
		throw error;
	}
	this.addPosition(4);
	return val;
}

DataView.prototype.readUnsignedShortSmart = function () {
	let peek = this.getUint8(this.pos) & 0xFF;
	return peek < 128 ? this.readUint8() : this.readUint16() - 0x8000;
}

DataView.prototype.readUnsignedShortSmartMinusOne = function () {
	let peek = this.getUint8(this.pos) & 0xFF;
	return peek < 128 ? this.readUint8() - 1 : this.readUint16() - 0x8001;
}

DataView.prototype.readInt8 = function () { //byte
	let val = 0;
	try {
		val = this.getInt8(this.getPosition());
	} catch (error) {
		throw error;
	}
	this.addPosition(1);
	return val;
}
DataView.prototype.readInt16 = function () { //short
	let val = 0;
	try {
		val = this.getInt16(this.getPosition());
	} catch (error) {
		throw error;
	}
	this.addPosition(2);
	return val;
}
DataView.prototype.readInt24 = function () {
	let val = 0;
	try {
		val = this.getInt24(this.getPosition());
	} catch (error) {
		throw error;
	}
	this.addPosition(3);
	return val;
}
DataView.prototype.readInt32 = function () { //int
	let val = 0;
	try {
		val = this.getInt32(this.getPosition());
	} catch (error) {
		throw error;
	}
	this.addPosition(4);
	return val;
}
DataView.prototype.readShortSmart = function () {
	let peek = this.getUint8(this.pos) & 0xFF;
	return peek < 128 ? this.readUint8() - 64 : this.readUint16() - 0xc000;
}


DataView.prototype.readBigSmart = function () {
	let peek = this.getUint8(this.pos);
	if (peek >= 0) {
		return this.readUint16() & 0xFFFF;
	} else {
		return this.readInt32() & 0x7fffffff;
	}
}

DataView.prototype.readBigSmart2 = function () {
	let peek = this.getUint8(this.pos);
	if (peek < 0) {
		return this.readInt32() & 0x7fffffff; // and off sign bit
	}
	let value = this.readUint16();
	return value == 32767 ? -1 : value;
}

DataView.prototype.readString = function () {
	let val = this.getString(this.getPosition());
	this.addPosition(val.length + 1);
	return val;
}

DataView.prototype.getUint24 = function (pos) {
	return (this.getUint16(pos) << 8) | this.getUint8(pos + 2);
}

DataView.prototype.getInt24 = function (pos) {
	return (this.getInt16(pos) << 8) | this.getInt8(pos + 2);
}

//this method should never be used directly 
//but if required to use it then remember to do stringLength+1 for the last null character
DataView.prototype.getString = function (pos) {
	let string = "";
	let character;
	while (character != 0) {
		character = this.getUint8(pos);
		pos += 1;
		string += String.fromCharCode(character)
	}

	return string.substring(0, string.length - 1);
}

/***/ }),

/***/ 984:
/***/ (() => {

/* (ignored) */

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".osrscachereader.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			179: 0,
/******/ 			291: 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "ConfigType": () => (/* reexport */ cacheTypes_ConfigType),
  "IndexType": () => (/* reexport */ cacheTypes_IndexType),
  "Matrix": () => (/* reexport */ Matrix),
  "RSCache": () => (/* reexport */ RSCache)
});

// EXTERNAL MODULE: ./src/cacheReader/helpers/DataView.js
var helpers_DataView = __webpack_require__(423);
;// CONCATENATED MODULE: ./src/cacheReader/cacheTypes/anim/MatrixTest.js
class class419 {
    constructor(var1, var2, var3) {
        this.field3733 = var1;
        this.field3731 = var2;
        this.field3734 = var3;
    }

    method2178() {
        return Math.sqrt(this.field3731 * this.field3731 + this.field3733 * this.field3733 + this.field3734 * this.field3734);
    }
}

class Matrix {
    matrixVals = new Array(16);
    field3744 = 100;


    static field3746 = new Array(0);
    static field3745;
    static field3747;
    static field3746 = new Array(100);
    static field3745 = 0;
    static field3747 = new Matrix();


    constructor(var1, var2) {
        if (var1 == undefined && var2 == undefined) {
            this.method2193();
        } else if (var2 == undefined) {
            this.copy(var1);
        } else {
            this.method2198(var1, var2);
        }
    }

    method2200() {
        //release pooling
    }

    method2198(var1, var2) {
        if (var2) {
            let var3 = new class422();
            let var6 = var1.readInt16();
            var6 &= 16383;
            let var5 = ((var6 / 16384.0) * 6.283185307179586);
            var3.method2203(var5);
            let var9 = var1.readInt16();
            var9 &= 16383;
            let var8 = (6.283185307179586 * (double)(var9 / 16384.0));
            var3.method2204(var8);
            let var12 = var1.readInt16();
            var12 &= 16383;
            let var11 = (6.283185307179586 * (var12 / 16384.0));
            var3.method2205(var11);
            var3.method2206(var1.readInt16(), var1.readInt16(), var1.readInt16());
            this.method2201(var3);
        } else {
            for (let var13 = 0; var13 < 16; ++var13) {
                this.matrixVals[var13] = var1.readFloat32();
            }
        }

    }

    method2185() {
        let var1 = new float[3];
        if (this.matrixVals[2] < 0.999 && this.matrixVals[2] > -0.999) {
            var1[1] = (-Math.asin(this.matrixVals[2]));
            let var2 = Math.cos(var1[1]);
            var1[0] = Math.atan2(this.matrixVals[6] / var2, this.matrixVals[10] / var2);
            var1[2] = Math.atan2(this.matrixVals[1] / var2, this.matrixVals[0] / var2);
        } else {
            var1[0] = 0.0;
            var1[1] = Math.atan2(this.matrixVals[2], 0.0);
            var1[2] = Math.atan2((-this.matrixVals[9]), this.matrixVals[5]);
        }

        return var1;
    }

    method2195() {
        let var1 = [(-Math.asin(this.matrixVals[6])), 0.0, 0.0];
        let var2 = Math.cos(var1[0]);
        let var4;
        let var6;
        if (Math.abs(var2) > 0.005) {
            var4 = this.matrixVals[2];
            var6 = this.matrixVals[10];
            let var8 = this.matrixVals[4];
            let var10 = this.matrixVals[5];
            var1[1] = Math.atan2(var4, var6);
            var1[2] = Math.atan2(var8, var10);
        } else {
            var4 = this.matrixVals[1];
            var6 = this.matrixVals[0];
            if (this.matrixVals[6] < 0.0) {
                var1[1] = Math.atan2(var4, var6);
            } else {
                var1[1] = (-Math.atan2(var4, var6));
            }

            var1[2] = 0.0;
        }

        return var1;
    }

    method2193() {
        this.matrixVals[0] = 1.0;
        this.matrixVals[1] = 0.0;
        this.matrixVals[2] = 0.0;
        this.matrixVals[3] = 0.0;
        this.matrixVals[4] = 0.0;
        this.matrixVals[5] = 1.0;
        this.matrixVals[6] = 0.0;
        this.matrixVals[7] = 0.0;
        this.matrixVals[8] = 0.0;
        this.matrixVals[9] = 0.0;
        this.matrixVals[10] = 1.0;
        this.matrixVals[11] = 0.0;
        this.matrixVals[12] = 0.0;
        this.matrixVals[13] = 0.0;
        this.matrixVals[14] = 0.0;
        this.matrixVals[15] = 1.0;
    }

    method2196() {
        this.matrixVals[0] = 0.0;
        this.matrixVals[1] = 0.0;
        this.matrixVals[2] = 0.0;
        this.matrixVals[3] = 0.0;
        this.matrixVals[4] = 0.0;
        this.matrixVals[5] = 0.0;
        this.matrixVals[6] = 0.0;
        this.matrixVals[7] = 0.0;
        this.matrixVals[8] = 0.0;
        this.matrixVals[9] = 0.0;
        this.matrixVals[10] = 0.0;
        this.matrixVals[11] = 0.0;
        this.matrixVals[12] = 0.0;
        this.matrixVals[13] = 0.0;
        this.matrixVals[14] = 0.0;
        this.matrixVals[15] = 0.0;
    }

    copy(otherMatrix) {
        if (otherMatrix == undefined) {
            debugger;
        }
        for (let i = 0; i < 16; i++) {
            this.matrixVals[i] = otherMatrix.matrixVals[i];
        }
    }

    method2187(var1) {
        this.method2186(var1, var1, var1);
    }

    method2186(var1, var2, var3) {
        this.method2193();
        this.matrixVals[0] = var1;
        this.matrixVals[5] = var2;
        this.matrixVals[10] = var3;
    }

    method2199(var1) {
        for (let var2 = 0; var2 < this.matrixVals.length; ++var2) {
            this.matrixVals[var2] += var1.matrixVals[var2];
        }

    }

    method2189(var1) {
        let var2 = this.matrixVals[1] * var1.matrixVals[4] + this.matrixVals[0] * var1.matrixVals[0] + this.matrixVals[2] * var1.matrixVals[8] + this.matrixVals[3] * var1.matrixVals[12];
        let var3 = this.matrixVals[3] * var1.matrixVals[13] + this.matrixVals[2] * var1.matrixVals[9] + this.matrixVals[1] * var1.matrixVals[5] + var1.matrixVals[1] * this.matrixVals[0];
        let var4 = var1.matrixVals[10] * this.matrixVals[2] + var1.matrixVals[2] * this.matrixVals[0] + var1.matrixVals[6] * this.matrixVals[1] + this.matrixVals[3] * var1.matrixVals[14];
        let var5 = var1.matrixVals[7] * this.matrixVals[1] + var1.matrixVals[3] * this.matrixVals[0] + this.matrixVals[2] * var1.matrixVals[11] + var1.matrixVals[15] * this.matrixVals[3];
        let var6 = this.matrixVals[7] * var1.matrixVals[12] + this.matrixVals[6] * var1.matrixVals[8] + this.matrixVals[4] * var1.matrixVals[0] + this.matrixVals[5] * var1.matrixVals[4];
        let var7 = this.matrixVals[7] * var1.matrixVals[13] + var1.matrixVals[9] * this.matrixVals[6] + this.matrixVals[5] * var1.matrixVals[5] + var1.matrixVals[1] * this.matrixVals[4];
        let var8 = this.matrixVals[6] * var1.matrixVals[10] + this.matrixVals[5] * var1.matrixVals[6] + this.matrixVals[4] * var1.matrixVals[2] + var1.matrixVals[14] * this.matrixVals[7];
        let var9 = var1.matrixVals[15] * this.matrixVals[7] + this.matrixVals[4] * var1.matrixVals[3] + var1.matrixVals[7] * this.matrixVals[5] + this.matrixVals[6] * var1.matrixVals[11];
        let var10 = var1.matrixVals[12] * this.matrixVals[11] + var1.matrixVals[0] * this.matrixVals[8] + this.matrixVals[9] * var1.matrixVals[4] + this.matrixVals[10] * var1.matrixVals[8];
        let var11 = var1.matrixVals[13] * this.matrixVals[11] + var1.matrixVals[9] * this.matrixVals[10] + var1.matrixVals[5] * this.matrixVals[9] + var1.matrixVals[1] * this.matrixVals[8];
        let var12 = this.matrixVals[11] * var1.matrixVals[14] + var1.matrixVals[10] * this.matrixVals[10] + this.matrixVals[8] * var1.matrixVals[2] + var1.matrixVals[6] * this.matrixVals[9];
        let var13 = var1.matrixVals[11] * this.matrixVals[10] + var1.matrixVals[7] * this.matrixVals[9] + this.matrixVals[8] * var1.matrixVals[3] + var1.matrixVals[15] * this.matrixVals[11];
        let var14 = this.matrixVals[15] * var1.matrixVals[12] + this.matrixVals[13] * var1.matrixVals[4] + var1.matrixVals[0] * this.matrixVals[12] + this.matrixVals[14] * var1.matrixVals[8];
        let var15 = this.matrixVals[14] * var1.matrixVals[9] + this.matrixVals[12] * var1.matrixVals[1] + var1.matrixVals[5] * this.matrixVals[13] + var1.matrixVals[13] * this.matrixVals[15];
        let var16 = this.matrixVals[14] * var1.matrixVals[10] + var1.matrixVals[6] * this.matrixVals[13] + this.matrixVals[12] * var1.matrixVals[2] + this.matrixVals[15] * var1.matrixVals[14];
        let var17 = var1.matrixVals[15] * this.matrixVals[15] + this.matrixVals[14] * var1.matrixVals[11] + this.matrixVals[13] * var1.matrixVals[7] + this.matrixVals[12] * var1.matrixVals[3];
        this.matrixVals[0] = var2;
        this.matrixVals[1] = var3;
        this.matrixVals[2] = var4;
        this.matrixVals[3] = var5;
        this.matrixVals[4] = var6;
        this.matrixVals[5] = var7;
        this.matrixVals[6] = var8;
        this.matrixVals[7] = var9;
        this.matrixVals[8] = var10;
        this.matrixVals[9] = var11;
        this.matrixVals[10] = var12;
        this.matrixVals[11] = var13;
        this.matrixVals[12] = var14;
        this.matrixVals[13] = var15;
        this.matrixVals[14] = var16;
        this.matrixVals[15] = var17;
    }

    method2190(var1) {
        let var2 = var1.field3738 * var1.field3738;
        let var3 = var1.field3738 * var1.field3737;
        let var4 = var1.field3739 * var1.field3738;
        let var5 = var1.field3740 * var1.field3738;
        let var6 = var1.field3737 * var1.field3737;
        let var7 = var1.field3739 * var1.field3737;
        let var8 = var1.field3737 * var1.field3740;
        let var9 = var1.field3739 * var1.field3739;
        let var10 = var1.field3740 * var1.field3739;
        let var11 = var1.field3740 * var1.field3740;
        this.matrixVals[0] = var6 + var2 - var11 - var9;
        this.matrixVals[1] = var7 + var7 + var5 + var5;
        this.matrixVals[2] = var8 - var4 - var4 + var8;
        this.matrixVals[4] = var7 + (var7 - var5 - var5);
        this.matrixVals[5] = var9 + var2 - var6 - var11;
        this.matrixVals[6] = var3 + var3 + var10 + var10;
        this.matrixVals[8] = var8 + var8 + var4 + var4;
        this.matrixVals[9] = var10 + (var10 - var3 - var3);
        this.matrixVals[10] = var11 + var2 - var9 - var6;
    }

    method2201(var1) {
        this.matrixVals[0] = var1.field3754;
        this.matrixVals[1] = var1.field3759;
        this.matrixVals[2] = var1.field3750;
        this.matrixVals[3] = 0.;
        this.matrixVals[4] = var1.field3751;
        this.matrixVals[5] = var1.field3752;
        this.matrixVals[6] = var1.field3753;
        this.matrixVals[7] = 0.0;
        this.matrixVals[8] = var1.field3748;
        this.matrixVals[9] = var1.field3755;
        this.matrixVals[10] = var1.field3756;
        this.matrixVals[11] = 0.0;
        this.matrixVals[12] = var1.field3757;
        this.matrixVals[13] = var1.field3749;
        this.matrixVals[14] = var1.field3758;
        this.matrixVals[15] = 1.0;
    }

    method2191() {
        return this.matrixVals[12] * this.matrixVals[3] * this.matrixVals[6] * this.matrixVals[9] + (this.matrixVals[10] * this.matrixVals[3] * this.matrixVals[4] * this.matrixVals[13] + (this.matrixVals[1] * this.matrixVals[6] * this.matrixVals[8] * this.matrixVals[15] + this.matrixVals[5] * this.matrixVals[0] * this.matrixVals[10] * this.matrixVals[15] - this.matrixVals[5] * this.matrixVals[0] * this.matrixVals[11] * this.matrixVals[14] - this.matrixVals[0] * this.matrixVals[6] * this.matrixVals[9] * this.matrixVals[15] + this.matrixVals[6] * this.matrixVals[0] * this.matrixVals[11] * this.matrixVals[13] + this.matrixVals[14] * this.matrixVals[9] * this.matrixVals[7] * this.matrixVals[0] - this.matrixVals[10] * this.matrixVals[7] * this.matrixVals[0] * this.matrixVals[13] - this.matrixVals[10] * this.matrixVals[1] * this.matrixVals[4] * this.matrixVals[15] + this.matrixVals[14] * this.matrixVals[4] * this.matrixVals[1] * this.matrixVals[11] - this.matrixVals[12] * this.matrixVals[11] * this.matrixVals[6] * this.matrixVals[1] - this.matrixVals[7] * this.matrixVals[1] * this.matrixVals[8] * this.matrixVals[14] + this.matrixVals[12] * this.matrixVals[7] * this.matrixVals[1] * this.matrixVals[10] + this.matrixVals[9] * this.matrixVals[4] * this.matrixVals[2] * this.matrixVals[15] - this.matrixVals[13] * this.matrixVals[4] * this.matrixVals[2] * this.matrixVals[11] - this.matrixVals[15] * this.matrixVals[5] * this.matrixVals[2] * this.matrixVals[8] + this.matrixVals[2] * this.matrixVals[5] * this.matrixVals[11] * this.matrixVals[12] + this.matrixVals[13] * this.matrixVals[8] * this.matrixVals[7] * this.matrixVals[2] - this.matrixVals[9] * this.matrixVals[7] * this.matrixVals[2] * this.matrixVals[12] - this.matrixVals[14] * this.matrixVals[3] * this.matrixVals[4] * this.matrixVals[9]) + this.matrixVals[14] * this.matrixVals[8] * this.matrixVals[5] * this.matrixVals[3] - this.matrixVals[5] * this.matrixVals[3] * this.matrixVals[10] * this.matrixVals[12] - this.matrixVals[3] * this.matrixVals[6] * this.matrixVals[8] * this.matrixVals[13]);
    }

    method2192() {
        let var1 = 1.0 / this.method2191();
        let var2 = var1 * (this.matrixVals[14] * this.matrixVals[9] * this.matrixVals[7] + this.matrixVals[13] * this.matrixVals[6] * this.matrixVals[11] + (this.matrixVals[10] * this.matrixVals[5] * this.matrixVals[15] - this.matrixVals[11] * this.matrixVals[5] * this.matrixVals[14] - this.matrixVals[15] * this.matrixVals[9] * this.matrixVals[6]) - this.matrixVals[13] * this.matrixVals[7] * this.matrixVals[10]);
        let var3 = var1 * (this.matrixVals[3] * this.matrixVals[10] * this.matrixVals[13] + (this.matrixVals[15] * -this.matrixVals[1] * this.matrixVals[10] + this.matrixVals[14] * this.matrixVals[11] * this.matrixVals[1] + this.matrixVals[15] * this.matrixVals[9] * this.matrixVals[2] - this.matrixVals[13] * this.matrixVals[2] * this.matrixVals[11] - this.matrixVals[3] * this.matrixVals[9] * this.matrixVals[14]));
        let var4 = var1 * (this.matrixVals[2] * this.matrixVals[7] * this.matrixVals[13] + (this.matrixVals[15] * this.matrixVals[6] * this.matrixVals[1] - this.matrixVals[1] * this.matrixVals[7] * this.matrixVals[14] - this.matrixVals[5] * this.matrixVals[2] * this.matrixVals[15]) + this.matrixVals[3] * this.matrixVals[5] * this.matrixVals[14] - this.matrixVals[13] * this.matrixVals[3] * this.matrixVals[6]);
        let var5 = (this.matrixVals[6] * -this.matrixVals[1] * this.matrixVals[11] + this.matrixVals[10] * this.matrixVals[1] * this.matrixVals[7] + this.matrixVals[11] * this.matrixVals[2] * this.matrixVals[5] - this.matrixVals[2] * this.matrixVals[7] * this.matrixVals[9] - this.matrixVals[10] * this.matrixVals[3] * this.matrixVals[5] + this.matrixVals[9] * this.matrixVals[3] * this.matrixVals[6]) * var1;
        let var6 = var1 * (this.matrixVals[12] * this.matrixVals[7] * this.matrixVals[10] + (this.matrixVals[14] * this.matrixVals[4] * this.matrixVals[11] + -this.matrixVals[4] * this.matrixVals[10] * this.matrixVals[15] + this.matrixVals[8] * this.matrixVals[6] * this.matrixVals[15] - this.matrixVals[12] * this.matrixVals[11] * this.matrixVals[6] - this.matrixVals[7] * this.matrixVals[8] * this.matrixVals[14]));
        let var7 = (this.matrixVals[12] * this.matrixVals[2] * this.matrixVals[11] + (this.matrixVals[15] * this.matrixVals[0] * this.matrixVals[10] - this.matrixVals[14] * this.matrixVals[11] * this.matrixVals[0] - this.matrixVals[8] * this.matrixVals[2] * this.matrixVals[15]) + this.matrixVals[14] * this.matrixVals[3] * this.matrixVals[8] - this.matrixVals[12] * this.matrixVals[10] * this.matrixVals[3]) * var1;
        let var8 = (this.matrixVals[4] * this.matrixVals[2] * this.matrixVals[15] + this.matrixVals[15] * this.matrixVals[6] * -this.matrixVals[0] + this.matrixVals[14] * this.matrixVals[0] * this.matrixVals[7] - this.matrixVals[2] * this.matrixVals[7] * this.matrixVals[12] - this.matrixVals[14] * this.matrixVals[4] * this.matrixVals[3] + this.matrixVals[6] * this.matrixVals[3] * this.matrixVals[12]) * var1;
        let var9 = var1 * (this.matrixVals[11] * this.matrixVals[0] * this.matrixVals[6] - this.matrixVals[10] * this.matrixVals[0] * this.matrixVals[7] - this.matrixVals[11] * this.matrixVals[4] * this.matrixVals[2] + this.matrixVals[7] * this.matrixVals[2] * this.matrixVals[8] + this.matrixVals[3] * this.matrixVals[4] * this.matrixVals[10] - this.matrixVals[8] * this.matrixVals[3] * this.matrixVals[6]);
        let var10 = (this.matrixVals[13] * this.matrixVals[8] * this.matrixVals[7] + this.matrixVals[15] * this.matrixVals[9] * this.matrixVals[4] - this.matrixVals[4] * this.matrixVals[11] * this.matrixVals[13] - this.matrixVals[5] * this.matrixVals[8] * this.matrixVals[15] + this.matrixVals[12] * this.matrixVals[11] * this.matrixVals[5] - this.matrixVals[7] * this.matrixVals[9] * this.matrixVals[12]) * var1;
        let var11 = (-this.matrixVals[0] * this.matrixVals[9] * this.matrixVals[15] + this.matrixVals[13] * this.matrixVals[11] * this.matrixVals[0] + this.matrixVals[8] * this.matrixVals[1] * this.matrixVals[15] - this.matrixVals[11] * this.matrixVals[1] * this.matrixVals[12] - this.matrixVals[8] * this.matrixVals[3] * this.matrixVals[13] + this.matrixVals[12] * this.matrixVals[9] * this.matrixVals[3]) * var1;
        let var12 = (this.matrixVals[3] * this.matrixVals[4] * this.matrixVals[13] + this.matrixVals[1] * this.matrixVals[7] * this.matrixVals[12] + (this.matrixVals[0] * this.matrixVals[5] * this.matrixVals[15] - this.matrixVals[13] * this.matrixVals[0] * this.matrixVals[7] - this.matrixVals[4] * this.matrixVals[1] * this.matrixVals[15]) - this.matrixVals[3] * this.matrixVals[5] * this.matrixVals[12]) * var1;
        let var13 = var1 * (this.matrixVals[0] * this.matrixVals[7] * this.matrixVals[9] + -this.matrixVals[0] * this.matrixVals[5] * this.matrixVals[11] + this.matrixVals[11] * this.matrixVals[1] * this.matrixVals[4] - this.matrixVals[8] * this.matrixVals[7] * this.matrixVals[1] - this.matrixVals[9] * this.matrixVals[3] * this.matrixVals[4] + this.matrixVals[8] * this.matrixVals[3] * this.matrixVals[5]);
        let var14 = var1 * (this.matrixVals[12] * this.matrixVals[9] * this.matrixVals[6] + (this.matrixVals[14] * this.matrixVals[9] * -this.matrixVals[4] + this.matrixVals[4] * this.matrixVals[10] * this.matrixVals[13] + this.matrixVals[14] * this.matrixVals[8] * this.matrixVals[5] - this.matrixVals[5] * this.matrixVals[10] * this.matrixVals[12] - this.matrixVals[6] * this.matrixVals[8] * this.matrixVals[13]));
        let var15 = var1 * (this.matrixVals[2] * this.matrixVals[8] * this.matrixVals[13] + this.matrixVals[12] * this.matrixVals[1] * this.matrixVals[10] + (this.matrixVals[14] * this.matrixVals[9] * this.matrixVals[0] - this.matrixVals[10] * this.matrixVals[0] * this.matrixVals[13] - this.matrixVals[1] * this.matrixVals[8] * this.matrixVals[14]) - this.matrixVals[2] * this.matrixVals[9] * this.matrixVals[12]);
        let var16 = (this.matrixVals[5] * this.matrixVals[2] * this.matrixVals[12] + (this.matrixVals[4] * this.matrixVals[1] * this.matrixVals[14] + -this.matrixVals[0] * this.matrixVals[5] * this.matrixVals[14] + this.matrixVals[13] * this.matrixVals[6] * this.matrixVals[0] - this.matrixVals[12] * this.matrixVals[1] * this.matrixVals[6] - this.matrixVals[4] * this.matrixVals[2] * this.matrixVals[13])) * var1;
        let var17 = var1 * (this.matrixVals[9] * this.matrixVals[4] * this.matrixVals[2] + this.matrixVals[8] * this.matrixVals[1] * this.matrixVals[6] + (this.matrixVals[5] * this.matrixVals[0] * this.matrixVals[10] - this.matrixVals[9] * this.matrixVals[0] * this.matrixVals[6] - this.matrixVals[10] * this.matrixVals[1] * this.matrixVals[4]) - this.matrixVals[5] * this.matrixVals[2] * this.matrixVals[8]);
        this.matrixVals[0] = var2;
        this.matrixVals[1] = var3;
        this.matrixVals[2] = var4;
        this.matrixVals[3] = var5;
        this.matrixVals[4] = var6;
        this.matrixVals[5] = var7;
        this.matrixVals[6] = var8;
        this.matrixVals[7] = var9;
        this.matrixVals[8] = var10;
        this.matrixVals[9] = var11;
        this.matrixVals[10] = var12;
        this.matrixVals[11] = var13;
        this.matrixVals[12] = var14;
        this.matrixVals[13] = var15;
        this.matrixVals[14] = var16;
        this.matrixVals[15] = var17;
    }

    method2194() {
        let var1 = new Array(3);
        let var2 = new class419(this.matrixVals[0], this.matrixVals[1], this.matrixVals[2]);
        let var3 = new class419(this.matrixVals[4], this.matrixVals[5], this.matrixVals[6]);
        let var4 = new class419(this.matrixVals[8], this.matrixVals[9], this.matrixVals[10]);
        var1[0] = var2.method2178();
        var1[1] = var3.method2178();
        var1[2] = var4.method2178();
        return var1;
    }


    toString() {
        let var1 = new StringBuilder();
        this.method2195();
        this.method2185();

        for (let var2 = 0; var2 < 4; ++var2) {
            for (let var3 = 0; var3 < 4; ++var3) {
                if (var3 > 0) {
                    var1.append("\t");
                }

                let var4 = this.matrixVals[var3 + var2 * 4];
                if (Math.sqrt((var4 * var4)) < 9.999999747378752E-5) {
                    var4 = 0.0;
                }

                var1.append(var4);
            }

            var1.append("\n");
        }

        return var1.toString();
    }

    hashCode() {
        let var1 = true;
        let var2 = 1;
        let var3 = var2 * 31 + Arrays.hashCode(this.matrixVals);
        return var3;
    }


    equals(var1) {
        if (!(var1 instanceof Matrix)) {
            return false;
        } else {
            let var2 = var1;

            for (let var3 = 0; var3 < 16; ++var3) {
                if (this.matrixVals[var3] != var2.matrixVals[var3]) {
                    return false;
                }
            }

            return true;
        }
    }

}

;// CONCATENATED MODULE: ./src/cacheReader/cacheTypes/anim/Bone.js


class Bone {
    field1181 = true;
    field1172 = true;
    field1178 = new Matrix();
    field1180 = new Matrix()
    field1174 = new Matrix();

    constructor(size, buffer, var3) {
        this.id = buffer.readInt16();
        this.field1175 = new Array(size);
        this.field1176 = new Array(size);
        this.field1177 = new Array(size);
        this.field1187 = new Array(size);

        for (let var4 = 0; var4 < size; ++var4) {
            this.field1175[var4] = new Matrix(buffer, var3);

            this.field1187[var4] = new Array(3);
            this.field1187[var4][0] = buffer.readFloat32();
            this.field1187[var4][1] = buffer.readFloat32();
            this.field1187[var4][2] = buffer.readFloat32();

            //this.field1187[var4][0] = buffer.readInt32();
            //this.field1187[var4][1] = buffer.readInt32();
            //this.field1187[var4][2] = buffer.readInt32();
            //console.log(this.field1187[var4][0].toString(2));
            //console.log(this.field1187[var4][1].toString(2));
            //console.log(this.field1187[var4][2].toString(2));
        }
        this.method682();
        //console.log(boneValues);
    }

    method682() {
        this.field1183 = new Array(this.field1175.length).fill().map(x => new Array(3));
        this.field1184 = new Array(this.field1175.length).fill().map(x => new Array(3));
        this.field1185 = new Array(this.field1175.length).fill().map(x => new Array(3));
        let var2 = Matrix.field3746;
        let var1 = new Matrix();

        let var7 = var1;

        for (let var5 = 0; var5 < this.field1175.length; ++var5) {
            let var4 = this.method683(var5);
            var7.copy(var4);
            var7.method2192();
            this.field1183[var5] = var7.method2195();
            this.field1184[var5][0] = var4.matrixVals[12];
            this.field1184[var5][1] = var4.matrixVals[13];
            this.field1184[var5][2] = var4.matrixVals[14];
            this.field1185[var5] = var4.method2194();
        }

        var7.method2200();
    }

    method683(var1) {
        return this.field1175[var1];
    }

    method684(var1) {
        if (this.field1176[var1] == null) {
            this.field1176[var1] = new Matrix(this.method683(var1));
            if (this.field1182 != null) {
                this.field1176[var1].method2189(this.field1182.method684(var1));
            } else {
                this.field1176[var1].method2189(Matrix.field3747);
            }
        }

        return this.field1176[var1];
    }


    method685(var1) {
        if (this.field1177[var1] == null || this.field1177[var1] == undefined) {
            this.field1177[var1] = new Matrix(this.method684(var1));
            this.field1177[var1].method2192();
        }

        return this.field1177[var1];
    }

    method691(var1) {
        this.field1178.copy(var1);
        this.field1172 = true;
        this.field1181 = true;
    }

    method681() {
        return this.field1178;
    }

    method686() {
        if (this.field1172) {
            this.field1180.copy(this.method681());
            if (this.field1182 != null) {
                this.field1180.method2189(this.field1182.method686());
            }

            this.field1172 = false;
        }

        return this.field1180;
    }

    method687(var1) {
        if (this.field1181) {
            this.field1174.copy(this.method685(var1));
            this.field1174.method2189(this.method686());
            this.field1181 = false;
        }

        return this.field1174;
    }

    method688(var1) {
        return this.field1183[var1];
    }

    method689(var1) {
        return this.field1184[var1];
    }

    method690(var1) {
        return this.field1185[var1];
    }

}
;// CONCATENATED MODULE: ./src/cacheReader/loaders/FramemapLoader.js


class FramemapDefinition {

}

class AnimayaSkeleton {
    constructor(var1, bonesCount) {
        this.bones = new Array(bonesCount);
        this.field1979 = var1.readUint8();

        for (let i = 0; i < this.bones.length; ++i) {
            this.bones[i] = new Bone(this.field1979, var1, false);
        }

        this.attachBones();
    }

    attachBones() {
        let bones = this.bones;

        for (let i = 0; i < bones.length; ++i) {
            let bone = bones[i];
            if (bone.id >= 0) {
                bone.childBone = this.bones[bone.id];
            }
        }

        this.method1178();
    }

    method1178() {
        let var1 = this.bones;

        for (let var2 = 0; var2 < var1.length; ++var2) {
            let var3 = var1[var2];
            if (var3.id >= 0) {
                var3.field1182 = this.bones[var3.id];
            }
        }

    }

    getBone(index) {
        return index >= this.bones.length ? null : this.bones[index];
    }

    getAllBones() {
        return this.bones;
    }
}


class class418 {
    constructor() {
        this.field3780 = 0.0;
        this.field3790 = 0.0;
        this.field3789 = 0.0;
        this.field3788 = 0.0;
        this.field3787 = 0.0;
        this.field3786 = 0.0;
        this.field3783 = 0.0;
        this.field3782 = 0.0;
        this.field3781 = 0.0;
        this.field3791 = 1.0;
        this.field3784 = 1.0;
        this.field3785 = 1.0;
    }
}

class FramemapLoader {

    load(bytes, id) {
        let def = new FramemapDefinition();
        def.id = id;
        let dataview = new DataView(bytes.buffer);
        def.length = dataview.readUint8();
        def.types = [];
        def.frameMaps = [];

        for (let i = 0; i < def.length; ++i) {
            def.types[i] = dataview.readUint8();
        }

        for (let i = 0; i < def.length; ++i) {
            def.frameMaps[i] = new Array(dataview.readUint8());
        }

        for (let i = 0; i < def.length; ++i) {
            for (let j = 0; j < def.frameMaps[i].length; ++j) {
                def.frameMaps[i][j] = dataview.readUint8();
            }
        }

        if (dataview.getPosition() < dataview.byteLength) {
            let var4 = dataview.readUint16();
            if (var4 > 0) {
                //console.log(id);
                def.animayaSkeleton = new AnimayaSkeleton(dataview, var4);
                //console.log(dataview);
            }
        }
        return def;
    }
}
;// CONCATENATED MODULE: ./src/cacheReader/cacheTypes/anim/Static.js
class AttackOption {
    static method590(var0, var1) {
        if (var0 != null && var0.method703() != 0) {
            if (var1 < var0.field1203[0].field1165) {
                return var0.field1201 == 0 ? var0.field1203[0].field1158 : class181.method922(var0, var1, true);
            } else if (var1 > var0.field1203[var0.method703() - 1].field1165) {
                return var0.field1214 == 0 ? var0.field1203[var0.method703() - 1].field1158 : class181.method922(var0, var1, false);
            } else if (var0.field1200) {
                return var0.field1203[0].field1158;
            } else {
                let var2 = var0.method702(var1);
                let var3 = false;
                let var4 = false;
                if (var2 == null) {
                    return 0.0;
                } else {
                    if (var2.field1161 == 0.0 && var2.field1162 == 0.0) {
                        var3 = true;
                    } else if (var2.field1161 == 3.4028234663852886e+38 && 3.4028234663852886e+38 == var2.field1162) {
                        var4 = true;
                    } else if (var2.field1163 != null) {
                        if (var0.field1215) {
                            let var5 = var2.field1165;
                            let var9 = var2.field1158;
                            let var6 = var2.field1161 * 0.33333334 + var5;
                            let var10 = var9 + var2.field1162 * 0.33333334;
                            let var8 = var2.field1163.field1165;
                            let var12 = var2.field1163.field1158;
                            let var7 = var8 - var2.field1163.field1159 * 0.33333334;
                            let var11 = var12 - var2.field1163.field1160 * 0.33333334;
                            if (var0.field1210) {
                                class145.method767(var0, var5, var6, var7, var8, var9, var10, var11, var12);
                            } else {
                                class136.method735(var0, var5, var6, var7, var8, var9, var10, var11, var12);
                            }

                            var0.field1215 = false;
                        }
                    } else {
                        var3 = true;
                    }

                    if (var3) {
                        return var2.field1158;
                    } else if (var4) {
                        return var2.field1165 != var1 && var2.field1163 != null ? var2.field1163.field1158 : var2.field1158;
                    } else {
                        return var0.field1210 ? Tiles.method453(var0, var1) : class467.method2360(var0, var1);
                    }
                }
            }
        } else {
            return 0.0;
        }
    }
}

class class467 {
    static method2360(var0, var1) {
        if (var0 == null) {
            return 0.0;
        } else {
            let var2 = var1 - var0.field1207;
            return var0.field1202 + var2 * (var2 * (var2 * var0.field1223 + var0.field1208) + var0.field1209);
        }
    }
}

class class181 {
    static method922(var0, var1, var2) {
        let var3 = 0.0;
        if (var0 != null && var0.method703() != 0) {
            let var4 = var0.field1203[0].field1165;
            let var5 = var0.field1203[var0.method703() - 1].field1165;
            let var6 = var5 - var4;
            if (0.0 == var6) {
                return var0.field1203[0].field1158;
            } else {
                let var7 = 0.0;
                if (var1 > var5) {
                    var7 = (var1 - var5) / var6;
                } else {
                    var7 = (var1 - var4) / var6;
                }

                let var8 = (var7);
                let var10 = Math.abs((float)(var7 - var8));
                let var11 = var10 * var6;
                var8 = Math.abs(var8 + 1.0);
                let var12 = var8 / 2.0;
                let var14 = (var12);
                var10 = (var12 - var14);
                let var16;
                let var17;
                if (var2) {
                    if (var0.field1201 == class125.field1190) {
                        if (var10 != 0.0) {
                            var11 += var4;
                        } else {
                            var11 = var5 - var11;
                        }
                    } else if (var0.field1201 != class125.field1189 && var0.field1201 != class125.field1188) {
                        if (var0.field1201 == class125.field1193) {
                            var11 = var4 - var1;
                            var16 = var0.field1203[0].field1159;
                            var17 = var0.field1203[0].field1160;
                            var3 = var0.field1203[0].field1158;
                            if (var16 != 0.0) {
                                var3 -= var11 * var17 / var16;
                            }

                            return var3;
                        }
                    } else {
                        var11 = var5 - var11;
                    }
                } else if (var0.field1214 == class125.field1190) {
                    if (0.0 != var10) {
                        var11 = var5 - var11;
                    } else {
                        var11 += var4;
                    }
                } else if (var0.field1214 != class125.field1189 && var0.field1214 != class125.field1188) {
                    if (var0.field1214 == class125.field1193) {
                        var11 = var1 - var5;
                        var16 = var0.field1203[var0.method703() - 1].field1161;
                        var17 = var0.field1203[var0.method703() - 1].field1162;
                        var3 = var0.field1203[var0.method703() - 1].field1158;
                        if (0.0 != var16) {
                            var3 += var11 * var17 / var16;
                        }

                        return var3;
                    }
                } else {
                    var11 += var4;
                }

                var3 = AttackOption.method590(var0, var11);
                let var18;
                if (var2 && var0.field1201 == class125.field1188) {
                    var18 = var0.field1203[var0.method703() - 1].field1158 - var0.field1203[0].field1158;
                    var3 = (var3 - var8 * var18);
                } else if (!var2 && var0.field1214 == class125.field1188) {
                    var18 = var0.field1203[var0.method703() - 1].field1158 - var0.field1203[0].field1158;
                    var3 = (var3 + var8 * var18);
                }

                return var3;
            }
        } else {
            return var3;
        }
    }
}

class class145 {
    static method767(var0, var1, var2, var3, var4, var5, var6, var7, var8) {
        if (var0 != null) {
            let var9 = var4 - var1;
            if (0.0 != var9) {
                let var10 = var2 - var1;
                let var11 = var3 - var1;
                let var12 = [var10 / var9, var11 / var9];
                var0.field1221 = var12[0] == 0.33333334 && 0.6666667 == var12[1];
                let var13 = var12[0];
                let var14 = var12[1];
                if (var12[0] < 0.0) {
                    var12[0] = 0.0;
                }

                if (var12[1] > 1.0) {
                    var12[1] = 1.0;
                }

                let var15;
                if (var12[0] > 1.0 || var12[1] < -1.0) {
                    var12[1] = 1.0 - var12[1];
                    if (var12[0] < 0.0) {
                        var12[0] = 0.0;
                    }

                    if (var12[1] < 0.0) {
                        var12[1] = 0.0;
                    }

                    if (var12[0] > 1.0 || var12[1] > 1.0) {
                        var15 = (1.0 + var12[1] * (var12[1] - 2.0) + (var12[0] * (var12[1] + (var12[0] - 2.0))));
                        if (var15 + class123.field1167 > 0.0) {
                            Client.method384(var12);
                        }
                    }

                    var12[1] = 1.0 - var12[1];
                }

                let var10000;
                if (var13 != var12[0]) {
                    var10000 = var1 + var9 * var12[0];
                    if (0.0 != var13) {
                        var6 = var5 + var12[0] * (var6 - var5) / var13;
                    }
                }

                if (var12[1] != var14) {
                    var10000 = var1 + var12[1] * var9;
                    if (1.0 != var14) {
                        var7 = (var8 - (var8 - var7) * (1.0 - var12[1]) / (1.0 - var14));
                    }
                }

                var0.field1207 = var1;
                var0.field1206 = var4;
                var15 = var12[0];
                let var16 = var12[1];
                let var17 = var15 - 0.0;
                let var18 = var16 - var15;
                let var19 = 1.0 - var16;
                let var20 = var18 - var17;
                var0.field1202 = var19 - var18 - var20;
                var0.field1209 = var20 + var20 + var20;
                var0.field1208 = var17 + var17 + var17;
                var0.field1223 = 0.0;
                DesktopPlatformInfoProvider.method2241(var5, var6, var7, var8, var0);
            }
        }
    }

}

class class123 {
    static field1167 = 1.1920929E-7;
    static field1166;
    static field1168 = [];
    static field1169 = [];
    static field1166 = class123.field1167 * 2;
    static field1168 = [];
    static field1169 = [];
}

class Client {
    method384(var0) {
        if (class123.field1167 + var0[0] < 1.3333334) {
            let var1 = var0[0] - 2.0;
            let var2 = var0[0] - 1.0;
            let var3 = Math.sqrt((double)(var1 * var1 - var2 * var2 * 4.0));
            let var4 = 0.5 * (var3 + -var1);
            if (var0[1] + class123.field1167 > var4) {
                var0[1] = var4 - class123.field1167;
            } else {
                var4 = (-var1 - var3) * 0.5;
                if (var0[1] < var4 + class123.field1167) {
                    var0[1] = var4 + class123.field1167;
                }
            }
        } else {
            var0[0] = 1.3333334 - class123.field1167;
            var0[1] = 0.33333334 - class123.field1167;
        }

    }
}

class DesktopPlatformInfoProvider {
    static method2241(var0, var1, var2, var3, var4) {
        let var5 = var1 - var0;
        let var6 = var2 - var1;
        let var7 = var3 - var2;
        let var8 = var6 - var5;
        var4.field1222 = var7 - var6 - var8;
        var4.field1213 = var8 + var8 + var8;
        var4.field1212 = var5 + var5 + var5;
        var4.field1211 = var0;
    }
}

class class136 {
    static method735(var0, var1, var2, var3, var4, var5, var6, var7, var8) {
        if (var0 != null) {
            var0.field1207 = var1;
            let var9 = var4 - var1;
            let var10 = var8 - var5;
            let var11 = var2 - var1;
            let var12 = 0.0;
            let var13 = 0.0;
            if (var11 != 0.0) {
                var12 = (var6 - var5) / var11;
            }

            var11 = var4 - var3;
            if (0.0 != var11) {
                var13 = (var8 - var7) / var11;
            }

            let var14 = 1.0 / (var9 * var9);
            let var15 = var9 * var12;
            let var16 = var13 * var9;
            var0.field1223 = (var16 + var15 - var10 - var10) * var14 / var9;
            var0.field1208 = (var10 + var10 + var10 - var15 - var15 - var16) * var14;
            var0.field1209 = var12;
            var0.field1202 = var5;
        }
    }
}

class Tiles {
    static method453(var0, var1) {
        if (var0 == null) {
            return 0.0;
        } else {
            let var2;
            if (var0.field1207 == var1) {
                var2 = 0.0;
            } else if (var0.field1206 == var1) {
                var2 = 1.0;
            } else {
                var2 = (var1 - var0.field1207) / (var0.field1206 - var0.field1207);
            }

            let var3;
            if (var0.field1221) {
                var3 = var2;
            } else {
                class123.field1168[3] = var0.field1202;
                class123.field1168[2] = var0.field1209;
                class123.field1168[1] = var0.field1208;
                class123.field1168[0] = var0.field1223 - var2;
                class123.field1169[0] = 0.0;
                class123.field1169[1] = 0.0;
                class123.field1169[2] = 0.0;
                class123.field1169[3] = 0.0;
                class123.field1169[4] = 0.0;
                let var4 = class368.method1942(class123.field1168, 3, 0.0, true, 1.0, true, class123.field1169);
                if (var4 == 1) {
                    var3 = class123.field1169[0];
                } else {
                    var3 = 0.0;
                }
            }

            return var0.field1211 + (var0.field1212 + (var3 * var0.field1222 + var0.field1213) * var3) * var3;
        }
    }
}

class class368 {
    static method1942(var0, var1, var2, var3, var4, var5, var6) {
        let var7 = 0.0;

        for (let var8 = 0; var8 < var1 + 1; ++var8) {
            var7 += Math.abs(var0[var8]);
        }

        let var24 = (Math.abs(var2) + Math.abs(var4)) * (float)(var1 + 1) * class123.field1167;
        if (var7 <= var24) {
            return -1;
        } else {
            let var9 = new Array(var1 + 1);

            let var10;
            for (var10 = 0; var10 < var1 + 1; ++var10) {
                var9[var10] = var0[var10] * (1.0 / var7);
            }

            while (Math.abs(var9[var1]) < var24) {
                --var1;
            }

            var10 = 0;
            if (var1 == 0) {
                return var10;
            } else if (var1 == 1) {
                var6[0] = -var9[0] / var9[1];
                let var11 = var3 ? var2 < var24 + var6[0] : var2 < var6[0] - var24;
                let var12 = var5 ? var4 > var6[0] - var24 : var4 > var24 + var6[0];
                var10 = var11 && var12 ? 1 : 0;
                if (var10 > 0) {
                    if (var3 && var6[0] < var2) {
                        var6[0] = var2;
                    } else if (var5 && var6[0] > var4) {
                        var6[0] = var4;
                    }
                }

                return var10;
            } else {
                let var21 = new class423(var9, var1);
                let var22 = new Array(var1 + 1);

                for (let var13 = 1; var13 <= var1; ++var13) {
                    var22[var13 - 1] = var13 * var9[var13];
                }

                let var23 = new Array(var1 + 1);
                let var14 = this.method1942(var22, var1 - 1, var2, false, var4, false, var23);
                if (var14 == -1) {
                    return 0;
                } else {
                    let var15 = false;
                    let var17 = 0.0;
                    let var18 = 0.0;
                    let var19 = 0.0;

                    for (let var20 = 0; var20 <= var14; ++var20) {
                        if (var10 > var1) {
                            return var10;
                        }

                        let var16;
                        if (var20 == 0) {
                            var16 = var2;
                            var18 = class102.method598(var9, var1, var2);
                            if (Math.abs(var18) <= var24 && var3) {
                                var6[var10++] = var2;
                            }
                        } else {
                            var16 = var19;
                            var18 = var17;
                        }

                        if (var20 == var14) {
                            var19 = var4;
                            var15 = false;
                        } else {
                            var19 = var23[var20];
                        }

                        var17 = class102.method598(var9, var1, var19);
                        if (var15) {
                            var15 = false;
                        } else if (Math.abs(var17) < var24) {
                            if (var14 != var20 || var5) {
                                var6[var10++] = var19;
                                var15 = true;
                            }
                        } else if (var18 < 0.0 && var17 > 0.0 || var18 > 0.0 && var17 < 0.0) {
                            var6[var10++] = class88.method478(var21, var16, var19, 0.0);
                            if (var10 > 1 && var6[var10 - 2] >= var6[var10 - 1] - var24) {
                                var6[var10 - 2] = (var6[var10 - 2] + var6[var10 - 1]) * 0.5;
                                --var10;
                            }
                        }
                    }

                    return var10;
                }
            }
        }
    }
}

class class102 {
    static method598(var0, var1, var2) {
        let var3 = var0[var1];

        for (let var4 = var1 - 1; var4 >= 0; --var4) {
            var3 = var0[var4] + var3 * var2;
        }

        return var3;
    }
}

class class188 {
    static method478(var0, var1, var2, var3) {
        let var4 = class102.method598(var0.field3760, var0.field3761, var1);
        if (Math.abs(var4) < class123.field1167) {
            return var1;
        } else {
            let var5 = class102.method598(var0.field3760, var0.field3761, var2);
            if (Math.abs(var5) < class123.field1167) {
                return var2;
            } else {
                let var6 = 0.0;
                let var7 = 0.0;
                let var8 = 0.0;
                let var13 = 0.0;
                let var14 = true;
                let var15 = false;

                do {
                    var15 = false;
                    if (var14) {
                        var6 = var1;
                        var13 = var4;
                        var7 = var2 - var1;
                        var8 = var7;
                        var14 = false;
                    }

                    if (Math.abs(var13) < Math.abs(var5)) {
                        var1 = var2;
                        var2 = var6;
                        var6 = var1;
                        var4 = var5;
                        var5 = var13;
                        var13 = var4;
                    }

                    let var16 = class123.field1166 * Math.abs(var2) + var3 * 0.5;
                    let var17 = (var6 - var2) * 0.5;
                    let var18 = Math.abs(var17) > var16 && 0.0 != var5;
                    if (var18) {
                        if (Math.abs(var8) >= var16 && Math.abs(var4) > Math.abs(var5)) {
                            let var12 = var5 / var4;
                            let var9;
                            let var10;
                            if (var1 == var6) {
                                var9 = var17 * 2.0 * var12;
                                var10 = 1.0 - var12;
                            } else {
                                var10 = var4 / var13;
                                let var11 = var5 / var13;
                                var9 = (var17 * 2.0 * var10 * (var10 - var11) - (var2 - var1) * (var11 - 1.0)) * var12;
                                var10 = (var10 - 1.0) * (var11 - 1.0) * (var12 - 1.0);
                            }

                            if (var9 > 0.0) {
                                var10 = -var10;
                            } else {
                                var9 = -var9;
                            }

                            var12 = var8;
                            var8 = var7;
                            if (var9 * 2.0 < var10 * var17 * 3.0 - Math.abs(var16 * var10) && var9 < Math.abs(var10 * var12 * 0.5)) {
                                var7 = var9 / var10;
                            } else {
                                var7 = var17;
                                var8 = var17;
                            }
                        } else {
                            var7 = var17;
                            var8 = var17;
                        }

                        var1 = var2;
                        var4 = var5;
                        if (Math.abs(var7) > var16) {
                            var2 += var7;
                        } else if (var17 > 0.0) {
                            var2 += var16;
                        } else {
                            var2 -= var16;
                        }

                        var5 = class102.method598(var0.field3760, var0.field3761, var2);
                        if ((var5 * (var13 / Math.abs(var13))) > 0.0) {
                            var14 = true;
                            var15 = true;
                        } else {
                            var15 = true;
                        }
                    }
                } while (var15);

                return var2;
            }
        }
    }
}
;// CONCATENATED MODULE: ./src/cacheReader/loaders/AnimayaLoader.js




class class122 {
    field1165;
    field1158;
    field1159 = 3.4028234663852886e+38; //Java Float MAX_VALUE
    field1160 = 3.4028234663852886e+38;
    field1161 = 3.4028234663852886e+38;
    field1162 = 3.4028234663852886e+38;

    method673(var1, var2) {
        this.field1165 = var1.readInt16();
        this.field1158 = var1.readFloat32();
        this.field1159 = var1.readFloat32();
        this.field1160 = var1.readFloat32();
        this.field1161 = var1.readFloat32();
        this.field1162 = var1.readFloat32();
    }
}

class class127 {
    field1215 = true;
    field1205 = 0;

    method698(var1, var2) {
        let var3 = var1.readUint16();
        var1.readUint8();
        this.field1201 = var1.readUint8(); //rsordinal
        this.field1214 = var1.readUint8(); //rsordinal
        this.field1210 = var1.readUint8() != 0;
        this.field1203 = new Array(var3);
        let var4 = null;

        for (let var5 = 0; var5 < var3; ++var5) {
            let var6 = new class122();
            var6.method673(var1, var2);
            this.field1203[var5] = var6;
            if (var4 != null) {
                var4.field1163 = var6;
            }

            var4 = var6;
        }

        return var3;
    }

    method702(var1) {
        let var2 = this.method706(var1);
        return var2 >= 0 && var2 < this.field1203.length ? this.field1203[var2] : null;
    }

    method705() {
        this.field1218 = this.field1203[0].field1165;
        this.field1219 = this.field1203[this.method703() - 1].field1165;
        this.field1217 = new Array(this.method701() + 1).fill(0);

        for (let var1 = this.method704(); var1 <= this.method700(); ++var1) {
            this.field1217[var1 - this.method704()] = AttackOption.method590(this, var1);
        }

        this.field1203 = null;
        this.field1220 = AttackOption.method590(this, this.method704() - 1);
        this.field1216 = AttackOption.method590(this, this.method700() + 1);
    }

    method699(var1) {
        if (var1 < this.method704()) {
            return this.field1220;
        } else {
            return var1 > this.method700() ? this.field1216 : this.field1217[var1 - this.method704()];
        }
    }

    method706(var1) {
        if (this.field1205 < 0 || this.field1203[this.field1205].field1165 > var1 || this.field1203[this.field1205].field1163 != null && this.field1203[this.field1205].field1163.field1165 <= var1) {
            if (var1 >= this.method704() && var1 <= this.method700()) {
                let var2 = this.method703();
                let var3 = this.field1205;
                if (var2 > 0) {
                    let var4 = 0;
                    let var5 = var2 - 1;

                    do {
                        let var6 = var4 + var5 >> 1;
                        if (var1 < this.field1203[var6].field1165) {
                            if (var1 > this.field1203[var6 - 1].field1165) {
                                var3 = var6 - 1;
                                break;
                            }

                            var5 = var6 - 1;
                        } else {
                            if (var1 <= this.field1203[var6].field1165) {
                                var3 = var6;
                                break;
                            }

                            if (var1 < this.field1203[var6 + 1].field1165) {
                                var3 = var6;
                                break;
                            }

                            var4 = var6 + 1;
                        }
                    } while (var4 <= var5);
                }

                if (var3 != this.field1205) {
                    this.field1205 = var3;
                    this.field1215 = true;
                }

                return this.field1205;
            } else {
                return -1;
            }
        } else {
            return this.field1205;
        }
    }

    method700() {
        return this.field1219;
    }

    method701() {
        return this.method700() - this.method704();
    }

    method703() {
        return this.field1203 == null ? 0 : this.field1203.length;
    }

    method704() {
        return this.field1218;
    }

}

class AnimayaDefinition {

}

class class129 {
    static values = [
        [0, 0, null, -1, -1],
        [1, 1, null, 0, 2],
        [2, 2, null, 1, 2],
        [3, 3, null, 2, 2],
        [4, 4, null, 3, 1],
        [5, 5, null, 4, 1],
        [6, 6, null, 5, 1],
        [7, 7, null, 6, 3],
        [8, 8, null, 7, 3],
        [9, 9, null, 8, 3],
        [10, 10, null, 0, 7],
        [11, 11, null, 1, 7],
        [12, 12, null, 2, 7],
        [13, 13, null, 3, 7],
        [14, 14, null, 4, 7],
        [15, 15, null, 5, 7],
        [16, 16, null, 0, 5],
    ];
    static findEnumerated(val) {
        let foundValue = this.values.find(x => x[1] == val);
        if (foundValue == undefined) {
            foundValue = this.values[0];
        }

        return new this(foundValue[0], foundValue[1], foundValue[2], foundValue[3], foundValue[5]);
    }

    constructor(var1, var2, var3, var4, var5) {
        this.field1253 = var1;
        this.field1251 = var2;
        this.field1252 = var4;
    }

    method711() {
        return this.field1252;
    }
}

class class128 {
    static values = [
        [0, 0, null, 0],
        [1, 1, null, 9],
        [2, 2, null, 3],
        [3, 3, null, 6],
        [4, 4, null, 1],
        [5, 5, null, 3],
    ];
    static findEnumerated(val) {
        let foundValue = this.values.find(x => x[1] == val);
        if (foundValue == undefined) {
            foundValue = this.values[0];
        }

        return new this(foundValue[0], foundValue[1], foundValue[2], foundValue[3], foundValue[5]);
    }

    constructor(var1, var2, var3, var4) {
        this.field1230 = var1;
        this.field1224 = var2;
        this.field1232 = var4;
    }

    method707() {
        return this.field1232;
    }
}

class AnimayaLoader {

    load(def, bytes, cache, options) {
        let dataview = new DataView(bytes.buffer);

        def.version = dataview.readUint8();
        def.skeletonId = dataview.readUint16();
        if(options.earlyStop) {
            return def;
        }
        //console.log(version, skeletonId, "TEST");
        return cache.getFile(cacheTypes_IndexType.FRAMEMAPS.id, def.skeletonId).then((framemap) => {
            framemap = framemap.def;

            dataview.readUint16();
            dataview.readUint16();
            def.field1257 = dataview.readUint8();
            let var3 = dataview.readUint16();
            def.field1265 = new Array(framemap.animayaSkeleton.bones.length);
            def.field1258 = new Array(framemap.length);
            let var4 = new Array(var3);

            let var5;
            let var7;
            let tasks = []; //osrs uses some pool or something
            for (var5 = 0; var5 < var3; ++var5) {
                let var6 = class128.findEnumerated(dataview.readUint8());
                var7 = dataview.readShortSmart();
                let var8 = class129.findEnumerated(dataview.readUint8());

                let var9 = new class127();
                var9.method698(dataview, def.version);
                let var10 = var6.method707();

                let var11;

                if (var6.field1230 == 1) { // var6 == class128.field1234
                    var11 = def.field1265;
                } else {
                    var11 = def.field1258;
                }

                if (var11[var7] == null) {
                    var11[var7] = new Array(var10);
                }

                if (var6.field1230 == 4) { // var6 == class128.field1228
                    def.field1259 = true;
                }

                tasks.push({ var9, var6, var8, var7 });
            }

            tasks.forEach(task => {
                task.var9.method705();

                let var1;
                if (task.var6.field1230 == 1) { //var8 == class128.field1234
                    var1 = def.field1265;
                } else {
                    var1 = def.field1258;
                }

                var1[task.var7][task.var8.method711()] = task.var9;
            });
            for (var5 = 0; var5 < var3; ++var5) {

            }

            def.framemap = framemap;
            return def;
        });
    }
}
;// CONCATENATED MODULE: ./src/cacheReader/loaders/FramesLoader.js




class class420 {
    constructor() {
        this.method2179();
    }

    method2179() {
        this.field3740 = 0.0;
        this.field3739 = 0.0;
        this.field3737 = 0.0;
        this.field3738 = 1.0;
    }

    method2181(var1, var2, var3, var4) {
        let var5 = Math.sin(var4 * 0.5);
        let var6 = Math.cos(var4 * 0.5);
        this.field3737 = var1 * var5;
        this.field3739 = var2 * var5;
        this.field3740 = var5 * var3;
        this.field3738 = var6;
    }

    method2180(var1) {
        this.method2182(this.field3740 * var1.field3739 + this.field3738 * var1.field3737 + this.field3737 * var1.field3738 - var1.field3740 * this.field3739, this.field3738 * var1.field3739 + (var1.field3738 * this.field3739 - this.field3740 * var1.field3737) + this.field3737 * var1.field3740, this.field3739 * var1.field3737 + this.field3740 * var1.field3738 - var1.field3739 * this.field3737 + var1.field3740 * this.field3738, this.field3738 * var1.field3738 - var1.field3737 * this.field3737 - this.field3739 * var1.field3739 - this.field3740 * var1.field3740);
     }

     method2182(var1, var2, var3, var4) {
        this.field3737 = var1;
        this.field3739 = var2;
        this.field3740 = var3;
        this.field3738 = var4;
    }


}

class FramesDefinition {
    method727(var1, var2, var3) {
        let var5 = new Matrix();

        this.method728(var5, var3, var2, var1);
        this.method726(var5, var3, var2, var1);
        this.method730(var5, var3, var2, var1);
        //console.log(var2.id, var5);

        var2.method691(var5);
        //var5.method2200(); //release back into pooling system?
    }

    method728(var1, var2, var3, var4) {
        let var5 = var3.method688(this.field1257);
        let var6 = var5[0];
        let var7 = var5[1];
        let var8 = var5[2];

        if (this.field1265[var2] != null) {
            let var9 = this.field1265[var2][0];
            let var10 = this.field1265[var2][1];
            let var11 = this.field1265[var2][2];
            if (var9 != null) {
                var6 = var9.method699(var4);
            }

            if (var10 != null) {
                var7 = var10.method699(var4);
            }

            if (var11 != null) {
                var8 = var11.method699(var4);
            }
        }
        
        let var17 = new class420();
        var17.method2181(1.0, 0.0, 0.0, var6);
        
        let var18 = new class420();
        var18.method2181(0.0, 1.0, 0.0, var7);
        
        let var19 = new class420();
        var19.method2181(0.0, 0.0, 1.0, var8);
        
        let var12 = new class420();

        var12.method2180(var19);
        var12.method2180(var17);
        var12.method2180(var18);

        let var13 = new Matrix();

        var13.method2190(var12);
        var1.method2189(var13);
        /*
        var25.method2170();
        var27.method2170();
        var13.method2170();
        var15.method2170();
        var17.method2200();
        */
    }


    method730(var1, var2, var3, var4) {
        let var5 = var3.method689(this.field1257);
        let var6 = var5[0];
        let var7 = var5[1];
        let var8 = var5[2];
        if (this.field1265[var2] != null) {
            let var9 = this.field1265[var2][3];
            let var10 = this.field1265[var2][4];
            let var11 = this.field1265[var2][5];
            if (var9 != null) {
                var6 = var9.method699(var4);
            }

            if (var10 != null) {
                var7 = var10.method699(var4);
            }

            if (var11 != null) {
                var8 = var11.method699(var4);
            }
        }

        var1.matrixVals[12] = var6;
        var1.matrixVals[13] = var7;
        var1.matrixVals[14] = var8;
    }

    method726(var1, var2, var3, var4) {
        let var5 = var3.method690(this.field1257);
        let var6 = var5[0];
        let var7 = var5[1];
        let var8 = var5[2];
        if (this.field1265[var2] != null) {
            let var9 = this.field1265[var2][6];
            let var10 = this.field1265[var2][7];
            let var11 = this.field1265[var2][8];
            if (var9 != null) {
                var6 = var9.method699(var4);
            }

            if (var10 != null) {
                var7 = var10.method699(var4);
            }

            if (var11 != null) {
                var8 = var11.method699(var4);
            }
        }

        let var15 = new Matrix();
        var15.method2186(var6, var7, var8);
        var1.method2189(var15);
        //var15.method2200();
    }
}

class FramesLoader {

    load(bytes, id, cache, options) {
        let def = new FramesDefinition();
        def.id = id;
        let inview = new DataView(bytes.buffer);
        let dataview = new DataView(bytes.buffer);

        let framemapArchiveIndex = inview.readUint16();
        let length = inview.readUint8();
        
        if (options.isAnimaya) {
            def = new AnimayaLoader().load(def, bytes, cache, options);
            return def;
        }

        dataview.setPosition(3 + length);

        def.indexFrameIds = [];
        def.translator_x = [];
        def.translator_y = [];
        def.translator_z = [];

        let lastI = -1;
        let index = 0;
        //return this.def;
        return cache.getFile(cacheTypes_IndexType.FRAMEMAPS.id, framemapArchiveIndex).then((framemap) => {

            def.framemap = framemap.def;

            for (let i = 0; i < length; ++i) {
                let var9 = inview.readUint8();

                if (var9 <= 0) {
                    continue;
                }

                if (def.framemap.types[i] != 0) {
                    for (let var10 = i - 1; var10 > lastI; --var10) {
                        if (def.framemap.types[var10] == 0) {
                            def.indexFrameIds[index] = var10;
                            def.translator_x[index] = 0;
                            def.translator_y[index] = 0;
                            def.translator_z[index] = 0;
                            ++index;
                            break;
                        }
                    }
                }

                def.indexFrameIds[index] = i;
                let var11 = 0;
                if (def.framemap.types[i] == 3) {
                    var11 = 128;
                }

                if ((var9 & 1) != 0) {
                    def.translator_x[index] = dataview.readShortSmart();
                }
                else {
                    def.translator_x[index] = var11;
                }

                if ((var9 & 2) != 0) {
                    def.translator_y[index] = dataview.readShortSmart();
                }
                else {
                    def.translator_y[index] = var11;
                }

                if ((var9 & 4) != 0) {
                    def.translator_z[index] = dataview.readShortSmart();
                }
                else {
                    def.translator_z[index] = var11;
                }

                lastI = i;
                ++index;
                if (def.framemap.types[i] == 5) {
                    def.showing = true;
                }
            }

            return def;
        });


    }


}
;// CONCATENATED MODULE: ./src/cacheReader/loaders/MapLoader.js
class MapDefinition {

}
class LocationDefinition {

}
class EmptyMapDefinition {

}
class MapLoader {

    /*
    for(let i=0;i<32768;i++){
        let x = i >> 8;
        let y = i & 0xFF;
        if(hash("l"+x+"_"+y) == hashVal){
            console.log("l"+x+"_"+y);
            break;
        }
        if(hash("m"+x+"_"+y) == hashVal){
            console.log("m"+x+"_"+y);
            break;
        }
    }
    */
    hash(str) {
        let h = 0;
        for (let i = 0; i < str.length; i++) {
            h = h * 31 + str.charCodeAt(i);
        }
        return (new Int32Array([h]))[0];
    }



    load(bytes, id, rscache) {
        if (bytes == undefined) return new MapDefinition();
        let x, y;
        let mapInfo = rscache.cacheRequester.xteas[id];
        //if there is xteas then its a location def
        if (mapInfo != undefined) {
            x = mapInfo.mapsquare >> 8;
            y = mapInfo.mapsquare & 0xFF;
            return this.loadLocationDef(bytes, id, x, y);
        } else {
            let hashVal = rscache.indicies[5].archives[id].nameHash;
            for (let i = 0; i < 32768; i++) {
                let x = i >> 8;
                let y = i & 0xFF;

                //no xteas and its a terrain map
                if (this.hash("m" + x + "_" + y) == hashVal) {
                    return this.loadMapDef(bytes, id, x, y);
                } //no xteas and its a location def
                if (this.hash("l" + x + "_" + y) == hashVal) {
                    //not much we can do here without xteas
                    return new LocationDefinition();
                }

            }
        }

        //no other case matched
        return new EmptyMapDefinition();
    }
    loadLocationDef(bytes, defId, x, y) {
        let def = new LocationDefinition();
        def.id = defId;
        def.regionX = x;
        def.regionY = y;
        def.locations = [];
        let dataview = new DataView(bytes.buffer);

        let id = -1;
		let idOffset;

		while ((idOffset = buf.readUnsignedIntSmartShortCompat()) != 0)
		{
			id += idOffset;

			let position = 0;
			let positionOffset;

			while ((positionOffset = buf.readUnsignedShortSmart()) != 0)
			{
				position += positionOffset - 1;

				let localY = position & 0x3F;
				let localX = position >> 6 & 0x3F;
				let height = position >> 12 & 0x3;

				let attributes = buf.readUnsignedByte();
				let type = attributes >> 2;
				let orientation = attributes & 0x3;

				def.locations.push({id, type, orientation, position: {localX, localY, height}});
			}
		}

        return def;
    }

    loadMapDef(bytes, defId, x, y) {
        let X = 64;
        let Y = 64;
        let Z = 4;
        let def = new MapDefinition();
        def.id = defId;
        def.regionX = x;
        def.regionY = y;
        let dataview = new DataView(bytes.buffer);

        def.tiles = [];

        for (let z = 0; z < Z; z++) {
            def.tiles[z] = [];
            for (let x = 0; x < X; x++) {
                def.tiles[z][x] = [];
                for (let y = 0; y < Y; y++) {
                    def.tiles[z][x][y] = {};
                    let tile = def.tiles[z][x][y];
                    while (true) {
                        let attribute = dataview.readUint16();
                        if (attribute == 0) {
                            break;
                        }
                        else if (attribute == 1) {
                            tile.height = dataview.readUint8();
                            break;
                        }
                        else if (attribute <= 49) {
                            tile.attrOpcode = attribute;
                            tile.overlayId = dataview.readInt16();
                            tile.overlayPath = ((attribute - 2) / 4);
                            tile.overlayRotation = (attribute - 2 & 3);
                        }
                        else if (attribute <= 81) {
                            tile.settings = (attribute - 49);
                        }
                        else {
                            tile.underlayId = (attribute - 81);
                        }
                    }

                }
            }
        }

        return def;
    }

}
;// CONCATENATED MODULE: ./src/cacheReader/loaders/ModelLoader.js
class ModelDefinition {

}

class ModelLoader {

	load(bytes, id) {
		let def = new ModelDefinition();
		def.id = id;
		let dataview = new DataView(bytes.buffer);
		if (dataview.getInt8(dataview.byteLength - 1) == -3 && dataview.getInt8(dataview.byteLength - 2) == -1) {
			this.load3(def, dataview);
		}
		else if (dataview.getInt8(dataview.byteLength - 1) == -2 && dataview.getInt8(dataview.byteLength - 2) == -1) {
			this.load2(def, dataview);
		}
		else if (dataview.getInt8(dataview.byteLength - 1) == -1 && dataview.getInt8(dataview.byteLength - 2) == -1) {
			this.load1(def, dataview);
		}
		else {
			this.loadOriginal(def, dataview);
		}

		this.computeNormals2(def);
		this.computeTextureUVCoordinates(def);
		this.computeAnimationTables(def);

		return def;
	}

	load3(def, var1) {
		let var2 = new DataView(var1.buffer);
		let var3 = new DataView(var1.buffer);
		let var4 = new DataView(var1.buffer);
		let var5 = new DataView(var1.buffer);
		let var6 = new DataView(var1.buffer);
		let var7 = new DataView(var1.buffer);
		let var8 = new DataView(var1.buffer);
		var2.setPosition(var1.byteLength - 26);
		let var9 = var2.readUint16();
		let var10 = var2.readUint16();
		let var11 = var2.readUint8();
		let var12 = var2.readUint8();
		let var13 = var2.readUint8();
		let var14 = var2.readUint8();
		let var15 = var2.readUint8();
		let var16 = var2.readUint8();
		let var17 = var2.readUint8();
		let var18 = var2.readUint8();
		let var19 = var2.readUint16();
		let var20 = var2.readUint16();
		let var21 = var2.readUint16();
		let var22 = var2.readUint16();
		let var23 = var2.readUint16();
		let var24 = var2.readUint16();
		let var25 = 0;
		let var26 = 0;
		let var27 = 0;
		let var28;
		if (var11 > 0)
		{
			def.textureRenderTypes = [];
			var2.setPosition(0);

			for (var28 = 0; var28 < var11; ++var28)
			{
				let var29 = def.textureRenderTypes[var28] = var2.readInt8();
				if (var29 == 0)
				{
					++var25;
				}

				if (var29 >= 1 && var29 <= 3)
				{
					++var26;
				}

				if (var29 == 2)
				{
					++var27;
				}
			}
		}

		var28 = var11 + var9;
		let var58 = var28;
		if (var12 == 1)
		{
			var28 += var10;
		}

		let var30 = var28;
		var28 += var10;
		let var31 = var28;
		if (var13 == 255)
		{
			var28 += var10;
		}

		let var32 = var28;
		if (var15 == 1)
		{
			var28 += var10;
		}

		let var33 = var28;
		var28 += var24;
		let var34 = var28;
		if (var14 == 1)
		{
			var28 += var10;
		}

		let var35 = var28;
		var28 += var22;
		let var36 = var28;
		if (var16 == 1)
		{
			var28 += var10 * 2;
		}

		let var37 = var28;
		var28 += var23;
		let var38 = var28;
		var28 += var10 * 2;
		let var39 = var28;
		var28 += var19;
		let var40 = var28;
		var28 += var20;
		let var41 = var28;
		var28 += var21;
		let var42 = var28;
		var28 += var25 * 6;
		let var43 = var28;
		var28 += var26 * 6;
		let var44 = var28;
		var28 += var26 * 6;
		let var45 = var28;
		var28 += var26 * 2;
		let var46 = var28;
		var28 += var26;
		let var47 = var28;
		var28 = var28 + var26 * 2 + var27 * 2;
		def.vertexCount = var9;
		def.faceCount = var10;
		def.numTextureFaces = var11;
		def.vertexPositionsX = [];
		def.vertexPositionsY = [];
		def.vertexPositionsZ = [];
		def.faceVertexIndices1 = [];
		def.faceVertexIndices2 = [];
		def.faceVertexIndices3 = [];
		if (var17 == 1)
		{
			def.vertexSkins = [];
		}

		if (var12 == 1)
		{
			def.faceRenderTypes = [];
		}

		if (var13 == 255)
		{
			def.faceRenderPriorities = [];
		}
		else
		{
			def.priority = var13;
		}

		if (var14 == 1)
		{
			def.faceAlphas = [];
		}

		if (var15 == 1)
		{
			def.faceSkins = [];
		}

		if (var16 == 1)
		{
			def.faceTextures = [];
		}

		if (var16 == 1 && var11 > 0)
		{
			def.textureCoords = new Array(var10).fill(0);
		}

		if (var18 == 1)
		{
			//def.animayaGroups = new int[var9][];
			//def.animayaScales = new int[var9][];
			def.animayaGroups = new Array(var9);
			def.animayaScales = new Array(var9);
		}

		def.faceColors = [];
		if (var11 > 0)
		{
			def.texIndices1 = [];
			def.texIndices2 = [];
			def.texIndices3 = [];
		}

		var2.setPosition(var11);
		var3.setPosition(var39);
		var4.setPosition(var40);
		var5.setPosition(var41);
		var6.setPosition(var33);
		let var48 = 0;
		let var49 = 0;
		let var50 = 0;

		let var51;
		let var52;
		let var53;
		let var54;
		let var55;
		for (var51 = 0; var51 < var9; ++var51)
		{
			var52 = var2.readUint8();
			var53 = 0;
			if ((var52 & 1) != 0)
			{
				var53 = var3.readShortSmart();
			}

			var54 = 0;
			if ((var52 & 2) != 0)
			{
				var54 = var4.readShortSmart();
			}

			var55 = 0;
			if ((var52 & 4) != 0)
			{
				var55 = var5.readShortSmart();
			}

			def.vertexPositionsX[var51] = var48 + var53;
			def.vertexPositionsY[var51] = var49 + var54;
			def.vertexPositionsZ[var51] = var50 + var55;
			var48 = def.vertexPositionsX[var51];
			var49 = def.vertexPositionsY[var51];
			var50 = def.vertexPositionsZ[var51];
			if (var17 == 1)
			{
				def.vertexSkins[var51] = var6.readUint8();
			}
		}

		if (var18 == 1)
		{
			for (var51 = 0; var51 < var9; ++var51)
			{
				var52 = var6.readUint8();
				def.animayaGroups[var51] = [];
				def.animayaScales[var51] = [];

				for (var53 = 0; var53 < var52; ++var53)
				{
					def.animayaGroups[var51][var53] = var6.readUint8();
					def.animayaScales[var51][var53] = var6.readUint8();
				}
			}
		}

		var2.setPosition(var38);
		var3.setPosition(var58);
		var4.setPosition(var31);
		var5.setPosition(var34);
		var6.setPosition(var32);
		var7.setPosition(var36);
		var8.setPosition(var37);

		for (var51 = 0; var51 < var10; ++var51)
		{
			def.faceColors[var51] = var2.readUint16();
			if (var12 == 1)
			{
				def.faceRenderTypes[var51] = var3.readInt8();
			}

			if (var13 == 255)
			{
				def.faceRenderPriorities[var51] = var4.readInt8();
			}

			if (var14 == 1)
			{
				def.faceAlphas[var51] = var5.readInt8();
			}

			if (var15 == 1)
			{
				def.faceSkins[var51] = var6.readUint8();
			}

			if (var16 == 1)
			{
				def.faceTextures[var51] = (var7.readUint16() - 1);
			}

			if (def.textureCoords != null && def.faceTextures[var51] != -1)
			{
				def.textureCoords[var51] = (var8.readUint8() - 1);
			}
		}

		var2.setPosition(var35);
		var3.setPosition(var30);
		var51 = 0;
		var52 = 0;
		var53 = 0;
		var54 = 0;

		let var56;
		for (var55 = 0; var55 < var10; ++var55)
		{
			var56 = var3.readUint8();
			if (var56 == 1)
			{
				var51 = var2.readShortSmart() + var54;
				var52 = var2.readShortSmart() + var51;
				var53 = var2.readShortSmart() + var52;
				var54 = var53;
				def.faceVertexIndices1[var55] = var51;
				def.faceVertexIndices2[var55] = var52;
				def.faceVertexIndices3[var55] = var53;
			}

			if (var56 == 2)
			{
				var52 = var53;
				var53 = var2.readShortSmart() + var54;
				var54 = var53;
				def.faceVertexIndices1[var55] = var51;
				def.faceVertexIndices2[var55] = var52;
				def.faceVertexIndices3[var55] = var53;
			}

			if (var56 == 3)
			{
				var51 = var53;
				var53 = var2.readShortSmart() + var54;
				var54 = var53;
				def.faceVertexIndices1[var55] = var51;
				def.faceVertexIndices2[var55] = var52;
				def.faceVertexIndices3[var55] = var53;
			}

			if (var56 == 4)
			{
				let var57 = var51;
				var51 = var52;
				var52 = var57;
				var53 = var2.readShortSmart() + var54;
				var54 = var53;
				def.faceVertexIndices1[var55] = var51;
				def.faceVertexIndices2[var55] = var57;
				def.faceVertexIndices3[var55] = var53;
			}
		}

		var2.setPosition(var42);
		var3.setPosition(var43);
		var4.setPosition(var44);
		var5.setPosition(var45);
		var6.setPosition(var46);
		var7.setPosition(var47);

		for (var55 = 0; var55 < var11; ++var55)
		{
			var56 = def.textureRenderTypes[var55] & 255;
			if (var56 == 0)
			{
				def.texIndices1[var55] = var2.readUint16();
				def.texIndices2[var55] = var2.readUint16();
				def.texIndices3[var55] = var2.readUint16();
			}
		}

		var2.setPosition(var28);
		var55 = var2.readUint8();
		if (var55 != 0)
		{
			var2.readUint16();
			var2.readUint16();
			var2.readUint16();
			var2.readInt32();
		}

	}

	load2(def, var1)
	{
		let var2 = false;
		let var3 = false;
		let var4 = new DataView(var1.buffer);
		let var5 = new DataView(var1.buffer);
		let var6 = new DataView(var1.buffer);
		let var7 = new DataView(var1.buffer);
		let var8 = new DataView(var1.buffer);
		var4.setPosition(var1.byteLength - 23);
		let var9 = var4.readUint16();
		let var10 = var4.readUint16();
		let var11 = var4.readUint8();
		let var12 = var4.readUint8();
		let var13 = var4.readUint8();
		let var14 = var4.readUint8();
		let var15 = var4.readUint8();
		let var16 = var4.readUint8();
		let var17 = var4.readUint8();
		let var18 = var4.readUint16();
		let var19 = var4.readUint16();
		let var20 = var4.readUint16();
		let var21 = var4.readUint16();
		let var22 = var4.readUint16();
		let var23 = 0;
		let var24 = var23 + var9;
		let var25 = var24;
		var24 += var10;
		let var26 = var24;
		if (var13 == 255)
		{
			var24 += var10;
		}

		let var27 = var24;
		if (var15 == 1)
		{
			var24 += var10;
		}

		let var28 = var24;
		if (var12 == 1)
		{
			var24 += var10;
		}

		let var29 = var24;
		var24 += var22;
		let var30 = var24;
		if (var14 == 1)
		{
			var24 += var10;
		}

		let var31 = var24;
		var24 += var21;
		let var32 = var24;
		var24 += var10 * 2;
		let var33 = var24;
		var24 += var11 * 6;
		let var34 = var24;
		var24 += var18;
		let var35 = var24;
		var24 += var19;
		let var10000 = var24 + var20;
		def.vertexCount = var9;
		def.faceCount = var10;
		def.numTextureFaces = var11;
		def.vertexPositionsX = [];
		def.vertexPositionsY = [];
		def.vertexPositionsZ = [];
		def.faceVertexIndices1 = [];
		def.faceVertexIndices2 = [];
		def.faceVertexIndices3 = [];
		if (var11 > 0)
		{
			def.textureRenderTypes = [];
			def.texIndices1 = [];
			def.texIndices2 = [];
			def.texIndices3 = [];
		}

		if (var16 == 1)
		{
			def.vertexSkins = [];
		}

		if (var12 == 1)
		{
			def.faceRenderTypes = [];
			def.textureCoords = [];
			def.faceTextures = [];
		}

		if (var13 == 255)
		{
			def.faceRenderPriorities = [];
		}
		else
		{
			def.priority = var13;
		}

		if (var14 == 1)
		{
			def.faceAlphas = [];
		}

		if (var15 == 1)
		{
			def.faceSkins = [];
		}

		if (var17 == 1)
		{
			//def.animayaGroups = new int[var9][];
			//def.animayaScales = new int[var9][];
			
			def.animayaGroups = [];
			def.animayaScales = [];
		}

		def.faceColors = [];
		var4.setPosition(var23);
		var5.setPosition(var34);
		var6.setPosition(var35);
		var7.setPosition(var24);
		var8.setPosition(var29);
		let var37 = 0;
		let var38 = 0;
		let var39 = 0;

		let var40;
		let var41;
		let var42;
		let var43;
		let var44;
		
		for (var40 = 0; var40 < var9; ++var40)
		{
			var41 = var4.readUint8();
			var42 = 0;
			if ((var41 & 1) != 0)
			{
				var42 = var5.readShortSmart();
			}

			var43 = 0;
			if ((var41 & 2) != 0)
			{
				var43 = var6.readShortSmart();
			}

			var44 = 0;
			if ((var41 & 4) != 0)
			{
				var44 = var7.readShortSmart();
			}

			def.vertexPositionsX[var40] = var37 + var42;
			def.vertexPositionsY[var40] = var38 + var43;
			def.vertexPositionsZ[var40] = var39 + var44;
			var37 = def.vertexPositionsX[var40];
			var38 = def.vertexPositionsY[var40];
			var39 = def.vertexPositionsZ[var40];
			if (var16 == 1)
			{
				def.vertexSkins[var40] = var8.readUint8();
			}
		}

		if (var17 == 1)
		{
			for (var40 = 0; var40 < var9; ++var40)
			{
				var41 = var8.readUint8();
				def.animayaGroups[var40] = [];
				def.animayaScales[var40] = [];

				for (var42 = 0; var42 < var41; ++var42)
				{
					def.animayaGroups[var40][var42] = var8.readUint8();
					def.animayaScales[var40][var42] = var8.readUint8();
				}
			}
		}

		var4.setPosition(var32);
		var5.setPosition(var28);
		var6.setPosition(var26);
		var7.setPosition(var30);
		var8.setPosition(var27);

		for (var40 = 0; var40 < var10; ++var40)
		{
			def.faceColors[var40] = var4.readUint16();
			if (var12 == 1)
			{
				var41 = var5.readUint8();
				if ((var41 & 1) == 1)
				{
					def.faceRenderTypes[var40] = 1;
					var2 = true;
				}
				else
				{
					def.faceRenderTypes[var40] = 0;
				}

				if ((var41 & 2) == 2)
				{
					def.textureCoords[var40] = (var41 >> 2);
					def.faceTextures[var40] = def.faceColors[var40];
					def.faceColors[var40] = 127;
					if (def.faceTextures[var40] != -1)
					{
						var3 = true;
					}
				}
				else
				{
					def.textureCoords[var40] = -1;
					def.faceTextures[var40] = -1;
				}
			}

			if (var13 == 255)
			{
				def.faceRenderPriorities[var40] = var6.readInt8();
			}

			if (var14 == 1)
			{
				def.faceAlphas[var40] = var7.readInt8();
			}

			if (var15 == 1)
			{
				def.faceSkins[var40] = var8.readUint8();
			}
		}

		var4.setPosition(var31);
		var5.setPosition(var25);
		var40 = 0;
		var41 = 0;
		var42 = 0;
		var43 = 0;

		let var45;
		let var46;
		for (var44 = 0; var44 < var10; ++var44)
		{
			var45 = var5.readUint8();
			if (var45 == 1)
			{
				var40 = var4.readShortSmart() + var43;
				var41 = var4.readShortSmart() + var40;
				var42 = var4.readShortSmart() + var41;
				var43 = var42;
				def.faceVertexIndices1[var44] = var40;
				def.faceVertexIndices2[var44] = var41;
				def.faceVertexIndices3[var44] = var42;
			}

			if (var45 == 2)
			{
				var41 = var42;
				var42 = var4.readShortSmart() + var43;
				var43 = var42;
				def.faceVertexIndices1[var44] = var40;
				def.faceVertexIndices2[var44] = var41;
				def.faceVertexIndices3[var44] = var42;
			}

			if (var45 == 3)
			{
				var40 = var42;
				var42 = var4.readShortSmart() + var43;
				var43 = var42;
				def.faceVertexIndices1[var44] = var40;
				def.faceVertexIndices2[var44] = var41;
				def.faceVertexIndices3[var44] = var42;
			}

			if (var45 == 4)
			{
				var46 = var40;
				var40 = var41;
				var41 = var46;
				var42 = var4.readShortSmart() + var43;
				var43 = var42;
				def.faceVertexIndices1[var44] = var40;
				def.faceVertexIndices2[var44] = var46;
				def.faceVertexIndices3[var44] = var42;
			}
		}

		var4.setPosition(var33);

		for (var44 = 0; var44 < var11; ++var44)
		{
			def.textureRenderTypes[var44] = 0;
			def.texIndices1[var44] = var4.readUint16();
			def.texIndices2[var44] = var4.readUint16();
			def.texIndices3[var44] = var4.readUint16();
		}

		if (def.textureCoords != null)
		{
			let var47 = false;

			for (var45 = 0; var45 < var10; ++var45)
			{
				var46 = def.textureCoords[var45] & 255;
				if (var46 != 255)
				{
					if (def.faceVertexIndices1[var45] == (def.texIndices1[var46] & '\uffff') && def.faceVertexIndices2[var45] == (def.texIndices2[var46] & '\uffff') && def.faceVertexIndices3[var45] == (def.texIndices3[var46] & '\uffff'))
					{
						def.textureCoords[var45] = -1;
					}
					else
					{
						var47 = true;
					}
				}
			}

			if (!var47)
			{
				def.textureCoords = null;
			}
		}

		if (!var3)
		{
			def.faceTextures = null;
		}

		if (!var2)
		{
			def.faceRenderTypes = null;
		}

	}

	load1(def, var1) {
		var var2 = new DataView(var1.buffer);
		var var24 = new DataView(var1.buffer);
		var var3 = new DataView(var1.buffer);
		var var28 = new DataView(var1.buffer);
		var var6 = new DataView(var1.buffer);
		var var55 = new DataView(var1.buffer);
		var var51 = new DataView(var1.buffer);
		var2.setPosition(var1.byteLength - 23);
		var verticeCount = var2.readUint16();
		var triangleCount = var2.readUint16();
		var textureTriangleCount = var2.readUint8();
		var var13 = var2.readUint8();
		var modelPriority = var2.readUint8();
		var var50 = var2.readUint8();
		var var17 = var2.readUint8();
		var modelTexture = var2.readUint8();
		var modelVertexSkins = var2.readUint8();
		var var20 = var2.readUint16();
		var var21 = var2.readUint16();
		var var42 = var2.readUint16();
		var var22 = var2.readUint16();
		var var38 = var2.readUint16();
		var textureAmount = 0;
		var var7 = 0;
		var var29 = 0;
		var position;
		if (textureTriangleCount > 0) {
			def.textureRenderTypes = [];
			var2.setPosition(0);

			for (position = 0; position < textureTriangleCount; ++position) {
				var renderType = def.textureRenderTypes[position] = var2.readInt8();
				if (renderType == 0) {
					++textureAmount;
				}

				if (renderType >= 1 && renderType <= 3) {
					++var7;
				}

				if (renderType == 2) {
					++var29;
				}
			}
		}

		position = textureTriangleCount + verticeCount;
		var renderTypePos = position;
		if (var13 == 1) {
			position += triangleCount;
		}

		var var49 = position;
		position += triangleCount;
		var priorityPos = position;
		if (modelPriority == 255) {
			position += triangleCount;
		}

		var triangleSkinPos = position;
		if (var17 == 1) {
			position += triangleCount;
		}

		var var35 = position;
		if (modelVertexSkins == 1) {
			position += verticeCount;
		}

		var alphaPos = position;
		if (var50 == 1) {
			position += triangleCount;
		}

		var var11 = position;
		position += var22;
		var texturePos = position;
		if (modelTexture == 1) {
			position += triangleCount * 2;
		}

		var textureCoordPos = position;
		position += var38;
		var colorPos = position;
		position += triangleCount * 2;
		var var40 = position;
		position += var20;
		var var41 = position;
		position += var21;
		var var8 = position;
		position += var42;
		var var43 = position;
		position += textureAmount * 6;
		var var37 = position;
		position += var7 * 6;
		var var48 = position;
		position += var7 * 6;
		var var56 = position;
		position += var7 * 2;
		var var45 = position;
		position += var7;
		var var46 = position;
		position += var7 * 2 + var29 * 2;
		def.vertexCount = verticeCount;
		def.faceCount = triangleCount;
		def.textureTriangleCount = textureTriangleCount;
		def.vertexPositionsX = [];
		def.vertexPositionsY = [];
		def.vertexPositionsZ = [];
		def.faceVertexIndices1 = [];
		def.faceVertexIndices2 = [];
		def.faceVertexIndices3 = [];
		if (modelVertexSkins == 1) {
			def.vertexSkins = [];
		}

		if (var13 == 1) {
			def.faceRenderTypes = [];
		}

		if (modelPriority == 255) {
			def.faceRenderPriorities = [];
		}
		else {
			def.priority = modelPriority;
			def.faceRenderPriorities = Array(def.faceCount).fill(modelPriority);
		}

		if (var50 == 1) {
			def.faceAlphas = [];
		}

		if (var17 == 1) {
			def.faceSkins = [];
		}

		if (modelTexture == 1) {
			def.faceTextures = [];
		}

		if (modelTexture == 1 && textureTriangleCount > 0) {
			def.textureCoordinates = [];
		}

		def.faceColors = [];
		if (textureTriangleCount > 0) {
			def.textureTriangleVertexIndices1 = [];
			def.textureTriangleVertexIndices2 = [];
			def.textureTriangleVertexIndices3 = [];
			if (var7 > 0) {
				def.aShortArray2574 = [];
				def.aShortArray2575 = [];
				def.aShortArray2586 = [];
				def.aShortArray2577 = [];
				def.aByteArray2580 = [];
				def.aShortArray2578 = [];
			}

			if (var29 > 0) {
				def.texturePrimaryColors = [];
			}
		}

		var2.setPosition(textureTriangleCount);
		var24.setPosition(var40);
		var3.setPosition(var41);
		var28.setPosition(var8);
		var6.setPosition(var35);
		var vX = 0;
		var vY = 0;
		var vZ = 0;

		var vertexZOffset;
		var var10;
		var vertexYOffset;
		var var15;
		var point;
		for (point = 0; point < verticeCount; ++point) {
			var vertexFlags = var2.readUint8();
			var vertexXOffset = 0;
			if ((vertexFlags & 1) != 0) {
				vertexXOffset = var24.readShortSmart();
			}

			vertexYOffset = 0;
			if ((vertexFlags & 2) != 0) {
				vertexYOffset = var3.readShortSmart();
			}

			vertexZOffset = 0;
			if ((vertexFlags & 4) != 0) {
				vertexZOffset = var28.readShortSmart();
			}

			def.vertexPositionsX[point] = vX + vertexXOffset;
			def.vertexPositionsY[point] = vY + vertexYOffset;
			def.vertexPositionsZ[point] = vZ + vertexZOffset;
			vX = def.vertexPositionsX[point];
			vY = def.vertexPositionsY[point];
			vZ = def.vertexPositionsZ[point];
			if (modelVertexSkins == 1) {
				def.vertexSkins[point] = var6.readUint8();
			}
		}

		var2.setPosition(colorPos);
		var24.setPosition(renderTypePos);
		var3.setPosition(priorityPos);
		var28.setPosition(alphaPos);
		var6.setPosition(triangleSkinPos);
		var55.setPosition(texturePos);
		var51.setPosition(textureCoordPos);

		for (point = 0; point < triangleCount; ++point) {
			def.faceColors[point] = var2.readUint16();
			if (var13 == 1) {
				def.faceRenderTypes[point] = var24.readInt8();
			}

			if (modelPriority == 255) {
				def.faceRenderPriorities[point] = var3.readInt8();
			}

			if (var50 == 1) {
				def.faceAlphas[point] = var28.readInt8();
			}

			if (var17 == 1) {
				def.faceSkins[point] = var6.readUint8();
			}

			if (modelTexture == 1) {
				def.faceTextures[point] = (var55.readUint16() - 1);
			}

			if (def.textureCoordinates != null && def.faceTextures[point] != -1) {
				def.textureCoordinates[point] = (var51.readUint8() - 1);
			}
		}

		var2.setPosition(var11);
		var24.setPosition(var49);
		var trianglePointX = 0;
		var trianglePointY = 0;
		var trianglePointZ = 0;
		vertexYOffset = 0;

		var var16;
		for (vertexZOffset = 0; vertexZOffset < triangleCount; ++vertexZOffset) {
			var numFaces = var24.readUint8();
			if (numFaces == 1) {
				trianglePointX = var2.readShortSmart() + vertexYOffset;
				trianglePointY = var2.readShortSmart() + trianglePointX;
				trianglePointZ = var2.readShortSmart() + trianglePointY;
				vertexYOffset = trianglePointZ;
				def.faceVertexIndices1[vertexZOffset] = trianglePointX;
				def.faceVertexIndices2[vertexZOffset] = trianglePointY;
				def.faceVertexIndices3[vertexZOffset] = trianglePointZ;
			}

			if (numFaces == 2) {
				trianglePointY = trianglePointZ;
				trianglePointZ = var2.readShortSmart() + vertexYOffset;
				vertexYOffset = trianglePointZ;
				def.faceVertexIndices1[vertexZOffset] = trianglePointX;
				def.faceVertexIndices2[vertexZOffset] = trianglePointY;
				def.faceVertexIndices3[vertexZOffset] = trianglePointZ;
			}

			if (numFaces == 3) {
				trianglePointX = trianglePointZ;
				trianglePointZ = var2.readShortSmart() + vertexYOffset;
				vertexYOffset = trianglePointZ;
				def.faceVertexIndices1[vertexZOffset] = trianglePointX;
				def.faceVertexIndices2[vertexZOffset] = trianglePointY;
				def.faceVertexIndices3[vertexZOffset] = trianglePointZ;
			}

			if (numFaces == 4) {
				var var57 = trianglePointX;
				trianglePointX = trianglePointY;
				trianglePointY = var57;
				trianglePointZ = var2.readShortSmart() + vertexYOffset;
				vertexYOffset = trianglePointZ;
				def.faceVertexIndices1[vertexZOffset] = trianglePointX;
				def.faceVertexIndices2[vertexZOffset] = var57;
				def.faceVertexIndices3[vertexZOffset] = trianglePointZ;
			}
		}

		var2.setPosition(var43);
		var24.setPosition(var37);
		var3.setPosition(var48);
		var28.setPosition(var56);
		var6.setPosition(var45);
		var55.setPosition(var46);

		for (var texIndex = 0; texIndex < textureTriangleCount; ++texIndex) {
			var type = def.textureRenderTypes[texIndex] & 255;
			if (type == 0) {
				def.textureTriangleVertexIndices1[texIndex] = var2.readUint16();
				def.textureTriangleVertexIndices2[texIndex] = var2.readUint16();
				def.textureTriangleVertexIndices3[texIndex] = var2.readUint16();
			}

			if (type == 1) {
				def.textureTriangleVertexIndices1[texIndex] = var24.readUint16();
				def.textureTriangleVertexIndices2[texIndex] = var24.readUint16();
				def.textureTriangleVertexIndices3[texIndex] = var24.readUint16();
				def.aShortArray2574[texIndex] = var3.readUint16();
				def.aShortArray2575[texIndex] = var3.readUint16();
				def.aShortArray2586[texIndex] = var3.readUint16();
				def.aShortArray2577[texIndex] = var28.readUint16();
				def.aByteArray2580[texIndex] = var6.readInt8();
				def.aShortArray2578[texIndex] = var55.readUint16();
			}

			if (type == 2) {
				def.textureTriangleVertexIndices1[texIndex] = var24.readUint16();
				def.textureTriangleVertexIndices2[texIndex] = var24.readUint16();
				def.textureTriangleVertexIndices3[texIndex] = var24.readUint16();
				def.aShortArray2574[texIndex] = var3.readUint16();
				def.aShortArray2575[texIndex] = var3.readUint16();
				def.aShortArray2586[texIndex] = var3.readUint16();
				def.aShortArray2577[texIndex] = var28.readUint16();
				def.aByteArray2580[texIndex] = var6.readInt8();
				def.aShortArray2578[texIndex] = var55.readUint16();
				def.texturePrimaryColors[texIndex] = var55.readUint16();
			}

			if (type == 3) {
				def.textureTriangleVertexIndices1[texIndex] = var24.readUint16();
				def.textureTriangleVertexIndices2[texIndex] = var24.readUint16();
				def.textureTriangleVertexIndices3[texIndex] = var24.readUint16();
				def.aShortArray2574[texIndex] = var3.readUint16();
				def.aShortArray2575[texIndex] = var3.readUint16();
				def.aShortArray2586[texIndex] = var3.readUint16();
				def.aShortArray2577[texIndex] = var28.readUint16();
				def.aByteArray2580[texIndex] = var6.readInt8();
				def.aShortArray2578[texIndex] = var55.readUint16();
			}
		}

		var2.setPosition(position);
		vertexZOffset = var2.readUint8();
		if (vertexZOffset != 0) {
			//new Class41();
			var2.readUint16();
			var2.readUint16();
			var2.readUint16();
			var2.readInt32();
		}
	}

	loadOriginal(def, var1) {
		var var2 = false;
		var var43 = false;
		var var5 = new DataView(var1.buffer);
		var var39 = new DataView(var1.buffer);
		var var26 = new DataView(var1.buffer);
		var var9 = new DataView(var1.buffer);
		var var3 = new DataView(var1.buffer);
		var5.setPosition(var1.byteLength - 18);
		var var10 = var5.readUint16();
		var var11 = var5.readUint16();
		var var12 = var5.readUint8();
		var var13 = var5.readUint8();
		var var14 = var5.readUint8();
		var var30 = var5.readUint8();
		var var15 = var5.readUint8();
		var var28 = var5.readUint8();
		var var27 = var5.readUint16();
		var var20 = var5.readUint16();
		var var36 = var5.readUint16();
		var var23 = var5.readUint16();
		var var16 = 0;
		var var46 = var16 + var10;
		var var24 = var46;
		var46 += var11;
		var var25 = var46;
		if (var14 == 255) {
			var46 += var11;
		}

		var var4 = var46;
		if (var15 == 1) {
			var46 += var11;
		}

		var var42 = var46;
		if (var13 == 1) {
			var46 += var11;
		}

		var var37 = var46;
		if (var28 == 1) {
			var46 += var10;
		}

		var var29 = var46;
		if (var30 == 1) {
			var46 += var11;
		}

		var var44 = var46;
		var46 += var23;
		var var17 = var46;
		var46 += var11 * 2;
		var var32 = var46;
		var46 += var12 * 6;
		var var34 = var46;
		var46 += var27;
		var var35 = var46;
		var46 += var20;
		var var10000 = var46 + var36;
		def.vertexCount = var10;
		def.faceCount = var11;
		def.textureTriangleCount = var12;
		def.vertexPositionsX = [];
		def.vertexPositionsY = [];
		def.vertexPositionsZ = [];
		def.faceVertexIndices1 = [];
		def.faceVertexIndices2 = [];
		def.faceVertexIndices3 = [];
		if (var12 > 0) {
			def.textureRenderTypes = [];
			def.textureTriangleVertexIndices1 = [];
			def.textureTriangleVertexIndices2 = [];
			def.textureTriangleVertexIndices3 = [];
		}

		if (var28 == 1) {
			def.vertexSkins = [];
		}

		if (var13 == 1) {
			def.faceRenderTypes = [];
			def.textureCoordinates = [];
			def.faceTextures = [];
		}

		if (var14 == 255) {
			def.faceRenderPriorities = [];
		}
		else {
			def.priority = var14;
			def.faceRenderPriorities = Array(def.faceCount).fill(def.priority);
		}

		if (var30 == 1) {
			def.faceAlphas = [];
		}

		if (var15 == 1) {
			def.faceSkins = [];
		}

		def.faceColors = [];
		var5.setPosition(var16);
		var39.setPosition(var34);
		var26.setPosition(var35);
		var9.setPosition(var46);
		var3.setPosition(var37);
		var var41 = 0;
		var var33 = 0;
		var var19 = 0;

		var var6;
		var var7;
		var var8;
		var var18;
		var var31;
		for (var18 = 0; var18 < var10; ++var18) {
			var8 = var5.readUint8();
			var31 = 0;
			if ((var8 & 1) != 0) {
				var31 = var39.readShortSmart();
			}

			var6 = 0;
			if ((var8 & 2) != 0) {
				var6 = var26.readShortSmart();
			}

			var7 = 0;
			if ((var8 & 4) != 0) {
				var7 = var9.readShortSmart();
			}

			def.vertexPositionsX[var18] = var41 + var31;
			def.vertexPositionsY[var18] = var33 + var6;
			def.vertexPositionsZ[var18] = var19 + var7;
			var41 = def.vertexPositionsX[var18];
			var33 = def.vertexPositionsY[var18];
			var19 = def.vertexPositionsZ[var18];
			if (var28 == 1) {
				def.vertexSkins[var18] = var3.readUint8();
			}
		}

		var5.setPosition(var17);
		var39.setPosition(var42);
		var26.setPosition(var25);
		var9.setPosition(var29);
		var3.setPosition(var4);

		for (var18 = 0; var18 < var11; ++var18) {
			def.faceColors[var18] = var5.readUint16();
			if (var13 == 1) {
				var8 = var39.readUint8();
				if ((var8 & 1) == 1) {
					def.faceRenderTypes[var18] = 1;
					var2 = true;
				}
				else {
					def.faceRenderTypes[var18] = 0;
				}

				if ((var8 & 2) == 2) {
					def.textureCoordinates[var18] = (var8 >> 2);
					def.faceTextures[var18] = def.faceColors[var18];
					def.faceColors[var18] = 127;
					if (def.faceTextures[var18] != -1) {
						var43 = true;
					}
				}
				else {
					def.textureCoordinates[var18] = -1;
					def.faceTextures[var18] = -1;
				}
			}

			if (var14 == 255) {
				def.faceRenderPriorities[var18] = var26.readInt8();
			}

			if (var30 == 1) {
				def.faceAlphas[var18] = var9.readInt8();
			}

			if (var15 == 1) {
				def.faceSkins[var18] = var3.readUint8();
			}
		}

		var5.setPosition(var44);
		var39.setPosition(var24);
		var18 = 0;
		var8 = 0;
		var31 = 0;
		var6 = 0;

		var var21;
		var var22;
		for (var7 = 0; var7 < var11; ++var7) {
			var22 = var39.readUint8();
			if (var22 == 1) {
				var18 = var5.readShortSmart() + var6;
				var8 = var5.readShortSmart() + var18;
				var31 = var5.readShortSmart() + var8;
				var6 = var31;
				def.faceVertexIndices1[var7] = var18;
				def.faceVertexIndices2[var7] = var8;
				def.faceVertexIndices3[var7] = var31;
			}

			if (var22 == 2) {
				var8 = var31;
				var31 = var5.readShortSmart() + var6;
				var6 = var31;
				def.faceVertexIndices1[var7] = var18;
				def.faceVertexIndices2[var7] = var8;
				def.faceVertexIndices3[var7] = var31;
			}

			if (var22 == 3) {
				var18 = var31;
				var31 = var5.readShortSmart() + var6;
				var6 = var31;
				def.faceVertexIndices1[var7] = var18;
				def.faceVertexIndices2[var7] = var8;
				def.faceVertexIndices3[var7] = var31;
			}

			if (var22 == 4) {
				var21 = var18;
				var18 = var8;
				var8 = var21;
				var31 = var5.readShortSmart() + var6;
				var6 = var31;
				def.faceVertexIndices1[var7] = var18;
				def.faceVertexIndices2[var7] = var21;
				def.faceVertexIndices3[var7] = var31;
			}
		}

		var5.setPosition(var32);

		for (var7 = 0; var7 < var12; ++var7) {
			def.textureRenderTypes[var7] = 0;
			def.textureTriangleVertexIndices1[var7] = var5.readUint16();
			def.textureTriangleVertexIndices2[var7] = var5.readUint16();
			def.textureTriangleVertexIndices3[var7] = var5.readUint16();
		}

		if (def.textureCoordinates != null) {
			var var45 = false;

			for (var22 = 0; var22 < var11; ++var22) {
				var21 = def.textureCoordinates[var22] & 255;
				if (var21 != 255) {
					if ((def.textureTriangleVertexIndices1[var21] & '\uffff') == def.faceVertexIndices1[var22] && (def.textureTriangleVertexIndices2[var21] & '\uffff') == def.faceVertexIndices2[var22] && (def.textureTriangleVertexIndices3[var21] & '\uffff') == def.faceVertexIndices3[var22]) {
						def.textureCoordinates[var22] = -1;
					}
					else {
						var45 = true;
					}
				}
			}

			if (!var45) {
				def.textureCoordinates = null;
			}
		}

		if (!var43) {
			def.faceTextures = null;
		}

		if (!var2) {
			def.faceRenderTypes = null;
		}
	}

	computeAnimationTables(def) {
		var groupCounts = [];
		var numGroups = 0;
		var var3, var4, var10002;
		if (def.vertexSkins != null) {


			for (var3 = 0; var3 < def.vertexCount; ++var3) {
				var4 = def.vertexSkins[var3];
				++groupCounts[var4];
				if (var4 > numGroups) {
					numGroups = var4;
				}
			}

			def.vertexGroups = [];

			for (var3 = 0; var3 <= numGroups; ++var3) {
				def.vertexGroups[var3] = [];
				groupCounts[var3] = 0;
			}

			for (var3 = 0; var3 < def.vertexCount; def.vertexGroups[var4][groupCounts[var4]++] = var3++) {
				var4 = def.vertexSkins[var3];
			}

			def.vertexSkins = null;
		}
		if (def.faceSkins != null) { // L: 785
			groupCounts = []; // L: 786
			numGroups = 0; // L: 787

			for (var3 = 0; var3 < def.faceCount; ++var3) { // L: 788
				var4 = def.faceSkins[var3]; // L: 789
				var10002 = groupCounts[var4]++; // L: 790
				if (var4 > numGroups) { // L: 791
					numGroups = var4;
				}
			}

			def.faceLabelsAlpha = []; // L: 793

			for (var3 = 0; var3 <= numGroups; ++var3) { // L: 794
				def.faceLabelsAlpha[var3] = []; // L: 795
				groupCounts[var3] = 0; // L: 796
			}

			for (var3 = 0; var3 < def.faceCount; def.faceLabelsAlpha[var4][groupCounts[var4]++] = var3++) { // L: 798 800
				var4 = def.faceSkins[var3]; // L: 799
			}

			def.faceSkins = null; // L: 802
		}
		// triangleSkinValues is here
	}

	computeTextureUVCoordinates(def) {
		def.faceTextureUCoordinates = [];
		def.faceTextureVCoordinates = [];

		for (var i = 0; i < def.faceCount; i++) {
			var textureCoordinate;
			if (def.textureCoordinates == undefined) {
				textureCoordinate = -1;
			}
			else {
				textureCoordinate = def.textureCoordinates[i];
			}

			var textureIdx;
			if (def.faceTextures == undefined) {
				textureIdx = -1;
			}
			else {
				textureIdx = def.faceTextures[i] & 0xFFFF;
			}

			if (textureIdx != -1) {
				var u = [];
				var v = [];

				if (textureCoordinate == -1) {
					u[0] = 0.0;
					v[0] = 1.0;

					u[1] = 1.0;
					v[1] = 1.0;

					u[2] = 0.0;
					v[2] = 0.0;
				}
				else {
					textureCoordinate &= 0xFF;

					var textureRenderType = 0;
					if (def.textureRenderTypes != undefined) {
						textureRenderType = def.textureRenderTypes[textureCoordinate];
					}

					if (textureRenderType == 0) {
						var faceVertexIdx1 = def.faceVertexIndices1[i];
						var faceVertexIdx2 = def.faceVertexIndices2[i];
						var faceVertexIdx3 = def.faceVertexIndices3[i];

						var triangleVertexIdx1 = def.textureTriangleVertexIndices1[textureCoordinate];
						var triangleVertexIdx2 = def.textureTriangleVertexIndices2[textureCoordinate];
						var triangleVertexIdx3 = def.textureTriangleVertexIndices3[textureCoordinate];

						var triangleX = def.vertexPositionsX[triangleVertexIdx1];
						var triangleY = def.vertexPositionsY[triangleVertexIdx1];
						var triangleZ = def.vertexPositionsZ[triangleVertexIdx1];

						var f_882_ = def.vertexPositionsX[triangleVertexIdx2] - triangleX;
						var f_883_ = def.vertexPositionsY[triangleVertexIdx2] - triangleY;
						var f_884_ = def.vertexPositionsZ[triangleVertexIdx2] - triangleZ;
						var f_885_ = def.vertexPositionsX[triangleVertexIdx3] - triangleX;
						var f_886_ = def.vertexPositionsY[triangleVertexIdx3] - triangleY;
						var f_887_ = def.vertexPositionsZ[triangleVertexIdx3] - triangleZ;
						var f_888_ = def.vertexPositionsX[faceVertexIdx1] - triangleX;
						var f_889_ = def.vertexPositionsY[faceVertexIdx1] - triangleY;
						var f_890_ = def.vertexPositionsZ[faceVertexIdx1] - triangleZ;
						var f_891_ = def.vertexPositionsX[faceVertexIdx2] - triangleX;
						var f_892_ = def.vertexPositionsY[faceVertexIdx2] - triangleY;
						var f_893_ = def.vertexPositionsZ[faceVertexIdx2] - triangleZ;
						var f_894_ = def.vertexPositionsX[faceVertexIdx3] - triangleX;
						var f_895_ = def.vertexPositionsY[faceVertexIdx3] - triangleY;
						var f_896_ = def.vertexPositionsZ[faceVertexIdx3] - triangleZ;

						var f_897_ = f_883_ * f_887_ - f_884_ * f_886_;
						var f_898_ = f_884_ * f_885_ - f_882_ * f_887_;
						var f_899_ = f_882_ * f_886_ - f_883_ * f_885_;
						var f_900_ = f_886_ * f_899_ - f_887_ * f_898_;
						var f_901_ = f_887_ * f_897_ - f_885_ * f_899_;
						var f_902_ = f_885_ * f_898_ - f_886_ * f_897_;
						var f_903_ = 1.0 / (f_900_ * f_882_ + f_901_ * f_883_ + f_902_ * f_884_);

						u[0] = (f_900_ * f_888_ + f_901_ * f_889_ + f_902_ * f_890_) * f_903_;
						u[1] = (f_900_ * f_891_ + f_901_ * f_892_ + f_902_ * f_893_) * f_903_;
						u[2] = (f_900_ * f_894_ + f_901_ * f_895_ + f_902_ * f_896_) * f_903_;

						f_900_ = f_883_ * f_899_ - f_884_ * f_898_;
						f_901_ = f_884_ * f_897_ - f_882_ * f_899_;
						f_902_ = f_882_ * f_898_ - f_883_ * f_897_;
						f_903_ = 1.0 / (f_900_ * f_885_ + f_901_ * f_886_ + f_902_ * f_887_);

						v[0] = (f_900_ * f_888_ + f_901_ * f_889_ + f_902_ * f_890_) * f_903_;
						v[1] = (f_900_ * f_891_ + f_901_ * f_892_ + f_902_ * f_893_) * f_903_;
						v[2] = (f_900_ * f_894_ + f_901_ * f_895_ + f_902_ * f_896_) * f_903_;
					}
				}

				def.faceTextureUCoordinates[i] = u;
				def.faceTextureVCoordinates[i] = v;
			}
		}
	}

	computeNormals(def) {
		if (def.vertexNormals != undefined) {
			return;
		}

		def.vertexNormals = [];

		var var1;
		for (var1 = 0; var1 < def.vertexCount; ++var1) {
			def.vertexNormals[var1] = { x: 0, y: 0, z: 0, magnitude: 0 };
		}

		for (var1 = 0; var1 < def.faceCount; ++var1) {
			var vertexA = def.faceVertexIndices1[var1];
			var vertexB = def.faceVertexIndices2[var1];
			var vertexC = def.faceVertexIndices3[var1];

			var xA = def.vertexPositionsX[vertexB] - def.vertexPositionsX[vertexA];
			var yA = def.vertexPositionsY[vertexB] - def.vertexPositionsY[vertexA];
			var zA = def.vertexPositionsZ[vertexB] - def.vertexPositionsZ[vertexA];

			var xB = def.vertexPositionsX[vertexC] - def.vertexPositionsX[vertexA];
			var yB = def.vertexPositionsY[vertexC] - def.vertexPositionsY[vertexA];
			var zB = def.vertexPositionsZ[vertexC] - def.vertexPositionsZ[vertexA];

			// Compute cross product
			var var11 = yA * zB - yB * zA;
			var var12 = zA * xB - zB * xA;
			var var13 = xA * yB - xB * yA;

			while (var11 > 8192 || var12 > 8192 || var13 > 8192 || var11 < -8192 || var12 < -8192 || var13 < -8192) {
				var11 >>= 1;
				var12 >>= 1;
				var13 >>= 1;
			}

			var length = parseInt(Math.sqrt(var11 * var11 + var12 * var12 + var13 * var13));
			if (length <= 0) {
				length = 1;
			}

			var11 = var11 * 256 / length;
			var12 = var12 * 256 / length;
			var13 = var13 * 256 / length;

			var var15;
			if (def.faceRenderTypes == undefined) {
				var15 = 0;
			}
			else {
				var15 = def.faceRenderTypes[var1];
			}

			if (var15 == 0) {
				var var16 = def.vertexNormals[vertexA];
				//console.log(var16);
				var16.magnitude = 0;
				var16.x += var11;
				var16.y += var12;
				var16.z += var13;
				++var16.magnitude;

				var16 = def.vertexNormals[vertexB];
				var16.x += var11;
				var16.y += var12;
				var16.z += var13;
				++var16.magnitude;

				var16 = def.vertexNormals[vertexC];
				var16.x += var11;
				var16.y += var12;
				var16.z += var13;
				++var16.magnitude;
			}
			else if (var15 == 1) {
				if (def.faceNormals == undefined) {
					def.faceNormals = [];
				}

				var var17 = def.faceNormals[var1] = {};
				var17.x = var11;
				var17.y = var12;
				var17.z = var13;
			}
		}
	}

	computeNormals2(def) {
		if (def.vertexNormals == null) {
			def.vertexNormals = [];

			let var1;
			for (var1 = 0; var1 < def.vertexCount; ++var1) {
				def.vertexNormals[var1] = { x: 0, y: 0, z: 0, magnitude: 0 };
			}
			for (var1 = 0; var1 < def.faceCount; ++var1) {
				let var2 = def.faceVertexIndices1[var1];
				let var3 = def.faceVertexIndices2[var1];
				let var4 = def.faceVertexIndices3[var1];
				let var5 = def.vertexPositionsX[var3] - def.vertexPositionsX[var2];
				let var6 = def.vertexPositionsY[var3] - def.vertexPositionsY[var2];
				let var7 = def.vertexPositionsZ[var3] - def.vertexPositionsZ[var2];
				let var8 = def.vertexPositionsX[var4] - def.vertexPositionsX[var2];
				let var9 = def.vertexPositionsY[var4] - def.vertexPositionsY[var2];
				let var10 = def.vertexPositionsZ[var4] - def.vertexPositionsZ[var2];
				let var11 = var6 * var10 - var9 * var7;
				let var12 = var7 * var8 - var10 * var5;

				let var13;
				for (var13 = var5 * var9 - var8 * var6; var11 > 8192 || var12 > 8192 || var13 > 8192 || var11 < -8192 || var12 < -8192 || var13 < -8192; var13 >>= 1) {
					var11 >>= 1;
					var12 >>= 1;
				}

				let var14 = parseInt(Math.sqrt(var11 * var11 + var12 * var12 + var13 * var13));
				if (var14 <= 0) {
					var14 = 1;
				}

				var11 = var11 * 256 / var14;
				var12 = var12 * 256 / var14;
				var13 = var13 * 256 / var14;
				let var15;
				if (def.faceRenderTypes == null) {
					var15 = 0;
				} else {
					var15 = def.faceRenderTypes[var1];
				}

				if (var15 == 0) {
					let var16 = def.vertexNormals[var2];
					var16.x += var11;
					var16.y += var12;
					var16.z += var13;
					++var16.magnitude;
					var16 = def.vertexNormals[var3];
					var16.x += var11;
					var16.y += var12;
					var16.z += var13;
					++var16.magnitude;
					var16 = def.vertexNormals[var4];
					var16.x += var11;
					var16.y += var12;
					var16.z += var13;
					++var16.magnitude;

				} else if (var15 == 1) {
					if (def.faceNormals == null) {
						def.faceNormals = [];
					}

					let var17 = def.faceNormals[var1] = {};
					var17.x = var11;
					var17.y = var12;
					var17.z = var13;
				}
			}
		}
	}
}
// EXTERNAL MODULE: ./node_modules/canvas/browser.js
var browser = __webpack_require__(292);
;// CONCATENATED MODULE: ./src/cacheReader/loaders/SpriteLoader.js


const FLAG_VERTICAL = 0b01;
const FLAG_ALPHA = 0b10;

class Sprite {
    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    setPixels(pixels) {
        this.pixels = pixels;
    }
}
class SpriteDefinition {

}
class SpriteLoader {

    load(bytes, id) {
        let def = new SpriteDefinition();
        def.id = id;

        let dataview = new DataView(bytes.buffer, 0, bytes.length);
        dataview.setPosition(dataview.byteLength - 2);

        let spriteCount = dataview.readUint16();
        let sprites = new Array(spriteCount);
        def.sprites = sprites;

        dataview.setPosition(dataview.byteLength - 7 - spriteCount * 8);

        let width = dataview.readUint16();
        let height = dataview.readUint16();
        let paletteLength = dataview.readUint8() + 1;

        for (let i = 0; i < spriteCount; ++i) {
            sprites[i] = new Sprite();
            sprites[i].id = id;
            sprites[i].frame = i;
            sprites[i].maxWidth = width;
            sprites[i].maxHeight = height;
        }

        for (let i = 0; i < spriteCount; ++i) {
            sprites[i].offsetX = dataview.readUint16();
        }

        for (let i = 0; i < spriteCount; ++i) {
            sprites[i].offsetY = dataview.readUint16();
        }

        for (let i = 0; i < spriteCount; ++i) {
            sprites[i].width = dataview.readUint16();
        }

        for (let i = 0; i < spriteCount; ++i) {
            sprites[i].height = dataview.readUint16();
        }

        // same as above + 3 bytes for each palette entry, except for the first one (which is transparent)
        dataview.setPosition(dataview.byteLength - 7 - spriteCount * 8 - (paletteLength - 1) * 3);
        let palette = new Array(paletteLength);

        for (let i = 1; i < paletteLength; ++i) {
            palette[i] = dataview.readInt24();

            if (palette[i] == 0) {
                palette[i] = 1;
            }
        }

        dataview.setPosition(0);

        for (let i = 0; i < spriteCount; ++i) {
            let sprite = sprites[i];
            console.log(sprite.getWidth())
            let spriteWidth = sprite.getWidth();
            let spriteHeight = sprite.getHeight();
            let dimension = spriteWidth * spriteHeight;
            let pixelPaletteIndicies = new Array(dimension);
            let pixelAlphas = new Array(dimension);
            sprite.pixelIdx = pixelPaletteIndicies;
            sprite.palette = palette;

            let flags = dataview.readUint8();

            if ((flags & FLAG_VERTICAL) == 0) {
                // read horizontally
                for (let j = 0; j < dimension; ++j) {
                    pixelPaletteIndicies[j] = dataview.readInt8();
                }
            }
            else {
                // read vertically
                for (let j = 0; j < spriteWidth; ++j) {
                    for (let k = 0; k < spriteHeight; ++k) {
                        pixelPaletteIndicies[spriteWidth * k + j] = dataview.readInt8();
                    }
                }
            }

            // read alphas
            if ((flags & FLAG_ALPHA) != 0) {
                if ((flags & FLAG_VERTICAL) == 0) {
                    // read horizontally
                    for (let j = 0; j < dimension; ++j) {
                        pixelAlphas[j] = dataview.readInt8();
                    }
                }
                else {
                    // read vertically
                    for (let j = 0; j < spriteWidth; ++j) {
                        for (let k = 0; k < spriteHeight; ++k) {
                            pixelAlphas[spriteWidth * k + j] = dataview.readInt8();
                        }
                    }
                }
            }
            else {
                // everything non-zero is opaque
                for (let j = 0; j < dimension; ++j) {
                    let index = pixelPaletteIndicies[j];

                    if (index != 0)
                        pixelAlphas[j] = 0xFF;
                }
            }

            let pixels = new Array(dimension);

            // build argb pixels from palette/alphas
            for (let j = 0; j < dimension; ++j) {
                let index = pixelPaletteIndicies[j] & 0xFF;

                pixels[j] = palette[index] | (pixelAlphas[j] << 24);
            }

            sprite.setPixels(pixels);

            const canvas = (0,browser/* createCanvas */.vL)(sprite.getWidth(), sprite.getHeight())
            const ctx = canvas.getContext('2d');
            let imageData = ctx.createImageData(sprite.getWidth(), sprite.getHeight());
            for (let i = 0; i < imageData.data.byteLength; i += 4) {
                let pixel = sprites[0].pixels[Math.floor(i / 4)];
                imageData.data[i + 0] = (pixel & 0x00ff0000) >> 16;
                imageData.data[i + 1] = (pixel & 0x0000ff00) >> 8;
                imageData.data[i + 2] = pixel & 0x000000ff;
                imageData.data[i + 3] = 254 - ((pixel & 0xff000000) >> 24);
            }

            ctx.putImageData(imageData, 0, 0);
            console.log('<img src="' + canvas.toDataURL() + '" />')
        }



        //ctx.putImageData
        return def;

    }
}
;// CONCATENATED MODULE: ./src/cacheReader/cacheTypes/IndexType.js






const IndexType = { 
    FRAMES:{id: 0, loader: FramesLoader},       // Animations
    FRAMEMAPS:{id: 1, loader: FramemapLoader},  // Skeletons
    CONFIGS:{id: 2, loader: undefined},         // Configs
    INTERFACES:{id: 3, loader: undefined},      // Interfaces
    SOUNDEFFECTS:{id: 4, loader: undefined},    // Sound FX
    MAPS:{id: 5, loader: MapLoader},            // Maps
    TRACK1:{id: 6, loader: undefined},          // Music Tracks (ex: "scape main")
    MODELS:{id: 7, loader: ModelLoader},        // Models
    SPRITES:{id: 8, loader: SpriteLoader},         // Sprites
    TEXTURES:{id: 9, loader: undefined},        // Textures
    BINARY:{id: 10, loader: undefined},         // Title screen & Huffman?
    TRACK2:{id: 11, loader: undefined},         // Music Jingles
    CLIENTSCRIPT:{id: 12, loader: undefined},   // Interface Scripts
    FONTS:{id: 13, loader: undefined},          // Interface Fonts
    VORBIS:{id: 14, loader: undefined},         // Music Samples
    INSTRUMENTS:{id: 15, loader: undefined},    // Music Patches
    WORLDMAP:{id: 16, loader: undefined},       // World Locations
    UKNOWN1:{id: 17, loader: undefined},        // Sprite IDs                       
    UKNOWN2:{id: 18, loader: undefined},        // World Map Geography                     
    UKNOWN3:{id: 19, loader: undefined},        // World Map                          
    UKNOWN4:{id: 20, loader: undefined},        // World Map Ground           

    valueOf(id){
        var values = Object.values(IndexType);
        var keys = Object.keys(IndexType);
        for(var i=0;i<values.length;i++) {
            if(id == values[i].id)
                return IndexType[keys[i]];
        }
        return undefined;
    }
};
Object.freeze(IndexType);

/* harmony default export */ const cacheTypes_IndexType = (IndexType);
;// CONCATENATED MODULE: ./src/cacheReader/loaders/KitLoader.js
class KitDefinition {
		
}
class KitLoader {

	load(bytes, id) {
		let def = new KitDefinition();
        def.id = id;
		let dataview = new DataView(bytes.buffer);
		do {
			var opcode = dataview.readUint8();
			this.handleOpcode(def, opcode, dataview);
		} while(opcode != 0);
		
		return def;
	}
	
	handleOpcode(def, opcode, dataview){
        switch(opcode) {
			case 0:
				break;

            case 1:
                def.bodyPartId = dataview.readUint8();
                break;
            
            case 2:
                var length = dataview.readUint8();
				def.models = [];

				for (var index = 0; index < length; ++index)
					def.models[index] = dataview.readUint16();
                break;

            case 3:
                def.nonSelectable = true;
                break;
            
            case 40:
                var length = dataview.readUint8();
				def.recolorToFind = [];
				def.recolorToReplace = [];

				for (var index = 0; index < length; ++index)
				{
					def.recolorToFind[index] = dataview.readInt16();
					def.recolorToReplace[index] = dataview.readInt16();
				}
                break;
            
            case 41:
                var length = dataview.readUint16();
				def.retextureToFind = new short[length];
				def.retextureToReplace = new short[length];

				for (var index = 0; index < length; ++index)
				{
					def.retextureToFind[index] = dataview.readInt16();
					def.retextureToReplace[index] = dataview.readInt16();
				}
                break;

            default:
                if(opcode >= 60 && opcode < 70){
					if(def.chatheadModels == undefined) def.chatheadModels = [];
                    def.chatheadModels[opcode - 60] = dataview.readUint16();
				}else{
                    throw 'Unknown opcode found: ' + opcode;
				}
          }
	}
}
;// CONCATENATED MODULE: ./src/cacheReader/loaders/ObjectLoader.js
class ObjectDefinition {
	constructor() {
		this.shadow = true;
	}
}
class ObjectLoader {

	load(bytes, id) {
		//console.log(id, bytes.length);
		let def = new ObjectDefinition();
		def.id = id;
		let dataview = new DataView(bytes.buffer);
		do {
			var opcode = dataview.readUint8();
			this.handleOpcode(def, opcode, dataview);
		} while (opcode != 0);

		return def;
	}

	handleOpcode(def, opcode, dataview) {
		//console.log(opcode);
		if (opcode == 0)
			return;

		if (opcode == 1) {
			var length = dataview.readUint8();
			if (length > 0) {
				def.objectTypes = [];
				def.objectModels = [];

				for (var index = 0; index < length; ++index) {
					def.objectModels.push(dataview.readUint16());
					def.objectTypes.push(dataview.readUint8());
				}

			}
		}
		else if (opcode == 2) {
			def.name = dataview.readString();
		}
		else if (opcode == 5) {
			var length = dataview.readUint8();
			if (length > 0) {
				def.objectTypes = null;
				def.objectModels = [];

				for (var index = 0; index < length; ++index) {
					def.objectModels.push(dataview.readUint16());
				}
			}
		}
		else if (opcode == 14) {
			def.sizeX = dataview.readUint8();
		}
		else if (opcode == 15) {
			def.sizeY = dataview.readUint8();
		}
		else if (opcode == 17) {
			def.interactType = 0;
			def.blocksProjectile = false;
		}
		else if (opcode == 18) {
			def.blocksProjectile = false;
		}
		else if (opcode == 19) {
			def.wallOrDoor = dataview.readUint8();
		}
		else if (opcode == 21) {
			def.contouredGround = 0;
		}
		else if (opcode == 22) {
			def.setMergeNormals = true;
		}
		else if (opcode == 23) {
			def.aBool2111 = true;
		}
		else if (opcode == 24) {
			def.animationID = dataview.readUint16();
			if (def.animationID == 0xFFFF) {
				def.animationID = -1;
			}
		}
		else if (opcode == 27) {
			def.interactType = 1;
		}
		else if (opcode == 28) {
			def.decorDisplacement = dataview.readUint8();
		}
		else if (opcode == 29) {
			def.setAmbient = dataview.readInt8();
		}
		else if (opcode == 39) {
			def.contrast = dataview.readInt8() * 25;
		}
		//30-34, 40, 41 are similar to NPCLoader, maybe make parent class for similar opcode loaders
		else if (opcode >= 30 && opcode < 35) {
			if (def.actions == undefined)
				def.actions = [];

			var readString = dataview.readString();
			def.actions[opcode - 30] = readString;

			//might be better to leave it as hidden (?)
			if (def.actions[opcode - 30] == "Hidden") {
				def.actions[opcode - 30] = undefined;
			}

		}
		else if (opcode == 40) {
			var length = dataview.readUint8();
			def.recolorToFind = [];
			def.recolorToReplace = [];

			for (index = 0; index < length; ++index) {
				def.recolorToFind.push(dataview.readUint16());
				def.recolorToReplace.push(dataview.readUint16());
			}
		}
		else if (opcode == 41) {
			var length = dataview.readUint8();
			def.retextureToFind = [];
			def.textureToReplace = [];

			for (index = 0; index < length; ++index) {
				def.retextureToFind.push(dataview.readUint16());
				def.textureToReplace.push(dataview.readUint16());
			}
		}
		else if (opcode == 61) {
			def.category = dataview.readUint16();
		}
		else if (opcode == 62) {
			def.rotated = true;
		}
		else if (opcode == 64) { //needs to be declared as true in constructor if toggling to false
			def.shadow = false;
		}
		else if (opcode == 65) {
			def.modelSizeX = dataview.readUint16();
		}
		else if (opcode == 66) {
			def.modelSizeHeight = dataview.readUint16();
		}
		else if (opcode == 67) {
			def.modelSizeY = dataview.readUint16();
		}
		else if (opcode == 68) {
			def.mapSceneID = dataview.readUint16();
		}
		else if (opcode == 69) {
			def.blockingMask = dataview.readInt8();
		}
		else if (opcode == 70) {
			def.offsetX = dataview.readUint16();
		}
		else if (opcode == 71) {
			def.offsetHeight = dataview.readUint16();
		}
		else if (opcode == 72) {
			def.offsetY = dataview.readUint16();
		}
		else if (opcode == 73) {
			def.obstructsGround = true;
		}
		else if (opcode == 74) {
			def.hollow = true;
		}
		else if (opcode == 75) {
			def.supportsItems = dataview.readUint8();
		}
		else if (opcode == 77) {
			var varpID = dataview.readUint16();
			if (varpID == 0xFFFF) {
				varpID = -1;
			}
			def.varbitID = varpID;

			var configId = dataview.readUint16();
			if (configId == 0xFFFF) {
				configId = -1;
			}
			def.varpID = configId;

			var length = dataview.readUint8();
			def.configChangeDest = [];

			for (var index = 0; index <= length; ++index) {
				def.configChangeDest.push(dataview.readUint16());
				if (0xFFFF == def.configChangeDest[index]) {
					def.configChangeDest[index] = -1;
				}
			}
			def.configChangeDest.push(-1);
		}
		else if (opcode == 78) {
			def.setAmbientSoundId = dataview.readUint16();
			def.setAnInt2083 = dataview.readUint8();
		}
		else if (opcode == 79) {
			def.setAnInt2112 = dataview.readUint16();
			def.setAnInt2113 = dataview.readUint16();
			def.setAnInt2083 = dataview.readUint8();
			var length = dataview.readUint8();
			let anIntArray2084 = [];

			for (var index = 0; index < length; ++index) {
				anIntArray2084.push(dataview.readUint16());
			}

			def.ambientSoundIds = anIntArray2084;
		}
		else if (opcode == 81) {
			def.setContouredGround = dataview.readUint8() * 256;
		}
		else if (opcode == 82) {
			def.setMapAreaId = dataview.readUint16();
		}
		else if (opcode == 89) {
			def.randomizeAnimStart = true;
		}
		else if (opcode == 92) {
			var varpID = dataview.readUint16();
			if (varpID == 0xFFFF) {
				varpID = -1;
			}
			def.varbitID = varpID;

			var configId = dataview.readUint16();
			if (configId == 0xFFFF) {
				configId = -1;
			}
			def.varpID = configId;


			var varValue = dataview.readUint16();
			if (varValue == 0xFFFF) {
				varValue = -1;
			}

			var length = dataview.readUint8();
			def.configChangeDest = [];

			for (var index = 0; index <= length; ++index) {
				def.configChangeDest.push(dataview.readUint16());
				if (0xFFFF == def.configChangeDest[index]) {
					def.configChangeDest[index] = -1;
				}
			}
			def.configChangeDest.push(varValue);
		}
		else if (opcode == 249) {
			var length = dataview.readUint8();
			def.params = {};

			for (var i = 0; i < length; i++) {
				var isString = dataview.readUint8() == 1;

				var key = dataview.readInt24();
				var value;

				if (isString) {
					value = dataview.readString();
				}
				else {
					value = dataview.readInt32()
				}

				def.params[key] = value;
			}
		}
	}
}
;// CONCATENATED MODULE: ./src/cacheReader/loaders/NpcLoader.js
class NpcDefinition {

}
class NpcLoader {

	load(bytes, id) {
		let def = new NpcDefinition();
		def.id = id;
		let dataview = new DataView(bytes.buffer);
		do {
			var opcode = dataview.readUint8();
			this.handleOpcode(def, opcode, dataview);
		} while (opcode != 0);

		return def;
	}

	handleOpcode(def, opcode, dataview) {
		var length;
		var index;
		if (opcode == 1) {
			length = dataview.readUint8();
			def.models = [];

			for (index = 0; index < length; ++index) {
				def.models.push(dataview.readUint16());
			}
		} else if (opcode == 2) {
			var name = dataview.readString();
			def.name = name;
		}
		else if (opcode == 12) {
			def.size = dataview.readUint8();
		}
		else if (opcode == 13) {
			def.standingAnimation = dataview.readUint16();
		}
		else if (opcode == 14) {
			def.walkingAnimation = dataview.readUint16();
		}
		else if (opcode == 15) {
			def.rotateLeftAnimation = dataview.readUint16();
		}
		else if (opcode == 16) {
			def.rotateRightAnimation = dataview.readUint16();
		}
		else if (opcode == 17) {
			def.walkingAnimation = dataview.readUint16();
			def.rotate180Animation = dataview.readUint16();
			def.rotate90RightAnimation = dataview.readUint16();
			def.rotate90LeftAnimation = dataview.readUint16();
		}
		else if (opcode == 18) {
			def.category = dataview.readUint16();
		}
		else if (opcode >= 30 && opcode < 35) {
			if (def.actions == undefined)
				def.actions = [];

			var readString = dataview.readString();
			def.actions[opcode - 30] = readString;

			if (def.actions[opcode - 30] == "Hidden") {
				def.actions[opcode - 30] = undefined;
			}
		}
		else if (opcode == 40) {
			length = dataview.readUint8();
			def.recolorToFind = [];
			def.recolorToReplace = [];

			for (index = 0; index < length; ++index) {
				def.recolorToFind.push(dataview.readUint16());
				def.recolorToReplace.push(dataview.readUint16());
			}

		}
		else if (opcode == 41) {
			length = dataview.readUint8();
			def.retextureToFind = [];
			def.retextureToReplace = [];

			for (index = 0; index < length; ++index) {
				def.retextureToFind.push(dataview.readUint16());
				def.retextureToReplace.push(dataview.readUint16());
			}

		}
		else if (opcode == 60) {
			length = dataview.readUint8();
			def.chatheadModels = [];

			for (index = 0; index < length; ++index) {
				def.chatheadModels.push(dataview.readUint16());
			}

		}
		else if (opcode == 93) {
			def.isMinimapVisible = false;
		}
		else if (opcode == 95) {
			def.combatLevel = dataview.readUint16();
		}
		else if (opcode == 97) {
			this.widthScale = dataview.readUint16();
		}
		else if (opcode == 98) {
			def.heightScale = dataview.readUint16();
		}
		else if (opcode == 99) {
			def.hasRenderPriority = true;
		}
		else if (opcode == 100) {
			def.ambient = dataview.readInt8();
		}
		else if (opcode == 101) {
			def.contrast = dataview.readInt8();
		}
		else if (opcode == 102) {
			//def.headIcon = dataview.readUint16(); //before rev210
			let bitfield = dataview.readUint8();
			let len = 0;
			for (let var5 = bitfield; var5 != 0; var5 >>= 1) {
				++len;
			}

			def.headIconArchiveIds = [];
			def.headIconSpriteIndex = [];

			for (let i = 0; i < len; i++) {
				if ((bitfield & 1 << i) == 0) {
					def.headIconArchiveIds.push(-1);
					def.headIconSpriteIndex.push(1);
				}
				else {
					def.headIconArchiveIds.push(dataview.readBigSmart2());
					def.headIconSpriteIndex.push(dataview.readUnsignedShortSmartMinusOne());
				}
			}
		}
		else if (opcode == 103) {
			def.rotationSpeed = dataview.readUint16();
		}
		else if (opcode == 106) {
			def.varbitId = dataview.readUint16();
			if (def.varbitId == 65535) {
				def.varbitId = -1;
			}

			def.varpIndex = dataview.readUint16();

			if (def.varpIndex == 65535) {
				def.varpIndex = -1;
			}

			length = dataview.readUint8();

			def.configs = [];

			for (index = 0; index <= length; ++index) {
				def.configs[index] = dataview.readUint16();

				if (def.configs[index] == '\uffff') {
					def.configs[index] = -1;
				}
			}

			def.configs[length + 1] = -1;

		}
		else if (opcode == 107) {
			def.isInteractable = false;
		}
		else if (opcode == 109) {
			def.rotationFlag = false;
		}
		else if (opcode == 111) {
			def.isPet = true;
		}
		else if (opcode == 114)
		{
			def.runAnimation = dataview.readUint16();
		}
		else if (opcode == 115)
		{
			def.runAnimation = dataview.readUint16();
			def.runRotate180Animation = dataview.readUint16();
			def.runRotateLeftAnimation = dataview.readUint16();
			def.runRotateRightAnimation = dataview.readUint16();
		}
		else if (opcode == 116)
		{
			def.crawlAnimation = dataview.readUint16();
		}
		else if (opcode == 117)
		{
			def.crawlAnimation = dataview.readUint16();
			def.crawlRotate180Animation = dataview.readUint16();
			def.crawlRotateLeftAnimation = dataview.readUint16();
			def.crawlRotateRightAnimation = dataview.readUint16();
		}
		else if (opcode == 118) {
			def.varbitId = dataview.readUint16();

			if (def.varbitId == 65535) {
				def.varbitId = -1;
			}

			def.varpIndex = dataview.readUint16();

			if (def.varpIndex == 65535) {
				def.varpIndex = -1;
			}

			var varVal = dataview.readUint16();

			if (varVal == 0xFFFF) {
				varVal = -1;
			}

			length = dataview.readUint8();
			def.configs = [];

			for (index = 0; index <= length; ++index) {
				var value = dataview.readUint16();

				if (def.configs[index] == '\uffff') {
					def.configs.push(-1);
				} else {
					def.configs.push(value);
				}
			}

			def.configs.push(varVal);
		}
		else if (opcode == 249) {
			length = dataview.readUint8();

			def.params = {};

			for (var i = 0; i < length; i++) {
				var isString = dataview.readUint8() == 1;

				var key = dataview.readInt24();
				var value;

				if (isString) {
					value = dataview.readString();
				}

				else {
					value = dataview.readInt32()
				}

				def.params[key] = value;
			}
		}
	}
}
;// CONCATENATED MODULE: ./src/cacheReader/loaders/ItemLoader.js
class ItemDefinition {

}
class ItemLoader {

    load(bytes, id) {
        //console.log(id, bytes)
        let def = new ItemDefinition();
        def.id = id;
        let dataview = new DataView(bytes.buffer);
        let lastOpCode = 0;
        do {
            var opcode = dataview.readUint8();
            this.handleOpcode(def, opcode, dataview, lastOpCode);
            lastOpCode = opcode;
        } while (opcode != 0);

        if (def.stackable == 1)
		{
			def.weight = 0;
		}

        return def;
    }

    handleOpcode(def, opcode, dataview, lastOpCode) {
        if (opcode == 1) {
            def.inventoryModel = dataview.readUint16();
        }
        else if (opcode == 2) {
            def.name = dataview.readString();
        }
        else if (opcode == 4) {
            def.zoom2d = dataview.readUint16();
        }
        else if (opcode == 5) {
            def.xan2d = dataview.readUint16();
        }
        else if (opcode == 6) {
            def.yan2d = dataview.readUint16();
        }
        else if (opcode == 7) {
            def.xOffset2d = dataview.readUint16();
            if (def.xOffset2d > 32767) {
                def.xOffset2d -= 65536;
            }
        }
        else if (opcode == 8) {
            def.yOffset2d = dataview.readUint16();
            if (def.yOffset2d > 32767) {
                def.yOffset2d -= 65536;
            }
        }
        else if (opcode == 9) {
            def.unknown1 = dataview.readString();
        }
        else if (opcode == 11) {
            def.stackable = 1;
        }
        else if (opcode == 12) {
            def.cost = dataview.readInt32();
        }
        else if (opcode == 13)
		{
			def.wearPos1 = dataview.readInt8();
		}
		else if (opcode == 14)
		{
			def.wearPos2 = dataview.readInt8();
		}
        else if (opcode == 16) {
            def.members = true;
        }
        else if (opcode == 23) {
            def.maleModel0 = dataview.readUint16();
            def.maleOffset = dataview.readUint8();
        }
        else if (opcode == 24) {
            def.maleModel1 = dataview.readUint16();
        }
        else if (opcode == 25) {
            def.femaleModel0 = dataview.readUint16();
            def.femaleOffset = dataview.readUint8();
        }
        else if (opcode == 26) {
            def.femaleModel1 = dataview.readUint16();
        }
        else if (opcode == 27)
		{
			def.wearPos3 = dataview.readInt8();
		}
        else if (opcode >= 30 && opcode < 35) {
            if (def.options == undefined)
                def.options = [];

            def.options[opcode - 30] = dataview.readString();
            if (def.options[opcode - 30] == "Hidden") {
                def.options[opcode - 30] = null;
            }
        }
        else if (opcode >= 35 && opcode < 40) {
            if (def.interfaceOptions == undefined)
                def.interfaceOptions = [];
            def.interfaceOptions[opcode - 35] = dataview.readString();
        }
        else if (opcode == 40) {
            var var5 = dataview.readUint8();
            def.colorFind = [];
            def.colorReplace = [];

            for (var var4 = 0; var4 < var5; ++var4) {
                def.colorFind[var4] = dataview.readUint16();
                def.colorReplace[var4] = dataview.readUint16();
            }

        }
        else if (opcode == 41) {
            var var5 = dataview.readUint8();
            def.textureFind = [];
            def.textureReplace = [];

            for (var var4 = 0; var4 < var5; ++var4) {
                def.textureFind[var4] = dataview.readUint16();
                def.textureReplace[var4] = dataview.readUint16();
            }

        }
        else if (opcode == 42) {
            def.shiftClickDropIndex = dataview.readInt8();
        }
        else if (opcode == 65) {
            def.isTradeable = true;
        }
        else if (opcode == 75)
		{
			def.weight = dataview.readInt16();
		}
        else if (opcode == 78) {
            def.maleModel2 = dataview.readUint16();
        }
        else if (opcode == 79) {
            def.femaleModel2 = dataview.readUint16();
        }
        else if (opcode == 90) {
            def.maleHeadModel = dataview.readUint16();
        }
        else if (opcode == 91) {
            def.femaleHeadModel = dataview.readUint16();
        }
        else if (opcode == 92) {
            def.maleHeadModel2 = dataview.readUint16();
        }
        else if (opcode == 93) {
            def.femaleHeadModel2 = dataview.readUint16();
        }
        else if (opcode == 94) {
            def.category = dataview.readUint16();
        }
        else if (opcode == 95) {
            def.zan2d = dataview.readUint16();
        }
        else if (opcode == 97) {
            def.notedID = dataview.readUint16();
        }
        else if (opcode == 98) {
            def.notedTemplate = dataview.readUint16();
        }
        else if (opcode >= 100 && opcode < 110) {
            if (def.countObj == undefined) {
                def.countObj = [];
                def.countCo = [];
            }

            def.countObj[opcode - 100] = dataview.readUint16();
            def.countCo[opcode - 100] = dataview.readUint16();
        }
        else if (opcode == 110) {
            def.resizeX = dataview.readUint16();
        }
        else if (opcode == 111) {
            def.resizeY = dataview.readUint16();
        }
        else if (opcode == 112) {
            def.resizeZ = dataview.readUint16();
        }
        else if (opcode == 113) {
            def.ambient = dataview.readInt8();
        }
        else if (opcode == 114) {
            def.contrast = dataview.readInt8();
        }
        else if (opcode == 115) {
            def.team = dataview.readUint8();
        }
        else if (opcode == 139) {
            def.boughtId = dataview.readUint16();
        }
        else if (opcode == 140) {
            def.boughtTemplateId = dataview.readUint16();
        }
        else if (opcode == 148) {
            def.placeholderId = dataview.readUint16();
        }
        else if (opcode == 149) {
            def.placeholderTemplateId = dataview.readUint16();
        }
        else if (opcode == 249) {
            var length = dataview.readUint8();
            def.params = {};

            for (var i = 0; i < length; i++) {
                var isString = dataview.readUint8() == 1;

                var key = dataview.readInt24();
                var value;

                if (isString) {
                    value = dataview.readString();
                }
                else {
                    value = dataview.readInt32()
                }

                def.params[key] = value;
            }
        }else{
            //console.error("UNHANDLED OPCODE [ItemLoader]: " + opcode + " last: " + lastOpCode)
        }
    }
}
;// CONCATENATED MODULE: ./src/cacheReader/loaders/SequenceLoader.js
class SequenceDefinition {

}
class SequenceLoader {

	load(bytes, id) {
		let def = new SequenceDefinition();
		def.id = id;
		let dataview = new DataView(bytes.buffer);
		do {
			var opcode = dataview.readUint8();
			this.handleOpcode(def, opcode, dataview);
		} while (opcode != 0);

		return def;
	}

	handleOpcode(def, opcode, dataview) {
		var var3;
		var var4;
		if (opcode == 1) {
			var3 = dataview.readUint16();
			def.frameLengths = [];

			for (var4 = 0; var4 < var3; ++var4) {
				def.frameLengths[var4] = dataview.readUint16();
			}

			def.frameIDs = [];

			for (var4 = 0; var4 < var3; ++var4) {
				def.frameIDs[var4] = dataview.readUint16();
			}

			for (var4 = 0; var4 < var3; ++var4) {
				def.frameIDs[var4] += dataview.readUint16() << 16;
			}
		}
		else if (opcode == 2) {
			def.frameStep = dataview.readUint16();
		}
		else if (opcode == 3) {
			var3 = dataview.readUint8();
			def.interleaveLeave = [];

			for (var4 = 0; var4 < var3; ++var4) {
				def.interleaveLeave[var4] = dataview.readUint8();
			}

			def.interleaveLeave[var3] = 9999999;
		}
		else if (opcode == 4) {
			def.stretches = true;
		}
		else if (opcode == 5) {
			def.forcedPriority = dataview.readUint8();
		}
		else if (opcode == 6) {
			def.leftHandItem = dataview.readUint16();
		}
		else if (opcode == 7) {
			def.rightHandItem = dataview.readUint16();
		}
		else if (opcode == 8) {
			def.maxLoops = dataview.readUint8();
		}
		else if (opcode == 9) {
			def.precedenceAnimating = dataview.readUint8();
		}
		else if (opcode == 10) {
			def.priority = dataview.readUint8();
		}
		else if (opcode == 11) {
			def.replyMode = dataview.readUint8();
		}
		else if (opcode == 12) {
			var3 = dataview.readUint8();
			def.chatFrameIds = [];

			for (var4 = 0; var4 < var3; ++var4) {
				def.chatFrameIds[var4] = dataview.readUint16();
			}

			for (var4 = 0; var4 < var3; ++var4) {
				def.chatFrameIds[var4] += dataview.readUint16() << 16;
			}
		}
		else if (opcode == 13) {
			var3 = dataview.readUint8();
			def.frameSounds = [];

			for (var4 = 0; var4 < var3; ++var4) {
				def.frameSounds[var4] = dataview.readUint24();
			}
		}
		else if (opcode == 14) {
			def.animMayaID = dataview.readInt32();
		}
		else if (opcode == 15) {
			var3 = dataview.readUint16();
			def.animMayaFrameSounds = {};

			for (var4 = 0; var4 < var3; ++var4)
			{
				let var5 = dataview.readUint16();
				let var6 = dataview.readUint24();
				def.animMayaFrameSounds[var5] = var6;
			}
		}
		else if (opcode == 16)
		{
			def.animMayaStart = dataview.readUint16();
			def.animMayaEnd = dataview.readUint16();
		}
		else if (opcode == 17)
		{
			def.animMayaMasks = new Array(256).fill().map(x => false);

			var3 = dataview.readUint8();

			for (var4 = 0; var4 < var3; ++var4)
			{
				def.animMayaMasks[dataview.readUint8()] = true;
			}
		}
	}
}
;// CONCATENATED MODULE: ./src/cacheReader/loaders/OverlayLoader.js
class OverlayDefinition {

}
class OverlayLoader {

    load(bytes, id) {
        let def = new OverlayDefinition();
        def.id = id;
        let dataview = new DataView(bytes.buffer);
        do {
            var opcode = dataview.readUint8();
            this.handleOpcode(def, opcode, dataview);
        } while (opcode != 0);

        return def;
    }

    handleOpcode(def, opcode, dataview) {
        if (opcode == 0) {
            return;
        }

        if (opcode == 1) {
            def.color = dataview.readInt24();
        }
        else if (opcode == 2) {
            def.texture = dataview.readUint8();
        }
        else if (opcode == 5) {
            def.hideUnderlay = false;
        }
        else if (opcode == 7) {
            def.secondaryColor = dataview.readInt24();
        }
    }
}
;// CONCATENATED MODULE: ./src/cacheReader/loaders/UnderlayLoader.js
class UnderlayDefinition {

}
class UnderlayLoader {

    load(bytes, id) {
        let def = new UnderlayDefinition();
        def.id = id;
        let dataview = new DataView(bytes.buffer);
        do {
            var opcode = dataview.readUint8();
            this.handleOpcode(def, opcode, dataview);
        } while (opcode != 0);

        return def;
    }

    handleOpcode(def, opcode, dataview) {
        if (opcode == 0) {
            return;
        }
        if (opcode == 1)
        {
            def.color = dataview.readInt24();
        }
    }
}
;// CONCATENATED MODULE: ./src/cacheReader/cacheTypes/ConfigType.js








const ConfigType = { 
    UNDERLAY: {id: 1, loader: UnderlayLoader}, 		//Underlay
	UNKNOWN2: {id: 2, loader: undefined},			//
	IDENTKIT: {id: 3, loader: KitLoader},			//Kit
	OVERLAY: {id: 4, loader: OverlayLoader},		//Overlay
	INV: {id: 5, loader: undefined},				//Inventory
	OBJECT: {id: 6, loader: ObjectLoader},			//Objects
	UNKNOWN7: {id: 7, loader: undefined},			//
	ENUM: {id: 8, loader: undefined},				//Enum
	NPC: {id: 9, loader: NpcLoader},				//NPC
	ITEM: {id: 10, loader: ItemLoader},				//Items
	PARAMS: {id: 11, loader: undefined},			//Params
	SEQUENCE: {id: 12, loader: SequenceLoader},		//Sequence
	SPOTANIM: {id: 13, loader: undefined},			//Spot anim
	VARBIT: {id: 14, loader: undefined}, 			//Varbit
	VARCLIENTSTRING: {id: 15, loader: undefined},
	VARPLAYER: {id: 16, loader: undefined},			//Varp
	UNKNOWN18: {id: 18, loader: undefined},			//
	VARCLIENT: {id: 19, loader: undefined},			//Varc
	UNKNOWN20: {id: 20, loader: undefined},			//
	UNKNOWN22: {id: 22, loader: undefined},			//
	UNKNOWN24: {id: 24, loader: undefined},			//
	UNKNOWN25: {id: 25, loader: undefined},			//
	UNKNOWN26: {id: 26, loader: undefined},			//
	UNKNOWN27: {id: 27, loader: undefined},			//
	UNKNOWN28: {id: 28, loader: undefined},			//
	UNKNOWN29: {id: 29, loader: undefined},			//
	UNKNOWN30: {id: 30, loader: undefined},			//
	UNKNOWN31: {id: 31, loader: undefined},			//
	HITSPLAT: {id: 32, loader: undefined},			//Hitsplat
	HEALTHBAR: {id: 33, loader: undefined},
	STRUCT: {id: 34, loader: undefined},			//Struct
	AREA: {id: 35, loader: undefined},

	UNKNOWN47: {id: 47, loader: undefined}, //Possible scripts
	UNKNOWN54: {id: 54, loader: undefined}, //Possible scripts
	UNKNOWN70: {id: 70, loader: undefined},



	valueOf(id){
        var values = Object.values(ConfigType);
        var keys = Object.keys(ConfigType);
        for(var i=0;i<values.length;i++) {
            if(id == values[i].id)
                return ConfigType[keys[i]];
        }
        return undefined;
    }
}
Object.freeze(ConfigType);

/* harmony default export */ const cacheTypes_ConfigType = (ConfigType);
;// CONCATENATED MODULE: ./src/cacheReader/CacheDefinitionLoader.js



class CacheDefinitionLoader {
	constructor(indexId, archive, options = {}) {
		this.indexType = cacheTypes_IndexType.valueOf(indexId);
		this.archive = archive;
		this.options = options;
		//this.files = files;
	}

	load(rscache) {
		return new Promise((resolve, reject) => {
			/*
			if (this.indexType == IndexType.MAPS) {
				this.loadMaps();
				resolve();
				return;
			}
			*/

			var loader;
			if (this.indexType == cacheTypes_IndexType.CONFIGS) {
				loader = new (cacheTypes_ConfigType.valueOf(this.archive.id).loader)();
			} else {
				loader = new this.indexType.loader();
			}

			var promises = [];
			let newFiles = [];
			//console.log(this.files.length);
			for (var i = 0; i < this.archive.files.length; i++) {
				var defId = this.archive.files.length > 1 ? this.archive.files[i].id : this.archive.id;
				//unload archive file memory to replace it with definition info
				//if (this.archive.files[i].id > 25000)
				//	console.log(this.archive.files[i], this.archive.files[i].content.length);
				let loadedValue;
				try {
					loadedValue = loader.load(this.archive.files[i].content, defId, rscache, this.options);
				} catch (error) {
					console.log(i, this.archive.files.length, defId, this.options)
					reject(error);
					throw error;
				}
				let loadPromise = Promise.resolve(loadedValue);
				loadPromise.iterator = i;
				//map it to a whole new array
				//otherwise values wil map over themselves
				//ex 11232 maps to 11253 but 11253 maps to 11293
				loadPromise.then((loadedDef) => {
					//console.log(loadedDef.id);


					if (this.archive.files.length > 1) {
						if (newFiles[loadedDef.id] == undefined)
							newFiles[loadedDef.id] = this.archive.files[loadPromise.iterator];

						newFiles[loadedDef.id].def = loadedDef;
						newFiles[loadedDef.id].content = undefined;
					} else {
						if (newFiles[0] == undefined)
							newFiles[0] = this.archive.files[0];

						newFiles[0].def = loadedDef;
						newFiles[0].content = undefined;
					}
				})
				promises.push(loadPromise);
				//this.files[i].def = loader.load(this.files[i].content, rscache);
			}
			Promise.all(promises).then(() => {
				this.archive.files = newFiles;
				resolve();
			});
			//resolve();
		});
	}

	loadMaps() {
		/*
		let MAX_REGIONS = 32768;
		for (let i = 0; i < MAX_REGIONS; ++i)
		{
			let x = i >> 8;
			let y = i & 0xFF;

			Archive map = index.findArchiveByName("m" + x + "_" + y);
			Archive land = index.findArchiveByName("l" + x + "_" + y);

			assert (map == null) == (land == null);

			if (map == null || land == null)
			{
				continue;
			}

			byte[] data = map.decompress(storage.loadArchive(map));
			MapDefinition mapDef = new MapLoader().load(x, y, data);
			LocationsDefinition locDef = null;

			int[] keys = keyManager.getKeys(i);
			if (keys != null)
			{
				try
				{
					data = land.decompress(storage.loadArchive(land), keys);
				}
				catch (IOException ex)
				{
					continue;
				}

				locDef = new LocationsLoader().load(x, y, data);
			}

			mapMap.put(mapDef, locDef);
		}

		return mapMap;
		*/
	}
}
// EXTERNAL MODULE: ./node_modules/gzip-js/lib/gzip.js
var gzip = __webpack_require__(606);
// EXTERNAL MODULE: ./node_modules/web-worker/cjs/browser.js
var cjs_browser = __webpack_require__(763);
var browser_default = /*#__PURE__*/__webpack_require__.n(cjs_browser);
// EXTERNAL MODULE: ./node_modules/bz2/index.js
var node_modules_bz2 = __webpack_require__(264);
var bz2_default = /*#__PURE__*/__webpack_require__.n(node_modules_bz2);
;// CONCATENATED MODULE: ./src/cacheReader/CacheRequester.js







class CacheRequester {
	constructor(datFile) {
		this.promises = {};
		this.datData = datFile;

		/*
				if ('caches' in window) { //if we are able to use cache api
					var request = rootDir + "cache/" + "main_file_cache.dat2";
					this.datDataPromise = caches.open('osrsrenderer').then((browserCache) => {
						return caches.has(request).then((cacheExists) => {
							if (!cacheExists) {
								return browserCache.add(request).then(() => {
									//needs to be retrieved after its been added otherwise will return undefined
									return browserCache.match(request)
										.then((response) => response.blob())
										.then((blob) => blob.arrayBuffer());
								});
							} else {
								return browserCache.match(request)
									.then((response) => response.blob())
									.then((blob) => blob.arrayBuffer());
							}
						});
					});
		
					this.datDataPromise.then((blobArray) => {
						this.datData = new Uint8Array(blobArray);
					});
		
				} else {
					this.datDataPromise = Ajax.getFileBytes(rootDir + "main_file_cache.dat2");
					this.datDataPromise.then((x) => {
						this.datData = x;
					});
				}
		*/


	}

	setXteas(xteas) {
		this.xteas = xteas;
	}

	readDataThreaded(index, size, segment, archiveId = 0) {
		var promiseResolve;
		var readPromise = new Promise((resolve, reject) => { promiseResolve = resolve; });

		if (this.promises[index] == undefined)
			this.promises[index] = {};

		if (this.promises[index][archiveId] == undefined) {
			this.promises[index][archiveId] = [];

			var compressedData = new Uint8Array(size);
			this.readSector(compressedData, segment, archiveId);

			compressedData = compressedData.buffer;
			//console.log(compressedData);
			var localWorker = new (browser_default())(new URL(/* worker import */ __webpack_require__.p + __webpack_require__.u(900), __webpack_require__.b));

			localWorker.postMessage({ index, segment, archiveId, compressedData }, [compressedData]);
			//console.log(compressedData);
			localWorker.onmessage = (event) => {
				event.data.decompressedData = new Uint8Array(event.data.decompressedData);

				var length = this.promises[event.data.index.id][event.data.archiveId].length;
				for (var i = 0; i < length; i++) {
					this.promises[event.data.index.id][event.data.archiveId][i](event.data);
				}
				this.promises[event.data.index.id][event.data.archiveId] = undefined;
				localWorker.terminate();
				//delete localWorker;
				localWorker = undefined;
			};
		}

		this.promises[index][archiveId].push(promiseResolve);

		return readPromise;
	}

	readData(index, size, segment, archiveId = 0, keys) {
		/*
		this.worker.onmessage = function(event) {
			//event.data.decompressedData
			console.log(event);
		};
		*/
		let key;
		if (index.id == cacheTypes_IndexType.MAPS.id && this.xteas != undefined) {
			if (this.xteas[archiveId] != undefined) {//if its not a mapdef then it will have a key
				key = this.xteas[archiveId].key;
			}
		}

		return Promise.resolve().then(() => {
			var compressedData = new Uint8Array(size);
			this.readSector(compressedData, segment, archiveId);

			let dataview = new DataView(compressedData.buffer);
			var compressionOpcode = dataview.getUint8(0);
			var compressedLength = dataview.getUint32(1);

			var data;
			var decompressedData;
			//console.log(compressionOpcode);
			if (compressionOpcode == 0) { //none
				data = new Uint8Array(dataview.buffer.slice(5, 9 + compressedLength));
				data = this.decrypt(data, compressedLength, key);
				decompressedData = data;
				index.revision = dataview.getUint16(data.buffer.byteLength)
			} else if (compressionOpcode == 1) { //bz2
				data = new Uint8Array(dataview.buffer.slice(9, 9 + compressedLength));
				this.decrypt(data, compressedLength, key);
				var header = "BZh1";
				var bzData = new Uint8Array(4 + data.length);
				bzData[0] = 'B'.charCodeAt(0);
				bzData[1] = 'Z'.charCodeAt(0);
				bzData[2] = 'h'.charCodeAt(0);
				bzData[3] = '1'.charCodeAt(0);
				bzData.set(data, 4)

				if ((bz2_default()) != undefined && (bz2_default()).decompress != undefined) {
					decompressedData = bz2_default().decompress(bzData);
				} else {
					decompressedData = bz2.decompress(bzData);
				}
			} else if (compressionOpcode == 2) { //gzip
				//console.log(compressedData);
				//console.log(compressedLength);
				//console.log(new Int8Array(dataview.buffer).slice(5, 9 + compressedLength));
				let unencryptedData = new Uint8Array(dataview.buffer.slice(5, 9 + compressedLength));
				data = this.decrypt(unencryptedData, unencryptedData.length, key);
				let leftOver = unencryptedData.slice(data.length);

				var mergedArray = new Uint8Array(data.length + leftOver.length);
				mergedArray.set(data);
				mergedArray.set(leftOver, data.length);

				//console.log(data);
				//console.log(leftOver);
				//console.log(mergedArray);
				//add the end of the compressed data onto the decrypted?
				let decryptedDataview = new DataView(mergedArray.buffer);

				data = new Uint8Array(decryptedDataview.buffer.slice(4))
				//console.log(new Uint8Array(dataview.buffer)+"");
				let unzipped;

				try {
					//console.log("unzipping");
					unzipped = gzip.unzip(data);
					//console.log("unzipped");
				} catch {
					throw "Could not unzip with key:" + key;
				}

				decompressedData = new Uint8Array(unzipped);

			}

			return { index, archiveId, decompressedData };
		});
	}

	readSector(buffer, pos, archiveId) {
		var convertedPos = pos * 520;
		let dataview = new DataView(this.datData.buffer);

		var currentArchive;
		var currentPart;
		var nextSector;
		var currentIndex;


		if (archiveId > 0xFFFF) {
			currentArchive = dataview.getUint32(convertedPos + 0);
			currentPart = dataview.getUint16(convertedPos + 4);
			nextSector = dataview.getUint24(convertedPos + 6);
			currentIndex = dataview.getUint8(convertedPos + 4);
		} else {
			currentArchive = dataview.getUint16(convertedPos + 0);
			currentPart = dataview.getUint16(convertedPos + 2);
			nextSector = dataview.getUint24(convertedPos + 4);
			currentIndex = dataview.getUint8(convertedPos + 7);
		}

		var data;
		if (nextSector != 0 || buffer.byteLength == 512 || buffer.byteLength % 512 == 0)
			data = new Uint8Array(dataview.buffer.slice(convertedPos + 8, convertedPos + 520));
		else
			data = new Uint8Array(dataview.buffer.slice(convertedPos + 8, convertedPos + 8 + (buffer.byteLength % 512)));

		buffer.set(data, dataview.getInt16(convertedPos + 2) * 512);

		if (nextSector != 0)
			this.readSector(buffer, nextSector);

	}

	decrypt(data, len, key) {
		if (key == undefined) {
			return data;
		}

		let GOLDEN_RATIO = 0x9E3779B9;
		let ROUNDS = 32;

		let dataview = new DataView(data.buffer);
		let out = [];

		let numBlocks = Math.floor(len / 8);
		//console.log(numBlocks);
		for (let block = 0; block < numBlocks; ++block) {
			let v0 = dataview.readInt32();
			let v1 = dataview.readInt32();
			let sum = GOLDEN_RATIO * ROUNDS;
			for (let i = 0; i < ROUNDS; ++i) {
				v1 -= (((v0 << 4) ^ (v0 >>> 5)) + v0) ^ (sum + key[(sum >>> 11) & 3]);
				sum -= GOLDEN_RATIO;
				v0 -= (((v1 << 4) ^ (v1 >>> 5)) + v1) ^ (sum + key[sum & 3]);
			}
			out.push((v0 >> 24) & 0xFF);
			out.push((v0 >> 16) & 0xFF);
			out.push((v0 >> 8) & 0xFF);
			out.push(v0 & 0xFF);

			out.push((v1 >> 24) & 0xFF);
			out.push((v1 >> 16) & 0xFF);
			out.push((v1 >> 8) & 0xFF);
			out.push(v1 & 0xFF);
		}

		return new Uint8Array(out);
	}


}
;// CONCATENATED MODULE: ./src/cacheReader/cacheTypes/Archive.js
class ArchiveData {
	constructor() {
		this.id = 0;
		this.name = "";
		this.hash = 0;
		this.nameHash = 0;
		this.crc = 0;
		this.revision = 0;
		this.filesLoaded = false;
		this.files = [];
	}

	loadFiles(data) {
		if (this.files.length == 1) {
			this.files[0].content = data;
			return;
		}
		let dataview = new DataView(data.buffer);
		let chunks = dataview.getUint8(data.length - 1);

		let chunkSizes = [];
		for (let i = 0; i < this.files.length; i++) {
			chunkSizes[i] = [];
		}
		let fileSizes = Array(this.files.length).fill(0);

		let streamPosition = data.length - 1 - chunks * this.files.length * 4;

		//the following two loops can be combined in to one
		for (let i = 0; i < chunks; i++) {
			let chunkSize = 0;
			for (let id = 0; id < this.files.length; id++) {
				//magic number - only needed sometimes. really must be some type of js issue
				if (streamPosition == 981413) {
					if (data[streamPosition] == 0) data[streamPosition] = 255;
				}

				//console.log(data[streamPosition], data[streamPosition + 1], data[streamPosition + 2], data[streamPosition + 3]);

				let delta = dataview.getInt32(streamPosition);
				chunkSize += delta;
				streamPosition += 4;
				chunkSizes[id][i] = chunkSize;
				fileSizes[id] += chunkSize;
				//if (id > 32915 && id < 32950)
				//console.log(id, delta, streamPosition);
				//if (id > 32210 && id < 32220)
				//console.log(id, delta, streamPosition);
			}
		}
		//console.log(data);
		//console.log(chunkSizes);
		//console.log(fileSizes);

		let fileOffsets = Array(this.files.length).fill(0);

		streamPosition = 0;

		for (let i = 0; i < chunks; i++) {
			for (let id = 0; id < this.files.length; id++) {
				let chunkSize = chunkSizes[id][i];
				//console.log(chunkSize);
				//System.out.println(fileOffsets[id] + " " + chunkSize + " " + stream.getOffset() + " " + stream.remaining());
				//console.log(id + " " + fileOffsets[id] + " " + chunkSize);

				//dez - can be done in a better way
				var newData = new Uint8Array(dataview.buffer.slice(streamPosition, streamPosition + chunkSize));
				var contentUpdate = new Uint8Array(this.files[id].content.length + newData.length);
				contentUpdate.set(this.files[id].content);
				contentUpdate.set(newData, this.files[id].content.length);

				this.files[id].content = contentUpdate;
				fileOffsets[id] += chunkSize;

				if (id == 0) {
					//console.log(this.files[id].content);
					//console.log(newData);
					//console.log(streamPosition);
				}
				streamPosition += newData.byteLength;
				//console.log(fileOffsets[id]);
				//console.log(this.files[id].content);
			}
		}
		//console.log(fileOffsets);
		//console.log(this.files[0]);

	}
}
;// CONCATENATED MODULE: ./src/cacheReader/cacheTypes/File.js
class FileData {
	constructor(id) {
		this.id = id;
		this.name = "";
		this.def = undefined;
		this.nameHash = 0;
		this.size = 0;
		this.content = [];
	}
}
;// CONCATENATED MODULE: ./src/cacheReader/HashConverter.js
var nameHashLookup = {}
/* harmony default export */ const HashConverter = ({
    nameHashLookup
});
;// CONCATENATED MODULE: ./src/cacheReader/cacheTypes/Index.js





class Index {
	constructor(id) {
		this.id = id;
		this.protocol = 0;
		this.revision = -1;
		this.hash = 0;
		this.crc = 0;
		this.compression = 0;
		this.named = false;
		this.archivesCount = 0;
		this.archives = {};
		this.indexSegments = [];
	}

	loadIndexData(data) {
		let dataview = new DataView(data.buffer);

		this.protocol = dataview.readUint8();

		if (this.protocol >= 6) {
			this.revision = dataview.readInt32();
		}
		this.hash = dataview.readUint8();

		this.named = (1 & this.hash) != 0;

		if (this.protocol >= 7) {
			this.archivesCount = dataview.readBigSmart();
		} else {
			this.archivesCount = dataview.readUint16();
		}


		let lastArchiveId = 0;
		for (let i = 0; i < this.archivesCount; i++) {

			let archiveId;
			if (this.protocol >= 7) {
				archiveId = lastArchiveId += dataview.readBigSmart();
			} else {
				archiveId = lastArchiveId += dataview.readInt16();
			}

			this.archives[archiveId] = new ArchiveData();
			this.archives[archiveId].id = archiveId;
		}

		let archiveKeys = Object.keys(this.archives);

		if (this.named) {
			for (let i = 0; i < this.archivesCount; i++) {
				let nameHash = dataview.readInt32();
				this.archives[archiveKeys[i]].nameHash = nameHash;
				if (HashConverter[nameHash] != undefined)
					this.archives[archiveKeys[i]].name = HashConverter[nameHash];
			}
		}

		for (let i = 0; i < this.archivesCount; i++) {
			let crc = dataview.readInt32();
			this.archives[archiveKeys[i]].crc = crc;
		}

		for (let i = 0; i < this.archivesCount; i++) {
			let revision = dataview.readInt32();
			this.archives[archiveKeys[i]].revision = revision;
		}

		for (let i = 0; i < this.archivesCount; i++) {
			let numberOfFiles;
			if (this.protocol >= 7) {
				numberOfFiles = dataview.readBigSmart();
			} else {
				numberOfFiles = dataview.readUint16();
			}
			if (numberOfFiles <= 0)
				console.log("Warning: Files <= 0 for archive " + i + ". Files amount: " + numberOfFiles);
			this.archives[archiveKeys[i]].files = Array(numberOfFiles).fill(undefined);
		}

		for (let i = 0; i < this.archivesCount; i++) {
			let fileID = 0;
			for (let j = 0; j < this.archives[archiveKeys[i]].files.length; j++) {

				if (this.protocol >= 7) {
					fileID += dataview.readBigSmart();
				} else {
					fileID += dataview.readUint16();
				}
				this.archives[archiveKeys[i]].files[j] = new FileData(fileID);
			}
		}

		if (this.named) {
			for (let i = 0; i < this.archivesCount; i++) {
				for (let j = 0; j < this.archives[archiveKeys[i]].files.length; j++) {
					let fileName = dataview.readUint32();

					this.archives[archiveKeys[i]].files[j].nameHash = fileName;

					if (HashConverter[fileName] != undefined)
						this.archives[archiveKeys[i]].files[j].name = HashConverter[fileName];

				}
			}
		}
	}

	toString() {
		return this.id;
	}
}

// EXTERNAL MODULE: ./node_modules/browser-or-node/lib/index.js
var lib = __webpack_require__(818);
;// CONCATENATED MODULE: ./node_modules/axios/lib/helpers/bind.js


function bind(fn, thisArg) {
  return function wrap() {
    return fn.apply(thisArg, arguments);
  };
}

;// CONCATENATED MODULE: ./node_modules/axios/lib/utils.js




// utils is a library of generic helper functions non-specific to axios

const {toString: utils_toString} = Object.prototype;
const {getPrototypeOf} = Object;

const kindOf = (cache => thing => {
    const str = utils_toString.call(thing);
    return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
})(Object.create(null));

const kindOfTest = (type) => {
  type = type.toLowerCase();
  return (thing) => kindOf(thing) === type
}

const typeOfTest = type => thing => typeof thing === type;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 *
 * @returns {boolean} True if value is an Array, otherwise false
 */
const {isArray} = Array;

/**
 * Determine if a value is undefined
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if the value is undefined, otherwise false
 */
const isUndefined = typeOfTest('undefined');

/**
 * Determine if a value is a Buffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && isFunction(val.constructor.isBuffer) && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
const isArrayBuffer = kindOfTest('ArrayBuffer');


/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  let result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (isArrayBuffer(val.buffer));
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a String, otherwise false
 */
const isString = typeOfTest('string');

/**
 * Determine if a value is a Function
 *
 * @param {*} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
const isFunction = typeOfTest('function');

/**
 * Determine if a value is a Number
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Number, otherwise false
 */
const isNumber = typeOfTest('number');

/**
 * Determine if a value is an Object
 *
 * @param {*} thing The value to test
 *
 * @returns {boolean} True if value is an Object, otherwise false
 */
const isObject = (thing) => thing !== null && typeof thing === 'object';

/**
 * Determine if a value is a Boolean
 *
 * @param {*} thing The value to test
 * @returns {boolean} True if value is a Boolean, otherwise false
 */
const isBoolean = thing => thing === true || thing === false;

/**
 * Determine if a value is a plain Object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a plain Object, otherwise false
 */
const isPlainObject = (val) => {
  if (kindOf(val) !== 'object') {
    return false;
  }

  const prototype = getPrototypeOf(val);
  return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in val) && !(Symbol.iterator in val);
}

/**
 * Determine if a value is a Date
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Date, otherwise false
 */
const isDate = kindOfTest('Date');

/**
 * Determine if a value is a File
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a File, otherwise false
 */
const isFile = kindOfTest('File');

/**
 * Determine if a value is a Blob
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Blob, otherwise false
 */
const isBlob = kindOfTest('Blob');

/**
 * Determine if a value is a FileList
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a File, otherwise false
 */
const isFileList = kindOfTest('FileList');

/**
 * Determine if a value is a Stream
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Stream, otherwise false
 */
const isStream = (val) => isObject(val) && isFunction(val.pipe);

/**
 * Determine if a value is a FormData
 *
 * @param {*} thing The value to test
 *
 * @returns {boolean} True if value is an FormData, otherwise false
 */
const isFormData = (thing) => {
  const pattern = '[object FormData]';
  return thing && (
    (typeof FormData === 'function' && thing instanceof FormData) ||
    utils_toString.call(thing) === pattern ||
    (isFunction(thing.toString) && thing.toString() === pattern)
  );
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
const isURLSearchParams = kindOfTest('URLSearchParams');

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 *
 * @returns {String} The String freed of excess whitespace
 */
const trim = (str) => str.trim ?
  str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 *
 * @param {Boolean} [allOwnKeys = false]
 * @returns {any}
 */
function forEach(obj, fn, {allOwnKeys = false} = {}) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  let i;
  let l;

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
    const len = keys.length;
    let key;

    for (i = 0; i < len; i++) {
      key = keys[i];
      fn.call(null, obj[key], key, obj);
    }
  }
}

function findKey(obj, key) {
  key = key.toLowerCase();
  const keys = Object.keys(obj);
  let i = keys.length;
  let _key;
  while (i-- > 0) {
    _key = keys[i];
    if (key === _key.toLowerCase()) {
      return _key;
    }
  }
  return null;
}

const _global = (() => {
  /*eslint no-undef:0*/
  if (typeof globalThis !== "undefined") return globalThis;
  return typeof self !== "undefined" ? self : (typeof window !== 'undefined' ? window : global)
})();

const isContextDefined = (context) => !isUndefined(context) && context !== _global;

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 *
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  const {caseless} = isContextDefined(this) && this || {};
  const result = {};
  const assignValue = (val, key) => {
    const targetKey = caseless && findKey(result, key) || key;
    if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
      result[targetKey] = merge(result[targetKey], val);
    } else if (isPlainObject(val)) {
      result[targetKey] = merge({}, val);
    } else if (isArray(val)) {
      result[targetKey] = val.slice();
    } else {
      result[targetKey] = val;
    }
  }

  for (let i = 0, l = arguments.length; i < l; i++) {
    arguments[i] && forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 *
 * @param {Boolean} [allOwnKeys]
 * @returns {Object} The resulting value of object a
 */
const extend = (a, b, thisArg, {allOwnKeys}= {}) => {
  forEach(b, (val, key) => {
    if (thisArg && isFunction(val)) {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  }, {allOwnKeys});
  return a;
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 *
 * @returns {string} content value without BOM
 */
const stripBOM = (content) => {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

/**
 * Inherit the prototype methods from one constructor into another
 * @param {function} constructor
 * @param {function} superConstructor
 * @param {object} [props]
 * @param {object} [descriptors]
 *
 * @returns {void}
 */
const inherits = (constructor, superConstructor, props, descriptors) => {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors);
  constructor.prototype.constructor = constructor;
  Object.defineProperty(constructor, 'super', {
    value: superConstructor.prototype
  });
  props && Object.assign(constructor.prototype, props);
}

/**
 * Resolve object with deep prototype chain to a flat object
 * @param {Object} sourceObj source object
 * @param {Object} [destObj]
 * @param {Function|Boolean} [filter]
 * @param {Function} [propFilter]
 *
 * @returns {Object}
 */
const toFlatObject = (sourceObj, destObj, filter, propFilter) => {
  let props;
  let i;
  let prop;
  const merged = {};

  destObj = destObj || {};
  // eslint-disable-next-line no-eq-null,eqeqeq
  if (sourceObj == null) return destObj;

  do {
    props = Object.getOwnPropertyNames(sourceObj);
    i = props.length;
    while (i-- > 0) {
      prop = props[i];
      if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
        destObj[prop] = sourceObj[prop];
        merged[prop] = true;
      }
    }
    sourceObj = filter !== false && getPrototypeOf(sourceObj);
  } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);

  return destObj;
}

/**
 * Determines whether a string ends with the characters of a specified string
 *
 * @param {String} str
 * @param {String} searchString
 * @param {Number} [position= 0]
 *
 * @returns {boolean}
 */
const endsWith = (str, searchString, position) => {
  str = String(str);
  if (position === undefined || position > str.length) {
    position = str.length;
  }
  position -= searchString.length;
  const lastIndex = str.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
}


/**
 * Returns new array from array like object or null if failed
 *
 * @param {*} [thing]
 *
 * @returns {?Array}
 */
const toArray = (thing) => {
  if (!thing) return null;
  if (isArray(thing)) return thing;
  let i = thing.length;
  if (!isNumber(i)) return null;
  const arr = new Array(i);
  while (i-- > 0) {
    arr[i] = thing[i];
  }
  return arr;
}

/**
 * Checking if the Uint8Array exists and if it does, it returns a function that checks if the
 * thing passed in is an instance of Uint8Array
 *
 * @param {TypedArray}
 *
 * @returns {Array}
 */
// eslint-disable-next-line func-names
const isTypedArray = (TypedArray => {
  // eslint-disable-next-line func-names
  return thing => {
    return TypedArray && thing instanceof TypedArray;
  };
})(typeof Uint8Array !== 'undefined' && getPrototypeOf(Uint8Array));

/**
 * For each entry in the object, call the function with the key and value.
 *
 * @param {Object<any, any>} obj - The object to iterate over.
 * @param {Function} fn - The function to call for each entry.
 *
 * @returns {void}
 */
const forEachEntry = (obj, fn) => {
  const generator = obj && obj[Symbol.iterator];

  const iterator = generator.call(obj);

  let result;

  while ((result = iterator.next()) && !result.done) {
    const pair = result.value;
    fn.call(obj, pair[0], pair[1]);
  }
}

/**
 * It takes a regular expression and a string, and returns an array of all the matches
 *
 * @param {string} regExp - The regular expression to match against.
 * @param {string} str - The string to search.
 *
 * @returns {Array<boolean>}
 */
const matchAll = (regExp, str) => {
  let matches;
  const arr = [];

  while ((matches = regExp.exec(str)) !== null) {
    arr.push(matches);
  }

  return arr;
}

/* Checking if the kindOfTest function returns true when passed an HTMLFormElement. */
const isHTMLForm = kindOfTest('HTMLFormElement');

const toCamelCase = str => {
  return str.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,
    function replacer(m, p1, p2) {
      return p1.toUpperCase() + p2;
    }
  );
};

/* Creating a function that will check if an object has a property. */
const utils_hasOwnProperty = (({hasOwnProperty}) => (obj, prop) => hasOwnProperty.call(obj, prop))(Object.prototype);

/**
 * Determine if a value is a RegExp object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a RegExp object, otherwise false
 */
const isRegExp = kindOfTest('RegExp');

const reduceDescriptors = (obj, reducer) => {
  const descriptors = Object.getOwnPropertyDescriptors(obj);
  const reducedDescriptors = {};

  forEach(descriptors, (descriptor, name) => {
    if (reducer(descriptor, name, obj) !== false) {
      reducedDescriptors[name] = descriptor;
    }
  });

  Object.defineProperties(obj, reducedDescriptors);
}

/**
 * Makes all methods read-only
 * @param {Object} obj
 */

const freezeMethods = (obj) => {
  reduceDescriptors(obj, (descriptor, name) => {
    // skip restricted props in strict mode
    if (isFunction(obj) && ['arguments', 'caller', 'callee'].indexOf(name) !== -1) {
      return false;
    }

    const value = obj[name];

    if (!isFunction(value)) return;

    descriptor.enumerable = false;

    if ('writable' in descriptor) {
      descriptor.writable = false;
      return;
    }

    if (!descriptor.set) {
      descriptor.set = () => {
        throw Error('Can not rewrite read-only method \'' + name + '\'');
      };
    }
  });
}

const toObjectSet = (arrayOrString, delimiter) => {
  const obj = {};

  const define = (arr) => {
    arr.forEach(value => {
      obj[value] = true;
    });
  }

  isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));

  return obj;
}

const noop = () => {}

const toFiniteNumber = (value, defaultValue) => {
  value = +value;
  return Number.isFinite(value) ? value : defaultValue;
}

const ALPHA = 'abcdefghijklmnopqrstuvwxyz'

const DIGIT = '0123456789';

const ALPHABET = {
  DIGIT,
  ALPHA,
  ALPHA_DIGIT: ALPHA + ALPHA.toUpperCase() + DIGIT
}

const generateString = (size = 16, alphabet = ALPHABET.ALPHA_DIGIT) => {
  let str = '';
  const {length} = alphabet;
  while (size--) {
    str += alphabet[Math.random() * length|0]
  }

  return str;
}

/**
 * If the thing is a FormData object, return true, otherwise return false.
 *
 * @param {unknown} thing - The thing to check.
 *
 * @returns {boolean}
 */
function isSpecCompliantForm(thing) {
  return !!(thing && isFunction(thing.append) && thing[Symbol.toStringTag] === 'FormData' && thing[Symbol.iterator]);
}

const toJSONObject = (obj) => {
  const stack = new Array(10);

  const visit = (source, i) => {

    if (isObject(source)) {
      if (stack.indexOf(source) >= 0) {
        return;
      }

      if(!('toJSON' in source)) {
        stack[i] = source;
        const target = isArray(source) ? [] : {};

        forEach(source, (value, key) => {
          const reducedValue = visit(value, i + 1);
          !isUndefined(reducedValue) && (target[key] = reducedValue);
        });

        stack[i] = undefined;

        return target;
      }
    }

    return source;
  }

  return visit(obj, 0);
}

/* harmony default export */ const utils = ({
  isArray,
  isArrayBuffer,
  isBuffer,
  isFormData,
  isArrayBufferView,
  isString,
  isNumber,
  isBoolean,
  isObject,
  isPlainObject,
  isUndefined,
  isDate,
  isFile,
  isBlob,
  isRegExp,
  isFunction,
  isStream,
  isURLSearchParams,
  isTypedArray,
  isFileList,
  forEach,
  merge,
  extend,
  trim,
  stripBOM,
  inherits,
  toFlatObject,
  kindOf,
  kindOfTest,
  endsWith,
  toArray,
  forEachEntry,
  matchAll,
  isHTMLForm,
  hasOwnProperty: utils_hasOwnProperty,
  hasOwnProp: utils_hasOwnProperty, // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors,
  freezeMethods,
  toObjectSet,
  toCamelCase,
  noop,
  toFiniteNumber,
  findKey,
  global: _global,
  isContextDefined,
  ALPHABET,
  generateString,
  isSpecCompliantForm,
  toJSONObject
});

;// CONCATENATED MODULE: ./node_modules/axios/lib/core/AxiosError.js




/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [config] The config.
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 *
 * @returns {Error} The created error.
 */
function AxiosError(message, code, config, request, response) {
  Error.call(this);

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = (new Error()).stack;
  }

  this.message = message;
  this.name = 'AxiosError';
  code && (this.code = code);
  config && (this.config = config);
  request && (this.request = request);
  response && (this.response = response);
}

utils.inherits(AxiosError, Error, {
  toJSON: function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: utils.toJSONObject(this.config),
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});

const AxiosError_prototype = AxiosError.prototype;
const descriptors = {};

[
  'ERR_BAD_OPTION_VALUE',
  'ERR_BAD_OPTION',
  'ECONNABORTED',
  'ETIMEDOUT',
  'ERR_NETWORK',
  'ERR_FR_TOO_MANY_REDIRECTS',
  'ERR_DEPRECATED',
  'ERR_BAD_RESPONSE',
  'ERR_BAD_REQUEST',
  'ERR_CANCELED',
  'ERR_NOT_SUPPORT',
  'ERR_INVALID_URL'
// eslint-disable-next-line func-names
].forEach(code => {
  descriptors[code] = {value: code};
});

Object.defineProperties(AxiosError, descriptors);
Object.defineProperty(AxiosError_prototype, 'isAxiosError', {value: true});

// eslint-disable-next-line func-names
AxiosError.from = (error, code, config, request, response, customProps) => {
  const axiosError = Object.create(AxiosError_prototype);

  utils.toFlatObject(error, axiosError, function filter(obj) {
    return obj !== Error.prototype;
  }, prop => {
    return prop !== 'isAxiosError';
  });

  AxiosError.call(axiosError, error.message, code, config, request, response);

  axiosError.cause = error;

  axiosError.name = error.name;

  customProps && Object.assign(axiosError, customProps);

  return axiosError;
};

/* harmony default export */ const core_AxiosError = (AxiosError);

;// CONCATENATED MODULE: ./node_modules/axios/lib/helpers/null.js
// eslint-disable-next-line strict
/* harmony default export */ const helpers_null = (null);

;// CONCATENATED MODULE: ./node_modules/axios/lib/helpers/toFormData.js




// temporary hotfix to avoid circular references until AxiosURLSearchParams is refactored


/**
 * Determines if the given thing is a array or js object.
 *
 * @param {string} thing - The object or array to be visited.
 *
 * @returns {boolean}
 */
function isVisitable(thing) {
  return utils.isPlainObject(thing) || utils.isArray(thing);
}

/**
 * It removes the brackets from the end of a string
 *
 * @param {string} key - The key of the parameter.
 *
 * @returns {string} the key without the brackets.
 */
function removeBrackets(key) {
  return utils.endsWith(key, '[]') ? key.slice(0, -2) : key;
}

/**
 * It takes a path, a key, and a boolean, and returns a string
 *
 * @param {string} path - The path to the current key.
 * @param {string} key - The key of the current object being iterated over.
 * @param {string} dots - If true, the key will be rendered with dots instead of brackets.
 *
 * @returns {string} The path to the current key.
 */
function renderKey(path, key, dots) {
  if (!path) return key;
  return path.concat(key).map(function each(token, i) {
    // eslint-disable-next-line no-param-reassign
    token = removeBrackets(token);
    return !dots && i ? '[' + token + ']' : token;
  }).join(dots ? '.' : '');
}

/**
 * If the array is an array and none of its elements are visitable, then it's a flat array.
 *
 * @param {Array<any>} arr - The array to check
 *
 * @returns {boolean}
 */
function isFlatArray(arr) {
  return utils.isArray(arr) && !arr.some(isVisitable);
}

const predicates = utils.toFlatObject(utils, {}, null, function filter(prop) {
  return /^is[A-Z]/.test(prop);
});

/**
 * Convert a data object to FormData
 *
 * @param {Object} obj
 * @param {?Object} [formData]
 * @param {?Object} [options]
 * @param {Function} [options.visitor]
 * @param {Boolean} [options.metaTokens = true]
 * @param {Boolean} [options.dots = false]
 * @param {?Boolean} [options.indexes = false]
 *
 * @returns {Object}
 **/

/**
 * It converts an object into a FormData object
 *
 * @param {Object<any, any>} obj - The object to convert to form data.
 * @param {string} formData - The FormData object to append to.
 * @param {Object<string, any>} options
 *
 * @returns
 */
function toFormData(obj, formData, options) {
  if (!utils.isObject(obj)) {
    throw new TypeError('target must be an object');
  }

  // eslint-disable-next-line no-param-reassign
  formData = formData || new (helpers_null || FormData)();

  // eslint-disable-next-line no-param-reassign
  options = utils.toFlatObject(options, {
    metaTokens: true,
    dots: false,
    indexes: false
  }, false, function defined(option, source) {
    // eslint-disable-next-line no-eq-null,eqeqeq
    return !utils.isUndefined(source[option]);
  });

  const metaTokens = options.metaTokens;
  // eslint-disable-next-line no-use-before-define
  const visitor = options.visitor || defaultVisitor;
  const dots = options.dots;
  const indexes = options.indexes;
  const _Blob = options.Blob || typeof Blob !== 'undefined' && Blob;
  const useBlob = _Blob && utils.isSpecCompliantForm(formData);

  if (!utils.isFunction(visitor)) {
    throw new TypeError('visitor must be a function');
  }

  function convertValue(value) {
    if (value === null) return '';

    if (utils.isDate(value)) {
      return value.toISOString();
    }

    if (!useBlob && utils.isBlob(value)) {
      throw new core_AxiosError('Blob is not supported. Use a Buffer instead.');
    }

    if (utils.isArrayBuffer(value) || utils.isTypedArray(value)) {
      return useBlob && typeof Blob === 'function' ? new Blob([value]) : Buffer.from(value);
    }

    return value;
  }

  /**
   * Default visitor.
   *
   * @param {*} value
   * @param {String|Number} key
   * @param {Array<String|Number>} path
   * @this {FormData}
   *
   * @returns {boolean} return true to visit the each prop of the value recursively
   */
  function defaultVisitor(value, key, path) {
    let arr = value;

    if (value && !path && typeof value === 'object') {
      if (utils.endsWith(key, '{}')) {
        // eslint-disable-next-line no-param-reassign
        key = metaTokens ? key : key.slice(0, -2);
        // eslint-disable-next-line no-param-reassign
        value = JSON.stringify(value);
      } else if (
        (utils.isArray(value) && isFlatArray(value)) ||
        ((utils.isFileList(value) || utils.endsWith(key, '[]')) && (arr = utils.toArray(value))
        )) {
        // eslint-disable-next-line no-param-reassign
        key = removeBrackets(key);

        arr.forEach(function each(el, index) {
          !(utils.isUndefined(el) || el === null) && formData.append(
            // eslint-disable-next-line no-nested-ternary
            indexes === true ? renderKey([key], index, dots) : (indexes === null ? key : key + '[]'),
            convertValue(el)
          );
        });
        return false;
      }
    }

    if (isVisitable(value)) {
      return true;
    }

    formData.append(renderKey(path, key, dots), convertValue(value));

    return false;
  }

  const stack = [];

  const exposedHelpers = Object.assign(predicates, {
    defaultVisitor,
    convertValue,
    isVisitable
  });

  function build(value, path) {
    if (utils.isUndefined(value)) return;

    if (stack.indexOf(value) !== -1) {
      throw Error('Circular reference detected in ' + path.join('.'));
    }

    stack.push(value);

    utils.forEach(value, function each(el, key) {
      const result = !(utils.isUndefined(el) || el === null) && visitor.call(
        formData, el, utils.isString(key) ? key.trim() : key, path, exposedHelpers
      );

      if (result === true) {
        build(el, path ? path.concat(key) : [key]);
      }
    });

    stack.pop();
  }

  if (!utils.isObject(obj)) {
    throw new TypeError('data must be an object');
  }

  build(obj);

  return formData;
}

/* harmony default export */ const helpers_toFormData = (toFormData);

;// CONCATENATED MODULE: ./node_modules/axios/lib/helpers/AxiosURLSearchParams.js




/**
 * It encodes a string by replacing all characters that are not in the unreserved set with
 * their percent-encoded equivalents
 *
 * @param {string} str - The string to encode.
 *
 * @returns {string} The encoded string.
 */
function encode(str) {
  const charMap = {
    '!': '%21',
    "'": '%27',
    '(': '%28',
    ')': '%29',
    '~': '%7E',
    '%20': '+',
    '%00': '\x00'
  };
  return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
    return charMap[match];
  });
}

/**
 * It takes a params object and converts it to a FormData object
 *
 * @param {Object<string, any>} params - The parameters to be converted to a FormData object.
 * @param {Object<string, any>} options - The options object passed to the Axios constructor.
 *
 * @returns {void}
 */
function AxiosURLSearchParams(params, options) {
  this._pairs = [];

  params && helpers_toFormData(params, this, options);
}

const AxiosURLSearchParams_prototype = AxiosURLSearchParams.prototype;

AxiosURLSearchParams_prototype.append = function append(name, value) {
  this._pairs.push([name, value]);
};

AxiosURLSearchParams_prototype.toString = function toString(encoder) {
  const _encode = encoder ? function(value) {
    return encoder.call(this, value, encode);
  } : encode;

  return this._pairs.map(function each(pair) {
    return _encode(pair[0]) + '=' + _encode(pair[1]);
  }, '').join('&');
};

/* harmony default export */ const helpers_AxiosURLSearchParams = (AxiosURLSearchParams);

;// CONCATENATED MODULE: ./node_modules/axios/lib/helpers/buildURL.js





/**
 * It replaces all instances of the characters `:`, `$`, `,`, `+`, `[`, and `]` with their
 * URI encoded counterparts
 *
 * @param {string} val The value to be encoded.
 *
 * @returns {string} The encoded value.
 */
function buildURL_encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @param {?object} options
 *
 * @returns {string} The formatted url
 */
function buildURL(url, params, options) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }
  
  const _encode = options && options.encode || buildURL_encode;

  const serializeFn = options && options.serialize;

  let serializedParams;

  if (serializeFn) {
    serializedParams = serializeFn(params, options);
  } else {
    serializedParams = utils.isURLSearchParams(params) ?
      params.toString() :
      new helpers_AxiosURLSearchParams(params, options).toString(_encode);
  }

  if (serializedParams) {
    const hashmarkIndex = url.indexOf("#");

    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
}

;// CONCATENATED MODULE: ./node_modules/axios/lib/core/InterceptorManager.js




class InterceptorManager {
  constructor() {
    this.handlers = [];
  }

  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(fulfilled, rejected, options) {
    this.handlers.push({
      fulfilled,
      rejected,
      synchronous: options ? options.synchronous : false,
      runWhen: options ? options.runWhen : null
    });
    return this.handlers.length - 1;
  }

  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  }

  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    if (this.handlers) {
      this.handlers = [];
    }
  }

  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(fn) {
    utils.forEach(this.handlers, function forEachHandler(h) {
      if (h !== null) {
        fn(h);
      }
    });
  }
}

/* harmony default export */ const core_InterceptorManager = (InterceptorManager);

;// CONCATENATED MODULE: ./node_modules/axios/lib/defaults/transitional.js


/* harmony default export */ const defaults_transitional = ({
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
});

;// CONCATENATED MODULE: ./node_modules/axios/lib/platform/browser/classes/URLSearchParams.js



/* harmony default export */ const classes_URLSearchParams = (typeof URLSearchParams !== 'undefined' ? URLSearchParams : helpers_AxiosURLSearchParams);

;// CONCATENATED MODULE: ./node_modules/axios/lib/platform/browser/classes/FormData.js


/* harmony default export */ const classes_FormData = (typeof FormData !== 'undefined' ? FormData : null);

;// CONCATENATED MODULE: ./node_modules/axios/lib/platform/browser/classes/Blob.js


/* harmony default export */ const classes_Blob = (typeof Blob !== 'undefined' ? Blob : null);

;// CONCATENATED MODULE: ./node_modules/axios/lib/platform/browser/index.js




/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 *
 * @returns {boolean}
 */
const isStandardBrowserEnv = (() => {
  let product;
  if (typeof navigator !== 'undefined' && (
    (product = navigator.product) === 'ReactNative' ||
    product === 'NativeScript' ||
    product === 'NS')
  ) {
    return false;
  }

  return typeof window !== 'undefined' && typeof document !== 'undefined';
})();

/**
 * Determine if we're running in a standard browser webWorker environment
 *
 * Although the `isStandardBrowserEnv` method indicates that
 * `allows axios to run in a web worker`, the WebWorker will still be
 * filtered out due to its judgment standard
 * `typeof window !== 'undefined' && typeof document !== 'undefined'`.
 * This leads to a problem when axios post `FormData` in webWorker
 */
 const isStandardBrowserWebWorkerEnv = (() => {
  return (
    typeof WorkerGlobalScope !== 'undefined' &&
    // eslint-disable-next-line no-undef
    self instanceof WorkerGlobalScope &&
    typeof self.importScripts === 'function'
  );
})();


/* harmony default export */ const platform_browser = ({
  isBrowser: true,
  classes: {
    URLSearchParams: classes_URLSearchParams,
    FormData: classes_FormData,
    Blob: classes_Blob
  },
  isStandardBrowserEnv,
  isStandardBrowserWebWorkerEnv,
  protocols: ['http', 'https', 'file', 'blob', 'url', 'data']
});

;// CONCATENATED MODULE: ./node_modules/axios/lib/helpers/toURLEncodedForm.js






function toURLEncodedForm(data, options) {
  return helpers_toFormData(data, new platform_browser.classes.URLSearchParams(), Object.assign({
    visitor: function(value, key, path, helpers) {
      if (platform_browser.isNode && utils.isBuffer(value)) {
        this.append(key, value.toString('base64'));
        return false;
      }

      return helpers.defaultVisitor.apply(this, arguments);
    }
  }, options));
}

;// CONCATENATED MODULE: ./node_modules/axios/lib/helpers/formDataToJSON.js




/**
 * It takes a string like `foo[x][y][z]` and returns an array like `['foo', 'x', 'y', 'z']
 *
 * @param {string} name - The name of the property to get.
 *
 * @returns An array of strings.
 */
function parsePropPath(name) {
  // foo[x][y][z]
  // foo.x.y.z
  // foo-x-y-z
  // foo x y z
  return utils.matchAll(/\w+|\[(\w*)]/g, name).map(match => {
    return match[0] === '[]' ? '' : match[1] || match[0];
  });
}

/**
 * Convert an array to an object.
 *
 * @param {Array<any>} arr - The array to convert to an object.
 *
 * @returns An object with the same keys and values as the array.
 */
function arrayToObject(arr) {
  const obj = {};
  const keys = Object.keys(arr);
  let i;
  const len = keys.length;
  let key;
  for (i = 0; i < len; i++) {
    key = keys[i];
    obj[key] = arr[key];
  }
  return obj;
}

/**
 * It takes a FormData object and returns a JavaScript object
 *
 * @param {string} formData The FormData object to convert to JSON.
 *
 * @returns {Object<string, any> | null} The converted object.
 */
function formDataToJSON(formData) {
  function buildPath(path, value, target, index) {
    let name = path[index++];
    const isNumericKey = Number.isFinite(+name);
    const isLast = index >= path.length;
    name = !name && utils.isArray(target) ? target.length : name;

    if (isLast) {
      if (utils.hasOwnProp(target, name)) {
        target[name] = [target[name], value];
      } else {
        target[name] = value;
      }

      return !isNumericKey;
    }

    if (!target[name] || !utils.isObject(target[name])) {
      target[name] = [];
    }

    const result = buildPath(path, value, target[name], index);

    if (result && utils.isArray(target[name])) {
      target[name] = arrayToObject(target[name]);
    }

    return !isNumericKey;
  }

  if (utils.isFormData(formData) && utils.isFunction(formData.entries)) {
    const obj = {};

    utils.forEachEntry(formData, (name, value) => {
      buildPath(parsePropPath(name), value, obj, 0);
    });

    return obj;
  }

  return null;
}

/* harmony default export */ const helpers_formDataToJSON = (formDataToJSON);

;// CONCATENATED MODULE: ./node_modules/axios/lib/defaults/index.js










const DEFAULT_CONTENT_TYPE = {
  'Content-Type': undefined
};

/**
 * It takes a string, tries to parse it, and if it fails, it returns the stringified version
 * of the input
 *
 * @param {any} rawValue - The value to be stringified.
 * @param {Function} parser - A function that parses a string into a JavaScript object.
 * @param {Function} encoder - A function that takes a value and returns a string.
 *
 * @returns {string} A stringified version of the rawValue.
 */
function stringifySafely(rawValue, parser, encoder) {
  if (utils.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils.trim(rawValue);
    } catch (e) {
      if (e.name !== 'SyntaxError') {
        throw e;
      }
    }
  }

  return (encoder || JSON.stringify)(rawValue);
}

const defaults = {

  transitional: defaults_transitional,

  adapter: ['xhr', 'http'],

  transformRequest: [function transformRequest(data, headers) {
    const contentType = headers.getContentType() || '';
    const hasJSONContentType = contentType.indexOf('application/json') > -1;
    const isObjectPayload = utils.isObject(data);

    if (isObjectPayload && utils.isHTMLForm(data)) {
      data = new FormData(data);
    }

    const isFormData = utils.isFormData(data);

    if (isFormData) {
      if (!hasJSONContentType) {
        return data;
      }
      return hasJSONContentType ? JSON.stringify(helpers_formDataToJSON(data)) : data;
    }

    if (utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      headers.setContentType('application/x-www-form-urlencoded;charset=utf-8', false);
      return data.toString();
    }

    let isFileList;

    if (isObjectPayload) {
      if (contentType.indexOf('application/x-www-form-urlencoded') > -1) {
        return toURLEncodedForm(data, this.formSerializer).toString();
      }

      if ((isFileList = utils.isFileList(data)) || contentType.indexOf('multipart/form-data') > -1) {
        const _FormData = this.env && this.env.FormData;

        return helpers_toFormData(
          isFileList ? {'files[]': data} : data,
          _FormData && new _FormData(),
          this.formSerializer
        );
      }
    }

    if (isObjectPayload || hasJSONContentType ) {
      headers.setContentType('application/json', false);
      return stringifySafely(data);
    }

    return data;
  }],

  transformResponse: [function transformResponse(data) {
    const transitional = this.transitional || defaults.transitional;
    const forcedJSONParsing = transitional && transitional.forcedJSONParsing;
    const JSONRequested = this.responseType === 'json';

    if (data && utils.isString(data) && ((forcedJSONParsing && !this.responseType) || JSONRequested)) {
      const silentJSONParsing = transitional && transitional.silentJSONParsing;
      const strictJSONParsing = !silentJSONParsing && JSONRequested;

      try {
        return JSON.parse(data);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === 'SyntaxError') {
            throw core_AxiosError.from(e, core_AxiosError.ERR_BAD_RESPONSE, this, null, this.response);
          }
          throw e;
        }
      }
    }

    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  env: {
    FormData: platform_browser.classes.FormData,
    Blob: platform_browser.classes.Blob
  },

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },

  headers: {
    common: {
      'Accept': 'application/json, text/plain, */*'
    }
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

/* harmony default export */ const lib_defaults = (defaults);

;// CONCATENATED MODULE: ./node_modules/axios/lib/helpers/parseHeaders.js




// RawAxiosHeaders whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
const ignoreDuplicateOf = utils.toObjectSet([
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
]);

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} rawHeaders Headers needing to be parsed
 *
 * @returns {Object} Headers parsed into an object
 */
/* harmony default export */ const parseHeaders = (rawHeaders => {
  const parsed = {};
  let key;
  let val;
  let i;

  rawHeaders && rawHeaders.split('\n').forEach(function parser(line) {
    i = line.indexOf(':');
    key = line.substring(0, i).trim().toLowerCase();
    val = line.substring(i + 1).trim();

    if (!key || (parsed[key] && ignoreDuplicateOf[key])) {
      return;
    }

    if (key === 'set-cookie') {
      if (parsed[key]) {
        parsed[key].push(val);
      } else {
        parsed[key] = [val];
      }
    } else {
      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
    }
  });

  return parsed;
});

;// CONCATENATED MODULE: ./node_modules/axios/lib/core/AxiosHeaders.js





const $internals = Symbol('internals');

function normalizeHeader(header) {
  return header && String(header).trim().toLowerCase();
}

function normalizeValue(value) {
  if (value === false || value == null) {
    return value;
  }

  return utils.isArray(value) ? value.map(normalizeValue) : String(value);
}

function parseTokens(str) {
  const tokens = Object.create(null);
  const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let match;

  while ((match = tokensRE.exec(str))) {
    tokens[match[1]] = match[2];
  }

  return tokens;
}

function isValidHeaderName(str) {
  return /^[-_a-zA-Z]+$/.test(str.trim());
}

function matchHeaderValue(context, value, header, filter, isHeaderNameFilter) {
  if (utils.isFunction(filter)) {
    return filter.call(this, value, header);
  }

  if (isHeaderNameFilter) {
    value = header;
  }

  if (!utils.isString(value)) return;

  if (utils.isString(filter)) {
    return value.indexOf(filter) !== -1;
  }

  if (utils.isRegExp(filter)) {
    return filter.test(value);
  }
}

function formatHeader(header) {
  return header.trim()
    .toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
      return char.toUpperCase() + str;
    });
}

function buildAccessors(obj, header) {
  const accessorName = utils.toCamelCase(' ' + header);

  ['get', 'set', 'has'].forEach(methodName => {
    Object.defineProperty(obj, methodName + accessorName, {
      value: function(arg1, arg2, arg3) {
        return this[methodName].call(this, header, arg1, arg2, arg3);
      },
      configurable: true
    });
  });
}

class AxiosHeaders {
  constructor(headers) {
    headers && this.set(headers);
  }

  set(header, valueOrRewrite, rewrite) {
    const self = this;

    function setHeader(_value, _header, _rewrite) {
      const lHeader = normalizeHeader(_header);

      if (!lHeader) {
        throw new Error('header name must be a non-empty string');
      }

      const key = utils.findKey(self, lHeader);

      if(!key || self[key] === undefined || _rewrite === true || (_rewrite === undefined && self[key] !== false)) {
        self[key || _header] = normalizeValue(_value);
      }
    }

    const setHeaders = (headers, _rewrite) =>
      utils.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));

    if (utils.isPlainObject(header) || header instanceof this.constructor) {
      setHeaders(header, valueOrRewrite)
    } else if(utils.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
      setHeaders(parseHeaders(header), valueOrRewrite);
    } else {
      header != null && setHeader(valueOrRewrite, header, rewrite);
    }

    return this;
  }

  get(header, parser) {
    header = normalizeHeader(header);

    if (header) {
      const key = utils.findKey(this, header);

      if (key) {
        const value = this[key];

        if (!parser) {
          return value;
        }

        if (parser === true) {
          return parseTokens(value);
        }

        if (utils.isFunction(parser)) {
          return parser.call(this, value, key);
        }

        if (utils.isRegExp(parser)) {
          return parser.exec(value);
        }

        throw new TypeError('parser must be boolean|regexp|function');
      }
    }
  }

  has(header, matcher) {
    header = normalizeHeader(header);

    if (header) {
      const key = utils.findKey(this, header);

      return !!(key && this[key] !== undefined && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
    }

    return false;
  }

  delete(header, matcher) {
    const self = this;
    let deleted = false;

    function deleteHeader(_header) {
      _header = normalizeHeader(_header);

      if (_header) {
        const key = utils.findKey(self, _header);

        if (key && (!matcher || matchHeaderValue(self, self[key], key, matcher))) {
          delete self[key];

          deleted = true;
        }
      }
    }

    if (utils.isArray(header)) {
      header.forEach(deleteHeader);
    } else {
      deleteHeader(header);
    }

    return deleted;
  }

  clear(matcher) {
    const keys = Object.keys(this);
    let i = keys.length;
    let deleted = false;

    while (i--) {
      const key = keys[i];
      if(!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
        delete this[key];
        deleted = true;
      }
    }

    return deleted;
  }

  normalize(format) {
    const self = this;
    const headers = {};

    utils.forEach(this, (value, header) => {
      const key = utils.findKey(headers, header);

      if (key) {
        self[key] = normalizeValue(value);
        delete self[header];
        return;
      }

      const normalized = format ? formatHeader(header) : String(header).trim();

      if (normalized !== header) {
        delete self[header];
      }

      self[normalized] = normalizeValue(value);

      headers[normalized] = true;
    });

    return this;
  }

  concat(...targets) {
    return this.constructor.concat(this, ...targets);
  }

  toJSON(asStrings) {
    const obj = Object.create(null);

    utils.forEach(this, (value, header) => {
      value != null && value !== false && (obj[header] = asStrings && utils.isArray(value) ? value.join(', ') : value);
    });

    return obj;
  }

  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }

  toString() {
    return Object.entries(this.toJSON()).map(([header, value]) => header + ': ' + value).join('\n');
  }

  get [Symbol.toStringTag]() {
    return 'AxiosHeaders';
  }

  static from(thing) {
    return thing instanceof this ? thing : new this(thing);
  }

  static concat(first, ...targets) {
    const computed = new this(first);

    targets.forEach((target) => computed.set(target));

    return computed;
  }

  static accessor(header) {
    const internals = this[$internals] = (this[$internals] = {
      accessors: {}
    });

    const accessors = internals.accessors;
    const prototype = this.prototype;

    function defineAccessor(_header) {
      const lHeader = normalizeHeader(_header);

      if (!accessors[lHeader]) {
        buildAccessors(prototype, _header);
        accessors[lHeader] = true;
      }
    }

    utils.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);

    return this;
  }
}

AxiosHeaders.accessor(['Content-Type', 'Content-Length', 'Accept', 'Accept-Encoding', 'User-Agent', 'Authorization']);

utils.freezeMethods(AxiosHeaders.prototype);
utils.freezeMethods(AxiosHeaders);

/* harmony default export */ const core_AxiosHeaders = (AxiosHeaders);

;// CONCATENATED MODULE: ./node_modules/axios/lib/core/transformData.js






/**
 * Transform the data for a request or a response
 *
 * @param {Array|Function} fns A single function or Array of functions
 * @param {?Object} response The response object
 *
 * @returns {*} The resulting transformed data
 */
function transformData(fns, response) {
  const config = this || lib_defaults;
  const context = response || config;
  const headers = core_AxiosHeaders.from(context.headers);
  let data = context.data;

  utils.forEach(fns, function transform(fn) {
    data = fn.call(config, data, headers.normalize(), response ? response.status : undefined);
  });

  headers.normalize();

  return data;
}

;// CONCATENATED MODULE: ./node_modules/axios/lib/cancel/isCancel.js


function isCancel(value) {
  return !!(value && value.__CANCEL__);
}

;// CONCATENATED MODULE: ./node_modules/axios/lib/cancel/CanceledError.js





/**
 * A `CanceledError` is an object that is thrown when an operation is canceled.
 *
 * @param {string=} message The message.
 * @param {Object=} config The config.
 * @param {Object=} request The request.
 *
 * @returns {CanceledError} The created error.
 */
function CanceledError(message, config, request) {
  // eslint-disable-next-line no-eq-null,eqeqeq
  core_AxiosError.call(this, message == null ? 'canceled' : message, core_AxiosError.ERR_CANCELED, config, request);
  this.name = 'CanceledError';
}

utils.inherits(CanceledError, core_AxiosError, {
  __CANCEL__: true
});

/* harmony default export */ const cancel_CanceledError = (CanceledError);

;// CONCATENATED MODULE: ./node_modules/axios/lib/core/settle.js




/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 *
 * @returns {object} The response.
 */
function settle(resolve, reject, response) {
  const validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(new core_AxiosError(
      'Request failed with status code ' + response.status,
      [core_AxiosError.ERR_BAD_REQUEST, core_AxiosError.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
      response.config,
      response.request,
      response
    ));
  }
}

;// CONCATENATED MODULE: ./node_modules/axios/lib/helpers/cookies.js





/* harmony default export */ const cookies = (platform_browser.isStandardBrowserEnv ?

// Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        const cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

// Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })());

;// CONCATENATED MODULE: ./node_modules/axios/lib/helpers/isAbsoluteURL.js


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 *
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}

;// CONCATENATED MODULE: ./node_modules/axios/lib/helpers/combineURLs.js


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 *
 * @returns {string} The combined URL
 */
function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
}

;// CONCATENATED MODULE: ./node_modules/axios/lib/core/buildFullPath.js





/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 *
 * @returns {string} The combined full path
 */
function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
}

;// CONCATENATED MODULE: ./node_modules/axios/lib/helpers/isURLSameOrigin.js





/* harmony default export */ const isURLSameOrigin = (platform_browser.isStandardBrowserEnv ?

// Standard browser envs have full support of the APIs needed to test
// whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    const msie = /(msie|trident)/i.test(navigator.userAgent);
    const urlParsingNode = document.createElement('a');
    let originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      let href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
          urlParsingNode.pathname :
          '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      const parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
          parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })());

;// CONCATENATED MODULE: ./node_modules/axios/lib/helpers/parseProtocol.js


function parseProtocol(url) {
  const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
  return match && match[1] || '';
}

;// CONCATENATED MODULE: ./node_modules/axios/lib/helpers/speedometer.js


/**
 * Calculate data maxRate
 * @param {Number} [samplesCount= 10]
 * @param {Number} [min= 1000]
 * @returns {Function}
 */
function speedometer(samplesCount, min) {
  samplesCount = samplesCount || 10;
  const bytes = new Array(samplesCount);
  const timestamps = new Array(samplesCount);
  let head = 0;
  let tail = 0;
  let firstSampleTS;

  min = min !== undefined ? min : 1000;

  return function push(chunkLength) {
    const now = Date.now();

    const startedAt = timestamps[tail];

    if (!firstSampleTS) {
      firstSampleTS = now;
    }

    bytes[head] = chunkLength;
    timestamps[head] = now;

    let i = tail;
    let bytesCount = 0;

    while (i !== head) {
      bytesCount += bytes[i++];
      i = i % samplesCount;
    }

    head = (head + 1) % samplesCount;

    if (head === tail) {
      tail = (tail + 1) % samplesCount;
    }

    if (now - firstSampleTS < min) {
      return;
    }

    const passed = startedAt && now - startedAt;

    return passed ? Math.round(bytesCount * 1000 / passed) : undefined;
  };
}

/* harmony default export */ const helpers_speedometer = (speedometer);

;// CONCATENATED MODULE: ./node_modules/axios/lib/adapters/xhr.js
















function progressEventReducer(listener, isDownloadStream) {
  let bytesNotified = 0;
  const _speedometer = helpers_speedometer(50, 250);

  return e => {
    const loaded = e.loaded;
    const total = e.lengthComputable ? e.total : undefined;
    const progressBytes = loaded - bytesNotified;
    const rate = _speedometer(progressBytes);
    const inRange = loaded <= total;

    bytesNotified = loaded;

    const data = {
      loaded,
      total,
      progress: total ? (loaded / total) : undefined,
      bytes: progressBytes,
      rate: rate ? rate : undefined,
      estimated: rate && total && inRange ? (total - loaded) / rate : undefined,
      event: e
    };

    data[isDownloadStream ? 'download' : 'upload'] = true;

    listener(data);
  };
}

const isXHRAdapterSupported = typeof XMLHttpRequest !== 'undefined';

/* harmony default export */ const xhr = (isXHRAdapterSupported && function (config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    let requestData = config.data;
    const requestHeaders = core_AxiosHeaders.from(config.headers).normalize();
    const responseType = config.responseType;
    let onCanceled;
    function done() {
      if (config.cancelToken) {
        config.cancelToken.unsubscribe(onCanceled);
      }

      if (config.signal) {
        config.signal.removeEventListener('abort', onCanceled);
      }
    }

    if (utils.isFormData(requestData) && (platform_browser.isStandardBrowserEnv || platform_browser.isStandardBrowserWebWorkerEnv)) {
      requestHeaders.setContentType(false); // Let the browser set it
    }

    let request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      const username = config.auth.username || '';
      const password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.set('Authorization', 'Basic ' + btoa(username + ':' + password));
    }

    const fullPath = buildFullPath(config.baseURL, config.url);

    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    function onloadend() {
      if (!request) {
        return;
      }
      // Prepare the response
      const responseHeaders = core_AxiosHeaders.from(
        'getAllResponseHeaders' in request && request.getAllResponseHeaders()
      );
      const responseData = !responseType || responseType === 'text' || responseType === 'json' ?
        request.responseText : request.response;
      const response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      };

      settle(function _resolve(value) {
        resolve(value);
        done();
      }, function _reject(err) {
        reject(err);
        done();
      }, response);

      // Clean up request
      request = null;
    }

    if ('onloadend' in request) {
      // Use onloadend if available
      request.onloadend = onloadend;
    } else {
      // Listen for ready state to emulate onloadend
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }

        // The request errored out and we didn't get a response, this will be
        // handled by onerror instead
        // With one exception: request that using file: protocol, most browsers
        // will return status as 0 even though it's a successful request
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
          return;
        }
        // readystate handler is calling before onerror or ontimeout handlers,
        // so we should call onloadend on the next 'tick'
        setTimeout(onloadend);
      };
    }

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(new core_AxiosError('Request aborted', core_AxiosError.ECONNABORTED, config, request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(new core_AxiosError('Network Error', core_AxiosError.ERR_NETWORK, config, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      let timeoutErrorMessage = config.timeout ? 'timeout of ' + config.timeout + 'ms exceeded' : 'timeout exceeded';
      const transitional = config.transitional || defaults_transitional;
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(new core_AxiosError(
        timeoutErrorMessage,
        transitional.clarifyTimeoutError ? core_AxiosError.ETIMEDOUT : core_AxiosError.ECONNABORTED,
        config,
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (platform_browser.isStandardBrowserEnv) {
      // Add xsrf header
      const xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath))
        && config.xsrfCookieName && cookies.read(config.xsrfCookieName);

      if (xsrfValue) {
        requestHeaders.set(config.xsrfHeaderName, xsrfValue);
      }
    }

    // Remove Content-Type if data is undefined
    requestData === undefined && requestHeaders.setContentType(null);

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
        request.setRequestHeader(key, val);
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (responseType && responseType !== 'json') {
      request.responseType = config.responseType;
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', progressEventReducer(config.onDownloadProgress, true));
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', progressEventReducer(config.onUploadProgress));
    }

    if (config.cancelToken || config.signal) {
      // Handle cancellation
      // eslint-disable-next-line func-names
      onCanceled = cancel => {
        if (!request) {
          return;
        }
        reject(!cancel || cancel.type ? new cancel_CanceledError(null, config, request) : cancel);
        request.abort();
        request = null;
      };

      config.cancelToken && config.cancelToken.subscribe(onCanceled);
      if (config.signal) {
        config.signal.aborted ? onCanceled() : config.signal.addEventListener('abort', onCanceled);
      }
    }

    const protocol = parseProtocol(fullPath);

    if (protocol && platform_browser.protocols.indexOf(protocol) === -1) {
      reject(new core_AxiosError('Unsupported protocol ' + protocol + ':', core_AxiosError.ERR_BAD_REQUEST, config));
      return;
    }


    // Send the request
    request.send(requestData || null);
  });
});

;// CONCATENATED MODULE: ./node_modules/axios/lib/adapters/adapters.js





const knownAdapters = {
  http: helpers_null,
  xhr: xhr
}

utils.forEach(knownAdapters, (fn, value) => {
  if(fn) {
    try {
      Object.defineProperty(fn, 'name', {value});
    } catch (e) {
      // eslint-disable-next-line no-empty
    }
    Object.defineProperty(fn, 'adapterName', {value});
  }
});

/* harmony default export */ const adapters = ({
  getAdapter: (adapters) => {
    adapters = utils.isArray(adapters) ? adapters : [adapters];

    const {length} = adapters;
    let nameOrAdapter;
    let adapter;

    for (let i = 0; i < length; i++) {
      nameOrAdapter = adapters[i];
      if((adapter = utils.isString(nameOrAdapter) ? knownAdapters[nameOrAdapter.toLowerCase()] : nameOrAdapter)) {
        break;
      }
    }

    if (!adapter) {
      if (adapter === false) {
        throw new core_AxiosError(
          `Adapter ${nameOrAdapter} is not supported by the environment`,
          'ERR_NOT_SUPPORT'
        );
      }

      throw new Error(
        utils.hasOwnProp(knownAdapters, nameOrAdapter) ?
          `Adapter '${nameOrAdapter}' is not available in the build` :
          `Unknown adapter '${nameOrAdapter}'`
      );
    }

    if (!utils.isFunction(adapter)) {
      throw new TypeError('adapter is not a function');
    }

    return adapter;
  },
  adapters: knownAdapters
});

;// CONCATENATED MODULE: ./node_modules/axios/lib/core/dispatchRequest.js









/**
 * Throws a `CanceledError` if cancellation has been requested.
 *
 * @param {Object} config The config that is to be used for the request
 *
 * @returns {void}
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }

  if (config.signal && config.signal.aborted) {
    throw new cancel_CanceledError(null, config);
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 *
 * @returns {Promise} The Promise to be fulfilled
 */
function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  config.headers = core_AxiosHeaders.from(config.headers);

  // Transform request data
  config.data = transformData.call(
    config,
    config.transformRequest
  );

  if (['post', 'put', 'patch'].indexOf(config.method) !== -1) {
    config.headers.setContentType('application/x-www-form-urlencoded', false);
  }

  const adapter = adapters.getAdapter(config.adapter || lib_defaults.adapter);

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData.call(
      config,
      config.transformResponse,
      response
    );

    response.headers = core_AxiosHeaders.from(response.headers);

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config,
          config.transformResponse,
          reason.response
        );
        reason.response.headers = core_AxiosHeaders.from(reason.response.headers);
      }
    }

    return Promise.reject(reason);
  });
}

;// CONCATENATED MODULE: ./node_modules/axios/lib/core/mergeConfig.js





const headersToObject = (thing) => thing instanceof core_AxiosHeaders ? thing.toJSON() : thing;

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 *
 * @returns {Object} New object resulting from merging config2 to config1
 */
function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  const config = {};

  function getMergedValue(target, source, caseless) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge.call({caseless}, target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  // eslint-disable-next-line consistent-return
  function mergeDeepProperties(a, b, caseless) {
    if (!utils.isUndefined(b)) {
      return getMergedValue(a, b, caseless);
    } else if (!utils.isUndefined(a)) {
      return getMergedValue(undefined, a, caseless);
    }
  }

  // eslint-disable-next-line consistent-return
  function valueFromConfig2(a, b) {
    if (!utils.isUndefined(b)) {
      return getMergedValue(undefined, b);
    }
  }

  // eslint-disable-next-line consistent-return
  function defaultToConfig2(a, b) {
    if (!utils.isUndefined(b)) {
      return getMergedValue(undefined, b);
    } else if (!utils.isUndefined(a)) {
      return getMergedValue(undefined, a);
    }
  }

  // eslint-disable-next-line consistent-return
  function mergeDirectKeys(a, b, prop) {
    if (prop in config2) {
      return getMergedValue(a, b);
    } else if (prop in config1) {
      return getMergedValue(undefined, a);
    }
  }

  const mergeMap = {
    url: valueFromConfig2,
    method: valueFromConfig2,
    data: valueFromConfig2,
    baseURL: defaultToConfig2,
    transformRequest: defaultToConfig2,
    transformResponse: defaultToConfig2,
    paramsSerializer: defaultToConfig2,
    timeout: defaultToConfig2,
    timeoutMessage: defaultToConfig2,
    withCredentials: defaultToConfig2,
    adapter: defaultToConfig2,
    responseType: defaultToConfig2,
    xsrfCookieName: defaultToConfig2,
    xsrfHeaderName: defaultToConfig2,
    onUploadProgress: defaultToConfig2,
    onDownloadProgress: defaultToConfig2,
    decompress: defaultToConfig2,
    maxContentLength: defaultToConfig2,
    maxBodyLength: defaultToConfig2,
    beforeRedirect: defaultToConfig2,
    transport: defaultToConfig2,
    httpAgent: defaultToConfig2,
    httpsAgent: defaultToConfig2,
    cancelToken: defaultToConfig2,
    socketPath: defaultToConfig2,
    responseEncoding: defaultToConfig2,
    validateStatus: mergeDirectKeys,
    headers: (a, b) => mergeDeepProperties(headersToObject(a), headersToObject(b), true)
  };

  utils.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
    const merge = mergeMap[prop] || mergeDeepProperties;
    const configValue = merge(config1[prop], config2[prop], prop);
    (utils.isUndefined(configValue) && merge !== mergeDirectKeys) || (config[prop] = configValue);
  });

  return config;
}

;// CONCATENATED MODULE: ./node_modules/axios/lib/env/data.js
const VERSION = "1.3.4";
;// CONCATENATED MODULE: ./node_modules/axios/lib/helpers/validator.js





const validators = {};

// eslint-disable-next-line func-names
['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach((type, i) => {
  validators[type] = function validator(thing) {
    return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
  };
});

const deprecatedWarnings = {};

/**
 * Transitional option validator
 *
 * @param {function|boolean?} validator - set to false if the transitional option has been removed
 * @param {string?} version - deprecated version / removed since version
 * @param {string?} message - some message with additional info
 *
 * @returns {function}
 */
validators.transitional = function transitional(validator, version, message) {
  function formatMessage(opt, desc) {
    return '[Axios v' + VERSION + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
  }

  // eslint-disable-next-line func-names
  return (value, opt, opts) => {
    if (validator === false) {
      throw new core_AxiosError(
        formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')),
        core_AxiosError.ERR_DEPRECATED
      );
    }

    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      // eslint-disable-next-line no-console
      console.warn(
        formatMessage(
          opt,
          ' has been deprecated since v' + version + ' and will be removed in the near future'
        )
      );
    }

    return validator ? validator(value, opt, opts) : true;
  };
};

/**
 * Assert object's properties type
 *
 * @param {object} options
 * @param {object} schema
 * @param {boolean?} allowUnknown
 *
 * @returns {object}
 */

function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== 'object') {
    throw new core_AxiosError('options must be an object', core_AxiosError.ERR_BAD_OPTION_VALUE);
  }
  const keys = Object.keys(options);
  let i = keys.length;
  while (i-- > 0) {
    const opt = keys[i];
    const validator = schema[opt];
    if (validator) {
      const value = options[opt];
      const result = value === undefined || validator(value, opt, options);
      if (result !== true) {
        throw new core_AxiosError('option ' + opt + ' must be ' + result, core_AxiosError.ERR_BAD_OPTION_VALUE);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw new core_AxiosError('Unknown option ' + opt, core_AxiosError.ERR_BAD_OPTION);
    }
  }
}

/* harmony default export */ const validator = ({
  assertOptions,
  validators
});

;// CONCATENATED MODULE: ./node_modules/axios/lib/core/Axios.js











const Axios_validators = validator.validators;

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 *
 * @return {Axios} A new instance of Axios
 */
class Axios {
  constructor(instanceConfig) {
    this.defaults = instanceConfig;
    this.interceptors = {
      request: new core_InterceptorManager(),
      response: new core_InterceptorManager()
    };
  }

  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  request(configOrUrl, config) {
    /*eslint no-param-reassign:0*/
    // Allow for axios('example/url'[, config]) a la fetch API
    if (typeof configOrUrl === 'string') {
      config = config || {};
      config.url = configOrUrl;
    } else {
      config = configOrUrl || {};
    }

    config = mergeConfig(this.defaults, config);

    const {transitional, paramsSerializer, headers} = config;

    if (transitional !== undefined) {
      validator.assertOptions(transitional, {
        silentJSONParsing: Axios_validators.transitional(Axios_validators.boolean),
        forcedJSONParsing: Axios_validators.transitional(Axios_validators.boolean),
        clarifyTimeoutError: Axios_validators.transitional(Axios_validators.boolean)
      }, false);
    }

    if (paramsSerializer !== undefined) {
      validator.assertOptions(paramsSerializer, {
        encode: Axios_validators.function,
        serialize: Axios_validators.function
      }, true);
    }

    // Set config.method
    config.method = (config.method || this.defaults.method || 'get').toLowerCase();

    let contextHeaders;

    // Flatten headers
    contextHeaders = headers && utils.merge(
      headers.common,
      headers[config.method]
    );

    contextHeaders && utils.forEach(
      ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
      (method) => {
        delete headers[method];
      }
    );

    config.headers = core_AxiosHeaders.concat(contextHeaders, headers);

    // filter out skipped interceptors
    const requestInterceptorChain = [];
    let synchronousRequestInterceptors = true;
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
        return;
      }

      synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

      requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
    });

    const responseInterceptorChain = [];
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
    });

    let promise;
    let i = 0;
    let len;

    if (!synchronousRequestInterceptors) {
      const chain = [dispatchRequest.bind(this), undefined];
      chain.unshift.apply(chain, requestInterceptorChain);
      chain.push.apply(chain, responseInterceptorChain);
      len = chain.length;

      promise = Promise.resolve(config);

      while (i < len) {
        promise = promise.then(chain[i++], chain[i++]);
      }

      return promise;
    }

    len = requestInterceptorChain.length;

    let newConfig = config;

    i = 0;

    while (i < len) {
      const onFulfilled = requestInterceptorChain[i++];
      const onRejected = requestInterceptorChain[i++];
      try {
        newConfig = onFulfilled(newConfig);
      } catch (error) {
        onRejected.call(this, error);
        break;
      }
    }

    try {
      promise = dispatchRequest.call(this, newConfig);
    } catch (error) {
      return Promise.reject(error);
    }

    i = 0;
    len = responseInterceptorChain.length;

    while (i < len) {
      promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
    }

    return promise;
  }

  getUri(config) {
    config = mergeConfig(this.defaults, config);
    const fullPath = buildFullPath(config.baseURL, config.url);
    return buildURL(fullPath, config.params, config.paramsSerializer);
  }
}

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method,
      url,
      data: (config || {}).data
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/

  function generateHTTPMethod(isForm) {
    return function httpMethod(url, data, config) {
      return this.request(mergeConfig(config || {}, {
        method,
        headers: isForm ? {
          'Content-Type': 'multipart/form-data'
        } : {},
        url,
        data
      }));
    };
  }

  Axios.prototype[method] = generateHTTPMethod();

  Axios.prototype[method + 'Form'] = generateHTTPMethod(true);
});

/* harmony default export */ const core_Axios = (Axios);

;// CONCATENATED MODULE: ./node_modules/axios/lib/cancel/CancelToken.js




/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @param {Function} executor The executor function.
 *
 * @returns {CancelToken}
 */
class CancelToken {
  constructor(executor) {
    if (typeof executor !== 'function') {
      throw new TypeError('executor must be a function.');
    }

    let resolvePromise;

    this.promise = new Promise(function promiseExecutor(resolve) {
      resolvePromise = resolve;
    });

    const token = this;

    // eslint-disable-next-line func-names
    this.promise.then(cancel => {
      if (!token._listeners) return;

      let i = token._listeners.length;

      while (i-- > 0) {
        token._listeners[i](cancel);
      }
      token._listeners = null;
    });

    // eslint-disable-next-line func-names
    this.promise.then = onfulfilled => {
      let _resolve;
      // eslint-disable-next-line func-names
      const promise = new Promise(resolve => {
        token.subscribe(resolve);
        _resolve = resolve;
      }).then(onfulfilled);

      promise.cancel = function reject() {
        token.unsubscribe(_resolve);
      };

      return promise;
    };

    executor(function cancel(message, config, request) {
      if (token.reason) {
        // Cancellation has already been requested
        return;
      }

      token.reason = new cancel_CanceledError(message, config, request);
      resolvePromise(token.reason);
    });
  }

  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  }

  /**
   * Subscribe to the cancel signal
   */

  subscribe(listener) {
    if (this.reason) {
      listener(this.reason);
      return;
    }

    if (this._listeners) {
      this._listeners.push(listener);
    } else {
      this._listeners = [listener];
    }
  }

  /**
   * Unsubscribe from the cancel signal
   */

  unsubscribe(listener) {
    if (!this._listeners) {
      return;
    }
    const index = this._listeners.indexOf(listener);
    if (index !== -1) {
      this._listeners.splice(index, 1);
    }
  }

  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let cancel;
    const token = new CancelToken(function executor(c) {
      cancel = c;
    });
    return {
      token,
      cancel
    };
  }
}

/* harmony default export */ const cancel_CancelToken = (CancelToken);

;// CONCATENATED MODULE: ./node_modules/axios/lib/helpers/spread.js


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 *
 * @returns {Function}
 */
function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
}

;// CONCATENATED MODULE: ./node_modules/axios/lib/helpers/isAxiosError.js




/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 *
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
function isAxiosError(payload) {
  return utils.isObject(payload) && (payload.isAxiosError === true);
}

;// CONCATENATED MODULE: ./node_modules/axios/lib/helpers/HttpStatusCode.js
const HttpStatusCode = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
};

Object.entries(HttpStatusCode).forEach(([key, value]) => {
  HttpStatusCode[value] = key;
});

/* harmony default export */ const helpers_HttpStatusCode = (HttpStatusCode);

;// CONCATENATED MODULE: ./node_modules/axios/lib/axios.js



















/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 *
 * @returns {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  const context = new core_Axios(defaultConfig);
  const instance = bind(core_Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, core_Axios.prototype, context, {allOwnKeys: true});

  // Copy context to instance
  utils.extend(instance, context, null, {allOwnKeys: true});

  // Factory for creating new instances
  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig(defaultConfig, instanceConfig));
  };

  return instance;
}

// Create the default instance to be exported
const axios = createInstance(lib_defaults);

// Expose Axios class to allow class inheritance
axios.Axios = core_Axios;

// Expose Cancel & CancelToken
axios.CanceledError = cancel_CanceledError;
axios.CancelToken = cancel_CancelToken;
axios.isCancel = isCancel;
axios.VERSION = VERSION;
axios.toFormData = helpers_toFormData;

// Expose AxiosError class
axios.AxiosError = core_AxiosError;

// alias for CanceledError for backward compatibility
axios.Cancel = axios.CanceledError;

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};

axios.spread = spread;

// Expose isAxiosError
axios.isAxiosError = isAxiosError;

// Expose mergeConfig
axios.mergeConfig = mergeConfig;

axios.AxiosHeaders = core_AxiosHeaders;

axios.formToJSON = thing => helpers_formDataToJSON(utils.isHTMLForm(thing) ? new FormData(thing) : thing);

axios.HttpStatusCode = helpers_HttpStatusCode;

axios.default = axios;

// this module should only have a default export
/* harmony default export */ const lib_axios = (axios);

// EXTERNAL MODULE: fs (ignored)
var fs_ignored_ = __webpack_require__(984);
;// CONCATENATED MODULE: ./src/cacheReader/CacheLoader.ts
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



class CacheLoader {
    constructor(path, onDownloadProgress) {
        this.datFile = "main_file_cache.dat2";
        this.indexFiles = new Array(22).fill(0).map((_, i) => "main_file_cache.idx" + i).concat("main_file_cache.idx255");
        this.promises = {
            datFile: undefined,
            indexFiles: new Array(),
            xteas: undefined,
        };
        this.onDownloadProgress = onDownloadProgress;
        if (this.isValidHttpUrl(path) || lib/* isBrowser */.jU) {
            this.fetchURL(path);
        }
        else {
            this.loadFile(path);
        }
    }
    getResults() {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            const datPromiseResults = yield this.promises.datFile;
            const indexPromiseResults = yield Promise.all(this.promises.indexFiles);
            const xteasResults = yield this.promises.xteas;
            const result = {
                datFile: datPromiseResults,
                indexFiles: indexPromiseResults,
                xteas: xteasResults,
            };
            resolve(result);
        }));
    }
    isValidHttpUrl(path) {
        let url;
        try {
            url = new URL(path);
        }
        catch (_) {
            return false;
        }
        return url.protocol === "http:" || url.protocol === "https:";
    }
    fetchURL(url) {
        if (url.endsWith(".zip")) {
            console.log("decompress zip file " + url);
            return;
        }
        if (!url.endsWith("/")) {
            url += "/";
        }
        this.promises.datFile = lib_axios.get(url + this.datFile, { onDownloadProgress: this.onDownloadProgress, responseType: 'arraybuffer', }).then(x => new Uint8Array(x.data));
        this.indexFiles.forEach(indexFile => {
            this.promises.indexFiles.push(lib_axios.get(url + indexFile, { responseType: 'arraybuffer' }).then(x => new Uint8Array(x.data)));
        });
        this.promises.xteas = lib_axios.get(url + "xteas.json", { responseType: 'json', }).then(x => this.readXteas(x.data)).catch(e => { });
    }
    loadFile(path) {
        if (!path.endsWith("/")) {
            path += "/";
        }
        this.promises.datFile = new Promise((resolve, reject) => fs_ignored_.readFile(path + this.datFile, (err, data) => {
            if (err)
                throw err;
            resolve(data);
        }));
        this.indexFiles.forEach((indexFile) => __awaiter(this, void 0, void 0, function* () {
            let newPromise = new Promise(resolve => fs_ignored_.readFile(path + indexFile, (err, data) => resolve(data)));
            this.promises.indexFiles.push(newPromise);
        }));
        this.promises.xteas = new Promise((resolve, reject) => fs_ignored_.readFile(path + "xteas.json", "utf8", (err, data) => {
            if (err)
                throw err;
            resolve(this.readXteas(data));
        }));
    }
    readXteas(xteasData) {
        if (xteasData == undefined)
            return;
        let xteas = xteasData;
        let reOrderedXteas = {};
        for (var i = 0; i < xteas.length; i++) {
            reOrderedXteas[xteas[i].group] = xteas[i];
        }
        return reOrderedXteas;
    }
}

;// CONCATENATED MODULE: ./src/cacheReader/RSCache.js










class RSCache {
	constructor(cacheRootDir = "./", progressFunc = () => { }, nameRootDir = undefined) {

		this.indicies = {};
		this.progressFunc = progressFunc;

		const cacheLoader = new CacheLoader(cacheRootDir);

		this.onload = cacheLoader.getResults().then(result => {
			this.cacheRequester = new CacheRequester(result.datFile);

			return this.loadCacheFiles(result.indexFiles, "./", nameRootDir).then(() => {
				this.cacheRequester.setXteas(result.xteas);
			});

		});


	}

	progress(amount) {
		this.progressFunc(amount);
	}


	async getAllFiles(indexId, archiveId, options = {}) {
		let index = this.indicies[indexId];
		if (index == undefined) {
			throw "Index " + indexId + " does not exist";
		}

		let archive = index.archives[archiveId];

		if (archive == undefined) {
			throw "Archive " + archiveId + " does not exist in Index " + indexId;
		}

		if (archive.filesLoaded) {
			return archive.files;
		}

		if (this.loadRequests == undefined) this.loadRequests = [];
		if (this.loadRequests[indexId] == undefined) this.loadRequests[indexId] = {};
		if (this.loadRequests[indexId][archiveId] == undefined) this.loadRequests[indexId][archiveId] = [];
		//this.loadRequests[indexId][archiveId]++;


		//console.log(this.loadRequests[indexId][archiveId]);
		let newPromise = new Promise((resolve, reject) => {
			this.loadRequests[indexId][archiveId].push({ resolve, reject });
		});

		//if theres already one processing then just add it to the stack
		if (this.loadRequests[indexId][archiveId].length > 1) {
			return newPromise;
		}

		let data;

		if (options.threaded)
			data = this.cacheRequester.readDataThreaded(index, index.indexSegments[archiveId].size, index.indexSegments[archiveId].segment, archiveId);
		else
			data = this.cacheRequester.readData(index, index.indexSegments[archiveId].size, index.indexSegments[archiveId].segment, archiveId);


		data.then(x => {
			archive = index.archives[x.archiveId];

			archive.loadFiles(x.decompressedData);
			new CacheDefinitionLoader(x.index.id, archive, options).load(this).then(() => {
				archive.filesLoaded = true;
				//console.log(this.loadRequests[indexId][archiveId]);
				for (let i = 0; i < this.loadRequests[indexId][archiveId].length; i++) {
					this.loadRequests[indexId][archiveId][i].resolve(archive.files);
				}
			}).catch((error) => {
				for (let i = 0; i < this.loadRequests[indexId][archiveId].length; i++) {
					this.loadRequests[indexId][archiveId][i].reject(error);
				}
			});
		}).catch(err => {
			for (let i = 0; i < this.loadRequests[indexId][archiveId].length; i++) {
				this.loadRequests[indexId][archiveId][i].reject(err);
			}
		});

		return newPromise;
	}

	//some archives only contain 1 file so a fileId is only needed in some cases
	getFile(indexId, archiveId, fileId = 0, options) {
		//console.log("Archive ID", archiveId);
		return this.getAllFiles(indexId, archiveId, options).then((x) => x[fileId]);
	}

	loadCacheFiles(indexFiles, xteas, namesRootDir) {

		//this is basically relying on loading faster than the other stuff. probably should merge this with something
		/*
		if (namesRootDir != undefined) {
			Ajax.getFile(namesRootDir + "names.tsv").then((nameData) => {
				let splitNameData = nameData.split("\n");
				for (let i = 0; i < splitNameData.length; i++) {
					let tabSplit = splitNameData[i].split("\t");
					nameHashLookup[tabSplit[3]] = tabSplit[4]; //3 = hash, 4 = name
				}
			});
		}
		*/
		/*
				if (xteasDir != undefined) {
					Ajax.getFile(xteasDir + "xteas.json").then((xteasData) => {
						let xteas = JSON.parse(xteasData);
						this.xteas = {};
						for (var i = 0; i < xteas.length; i++) {
							this.xteas[xteas[i].group] = xteas[i];
						}
		
					});
				}
		*/
		//console.log(indexFiles);
		let idx255Data = indexFiles[indexFiles.length - 1];
		let idxFileData = indexFiles.slice(0, indexFiles.length - 1);

		//theres probably a better way of doing this
		//also not completely sure yet if this really needs to be done for index 255
		//return Promise.all(idxFiles).then((idxFileData) => {
		for (let i = 0; i <= idxFileData.length; i++) {
			let dataview;
			if (i == idxFileData.length) { //ugly fix, needs to be improved
				dataview = new DataView(idx255Data.buffer);
				i = 255;
			} else {
				dataview = new DataView(idxFileData[i].buffer);
			}
			this.indicies[i] = new Index(i);
			for (let j = 0; j < dataview.byteLength; j += 6) {
				let size = dataview.readUint24();
				let segment = dataview.readUint24();
				//console.log(size, segment);

				this.indicies[i].indexSegments.push({ size, segment });
			}

		};

		this.progress(40);
		return this.loadIndicies(idx255Data);
	}

	loadIndicies(idxData) {
		let dataview = new DataView(idxData.buffer);
		//could probably use the indexSegments or remove the weird i = 255 part from loadCacheFiles
		//might look better if j++, but works for now

		let indexPromises = [];

		for (let j = 0; j < dataview.byteLength; j += 6) {
			let size = dataview.readUint24();
			let segment = dataview.readUint24();
			let index = this.indicies[j / 6];
			let data = this.cacheRequester.readData(index, size, segment);
			//since this is async now the onload is considered complete before its completed
			//this call is completed before loadIndexData is completed
			//the onload promise needs to complete when all of the loadIndexDatas have completed
			data.then(x => {
				this.indicies[x.index.id].loadIndexData(x.decompressedData);
				this.progress((60) / (dataview.byteLength / 6));
			});

			indexPromises.push(data);


			//index.loadIndexData(data);
		}
		this.indexPromises = indexPromises;
		//console.log(indexPromises);
		return Promise.all(indexPromises);
	}

}
;// CONCATENATED MODULE: ./src/index-dev.js









var cache = new RSCache("cache", (x) => { console.log(x) }, "./");
cache.onload.then(() => {

    console.log(cache);
    //cache.getFile(IndexType.CONFIGS.id, ConfigType.NPC.id, 2042).then(x => { console.log(x) });
    cache.getAllFiles(cacheTypes_IndexType.CONFIGS.id, cacheTypes_ConfigType.NPC.id).then(files => { 
        let npcDefs = files.map(x => x.def).filter(x => x.varbitId != undefined);
        console.log(npcDefs) 
    });
    //cache.getFile(IndexType.CONFIGS.id, ConfigType.UNDERLAY.id).then(x => { console.log(x) });
    //cache.getFile(IndexType.CONFIGS.id, ConfigType.OVERLAY.id).then(x => { console.log(x) });
    //console.log(Object.values(cache.cacheRequester.xteas).filter(x => x.name.includes("50_50")));
    /*
    for (let i = 0; i < cache.indicies[5].archivesCount; i++) {
        cache.getFile(IndexType.MAPS.id, i).then(x => {
            //console.log(x);
            //if (x.def == undefined) console.log(i, x);
            if (x.def.regionX == 50 && x.def.regionY == 53) console.log(x);
        }).catch(x => {});
    }
    */
});

//console.log(cache.getFile(IndexType.MODELS.id, 15981, 0, false));




})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});