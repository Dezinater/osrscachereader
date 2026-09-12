export default class Node {
    key;
    previous;
    next;

    remove() {
      if (this.next != null) {
         this.next.previous = this.previous;
         this.previous.next = this.next;
         this.previous = null;
         this.next = null;
      }
   }

    hasNext() {
      return this.next != null;
   }
}
