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

/***/ 477:
/***/ ((module) => {

"use strict";


/* eslint-env browser */

/* eslint-disable no-undef, no-use-before-define, new-cap */
module.exports = function (content, workerConstructor, workerOptions, url) {
  var globalScope = self || window;

  try {
    try {
      var blob;

      try {
        // New API
        blob = new globalScope.Blob([content]);
      } catch (e) {
        // BlobBuilder = Deprecated, but widely implemented
        var BlobBuilder = globalScope.BlobBuilder || globalScope.WebKitBlobBuilder || globalScope.MozBlobBuilder || globalScope.MSBlobBuilder;
        blob = new BlobBuilder();
        blob.append(content);
        blob = blob.getBlob();
      }

      var URL = globalScope.URL || globalScope.webkitURL;
      var objectURL = URL.createObjectURL(blob);
      var worker = new globalScope[workerConstructor](objectURL, workerOptions);
      URL.revokeObjectURL(objectURL);
      return worker;
    } catch (e) {
      return new globalScope[workerConstructor]("data:application/javascript,".concat(encodeURIComponent(content)), workerOptions);
    }
  } catch (e) {
    if (!url) {
      throw Error("Inline worker is not supported");
    }

    return new globalScope[workerConstructor](url, workerOptions);
  }
};

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
		console.error(error);
	}
	this.addPosition(4);
	return val;
}

DataView.prototype.readFloat64 = function () { //byte
	let val = 0;
	try {
		val = this.getFloat64(this.getPosition());
	} catch (error) {
		console.error(error);
	}
	this.addPosition(8);
	return val;
}

DataView.prototype.readUint8 = function () { //byte
	let val = 0;
	try {
		val = this.getUint8(this.getPosition());
	} catch (error) {
		console.error(error);
	}
	this.addPosition(1);
	return val;
}
DataView.prototype.readUint16 = function () { //short
	let val = 0;
	try {
		val = this.getUint16(this.getPosition());
	} catch (error) {
		console.error(error);
	}
	this.addPosition(2);
	return val;
}
DataView.prototype.readUint24 = function () {
	let val = 0;
	try {
		val = this.getUint24(this.getPosition());
	} catch (error) {
		console.error(error);
	}
	this.addPosition(3);
	return val;
}
DataView.prototype.readUint32 = function () { //int
	let val = 0;
	try {
		val = this.getUint32(this.getPosition());
	} catch (error) {
		console.error(error);
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
		console.error(error);
	}
	this.addPosition(1);
	return val;
}
DataView.prototype.readInt16 = function () { //short
	let val = 0;
	try {
		val = this.getInt16(this.getPosition());
	} catch (error) {
		console.error(error);
	}
	this.addPosition(2);
	return val;
}
DataView.prototype.readInt24 = function () {
	let val = 0;
	try {
		val = this.getInt24(this.getPosition());
	} catch (error) {
		console.error(error);
	}
	this.addPosition(3);
	return val;
}
DataView.prototype.readInt32 = function () { //int
	let val = 0;
	try {
		val = this.getInt32(this.getPosition());
	} catch (error) {
		console.error(error);
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
  "Matrix": () => (/* reexport */ FramemapLoader_Matrix),
  "RSCache": () => (/* reexport */ RSCache)
});

;// CONCATENATED MODULE: ./src/cacheReader/helpers/ajax.js
function getFile(file) {
    var xhttp = new XMLHttpRequest();
    return new Promise((resolve,reject) => {
        xhttp.onreadystatechange = function() {
          if(xhttp.readyState === XMLHttpRequest.DONE) {
            resolve(this.responseText);
          }
        };
        xhttp.open("GET", file, true);
        try{
          xhttp.send();
        }catch(e){}
    })
  }
  
function getFileBytes(file) {
    var xhttp = new XMLHttpRequest();
    return new Promise((resolve,reject) => {
        xhttp.onreadystatechange = function() {
          if(xhttp.readyState === XMLHttpRequest.DONE) {
            resolve(new Uint8Array(this.response));
          }
        };
        xhttp.open("GET", file, true);
        xhttp.responseType = "arraybuffer";
        try{
          xhttp.send();
        }catch(e){}
    })
  }
// EXTERNAL MODULE: ./src/cacheReader/helpers/DataView.js
var helpers_DataView = __webpack_require__(423);
;// CONCATENATED MODULE: ./src/cacheReader/loaders/FramemapLoader.js
class FramemapDefinition {

}

class AnimayaSkeleton {
    constructor(var1, bonesCount) {
        this.bones = new Array(bonesCount);
        this.field1981 = var1.readUint8();

        for (let i = 0; i < this.bones.length; ++i) {
            this.bones[i] = new Bone(this.field1981, var1, false);
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
    }

    getBone(index) {
        return index >= this.bones.length ? null : this.bones[index];
    }
}

class Bone {
    constructor(size, buffer, var3) {
        this.field1179 = true;
        this.field1180 = new FramemapLoader_Matrix();
        this.field1186 = true;
        this.field1187 = new FramemapLoader_Matrix()
        this.field1189 = new FramemapLoader_Matrix();
        this.id = buffer.readInt16();
        this.field1182 = new Array(size);
        this.field1183 = new Array(size);
        this.field1188 = new Array(size);
        this.field1181 = new Array(size);

        for (let var4 = 0; var4 < size; ++var4) {
            this.field1182[var4] = new FramemapLoader_Matrix(buffer, var3);

            this.field1181[var4] = new Array(3);
            this.field1181[var4][0] = buffer.readFloat32();
            this.field1181[var4][1] = buffer.readFloat32();
            this.field1181[var4][2] = buffer.readFloat32();
        }
        this.method683();
    }

    method677() {
        return this.field1189;
    }

    method678(var1) {
        if (this.field1179) {
            this.field1180.copy(this.method685(var1));
            this.field1180.method2175(this.method680());
            this.field1179 = false;
        }

        return this.field1180;
    }

    method680() {
        if (this.field1186) {
            this.field1187.copy(this.method677());
            if (this.field1192 != null) {
                this.field1187.method2175(this.field1192.method680());
            }

            this.field1186 = false;
        }

        return this.field1187;
    }

    method683() {
        this.field1190 = new Array(this.field1182.length).fill().map(x => new Array(3));
        this.field1191 = new Array(this.field1182.length).fill().map(x => new Array(3));
        this.field1185 = new Array(this.field1182.length).fill().map(x => new Array(3));
        let var2 = FramemapLoader_Matrix.field3775;
        let var1;
        if (FramemapLoader_Matrix.field3777 == 0) {
            var1 = new FramemapLoader_Matrix();
        } else {
            FramemapLoader_Matrix.field3775[--FramemapLoader_Matrix.field3777].identity();
            var1 = FramemapLoader_Matrix.field3775[FramemapLoader_Matrix.field3777];
        }

        let var7 = var1;

        for (let var5 = 0; var5 < this.field1182.length; ++var5) {
            let var4 = this.field1182[var5];
            var7.copy(var4);
            var7.method2181();
            this.field1190[var5] = var7.method2174();
            this.field1191[var5][0] = var4.matrixVals[12];
            this.field1191[var5][1] = var4.matrixVals[13];
            this.field1191[var5][2] = var4.matrixVals[14];
            this.field1185[var5] = var4.method2183();
        }

        var7.method2172();
    }

    method675(var1) {
        return this.field1182[var1];
    }

    method684(var1) {
        if (this.field1183[var1] == null) {
            this.field1183[var1] = new FramemapLoader_Matrix(this.method675(var1));
            if (this.field1192 != null) {
                this.field1183[var1].method2175(this.field1192.method684(var1));
            } else {
                this.field1183[var1].method2175(FramemapLoader_Matrix.field3779);
            }
        }

        return this.field1183[var1];
    }

    method685(var1) {
        if (this.field1188[var1] == null || this.field1188[var1] == undefined) {
            this.field1188[var1] = new FramemapLoader_Matrix(this.method684(var1));
            this.field1188[var1].method2181();
        }

        return this.field1188[var1];
    }
}
class class415 {
    constructor(var1, var2, var3) {
        this.field3768 = var1;
        this.field3767 = var2;
        this.field3766 = var3;
    }

    method2166() {
        return Math.sqrt(this.field3766 * this.field3766 + this.field3767 * this.field3767 + this.field3768 * this.field3768);
    }
}

class FramemapLoader_Matrix {
    static field3775 = new Array(0);
    static field3777 = 0;
    static field3779 = new FramemapLoader_Matrix();

    constructor(var1, var2) {
        this.matrixVals = new Array(16);
        if (var1 == undefined && var2 == undefined) {
            this.identity();
            return;
        }

        if (var2 == undefined) {
            this.copy(var1);
            return;
        }

        if (var2) {
            var3 = new class418();
            let var6 = var1.readInt16();
            var6 &= 16383;
            let var5 = (6.283185307179586 * (var6 / 16384.0));
            var3.method2189(var5);
            let var9 = var1.readInt16();
            var9 &= 16383;
            let var8 = (6.283185307179586 * (var9 / 16384.0));
            var3.method2192(var8);
            let var12 = var1.readInt16();
            var12 &= 16383;
            let var11 = (var12 / 16384.0) * 6.283185307179586;
            var3.method2190(var11);
            var3.method2191(var1.readInt16(), var1.readInt16(), var1.readInt16());
            this.method2179(var3);
        } else {
            for (let var13 = 0; var13 < 16; ++var13) {
                this.matrixVals[var13] = var1.readFloat32();
            }
        }
    }

    add(otherMatrix) {
        for (let var2 = 0; var2 < this.matrixVals.length; ++var2) {
            this.matrixVals[var2] += otherMatrix.matrixVals[var2];
        }
    }

    scaleUniform(var1) {
        this.scale(var1, var1, var1);
    }

    scale(var1, var2, var3) {
        this.identity();
        this.matrixVals[0] = var1;
        this.matrixVals[5] = var2;
        this.matrixVals[10] = var3;
    }

    method2172() {
        if (this.field3777 < this.field3776 - 1) {
            this.field3775[++this.field3777 - 1] = this;
        }
    }

    method2183() {
        let var1 = new Array(3);
        let var2 = new class415(this.matrixVals[0], this.matrixVals[1], this.matrixVals[2]);
        let var3 = new class415(this.matrixVals[4], this.matrixVals[5], this.matrixVals[6]);
        let var4 = new class415(this.matrixVals[8], this.matrixVals[9], this.matrixVals[10]);
        var1[0] = var2.method2166();
        var1[1] = var3.method2166();
        var1[2] = var4.method2166();
        return var1;
    }

    copy(otherMatrix) {
        if (otherMatrix == undefined) {
            debugger;
        }
        for (let i = 0; i < 16; i++) {
            this.matrixVals[i] = otherMatrix.matrixVals[i];
        }
    }

    identity() {
        this.matrixVals = new Array(16);
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

    zero() {
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

    method2175(var1) {
        if (var1 == undefined) {
            debugger;
        }
        let var2 = var1.matrixVals[0] * this.matrixVals[0] + var1.matrixVals[4] * this.matrixVals[1] + var1.matrixVals[8] * this.matrixVals[2] + var1.matrixVals[12] * this.matrixVals[3];
        let var3 = this.matrixVals[3] * var1.matrixVals[13] + this.matrixVals[1] * var1.matrixVals[5] + this.matrixVals[0] * var1.matrixVals[1] + var1.matrixVals[9] * this.matrixVals[2];
        let var4 = this.matrixVals[3] * var1.matrixVals[14] + var1.matrixVals[2] * this.matrixVals[0] + var1.matrixVals[6] * this.matrixVals[1] + this.matrixVals[2] * var1.matrixVals[10];
        let var5 = this.matrixVals[3] * var1.matrixVals[15] + this.matrixVals[2] * var1.matrixVals[11] + this.matrixVals[0] * var1.matrixVals[3] + var1.matrixVals[7] * this.matrixVals[1];
        let var6 = this.matrixVals[7] * var1.matrixVals[12] + this.matrixVals[6] * var1.matrixVals[8] + var1.matrixVals[0] * this.matrixVals[4] + this.matrixVals[5] * var1.matrixVals[4];
        let var7 = this.matrixVals[5] * var1.matrixVals[5] + this.matrixVals[4] * var1.matrixVals[1] + var1.matrixVals[9] * this.matrixVals[6] + this.matrixVals[7] * var1.matrixVals[13];
        let var8 = var1.matrixVals[14] * this.matrixVals[7] + var1.matrixVals[10] * this.matrixVals[6] + var1.matrixVals[6] * this.matrixVals[5] + var1.matrixVals[2] * this.matrixVals[4];
        let var9 = var1.matrixVals[11] * this.matrixVals[6] + this.matrixVals[5] * var1.matrixVals[7] + this.matrixVals[4] * var1.matrixVals[3] + this.matrixVals[7] * var1.matrixVals[15];
        let var10 = this.matrixVals[9] * var1.matrixVals[4] + var1.matrixVals[0] * this.matrixVals[8] + this.matrixVals[10] * var1.matrixVals[8] + this.matrixVals[11] * var1.matrixVals[12];
        let var11 = var1.matrixVals[13] * this.matrixVals[11] + this.matrixVals[10] * var1.matrixVals[9] + var1.matrixVals[5] * this.matrixVals[9] + var1.matrixVals[1] * this.matrixVals[8];
        let var12 = this.matrixVals[11] * var1.matrixVals[14] + var1.matrixVals[6] * this.matrixVals[9] + var1.matrixVals[2] * this.matrixVals[8] + this.matrixVals[10] * var1.matrixVals[10];
        let var13 = var1.matrixVals[15] * this.matrixVals[11] + var1.matrixVals[3] * this.matrixVals[8] + this.matrixVals[9] * var1.matrixVals[7] + this.matrixVals[10] * var1.matrixVals[11];
        let var14 = this.matrixVals[14] * var1.matrixVals[8] + this.matrixVals[12] * var1.matrixVals[0] + this.matrixVals[13] * var1.matrixVals[4] + var1.matrixVals[12] * this.matrixVals[15];
        let var15 = var1.matrixVals[13] * this.matrixVals[15] + this.matrixVals[12] * var1.matrixVals[1] + this.matrixVals[13] * var1.matrixVals[5] + var1.matrixVals[9] * this.matrixVals[14];
        let var16 = this.matrixVals[15] * var1.matrixVals[14] + var1.matrixVals[2] * this.matrixVals[12] + var1.matrixVals[6] * this.matrixVals[13] + this.matrixVals[14] * var1.matrixVals[10];
        let var17 = this.matrixVals[15] * var1.matrixVals[15] + this.matrixVals[14] * var1.matrixVals[11] + this.matrixVals[13] * var1.matrixVals[7] + this.matrixVals[12] * var1.matrixVals[3];
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

    method2180() {
        return this.matrixVals[8] * this.matrixVals[5] * this.matrixVals[3] * this.matrixVals[14] + this.matrixVals[13] * this.matrixVals[10] * this.matrixVals[3] * this.matrixVals[4] + (this.matrixVals[8] * this.matrixVals[1] * this.matrixVals[6] * this.matrixVals[15] + this.matrixVals[14] * this.matrixVals[1] * this.matrixVals[4] * this.matrixVals[11] + (this.matrixVals[14] * this.matrixVals[9] * this.matrixVals[0] * this.matrixVals[7] + this.matrixVals[11] * this.matrixVals[6] * this.matrixVals[0] * this.matrixVals[13] + (this.matrixVals[15] * this.matrixVals[10] * this.matrixVals[5] * this.matrixVals[0] - this.matrixVals[11] * this.matrixVals[5] * this.matrixVals[0] * this.matrixVals[14] - this.matrixVals[15] * this.matrixVals[9] * this.matrixVals[0] * this.matrixVals[6]) - this.matrixVals[0] * this.matrixVals[7] * this.matrixVals[10] * this.matrixVals[13] - this.matrixVals[1] * this.matrixVals[4] * this.matrixVals[10] * this.matrixVals[15]) - this.matrixVals[12] * this.matrixVals[6] * this.matrixVals[1] * this.matrixVals[11] - this.matrixVals[8] * this.matrixVals[1] * this.matrixVals[7] * this.matrixVals[14] + this.matrixVals[12] * this.matrixVals[10] * this.matrixVals[7] * this.matrixVals[1] + this.matrixVals[2] * this.matrixVals[4] * this.matrixVals[9] * this.matrixVals[15] - this.matrixVals[13] * this.matrixVals[11] * this.matrixVals[4] * this.matrixVals[2] - this.matrixVals[2] * this.matrixVals[5] * this.matrixVals[8] * this.matrixVals[15] + this.matrixVals[12] * this.matrixVals[11] * this.matrixVals[5] * this.matrixVals[2] + this.matrixVals[13] * this.matrixVals[2] * this.matrixVals[7] * this.matrixVals[8] - this.matrixVals[7] * this.matrixVals[2] * this.matrixVals[9] * this.matrixVals[12] - this.matrixVals[14] * this.matrixVals[4] * this.matrixVals[3] * this.matrixVals[9]) - this.matrixVals[3] * this.matrixVals[5] * this.matrixVals[10] * this.matrixVals[12] - this.matrixVals[13] * this.matrixVals[3] * this.matrixVals[6] * this.matrixVals[8] + this.matrixVals[9] * this.matrixVals[6] * this.matrixVals[3] * this.matrixVals[12];
    }

    method2181() {
        const var1 = 1.0 / this.method2180();
        const var2 = var1 * (this.matrixVals[13] * this.matrixVals[6] * this.matrixVals[11] + (this.matrixVals[10] * this.matrixVals[5] * this.matrixVals[15] - this.matrixVals[14] * this.matrixVals[11] * this.matrixVals[5] - this.matrixVals[6] * this.matrixVals[9] * this.matrixVals[15]) + this.matrixVals[9] * this.matrixVals[7] * this.matrixVals[14] - this.matrixVals[13] * this.matrixVals[10] * this.matrixVals[7]);
        const var3 = var1 * (this.matrixVals[13] * this.matrixVals[10] * this.matrixVals[3] + (this.matrixVals[10] * -this.matrixVals[1] * this.matrixVals[15] + this.matrixVals[14] * this.matrixVals[11] * this.matrixVals[1] + this.matrixVals[9] * this.matrixVals[2] * this.matrixVals[15] - this.matrixVals[13] * this.matrixVals[11] * this.matrixVals[2] - this.matrixVals[3] * this.matrixVals[9] * this.matrixVals[14]));
        const var4 = (this.matrixVals[15] * this.matrixVals[1] * this.matrixVals[6] - this.matrixVals[14] * this.matrixVals[7] * this.matrixVals[1] - this.matrixVals[2] * this.matrixVals[5] * this.matrixVals[15] + this.matrixVals[2] * this.matrixVals[7] * this.matrixVals[13] + this.matrixVals[5] * this.matrixVals[3] * this.matrixVals[14] - this.matrixVals[13] * this.matrixVals[6] * this.matrixVals[3]) * var1;
        const var5 = (this.matrixVals[9] * this.matrixVals[6] * this.matrixVals[3] + (this.matrixVals[2] * this.matrixVals[5] * this.matrixVals[11] + this.matrixVals[1] * this.matrixVals[7] * this.matrixVals[10] + this.matrixVals[11] * this.matrixVals[6] * -this.matrixVals[1] - this.matrixVals[9] * this.matrixVals[7] * this.matrixVals[2] - this.matrixVals[3] * this.matrixVals[5] * this.matrixVals[10])) * var1;
        const var6 = (this.matrixVals[6] * this.matrixVals[8] * this.matrixVals[15] + this.matrixVals[15] * -this.matrixVals[4] * this.matrixVals[10] + this.matrixVals[14] * this.matrixVals[4] * this.matrixVals[11] - this.matrixVals[12] * this.matrixVals[11] * this.matrixVals[6] - this.matrixVals[7] * this.matrixVals[8] * this.matrixVals[14] + this.matrixVals[12] * this.matrixVals[10] * this.matrixVals[7]) * var1;
        const var7 = var1 * (this.matrixVals[8] * this.matrixVals[3] * this.matrixVals[14] + this.matrixVals[2] * this.matrixVals[11] * this.matrixVals[12] + (this.matrixVals[10] * this.matrixVals[0] * this.matrixVals[15] - this.matrixVals[0] * this.matrixVals[11] * this.matrixVals[14] - this.matrixVals[15] * this.matrixVals[8] * this.matrixVals[2]) - this.matrixVals[3] * this.matrixVals[10] * this.matrixVals[12]);
        const var8 = var1 * (this.matrixVals[2] * this.matrixVals[4] * this.matrixVals[15] + this.matrixVals[15] * this.matrixVals[6] * -this.matrixVals[0] + this.matrixVals[7] * this.matrixVals[0] * this.matrixVals[14] - this.matrixVals[12] * this.matrixVals[7] * this.matrixVals[2] - this.matrixVals[14] * this.matrixVals[3] * this.matrixVals[4] + this.matrixVals[3] * this.matrixVals[6] * this.matrixVals[12]);
        const var9 = (this.matrixVals[4] * this.matrixVals[3] * this.matrixVals[10] + this.matrixVals[11] * this.matrixVals[0] * this.matrixVals[6] - this.matrixVals[10] * this.matrixVals[7] * this.matrixVals[0] - this.matrixVals[11] * this.matrixVals[4] * this.matrixVals[2] + this.matrixVals[8] * this.matrixVals[2] * this.matrixVals[7] - this.matrixVals[8] * this.matrixVals[3] * this.matrixVals[6]) * var1;
        const var10 = (this.matrixVals[13] * this.matrixVals[7] * this.matrixVals[8] + this.matrixVals[11] * this.matrixVals[5] * this.matrixVals[12] + (this.matrixVals[9] * this.matrixVals[4] * this.matrixVals[15] - this.matrixVals[4] * this.matrixVals[11] * this.matrixVals[13] - this.matrixVals[15] * this.matrixVals[5] * this.matrixVals[8]) - this.matrixVals[12] * this.matrixVals[7] * this.matrixVals[9]) * var1;
        const var11 = (this.matrixVals[3] * this.matrixVals[9] * this.matrixVals[12] + (this.matrixVals[8] * this.matrixVals[1] * this.matrixVals[15] + this.matrixVals[9] * -this.matrixVals[0] * this.matrixVals[15] + this.matrixVals[11] * this.matrixVals[0] * this.matrixVals[13] - this.matrixVals[1] * this.matrixVals[11] * this.matrixVals[12] - this.matrixVals[13] * this.matrixVals[3] * this.matrixVals[8])) * var1;
        const var12 = (this.matrixVals[15] * this.matrixVals[5] * this.matrixVals[0] - this.matrixVals[0] * this.matrixVals[7] * this.matrixVals[13] - this.matrixVals[1] * this.matrixVals[4] * this.matrixVals[15] + this.matrixVals[1] * this.matrixVals[7] * this.matrixVals[12] + this.matrixVals[13] * this.matrixVals[4] * this.matrixVals[3] - this.matrixVals[12] * this.matrixVals[5] * this.matrixVals[3]) * var1;
        const var13 = var1 * (this.matrixVals[3] * this.matrixVals[5] * this.matrixVals[8] + (this.matrixVals[11] * this.matrixVals[4] * this.matrixVals[1] + -this.matrixVals[0] * this.matrixVals[5] * this.matrixVals[11] + this.matrixVals[7] * this.matrixVals[0] * this.matrixVals[9] - this.matrixVals[1] * this.matrixVals[7] * this.matrixVals[8] - this.matrixVals[3] * this.matrixVals[4] * this.matrixVals[9]));
        const var14 = var1 * (this.matrixVals[14] * this.matrixVals[9] * -this.matrixVals[4] + this.matrixVals[13] * this.matrixVals[4] * this.matrixVals[10] + this.matrixVals[8] * this.matrixVals[5] * this.matrixVals[14] - this.matrixVals[12] * this.matrixVals[10] * this.matrixVals[5] - this.matrixVals[8] * this.matrixVals[6] * this.matrixVals[13] + this.matrixVals[12] * this.matrixVals[9] * this.matrixVals[6]);
        const var15 = (this.matrixVals[14] * this.matrixVals[0] * this.matrixVals[9] - this.matrixVals[13] * this.matrixVals[0] * this.matrixVals[10] - this.matrixVals[14] * this.matrixVals[8] * this.matrixVals[1] + this.matrixVals[12] * this.matrixVals[1] * this.matrixVals[10] + this.matrixVals[2] * this.matrixVals[8] * this.matrixVals[13] - this.matrixVals[12] * this.matrixVals[2] * this.matrixVals[9]) * var1;
        const var16 = var1 * (this.matrixVals[14] * this.matrixVals[1] * this.matrixVals[4] + this.matrixVals[5] * -this.matrixVals[0] * this.matrixVals[14] + this.matrixVals[6] * this.matrixVals[0] * this.matrixVals[13] - this.matrixVals[12] * this.matrixVals[6] * this.matrixVals[1] - this.matrixVals[4] * this.matrixVals[2] * this.matrixVals[13] + this.matrixVals[12] * this.matrixVals[2] * this.matrixVals[5]);
        const var17 = (this.matrixVals[9] * this.matrixVals[2] * this.matrixVals[4] + this.matrixVals[1] * this.matrixVals[6] * this.matrixVals[8] + (this.matrixVals[5] * this.matrixVals[0] * this.matrixVals[10] - this.matrixVals[0] * this.matrixVals[6] * this.matrixVals[9] - this.matrixVals[4] * this.matrixVals[1] * this.matrixVals[10]) - this.matrixVals[2] * this.matrixVals[5] * this.matrixVals[8]) * var1;
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

    method2174() {
        let var1 = new Array()
        var1.push(-Math.asin(this.matrixVals[6]));
        var1.push(0.0);
        var1.push(0.0);
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
                def.animayaSkeleton = new AnimayaSkeleton(dataview, var4);
            }
        }
        return def;
    }
}
;// CONCATENATED MODULE: ./src/cacheReader/loaders/FramesLoader.js


class FramesDefinition {

}

class FramesLoader {

    load(bytes, id, cache) {
        //console.log(id);
        let def = new FramesDefinition();
        def.id = id;
        let inview = new DataView(bytes.buffer);
        let dataview = new DataView(bytes.buffer);

        let framemapArchiveIndex = inview.readUint16();
        let length = inview.readUint8();


        let animFormat = dataview.readUint8();
        let skeletonId = dataview.readUint16();

        //console.log(animFormat, skeletonId);
        if (animFormat == 1) { //new animmaya system

            return cache.getFile(cacheTypes_IndexType.FRAMEMAPS.id, skeletonId).then((framemap) => {
                framemap = framemap.def;
                //console.log(framemap);

                dataview.readUint16();
                dataview.readUint16();
                def.field1264 = dataview.readUint8();
                let var3 = dataview.readUint16();
                this.field1267 = new Array(framemap.animayaSkeleton.bones.length);
                this.field1266 = new Array(framemap.count);
                let var4 = new Array(var3);
                def.framemap = framemap;

                return def;
            });
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
        if(bytes == undefined) return new MapDefinition();
        let x, y;
        let mapInfo = rscache.xteas[id];

        if (mapInfo != undefined) {
            x = mapInfo.mapsquare >> 8;
            y = mapInfo.mapsquare & 0xFF;
            return this.loadLocationDef(bytes, id, x, y);
        } else {
            let hashVal = rscache.indicies[5].archives[id].nameHash;
            //console.log(rscache.indicies[5]);
            //console.log(hashVal);
            for (let i = 0; i < 32768; i++) {
                let x = i >> 8;
                let y = i & 0xFF;
                if (this.hash("l" + x + "_" + y) == hashVal) {
                    //not much we can do here without xteas
                    return new LocationDefinition();
                }
                if (this.hash("m" + x + "_" + y) == hashVal) {
                    //console.log("m" + x + "_" + y);
                    return this.loadMapDef(bytes, id, x, y);
                }
            }
        }

        return new EmptyMapDefinition();
        //console.log(bytes, rscache.xteas);
        //console.log(rscache.xteas[id]);
        //console.log(id);
        //console.log(x, y);
    }
    loadLocationDef(bytes, id, x, y) {
        let def = new LocationDefinition();
        def.id = id;
        def.regionX = x;
        def.regionY = y;
        let dataview = new DataView(bytes.buffer);

        return def;
    }

    loadMapDef(bytes, id, x, y) {
        let X = 64;
        let Y = 64;
        let Z = 4;
        let def = new MapDefinition();
        def.id = id;
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

            return def;
        }
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
			def.textureCoords = [];
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
				def.textureCoords[var51] = (var8.readUint16() - 1);
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
;// CONCATENATED MODULE: ./src/cacheReader/cacheTypes/IndexType.js





const IndexType_IndexType = { 
    FRAMES:{id: 0, loader: FramesLoader},       // Animations
    FRAMEMAPS:{id: 1, loader: FramemapLoader},  // Skeletons
    CONFIGS:{id: 2, loader: undefined},         // Configs
    INTERFACES:{id: 3, loader: undefined},      // Interfaces
    SOUNDEFFECTS:{id: 4, loader: undefined},    // Sound FX
    MAPS:{id: 5, loader: MapLoader},            // Maps
    TRACK1:{id: 6, loader: undefined},          // Music Tracks (ex: "scape main")
    MODELS:{id: 7, loader: ModelLoader},        // Models
    SPRITES:{id: 8, loader: undefined},         // Sprites
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
        var values = Object.values(IndexType_IndexType);
        var keys = Object.keys(IndexType_IndexType);
        for(var i=0;i<values.length;i++) {
            if(id == values[i].id)
                return IndexType_IndexType[keys[i]];
        }
        return undefined;
    }
};
Object.freeze(IndexType_IndexType);

/* harmony default export */ const cacheTypes_IndexType = (IndexType_IndexType);
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








const ConfigType_ConfigType = { 
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
        var values = Object.values(ConfigType_ConfigType);
        var keys = Object.keys(ConfigType_ConfigType);
        for(var i=0;i<values.length;i++) {
            if(id == values[i].id)
                return ConfigType_ConfigType[keys[i]];
        }
        return undefined;
    }
}
Object.freeze(ConfigType_ConfigType);

/* harmony default export */ const cacheTypes_ConfigType = (ConfigType_ConfigType);
;// CONCATENATED MODULE: ./src/cacheReader/CacheDefinitionLoader.js



class CacheDefinitionLoader {
	constructor(indexId, archive) {
		this.indexType = cacheTypes_IndexType.valueOf(indexId);
		this.archive = archive;
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
				let loadPromise = Promise.resolve(loader.load(this.archive.files[i].content, defId, rscache));
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
// EXTERNAL MODULE: ./node_modules/bz2/index.js
var node_modules_bz2 = __webpack_require__(264);
// EXTERNAL MODULE: ./node_modules/worker-loader/dist/runtime/inline.js
var inline = __webpack_require__(477);
var inline_default = /*#__PURE__*/__webpack_require__.n(inline);
;// CONCATENATED MODULE: ./src/cacheReader/Worker.worker.js



function Worker_fn() {
  return inline_default()("/******/ (() => { // webpackBootstrap\n/******/ \tvar __webpack_modules__ = ({\n\n/***/ 264:\n/***/ ((module) => {\n\n\"use strict\";\n/*! bz2 (C) 2019-present SheetJS LLC */\n\n\n\n(function bz2() {\n// https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/util/compress/bzip2/crctable.c\n  const crc32Table = [\n    0x00000000, 0x04c11db7, 0x09823b6e, 0x0d4326d9, 0x130476dc, 0x17c56b6b, 0x1a864db2, 0x1e475005,\n    0x2608edb8, 0x22c9f00f, 0x2f8ad6d6, 0x2b4bcb61, 0x350c9b64, 0x31cd86d3, 0x3c8ea00a, 0x384fbdbd,\n    0x4c11db70, 0x48d0c6c7, 0x4593e01e, 0x4152fda9, 0x5f15adac, 0x5bd4b01b, 0x569796c2, 0x52568b75,\n    0x6a1936c8, 0x6ed82b7f, 0x639b0da6, 0x675a1011, 0x791d4014, 0x7ddc5da3, 0x709f7b7a, 0x745e66cd,\n    0x9823b6e0, 0x9ce2ab57, 0x91a18d8e, 0x95609039, 0x8b27c03c, 0x8fe6dd8b, 0x82a5fb52, 0x8664e6e5,\n    0xbe2b5b58, 0xbaea46ef, 0xb7a96036, 0xb3687d81, 0xad2f2d84, 0xa9ee3033, 0xa4ad16ea, 0xa06c0b5d,\n    0xd4326d90, 0xd0f37027, 0xddb056fe, 0xd9714b49, 0xc7361b4c, 0xc3f706fb, 0xceb42022, 0xca753d95,\n    0xf23a8028, 0xf6fb9d9f, 0xfbb8bb46, 0xff79a6f1, 0xe13ef6f4, 0xe5ffeb43, 0xe8bccd9a, 0xec7dd02d,\n    0x34867077, 0x30476dc0, 0x3d044b19, 0x39c556ae, 0x278206ab, 0x23431b1c, 0x2e003dc5, 0x2ac12072,\n    0x128e9dcf, 0x164f8078, 0x1b0ca6a1, 0x1fcdbb16, 0x018aeb13, 0x054bf6a4, 0x0808d07d, 0x0cc9cdca,\n    0x7897ab07, 0x7c56b6b0, 0x71159069, 0x75d48dde, 0x6b93dddb, 0x6f52c06c, 0x6211e6b5, 0x66d0fb02,\n    0x5e9f46bf, 0x5a5e5b08, 0x571d7dd1, 0x53dc6066, 0x4d9b3063, 0x495a2dd4, 0x44190b0d, 0x40d816ba,\n    0xaca5c697, 0xa864db20, 0xa527fdf9, 0xa1e6e04e, 0xbfa1b04b, 0xbb60adfc, 0xb6238b25, 0xb2e29692,\n    0x8aad2b2f, 0x8e6c3698, 0x832f1041, 0x87ee0df6, 0x99a95df3, 0x9d684044, 0x902b669d, 0x94ea7b2a,\n    0xe0b41de7, 0xe4750050, 0xe9362689, 0xedf73b3e, 0xf3b06b3b, 0xf771768c, 0xfa325055, 0xfef34de2,\n    0xc6bcf05f, 0xc27dede8, 0xcf3ecb31, 0xcbffd686, 0xd5b88683, 0xd1799b34, 0xdc3abded, 0xd8fba05a,\n    0x690ce0ee, 0x6dcdfd59, 0x608edb80, 0x644fc637, 0x7a089632, 0x7ec98b85, 0x738aad5c, 0x774bb0eb,\n    0x4f040d56, 0x4bc510e1, 0x46863638, 0x42472b8f, 0x5c007b8a, 0x58c1663d, 0x558240e4, 0x51435d53,\n    0x251d3b9e, 0x21dc2629, 0x2c9f00f0, 0x285e1d47, 0x36194d42, 0x32d850f5, 0x3f9b762c, 0x3b5a6b9b,\n    0x0315d626, 0x07d4cb91, 0x0a97ed48, 0x0e56f0ff, 0x1011a0fa, 0x14d0bd4d, 0x19939b94, 0x1d528623,\n    0xf12f560e, 0xf5ee4bb9, 0xf8ad6d60, 0xfc6c70d7, 0xe22b20d2, 0xe6ea3d65, 0xeba91bbc, 0xef68060b,\n    0xd727bbb6, 0xd3e6a601, 0xdea580d8, 0xda649d6f, 0xc423cd6a, 0xc0e2d0dd, 0xcda1f604, 0xc960ebb3,\n    0xbd3e8d7e, 0xb9ff90c9, 0xb4bcb610, 0xb07daba7, 0xae3afba2, 0xaafbe615, 0xa7b8c0cc, 0xa379dd7b,\n    0x9b3660c6, 0x9ff77d71, 0x92b45ba8, 0x9675461f, 0x8832161a, 0x8cf30bad, 0x81b02d74, 0x857130c3,\n    0x5d8a9099, 0x594b8d2e, 0x5408abf7, 0x50c9b640, 0x4e8ee645, 0x4a4ffbf2, 0x470cdd2b, 0x43cdc09c,\n    0x7b827d21, 0x7f436096, 0x7200464f, 0x76c15bf8, 0x68860bfd, 0x6c47164a, 0x61043093, 0x65c52d24,\n    0x119b4be9, 0x155a565e, 0x18197087, 0x1cd86d30, 0x029f3d35, 0x065e2082, 0x0b1d065b, 0x0fdc1bec,\n    0x3793a651, 0x3352bbe6, 0x3e119d3f, 0x3ad08088, 0x2497d08d, 0x2056cd3a, 0x2d15ebe3, 0x29d4f654,\n    0xc5a92679, 0xc1683bce, 0xcc2b1d17, 0xc8ea00a0, 0xd6ad50a5, 0xd26c4d12, 0xdf2f6bcb, 0xdbee767c,\n    0xe3a1cbc1, 0xe760d676, 0xea23f0af, 0xeee2ed18, 0xf0a5bd1d, 0xf464a0aa, 0xf9278673, 0xfde69bc4,\n    0x89b8fd09, 0x8d79e0be, 0x803ac667, 0x84fbdbd0, 0x9abc8bd5, 0x9e7d9662, 0x933eb0bb, 0x97ffad0c,\n    0xafb010b1, 0xab710d06, 0xa6322bdf, 0xa2f33668, 0xbcb4666d, 0xb8757bda, 0xb5365d03, 0xb1f740b4,\n  ];\n\n  // generated from 1 << i, except for 32\n  const masks = [\n    0x00000000, 0x00000001, 0x00000003, 0x00000007,\n    0x0000000f, 0x0000001f, 0x0000003f, 0x0000007f,\n    0x000000ff, 0x000001ff, 0x000003ff, 0x000007ff,\n    0x00000fff, 0x00001fff, 0x00003fff, 0x00007fff,\n    0x0000ffff, 0x0001ffff, 0x0003ffff, 0x0007ffff,\n    0x000fffff, 0x001fffff, 0x003fffff, 0x007fffff,\n    0x00ffffff, 0x01ffffff, 0x03ffffff, 0x07ffffff,\n    0x0fffffff, 0x1fffffff, 0x3fffffff, -0x80000000,\n  ];\n\n  function createOrderedHuffmanTable(lengths) {\n    const z = [];\n    for (let i = 0; i < lengths.length; i += 1) {\n      z.push([i, lengths[i]]);\n    }\n    z.push([lengths.length, -1]);\n    const table = [];\n    let start = z[0][0];\n    let bits = z[0][1];\n    for (let i = 0; i < z.length; i += 1) {\n      const finish = z[i][0];\n      const endbits = z[i][1];\n      if (bits) {\n        for (let code = start; code < finish; code += 1) {\n          table.push({ code, bits, symbol: undefined });\n        }\n      }\n      start = finish;\n      bits = endbits;\n      if (endbits === -1) {\n        break;\n      }\n    }\n    table.sort((a, b) => ((a.bits - b.bits) || (a.code - b.code)));\n    let tempBits = 0;\n    let symbol = -1;\n    const fastAccess = [];\n    let current;\n    for (let i = 0; i < table.length; i += 1) {\n      const t = table[i];\n      symbol += 1;\n      if (t.bits !== tempBits) {\n        symbol <<= t.bits - tempBits;\n        tempBits = t.bits;\n        current = fastAccess[tempBits] = {};\n      }\n      t.symbol = symbol;\n      current[symbol] = t;\n    }\n    return {\n      table,\n      fastAccess,\n    };\n  }\n\n  function bwtReverse(src, primary) {\n    if (primary < 0 || primary >= src.length) {\n      throw RangeError('Out of bound');\n    }\n    const unsorted = src.slice();\n    src.sort((a, b) => a - b);\n    const start = {};\n    for (let i = src.length - 1; i >= 0; i -= 1) {\n      start[src[i]] = i;\n    }\n    const links = [];\n    for (let i = 0; i < src.length; i += 1) {\n      links.push(start[unsorted[i]]++); // eslint-disable-line no-plusplus\n    }\n    let i;\n    const first = src[i = primary];\n    const ret = [];\n    for (let j = 1; j < src.length; j += 1) {\n      const x = src[i = links[i]];\n      if (x === undefined) {\n        ret.push(255);\n      } else {\n        ret.push(x);\n      }\n    }\n    ret.push(first);\n    ret.reverse();\n    return ret;\n  }\n\n  function decompress(bytes, checkCRC = false) {\n    let index = 0;\n    let bitfield = 0;\n    let bits = 0;\n    const read = (n) => {\n      if (n >= 32) {\n        const nd = n >> 1;\n        return read(nd) * (1 << nd) + read(n - nd);\n      }\n      while (bits < n) {\n        bitfield = (bitfield << 8) + bytes[index];\n        index += 1;\n        bits += 8;\n      }\n      const m = masks[n];\n      const r = (bitfield >> (bits - n)) & m;\n      bits -= n;\n      bitfield &= ~(m << bits);\n      return r;\n    };\n\n    const magic = read(16);\n    if (magic !== 0x425A) { // 'BZ'\n      throw new Error('Invalid magic');\n    }\n    const method = read(8);\n    if (method !== 0x68) { // h for huffman\n      throw new Error('Invalid method');\n    }\n\n    let blocksize = read(8);\n    if (blocksize >= 49 && blocksize <= 57) { // 1..9\n      blocksize -= 48;\n    } else {\n      throw new Error('Invalid blocksize');\n    }\n\n    let out = new Uint8Array(bytes.length * 1.5);\n    let outIndex = 0;\n    let newCRC = -1;\n    while (true) {\n      const blocktype = read(48);\n      const crc = read(32) | 0;\n      if (blocktype === 0x314159265359) {\n        if (read(1)) {\n          throw new Error('do not support randomised');\n        }\n        const pointer = read(24);\n        const used = [];\n        const usedGroups = read(16);\n        for (let i = 1 << 15; i > 0; i >>= 1) {\n          if (!(usedGroups & i)) {\n            for (let j = 0; j < 16; j += 1) {\n              used.push(false);\n            }\n            continue; // eslint-disable-line no-continue\n          }\n          const usedChars = read(16);\n          for (let j = 1 << 15; j > 0; j >>= 1) {\n            used.push(!!(usedChars & j));\n          }\n        }\n        const groups = read(3);\n        if (groups < 2 || groups > 6) {\n          throw new Error('Invalid number of huffman groups');\n        }\n        const selectorsUsed = read(15);\n        const selectors = [];\n        const mtf = Array.from({ length: groups }, (_, i) => i);\n        for (let i = 0; i < selectorsUsed; i += 1) {\n          let c = 0;\n          while (read(1)) {\n            c += 1;\n            if (c >= groups) {\n              throw new Error('MTF table out of range');\n            }\n          }\n          const v = mtf[c];\n          for (let j = c; j > 0; mtf[j] = mtf[--j]) { // eslint-disable-line no-plusplus\n          // nothing\n          }\n          selectors.push(v);\n          mtf[0] = v;\n        }\n        const symbolsInUse = used.reduce((a, b) => a + b, 0) + 2;\n        const tables = [];\n        for (let i = 0; i < groups; i += 1) {\n          let length = read(5);\n          const lengths = [];\n          for (let j = 0; j < symbolsInUse; j += 1) {\n            if (length < 0 || length > 20) {\n              throw new Error('Huffman group length outside range');\n            }\n            while (read(1)) {\n              length -= (read(1) * 2) - 1;\n            }\n            lengths.push(length);\n          }\n          tables.push(createOrderedHuffmanTable(lengths));\n        }\n        const favourites = [];\n        for (let i = 0; i < used.length - 1; i += 1) {\n          if (used[i]) {\n            favourites.push(i);\n          }\n        }\n        let decoded = 0;\n        let selectorPointer = 0;\n        let t;\n        let r;\n        let repeat = 0;\n        let repeatPower = 0;\n        const buffer = [];\n        while (true) {\n          decoded -= 1;\n          if (decoded <= 0) {\n            decoded = 50;\n            if (selectorPointer <= selectors.length) {\n              t = tables[selectors[selectorPointer]];\n              selectorPointer += 1;\n            }\n          }\n          for (const b in t.fastAccess) {\n            if (!Object.prototype.hasOwnProperty.call(t.fastAccess, b)) {\n              continue; // eslint-disable-line no-continue\n            }\n            if (bits < b) {\n              bitfield = (bitfield << 8) + bytes[index];\n              index += 1;\n              bits += 8;\n            }\n            r = t.fastAccess[b][bitfield >> (bits - b)];\n            if (r) {\n              bitfield &= masks[bits -= b];\n              r = r.code;\n              break;\n            }\n          }\n          if (r >= 0 && r <= 1) {\n            if (repeat === 0) {\n              repeatPower = 1;\n            }\n            repeat += repeatPower << r;\n            repeatPower <<= 1;\n            continue; // eslint-disable-line no-continue\n          } else {\n            const v = favourites[0];\n            for (; repeat > 0; repeat -= 1) {\n              buffer.push(v);\n            }\n          }\n          if (r === symbolsInUse - 1) {\n            break;\n          } else {\n            const v = favourites[r - 1];\n            // eslint-disable-next-line no-plusplus\n            for (let j = r - 1; j > 0; favourites[j] = favourites[--j]) {\n            // nothing\n            }\n            favourites[0] = v;\n            buffer.push(v);\n          }\n        }\n        const nt = bwtReverse(buffer, pointer);\n        let i = 0;\n        while (i < nt.length) {\n          const c = nt[i];\n          let count = 1;\n          if ((i < nt.length - 4)\n            && nt[i + 1] === c\n            && nt[i + 2] === c\n            && nt[i + 3] === c) {\n            count = nt[i + 4] + 4;\n            i += 5;\n          } else {\n            i += 1;\n          }\n          if (outIndex + count >= out.length) {\n            const old = out;\n            out = new Uint8Array(old.length * 2);\n            out.set(old);\n          }\n          for (let j = 0; j < count; j += 1) {\n            if (checkCRC) {\n              newCRC = (newCRC << 8) ^ crc32Table[((newCRC >> 24) ^ c) & 0xff];\n            }\n            out[outIndex] = c;\n            outIndex += 1;\n          }\n        }\n        if (checkCRC) {\n          const calculatedCRC = newCRC ^ -1;\n          if (calculatedCRC !== crc) {\n            throw new Error(`CRC mismatch: ${calculatedCRC} !== ${crc}`);\n          }\n          newCRC = -1;\n        }\n      } else if (blocktype === 0x177245385090) {\n        read(bits & 0x07); // pad align\n        break;\n      } else {\n        throw new Error('Invalid bz2 blocktype');\n      }\n    }\n    return out.subarray(0, outIndex);\n  }\n\n  const exports = { decompress };\n\n  if (typeof window !== 'undefined') {\n    window.bz2 = exports; // eslint-disable-line no-undef\n  } else {\n    module.exports = exports;\n  }\n}());\n\n\n/***/ }),\n\n/***/ 793:\n/***/ ((module) => {\n\n(function () {\n\t'use strict';\n\n\tvar table = [],\n\t\tpoly = 0xEDB88320; // reverse polynomial\n\n\t// build the table\n\tfunction makeTable() {\n\t\tvar c, n, k;\n\n\t\tfor (n = 0; n < 256; n += 1) {\n\t\t\tc = n;\n\t\t\tfor (k = 0; k < 8; k += 1) {\n\t\t\t\tif (c & 1) {\n\t\t\t\t\tc = poly ^ (c >>> 1);\n\t\t\t\t} else {\n\t\t\t\t\tc = c >>> 1;\n\t\t\t\t}\n\t\t\t}\n\t\t\ttable[n] = c >>> 0;\n\t\t}\n\t}\n\n\tfunction strToArr(str) {\n\t\t// sweet hack to turn string into a 'byte' array\n\t\treturn Array.prototype.map.call(str, function (c) {\n\t\t\treturn c.charCodeAt(0);\n\t\t});\n\t}\n\n\t/*\n\t * Compute CRC of array directly.\n\t *\n\t * This is slower for repeated calls, so append mode is not supported.\n\t */\n\tfunction crcDirect(arr) {\n\t\tvar crc = -1, // initial contents of LFBSR\n\t\t\ti, j, l, temp;\n\n\t\tfor (i = 0, l = arr.length; i < l; i += 1) {\n\t\t\ttemp = (crc ^ arr[i]) & 0xff;\n\n\t\t\t// read 8 bits one at a time\n\t\t\tfor (j = 0; j < 8; j += 1) {\n\t\t\t\tif ((temp & 1) === 1) {\n\t\t\t\t\ttemp = (temp >>> 1) ^ poly;\n\t\t\t\t} else {\n\t\t\t\t\ttemp = (temp >>> 1);\n\t\t\t\t}\n\t\t\t}\n\t\t\tcrc = (crc >>> 8) ^ temp;\n\t\t}\n\n\t\t// flip bits\n\t\treturn crc ^ -1;\n\t}\n\n\t/*\n\t * Compute CRC with the help of a pre-calculated table.\n\t *\n\t * This supports append mode, if the second parameter is set.\n\t */\n\tfunction crcTable(arr, append) {\n\t\tvar crc, i, l;\n\n\t\t// if we're in append mode, don't reset crc\n\t\t// if arr is null or undefined, reset table and return\n\t\tif (typeof crcTable.crc === 'undefined' || !append || !arr) {\n\t\t\tcrcTable.crc = 0 ^ -1;\n\n\t\t\tif (!arr) {\n\t\t\t\treturn;\n\t\t\t}\n\t\t}\n\n\t\t// store in temp variable for minor speed gain\n\t\tcrc = crcTable.crc;\n\n\t\tfor (i = 0, l = arr.length; i < l; i += 1) {\n\t\t\tcrc = (crc >>> 8) ^ table[(crc ^ arr[i]) & 0xff];\n\t\t}\n\n\t\tcrcTable.crc = crc;\n\n\t\treturn crc ^ -1;\n\t}\n\n\t// build the table\n\t// this isn't that costly, and most uses will be for table assisted mode\n\tmakeTable();\n\n\tmodule.exports = function (val, direct) {\n\t\tvar val = (typeof val === 'string') ? strToArr(val) : val,\n\t\t\tret = direct ? crcDirect(val) : crcTable(val);\n\n\t\t// convert to 2's complement hex\n\t\treturn (ret >>> 0).toString(16);\n\t};\n\tmodule.exports.direct = crcDirect;\n\tmodule.exports.table = crcTable;\n}());\n\n\n/***/ }),\n\n/***/ 762:\n/***/ ((module, __unused_webpack_exports, __webpack_require__) => {\n\n(function () {\n\t'use strict';\n\n\tmodule.exports = {\n\t\t'inflate': __webpack_require__(689),\n\t\t'deflate': __webpack_require__(881)\n\t};\n}());\n\n\n/***/ }),\n\n/***/ 881:\n/***/ ((module) => {\n\n/*\n * $Id: rawdeflate.js,v 0.3 2009/03/01 19:05:05 dankogai Exp dankogai $\n *\n * Original:\n *   http://www.onicos.com/staff/iz/amuse/javascript/expert/deflate.txt\n */\n\n/* Copyright (C) 1999 Masanao Izumo <iz@onicos.co.jp>\n * Version: 1.0.1\n * LastModified: Dec 25 1999\n */\n\n/* Interface:\n * data = deflate(src);\n */\n\n(function () {\n\t/* constant parameters */\n\tvar WSIZE = 32768, // Sliding Window size\n\t\tSTORED_BLOCK = 0,\n\t\tSTATIC_TREES = 1,\n\t\tDYN_TREES = 2,\n\n\t/* for deflate */\n\t\tDEFAULT_LEVEL = 6,\n\t\tFULL_SEARCH = false,\n\t\tINBUFSIZ = 32768, // Input buffer size\n\t\t//INBUF_EXTRA = 64, // Extra buffer\n\t\tOUTBUFSIZ = 1024 * 8,\n\t\twindow_size = 2 * WSIZE,\n\t\tMIN_MATCH = 3,\n\t\tMAX_MATCH = 258,\n\t\tBITS = 16,\n\t// for SMALL_MEM\n\t\tLIT_BUFSIZE = 0x2000,\n//\t\tHASH_BITS = 13,\n\t//for MEDIUM_MEM\n\t//\tLIT_BUFSIZE = 0x4000,\n\t//\tHASH_BITS = 14,\n\t// for BIG_MEM\n\t//\tLIT_BUFSIZE = 0x8000,\n\t\tHASH_BITS = 15,\n\t\tDIST_BUFSIZE = LIT_BUFSIZE,\n\t\tHASH_SIZE = 1 << HASH_BITS,\n\t\tHASH_MASK = HASH_SIZE - 1,\n\t\tWMASK = WSIZE - 1,\n\t\tNIL = 0, // Tail of hash chains\n\t\tTOO_FAR = 4096,\n\t\tMIN_LOOKAHEAD = MAX_MATCH + MIN_MATCH + 1,\n\t\tMAX_DIST = WSIZE - MIN_LOOKAHEAD,\n\t\tSMALLEST = 1,\n\t\tMAX_BITS = 15,\n\t\tMAX_BL_BITS = 7,\n\t\tLENGTH_CODES = 29,\n\t\tLITERALS = 256,\n\t\tEND_BLOCK = 256,\n\t\tL_CODES = LITERALS + 1 + LENGTH_CODES,\n\t\tD_CODES = 30,\n\t\tBL_CODES = 19,\n\t\tREP_3_6 = 16,\n\t\tREPZ_3_10 = 17,\n\t\tREPZ_11_138 = 18,\n\t\tHEAP_SIZE = 2 * L_CODES + 1,\n\t\tH_SHIFT = parseInt((HASH_BITS + MIN_MATCH - 1) / MIN_MATCH, 10),\n\n\t/* variables */\n\t\tfree_queue,\n\t\tqhead,\n\t\tqtail,\n\t\tinitflag,\n\t\toutbuf = null,\n\t\toutcnt,\n\t\toutoff,\n\t\tcomplete,\n\t\twindow,\n\t\td_buf,\n\t\tl_buf,\n\t\tprev,\n\t\tbi_buf,\n\t\tbi_valid,\n\t\tblock_start,\n\t\tins_h,\n\t\thash_head,\n\t\tprev_match,\n\t\tmatch_available,\n\t\tmatch_length,\n\t\tprev_length,\n\t\tstrstart,\n\t\tmatch_start,\n\t\teofile,\n\t\tlookahead,\n\t\tmax_chain_length,\n\t\tmax_lazy_match,\n\t\tcompr_level,\n\t\tgood_match,\n\t\tnice_match,\n\t\tdyn_ltree,\n\t\tdyn_dtree,\n\t\tstatic_ltree,\n\t\tstatic_dtree,\n\t\tbl_tree,\n\t\tl_desc,\n\t\td_desc,\n\t\tbl_desc,\n\t\tbl_count,\n\t\theap,\n\t\theap_len,\n\t\theap_max,\n\t\tdepth,\n\t\tlength_code,\n\t\tdist_code,\n\t\tbase_length,\n\t\tbase_dist,\n\t\tflag_buf,\n\t\tlast_lit,\n\t\tlast_dist,\n\t\tlast_flags,\n\t\tflags,\n\t\tflag_bit,\n\t\topt_len,\n\t\tstatic_len,\n\t\tdeflate_data,\n\t\tdeflate_pos;\n\n\tif (LIT_BUFSIZE > INBUFSIZ) {\n\t\tconsole.error(\"error: INBUFSIZ is too small\");\n\t}\n\tif ((WSIZE << 1) > (1 << BITS)) {\n\t\tconsole.error(\"error: WSIZE is too large\");\n\t}\n\tif (HASH_BITS > BITS - 1) {\n\t\tconsole.error(\"error: HASH_BITS is too large\");\n\t}\n\tif (HASH_BITS < 8 || MAX_MATCH !== 258) {\n\t\tconsole.error(\"error: Code too clever\");\n\t}\n\n\t/* objects (deflate) */\n\n\tfunction DeflateCT() {\n\t\tthis.fc = 0; // frequency count or bit string\n\t\tthis.dl = 0; // father node in Huffman tree or length of bit string\n\t}\n\n\tfunction DeflateTreeDesc() {\n\t\tthis.dyn_tree = null; // the dynamic tree\n\t\tthis.static_tree = null; // corresponding static tree or NULL\n\t\tthis.extra_bits = null; // extra bits for each code or NULL\n\t\tthis.extra_base = 0; // base index for extra_bits\n\t\tthis.elems = 0; // max number of elements in the tree\n\t\tthis.max_length = 0; // max bit length for the codes\n\t\tthis.max_code = 0; // largest code with non zero frequency\n\t}\n\n\t/* Values for max_lazy_match, good_match and max_chain_length, depending on\n\t * the desired pack level (0..9). The values given below have been tuned to\n\t * exclude worst case performance for pathological files. Better values may be\n\t * found for specific files.\n\t */\n\tfunction DeflateConfiguration(a, b, c, d) {\n\t\tthis.good_length = a; // reduce lazy search above this match length\n\t\tthis.max_lazy = b; // do not perform lazy search above this match length\n\t\tthis.nice_length = c; // quit search above this match length\n\t\tthis.max_chain = d;\n\t}\n\n\tfunction DeflateBuffer() {\n\t\tthis.next = null;\n\t\tthis.len = 0;\n\t\tthis.ptr = []; // new Array(OUTBUFSIZ); // ptr.length is never read\n\t\tthis.off = 0;\n\t}\n\n\t/* constant tables */\n\tvar extra_lbits = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0];\n\tvar extra_dbits = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13];\n\tvar extra_blbits = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7];\n\tvar bl_order = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];\n\tvar configuration_table = [\n\t\tnew DeflateConfiguration(0, 0, 0, 0),\n\t\tnew DeflateConfiguration(4, 4, 8, 4),\n\t\tnew DeflateConfiguration(4, 5, 16, 8),\n\t\tnew DeflateConfiguration(4, 6, 32, 32),\n\t\tnew DeflateConfiguration(4, 4, 16, 16),\n\t\tnew DeflateConfiguration(8, 16, 32, 32),\n\t\tnew DeflateConfiguration(8, 16, 128, 128),\n\t\tnew DeflateConfiguration(8, 32, 128, 256),\n\t\tnew DeflateConfiguration(32, 128, 258, 1024),\n\t\tnew DeflateConfiguration(32, 258, 258, 4096)\n\t];\n\n\n\t/* routines (deflate) */\n\n\tfunction deflate_start(level) {\n\t\tvar i;\n\n\t\tif (!level) {\n\t\t\tlevel = DEFAULT_LEVEL;\n\t\t} else if (level < 1) {\n\t\t\tlevel = 1;\n\t\t} else if (level > 9) {\n\t\t\tlevel = 9;\n\t\t}\n\n\t\tcompr_level = level;\n\t\tinitflag = false;\n\t\teofile = false;\n\t\tif (outbuf !== null) {\n\t\t\treturn;\n\t\t}\n\n\t\tfree_queue = qhead = qtail = null;\n\t\toutbuf = []; // new Array(OUTBUFSIZ); // outbuf.length never called\n\t\twindow = []; // new Array(window_size); // window.length never called\n\t\td_buf = []; // new Array(DIST_BUFSIZE); // d_buf.length never called\n\t\tl_buf = []; // new Array(INBUFSIZ + INBUF_EXTRA); // l_buf.length never called\n\t\tprev = []; // new Array(1 << BITS); // prev.length never called\n\n\t\tdyn_ltree = [];\n\t\tfor (i = 0; i < HEAP_SIZE; i++) {\n\t\t\tdyn_ltree[i] = new DeflateCT();\n\t\t}\n\t\tdyn_dtree = [];\n\t\tfor (i = 0; i < 2 * D_CODES + 1; i++) {\n\t\t\tdyn_dtree[i] = new DeflateCT();\n\t\t}\n\t\tstatic_ltree = [];\n\t\tfor (i = 0; i < L_CODES + 2; i++) {\n\t\t\tstatic_ltree[i] = new DeflateCT();\n\t\t}\n\t\tstatic_dtree = [];\n\t\tfor (i = 0; i < D_CODES; i++) {\n\t\t\tstatic_dtree[i] = new DeflateCT();\n\t\t}\n\t\tbl_tree = [];\n\t\tfor (i = 0; i < 2 * BL_CODES + 1; i++) {\n\t\t\tbl_tree[i] = new DeflateCT();\n\t\t}\n\t\tl_desc = new DeflateTreeDesc();\n\t\td_desc = new DeflateTreeDesc();\n\t\tbl_desc = new DeflateTreeDesc();\n\t\tbl_count = []; // new Array(MAX_BITS+1); // bl_count.length never called\n\t\theap = []; // new Array(2*L_CODES+1); // heap.length never called\n\t\tdepth = []; // new Array(2*L_CODES+1); // depth.length never called\n\t\tlength_code = []; // new Array(MAX_MATCH-MIN_MATCH+1); // length_code.length never called\n\t\tdist_code = []; // new Array(512); // dist_code.length never called\n\t\tbase_length = []; // new Array(LENGTH_CODES); // base_length.length never called\n\t\tbase_dist = []; // new Array(D_CODES); // base_dist.length never called\n\t\tflag_buf = []; // new Array(parseInt(LIT_BUFSIZE / 8, 10)); // flag_buf.length never called\n\t}\n\n\tfunction deflate_end() {\n\t\tfree_queue = qhead = qtail = null;\n\t\toutbuf = null;\n\t\twindow = null;\n\t\td_buf = null;\n\t\tl_buf = null;\n\t\tprev = null;\n\t\tdyn_ltree = null;\n\t\tdyn_dtree = null;\n\t\tstatic_ltree = null;\n\t\tstatic_dtree = null;\n\t\tbl_tree = null;\n\t\tl_desc = null;\n\t\td_desc = null;\n\t\tbl_desc = null;\n\t\tbl_count = null;\n\t\theap = null;\n\t\tdepth = null;\n\t\tlength_code = null;\n\t\tdist_code = null;\n\t\tbase_length = null;\n\t\tbase_dist = null;\n\t\tflag_buf = null;\n\t}\n\n\tfunction reuse_queue(p) {\n\t\tp.next = free_queue;\n\t\tfree_queue = p;\n\t}\n\n\tfunction new_queue() {\n\t\tvar p;\n\n\t\tif (free_queue !== null) {\n\t\t\tp = free_queue;\n\t\t\tfree_queue = free_queue.next;\n\t\t} else {\n\t\t\tp = new DeflateBuffer();\n\t\t}\n\t\tp.next = null;\n\t\tp.len = p.off = 0;\n\n\t\treturn p;\n\t}\n\n\tfunction head1(i) {\n\t\treturn prev[WSIZE + i];\n\t}\n\n\tfunction head2(i, val) {\n\t\treturn (prev[WSIZE + i] = val);\n\t}\n\n\t/* put_byte is used for the compressed output, put_ubyte for the\n\t * uncompressed output. However unlzw() uses window for its\n\t * suffix table instead of its output buffer, so it does not use put_ubyte\n\t * (to be cleaned up).\n\t */\n\tfunction put_byte(c) {\n\t\toutbuf[outoff + outcnt++] = c;\n\t\tif (outoff + outcnt === OUTBUFSIZ) {\n\t\t\tqoutbuf();\n\t\t}\n\t}\n\n\t/* Output a 16 bit value, lsb first */\n\tfunction put_short(w) {\n\t\tw &= 0xffff;\n\t\tif (outoff + outcnt < OUTBUFSIZ - 2) {\n\t\t\toutbuf[outoff + outcnt++] = (w & 0xff);\n\t\t\toutbuf[outoff + outcnt++] = (w >>> 8);\n\t\t} else {\n\t\t\tput_byte(w & 0xff);\n\t\t\tput_byte(w >>> 8);\n\t\t}\n\t}\n\n\t/* ==========================================================================\n\t * Insert string s in the dictionary and set match_head to the previous head\n\t * of the hash chain (the most recent string with same hash key). Return\n\t * the previous length of the hash chain.\n\t * IN  assertion: all calls to to INSERT_STRING are made with consecutive\n\t *    input characters and the first MIN_MATCH bytes of s are valid\n\t *    (except for the last MIN_MATCH-1 bytes of the input file).\n\t */\n\tfunction INSERT_STRING() {\n\t\tins_h = ((ins_h << H_SHIFT) ^ (window[strstart + MIN_MATCH - 1] & 0xff)) & HASH_MASK;\n\t\thash_head = head1(ins_h);\n\t\tprev[strstart & WMASK] = hash_head;\n\t\thead2(ins_h, strstart);\n\t}\n\n\t/* Send a code of the given tree. c and tree must not have side effects */\n\tfunction SEND_CODE(c, tree) {\n\t\tsend_bits(tree[c].fc, tree[c].dl);\n\t}\n\n\t/* Mapping from a distance to a distance code. dist is the distance - 1 and\n\t * must not have side effects. dist_code[256] and dist_code[257] are never\n\t * used.\n\t */\n\tfunction D_CODE(dist) {\n\t\treturn (dist < 256 ? dist_code[dist] : dist_code[256 + (dist >> 7)]) & 0xff;\n\t}\n\n\t/* ==========================================================================\n\t * Compares to subtrees, using the tree depth as tie breaker when\n\t * the subtrees have equal frequency. This minimizes the worst case length.\n\t */\n\tfunction SMALLER(tree, n, m) {\n\t\treturn tree[n].fc < tree[m].fc || (tree[n].fc === tree[m].fc && depth[n] <= depth[m]);\n\t}\n\n\t/* ==========================================================================\n\t * read string data\n\t */\n\tfunction read_buff(buff, offset, n) {\n\t\tvar i;\n\t\tfor (i = 0; i < n && deflate_pos < deflate_data.length; i++) {\n\t\t\tbuff[offset + i] = deflate_data[deflate_pos++] & 0xff;\n\t\t}\n\t\treturn i;\n\t}\n\n\t/* ==========================================================================\n\t * Initialize the \"longest match\" routines for a new file\n\t */\n\tfunction lm_init() {\n\t\tvar j;\n\n\t\t// Initialize the hash table. */\n\t\tfor (j = 0; j < HASH_SIZE; j++) {\n\t\t\t// head2(j, NIL);\n\t\t\tprev[WSIZE + j] = 0;\n\t\t}\n\t\t// prev will be initialized on the fly */\n\n\t\t// Set the default configuration parameters:\n\t\tmax_lazy_match = configuration_table[compr_level].max_lazy;\n\t\tgood_match = configuration_table[compr_level].good_length;\n\t\tif (!FULL_SEARCH) {\n\t\t\tnice_match = configuration_table[compr_level].nice_length;\n\t\t}\n\t\tmax_chain_length = configuration_table[compr_level].max_chain;\n\n\t\tstrstart = 0;\n\t\tblock_start = 0;\n\n\t\tlookahead = read_buff(window, 0, 2 * WSIZE);\n\t\tif (lookahead <= 0) {\n\t\t\teofile = true;\n\t\t\tlookahead = 0;\n\t\t\treturn;\n\t\t}\n\t\teofile = false;\n\t\t// Make sure that we always have enough lookahead. This is important\n\t\t// if input comes from a device such as a tty.\n\t\twhile (lookahead < MIN_LOOKAHEAD && !eofile) {\n\t\t\tfill_window();\n\t\t}\n\n\t\t// If lookahead < MIN_MATCH, ins_h is garbage, but this is\n\t\t// not important since only literal bytes will be emitted.\n\t\tins_h = 0;\n\t\tfor (j = 0; j < MIN_MATCH - 1; j++) {\n\t\t\t// UPDATE_HASH(ins_h, window[j]);\n\t\t\tins_h = ((ins_h << H_SHIFT) ^ (window[j] & 0xff)) & HASH_MASK;\n\t\t}\n\t}\n\n\t/* ==========================================================================\n\t * Set match_start to the longest match starting at the given string and\n\t * return its length. Matches shorter or equal to prev_length are discarded,\n\t * in which case the result is equal to prev_length and match_start is\n\t * garbage.\n\t * IN assertions: cur_match is the head of the hash chain for the current\n\t *   string (strstart) and its distance is <= MAX_DIST, and prev_length >= 1\n\t */\n\tfunction longest_match(cur_match) {\n\t\tvar chain_length = max_chain_length; // max hash chain length\n\t\tvar scanp = strstart; // current string\n\t\tvar matchp; // matched string\n\t\tvar len; // length of current match\n\t\tvar best_len = prev_length; // best match length so far\n\n\t\t// Stop when cur_match becomes <= limit. To simplify the code,\n\t\t// we prevent matches with the string of window index 0.\n\t\tvar limit = (strstart > MAX_DIST ? strstart - MAX_DIST : NIL);\n\n\t\tvar strendp = strstart + MAX_MATCH;\n\t\tvar scan_end1 = window[scanp + best_len - 1];\n\t\tvar scan_end = window[scanp + best_len];\n\n\t\tvar i, broke;\n\n\t\t// Do not waste too much time if we already have a good match: */\n\t\tif (prev_length >= good_match) {\n\t\t\tchain_length >>= 2;\n\t\t}\n\n\t\t// Assert(encoder->strstart <= window_size-MIN_LOOKAHEAD, \"insufficient lookahead\");\n\n\t\tdo {\n\t\t\t// Assert(cur_match < encoder->strstart, \"no future\");\n\t\t\tmatchp = cur_match;\n\n\t\t\t// Skip to next match if the match length cannot increase\n\t\t\t// or if the match length is less than 2:\n\t\t\tif (window[matchp + best_len] !== scan_end  ||\n\t\t\t\t\twindow[matchp + best_len - 1] !== scan_end1 ||\n\t\t\t\t\twindow[matchp] !== window[scanp] ||\n\t\t\t\t\twindow[++matchp] !== window[scanp + 1]) {\n\t\t\t\tcontinue;\n\t\t\t}\n\n\t\t\t// The check at best_len-1 can be removed because it will be made\n\t\t\t// again later. (This heuristic is not always a win.)\n\t\t\t// It is not necessary to compare scan[2] and match[2] since they\n\t\t\t// are always equal when the other bytes match, given that\n\t\t\t// the hash keys are equal and that HASH_BITS >= 8.\n\t\t\tscanp += 2;\n\t\t\tmatchp++;\n\n\t\t\t// We check for insufficient lookahead only every 8th comparison;\n\t\t\t// the 256th check will be made at strstart+258.\n\t\t\twhile (scanp < strendp) {\n\t\t\t\tbroke = false;\n\t\t\t\tfor (i = 0; i < 8; i += 1) {\n\t\t\t\t\tscanp += 1;\n\t\t\t\t\tmatchp += 1;\n\t\t\t\t\tif (window[scanp] !== window[matchp]) {\n\t\t\t\t\t\tbroke = true;\n\t\t\t\t\t\tbreak;\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\tif (broke) {\n\t\t\t\t\tbreak;\n\t\t\t\t}\n\t\t\t}\n\n\t\t\tlen = MAX_MATCH - (strendp - scanp);\n\t\t\tscanp = strendp - MAX_MATCH;\n\n\t\t\tif (len > best_len) {\n\t\t\t\tmatch_start = cur_match;\n\t\t\t\tbest_len = len;\n\t\t\t\tif (FULL_SEARCH) {\n\t\t\t\t\tif (len >= MAX_MATCH) {\n\t\t\t\t\t\tbreak;\n\t\t\t\t\t}\n\t\t\t\t} else {\n\t\t\t\t\tif (len >= nice_match) {\n\t\t\t\t\t\tbreak;\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\tscan_end1 = window[scanp + best_len - 1];\n\t\t\t\tscan_end = window[scanp + best_len];\n\t\t\t}\n\t\t} while ((cur_match = prev[cur_match & WMASK]) > limit && --chain_length !== 0);\n\n\t\treturn best_len;\n\t}\n\n\t/* ==========================================================================\n\t * Fill the window when the lookahead becomes insufficient.\n\t * Updates strstart and lookahead, and sets eofile if end of input file.\n\t * IN assertion: lookahead < MIN_LOOKAHEAD && strstart + lookahead > 0\n\t * OUT assertions: at least one byte has been read, or eofile is set;\n\t *    file reads are performed for at least two bytes (required for the\n\t *    translate_eol option).\n\t */\n\tfunction fill_window() {\n\t\tvar n, m;\n\n\t // Amount of free space at the end of the window.\n\t\tvar more = window_size - lookahead - strstart;\n\n\t\t// If the window is almost full and there is insufficient lookahead,\n\t\t// move the upper half to the lower one to make room in the upper half.\n\t\tif (more === -1) {\n\t\t\t// Very unlikely, but possible on 16 bit machine if strstart == 0\n\t\t\t// and lookahead == 1 (input done one byte at time)\n\t\t\tmore--;\n\t\t} else if (strstart >= WSIZE + MAX_DIST) {\n\t\t\t// By the IN assertion, the window is not empty so we can't confuse\n\t\t\t// more == 0 with more == 64K on a 16 bit machine.\n\t\t\t// Assert(window_size == (ulg)2*WSIZE, \"no sliding with BIG_MEM\");\n\n\t\t\t// System.arraycopy(window, WSIZE, window, 0, WSIZE);\n\t\t\tfor (n = 0; n < WSIZE; n++) {\n\t\t\t\twindow[n] = window[n + WSIZE];\n\t\t\t}\n\n\t\t\tmatch_start -= WSIZE;\n\t\t\tstrstart    -= WSIZE; /* we now have strstart >= MAX_DIST: */\n\t\t\tblock_start -= WSIZE;\n\n\t\t\tfor (n = 0; n < HASH_SIZE; n++) {\n\t\t\t\tm = head1(n);\n\t\t\t\thead2(n, m >= WSIZE ? m - WSIZE : NIL);\n\t\t\t}\n\t\t\tfor (n = 0; n < WSIZE; n++) {\n\t\t\t// If n is not on any hash chain, prev[n] is garbage but\n\t\t\t// its value will never be used.\n\t\t\t\tm = prev[n];\n\t\t\t\tprev[n] = (m >= WSIZE ? m - WSIZE : NIL);\n\t\t\t}\n\t\t\tmore += WSIZE;\n\t\t}\n\t\t// At this point, more >= 2\n\t\tif (!eofile) {\n\t\t\tn = read_buff(window, strstart + lookahead, more);\n\t\t\tif (n <= 0) {\n\t\t\t\teofile = true;\n\t\t\t} else {\n\t\t\t\tlookahead += n;\n\t\t\t}\n\t\t}\n\t}\n\n\t/* ==========================================================================\n\t * Processes a new input file and return its compressed length. This\n\t * function does not perform lazy evaluationof matches and inserts\n\t * new strings in the dictionary only for unmatched strings or for short\n\t * matches. It is used only for the fast compression options.\n\t */\n\tfunction deflate_fast() {\n\t\twhile (lookahead !== 0 && qhead === null) {\n\t\t\tvar flush; // set if current block must be flushed\n\n\t\t\t// Insert the string window[strstart .. strstart+2] in the\n\t\t\t// dictionary, and set hash_head to the head of the hash chain:\n\t\t\tINSERT_STRING();\n\n\t\t\t// Find the longest match, discarding those <= prev_length.\n\t\t\t// At this point we have always match_length < MIN_MATCH\n\t\t\tif (hash_head !== NIL && strstart - hash_head <= MAX_DIST) {\n\t\t\t\t// To simplify the code, we prevent matches with the string\n\t\t\t\t// of window index 0 (in particular we have to avoid a match\n\t\t\t\t// of the string with itself at the start of the input file).\n\t\t\t\tmatch_length = longest_match(hash_head);\n\t\t\t\t// longest_match() sets match_start */\n\t\t\t\tif (match_length > lookahead) {\n\t\t\t\t\tmatch_length = lookahead;\n\t\t\t\t}\n\t\t\t}\n\t\t\tif (match_length >= MIN_MATCH) {\n\t\t\t\t// check_match(strstart, match_start, match_length);\n\n\t\t\t\tflush = ct_tally(strstart - match_start, match_length - MIN_MATCH);\n\t\t\t\tlookahead -= match_length;\n\n\t\t\t\t// Insert new strings in the hash table only if the match length\n\t\t\t\t// is not too large. This saves time but degrades compression.\n\t\t\t\tif (match_length <= max_lazy_match) {\n\t\t\t\t\tmatch_length--; // string at strstart already in hash table\n\t\t\t\t\tdo {\n\t\t\t\t\t\tstrstart++;\n\t\t\t\t\t\tINSERT_STRING();\n\t\t\t\t\t\t// strstart never exceeds WSIZE-MAX_MATCH, so there are\n\t\t\t\t\t\t// always MIN_MATCH bytes ahead. If lookahead < MIN_MATCH\n\t\t\t\t\t\t// these bytes are garbage, but it does not matter since\n\t\t\t\t\t\t// the next lookahead bytes will be emitted as literals.\n\t\t\t\t\t} while (--match_length !== 0);\n\t\t\t\t\tstrstart++;\n\t\t\t\t} else {\n\t\t\t\t\tstrstart += match_length;\n\t\t\t\t\tmatch_length = 0;\n\t\t\t\t\tins_h = window[strstart] & 0xff;\n\t\t\t\t\t// UPDATE_HASH(ins_h, window[strstart + 1]);\n\t\t\t\t\tins_h = ((ins_h << H_SHIFT) ^ (window[strstart + 1] & 0xff)) & HASH_MASK;\n\n\t\t\t\t//#if MIN_MATCH !== 3\n\t\t\t\t//\t\tCall UPDATE_HASH() MIN_MATCH-3 more times\n\t\t\t\t//#endif\n\n\t\t\t\t}\n\t\t\t} else {\n\t\t\t\t// No match, output a literal byte */\n\t\t\t\tflush = ct_tally(0, window[strstart] & 0xff);\n\t\t\t\tlookahead--;\n\t\t\t\tstrstart++;\n\t\t\t}\n\t\t\tif (flush) {\n\t\t\t\tflush_block(0);\n\t\t\t\tblock_start = strstart;\n\t\t\t}\n\n\t\t\t// Make sure that we always have enough lookahead, except\n\t\t\t// at the end of the input file. We need MAX_MATCH bytes\n\t\t\t// for the next match, plus MIN_MATCH bytes to insert the\n\t\t\t// string following the next match.\n\t\t\twhile (lookahead < MIN_LOOKAHEAD && !eofile) {\n\t\t\t\tfill_window();\n\t\t\t}\n\t\t}\n\t}\n\n\tfunction deflate_better() {\n\t\t// Process the input block. */\n\t\twhile (lookahead !== 0 && qhead === null) {\n\t\t\t// Insert the string window[strstart .. strstart+2] in the\n\t\t\t// dictionary, and set hash_head to the head of the hash chain:\n\t\t\tINSERT_STRING();\n\n\t\t\t// Find the longest match, discarding those <= prev_length.\n\t\t\tprev_length = match_length;\n\t\t\tprev_match = match_start;\n\t\t\tmatch_length = MIN_MATCH - 1;\n\n\t\t\tif (hash_head !== NIL && prev_length < max_lazy_match && strstart - hash_head <= MAX_DIST) {\n\t\t\t\t// To simplify the code, we prevent matches with the string\n\t\t\t\t// of window index 0 (in particular we have to avoid a match\n\t\t\t\t// of the string with itself at the start of the input file).\n\t\t\t\tmatch_length = longest_match(hash_head);\n\t\t\t\t// longest_match() sets match_start */\n\t\t\t\tif (match_length > lookahead) {\n\t\t\t\t\tmatch_length = lookahead;\n\t\t\t\t}\n\n\t\t\t\t// Ignore a length 3 match if it is too distant: */\n\t\t\t\tif (match_length === MIN_MATCH && strstart - match_start > TOO_FAR) {\n\t\t\t\t\t// If prev_match is also MIN_MATCH, match_start is garbage\n\t\t\t\t\t// but we will ignore the current match anyway.\n\t\t\t\t\tmatch_length--;\n\t\t\t\t}\n\t\t\t}\n\t\t\t// If there was a match at the previous step and the current\n\t\t\t// match is not better, output the previous match:\n\t\t\tif (prev_length >= MIN_MATCH && match_length <= prev_length) {\n\t\t\t\tvar flush; // set if current block must be flushed\n\n\t\t\t\t// check_match(strstart - 1, prev_match, prev_length);\n\t\t\t\tflush = ct_tally(strstart - 1 - prev_match, prev_length - MIN_MATCH);\n\n\t\t\t\t// Insert in hash table all strings up to the end of the match.\n\t\t\t\t// strstart-1 and strstart are already inserted.\n\t\t\t\tlookahead -= prev_length - 1;\n\t\t\t\tprev_length -= 2;\n\t\t\t\tdo {\n\t\t\t\t\tstrstart++;\n\t\t\t\t\tINSERT_STRING();\n\t\t\t\t\t// strstart never exceeds WSIZE-MAX_MATCH, so there are\n\t\t\t\t\t// always MIN_MATCH bytes ahead. If lookahead < MIN_MATCH\n\t\t\t\t\t// these bytes are garbage, but it does not matter since the\n\t\t\t\t\t// next lookahead bytes will always be emitted as literals.\n\t\t\t\t} while (--prev_length !== 0);\n\t\t\t\tmatch_available = false;\n\t\t\t\tmatch_length = MIN_MATCH - 1;\n\t\t\t\tstrstart++;\n\t\t\t\tif (flush) {\n\t\t\t\t\tflush_block(0);\n\t\t\t\t\tblock_start = strstart;\n\t\t\t\t}\n\t\t\t} else if (match_available) {\n\t\t\t\t// If there was no match at the previous position, output a\n\t\t\t\t// single literal. If there was a match but the current match\n\t\t\t\t// is longer, truncate the previous match to a single literal.\n\t\t\t\tif (ct_tally(0, window[strstart - 1] & 0xff)) {\n\t\t\t\t\tflush_block(0);\n\t\t\t\t\tblock_start = strstart;\n\t\t\t\t}\n\t\t\t\tstrstart++;\n\t\t\t\tlookahead--;\n\t\t\t} else {\n\t\t\t\t// There is no previous match to compare with, wait for\n\t\t\t\t// the next step to decide.\n\t\t\t\tmatch_available = true;\n\t\t\t\tstrstart++;\n\t\t\t\tlookahead--;\n\t\t\t}\n\n\t\t\t// Make sure that we always have enough lookahead, except\n\t\t\t// at the end of the input file. We need MAX_MATCH bytes\n\t\t\t// for the next match, plus MIN_MATCH bytes to insert the\n\t\t\t// string following the next match.\n\t\t\twhile (lookahead < MIN_LOOKAHEAD && !eofile) {\n\t\t\t\tfill_window();\n\t\t\t}\n\t\t}\n\t}\n\n\tfunction init_deflate() {\n\t\tif (eofile) {\n\t\t\treturn;\n\t\t}\n\t\tbi_buf = 0;\n\t\tbi_valid = 0;\n\t\tct_init();\n\t\tlm_init();\n\n\t\tqhead = null;\n\t\toutcnt = 0;\n\t\toutoff = 0;\n\n\t\tif (compr_level <= 3) {\n\t\t\tprev_length = MIN_MATCH - 1;\n\t\t\tmatch_length = 0;\n\t\t} else {\n\t\t\tmatch_length = MIN_MATCH - 1;\n\t\t\tmatch_available = false;\n\t\t}\n\n\t\tcomplete = false;\n\t}\n\n\t/* ==========================================================================\n\t * Same as above, but achieves better compression. We use a lazy\n\t * evaluation for matches: a match is finally adopted only if there is\n\t * no better match at the next window position.\n\t */\n\tfunction deflate_internal(buff, off, buff_size) {\n\t\tvar n;\n\n\t\tif (!initflag) {\n\t\t\tinit_deflate();\n\t\t\tinitflag = true;\n\t\t\tif (lookahead === 0) { // empty\n\t\t\t\tcomplete = true;\n\t\t\t\treturn 0;\n\t\t\t}\n\t\t}\n\n\t\tn = qcopy(buff, off, buff_size);\n\t\tif (n === buff_size) {\n\t\t\treturn buff_size;\n\t\t}\n\n\t\tif (complete) {\n\t\t\treturn n;\n\t\t}\n\n\t\tif (compr_level <= 3) {\n\t\t\t// optimized for speed\n\t\t\tdeflate_fast();\n\t\t} else {\n\t\t\tdeflate_better();\n\t\t}\n\n\t\tif (lookahead === 0) {\n\t\t\tif (match_available) {\n\t\t\t\tct_tally(0, window[strstart - 1] & 0xff);\n\t\t\t}\n\t\t\tflush_block(1);\n\t\t\tcomplete = true;\n\t\t}\n\n\t\treturn n + qcopy(buff, n + off, buff_size - n);\n\t}\n\n\tfunction qcopy(buff, off, buff_size) {\n\t\tvar n, i, j;\n\n\t\tn = 0;\n\t\twhile (qhead !== null && n < buff_size) {\n\t\t\ti = buff_size - n;\n\t\t\tif (i > qhead.len) {\n\t\t\t\ti = qhead.len;\n\t\t\t}\n\t\t\t// System.arraycopy(qhead.ptr, qhead.off, buff, off + n, i);\n\t\t\tfor (j = 0; j < i; j++) {\n\t\t\t\tbuff[off + n + j] = qhead.ptr[qhead.off + j];\n\t\t\t}\n\n\t\t\tqhead.off += i;\n\t\t\tqhead.len -= i;\n\t\t\tn += i;\n\t\t\tif (qhead.len === 0) {\n\t\t\t\tvar p;\n\t\t\t\tp = qhead;\n\t\t\t\tqhead = qhead.next;\n\t\t\t\treuse_queue(p);\n\t\t\t}\n\t\t}\n\n\t\tif (n === buff_size) {\n\t\t\treturn n;\n\t\t}\n\n\t\tif (outoff < outcnt) {\n\t\t\ti = buff_size - n;\n\t\t\tif (i > outcnt - outoff) {\n\t\t\t\ti = outcnt - outoff;\n\t\t\t}\n\t\t\t// System.arraycopy(outbuf, outoff, buff, off + n, i);\n\t\t\tfor (j = 0; j < i; j++) {\n\t\t\t\tbuff[off + n + j] = outbuf[outoff + j];\n\t\t\t}\n\t\t\toutoff += i;\n\t\t\tn += i;\n\t\t\tif (outcnt === outoff) {\n\t\t\t\toutcnt = outoff = 0;\n\t\t\t}\n\t\t}\n\t\treturn n;\n\t}\n\n\t/* ==========================================================================\n\t * Allocate the match buffer, initialize the various tables and save the\n\t * location of the internal file attribute (ascii/binary) and method\n\t * (DEFLATE/STORE).\n\t */\n\tfunction ct_init() {\n\t\tvar n; // iterates over tree elements\n\t\tvar bits; // bit counter\n\t\tvar length; // length value\n\t\tvar code; // code value\n\t\tvar dist; // distance index\n\n\t\tif (static_dtree[0].dl !== 0) {\n\t\t\treturn; // ct_init already called\n\t\t}\n\n\t\tl_desc.dyn_tree = dyn_ltree;\n\t\tl_desc.static_tree = static_ltree;\n\t\tl_desc.extra_bits = extra_lbits;\n\t\tl_desc.extra_base = LITERALS + 1;\n\t\tl_desc.elems = L_CODES;\n\t\tl_desc.max_length = MAX_BITS;\n\t\tl_desc.max_code = 0;\n\n\t\td_desc.dyn_tree = dyn_dtree;\n\t\td_desc.static_tree = static_dtree;\n\t\td_desc.extra_bits = extra_dbits;\n\t\td_desc.extra_base = 0;\n\t\td_desc.elems = D_CODES;\n\t\td_desc.max_length = MAX_BITS;\n\t\td_desc.max_code = 0;\n\n\t\tbl_desc.dyn_tree = bl_tree;\n\t\tbl_desc.static_tree = null;\n\t\tbl_desc.extra_bits = extra_blbits;\n\t\tbl_desc.extra_base = 0;\n\t\tbl_desc.elems = BL_CODES;\n\t\tbl_desc.max_length = MAX_BL_BITS;\n\t\tbl_desc.max_code = 0;\n\n\t // Initialize the mapping length (0..255) -> length code (0..28)\n\t\tlength = 0;\n\t\tfor (code = 0; code < LENGTH_CODES - 1; code++) {\n\t\t\tbase_length[code] = length;\n\t\t\tfor (n = 0; n < (1 << extra_lbits[code]); n++) {\n\t\t\t\tlength_code[length++] = code;\n\t\t\t}\n\t\t}\n\t // Assert (length === 256, \"ct_init: length !== 256\");\n\n\t\t// Note that the length 255 (match length 258) can be represented\n\t\t// in two different ways: code 284 + 5 bits or code 285, so we\n\t\t// overwrite length_code[255] to use the best encoding:\n\t\tlength_code[length - 1] = code;\n\n\t\t// Initialize the mapping dist (0..32K) -> dist code (0..29) */\n\t\tdist = 0;\n\t\tfor (code = 0; code < 16; code++) {\n\t\t\tbase_dist[code] = dist;\n\t\t\tfor (n = 0; n < (1 << extra_dbits[code]); n++) {\n\t\t\t\tdist_code[dist++] = code;\n\t\t\t}\n\t\t}\n\t\t// Assert (dist === 256, \"ct_init: dist !== 256\");\n\t\t// from now on, all distances are divided by 128\n\t\tfor (dist >>= 7; code < D_CODES; code++) {\n\t\t\tbase_dist[code] = dist << 7;\n\t\t\tfor (n = 0; n < (1 << (extra_dbits[code] - 7)); n++) {\n\t\t\t\tdist_code[256 + dist++] = code;\n\t\t\t}\n\t\t}\n\t\t// Assert (dist === 256, \"ct_init: 256+dist !== 512\");\n\n\t\t// Construct the codes of the static literal tree\n\t\tfor (bits = 0; bits <= MAX_BITS; bits++) {\n\t\t\tbl_count[bits] = 0;\n\t\t}\n\t\tn = 0;\n\t\twhile (n <= 143) {\n\t\t\tstatic_ltree[n++].dl = 8;\n\t\t\tbl_count[8]++;\n\t\t}\n\t\twhile (n <= 255) {\n\t\t\tstatic_ltree[n++].dl = 9;\n\t\t\tbl_count[9]++;\n\t\t}\n\t\twhile (n <= 279) {\n\t\t\tstatic_ltree[n++].dl = 7;\n\t\t\tbl_count[7]++;\n\t\t}\n\t\twhile (n <= 287) {\n\t\t\tstatic_ltree[n++].dl = 8;\n\t\t\tbl_count[8]++;\n\t\t}\n\t\t// Codes 286 and 287 do not exist, but we must include them in the\n\t\t// tree construction to get a canonical Huffman tree (longest code\n\t\t// all ones)\n\t\tgen_codes(static_ltree, L_CODES + 1);\n\n\t\t// The static distance tree is trivial: */\n\t\tfor (n = 0; n < D_CODES; n++) {\n\t\t\tstatic_dtree[n].dl = 5;\n\t\t\tstatic_dtree[n].fc = bi_reverse(n, 5);\n\t\t}\n\n\t\t// Initialize the first block of the first file:\n\t\tinit_block();\n\t}\n\n\t/* ==========================================================================\n\t * Initialize a new block.\n\t */\n\tfunction init_block() {\n\t\tvar n; // iterates over tree elements\n\n\t\t// Initialize the trees.\n\t\tfor (n = 0; n < L_CODES;  n++) {\n\t\t\tdyn_ltree[n].fc = 0;\n\t\t}\n\t\tfor (n = 0; n < D_CODES;  n++) {\n\t\t\tdyn_dtree[n].fc = 0;\n\t\t}\n\t\tfor (n = 0; n < BL_CODES; n++) {\n\t\t\tbl_tree[n].fc = 0;\n\t\t}\n\n\t\tdyn_ltree[END_BLOCK].fc = 1;\n\t\topt_len = static_len = 0;\n\t\tlast_lit = last_dist = last_flags = 0;\n\t\tflags = 0;\n\t\tflag_bit = 1;\n\t}\n\n\t/* ==========================================================================\n\t * Restore the heap property by moving down the tree starting at node k,\n\t * exchanging a node with the smallest of its two sons if necessary, stopping\n\t * when the heap property is re-established (each father smaller than its\n\t * two sons).\n\t *\n\t * @param tree- tree to restore\n\t * @param k- node to move down\n\t */\n\tfunction pqdownheap(tree, k) {\n\t\tvar v = heap[k],\n\t\t\tj = k << 1; // left son of k\n\n\t\twhile (j <= heap_len) {\n\t\t\t// Set j to the smallest of the two sons:\n\t\t\tif (j < heap_len && SMALLER(tree, heap[j + 1], heap[j])) {\n\t\t\t\tj++;\n\t\t\t}\n\n\t\t\t// Exit if v is smaller than both sons\n\t\t\tif (SMALLER(tree, v, heap[j])) {\n\t\t\t\tbreak;\n\t\t\t}\n\n\t\t\t// Exchange v with the smallest son\n\t\t\theap[k] = heap[j];\n\t\t\tk = j;\n\n\t\t\t// And continue down the tree, setting j to the left son of k\n\t\t\tj <<= 1;\n\t\t}\n\t\theap[k] = v;\n\t}\n\n\t/* ==========================================================================\n\t * Compute the optimal bit lengths for a tree and update the total bit length\n\t * for the current block.\n\t * IN assertion: the fields freq and dad are set, heap[heap_max] and\n\t *    above are the tree nodes sorted by increasing frequency.\n\t * OUT assertions: the field len is set to the optimal bit length, the\n\t *     array bl_count contains the frequencies for each bit length.\n\t *     The length opt_len is updated; static_len is also updated if stree is\n\t *     not null.\n\t */\n\tfunction gen_bitlen(desc) { // the tree descriptor\n\t\tvar tree = desc.dyn_tree;\n\t\tvar extra = desc.extra_bits;\n\t\tvar base = desc.extra_base;\n\t\tvar max_code = desc.max_code;\n\t\tvar max_length = desc.max_length;\n\t\tvar stree = desc.static_tree;\n\t\tvar h; // heap index\n\t\tvar n, m; // iterate over the tree elements\n\t\tvar bits; // bit length\n\t\tvar xbits; // extra bits\n\t\tvar f; // frequency\n\t\tvar overflow = 0; // number of elements with bit length too large\n\n\t\tfor (bits = 0; bits <= MAX_BITS; bits++) {\n\t\t\tbl_count[bits] = 0;\n\t\t}\n\n\t\t// In a first pass, compute the optimal bit lengths (which may\n\t\t// overflow in the case of the bit length tree).\n\t\ttree[heap[heap_max]].dl = 0; // root of the heap\n\n\t\tfor (h = heap_max + 1; h < HEAP_SIZE; h++) {\n\t\t\tn = heap[h];\n\t\t\tbits = tree[tree[n].dl].dl + 1;\n\t\t\tif (bits > max_length) {\n\t\t\t\tbits = max_length;\n\t\t\t\toverflow++;\n\t\t\t}\n\t\t\ttree[n].dl = bits;\n\t\t\t// We overwrite tree[n].dl which is no longer needed\n\n\t\t\tif (n > max_code) {\n\t\t\t\tcontinue; // not a leaf node\n\t\t\t}\n\n\t\t\tbl_count[bits]++;\n\t\t\txbits = 0;\n\t\t\tif (n >= base) {\n\t\t\t\txbits = extra[n - base];\n\t\t\t}\n\t\t\tf = tree[n].fc;\n\t\t\topt_len += f * (bits + xbits);\n\t\t\tif (stree !== null) {\n\t\t\t\tstatic_len += f * (stree[n].dl + xbits);\n\t\t\t}\n\t\t}\n\t\tif (overflow === 0) {\n\t\t\treturn;\n\t\t}\n\n\t\t// This happens for example on obj2 and pic of the Calgary corpus\n\n\t\t// Find the first bit length which could increase:\n\t\tdo {\n\t\t\tbits = max_length - 1;\n\t\t\twhile (bl_count[bits] === 0) {\n\t\t\t\tbits--;\n\t\t\t}\n\t\t\tbl_count[bits]--; // move one leaf down the tree\n\t\t\tbl_count[bits + 1] += 2; // move one overflow item as its brother\n\t\t\tbl_count[max_length]--;\n\t\t\t// The brother of the overflow item also moves one step up,\n\t\t\t// but this does not affect bl_count[max_length]\n\t\t\toverflow -= 2;\n\t\t} while (overflow > 0);\n\n\t\t// Now recompute all bit lengths, scanning in increasing frequency.\n\t\t// h is still equal to HEAP_SIZE. (It is simpler to reconstruct all\n\t\t// lengths instead of fixing only the wrong ones. This idea is taken\n\t\t// from 'ar' written by Haruhiko Okumura.)\n\t\tfor (bits = max_length; bits !== 0; bits--) {\n\t\t\tn = bl_count[bits];\n\t\t\twhile (n !== 0) {\n\t\t\t\tm = heap[--h];\n\t\t\t\tif (m > max_code) {\n\t\t\t\t\tcontinue;\n\t\t\t\t}\n\t\t\t\tif (tree[m].dl !== bits) {\n\t\t\t\t\topt_len += (bits - tree[m].dl) * tree[m].fc;\n\t\t\t\t\ttree[m].fc = bits;\n\t\t\t\t}\n\t\t\t\tn--;\n\t\t\t}\n\t\t}\n\t}\n\n\t  /* ==========================================================================\n\t   * Generate the codes for a given tree and bit counts (which need not be\n\t   * optimal).\n\t   * IN assertion: the array bl_count contains the bit length statistics for\n\t   * the given tree and the field len is set for all tree elements.\n\t   * OUT assertion: the field code is set for all tree elements of non\n\t   *     zero code length.\n\t   * @param tree- the tree to decorate\n\t   * @param max_code- largest code with non-zero frequency\n\t   */\n\tfunction gen_codes(tree, max_code) {\n\t\tvar next_code = []; // new Array(MAX_BITS + 1); // next code value for each bit length\n\t\tvar code = 0; // running code value\n\t\tvar bits; // bit index\n\t\tvar n; // code index\n\n\t\t// The distribution counts are first used to generate the code values\n\t\t// without bit reversal.\n\t\tfor (bits = 1; bits <= MAX_BITS; bits++) {\n\t\t\tcode = ((code + bl_count[bits - 1]) << 1);\n\t\t\tnext_code[bits] = code;\n\t\t}\n\n\t\t// Check that the bit counts in bl_count are consistent. The last code\n\t\t// must be all ones.\n\t\t// Assert (code + encoder->bl_count[MAX_BITS]-1 === (1<<MAX_BITS)-1, \"inconsistent bit counts\");\n\t\t// Tracev((stderr,\"\\ngen_codes: max_code %d \", max_code));\n\n\t\tfor (n = 0; n <= max_code; n++) {\n\t\t\tvar len = tree[n].dl;\n\t\t\tif (len === 0) {\n\t\t\t\tcontinue;\n\t\t\t}\n\t\t\t// Now reverse the bits\n\t\t\ttree[n].fc = bi_reverse(next_code[len]++, len);\n\n\t\t\t// Tracec(tree !== static_ltree, (stderr,\"\\nn %3d %c l %2d c %4x (%x) \", n, (isgraph(n) ? n : ' '), len, tree[n].fc, next_code[len]-1));\n\t\t}\n\t}\n\n\t/* ==========================================================================\n\t * Construct one Huffman tree and assigns the code bit strings and lengths.\n\t * Update the total bit length for the current block.\n\t * IN assertion: the field freq is set for all tree elements.\n\t * OUT assertions: the fields len and code are set to the optimal bit length\n\t *     and corresponding code. The length opt_len is updated; static_len is\n\t *     also updated if stree is not null. The field max_code is set.\n\t */\n\tfunction build_tree(desc) { // the tree descriptor\n\t\tvar tree = desc.dyn_tree;\n\t\tvar stree = desc.static_tree;\n\t\tvar elems = desc.elems;\n\t\tvar n, m; // iterate over heap elements\n\t\tvar max_code = -1; // largest code with non zero frequency\n\t\tvar node = elems; // next internal node of the tree\n\n\t\t// Construct the initial heap, with least frequent element in\n\t\t// heap[SMALLEST]. The sons of heap[n] are heap[2*n] and heap[2*n+1].\n\t\t// heap[0] is not used.\n\t\theap_len = 0;\n\t\theap_max = HEAP_SIZE;\n\n\t\tfor (n = 0; n < elems; n++) {\n\t\t\tif (tree[n].fc !== 0) {\n\t\t\t\theap[++heap_len] = max_code = n;\n\t\t\t\tdepth[n] = 0;\n\t\t\t} else {\n\t\t\t\ttree[n].dl = 0;\n\t\t\t}\n\t\t}\n\n\t\t// The pkzip format requires that at least one distance code exists,\n\t\t// and that at least one bit should be sent even if there is only one\n\t\t// possible code. So to avoid special checks later on we force at least\n\t\t// two codes of non zero frequency.\n\t\twhile (heap_len < 2) {\n\t\t\tvar xnew = heap[++heap_len] = (max_code < 2 ? ++max_code : 0);\n\t\t\ttree[xnew].fc = 1;\n\t\t\tdepth[xnew] = 0;\n\t\t\topt_len--;\n\t\t\tif (stree !== null) {\n\t\t\t\tstatic_len -= stree[xnew].dl;\n\t\t\t}\n\t\t\t// new is 0 or 1 so it does not have extra bits\n\t\t}\n\t\tdesc.max_code = max_code;\n\n\t\t// The elements heap[heap_len/2+1 .. heap_len] are leaves of the tree,\n\t\t// establish sub-heaps of increasing lengths:\n\t\tfor (n = heap_len >> 1; n >= 1; n--) {\n\t\t\tpqdownheap(tree, n);\n\t\t}\n\n\t\t// Construct the Huffman tree by repeatedly combining the least two\n\t\t// frequent nodes.\n\t\tdo {\n\t\t\tn = heap[SMALLEST];\n\t\t\theap[SMALLEST] = heap[heap_len--];\n\t\t\tpqdownheap(tree, SMALLEST);\n\n\t\t\tm = heap[SMALLEST]; // m = node of next least frequency\n\n\t\t\t// keep the nodes sorted by frequency\n\t\t\theap[--heap_max] = n;\n\t\t\theap[--heap_max] = m;\n\n\t\t\t// Create a new node father of n and m\n\t\t\ttree[node].fc = tree[n].fc + tree[m].fc;\n\t\t\t//\tdepth[node] = (char)(MAX(depth[n], depth[m]) + 1);\n\t\t\tif (depth[n] > depth[m] + 1) {\n\t\t\t\tdepth[node] = depth[n];\n\t\t\t} else {\n\t\t\t\tdepth[node] = depth[m] + 1;\n\t\t\t}\n\t\t\ttree[n].dl = tree[m].dl = node;\n\n\t\t\t// and insert the new node in the heap\n\t\t\theap[SMALLEST] = node++;\n\t\t\tpqdownheap(tree, SMALLEST);\n\n\t\t} while (heap_len >= 2);\n\n\t\theap[--heap_max] = heap[SMALLEST];\n\n\t\t// At this point, the fields freq and dad are set. We can now\n\t\t// generate the bit lengths.\n\t\tgen_bitlen(desc);\n\n\t\t// The field len is now set, we can generate the bit codes\n\t\tgen_codes(tree, max_code);\n\t}\n\n\t/* ==========================================================================\n\t * Scan a literal or distance tree to determine the frequencies of the codes\n\t * in the bit length tree. Updates opt_len to take into account the repeat\n\t * counts. (The contribution of the bit length codes will be added later\n\t * during the construction of bl_tree.)\n\t *\n\t * @param tree- the tree to be scanned\n\t * @param max_code- and its largest code of non zero frequency\n\t */\n\tfunction scan_tree(tree, max_code) {\n\t\tvar n, // iterates over all tree elements\n\t\t\tprevlen = -1, // last emitted length\n\t\t\tcurlen, // length of current code\n\t\t\tnextlen = tree[0].dl, // length of next code\n\t\t\tcount = 0, // repeat count of the current code\n\t\t\tmax_count = 7, // max repeat count\n\t\t\tmin_count = 4; // min repeat count\n\n\t\tif (nextlen === 0) {\n\t\t\tmax_count = 138;\n\t\t\tmin_count = 3;\n\t\t}\n\t\ttree[max_code + 1].dl = 0xffff; // guard\n\n\t\tfor (n = 0; n <= max_code; n++) {\n\t\t\tcurlen = nextlen;\n\t\t\tnextlen = tree[n + 1].dl;\n\t\t\tif (++count < max_count && curlen === nextlen) {\n\t\t\t\tcontinue;\n\t\t\t} else if (count < min_count) {\n\t\t\t\tbl_tree[curlen].fc += count;\n\t\t\t} else if (curlen !== 0) {\n\t\t\t\tif (curlen !== prevlen) {\n\t\t\t\t\tbl_tree[curlen].fc++;\n\t\t\t\t}\n\t\t\t\tbl_tree[REP_3_6].fc++;\n\t\t\t} else if (count <= 10) {\n\t\t\t\tbl_tree[REPZ_3_10].fc++;\n\t\t\t} else {\n\t\t\t\tbl_tree[REPZ_11_138].fc++;\n\t\t\t}\n\t\t\tcount = 0; prevlen = curlen;\n\t\t\tif (nextlen === 0) {\n\t\t\t\tmax_count = 138;\n\t\t\t\tmin_count = 3;\n\t\t\t} else if (curlen === nextlen) {\n\t\t\t\tmax_count = 6;\n\t\t\t\tmin_count = 3;\n\t\t\t} else {\n\t\t\t\tmax_count = 7;\n\t\t\t\tmin_count = 4;\n\t\t\t}\n\t\t}\n\t}\n\n\t/* ==========================================================================\n\t * Send a literal or distance tree in compressed form, using the codes in\n\t * bl_tree.\n\t *\n\t * @param tree- the tree to be scanned\n\t * @param max_code- and its largest code of non zero frequency\n\t */\n\tfunction send_tree(tree, max_code) {\n\t\tvar n; // iterates over all tree elements\n\t\tvar prevlen = -1; // last emitted length\n\t\tvar curlen; // length of current code\n\t\tvar nextlen = tree[0].dl; // length of next code\n\t\tvar count = 0; // repeat count of the current code\n\t\tvar max_count = 7; // max repeat count\n\t\tvar min_count = 4; // min repeat count\n\n\t\t// tree[max_code+1].dl = -1; */  /* guard already set */\n\t\tif (nextlen === 0) {\n\t\t\tmax_count = 138;\n\t\t\tmin_count = 3;\n\t\t}\n\n\t\tfor (n = 0; n <= max_code; n++) {\n\t\t\tcurlen = nextlen;\n\t\t\tnextlen = tree[n + 1].dl;\n\t\t\tif (++count < max_count && curlen === nextlen) {\n\t\t\t\tcontinue;\n\t\t\t} else if (count < min_count) {\n\t\t\t\tdo {\n\t\t\t\t\tSEND_CODE(curlen, bl_tree);\n\t\t\t\t} while (--count !== 0);\n\t\t\t} else if (curlen !== 0) {\n\t\t\t\tif (curlen !== prevlen) {\n\t\t\t\t\tSEND_CODE(curlen, bl_tree);\n\t\t\t\t\tcount--;\n\t\t\t\t}\n\t\t\t// Assert(count >= 3 && count <= 6, \" 3_6?\");\n\t\t\t\tSEND_CODE(REP_3_6, bl_tree);\n\t\t\t\tsend_bits(count - 3, 2);\n\t\t\t} else if (count <= 10) {\n\t\t\t\tSEND_CODE(REPZ_3_10, bl_tree);\n\t\t\t\tsend_bits(count - 3, 3);\n\t\t\t} else {\n\t\t\t\tSEND_CODE(REPZ_11_138, bl_tree);\n\t\t\t\tsend_bits(count - 11, 7);\n\t\t\t}\n\t\t\tcount = 0;\n\t\t\tprevlen = curlen;\n\t\t\tif (nextlen === 0) {\n\t\t\t\tmax_count = 138;\n\t\t\t\tmin_count = 3;\n\t\t\t} else if (curlen === nextlen) {\n\t\t\t\tmax_count = 6;\n\t\t\t\tmin_count = 3;\n\t\t\t} else {\n\t\t\t\tmax_count = 7;\n\t\t\t\tmin_count = 4;\n\t\t\t}\n\t\t}\n\t}\n\n\t/* ==========================================================================\n\t * Construct the Huffman tree for the bit lengths and return the index in\n\t * bl_order of the last bit length code to send.\n\t */\n\tfunction build_bl_tree() {\n\t\tvar max_blindex; // index of last bit length code of non zero freq\n\n\t\t// Determine the bit length frequencies for literal and distance trees\n\t\tscan_tree(dyn_ltree, l_desc.max_code);\n\t\tscan_tree(dyn_dtree, d_desc.max_code);\n\n\t\t// Build the bit length tree:\n\t\tbuild_tree(bl_desc);\n\t\t// opt_len now includes the length of the tree representations, except\n\t\t// the lengths of the bit lengths codes and the 5+5+4 bits for the counts.\n\n\t\t// Determine the number of bit length codes to send. The pkzip format\n\t\t// requires that at least 4 bit length codes be sent. (appnote.txt says\n\t\t// 3 but the actual value used is 4.)\n\t\tfor (max_blindex = BL_CODES - 1; max_blindex >= 3; max_blindex--) {\n\t\t\tif (bl_tree[bl_order[max_blindex]].dl !== 0) {\n\t\t\t\tbreak;\n\t\t\t}\n\t\t}\n\t\t// Update opt_len to include the bit length tree and counts */\n\t\topt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;\n\t\t// Tracev((stderr, \"\\ndyn trees: dyn %ld, stat %ld\",\n\t\t// encoder->opt_len, encoder->static_len));\n\n\t\treturn max_blindex;\n\t}\n\n\t/* ==========================================================================\n\t * Send the header for a block using dynamic Huffman trees: the counts, the\n\t * lengths of the bit length codes, the literal tree and the distance tree.\n\t * IN assertion: lcodes >= 257, dcodes >= 1, blcodes >= 4.\n\t */\n\tfunction send_all_trees(lcodes, dcodes, blcodes) { // number of codes for each tree\n\t\tvar rank; // index in bl_order\n\n\t\t// Assert (lcodes >= 257 && dcodes >= 1 && blcodes >= 4, \"not enough codes\");\n\t\t// Assert (lcodes <= L_CODES && dcodes <= D_CODES && blcodes <= BL_CODES, \"too many codes\");\n\t\t// Tracev((stderr, \"\\nbl counts: \"));\n\t\tsend_bits(lcodes - 257, 5); // not +255 as stated in appnote.txt\n\t\tsend_bits(dcodes - 1,   5);\n\t\tsend_bits(blcodes - 4,  4); // not -3 as stated in appnote.txt\n\t\tfor (rank = 0; rank < blcodes; rank++) {\n\t\t\t// Tracev((stderr, \"\\nbl code %2d \", bl_order[rank]));\n\t\t\tsend_bits(bl_tree[bl_order[rank]].dl, 3);\n\t\t}\n\n\t\t// send the literal tree\n\t\tsend_tree(dyn_ltree, lcodes - 1);\n\n\t\t// send the distance tree\n\t\tsend_tree(dyn_dtree, dcodes - 1);\n\t}\n\n\t/* ==========================================================================\n\t * Determine the best encoding for the current block: dynamic trees, static\n\t * trees or store, and output the encoded block to the zip file.\n\t */\n\tfunction flush_block(eof) { // true if this is the last block for a file\n\t\tvar opt_lenb, static_lenb, // opt_len and static_len in bytes\n\t\t\tmax_blindex, // index of last bit length code of non zero freq\n\t\t\tstored_len, // length of input block\n\t\t\ti;\n\n\t\tstored_len = strstart - block_start;\n\t\tflag_buf[last_flags] = flags; // Save the flags for the last 8 items\n\n\t\t// Construct the literal and distance trees\n\t\tbuild_tree(l_desc);\n\t\t// Tracev((stderr, \"\\nlit data: dyn %ld, stat %ld\",\n\t\t// encoder->opt_len, encoder->static_len));\n\n\t\tbuild_tree(d_desc);\n\t\t// Tracev((stderr, \"\\ndist data: dyn %ld, stat %ld\",\n\t\t// encoder->opt_len, encoder->static_len));\n\t\t// At this point, opt_len and static_len are the total bit lengths of\n\t\t// the compressed block data, excluding the tree representations.\n\n\t\t// Build the bit length tree for the above two trees, and get the index\n\t\t// in bl_order of the last bit length code to send.\n\t\tmax_blindex = build_bl_tree();\n\n\t // Determine the best encoding. Compute first the block length in bytes\n\t\topt_lenb = (opt_len + 3 + 7) >> 3;\n\t\tstatic_lenb = (static_len + 3 + 7) >> 3;\n\n\t//  Trace((stderr, \"\\nopt %lu(%lu) stat %lu(%lu) stored %lu lit %u dist %u \", opt_lenb, encoder->opt_len, static_lenb, encoder->static_len, stored_len, encoder->last_lit, encoder->last_dist));\n\n\t\tif (static_lenb <= opt_lenb) {\n\t\t\topt_lenb = static_lenb;\n\t\t}\n\t\tif (stored_len + 4 <= opt_lenb && block_start >= 0) { // 4: two words for the lengths\n\t\t\t// The test buf !== NULL is only necessary if LIT_BUFSIZE > WSIZE.\n\t\t\t// Otherwise we can't have processed more than WSIZE input bytes since\n\t\t\t// the last block flush, because compression would have been\n\t\t\t// successful. If LIT_BUFSIZE <= WSIZE, it is never too late to\n\t\t\t// transform a block into a stored block.\n\t\t\tsend_bits((STORED_BLOCK << 1) + eof, 3);  /* send block type */\n\t\t\tbi_windup();         /* align on byte boundary */\n\t\t\tput_short(stored_len);\n\t\t\tput_short(~stored_len);\n\n\t\t\t// copy block\n\t\t\t/*\n\t\t\t\tp = &window[block_start];\n\t\t\t\tfor (i = 0; i < stored_len; i++) {\n\t\t\t\t\tput_byte(p[i]);\n\t\t\t\t}\n\t\t\t*/\n\t\t\tfor (i = 0; i < stored_len; i++) {\n\t\t\t\tput_byte(window[block_start + i]);\n\t\t\t}\n\t\t} else if (static_lenb === opt_lenb) {\n\t\t\tsend_bits((STATIC_TREES << 1) + eof, 3);\n\t\t\tcompress_block(static_ltree, static_dtree);\n\t\t} else {\n\t\t\tsend_bits((DYN_TREES << 1) + eof, 3);\n\t\t\tsend_all_trees(l_desc.max_code + 1, d_desc.max_code + 1, max_blindex + 1);\n\t\t\tcompress_block(dyn_ltree, dyn_dtree);\n\t\t}\n\n\t\tinit_block();\n\n\t\tif (eof !== 0) {\n\t\t\tbi_windup();\n\t\t}\n\t}\n\n\t/* ==========================================================================\n\t * Save the match info and tally the frequency counts. Return true if\n\t * the current block must be flushed.\n\t *\n\t * @param dist- distance of matched string\n\t * @param lc- (match length - MIN_MATCH) or unmatched char (if dist === 0)\n\t */\n\tfunction ct_tally(dist, lc) {\n\t\tl_buf[last_lit++] = lc;\n\t\tif (dist === 0) {\n\t\t\t// lc is the unmatched char\n\t\t\tdyn_ltree[lc].fc++;\n\t\t} else {\n\t\t\t// Here, lc is the match length - MIN_MATCH\n\t\t\tdist--; // dist = match distance - 1\n\t\t\t// Assert((ush)dist < (ush)MAX_DIST && (ush)lc <= (ush)(MAX_MATCH-MIN_MATCH) && (ush)D_CODE(dist) < (ush)D_CODES,  \"ct_tally: bad match\");\n\n\t\t\tdyn_ltree[length_code[lc] + LITERALS + 1].fc++;\n\t\t\tdyn_dtree[D_CODE(dist)].fc++;\n\n\t\t\td_buf[last_dist++] = dist;\n\t\t\tflags |= flag_bit;\n\t\t}\n\t\tflag_bit <<= 1;\n\n\t\t// Output the flags if they fill a byte\n\t\tif ((last_lit & 7) === 0) {\n\t\t\tflag_buf[last_flags++] = flags;\n\t\t\tflags = 0;\n\t\t\tflag_bit = 1;\n\t\t}\n\t\t// Try to guess if it is profitable to stop the current block here\n\t\tif (compr_level > 2 && (last_lit & 0xfff) === 0) {\n\t\t\t// Compute an upper bound for the compressed length\n\t\t\tvar out_length = last_lit * 8;\n\t\t\tvar in_length = strstart - block_start;\n\t\t\tvar dcode;\n\n\t\t\tfor (dcode = 0; dcode < D_CODES; dcode++) {\n\t\t\t\tout_length += dyn_dtree[dcode].fc * (5 + extra_dbits[dcode]);\n\t\t\t}\n\t\t\tout_length >>= 3;\n\t\t\t// Trace((stderr,\"\\nlast_lit %u, last_dist %u, in %ld, out ~%ld(%ld%%) \", encoder->last_lit, encoder->last_dist, in_length, out_length, 100L - out_length*100L/in_length));\n\t\t\tif (last_dist < parseInt(last_lit / 2, 10) && out_length < parseInt(in_length / 2, 10)) {\n\t\t\t\treturn true;\n\t\t\t}\n\t\t}\n\t\treturn (last_lit === LIT_BUFSIZE - 1 || last_dist === DIST_BUFSIZE);\n\t\t// We avoid equality with LIT_BUFSIZE because of wraparound at 64K\n\t\t// on 16 bit machines and because stored blocks are restricted to\n\t\t// 64K-1 bytes.\n\t}\n\n\t  /* ==========================================================================\n\t   * Send the block data compressed using the given Huffman trees\n\t   *\n\t   * @param ltree- literal tree\n\t   * @param dtree- distance tree\n\t   */\n\tfunction compress_block(ltree, dtree) {\n\t\tvar dist; // distance of matched string\n\t\tvar lc; // match length or unmatched char (if dist === 0)\n\t\tvar lx = 0; // running index in l_buf\n\t\tvar dx = 0; // running index in d_buf\n\t\tvar fx = 0; // running index in flag_buf\n\t\tvar flag = 0; // current flags\n\t\tvar code; // the code to send\n\t\tvar extra; // number of extra bits to send\n\n\t\tif (last_lit !== 0) {\n\t\t\tdo {\n\t\t\t\tif ((lx & 7) === 0) {\n\t\t\t\t\tflag = flag_buf[fx++];\n\t\t\t\t}\n\t\t\t\tlc = l_buf[lx++] & 0xff;\n\t\t\t\tif ((flag & 1) === 0) {\n\t\t\t\t\tSEND_CODE(lc, ltree); /* send a literal byte */\n\t\t\t\t\t//\tTracecv(isgraph(lc), (stderr,\" '%c' \", lc));\n\t\t\t\t} else {\n\t\t\t\t\t// Here, lc is the match length - MIN_MATCH\n\t\t\t\t\tcode = length_code[lc];\n\t\t\t\t\tSEND_CODE(code + LITERALS + 1, ltree); // send the length code\n\t\t\t\t\textra = extra_lbits[code];\n\t\t\t\t\tif (extra !== 0) {\n\t\t\t\t\t\tlc -= base_length[code];\n\t\t\t\t\t\tsend_bits(lc, extra); // send the extra length bits\n\t\t\t\t\t}\n\t\t\t\t\tdist = d_buf[dx++];\n\t\t\t\t\t// Here, dist is the match distance - 1\n\t\t\t\t\tcode = D_CODE(dist);\n\t\t\t\t\t//\tAssert (code < D_CODES, \"bad d_code\");\n\n\t\t\t\t\tSEND_CODE(code, dtree); // send the distance code\n\t\t\t\t\textra = extra_dbits[code];\n\t\t\t\t\tif (extra !== 0) {\n\t\t\t\t\t\tdist -= base_dist[code];\n\t\t\t\t\t\tsend_bits(dist, extra); // send the extra distance bits\n\t\t\t\t\t}\n\t\t\t\t} // literal or match pair ?\n\t\t\t\tflag >>= 1;\n\t\t\t} while (lx < last_lit);\n\t\t}\n\n\t\tSEND_CODE(END_BLOCK, ltree);\n\t}\n\n\t/* ==========================================================================\n\t * Send a value on a given number of bits.\n\t * IN assertion: length <= 16 and value fits in length bits.\n\t *\n\t * @param value- value to send\n\t * @param length- number of bits\n\t */\n\tvar Buf_size = 16; // bit size of bi_buf\n\tfunction send_bits(value, length) {\n\t\t// If not enough room in bi_buf, use (valid) bits from bi_buf and\n\t\t// (16 - bi_valid) bits from value, leaving (width - (16-bi_valid))\n\t\t// unused bits in value.\n\t\tif (bi_valid > Buf_size - length) {\n\t\t\tbi_buf |= (value << bi_valid);\n\t\t\tput_short(bi_buf);\n\t\t\tbi_buf = (value >> (Buf_size - bi_valid));\n\t\t\tbi_valid += length - Buf_size;\n\t\t} else {\n\t\t\tbi_buf |= value << bi_valid;\n\t\t\tbi_valid += length;\n\t\t}\n\t}\n\n\t/* ==========================================================================\n\t * Reverse the first len bits of a code, using straightforward code (a faster\n\t * method would use a table)\n\t * IN assertion: 1 <= len <= 15\n\t *\n\t * @param code- the value to invert\n\t * @param len- its bit length\n\t */\n\tfunction bi_reverse(code, len) {\n\t\tvar res = 0;\n\t\tdo {\n\t\t\tres |= code & 1;\n\t\t\tcode >>= 1;\n\t\t\tres <<= 1;\n\t\t} while (--len > 0);\n\t\treturn res >> 1;\n\t}\n\n\t/* ==========================================================================\n\t * Write out any remaining bits in an incomplete byte.\n\t */\n\tfunction bi_windup() {\n\t\tif (bi_valid > 8) {\n\t\t\tput_short(bi_buf);\n\t\t} else if (bi_valid > 0) {\n\t\t\tput_byte(bi_buf);\n\t\t}\n\t\tbi_buf = 0;\n\t\tbi_valid = 0;\n\t}\n\n\tfunction qoutbuf() {\n\t\tvar q, i;\n\t\tif (outcnt !== 0) {\n\t\t\tq = new_queue();\n\t\t\tif (qhead === null) {\n\t\t\t\tqhead = qtail = q;\n\t\t\t} else {\n\t\t\t\tqtail = qtail.next = q;\n\t\t\t}\n\t\t\tq.len = outcnt - outoff;\n\t\t\t// System.arraycopy(outbuf, outoff, q.ptr, 0, q.len);\n\t\t\tfor (i = 0; i < q.len; i++) {\n\t\t\t\tq.ptr[i] = outbuf[outoff + i];\n\t\t\t}\n\t\t\toutcnt = outoff = 0;\n\t\t}\n\t}\n\n\tfunction deflate(arr, level) {\n\t\tvar i, j, buff;\n\n\t\tdeflate_data = arr;\n\t\tdeflate_pos = 0;\n\t\tif (typeof level === \"undefined\") {\n\t\t\tlevel = DEFAULT_LEVEL;\n\t\t}\n\t\tdeflate_start(level);\n\n\t\tbuff = [];\n\n\t\tdo {\n\t\t\ti = deflate_internal(buff, buff.length, 1024);\n\t\t} while (i > 0);\n\n\t\tdeflate_data = null; // G.C.\n\t\treturn buff;\n\t}\n\n\tmodule.exports = deflate;\n\tmodule.exports.DEFAULT_LEVEL = DEFAULT_LEVEL;\n}());\n\n\n/***/ }),\n\n/***/ 689:\n/***/ ((module) => {\n\n/*\n * $Id: rawinflate.js,v 0.2 2009/03/01 18:32:24 dankogai Exp $\n *\n * original:\n * http://www.onicos.com/staff/iz/amuse/javascript/expert/inflate.txt\n */\n\n/* Copyright (C) 1999 Masanao Izumo <iz@onicos.co.jp>\n * Version: 1.0.0.1\n * LastModified: Dec 25 1999\n */\n\n/* Interface:\n * data = inflate(src);\n */\n\n(function () {\n\t/* constant parameters */\n\tvar WSIZE = 32768, // Sliding Window size\n\t\tSTORED_BLOCK = 0,\n\t\tSTATIC_TREES = 1,\n\t\tDYN_TREES = 2,\n\n\t/* for inflate */\n\t\tlbits = 9, // bits in base literal/length lookup table\n\t\tdbits = 6, // bits in base distance lookup table\n\n\t/* variables (inflate) */\n\t\tslide,\n\t\twp, // current position in slide\n\t\tfixed_tl = null, // inflate static\n\t\tfixed_td, // inflate static\n\t\tfixed_bl, // inflate static\n\t\tfixed_bd, // inflate static\n\t\tbit_buf, // bit buffer\n\t\tbit_len, // bits in bit buffer\n\t\tmethod,\n\t\teof,\n\t\tcopy_leng,\n\t\tcopy_dist,\n\t\ttl, // literal length decoder table\n\t\ttd, // literal distance decoder table\n\t\tbl, // number of bits decoded by tl\n\t\tbd, // number of bits decoded by td\n\n\t\tinflate_data,\n\t\tinflate_pos,\n\n\n/* constant tables (inflate) */\n\t\tMASK_BITS = [\n\t\t\t0x0000,\n\t\t\t0x0001, 0x0003, 0x0007, 0x000f, 0x001f, 0x003f, 0x007f, 0x00ff,\n\t\t\t0x01ff, 0x03ff, 0x07ff, 0x0fff, 0x1fff, 0x3fff, 0x7fff, 0xffff\n\t\t],\n\t\t// Tables for deflate from PKZIP's appnote.txt.\n\t\t// Copy lengths for literal codes 257..285\n\t\tcplens = [\n\t\t\t3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31,\n\t\t\t35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0\n\t\t],\n/* note: see note #13 above about the 258 in this list. */\n\t\t// Extra bits for literal codes 257..285\n\t\tcplext = [\n\t\t\t0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2,\n\t\t\t3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 99, 99 // 99==invalid\n\t\t],\n\t\t// Copy offsets for distance codes 0..29\n\t\tcpdist = [\n\t\t\t1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193,\n\t\t\t257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145,\n\t\t\t8193, 12289, 16385, 24577\n\t\t],\n\t\t// Extra bits for distance codes\n\t\tcpdext = [\n\t\t\t0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6,\n\t\t\t7, 7, 8, 8, 9, 9, 10, 10, 11, 11,\n\t\t\t12, 12, 13, 13\n\t\t],\n\t\t// Order of the bit length code lengths\n\t\tborder = [\n\t\t\t16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15\n\t\t];\n\t/* objects (inflate) */\n\n\tfunction HuftList() {\n\t\tthis.next = null;\n\t\tthis.list = null;\n\t}\n\n\tfunction HuftNode() {\n\t\tthis.e = 0; // number of extra bits or operation\n\t\tthis.b = 0; // number of bits in this code or subcode\n\n\t\t// union\n\t\tthis.n = 0; // literal, length base, or distance base\n\t\tthis.t = null; // (HuftNode) pointer to next level of table\n\t}\n\n\t/*\n\t * @param b-  code lengths in bits (all assumed <= BMAX)\n\t * @param n- number of codes (assumed <= N_MAX)\n\t * @param s- number of simple-valued codes (0..s-1)\n\t * @param d- list of base values for non-simple codes\n\t * @param e- list of extra bits for non-simple codes\n\t * @param mm- maximum lookup bits\n\t */\n\tfunction HuftBuild(b, n, s, d, e, mm) {\n\t\tthis.BMAX = 16; // maximum bit length of any code\n\t\tthis.N_MAX = 288; // maximum number of codes in any set\n\t\tthis.status = 0; // 0: success, 1: incomplete table, 2: bad input\n\t\tthis.root = null; // (HuftList) starting table\n\t\tthis.m = 0; // maximum lookup bits, returns actual\n\n\t/* Given a list of code lengths and a maximum table size, make a set of\n\t   tables to decode that set of codes. Return zero on success, one if\n\t   the given code set is incomplete (the tables are still built in this\n\t   case), two if the input is invalid (all zero length codes or an\n\t   oversubscribed set of lengths), and three if not enough memory.\n\t   The code with value 256 is special, and the tables are constructed\n\t   so that no bits beyond that code are fetched when that code is\n\t   decoded. */\n\t\tvar a; // counter for codes of length k\n\t\tvar c = [];\n\t\tvar el; // length of EOB code (value 256)\n\t\tvar f; // i repeats in table every f entries\n\t\tvar g; // maximum code length\n\t\tvar h; // table level\n\t\tvar i; // counter, current code\n\t\tvar j; // counter\n\t\tvar k; // number of bits in current code\n\t\tvar lx = [];\n\t\tvar p; // pointer into c[], b[], or v[]\n\t\tvar pidx; // index of p\n\t\tvar q; // (HuftNode) points to current table\n\t\tvar r = new HuftNode(); // table entry for structure assignment\n\t\tvar u = [];\n\t\tvar v = [];\n\t\tvar w;\n\t\tvar x = [];\n\t\tvar xp; // pointer into x or c\n\t\tvar y; // number of dummy codes added\n\t\tvar z; // number of entries in current table\n\t\tvar o;\n\t\tvar tail; // (HuftList)\n\n\t\ttail = this.root = null;\n\n\t\t// bit length count table\n\t\tfor (i = 0; i < this.BMAX + 1; i++) {\n\t\t\tc[i] = 0;\n\t\t}\n\t\t// stack of bits per table\n\t\tfor (i = 0; i < this.BMAX + 1; i++) {\n\t\t\tlx[i] = 0;\n\t\t}\n\t\t// HuftNode[BMAX][]  table stack\n\t\tfor (i = 0; i < this.BMAX; i++) {\n\t\t\tu[i] = null;\n\t\t}\n\t\t// values in order of bit length\n\t\tfor (i = 0; i < this.N_MAX; i++) {\n\t\t\tv[i] = 0;\n\t\t}\n\t\t// bit offsets, then code stack\n\t\tfor (i = 0; i < this.BMAX + 1; i++) {\n\t\t\tx[i] = 0;\n\t\t}\n\n\t\t// Generate counts for each bit length\n\t\tel = n > 256 ? b[256] : this.BMAX; // set length of EOB code, if any\n\t\tp = b; pidx = 0;\n\t\ti = n;\n\t\tdo {\n\t\t\tc[p[pidx]]++; // assume all entries <= BMAX\n\t\t\tpidx++;\n\t\t} while (--i > 0);\n\t\tif (c[0] === n) { // null input--all zero length codes\n\t\t\tthis.root = null;\n\t\t\tthis.m = 0;\n\t\t\tthis.status = 0;\n\t\t\treturn;\n\t\t}\n\n\t\t// Find minimum and maximum length, bound *m by those\n\t\tfor (j = 1; j <= this.BMAX; j++) {\n\t\t\tif (c[j] !== 0) {\n\t\t\t\tbreak;\n\t\t\t}\n\t\t}\n\t\tk = j; // minimum code length\n\t\tif (mm < j) {\n\t\t\tmm = j;\n\t\t}\n\t\tfor (i = this.BMAX; i !== 0; i--) {\n\t\t\tif (c[i] !== 0) {\n\t\t\t\tbreak;\n\t\t\t}\n\t\t}\n\t\tg = i; // maximum code length\n\t\tif (mm > i) {\n\t\t\tmm = i;\n\t\t}\n\n\t\t// Adjust last length count to fill out codes, if needed\n\t\tfor (y = 1 << j; j < i; j++, y <<= 1) {\n\t\t\tif ((y -= c[j]) < 0) {\n\t\t\t\tthis.status = 2; // bad input: more codes than bits\n\t\t\t\tthis.m = mm;\n\t\t\t\treturn;\n\t\t\t}\n\t\t}\n\t\tif ((y -= c[i]) < 0) {\n\t\t\tthis.status = 2;\n\t\t\tthis.m = mm;\n\t\t\treturn;\n\t\t}\n\t\tc[i] += y;\n\n\t\t// Generate starting offsets into the value table for each length\n\t\tx[1] = j = 0;\n\t\tp = c;\n\t\tpidx = 1;\n\t\txp = 2;\n\t\twhile (--i > 0) { // note that i == g from above\n\t\t\tx[xp++] = (j += p[pidx++]);\n\t\t}\n\n\t\t// Make a table of values in order of bit lengths\n\t\tp = b; pidx = 0;\n\t\ti = 0;\n\t\tdo {\n\t\t\tif ((j = p[pidx++]) !== 0) {\n\t\t\t\tv[x[j]++] = i;\n\t\t\t}\n\t\t} while (++i < n);\n\t\tn = x[g]; // set n to length of v\n\n\t\t// Generate the Huffman codes and for each, make the table entries\n\t\tx[0] = i = 0; // first Huffman code is zero\n\t\tp = v; pidx = 0; // grab values in bit order\n\t\th = -1; // no tables yet--level -1\n\t\tw = lx[0] = 0; // no bits decoded yet\n\t\tq = null; // ditto\n\t\tz = 0; // ditto\n\n\t\t// go through the bit lengths (k already is bits in shortest code)\n\t\tfor (null; k <= g; k++) {\n\t\t\ta = c[k];\n\t\t\twhile (a-- > 0) {\n\t\t\t\t// here i is the Huffman code of length k bits for value p[pidx]\n\t\t\t\t// make tables up to required level\n\t\t\t\twhile (k > w + lx[1 + h]) {\n\t\t\t\t\tw += lx[1 + h]; // add bits already decoded\n\t\t\t\t\th++;\n\n\t\t\t\t\t// compute minimum size table less than or equal to *m bits\n\t\t\t\t\tz = (z = g - w) > mm ? mm : z; // upper limit\n\t\t\t\t\tif ((f = 1 << (j = k - w)) > a + 1) { // try a k-w bit table\n\t\t\t\t\t\t// too few codes for k-w bit table\n\t\t\t\t\t\tf -= a + 1; // deduct codes from patterns left\n\t\t\t\t\t\txp = k;\n\t\t\t\t\t\twhile (++j < z) { // try smaller tables up to z bits\n\t\t\t\t\t\t\tif ((f <<= 1) <= c[++xp]) {\n\t\t\t\t\t\t\t\tbreak; // enough codes to use up j bits\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tf -= c[xp]; // else deduct codes from patterns\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tif (w + j > el && w < el) {\n\t\t\t\t\t\tj = el - w; // make EOB code end at table\n\t\t\t\t\t}\n\t\t\t\t\tz = 1 << j; // table entries for j-bit table\n\t\t\t\t\tlx[1 + h] = j; // set table size in stack\n\n\t\t\t\t\t// allocate and link in new table\n\t\t\t\t\tq = [];\n\t\t\t\t\tfor (o = 0; o < z; o++) {\n\t\t\t\t\t\tq[o] = new HuftNode();\n\t\t\t\t\t}\n\n\t\t\t\t\tif (!tail) {\n\t\t\t\t\t\ttail = this.root = new HuftList();\n\t\t\t\t\t} else {\n\t\t\t\t\t\ttail = tail.next = new HuftList();\n\t\t\t\t\t}\n\t\t\t\t\ttail.next = null;\n\t\t\t\t\ttail.list = q;\n\t\t\t\t\tu[h] = q; // table starts after link\n\n\t\t\t\t\t/* connect to last table, if there is one */\n\t\t\t\t\tif (h > 0) {\n\t\t\t\t\t\tx[h] = i; // save pattern for backing up\n\t\t\t\t\t\tr.b = lx[h]; // bits to dump before this table\n\t\t\t\t\t\tr.e = 16 + j; // bits in this table\n\t\t\t\t\t\tr.t = q; // pointer to this table\n\t\t\t\t\t\tj = (i & ((1 << w) - 1)) >> (w - lx[h]);\n\t\t\t\t\t\tu[h - 1][j].e = r.e;\n\t\t\t\t\t\tu[h - 1][j].b = r.b;\n\t\t\t\t\t\tu[h - 1][j].n = r.n;\n\t\t\t\t\t\tu[h - 1][j].t = r.t;\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\t// set up table entry in r\n\t\t\t\tr.b = k - w;\n\t\t\t\tif (pidx >= n) {\n\t\t\t\t\tr.e = 99; // out of values--invalid code\n\t\t\t\t} else if (p[pidx] < s) {\n\t\t\t\t\tr.e = (p[pidx] < 256 ? 16 : 15); // 256 is end-of-block code\n\t\t\t\t\tr.n = p[pidx++]; // simple code is just the value\n\t\t\t\t} else {\n\t\t\t\t\tr.e = e[p[pidx] - s]; // non-simple--look up in lists\n\t\t\t\t\tr.n = d[p[pidx++] - s];\n\t\t\t\t}\n\n\t\t\t\t// fill code-like entries with r //\n\t\t\t\tf = 1 << (k - w);\n\t\t\t\tfor (j = i >> w; j < z; j += f) {\n\t\t\t\t\tq[j].e = r.e;\n\t\t\t\t\tq[j].b = r.b;\n\t\t\t\t\tq[j].n = r.n;\n\t\t\t\t\tq[j].t = r.t;\n\t\t\t\t}\n\n\t\t\t\t// backwards increment the k-bit code i\n\t\t\t\tfor (j = 1 << (k - 1); (i & j) !== 0; j >>= 1) {\n\t\t\t\t\ti ^= j;\n\t\t\t\t}\n\t\t\t\ti ^= j;\n\n\t\t\t\t// backup over finished tables\n\t\t\t\twhile ((i & ((1 << w) - 1)) !== x[h]) {\n\t\t\t\t\tw -= lx[h]; // don't need to update q\n\t\t\t\t\th--;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\t/* return actual size of base table */\n\t\tthis.m = lx[1];\n\n\t\t/* Return true (1) if we were given an incomplete table */\n\t\tthis.status = ((y !== 0 && g !== 1) ? 1 : 0);\n\t}\n\n\n\t/* routines (inflate) */\n\n\tfunction GET_BYTE() {\n\t\tif (inflate_data.length === inflate_pos) {\n\t\t\treturn -1;\n\t\t}\n\t\treturn inflate_data[inflate_pos++] & 0xff;\n\t}\n\n\tfunction NEEDBITS(n) {\n\t\twhile (bit_len < n) {\n\t\t\tbit_buf |= GET_BYTE() << bit_len;\n\t\t\tbit_len += 8;\n\t\t}\n\t}\n\n\tfunction GETBITS(n) {\n\t\treturn bit_buf & MASK_BITS[n];\n\t}\n\n\tfunction DUMPBITS(n) {\n\t\tbit_buf >>= n;\n\t\tbit_len -= n;\n\t}\n\n\tfunction inflate_codes(buff, off, size) {\n\t\t// inflate (decompress) the codes in a deflated (compressed) block.\n\t\t// Return an error code or zero if it all goes ok.\n\t\tvar e; // table entry flag/number of extra bits\n\t\tvar t; // (HuftNode) pointer to table entry\n\t\tvar n;\n\n\t\tif (size === 0) {\n\t\t\treturn 0;\n\t\t}\n\n\t\t// inflate the coded data\n\t\tn = 0;\n\t\tfor (;;) { // do until end of block\n\t\t\tNEEDBITS(bl);\n\t\t\tt = tl.list[GETBITS(bl)];\n\t\t\te = t.e;\n\t\t\twhile (e > 16) {\n\t\t\t\tif (e === 99) {\n\t\t\t\t\treturn -1;\n\t\t\t\t}\n\t\t\t\tDUMPBITS(t.b);\n\t\t\t\te -= 16;\n\t\t\t\tNEEDBITS(e);\n\t\t\t\tt = t.t[GETBITS(e)];\n\t\t\t\te = t.e;\n\t\t\t}\n\t\t\tDUMPBITS(t.b);\n\n\t\t\tif (e === 16) { // then it's a literal\n\t\t\t\twp &= WSIZE - 1;\n\t\t\t\tbuff[off + n++] = slide[wp++] = t.n;\n\t\t\t\tif (n === size) {\n\t\t\t\t\treturn size;\n\t\t\t\t}\n\t\t\t\tcontinue;\n\t\t\t}\n\n\t\t\t// exit if end of block\n\t\t\tif (e === 15) {\n\t\t\t\tbreak;\n\t\t\t}\n\n\t\t\t// it's an EOB or a length\n\n\t\t\t// get length of block to copy\n\t\t\tNEEDBITS(e);\n\t\t\tcopy_leng = t.n + GETBITS(e);\n\t\t\tDUMPBITS(e);\n\n\t\t\t// decode distance of block to copy\n\t\t\tNEEDBITS(bd);\n\t\t\tt = td.list[GETBITS(bd)];\n\t\t\te = t.e;\n\n\t\t\twhile (e > 16) {\n\t\t\t\tif (e === 99) {\n\t\t\t\t\treturn -1;\n\t\t\t\t}\n\t\t\t\tDUMPBITS(t.b);\n\t\t\t\te -= 16;\n\t\t\t\tNEEDBITS(e);\n\t\t\t\tt = t.t[GETBITS(e)];\n\t\t\t\te = t.e;\n\t\t\t}\n\t\t\tDUMPBITS(t.b);\n\t\t\tNEEDBITS(e);\n\t\t\tcopy_dist = wp - t.n - GETBITS(e);\n\t\t\tDUMPBITS(e);\n\n\t\t\t// do the copy\n\t\t\twhile (copy_leng > 0 && n < size) {\n\t\t\t\tcopy_leng--;\n\t\t\t\tcopy_dist &= WSIZE - 1;\n\t\t\t\twp &= WSIZE - 1;\n\t\t\t\tbuff[off + n++] = slide[wp++] = slide[copy_dist++];\n\t\t\t}\n\n\t\t\tif (n === size) {\n\t\t\t\treturn size;\n\t\t\t}\n\t\t}\n\n\t\tmethod = -1; // done\n\t\treturn n;\n\t}\n\n\tfunction inflate_stored(buff, off, size) {\n\t\t/* \"decompress\" an inflated type 0 (stored) block. */\n\t\tvar n;\n\n\t\t// go to byte boundary\n\t\tn = bit_len & 7;\n\t\tDUMPBITS(n);\n\n\t\t// get the length and its complement\n\t\tNEEDBITS(16);\n\t\tn = GETBITS(16);\n\t\tDUMPBITS(16);\n\t\tNEEDBITS(16);\n\t\tif (n !== ((~bit_buf) & 0xffff)) {\n\t\t\treturn -1; // error in compressed data\n\t\t}\n\t\tDUMPBITS(16);\n\n\t\t// read and output the compressed data\n\t\tcopy_leng = n;\n\n\t\tn = 0;\n\t\twhile (copy_leng > 0 && n < size) {\n\t\t\tcopy_leng--;\n\t\t\twp &= WSIZE - 1;\n\t\t\tNEEDBITS(8);\n\t\t\tbuff[off + n++] = slide[wp++] = GETBITS(8);\n\t\t\tDUMPBITS(8);\n\t\t}\n\n\t\tif (copy_leng === 0) {\n\t\t\tmethod = -1; // done\n\t\t}\n\t\treturn n;\n\t}\n\n\tfunction inflate_fixed(buff, off, size) {\n\t\t// decompress an inflated type 1 (fixed Huffman codes) block.  We should\n\t\t// either replace this with a custom decoder, or at least precompute the\n\t\t// Huffman tables.\n\n\t\t// if first time, set up tables for fixed blocks\n\t\tif (!fixed_tl) {\n\t\t\tvar i; // temporary variable\n\t\t\tvar l = []; // 288 length list for huft_build (initialized below)\n\t\t\tvar h; // HuftBuild\n\n\t\t\t// literal table\n\t\t\tfor (i = 0; i < 144; i++) {\n\t\t\t\tl[i] = 8;\n\t\t\t}\n\t\t\tfor (null; i < 256; i++) {\n\t\t\t\tl[i] = 9;\n\t\t\t}\n\t\t\tfor (null; i < 280; i++) {\n\t\t\t\tl[i] = 7;\n\t\t\t}\n\t\t\tfor (null; i < 288; i++) { // make a complete, but wrong code set\n\t\t\t\tl[i] = 8;\n\t\t\t}\n\t\t\tfixed_bl = 7;\n\n\t\t\th = new HuftBuild(l, 288, 257, cplens, cplext, fixed_bl);\n\t\t\tif (h.status !== 0) {\n\t\t\t\tconsole.error(\"HufBuild error: \" + h.status);\n\t\t\t\treturn -1;\n\t\t\t}\n\t\t\tfixed_tl = h.root;\n\t\t\tfixed_bl = h.m;\n\n\t\t\t// distance table\n\t\t\tfor (i = 0; i < 30; i++) { // make an incomplete code set\n\t\t\t\tl[i] = 5;\n\t\t\t}\n\t\t\tfixed_bd = 5;\n\n\t\t\th = new HuftBuild(l, 30, 0, cpdist, cpdext, fixed_bd);\n\t\t\tif (h.status > 1) {\n\t\t\t\tfixed_tl = null;\n\t\t\t\tconsole.error(\"HufBuild error: \" + h.status);\n\t\t\t\treturn -1;\n\t\t\t}\n\t\t\tfixed_td = h.root;\n\t\t\tfixed_bd = h.m;\n\t\t}\n\n\t\ttl = fixed_tl;\n\t\ttd = fixed_td;\n\t\tbl = fixed_bl;\n\t\tbd = fixed_bd;\n\t\treturn inflate_codes(buff, off, size);\n\t}\n\n\tfunction inflate_dynamic(buff, off, size) {\n\t\t// decompress an inflated type 2 (dynamic Huffman codes) block.\n\t\tvar i; // temporary variables\n\t\tvar j;\n\t\tvar l; // last length\n\t\tvar n; // number of lengths to get\n\t\tvar t; // (HuftNode) literal/length code table\n\t\tvar nb; // number of bit length codes\n\t\tvar nl; // number of literal/length codes\n\t\tvar nd; // number of distance codes\n\t\tvar ll = [];\n\t\tvar h; // (HuftBuild)\n\n\t\t// literal/length and distance code lengths\n\t\tfor (i = 0; i < 286 + 30; i++) {\n\t\t\tll[i] = 0;\n\t\t}\n\n\t\t// read in table lengths\n\t\tNEEDBITS(5);\n\t\tnl = 257 + GETBITS(5); // number of literal/length codes\n\t\tDUMPBITS(5);\n\t\tNEEDBITS(5);\n\t\tnd = 1 + GETBITS(5); // number of distance codes\n\t\tDUMPBITS(5);\n\t\tNEEDBITS(4);\n\t\tnb = 4 + GETBITS(4); // number of bit length codes\n\t\tDUMPBITS(4);\n\t\tif (nl > 286 || nd > 30) {\n\t\t\treturn -1; // bad lengths\n\t\t}\n\n\t\t// read in bit-length-code lengths\n\t\tfor (j = 0; j < nb; j++) {\n\t\t\tNEEDBITS(3);\n\t\t\tll[border[j]] = GETBITS(3);\n\t\t\tDUMPBITS(3);\n\t\t}\n\t\tfor (null; j < 19; j++) {\n\t\t\tll[border[j]] = 0;\n\t\t}\n\n\t\t// build decoding table for trees--single level, 7 bit lookup\n\t\tbl = 7;\n\t\th = new HuftBuild(ll, 19, 19, null, null, bl);\n\t\tif (h.status !== 0) {\n\t\t\treturn -1; // incomplete code set\n\t\t}\n\n\t\ttl = h.root;\n\t\tbl = h.m;\n\n\t\t// read in literal and distance code lengths\n\t\tn = nl + nd;\n\t\ti = l = 0;\n\t\twhile (i < n) {\n\t\t\tNEEDBITS(bl);\n\t\t\tt = tl.list[GETBITS(bl)];\n\t\t\tj = t.b;\n\t\t\tDUMPBITS(j);\n\t\t\tj = t.n;\n\t\t\tif (j < 16) { // length of code in bits (0..15)\n\t\t\t\tll[i++] = l = j; // save last length in l\n\t\t\t} else if (j === 16) { // repeat last length 3 to 6 times\n\t\t\t\tNEEDBITS(2);\n\t\t\t\tj = 3 + GETBITS(2);\n\t\t\t\tDUMPBITS(2);\n\t\t\t\tif (i + j > n) {\n\t\t\t\t\treturn -1;\n\t\t\t\t}\n\t\t\t\twhile (j-- > 0) {\n\t\t\t\t\tll[i++] = l;\n\t\t\t\t}\n\t\t\t} else if (j === 17) { // 3 to 10 zero length codes\n\t\t\t\tNEEDBITS(3);\n\t\t\t\tj = 3 + GETBITS(3);\n\t\t\t\tDUMPBITS(3);\n\t\t\t\tif (i + j > n) {\n\t\t\t\t\treturn -1;\n\t\t\t\t}\n\t\t\t\twhile (j-- > 0) {\n\t\t\t\t\tll[i++] = 0;\n\t\t\t\t}\n\t\t\t\tl = 0;\n\t\t\t} else { // j === 18: 11 to 138 zero length codes\n\t\t\t\tNEEDBITS(7);\n\t\t\t\tj = 11 + GETBITS(7);\n\t\t\t\tDUMPBITS(7);\n\t\t\t\tif (i + j > n) {\n\t\t\t\t\treturn -1;\n\t\t\t\t}\n\t\t\t\twhile (j-- > 0) {\n\t\t\t\t\tll[i++] = 0;\n\t\t\t\t}\n\t\t\t\tl = 0;\n\t\t\t}\n\t\t}\n\n\t\t// build the decoding tables for literal/length and distance codes\n\t\tbl = lbits;\n\t\th = new HuftBuild(ll, nl, 257, cplens, cplext, bl);\n\t\tif (bl === 0) { // no literals or lengths\n\t\t\th.status = 1;\n\t\t}\n\t\tif (h.status !== 0) {\n\t\t\tif (h.status !== 1) {\n\t\t\t\treturn -1; // incomplete code set\n\t\t\t}\n\t\t\t// **incomplete literal tree**\n\t\t}\n\t\ttl = h.root;\n\t\tbl = h.m;\n\n\t\tfor (i = 0; i < nd; i++) {\n\t\t\tll[i] = ll[i + nl];\n\t\t}\n\t\tbd = dbits;\n\t\th = new HuftBuild(ll, nd, 0, cpdist, cpdext, bd);\n\t\ttd = h.root;\n\t\tbd = h.m;\n\n\t\tif (bd === 0 && nl > 257) { // lengths but no distances\n\t\t\t// **incomplete distance tree**\n\t\t\treturn -1;\n\t\t}\n/*\n\t\tif (h.status === 1) {\n\t\t\t// **incomplete distance tree**\n\t\t}\n*/\n\t\tif (h.status !== 0) {\n\t\t\treturn -1;\n\t\t}\n\n\t\t// decompress until an end-of-block code\n\t\treturn inflate_codes(buff, off, size);\n\t}\n\n\tfunction inflate_start() {\n\t\tif (!slide) {\n\t\t\tslide = []; // new Array(2 * WSIZE); // slide.length is never called\n\t\t}\n\t\twp = 0;\n\t\tbit_buf = 0;\n\t\tbit_len = 0;\n\t\tmethod = -1;\n\t\teof = false;\n\t\tcopy_leng = copy_dist = 0;\n\t\ttl = null;\n\t}\n\n\tfunction inflate_internal(buff, off, size) {\n\t\t// decompress an inflated entry\n\t\tvar n, i;\n\n\t\tn = 0;\n\t\twhile (n < size) {\n\t\t\tif (eof && method === -1) {\n\t\t\t\treturn n;\n\t\t\t}\n\n\t\t\tif (copy_leng > 0) {\n\t\t\t\tif (method !== STORED_BLOCK) {\n\t\t\t\t\t// STATIC_TREES or DYN_TREES\n\t\t\t\t\twhile (copy_leng > 0 && n < size) {\n\t\t\t\t\t\tcopy_leng--;\n\t\t\t\t\t\tcopy_dist &= WSIZE - 1;\n\t\t\t\t\t\twp &= WSIZE - 1;\n\t\t\t\t\t\tbuff[off + n++] = slide[wp++] = slide[copy_dist++];\n\t\t\t\t\t}\n\t\t\t\t} else {\n\t\t\t\t\twhile (copy_leng > 0 && n < size) {\n\t\t\t\t\t\tcopy_leng--;\n\t\t\t\t\t\twp &= WSIZE - 1;\n\t\t\t\t\t\tNEEDBITS(8);\n\t\t\t\t\t\tbuff[off + n++] = slide[wp++] = GETBITS(8);\n\t\t\t\t\t\tDUMPBITS(8);\n\t\t\t\t\t}\n\t\t\t\t\tif (copy_leng === 0) {\n\t\t\t\t\t\tmethod = -1; // done\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tif (n === size) {\n\t\t\t\t\treturn n;\n\t\t\t\t}\n\t\t\t}\n\n\t\t\tif (method === -1) {\n\t\t\t\tif (eof) {\n\t\t\t\t\tbreak;\n\t\t\t\t}\n\n\t\t\t\t// read in last block bit\n\t\t\t\tNEEDBITS(1);\n\t\t\t\tif (GETBITS(1) !== 0) {\n\t\t\t\t\teof = true;\n\t\t\t\t}\n\t\t\t\tDUMPBITS(1);\n\n\t\t\t\t// read in block type\n\t\t\t\tNEEDBITS(2);\n\t\t\t\tmethod = GETBITS(2);\n\t\t\t\tDUMPBITS(2);\n\t\t\t\ttl = null;\n\t\t\t\tcopy_leng = 0;\n\t\t\t}\n\n\t\t\tswitch (method) {\n\t\t\tcase STORED_BLOCK:\n\t\t\t\ti = inflate_stored(buff, off + n, size - n);\n\t\t\t\tbreak;\n\n\t\t\tcase STATIC_TREES:\n\t\t\t\tif (tl) {\n\t\t\t\t\ti = inflate_codes(buff, off + n, size - n);\n\t\t\t\t} else {\n\t\t\t\t\ti = inflate_fixed(buff, off + n, size - n);\n\t\t\t\t}\n\t\t\t\tbreak;\n\n\t\t\tcase DYN_TREES:\n\t\t\t\tif (tl) {\n\t\t\t\t\ti = inflate_codes(buff, off + n, size - n);\n\t\t\t\t} else {\n\t\t\t\t\ti = inflate_dynamic(buff, off + n, size - n);\n\t\t\t\t}\n\t\t\t\tbreak;\n\n\t\t\tdefault: // error\n\t\t\t\ti = -1;\n\t\t\t\tbreak;\n\t\t\t}\n\n\t\t\tif (i === -1) {\n\t\t\t\tif (eof) {\n\t\t\t\t\treturn 0;\n\t\t\t\t}\n\t\t\t\treturn -1;\n\t\t\t}\n\t\t\tn += i;\n\t\t}\n\t\treturn n;\n\t}\n\n\tfunction inflate(arr) {\n\t\tvar buff = [], i;\n\n\t\tinflate_start();\n\t\tinflate_data = arr;\n\t\tinflate_pos = 0;\n\n\t\tdo {\n\t\t\ti = inflate_internal(buff, buff.length, 1024);\n\t\t} while (i > 0);\n\t\tinflate_data = null; // G.C.\n\t\treturn buff;\n\t}\n\n\tmodule.exports = inflate;\n}());\n\n\n/***/ }),\n\n/***/ 606:\n/***/ ((module, __unused_webpack_exports, __webpack_require__) => {\n\n(function () {\n\t'use strict';\n\n\tvar crc32 = __webpack_require__(793),\n\t\tdeflate = __webpack_require__(762),\n\t\t// magic numbers marking this file as GZIP\n\t\tID1 = 0x1F,\n\t\tID2 = 0x8B,\n\t\tcompressionMethods = {\n\t\t\t'deflate': 8\n\t\t},\n\t\tpossibleFlags = {\n\t\t\t'FTEXT': 0x01,\n\t\t\t'FHCRC': 0x02,\n\t\t\t'FEXTRA': 0x04,\n\t\t\t'FNAME': 0x08,\n\t\t\t'FCOMMENT': 0x10\n\t\t},\n\t\tosMap = {\n\t\t\t'fat': 0, // FAT file system (DOS, OS/2, NT) + PKZIPW 2.50 VFAT, NTFS\n\t\t\t'amiga': 1, // Amiga\n\t\t\t'vmz': 2, // VMS (VAX or Alpha AXP)\n\t\t\t'unix': 3, // Unix\n\t\t\t'vm/cms': 4, // VM/CMS\n\t\t\t'atari': 5, // Atari\n\t\t\t'hpfs': 6, // HPFS file system (OS/2, NT 3.x)\n\t\t\t'macintosh': 7, // Macintosh\n\t\t\t'z-system': 8, // Z-System\n\t\t\t'cplm': 9, // CP/M\n\t\t\t'tops-20': 10, // TOPS-20\n\t\t\t'ntfs': 11, // NTFS file system (NT)\n\t\t\t'qdos': 12, // SMS/QDOS\n\t\t\t'acorn': 13, // Acorn RISC OS\n\t\t\t'vfat': 14, // VFAT file system (Win95, NT)\n\t\t\t'vms': 15, // MVS (code also taken for PRIMOS)\n\t\t\t'beos': 16, // BeOS (BeBox or PowerMac)\n\t\t\t'tandem': 17, // Tandem/NSK\n\t\t\t'theos': 18 // THEOS\n\t\t},\n\t\tos = 'unix',\n\t\tDEFAULT_LEVEL = 6;\n\n\tfunction putByte(n, arr) {\n\t\tarr.push(n & 0xFF);\n\t}\n\n\t// LSB first\n\tfunction putShort(n, arr) {\n\t\tarr.push(n & 0xFF);\n\t\tarr.push(n >>> 8);\n\t}\n\n\t// LSB first\n\tfunction putLong(n, arr) {\n\t\tputShort(n & 0xffff, arr);\n\t\tputShort(n >>> 16, arr);\n\t}\n\n\tfunction putString(s, arr) {\n\t\tvar i, len = s.length;\n\t\tfor (i = 0; i < len; i += 1) {\n\t\t\tputByte(s.charCodeAt(i), arr);\n\t\t}\n\t}\n\n\tfunction readByte(arr) {\n\t\treturn arr.shift();\n\t}\n\n\tfunction readShort(arr) {\n\t\treturn arr.shift() | (arr.shift() << 8);\n\t}\n\n\tfunction readLong(arr) {\n\t\tvar n1 = readShort(arr),\n\t\t\tn2 = readShort(arr);\n\n\t\t// JavaScript can't handle bits in the position 32\n\t\t// we'll emulate this by removing the left-most bit (if it exists)\n\t\t// and add it back in via multiplication, which does work\n\t\tif (n2 > 32768) {\n\t\t\tn2 -= 32768;\n\n\t\t\treturn ((n2 << 16) | n1) + 32768 * Math.pow(2, 16);\n\t\t}\n\n\t\treturn (n2 << 16) | n1;\n\t}\n\n\tfunction readString(arr) {\n\t\tvar charArr = [];\n\n\t\t// turn all bytes into chars until the terminating null\n\t\twhile (arr[0] !== 0) {\n\t\t\tcharArr.push(String.fromCharCode(arr.shift()));\n\t\t}\n\n\t\t// throw away terminating null\n\t\tarr.shift();\n\n\t\t// join all characters into a cohesive string\n\t\treturn charArr.join('');\n\t}\n\n\t/*\n\t * Reads n number of bytes and return as an array.\n\t *\n\t * @param arr- Array of bytes to read from\n\t * @param n- Number of bytes to read\n\t */\n\tfunction readBytes(arr, n) {\n\t\tvar i, ret = [];\n\t\tfor (i = 0; i < n; i += 1) {\n\t\t\tret.push(arr.shift());\n\t\t}\n\n\t\treturn ret;\n\t}\n\n\t/*\n\t * ZIPs a file in GZIP format. The format is as given by the spec, found at:\n\t * http://www.gzip.org/zlib/rfc-gzip.html\n\t *\n\t * Omitted parts in this implementation:\n\t */\n\tfunction zip(data, options) {\n\t\tvar flags = 0,\n\t\t\tlevel,\n\t\t\tcrc, out = [];\n\n\t\tif (!options) {\n\t\t\toptions = {};\n\t\t}\n\t\tlevel = options.level || DEFAULT_LEVEL;\n\n\t\tif (typeof data === 'string') {\n\t\t\tdata = Array.prototype.map.call(data, function (char) {\n\t\t\t\treturn char.charCodeAt(0);\n\t\t\t});\n\t\t}\n\n\t\t// magic number marking this file as GZIP\n\t\tputByte(ID1, out);\n\t\tputByte(ID2, out);\n\n\t\tputByte(compressionMethods['deflate'], out);\n\n\t\tif (options.name) {\n\t\t\tflags |= possibleFlags['FNAME'];\n\t\t}\n\n\t\tputByte(flags, out);\n\t\tputLong(options.timestamp || parseInt(Date.now() / 1000, 10), out);\n\n\t\t// put deflate args (extra flags)\n\t\tif (level === 1) {\n\t\t\t// fastest algorithm\n\t\t\tputByte(4, out);\n\t\t} else if (level === 9) {\n\t\t\t// maximum compression (fastest algorithm)\n\t\t\tputByte(2, out);\n\t\t} else {\n\t\t\tputByte(0, out);\n\t\t}\n\n\t\t// OS identifier\n\t\tputByte(osMap[os], out);\n\n\t\tif (options.name) {\n\t\t\t// ignore the directory part\n\t\t\tputString(options.name.substring(options.name.lastIndexOf('/') + 1), out);\n\n\t\t\t// terminating null\n\t\t\tputByte(0, out);\n\t\t}\n\n\t\tdeflate.deflate(data, level).forEach(function (byte) {\n\t\t\tputByte(byte, out);\n\t\t});\n\n\t\tputLong(parseInt(crc32(data), 16), out);\n\t\tputLong(data.length, out);\n\n\t\treturn out;\n\t}\n\n\tfunction unzip(data, options) {\n\t\t// start with a copy of the array\n\t\tvar arr = Array.prototype.slice.call(data, 0),\n\t\t\tt,\n\t\t\tcompressionMethod,\n\t\t\tflags,\n\t\t\tmtime,\n\t\t\txFlags,\n\t\t\tkey,\n\t\t\tos,\n\t\t\tcrc,\n\t\t\tsize,\n\t\t\tres;\n\n\t\t// check the first two bytes for the magic numbers\n\t\tif (readByte(arr) !== ID1 || readByte(arr) !== ID2) {\n\t\t\tthrow 'Not a GZIP file';\n\t\t}\n\n\t\tt = readByte(arr);\n\t\tt = Object.keys(compressionMethods).some(function (key) {\n\t\t\tcompressionMethod = key;\n\t\t\treturn compressionMethods[key] === t;\n\t\t});\n\n\t\tif (!t) {\n\t\t\tthrow 'Unsupported compression method';\n\t\t}\n\n\t\tflags = readByte(arr);\n\t\tmtime = readLong(arr);\n\t\txFlags = readByte(arr);\n\t\tt = readByte(arr);\n\t\tObject.keys(osMap).some(function (key) {\n\t\t\tif (osMap[key] === t) {\n\t\t\t\tos = key;\n\t\t\t\treturn true;\n\t\t\t}\n\t\t});\n\n\t\t// just throw away the bytes for now\n\t\tif (flags & possibleFlags['FEXTRA']) {\n\t\t\tt = readShort(arr);\n\t\t\treadBytes(arr, t);\n\t\t}\n\n\t\t// just throw away for now\n\t\tif (flags & possibleFlags['FNAME']) {\n\t\t\treadString(arr);\n\t\t}\n\n\t\t// just throw away for now\n\t\tif (flags & possibleFlags['FCOMMENT']) {\n\t\t\treadString(arr);\n\t\t}\n\n\t\t// just throw away for now\n\t\tif (flags & possibleFlags['FHCRC']) {\n\t\t\treadShort(arr);\n\t\t}\n\n\t\tif (compressionMethod === 'deflate') {\n\t\t\t// give deflate everything but the last 8 bytes\n\t\t\t// the last 8 bytes are for the CRC32 checksum and filesize\n\t\t\tres = deflate.inflate(arr.splice(0, arr.length - 8));\n\t\t}\n\n\t\tif (flags & possibleFlags['FTEXT']) {\n\t\t\tres = Array.prototype.map.call(res, function (byte) {\n\t\t\t\treturn String.fromCharCode(byte);\n\t\t\t}).join('');\n\t\t}\n\n\t\tcrc = readLong(arr);\n\t\tif (crc !== parseInt(crc32(res), 16)) {\n\t\t\tthrow 'Checksum does not match';\n\t\t}\n\n\t\tsize = readLong(arr);\n\t\tif (size !== res.length) {\n\t\t\tthrow 'Size of decompressed file not correct';\n\t\t}\n\n\t\treturn res;\n\t}\n\n\tmodule.exports = {\n\t\tzip: zip,\n\t\tunzip: unzip,\n\t\tget DEFAULT_LEVEL() {\n\t\t\treturn DEFAULT_LEVEL;\n\t\t}\n\t};\n}());\n\n\n/***/ })\n\n/******/ \t});\n/************************************************************************/\n/******/ \t// The module cache\n/******/ \tvar __webpack_module_cache__ = {};\n/******/ \t\n/******/ \t// The require function\n/******/ \tfunction __webpack_require__(moduleId) {\n/******/ \t\t// Check if module is in cache\n/******/ \t\tvar cachedModule = __webpack_module_cache__[moduleId];\n/******/ \t\tif (cachedModule !== undefined) {\n/******/ \t\t\treturn cachedModule.exports;\n/******/ \t\t}\n/******/ \t\t// Create a new module (and put it into the cache)\n/******/ \t\tvar module = __webpack_module_cache__[moduleId] = {\n/******/ \t\t\t// no module.id needed\n/******/ \t\t\t// no module.loaded needed\n/******/ \t\t\texports: {}\n/******/ \t\t};\n/******/ \t\n/******/ \t\t// Execute the module function\n/******/ \t\t__webpack_modules__[moduleId](module, module.exports, __webpack_require__);\n/******/ \t\n/******/ \t\t// Return the exports of the module\n/******/ \t\treturn module.exports;\n/******/ \t}\n/******/ \t\n/************************************************************************/\n/******/ \t/* webpack/runtime/compat get default export */\n/******/ \t(() => {\n/******/ \t\t// getDefaultExport function for compatibility with non-harmony modules\n/******/ \t\t__webpack_require__.n = (module) => {\n/******/ \t\t\tvar getter = module && module.__esModule ?\n/******/ \t\t\t\t() => (module['default']) :\n/******/ \t\t\t\t() => (module);\n/******/ \t\t\t__webpack_require__.d(getter, { a: getter });\n/******/ \t\t\treturn getter;\n/******/ \t\t};\n/******/ \t})();\n/******/ \t\n/******/ \t/* webpack/runtime/define property getters */\n/******/ \t(() => {\n/******/ \t\t// define getter functions for harmony exports\n/******/ \t\t__webpack_require__.d = (exports, definition) => {\n/******/ \t\t\tfor(var key in definition) {\n/******/ \t\t\t\tif(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {\n/******/ \t\t\t\t\tObject.defineProperty(exports, key, { enumerable: true, get: definition[key] });\n/******/ \t\t\t\t}\n/******/ \t\t\t}\n/******/ \t\t};\n/******/ \t})();\n/******/ \t\n/******/ \t/* webpack/runtime/hasOwnProperty shorthand */\n/******/ \t(() => {\n/******/ \t\t__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))\n/******/ \t})();\n/******/ \t\n/************************************************************************/\nvar __webpack_exports__ = {};\n// This entry need to be wrapped in an IIFE because it need to be in strict mode.\n(() => {\n\"use strict\";\n/* harmony import */ var bz2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(264);\n/* harmony import */ var bz2__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bz2__WEBPACK_IMPORTED_MODULE_0__);\nlet gzip = __webpack_require__(606);\r\n\r\n\r\n\r\n\r\nonmessage = function (e) {\r\n    //let workerResult = 'Result: ' + (e.data[0]);\r\n    //console.log(e);\r\n    //postMessage(workerResult);\r\n    \r\n    let index = e.data.index;\r\n    let segment = e.data.segment;\r\n    let archiveId = e.data.archiveId;\r\n    let compressedData = e.data.compressedData;\r\n\r\n    let dataview = new DataView(compressedData);\r\n    let compressionOpcode = dataview.getUint8(0);\r\n    let compressedLength = dataview.getUint32(1);\r\n\r\n    let data;\r\n    let decompressedData;\r\n\r\n    if (compressionOpcode == 0) { //none\r\n        data = new Uint8Array(dataview.buffer.slice(5, 9 + compressedLength));\r\n        decompressedData = data;\r\n        index.revision = dataview.getUint16(data.buffer.byteLength)\r\n    } else if (compressionOpcode == 1) { //bz2\r\n        data = new Uint8Array(dataview.buffer.slice(9, 9 + compressedLength));\r\n        let header = \"BZh1\";\r\n        let bzData = new Uint8Array(4 + data.length);\r\n        bzData[0] = 'B'.charCodeAt(0);\r\n        bzData[1] = 'Z'.charCodeAt(0);\r\n        bzData[2] = 'h'.charCodeAt(0);\r\n        bzData[3] = '1'.charCodeAt(0);\r\n        bzData.set(data, 4)\r\n        decompressedData = bz2__WEBPACK_IMPORTED_MODULE_0__.decompress(bzData);\r\n    } else if (compressionOpcode == 2) { //gzip\r\n        data = new Uint8Array(dataview.buffer.slice(9, 9 + compressedLength));\r\n        decompressedData = new Uint8Array(gzip.unzip(data));\r\n    }\r\n\r\n    let length = decompressedData.byteLength;\r\n    postMessage({index, archiveId, decompressedData: decompressedData.buffer.slice(0,length)}, [decompressedData.buffer.slice(0,length)]);\r\n    decompressedData = [];\r\n    compressedData = [];\r\n    data = [];\r\n    dataview = {};\r\n}\n})();\n\n/******/ })()\n;", "Worker", undefined, __webpack_require__.p + "Worker.worker.d839b260.js");
}

;// CONCATENATED MODULE: ./src/cacheReader/CacheRequester.js
var gzip = __webpack_require__(606);







class CacheRequester {
	//should be used to make read requests from the cache
	//this should make it easier to multithread/async this later on
	constructor(rootDir) {
		this.promises = {};
		this.worker = new Worker_fn();



		//console.log(this.worker);
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
			this.datDataPromise = getFileBytes(rootDir + "main_file_cache.dat2");
			this.datDataPromise.then((x) => {
				this.datData = x;
			});
		}



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
			var localWorker = new Worker_fn();

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
			if (this.xteas[archiveId] != undefined) //if its not a mapdef then it will have a key
				key = this.xteas[archiveId].key;
			//console.log(key);
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
				decompressedData = bz2.decompress(bzData);
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
					console.log("Could not unzip with key:" + key);
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
				//if (streamPosition == 1444353){
				//	if (data[streamPosition] == 0) data[streamPosition] = 255;
				//}
				
				//console.log(data[streamPosition], data[streamPosition + 1], data[streamPosition + 2], data[streamPosition + 3]);
				
				let delta  = dataview.getInt32(streamPosition);
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

;// CONCATENATED MODULE: ./src/cacheReader/RSCache.js









class RSCache {
	constructor(cacheRootDir = "./", progressFunc = () => { }, nameRootDir = undefined) {
		this.indicies = {};
		this.progressFunc = progressFunc;
		this.cacheRequester = new CacheRequester(cacheRootDir);

		this.onload = this.loadCacheFiles(cacheRootDir, "./", nameRootDir).then(() => {
			this.cacheRequester.setXteas(this.xteas);
		});
	}

	progress(amount) {
		this.progressFunc(amount);
	}



	async getAllFiles(indexId, archiveId, threaded = false) {
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
			this.loadRequests[indexId][archiveId].push(resolve);
		});

		//if theres already one processing then just add it to the stack
		if (this.loadRequests[indexId][archiveId].length > 1) {
			return newPromise;
		}

		let data;

		if (threaded)
			data = this.cacheRequester.readDataThreaded(index, index.indexSegments[archiveId].size, index.indexSegments[archiveId].segment, archiveId);
		else
			data = this.cacheRequester.readData(index, index.indexSegments[archiveId].size, index.indexSegments[archiveId].segment, archiveId);


		data.then(x => {
			archive = index.archives[x.archiveId];

			archive.loadFiles(x.decompressedData);
			new CacheDefinitionLoader(x.index.id, archive).load(this).then(() => {
				archive.filesLoaded = true;
				//console.log(this.loadRequests[indexId][archiveId]);
				for(let i=0;i<this.loadRequests[indexId][archiveId].length;i++){
					this.loadRequests[indexId][archiveId][i](archive.files);
				}
			});
		});

		return newPromise;
		//console.log(indexId, archiveId, archive.filesLoaded)
		/*
				return new Promise((resolve, reject) => {
					//files should only be loaded when they are required. need a better memory management system or something in the future
					//console.log(archive.filesLoaded);
					if (archive.filesLoaded == false) {
						let data;
		
						if (threaded)
							data = this.cacheRequester.readDataThreaded(index, index.indexSegments[archiveId].size, index.indexSegments[archiveId].segment, archiveId);
						else
							data = this.cacheRequester.readData(index, index.indexSegments[archiveId].size, index.indexSegments[archiveId].segment, archiveId);
		
						return data.then(x => {
							archive = index.archives[x.archiveId];
		
							if (archive.filesLoaded) {
								resolve(archive.files);
								return;
							}
							archive.loadFiles(x.decompressedData);
							new CacheDefinitionLoader(x.index.id, x.archiveId, archive.files).load(this).then(() => {
								archive.filesLoaded = true;
								resolve(archive.files)
							});
						});
					} else {
						resolve(archive.files);
					}
		
					//resolve(archive.files);
		
				});
		*/
	}

	//some archives only contain 1 file so a fileId is only needed in some cases
	getFile(indexId, archiveId, fileId = 0, threaded = false) {
		//console.log("Archive ID", archiveId);
		return this.getAllFiles(indexId, archiveId, threaded).then((x) => x[fileId]);
	}

	loadCacheFiles(rootDir, xteasDir, namesRootDir) {

		//this is basically relying on loading faster than the other stuff. probably should merge this with something
		if (namesRootDir != undefined) {
			getFile(namesRootDir + "names.tsv").then((nameData) => {
				let splitNameData = nameData.split("\n");
				for (let i = 0; i < splitNameData.length; i++) {
					let tabSplit = splitNameData[i].split("\t");
					HashConverter[tabSplit[3]] = tabSplit[4]; //3 = hash, 4 = name
				}
			});
		}

		if (xteasDir != undefined) {
			getFile(xteasDir + "xteas.json").then((xteasData) => {
				let xteas = JSON.parse(xteasData);
				this.xteas = {};
				for (var i = 0; i < xteas.length; i++) {
					this.xteas[xteas[i].group] = xteas[i];
				}

			});
		}

		let idx255 = getFileBytes(rootDir + "cache/main_file_cache.idx255");
		let idxFiles = [];

		return idx255.then((idx255Data) => {
			//console.log("idx255 loaded");
			//console.log(idx255Data);
			let indiciesAmount = idx255Data.length / 6; //each section is 6 bits

			for (let i = 0; i < indiciesAmount; i++) {
				idxFiles.push(getFileBytes(rootDir + "cache/main_file_cache.idx" + i));
			}

			//theres probably a better way of doing this
			//also not completely sure yet if this really needs to be done for index 255
			return Promise.all(idxFiles).then((idxFileData) => {
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

				return this.cacheRequester.datDataPromise.then((x) => {
					this.progress(40);
					return this.loadIndicies(idx255Data);
				});

			});

		});
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
;// CONCATENATED MODULE: ./src/index.js









//var cache = new RSCache("./", (x) => { console.log(x) }, "./");

/*
cache.onload.then(() => {
  console.log(cache);

  cache.getFile(IndexType.CONFIGS.id, ConfigType.NPC.id, 12077).then(npc => {
    cache.getFile(IndexType.MODELS.id, npc.def.models[0]).then(model => {
      console.log(model);
      playAnimation(model.def, 9536);
    });
  });
});
*/

function newAnimate(model, animayaSkeleton, var2) {
  model.verticesX = Object.assign([], model.vertexPositionsX);
  model.verticesY = Object.assign([], model.vertexPositionsY);
  model.verticesZ = Object.assign([], model.vertexPositionsZ);

  if (model.animayaGroups != null) {
    for (let vertexIndex = 0; vertexIndex < model.vertexCount; ++vertexIndex) {
      let bones = model.animayaGroups[vertexIndex];
      if (bones != null && bones.length != 0) {
        let scales = model.animayaScales[vertexIndex];

        let matrix = new Matrix();
        matrix.zero();

        for (let i = 0; i < bones.length; ++i) {
          let boneIndex = bones[i];
          let bone = animayaSkeleton.getBone(boneIndex);
          if (bone != null) {
            let matrix2 = new Matrix();
            let matrix3 = new Matrix();

            matrix2.scaleUniform(scales[i] / 255);
            matrix3.copy(bone.method678(var2));
            matrix3.method2175(matrix2);
            matrix.add(matrix3);
          }
        }

        method1283(model, vertexIndex, matrix);
      }
    }
    console.log(model);
  }
}

function method1283(model, var1, var2) {
  let var3 = model.verticesX[var1];
  let var4 = (-model.verticesY[var1]);
  let var5 = (-model.verticesZ[var1]);
  let var6 = 1.0;
  model.verticesX[var1] = var2.matrixVals[0] * var3 + var2.matrixVals[4] * var4 + var2.matrixVals[8] * var5 + var2.matrixVals[12] * var6;
  model.verticesY[var1] = -(var2.matrixVals[1] * var3 + var2.matrixVals[5] * var4 + var2.matrixVals[9] * var5 + var2.matrixVals[13] * var6);
  model.verticesZ[var1] = -(var2.matrixVals[2] * var3 + var2.matrixVals[6] * var4 + var2.matrixVals[10] * var5 + var2.matrixVals[14] * var6);
}

function playAnimation(model, id) {
  return cache.getFile(IndexType.CONFIGS.id, ConfigType.SEQUENCE.id, id).then(animationInfo => {
    console.log(animationInfo);
    if (animationInfo.def.animMayaID != undefined && animationInfo.def.animMayaID >= 0) {
      let var7 = animationInfo.def.animMayaID;

      /*
      for (let i = 0; i < 2112; i++) {
        cache.getAllFiles(IndexType.FRAMEMAPS.id, i);
      }
      */

      return cache.getAllFiles(IndexType.FRAMES.id, var7 >> 16).then(framesInfo => {
        //this line is the same as making a new class133
        //var6 = Login.method425(SequenceDefinition_animationsArchive, class16.SequenceDefinition_skeletonsArchive, var7, false);
        console.log(framesInfo);

        newAnimate(model, framesInfo[0].def.framemap.animayaSkeleton, framesInfo[0].def.field1264)
        /*
                      if (var3 == null) {
                          return var1.toSharedSequenceModel(true);
                      } else {
                         Model var9 = var1.toSharedSequenceModel(!var3.method720());
                          var9.method1285(var3, var2);
                          return var9;
                      }
                      */
      });
    } else { //no animMaya - old way kind of
      var shiftedId = (animationInfo.def.frameIDs[0] >> 16);
      return cache.getAllFiles(IndexType.FRAMES.id, shiftedId).then(frameInfo => {
        console.log(frameInfo);
        var frameDefs = frameInfo.map(x => {
          x.def.id = x.id;
          return x.def;
        });
        //renderer.scene[0].loadAnimation(animationInfo.def, frameDefs);
      });
    }
  });
}


/*

for(let i=3900;i<5934;i++){
  cache.getFile(IndexType.MAPS.id, i).then(x => {
    //console.log(x);
    //if(x.def == undefined) console.log(i, x);
    //if(x.def.regionX == 50 && x.def.regionY == 53) console.log(x);
  });
}
});
*
/*
console.log(cache);
cache.getAllFiles(IndexType.CONFIGS.id, ConfigType.NPC.id).then(zulrah => {
  console.log(zulrah);
});
cache.getFile(IndexType.CONFIGS.id, ConfigType.NPC.id, 2042).then(zulrah => {
  console.log(zulrah);
});
*/
  //console.log(cache.getFile(IndexType.MODELS.id, 15981, 0, false));
  // cache.getFile(IndexType.MODELS.id, 15981, 0, false).then(x => console.log(x));
  //42852
/*
for(let i=0;i<10;i++){
cache.getFile(IndexType.CONFIGS.id, ConfigType.OBJECT.id, 1300+i).then(object => {
  console.log(object);
});
}
*/
/*
cache.getFile(IndexType.CONFIGS.id, ConfigType.UNDERLAY.id).then(x => {console.log(x)});
cache.getFile(IndexType.CONFIGS.id, ConfigType.OVERLAY.id).then(x => {console.log(x)});
cache.getFile(IndexType.MAPS.id, 4).then(x => {
  console.log(x);
  //for (let i = 0; i < x.def.models.length; i++)
  //  cache.getFile(IndexType.MODELS.id, x.def.models[i], 0, false).then(y => console.log(y))
});
});
*/

/*
var cache;


var t0 = performance.now()
cache = new RSCache("./", (x) => { console.log(x) });

var promise1, promise2;
console.log("loading");
cache.onload.then(() => {
  console.log(cache);
  console.log(cache.getFile(IndexType.MODELS.id, 15981, 0, false));


  /*
  cache.getFile(IndexType.CONFIGS.id, ConfigType.NPC.id, 2042).then(zulrah => {
    console.log(zulrah);
    var models = zulrah.def.models;
    var modelPromises = [];
    console.log(models);
    for (var i = 0; i < models.length; i++) {
      modelPromises.push(cache.getFile(IndexType.MODELS.id, models[i], 0, false));
    }

    Promise.all(modelPromises).then(x => {
      console.log(x);
    });
  });
  */
  //console.log("loaded");
  //var zulrah = cache.getFile(IndexType.CONFIGS.id, ConfigType.NPC.id, 2042);
  //console.log(await cache.getFile(IndexType.CONFIGS.id, ConfigType.NPC.id, 2042));


  //cache.getFile(IndexType.CONFIGS.id, ConfigType.NPC.id, 2042).then(entityInfo => {
/*
cache.getFile(IndexType.CONFIGS.id, ConfigType.SEQUENCE.id, 7053).then(entityInfo2 => {
  //console.log(entityInfo.def);
  console.log(entityInfo2.def);
  var shiftedId = (entityInfo2.def.frameIDs[0] >> 16);
  console.log(shiftedId);
  cache.getAllFiles(IndexType.FRAMES.id, shiftedId).then(frameInfo => {
    console.log(frameInfo);
  });

  var t1 = performance.now()
  console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.")
});
 
//});
 
});

*/
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});