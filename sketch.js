/*

The Game Project - stage 4
Author: Risha Sringa Chanmgai - (https://github.com/michaelspeed)
Date: 07-01-2023
Git status: initialized after 3b, for more info check git history
Additional files: p5.js (for better completions in webstorm, preferred IDE)

Zip files: [index.html, sketch.js, p5.js, p5.min.js, .git, .idea]

Stickman is a superhuman, can jump large distance
for better playability jumping is done by pressing up arrow key + left or right arrow key and can be controlled in flight
*/

var gameChar_x;
var gameChar_y;
var floorPos_y;

// Game character states
var state = {
	isLeft: false,
	isRight: false,
	isFalling: false,
	isPlummeting:false,
}

// Game character
var stickman

// Movement constants
const jumpDelta = 4
const walkDelta = 10

// Collectable
var collectables = [];

// Canyon
var canyons = [];

// Trees
var trees_x = []

// Clouds
var clouds = []

// Mountains
var mountains = []

// Camera positioning
var cameraPosX = 0

// Game Score
var game_score = 0

// Flagpole
var flagpole = {x_pos: 100, isReached: false}

// Lives
var lives = 3

// Game State
var gameState = {
	finished: false,
	gameOver: false,
}


function setup() {
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
	gameChar_x = width/2;
	gameChar_y = floorPos_y;

	stickman = new StickMan(gameChar_x, gameChar_y, 'blue', 80)

	collectables = generateCollectables(50)

	canyons = generateCanyons(3)

	clouds = generateClouds(100)

	mountains = generateMountains(30)

	trees_x = generateTrees(60)
}

function draw() {

	///////////DRAWING CODE//////////
	background(100,155,255); //fill the sky blue


	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height - floorPos_y); //draw some green ground

	push()
	translate(-cameraPosX, 0)

	//draw the canyon
	canyons.forEach(drawCanyon)

	// Draw the mountains (using forEach loop instead of for loop which is much cleaner)
	mountains.forEach(drawMountains)

	// Draw the clouds (using forEach loop instead of for loop which is much cleaner)
	clouds.forEach(drawClouds)

	// Draw the trees (using forEach loop instead of for loop which is much cleaner)
	trees_x.forEach(drawTree)

	// Draw the collectible object
	collectables.forEach(drawCollectable)

	drawGameScore()

	drawFlagPole()

	checkFlagpole()

	drawLives()

	checkIfGameHasWon()

	drawGameStates()

	//the game character
	if(state.isLeft && state.isFalling) {
		// add your jumping-left code
		stickman.renderJumpToLeft(gameChar_x, gameChar_y, 'red')

	} else if(state.isRight && state.isFalling) {
		// add your jumping-right code
		stickman.renderJumpToRight(gameChar_x, gameChar_y, 'red')

	} else if(state.isLeft) {
		// add your walking left code
		stickman.renderWalkLeft(gameChar_x, gameChar_y, 'blue')

	} else if(state.isRight) {
		// add your walking right code
		stickman.renderWalkRight(gameChar_x, gameChar_y, 'blue')

	} else if(state.isFalling || state.isPlummeting) {
		// add your jumping facing forwards code
		stickman.renderJumpForward(gameChar_x, gameChar_y, 'red')

	} else {
		// add your standing front facing code
		stickman.render(gameChar_x, gameChar_y, 'blue')

	}
	pop()

	///////////INTERACTION CODE//////////
	if (state.isLeft) {
		// move the game character to the left
		gameChar_x -= walkDelta
	}

	if (state.isRight) {
		// move the game character to the right
		gameChar_x += walkDelta
	}

	if (state.isFalling && (state.isLeft || state.isRight)) {
		// move the game character up
		gameChar_y -= jumpDelta
	} else if (state.isFalling && gameChar_y < floorPos_y) {
		// move the game character down
		gameChar_y += jumpDelta
		if (gameChar_y === floorPos_y) {
			// character has landed
			state.isFalling = false
		}
	} else if (state.isFalling) {
		// character is falling
		gameChar_y -= jumpDelta
	}

	// if the collectable item has been found
	collectables.forEach(collectable => {
		if (gameChar_x >= collectable.x_pos - collectable.size / 2 && gameChar_x <= collectable.x_pos + collectable.size / 2) {
			if (!collectable.isFound) {
				collectable.isFound = true
				game_score += 1
			}
		}
	})

	// if the game character is over the canyon it falls to death
	canyons.forEach(canyon => {
		if (gameChar_x >= (canyon.x_pos) && gameChar_x <= (canyon.x_pos + canyon.width) && !state.isFalling) {
			state.isPlummeting = true
		}
	})

	// if the game character has fallen to death, reset the game
	if (state.isPlummeting) {
		state.isFalling = false
		gameChar_y += jumpDelta
		if (gameChar_y > height) {
			// reset the game
			checkLives()
			state.isPlummeting = false
			gameChar_y = floorPos_y
			gameChar_x = width/2
			cameraPosX = 0
		}
	}

	// No loop needed if we use keyIsDown
	if (keyIsDown(LEFT_ARROW)) {
		if (state.isFalling && gameChar_y < floorPos_y) {
			if (keyIsDown(UP_ARROW)) {
				cameraPosX -= walkDelta
			}
		} else {
			cameraPosX -= walkDelta
		}
	}
	if (keyIsDown(RIGHT_ARROW)) {
		if (state.isFalling && gameChar_y < floorPos_y) {
			if (keyIsDown(UP_ARROW)) {
				cameraPosX += walkDelta
			}
		} else {
			cameraPosX += walkDelta
		}
	}
}

function keyPressed() {

	if (keyCode === 65 || keyCode === 37) {
		state.isLeft = true;
	}

	if (keyCode === 68 || keyCode === 39) {
		state.isRight = true;
	}

	if ((keyCode === 38 || keyCode === 87) && !state.isFalling) {
		state.isFalling = true;
	}
}

function keyReleased() {
	resetStats()
}

// resets necessary states
function resetStats() {
	state.isLeft = false
	state.isRight = false
}
