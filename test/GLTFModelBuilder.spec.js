import assert from "assert";
import fs from "fs";
import path from "path";
import { ensureOutputDir } from "../scripts/GLTFModelBuilder.js";

describe("GLTFModelBuilder", function () {
    const outputDir = path.resolve("./out");

    beforeEach(function () {
        fs.rmSync(outputDir, { recursive: true, force: true });
    });

    afterEach(function () {
        fs.rmSync(outputDir, { recursive: true, force: true });
    });

    it("creates the output directory when it is missing", function () {
        assert.equal(fs.existsSync(outputDir), false);

        ensureOutputDir();

        assert.equal(fs.existsSync(outputDir), true);
    });
});
