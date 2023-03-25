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

import StickMan from "./lib/stickman.js";
import appState, {commit, dispatcher, initApplication} from "./lib/store/appState.js";
import {drawCanyon} from "./lib/canyon.js";
import {drawMountains} from "./lib/mountain.js";
import {drawClouds} from "./lib/clouds.js";
import {drawTree} from "./lib/tree.js";
import {drawCollectable} from "./lib/collectable.js";
import {checkIfGameHasWon, drawGameScore, drawGameStates} from "./lib/score.js";
import {checkFlagpole, drawFlagPole} from "./lib/flagpole.js";
import {checkLives, drawLives} from "./lib/lives.js";
import {
	characterIsFalling,
	characterIsJumping,
	moveLeft,
	movements,
	moveRight,
	resetMovement
} from "./lib/interactions.js";

// Game character
let stickman

// Movement constants
const jumpDelta = 100
const walkDelta = 10

let state = new Proxy(appState, {
	set: dispatcher
})

let sounds

function preload() {
	sounds = {
		jump: loadSound('assets/jump.wav'),
		hit: loadSound('assets/hit.wav'),
		collect: loadSound('assets/collect.wav'),
	}
}

function setup() {
	createCanvas(1024, 576);
	stickman = new StickMan(state.gameChar_x, state.gameChar_y, 'blue', 80, jumpDelta, walkDelta)

	//state = initApplication(appState)

	state = commit(state, initApplication(appState, jumpDelta))
}

function draw() {

	///////////DRAWING CODE//////////
	background(100,155,255); //fill the sky blue


	noStroke();
	fill(0,155,0);
	rect(0, state.floorPos_y, width, height - state.floorPos_y); //draw some green ground

	push()
	translate(-state.cameraPosX, 0)

	//draw the canyon
	state.canyons.forEach(drawCanyon)

	// Draw the mountains (using forEach loop instead of for loop which is much cleaner)
	state.mountains.forEach((item) => drawMountains({x: item.x, height: item.height, appState: state}))

	// Draw the clouds (using forEach loop instead of for loop which is much cleaner)
	state.clouds.forEach(item => drawClouds({x: item.x, y: item.y}))

	// Draw the trees (using forEach loop instead of for loop which is much cleaner)
	state.trees_x.forEach(item => drawTree(item))

	// Draw the collectible object
	state.collectables.forEach(drawCollectable)

	state.enemies.forEach(item => item.draw())

	drawGameScore(appState.game_score)

	drawFlagPole(appState.flagpole, appState.floorPos_y)

	checkFlagpole(appState)

	drawLives(appState)

	checkIfGameHasWon(appState)

	drawGameStates(appState)

	// Draw the platforms
	state.platforms.forEach(item => item.draw())

	state.enemies.forEach(enemy => {
		const isInContact = enemy.contact(appState.gameChar_x, appState.gameChar_y, sounds)
		if (isInContact) {
			commit(state, {lives: state.lives - 1})
		}
	})

	if (state) {
		movements(state, stickman, walkDelta)
	}
	pop()

	//console.log(state.isFalling)

	///////////INTERACTION CODE//////////
	if (state.isLeft) {
		// move the game character to the left
		// state.gameChar_x -= walkDelta
		moveLeft(state, walkDelta, state.platforms)
	}

	if (state.isRight) {
		// move the game character to the right
		// state.gameChar_x += walkDelta
		moveRight(state, walkDelta, state.platforms)
	}

	/*if (state.isFalling && (state.isLeft || state.isRight)) {
		// move the game character up
		commit(state, {gameChar_y: state.gameChar_y - jumpDelta})
	} else if (state.isFalling && state.gameChar_y < state.floorPos_y) {
		// move the game character down
		// state.gameChar_y += jumpDelta
		commit(state, {gameChar_y: state.gameChar_y + jumpDelta})
		if (state.gameChar_y === state.floorPos_y) {
			// character has landed
			commit(state, {isFalling: false})
		}
	}*/
	if (state.isFalling) {
		// character is falling
		//state.gameChar_y -= jumpDelta
		characterIsFalling(state, state.platforms)
	}
	if (state.isJumping) {
		characterIsJumping(state, jumpDelta, sounds)
	}

	// if the collectable item has been found
	state.collectables.forEach(collectable => {
		if (dist(state.gameChar_x, state.gameChar_y, collectable.x_pos, collectable.y_pos) < 50) {
			if (!collectable.isFound) {
				sounds.collect.play()
				collectable.isFound = true
				commit(state, {game_score: state.game_score + 1})
				//state.game_score += 1
			}
		}
	})
	// if the game character is over the canyon it falls to death
	state.canyons.forEach(canyon => {
		if (state.gameChar_x >= (canyon.x_pos) && state.gameChar_x <= (canyon.x_pos + canyon.width) && !state.isFalling) {
			// state.isPlummeting = true
			commit(state, {isPlummeting: true})
		}
	})

	// if the game character has fallen to death, reset the game
	if (state.isPlummeting) {
		state.isFalling = false
		state.gameChar_y += jumpDelta
		if (state.gameChar_y > height) {
			// reset the game
			checkLives(state)
			commit(state, {isLeft: false, isRight: false, isFalling: false, isPlummeting: false, gameChar_y: state.floorPos_y, gameChar_x: width/2, cameraPosX: 0})
		}
	}

	// No loop needed if we use keyIsDown
	/*if (keyIsDown(LEFT_ARROW)) {
		if (state.isFalling && state.gameChar_y < state.floorPos_y) {
			if (keyIsDown(UP_ARROW)) {
				state.cameraPosX -= walkDelta
			}
		} else {
			state.cameraPosX -= walkDelta
		}
	}
	if (keyIsDown(RIGHT_ARROW)) {
		if (state.isFalling && state.gameChar_y < state.floorPos_y) {
			if (keyIsDown(UP_ARROW)) {
				state.cameraPosX += walkDelta
			}
		} else {
			state.cameraPosX += walkDelta
		}
	}*/
}

function keyPressed() {

	if (keyCode === 65 || keyCode === 37) {
		state = commit(state, {isLeft: true})
	}

	if (keyCode === 68 || keyCode === 39) {
		state = commit(state, {isRight: true})
	}

	if ((keyCode === 38 || keyCode === 87)) {
		if (!state.isJumping && !state.isFalling) {
			sounds.jump.play()
			state = commit(state, {isJumping: true, jumpState: {initial: state.gameChar_y, final: state.gameChar_y - jumpDelta}})
		}
	}
}

function keyReleased() {
	resetMovement(state)
}

window.preload = preload
window.setup = setup
window.draw = draw
window.keyPressed = keyPressed
window.keyReleased = keyReleased
