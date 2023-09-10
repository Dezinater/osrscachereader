# OSRS Cache Reader

![Altarkiz](https://runemonk.com/Altarkiz%202.png)

[**Documentation**](https://dezinater.github.io/osrscachereader/index.html) - [**NPM**](https://www.npmjs.com/package/osrscachereader)

This library load files from Old School Runescape's game files in your browser or in Node.
There are also helper functions included such as a GLTF exporter and a simple method to load animations that returns verticies for rendering.

## Setup
Run this in your Node JS project to install this library
```
npm install osrscachereader
```


If you're planning on using Webpack to make a web project then you must add these to your Webpack config file. This is required since the cache reader uses a WASM library to decompress certain archives.

```js
resolve: {
    fallback: {
        crypto: false,
        fs: false,
        path: false
    }
},
```

```js
module: {
    rules: [
        {
            test: /\.wasm$/,
            type: "asset/inline",
        },
    ],
},
```

This repo also includes a complete webpack config ([here](/webpack.config.cjs "Webpack Config")) if you would like to just use that

## Running

Import OSRSCacheReader and create a new RSCache object to read from the game files

```js
import { RSCache } from "osrscachereader"
const cache = new RSCache("./");
```
The Cache class takes a string as the root directory to load the cache from. This root directory must contain a folder named cache which has files such as ```main_file_cache.idx255``` and ```main_file_cache.dat2```. It can also contains a file called ```xteas.json``` to read map files. If the cache is not complete it may not load correctly. Runescape streams in the cache so using the files from the client will not always work. An archive of complete caches and xteas can be found at https://archive.openrs2.org/caches

Using ```cache.onload``` we can wait until the cache is loaded and then grab files from it
```js
cache.onload.then(() => {
    //do stuff
});
```
The cache is structured by having Indicies which have Archives that can contain one or many files. Each of these files will contain some game definition such as a NPC, animation, sprite or map tile. The indicies are defined with [IndexType](/src/cacheReader/cacheTypes/IndexType.js "IndexType"). If using IndexType.CONFIGS you can then use [ConfigType](/src/cacheReader/cacheTypes/ConfigType.js "ConfigType") as the archive

There are a few ways to grab files from the cache along with some helper methods


**Helper methods**
```js
let dragonScimitar = await cache.getItem(4587);
let zulrah = await cache.getNPC(2042);
let runiteRocks = await cache.getObject(11376);
```

**Main Methods**
```js
let zulrah = await cache.getDef(IndexType.CONFIGS, ConfigType.NPC, 2042);
let model = await cache.getDef(IndexType.MODELS, zulrah.models[0]);
```
This will simply return the definition of which ever file it is able to load from that archive. If no file ID is passed as the last parameter it defaults to 0.

```js
let sprite = await cache.getFile(IndexType.SPRITES.id, 42);
console.log(sprite.nameHash); //prints out 1585002405
```
This will get the entire file that contains the definition within it. This can be useful when you need extra information such as the hash of the file. The hash can be used to find certain files such as a map tile or finding a sprite by name. In this example we can see it printed 1585002405 which we can then search up in a name hash dump such as [this one](https://github.com/RuneStar/cache-names/blob/master/names.tsv "OSRS Hashes") provided by RuneStar. In this case we can see 1585002405 is "magicon,27".

```js
let allNPCS = await cache.getAllDefs(IndexType.CONFIGS, ConfigType.NPC);
let npcsOver400Combat = allNPCS.filter(def => def.combatLevel > 400);
```
Multiple files can be grabbed by using this method. This can be helpful for filtering and finding certain files. In this example we grab all NPC and filter for ones that have above 400 combat level. It is possible to also do the same with getAllFiles. Keep in mind that getAllFiles and getAllDefs gets everything within an archive.

```js
let spritesIndex = cache.getIndex(IndexType.SPRITES);
let archiveKeys = Object.keys(spritesIndex.archives);

let allSprites = await Promise.all(archiveKeys.map(async archiveId => await cache.getFile(IndexType.SPRITES, archiveId)));

let spritesWithMultipleFrames = allSprites.filter(spriteFile => spriteFile.def.sprites.length > 1);
let logo = allSprites.filter(spriteFile => spriteFile.nameHash == 3327403);
```
If you wanted to get every Sprite you would have to do something like this.

There are also option you can pass as parameter to any getFile/getAllFiles and getDef/getAllDefs functions. You can read more about these options [here](/docs/ "Options")

## Sources

Loaders/Definitions and other various information was gathered from the following:
- [RuneLite](https://github.com/runelite/runelite)
- [OpenOSRS](https://github.com/open-osrs/runelite)
- [MeteorLite](https://github.com/MeteorLite/meteor-client)
- Official Old School Runescape Client
