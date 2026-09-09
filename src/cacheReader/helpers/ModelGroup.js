import { ModelDefinition } from "../loaders/ModelLoader.js";

export default class ModelGroup {

    position = { x: 0, y: 0, z: 0 }
    needsUpdate = false;

    constructor(models = [], deduplicateVertices = true) {
        this.models = models;
        this.deduplicateVertices = deduplicateVertices;
        if(models.length != 0) {
            this.mergeModels();
        }
    }

    addModel(model) {
        this.models.push(model);
        this.needsUpdate = true;
    }

    removeModel() {
        this.needsUpdate = true;
    }

    mergeModels() {
        this.mergedModel = new ModelDefinition();
        this.mergedModel.rev229 = this.models.some((model) => model.rev229);
        this.mergedModel.position = this.position;
        this.models.forEach(model => {
            
            this.mergedModel.mergeWith(model);
        });

        // Equipment parts must retain independent vertices. Deduplicating
        // across separately authored models can weld unrelated triangles
        // (for example, connecting the two boots with a stray face).
        if (this.deduplicateVertices) this.mergedModel.removeCommonVerticies();
        //this.mergedModel.computeNormals();
    }

    getMergedModel() {
        if (this.needsUpdate) {
            this.mergeModels();
            this.needsUpdate = false;
        }
        return this.mergedModel;
    }

    getAllModels() {
        return this.models;
    }
}
