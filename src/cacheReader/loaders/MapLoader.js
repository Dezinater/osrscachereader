export class MapDefinition {

}
export class LocationDefinition {

}
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
        return (new Int32Array([h]))[0];
    }



    load(bytes, id, rscache) {
        let x, y;
        let mapInfo = rscache.xteas[id];

        if (mapInfo != undefined) {
            x = mapInfo.mapsquare >> 8;
            y = mapInfo.mapsquare & 0xFF;
            return this.loadLocationDef(bytes, id, x, y);
        } else {
            let hashVal = rscache.indicies[5].archives[id].nameHash;
            console.log(rscache.indicies[5]);
            console.log(hashVal);
            for (let i = 0; i < 32768; i++) {
                let x = i >> 8;
                let y = i & 0xFF;
                if (this.hash("l" + x + "_" + y) == hashVal) {
                    //not much we can do here without xteas
                    return new Location();
                }
                if (this.hash("m" + x + "_" + y) == hashVal) {
                    console.log("m" + x + "_" + y);
                    return this.loadMapDef(bytes, id, x, y);
                }
            }
        }

        console.log(bytes, rscache.xteas);
        console.log(rscache.xteas[id]);
        console.log(id);
        console.log(x, y);
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
                        let attribute = dataview.readUint8();
                        if (attribute == 0) {
                            break;
                        }
                        else if (attribute == 1) {
                            tile.height = dataview.readUint8();
                            break;
                        }
                        else if (attribute <= 49) {
                            tile.attrOpcode = attribute;
                            tile.overlayId = dataview.readInt8();
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