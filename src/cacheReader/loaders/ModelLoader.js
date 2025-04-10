import _ from "lodash";

import IndexType from "../cacheTypes/IndexType.js";
import ConfigType from "../cacheTypes/ConfigType.js";
import Matrix from "../cacheTypes/anim/Matrix.js";

/**
 * @typedef AnimationData
 * @property {Array<Vector3>} vertexData Vector3 is an array with 3 numbers
 * @property {Array<number>} lengths Animation frame length
 */

class Vector3f {
	x;
	y;
	z;
	magnitude;

	constructor(otherVertexNormal) {
		this.x = otherVertexNormal?.x ?? 0;
		this.y = otherVertexNormal?.y ?? 0;
		this.z = otherVertexNormal?.z ?? 0;
		this.magnitude = otherVertexNormal?.magnitude ?? 0;
	}
}

class VertexNormal extends Vector3f {}
class FaceNormal extends Vector3f {}

/**
 * @class ModelDefinition
 * @category Definitions
 * @hideconstructor
 */
export class ModelDefinition {
	static normalMergeCount = 0;
	static field1935 = new Array(10000);
	static field1936 = new Array(10000);
	/**
	 * The ID of this Model
	 * @type {number} 
	 */
	id;

    /**
     * Used to offset vertices during merge
     * @type {number}
     */
    translation = { x: 0, y: 0, z: 0 };

    /**
     * Used to rotate vertices during merge
     * @type {number}
     */
    rotation = { x: 0, y: 0, z: 0 };

    /**
     * How many verticies this models has
     * @type {number}
     */
    vertexCount = 0;

    /**
     * How many faces this models has
     * @type {number}
     */
    faceCount = 0;

    /**
     * How many textured faces this models has
     * @type {number}
     */
    numTextureFaces = 0;

    /**
     * Vertex X Position Array
     * @type {Array<number>}
     */
    vertexPositionsX = [];

    /**
     * Vertex Y Position Array
     * @type {Array<number>}
     */
    vertexPositionsY = [];

    /**
     * Vertex Z Position Array
     * @type {Array<number>}
     */
    vertexPositionsZ = [];

    /**
     * Which Vertex XYZ to use for the 1st index
     * @type {Array<number>}
     */
    faceVertexIndices1 = [];

    /**
     * Which Vertex XYZ to use for the 2nd index
     * @type {Array<number>}
     */
    faceVertexIndices2 = [];

    /**
     * Which Vertex XYZ to use for the 3rd index
     * @type {Array<number>}
     */
    faceVertexIndices3 = [];

    /**
     * Used for animations
     * @type {Array<number>}
     */
    vertexSkins;

    /**
     * Changes how this face will render (lighting style, invisible, etc.)
     * @type {Array<number>}
     */
    faceRenderTypes;

    /**
     * Local render priority when combined with other models
     * @type {Array<number>}
     */
    faceRenderPriorities = [];

    /**
     * Overall priority
     * @type {number}
     */
    priority;

    /**
     * Used to set transparency of faces
     * @type {Array<Byte>}
     */
    faceAlphas = [];

    /**
     * Used for animations
     * @type {Array<number>}
     */
    faceSkins;

    /**
     * Texture IDs for faces
     * @type {Array<number>}
     */
    faceTextures = [];

    /**
     * Texture UV coords for mapping
     * @type {Array<number>}
     */
    textureCoords;

    /**
     * Used for new Animaya animations
     * @type {Array<number>}
     */

    animayaGroups;
    /**
     * Used for new Animaya animations
     * @type {Array<number>}
     */
    animayaScales;

    /**
     * Used to compute Texture UV coords
     * @type {Array<number>}
     */
    texIndices1 = [];

    /**
     * Used to compute Texture UV coords
     * @type {Array<number>}
     */
    texIndices2 = [];

    /**
     * Used to compute Texture UV coords
     * @type {Array<number>}
     */
    texIndices3 = [];

    /**
     * Face color
     * @type {Array<number>}
     */
    faceColors = [];

    /**
     * Changes how this face's texture will render (lighting style, invisible, etc.)
     * @type {Array<number>}
     */
    textureRenderTypes = [];

    /** @type {Array<number>} */
    aShortArray2574;

    /** @type {Array<number>} */
    aShortArray2575;

    /** @type {Array<number>} */
    aShortArray2586;

    /** @type {Array<number>} */
    aShortArray2577;

    /** @type {Array<Byte>} */
    aByteArray2580;

    /** @type {Array<number>} */
    aShortArray2578;

    vertexGroups = [];

	position = { x: 0, y: 0, z: 0 };
	rotation = { x: 0, y: 0, z: 0 };

	constructor(x = 0, y = 0, heightOffset = 0, color) {
		this.position.x = x;
		this.position.y = y;
		this.color = color;
		this.position.z = heightOffset;
	}

	addVertex(x, y, z, color = this.color, uvs = [0, 0, 0, 0, 1, 1]) {
		this.vertexPositionsX.push(this.position.x + x);
		this.vertexPositionsY.push(y + this.this.position.z);
		this.vertexPositionsZ.push(this.position.y + z);

        if (this.vertexNormals == undefined) this.vertexNormals = [];
        this.vertexNormals.push({
            x: Math.random(),
            y: Math.random(),
            z: Math.random(),
            magnitude: Math.random(),
        });

        this.vertexCount = this.vertexPositionsX.length;
        if (this.vertexCount >= 3) {
            this.faceCount = this.vertexCount - 2;
        }

        if (this.faceCount > 0) {
            this.faceVertexIndices1.push(0);
            this.faceVertexIndices2.push(this.vertexCount - 1);
            this.faceVertexIndices3.push(this.vertexCount - 2);

            this.faceAlphas.push(256);
            this.faceColors.push(color);
        }

        if (this.faceTextureUCoordinates == undefined) this.faceTextureUCoordinates = [];
        if (this.faceTextureVCoordinates == undefined) this.faceTextureVCoordinates = [];
        this.faceTextureUCoordinates.push([0, 0, 1]);
        this.faceTextureVCoordinates.push([0, 1, 1]);
    }

	rotate(degrees, size, posX = 0, posY = 0) {
		for (let i = 0; i < this.vertexCount; i++) {
			let x = this.vertexPositionsX[i] - posX - (size / 2);
			let z = this.vertexPositionsZ[i] - posY - (size / 2);
			this.vertexPositionsX[i] = (x * Math.cos(degrees) - z * Math.sin(degrees)) + posX + (size / 2);
			this.vertexPositionsZ[i] = (z * Math.cos(degrees) + x * Math.sin(degrees)) + posY + (size / 2);
		}
	}

	static rotated(pos, degrees, size, posX = 0, posY = 0) {
		for (let i = 0; i < pos.vertexPositionsX.length; i++) {
			let x = pos.vertexPositionsX[i] - posX - (size / 2);
			let z = pos.vertexPositionsZ[i] - posY - (size / 2);
			pos.vertexPositionsX[i] = (x * Math.cos(degrees) - z * Math.sin(degrees)) + posX + (size / 2);
			pos.vertexPositionsZ[i] = (z * Math.cos(degrees) + x * Math.sin(degrees)) + posY + (size / 2);
		}

		return pos;
	}

	translate(x, y, z) {
		for (let i = 0; i < this.vertexCount; i++) {
			this.vertexPositionsX[i] -= x;
			this.vertexPositionsY[i] += z;
			this.vertexPositionsZ[i] += y;
		}
	}

	static translated(pos, x, y, z) {
		for (let i = 0; i < pos.vertexPositionsX.length; i++) {
			pos.vertexPositionsX[i] -= x;
			pos.vertexPositionsY[i] += y;
			pos.vertexPositionsZ[i] += z;
		}

		return pos;
	}

	method1194() {
		let var1;
		for (var1 = 0; var1 < this.vertexCount; ++var1) {
			this.vertexPositionsZ[var1] = -this.vertexPositionsZ[var1];
		}

		for (var1 = 0; var1 < this.faceCount; ++var1) {
			let var2 = this.faceVertexIndices1[var1];
			this.faceVertexIndices1[var1] = this.faceVertexIndices3[var1];
			this.faceVertexIndices3[var1] = var2;
		}

		this.invalidate();
	}

	method1206(degrees) {
		let var2 = Math.sin(2 * Math.PI * (degrees / 2048));
		let var3 = Math.cos(2 * Math.PI * (degrees / 2048));

		for (let var4 = 0; var4 < this.vertexCount; ++var4) {
			let var5 = var2 * this.vertexPositionsZ[var4] + var3 * this.vertexPositionsX[var4];
			this.vertexPositionsZ[var4] = var3 * this.vertexPositionsZ[var4] - var2 * this.vertexPositionsX[var4];
			this.vertexPositionsX[var4] = var5;
		}

		this.invalidate();
	}

	changeOffset(var1, var2, var3) {
		for (let var4 = 0; var4 < this.vertexCount; ++var4) {
			this.vertexPositionsX[var4] += var1;
			this.vertexPositionsY[var4] += var2;
			this.vertexPositionsZ[var4] += var3;
		}

		this.invalidate();
	}

	method1188() {
		for (let var1 = 0; var1 < this.vertexCount; ++var1) {
			let var2 = this.vertexPositionsX[var1];
			this.vertexPositionsX[var1] = this.vertexPositionsZ[var1];
			this.vertexPositionsZ[var1] = -var2;
		}

		this.invalidate();
	}

	method1190() {
		for (let var1 = 0; var1 < this.vertexCount; ++var1) {
			this.vertexPositionsX[var1] = -this.vertexPositionsX[var1];
			this.vertexPositionsZ[var1] = -this.vertexPositionsZ[var1];
		}

		this.invalidate();
	}

	method1189() {
		for (let var1 = 0; var1 < this.vertexCount; ++var1) {
			let var2 = this.vertexPositionsZ[var1];
			this.vertexPositionsZ[var1] = this.vertexPositionsX[var1];
			this.vertexPositionsX[var1] = -var2;
		}

		this.invalidate();
	}

	resize(var1, var2, var3) {
		for (let var4 = 0; var4 < this.vertexCount; ++var4) {
			this.vertexPositionsX[var4] = this.vertexPositionsX[var4] * var1 / 128;
			this.vertexPositionsY[var4] = var2 * this.vertexPositionsY[var4] / 128;
			this.vertexPositionsZ[var4] = var3 * this.vertexPositionsZ[var4] / 128;
		}

		this.invalidate();
	}

	invalidate() {
		this.vertexNormals = null;
		this.vertexVertices = null;
		this.faceNormals = null;
		this.isBoundsCalculated = false;
	}

	recolor(var1, var2) {
		for (let var3 = 0; var3 < this.faceCount; ++var3) {
			if (this.faceColors[var3] == var1) {
				this.faceColors[var3] = var2;
			}
		}
	}

	retexture(var1, var2) {
		if (this.faceTextures != null) {
			for (let var3 = 0; var3 < this.faceCount; ++var3) {
				if (this.faceTextures[var3] == var1) {
					this.faceTextures[var3] = var2;
				}
			}
		}
	}
	removeCommonVerticies() {
		//doesnt actually remove the verticies, just makes them disappear
		const TOLERANCE = 1;
		let alreadyMerged = [];

		outerLoop:
		for (let i = 0; i < this.vertexCount; i++) {
			for (let j = 0; j < this.vertexCount; j++) {
				if (i == j) continue;
				//if(alreadyMerged[j]) continue;
				if (Math.abs(this.vertexPositionsX[i] - this.vertexPositionsX[j]) <= TOLERANCE &&
					Math.abs(this.vertexPositionsY[i] - this.vertexPositionsY[j]) <= TOLERANCE &&
					Math.abs(this.vertexPositionsZ[i] - this.vertexPositionsZ[j]) <= TOLERANCE) {

					alreadyMerged[j] = true;
					this.faceVertexIndices1 = this.faceVertexIndices1.map(x => x == j ? i : x);
					this.faceVertexIndices2 = this.faceVertexIndices2.map(x => x == j ? i : x);
					this.faceVertexIndices3 = this.faceVertexIndices3.map(x => x == j ? i : x);

					if (this.vertexNormals[i] != undefined && this.vertexNormals[j] != undefined) {
						this.vertexNormals[j].x = this.vertexNormals[i].x = (this.vertexNormals[i].x + this.vertexNormals[j].x);
						this.vertexNormals[j].y = this.vertexNormals[i].y = (this.vertexNormals[i].y + this.vertexNormals[j].y);
						this.vertexNormals[j].z = this.vertexNormals[i].z = (this.vertexNormals[i].z + this.vertexNormals[j].z);
						this.vertexNormals[j].magnitude = this.vertexNormals[i].magnitude = (this.vertexNormals[i].magnitude + this.vertexNormals[j].magnitude);
					}
					//continue outerLoop;
				}
			}
		}
		//this.vertexNormals = newNormals;
	}

	overlapsWith(otherModel) { //aabb collision
		this.calculateBounds();
		otherModel.calculateBounds();
		return (
			this.minX + this.position.x <= otherModel.maxX + otherModel.position.x &&
			this.maxX + this.position.x >= otherModel.minX + otherModel.position.x &&
			this.minY + this.position.y <= otherModel.height + otherModel.position.y &&
			this.height + this.position.y >= otherModel.minY + otherModel.position.y &&
			this.minZ + this.position.z <= otherModel.maxZ + otherModel.position.z &&
			this.maxZ + this.position.z >= otherModel.minZ + otherModel.position.z
		);
	}
	overlapsWith2(otherModel) { //aabb collision
		this.calculateBounds();
		otherModel.calculateBounds();
		return (
			this.minZ + this.position.x <= otherModel.maxZ + otherModel.position.x &&
			this.maxZ + this.position.x >= otherModel.minZ + otherModel.position.x &&
			this.minY + this.position.y <= otherModel.height + otherModel.position.y &&
			this.height + this.position.y >= otherModel.minY + otherModel.position.y &&
			this.minX + this.position.z <= otherModel.maxX + otherModel.position.z &&
			this.maxX + this.position.z >= otherModel.minX + otherModel.position.z
		);
	}
	calculateBounds() {
		if (!this.isBoundsCalculated) {
			this.height = 0;
			this.minY = 0;
			this.maxY = 0;
			this.minX = 999999;
			this.maxX = -999999;
			this.maxZ = -99999;
			this.minZ = 99999;

			let rotatedVerts = {
				vertexPositionsX: Object.assign([], this.vertexPositionsX),
				vertexPositionsY: Object.assign([], this.vertexPositionsY),
				vertexPositionsZ: Object.assign([], this.vertexPositionsZ)
			}
			rotatedVerts = ModelDefinition.rotated(rotatedVerts, this.rotation.y, 1);

			for (let var1 = 0; var1 < this.vertexCount; ++var1) {
				let vertX = this.vertexPositionsX[var1];
				let vertY = this.vertexPositionsY[var1];
				let vertZ = this.vertexPositionsZ[var1];
				if (vertX < this.minX) {
					this.minX = vertX;
				}

				if (vertX > this.maxX) {
					this.maxX = vertX;
				}

				if (vertZ < this.minZ) {
					this.minZ = vertZ;
				}

				if (vertZ > this.maxZ) {
					this.maxZ = vertZ;
				}

				if (-vertY > this.height) {
					this.height = -vertY;
				}

				if (vertY < this.minY) {
					this.minY = vertY;
				}

				if (vertY > this.maxY) {
					this.maxY = vertY;
				}
			}

			this.isBoundsCalculated = true;
		}
	}

	mergeNormals2(otherModel, var5) {
		this.calculateBounds();
		this.computeNormals();
		otherModel.calculateBounds();
		otherModel.computeNormals();

		++ModelDefinition.normalMergeCount;

		let var2 = otherModel.position.x - this.position.x ;
		let var3 = this.position.y - otherModel.position.y;
		let var4 = this.position.z - otherModel.position.z;

		let var6 = 0;
		let var7 = otherModel.vertexPositionsX;

		let var9;
		for (var9 = 0; var9 < this.vertexCount; ++var9) {
			let var10 = this.vertexNormals[var9];
			if (var10.magnitude != 0) {
				let var11 = this.vertexPositionsY[var9] - var3;
				if (var11 <= otherModel.maxY) {
					let var12 = this.vertexPositionsX[var9] - var2;
					if (var12 >= otherModel.minX && var12 <= otherModel.maxX) {
						let var13 = this.vertexPositionsZ[var9] - var4;
						if (var13 >= otherModel.minZ && var13 <= otherModel.maxZ) {
							for (let var14 = 0; var14 < otherModel.vertexCount; ++var14) {
								let var15 = otherModel.vertexNormals[var14];
								if (var12 == var7[var14] && var13 == otherModel.vertexPositionsZ[var14] && var11 == otherModel.vertexPositionsY[var14] && var15.magnitude != 0) {  //|| (Math.abs(var12 - var7[var14]) == 0 && Math.abs(var13 - otherModel.vertexPositionsZ[var14]) == 128 && Math.abs(var11 - otherModel.vertexPositionsY[var14]) == 0))
									if (this.vertexVertices == null) {
										this.vertexVertices = new Array(this.vertexCount);
									}

									if (otherModel.vertexVertices == null) {
										otherModel.vertexVertices = new Array(otherModel.vertexCount);
									}

									let var16 = this.vertexVertices[var9];
									if (var16 == null) {
										var16 = this.vertexVertices[var9] = new VertexNormal(var10);
									}

									let var17 = otherModel.vertexVertices[var14];
									if (var17 == null) {
										var17 = otherModel.vertexVertices[var14] = new VertexNormal(var15);
									}
									
									var16.x += var15.x;
									var16.y += var15.y;
									var16.z += var15.z;
									var16.magnitude += var15.magnitude;
									var17.x += var10.x;
									var17.y += var10.y;
									var17.z += var10.z;
									var17.magnitude += var10.magnitude;
									++var6;
									ModelDefinition.field1935[var9] = ModelDefinition.normalMergeCount;
									ModelDefinition.field1936[var14] = ModelDefinition.normalMergeCount;
								}
							}
						}
					}
				}
			}
		}

		if (var6 >= 3 && var5) {
			for (var9 = 0; var9 < this.faceCount; ++var9) {
				if (ModelDefinition.field1935[this.faceVertexIndices1[var9]] == ModelDefinition.normalMergeCount && ModelDefinition.field1935[this.faceVertexIndices2[var9]] == ModelDefinition.normalMergeCount && ModelDefinition.field1935[this.faceVertexIndices3[var9]] == ModelDefinition.normalMergeCount) {
					if (this.faceRenderTypes == null) {
						this.faceRenderTypes = new Array(this.faceCount);
					}

					this.faceRenderTypes[var9] = 2;
				}
			}

			for (var9 = 0; var9 < otherModel.faceCount; ++var9) {
				if (ModelDefinition.normalMergeCount == ModelDefinition.field1936[otherModel.faceVertexIndices1[var9]] && ModelDefinition.normalMergeCount == ModelDefinition.field1936[otherModel.faceVertexIndices2[var9]] && ModelDefinition.normalMergeCount == ModelDefinition.field1936[otherModel.faceVertexIndices3[var9]]) {
					if (otherModel.faceRenderTypes == null) {
						otherModel.faceRenderTypes = new Array(otherModel.faceCount);
					}

					otherModel.faceRenderTypes[var9] = 2;
				}
			}

		}
	}

	static mergeNormals(var0, var1, var2, var3, var4, var5) {
		var0.calculateBounds();
		var0.computeNormals();
		var1.calculateBounds();
		var1.computeNormals();
		++ModelDefinition.normalMergeCount;
		let var6 = 0;
		let var7 = var1.vertexPositionsX;
		let var8 = var1.vertexCount;

		let var9;
		for (var9 = 0; var9 < var0.vertexCount; ++var9) {
			let var10 = var0.vertexNormals[var9];
			if (var10.magnitude != 0) {
				let var11 = var0.vertexPositionsY[var9] - var3;
				if (var11 <= var1.minY) {
					let var12 = var0.vertexPositionsX[var9] - var2;
					if (var12 >= var1.minX && var12 <= var1.maxX) {
						let var13 = var0.vertexPositionsZ[var9] - var4;
						if (var13 >= var1.minZ && var13 <= var1.maxZ) {
							for (let var14 = 0; var14 < var8; ++var14) {
								let var15 = var1.vertexNormals[var14];
								if (var12 == var7[var14] && var13 == var1.vertexPositionsZ[var14] && var11 == var1.vertexPositionsY[var14] && var15.magnitude != 0) {
									if (var0.vertexVertices == null) {
										var0.vertexVertices = new Array(var0.vertexCount);
									}

									if (var1.vertexVertices == null) {
										var1.vertexVertices = new Array(var8);
									}

									let var16 = var0.vertexVertices[var9];
									if (var16 == null) {
										var16 = var0.vertexVertices[var9] = Object.assign({}, var10);
									}

									let var17 = var1.vertexVertices[var14];
									if (var17 == null) {
										var17 = var1.vertexVertices[var14] = Object.assign({}, var15);
									}

									var16.x += var15.x;
									var16.y += var15.y;
									var16.z += var15.z;
									var16.magnitude += var15.magnitude;
									var17.x += var10.x;
									var17.y += var10.y;
									var17.z += var10.z;
									var17.magnitude += var10.magnitude;
									++var6;
									ModelDefinition.field1935[var9] = ModelDefinition.normalMergeCount;
									ModelDefinition.field1936[var14] = ModelDefinition.normalMergeCount;
								}
							}
						}
					}
				}
			}
		}

		if (var6 >= 3 && var5) {
			for (var9 = 0; var9 < var0.faceCount; ++var9) {
				if (ModelDefinition.field1935[var0.faceVertexIndices1[var9]] == ModelDefinition.normalMergeCount && ModelDefinition.field1935[var0.faceVertexIndices2[var9]] == ModelDefinition.normalMergeCount && ModelDefinition.field1935[var0.faceVertexIndices3[var9]] == ModelDefinition.normalMergeCount) {
					if (var0.faceRenderTypes == null) {
						var0.faceRenderTypes = new byte[var0.faceCount];
					}

					var0.faceRenderTypes[var9] = 2;
				}
			}

			for (var9 = 0; var9 < var1.faceCount; ++var9) {
				if (ModelDefinition.normalMergeCount == ModelDefinition.field1936[var1.faceVertexIndices1[var9]] && ModelDefinition.normalMergeCount == ModelDefinition.field1936[var1.faceVertexIndices2[var9]] && ModelDefinition.normalMergeCount == ModelDefinition.field1936[var1.faceVertexIndices3[var9]]) {
					if (var1.faceRenderTypes == null) {
						var1.faceRenderTypes = new byte[var1.faceCount];
					}

					var1.faceRenderTypes[var9] = 2;
				}
			}

		}
	}

    /**
     * Merge this model with another model
     * @param {ModelDefinition} otherModel Other model to combine with this
     * @param {boolean} init initialise empty arrays if necessary. set to false if merging a model into a blank model
     * @returns ModelDefinition
     */
    mergeWith(otherModel, init = true) {
        let verticesCount = this.vertexPositionsX.length;
        this.vertexPositionsX = [...this.vertexPositionsX, ...otherModel.vertexPositionsX];
        this.vertexPositionsY = [...this.vertexPositionsY, ...otherModel.vertexPositionsY];
        this.vertexPositionsZ = [...this.vertexPositionsZ, ...otherModel.vertexPositionsZ];
        this.faceVertexIndices1 = [
            ...this.faceVertexIndices1,
            ...otherModel.faceVertexIndices1.map((x) => x + verticesCount),
        ];
        this.faceVertexIndices2 = [
            ...this.faceVertexIndices2,
            ...otherModel.faceVertexIndices2.map((x) => x + verticesCount),
        ];
        this.faceVertexIndices3 = [
            ...this.faceVertexIndices3,
            ...otherModel.faceVertexIndices3.map((x) => x + verticesCount),
        ];

        let otherVertexGroup = otherModel.vertexGroups.map((x) => x.map((y) => y + verticesCount));
        let newVertexGroups =
            this.vertexGroups.length > otherVertexGroup.length
                ? Array(this.vertexGroups.length)
                : Array(otherModel.vertexGroups.length);
        for (let i = 0; i < newVertexGroups.length; i++) {
            if (this.vertexGroups[i] == undefined) {
                newVertexGroups[i] = otherVertexGroup[i];
                continue;
            }
            if (otherVertexGroup[i] == undefined) {
                newVertexGroups[i] = this.vertexGroups[i];
                continue;
            }
            newVertexGroups[i] = this.vertexGroups[i].concat(otherVertexGroup[i]);
        }
        this.vertexGroups = newVertexGroups;

        if (init && (this.faceTextures == undefined || this.faceTextures.length == 0))
            this.faceTextures = new Array(this.faceCount).fill(-1);
        if (init && (otherModel.faceTextures == undefined || otherModel.faceTextures.length == 0))
            otherModel.faceTextures = new Array(otherModel.faceCount).fill(-1);

        if (init && (this.faceRenderTypes == undefined || this.faceRenderTypes.length == 0))
            this.faceRenderTypes = new Array(this.faceCount).fill(-1);
        if (init && (otherModel.faceRenderTypes == undefined || otherModel.faceRenderTypes.length == 0))
            otherModel.faceRenderTypes = new Array(otherModel.faceCount).fill(-1);

        this.vertexCount += otherModel.vertexCount;
        this.faceCount += otherModel.faceCount;

        if (init && this.animayaGroups == undefined) this.animayaGroups = new Array(this.vertexCount).fill([0]);
        if (init && otherModel.animayaGroups == undefined)
            otherModel.animayaGroups = new Array(otherModel.vertexCount).fill([0]);

        if (init && this.animayaScales == undefined) this.animayaScales = new Array(this.vertexCount).fill([255]);
        if (init && otherModel.animayaScales == undefined)
            otherModel.animayaScales = new Array(otherModel.vertexCount).fill([255]);

        if (init && this.faceAlphas == undefined) this.faceAlphas = new Array(this.vertexCount).fill(0);
        if (init && otherModel.faceAlphas == undefined)
            otherModel.faceAlphas = new Array(otherModel.vertexCount).fill(0);


        let copy = (property) => {
            if (this[property] == undefined && otherModel[property] != undefined) {
                this[property] = otherModel[property];
            } else if (this[property] != undefined && otherModel[property] != undefined) {
                this[property] = [...this[property], ...otherModel[property]];
            }
        };

        copy("vertexSkins");
        copy("faceRenderTypes");
        copy("faceRenderPriorities");
        copy("faceAlphas");
        copy("faceSkins");
        copy("faceColors");
        copy("faceTextures");
        copy("textureCoords");
        copy("vertexNormals");
        copy("animayaGroups");
        copy("animayaScales");
        copy("faceTextureUCoordinates");
        copy("faceTextureVCoordinates");
        copy("overlayColors");
        return this;
    }

    async loadSkeletonAnims(cache, model, id, invertZ = true) {
        let frameDefs = (await cache.getAllFiles(IndexType.FRAMES.id, id)).map((x) => x.def);
        let loadedAnims = frameDefs.map((frameDef) => this.loadFrame(model, frameDef, invertZ));

        return loadedAnims;
    }


    /**
     *
     * @param {RSCache} cache OSRSCache object used to grab other files for the animation
     * @param {number} animationId Animation ID you want to play on this model
     * @param {boolean} compress Perform run-length encoding on animations to compress the sequence. Useful for maya anims.
     * @returns AnimationData
     */
    async loadAnimation(cache, animationId, invertZ = true, compress = false) {
        let animation = (await cache.getFile(IndexType.CONFIGS.id, ConfigType.SEQUENCE.id, animationId)).def;
        let vertexData;
        let lengths;

        if (animation.animMayaID != undefined && animation.animMayaID != -1) {
            let index = IndexType.FRAMES;
            if(this.rev229) {
                index = IndexType.KEYFRAMES;
            }
            let framesInfo = await cache.getAllFiles(index.id, animation.animMayaID >> 16, {
                isAnimaya: true,
            });

            const rawVertexData = this.loadMayaAnimation(framesInfo[0].def, animation, invertZ);
            
            // run-length encode maya animations
            if (compress) {
                let last = rawVertexData[0]
                let currentRun = 1;
                vertexData = [];
                lengths = [];
                for (let i = 1; i < rawVertexData.length; ++i) {
                    if (_.isEqual(rawVertexData[i], last)) {
                        currentRun++;
                    } else {
                        lengths.push(currentRun);
                        currentRun = 1;
                        vertexData.push(last);
                        last = rawVertexData[i];
                    }
                }
                vertexData.push(last);
                lengths.push(currentRun);
            } else {
                vertexData = rawVertexData;
                lengths = new Array(vertexData.length).fill(1);
            }
        } else {
            let shiftedId = animation.frameIDs[0] >> 16;
            let frameDefs = (await cache.getAllFiles(IndexType.FRAMES.id, shiftedId & 65535)).map((x) => x.def);
            let frames;
            
            if(animation.frameIDs.length == 1 && animation.frameIDs[0] & 65535 == 0) {
                
            }else{
                frames = animation.frameIDs.map((frameId) =>
                    frameDefs.find((frameDef) => frameDef?.id == (frameId & 65535)),
                );
            }
            let loadedFrames = frames.map((x) => this.loadFrame(this, x, invertZ));

            vertexData = loadedFrames.map((x) => x.vertices);
            lengths = animation.frameLengths;
        }

        return {
            vertexData,
            lengths,
        };
    }

    loadFrame(model, frame, invertZ = true) {
        let verticesX = [...model.vertexPositionsX];
        let verticesY = [...model.vertexPositionsY];
        let verticesZ = invertZ ? model.vertexPositionsZ.map((z) => -z) : [...model.vertexPositionsZ];
        let framemap = frame.framemap;
        let animOffsets = {
            x: 0,
            y: 0,
            z: 0,
        };

        for (let j = 0; j < frame.translator_x.length; ++j) {
            let type = frame.indexFrameIds[j];
            let fmType = framemap.types[type];
            let fm = framemap.frameMaps[type];
            let dx = frame.translator_x[j];
            let dy = frame.translator_y[j];
            let dz = frame.translator_z[j];

            this.animate(model.vertexGroups, verticesX, verticesY, verticesZ, fmType, fm, dx, dy, dz, animOffsets);
        }

        frame.vertices = [];
        for (let i = 0; i < verticesX.length; i++) {
            frame.vertices.push([verticesX[i], -verticesY[i], -verticesZ[i]]);
        }

        return frame;
    }

    animate(vertexGroups, verticesX, verticesY, verticesZ, type, frameMap, dx, dy, dz, animOffsets) {
        let var6 = frameMap.length;
        let var7;
        let var8;
        let var11;
        let var12;

        if (type == 0) {
            //change rotation origin
            var7 = 0;
            animOffsets.x = 0;
            animOffsets.y = 0;
            animOffsets.z = 0;

            for (var8 = 0; var8 < frameMap.length; ++var8) {
                let boneGroup = frameMap[var8];
                if (boneGroup < vertexGroups.length) {
                    let bones = vertexGroups[boneGroup];

                    for (var11 = 0; var11 < bones.length; ++var11) {
                        var12 = bones[var11];
                        animOffsets.x += verticesX[var12];
                        animOffsets.y += verticesY[var12];
                        animOffsets.z += verticesZ[var12];
                        ++var7;
                    }
                }
            }

            if (var7 > 0) {
                animOffsets.x = dx + animOffsets.x / var7;
                animOffsets.y = dy + animOffsets.y / var7;
                animOffsets.z = dz + animOffsets.z / var7;
            } else {
                animOffsets.x = dx;
                animOffsets.y = dy;
                animOffsets.z = dz;
            }
        } else {
            let var18;
            let var19;
            if (type == 1) {
                //translation
                for (var7 = 0; var7 < frameMap.length; ++var7) {
                    var8 = frameMap[var7];
                    if (var8 < vertexGroups.length) {
                        var18 = vertexGroups[var8];

                        for (var19 = 0; var19 < var18.length; ++var19) {
                            var11 = var18[var19];
                            verticesX[var11] += dx;
                            verticesY[var11] += dy;
                            verticesZ[var11] += dz;
                        }
                    }
                }
            } else if (type == 2) {
                //rotation
                for (var7 = 0; var7 < frameMap.length; ++var7) {
                    var8 = frameMap[var7];
                    if (var8 < vertexGroups.length) {
                        var18 = vertexGroups[var8];

                        for (var19 = 0; var19 < var18.length; ++var19) {
                            var11 = var18[var19];
                            verticesX[var11] -= animOffsets.x;
                            verticesY[var11] -= animOffsets.y;
                            verticesZ[var11] -= animOffsets.z;
                            var12 = (dx & 255) * 8;
                            let var13 = (dy & 255) * 8;
                            let var14 = (dz & 255) * 8;
                            let var15;
                            let var16;
                            let var17;
                            if (var14 != 0) {
                                var15 = Math.floor(65536 * Math.sin((var14 * Math.PI) / 1024));
                                var16 = Math.floor(65536 * Math.cos((var14 * Math.PI) / 1024));
                                var17 = (var15 * verticesY[var11] + var16 * verticesX[var11]) >> 16;
                                verticesY[var11] = (var16 * verticesY[var11] - var15 * verticesX[var11]) >> 16;
                                verticesX[var11] = var17;
                            }

                            if (var12 != 0) {
                                var15 = Math.floor(65536 * Math.sin((var12 * Math.PI) / 1024));
                                var16 = Math.floor(65536 * Math.cos((var12 * Math.PI) / 1024));
                                var17 = (var16 * verticesY[var11] - var15 * verticesZ[var11]) >> 16;
                                verticesZ[var11] = (var15 * verticesY[var11] + var16 * verticesZ[var11]) >> 16;
                                verticesY[var11] = var17;
                            }

                            if (var13 != 0) {
                                var15 = Math.floor(65536 * Math.sin((var13 * Math.PI) / 1024));
                                var16 = Math.floor(65536 * Math.cos((var13 * Math.PI) / 1024));
                                var17 = (var15 * verticesZ[var11] + var16 * verticesX[var11]) >> 16;
                                verticesZ[var11] = (var16 * verticesZ[var11] - var15 * verticesX[var11]) >> 16;
                                verticesX[var11] = var17;
                            }

                            verticesX[var11] += animOffsets.x;
                            verticesY[var11] += animOffsets.y;
                            verticesZ[var11] += animOffsets.z;
                        }
                    }
                }
            } else if (type == 3) {
                //scaling
                for (var7 = 0; var7 < frameMap.length; ++var7) {
                    var8 = frameMap[var7];
                    if (var8 < vertexGroups.length) {
                        var18 = vertexGroups[var8];

                        for (var19 = 0; var19 < var18.length; ++var19) {
                            var11 = var18[var19];
                            verticesX[var11] -= animOffsets.x;
                            verticesY[var11] -= animOffsets.y;
                            verticesZ[var11] -= animOffsets.z;
                            verticesX[var11] = (dx * verticesX[var11]) / 128;
                            verticesY[var11] = (dy * verticesY[var11]) / 128;
                            verticesZ[var11] = (dz * verticesZ[var11]) / 128;
                            verticesX[var11] += animOffsets.x;
                            verticesY[var11] += animOffsets.y;
                            verticesZ[var11] += animOffsets.z;
                        }
                    }
                }
            } else if (type == 5) {
            }
        }
    }

    loadMayaAnimation(frameDef, sequenceDefinition, invertZ = true) {
        let animations = [];
        let animayaSkeleton = frameDef.framemap.animayaSkeleton;

        let verticesX = [];
        let verticesY = [];
        let verticesZ = [];
        for (let currentFrame = 0; currentFrame < sequenceDefinition.animMayaEnd; currentFrame++) {
            let var6 = 0;
            let bones = frameDef.framemap.animayaSkeleton.getAllBones();
            for (let index = 0; index < bones.length; ++index) {
                let bone = bones[index];
                frameDef.method727(currentFrame, bone, var6, frameDef.field1257);
                ++var6;
            }
            if (this.animayaGroups != null) {
                let animatedFrameVertices = [];

                for (let vertexIndex = 0; vertexIndex < this.vertexCount; ++vertexIndex) {
                    let bones = this.animayaGroups[vertexIndex];

                    if (bones != null && bones.length != 0) {
                        let scales = this.animayaScales[vertexIndex];

                        let matrix = new Matrix();
                        matrix.zero();

                        for (let i = 0; i < bones.length; ++i) {
                            let boneIndex = bones[i];
                            let bone = animayaSkeleton.getBone(boneIndex);
                            if (bone != null) {
                                let matrix2 = new Matrix();
                                let matrix3 = new Matrix();

                                matrix2.setScale(scales[i] / 255);
                                matrix3.copy(bone.method687(frameDef.field1257));
                                matrix3.multiply(matrix2);
                                matrix.add(matrix3);
                            }
                        }

                        let var3 = this.vertexPositionsX[vertexIndex];
                        let var4 = -this.vertexPositionsY[vertexIndex];
                        let var5 = (invertZ ? 1 : -1) * this.vertexPositionsZ[vertexIndex];
                        let var6 = 1.0;
                        verticesX[vertexIndex] =
                            matrix.matrixVals[0] * var3 +
                            matrix.matrixVals[4] * var4 +
                            matrix.matrixVals[8] * var5 +
                            matrix.matrixVals[12] * var6;
                        verticesY[vertexIndex] = -(
                            matrix.matrixVals[1] * var3 +
                            matrix.matrixVals[5] * var4 +
                            matrix.matrixVals[9] * var5 +
                            matrix.matrixVals[13] * var6
                        );
                        verticesZ[vertexIndex] = -(
                            matrix.matrixVals[2] * var3 +
                            matrix.matrixVals[6] * var4 +
                            matrix.matrixVals[10] * var5 +
                            matrix.matrixVals[14] * var6
                        );

                        animatedFrameVertices.push([
                            verticesX[vertexIndex],
                            -verticesY[vertexIndex],
                            -verticesZ[vertexIndex],
                        ]);
                    }
                }
                animations.push(animatedFrameVertices);
            }
        }

        return animations;
    }

    /**
     *
     * @param {ModelDefinition} otherModel Check if this model is the same
     * @returns boolean
     */
    equals(otherModel) {
        if (this.vertexCount != otherModel.vertexCount) return false;
        if (this.faceCount != otherModel.faceCount) return false;

        let sameFaceColors = this.faceColors.every((x, i) => x == otherModel.faceColors[i]);
        let sameVerticiesX = this.vertexPositionsX.every((x, i) => x == otherModel.vertexPositionsX[i]);
        let sameVerticiesY = this.vertexPositionsY.every((x, i) => x == otherModel.vertexPositionsY[i]);
        let sameVerticiesZ = this.vertexPositionsZ.every((x, i) => x == otherModel.vertexPositionsZ[i]);

		let sameRenderTypes = true;
		if (this.faceRenderTypes != undefined && otherModel.faceRenderTypes != undefined) {
			sameRenderTypes = this.faceRenderTypes.every((x, i) => x == otherModel.faceRenderTypes[i])
		}

		let sameNormals = true;
		if (this.vertexVertices != undefined && otherModel.vertexVertices != undefined) {
			sameNormals = this.vertexVertices.every((x, i) => x == otherModel.vertexVertices[i]);
		} else if (this.vertexVertices == undefined ^ otherModel.vertexVertices == undefined) {
			sameNormals = false;
		}

		return sameVerticiesX && sameVerticiesY && sameVerticiesZ && sameFaceColors && sameFaceColors && sameNormals && sameRenderTypes;
	}


    computeAnimationTables() {
        var groupCounts = [];
        var numGroups = 0;
        var var3, var4, var10002;
        if (this.vertexSkins != null) {
            for (var3 = 0; var3 < this.vertexCount; ++var3) {
                var4 = this.vertexSkins[var3];
                ++groupCounts[var4];
                if (var4 > numGroups) {
                    numGroups = var4;
                }
            }

            this.vertexGroups = [];

            for (var3 = 0; var3 <= numGroups; ++var3) {
                this.vertexGroups[var3] = [];
                groupCounts[var3] = 0;
            }

            for (var3 = 0; var3 < this.vertexCount; this.vertexGroups[var4][groupCounts[var4]++] = var3++) {
                var4 = this.vertexSkins[var3];
            }

            this.vertexSkins = null;
        }
        if (this.faceSkins != null) {
            // L: 785
            groupCounts = []; // L: 786
            numGroups = 0; // L: 787

            for (var3 = 0; var3 < this.faceCount; ++var3) {
                // L: 788
                var4 = this.faceSkins[var3]; // L: 789
                var10002 = groupCounts[var4]++; // L: 790
                if (var4 > numGroups) {
                    // L: 791
                    numGroups = var4;
                }
            }

            this.faceLabelsAlpha = []; // L: 793

            for (var3 = 0; var3 <= numGroups; ++var3) {
                // L: 794
                this.faceLabelsAlpha[var3] = []; // L: 795
                groupCounts[var3] = 0; // L: 796
            }

            for (var3 = 0; var3 < this.faceCount; this.faceLabelsAlpha[var4][groupCounts[var4]++] = var3++) {
                // L: 798 800
                var4 = this.faceSkins[var3]; // L: 799
            }

            this.faceSkins = null; // L: 802
        }
        // triangleSkinValues is here
    }

    computeTextureUVCoordinates(def) {
        this.faceTextureUCoordinates = new Array(this.faceCount).fill([0, 0, 0]);
        this.faceTextureVCoordinates = new Array(this.faceCount).fill([0, 0, 0]);

        if (this.faceTextures == null) {
            return;
        }

        for (let i = 0; i < this.faceCount; i++) {
            if (this.faceTextures[i] == -1) {
                continue;
            }

            let u0, u1, u2, v0, v1, v2;

            if (this.textureCoords != null && this.textureCoords[i] != -1) {
                let tfaceIdx = this.textureCoords[i] & 0xff;
                let triangleA = this.faceVertexIndices1[i];
                let triangleB = this.faceVertexIndices2[i];
                let triangleC = this.faceVertexIndices3[i];
                let texA = this.texIndices1[tfaceIdx];
                let texB = this.texIndices2[tfaceIdx];
                let texC = this.texIndices3[tfaceIdx];

                // v1 = vertex[texA]
                let v1x = this.vertexPositionsX[texA];
                let v1y = this.vertexPositionsY[texA];
                let v1z = this.vertexPositionsZ[texA];
                // v2 = vertex[texB] - v1
                let v2x = this.vertexPositionsX[texB] - v1x;
                let v2y = this.vertexPositionsY[texB] - v1y;
                let v2z = this.vertexPositionsZ[texB] - v1z;
                // v3 = vertex[texC] - v1
                let v3x = this.vertexPositionsX[texC] - v1x;
                let v3y = this.vertexPositionsY[texC] - v1y;
                let v3z = this.vertexPositionsZ[texC] - v1z;

                // v4 = vertex[triangleA] - v1
                let v4x = this.vertexPositionsX[triangleA] - v1x;
                let v4y = this.vertexPositionsY[triangleA] - v1y;
                let v4z = this.vertexPositionsZ[triangleA] - v1z;
                // v5 = vertex[triangleB] - v1
                let v5x = this.vertexPositionsX[triangleB] - v1x;
                let v5y = this.vertexPositionsY[triangleB] - v1y;
                let v5z = this.vertexPositionsZ[triangleB] - v1z;
                // v6 = vertex[triangleC] - v1
                let v6x = this.vertexPositionsX[triangleC] - v1x;
                let v6y = this.vertexPositionsY[triangleC] - v1y;
                let v6z = this.vertexPositionsZ[triangleC] - v1z;

                // v7 = v2 x v3
                let v7x = v2y * v3z - v2z * v3y;
                let v7y = v2z * v3x - v2x * v3z;
                let v7z = v2x * v3y - v2y * v3x;

                // v8 = v3 x v7
                let v8x = v3y * v7z - v3z * v7y;
                let v8y = v3z * v7x - v3x * v7z;
                let v8z = v3x * v7y - v3y * v7x;

                // f = 1 / (v8 ⋅ v2)
                let f = 1.0 / (v8x * v2x + v8y * v2y + v8z * v2z);

                // u0 = (v8 ⋅ v4) * f
                u0 = (v8x * v4x + v8y * v4y + v8z * v4z) * f;
                // u1 = (v8 ⋅ v5) * f
                u1 = (v8x * v5x + v8y * v5y + v8z * v5z) * f;
                // u2 = (v8 ⋅ v6) * f
                u2 = (v8x * v6x + v8y * v6y + v8z * v6z) * f;

                // v8 = v2 x v7
                v8x = v2y * v7z - v2z * v7y;
                v8y = v2z * v7x - v2x * v7z;
                v8z = v2x * v7y - v2y * v7x;

                // f = 1 / (v8 ⋅ v3)
                f = 1.0 / (v8x * v3x + v8y * v3y + v8z * v3z);

                // v0 = (v8 ⋅ v4) * f
                v0 = (v8x * v4x + v8y * v4y + v8z * v4z) * f;
                // v1 = (v8 ⋅ v5) * f
                v1 = (v8x * v5x + v8y * v5y + v8z * v5z) * f;
                // v2 = (v8 ⋅ v6) * f
                v2 = (v8x * v6x + v8y * v6y + v8z * v6z) * f;
            } else {
                // Without a texture face, the client assigns tex = triangle, but the resulting
                // calculations can be reduced:
                //
                // v1 = vertex[texA]
                // v2 = vertex[texB] - v1
                // v3 = vertex[texC] - v1
                //
                // v4 = 0
                // v5 = v2
                // v6 = v3
                //
                // v7 = v2 x v3
                //
                // v8 = v3 x v7
                // u0 = (v8 . v4) / (v8 . v2) // 0 because v4 is 0
                // u1 = (v8 . v5) / (v8 . v2) // 1 because v5=v2
                // u2 = (v8 . v6) / (v8 . v2) // 0 because v8 is perpendicular to v3/v6
                //
                // v8 = v2 x v7
                // v0 = (v8 . v4) / (v8 ⋅ v3) // 0 because v4 is 0
                // v1 = (v8 . v5) / (v8 ⋅ v3) // 0 because v8 is perpendicular to v5/v2
                // v2 = (v8 . v6) / (v8 ⋅ v3) // 1 because v6=v3

                u0 = 0;
                v0 = 0;

                u1 = 1;
                v1 = 0;

                u2 = 0;
                v2 = 1;
            }

            this.faceTextureUCoordinates[i] = [u0, u1, u2];
            this.faceTextureVCoordinates[i] = [v0, v1, v2];
        }
    }

	computeNormalsOld() {
		this.vertexNormals = [];
		let rotatedVerts = {
			vertexPositionsX: Object.assign([], this.vertexPositionsX),
			vertexPositionsY: Object.assign([], this.vertexPositionsY),
			vertexPositionsZ: Object.assign([], this.vertexPositionsZ)
		}
		//rotatedVerts = ModelDefinition.rotated(rotatedVerts, this.rotation.y, 1);

		let var1;
		for (var1 = 0; var1 < this.vertexCount; ++var1) {
			this.vertexNormals[var1] = { x: 0, y: 0, z: 0, magnitude: 0 };
		}
		for (var1 = 0; var1 < this.faceCount; ++var1) {
			let var2 = this.faceVertexIndices1[var1];
			let var3 = this.faceVertexIndices2[var1];
			let var4 = this.faceVertexIndices3[var1];
			let var5 = rotatedVerts.vertexPositionsX[var3] - rotatedVerts.vertexPositionsX[var2];
			let var6 = rotatedVerts.vertexPositionsY[var3] - rotatedVerts.vertexPositionsY[var2];
			let var7 = rotatedVerts.vertexPositionsZ[var3] - rotatedVerts.vertexPositionsZ[var2];
			let var8 = rotatedVerts.vertexPositionsX[var4] - rotatedVerts.vertexPositionsX[var2];
			let var9 = rotatedVerts.vertexPositionsY[var4] - rotatedVerts.vertexPositionsY[var2];
			let var10 = rotatedVerts.vertexPositionsZ[var4] - rotatedVerts.vertexPositionsZ[var2];
			let var11 = var6 * var10 - var9 * var7;
			let var12 = var7 * var8 - var10 * var5;

			let var13;
			for (var13 = var5 * var9 - var8 * var6; var11 > 8192 || var12 > 8192 || var13 > 8192 || var11 < -8192 || var12 < -8192 || var13 < -8192; var13 >>= 1) {
				var11 >>= 1;
				var12 >>= 1;
			}

			let var14 = parseInt(Math.sqrt(var11 * var11 + var12 * var12 + var13 * var13));
			if (var14 <= 0) {
				var14 = 1;
			}

			var11 = var11 * 256 / var14;
			var12 = var12 * 256 / var14;
			var13 = var13 * 256 / var14;
			let var15;
			if (this.faceRenderTypes == null) {
				var15 = 0;
			} else {
				var15 = this.faceRenderTypes[var1];
			}

			//osrs doesnt have || var15 == 1
			//we only use this because we dont have per face normals
			//i left the original incase we do add it
			//-dez
			if (var15 == 0 || var15 == 1) {
				let var16 = this.vertexNormals[var2];
				var16.x += var11;
				var16.y += var12;
				var16.z += var13;
				++var16.magnitude;
				var16 = this.vertexNormals[var3];
				var16.x += var11;
				var16.y += var12;
				var16.z += var13;
				++var16.magnitude;
				var16 = this.vertexNormals[var4];
				var16.x += var11;
				var16.y += var12;
				var16.z += var13;
				++var16.magnitude;

			} else if (var15 == 1) {
				if (this.faceNormals == undefined) {
					this.faceNormals = [];
				}

				let var17 = this.faceNormals[var1] = {};
				var17.x = var11;
				var17.y = var12;
				var17.z = var13;
			}
		}
	}

	computeNormals()
	{
		if (this.vertexNormals != undefined) {
			return;
		}

		this.vertexNormals = new Array(this.vertexCount);

		let var1;
		for (var1 = 0; var1 < this.vertexCount; ++var1){
			this.vertexNormals[var1] = new VertexNormal();
		}

		for (var1 = 0; var1 < this.faceCount; ++var1) {
			let vertexA = this.faceVertexIndices1[var1];
			let vertexB = this.faceVertexIndices2[var1];
			let vertexC = this.faceVertexIndices3[var1];

			let xA = this.vertexPositionsX[vertexB] - this.vertexPositionsX[vertexA];
			let yA = this.vertexPositionsY[vertexB] - this.vertexPositionsY[vertexA];
			let zA = this.vertexPositionsZ[vertexB] - this.vertexPositionsZ[vertexA];

			let xB = this.vertexPositionsX[vertexC] - this.vertexPositionsX[vertexA];
			let yB = this.vertexPositionsY[vertexC] - this.vertexPositionsY[vertexA];
			let zB = this.vertexPositionsZ[vertexC] - this.vertexPositionsZ[vertexA];

			// Compute cross product
			let var11 = yA * zB - yB * zA;
			let var12 = zA * xB - zB * xA;
			let var13 = xA * yB - xB * yA;

			while (var11 > 8192 || var12 > 8192 || var13 > 8192 || var11 < -8192 || var12 < -8192 || var13 < -8192) {
				var11 >>= 1;
				var12 >>= 1;
				var13 >>= 1;
			}

			let length = Math.floor(Math.sqrt(var11 * var11 + var12 * var12 + var13 * var13));
			if (length <= 0)
			{
				length = 1;
			}

			var11 = var11 * 256 / length;
			var12 = var12 * 256 / length;
			var13 = var13 * 256 / length;

			let var15;
			if (this.faceRenderTypes == null) {
				var15 = 0;
			}
			else {
				var15 = this.faceRenderTypes[var1];
			}

			if (var15 == 0) {
				let var16 = this.vertexNormals[vertexA];
				var16.x += var11;
				var16.y += var12;
				var16.z += var13;
				++var16.magnitude;

				var16 = this.vertexNormals[vertexB];
				var16.x += var11;
				var16.y += var12;
				var16.z += var13;
				++var16.magnitude;

				var16 = this.vertexNormals[vertexC];
				var16.x += var11;
				var16.y += var12;
				var16.z += var13;
				++var16.magnitude;
			}
			else if (var15 == 1) {
				if (this.faceNormals == null) {
					this.faceNormals = new Array(this.faceCount);
				}

				let var17 = this.faceNormals[var1] = new FaceNormal();
				var17.x = var11;
				var17.y = var12;
				var17.z = var13;
			}
		}
	}
}

export default class ModelLoader {
    configureForRevision(revision, indexRevision) {
        this.rev229 = indexRevision >= 969;
    }

    load(bytes, id) {
        let def = new ModelDefinition();
        def.id = id;
        let dataview = new DataView(bytes.buffer);
        if (dataview.getInt8(dataview.byteLength - 1) == -3 && dataview.getInt8(dataview.byteLength - 2) == -1) {
            this.load3(def, dataview);
        } else if (dataview.getInt8(dataview.byteLength - 1) == -2 && dataview.getInt8(dataview.byteLength - 2) == -1) {
            this.load2(def, dataview);
        } else if (dataview.getInt8(dataview.byteLength - 1) == -1 && dataview.getInt8(dataview.byteLength - 2) == -1) {
            this.load1(def, dataview);
        } else {
            this.loadOriginal(def, dataview);
        }

		def.computeNormals(def);
		def.computeTextureUVCoordinates(def);
		def.computeAnimationTables(def);

        return def;
    }

    load3(def, var1) {
        let var2 = new DataView(var1.buffer);
        let var3 = new DataView(var1.buffer);
        let var4 = new DataView(var1.buffer);
        let var5 = new DataView(var1.buffer);
        let var6 = new DataView(var1.buffer);
        let var7 = new DataView(var1.buffer);
        let var8 = new DataView(var1.buffer);
        var2.setPosition(var1.byteLength - 26);
        let var9 = var2.readUint16();
        let numFaces = var2.readUint16();
        let var11 = var2.readUint8();
        let var12 = var2.readUint8();
        let var13 = var2.readUint8();
        let var14 = var2.readUint8();
        let var15 = var2.readUint8();
        let var16 = var2.readUint8();
        let var17 = var2.readUint8();
        let var18 = var2.readUint8();
        let var19 = var2.readUint16();
        let var20 = var2.readUint16();
        let var21 = var2.readUint16();
        let var22 = var2.readUint16();
        let var23 = var2.readUint16();
        let var24 = var2.readUint16();
        let var25 = 0;
        let var26 = 0;
        let var27 = 0;
        let var28;
        if (var11 > 0) {
            def.textureRenderTypes = [];
            var2.setPosition(0);

            for (var28 = 0; var28 < var11; ++var28) {
                let var29 = (def.textureRenderTypes[var28] = var2.readInt8());
                if (var29 == 0) {
                    ++var25;
                }

                if (var29 >= 1 && var29 <= 3) {
                    ++var26;
                }

                if (var29 == 2) {
                    ++var27;
                }
            }
        }

        var28 = var11 + var9;
        let var58 = var28;
        if (var12 == 1) {
            var28 += numFaces;
        }

        let var30 = var28;
        var28 += numFaces;
        let var31 = var28;
        if (var13 == 255) {
            var28 += numFaces;
        }

        let var32 = var28;
        if (var15 == 1) {
            var28 += numFaces;
        }

        let var33 = var28;
        var28 += var24;
        let var34 = var28;
        if (var14 == 1) {
            var28 += numFaces;
        }

        let var35 = var28;
        var28 += var22;
        let var36 = var28;
        if (var16 == 1) {
            var28 += numFaces * 2;
        }

        let var37 = var28;
        var28 += var23;
        let var38 = var28;
        var28 += numFaces * 2;
        let var39 = var28;
        var28 += var19;
        let var40 = var28;
        var28 += var20;
        let var41 = var28;
        var28 += var21;
        let var42 = var28;
        var28 += var25 * 6;
        let var43 = var28;
        var28 += var26 * 6;
        let var44 = var28;
        var28 += var26 * 6;
        let var45 = var28;
        var28 += var26 * 2;
        let var46 = var28;
        var28 += var26;
        let var47 = var28;
        var28 = var28 + var26 * 2 + var27 * 2;
        def.vertexCount = var9;
        def.faceCount = numFaces;
        def.numTextureFaces = var11;
        def.vertexPositionsX = [];
        def.vertexPositionsY = [];
        def.vertexPositionsZ = [];
        def.faceVertexIndices1 = [];
        def.faceVertexIndices2 = [];
        def.faceVertexIndices3 = [];
        if (var17 == 1) {
            def.vertexSkins = [];
        }

        if (var12 == 1) {
            def.faceRenderTypes = [];
        }

        if (var13 == 255) {
            def.faceRenderPriorities = [];
        } else {
            def.priority = var13;
        }

        if (var14 == 1) {
            def.faceAlphas = [];
        }

        if (var15 == 1) {
            def.faceSkins = [];
        }

        if (var16 == 1) {
            def.faceTextures = [];
        }

        if (var16 == 1 && var11 > 0) {
            def.textureCoords = new Array(numFaces).fill(0);
        }

        if (var18 == 1) {
            //def.animayaGroups = new int[var9][];
            //def.animayaScales = new int[var9][];
            def.animayaGroups = new Array(var9);
            def.animayaScales = new Array(var9);
        }

        def.faceColors = [];
        if (var11 > 0) {
            def.texIndices1 = [];
            def.texIndices2 = [];
            def.texIndices3 = [];
        }

        var2.setPosition(var11);
        var3.setPosition(var39);
        var4.setPosition(var40);
        var5.setPosition(var41);
        var6.setPosition(var33);
        let var48 = 0;
        let var49 = 0;
        let var50 = 0;

        let var51;
        let var52;
        let var53;
        let var54;
        let var55;
        for (var51 = 0; var51 < var9; ++var51) {
            var52 = var2.readUint8();
            var53 = 0;
            if ((var52 & 1) != 0) {
                var53 = var3.readShortSmart();
            }

            var54 = 0;
            if ((var52 & 2) != 0) {
                var54 = var4.readShortSmart();
            }

            var55 = 0;
            if ((var52 & 4) != 0) {
                var55 = var5.readShortSmart();
            }

            def.vertexPositionsX[var51] = var48 + var53;
            def.vertexPositionsY[var51] = var49 + var54;
            def.vertexPositionsZ[var51] = var50 + var55;
            var48 = def.vertexPositionsX[var51];
            var49 = def.vertexPositionsY[var51];
            var50 = def.vertexPositionsZ[var51];
            if (var17 == 1) {
                def.vertexSkins[var51] = var6.readUint8();
            }
        }

        if (var18 == 1) {
            for (var51 = 0; var51 < var9; ++var51) {
                var52 = var6.readUint8();
                def.animayaGroups[var51] = [];
                def.animayaScales[var51] = [];

                for (var53 = 0; var53 < var52; ++var53) {
                    def.animayaGroups[var51][var53] = var6.readUint8();
                    def.animayaScales[var51][var53] = var6.readUint8();
                }
            }
        }

        var2.setPosition(var38);
        var3.setPosition(var58);
        var4.setPosition(var31);
        var5.setPosition(var34);
        var6.setPosition(var32);
        var7.setPosition(var36);
        var8.setPosition(var37);

        for (var51 = 0; var51 < numFaces; ++var51) {
            def.faceColors[var51] = var2.readUint16();
            if (var12 == 1) {
                def.faceRenderTypes[var51] = var3.readInt8();
            }

            if (var13 == 255) {
                def.faceRenderPriorities[var51] = var4.readInt8();
            }

            if (var14 == 1) {
                def.faceAlphas[var51] = var5.readUint8();
            }

            if (var15 == 1) {
                def.faceSkins[var51] = var6.readUint8();
            }

            if (var16 == 1) {
                def.faceTextures[var51] = var7.readUint16() - 1;
            }

            if (def.textureCoords != null && def.faceTextures[var51] != -1) {
                def.textureCoords[var51] = var8.readUint8() - 1;
            }
        }

        var2.setPosition(var35);
        var3.setPosition(var30);
        var51 = 0;
        var52 = 0;
        var53 = 0;
        var54 = 0;

        let var56;
        for (var55 = 0; var55 < numFaces; ++var55) {
            var56 = var3.readUint8();
            if (var56 == 1) {
                var51 = var2.readShortSmart() + var54;
                var52 = var2.readShortSmart() + var51;
                var53 = var2.readShortSmart() + var52;
                var54 = var53;
                def.faceVertexIndices1[var55] = var51;
                def.faceVertexIndices2[var55] = var52;
                def.faceVertexIndices3[var55] = var53;
            }

            if (var56 == 2) {
                var52 = var53;
                var53 = var2.readShortSmart() + var54;
                var54 = var53;
                def.faceVertexIndices1[var55] = var51;
                def.faceVertexIndices2[var55] = var52;
                def.faceVertexIndices3[var55] = var53;
            }

            if (var56 == 3) {
                var51 = var53;
                var53 = var2.readShortSmart() + var54;
                var54 = var53;
                def.faceVertexIndices1[var55] = var51;
                def.faceVertexIndices2[var55] = var52;
                def.faceVertexIndices3[var55] = var53;
            }

            if (var56 == 4) {
                let var57 = var51;
                var51 = var52;
                var52 = var57;
                var53 = var2.readShortSmart() + var54;
                var54 = var53;
                def.faceVertexIndices1[var55] = var51;
                def.faceVertexIndices2[var55] = var57;
                def.faceVertexIndices3[var55] = var53;
            }
        }

        var2.setPosition(var42);
        var3.setPosition(var43);
        var4.setPosition(var44);
        var5.setPosition(var45);
        var6.setPosition(var46);
        var7.setPosition(var47);

        for (var55 = 0; var55 < var11; ++var55) {
            var56 = def.textureRenderTypes[var55] & 255;
            if (var56 == 0) {
                def.texIndices1[var55] = var2.readUint16();
                def.texIndices2[var55] = var2.readUint16();
                def.texIndices3[var55] = var2.readUint16();
            }
        }

        var2.setPosition(var28);
        var55 = var2.readUint8();
        if (var55 != 0) {
            var2.readUint16();
            var2.readUint16();
            var2.readUint16();
            var2.readInt32();
        }
    }

    load2(def, var1) {
        let var2 = false;
        let var3 = false;
        let var4 = new DataView(var1.buffer);
        let var5 = new DataView(var1.buffer);
        let var6 = new DataView(var1.buffer);
        let var7 = new DataView(var1.buffer);
        let var8 = new DataView(var1.buffer);
        var4.setPosition(var1.byteLength - 23);
        let var9 = var4.readUint16();
        let var10 = var4.readUint16();
        let var11 = var4.readUint8();
        let var12 = var4.readUint8();
        let var13 = var4.readUint8();
        let var14 = var4.readUint8();
        let var15 = var4.readUint8();
        let var16 = var4.readUint8();
        let var17 = var4.readUint8();
        let var18 = var4.readUint16();
        let var19 = var4.readUint16();
        let var20 = var4.readUint16();
        let var21 = var4.readUint16();
        let var22 = var4.readUint16();
        let var23 = 0;
        let var24 = var23 + var9;
        let var25 = var24;
        var24 += var10;
        let var26 = var24;
        if (var13 == 255) {
            var24 += var10;
        }

        let var27 = var24;
        if (var15 == 1) {
            var24 += var10;
        }

        let var28 = var24;
        if (var12 == 1) {
            var24 += var10;
        }

        let var29 = var24;
        var24 += var22;
        let var30 = var24;
        if (var14 == 1) {
            var24 += var10;
        }

        let var31 = var24;
        var24 += var21;
        let var32 = var24;
        var24 += var10 * 2;
        let var33 = var24;
        var24 += var11 * 6;
        let var34 = var24;
        var24 += var18;
        let var35 = var24;
        var24 += var19;
        let var10000 = var24 + var20;
        def.vertexCount = var9;
        def.faceCount = var10;
        def.numTextureFaces = var11;
        def.vertexPositionsX = [];
        def.vertexPositionsY = [];
        def.vertexPositionsZ = [];
        def.faceVertexIndices1 = [];
        def.faceVertexIndices2 = [];
        def.faceVertexIndices3 = [];
        if (var11 > 0) {
            def.textureRenderTypes = [];
            def.texIndices1 = [];
            def.texIndices2 = [];
            def.texIndices3 = [];
        }

        if (var16 == 1) {
            def.vertexSkins = [];
        }

        if (var12 == 1) {
            def.faceRenderTypes = [];
            def.textureCoords = [];
            def.faceTextures = [];
        }

        if (var13 == 255) {
            def.faceRenderPriorities = [];
        } else {
            def.priority = var13;
        }

        if (var14 == 1) {
            def.faceAlphas = [];
        }

        if (var15 == 1) {
            def.faceSkins = [];
        }

        if (var17 == 1) {
            //def.animayaGroups = new int[var9][];
            //def.animayaScales = new int[var9][];

            def.animayaGroups = [];
            def.animayaScales = [];
        }

        def.faceColors = [];
        var4.setPosition(var23);
        var5.setPosition(var34);
        var6.setPosition(var35);
        var7.setPosition(var24);
        var8.setPosition(var29);
        let var37 = 0;
        let var38 = 0;
        let var39 = 0;

        let var40;
        let var41;
        let var42;
        let var43;
        let var44;

        for (var40 = 0; var40 < var9; ++var40) {
            var41 = var4.readUint8();
            var42 = 0;
            if ((var41 & 1) != 0) {
                var42 = var5.readShortSmart();
            }

            var43 = 0;
            if ((var41 & 2) != 0) {
                var43 = var6.readShortSmart();
            }

            var44 = 0;
            if ((var41 & 4) != 0) {
                var44 = var7.readShortSmart();
            }

            def.vertexPositionsX[var40] = var37 + var42;
            def.vertexPositionsY[var40] = var38 + var43;
            def.vertexPositionsZ[var40] = var39 + var44;
            var37 = def.vertexPositionsX[var40];
            var38 = def.vertexPositionsY[var40];
            var39 = def.vertexPositionsZ[var40];
            if (var16 == 1) {
                def.vertexSkins[var40] = var8.readUint8();
            }
        }

        if (var17 == 1) {
            for (var40 = 0; var40 < var9; ++var40) {
                var41 = var8.readUint8();
                def.animayaGroups[var40] = [];
                def.animayaScales[var40] = [];

                for (var42 = 0; var42 < var41; ++var42) {
                    def.animayaGroups[var40][var42] = var8.readUint8();
                    def.animayaScales[var40][var42] = var8.readUint8();
                }
            }
        }

        var4.setPosition(var32);
        var5.setPosition(var28);
        var6.setPosition(var26);
        var7.setPosition(var30);
        var8.setPosition(var27);

        for (var40 = 0; var40 < var10; ++var40) {
            def.faceColors[var40] = var4.readUint16();
            if (var12 == 1) {
                var41 = var5.readUint8();
                if ((var41 & 1) == 1) {
                    def.faceRenderTypes[var40] = 1;
                    var2 = true;
                } else {
                    def.faceRenderTypes[var40] = 0;
                }

                if ((var41 & 2) == 2) {
                    def.textureCoords[var40] = var41 >> 2;
                    def.faceTextures[var40] = def.faceColors[var40];
                    def.faceColors[var40] = 127;
                    if (def.faceTextures[var40] != -1) {
                        var3 = true;
                    }
                } else {
                    def.textureCoords[var40] = -1;
                    def.faceTextures[var40] = -1;
                }
            }

            if (var13 == 255) {
                def.faceRenderPriorities[var40] = var6.readInt8();
            }

            if (var14 == 1) {
                def.faceAlphas[var40] = var7.readInt8();
            }

            if (var15 == 1) {
                def.faceSkins[var40] = var8.readUint8();
            }
        }

        var4.setPosition(var31);
        var5.setPosition(var25);
        var40 = 0;
        var41 = 0;
        var42 = 0;
        var43 = 0;

        let var45;
        let var46;
        for (var44 = 0; var44 < var10; ++var44) {
            var45 = var5.readUint8();
            if (var45 == 1) {
                var40 = var4.readShortSmart() + var43;
                var41 = var4.readShortSmart() + var40;
                var42 = var4.readShortSmart() + var41;
                var43 = var42;
                def.faceVertexIndices1[var44] = var40;
                def.faceVertexIndices2[var44] = var41;
                def.faceVertexIndices3[var44] = var42;
            }

            if (var45 == 2) {
                var41 = var42;
                var42 = var4.readShortSmart() + var43;
                var43 = var42;
                def.faceVertexIndices1[var44] = var40;
                def.faceVertexIndices2[var44] = var41;
                def.faceVertexIndices3[var44] = var42;
            }

            if (var45 == 3) {
                var40 = var42;
                var42 = var4.readShortSmart() + var43;
                var43 = var42;
                def.faceVertexIndices1[var44] = var40;
                def.faceVertexIndices2[var44] = var41;
                def.faceVertexIndices3[var44] = var42;
            }

            if (var45 == 4) {
                var46 = var40;
                var40 = var41;
                var41 = var46;
                var42 = var4.readShortSmart() + var43;
                var43 = var42;
                def.faceVertexIndices1[var44] = var40;
                def.faceVertexIndices2[var44] = var46;
                def.faceVertexIndices3[var44] = var42;
            }
        }

        var4.setPosition(var33);

        for (var44 = 0; var44 < var11; ++var44) {
            def.textureRenderTypes[var44] = 0;
            def.texIndices1[var44] = var4.readUint16();
            def.texIndices2[var44] = var4.readUint16();
            def.texIndices3[var44] = var4.readUint16();
        }

        if (def.textureCoords != null) {
            let var47 = false;

            for (var45 = 0; var45 < var10; ++var45) {
                var46 = def.textureCoords[var45] & 255;
                if (var46 != 255) {
                    if (
                        def.faceVertexIndices1[var45] == (def.texIndices1[var46] & "\uffff") &&
                        def.faceVertexIndices2[var45] == (def.texIndices2[var46] & "\uffff") &&
                        def.faceVertexIndices3[var45] == (def.texIndices3[var46] & "\uffff")
                    ) {
                        def.textureCoords[var45] = -1;
                    } else {
                        var47 = true;
                    }
                }
            }

            if (!var47) {
                def.textureCoords = null;
            }
        }

        if (!var3) {
            def.faceTextures = null;
        }

        if (!var2) {
            def.faceRenderTypes = null;
        }
    }

    load1(def, var1) {
        var var2 = new DataView(var1.buffer);
        var var24 = new DataView(var1.buffer);
        var var3 = new DataView(var1.buffer);
        var var28 = new DataView(var1.buffer);
        var var6 = new DataView(var1.buffer);
        var var55 = new DataView(var1.buffer);
        var var51 = new DataView(var1.buffer);
        var2.setPosition(var1.byteLength - 23);
        var verticeCount = var2.readUint16();
        var triangleCount = var2.readUint16();
        var textureTriangleCount = var2.readUint8();
        var var13 = var2.readUint8();
        var modelPriority = var2.readUint8();
        var var50 = var2.readUint8();
        var var17 = var2.readUint8();
        var modelTexture = var2.readUint8();
        var modelVertexSkins = var2.readUint8();
        var var20 = var2.readUint16();
        var var21 = var2.readUint16();
        var var42 = var2.readUint16();
        var var22 = var2.readUint16();
        var var38 = var2.readUint16();
        var textureAmount = 0;
        var var7 = 0;
        var var29 = 0;
        var position;
        if (textureTriangleCount > 0) {
            def.textureRenderTypes = [];
            var2.setPosition(0);

            for (position = 0; position < textureTriangleCount; ++position) {
                var renderType = (def.textureRenderTypes[position] = var2.readInt8());
                if (renderType == 0) {
                    ++textureAmount;
                }

                if (renderType >= 1 && renderType <= 3) {
                    ++var7;
                }

                if (renderType == 2) {
                    ++var29;
                }
            }
        }

        position = textureTriangleCount + verticeCount;
        var renderTypePos = position;
        if (var13 == 1) {
            position += triangleCount;
        }

        var var49 = position;
        position += triangleCount;
        var priorityPos = position;
        if (modelPriority == 255) {
            position += triangleCount;
        }

        var triangleSkinPos = position;
        if (var17 == 1) {
            position += triangleCount;
        }

        var var35 = position;
        if (modelVertexSkins == 1) {
            position += verticeCount;
        }

        var alphaPos = position;
        if (var50 == 1) {
            position += triangleCount;
        }

        var var11 = position;
        position += var22;
        var texturePos = position;
        if (modelTexture == 1) {
            position += triangleCount * 2;
        }

        var textureCoordPos = position;
        position += var38;
        var colorPos = position;
        position += triangleCount * 2;
        var var40 = position;
        position += var20;
        var var41 = position;
        position += var21;
        var var8 = position;
        position += var42;
        var var43 = position;
        position += textureAmount * 6;
        var var37 = position;
        position += var7 * 6;
        var var48 = position;
        position += var7 * 6;
        var var56 = position;
        position += var7 * 2;
        var var45 = position;
        position += var7;
        var var46 = position;
        position += var7 * 2 + var29 * 2;
        def.vertexCount = verticeCount;
        def.faceCount = triangleCount;
        def.textureTriangleCount = textureTriangleCount;
        def.vertexPositionsX = [];
        def.vertexPositionsY = [];
        def.vertexPositionsZ = [];
        def.faceVertexIndices1 = [];
        def.faceVertexIndices2 = [];
        def.faceVertexIndices3 = [];
        if (modelVertexSkins == 1) {
            def.vertexSkins = [];
        }

        if (var13 == 1) {
            def.faceRenderTypes = [];
        }

        if (modelPriority == 255) {
            def.faceRenderPriorities = [];
        } else {
            def.priority = modelPriority;
            def.faceRenderPriorities = Array(def.faceCount).fill(modelPriority);
        }

        if (var50 == 1) {
            def.faceAlphas = [];
        }

        if (var17 == 1) {
            def.faceSkins = [];
        }

        if (modelTexture == 1) {
            def.faceTextures = [];
        }

        if (modelTexture == 1 && textureTriangleCount > 0) {
            def.textureCoordinates = [];
        }

        def.faceColors = [];
        if (textureTriangleCount > 0) {
            def.textureTriangleVertexIndices1 = [];
            def.textureTriangleVertexIndices2 = [];
            def.textureTriangleVertexIndices3 = [];
            if (var7 > 0) {
                def.aShortArray2574 = [];
                def.aShortArray2575 = [];
                def.aShortArray2586 = [];
                def.aShortArray2577 = [];
                def.aByteArray2580 = [];
                def.aShortArray2578 = [];
            }

            if (var29 > 0) {
                def.texturePrimaryColors = [];
            }
        }

        var2.setPosition(textureTriangleCount);
        var24.setPosition(var40);
        var3.setPosition(var41);
        var28.setPosition(var8);
        var6.setPosition(var35);
        var vX = 0;
        var vY = 0;
        var vZ = 0;

        var vertexZOffset;
        var var10;
        var vertexYOffset;
        var var15;
        var point;
        for (polet = 0; polet < verticeCount; ++point) {
            var vertexFlags = var2.readUint8();
            var vertexXOffset = 0;
            if ((vertexFlags & 1) != 0) {
                vertexXOffset = var24.readShortSmart();
            }

            vertexYOffset = 0;
            if ((vertexFlags & 2) != 0) {
                vertexYOffset = var3.readShortSmart();
            }

            vertexZOffset = 0;
            if ((vertexFlags & 4) != 0) {
                vertexZOffset = var28.readShortSmart();
            }

            def.vertexPositionsX[point] = vX + vertexXOffset;
            def.vertexPositionsY[point] = vY + vertexYOffset;
            def.vertexPositionsZ[point] = vZ + vertexZOffset;
            vX = def.vertexPositionsX[point];
            vY = def.vertexPositionsY[point];
            vZ = def.vertexPositionsZ[point];
            if (modelVertexSkins == 1) {
                def.vertexSkins[point] = var6.readUint8();
            }
        }

        var2.setPosition(colorPos);
        var24.setPosition(renderTypePos);
        var3.setPosition(priorityPos);
        var28.setPosition(alphaPos);
        var6.setPosition(triangleSkinPos);
        var55.setPosition(texturePos);
        var51.setPosition(textureCoordPos);

        for (polet = 0; polet < triangleCount; ++point) {
            def.faceColors[point] = var2.readUint16();
            if (var13 == 1) {
                def.faceRenderTypes[point] = var24.readInt8();
            }

            if (modelPriority == 255) {
                def.faceRenderPriorities[point] = var3.readInt8();
            }

            if (var50 == 1) {
                def.faceAlphas[point] = var28.readInt8();
            }

            if (var17 == 1) {
                def.faceSkins[point] = var6.readUint8();
            }

            if (modelTexture == 1) {
                def.faceTextures[point] = var55.readUint16() - 1;
            }

            if (def.textureCoordinates != null && def.faceTextures[point] != -1) {
                def.textureCoordinates[point] = var51.readUint8() - 1;
            }
        }

        var2.setPosition(var11);
        var24.setPosition(var49);
        var trianglePointX = 0;
        var trianglePointY = 0;
        var trianglePointZ = 0;
        vertexYOffset = 0;

        var var16;
        for (vertexZOffset = 0; vertexZOffset < triangleCount; ++vertexZOffset) {
            var numFaces = var24.readUint8();
            if (numFaces == 1) {
                trianglePointX = var2.readShortSmart() + vertexYOffset;
                trianglePointY = var2.readShortSmart() + trianglePointX;
                trianglePointZ = var2.readShortSmart() + trianglePointY;
                vertexYOffset = trianglePointZ;
                def.faceVertexIndices1[vertexZOffset] = trianglePointX;
                def.faceVertexIndices2[vertexZOffset] = trianglePointY;
                def.faceVertexIndices3[vertexZOffset] = trianglePointZ;
            }

            if (numFaces == 2) {
                trianglePointY = trianglePointZ;
                trianglePointZ = var2.readShortSmart() + vertexYOffset;
                vertexYOffset = trianglePointZ;
                def.faceVertexIndices1[vertexZOffset] = trianglePointX;
                def.faceVertexIndices2[vertexZOffset] = trianglePointY;
                def.faceVertexIndices3[vertexZOffset] = trianglePointZ;
            }

            if (numFaces == 3) {
                trianglePointX = trianglePointZ;
                trianglePointZ = var2.readShortSmart() + vertexYOffset;
                vertexYOffset = trianglePointZ;
                def.faceVertexIndices1[vertexZOffset] = trianglePointX;
                def.faceVertexIndices2[vertexZOffset] = trianglePointY;
                def.faceVertexIndices3[vertexZOffset] = trianglePointZ;
            }

            if (numFaces == 4) {
                var var57 = trianglePointX;
                trianglePointX = trianglePointY;
                trianglePointY = var57;
                trianglePointZ = var2.readShortSmart() + vertexYOffset;
                vertexYOffset = trianglePointZ;
                def.faceVertexIndices1[vertexZOffset] = trianglePointX;
                def.faceVertexIndices2[vertexZOffset] = var57;
                def.faceVertexIndices3[vertexZOffset] = trianglePointZ;
            }
        }

        var2.setPosition(var43);
        var24.setPosition(var37);
        var3.setPosition(var48);
        var28.setPosition(var56);
        var6.setPosition(var45);
        var55.setPosition(var46);

        for (var texIndex = 0; texIndex < textureTriangleCount; ++texIndex) {
            var type = def.textureRenderTypes[texIndex] & 255;
            if (type == 0) {
                def.textureTriangleVertexIndices1[texIndex] = var2.readUint16();
                def.textureTriangleVertexIndices2[texIndex] = var2.readUint16();
                def.textureTriangleVertexIndices3[texIndex] = var2.readUint16();
            }

            if (type == 1) {
                def.textureTriangleVertexIndices1[texIndex] = var24.readUint16();
                def.textureTriangleVertexIndices2[texIndex] = var24.readUint16();
                def.textureTriangleVertexIndices3[texIndex] = var24.readUint16();
                def.aShortArray2574[texIndex] = var3.readUint16();
                def.aShortArray2575[texIndex] = var3.readUint16();
                def.aShortArray2586[texIndex] = var3.readUint16();
                def.aShortArray2577[texIndex] = var28.readUint16();
                def.aByteArray2580[texIndex] = var6.readInt8();
                def.aShortArray2578[texIndex] = var55.readUint16();
            }

            if (type == 2) {
                def.textureTriangleVertexIndices1[texIndex] = var24.readUint16();
                def.textureTriangleVertexIndices2[texIndex] = var24.readUint16();
                def.textureTriangleVertexIndices3[texIndex] = var24.readUint16();
                def.aShortArray2574[texIndex] = var3.readUint16();
                def.aShortArray2575[texIndex] = var3.readUint16();
                def.aShortArray2586[texIndex] = var3.readUint16();
                def.aShortArray2577[texIndex] = var28.readUint16();
                def.aByteArray2580[texIndex] = var6.readInt8();
                def.aShortArray2578[texIndex] = var55.readUint16();
                def.texturePrimaryColors[texIndex] = var55.readUint16();
            }

            if (type == 3) {
                def.textureTriangleVertexIndices1[texIndex] = var24.readUint16();
                def.textureTriangleVertexIndices2[texIndex] = var24.readUint16();
                def.textureTriangleVertexIndices3[texIndex] = var24.readUint16();
                def.aShortArray2574[texIndex] = var3.readUint16();
                def.aShortArray2575[texIndex] = var3.readUint16();
                def.aShortArray2586[texIndex] = var3.readUint16();
                def.aShortArray2577[texIndex] = var28.readUint16();
                def.aByteArray2580[texIndex] = var6.readInt8();
                def.aShortArray2578[texIndex] = var55.readUint16();
            }
        }

        var2.setPosition(position);
        vertexZOffset = var2.readUint8();
        if (vertexZOffset != 0) {
            //new Class41();
            var2.readUint16();
            var2.readUint16();
            var2.readUint16();
            var2.readInt32();
        }
    }

    loadOriginal(def, var1) {
        var var2 = false;
        var var43 = false;
        var var5 = new DataView(var1.buffer);
        var var39 = new DataView(var1.buffer);
        var var26 = new DataView(var1.buffer);
        var var9 = new DataView(var1.buffer);
        var var3 = new DataView(var1.buffer);
        var5.setPosition(var1.byteLength - 18);
        var var10 = var5.readUint16();
        var var11 = var5.readUint16();
        var var12 = var5.readUint8();
        var var13 = var5.readUint8();
        var var14 = var5.readUint8();
        var var30 = var5.readUint8();
        var var15 = var5.readUint8();
        var var28 = var5.readUint8();
        var var27 = var5.readUint16();
        var var20 = var5.readUint16();
        var var36 = var5.readUint16();
        var var23 = var5.readUint16();
        var var16 = 0;
        var var46 = var16 + var10;
        var var24 = var46;
        var46 += var11;
        var var25 = var46;
        if (var14 == 255) {
            var46 += var11;
        }

        var var4 = var46;
        if (var15 == 1) {
            var46 += var11;
        }

        var var42 = var46;
        if (var13 == 1) {
            var46 += var11;
        }

        var var37 = var46;
        if (var28 == 1) {
            var46 += var10;
        }

        var var29 = var46;
        if (var30 == 1) {
            var46 += var11;
        }

        var var44 = var46;
        var46 += var23;
        var var17 = var46;
        var46 += var11 * 2;
        var var32 = var46;
        var46 += var12 * 6;
        var var34 = var46;
        var46 += var27;
        var var35 = var46;
        var46 += var20;
        var var10000 = var46 + var36;
        def.vertexCount = var10;
        def.faceCount = var11;
        def.textureTriangleCount = var12;
        def.vertexPositionsX = [];
        def.vertexPositionsY = [];
        def.vertexPositionsZ = [];
        def.faceVertexIndices1 = [];
        def.faceVertexIndices2 = [];
        def.faceVertexIndices3 = [];
        if (var12 > 0) {
            def.textureRenderTypes = [];
            def.textureTriangleVertexIndices1 = [];
            def.textureTriangleVertexIndices2 = [];
            def.textureTriangleVertexIndices3 = [];
        }

        if (var28 == 1) {
            def.vertexSkins = [];
        }

        if (var13 == 1) {
            def.faceRenderTypes = [];
            def.textureCoordinates = [];
            def.faceTextures = [];
        }

        if (var14 == 255) {
            def.faceRenderPriorities = [];
        } else {
            def.priority = var14;
            def.faceRenderPriorities = Array(def.faceCount).fill(def.priority);
        }

        if (var30 == 1) {
            def.faceAlphas = [];
        }

        if (var15 == 1) {
            def.faceSkins = [];
        }

        def.faceColors = [];
        var5.setPosition(var16);
        var39.setPosition(var34);
        var26.setPosition(var35);
        var9.setPosition(var46);
        var3.setPosition(var37);
        var var41 = 0;
        var var33 = 0;
        var var19 = 0;

        var var6;
        var var7;
        var var8;
        var var18;
        var var31;
        for (var18 = 0; var18 < var10; ++var18) {
            var8 = var5.readUint8();
            var31 = 0;
            if ((var8 & 1) != 0) {
                var31 = var39.readShortSmart();
            }

            var6 = 0;
            if ((var8 & 2) != 0) {
                var6 = var26.readShortSmart();
            }

            var7 = 0;
            if ((var8 & 4) != 0) {
                var7 = var9.readShortSmart();
            }

            def.vertexPositionsX[var18] = var41 + var31;
            def.vertexPositionsY[var18] = var33 + var6;
            def.vertexPositionsZ[var18] = var19 + var7;
            var41 = def.vertexPositionsX[var18];
            var33 = def.vertexPositionsY[var18];
            var19 = def.vertexPositionsZ[var18];
            if (var28 == 1) {
                def.vertexSkins[var18] = var3.readUint8();
            }
        }

        var5.setPosition(var17);
        var39.setPosition(var42);
        var26.setPosition(var25);
        var9.setPosition(var29);
        var3.setPosition(var4);

        for (var18 = 0; var18 < var11; ++var18) {
            def.faceColors[var18] = var5.readUint16();
            if (var13 == 1) {
                var8 = var39.readUint8();
                if ((var8 & 1) == 1) {
                    def.faceRenderTypes[var18] = 1;
                    var2 = true;
                } else {
                    def.faceRenderTypes[var18] = 0;
                }

                if ((var8 & 2) == 2) {
                    def.textureCoordinates[var18] = var8 >> 2;
                    def.faceTextures[var18] = def.faceColors[var18];
                    def.faceColors[var18] = 127;
                    if (def.faceTextures[var18] != -1) {
                        var43 = true;
                    }
                } else {
                    def.textureCoordinates[var18] = -1;
                    def.faceTextures[var18] = -1;
                }
            }

            if (var14 == 255) {
                def.faceRenderPriorities[var18] = var26.readInt8();
            }

            if (var30 == 1) {
                def.faceAlphas[var18] = var9.readInt8();
            }

            if (var15 == 1) {
                def.faceSkins[var18] = var3.readUint8();
            }
        }

        var5.setPosition(var44);
        var39.setPosition(var24);
        var18 = 0;
        var8 = 0;
        var31 = 0;
        var6 = 0;

        var var21;
        var var22;
        for (var7 = 0; var7 < var11; ++var7) {
            var22 = var39.readUint8();
            if (var22 == 1) {
                var18 = var5.readShortSmart() + var6;
                var8 = var5.readShortSmart() + var18;
                var31 = var5.readShortSmart() + var8;
                var6 = var31;
                def.faceVertexIndices1[var7] = var18;
                def.faceVertexIndices2[var7] = var8;
                def.faceVertexIndices3[var7] = var31;
            }

            if (var22 == 2) {
                var8 = var31;
                var31 = var5.readShortSmart() + var6;
                var6 = var31;
                def.faceVertexIndices1[var7] = var18;
                def.faceVertexIndices2[var7] = var8;
                def.faceVertexIndices3[var7] = var31;
            }

            if (var22 == 3) {
                var18 = var31;
                var31 = var5.readShortSmart() + var6;
                var6 = var31;
                def.faceVertexIndices1[var7] = var18;
                def.faceVertexIndices2[var7] = var8;
                def.faceVertexIndices3[var7] = var31;
            }

            if (var22 == 4) {
                var21 = var18;
                var18 = var8;
                var8 = var21;
                var31 = var5.readShortSmart() + var6;
                var6 = var31;
                def.faceVertexIndices1[var7] = var18;
                def.faceVertexIndices2[var7] = var21;
                def.faceVertexIndices3[var7] = var31;
            }
        }

        var5.setPosition(var32);

        for (var7 = 0; var7 < var12; ++var7) {
            def.textureRenderTypes[var7] = 0;
            def.textureTriangleVertexIndices1[var7] = var5.readUint16();
            def.textureTriangleVertexIndices2[var7] = var5.readUint16();
            def.textureTriangleVertexIndices3[var7] = var5.readUint16();
        }

        if (def.textureCoordinates != null) {
            var var45 = false;

            for (var22 = 0; var22 < var11; ++var22) {
                var21 = def.textureCoordinates[var22] & 255;
                if (var21 != 255) {
                    if (
                        (def.textureTriangleVertexIndices1[var21] & "\uffff") == def.faceVertexIndices1[var22] &&
                        (def.textureTriangleVertexIndices2[var21] & "\uffff") == def.faceVertexIndices2[var22] &&
                        (def.textureTriangleVertexIndices3[var21] & "\uffff") == def.faceVertexIndices3[var22]
                    ) {
                        def.textureCoordinates[var22] = -1;
                    } else {
                        var45 = true;
                    }
                }
            }

            if (!var45) {
                def.textureCoordinates = null;
            }
        }

        if (!var43) {
            def.faceTextures = null;
        }

        if (!var2) {
            def.faceRenderTypes = null;
        }
    }
}
