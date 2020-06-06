John Graham 0620678
Date: 4/17/20

Description of your implementation of Lab5 Assignment:
I first created the example cube from the lectures to understade how to apply a texture. 
Next Adjusted my HTML file to accept one texture. 
After adjusting the HTML file I added all the relevent buffers and pointers to values in the html file to the jave script file.
I then remade my veritces by making points for each face of my pyramid. 
Also changing my color var to a texturecoordinate var. 
I then adjusted the indexlist to account for the new veritces. 
I modified my render function to apply the texture to the texmap in the html file. 

For the texture I chose a image of bricks from a pyramid to give a brick pattern to my pyramid. 
The movement was not changed from lab 3 so the keys used were not changed. 
The Keys Used

X rotates around the X axis
Y rotates around the Y axis
Z rotates around the Z axis

A will translate in the positive direction of the Y axis
S will translate in the negative direction of the Y axis
D will translate in the positive direction of the X axis
A will translate in the negative direction of the X axis

T will increase the Scale of the X values
R will decrease the Scale of the X values
G will increase the Scale of the Y values
F will decrease the Scale of the Y values

The Rotating Key were selected due to them being the same as the axis they are rotating around.

The Translate key were selected due to them being normally used as movement keys

The scale keys were selected as two groups of two keys that were next to each other. 

The moveKeys function in the JS file will take the key pressed check if its one of the ones listed and call the appropriate transformation function. 

My submission is case 2
