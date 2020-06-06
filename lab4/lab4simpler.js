// Name: John Graham

var gl;
var numVertices;
var numTriangles;
var orthographicIsOn;
var orthographicIsOnLocation;
var myShaderProgram;
var specIsOn;
var specIsOnLocation;
var lightOneIsOn;
var lightOneIsOnLocation;
var lightTwoIsOn;
var lightTwoIsOnLocation;

function initGL(){
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
    
    gl.enable(gl.DEPTH_TEST);
    gl.viewport( 0, 0, 512, 512 );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
    
    var myShaderProgram = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( myShaderProgram );

    
    numVertices = 2440;
    numTriangles = 4871;
    vertices = getVertices(); // vertices and faces are defined in object.js
    indexList = getFaces();
    
    var indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexList), gl.STATIC_DRAW);
    
    var verticesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);
    
    var vertexPosition = gl.getAttribLocation(myShaderProgram,"vertexPosition");
    gl.vertexAttribPointer( vertexPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vertexPosition );
    
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
    
    console.log(vertexPosition);
    console.log(vertexNormal);
	
	    // Create face normals using faces and vertices by calling getFaceNormals

    
    // Create vertex normals using faces, vertices, and face normals
    // by calling getVertexNormals
    
    
    // WORK ON THIS LAB IN TWO ITERATIONS
    // In the first iteration, do Steps 1 and 2 (i.e., do the Viewing portion)
    // and try to determine if you can see a silhouette (i.e., a filled outline)
    // of the chair. You will not see any inner detail, but you will at least know
    // that the chair is within the viewport. Make sure while doing this step
    // to apply the modelview and projection matrices in the vertex shader
    
    // In the second iteration, do Steps 3.1 (normal calculation and light setup), 3.2 (vertex
    // shader calculations for lighting, and steps 3.3 (fragment shader calculations
    // for lighting) so you can see the inner detail of the chair
    
    // FOLLOWING LINES IN STEPS 1 AND 2 NEED CODE FOR EACH COMMENT
    
    
    // Step 1: Position the camera using the look at method
    
    // Define eye (use vec3 in MV.js)
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
						
	var modelviewMatrixLocation = gl.getUniformLocation(myShaderProgram, "modelview");
	gl.uniformMatrix4fv(modelviewMatrixLocation, false, modelviewMatrix);
	
	var modelviewMatrixInverseTransposeLocation = gl.getUniformLocation(myShaderProgram, "modelviewInverseTranspose");
	 gl.uniformMatrix4fv(modelviewMatrixInverseTransposeLocation, false, modelviewMatrixInverseTranspose);
    // Step 2: Set up orthographic and perspective projections
    
    // Define left plane
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
    var orthographicProjectionMatrix = 
		[2.0/(right-left), 0.0, 0.0, 0.0,
		 0.0, 2.0/(top_-bottom), 0.0, 0.0,
		 0.0, 0.0, -2.0/(far-near), 0.0,
		 -(left+right)/(right-left), -(top_+bottom)/(top_-bottom), -(far+near)/(far-near), 1.0];
    // Set up perspective projection matrix P_persp using above planes
	var perspectiveProjectionMatrix = 
		[2.0*near/(right-left), 0.0, 0.0, 0.0,
		 0.0, 2.0*near/(top_-bottom), 0.0, 0.0,
		 (left+right)/(right-left), (top_+bottom)/(top_-bottom), -(far+near)/(far-near), -1.0,
		 0.0, 0.0, -2.0*far*near/(far-near), 0.0];
		 
		 
	var orthographicProjectionMatrixLocation = gl.getUniformLocation(myShaderProgram, "P_orth");
	gl.uniformMatrix4fv(orthographicProjectionMatrixLocation, false, orthographicProjectionMatrix);
	
	var perspectiveProjectionMatrixLocation = gl.getUniformLocation(myShaderProgram, "P_persp");
	gl.uniformMatrix4fv(perspectiveProjectionMatrixLocation, false, perspectiveProjectionMatrix);
    // Use a flag to determine which matrix to send as uniform to shader
    // flag value should be changed by a button that switches between
    // orthographic and perspective projections
    orthographicIsOn = 1;
	orthographicIsOnLocation = gl.getUniformLocation(myShaderProgram, "orthIsOn");
	gl.uniform1f(orthographicIsOnLocation,orthographicIsOn);
	
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
    // Initialize up on/off flags for the both light sources. These
    // flags should be controlled using buttons
    
    // You will need to have an additional uniform variable for the
    // modelview inverse transpose that gets applied to the vertex normal.
    // Figure out the modelview inverse transpose and send it to the
    // shader program as a uniform (NEEDS CODE)
    
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

function drawObject() {
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
    gl.drawElements( gl.TRIANGLES, 3 * numTriangles, gl.UNSIGNED_SHORT, 0 )
	requestAnimFrame(drawObject);
}

// Write a script for changing the perspective / orthographic flag
// using a button here
function showOrthographic(){
		orthographicIsOn = 1;
		gl.uniform1f(orthographicIsOnLocation,orthographicIsOn);
		console.log("orth");
	
}

function showPerspective(){
		orthographicIsOn = 0;;
		gl.uniform1f(orthographicIsOnLocation,orthographicIsOn);
		console.log("persp");
	
}


// Write a script for switching on / off the first light source flag
// using a button here
function toggleLightOne(){
	if(lightOneIsOn == 0){
		lightOneIsOn = 1;
		gl.uniform1f(lightOneIsOnLocation,lightOneIsOn);
	} else {
		lightOneIsOn = 0;
		gl.uniform1f(lightOneIsOnLocation,lightOneIsOn);
	}
		
}

// Write a script for switching on / off the second light source flag
// using a button here
function toggleLightTwo(){
	if(lightTwoIsOn == 0){
		lightTwoIsOn = 1;
		gl.uniform1f(lightTwoIsOnLocation,lightTwoIsOn);
	} else {
		lightTwoIsOn = 0;
		gl.uniform1f(lightTwoIsOnLocation,lightTwoIsOn);
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
	
	
	
	
	
	
	
	
