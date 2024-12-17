export default class OBJExporter {
    constructor() {}

    export(def) {
        let verticies = [];
        for (let i = 0; i < def.vertexPositionsX.length; i++) {
            verticies.push([def.vertexPositionsX[i], def.vertexPositionsY[i], def.vertexPositionsZ[i]]);
        }

        let indicies = [];
        for (let i = 0; i < def.faceVertexIndices1.length; i++) {
            indicies.push([def.faceVertexIndices1[i], def.faceVertexIndices2[i], def.faceVertexIndices3[i]]);
        }

        let verticiesString = verticies.map((x) => "v " + x.join(", ")).join("\n");
        let indiciesString = indicies.map((x) => "f " + x.map((y) => y + 1).join(" ")).join("\n");
        return verticiesString + "\n" + indiciesString;
    }
}
