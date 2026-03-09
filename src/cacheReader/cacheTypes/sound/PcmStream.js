import Node from "../node/Node.js";
export default class PcmStream extends Node {
    after;
    field255;
    sound;
    active = true;

    firstSubStream = () => {};
    nextSubStream = () => {};
 
    fill = (var1, var2, var3) => {};
    skip = (var1) => {};

    update(var1, var2, var3) {
      if (this.active) {
         this.fill(var1, var2, var3);
      } else {
         this.skip(var3);
      }

   }
}
