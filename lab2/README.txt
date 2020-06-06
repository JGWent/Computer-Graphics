John Graham 0620678
Date: 2/18/20

I believe my folder setup is case 2 

Description of your implementation of Lab2 Assignment

For the implementation of the lab 2 assignment I used the code we created in lecture as a starting point. 
I first changed the square to a star and created it using using 10 points and LINE_LOOP was used due to not being able to create it with TRIANGLE_FAN. 
The implementation for the move via click on the canvas was the same as the implementation in class. As well as the code for causing the shape to spin. 
Two buttons were then created to start and stop the rotation of the shape. Each button was linked to their own functions that would set a global variable keepRunning to 1 or 0 depending on which button was pressed. 
To make the start move to the right once the page had been start a group of else if statements were placed into the draw star function in the java script file. They checked what the most recent key pressed was out of 'w' 'a' 's' or 'd'. By default the most recent pressed key is set too d to make the star move to the right once the page has been loaded. 
Next the body was setup to track key stokes and linked to a function moveStarKeys that would place the value of the pressed key in to a global variable called keyCode. keyCode will remain the most recently pressed key unless the page is reloaded. 
To move the shape the same variables that change the position of the shape when the canvas is clicked are used to added the sliding function to the shape. In the if statements in the drawStar function depending on the most recent pressed key clips or clips will have their values increase by the value set in a variable speed. speed by default is set to 0.003
To increase the speed two more buttons were created one labeled increase and the other decrease. Each buttons was linked to their own function and when the increase button was pressed the global variable speed would have its value increased by 0.001. When decreased was pressed speed would have its value decreased by 0.001. if speed reaches 0 then it will be not allowed to go lower no matter how many times decreased is pressed. This is to prevent a negative speed which would cause the shape to move the opposite direction then what was intended for it. 
