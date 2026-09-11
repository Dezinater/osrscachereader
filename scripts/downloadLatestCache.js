/*
 * A helper script to download the latest Old School RuneScape cache from the OpenRS2 archive and extract it to the local cache directory.
 */
import axios from "axios";
import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { unzipSync } from "fflate";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "..");
const outputDir = path.join(repoRoot, "cache");

async function main() {
    const { data: caches } = await axios.get("https://archive.openrs2.org/caches.json", {
        responseType: "json",
    });

    const latestCache = caches
        .filter((cache) => cache.game === "oldschool" && cache.builds?.length > 0)
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];

    if (!latestCache) {
        throw new Error("No Old School RuneScape cache metadata was found.");
    }

    const zipUrl = `https://archive.openrs2.org/caches/runescape/${latestCache.id}/disk.zip`;

    console.log(`Downloading latest cache ${latestCache.id} (${latestCache.timestamp}) to ${outputDir}`);

    await rm(outputDir, { recursive: true, force: true });
    await mkdir(outputDir, { recursive: true });

    const response = await axios.get(zipUrl, { responseType: "arraybuffer" });
    const zipBuffer = Buffer.from(response.data);
    const extracted = unzipSync(new Uint8Array(zipBuffer));

    let writtenFiles = 0;
    for (const [archivePath, data] of Object.entries(extracted)) {
        if (data instanceof Uint8Array) {
            const relativePath = archivePath.replace(/^cache\//, "");
            if (!relativePath) continue;

            const destinationPath = path.join(outputDir, relativePath);
            await mkdir(path.dirname(destinationPath), { recursive: true });
            await writeFile(destinationPath, Buffer.from(data));
            writtenFiles += 1;
        }
    }

    console.log(`Finished writing ${writtenFiles} files to ${outputDir}`);
}

main().catch((error) => {
    console.error("Failed to download latest cache.", error);
    process.exit(1);
});
