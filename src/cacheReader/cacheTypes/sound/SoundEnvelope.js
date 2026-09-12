export default class SoundEnvelope {

    durations = [];
    phases = [];

    constructor() {
        this.durations[0] = 0;
        this.durations[1] = 65535;
        this.phases[0] = 0;
        this.phases[1] = 65535;
    }

    decode(var1) {
        this.form = var1.readUint8();
        this.start = var1.readInt32();
        this.end = var1.readInt32();
        this.decodeSegments(var1);
     }

     decodeSegments(var1) {
        this.segments = var1.readUint8();
        this.durations = new Array(this.segments);
        this.phases = new Array(this.segments);
  
        for(let var2 = 0; var2 < this.segments; ++var2) {
           this.durations[var2] = var1.readUint16();
           this.phases[var2] = var1.readUint16();
        }
  
     }

     reset() {
      this.ticks = 0;
      this.phaseIndex = 0;
      this.step = 0;
      this.amplitude = 0;
      this.max = 0;
   }

   doStep(var1) {
      if (this.max >= this.ticks) {
         this.amplitude = this.phases[this.phaseIndex++] << 15;
         if (this.phaseIndex >= this.segments) {
            this.phaseIndex = this.segments - 1;
         }

         this.ticks = Math.floor(this.durations[this.phaseIndex] / 65536.0 * var1);
         if (this.ticks > this.max) {
            this.step = ((this.phases[this.phaseIndex] << 15) - this.amplitude) / (this.ticks - this.max);
         }
      }

      this.amplitude += this.step;
      ++this.max;
      return this.amplitude - this.step >> 15;
   }
}