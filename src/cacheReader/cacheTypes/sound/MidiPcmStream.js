import IndexType from "../IndexType.js";
import MusicPatch from "./MusicPatch.js";
export default class MidiPcmStream {
    musicPatches = {};

    constructor() {

    }

    async loadMusicTrack(musicTrack, cache, soundCache, var4) {
        musicTrack.method1673();
        let var5 = true;
        let var6 = null;
        if (var4 > 0) {
           var6 = [var4];
        }
        for(const [key, var7] of Object.entries(musicTrack.table)) {
        //for(ByteArrayNode var7 = (ByteArrayNode)musicTrack.table.first(); var7 != null; var7 = (ByteArrayNode)musicTrack.table.next()) {
           let var8 = key;
           let var9 = this.musicPatches[var8];
           if (var9 == null) {
            let var11 = await cache.getFile(IndexType.INSTRUMENTS, var8);
              //byte[] var11 = var2.takeFileFlat(var8);
              let var10;
              if (var11 == null) {
                 var10 = null;
              } else {
                 var10 = new MusicPatch(var11);
              }
  
              var9 = var10;
              if (var10 == null) {
                 var5 = false;
                 continue;
              }
  
              this.musicPatches[var10] = var8;
           }
  
           if (!(await var9.method1663(soundCache, Array.from(var7.buffer), var6))) {
              var5 = false;
           }
        }
  
        if (var5) {
           musicTrack.clear();
        }
  
        return var5;
     }
  
}