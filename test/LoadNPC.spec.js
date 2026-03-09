import assert from "assert";
import { RSCache, IndexType, ConfigType } from "../src/index.js";

let cache;
let def;

describe("Load NPC", function () {
    this.timeout(25000);

    before(function (done) {
        cache = new RSCache("./cache");
        cache.onload.then(done)
    });

    describe("Zulrah", function () {
        it("Definition loaded", async function () {
            def = await cache.getDef(IndexType.CONFIGS.id, ConfigType.NPC.id, 2042);
        });
        it("should be ID 2042", function () {
            assert.equal(def.id, 2042);
        });
    });

    after(() => {
        cache.close();
    });
});
