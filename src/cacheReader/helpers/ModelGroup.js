import { ModelDefinition } from "../loaders/ModelLoader.js";

export default class ModelGroup {
    translation = { x: 0, y: 0, z: 0 };
    needsUpdate = false;

    constructor(models = []) {
        this.models = models;
        this.mergeModels();
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
        this.models.forEach((model) => {
            this.mergedModel.mergeWith(model, false);
        });
        this.mergedModel.translation = this.translation;
        this.mergedModel.position = this.position;
    }

    getMergedModel() {
        if (this.needsUpdate) {
            this.mergeModels();
            this.needsUpdate = true;
        }
        return this.mergedModel;
    }

    getAllModels() {
        return this.models;
    }
}
