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
    it("keeps omitted trailing vertices stationary in complete morph buffers", function () {
        const exporter = createExporter();
        exporter.addMorphTarget([[1, 2, 3]]);

        assert.equal(exporter.morphVertices[0].length, exporter.verticies.length);
        assert.equal(exporter.alphaMorphVertices[0].length, exporter.alphaVertices.length);
        assert.deepEqual(exporter.morphVertices[0], [
            [1, 2, 3], [0, 0, 0], [0, 0, 0],
            [1, 2, 3], [0, 0, 0], [0, 0, 0],
        ]);
        assert.deepEqual(exporter.alphaMorphVertices[0], [[1, 2, 3], [0, 0, 0], [0, 0, 0]]);
    });

    it("preserves vertex ordering when an animation omits an interior vertex", function () {
        const exporter = createExporter();
        exporter.addMorphTarget([[0, 0, 0], undefined, [24, 5, 6], [37, 8, 9]]);

        assert.deepEqual(exporter.morphVertices[0], [
            [0, 0, 0], [0, 0, 0], [4, 5, 6],
            [0, 0, 0], [0, 0, 0], [4, 5, 6],
        ]);
        assert.deepEqual(exporter.alphaMorphVertices[0], [[0, 0, 0], [4, 5, 6], [7, 8, 9]]);
    });
});
