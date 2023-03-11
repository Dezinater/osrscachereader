export class AnimayaDefinition {

}

export default class AnimayaLoader {
    load(bytes, id, cache) {
        let def = new FramesDefinition();
        def.id = id;
        let dataview = new DataView(bytes.buffer);

        let unknown = dataview.readUint8();
        let skeletonId = dataview.readUint16();

        return cache.getFile(IndexType.FRAMEMAPS.id, skeletonId).then((framemap) => {
            framemap = framemap.def;
            //console.log(framemap);

            dataview.readUint16();
            dataview.readUint16();
            def.field1264 = dataview.readUint8();
            let var3 = dataview.readUint16();
            def.field1267 = new Array(framemap.animayaSkeleton.bones.length);
            def.field1266 = new Array(framemap.count);
            let var4 = new Array(var3);

            let var5;
            let var7;
            let var16;
            for (var5 = 0; var5 < var3; ++var5) {
                var7 = dataview.readUint8();
                var16 = dataview.readShortSmart();
                let var11 = dataview.readUint8();
                //console.log(var16, var11);
                /*
                class127 var12 = (class127)class4.findEnumerated(class122.method688(), var11);
                if (var12 == null) {
                   var12 = class127.field1244;
                }
       
                class125 var13 = new class125();
                var13.method704(var1, var2);
                var4[var5] = new class124(this, var13, var9, var12, var16);
                int var14 = var9.method708();
                class125[][] var15;
                if (var9 == class126.field1229) {
                   var15 = this.field1267;
                } else {
                   var15 = this.field1266;
                }
       
                if (var15[var16] == null) {
                   var15[var16] = new class125[var14];
                }
       
                if (var9 == class126.field1232) {
                   this.field1262 = true;
                }
                */
            }

            def.framemap = framemap;
            return def;
        });
    }
}