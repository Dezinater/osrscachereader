import PcmStream from "./PcmStream.js";
import NodeDeque from "../node/NodeDeque.js"
import PcmStreamMixer from "./PcmStreamMixer.js";
export default class MusicPatchPcmStream extends PcmStream {
    superStream;
    queue = new NodeDeque();
    mixer = new PcmStreamMixer();

   constructor(var1) {
      super();
      this.superStream = var1;
   }

   method1670(var1, var2, var3, var4, var5) {
      if ((this.superStream.field2746[var1.field2801] & 4) != 0 && var1.field2798 < 0) {
         let var6 = this.superStream.field2751[var1.field2801] / PcmPlayer.field201;

         while(true) {
            let var7 = (var6 + 1048575 - var1.field2803) / var6;
            if (var7 > var4) {
               var1.field2803 += var6 * var4;
               break;
            }

            var1.stream.fill(var2, var3, var7);
            var3 += var7;
            var4 -= var7;
            var1.field2803 += var6 * var7 - 1048576;
            let var8 = PcmPlayer.field201 / 100;
            let var9 = 262144 / var6;
            if (var9 < var8) {
               var8 = var9;
            }

            let var10 = var1.stream;
            if (this.superStream.field2749[var1.field2801] == 0) {
               var1.stream = RawPcmStream.method294(var1.rawSound, var10.method270(), var10.method262(), var10.method285());
            } else {
               var1.stream = RawPcmStream.method294(var1.rawSound, var10.method270(), 0, var10.method285());
               this.superStream.method1639(var1, var1.patch.field2771[var1.field2788] < 0);
               var1.stream.method298(var8, var10.method262());
            }

            if (var1.patch.field2771[var1.field2788] < 0) {
               var1.stream.setNumLoops(-1);
            }

            var10.method268(var8);
            var10.fill(var2, var3, var5 - var3);
            if (var10.method299()) {
               this.mixer.addSubStream(var10);
            }
         }
      }

      var1.stream.fill(var2, var3, var4);
   }

   method1668(var1, var2) {
      if ((this.superStream.field2746[var1.field2801] & 4) != 0 && var1.field2798 < 0) {
         let var3 = this.superStream.field2751[var1.field2801] / PcmPlayer.field201;
         let var4 = (var3 + 1048575 - var1.field2803) / var3;
         var1.field2803 = var3 * var2 + var1.field2803 & 1048575;
         if (var4 <= var2) {
            if (this.superStream.field2749[var1.field2801] == 0) {
               var1.stream = RawPcmStream.method294(var1.rawSound, var1.stream.method270(), var1.stream.method262(), var1.stream.method285());
            } else {
               var1.stream = RawPcmStream.method294(var1.rawSound, var1.stream.method270(), 0, var1.stream.method285());
               this.superStream.method1639(var1, var1.patch.field2771[var1.field2788] < 0);
            }

            if (var1.patch.field2771[var1.field2788] < 0) {
               var1.stream.setNumLoops(-1);
            }

            var2 = var1.field2803 / var3;
         }
      }

      var1.stream.skip(var2);
   }

    firstSubStream() {
      let var1 = this.queue.last();
      if (var1 == null) {
         return null;
      } else {
         return (var1.stream != null ? var1.stream : this.nextSubStream());
      }
   }

    nextSubStream() {
      let var1;
      do {
         var1 = this.queue.previous();
         if (var1 == null) {
            return null;
         }
      } while(var1.stream == null);

      return var1.stream;
   }

    fill(var1, var2, var3) {
      this.mixer.fill(var1, var2, var3);

      for(let var6 = this.queue.last(); var6 != null; var6 = this.queue.previous()) {
         if (!this.superStream.method1646(var6)) {
            let var4 = var2;
            let var5 = var3;

            do {
               if (var5 <= var6.field2796) {
                  this.method1670(var6, var1, var4, var5, var5 + var4);
                  var6.field2796 -= var5;
                  break;
               }

               this.method1670(var6, var1, var4, var6.field2796, var4 + var5);
               var4 += var6.field2796;
               var5 -= var6.field2796;
            } while(!this.superStream.method1638(var6, var1, var4, var5));
         }
      }

   }

    skip(var1) {
      this.mixer.skip(var1);

      for(let var3 = this.queue.last(); var3 != null; var3 = this.queue.previous()) {
         if (!this.superStream.method1646(var3)) {
            let var2 = var1;

            do {
               if (var2 <= var3.field2796) {
                  this.method1668(var3, var2);
                  var3.field2796 -= var2;
                  break;
               }

               this.method1668(var3, var3.field2796);
               var2 -= var3.field2796;
            } while(!this.superStream.method1638(var3, null, 0, var2));
         }
      }

   }

}
