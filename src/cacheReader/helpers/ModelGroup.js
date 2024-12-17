import { ModelDefinition } from "../loaders/ModelLoader.js";

export default class ModelGroup {

    position = { x: 0, y: 0, z: 0 }
    needsUpdate = false;

    constructor(models = []) {
        this.models = models;
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
        this.mergedModel.position = this.position;
        this.models.forEach(model => {
            
            this.mergedModel.mergeWith(model);
        });

        this.mergedModel.removeCommonVerticies();
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
