John Graham 0620678
Sam Woodworth
Date: 3/12/20

Controls:
To play the game you hit the start button then a timer will start counting down. 
To play you click on the shape that is present that is not the black circle with your mouse to earn points. The shape will move each time it is clicked. 

Implementation:
To start we created one shape and used the lab 2 as a starting point adjusting the code that would move a shape to a clicked location on the canvas to a random one when the canvas was clicked.
Next the shape was given a hit box by using its max and min x,y values and adding the movement values to them.
If the canvas is clicked in a location in the hit box of the shape I will be register as the shape being clicked on. 
Next the Timer and score board were created by creating elements in the html file and changing them in the JS file. 
The Timer was created using the setTimeout Function that recursively called the function it s called in every 1 section where a counter will be deprecated by 1. 
Next 5 more shapes were created each getting their own setup function and color. A render function was created that depending on what the score of the current game is will decided what shape is shown along with also rendering the black circle. 
All the shape except for the black circle used the same vertex shaper in the html files while the black circle had its own due to it being rendered at the same time as one of the shapes. 
Each shape had its own fragment shader to set their color. 
