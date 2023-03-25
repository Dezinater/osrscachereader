import axios from 'axios';
import CacheLoader from './cacheReader/CacheLoader.js';

const cacheLoader = new CacheLoader("https://archive.openrs2.org/caches/runescape/1301/disk.zip", () => {});
/*
//axios.get("https://archive.openrs2.org/caches/runescape/1301/disk.zip", { onDownloadProgress }).then(function (response) {
axios.get("../cache/main_file_cache.dat2", { onDownloadProgress }).then(function (response) {
    // handle success
    console.log(response);
});

function onDownloadProgress({ loaded, total, progress, bytes, estimated, rate, download = true }) {
    // Do whatever you want with the Axios progress event
    console.log(loaded, total, progress, bytes, estimated, rate, download);
}*/