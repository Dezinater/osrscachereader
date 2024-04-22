DataView.prototype.addPosition = function (pos) {
    if (this.pos == undefined) this.setPosition(0);

    this.setPosition(this.getPosition() + pos);
};

DataView.prototype.setPosition = function (pos) {
    //if(pos < 0)
    //	throw "Stream read position cannot be less than 0";

    this.pos = pos;
};

DataView.prototype.getPosition = function () {
    if (this.pos == undefined) this.setPosition(0);

    return this.pos;
};

DataView.prototype.write = function (func, size) {
    //console.log(this.getPosition())
    try {
        func();
    } catch (error) {
        throw error;
    }

    this.addPosition(size);
    return true;
};

DataView.prototype.writeUint8 = function (data) {
    this.write(() => this.setUint8(this.getPosition(), data), 1);
};
DataView.prototype.writeUint16 = function (data) {
    this.write(() => this.setUint16(this.getPosition(), data), 2);
};
DataView.prototype.writeUint32 = function (data) {
    this.write(() => this.setUint32(this.getPosition(), data), 4);
};

DataView.prototype.writeInt8 = function (data) {
    this.write(() => this.setInt8(this.getPosition(), data), 1);
};
DataView.prototype.writeInt16 = function (data) {
    this.write(() => this.setInt16(this.getPosition(), data), 2);
};
DataView.prototype.writeInt32 = function (data) {
    this.write(() => this.setInt32(this.getPosition(), data), 4);
};
DataView.prototype.writeVarInt = function (var1) {
    if ((var1 & -128) != 0) {
        if ((var1 & -16384) != 0) {
            if ((var1 & -2097152) != 0) {
                if ((var1 & -268435456) != 0) {
                    this.writeInt8((var1 >>> 28) | 128);
                }

                this.writeInt8((var1 >>> 21) | 128);
            }

            this.writeInt8((var1 >>> 14) | 128);
        }

        this.writeInt8((var1 >>> 7) | 128);
    }

    this.writeInt8(var1 & 127);
};

DataView.prototype.writeLengthFromMark = function (var1) {
    this.setUint8(this.getPosition() - var1 - 4, var1 >> 24);
    this.setUint8(this.getPosition() - var1 - 3, var1 >> 16);
    this.setUint8(this.getPosition() - var1 - 2, var1 >> 8);
    this.setUint8(this.getPosition() - var1 - 1, var1);
    //this.addPosition(4);
};

DataView.prototype.readFloat32 = function () {
    //byte
    let val = 0;
    try {
        val = this.getFloat32(this.getPosition());
    } catch (error) {
        throw error;
    }
    this.addPosition(4);
    return val;
};

DataView.prototype.readFloat64 = function () {
    //byte
    let val = 0;
    try {
        val = this.getFloat64(this.getPosition());
    } catch (error) {
        throw error;
    }
    this.addPosition(8);
    return val;
};

DataView.prototype.readUint8 = function () {
    //byte
    let val = 0;
    try {
        val = this.getUint8(this.getPosition());
    } catch (error) {
        throw error;
    }
    this.addPosition(1);
    return val;
};
DataView.prototype.readUint16 = function () {
    //short
    let val = 0;
    try {
        val = this.getUint16(this.getPosition());
    } catch (error) {
        throw error;
    }
    this.addPosition(2);
    return val;
};
DataView.prototype.readUint24 = function () {
    let val = 0;
    try {
        val = this.getUint24(this.getPosition());
    } catch (error) {
        throw error;
    }
    this.addPosition(3);
    return val;
};
DataView.prototype.readUint32 = function () {
    //int
    let val = 0;
    try {
        val = this.getUint32(this.getPosition());
    } catch (error) {
        throw error;
    }
    this.addPosition(4);
    return val;
};

DataView.prototype.readUnsignedShortSmart = function () {
    let peek = this.getUint8(this.pos) & 0xff;
    return peek < 128 ? this.readUint8() : this.readUint16() - 0x8000;
};

DataView.prototype.readUnsignedShortSmartMinusOne = function () {
    let peek = this.getUint8(this.pos) & 0xff;
    return peek < 128 ? this.readUint8() - 1 : this.readUint16() - 0x8001;
};

DataView.prototype.readUnsignedIntSmartShortCompat = function () {
    let var1 = 0;

    let var2;
    for (var2 = this.readUnsignedShortSmart(); var2 == 32767; var2 = this.readUnsignedShortSmart()) {
        var1 += 32767;
    }

    var1 += var2;
    return var1;
};

DataView.prototype.readVarInt = function () {
    let var1 = this.readInt8();

    let var2;
    for (var2 = 0; var1 < 0; var1 = this.readInt8()) {
        var2 = (var2 | (var1 & 127)) << 7;
    }

    return var2 | var1;
};

DataView.prototype.readVarInt2 = function () {
    let value = 0;
    let bits = 0;
    let read;
    do {
        read = this.readUint8();
        value |= (read & 0x7f) << bits;
        bits += 7;
    } while (read > 127);
    return value;
};

DataView.prototype.readInt8 = function () {
    //byte
    let val = 0;
    try {
        val = this.getInt8(this.getPosition());
    } catch (error) {
        throw error;
    }
    this.addPosition(1);
    return val;
};
DataView.prototype.readInt16 = function () {
    //short
    let val = 0;
    try {
        val = this.getInt16(this.getPosition());
    } catch (error) {
        throw error;
    }
    this.addPosition(2);
    return val;
};
DataView.prototype.readInt24 = function () {
    let val = 0;
    try {
        val = this.getInt24(this.getPosition());
    } catch (error) {
        throw error;
    }
    this.addPosition(3);
    return val;
};
DataView.prototype.readInt32 = function () {
    //int
    let val = 0;
    try {
        val = this.getInt32(this.getPosition());
    } catch (error) {
        throw error;
    }
    this.addPosition(4);
    return val;
};
DataView.prototype.readShortSmart = function () {
    let peek = this.getUint8(this.pos) & 0xff;
    return peek < 128 ? this.readUint8() - 64 : this.readUint16() - 0xc000;
};

DataView.prototype.readBigSmart = function () {
    let peek = this.getUint8(this.pos);
    if (peek >= 0) {
        return this.readUint16() & 0xffff;
    } else {
        return this.readInt32() & 0x7fffffff;
    }
};

DataView.prototype.readBigSmart2 = function () {
    let peek = this.getUint8(this.pos);
    if (peek < 0) {
        return this.readInt32() & 0x7fffffff; // and off sign bit
    }
    let value = this.readUint16();
    return value == 32767 ? -1 : value;
};

DataView.prototype.readString = function () {
    let val = this.getString(this.getPosition());
    this.addPosition(val.length + 1);
    return val;
};

DataView.prototype.getUint24 = function (pos) {
    return (this.getUint16(pos) << 8) | this.getUint8(pos + 2);
};

DataView.prototype.getInt24 = function (pos) {
    return (this.getInt16(pos) << 8) | this.getInt8(pos + 2);
};

//this method should never be used directly
//but if required to use it then remember to do stringLength+1 for the last null character
DataView.prototype.getString = function (pos) {
    let string = "";
    let character;
    while (character != 0) {
        character = this.getUint8(pos);
        pos += 1;
        string += String.fromCharCode(character);
    }

    return string.substring(0, string.length - 1);
};
