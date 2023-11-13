import SoundEnvelope from "../cacheTypes/sound/SoundEnvelope.js";
import AudioFilter from "../cacheTypes/sound/AudioFilter.js";

export default class Instrument {
   samples = [];
   phases = [];
   delays = [];
   volumeSteps = [];
   pitchSteps = [];
   pitchBaseSteps = [];
   oscillatorVolume = [0, 0, 0, 0, 0];
   oscillatorPitch = [0, 0, 0, 0, 0];
   oscillatorDelays = [0, 0, 0, 0, 0];
   delayTime = 0;
   delayDecay = 100;
   duration = 500;
   offset = 0;
   pitch = new SoundEnvelope();
   volume = new SoundEnvelope();

   static noise = new Array(32768).fill().map(Math.random);
   static sine = new Array(32768).fill().map((x, i) => Math.floor(Math.sin(i / 5215.1903) * 16384.0));

   decode(dataview) {
      this.pitch.decode(dataview);
      this.volume.decode(dataview);
      let var2 = dataview.readUint8();
      if (var2 != 0) {
         dataview.addPosition(-1);
         this.pitchModifier = new SoundEnvelope();
         this.pitchModifier.decode(dataview);
         this.pitchModifierAmplitude = new SoundEnvelope();
         this.pitchModifierAmplitude.decode(dataview);
      }

      var2 = dataview.readUint8();
      if (var2 != 0) {
         dataview.addPosition(-1);
         this.volumeMultiplier = new SoundEnvelope();
         this.volumeMultiplier.decode(dataview);
         this.volumeMultiplierAmplitude = new SoundEnvelope();
         this.volumeMultiplierAmplitude.decode(dataview);
      }

      var2 = dataview.readUint8();
      if (var2 != 0) {
         dataview.addPosition(-1);
         this.release = new SoundEnvelope();
         this.release.decode(dataview);
         this.attack = new SoundEnvelope();
         this.attack.decode(dataview);
      }

      for (let var3 = 0; var3 < 10; ++var3) {
         let var4 = dataview.readUnsignedShortSmart();
         if (var4 == 0) {
            break;
         }

         this.oscillatorVolume[var3] = var4;
         this.oscillatorPitch[var3] = dataview.readShortSmart();
         this.oscillatorDelays[var3] = dataview.readUnsignedShortSmart();
      }

      this.delayTime = dataview.readUnsignedShortSmart();
      this.delayDecay = dataview.readUnsignedShortSmart();
      this.duration = dataview.readUint16();
      this.offset = dataview.readUint16();
      this.filter = new AudioFilter();
      this.filterEnvelope = new SoundEnvelope();
      this.filter.decode(dataview, this.filterEnvelope);

      return this;
   }

   synthesize(var1, var2) {
      for (let i = 0; i < var1; i++) this.samples[i] = 0;
      //class384.clearIntArray(this.samples, 0, var1);
      if (var2 < 10) {
         return this.samples;
      } else {
         let var3 = var1 / (var2 + 0.0);
         this.pitch.reset();
         this.volume.reset();
         let var5 = 0;
         let var6 = 0;
         let var7 = 0;
         if (this.pitchModifier != null) {
            this.pitchModifier.reset();
            this.pitchModifierAmplitude.reset();
            var5 = Math.floor((this.pitchModifier.end - this.pitchModifier.start) * 32.768 / var3);
            var6 = Math.floor(this.pitchModifier.start * 32.768 / var3);
         }

         let var8 = 0;
         let var9 = 0;
         let var10 = 0;
         if (this.volumeMultiplier != null) {
            this.volumeMultiplier.reset();
            this.volumeMultiplierAmplitude.reset();
            var8 = Math.floor((this.volumeMultiplier.end - this.volumeMultiplier.start) * 32.768 / var3);
            var9 = Math.floor(this.volumeMultiplier.start * 32.768 / var3);
         }

         let var11;
         for (var11 = 0; var11 < 5; ++var11) {
            if (this.oscillatorVolume[var11] != 0) {
               this.phases[var11] = 0;
               this.delays[var11] = Math.floor(this.oscillatorDelays[var11] * var3);
               this.volumeSteps[var11] = (this.oscillatorVolume[var11] << 14) / 100;
               this.pitchSteps[var11] = Math.floor((this.pitch.end - this.pitch.start) * 32.768 * Math.pow(1.0057929410678534, this.oscillatorPitch[var11]) / var3);
               this.pitchBaseSteps[var11] = Math.floor(this.pitch.start * 32.768 / var3);
            }
         }

         let var12;
         let var13;
         let var14;
         let var15;
         for (var11 = 0; var11 < var1; ++var11) {
            var12 = this.pitch.doStep(var1);
            var13 = this.volume.doStep(var1);
            if (this.pitchModifier != null) {
               var14 = this.pitchModifier.doStep(var1);
               var15 = this.pitchModifierAmplitude.doStep(var1);
               var12 += this.evaluateWave(var7, var15, this.pitchModifier.form) >> 1;
               var7 = var7 + var6 + (var14 * var5 >> 16);
            }

            if (this.volumeMultiplier != null) {
               var14 = this.volumeMultiplier.doStep(var1);
               var15 = this.volumeMultiplierAmplitude.doStep(var1);
               var13 = var13 * ((this.evaluateWave(var10, var15, this.volumeMultiplier.form) >> 1) + '耀') >> 15;
               var10 = var10 + var9 + (var14 * var8 >> 16);
            }

            for (var14 = 0; var14 < 5; ++var14) {
               if (this.oscillatorVolume[var14] != 0) {
                  var15 = this.delays[var14] + var11;
                  if (var15 < var1) {
                     this.samples[var15] += this.evaluateWave(this.phases[var14], var13 * this.volumeSteps[var14] >> 15, this.pitch.form);
                     this.phases[var14] += (var12 * this.pitchSteps[var14] >> 16) + this.pitchBaseSteps[var14];
                  }
               }
            }
         }
         let var16;
         if (this.release != null) {
            this.release.reset();
            this.attack.reset();
            var11 = 0;
            let var19 = false;
            let var20 = true;

            for (var14 = 0; var14 < var1; ++var14) {
               var15 = this.release.doStep(var1);
               var16 = this.attack.doStep(var1);
               if (var20) {
                  var12 = (var15 * (this.release.end - this.release.start) >> 8) + this.release.start;
               } else {
                  var12 = (var16 * (this.release.end - this.release.start) >> 8) + this.release.start;
               }

               var11 += 256;
               if (var11 >= var12) {
                  var11 = 0;
                  var20 = !var20;
               }

               if (var20) {
                  this.samples[var14] = 0;
               }
            }
         }

         if (this.delayTime > 0 && this.delayDecay > 0) {
            var11 = Math.floor(this.delayTime * var3);

            for (var12 = var11; var12 < var1; ++var12) {
               this.samples[var12] += this.samples[var12 - var11] * this.delayDecay / 100;
            }
         }

         if (this.filter.pairs[0] > 0 || this.filter.pairs[1] > 0) {
            this.filterEnvelope.reset();
            var11 = this.filterEnvelope.doStep(var1 + 1);
            var12 = this.filter.compute(0, var11 / 65536.0);
            var13 = this.filter.compute(1, var11 / 65536.0);
            if (var1 >= var12 + var13) {
               var14 = 0;
               var15 = var13;
               if (var13 > var1 - var12) {
                  var15 = var1 - var12;
               }

               let var17;
               while (var14 < var15) {
                  var16 = Math.floor(this.samples[var14 + var12] * this.filter.forwardMultiplier >> 16);

                  for (var17 = 0; var17 < var12; ++var17) {
                     var16 += Math.floor(this.samples[var14 + var12 - 1 - var17] * this.filter.coefficients[0][var17] >> 16);
                  }

                  for (var17 = 0; var17 < var14; ++var17) {
                     var16 -= Math.floor(this.samples[var14 - 1 - var17] * this.filter.coefficients[1][var17] >> 16);
                  }

                  this.samples[var14] = var16;
                  var11 = this.filterEnvelope.doStep(var1 + 1);
                  ++var14;
               }

               let var21 = true;
               var15 = 128;

               while (true) {
                  if (var15 > var1 - var12) {
                     var15 = var1 - var12;
                  }

                  let var18;
                  while (var14 < var15) {
                     var17 = Math.floor(this.samples[var14 + var12] * this.filter.forwardMultiplier >> 16);

                     for (var18 = 0; var18 < var12; ++var18) {
                        var17 += Math.floor(this.samples[var14 + var12 - 1 - var18] * this.filter.coefficients[0][var18] >> 16);
                     }

                     for (var18 = 0; var18 < var13; ++var18) {
                        var17 -= Math.floor(this.samples[var14 - 1 - var18] * this.filter.coefficients[1][var18] >> 16);
                     }

                     this.samples[var14] = var17;
                     var11 = this.filterEnvelope.doStep(var1 + 1);
                     ++var14;
                  }

                  if (var14 >= var1 - var12) {
                     while (var14 < var1) {
                        var17 = 0;

                        for (var18 = var14 + var12 - var1; var18 < var12; ++var18) {
                           var17 += Math.floor(this.samples[var14 + var12 - 1 - var18] * this.filter.coefficients[0][var18] >> 16);
                        }

                        for (var18 = 0; var18 < var13; ++var18) {
                           var17 -= Math.floor(this.samples[var14 - 1 - var18] * this.filter.coefficients[1][var18] >> 16);
                        }

                        this.samples[var14] = var17;
                        this.filterEnvelope.doStep(var1 + 1);
                        ++var14;
                     }
                     break;
                  }

                  var12 = this.filter.compute(0, var11 / 65536.0);
                  var13 = this.filter.compute(1, var11 / 65536.0);
                  var15 += 128;
               }
            }
         }

         for (var11 = 0; var11 < var1; ++var11) {
            if (this.samples[var11] < -32768) {
               this.samples[var11] = -32768;
            }

            if (this.samples[var11] > 32767) {
               this.samples[var11] = 32767;
            }
         }

         return this.samples;
      }
   }

   evaluateWave(var1, var2, var3) {
      if (var3 == 1) {
         return (var1 & 32767) < 16384 ? var2 : -var2;
      } else if (var3 == 2) {
         return Instrument.sine[var1 & 32767] * var2 >> 14;
      } else if (var3 == 3) {
         return (var2 * (var1 & 32767) >> 14) - var2;
      } else {
         return var3 == 4 ? var2 * Instrument.noise[var1 / 2607 & 32767] : 0;
      }
   }
}