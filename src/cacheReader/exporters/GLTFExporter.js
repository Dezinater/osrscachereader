import * as base64 from "../helpers/base64.js";
import { isBrowser } from "browser-or-node";

class GLTFFile {
    //Basically just setting it up for 1 model
    scene = 0;
    scenes = [{ nodes: [0] }];

    nodes = [{ mesh: 0 }];

    meshes = [
        {
            primitives: [
                {
                    attributes: {
                        POSITION: 1,
                    },
                    indices: 0,
                },
            ],
        },
    ];

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
        let indicesBytes = new Uint8Array(new Uint16Array(indicies.flat()).buffer);
        let buffersAmount = this.buffers.length;
        this.buffers.push({
            uri: "data:application/octet-stream;base64," + base64.bytesToBase64(indicesBytes),
            byteLength: indicesBytes.length,
        });

        this.bufferViews.push({
            buffer: buffersAmount,
            byteOffset: 0,
            byteLength: indicesBytes.length,
            target: 34963,
        });

        let max = indicies.flat().reduce((max, current) => Math.max(max, current));
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

        let verticiesBytes = new Uint8Array(new Float32Array(verticies.flat()).buffer);

        let buffersAmount = this.buffers.length;
        this.buffers.push({
            uri: "data:application/octet-stream;base64," + base64.bytesToBase64(verticiesBytes),
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

    addMorphTarget(verticies) {
        //verticies.forEach(x => x[2] *= -1);
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

        let verticiesBytes = new Uint8Array(new Float32Array(verticies.flat()).buffer);

        if (!("targets" in this.meshes[0].primitives[0])) {
            this.meshes[0].primitives[0].targets = [];
            this.meshes[0].weights = [];
        }

        let buffersAmount = this.buffers.length;

        if (this.meshes[0].weights.length == 0) {
            this.meshes[0].weights.push(1);
        } else {
            this.meshes[0].weights.push(0);
        }
        this.meshes[0].primitives[0].targets.push({ POSITION: buffersAmount });

        this.buffers.push({
            uri: "data:application/octet-stream;base64," + base64.bytesToBase64(verticiesBytes),
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

        let targetBytes = new Uint8Array(new Float32Array(targets.flat()).buffer);
        let lengthsBytes = new Uint8Array(new Float32Array(lengths).buffer);

        let mergedBytes = new Uint8Array(lengthsBytes.length + targetBytes.length);
        mergedBytes.set(lengthsBytes);
        mergedBytes.set(targetBytes, lengthsBytes.length);

        let buffersAmount = this.buffers.length;
        this.buffers.push({
            uri: "data:application/octet-stream;base64," + base64.bytesToBase64(mergedBytes),
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

    addColors(uvs) {
        let uvBytes = new Uint8Array(new Float32Array(uvs.flat()).buffer);

        const texturesAmount = this.textures.length;
        this.textures.push({
            source: texturesAmount,
            sampler: texturesAmount,
        });

        this.images.push({
            uri: `data:image/png;base64,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`,
        });

        this.samplers.push({
            magFilter: 9729,
            minFilter: 9987,
            wrapS: 33648,
            wrapT: 33648,
        });

        this.materials.push({
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
            uri: "data:application/gltf-buffer;base64," + base64.bytesToBase64(uvBytes),
            byteLength: uvBytes.length,
        });

        this.bufferViews.push({
            buffer: buffersAmount,
            byteOffset: 0,
            target: 34962,
            byteLength: uvBytes.length,
        });

        this.accessors.push({
            bufferView: buffersAmount,
            byteOffset: 0,
            componentType: 5126,
            count: uvs.length,
            type: "VEC2",
            max: [1.0, 1.0],
            min: [0.0, 0.0],
        });

        this.meshes[0].primitives[0].attributes.TEXCOORD_0 = this.accessors.length - 1;
        this.meshes[0].primitives[0].material = 0;
    }
}

export default class GLTFExporter {
    verticies = [];
    morphTargetsAmount = 0;

    constructor(def) {
        this.file = new GLTFFile();

        this.verticies = [];
        for (let i = 0; i < def.vertexPositionsX.length; i++) {
            this.verticies.push([def.vertexPositionsX[i], -def.vertexPositionsY[i], -def.vertexPositionsZ[i]]);
        }

        let indicies = [];
        for (let i = 0; i < def.faceVertexIndices1.length; i++) {
            indicies.push([def.faceVertexIndices1[i], def.faceVertexIndices2[i], def.faceVertexIndices3[i]]);
        }

        this.file.addIndicies(indicies);
        this.file.addVerticies(this.verticies);
    }

    addMorphTarget(morphVertices) {
        for (let i = 0; i < morphVertices.length; i++) {
            morphVertices[i][0] -= this.verticies[i][0];
            morphVertices[i][1] -= this.verticies[i][1];
            morphVertices[i][2] -= this.verticies[i][2];
        }

        this.morphTargetsAmount++;
        this.file.addMorphTarget(morphVertices);
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
        let uvs = new Array(988).fill().map((x) => [Math.random(), Math.random()]);
        uvs[0] = [1, 1];
        uvs[1] = [0, 0];
        this.file.addColors(uvs);
    }

    export() {
        return JSON.stringify(this.file);
    }
}
