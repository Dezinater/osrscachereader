import assert from "assert";
import { RSCache, IndexType, ConfigType } from "../src/index.js";

let cache;
let def;

describe("Load Sprite", function () {
    this.timeout(25000);

    before(function (done) {
        cache = new RSCache("./cache");
        cache.onload.then(done);
    });

    describe("Smite Prayer Icon", function () {
        it("Definition loaded", async function() {
            def = await cache.getDef(IndexType.SPRITES.id, 133);
        });

        it("Correct ID", function () {
            assert.equal(def.id, 133);
        });

        it("Palette contains 7 values", function () {
            assert.equal(def.sprites[0].palette.length, 7);
        });

        it("Max width and height is 30", function () {
            assert.equal(def.sprites[0].maxWidth, 30);
            assert.equal(def.sprites[0].maxHeight, 30);
        });
    });

    after(() => {
        cache.close();
    });
});
