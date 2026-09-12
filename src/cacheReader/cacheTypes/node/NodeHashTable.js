import Node from "./Node.js";
export default class NodeHashTable {
    size;
    buckets = [];
    currentGet;
    current;
    index = 0;

   constructor(var1) {
      this.size = var1;
      this.buckets = new Array(var1);

      for(let var2 = 0; var2 < var1; ++var2) {
         let var3 = this.buckets[var2] = new Node();
         var3.previous = var3;
         var3.next = var3;
      }

   }

    get(var1) {
      let var3 = this.buckets[(var1 & (this.size - 1))];

      for(this.currentGet = var3.previous; var3 != this.currentGet; this.currentGet = this.currentGet.previous) {
         if (this.currentGet.key == var1) {
            let var4 = this.currentGet;
            this.currentGet = this.currentGet.previous;
            return var4;
         }
      }

      this.currentGet = null;
      return null;
   }

    put(var1, var2) {
      if (var1.next != null) {
         var1.remove();
      }

      let var4 = this.buckets[(var2 & (this.size - 1))];
      var1.next = var4.next;
      var1.previous = var4;
      var1.next.previous = var1;
      var1.previous.next = var1;
      var1.key = var2;
   }

    first() {
      this.index = 0;
      return this.next();
   }

    next() {
      let var1;
      if (this.index > 0 && this.buckets[this.index - 1] != this.current) {
         var1 = this.current;
         this.current = var1.previous;
         return var1;
      } else {
         do {
            if (this.index >= this.size) {
               return null;
            }

            var1 = this.buckets[this.index++].previous;
         } while(var1 == this.buckets[this.index - 1]);

         this.current = var1.previous;
         return var1;
      }
   }
}
