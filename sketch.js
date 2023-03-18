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
	collectables = [{x_pos: 600, y_pos: gameChar_y - 20, size: 30, isFound: false}, {x_pos: 300, y_pos: gameChar_y - 150, size: 30, isFound: false}, {x_pos: 200, y_pos: gameChar_y - 250, size: 30, isFound: false}]
	canyons = [{x_pos: 200, width: 100}, {x_pos: 600, width: 50}]
	trees_x = [300, 350, 400, 450, 520,]
	clouds = [{x:100, y:130}, {x: 350, y: 100}, {x: 600, y: 50}]
	mountains = [{x:20, height:200}, {x: 800, height: 150}]
}

function draw() {

	///////////DRAWING CODE//////////
	background(100,155,255); //fill the sky blue


	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height - floorPos_y); //draw some green ground

	push()
	translate(-cameraPosX, 0)
	// Draw the collectible object
	collectables.forEach(drawCollectable)

	//draw the canyon
	canyons.forEach(drawCanyon)

	// Draw the trees (using forEach loop instead of for loop which is much cleaner)
	trees_x.forEach(drawTree)

	// Draw the mountains (using forEach loop instead of for loop which is much cleaner)
	mountains.forEach(drawMountains)

	// Draw the clouds (using forEach loop instead of for loop which is much cleaner)
	clouds.forEach(drawClouds)

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

// Game Character class
class StickMan {
	constructor(x, y, color, height) {
		this.x = x;
		this.color = color;
		this.y = y;
		this.height = height
	}

	// Renders while standing
	render(x, y, color) {
		this.color = color ? color : this.color;

		// compute the dimensions of the body parts
		const headDiameter = this.height * 0.2;
		const headRadius = headDiameter / 2;
		const bodyHeight = (this.height - headDiameter) * 0.4;
		const legHeight = this.height - headDiameter - bodyHeight;

		const legWidth = headDiameter * 0.5;
		const armWidth = headDiameter * 0.75;
		const armHeight = headDiameter * 1.8;
		const neckLength = headDiameter * 0.3;

		const headX = x ?? this.x;
		const headY = (y ?? this.y) - this.height + headRadius;

		// draw the stickman
		push();
		fill(this.color);
		strokeWeight(3);

		// head
		circle(headX, headY, headDiameter);
		stroke(0);

		// body
		line(headX, headY + headRadius, headX, headY + headRadius + bodyHeight);

		// arms
		const shoulderY = headY + headRadius + neckLength;
		line(headX, shoulderY, headX - armWidth, shoulderY + armHeight);
		line(headX, shoulderY, headX + armWidth, shoulderY + armHeight);

		// legs
		const legY = headY + headRadius + bodyHeight;
		line(headX, legY, headX - legWidth, legY + legHeight);
		line(headX, legY, headX + legWidth, legY + legHeight);
		pop();
	}

	// Renders while jumping
	renderJumpForward(x, y, color) {
		this.color = color ? color : this.color;

		// compute the dimensions of the body parts
		const headDiameter = this.height * 0.2;
		const headRadius = headDiameter / 2;
		const bodyHeight = (this.height - headDiameter) * 0.4;
		const legHeight = this.height - headDiameter - bodyHeight;

		const legWidth = headDiameter * 0.5;
		const armWidth = headDiameter * 0.75;
		const armHeight = headDiameter * 1.8;
		const neckLength = headDiameter * 0.3;

		const headX = x ?? this.x;
		const headY = (y ?? this.y) - this.height + headRadius;

		// draw the stickman
		push();
		fill(this.color);
		strokeWeight(3);

		// head
		circle(headX, headY, headDiameter);
		stroke(0);

		// body
		line(headX, headY + headRadius, headX, headY + headRadius + bodyHeight);

		// arms
		const shoulderY = headY + headRadius + neckLength;
		line(headX, shoulderY, headX - armWidth - jumpDelta, shoulderY + armHeight - jumpDelta);
		line(headX, shoulderY, headX + armWidth + jumpDelta, shoulderY + armHeight - jumpDelta);

		// legs
		const legY = headY + headRadius + bodyHeight;
		line(headX, legY, headX - legWidth - jumpDelta, legY + legHeight - jumpDelta);
		line(headX, legY, headX + legWidth + jumpDelta, legY + legHeight - jumpDelta);
		pop();
	}

	// Renders while walking left
	renderWalkLeft(x, y, color) {
		this.color = color ? color : this.color;

		// compute the dimensions of the body parts
		const headDiameter = this.height * 0.2;
		const headRadius = headDiameter / 2;
		const bodyHeight = (this.height - headDiameter) * 0.4;
		const legHeight = this.height - headDiameter - bodyHeight;

		const legWidth = headDiameter * 0.5;
		const armWidth = headDiameter * 0.75;
		const armHeight = headDiameter * 1.8;
		const neckLength = headDiameter * 0.3;

		const headX = x ?? this.x;
		const headY = this.y - this.height + headRadius;

		// draw the stickman
		push();
		fill(this.color);
		strokeWeight(3);

		// head
		circle(headX, headY, headDiameter);
		stroke(0);

		// body
		line(headX, headY + headRadius, headX, headY + headRadius + bodyHeight);

		// arms
		const shoulderY = headY + headRadius + neckLength;
		line(headX, shoulderY, headX - armWidth - walkDelta, shoulderY + armHeight - walkDelta);
		line(headX, shoulderY, headX + armWidth, shoulderY + armHeight);

		// legs
		const legY = headY + headRadius + bodyHeight;
		line(headX, legY, headX - legWidth - walkDelta, legY + legHeight);
		line(headX, legY, headX + legWidth, legY + legHeight);
		pop();
	}

	// Renders while walking right
	renderWalkRight(x, y, color) {
		this.color = color ? color : this.color;
		// compute the dimensions of the body parts
		const headDiameter = this.height * 0.2;
		const headRadius = headDiameter / 2;
		const bodyHeight = (this.height - headDiameter) * 0.4;
		const legHeight = this.height - headDiameter - bodyHeight;

		const legWidth = headDiameter * 0.5;
		const armWidth = headDiameter * 0.75;
		const armHeight = headDiameter * 1.8;
		const neckLength = headDiameter * 0.3;

		const headX = x ?? this.x;
		const headY = (y ?? this.y) - this.height + headRadius;

		// draw the stickman
		push();
		fill(this.color);
		strokeWeight(3);

		// head
		circle(headX, headY, headDiameter);
		stroke(0);

		// body
		line(headX, headY + headRadius, headX, headY + headRadius + bodyHeight);

		// arms
		const shoulderY = headY + headRadius + neckLength;
		line(headX, shoulderY, headX - armWidth, shoulderY + armHeight);
		line(headX, shoulderY, headX + armWidth + walkDelta, shoulderY + armHeight);

		// legs
		const legY = headY + headRadius + bodyHeight;
		line(headX, legY, headX - legWidth, legY + legHeight);
		line(headX, legY, headX + legWidth + walkDelta, legY + legHeight);
		pop();
	}

	// Renders while jumping right
	renderJumpToRight(x, y, color) {
		this.color = color ? color : this.color;
		// compute the dimensions of the body parts
		const headDiameter = this.height * 0.2;
		const headRadius = headDiameter / 2;
		const bodyHeight = (this.height - headDiameter) * 0.4;
		const legHeight = this.height - headDiameter - bodyHeight;

		const legWidth = headDiameter * 0.5;
		const armWidth = headDiameter * 0.75;
		const armHeight = headDiameter * 1.8;
		const neckLength = headDiameter * 0.3;

		const headX = (x ?? this.x);
		const headY = (y ?? this.y) - this.height + headRadius;

		// draw the stickman
		push();
		fill(this.color);
		strokeWeight(3);

		// head
		circle(headX, headY, headDiameter);
		stroke(0);

		// body
		line(headX, headY + headRadius, headX, headY + headRadius + bodyHeight);

		// arms
		const shoulderY = headY + headRadius + neckLength;
		line(headX, shoulderY, headX - armWidth - jumpDelta, shoulderY + armHeight - jumpDelta);
		line(headX, shoulderY, headX + armWidth, shoulderY + armHeight);

		// legs
		const legY = headY + headRadius + bodyHeight;
		line(headX, legY, headX - legWidth - jumpDelta + walkDelta, legY + legHeight - jumpDelta - walkDelta);
		line(headX, legY, headX + legWidth + jumpDelta - walkDelta, legY + legHeight - jumpDelta + walkDelta);
		pop();
	}

	// Renders while jumping left
	renderJumpToLeft(x, y, color) {
		this.color = color ? color : this.color;
		// compute the dimensions of the body parts
		const headDiameter = this.height * 0.2;
		const headRadius = headDiameter / 2;
		const bodyHeight = (this.height - headDiameter) * 0.4;
		const legHeight = this.height - headDiameter - bodyHeight;

		const legWidth = headDiameter * 0.5;
		const armWidth = headDiameter * 0.75;
		const armHeight = headDiameter * 1.8;
		const neckLength = headDiameter * 0.3;

		const headX = (x ?? this.x);
		const headY = (y ?? this.y) - this.height + headRadius;

		// draw the stickman
		push();
		fill(this.color);
		strokeWeight(3);

		// head
		circle(headX, headY, headDiameter);
		stroke(0);

		// body
		line(headX, headY + headRadius, headX, headY + headRadius + bodyHeight);

		// arms
		const shoulderY = headY + headRadius + neckLength;
		line(headX, shoulderY, headX - armWidth, shoulderY + armHeight);
		line(headX, shoulderY, headX + armWidth + jumpDelta, shoulderY + armHeight - jumpDelta);

		// legs
		const legY = headY + headRadius + bodyHeight;
		line(headX, legY, headX - legWidth - walkDelta , legY + legHeight - walkDelta);
		line(headX, legY, headX + legWidth + jumpDelta - walkDelta, legY + legHeight - jumpDelta - walkDelta);
		pop();
	}
}

// Collectible item
// t_collectable = {x_pos, y_pos, size, isFound}
function drawCollectable({x_pos, y_pos, size, isFound}){
	if (!isFound) {
		fill(255,215, 0);
		ellipse(x_pos, y_pos, size, size);
		fill(100, 155, 255);
		ellipse(x_pos, y_pos, size - 10, size - 10);
	}
}

// Canyon
// canyon = {x_pos, width}
function drawCanyon({x_pos, width}) {
	let deltaDiff = 220
	let alphaDiff = 10
	fill(0, 255, 0);
	quad(x_pos, 432, x_pos + width, 432, x_pos + width + deltaDiff, 1024,  x_pos - deltaDiff, 1024);
	fill(100, 120, 255);
	quad(x_pos + 10, 432, x_pos + width - 10, 432, x_pos + width + deltaDiff, 1024, x_pos - deltaDiff, 1024);
	fill(100, 155, 255);
	quad(x_pos, 432, x_pos + width, 432, x_pos + width - alphaDiff, 440, x_pos + alphaDiff, 440);
}

// A single tree
function drawTree(x) {
	fill(175, 75, 0);
	rect(x + 30, 338, 20, 100, 20);
	fill(0, 155, 0);
	ellipse(x + 20,338,60,40);
	ellipse(x + 60,338,60,40);
	ellipse(x + 20,370,60,40);
	ellipse(x + 60,370,60,40);
	ellipse(x,350,60,40);
	ellipse(x + 80,350,60,40);
	ellipse(x + 40,320,40,20);
}

// A single cloud
function drawClouds({x, y}) {
	fill(255);
	ellipse(x,y,150,50);
	ellipse(x - 50,y + 25,50,30);
	ellipse(x + 50,y + 15,50,30);
}

// A single mountain
function drawMountains({x, height}) {
	const y = floorPos_y - height
	fill(220);
	triangle(x, y, x + 150, floorPos_y, x - 150, floorPos_y);
	fill(128);
	triangle(x, y, x + 90, floorPos_y, x - 150, floorPos_y);
	fill(200);
	triangle(x + 50, y + 50, x + 150, floorPos_y, x + 80, floorPos_y);
	fill(128);
	triangle(x + 50, y + 50, x, floorPos_y, x + 80, floorPos_y);
}

function drawGameScore() {
	fill(255)
	noStroke()
	textSize(20)
	text(`Score: ${game_score}`, 20, 30)
}

function drawFlagPole(){
	push()
	strokeWeight(5);
	stroke(150);
	line(flagpole.x_pos, floorPos_y, flagpole.x_pos, floorPos_y - 250);
	noStroke();
	fill(255, 0, 0);
	rect(flagpole.x_pos, floorPos_y - (flagpole.isReached ? 250 : 50), 50, 50);
	pop()
}

function checkFlagpole(){
	if (flagpole.isReached) return
	const d = abs(gameChar_x - flagpole.x_pos)
	if (d < 15) {
		flagpole.isReached = true;
	}
}

function drawLives(){
	fill(255, 0, 0)
	noStroke()
	textSize(20)
	text(`Lives: ${lives}`, 20, 60)
}

function drawGameStates() {
	if (lives <= 0) {
		textSize(50)
		text(`Game Over`, 500, 100)
	}

	if (gameState.finished) {
		fill(124,255,0)
		textSize(50)
		text(`You Won!`, 500, 100)
	}
}

function checkLives(){
	if (state.isPlummeting) {
		lives -= 1
	}
	if (lives <= 0) {
		gameState.isGameOver = true
	}
}

function checkIfGameHasWon() {
	if (flagpole.isReached && game_score === 3) {
		gameState.finished = true
	}
}
