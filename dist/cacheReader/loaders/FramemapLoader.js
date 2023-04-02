"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FramemapDefinition = void 0;
const Bone_js_1 = __importDefault(require("../cacheTypes/anim/Bone.js"));
class FramemapDefinition {
}
exports.FramemapDefinition = FramemapDefinition;
class AnimayaSkeleton {
    constructor(var1, bonesCount) {
        this.bones = new Array(bonesCount);
        this.field1979 = var1.readUint8();
        for (let i = 0; i < this.bones.length; ++i) {
            this.bones[i] = new Bone_js_1.default(this.field1979, var1, false);
        }
        this.attachBones();
    }
    attachBones() {
        let bones = this.bones;
        for (let i = 0; i < bones.length; ++i) {
            let bone = bones[i];
            if (bone.id >= 0) {
                bone.childBone = this.bones[bone.id];
            }
        }
        this.method1178();
    }
    method1178() {
        let var1 = this.bones;
        for (let var2 = 0; var2 < var1.length; ++var2) {
            let var3 = var1[var2];
            if (var3.id >= 0) {
                var3.field1182 = this.bones[var3.id];
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
class class418 {
    constructor() {
        this.field3780 = 0.0;
        this.field3790 = 0.0;
        this.field3789 = 0.0;
        this.field3788 = 0.0;
        this.field3787 = 0.0;
        this.field3786 = 0.0;
        this.field3783 = 0.0;
        this.field3782 = 0.0;
        this.field3781 = 0.0;
        this.field3791 = 1.0;
        this.field3784 = 1.0;
        this.field3785 = 1.0;
    }
}
class FramemapLoader {
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
exports.default = FramemapLoader;
