export default class OBJExporter {

    constructor() {

    }

    export(indicies, verticies,) {
        let verticiesString = verticies.map(x => "v " + x.join(", ")).join("\n");
        let indiciesString = indicies.map(x => "f " + x.map(y => y + 1).join(" ")).join("\n");
        return verticiesString + "\n" + indiciesString;
    }

}