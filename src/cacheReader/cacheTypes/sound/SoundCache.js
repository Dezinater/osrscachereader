import RawSound from "./RawSound.js";
export default class SoundCache {

    //AbstractArchive soundEffectIndex;
    //AbstractArchive musicSampleIndex;

    musicSamples = {};
    rawSounds = {};

    constructor(cache) {
        //this.soundEffectIndex = var1;
        //this.musicSampleIndex = var2;
     }
  
      getSoundEffect0(var1, var2, var3) {
        let var4 = var2 ^ (var1 << 4 & '\uffff' | var1 >>> 12);
        var4 |= var1 << 16;
        let var5 = var4;
        let var7 = this.rawSounds[var5];
        if (var7 != null) {
           return var7;
        } else if (var3 != null && var3[0] <= 0) {
           return null;
        } else {
           let var8 = SoundEffect.readSoundEffect(this.soundEffectIndex, var1, var2);
           if (var8 == null) {
              return null;
           } else {
              var7 = var8.toRawSound();
              this.rawSounds[var7] = var5;
              if (var3 != null) {
                 var3[0] -= var7.samples.length;
              }
  
              return var7;
           }
        }
     }

    getMusicSample0(var1, var2, var3) {
        let var4 = var2 ^ (var1 << 4 & '\uffff' | var1 >>> 12);
        var4 |= var1 << 16;
        let var5 = var4 ^ 4294967296;
        let var7 = this.rawSounds[var5];
        if (var7 != null) {
           return var7;
        } else if (var3 != null && var3[0] <= 0) {
           return null;
        } else {
           let var8 = this.musicSamples[var5];
           if (var8 == null) {
              var8 = VorbisSample.readMusicSample(this.musicSampleIndex, var1, var2);
              if (var8 == null) {
                 return null;
              }
  
              this.musicSamples.put(var8, var5);
           }
  
           var7 = var8.toRawSound(var3);
           if (var7 == null) {
              return null;
           } else {
              var8.remove();
              this.rawSounds.put(var7, var5);
              return var7;
           }
        }
     }
  
      async getSoundEffect(var1, var2) {
        if (this.soundEffectIndex.getGroupCount() == 1) {
           return this.getSoundEffect0(0, var1, var2);
        } else if (this.soundEffectIndex.getGroupFileCount(var1) == 1) {
           return this.getSoundEffect0(var1, 0, var2);
        } else {
           throw new RuntimeException();
        }
     }
  
      async getMusicSample(var1, var2) {
        if (this.musicSampleIndex.getGroupCount() == 1) {
           return this.getMusicSample0(0, var1, var2);
        } else if (this.musicSampleIndex.getGroupFileCount(var1) == 1) {
           return this.getMusicSample0(var1, 0, var2);
        } else {
           throw new RuntimeException();
        }
     }
}