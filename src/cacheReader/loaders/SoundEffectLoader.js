import SoundEnvelope from "../cacheTypes/sound/SoundEnvelope.js";
import InstrumentLoader from "./InstrumentLoader.js";
import RawSound from "../cacheTypes/sound/RawSound.js";

/**
* Instruments are used to create Jingles and Tracks
* @class InstrumentDefinition
* @category Definitions
* @hideconstructor
*/
export class SoundEffectDefinition {
	/** 
	* The ID of this Sound Effect
	* @type {number} 
	*/
	id;
    start;
    end;
    instruments = [];

    mix() {
        let var1 = 0;
  
        let var2;
        for(var2 = 0; var2 < 10; ++var2) {
           if (this.instruments[var2] != null && this.instruments[var2].duration + this.instruments[var2].offset > var1) {
              var1 = this.instruments[var2].duration + this.instruments[var2].offset;
           }
        }
  
        if (var1 == 0) {
           return new byte[0];
        } else {
           var2 = Math.floor(var1 * 22050 / 1000);
           let var3 = new Array(var2).fill().map(x => 0);
  
           for(let var4 = 0; var4 < 10; ++var4) {
              if (this.instruments[var4] != null) {
                 let var5 = this.instruments[var4].duration * 22050 / 1000;
                 let var6 = this.instruments[var4].offset * 22050 / 1000;
                 let var7 = this.instruments[var4].synthesize(var5, this.instruments[var4].duration);
 
                 for(let var8 = 0; var8 < var5; ++var8) {
                    let var9 = (var7[var8] >> 8) + var3[var8 + var6];
                    if ((var9 + 128 & -256) != 0) {
                       var9 = var9 >> 31 ^ 127;
                    }
  
                    var3[var8 + var6] = var9;
                 }
              }
           }
  
           return var3;
        }
     }

     toRawSound() {
        let var1 = this.mix();
        return new RawSound(22050, var1, this.start * 22050 / 1000, this.end * 22050 / 1000);
     }
}
export default class SoundEffectLoader {

    load(bytes, id) {
        let def = new SoundEffectDefinition();
        def.id = id;
        let dataview = new DataView(bytes.buffer);
        for(let var2 = 0; var2 < 10; ++var2) {
            let var3 = dataview.readUint8();
            if (var3 != 0) {
               dataview.addPosition(-1);
               def.instruments[var2] = new InstrumentLoader().decode(dataview);
            }
         }
   
         def.start = dataview.readUint16();
         def.end = dataview.readUint16();

        return def;
    }

}