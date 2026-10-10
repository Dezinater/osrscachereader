import assert from "node:assert/strict";
import GLTFExporter from "../src/cacheReader/exporters/GLTFExporter.js";

function createExporter() {
    return new GLTFExporter({
        vertexPositionsX: [0, 10, 20, 30],
        vertexPositionsY: [0, 0, 0, 0],
        vertexPositionsZ: [0, 0, 0, 0],
        faceVertexIndices1: [0, 0, 0],
        faceVertexIndices2: [1, 2, 1],
        faceVertexIndices3: [2, 3, 2],
        faceColors: [100, 100, 200],
        faceAlphas: [0, 128, 0],
    });
}

describe("GLTFExporter morph targets", function () {
    it("rejects incomplete frames before modifying exporter state", function () {
        const exporter = createExporter();
        assert.throws(() => exporter.addMorphTarget([[1, 2, 3]]), /vertex count/);
        assert.throws(() => exporter.addMorphTarget([[0, 0, 0], undefined, [20, 0, 0], [30, 0, 0]]), /missing source vertex 1/);
        assert.equal(exporter.morphTargetsAmount, 0);
        assert.equal(exporter.morphVertices.length, 0);
    });

    it("maps complete frames to colour and alpha duplicates", function () {
        const exporter = createExporter();
        exporter.addMorphTarget([[0, 0, 0], [10, 0, 0], [24, 5, 6], [37, 8, 9]]);

        assert.deepEqual(exporter.morphVertices[0], [
            [0, 0, 0], [0, 0, 0], [4, 5, 6],
            [0, 0, 0], [0, 0, 0], [4, 5, 6],
        ]);
        assert.deepEqual(exporter.alphaMorphVertices[0], [[0, 0, 0], [4, 5, 6], [7, 8, 9]]);
    });
});
