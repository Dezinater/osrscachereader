main();
var cache;

function main(){
    cache = new Cache("./");

    cache.onload.then(() => {
        run();
    });
    console.log(IndexType.MODELS);
    //console.log(IndexType.MODELS.loader);
}

var test = {};
function run(){
    var allNpcFiles = cache.getAllFiles(2,9);

    for(var i=0;i<allNpcFiles.length;i++){
        if (test[allNpcFiles[i].def.name] == undefined)
            test[allNpcFiles[i].def.name] = 0;

        test[allNpcFiles[i].def.name]++   
    }
}