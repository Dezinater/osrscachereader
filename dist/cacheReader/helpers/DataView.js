DataView.prototype.addPosition = function (pos) {
    if (this.pos == undefined)
        this.setPosition(0);
    this.setPosition(this.getPosition() + pos);
};
DataView.prototype.setPosition = function (pos) {
    //if(pos < 0)
    //	throw "Stream read position cannot be less than 0";
    this.pos = pos;
};
DataView.prototype.getPosition = function () {
    if (this.pos == undefined)
        this.setPosition(0);
    return this.pos;
};
DataView.prototype.readFloat32 = function () {
    let val = 0;
    try {
        val = this.getFloat32(this.getPosition());
    }
    catch (error) {
        throw error;
    }
    this.addPosition(4);
    return val;
};
DataView.prototype.readFloat64 = function () {
    let val = 0;
    try {
        val = this.getFloat64(this.getPosition());
    }
    catch (error) {
        throw error;
    }
    this.addPosition(8);
    return val;
};
DataView.prototype.readUint8 = function () {
    let val = 0;
    try {
        val = this.getUint8(this.getPosition());
    }
    catch (error) {
        throw error;
    }
    this.addPosition(1);
    return val;
};
DataView.prototype.readUint16 = function () {
    let val = 0;
    try {
        val = this.getUint16(this.getPosition());
    }
    catch (error) {
        throw error;
    }
    this.addPosition(2);
    return val;
};
DataView.prototype.readUint24 = function () {
    let val = 0;
    try {
        val = this.getUint24(this.getPosition());
    }
    catch (error) {
        throw error;
    }
    this.addPosition(3);
    return val;
};
DataView.prototype.readUint32 = function () {
    let val = 0;
    try {
        val = this.getUint32(this.getPosition());
    }
    catch (error) {
        throw error;
    }
    this.addPosition(4);
    return val;
};
DataView.prototype.readUnsignedShortSmart = function () {
    let peek = this.getUint8(this.pos) & 0xFF;
    return peek < 128 ? this.readUint8() : this.readUint16() - 0x8000;
};
DataView.prototype.readUnsignedShortSmartMinusOne = function () {
    let peek = this.getUint8(this.pos) & 0xFF;
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
DataView.prototype.readInt8 = function () {
    let val = 0;
    try {
        val = this.getInt8(this.getPosition());
    }
    catch (error) {
        throw error;
    }
    this.addPosition(1);
    return val;
};
DataView.prototype.readInt16 = function () {
    let val = 0;
    try {
        val = this.getInt16(this.getPosition());
    }
    catch (error) {
        throw error;
    }
    this.addPosition(2);
    return val;
};
DataView.prototype.readInt24 = function () {
    let val = 0;
    try {
        val = this.getInt24(this.getPosition());
    }
    catch (error) {
        throw error;
    }
    this.addPosition(3);
    return val;
};
DataView.prototype.readInt32 = function () {
    let val = 0;
    try {
        val = this.getInt32(this.getPosition());
    }
    catch (error) {
        throw error;
    }
    this.addPosition(4);
    return val;
};
DataView.prototype.readShortSmart = function () {
    let peek = this.getUint8(this.pos) & 0xFF;
    return peek < 128 ? this.readUint8() - 64 : this.readUint16() - 0xc000;
};
DataView.prototype.readBigSmart = function () {
    let peek = this.getUint8(this.pos);
    if (peek >= 0) {
        return this.readUint16() & 0xFFFF;
    }
    else {
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
