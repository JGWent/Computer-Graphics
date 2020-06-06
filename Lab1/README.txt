John Graham 0620678
Date: 2/5/20


Description of your implementation of Lab1 Assignment:

First I extended my cavas by doubling its length horizontially also maked it color yellow. 
Then I created a rectangle using LINE_LOOP, Using the functino setup and drawsquare function.
I created a shader for the rectangle to make it red.
Second I made the ellipse shape using the equations:
        var x = 0.4*Math.cos(theta) + 0.5;
        var y = 0.2*Math.sin(theta) - 0.5; 
in a loop to create the points. Next I drew it using a created drawellipse function which used TRIANGLE_FAN method.
I created a shader for the ellipse to make it blue.
For my third shape I made a star using LOOP_LINE. As we discussed in class you can't use TRIANGLE_FAN to make a star so I though to try to do it with LOOP_LINE.
It uses ten points in total. 
I created a shader for the star to make it the coler black.
I worked to organized the shapes so there was no over lap. 

