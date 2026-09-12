
export default class MidiFileReader {
    static field2762 = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    buffer = new DataView(new ArrayBuffer(0));
    division;
    trackStarts = [];
    trackPositions = [];
    trackLengths = [];
    field2765 = [];
    field2766;
    field2769;

    constructor(midi) {
        this.parse(midi);
    }

    parse(var1) {
        this.buffer = new DataView(var1);
        this.buffer.setPosition(10);
        let var2 = this.buffer.readUint16();
        this.division = this.buffer.readUint16();
        this.field2766 = 500000;
        this.trackStarts = new Array(var2);
  
        let var3;
        let var5;
        for(var3 = 0; var3 < var2; this.buffer.pos += var5) {
           let var4 = this.buffer.readInt32();
           var5 = this.buffer.readInt32();
           if (var4 == 1297379947) {
              this.trackStarts[var3] = this.buffer.getPosition();
              ++var3;
           }
        }
  
        this.field2769 = 0;
        this.trackPositions = new Array(var2);
  
        for(var3 = 0; var3 < var2; ++var3) {
           this.trackPositions[var3] = this.trackStarts[var3];
        }
  
        this.trackLengths = new Array(var2).fill().map(x => 0);
        this.field2765 = new Array(var2).fill().map(x => 0);
     }

      clear() {
        this.buffer.array = null;
        this.trackStarts = null;
        this.trackPositions = null;
        this.trackLengths = null;
        this.field2765 = null;
     }
  
      isReady() {
        return this.buffer.array != null;
     }
  
      trackCount() {
        return this.trackPositions.length;
     }
  
      gotoTrack(var1) {
        this.buffer.pos = this.trackPositions[var1];
     }

      markTrackPosition(var1) {
        this.trackPositions[var1] = this.buffer.getPosition();
     }
  
      setTrackDone() {
        this.buffer.pos = -1;
     }
  
      readTrackLength(var1) {
        let var2 = this.buffer.readVarInt();
        this.trackLengths[var1] += var2;
     }

      readMessage(var1) {
        let var2 = this.readMessage0(var1);
        return var2;
     }

     readMessage0(var1) {
       let var2 = this.buffer.getInt8(this.buffer.getPosition());
       let var5;
       if (var2 < 0) {
          var5 = var2 & 255;
          this.field2765[var1] = var5;
          ++this.buffer.pos;
       } else {
          var5 = this.field2765[var1];
       }
 
       if (var5 != 240 && var5 != 247) {
          return this.method1660(var1, var5);
       } else {
          let var3 = this.buffer.readVarInt();
          if (var5 == 247 && var3 > 0) {
             let var4 = this.buffer.getUint8(this.buffer.getPosition()) & 255;
             if (var4 >= 241 && var4 <= 243 || var4 == 246 || var4 == 248 || var4 >= 250 && var4 <= 252 || var4 == 254) {
                ++this.buffer.pos;
                this.field2765[var1] = var4;
                return this.method1660(var1, var4);
             }
          }
 
          this.buffer.pos += var3;
          return 0;
       }
    }
 
    method1660(var1, var2) {
       let var4;
       if (var2 == 255) {
          let var7 = this.buffer.readUint8();
          var4 = this.buffer.readVarInt();
          if (var7 == 47) {
             this.buffer.pos += var4;
             return 1;
          } else if (var7 == 81) {
             let var5 = this.buffer.readInt24();
             var4 -= 3;
             let var6 = this.trackLengths[var1];
             this.field2769 += var6 * (this.field2766 - var5);
             this.field2766 = var5;
             this.buffer.pos += var4;
             return 2;
          } else {
             this.buffer.pos += var4;
             return 3;
          }
       } else {
          let var3 = MidiFileReader.field2762[var2 - 128];
          var4 = var2;
          if (var3 >= 1) {
             var4 = var2 | this.buffer.readUint8() << 8;
          }
 
          if (var3 >= 2) {
             var4 |= this.buffer.readUint8() << 16;
          }
 
          return var4;
       }
    }


    getPrioritizedTrack() {
      let var1 = this.trackPositions.length;
      let var2 = -1;
      let var3 = 2147483647;

      for(let var4 = 0; var4 < var1; ++var4) {
         if (this.trackPositions[var4] >= 0 && this.trackLengths[var4] < var3) {
            var2 = var4;
            var3 = this.trackLengths[var4];
         }
      }

      return var2;
   }

    isDone() {
      let var1 = this.trackPositions.length;

      for(let var2 = 0; var2 < var1; ++var2) {
         if (this.trackPositions[var2] >= 0) {
            return false;
         }
      }

      return true;
   }

    reset(var1) {
      this.field2769 = var1;
      let var3 = this.trackPositions.length;

      for(let var4 = 0; var4 < var3; ++var4) {
         this.trackLengths[var4] = 0;
         this.field2765[var4] = 0;
         this.buffer.offset = this.trackStarts[var4];
         this.readTrackLength(var4);
         this.trackPositions[var4] = this.buffer.offset;
      }

   }
}