import assert from "assert";
import { RSCache, IndexType, ConfigType } from "../src/index.js";

let cache;
let def;

describe("Load Object", function () {
    this.timeout(25000);

    before(function (done) {
        cache = new RSCache("./cache");
        cache.onload.then(done);
    });

    describe("Statue of Hazelmere", function () {
        it("Definition loaded", async function() {
            def = await cache.getDef(IndexType.CONFIGS.id, ConfigType.OBJECT.id, 53297);
        });

        it("ID 53297", function () {
            assert.equal(def.id, 53297);
        });
    });

    after(() => {
        cache.close();
    });
});
