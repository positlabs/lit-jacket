import * as path from 'path';
import * as fs from 'fs';
import * as _ from 'lodash';
import * as getPixels from 'get-pixels';

// animation

let pixels, w, h;
let currentRow = 0;
let floatX = 0;
let floatY = 1;

// animation player

let elapsedTime = 0;
let lastTickTime = 0;
let tick = 0;
let tickTimeout = null;
let ticksPerSecond = 15;
let millisPerTick = 1000 / ticksPerSecond;
let isPlaying = false;


function setup(){
	// setup gpio

	// listen to 6050
}

function play(){
	if (isPlaying) return;
	isPlaying = true;
	lastTickTime = Date.now();
	tick();
}

function stop(){ 
	isPlaying = false;
}

function reset(){
	stop();
	currentRow = 0;
	elapsedTime = 0;
	floatX = Math.abs(floatX);
	floatY = Math.abs(floatY);
}

function tick(){
	if (!isPlaying) return;
	now = Date.now();
	elapsedTime += now - lastTickTime;
	lastTickTime = now;
	tick = Math.round(elapsedTime / millisPerTick);
	let millisToNextTick = (tick + 1) * millisPerTick - elapsedTime
	update();
	draw();
	tickTimeout = setTimeout(tick, millisToNextTick);
};

function update(){};

function draw(){};

function setImage(pixels, w, h){};

function getImage(path){};