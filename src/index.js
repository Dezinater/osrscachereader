import RSCache from './cacheReader/Cache.js'
import IndexType from './cacheReader/cacheTypes/IndexType.js'
import ConfigType from './cacheReader/cacheTypes/ConfigType.js'

main();
var cache;

function main(){
    cache = new RSCache("./");

    cache.onload.then(() => {
        console.log("Cache loaded");
        loadList(npcsElement, ConfigType.NPC.id);
        loadList(objectsElement, ConfigType.OBJECT.id);
    });
}


var npcsElement = document.getElementById("npcs");
var objectsElement = document.getElementById("objects");
function loadList(htmlElement, configType) {
	var length = htmlElement.options.length;
	for (i = length-1; i >= 0; i--) {
        htmlElement.options[i] = null;
	}

    var allFiles = cache.getAllFiles(IndexType.CONFIGS.id, configType);
    var valuesArray = [];

    for(var i=0;i<allFiles.length;i++){
        var def = allFiles[i].def;
        if (def.name == undefined || def.name == "")
            continue;
        var option = document.createElement("option");
		option.text = def.name;
		option.value =  allFiles[i].id;
		valuesArray.push(option);  
    }

	valuesArray.sort((x,y) => {
		return x.text > y.text ? 1 : -1;
	});
	
	valuesArray.forEach((x) => {
		htmlElement.add(x);
	});
	
}