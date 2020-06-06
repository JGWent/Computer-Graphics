// John Graham and Sam Woodworth
var gl;
var shaderProgramSquare,shaderProgramPentagon,shaderProgramTriangle,shaderProgramOctagon,shaderProgramTrapezoid,shaderProgramCircle,shaderProgramBad;
var theta;
var canvas;
var tUniform;
var keepRunning;
var clipx,bclipx;
var clipy,bclipy;
var keyCode;
var speed;
var clickx, clicky;
var score, timer,restart, current_shape;
var Shape_HitBox,n,Bad_HitBox;
var BufferIDSquare,BufferIDTri,BufferIDPent,BufferIDOct,BufferIDTrap,BufferIDCir,BufferIDBad;

function init() {
    theta = 0.0;
    keepRunning = 0;
    clipx=(Math.random() * 1.95) + -.95;
    clipy=(Math.random() * 1.95) + -.95;
    bclipx=(Math.random() * 1.95) + -.95;
    bclipy=(Math.random() * 1.95) + -.95;
    clickx = 0.5;
    clicky = 0.5;
    speed = 0;
    keyCode = 68;
    current_shape =0; //0-Square, 1-Triangle, 2-pentagon, 3-Octagon, 4-Trapazoid, 5-Circle

    timer = document.getElementById("c").textContent;
    score = document.getElementById("s").textContent;


    // Set up the canvas
    canvas=document.getElementById("gl-canvas");
    gl=WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert( "WebGL is not available" ); }
    
    // Set up the viewport
    gl.viewport( 0, 0, 512, 512 );   // x, y, width, height
    
    // Set up the background color
    gl.clearColor( 1.0, 0.0, 0.0, 1.0 );
    
    
    shaderProgramSquare = initShaders( gl, "vertex-shader-Shapes","fragment-shader-Square" );     

    shaderProgramTriangle = initShaders( gl, "vertex-shader-Shapes","fragment-shader-Triangle" );

    shaderProgramPentagon = initShaders( gl, "vertex-shader-Shapes","fragment-shader-Pentagon" );

    shaderProgramOctagon = initShaders( gl, "vertex-shader-Shapes","fragment-shader-Octagon" );

    shaderProgramTrapezoid = initShaders( gl, "vertex-shader-Shapes","fragment-shader-Trapezoid" );

    shaderProgramCircle= initShaders( gl, "vertex-shader-Shapes","fragment-shader-Circle" );

    shaderProgramBad= initShaders( gl, "vertex-shader-Bad","fragment-shader-Bad" );
    
    // Force the WebGL context to clear the color buffer
    gl.clear( gl.COLOR_BUFFER_BIT );
    
    setupSquare();
    setupTriangle();
    setupPentagon();
    setupOctagon();
    setupTrapezoid();
    setupCircle();
    setupBad();
    render();


}

function setupSquare() {
    
    // Enter array set up code here
    var point0 = vec2(0.1, 0.1);
    var point1 = vec2(0.1, -0.1);
    var point2 = vec2(-0.1, -0.1);
    var point3 = vec2(-0.1, 0.1);

    var arrayOfPoints = [];
    arrayOfPoints.push(point0);
    arrayOfPoints.push(point1);
    arrayOfPoints.push(point2);
    arrayOfPoints.push(point3);
    
    // Create a buffer on the graphics card,
    // and send array to the buffer for use
    // in the shaders
    BufferIDSquare = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, BufferIDSquare );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(arrayOfPoints), gl.STATIC_DRAW );
    

    
    // Create a pointer that iterates over the
    // array of points in the shader code
 
}


function setupTriangle() {
    // Enter array set up code here
    var point0 = vec2(0.0, 0.0);
    var point1 = vec2(0.1, 0.0);
    var point2 = vec2(0.05, 0.1);


    var arrayOfPoints = [];
    arrayOfPoints.push(point0);
    arrayOfPoints.push(point1);
    arrayOfPoints.push(point2);
    
    // Create a buffer on the graphics card,
    // and send array to the buffer for use
    // in the shaders
    BufferIDTri = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, BufferIDTri );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(arrayOfPoints), gl.STATIC_DRAW );

    
  
}

function setupPentagon(){
    // Enter array set up code here
    var point0 = vec2(0.0, 0.0);
    var point1 = vec2(0.2, 0.0);
    var point2 = vec2(0.25, 0.2);
    var point3 = vec2(0.1, 0.3);
    var point4 = vec2(-0.05, 0.2);

    var arrayOfPoints = [];
    arrayOfPoints.push(point0);
    arrayOfPoints.push(point1);
    arrayOfPoints.push(point2);
    arrayOfPoints.push(point3);
    arrayOfPoints.push(point4);

    // Create a buffer on the graphics card,
    // and send array to the buffer for use
    // in the shaders
    BufferIDPent = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, BufferIDPent );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(arrayOfPoints), gl.STATIC_DRAW );

}

function setupOctagon(){
    // Enter array set up code here
    var point0 = vec2(0.05, 0.1);
    var point1 = vec2(-0.05, 0.1);
    var point2 = vec2(-0.1, 0.05);
    var point3 = vec2(-0.1, -0.05);
    var point4 = vec2(-0.05, -0.1);
    var point5 = vec2(0.05, -0.1);
    var point6 = vec2(0.1, -0.05);
    var point7 = vec2(0.1, 0.05);

    var arrayOfPoints = [];
    arrayOfPoints.push(point0);
    arrayOfPoints.push(point1);
    arrayOfPoints.push(point2);
    arrayOfPoints.push(point3);
    arrayOfPoints.push(point4);
    arrayOfPoints.push(point5);
    arrayOfPoints.push(point6);
    arrayOfPoints.push(point7);


    // Create a buffer on the graphics card,
    // and send array to the buffer for use
    // in the shaders
    BufferIDOct = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, BufferIDOct );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(arrayOfPoints), gl.STATIC_DRAW );


}

function setupTrapezoid(){
    // Enter array set up code here
    var point0 = vec2(0.05, 0.05);
    var point1 = vec2(-0.05, 0.05);
    var point2 = vec2(-0.1, -0.1);
    var point3 = vec2(0.1, -0.1);

    var arrayOfPoints = [];
    arrayOfPoints.push(point0);
    arrayOfPoints.push(point1);
    arrayOfPoints.push(point2);
    arrayOfPoints.push(point3);

    // Create a buffer on the graphics card,
    // and send array to the buffer for use
    // in the shaders
    BufferIDTrap = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, BufferIDTrap );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(arrayOfPoints), gl.STATIC_DRAW );

}

function setupCircle(){
    var arrayOfPoints = [];
    //x = c cos(theta) + a
    //y = d sin(theta) + b
    var thetaStart = 0;
    var thetaEnd = 2*Math.PI;
    n = 100;
    var thetaStep = (thetaEnd-thetaStart)/n;
    var i;
    for(i=0; i<n; i++){
        var th = thetaStart + i * thetaStep;
        var x = 0.1*Math.cos(th);
        var y = 0.1*Math.sin(th);
        var p = vec2(x,y);
        arrayOfPoints.push(p);

    }

    
    // Create a buffer on the graphics card,
    // and send array to the buffer for use
    // in the shaders
    BufferIDCir = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, BufferIDCir );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(arrayOfPoints), gl.STATIC_DRAW );

}

function setupBad(){
    Bad_HitBox = [0.1,-0.1,0.1,-0.1]; //(Xmax,Xmin,Ymax,Ymin)
    var arrayOfPoints = [];
    //x = c cos(theta) + a
    //y = d sin(theta) + b
    var thetaStart = 0;
    var thetaEnd = 2*Math.PI;
    n = 100;
    var thetaStep = (thetaEnd-thetaStart)/n;
    var i;
    for(i=0; i<n; i++){
        var th = thetaStart + i * thetaStep;
        var x = 0.1*Math.cos(th);
        var y = 0.1*Math.sin(th);
        var p = vec2(x,y);
        arrayOfPoints.push(p);

    }

    
    // Create a buffer on the graphics card,
    // and send array to the buffer for use
    // in the shaders
    BufferIDBad = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, BufferIDBad );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(arrayOfPoints), gl.STATIC_DRAW );

}

function moveShape(event){
    var canvasx = event.clientX;
    var canvasy = event.clientY;

    clickx = 2.0*canvasx/512.0-1.0;
    clicky = -(2.0*canvasy/512.0-1.0);
    console.log("X"+clickx);
    console.log("Y"+clicky);
    console.log(Shape_HitBox);
    if (clickx < Shape_HitBox[0]+clipx && clickx > Shape_HitBox[1]+clipx && clicky < Shape_HitBox[2]+clipy && clicky > Shape_HitBox[3]+clipy && restart == 0){
        console.log('Here');
        clipx=(Math.random() * 1.95) + -.95;
        clipy=(Math.random() * 1.95) + -.95;
        bclipx=(Math.random() * 1.95) + -.95;
        bclipy=(Math.random() * 1.95) + -.95;
        score++;
        document.getElementById("s").innerHTML = score;
    }else if(clickx < Bad_HitBox[0]+bclipx && clickx > Bad_HitBox[1]+bclipx && clicky < Bad_HitBox[2]+bclipy && clicky > Bad_HitBox[3]+bclipy && restart == 0){
        clipx=(Math.random() * 1.95) + -.95;
        clipy=(Math.random() * 1.95) + -.95;
        bclipx=(Math.random() * 1.95) + -.95;
        bclipy=(Math.random() * 1.95) + -.95;
        score--;
        document.getElementById("s").innerHTML = score;
    }
    //gl.uniform2f(tUniform, clipx, clipy);
}

function startTimer() {
    if(restart == 0){
        if (timer <= 0){
            if(score >=50){
                window.alert("Times up. YOU WIN!!! \nYou got "+score+" Points! \n Hit start to play again.");
                restart=1;
            }else{
                window.alert("Times up. You Lost \nYou got "+score+" Points. \n Hit start to play again.");
                restart=1;
            }

        }else{
            setTimeout(startTimer, 1000);
            timer--;
            document.getElementById("c").innerHTML = timer;
        }
    }else{
        timer =60;
        score =0;
        document.getElementById("c").innerHTML = timer;
        document.getElementById("s").innerHTML = score;
        restart =0;
        startTimer();
    }


}

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    if(score == 10){
        current_shape=1;
    }else if(score == 20){
        current_shape=2;
    }else if(score == 30){
        current_shape=3;
    }else if(score == 40){
        current_shape=4;
    }else if(score == 50){
        current_shape=5;
    }

    if(current_shape ==0){
        Shape_HitBox = [0.125,-0.09,0.9,-0.12]; //(Xmax,Xmin,Ymax,y,min)

        gl.useProgram( shaderProgramSquare );

        tUniform = gl.getUniformLocation (shaderProgramSquare, "t");
        gl.uniform2f(tUniform, clipx, clipy);

        var thetaUniform = gl.getUniformLocation (shaderProgramSquare, "theta");
        gl.uniform1f(thetaUniform, theta);

        gl.bindBuffer( gl.ARRAY_BUFFER, BufferIDSquare );

        var myPositionSquare = gl.getAttribLocation( shaderProgramSquare, "myPosition" );
        gl.vertexAttribPointer( myPositionSquare, 2, gl.FLOAT, false, 0, 0 );
        gl.enableVertexAttribArray( myPositionSquare );   


        gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
    }
    else if(current_shape ==1 ){
        Shape_HitBox = [0.11,-0.01,0.11,-0.05]; //(Xmax,Xmin,Ymax,y,min)
        
        gl.useProgram( shaderProgramTriangle );

        tUniform = gl.getUniformLocation (shaderProgramTriangle, "t");
        gl.uniform2f(tUniform, clipx, clipy);
    
        var thetaUniform = gl.getUniformLocation (shaderProgramTriangle, "theta");
        gl.uniform1f(thetaUniform, theta);

        gl.bindBuffer( gl.ARRAY_BUFFER, BufferIDTri );
    
        var myPositionTri = gl.getAttribLocation( shaderProgramTriangle, "myPosition" );
        gl.vertexAttribPointer( myPositionTri, 2, gl.FLOAT, false, 0, 0 );
        gl.enableVertexAttribArray( myPositionTri );  

        gl.drawArrays( gl.TRIANGLE_FAN, 0, 3 );
    }    
    else if(current_shape ==2 ){
        Shape_HitBox = [0.25,-0.05,0.3,0.0]; //(Xmax,Xmin,Ymax,Ymin)
        
        gl.useProgram( shaderProgramPentagon );

        tUniform = gl.getUniformLocation (shaderProgramPentagon, "t");
        gl.uniform2f(tUniform, clipx, clipy);
    
        var thetaUniform = gl.getUniformLocation (shaderProgramPentagon, "theta");
        gl.uniform1f(thetaUniform, theta);

        gl.bindBuffer( gl.ARRAY_BUFFER, BufferIDPent );
    
        var myPositionPent = gl.getAttribLocation( shaderProgramPentagon, "myPosition" );
        gl.vertexAttribPointer( myPositionPent, 2, gl.FLOAT, false, 0, 0 );
        gl.enableVertexAttribArray( myPositionPent );  

        gl.drawArrays( gl.TRIANGLE_FAN, 0, 5 );
    }
    else if(current_shape ==3 ){
        Shape_HitBox = [0.1,-0.1,0.1,-0.1]; //(Xmax,Xmin,Ymax,Ymin)
        
        gl.useProgram( shaderProgramOctagon );

        tUniform = gl.getUniformLocation (shaderProgramOctagon, "t");
        gl.uniform2f(tUniform, clipx, clipy);
    
        var thetaUniform = gl.getUniformLocation (shaderProgramOctagon, "theta");
        gl.uniform1f(thetaUniform, theta);

        gl.bindBuffer( gl.ARRAY_BUFFER, BufferIDOct );
    
        var myPositionOct = gl.getAttribLocation( shaderProgramOctagon, "myPosition" );
        gl.vertexAttribPointer( myPositionOct, 2, gl.FLOAT, false, 0, 0 );
        gl.enableVertexAttribArray( myPositionOct );  

        gl.drawArrays( gl.TRIANGLE_FAN, 0, 8 );
    }
    else if(current_shape ==4 ){
        Shape_HitBox = [0.1,-0.1,0.1,-0.1]; //(Xmax,Xmin,Ymax,Ymin)
        
        gl.useProgram( shaderProgramTrapezoid );

        tUniform = gl.getUniformLocation (shaderProgramTrapezoid, "t");
        gl.uniform2f(tUniform, clipx, clipy);
    
        var thetaUniform = gl.getUniformLocation (shaderProgramTrapezoid, "theta");
        gl.uniform1f(thetaUniform, theta);

        gl.bindBuffer( gl.ARRAY_BUFFER, BufferIDTrap );
    
        var myPositionTrap = gl.getAttribLocation( shaderProgramTrapezoid, "myPosition" );
        gl.vertexAttribPointer( myPositionTrap, 2, gl.FLOAT, false, 0, 0 );
        gl.enableVertexAttribArray( myPositionTrap );  

        gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
    }
    else if(current_shape ==5 ){
        Shape_HitBox = [0.1,-0.1,0.1,-0.1]; //(Xmax,Xmin,Ymax,Ymin)
        
        gl.useProgram( shaderProgramCircle );

        tUniform = gl.getUniformLocation (shaderProgramCircle, "t");
        gl.uniform2f(tUniform, clipx, clipy);
    
        var thetaUniform = gl.getUniformLocation (shaderProgramCircle, "theta");
        gl.uniform1f(thetaUniform, theta);

        gl.bindBuffer( gl.ARRAY_BUFFER, BufferIDCir );
    
        var myPositionCir = gl.getAttribLocation( shaderProgramCircle, "myPosition" );
        gl.vertexAttribPointer( myPositionCir, 2, gl.FLOAT, false, 0, 0 );
        gl.enableVertexAttribArray( myPositionCir );  

        gl.drawArrays( gl.TRIANGLE_FAN, 0, n );
    }

    gl.useProgram( shaderProgramBad );

    tUniform = gl.getUniformLocation (shaderProgramBad, "t");
    gl.uniform2f(tUniform, bclipx, bclipy);

    var thetaUniform = gl.getUniformLocation (shaderProgramBad, "theta");
    gl.uniform1f(thetaUniform, theta);

    gl.bindBuffer( gl.ARRAY_BUFFER, BufferIDBad );

    var myPositionBad = gl.getAttribLocation( shaderProgramBad, "myPosition" );
    gl.vertexAttribPointer( myPositionBad, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( myPositionBad );  

    gl.drawArrays( gl.TRIANGLE_FAN, 0, n );
    
    requestAnimationFrame(render);
    
}
