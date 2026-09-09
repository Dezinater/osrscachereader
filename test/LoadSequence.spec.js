import assert from "assert";
import { RSCache, IndexType, ConfigType } from "../src/index.js";
import SequenceLoader from "../src/cacheReader/loaders/SequenceLoader.js";

let cache;
let def;

describe("Load Sequence", function () {
    this.timeout(25000);

    before(function (done) {
        cache = new RSCache("./cache");
        cache.onload.then(done);
    });

    describe("Idle Animation", function () {
        it("Definition loaded", async function() {
            def = await cache.getDef(IndexType.CONFIGS.id, ConfigType.SEQUENCE.id, 808);
        });

        it("Correct ID", function () {
            assert.equal(def.id, 808);
        });

        it("Contains 12 frames", function () {
            assert.equal(def.frameIDs.length, 12);
        });
    });

    describe("Frame sounds", function () {
        it("preserves multiple weighted variants on the same frame", function () {
            const loader = new SequenceLoader();
            loader.configureForRevision(2437);
            const sequence = loader.load(Uint8Array.from([
                14, 0, 2,
                0, 3, 31, 164, 25, 1, 15, 12,
                0, 3, 31, 165, 75, 1, 15, 12,
                0,
            ]), 1);

            assert.deepEqual(sequence.frameSounds[3].map(({ id, weight }) => ({ id, weight })), [
                { id: 8100, weight: 25 },
                { id: 8101, weight: 75 },
            ]);
        });
    });

    after(() => {
        cache.close();
    });
});
