import PcmStream from "./PcmStream.js";
import NodeDeque from "../node/NodeDeque.js";
export default class PcmStreamMixer extends PcmStream {
    subStreams = new NodeDeque();
    field169 = new NodeDeque();
    field170 = 0;
    field171 = -1;

    addSubStream(var1) {
      this.subStreams.addLast(var1);
   }

    removeSubStream(var1) {
      var1.remove();
   }

   method203() {
      if (this.field170 > 0) {
         for(let var1 = this.field169.last(); var1 != null; var1 = this.field169.previous()) {
            var1.field300 -= this.field170;
         }

         this.field171 -= this.field170;
         this.field170 = 0;
      }

   }

   method204(var1, var2) {
      while(this.field169.sentinel != var1 && (var1).field300 <= var2.field300) {
         var1 = var1.previous;
      }

      NodeDeque.NodeDeque_addBefore(var2, var1);
      this.field171 = (this.field169.sentinel.previous).field300;
   }

   method209(var1) {
      var1.remove();
      var1.remove2();
      let var2 = this.field169.sentinel.previous;
      if (var2 == this.field169.sentinel) {
         this.field171 = -1;
      } else {
         this.field171 = (var2).field300;
      }

   }
    firstSubStream() {
      return this.subStreams.last();
   }

    nextSubStream() {
      return this.subStreams.previous();
   }

    fill(var1, var2, var3) {
      do {
         if (this.field171 < 0) {
            this.updateSubStreams(var1, var2, var3);
            return;
         }

         if (var3 + this.field170 < this.field171) {
            this.field170 += var3;
            this.updateSubStreams(var1, var2, var3);
            return;
         }

         let var4 = this.field171 - this.field170;
         this.updateSubStreams(var1, var2, var4);
         var2 += var4;
         var3 -= var4;
         this.field170 += var4;
         this.method203();
         let var5 = this.field169.last();
         //synchronized(var5) {
        {
            let var7 = var5.update();
            if (var7 < 0) {
               var5.field300 = 0;
               this.method209(var5);
            } else {
               var5.field300 = var7;
               this.method204(var5.previous, var5);
            }
         }
      } while(var3 != 0);

   }

    updateSubStreams(var1, var2, var3) {
      for(let var4 = this.subStreams.last(); var4 != null; var4 = this.subStreams.previous()) {
         var4.update(var1, var2, var3);
      }

   }

    skip(var1) {
      do {
         if (this.field171 < 0) {
            this.skipSubStreams(var1);
            return;
         }

         if (this.field170 + var1 < this.field171) {
            this.field170 += var1;
            this.skipSubStreams(var1);
            return;
         }

         let var2 = this.field171 - this.field170;
         this.skipSubStreams(var2);
         var1 -= var2;
         this.field170 += var2;
         this.method203();
         let var3 = this.field169.last();
         //synchronized(var3) {
        {
            let var5 = var3.update();
            if (var5 < 0) {
               var3.field300 = 0;
               this.method209(var3);
            } else {
               var3.field300 = var5;
               this.method204(var3.previous, var3);
            }
         }
      } while(var1 != 0);

   }

    skipSubStreams(var1) {
      for(let var2 = this.subStreams.last(); var2 != null; var2 = this.subStreams.previous()) {
         var2.skip(var1);
      }

   }
}
