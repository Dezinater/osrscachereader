/**
* @class RawBytesDefinition
* @category Definitions
* @hideconstructor
*/
export class RawBytesDefinition {
	/** 
	* @type {number} 
	*/
	id;

	/**
	 * @type {Array} 
	*/
    bytes = [];
}

export default class RawBytesLoader {

	load(bytes, id) {
		let def = new RawBytesDefinition();
		def.id = id;
		def.bytes = bytes;
		return def;
	}

}