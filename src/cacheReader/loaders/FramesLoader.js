import IndexType from '../cacheTypes/IndexType.js'

export class FramesDefinition {

}

export default class FramesLoader {

    load(bytes, id, cache) {
        //console.log(id);
        let def = new FramesDefinition();
        def.id = id;
        let inview = new DataView(bytes.buffer);
        let dataview = new DataView(bytes.buffer);

        let framemapArchiveIndex = inview.readUint16();
        let length = inview.readUint8();

        dataview.setPosition(3 + length);

        def.indexFrameIds = [];
        def.translator_x = [];
        def.translator_y = [];
        def.translator_z = [];

        let lastI = -1;
        let index = 0;
        //return this.def;
        return cache.getFile(IndexType.FRAMEMAPS.id, framemapArchiveIndex).then((framemap) => {

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