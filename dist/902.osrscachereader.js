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

/***/ 363:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 674:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 980:
/***/ ((__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony import */ var gzip_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(606);
/* harmony import */ var _foxglove_wasm_bz2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(35);



onmessage = async function (e) {
    //let workerResult = 'Result: ' + (e.data[0]);
    //console.log(e);
    //postMessage(workerResult);

    let index = e.data.index;
    let segment = e.data.segment;
    let archiveId = e.data.archiveId;
    let compressedData = e.data.compressedData;

    let dataview = new DataView(compressedData);
    let compressionOpcode = dataview.getUint8(0);
    let compressedLength = dataview.getUint32(1);

    let data;
    let decompressedData;

    if (compressionOpcode == 0) { //none
        data = new Uint8Array(dataview.buffer.slice(5, 9 + compressedLength));
        decompressedData = data;
        index.revision = dataview.getUint16(data.buffer.byteLength)
    } else if (compressionOpcode == 1) { //bz2
        let decompressedLength = dataview.getInt32(5);
        data = new Uint8Array(dataview.buffer.slice(9, 9 + compressedLength));
        data = decrypt(data, compressedLength, e?.key); 
        let bzData = new Uint8Array(4 + data.length);
        bzData[0] = 'B'.charCodeAt(0);
        bzData[1] = 'Z'.charCodeAt(0);
        bzData[2] = 'h'.charCodeAt(0);
        bzData[3] = '1'.charCodeAt(0);
        bzData.set(data, 4)

        const bzip2 = await _foxglove_wasm_bz2__WEBPACK_IMPORTED_MODULE_1__/* ["default"].init */ .Z.init();
        decompressedData = bzip2.decompress(bzData, decompressedLength, { small: false });

    } else if (compressionOpcode == 2) { //gzip
        let unencryptedData = new Uint8Array(dataview.buffer.slice(5, 9 + compressedLength));
        data = decrypt(unencryptedData, unencryptedData.length, e?.key);
        let leftOver = unencryptedData.slice(data.length);

        var mergedArray = new Uint8Array(data.length + leftOver.length);
        mergedArray.set(data);
        mergedArray.set(leftOver, data.length);

        //add the end of the compressed data onto the decrypted?
        let decryptedDataview = new DataView(mergedArray.buffer);

        data = new Uint8Array(decryptedDataview.buffer.slice(4))

        let unzipped;
        try {
            //console.log("unzipping");
            unzipped = gzip_js__WEBPACK_IMPORTED_MODULE_0__.unzip(data);
            //console.log("unzipped");
        } catch {
            throw "Could not unzip with key:" + e?.key;
        }

        decompressedData = new Uint8Array(unzipped);
    }

    let length = decompressedData.byteLength;
    postMessage({ index, archiveId, decompressedData: decompressedData.buffer.slice(0, length) }, [decompressedData.buffer.slice(0, length)]);
    decompressedData = [];
    compressedData = [];
    data = [];
    dataview = {};
}

function decrypt(data, len, key) {
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
/******/ 	// the startup function
/******/ 	__webpack_require__.x = () => {
/******/ 		// Load entry module and return exports
/******/ 		// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 		var __webpack_exports__ = __webpack_require__.O(undefined, [509], () => (__webpack_require__(980)))
/******/ 		__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 		return __webpack_exports__;
/******/ 	};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
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
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks and sibling chunks for the entrypoint
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
/******/ 	/* webpack/runtime/importScripts chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded chunks
/******/ 		// "1" means "already loaded"
/******/ 		var installedChunks = {
/******/ 			902: 1
/******/ 		};
/******/ 		
/******/ 		// importScripts chunk loading
/******/ 		var installChunk = (data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			while(chunkIds.length)
/******/ 				installedChunks[chunkIds.pop()] = 1;
/******/ 			parentChunkLoadingFunction(data);
/******/ 		};
/******/ 		__webpack_require__.f.i = (chunkId, promises) => {
/******/ 			// "1" is the signal for "already loaded"
/******/ 			if(!installedChunks[chunkId]) {
/******/ 				if(true) { // all chunks have JS
/******/ 					importScripts(__webpack_require__.p + __webpack_require__.u(chunkId));
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkosrscachereader"] = self["webpackChunkosrscachereader"] || [];
/******/ 		var parentChunkLoadingFunction = chunkLoadingGlobal.push.bind(chunkLoadingGlobal);
/******/ 		chunkLoadingGlobal.push = installChunk;
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/startup chunk dependencies */
/******/ 	(() => {
/******/ 		var next = __webpack_require__.x;
/******/ 		__webpack_require__.x = () => {
/******/ 			return __webpack_require__.e(509).then(next);
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// run startup
/******/ 	var __webpack_exports__ = __webpack_require__.x();
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});