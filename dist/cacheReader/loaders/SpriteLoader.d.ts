export class Sprite {
    getWidth(): any;
    getHeight(): any;
    setPixels(pixels: any): void;
    pixels: any;
    createImageUrl(width: any, height: any): Promise<any>;
    createImage(width: any, height: any): Promise<any>;
    createImageData(ctx: any): any;
}
export class SpriteDefinition {
}
export default class SpriteLoader {
    load(bytes: any, id: any): SpriteDefinition;
}
