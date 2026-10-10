import assert from "node:assert/strict";
import { ModelDefinition } from "../src/cacheReader/loaders/ModelLoader.js";
import Matrix from "../src/cacheReader/cacheTypes/anim/Matrix.js";

describe("Maya animation vertex correspondence", function () {
    for (const invertZ of [false, true]) {
        it(`retains unweighted vertices and their indices (invertZ=${invertZ})`, function () {
            const model = new ModelDefinition();
            model.vertexCount = 4;
            model.vertexPositionsX = [10, 20, 30, 40];
            model.vertexPositionsY = [1, 2, 3, 4];
            model.vertexPositionsZ = [5, 6, 7, 8];
            model.animayaGroups = [[], [0], undefined, []];
            model.animayaScales = [[], [255], undefined, []];
            const transform = new Matrix();
            transform.matrixVals[12] = 100;
            const bone = { method687: () => transform };
            const frame = {
                framemap: { animayaSkeleton: { getAllBones: () => [bone], getBone: () => bone } },
                method727() {},
                field1257: 0,
            };
            const sign = invertZ ? 1 : -1;
            const frames = model.loadMayaAnimation(frame, { animMayaEnd: 2 }, invertZ);
            assert.equal(frames.length, 2);
            for (const vertices of frames) {
                assert.deepEqual(vertices, [
                    [10, -1, sign * 5], [120, -2, sign * 6],
                    [30, -3, sign * 7], [40, -4, sign * 8],
                ]);
            }
        });
    }
});
