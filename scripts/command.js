import { processCommand, exportGLTFModel } from "./GLTFModelBuilder.js";
import { RSCache } from "osrscachereader";

const nodePath = process.argv.shift();
const cmdPath = process.argv.shift();
const command = process.argv.shift();
const options = process.argv;

const optionTokens = ["item", "npc", "object", "model", "spotanim", "anim", "name", "exclude"];
// tokens that do not take an argument
const flagTokens = ["split"];
function groupTokens(options) {
    let expectingArgs = false;
    let groups = options.reduce((prev, current) => {
        if (optionTokens.includes(current.toLowerCase())) {
            prev.push(current);
            prev.push([]);
            expectingArgs = true;
        } else if (!expectingArgs && flagTokens.includes(current.toLowerCase())) {
            prev.push(current);
        } else {
            prev[prev.length - 1].push(current);
            expectingArgs = false;
        }
        return prev;
    }, []);
    return groups;
}

async function processTokenPairs(tokenPairs) {
    for (let i = 0; i < tokenPairs.length; i += 2) {
        await processCommand(cache, tokenPairs[i + 0], tokenPairs[i + 1]);
    }
    exportGLTFModel(cache);
}

let cache = new RSCache("./cache");
cache.onload.then(async () => {
    if (command == "modelBuilder") {
        const tokenPairs = groupTokens(options);
        await processTokenPairs(tokenPairs);
    }

    cache.close();
    return true;
});
