//John Graham 0620678

//Code for Lab1
var gl;
var canvas;
var myShaderProgramEllipse;
var myShaderProgramSquare;
var n;

function init(){
    // Set up the canvas
    canvas=document.getElementById("gl-canvas");
    gl=WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert( "WebGL is not available" ); }
    
    // Set up the viewport
    gl.viewport( 0, 0, 1024, 512 );   // x, y, width, height
    
    // Set up the background color
    gl.clearColor( 1.0, 1.0, 0.0, 1.0 );
    
    // Force the WebGL context to clear the color buffer
    gl.clear( gl.COLOR_BUFFER_BIT );

    // Create shader program, needs vertex and fragment shader code
    // in GLSL to be written in HTML file
   

    myShaderProgramSquare = initShaders( gl, "vertex-shader", "fragment-shader-square" );

    myShaderProgramEllipse = initShaders( gl, "vertex-shader", "fragment-shader-ellipse" );

    myShaderProgramStar = initShaders( gl, "vertex-shader", "fragment-shader-star" );

    gl.useProgram( myShaderProgramEllipse );
    setupEllipse();
    drawEllipse();

    gl.useProgram( myShaderProgramSquare );
    setupSquare();
    drawSquare();

    gl.useProgram( myShaderProgramStar );
    setupStar()
    drawStar()
    console.log("Here End");
}

function setupSquare(){
    // Enter array set up code here
    
    var point0 = vec2(0.0, 0.0);
    var point1 = vec2(-0.7, 0.0);
    var point2 = vec2(-0.7, -0.5);
    var point3 = vec2(0.0, -0.5);
    //var arrayOfPoints = [point0 point1 point2];
    var arrayOfPoints = [];
    arrayOfPoints.push(point0);
    arrayOfPoints.push(point1);
    arrayOfPoints.push(point2);
    arrayOfPoints.push(point3);
    
    // Create a buffer on the graphics card,
    // and send array to the buffer for use
    // in the shaders
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(arrayOfPoints), gl.STATIC_DRAW );
    
    
    
    // Create a pointer that iterates over the
    // array of points in the shader code
    var myPositionPointer = gl.getAttribLocation( myShaderProgramSquare, "myPosition" );
    gl.vertexAttribPointer( myPositionPointer, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray( myPositionPointer );
    
    
    
}

function setupEllipse(){
    // Enter array set up code here
    
    //var arrayOfPoints = [point0 point1 point2];
    var arrayOfPoints = [];
    //x = c cos(theta) + a
    //y = d sin(theta) + b
    var thetaStart = 0;
    var thetaEnd = 2*Math.PI;
    n = 100;
    var thetaStep = (thetaEnd-thetaStart)/n;
    var i;
    for(i=0; i<n; i++){
        var theta = thetaStart + i * thetaStep;
        var x = 0.4*Math.cos(theta) + 0.5;
        var y = 0.2*Math.sin(theta) - 0.5;
        var p = vec2(x,y);
        arrayOfPoints.push(p);

    }

    
    // Create a buffer on the graphics card,
    // and send array to the buffer for use
    // in the shaders
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(arrayOfPoints), gl.STATIC_DRAW );
    
    
    
    // Create a pointer that iterates over the
    // array of points in the shader code
    var myPositionPointer = gl.getAttribLocation( myShaderProgramEllipse, "myPosition" );
    gl.vertexAttribPointer( myPositionPointer, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray( myPositionPointer );
    
    
    
}

function setupStar(){
    // Enter array set up code here
    
    var point0 = vec2(0.5, 0.9);
    var point1 = vec2(0.6, 0.6);
    var point2 = vec2(0.8, 0.6);
    var point3 = vec2(0.65, 0.35);
    var point4 = vec2(0.7, 0.0);
    var point5 = vec2(0.5, 0.2);
    var point6 = vec2(0.3, 0.0);
    var point7 = vec2(0.35, 0.35);
    var point8 = vec2(0.2, 0.6);
    var point9 = vec2(0.4, 0.6);
    //var arrayOfPoints = [point0 point1 point2];
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
    var myPositionPointer = gl.getAttribLocation( myShaderProgramStar, "myPosition" );
    gl.vertexAttribPointer( myPositionPointer, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray( myPositionPointer );
    
    
    
}

function drawEllipse() {
    
    // Force a draw of the triangle using the
    // 'drawArrays()' call
    gl.drawArrays( gl.TRIANGLE_FAN, 0 ,n );
    
}

function drawSquare() {
    
    // Force a draw of the triangle using the
    // 'drawArrays()' call
    console.log("In DS");
    gl.drawArrays( gl.LINE_LOOP, 0 ,4 );
    
}

function drawStar() {
    
    // Force a draw of the triangle using the
    // 'drawArrays()' call
    console.log("In DS");
    gl.drawArrays( gl.LINE_LOOP, 0 ,10 );
    
}

