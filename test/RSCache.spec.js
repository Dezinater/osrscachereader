import assert from "assert";
import RSCache from "../src/cacheReader/RSCache.js";

describe("RSCache file lookup", function () {
    it("falls back to a file's ID when a single-file archive is stored at slot zero", async function () {
        const cache = Object.create(RSCache.prototype);
        const file = { id: 1, def: { id: 1 } };
        cache.getAllFiles = async () => [file];

        assert.strictEqual(await cache.getFile(0, 3236, 1), file);
        assert.deepStrictEqual(await cache.getDef(0, 3236, 1), file.def);
    });

    it("keeps positional lookup for dense archives", async function () {
        const cache = Object.create(RSCache.prototype);
        const files = [
            { id: 0, def: { id: 0 } },
            { id: 1, def: { id: 1 } },
        ];
        cache.getAllFiles = async () => files;

        assert.strictEqual(await cache.getFile(0, 1, 1), files[1]);
        assert.deepStrictEqual(await cache.getDef(0, 1, 1), files[1].def);
    });

    it("does not confuse a physical slot with a sparse file ID", async function () {
        const cache = Object.create(RSCache.prototype);
        const files = [
            { id: 1, def: { id: 1 } },
            { id: 3, def: { id: 3 } },
        ];
        cache.getAllFiles = async () => files;

        assert.strictEqual(await cache.getFile(0, 1, 1), files[0]);
        assert.deepStrictEqual(await cache.getDef(0, 1, 1), files[0].def);
    });
});
