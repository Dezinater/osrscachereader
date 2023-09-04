import { createCanvas } from "canvas";

const FLAG_VERTICAL = 0b01;
const FLAG_ALPHA = 0b10;
/**
* @class Sprite
* @category Definitions
* @hideconstructor
*/
export class Sprite {
    /** 
    * The ID of this Sprite
    * @type {number} 
    */
    id;

    /** 
    * Frame index for this sprite
    * @type {number} 
    */
    frame;

    /** @type {number} */
    offsetX;

    /** @type {number} */
    offsetY;

    /** @type {number} */
    width;

    /** @type {number} */
    height;

    /** 
     * RGB Pixel data
     * @type {number} 
     */
    pixels = [];

    /** @type {number} */
    maxWidth;

    /** @type {number} */
    maxHeight;

    /** @type {Array<number>} */
    pixelIdx = [];

    /** @type {Array<number>} */
    palette = [];

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    setPixels(pixels) {
        this.pixels = pixels;
    }

    async createImageUrl(width, height) {
        if (width == undefined) width = this.getWidth();
        if (height == undefined) height = this.getHeight();

        return (await this.createImage(width, height)).toDataURL();
    }

    async createImage(width, height) {
        if (width == undefined) width = this.getWidth();
        if (height == undefined) height = this.getHeight();

        const canvas = createCanvas(this.getWidth(), this.getHeight());
        const ctx = canvas.getContext('2d');

        let imageData = this.createImageData(ctx);
        ctx.putImageData(imageData, 0, 0);


        let image = new Image();
        image.src = canvas.toDataURL();

        let loadPromise = new Promise(resolve => {
            image.onload = () => {
                canvas.width = height;
                canvas.height = width;
                ctx.drawImage(image, 0, 0, this.getWidth(), this.getHeight(), 0, 0, width, height);
                resolve(canvas);
            }
        }, reject => { })

        return loadPromise;
    }

    createImageData(ctx) {
        if (ctx == undefined) {
            const canvas = createCanvas(this.getWidth(), this.getHeight());
            ctx = canvas.getContext('2d');
        }

        let imageData = ctx.createImageData(this.getWidth(), this.getHeight());
        for (let i = 0; i < imageData.data.byteLength; i += 4) {
            let pixel = this.pixels[Math.floor(i / 4)];
            imageData.data[i + 0] = (pixel & 0x00ff0000) >> 16;
            imageData.data[i + 1] = (pixel & 0x0000ff00) >> 8;
            imageData.data[i + 2] = pixel & 0x000000ff;
            imageData.data[i + 3] = 254 - ((pixel & 0xff000000) >> 24);
        }

        return imageData;
    }
}

/**
* @class SpriteDefinition
* @category Definitions
* @hideconstructor
*/
export class SpriteDefinition {
    /** 
    * The ID of this Sprite
    * @type {number} 
    */
    id;

    /** 
    * Sprites that make up this SpriteDefinition. There can be multiple sprites for animated SpriteDefinitions.
    * @type {Array<Sprite>} 
    */
    sprites = [];
}
export default class SpriteLoader {

    load(bytes, id) {
        let def = new SpriteDefinition();
        def.id = id;

        let dataview = new DataView(bytes.buffer, 0, bytes.length);
        dataview.setPosition(dataview.byteLength - 2);

        let spriteCount = dataview.readUint16();
        let sprites = new Array(spriteCount);
        def.sprites = sprites;

        dataview.setPosition(dataview.byteLength - 7 - spriteCount * 8);

        let width = dataview.readUint16();
        let height = dataview.readUint16();
        let paletteLength = dataview.readUint8() + 1;

        for (let i = 0; i < spriteCount; ++i) {
            sprites[i] = new Sprite();
            sprites[i].id = id;
            sprites[i].frame = i;
            sprites[i].maxWidth = width;
            sprites[i].maxHeight = height;
        }

        for (let i = 0; i < spriteCount; ++i) {
            sprites[i].offsetX = dataview.readUint16();
        }

        for (let i = 0; i < spriteCount; ++i) {
            sprites[i].offsetY = dataview.readUint16();
        }

        for (let i = 0; i < spriteCount; ++i) {
            sprites[i].width = dataview.readUint16();
        }

        for (let i = 0; i < spriteCount; ++i) {
            sprites[i].height = dataview.readUint16();
        }

        // same as above + 3 bytes for each palette entry, except for the first one (which is transparent)
        dataview.setPosition(dataview.byteLength - 7 - spriteCount * 8 - (paletteLength - 1) * 3);
        let palette = new Array(paletteLength);

        for (let i = 1; i < paletteLength; ++i) {
            palette[i] = dataview.readInt24();

            if (palette[i] == 0) {
                palette[i] = 1;
            }
        }

        dataview.setPosition(0);

        for (let i = 0; i < spriteCount; ++i) {
            let sprite = sprites[i];
            let spriteWidth = sprite.getWidth();
            let spriteHeight = sprite.getHeight();
            let dimension = spriteWidth * spriteHeight;
            let pixelPaletteIndicies = new Array(dimension);
            let pixelAlphas = new Array(dimension);
            sprite.pixelIdx = pixelPaletteIndicies;
            sprite.palette = palette;

            let flags = dataview.readUint8();

            if ((flags & FLAG_VERTICAL) == 0) {
                // read horizontally
                for (let j = 0; j < dimension; ++j) {
                    pixelPaletteIndicies[j] = dataview.readInt8();
                }
            }
            else {
                // read vertically
                for (let j = 0; j < spriteWidth; ++j) {
                    for (let k = 0; k < spriteHeight; ++k) {
                        pixelPaletteIndicies[spriteWidth * k + j] = dataview.readInt8();
                    }
                }
            }

            // read alphas
            if ((flags & FLAG_ALPHA) != 0) {
                if ((flags & FLAG_VERTICAL) == 0) {
                    // read horizontally
                    for (let j = 0; j < dimension; ++j) {
                        pixelAlphas[j] = dataview.readInt8();
                    }
                }
                else {
                    // read vertically
                    for (let j = 0; j < spriteWidth; ++j) {
                        for (let k = 0; k < spriteHeight; ++k) {
                            pixelAlphas[spriteWidth * k + j] = dataview.readInt8();
                        }
                    }
                }
            }
            else {
                // everything non-zero is opaque
                for (let j = 0; j < dimension; ++j) {
                    let index = pixelPaletteIndicies[j];

                    if (index != 0)
                        pixelAlphas[j] = 0xFF;
                }
            }

            let pixels = new Array(dimension);

            // build argb pixels from palette/alphas
            for (let j = 0; j < dimension; ++j) {
                let index = pixelPaletteIndicies[j] & 0xFF;

                pixels[j] = palette[index] | (pixelAlphas[j] << 24);
            }

            sprite.setPixels(pixels);
        }



        //ctx.putImageData
        return def;

    }
}