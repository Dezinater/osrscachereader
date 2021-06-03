"use strict";

var vertexShaderSource = `#version 300 es

// an attribute is an input (in) to a vertex shader.
// It will receive data from a buffer
in vec4 a_position;
in vec4 a_color;
in vec2 a_texcoord;

// A matrix to transform the positions by
uniform mat4 u_matrix;

// a varying the color to the fragment shader
out vec4 v_color;
out vec2 v_texcoord;

// all shaders have a main function
void main() {
  // Multiply the position by the matrix.
  gl_Position = u_matrix * a_position;
	gl_PointSize = 10.0;
  // Pass the color to the fragment shader.
  v_color = a_color;
  v_texcoord = a_texcoord;
}
`;

var fragmentShaderSource = `#version 300 es

precision highp float;
precision lowp sampler2D;

uniform sampler2D u_someTexture;

// the varied color passed from the vertex shader
in vec4 v_color;
in vec2 v_texcoord;

// we need to declare an output for the fragment shader
out vec4 outColor;

void main() {
  outColor = v_color + texture(u_someTexture, v_texcoord);
}
`;
// outColor = v_color + texture(u_someTexture, vec2(0,0))
  var translation = [6, 124, 360];
  
  var rotation = [-3.3, -0.30000000000000004, 0];
  var scale = [1, 1, 1];
  var fieldOfViewRadians = degToRad(60);
  

var positionBuffer;
var colorBuffer;
var indexBuffer;
var canvas = document.querySelector("#mainCanvas");
var gl = canvas.getContext("webgl2", {
	premultipliedAlpha: false
});
var keysActivated = {};

document.addEventListener('keydown', (x) => {
	x = x.key.toString().toLowerCase();
	keysActivated[x] = (keysActivated != undefined || !keysActivated[x]) ? true : false;
}, false);

document.addEventListener('keyup', (x) => {
	x = x.key.toString().toLowerCase();
	if(keysActivated == undefined || keysActivated[x])
		delete keysActivated[x];
}, false);

var mouseDown = false;
var newRotation = [...rotation];
document.addEventListener('mousemove', mouseMoved, false);


function mouseMoved(evt) {
	var x = evt.movementX.clamp(-5, 5);
	var y = evt.movementY.clamp(-5, 5);
	if(mouseDown) {
		newRotation[0] = newRotation[0] + y/60;
		newRotation[1] = newRotation[1] - x/60; 
		newRotation[2] = 0;
	}
}

canvas.addEventListener('mousedown', (evt) => {
	mouseDown = true;
	canvas.requestPointerLock();
}, false);

document.addEventListener('mouseup', (evt) => {
	mouseDown = false;
	document.exitPointerLock();
}, false);
	  



var program;
var textureBuffer;
var vao;
var matrixLocation;
function main() {
  // Get A WebGL context
  /** @type {HTMLCanvasElement} */
  
  if (!gl) {
    return;
  }

  // Use our boilerplate utils to compile the shaders and link into a program
   program = webglUtils.createProgramFromSources(gl,
      [defaultShader.vertex, defaultShader.frag]);

  // look up where the vertex data needs to go.
  var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
  var colorAttributeLocation = gl.getAttribLocation(program, "a_color");
  var textureCoordAttributeLocation = gl.getAttribLocation(program, "a_texcoord");
  var textureAttributeLocation = gl.getUniformLocation(program, "u_someTexture");

	matrixLocation = gl.getUniformLocation(program, "u_matrix");
  // look up uniform locations
	vao = gl.createVertexArray();
	gl.bindVertexArray(vao);

	positionBuffer = gl.createBuffer();
	colorBuffer = gl.createBuffer();
	textureBuffer = gl.createBuffer();
	
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
	gl.enableVertexAttribArray(positionAttributeLocation);
	gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);

	gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
	gl.enableVertexAttribArray(colorAttributeLocation);
	gl.vertexAttribPointer(colorAttributeLocation, 4, gl.UNSIGNED_BYTE, true, 0, 0);

	gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer);
	gl.enableVertexAttribArray(textureCoordAttributeLocation);
	gl.vertexAttribPointer(textureCoordAttributeLocation, 2, gl.FLOAT, false, 0, 0);


    gl.enable(gl.DEPTH_TEST);
	gl.depthFunc(gl.LESS);
    gl.enable(gl.CULL_FACE);
	
	var texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  // Fill the texture with a 1x1 blue pixel.
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
                new Uint8Array([0, 0, 255, 255]));
 image = new Image();
  image.src = "cache/Sprites/485-0.png";
  image.addEventListener('load', function() {
    // Now that the image has loaded make copy it to the texture.
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, image);
    gl.generateMipmap(gl.TEXTURE_2D);
  });
  gl.useProgram(program);
gl.uniform1i(textureAttributeLocation, 0);
	
	
	
	requestAnimationFrame(drawScene);
}
var image;
var lastDraw;
var scene = [];

var animsList = document.getElementById("animsList");
function setAnimationsListElement(similarAnimations){
	if(animsList == undefined){
		animsList = document.getElementById("animsList");
	}
	var length = animsList.options.length;
	for (i = length-1; i >= 0; i--) {
	  animsList.options[i] = null;
	}
		
	similarAnimations.forEach((x) => {
		var option = document.createElement("option");
		option.text = x;
		option.value = x;
		animsList.add(option);
	});
}
animsList.onchange = (event) => {
	scene[0].loadAnimation(event.target.value);
}

function playAnimationId(evt){
	var playAnimId = document.getElementById("playAnimId");
	scene[0].loadAnimation(playAnimId.value)
}

var smoothAnimsElement = document.getElementById("smoothAnims");
smoothAnimsElement.onclick = (event) => {
	smoothAnimations = event.target.checked;
}
var smoothAnimations = false;

function setTex(){
	gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(scene[0].textureCoords.flat()), gl.STATIC_DRAW);
}

function drawScene(timestamp) {
	if (lastDraw === undefined)
		lastDraw = timestamp;
	const elapsed = timestamp - lastDraw;
	
    webglUtils.resizeCanvasToDisplaySize(gl.canvas);

    // Tell WebGL how to convert from clip space to pixels
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    

	

    //gl.useProgram(program);
    //gl.bindVertexArray(vao);


	// Compute the projection matrix
	var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
	var zNear = 1;
	var zFar = 2000;
	var projectionMatrix = m4.perspective(fieldOfViewRadians, aspect, zNear, zFar);
	
    //var cameraMatrix = m4.translation(translation[0], translation[1], translation[2]);
    var cameraMatrix = m4.translation(0, 0, 0);
	cameraMatrix = m4.xRotate(cameraMatrix, rotation[0]);
    cameraMatrix = m4.yRotate(cameraMatrix, rotation[1]);
    cameraMatrix = m4.zRotate(cameraMatrix, rotation[2]);
	
    cameraMatrix = m4.translate(cameraMatrix, translation[0], translation[1], translation[2]);

	var viewMatrix = m4.inverse(cameraMatrix);
	var viewProjectionMatrix = m4.multiply(projectionMatrix, cameraMatrix);
    // Set the matrix.
    gl.uniformMatrix4fv(matrixLocation, false, viewProjectionMatrix);
	
	//gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);


	var speed = 0.5;

	//rotation = newRotation;
	rotation[0] = lerp(rotation[0], newRotation[0], 0.5);
	rotation[1] = lerp(rotation[1], newRotation[1], 0.5);
	rotation[2] = lerp(rotation[2], newRotation[2], 0.5);
	
	if(keysActivated['s'] == true){
		var forward = m4.forward(viewMatrix);
		translation[0] -= forward[0] * elapsed * speed;
		translation[1] -= forward[1] * elapsed * speed;
		translation[2] -= forward[2] * elapsed * speed;
	}
	
	if(keysActivated['w'] == true){
		//translation[2] -= 120 / 60.0;
		var forward = m4.forward(viewMatrix);
		translation[0] += forward[0] * elapsed * speed;
		translation[1] += forward[1] * elapsed * speed;
		translation[2] += forward[2] * elapsed * speed;
	}
	
	if(keysActivated['a'] == true){
		var right = m4.right(viewMatrix);
		translation[0] += right[0] * elapsed * speed;
		translation[1] += right[1] * elapsed * speed;
		translation[2] += right[2] * elapsed * speed;
	}
	
	if(keysActivated['d'] == true){
		var right = m4.right(viewMatrix);
		translation[0] -= right[0] * elapsed * speed;
		translation[1] -= right[1] * elapsed * speed;
		translation[2] -= right[2] * elapsed * speed;
	}
	
	if(keysActivated[' '] == true)
		translation[1] += elapsed * speed;
	
	if(keysActivated['shift'] == true)
		translation[1] -= elapsed * speed;
	

	// Clear the canvas
    gl.clearColor(0.5, 0.5, 0.5, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	
	

	scene.forEach(x => {
		if(x instanceof Model){
			if(!x.containsAlpha){
				x.setMatrix(gl, viewProjectionMatrix);
				x.update(elapsed);
				x.render(gl);
			}
		}
	});
	
	gl.enable(gl.BLEND);
	gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

	scene.forEach(x => {
		if(x instanceof Model){
			if(x.containsAlpha){
				x.setMatrix(gl, viewProjectionMatrix);
				x.update(elapsed);
				x.render(gl);
			}
		}
	});
	gl.disable(gl.BLEND);

	lastDraw = timestamp;
	requestAnimationFrame(drawScene);
  }
  
function loadObj(data){
	data = data.split('\n');
	var verticesData = [];
	var textureCoords = [];
	var textureIndicies = [];
	var indiciesData = [];
	var coloursData = [];
	var colourIndex = "";
	
	data.forEach(e => {
		switch(e.split(" ")[0]){
			case "v":
				var newIndex = verticesData.push(e.substring(2).split(" "));
				verticesData[newIndex-1][2] *= -1;
				verticesData[newIndex-1][1] *= -1;
				break;
				
			case "vt":
				textureCoords.push(e.substring(3).split(" "));
				break;
				
			case "f":
				var faceInfo = e.substring(2).split(" ");
				if(faceInfo[0].includes("/")) {
					var newIndexInfo = [];
					var newTextureInfo = [];
					for(var i=0;i<3;i++){
						var split = faceInfo[i].split("/")
						newIndexInfo.push(split[0]);
						newTextureInfo.push(split[1]);
					}
					indiciesData.push(newIndexInfo);
					textureIndicies.push(newTextureInfo);
				}else{
					indiciesData.push(faceInfo);
				}
				coloursData.push(colourIndex);
				break;
				
			case "usemtl":
				colourIndex = e.substring("usemtl".length+1);
				break;
		}
	});
	
	return {
			vertices: verticesData,
			indicies: indiciesData,
			colours: coloursData,
			textureCoords: textureCoords,
			textureIndicies: textureIndicies
			};
}

function loadMtlReturn(data){
	var loadedMaterials = [];
	data = data.split('\n');
	var index = "";
	
	data.forEach(e => {
		switch(e.split(" ")[0]){
			case "newmtl":
				index = e.split(" ")[1];
				break;
			case "Kd": //colour
				loadedMaterials[index] = e.substring(3).split(" ");
				break;
			case "map_Kd": //sprite
				loadedMaterials[index] = e.substring(3).split(" ");
				break;
			default:
				//console.log(e);
				break;
		}
	});

	return loadedMaterials;
}

function exampleScene(){
	asyncLoadNPC(8407, 8316).then(x => {
		asyncLoadSpotAnim(726).then(spotAnim => {
			asyncLoadItem(4587).then(item => {
				asyncLoadItem(12821).then(item2 => {
				item2.containsAlpha = true;
				x.mergeWith(item);
				x.mergeWith(item2);
				x.containsAlpha = true;
				spotAnim.containsAlpha = true;
				spotAnim.translation[1] = -75;
				scene.push(x);
				scene.push(spotAnim);
			});
			});
		});
	});
	 
	
	asyncLoadNPC(8407, 7514).then(x => {
		asyncLoadSpotAnim(1171).then(spotAnim => {
			asyncLoadItem(13652).then(item => {
				x.mergeWith(item);
				spotAnim.containsAlpha = true;
				spotAnim.translation[0] = -220;
				x.translation[0] = -220;
				
				
				scene.push(x);
				scene.push(spotAnim);
			});
			
		});
	});
}