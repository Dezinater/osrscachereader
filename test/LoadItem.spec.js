import assert from "assert";
import { RSCache, IndexType, ConfigType } from "../src/index.js";

let cache;
let def;

describe("Load Item", function () {
    this.timeout(25000);

    before(function (done) {
        cache = new RSCache("./cache");
        cache.onload.then(done);
    });

    describe("Abyssal whip", function () {
        it("Definition loaded", async function() {
            def = await cache.getDef(IndexType.CONFIGS.id, ConfigType.ITEM.id, 4151);
        });
        it("ID 4151", function () {
            assert.equal(def.id, 4151);
        });
    });

    after(() => {
        cache.close();
    });
});
