export class Sprite {
    getWidth(): any;
    getHeight(): any;
    setPixels(pixels: any): void;
    pixels: any;
    createImageUrl(): string;
    createImage(): import("canvas").Canvas;
}
export class SpriteDefinition {
}
export default class SpriteLoader {
    load(bytes: any, id: any): SpriteDefinition;
}
