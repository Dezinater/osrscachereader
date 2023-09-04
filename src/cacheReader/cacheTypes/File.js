/**
 * A file fom an archive
 * @category Cache Types
 * @property {Array} content Byte array of content to be loaded into a definition
 * @hideconstructor
 */
class File {
	constructor(id) {
		/**
		 * The ID of the file
		 * @type {number}
		 */
		this.id = id;


		this.name = "";

		/**
		 * The definition that is loaded from the content array
		 * @type {Definition}
		 */
		this.def = undefined;
		
		/**
		 * @type {number}
		 */
		this.nameHash = 0;
		
		/**
		 * @type {number}
		 */
		this.size = 0;
		
		/**
		 * Byte array of content to be loaded into a definition
		 * @type {Array}
		 */
		this.content = [];
	}
}

export default File;