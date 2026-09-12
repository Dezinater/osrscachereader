export default class EntityOpsLoader {
    static decodeOp(ops, dataview, index) {
        ops[index] = dataview.readString();
    }

    static decodeSubOp(ops, dataview) {
        let index = dataview.readUint8();
        ops[index] = { subID: is.readUint8(), text: is.readString() };
    }

    static decodeConditionalOp(ops, dataview) {
        let index = dataview.readUint8();
        ops[index] = {
            varp: dataview.readUint16(),
            varb: dataview.readUint16(),
            min: dataview.readInt32(),
            max: dataview.readInt32(),
            text: dataview.readString(),
        };
    }

    static decodeConditionalSubOp(ops, dataview) {
		let index = dataview.readUint8();
        ops[index] = {
            subID: dataview.readUint16(),
            varp: dataview.readUint16(),
            varb: dataview.readUint16(),
            min: dataview.readInt32(),
            max: dataview.readInt32(),
            text: dataview.readString(),
        };
    }
}