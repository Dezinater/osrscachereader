export default class FileData {
	constructor(id) {
		this.id = id;
		this.name = "";
		this.def = undefined;
		this.nameHash = 0;
		this.size = 0;
		this.content = [];
	}
}