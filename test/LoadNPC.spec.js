import assert from 'assert';
import * as fs from "fs";

import { RSCache, IndexType, ConfigType } from "../src/index.js"
let cache;

describe('Load NPC', function () {
    this.timeout(25000);

    before(function (done) {
        cache  = new RSCache("./cache");
        cache.onload.then(() => {
            done();
        });
    });

    describe('Zulrah', function () {
        it('should be ID 2042', function () {
            cache.getFile(IndexType.CONFIGS.id, ConfigType.NPC.id, 12125).then(npc => {
                assert.equal(npc.def.id, 2042);
            });
        });
    });

});
