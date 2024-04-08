import * as base64 from "../helpers/base64.js";

import { createCanvas } from "canvas";

function HSVtoRGB(h, s, v) {
    let r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        (s = h.s), (v = h.v), (h = h.h);
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0:
            (r = v), (g = t), (b = p);
            break;
        case 1:
            (r = q), (g = v), (b = p);
            break;
        case 2:
            (r = p), (g = v), (b = t);
            break;
        case 3:
            (r = p), (g = q), (b = v);
            break;
        case 4:
            (r = t), (g = p), (b = v);
            break;
        case 5:
            (r = v), (g = p), (b = q);
            break;
    }
    //IT MUST BE * 255 AND ROUNDED INORDER TO GET THE CORRECT NUMBERS
    return [
        Math.round(r * 255) / 255,
        Math.round(g * 255) / 255,
        Math.round(b * 255) / 255,
    ];
}

const BRIGHTNESS_MAX = 0.6;
const HUE_OFFSET = 0.5 / 64;
const SATURATION_OFFSET = 0.5 / 8;

function unpackHue(hsl) {
    return (hsl >> 10) & 63;
}

function unpackSaturation(hsl) {
    return (hsl >> 7) & 7;
}

function unpackLuminance(hsl) {
    return hsl & 127;
}

function HSLtoRGB(hsl, brightness) {
    let hue = unpackHue(hsl) / 64 + HUE_OFFSET;
    let saturation = unpackSaturation(hsl) / 8 + SATURATION_OFFSET;
    let luminance = unpackLuminance(hsl) / 128;

    let chroma = (1 - Math.abs(2 * luminance - 1)) * saturation;
    let x = chroma * (1 - Math.abs(((hue * 6) % 2) - 1));
    let lightness = luminance - chroma / 2;

    let r = lightness,
        g = lightness,
        b = lightness;

    switch (parseInt(hue * 6)) {
        case 0:
            r += chroma;
            g += x;
            break;
        case 1:
            g += chroma;
            r += x;
            break;
        case 2:
            g += chroma;
            b += x;
            break;
        case 3:
            b += chroma;
            g += x;
            break;
        case 4:
            b += chroma;
            r += x;
            break;
        default:
            r += chroma;
            b += x;
            break;
    }

    let rgb =
        (parseInt(r * 256.0) << 16) |
        (parseInt(g * 256.0) << 8) |
        parseInt(b * 256.0);

    rgb = adjustForBrightness(rgb, brightness);

    if (rgb == 0) {
        rgb = 1;
    }
    return rgb;
}

function adjustForBrightness(rgb, brightness) {
    let r = (rgb >> 16) / 256.0;
    let g = ((rgb >> 8) & 255) / 256.0;
    let b = (rgb & 255) / 256.0;

    r = Math.pow(r, brightness);
    g = Math.pow(g, brightness);
    b = Math.pow(b, brightness);

    return (
        (parseInt(r * 256.0) << 16) |
        (parseInt(g * 256.0) << 8) |
        parseInt(b * 256.0)
    );
}

class GLTFFile {
    //Basically just setting it up for 1 model
    scene = 0;
    scenes = [{ nodes: [0] }];

    nodes = [{ mesh: 0 }];

    meshes = [{ primitives: [] }];

    textures = [];
    images = [];
    samplers = [];
    materials = [];
    animations = [];

    buffers = [];
    bufferViews = [];

    accessors = [];

    asset = {
        version: "2.0",
    };

    addIndicies(indicies) {
        let indicesBytes = new Uint8Array(
            new Uint16Array(indicies.flat()).buffer
        );
        let buffersAmount = this.buffers.length;
        this.buffers.push({
            uri:
                "data:application/octet-stream;base64," +
                base64.bytesToBase64(indicesBytes),
            byteLength: indicesBytes.length,
        });

        this.bufferViews.push({
            buffer: buffersAmount,
            byteOffset: 0,
            byteLength: indicesBytes.length,
            target: 34963,
        });

        let max = indicies
            .flat()
            .reduce((max, current) => Math.max(max, current));
        this.accessors.push({
            bufferView: 0,
            byteOffset: 0,
            componentType: 5123,
            count: indicesBytes.length / 2,
            type: "SCALAR",
            max: [max],
            min: [0],
        });
    }

    addVerticies(verticies) {
        this.meshes[0].primitives.push({
            attributes: {
                POSITION: this.buffers.length,
            },
        });
        let max = [0, 0, 0];
        let min = [0, 0, 0];
        for (let i = 0; i < verticies.length; i++) {
            max = [
                Math.max(max[0], verticies[i][0]),
                Math.max(max[1], verticies[i][1]),
                Math.max(max[2], verticies[i][2]),
            ];
            min = [
                Math.min(min[0], verticies[i][0]),
                Math.min(min[1], verticies[i][1]),
                Math.min(min[2], verticies[i][2]),
            ];
        }

        let verticiesBytes = new Uint8Array(
            new Float32Array(verticies.flat()).buffer
        );

        let buffersAmount = this.buffers.length;
        this.buffers.push({
            uri:
                "data:application/octet-stream;base64," +
                base64.bytesToBase64(verticiesBytes),
            byteLength: verticiesBytes.length,
        });

        this.bufferViews.push({
            buffer: buffersAmount,
            byteOffset: 0,
            byteLength: verticiesBytes.length,
        });

        this.accessors.push({
            bufferView: buffersAmount,
            byteOffset: 0,
            componentType: 5126,
            count: verticies.length,
            type: "VEC3",
            max,
            min,
        });
    }

    addMorphTarget(verticies, primitive) {
        let max = [verticies[0][0], verticies[0][1], verticies[0][2]];
        let min = [verticies[0][0], verticies[0][1], verticies[0][2]];
        for (let i = 0; i < verticies.length; i++) {
            max = [
                Math.max(max[0], verticies[i][0]),
                Math.max(max[1], verticies[i][1]),
                Math.max(max[2], verticies[i][2]),
            ];
            min = [
                Math.min(min[0], verticies[i][0]),
                Math.min(min[1], verticies[i][1]),
                Math.min(min[2], verticies[i][2]),
            ];
        }

        let verticiesBytes = new Uint8Array(
            new Float32Array(verticies.flat()).buffer
        );

        if (!("targets" in this.meshes[0].primitives[primitive])) {
            this.meshes[0].primitives[primitive].targets = [];
            this.meshes[0].weights = [];
        }

        let buffersAmount = this.buffers.length;

        if (this.meshes[0].weights.length == 0) {
            this.meshes[0].weights.push(1);
        } else {
            this.meshes[0].weights.push(0);
        }
        this.meshes[0].primitives[primitive].targets.push({
            POSITION: buffersAmount,
        });

        this.buffers.push({
            uri:
                "data:application/octet-stream;base64," +
                base64.bytesToBase64(verticiesBytes),
            byteLength: verticiesBytes.length,
        });
        this.bufferViews.push({
            buffer: buffersAmount,
            byteOffset: 0,
            byteLength: verticiesBytes.length,
            target: 34962,
        });

        this.accessors.push({
            bufferView: buffersAmount,
            byteOffset: 0,
            componentType: 5126,
            count: verticies.length,
            type: "VEC3",
            max,
            min,
        });

        //animations needs to be adjusted if more morph targets are added after anims
    }

    addAnimation(targets, lengths, morphTargetsAmount) {
        targets = targets.map((x) => {
            let oneHot = new Array(morphTargetsAmount).fill(0);
            oneHot[x] = 1;
            return oneHot;
        }); //one hot encoding

        let targetBytes = new Uint8Array(
            new Float32Array(targets.flat()).buffer
        );
        let lengthsBytes = new Uint8Array(new Float32Array(lengths).buffer);

        let mergedBytes = new Uint8Array(
            lengthsBytes.length + targetBytes.length
        );
        mergedBytes.set(lengthsBytes);
        mergedBytes.set(targetBytes, lengthsBytes.length);

        let buffersAmount = this.buffers.length;
        this.buffers.push({
            uri:
                "data:application/octet-stream;base64," +
                base64.bytesToBase64(mergedBytes),
            byteLength: mergedBytes.length,
        });

        this.bufferViews.push({
            buffer: buffersAmount,
            byteOffset: 0,
            byteLength: lengthsBytes.length,
        });

        this.bufferViews.push({
            buffer: buffersAmount,
            byteOffset: lengthsBytes.length,
            byteLength: targetBytes.length,
        });

        let max = lengths[0];
        let min = lengths[0];
        for (let i = 0; i < lengths.length; i++) {
            max = Math.max(max, lengths[i]);
            min = Math.min(min, lengths[i]);
        }

        let accessorsLength = this.accessors.length;
        this.accessors.push({
            bufferView: this.bufferViews.length - 2,
            byteOffset: 0,
            componentType: 5126,
            count: targets.length,
            type: "SCALAR",
            max: [max],
            min: [min],
        });

        this.accessors.push({
            bufferView: this.bufferViews.length - 1,
            byteOffset: 0,
            componentType: 5126,
            count: morphTargetsAmount * targets.length,
            type: "SCALAR",
            max: [1.0],
            min: [0.0],
        });

        let animationsLength = this.animations.length;
        this.animations.push({
            samplers: [
                {
                    input: accessorsLength,
                    interpolation: "STEP",
                    output: accessorsLength + 1,
                },
            ],
            channels: [
                {
                    sampler: 0,
                    target: {
                        node: 0,
                        path: "weights",
                    },
                },
            ],
        });
    }

    addColors(uvs, colorPalettePng, primitive, transparent = false) {
        let uvBytes = new Uint8Array(new Float32Array(uvs.flat()).buffer);

        const texturesAmount = this.textures.length;
        this.textures.push({
            source: texturesAmount,
            sampler: texturesAmount,
        });

        this.images.push({
            uri: colorPalettePng,
        });

        this.samplers.push({
            magFilter: 9728,
            minFilter: 9987,
            wrapS: 33648,
            wrapT: 33648,
        });

        this.materials.push({
            ...(transparent && { alphaMode: "BLEND" }),
            pbrMetallicRoughness: {
                baseColorTexture: {
                    index: 0,
                },
                metallicFactor: 0.0,
                roughnessFactor: 1.0,
            },
        });

        let buffersAmount = this.buffers.length;
        this.buffers.push({
            uri:
                "data:application/gltf-buffer;base64," +
                base64.bytesToBase64(uvBytes),
            byteLength: uvBytes.length,
        });

        this.bufferViews.push({
            buffer: buffersAmount,
            byteOffset: 0,
            target: 34962,
            byteLength: uvBytes.length,
        });

        let min = [1.0, 1.0];
        let max = [0.0, 0.0];
        for (let i = 0; i < uvs.length; i++) {
            max = [Math.max(max[0], uvs[i][0]), Math.max(max[1], uvs[i][1])];
            min = [Math.min(min[0], uvs[i][0]), Math.min(min[1], uvs[i][1])];
        }
        this.accessors.push({
            bufferView: buffersAmount,
            byteOffset: 0,
            componentType: 5126,
            count: uvs.length,
            type: "VEC2",
            max,
            min,
        });

        this.meshes[0].primitives[primitive].attributes.TEXCOORD_0 =
            this.accessors.length - 1;
        this.meshes[0].primitives[primitive].material =
            this.materials.length - 1;
    }
}

export default class GLTFExporter {
    // regular (non-alpha) vertices
    verticies = [];
    // regular (non-alpha) faces
    faces = [];
    alphaVertices = [];
    alphaFaces = [];
    morphTargetsAmount = 0;

    /**
     * mapping of original vertex ID to new vertex IDs
     * if alpha is true, it refers to the position in this.alphaVertices, otherwise this.verticies
     * @type {[id: number]: {idx: number, alpha: boolean}[]}
     */
    remappedVertices = {};

    constructor(def) {
        this.file = new GLTFFile();

        this.verticies = [];
        this.alphaVertices = [];

        // n.b. we reorder the vertices by faces. this duplicates all of the vertices but allows us to
        // apply per-face textures/colours and removes the need for indices.
        for (let i = 0; i < def.faceVertexIndices1.length; i++) {
            const isAlpha = def.faceAlphas[i] > 0;
            const dest = isAlpha ? this.alphaVertices : this.verticies;
            if (isAlpha) {
                this.alphaFaces.push(i);
            } else {
                this.faces.push(i);
            }
            const v1 = def.faceVertexIndices1[i];
            const v2 = def.faceVertexIndices2[i];
            const v3 = def.faceVertexIndices3[i];
            const faceVertices = [v1, v2, v3];
            faceVertices.forEach((idx, pos) => {
                dest.push([
                    def.vertexPositionsX[idx],
                    -def.vertexPositionsY[idx],
                    -def.vertexPositionsZ[idx],
                ]);
                if (!(idx in this.remappedVertices)) {
                    this.remappedVertices[idx] = [];
                }
                // maintain a multimap of original vertex ID to where they are now in the destination vertex array.
                this.remappedVertices[idx].push({
                    idx: dest.length - 1,
                    alpha: isAlpha,
                });
            });
        }
        this.file.addVerticies(this.verticies);
        if (this.alphaVertices.length > 0) {
			this.file.addVerticies(this.alphaVertices);
		}
    }

    addMorphTarget(morphVertices) {
        let newMorphVertices = [];
        let newAlphaMorphVertices = [];
        for (let i = 0; i < morphVertices.length; i++) {
            const realVertices = this.remappedVertices[i];
            for (const { idx: newIdx, alpha } of realVertices) {
                const src = alpha ? this.alphaVertices : this.verticies;
                const dest = alpha ? newAlphaMorphVertices : newMorphVertices;
                dest[newIdx] = [];
                dest[newIdx][0] = morphVertices[i][0] - src[newIdx][0];
                dest[newIdx][1] = morphVertices[i][1] - src[newIdx][1];
                dest[newIdx][2] = morphVertices[i][2] - src[newIdx][2];
            }
        }

        this.morphTargetsAmount++;
        this.file.addMorphTarget(newMorphVertices, 0);
        if (this.alphaVertices.length > 0) {
        	this.file.addMorphTarget(newAlphaMorphVertices, 1);
		}
    }

    addAnimation(def) {
        let frames = def.frameIDs.map((x) => x & 65535);
        let lengths = Object.assign([], def.frameLengths);
        for (let i = 1; i < lengths.length; i++) {
            lengths[i] += lengths[i - 1];
        }
        lengths = lengths.map((x) => x / 50);
        this.file.addAnimation(frames, lengths, this.morphTargetsAmount);
    }

    addColors(def) {
        const seenColors = {};
        const colorToPaletteIndex = {};
        const order = [];
        const combineColorAndAlpha = (color, alpha) =>
            color | ((Math.max(0, alpha) & 0xff) << 24);
        for (let i = 0; i < def.faceColors.length; ++i) {
            const lookupIndex = combineColorAndAlpha(
                def.faceColors[i],
                def.faceAlphas[i]
            );
            // ensure unique color + alpha combinations
            if (seenColors[lookupIndex]) {
                continue;
            }
            let rscolor = def.faceColors[i];
            let color = HSLtoRGB(rscolor, BRIGHTNESS_MAX);
            let r = ((color >> 16) & 0xff) / 255.0;
            let g = ((color >> 8) & 0xff) / 255.0;
            let b = (color & 0xff) / 255.0;
            let a = def.faceAlphas[i];
            let rscolorWithAlpha = combineColorAndAlpha(
                color,
                def.faceAlphas[i]
            );
            console.log(`rscolor ${rscolor} rgb ${r} ${g} ${b} ${a}`);
            seenColors[lookupIndex] = color;
            colorToPaletteIndex[lookupIndex] = order.length;
            order.push(rscolorWithAlpha);
        }
        const numUniqueColors = Object.keys(seenColors).length;
        // create a texture for the face colors
        const pSize = 16;
        const canvas = createCanvas(numUniqueColors * pSize, pSize, "png");
        const ctx = canvas.getContext("2d");
        let xx = 0;
        for (const value of order) {
            const a = (value >> 24) & 0xff;
            let r = (value >> 16) & 0xff;
            let g = (value >> 8) & 0xff;
            let b = value & 0xff;
            let alpha = 1 - a / 255;
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
            console.log(`rgba ${r} ${g} ${b} ${alpha}`);
            ctx.fillRect(xx, 0, pSize, pSize);
            xx += pSize;
        }
        const colorPalettePng = canvas.toDataURL();

        let normalUvs = new Array(this.verticies.length);
        let alphaUvs = new Array(this.alphaVertices.length);
        const half = 1 / numUniqueColors / 2;
        for (let i = 0; i < this.faces.length; i++) {
            let faceId = this.faces[i];
            const faceColor = def.faceColors[faceId];
            const faceAlpha = def.faceAlphas[faceId];
            const lookupKey = combineColorAndAlpha(faceColor, faceAlpha);
            const paletteIndex = colorToPaletteIndex[lookupKey];
            normalUvs[i * 3] = [paletteIndex / numUniqueColors + half, 0.33];
            normalUvs[i * 3 + 1] = [paletteIndex / numUniqueColors + half, 0.5];
            normalUvs[i * 3 + 2] = [
                paletteIndex / numUniqueColors + half,
                0.66,
            ];
        }
        for (let i = 0; i < this.alphaFaces.length; i++) {
            let faceId = this.alphaFaces[i];
            const faceColor = def.faceColors[faceId];
            const faceAlpha = def.faceAlphas[faceId];
            const lookupKey = combineColorAndAlpha(faceColor, faceAlpha);
            const paletteIndex = colorToPaletteIndex[lookupKey];
            alphaUvs[i * 3] = [paletteIndex / numUniqueColors + half, 0.33];
            alphaUvs[i * 3 + 1] = [paletteIndex / numUniqueColors + half, 0.5];
            alphaUvs[i * 3 + 2] = [paletteIndex / numUniqueColors + half, 0.66];
        }
        this.file.addColors(normalUvs, colorPalettePng, 0);
        if (this.alphaVertices.length > 0) {
        	this.file.addColors(alphaUvs, colorPalettePng, 1, true);
		}
    }

    export() {
        return JSON.stringify(this.file);
    }
}
