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

DataView.prototype.readString = function() {
	var val = this.getString(this.getPosition());
	this.addPosition(val.length);
    return val;
}

DataView.prototype.getUint24 = function(pos) {
    return (this.getUint16(pos) << 8) | this.getUint8(pos+2);
}

DataView.prototype.getInt24 = function(pos) {
    return (this.getInt16(pos) << 8) | this.getInt8(pos+2);
}

DataView.prototype.getString = function(pos) {
	var string = "";
	var character;
	do{
		character = this.getUint8(pos);
		pos += 1;
		string += String.fromCharCode(character)
	} while(character != 0);
	
	return string;
}