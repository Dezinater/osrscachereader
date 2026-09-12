
export default class VorbisSample {
   static VorbisSample_bytes = [];
   static VorbisSample_byteOffset;
   static VorbisSample_bitOffset;
   static VorbisSample_blockSize0;
   static VorbisSample_blockSize1;
   static VorbisSample_codebooks = [];
   static VorbisSample_floors = [];
   static VorbisSample_residues = [];
   static VorbisSample_mappings = [];
   static VorbisSample_blockFlags = [];
   static VorbisSample_mapping = [];
   static loaded = false;
   static field288 = [];
   static field299 = [];
   static field290 = [];
   static field291 = [];
   static field281 = [];
   static field293 = [];
   static field294 = [];
   static field295 = [];
   static field296 = [];
   field287;
   sampleRate;
   sampleCount;
   start;
   end;
   field271 = false;
   field284 = [];
   field285;
   field286;
   field275 = false;
   samples = [];
   field282;
   field278;


   constructor(var1) {
      this.read(var1);
   }

   read(var1) {
      var2 = new DataView(var1);
      this.sampleRate = var2.readInt();
      this.sampleCount = var2.readInt();
      this.start = var2.readInt();
      this.end = var2.readInt();
      if (this.end < 0) {
         this.end = ~this.end;
         this.field271 = true;
      }

      let var3 = var2.readInt();
      this.field287 = new Array(var3);

      for (let var4 = 0; var4 < var3; ++var4) {
         let var5 = 0;

         let var6;
         do {
            var6 = var2.readUnsignedByte();
            var5 += var6;
         } while (var6 >= 255);

         let var7 = new Array(var5);
         var2.readBytes(var7, 0, var5);
         this.field287[var4] = var7;
      }

   }

   static readMusicSample(cache, var1, var2) {
      if (!loadVorbisData(cache)) {
         var0.tryLoadFile(var1, var2);
         return null;
      } else {
         let var3 = var0.takeFile(var1, var2);
         return var3 == null ? null : new VorbisSample(var3);
      }
   }

   loadVorbisData(cache) {
      if (!this.loaded) {
         let var1 = var0.takeFile(0, 0);
         if (var1 == null) {
            return false;
         }

         VorbisSample.method317(var1);
         this.loaded = true;
      }

      return true;
   }
}