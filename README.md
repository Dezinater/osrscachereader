# OSRS Cache reader

![Wise Old Man](https://oldschool.runescape.wiki/images/4/46/Wise_Old_Man_chathead.png?68f26)

This project will load stuff from the runescape cache, in browser.

## Running

Before loading anything, run this in console to read the cache,

```js
cache = new Cache("")
```

Then, load with,

```js
var allNpcs = cache.getAllFiles(IndexType.CONFIGS.id, ConfigType.NPC.id)
```

Here, the ```IndexType.CONFIGS.id``` is the Index and the ```ConfigType.NPC.id``` is the Archive.

## Loaders Implemented

Loaders currently implemented in JS from [here](https://github.com/open-osrs/runelite/tree/master/cache/src/main/java/net/runelite/cache/definitions/loaders),

- [ ] Area Loader
- [ ] Enum Loader
- [ ] Frame Loader
- [ ] Framemap Loader
- [ ] HealthBar Loader
- [ ] HitSplat Loader
- [ ] Interface Loader
- [ ] Inventory Loader
- [ ] Item Loader
- [ ] Kit Loader
- [ ] Locations Loader
- [ ] Map Loader
- [ ] Model Loader
- [x] Npc Loader
- [x] Object Loader
- [ ] Overlay Loader
- [ ] Param Loader
- [ ] Script Loader
- [ ] Sequence Loader
- [ ] SpotAnim Loader
- [ ] Sprite Loader
- [ ] Struct Loader
- [ ] Texture Loader
- [ ] Track Loader
- [ ] Underlay Loader
- [ ] Varbit Loader
- [ ] WorldMap Loader

## TODO
