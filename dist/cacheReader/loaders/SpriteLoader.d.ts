export class Sprite {
    getWidth(): any;
    getHeight(): any;
    setPixels(pixels: any): void;
    pixels: any;
    createImageUrl(width: any, height: any): Promise<string>;
    createImage(width: any, height: any): Promise<import("canvas").Canvas>;
}
export class SpriteDefinition {
}
export default class SpriteLoader {
    load(bytes: any, id: any): SpriteDefinition;
}
