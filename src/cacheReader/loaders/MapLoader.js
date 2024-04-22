/**
 * @typedef Tile
 * @property {number} height Used to construct a heightmap
 * @property {number} attrOpcode
 * @property {number} overlayId Overlay Definition ID
 * @property {number} overlayPath
 * @property {number} overlayRotation
 * @property {number} settings
 * @property {number} underlayId Underlay Definition ID
 */

/**
 * @typedef Location
 * @property {number} id ObjectDefinition ID
 * @property {number} type
 * @property {number} orientation Rotation
 * @property {{x,y,z}} position
 */

/**
 * @class MapDefinition
 * @category Definitions
 * @hideconstructor
 */
export class MapDefinition {
    /** @type {number} */
    id;

    /** @type {number} */
    regionX;

    /** @type {number} */
    regionY;

    /**
     * Tile info including Overlay/Underlay and height
     * @type {Tile}
     */
    tiles = [];

    heights;

    getHeights() {
        if (this.heights != undefined) return this.heights;

        let noise = (x, y) => {
            let n = x + y * 57;
            n ^= n << 13;
            return (((n * (n * n * 15731 + 789221) + 1376312589) & 2147483647) >> 19) & 255;
        };

        let smoothedNoise1 = (x, y) => {
            let corners = noise(x - 1, y - 1) + noise(x + 1, y - 1) + noise(x - 1, 1 + y) + noise(x + 1, y + 1);
            let sides = noise(x - 1, y) + noise(1 + x, y) + noise(x, y - 1) + noise(x, 1 + y);
            let center = noise(x, y);
            return center / 4 + sides / 8 + corners / 16;
        };

        let interpolate = (a, b, x, y) => {
            let COS = Math.floor(65536 * Math.sin((((1024 * x) / y) * Math.PI) / 1024));
            let f = (65536 - COS) >> 1;
            return ((f * b) >> 16) + ((a * (65536 - f)) >> 16);
        };

        let interpolateNoise = (x, y, frequency) => {
            let intX = x / frequency;
            let fracX = x & (frequency - 1);
            let intY = y / frequency;
            let fracY = y & (frequency - 1);
            let v1 = smoothedNoise1(intX, intY);
            let v2 = smoothedNoise1(intX + 1, intY);
            let v3 = smoothedNoise1(intX, intY + 1);
            let v4 = smoothedNoise1(1 + intX, 1 + intY);
            let i1 = interpolate(v1, v2, fracX, frequency);
            let i2 = interpolate(v3, v4, fracX, frequency);
            return interpolate(i1, i2, fracY, frequency);
        };

        let calculate = (x, y) => {
            let n =
                interpolateNoise(x + 45365, y + 91923, 4) -
                128 +
                ((interpolateNoise(10294 + x, y + 37821, 2) - 128) >> 1) +
                ((interpolateNoise(x, y, 1) - 128) >> 2);
            n = 35 + Math.floor(n * 0.3);
            if (n < 10) {
                n = 10;
            } else if (n > 60) {
                n = 60;
            }

            return n;
        };

        let tileHeights = [];
        for (let z = 0; z < 4; z++) {
            tileHeights[z] = [];
            for (let x = 0; x < 64; x++) {
                tileHeights[z][x] = [];
                for (let y = 0; y < 64; y++) {
                    if (this.tiles[z][x][y].height == null) {
                        if (z == 0) {
                            tileHeights[0][x][y] =
                                calculate(this.regionX + x + 0xe3b7b, this.regionY + y + 0x87cce) * 8;
                        } else {
                            tileHeights[z][x][y] = tileHeights[z - 1][x][y] + 240;
                        }
                    } else {
                        let height = this.tiles[z][x][y].height;
                        if (height == 1) {
                            height = 0;
                        }

                        if (z == 0) {
                            tileHeights[0][x][y] = height * 8;
                        } else {
                            tileHeights[z][x][y] = tileHeights[z - 1][x][y] + height * 8;
                        }
                    }
                }
            }
        }
        this.heights = tileHeights;
        return tileHeights;
    }
}

/**
 * @class LocationDefinition
 * @category Definitions
 * @hideconstructor
 */
export class LocationDefinition {
    /** @type {number} */
    id;

    /** @type {number} */
    regionX;

    /** @type {number} */
    regionY;

    /**
     * Objects on the map
     * @type {Location}
     */
    locations = [];
}
export class EmptyMapDefinition {}
export default class MapLoader {
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
        return new Int32Array([h])[0];
    }

    load(bytes, id, rscache) {
        if (bytes == undefined) return new MapDefinition();
        let x, y;
        let mapInfo = rscache.cacheRequester.xteas[id];
        //if there is xteas then its a location def
        if (mapInfo != undefined) {
            x = mapInfo.mapsquare >> 8;
            y = mapInfo.mapsquare & 0xff;
            return this.loadLocationDef(bytes, id, x, y);
        } else {
            let hashVal = rscache.indicies[5].archives[id].nameHash;
            for (let i = 0; i < 32768; i++) {
                let x = i >> 8;
                let y = i & 0xff;

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

        while ((idOffset = dataview.readUnsignedIntSmartShortCompat()) != 0) {
            id += idOffset;

            let position = 0;
            let positionOffset;

            while ((positionOffset = dataview.readUnsignedShortSmart()) != 0) {
                position += positionOffset - 1;

                let localY = position & 0x3f;
                let localX = (position >> 6) & 0x3f;
                let height = (position >> 12) & 0x3;

                let attributes = dataview.readUint8();
                let type = attributes >> 2;
                let orientation = attributes & 0x3;

                def.locations.push({ id, type, orientation, position: { localX, localY, height } });
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
                        } else if (attribute == 1) {
                            tile.height = dataview.readUint8();
                            break;
                        } else if (attribute <= 49) {
                            tile.attrOpcode = attribute;
                            tile.overlayId = dataview.readInt16();
                            tile.overlayPath = (attribute - 2) / 4;
                            tile.overlayRotation = (attribute - 2) & 3;
                        } else if (attribute <= 81) {
                            tile.settings = attribute - 49;
                        } else {
                            tile.underlayId = attribute - 81;
                        }
                    }
                }
            }
        }

        return def;
    }
}
