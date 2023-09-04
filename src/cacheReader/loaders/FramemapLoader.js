import Bone from "../cacheTypes/anim/Bone.js";

/**
* @class FramemapDefinition
* @category Definitions
* @hideconstructor
*/
export class FramemapDefinition {
    id

    /** @type {Byte} */
    length

    /** @type {Array<number>} */
    types

    /** @type {Array<number>} */
    frameMaps

    /** @type {AnimayaSkeleton} */
    animayaSkeleton
}


class AnimayaSkeleton {
    constructor(dataview, bonesCount) {
        this.bones = new Array(bonesCount);
        this.numMatrices = dataview.readUint8();

        for (let i = 0; i < this.bones.length; ++i) {
            this.bones[i] = new Bone(this.numMatrices, dataview);
        }

        this.attachBones();
    }

    attachBones() {
        for (let i = 0; i < this.bones.length; ++i) {
            let bone = this.bones[i];
            if (bone.id >= 0) {
                bone.parentBone = this.bones[bone.id];
            }
        }
    }

    getBone(index) {
        return index >= this.bones.length ? null : this.bones[index];
    }

    getAllBones() {
        return this.bones;
    }
}

export default class FramemapLoader {

    load(bytes, id) {
        let def = new FramemapDefinition();
        def.id = id;
        let dataview = new DataView(bytes.buffer);
        def.length = dataview.readUint8();
        def.types = [];
        def.frameMaps = [];

        for (let i = 0; i < def.length; ++i) {
            def.types[i] = dataview.readUint8();
        }

        for (let i = 0; i < def.length; ++i) {
            def.frameMaps[i] = new Array(dataview.readUint8());
        }

        for (let i = 0; i < def.length; ++i) {
            for (let j = 0; j < def.frameMaps[i].length; ++j) {
                def.frameMaps[i][j] = dataview.readUint8();
            }
        }

        if (dataview.getPosition() < dataview.byteLength) {
            let var4 = dataview.readUint16();
            if (var4 > 0) {
                //console.log(id);
                def.animayaSkeleton = new AnimayaSkeleton(dataview, var4);
                //console.log(dataview);
            }
        }
        return def;
    }
}