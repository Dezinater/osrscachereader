export class MapDefinition {

}
export class LocationDefinition {

}
export class EmptyMapDefinition {

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

		while ((idOffset = dataview.readUnsignedIntSmartShortCompat()) != 0)
		{
			id += idOffset;

			let position = 0;
			let positionOffset;

			while ((positionOffset = dataview.readUnsignedShortSmart()) != 0)
			{
				position += positionOffset - 1;

				let localY = position & 0x3F;
				let localX = position >> 6 & 0x3F;
				let height = position >> 12 & 0x3;

				let attributes = dataview.readUint8();
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