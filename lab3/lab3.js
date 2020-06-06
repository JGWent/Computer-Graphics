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
    
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
    
    
    myShaderProgram =
        initShaders( gl,"vertex-shader", "fragment-shader" );
    gl.useProgram( myShaderProgram );
    
    // will include depth test to render faces correctly!
    gl.enable( gl.DEPTH_TEST );
    
    setuppyramid();
    
    render();

}

function setuppyramid() {
    
    // Vertices of pyramid
    var vertices = [vec4( 0, .2,  0.2,  1), // p0
                    vec4(  -.2, -.2,  0,  1), // p1
                    vec4(  .2,  -.2,  0,  1), // p2
                    vec4(  .2, -.2,  .4,  1), // p3
                    vec4( -.2, -.2,  .4,  1)];// p4

    // Colors at Vertices of pyramid
    var vertexColors = [vec4( 1.0, 0.0, 1.0, 1.0), // p0
                        vec4( 1.0, 0.0, 0.0, 1.0), // p1
                        vec4( 0.0, 1.0, 0.0, 1.0), // p2
                        vec4( 0.0, 1.0, 1.0, 1.0), // p3
                        vec4( 1.0, 1.0, 1.0, 1.0)];// p4

    var indexList = [0, 1, 2,
                     0, 3, 4,
                     0, 4, 1,
                     0, 2, 3,
                     2, 1, 4,
                     2, 4, 3];
    
    // Code here to handle putting above lists into buffers
    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vertexBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );
    
    var myPosition = gl.getAttribLocation( myShaderProgram, "myPosition" );
    gl.vertexAttribPointer( myPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( myPosition );
    
    var colorBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, colorBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertexColors), gl.STATIC_DRAW );
    
    var myColor = gl.getAttribLocation( myShaderProgram, "myColor" );
    gl.vertexAttribPointer( myColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( myColor );
    
    // will populate to create buffer for indices
    var iBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, iBuffer );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indexList), gl.STATIC_DRAW );
}

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

    deltaLoc=gl.getUniformLocation(myShaderProgram,"delta");
    gl.uniform1f(deltaLoc,delta);

    echoLoc=gl.getUniformLocation(myShaderProgram,"echo");
    gl.uniform1f(echoLoc,echo);
    
    // will populate to render the pyramid
    gl.drawElements( gl.TRIANGLES, 18, gl.UNSIGNED_BYTE, 0 );
}

function rotateAroundX() {
    // will implement this to rotate the pyramid around the X-axis
    alpha +=.1;
    alphaLoc=gl.getUniformLocation(myShaderProgram,"alpha");
    gl.uniform1f(alphaLoc,alpha);
    render();
}

function rotateAroundY() {
    // will implement to rotate the pyramid around the Y-axis
    beta +=.1;
    betaLoc=gl.getUniformLocation(myShaderProgram,"beta");
    gl.uniform1f(betaLoc,beta);
    render();
}

function rotateAroundZ() {
    // will implement to rotate the pyramid around the Z-axis
    gamma +=.1;
    gammaLoc=gl.getUniformLocation(myShaderProgram,"gamma");
    gl.uniform1f(gammaLoc,gamma);
    render();
}

function tanslateX(LR) {
    // will implement to tanslate the pyramid around the X-axis
    fox+=LR;
    foxLoc=gl.getUniformLocation(myShaderProgram,"fox");
    gl.uniform1f(foxLoc,fox);
    render();
}

function tanslateY(UD) {
    // will implement to translate the pyramid around the Y-axis
    lamda+=UD;
    lamdaLoc=gl.getUniformLocation(myShaderProgram,"lamda");
    gl.uniform1f(lamdaLoc,lamda);
    render();
}

function scaleX(BL) {
    // will implement to scale the pyramid around the x-axis
    delta+=BL;
    deltaLoc=gl.getUniformLocation(myShaderProgram,"delta");
    gl.uniform1f(deltaLoc,delta);
    render();
}

function scaleY(BL) {
    // will implement to scale the pyramid around the Y-axis
    echo+=BL;
    echoLoc=gl.getUniformLocation(myShaderProgram,"echo");
    gl.uniform1f(echoLoc,echo);
    render();
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