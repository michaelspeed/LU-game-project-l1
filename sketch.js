/*

The Game Project
author: Risha Sringa Chanmgai
date: 07-01-2023
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
var collectable;

// Canyon
var canyon;

// Trees
var trees_x = []

// Clouds
var clouds = []

// Mountains
var mountains = []

// Camera positioning
var cameraPosX = 0


function setup()
{
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
	gameChar_x = width/2;
	gameChar_y = floorPos_y;

	stickman = new StickMan(gameChar_x, gameChar_y, 'blue', 80)
	collectable = {x_pos: 600, y_pos: gameChar_y - 20, size: 30, isFound: false}
	canyon = {x_pos: 200, width: 100}
	trees_x = [300, 350, 400, 450, 520,]
	clouds = [{x:100, y:50}, {x: 350, y: 100}, {x: 600, y: 50}]
	mountains = [{x:20, height:200}, {x: 800, height: 150}]
}

function draw()
{

	///////////DRAWING CODE//////////

	background(100,155,255); //fill the sky blue


	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height - floorPos_y); //draw some green ground

	push()
	translate(-cameraPosX, 0)
	// Draw the collectible object
	drawRing(collectable)

	//draw the canyon
	drawCanyon(canyon)

	// Draw the trees
	trees_x.forEach(drawTree)

	// Draw the mountains
	mountains.forEach(drawMountains)

	// Draw the clouds
	clouds.forEach(drawClouds)


	//the game character
	if(state.isLeft && state.isFalling)
	{
		// add your jumping-left code
		stickman.jumpToLeft(gameChar_x, gameChar_y, 'red')

	}
	else if(state.isRight && state.isFalling)
	{
		// add your jumping-right code
		stickman.jumpToRight(gameChar_x, gameChar_y, 'red')

	}
	else if(state.isLeft)
	{
		// add your walking left code
		stickman.renderWalkLeft(gameChar_x, gameChar_y, 'blue')

	}
	else if(state.isRight)
	{
		// add your walking right code
		stickman.renderWalkRight(gameChar_x, gameChar_y, 'blue')

	}
	else if(state.isFalling || state.isPlummeting)
	{
		// add your jumping facing forwards code
		stickman.renderJumpForward(gameChar_x, gameChar_y, 'red')

	}
	else
	{
		// add your standing front facing code
		stickman.render(gameChar_x, gameChar_y, 'blue')

	}

	///////////INTERACTION CODE//////////
	//Put conditional statements to move the game character below here
	if (state.isLeft) {
		gameChar_x -= walkDelta
	}
	if (state.isRight) {
		gameChar_x += walkDelta
	}
	if (state.isFalling && (state.isLeft || state.isRight)) {
		gameChar_y -= jumpDelta
	} else if (state.isFalling && gameChar_y < floorPos_y) {
		gameChar_y += jumpDelta
		if (gameChar_y === floorPos_y) {
			state.isFalling = false
		}
	}

	if (gameChar_x >= collectable.x_pos - collectable.size / 2 && gameChar_x <= collectable.x_pos + collectable.size / 2) {
		collectable.isFound = true
	}

	if (gameChar_x >= (canyon.x_pos) && gameChar_x <= (canyon.x_pos + canyon.width) && !state.isFalling) {
		state.isPlummeting = true
	}

	if (state.isPlummeting) {
		state.isFalling = false
		gameChar_y += jumpDelta
		if (gameChar_y > height) {
			state.isPlummeting = false
			gameChar_y = floorPos_y
			gameChar_x = width/2
			cameraPosX = 0
		}
	}
	pop()

	// No loop needed if we use keyIsDown
	if (keyIsDown(LEFT_ARROW)) {
		cameraPosX -= walkDelta
	}
	if (keyIsDown(RIGHT_ARROW)) {
		cameraPosX += walkDelta
	}
}


function keyPressed()
{
	// if statements to control the animation of the character when
	// keys are pressed.

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

function keyReleased()
{
	// if statements to control the animation of the character when
	// keys are released.
	resetStats()
}

function resetStats() {
	state.isLeft = false
	state.isRight = false
}

class StickMan {
	constructor(x, y, color, height) {
		this.x = x;
		this.color = color;
		this.y = y;
		this.height = height
	}

	update(x, y, color) {
		this.x = x;
		this.y = y;
		this.color = color ? color : this.color;
	}

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
		stroke(126);

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
		stroke(126);

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
		stroke(126);

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
		stroke(126);

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

	jumpToRight(x, y, color) {
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
		stroke(126);

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

	jumpToLeft(x, y, color) {
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
		stroke(126);

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

function drawRing({x_pos, y_pos, size}){
	if (!collectable.isFound) {
		fill(255,215, 0);
		ellipse(x_pos, y_pos, size, size);
		fill(100, 155, 255);
		ellipse(x_pos, y_pos, size - 10, size - 10);
	}
}

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

function drawClouds({x, y}) {
	fill(255);
	ellipse(x,y,150,50);
	ellipse(x - 50,y + 25,50,30);
	ellipse(x + 50,y + 15,50,30);
}

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
