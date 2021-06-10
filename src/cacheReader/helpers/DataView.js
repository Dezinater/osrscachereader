DataView.prototype.addPosition = function(pos) {
	if(this.pos == undefined)
		this.setPosition(0);
	
	this.setPosition(this.getPosition() + pos)
}

DataView.prototype.setPosition = function(pos) {
	//if(pos < 0)
	//	throw "Stream read position cannot be less than 0";
	
	this.pos = pos;
}

DataView.prototype.getPosition = function() {
	if(this.pos == undefined)
		this.setPosition(0);
	
	return this.pos;
}

DataView.prototype.readUint8 = function() { //byte
	var val = this.getUint8(this.getPosition());
	this.addPosition(1);
    return val;
}
DataView.prototype.readUint16 = function() { //short
	var val = this.getUint16(this.getPosition());
	this.addPosition(2);
    return val;
}
DataView.prototype.readUint24 = function() {
	var val = this.getUint24(this.getPosition());
	this.addPosition(3);
    return val;
}
DataView.prototype.readUint32 = function() { //int
	var val = this.getUint32(this.getPosition());
	this.addPosition(4);
    return val;
}
DataView.prototype.readUnsignedShortSmart = function() {
	var peek = this.getUint8(this.pos) & 0xFF;
	return peek < 128 ? this.readUint8() : this.readUint16() - 0x8000;
}


DataView.prototype.readInt8 = function() { //byte
	var val = this.getInt8(this.getPosition());
	this.addPosition(1);
    return val;
}
DataView.prototype.readInt16 = function() { //short
	var val = this.getInt16(this.getPosition());
	this.addPosition(2);
    return val;
}
DataView.prototype.readInt24 = function() {
	var val = this.getInt24(this.getPosition());
	this.addPosition(3);
    return val;
}
DataView.prototype.readInt32 = function() { //int
	var val = this.getInt32(this.getPosition());
	this.addPosition(4);
    return val;
}
DataView.prototype.readShortSmart = function() {
	var peek = this.getUint8(this.pos) & 0xFF;
	return peek < 128 ? this.readUint8() - 64 : this.readUint16() - 0xc000;
}


DataView.prototype.readBigSmart = function() {
	var peek = this.getUint8(this.pos);
	if(peek >= 0) {
		return this.readUint16() & 0xFFFF;
	}else{
		return this.readInt32() & 0x7fffffff;
	}
}

DataView.prototype.readString = function() {
	var val = this.getString(this.getPosition());
	this.addPosition(val.length+1);
    return val;
}

DataView.prototype.getUint24 = function(pos) {
    return (this.getUint16(pos) << 8) | this.getUint8(pos+2);
}

DataView.prototype.getInt24 = function(pos) {
    return (this.getInt16(pos) << 8) | this.getInt8(pos+2);
}

//this method should never be used directly 
//but if required to use it then remember to do stringLength+1 for the last null character
DataView.prototype.getString = function(pos) {
	var string = "";
	var character;
	while(character != 0) {
		character = this.getUint8(pos);
		pos += 1;
		string += String.fromCharCode(character)
	}
	
	return string.substring(0,string.length-1);
}