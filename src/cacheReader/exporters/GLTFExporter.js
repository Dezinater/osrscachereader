import * as base64 from "../helpers/base64"
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

    accessors = [{
        bufferView: 0,
        byteOffset: 0,
        componentType: 5123,
        count: 1934 * 3,
        type: "SCALAR",
        max: [2],
        min: [0]
    },
    {
        bufferView: 1,
        byteOffset: 0,
        componentType: 5126,
        count: 988,
        type: "VEC3",
        max: [1.0, 1.0, 0.0],
        min: [0.0, 0.0, 0.0]
    }];

    asset = {
        version: "2.0"
    };

    addData(indicies, verticies, max, min) {
        let bytes = new Uint8Array([...indicies, ...verticies]);
        let base64String = base64.bytesToBase64(bytes);

        this.buffers.push({
            uri: "data:application/octet-stream;base64," + base64String,
            byteLength: bytes.length,
        });

        this.bufferViews.push(
            {
                buffer: 0,
                byteOffset: 0,
                byteLength: indicies.length,
                target: 34963
            },
            {
                buffer: 0,
                byteOffset: indicies.length,
                byteLength: verticies.length,
                target: 34962
            }
        );

        this.accessors[0].max = [(verticies.length / 3 / 4) - 1]; //3 floats per vec
        this.accessors[1].min = min;
        this.accessors[1].max = max;
    }
}

export default class GLTFExporter {

    constructor() {

    }

    export(indicies, verticies, max, min) {
        let file = new GLTFFile();
        file.addData(indicies, verticies, max, min);
        return JSON.stringify(file);
    }

}