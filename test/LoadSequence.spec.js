import assert from "assert";
import { RSCache, IndexType, ConfigType } from "../src/index.js";

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

    after(() => {
        cache.close();
    });
});
