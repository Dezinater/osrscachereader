import * as base64 from "../helpers/base64.js"
import { isBrowser } from "browser-or-node";

class GLTFFile {
    //Basically just setting it up for 1 model
    scene = 0;
    scenes = [
        { nodes: [0] }
    ];

    nodes = [{ mesh: 0 }];

    meshes = [
        {
            primitives: [{
                attributes: {
                    POSITION: 1
                },
                indices: 0,
            }]
        }
    ];

    buffers = [];
    bufferViews = [];

    accessors = [];

    asset = {
        version: "2.0"
    };

    addIndicies(indicies) {
        let indicesBytes = new Uint8Array(new Uint16Array(indicies.flat()).buffer)
        let buffersAmount = this.buffers.length;
        this.buffers.push({
            uri: "data:application/octet-stream;base64," + base64.bytesToBase64(indicesBytes),
            byteLength: indicesBytes.length,
        });

        this.bufferViews.push({
            buffer: buffersAmount,
            byteOffset: 0,
            byteLength: indicesBytes.length,
            target: 34963
        });

        let max = indicies.flat().reduce((max, current) => Math.max(max, current));
        this.accessors.push({
            bufferView: 0,
            byteOffset: 0,
            componentType: 5123,
            count: indicesBytes.length / 2,
            type: "SCALAR",
            max: [max],
            min: [0]
        });
    }

    addVerticies(verticies) {
        let max = [0, 0, 0];
        let min = [0, 0, 0];
        for (let i = 0; i < verticies.length; i++) {
            max = [Math.max(max[0], verticies[i][0]), Math.max(max[1], verticies[i][1]), Math.max(max[2], verticies[i][2])];
            min = [Math.min(min[0], verticies[i][0]), Math.min(min[1], verticies[i][1]), Math.min(min[2], verticies[i][2])];
        }

        let verticiesBytes = new Uint8Array(new Float32Array(verticies.flat()).buffer)


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
            min
        });
    }

    addMorphTarget(verticies) {
        //verticies.forEach(x => x[2] *= -1);
        let max = [0, 0, 0];
        let min = [0, 0, 0];
        for (let i = 0; i < verticies.length; i++) {
            max = [Math.max(max[0], verticies[i][0]), Math.max(max[1], verticies[i][1]), Math.max(max[2], verticies[i][2])];
            min = [Math.min(min[0], verticies[i][0]), Math.min(min[1], verticies[i][1]), Math.min(min[2], verticies[i][2])];
        }

        let verticiesBytes = new Uint8Array(new Float32Array(verticies.flat()).buffer)

        if (!("targets" in this.meshes[0].primitives[0])) {
            this.meshes[0].primitives[0].targets = [];
            this.meshes[0].weights = [];
        }

        const morphTargetsAmount = this.meshes[0].primitives[0].targets.length;

        if (this.meshes[0].weights.length == 0) {
            this.meshes[0].weights.push(1);
        } else {
            this.meshes[0].weights.push(0);
        }
        this.meshes[0].primitives[0].targets.push({ "POSITION": morphTargetsAmount + 2 });

        this.buffers.push({
            uri: "data:application/octet-stream;base64," + base64.bytesToBase64(verticiesBytes),
            byteLength: verticiesBytes.length,
        });
        this.bufferViews.push({
            buffer: morphTargetsAmount + 2,
            byteOffset: 0,
            byteLength: verticiesBytes.length,
            target: 34962
        });

        this.accessors.push({
            bufferView: morphTargetsAmount + 2,
            byteOffset: 0,
            componentType: 5126,
            count: verticies.length,
            type: "VEC3",
            max,
            min
        })
    }

}

export default class GLTFExporter {

    verticies = [];

    //exporter should be used to make helper functions to convert from rs def to gltffile
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
        
        this.file.addMorphTarget(morphVertices);
    }

    export() {
        return JSON.stringify(this.file);
    }

}