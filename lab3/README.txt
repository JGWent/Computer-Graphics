John Graham
3/6/20
Submission type is Case 2

Description of your implementation of Lab3 Assignment

I decided to create a pyramid for my 3d shape. I started by first drawing out the pyramid on paper to plan out the points and triangles that would be required to create it. 

I next created the setup function for the pyramid using the information I planned out on paper along with creating a matrix to be used to apply colors to each vertex.

Next I created a function for each transformation that needed to be done to the pyramid. A matrix for each transformation was created in the HTML file along with the equation where they are multiplied together.

My composition goes in the order of Rotate around X, Rotate around Y, Rotate around Z, Translate along X, Translate along Y, Scale X, and Scale Y.

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

