class ModelDefinition {
		
}

class ModelLoader {
	constructor(bytes) { 
		this.bytes = bytes;
		this.def = new ModelDefinition();
	}

    load() {
		let dataview = new DataView(this.bytes.buffer);
        if (dataview.getInt8(dataview.byteLength-1) == -1 && dataview.getInt8(dataview.byteLength-2) == -1)
		{
			this.load1(dataview);
		}
		else
		{
			this.load2(dataview);
		}

        this.computeNormals();
        this.computeTextureUVCoordinates();
        this.computeAnimationTables();
        
		return this.def;
	}

    load1(var1){
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
		if (textureTriangleCount > 0)
		{
			this.def.textureRenderTypes = new byte[textureTriangleCount];
			var2.setPosition(0);

			for (position = 0; position < textureTriangleCount; ++position)
			{
				var renderType = this.def.textureRenderTypes[position] = var2.readInt8();
				if (renderType == 0)
				{
					++textureAmount;
				}

				if (renderType >= 1 && renderType <= 3)
				{
					++var7;
				}

				if (renderType == 2)
				{
					++var29;
				}
			}
		}

		position = textureTriangleCount + verticeCount;
		var renderTypePos = position;
		if (var13 == 1)
		{
			position += triangleCount;
		}

		var var49 = position;
		position += triangleCount;
		var priorityPos = position;
		if (modelPriority == 255)
		{
			position += triangleCount;
		}

		var triangleSkinPos = position;
		if (var17 == 1)
		{
			position += triangleCount;
		}

		var var35 = position;
		if (modelVertexSkins == 1)
		{
			position += verticeCount;
		}

		var alphaPos = position;
		if (var50 == 1)
		{
			position += triangleCount;
		}

		var var11 = position;
		position += var22;
		var texturePos = position;
		if (modelTexture == 1)
		{
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
		this.def.vertexCount = verticeCount;
		this.def.faceCount = triangleCount;
		this.def.textureTriangleCount = textureTriangleCount;
		this.def.vertexPositionsX = [];
		this.def.vertexPositionsY = [];
		this.def.vertexPositionsZ = [];
		this.def.faceVertexIndices1 = [];
		this.def.faceVertexIndices2 = [];
		this.def.faceVertexIndices3 = [];
		if (modelVertexSkins == 1)
		{
			this.def.vertexSkins = [];
		}

		if (var13 == 1)
		{
			this.def.faceRenderTypes = [];
		}

		if (modelPriority == 255)
		{
			this.def.faceRenderPriorities = [];
		}
		else
		{
			this.def.priority = modelPriority;
		}

		if (var50 == 1)
		{
			this.def.faceAlphas = [];
		}

		if (var17 == 1)
		{
			this.def.faceSkins = [];
		}

		if (modelTexture == 1)
		{
			this.def.faceTextures = [];
		}

		if (modelTexture == 1 && textureTriangleCount > 0)
		{
			this.def.textureCoordinates = [];
		}

		this.def.faceColors = [];
		if (textureTriangleCount > 0)
		{
			this.def.textureTriangleVertexIndices1 = [];
			this.def.textureTriangleVertexIndices2 = [];
			this.def.textureTriangleVertexIndices3 = [];
			if (var7 > 0)
			{
				this.def.aShortArray2574 = [];
				this.def.aShortArray2575 = [];
				this.def.aShortArray2586 = [];
				this.def.aShortArray2577 = [];
				this.def.aByteArray2580 = [];
				this.def.aShortArray2578 = [];
			}

			if (var29 > 0)
			{
				this.def.texturePrimaryColors = [];
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
		var povar;
		for (povar = 0; povar < verticeCount; ++povar)
		{
			var vertexFlags = var2.readUint8();
			var vertexXOffset = 0;
			if ((vertexFlags & 1) != 0)
			{
				vertexXOffset = var24.readShortSmart();
			}

			vertexYOffset = 0;
			if ((vertexFlags & 2) != 0)
			{
				vertexYOffset = var3.readShortSmart();
			}

			vertexZOffset = 0;
			if ((vertexFlags & 4) != 0)
			{
				vertexZOffset = var28.readShortSmart();
			}

			this.def.vertexPositionsX[povar] = vX + vertexXOffset;
			this.def.vertexPositionsY[povar] = vY + vertexYOffset;
			this.def.vertexPositionsZ[povar] = vZ + vertexZOffset;
			vX = this.def.vertexPositionsX[povar];
			vY = this.def.vertexPositionsY[povar];
			vZ = this.def.vertexPositionsZ[povar];
			if (modelVertexSkins == 1)
			{
				this.def.vertexSkins[povar] = var6.readUint8();
			}
		}

		var2.setPosition(colorPos);
		var24.setPosition(renderTypePos);
		var3.setPosition(priorityPos);
		var28.setPosition(alphaPos);
		var6.setPosition(triangleSkinPos);
		var55.setPosition(texturePos);
		var51.setPosition(textureCoordPos);

		for (povar = 0; povar < triangleCount; ++povar)
		{
			this.def.faceColors[povar] = var2.readUint16();
			if (var13 == 1)
			{
				this.def.faceRenderTypes[povar] = var24.readInt8();
			}

			if (modelPriority == 255)
			{
				this.def.faceRenderPriorities[povar] = var3.readInt8();
			}

			if (var50 == 1)
			{
				this.def.faceAlphas[povar] = var28.readInt8();
			}

			if (var17 == 1)
			{
				this.def.faceSkins[povar] = var6.readUint8();
			}

			if (modelTexture == 1)
			{
				this.def.faceTextures[povar] = (var55.readUint16() - 1);
			}

			if (this.def.textureCoordinates != null && this.def.faceTextures[povar] != -1)
			{
				this.def.textureCoordinates[povar] = (var51.readUint8() - 1);
			}
		}

		var2.setPosition(var11);
		var24.setPosition(var49);
		var trianglePovarX = 0;
		var trianglePovarY = 0;
		var trianglePovarZ = 0;
		vertexYOffset = 0;

		var var16;
		for (vertexZOffset = 0; vertexZOffset < triangleCount; ++vertexZOffset)
		{
			var numFaces = var24.readUint8();
			if (numFaces == 1)
			{
				trianglePovarX = var2.readShortSmart() + vertexYOffset;
				trianglePovarY = var2.readShortSmart() + trianglePovarX;
				trianglePovarZ = var2.readShortSmart() + trianglePovarY;
				vertexYOffset = trianglePovarZ;
				this.def.faceVertexIndices1[vertexZOffset] = trianglePovarX;
				this.def.faceVertexIndices2[vertexZOffset] = trianglePovarY;
				this.def.faceVertexIndices3[vertexZOffset] = trianglePovarZ;
			}

			if (numFaces == 2)
			{
				trianglePovarY = trianglePovarZ;
				trianglePovarZ = var2.readShortSmart() + vertexYOffset;
				vertexYOffset = trianglePovarZ;
				this.def.faceVertexIndices1[vertexZOffset] = trianglePovarX;
				this.def.faceVertexIndices2[vertexZOffset] = trianglePovarY;
				this.def.faceVertexIndices3[vertexZOffset] = trianglePovarZ;
			}

			if (numFaces == 3)
			{
				trianglePovarX = trianglePovarZ;
				trianglePovarZ = var2.readShortSmart() + vertexYOffset;
				vertexYOffset = trianglePovarZ;
				this.def.faceVertexIndices1[vertexZOffset] = trianglePovarX;
				this.def.faceVertexIndices2[vertexZOffset] = trianglePovarY;
				this.def.faceVertexIndices3[vertexZOffset] = trianglePovarZ;
			}

			if (numFaces == 4)
			{
				var var57 = trianglePovarX;
				trianglePovarX = trianglePovarY;
				trianglePovarY = var57;
				trianglePovarZ = var2.readShortSmart() + vertexYOffset;
				vertexYOffset = trianglePovarZ;
				this.def.faceVertexIndices1[vertexZOffset] = trianglePovarX;
				this.def.faceVertexIndices2[vertexZOffset] = var57;
				this.def.faceVertexIndices3[vertexZOffset] = trianglePovarZ;
			}
		}

		var2.setPosition(var43);
		var24.setPosition(var37);
		var3.setPosition(var48);
		var28.setPosition(var56);
		var6.setPosition(var45);
		var55.setPosition(var46);

		for (var texIndex = 0; texIndex < textureTriangleCount; ++texIndex)
		{
			var type = this.def.textureRenderTypes[texIndex] & 255;
			if (type == 0)
			{
				this.def.textureTriangleVertexIndices1[texIndex] = var2.readUint16();
				this.def.textureTriangleVertexIndices2[texIndex] = var2.readUint16();
				this.def.textureTriangleVertexIndices3[texIndex] = var2.readUint16();
			}

			if (type == 1)
			{
				this.def.textureTriangleVertexIndices1[texIndex] = var24.readUint16();
				this.def.textureTriangleVertexIndices2[texIndex] = var24.readUint16();
				this.def.textureTriangleVertexIndices3[texIndex] = var24.readUint16();
				this.def.aShortArray2574[texIndex] = var3.readUint16();
				this.def.aShortArray2575[texIndex] = var3.readUint16();
				this.def.aShortArray2586[texIndex] = var3.readUint16();
				this.def.aShortArray2577[texIndex] = var28.readUint16();
				this.def.aByteArray2580[texIndex] = var6.readInt8();
				this.def.aShortArray2578[texIndex] = var55.readUint16();
			}

			if (type == 2)
			{
				this.def.textureTriangleVertexIndices1[texIndex] = var24.readUint16();
				this.def.textureTriangleVertexIndices2[texIndex] = var24.readUint16();
				this.def.textureTriangleVertexIndices3[texIndex] = var24.readUint16();
				this.def.aShortArray2574[texIndex] = var3.readUint16();
				this.def.aShortArray2575[texIndex] = var3.readUint16();
				this.def.aShortArray2586[texIndex] = var3.readUint16();
				this.def.aShortArray2577[texIndex] = var28.readUint16();
				this.def.aByteArray2580[texIndex] = var6.readInt8();
				this.def.aShortArray2578[texIndex] = var55.readUint16();
				this.def.texturePrimaryColors[texIndex] = var55.readUint16();
			}

			if (type == 3)
			{
				this.def.textureTriangleVertexIndices1[texIndex] = var24.readUint16();
				this.def.textureTriangleVertexIndices2[texIndex] = var24.readUint16();
				this.def.textureTriangleVertexIndices3[texIndex] = var24.readUint16();
				this.def.aShortArray2574[texIndex] = var3.readUint16();
				this.def.aShortArray2575[texIndex] = var3.readUint16();
				this.def.aShortArray2586[texIndex] = var3.readUint16();
				this.def.aShortArray2577[texIndex] = var28.readUint16();
				this.def.aByteArray2580[texIndex] = var6.readInt8();
				this.def.aShortArray2578[texIndex] = var55.readUint16();
			}
		}

		var2.setPosition(position);
		vertexZOffset = var2.readUint8();
		if (vertexZOffset != 0)
		{
			//new Class41();
			var2.readUint16();
			var2.readUint16();
			var2.readUint16();
			var2.readInt32();
		}
    }

    load2(var1){
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
		if (var14 == 255)
		{
			var46 += var11;
		}

		var var4 = var46;
		if (var15 == 1)
		{
			var46 += var11;
		}

		var var42 = var46;
		if (var13 == 1)
		{
			var46 += var11;
		}

		var var37 = var46;
		if (var28 == 1)
		{
			var46 += var10;
		}

		var var29 = var46;
		if (var30 == 1)
		{
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
		this.def.vertexCount = var10;
		this.def.faceCount = var11;
		this.def.textureTriangleCount = var12;
		this.def.vertexPositionsX = [];
		this.def.vertexPositionsY = [];
		this.def.vertexPositionsZ = [];
		this.def.faceVertexIndices1 = [];
		this.def.faceVertexIndices2 = [];
		this.def.faceVertexIndices3 = [];
		if (var12 > 0)
		{
			this.def.textureRenderTypes = [];
			this.def.textureTriangleVertexIndices1 = [];
			this.def.textureTriangleVertexIndices2 = [];
			this.def.textureTriangleVertexIndices3 = [];
		}

		if (var28 == 1)
		{
			this.def.vertexSkins = [];
		}

		if (var13 == 1)
		{
			this.def.faceRenderTypes = [];
			this.def.textureCoordinates = [];
			this.def.faceTextures = [];
		}

		if (var14 == 255)
		{
			this.def.faceRenderPriorities = [];
		}
		else
		{
			this.def.priority = var14;
		}

		if (var30 == 1)
		{
			this.def.faceAlphas = [];
		}

		if (var15 == 1)
		{
			this.def.faceSkins = [];
		}

		this.def.faceColors = [];
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
		for (var18 = 0; var18 < var10; ++var18)
		{
			var8 = var5.readUint8();
			var31 = 0;
			if ((var8 & 1) != 0)
			{
				var31 = var39.readShortSmart();
			}

			var6 = 0;
			if ((var8 & 2) != 0)
			{
				var6 = var26.readShortSmart();
			}

			var7 = 0;
			if ((var8 & 4) != 0)
			{
				var7 = var9.readShortSmart();
			}

			this.def.vertexPositionsX[var18] = var41 + var31;
			this.def.vertexPositionsY[var18] = var33 + var6;
			this.def.vertexPositionsZ[var18] = var19 + var7;
			var41 = this.def.vertexPositionsX[var18];
			var33 = this.def.vertexPositionsY[var18];
			var19 = this.def.vertexPositionsZ[var18];
			if (var28 == 1)
			{
				this.def.vertexSkins[var18] = var3.readUint8();
			}
		}

		var5.setPosition(var17);
		var39.setPosition(var42);
		var26.setPosition(var25);
		var9.setPosition(var29);
		var3.setPosition(var4);

		for (var18 = 0; var18 < var11; ++var18)
		{
			this.def.faceColors[var18] = var5.readUint16();
			if (var13 == 1)
			{
				var8 = var39.readUint8();
				if ((var8 & 1) == 1)
				{
					this.def.faceRenderTypes[var18] = 1;
					var2 = true;
				}
				else
				{
					this.def.faceRenderTypes[var18] = 0;
				}

				if ((var8 & 2) == 2)
				{
					this.def.textureCoordinates[var18] = (var8 >> 2);
					this.def.faceTextures[var18] = this.def.faceColors[var18];
					this.def.faceColors[var18] = 127;
					if (this.def.faceTextures[var18] != -1)
					{
						var43 = true;
					}
				}
				else
				{
					this.def.textureCoordinates[var18] = -1;
					this.def.faceTextures[var18] = -1;
				}
			}

			if (var14 == 255)
			{
				this.def.faceRenderPriorities[var18] = var26.readInt8();
			}

			if (var30 == 1)
			{
				this.def.faceAlphas[var18] = var9.readInt8();
			}

			if (var15 == 1)
			{
				this.def.faceSkins[var18] = var3.readUint8();
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
		for (var7 = 0; var7 < var11; ++var7)
		{
			var22 = var39.readUint8();
			if (var22 == 1)
			{
				var18 = var5.readShortSmart() + var6;
				var8 = var5.readShortSmart() + var18;
				var31 = var5.readShortSmart() + var8;
				var6 = var31;
				this.def.faceVertexIndices1[var7] = var18;
				this.def.faceVertexIndices2[var7] = var8;
				this.def.faceVertexIndices3[var7] = var31;
			}

			if (var22 == 2)
			{
				var8 = var31;
				var31 = var5.readShortSmart() + var6;
				var6 = var31;
				this.def.faceVertexIndices1[var7] = var18;
				this.def.faceVertexIndices2[var7] = var8;
				this.def.faceVertexIndices3[var7] = var31;
			}

			if (var22 == 3)
			{
				var18 = var31;
				var31 = var5.readShortSmart() + var6;
				var6 = var31;
				this.def.faceVertexIndices1[var7] = var18;
				this.def.faceVertexIndices2[var7] = var8;
				this.def.faceVertexIndices3[var7] = var31;
			}

			if (var22 == 4)
			{
				var21 = var18;
				var18 = var8;
				var8 = var21;
				var31 = var5.readShortSmart() + var6;
				var6 = var31;
				this.def.faceVertexIndices1[var7] = var18;
				this.def.faceVertexIndices2[var7] = var21;
				this.def.faceVertexIndices3[var7] = var31;
			}
		}

		var5.setPosition(var32);

		for (var7 = 0; var7 < var12; ++var7)
		{
			this.def.textureRenderTypes[var7] = 0;
			this.def.textureTriangleVertexIndices1[var7] = var5.readUint16();
			this.def.textureTriangleVertexIndices2[var7] = var5.readUint16();
			this.def.textureTriangleVertexIndices3[var7] = var5.readUint16();
		}

		if (this.def.textureCoordinates != null)
		{
			var var45 = false;

			for (var22 = 0; var22 < var11; ++var22)
			{
				var21 = this.def.textureCoordinates[var22] & 255;
				if (var21 != 255)
				{
					if ((this.def.textureTriangleVertexIndices1[var21] & '\uffff') == this.def.faceVertexIndices1[var22] && (this.def.textureTriangleVertexIndices2[var21] & '\uffff') == this.def.faceVertexIndices2[var22] && (this.def.textureTriangleVertexIndices3[var21] & '\uffff') == this.def.faceVertexIndices3[var22])
					{
						this.def.textureCoordinates[var22] = -1;
					}
					else
					{
						var45 = true;
					}
				}
			}

			if (!var45)
			{
				this.def.textureCoordinates = null;
			}
		}

		if (!var43)
		{
			this.def.faceTextures = null;
		}

		if (!var2)
		{
			this.def.faceRenderTypes = null;
		}
    }

    computeAnimationTables()
	{
		var groupCounts = [];
		var numGroups = 0;
		var var3, var4, var10002;
		if (this.def.vertexSkins != null)
		{


			for (var3 = 0; var3 < this.def.vertexCount; ++var3)
			{
				var4 = this.def.vertexSkins[var3];
				++groupCounts[var4];
				if (var4 > numGroups)
				{
					numGroups = var4;
				}
			}

			this.def.vertexGroups = [];

			for (var3 = 0; var3 <= numGroups; ++var3)
			{
				this.def.vertexGroups[var3] = [];
				groupCounts[var3] = 0;
			}

			for (var3 = 0; var3 < this.def.vertexCount; this.def.vertexGroups[var4][groupCounts[var4]++] = var3++)
			{
				var4 = this.def.vertexSkins[var3];
			}

			this.def.vertexSkins = null;
		}
		if (this.def.faceSkins != null)
		{ // L: 785
			groupCounts = []; // L: 786
			numGroups = 0; // L: 787

			for (var3 = 0; var3 < this.def.faceCount; ++var3)
			{ // L: 788
				var4 = this.def.faceSkins[var3]; // L: 789
				var10002 = groupCounts[var4]++; // L: 790
				if (var4 > numGroups)
				{ // L: 791
					numGroups = var4;
				}
			}

			this.def.faceLabelsAlpha = []; // L: 793

			for (var3 = 0; var3 <= numGroups; ++var3)
			{ // L: 794
				this.def.faceLabelsAlpha[var3] = []; // L: 795
				groupCounts[var3] = 0; // L: 796
			}

			for (var3 = 0; var3 < this.def.faceCount; this.def.faceLabelsAlpha[var4][groupCounts[var4]++] = var3++)
			{ // L: 798 800
				var4 = this.def.faceSkins[var3]; // L: 799
			}

			this.def.faceSkins = null; // L: 802
		}
		// triangleSkinValues is here
	}

    computeTextureUVCoordinates()
	{
		this.def.faceTextureUCoordinates = [];
		this.def.faceTextureVCoordinates = [];

		for (var i = 0; i < this.def.faceCount; i++)
		{
			var textureCoordinate;
			if (this.def.textureCoordinates == undefined)
			{
				textureCoordinate = -1;
			}
			else
			{
				textureCoordinate = this.def.textureCoordinates[i];
			}

			var textureIdx;
			if (this.def.faceTextures == undefined)
			{
				textureIdx = -1;
			}
			else
			{
				textureIdx = this.def.faceTextures[i] & 0xFFFF;
			}

			if (textureIdx != -1)
			{
				var u = [];
				var v = [];

				if (textureCoordinate == -1)
				{
					u[0] = 0.0;
					v[0] = 1.0;

					u[1] = 1.0;
					v[1] = 1.0;

					u[2] = 0.0;
					v[2] = 0.0;
				}
				else
				{
					textureCoordinate &= 0xFF;

					var textureRenderType = 0;
					if (textureRenderTypes != null)
					{
						textureRenderType = textureRenderTypes[textureCoordinate];
					}

					if (textureRenderType == 0)
					{
						var faceVertexIdx1 = faceVertexIndices1[i];
						var faceVertexIdx2 = faceVertexIndices2[i];
						var faceVertexIdx3 = faceVertexIndices3[i];

						var triangleVertexIdx1 = textureTriangleVertexIndices1[textureCoordinate];
						var triangleVertexIdx2 = textureTriangleVertexIndices2[textureCoordinate];
						var triangleVertexIdx3 = textureTriangleVertexIndices3[textureCoordinate];

						var triangleX = vertexPositionsX[triangleVertexIdx1];
						var triangleY = vertexPositionsY[triangleVertexIdx1];
						var triangleZ = vertexPositionsZ[triangleVertexIdx1];

					    var f_882_ = vertexPositionsX[triangleVertexIdx2] - triangleX;
					    var f_883_ = vertexPositionsY[triangleVertexIdx2] - triangleY;
					    var f_884_ = vertexPositionsZ[triangleVertexIdx2] - triangleZ;
					    var f_885_ = vertexPositionsX[triangleVertexIdx3] - triangleX;
					    var f_886_ = vertexPositionsY[triangleVertexIdx3] - triangleY;
					    var f_887_ = vertexPositionsZ[triangleVertexIdx3] - triangleZ;
					    var f_888_ = vertexPositionsX[faceVertexIdx1] - triangleX;
					    var f_889_ = vertexPositionsY[faceVertexIdx1] - triangleY;
					    var f_890_ = vertexPositionsZ[faceVertexIdx1] - triangleZ;
					    var f_891_ = vertexPositionsX[faceVertexIdx2] - triangleX;
					    var f_892_ = vertexPositionsY[faceVertexIdx2] - triangleY;
					    var f_893_ = vertexPositionsZ[faceVertexIdx2] - triangleZ;
					    var f_894_ = vertexPositionsX[faceVertexIdx3] - triangleX;
					    var f_895_ = vertexPositionsY[faceVertexIdx3] - triangleY;
					    var f_896_ = vertexPositionsZ[faceVertexIdx3] - triangleZ;

					    var f_897_ = f_883_ * f_887_ - f_884_ * f_886_;
					    var f_898_ = f_884_ * f_885_ - f_882_ * f_887_;
					    var f_899_ = f_882_ * f_886_ - f_883_ * f_885_;
					    var f_900_ = f_886_ * f_899_ - f_887_ * f_898_;
					    var f_901_ = f_887_ * f_897_ - f_885_ * f_899_;
					    var f_902_ = f_885_ * f_898_ - f_886_ * f_897_;
					    var f_903_ = 1.0 / (f_900_ * f_882_ + f_901_ * f_883_ + f_902_ * f_884_);

						u[0] = (f_900_ * f_888_ + f_901_ * f_889_ + f_902_ * f_890_) * f_903_;
						u[1] = (f_900_ * f_891_ + f_901_ * f_892_ + f_902_ * f_893_) * f_903_;
						u[2] = (f_900_ * f_894_ + f_901_ * f_895_ + f_902_ * f_896_) * f_903_;

						f_900_ = f_883_ * f_899_ - f_884_ * f_898_;
						f_901_ = f_884_ * f_897_ - f_882_ * f_899_;
						f_902_ = f_882_ * f_898_ - f_883_ * f_897_;
						f_903_ = 1.0 / (f_900_ * f_885_ + f_901_ * f_886_ + f_902_ * f_887_);

						v[0] = (f_900_ * f_888_ + f_901_ * f_889_ + f_902_ * f_890_) * f_903_;
						v[1] = (f_900_ * f_891_ + f_901_ * f_892_ + f_902_ * f_893_) * f_903_;
						v[2] = (f_900_ * f_894_ + f_901_ * f_895_ + f_902_ * f_896_) * f_903_;
					}
				}

				this.def.faceTextureUCoordinates[i] = u;
				this.def.faceTextureVCoordinates[i] = v;
			}
		}
    }

    computeNormals()
	{
		if (this.def.vertexNormals != undefined)
		{
			return;
		}

		this.def.vertexNormals = [];

		var var1;
		for (var1 = 0; var1 < this.def.vertexCount; ++var1)
		{
			this.def.vertexNormals[var1] = {};
		}

		for (var1 = 0; var1 < this.def.faceCount; ++var1)
		{
			var vertexA = this.def.faceVertexIndices1[var1];
			var vertexB = this.def.faceVertexIndices2[var1];
			var vertexC = this.def.faceVertexIndices3[var1];

			var xA = this.def.vertexPositionsX[vertexB] - this.def.vertexPositionsX[vertexA];
			var yA = this.def.vertexPositionsY[vertexB] - this.def.vertexPositionsY[vertexA];
			var zA = this.def.vertexPositionsZ[vertexB] - this.def.vertexPositionsZ[vertexA];

			var xB = this.def.vertexPositionsX[vertexC] - this.def.vertexPositionsX[vertexA];
			var yB = this.def.vertexPositionsY[vertexC] - this.def.vertexPositionsY[vertexA];
			var zB = this.def.vertexPositionsZ[vertexC] - this.def.vertexPositionsZ[vertexA];

			// Compute cross product
			var var11 = yA * zB - yB * zA;
			var var12 = zA * xB - zB * xA;
			var var13 = xA * yB - xB * yA;

			while (var11 > 8192 || var12 > 8192 || var13 > 8192 || var11 < -8192 || var12 < -8192 || var13 < -8192)
			{
				var11 >>= 1;
				var12 >>= 1;
				var13 >>= 1;
			}

			var length = Math.sqrt(var11 * var11 + var12 * var12 + var13 * var13);
			if (length <= 0)
			{
				length = 1;
			}

			var11 = var11 * 256 / length;
			var12 = var12 * 256 / length;
			var13 = var13 * 256 / length;

			var var15;
			if (this.def.faceRenderTypes == null)
			{
				var15 = 0;
			}
			else
			{
				var15 = this.def.faceRenderTypes[var1];
			}

			if (var15 == 0)
			{
				var var16 = this.def.vertexNormals[vertexA];
                var16.magnitude = 0;
				var16.x += var11;
				var16.y += var12;
				var16.z += var13;
				++var16.magnitude;

				var16 = this.def.vertexNormals[vertexB];
				var16.x += var11;
				var16.y += var12;
				var16.z += var13;
				++var16.magnitude;

				var16 = this.def.vertexNormals[vertexC];
				var16.x += var11;
				var16.y += var12;
				var16.z += var13;
				++var16.magnitude;
			}
			else if (var15 == 1)
			{
				if (this.def.faceNormals == null)
				{
					this.def.faceNormals = [];
				}

				var var17 = this.def.faceNormals[var1] = {};
				var17.x = var11;
				var17.y = var12;
				var17.z = var13;
			}
		}
	}
}