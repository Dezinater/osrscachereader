import Matrix from "./Matrix.js";

export default class Bone {
    field1181 = true;
    transformUpdated = true;
    field1178 = new Matrix();
    field1180 = new Matrix();
    field1174 = new Matrix();

    constructor(size, dataview) {
        this.id = dataview.readInt16();
        this.matricies = new Array(size);
        this.field1176 = new Array(size);
        this.field1177 = new Array(size);
        this.field1187 = new Array(size);

        for (let i = 0; i < size; ++i) {
            this.matricies[i] = new Matrix(dataview, false);

            this.field1187[i] = new Array(3);
            this.field1187[i][0] = dataview.readFloat32();
            this.field1187[i][1] = dataview.readFloat32();
            this.field1187[i][2] = dataview.readFloat32();
        }
        this.init();
    }

    init() {
        this.rotations = new Array(this.matricies.length).fill().map((x) => new Array(3));
        this.translations = new Array(this.matricies.length).fill().map((x) => new Array(3));
        this.vectorMagnitudes = new Array(this.matricies.length).fill().map((x) => new Array(3));
        let var7 = new Matrix();

        for (let i = 0; i < this.matricies.length; ++i) {
            let var4 = this.getMatrix(i);
            var7.copy(var4);
            var7.inverse();
            this.rotations[i] = var7.getRotation();
            this.translations[i][0] = var4.matrixVals[12];
            this.translations[i][1] = var4.matrixVals[13];
            this.translations[i][2] = var4.matrixVals[14];
            this.vectorMagnitudes[i] = var4.getVectorMagnitudes();
        }
    }

    getMatrix(index) {
        return this.matricies[index];
    }

    method684(var1) {
        if (this.field1176[var1] == null) {
            this.field1176[var1] = new Matrix(this.getMatrix(var1));
            if (this.parentBone != null) {
                this.field1176[var1].multiply(this.parentBone.method684(var1));
            } else {
                this.field1176[var1].multiply(Matrix.field3747);
            }
        }

        return this.field1176[var1];
    }

    method685(var1) {
        if (this.field1177[var1] == null || this.field1177[var1] == undefined) {
            this.field1177[var1] = new Matrix(this.method684(var1));
            this.field1177[var1].inverse();
        }

        return this.field1177[var1];
    }

    copy(var1) {
        this.field1178.copy(var1);
        this.transformUpdated = true;
        this.field1181 = true;
    }

    method681() {
        return this.field1178;
    }

    getTransform() {
        if (this.transformUpdated) {
            this.field1180.copy(this.method681());
            if (this.parentBone != null) {
                this.field1180.multiply(this.parentBone.getTransform());
            }

            this.transformUpdated = false;
        }

        return this.field1180;
    }

    method687(var1) {
        if (this.field1181) {
            this.field1174.copy(this.method685(var1));
            this.field1174.multiply(this.getTransform());
            this.field1181 = false;
        }

        return this.field1174;
    }

    getRotation(index) {
        return this.rotations[index];
    }

    getTranslation(index) {
        return this.translations[index];
    }

    getVectorMagnitudes(index) {
        return this.vectorMagnitudes[index];
    }
}
