var gl;
var shaderProgramStar;
var theta;
var canvas;
var tUniform;
var keepRunning;
var clipx;
var clipy;
var keyCode;
var speed;

function init() {
    theta = 0.0;
    keepRunning = 0;
    clipx = 0;
    clipy = 0;
    speed = 0.003;
    keyCode = 68;
    // Set up the canvas
    canvas=document.getElementById("gl-canvas");
    gl=WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert( "WebGL is not available" ); }
    
    // Set up the viewport
    gl.viewport( 0, 0, 512, 512 );   // x, y, width, height
    
    
    // Set up the background color
    gl.clearColor( 1.0, 0.0, 0.0, 1.0 );
    
    
    shaderProgramStar = initShaders( gl, "vertex-shader-Star",
                                      "fragment-shader-Star" );
    gl.useProgram( shaderProgramStar );

    tUniform = gl.getUniformLocation (shaderProgramStar, "t");
    gl.uniform2f(tUniform, .0, .0);
    
    // Force the WebGL context to clear the color buffer
    gl.clear( gl.COLOR_BUFFER_BIT );
    
    setupStar();
    
    //setInterval(drawStar,);
    drawStar();
}

function setupStar() {
    
    // Enter array set up code here
    var point0 = vec2(0.0, 0.25);
    var point1 = vec2(0.075, 0.1);
    var point2 = vec2(0.25, 0.1);
    var point3 = vec2(0.125, 0.0);
    var point4 = vec2(0.175, -0.15);
    var point5 = vec2(0.0, -0.05);
    var point6 = vec2(-0.175, -0.15);
    var point7 = vec2(-0.125, 0.0);
    var point8 = vec2(-0.25, 0.1);
    var point9 = vec2(-0.075, 0.1);

    var arrayOfPoints = [];
    arrayOfPoints.push(point0);
    arrayOfPoints.push(point1);
    arrayOfPoints.push(point2);
    arrayOfPoints.push(point3);
    arrayOfPoints.push(point4);
    arrayOfPoints.push(point5);
    arrayOfPoints.push(point6);
    arrayOfPoints.push(point7);
    arrayOfPoints.push(point8);
    arrayOfPoints.push(point9);
    
    // Create a buffer on the graphics card,
    // and send array to the buffer for use
    // in the shaders
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(arrayOfPoints), gl.STATIC_DRAW );

    
    // Create a pointer that iterates over the
    // array of points in the shader code
    var myPositionAttribute = gl.getAttribLocation( shaderProgramStar, "myPosition" );
    gl.vertexAttribPointer( myPositionAttribute, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( myPositionAttribute );    
}

function startRotate(){
        keepRunning = 1;
}

function stopRotate(){
    keepRunning = 0;
}

function speedDecrease(){
    if (speed <= 0){
        speed = 0;
    }else{
        speed = speed-0.001;
    }
}

function speedIncrease(){
    speed = speed+0.001;
}

function moveStar(event){
    var canvasx = event.clientX;
    var canvasy = event.clientY;

    clipx = 2.0*canvasx/512.0-1.0;
    clipy = -(2.0*canvasy/512.0-1.0);
    gl.uniform2f(tUniform, clipx, clipy);
}

function moveStarKeys(event) {
    keyCode = event.keyCode;
    console.log(keyCode);
}

function drawStar() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    theta += 0.01 * keepRunning;

    if(keyCode == 65 ){
        clipx = clipx - speed;
    }else if( keyCode == 68 ){
        clipx = clipx + speed;
    }else if( keyCode == 83 ){
        clipy = clipy - speed;
    }else if( keyCode == 87 ){
        clipy = clipy + speed;
    }
    gl.uniform2f(tUniform, clipx, clipy);
    //console.log(keyCode);

    var thetaUniform = gl.getUniformLocation (shaderProgramStar, "theta");
    gl.uniform1f(thetaUniform, theta);

    gl.drawArrays( gl.LINE_LOOP, 0, 10 );
    
    requestAnimationFrame(drawStar);
    
}
