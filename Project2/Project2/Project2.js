// Name: John Graham

var gl;
var numVertices;
var numTriangles;
var orthographicIsOn;
var orthographicIsOnLocation;
var myShaderProgram;
var myShaderProgram2;
var myShaderProgram3;
var specIsOn;
var specIsOnLocation;
var lightOneIsOn;
var lightOneIsOnLocation;
var lightTwoIsOn;
var lightTwoIsOnLocation;
var zata;
var vertex2Position;
var vertex3Position;
var vertexPosition;
var verticesBuffer;
var vertices2Buffer;
var vertices3Buffer;
var indexBuffer;
var index2Buffer;
var index3Buffer;
var textureChecker;
var texturebuffer;
var texturepointer;
var beta;
var gamma;
var fox;
var lamda;
var delta;
var echo;
var betaLoc;
var gammaLoc;
var foxLoc;
var lamdaLoc;
var deltaLoc;
var echoLoc;
var zataLoc;


function initGL(){
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
    
    gl.enable(gl.DEPTH_TEST);
    gl.viewport( 0, 0, 512, 512 );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
	
	beta=0;
	gamma=0;
	fox=0;
	lamda=0;
	delta=0;
	echo=0;
	zata=0.25;

    setupChair1();
	setupChair2();
	setupTable();
    // render the object
    drawObject();

};

// FOLLOWING CODE SKELETON FOR getFaceNormals() NEEDS TO BE COMPLETED
function getFaceNormals( vertices, indexList, numTriangles ) {
    // array of face normals
    var faceNormals = [];
    var faceNormal = [];
    
    // Following lines iterate over triangles
    for (var i = 0; i < numTriangles; i++) {
        // Following lines give you three vertices for each face of the triangle
        var p0 = vec3( vertices[indexList[3*i]][0],
                      vertices[indexList[3*i]][1],
                      vertices[indexList[3*i]][2]);
        
        var p1 = vec3( vertices[indexList[3*i+1]][0],
                      vertices[indexList[3*i+1]][1],
                      vertices[indexList[3*i+1]][2]);
        
        var p2 = vec3( vertices[indexList[3*i+2]][0],
                      vertices[indexList[3*i+2]][1],
                      vertices[indexList[3*i+2]][2]);
        
        // Calculate vector from p0 to p1 ( use subtract function in MV.js, NEEDS CODE )
        var p1minusp0 = vec3( p1[0]-p0[0], p1[1]-p0[1], p1[2]-p0[2]);
        // Calculate vector from p0 to p2 ( use subtract function, NEEDS CODE )
        var p2minusp0 = vec3( p2[0]-p0[0], p2[1]-p0[1], p2[2]-p0[2]);
        // Calculate face normal as the cross product of the above two vectors
        // (use cross function in MV.js, NEEDS CODE )
        var faceNormal = cross(p1minusp0 ,p2minusp0);
        // normalize face normal (use normalize function in MV.js, NEEDS CODE)
        faceNormal = normalize(faceNormal);
        // Following line pushes the face normal into the array of face normals
        faceNormals.push( faceNormal );
    }
    
    // Following line returns the array of face normals
    return faceNormals;
}

// FOLLOWING CODE SKELETON FOR getVertexNormals() NEEDS TO BE COMPLETED
function getVertexNormals( vertices, indexList, faceNormals, numVertices, numTriangles ) {
    var vertexNormals = [];
    
    // Iterate over all vertices
    for ( var j = 0; j < numVertices; j++) {
        
        // Initialize the vertex normal for the j-th vertex
        var vertexNormal = vec3( 0.0, 0.0, 0.0 );
        
        // Iterate over all the faces to find if this vertex belongs to
        // a particular face
        
        for ( var i = 0; i < numTriangles; i++ ) {
            
            // The condition of the following if statement should check
            // if the j-th vertex belongs to the i-th face
            if (indexList[3*i]==j | indexList[3*i+1]==j | indexList[3*i+2]==j) { // NEEDS CODE IN PARENTHESES
                
                // Update the vertex normal (NEEDS CODE)
				vertexNormal[0] = vertexNormal[0] + faceNormals[i][0];
                vertexNormal[1] = vertexNormal[1] + faceNormals[i][1];
				vertexNormal[2] = vertexNormal[2] + faceNormals[i][2];
            }
            
        }
        
        // Normalize the vertex normal here (NEEDS CODE)
        vertexNormal = normalize(vertexNormal);
        
        // Following line pushes the vertex normal into the vertexNormals array
        vertexNormals.push( vertexNormal );
    }
    
    return vertexNormals;
    
}

function setupChair1(){
	myShaderProgram = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( myShaderProgram );
	
    numVertices = 2440;
    numTriangles = 4871;
    vertices = getVertices(); // vertices and faces are defined in object.js
    indexList = getFaces();
    
    indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexList), gl.STATIC_DRAW);
    
    verticesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);
    
    vertexPosition = gl.getAttribLocation(myShaderProgram,"vertexPosition");
    gl.vertexAttribPointer( vertexPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vertexPosition );
	
	var myImage = document.getElementById("fire");
	
	textureImage2 = gl.createTexture(); 
	gl.bindTexture(gl.TEXTURE_2D, textureImage2);
	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, myImage);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
	gl.generateMipmap(gl.TEXTURE_2D);
	
	var faceNormals = getFaceNormals( vertices, indexList, numTriangles );
	
	var vertexNormals = getVertexNormals( vertices, indexList, faceNormals, numVertices, numTriangles );
	//------------------------------------------------------
	console.log(vertexNormals);
	
    var normalsBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalsBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexNormals), gl.STATIC_DRAW);
        
    var vertexNormal = gl.getAttribLocation(myShaderProgram,"vertexNormal");
    gl.vertexAttribPointer( vertexNormal, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vertexNormal );
	
	var e = vec3(60.0, 80.0, 120.0);
    // Define at point (use vec3 in MV.js)
    var a = vec3(0.0, 0.0, 0.0);
    // Define vup vector (use vec3 in MV.js)
	var vup = vec3(0.0, 1.0, 0.0);
    // Obtain n (use subtract and normalize in MV.js)
    var n = normalize( vec3( e[0]-a[0], e[1]-a[1], e[2]-a[2]));
    // Obtain u (use cross and normalize in MV.js)
    var u = normalize(cross(vup,n));
    // Obtain v (use cross and normalize in MV.js)
    var v = normalize(cross(n,u));
    // Set up Model-View matrix M and send M as uniform to shader
	var modelviewMatrix = [u[0], v[0], n[0], 0.0,
			u[1], v[1], n[1], 0.0,
			u[2], v[2], n[2], 0.0,
			-u[0]*e[0]-u[1]*e[1]-u[2]*e[2],
			-v[0]*e[0]-v[1]*e[1]-v[2]*e[2],
			-n[0]*e[0]-n[1]*e[1]-n[2]*e[2], 1.0];
     
	var modelviewMatrixInverseTranspose = [u[0], v[0], n[0], e[0], 
						u[1], v[1], n[1], e[1],
						u[2], v[2], n[2], e[2],
						0.0, 0.0, 0.0, 1.0];
	gl.useProgram( myShaderProgram );
						
	var modelviewMatrixLocation = gl.getUniformLocation(myShaderProgram, "modelview");
	gl.uniformMatrix4fv(modelviewMatrixLocation, false, modelviewMatrix);
	
	var modelviewMatrixInverseTransposeLocation = gl.getUniformLocation(myShaderProgram, "modelviewInverseTranspose");
	 gl.uniformMatrix4fv(modelviewMatrixInverseTransposeLocation, false, modelviewMatrixInverseTranspose);
	
	 var left = -60.0;
    // Define right plane
    var right = 60.0;
    // Define top plane
    var top_ = 60.0;
    // Define bottom plane
    var bottom = -60.0;
    // Define near plane
    var near = 100.0;
    // Define far plane
    var far = 200;
    // Set up orthographic projection matrix P_orth using above planes
    
	var perspectiveProjectionMatrix = 
		[2.0*near/(right-left), 0.0, 0.0, 0.0,
		 0.0, 2.0*near/(top_-bottom), 0.0, 0.0,
		 (left+right)/(right-left), (top_+bottom)/(top_-bottom), -(far+near)/(far-near), -1.0,
		 0.0, 0.0, -2.0*far*near/(far-near), 0.0];
		 
	gl.useProgram( myShaderProgram );
	var perspectiveProjectionMatrixLocation = gl.getUniformLocation(myShaderProgram, "P_persp");
	gl.uniformMatrix4fv(perspectiveProjectionMatrixLocation, false, perspectiveProjectionMatrix);
    // Use a flag to determine which matrix to send as uniform to shader
    // flag value should be changed by a button that switches between
    // orthographic and perspective projections

	specIsOn = 1;
	specIsOnLocation = gl.getUniformLocation(myShaderProgram, "spec");
	gl.uniform1f(specIsOnLocation,specIsOn);
    
	lightOneIsOn = 1;
	lightOneIsOnLocation = gl.getUniformLocation(myShaderProgram, "lOne");
	gl.uniform1f(lightOneIsOnLocation,lightOneIsOn);
	
	lightTwoIsOn = 1;
	lightTwoIsOnLocation = gl.getUniformLocation(myShaderProgram, "lTwo");
	gl.uniform1f(lightTwoIsOnLocation,lightTwoIsOn);
    
    // Step 3.1: Normals for lighting calculations
    
    
    // Set up coefficients for the object
    // (ambient coefficients, diffuse coefficients,
    // specular coefficients, shininess)
    // and send them as uniform variables to the shader program (NEEDS CODE)
    var kaloc = gl.getUniformLocation(myShaderProgram, "ka");
	var kdloc = gl.getUniformLocation(myShaderProgram, "kd");
	var ksloc = gl.getUniformLocation(myShaderProgram, "ks");
	gl.uniform3f(kaloc, 0.5, 0.5, 0.5);
	gl.uniform3f(kdloc, 0.5, 0.5, 0.5);
	gl.uniform3f(ksloc, 1.0, 1.0, 1.0);
	var alphaloc = gl.getUniformLocation(myShaderProgram, "alpha");
	gl.uniform1f(alphaloc, 4.0);
    // Set up the first light source and send the variables
    // to the shader program (NEEDS CODE, VARIABLES DEPEND ON LIGHT TYPE)
    var p0loc = gl.getUniformLocation(myShaderProgram, "p0");
	gl.uniform3f(p0loc, 0.0, 0.0, 45.0);
	
	var Ialoc = gl.getUniformLocation(myShaderProgram, "Ia" );
	var Idloc = gl.getUniformLocation(myShaderProgram, "Id" );
	var Isloc = gl.getUniformLocation(myShaderProgram, "Is" );
	gl.uniform3f(Ialoc, 0.1, 0.1, 0.1);
	gl.uniform3f(Idloc, 0.8, 0.8, 0.8);
	gl.uniform3f(Isloc, 0.8, 0.8, 0.8);
	
    // Set up the second light source and send the variables
    // to the shader program (NEEDS CODE, VARIABLES DEPEND ON LIGHT TYPE)
    var p1loc = gl.getUniformLocation(myShaderProgram, "p1");
	gl.uniform3f(p1loc, -120.0, 50.0, 20.0);
	
	var Laloc = gl.getUniformLocation(myShaderProgram, "La" );
	var Ldloc = gl.getUniformLocation(myShaderProgram, "Ld" );
	var Lsloc = gl.getUniformLocation(myShaderProgram, "Ls" );
	gl.uniform3f(Laloc, 0.1, 0.1, 0.1);
	gl.uniform3f(Ldloc, 0.8, 0.8, 0.8);
	gl.uniform3f(Lsloc, 0.8, 0.8, 0.8);
	
	
	
	
}

function setupChair2(){
	myShaderProgram2 = initShaders( gl, "vertex-shader2", "fragment-shader2" );
    gl.useProgram( myShaderProgram2 );
    
	numVertices = 2440;
    numTriangles = 4871;

    vertices = getVertices(); // vertices and faces are defined in object.js
    indexList = getFaces();
    
    index2Buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,index2Buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexList), gl.STATIC_DRAW);
    
    vertices2Buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertices2Buffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);
    
    vertex2Position = gl.getAttribLocation(myShaderProgram2,"vertexPosition");
    gl.vertexAttribPointer( vertex2Position, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vertex2Position );
	
	
	
	var texSize = 64; 
	var myTexels = new Uint8Array(4 * texSize * texSize);
	for (var i = 0; i<texSize*texSize; i++) {
		var c =255*Math.random();
		myTexels[4*i+0]=c;
		myTexels[4*i+1]=c;
		myTexels[4*i+2]=c;
		myTexels[4*i+3]=255;
	}
	

    	
	var myImage = document.getElementById("plank");
	
	textureImage = gl.createTexture(); 
	gl.bindTexture(gl.TEXTURE_2D, textureImage);
	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, myImage);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
	gl.generateMipmap(gl.TEXTURE_2D);
	
	var faceNormals = getFaceNormals( vertices, indexList, numTriangles );
	
	var vertexNormals = getVertexNormals( vertices, indexList, faceNormals, numVertices, numTriangles );
	//------------------------------------------------------
	console.log(vertexNormals);
	
    var normals2Buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normals2Buffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexNormals), gl.STATIC_DRAW);
        
    var vertex2Normal = gl.getAttribLocation(myShaderProgram2,"vertexNormal");
    gl.vertexAttribPointer( vertex2Normal, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vertex2Normal );
	
	var e = vec3(60.0, 80.0, 120.0);
    // Define at point (use vec3 in MV.js)
    var a = vec3(0.0, 0.0, 0.0);
    // Define vup vector (use vec3 in MV.js)
	var vup = vec3(0.0, 1.0, 0.0);
    // Obtain n (use subtract and normalize in MV.js)
    var n = normalize( vec3( e[0]-a[0], e[1]-a[1], e[2]-a[2]));
    // Obtain u (use cross and normalize in MV.js)
    var u = normalize(cross(vup,n));
    // Obtain v (use cross and normalize in MV.js)
    var v = normalize(cross(n,u));
    // Set up Model-View matrix M and send M as uniform to shader
	var modelviewMatrix = [u[0], v[0], n[0], 0.0,
			u[1], v[1], n[1], 0.0,
			u[2], v[2], n[2], 0.0,
			-u[0]*e[0]-u[1]*e[1]-u[2]*e[2],
			-v[0]*e[0]-v[1]*e[1]-v[2]*e[2],
			-n[0]*e[0]-n[1]*e[1]-n[2]*e[2], 1.0];
     
	var modelviewMatrixInverseTranspose = [u[0], v[0], n[0], e[0], 
						u[1], v[1], n[1], e[1],
						u[2], v[2], n[2], e[2],
						0.0, 0.0, 0.0, 1.0];
	
	gl.useProgram( myShaderProgram2 ); 
	 var modelviewMatrixLocation = gl.getUniformLocation(myShaderProgram2, "modelview");
	gl.uniformMatrix4fv(modelviewMatrixLocation, false, modelviewMatrix);
	
	var modelviewMatrixInverseTransposeLocation = gl.getUniformLocation(myShaderProgram2, "modelviewInverseTranspose");
	 gl.uniformMatrix4fv(modelviewMatrixInverseTransposeLocation, false, modelviewMatrixInverseTranspose);
	
	var left = -60.0;
    // Define right plane
    var right = 60.0;
    // Define top plane
    var top_ = 60.0;
    // Define bottom plane
    var bottom = -60.0;
    // Define near plane
    var near = 100.0;
    // Define far plane
    var far = 200;
    // Set up orthographic projection matrix P_orth using above planes
    
	var perspectiveProjectionMatrix = 
		[2.0*near/(right-left), 0.0, 0.0, 0.0,
		 0.0, 2.0*near/(top_-bottom), 0.0, 0.0,
		 (left+right)/(right-left), (top_+bottom)/(top_-bottom), -(far+near)/(far-near), -1.0,
		 0.0, 0.0, -2.0*far*near/(far-near), 0.0];
		 
		 
	gl.useProgram( myShaderProgram2 );
	var perspectiveProjectionMatrixLocation = gl.getUniformLocation(myShaderProgram2, "P_persp");
	gl.uniformMatrix4fv(perspectiveProjectionMatrixLocation, false, perspectiveProjectionMatrix);
    // Use a flag to determine which matrix to send as uniform to shader
    // flag value should be changed by a button that switches between
    // orthographic and perspective projections


	specIsOnLocation2 = gl.getUniformLocation(myShaderProgram2, "spec");
	gl.uniform1f(specIsOnLocation2,specIsOn);
    

	lightOneIsOnLocation2 = gl.getUniformLocation(myShaderProgram2, "lOne");
	gl.uniform1f(lightOneIsOnLocation2,lightOneIsOn);
	

	lightTwoIsOnLocation2 = gl.getUniformLocation(myShaderProgram2, "lTwo");
	gl.uniform1f(lightTwoIsOnLocation2,lightTwoIsOn);
    
    // Step 3.1: Normals for lighting calculations
    
    
    // Set up coefficients for the object
    // (ambient coefficients, diffuse coefficients,
    // specular coefficients, shininess)
    // and send them as uniform variables to the shader program (NEEDS CODE)
    var kaloc = gl.getUniformLocation(myShaderProgram2, "ka");
	var kdloc = gl.getUniformLocation(myShaderProgram2, "kd");
	var ksloc = gl.getUniformLocation(myShaderProgram2, "ks");
	gl.uniform3f(kaloc, 0.5, 0.5, 0.5);
	gl.uniform3f(kdloc, 0.5, 0.5, 0.5);
	gl.uniform3f(ksloc, 1.0, 1.0, 1.0);
	var alphaloc = gl.getUniformLocation(myShaderProgram2, "alpha");
	gl.uniform1f(alphaloc, 4.0);
    // Set up the first light source and send the variables
    // to the shader program (NEEDS CODE, VARIABLES DEPEND ON LIGHT TYPE)
    var p0loc = gl.getUniformLocation(myShaderProgram2, "p0");
	gl.uniform3f(p0loc, 0.0, 0.0, 45.0);
	
	var Ialoc = gl.getUniformLocation(myShaderProgram2, "Ia" );
	var Idloc = gl.getUniformLocation(myShaderProgram2, "Id" );
	var Isloc = gl.getUniformLocation(myShaderProgram2, "Is" );
	gl.uniform3f(Ialoc, 0.1, 0.1, 0.1);
	gl.uniform3f(Idloc, 0.8, 0.8, 0.8);
	gl.uniform3f(Isloc, 0.8, 0.8, 0.8);
	
    // Set up the second light source and send the variables
    // to the shader program (NEEDS CODE, VARIABLES DEPEND ON LIGHT TYPE)
    var p1loc = gl.getUniformLocation(myShaderProgram2, "p1");
	gl.uniform3f(p1loc, -120.0, 50.0, 20.0);
	
	var Laloc = gl.getUniformLocation(myShaderProgram2, "La" );
	var Ldloc = gl.getUniformLocation(myShaderProgram2, "Ld" );
	var Lsloc = gl.getUniformLocation(myShaderProgram2, "Ls" );
	gl.uniform3f(Laloc, 0.1, 0.1, 0.1);
	gl.uniform3f(Ldloc, 0.8, 0.8, 0.8);
	gl.uniform3f(Lsloc, 0.8, 0.8, 0.8);	 
}

function setupTable(){
	myShaderProgram3 = initShaders( gl, "vertex-shader3", "fragment-shader3" );
    gl.useProgram( myShaderProgram3 );
	
	var vertices = [//Front
					0, .2,  0.2, // p0 0
					-.2, -.2,  0, // p1 1
					.2,  -.2,  0, //p2 2
					//Back
					0, .2,  0.2, //p0 3
					.2, -.2,  .4, //p3 4
					-.2, -.2,  .4, //p4 5
					//Left
					0, .2,  0.2, //p0 6
					-.2, -.2,  .4, //p4 7
					-.2, -.2,  0, //p1 8
					//Right 
					0, .2,  0.2, //p0 9
					.2,  -.2,  0, //p2 10
					.2, -.2,  .4, //p3 11 
					//Bottom
					.2,  -.2,  0, //p2 12 
					-.2, -.2,  0, //p1 13
					-.2, -.2,  .4, //p4 14 
					.2, -.2,  .4]; //p3 15
					

    // Colors at Vertices of pyramid
    var textureCoordinates = [//Front
							 0.0,  0.0, 
							 1.0,  0.0, 
							 1.0,  1.0, 
							 0.0,  1.0,
							//Back
							 0.0,  0.0, 
							 1.0,  0.0, 
							 1.0,  1.0, 
							 0.0,  1.0,
							//Top
							 0.0,  0.0, 
							 1.0,  0.0, 
							 1.0,  1.0, 
							 0.0,  1.0,
							//Bottom
							 0.0,  0.0, 
							 1.0,  0.0, 
							 1.0,  1.0, 
							 0.0,  1.0,
							//Right
							 0.0,  0.0, 
							 1.0,  0.0, 
							 1.0,  1.0, 
							 0.0,  1.0,
							//Left
							 0.0,  0.0, 
							 1.0,  0.0, 
							 1.0,  1.0, 
							 0.0,  1.0];

    var indexList = [//Front
					 0, 1, 2,
					 //Back
                     3, 4, 5,
					 //Left
                     6, 7, 8,
					 //Right
                     9, 10, 11,
					 //Bottom
                     12, 13, 14,
                     12, 14, 15];
    
	var myImage = document.getElementById("plank");
	
	textureImage3 = gl.createTexture(); 
	gl.bindTexture(gl.TEXTURE_2D, textureImage3);
	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, myImage);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
	gl.generateMipmap(gl.TEXTURE_2D);
	
	// will populate to create buffer for indices
    index3Buffer = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, index3Buffer );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexList), gl.STATIC_DRAW );
	
    // Code here to handle putting above lists into buffers
    vertices3Buffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vertices3Buffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );
    
    vertex3Position = gl.getAttribLocation( myShaderProgram3, "vertexPosition" );
    gl.vertexAttribPointer( vertex3Position, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vertex3Position );
    

	
	
	
	
	
}

function drawObject() {

	
	gl.useProgram(myShaderProgram2);
	
	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, textureImage);
	gl.uniform1i(gl.getUniformLocation(myShaderProgram2,"texMap0"),0);
	gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
	

	gl.uniform1f(gl.getUniformLocation(myShaderProgram2,"zata"),zata);
	
	gl.bindBuffer(gl.ARRAY_BUFFER,vertices2Buffer);
	gl.vertexAttribPointer(vertex2Position,4,gl.FLOAT,false,0,0);
	gl.enableVertexAttribArray(vertex2Position);
	
	
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,index2Buffer);
	
    gl.drawElements( gl.TRIANGLES, 3 * numTriangles, gl.UNSIGNED_SHORT, 0 )
	
	gl.useProgram(myShaderProgram);
	
	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, textureImage2);
	gl.uniform1i(gl.getUniformLocation(myShaderProgram,"texMap0"),0);
	
	gl.bindBuffer(gl.ARRAY_BUFFER,verticesBuffer);
	gl.vertexAttribPointer(vertexPosition,4,gl.FLOAT,false,0,0);
	gl.enableVertexAttribArray(vertexPosition);

	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,indexBuffer);
	
    gl.drawElements( gl.TRIANGLES, 3 * numTriangles, gl.UNSIGNED_SHORT, 0 )
	
	gl.useProgram(myShaderProgram3);
	
	gl.bindBuffer(gl.ARRAY_BUFFER,vertices3Buffer);
	gl.vertexAttribPointer(vertex3Position,3,gl.FLOAT,false,0,0);
	gl.enableVertexAttribArray(vertex3Position);

	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,index3Buffer);
	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, textureImage);
	gl.uniform1i(gl.getUniformLocation(myShaderProgram3,"texMap0"),0);
	
	gl.drawElements( gl.TRIANGLES, 18, gl.UNSIGNED_SHORT, 0 );
	
	requestAnimFrame(drawObject);
}

// Write a script for changing the perspective / orthographic flag
// using a button here


// Write a script for switching on / off the first light source flag
// using a button here
function toggleLightOne(){

	if(lightOneIsOn == 0){
		lightOneIsOn = 1;
		gl.useProgram(myShaderProgram);
		gl.uniform1f(lightOneIsOnLocation,lightOneIsOn);
		gl.useProgram(myShaderProgram2);
		gl.uniform1f(lightOneIsOnLocation2,lightOneIsOn);
	} else {
		lightOneIsOn = 0;
		gl.useProgram(myShaderProgram);
		gl.uniform1f(lightOneIsOnLocation,lightOneIsOn);
		gl.useProgram(myShaderProgram2);
		gl.uniform1f(lightOneIsOnLocation2,lightOneIsOn);
	}
	
}

// Write a script for switching on / off the second light source flag
// using a button here
function toggleLightTwo(){
	if(lightTwoIsOn == 0){
		lightTwoIsOn = 1;
		gl.useProgram(myShaderProgram);
		gl.uniform1f(lightTwoIsOnLocation,lightTwoIsOn);
		gl.useProgram(myShaderProgram2);
		gl.uniform1f(lightTwoIsOnLocation2,lightTwoIsOn);
	} else {
		lightTwoIsOn = 0;
		gl.useProgram(myShaderProgram);
		gl.uniform1f(lightTwoIsOnLocation,lightTwoIsOn);
		gl.useProgram(myShaderProgram2);
		gl.uniform1f(lightTwoIsOnLocation2,lightTwoIsOn);
	}
		
}

function toggleSpecular(){
	if(specIsOn == 0){
		specIsOn = 1;
		gl.uniform1f(specIsOnLocation,specIsOn);
	} else {
		specIsOn = 0;
		gl.uniform1f(specIsOnLocation,specIsOn);
	}
	
}
	
function rotateAroundX(P) {
    // will implement this to rotate the pyramid around the X-axis
    zata +=P;
    zataLoc=gl.getUniformLocation(myShaderProgram2,"zata");
    gl.uniform1f(zataLoc,zata);
}

function rotateAroundY(P) {
    // will implement to rotate the pyramid around the Y-axis
    beta +=P;
    betaLoc=gl.getUniformLocation(myShaderProgram2,"beta");
    gl.uniform1f(betaLoc,beta);
}



function moveKeys(event) {
	gl.useProgram(myShaderProgram2);
    var keyCode = event.keyCode;
    console.log(keyCode);
    if(keyCode==87){
        rotateAroundY(0.1); 
    }else if(keyCode==65){
        rotateAroundX(-0.1);
	}else if(keyCode==83){
	rotateAroundY(-0.1);
    }else if(keyCode == 68){
        rotateAroundX(0.1);
    }

}	
	
	
	
	
	
	
