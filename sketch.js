/*
The Game Project - stage final
Author: Risha Sringa Chanmgai - (https://github.com/michaelspeed)
Date: 25-03-2023
Git status: initialized after 3b, for more info check git history - https://github.com/michaelspeed/LU-game-project-l1
Additional files: p5.js (for better completions in webstorm, preferred IDE)

Zip files: [index.html, sketch.js, p5.js, p5.min.js, .git, .idea, lib, p5.sound.min.js]

Stickman is a superhuman, can jump large distance

////////////////////////////////////////////////////////////////
WARNING: JS modules are in use, please use a supported modern browser to run this project
for more info on browser compatibility check: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules
///////////////////////////////////////////////////////////////

*/

import StickMan from "./lib/stickman.js";
import appState, {commit, dispatcher, initApplication} from "./lib/store/appState.js";
import {drawCanyon} from "./lib/canyon.js";
import {drawMountains} from "./lib/mountain.js";
import {drawClouds} from "./lib/clouds.js";
import {drawTree} from "./lib/tree.js";
import {drawCollectable} from "./lib/collectable.js";
import {checkIfGameHasWon, drawGameStates, drawScoreBoard} from "./lib/score.js";
import {checkFlagpole, drawFlagPole} from "./lib/flagpole.js";
import {checkLives} from "./lib/lives.js";
import {
	characterIsFalling,
	characterIsJumping,
	characterIsPlummeting,
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

// Application state
let state = new Proxy(appState, {
	set: dispatcher
})

// Application sounds
let sounds

function preload() {
	sounds = {
		jump: loadSound('assets/jump.wav'),
		hit: loadSound('assets/hit.wav'),
		collect: loadSound('assets/collect.wav'),
		finished: loadSound('assets/finished.wav')
	}
}

function setup() {
	createCanvas(1024, 576);

	// Initialize the stickman
	stickman = new StickMan(state.gameChar_x, state.gameChar_y, 'blue', 80, jumpDelta, walkDelta)

	// Initialize the application state
	state = commit(state, initApplication(appState, jumpDelta))
}

function draw() {
	// Draw the background
	background(100,155,255);

	noStroke();
	fill(0,155,0);
	rect(0, state.floorPos_y, width, height - state.floorPos_y); //draw some green ground

	push()
	// Translate the canvas to the camera position
	translate(-state.cameraPosX, 0)

	//draw all canyon
	state.canyons.forEach(drawCanyon)

	// Draw all mountains (using forEach loop instead of for loop which is much cleaner)
	state.mountains.forEach((item) => drawMountains({x: item.x, height: item.height, appState: state}))

	// Draw all clouds (using forEach loop instead of for loop which is much cleaner)
	state.clouds.forEach(item => drawClouds({x: item.x, y: item.y}))

	// Draw all trees (using forEach loop instead of for loop which is much cleaner)
	state.trees_x.forEach(item => drawTree(item))

	// Draw all collectible object
	state.collectables.forEach(drawCollectable)

	// Draw all enemies
	state.enemies.forEach(item => item.draw())

	// Draw the platforms
	state.platforms.forEach(item => item.draw())

	drawFlagPole(appState.flagpole, appState.floorPos_y)

	checkFlagpole(appState)

	checkIfGameHasWon(appState, sounds)

	drawGameStates(appState)

	drawScoreBoard(appState)

	// Check enemies contact
	state.enemies.forEach(enemy => {
		const isInContact = enemy.contact(appState.gameChar_x, appState.gameChar_y, sounds)
		if (isInContact) {
			commit(state, {lives: state.lives - 1})
		}
	})

	// Movements
	if (state) {
		movements(state, stickman, walkDelta)
	}

	// Lives
	checkLives(state)

	pop()

	///////////INTERACTION CODE//////////

	if (state.isLeft) {
		// move the game character to the left
		moveLeft(state, walkDelta, state.platforms)
	}

	if (state.isRight) {
		// move the game character to the right
		moveRight(state, walkDelta, state.platforms)
	}
	if (state.isFalling) {
		// character is falling
		characterIsFalling(state, state.platforms)
	}
	if (state.isJumping) {
		// character is jumping
		characterIsJumping(state, jumpDelta, sounds)
	}

	if (!state.gameOver) {
		// check if the collectable item has been found
		state.collectables.forEach(collectable => {
			if (dist(state.gameChar_x, state.gameChar_y, collectable.x_pos, collectable.y_pos) < 50) {
				if (!collectable.isFound) {
					sounds.collect.play()
					collectable.isFound = true
					commit(state, {game_score: state.game_score + 1})
				}
			}
		})
	}

	// if the game character is over the canyon it falls to death
	if (!state.isPlummeting) {
		state.canyons.forEach(canyon => {
			if (state.gameChar_x >= (canyon.x_pos) && state.gameChar_x <= (canyon.x_pos + canyon.width) && !state.isFalling) {
				if (!state.isPlummeting) {
					// if the game character is over the canyon it falls to death
					commit(appState, {lives: appState.lives - 1})
				}
				commit(state, {isPlummeting: true})
			}
		})
	}

	// if the game character has fallen to death, reset the game
	if (state.isPlummeting) {
		characterIsPlummeting(state)
	}
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
