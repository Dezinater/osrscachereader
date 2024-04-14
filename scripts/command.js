import { processCommand, exportGLTFModel } from './GLTFModelBuilder.js';
import { RSCache } from "osrscachereader";

const nodePath = process.argv.shift();
const cmdPath = process.argv.shift();
const command = process.argv.shift();
const options = process.argv;

const optionTokens = ["item", "npc", "object", "model", "spotanim", "anim", "name"];
function groupTokens(options) {
    let groups = options.reduce((prev, current) => {
        if (optionTokens.includes(current.toLowerCase())) {
            prev.push(current);
            prev.push([]);
        } else {
            prev[prev.length - 1].push(current);
        }
        return prev;
    }, []);
    return groups;
}

async function processTokenPairs(tokenPairs) {
    for (let i = 0; i < tokenPairs.length; i += 2) {
        await processCommand(cache, tokenPairs[i+0], tokenPairs[i+1]);
    }
    exportGLTFModel(cache);
}


let cache = new RSCache("./cache");
cache.onload.then(async () => {
    if(command == "modelBuilder") {
        const tokenPairs = groupTokens(options);
        await processTokenPairs(tokenPairs);
    }

    cache.close();
    return true;
});
