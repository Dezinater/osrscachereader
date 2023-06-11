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

        this.accessors.push({
            bufferView: 0,
            byteOffset: 0,
            componentType: 5123,
            count: indicesBytes.length / 2,
            type: "SCALAR",
            max: [2],
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
            target: 34962
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
        this.accessors[0].max = [(verticiesBytes.length / 3 / 4) - 1]; //3 floats per vec
    }

    addMorphTarget(verticies) {
        if (!("targets" in this.meshes[0].primitives[0])) {
            this.meshes[0].primitives[0].targets = [];
        }

        const morphTargetsAmount = this.meshes[0].primitives[0].targets.length;
        this.meshes[0].primitives[0].targets.push({ "POSITION": morphTargetsAmount + 2 });

        this.buffers.push({
            uri: "data:application/octet-stream;base64," + base64.bytesToBase64(verticies),
            byteLength: verticies.length,
        });
        this.bufferViews.push({
            buffer: morphTargetsAmount + 2,
            byteOffset: 0,
            byteLength: verticies.length,
        });
    }

}

export default class GLTFExporter {

    //exporter should be used to make helper functions to convert from rs def to gltffile
    constructor() {
        this.file = new GLTFFile();
    }

    export(indicies, verticies) {
        this.file.addIndicies(indicies);
        this.file.addVerticies(verticies);
        console.log(this.file);
        return JSON.stringify(this.file);
    }

}