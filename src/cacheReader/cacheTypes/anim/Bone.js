import Matrix from "./MatrixTest.js";

export default class Bone {
    field1181 = true;
    field1172 = true;
    field1178 = new Matrix();
    field1180 = new Matrix()
    field1174 = new Matrix();

    constructor(size, buffer, var3) {
        this.id = buffer.readInt16();
        this.field1175 = new Array(size);
        this.field1176 = new Array(size);
        this.field1177 = new Array(size);
        this.field1187 = new Array(size);

        for (let var4 = 0; var4 < size; ++var4) {
            this.field1175[var4] = new Matrix(buffer, var3);

            this.field1187[var4] = new Array(3);
            this.field1187[var4][0] = buffer.readFloat32();
            this.field1187[var4][1] = buffer.readFloat32();
            this.field1187[var4][2] = buffer.readFloat32();

            //this.field1187[var4][0] = buffer.readInt32();
            //this.field1187[var4][1] = buffer.readInt32();
            //this.field1187[var4][2] = buffer.readInt32();
            //console.log(this.field1187[var4][0].toString(2));
            //console.log(this.field1187[var4][1].toString(2));
            //console.log(this.field1187[var4][2].toString(2));
        }
        this.method682();
        //console.log(boneValues);
    }

    method682() {
        this.field1183 = new Array(this.field1175.length).fill().map(x => new Array(3));
        this.field1184 = new Array(this.field1175.length).fill().map(x => new Array(3));
        this.field1185 = new Array(this.field1175.length).fill().map(x => new Array(3));
        let var2 = Matrix.field3746;
        let var1 = new Matrix();

        let var7 = var1;

        for (let var5 = 0; var5 < this.field1175.length; ++var5) {
            let var4 = this.method683(var5);
            var7.copy(var4);
            var7.method2192();
            this.field1183[var5] = var7.method2195();
            this.field1184[var5][0] = var4.matrixVals[12];
            this.field1184[var5][1] = var4.matrixVals[13];
            this.field1184[var5][2] = var4.matrixVals[14];
            this.field1185[var5] = var4.method2194();
        }

        var7.method2200();
    }

    method683(var1) {
        return this.field1175[var1];
    }

    method684(var1) {
        if (this.field1176[var1] == null) {
            this.field1176[var1] = new Matrix(this.method683(var1));
            if (this.field1182 != null) {
                this.field1176[var1].method2189(this.field1182.method684(var1));
            } else {
                this.field1176[var1].method2189(Matrix.field3747);
            }
        }

        return this.field1176[var1];
    }


    method685(var1) {
        if (this.field1177[var1] == null || this.field1177[var1] == undefined) {
            this.field1177[var1] = new Matrix(this.method684(var1));
            this.field1177[var1].method2192();
        }

        return this.field1177[var1];
    }

    method691(var1) {
        this.field1178.copy(var1);
        this.field1172 = true;
        this.field1181 = true;
    }

    method681() {
        return this.field1178;
    }

    method686() {
        if (this.field1172) {
            this.field1180.copy(this.method681());
            if (this.field1182 != null) {
                this.field1180.method2189(this.field1182.method686());
            }

            this.field1172 = false;
        }

        return this.field1180;
    }

    method687(var1) {
        if (this.field1181) {
            this.field1174.copy(this.method685(var1));
            this.field1174.method2189(this.method686());
            this.field1181 = false;
        }

        return this.field1174;
    }

    method688(var1) {
        return this.field1183[var1];
    }

    method689(var1) {
        return this.field1184[var1];
    }

    method690(var1) {
        return this.field1185[var1];
    }

}