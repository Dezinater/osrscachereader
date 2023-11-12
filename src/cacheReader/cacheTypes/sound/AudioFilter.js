export default class AudioFilter {
   pairs = new Array(2);
   field305 = new Array(2).fill().map(x => new Array(8)); //[2][8] js multiarray :'(
   coefficients = new Array(2).fill().map(x => new Array(8)); //[2][8]
   field304 = new Array(2).fill().map(x => new Array(2).fill().map(x => new Array(4))); //[2][2][4]
   field306 = new Array(2).fill().map(x => new Array(2).fill().map(x => new Array(4))); //[2][2][4] 
   field307 = new Array(2);
   field309;
   forwardMultiplier;

    decode(var1, var2) {
        let var3 = var1.readUint8();
        this.pairs[0] = var3 >> 4;
        this.pairs[1] = var3 & 15;
        if (var3 != 0) {
           this.field307[0] = var1.readUint16();
           this.field307[1] = var1.readUint16();
           let var4 = var1.readUint8();
  
           let var5;
           let var6;
           for(var5 = 0; var5 < 2; ++var5) {
              for(var6 = 0; var6 < this.pairs[var5]; ++var6) {
                 this.field304[var5][0][var6] = var1.readUint16();
                 this.field306[var5][0][var6] = var1.readUint16();
              }
           }
  
           for(var5 = 0; var5 < 2; ++var5) {
              for(var6 = 0; var6 < this.pairs[var5]; ++var6) {
                 if ((var4 & 1 << var5 * 4 << var6) != 0) {
                    this.field304[var5][1][var6] = var1.readUint16();
                    this.field306[var5][1][var6] = var1.readUint16();
                 } else {
                    this.field304[var5][1][var6] = this.field304[var5][0][var6];
                    this.field306[var5][1][var6] = this.field306[var5][0][var6];
                 }
              }
           }
  
           if (var4 != 0 || this.field307[1] != this.field307[0]) {
              var2.decodeSegments(var1);
           }
        } else {
           let var7 = this.field307;
           this.field307[1] = 0;
           var7[0] = 0;
        }
  
     }

     normalize(var0) {
      let var1 = 32.703197 * Math.pow(2.0, var0);
      return var1 * 3.1415927 / 11025.0;
   }

     method334(var1, var2, var3) {
      let var4 = this.field306[var1][0][var2] + var3 * (this.field306[var1][1][var2] - this.field306[var1][0][var2]);
      var4 *= 0.0015258789;
      return 1.0 - Math.pow(10.0, -var4 / 20.0);
   }

   method336(var1, var2, var3) {
      let var4 = this.field304[var1][0][var2] + var3 * (this.field304[var1][1][var2] - this.field304[var1][0][var2]);
      var4 *= 1.2207031E-4;
      return this.normalize(var4);
   }

     compute(var1, var2) {
      let var3;
      if (var1 == 0) {
         var3 = this.field307[0] + (this.field307[1] - this.field307[0]) * var2;
         var3 *= 0.0030517578;
         this.field309 = Math.pow(0.1, (var3 / 20.0));
         this.forwardMultiplier = Math.floor(this.field309 * 65536.0);
      }

      if (this.pairs[var1] == 0) {
         return 0;
      } else {
         var3 = this.method334(var1, 0, var2);
         this.field305[var1][0] = var3 * -2.0 * Math.cos(this.method336(var1, 0, var2));
         this.field305[var1][1] = var3 * var3;

         let var4;
         for(var4 = 1; var4 < this.pairs[var1]; ++var4) {
            var3 = this.method334(var1, var4, var2);
            let var5 = var3 * -2.0 * Math.cos(this.method336(var1, var4, var2));
            let var6 = var3 * var3;
            this.field305[var1][var4 * 2 + 1] = this.field305[var1][var4 * 2 - 1] * var6;
            this.field305[var1][var4 * 2] = this.field305[var1][var4 * 2 - 1] * var5 + this.field305[var1][var4 * 2 - 2] * var6;

            for(let var7 = var4 * 2 - 1; var7 >= 2; --var7) {
               this.field305[var1][var7] += this.field305[var1][var7 - 1] * var5 + this.field305[var1][var7 - 2] * var6;
            }

            this.field305[var1][1] += this.field305[var1][0] * var5 + var6;
            this.field305[var1][0] += var5;
         }

         if (var1 == 0) {
            for(var4 = 0; var4 < this.pairs[0] * 2; ++var4) {
               this.field305[0][var4] *= this.field309;
            }
         }

         for(var4 = 0; var4 < this.pairs[var1] * 2; ++var4) {
            this.coefficients[var1][var4] = Math.floor(this.field305[var1][var4] * 65536.0);
         }

         return this.pairs[var1] * 2;
      }
   }
}