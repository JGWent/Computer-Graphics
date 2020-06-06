var gl;
var myShaderProgram;
var alpha;
var beta;
var alphaLoc;
var betaLoc;
var gamma;
var gammaLoc;
var fox;
var foxLoc;
var lamda;
var lamdaLoc;
var delta;
var deltaLoc;
var echo;
var echoLoc;

function init() {
    alpha =0;
    beta =0;
    gamma =0;
    fox =0;
    lamda =0;
    delta =1;
    echo =1;
    var canvas=document.getElementById("gl-canvas");
    gl=WebGLUtils.setupWebGL(canvas);
    
    if (!gl) { alert( "WebGL is not available" ); }
    
    gl.viewport( 0, 0, 512, 512 );
    
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
	
    // will include depth test to render faces correctly!
    gl.enable( gl.DEPTH_TEST );
    
    myShaderProgram =
        initShaders( gl,"vertex-shader", "fragment-shader" );
    gl.useProgram( myShaderProgram );
    
	// Vertices of pyramid
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
    
	
	var myImage = document.getElementById("flowerImage");
	
	textureImage = gl.createTexture(); 
	gl.bindTexture(gl.TEXTURE_2D, textureImage);
	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, myImage);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
	gl.generateMipmap(gl.TEXTURE_2D);
	
	// will populate to create buffer for indices
    var iBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, iBuffer );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexList), gl.STATIC_DRAW );
	
    // Code here to handle putting above lists into buffers
    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vertexBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );
    
    var myPosition = gl.getAttribLocation( myShaderProgram, "myPosition" );
    gl.vertexAttribPointer( myPosition, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( myPosition );
    
	var textureVertexBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, textureVertexBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(textureCoordinates), gl.STATIC_DRAW );
	
	var textureCoordinate = gl.getAttribLocation(myShaderProgram, "textureCoordinate");
	gl.vertexAttribPointer( textureCoordinate, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( textureCoordinate )
    
    
    render();

}

function setuppyramid() {
    
    
    

}

function render() {
	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, textureImage);
	gl.uniform1i(gl.getUniformLocation(myShaderProgram,"texMap0"),0);
	
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

    deltaLoc=gl.getUniformLocation(myShaderProgram,"delta");
    gl.uniform1f(deltaLoc,delta);

    echoLoc=gl.getUniformLocation(myShaderProgram,"echo");
    gl.uniform1f(echoLoc,echo);
    
    // will populate to render the pyramid
    gl.drawElements( gl.TRIANGLES, 18, gl.UNSIGNED_SHORT, 0 );
	requestAnimFrame(render);
}

function rotateAroundX() {
    // will implement this to rotate the pyramid around the X-axis
    alpha +=.1;
    alphaLoc=gl.getUniformLocation(myShaderProgram,"alpha");
    gl.uniform1f(alphaLoc,alpha);
}

function rotateAroundY() {
    // will implement to rotate the pyramid around the Y-axis
    beta +=.1;
    betaLoc=gl.getUniformLocation(myShaderProgram,"beta");
    gl.uniform1f(betaLoc,beta);
}

function rotateAroundZ() {
    // will implement to rotate the pyramid around the Z-axis
    gamma +=.1;
    gammaLoc=gl.getUniformLocation(myShaderProgram,"gamma");
    gl.uniform1f(gammaLoc,gamma);
}

function tanslateX(LR) {
    // will implement to tanslate the pyramid around the X-axis
    fox+=LR;
    foxLoc=gl.getUniformLocation(myShaderProgram,"fox");
    gl.uniform1f(foxLoc,fox);
}

function tanslateY(UD) {
    // will implement to translate the pyramid around the Y-axis
    lamda+=UD;
    lamdaLoc=gl.getUniformLocation(myShaderProgram,"lamda");
    gl.uniform1f(lamdaLoc,lamda);
}

function scaleX(BL) {
    // will implement to scale the pyramid around the x-axis
    delta+=BL;
    deltaLoc=gl.getUniformLocation(myShaderProgram,"delta");
    gl.uniform1f(deltaLoc,delta);
}

function scaleY(BL) {
    // will implement to scale the pyramid around the Y-axis
    echo+=BL;
    echoLoc=gl.getUniformLocation(myShaderProgram,"echo");
    gl.uniform1f(echoLoc,echo);
}

function moveKeys(event) {
    keyCode = event.keyCode;
    console.log(keyCode);
    if(keyCode==89){
        rotateAroundY(); 
    }else if(keyCode==88){
        rotateAroundX();
    }else if(keyCode==90){
        rotateAroundZ();
    }else if(keyCode == 65){
        tanslateX(-0.1);
    }else if(keyCode == 68){
        tanslateX(0.1);
    }else if(keyCode == 87){
        tanslateY(0.1);
    }else if(keyCode == 83){
        tanslateY(-0.1);
    }else if(keyCode == 84){
        scaleX(0.1);
    }else if(keyCode == 82){
        scaleX(-0.1);
    }else if(keyCode == 71){
        scaleY(0.1);
    }else if(keyCode == 70){
        scaleY(-0.1);
    }

}