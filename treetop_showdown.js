/*
* @Author: dzale
* @Date:   2016-04-04 22:14:08
* @Last Modified by:   dzale
* @Last Modified time: 2016-04-10 11:20:38
*/

'use strict';

/**
 * Define an object to hold all our images for the game so images
 * are only ever created once. This type of object is known as a 
 * singleton.
 */
var imageRepository = new function() {
	// Define images.
	this.background = new Image();
	this.base = new Image();
	this.guy = new Image();

	// Ensure all images are loaded before starting the game.
	var numImages = 3;
	var numLoaded = 0;
	function imageLoaded() {
		numLoaded++;
		if (numLoaded === numImages)
			window.init();
	}
	this.background.onload = function() {
		imageLoaded();
	}
	this.base.onload = function() {
		imageLoaded();
	}
	this.guy.onload = function() {
		imageLoaded();
	}

	// Set images source.
	this.background.src = "imgs/bg.png"
	this.base.src = "imgs/base.png"
	this.guy.src = "imgs/jdoug.png"
}

/**
 * Creates the Drawable object which will be the base class for
 * all drawable objects in the game. Sets up default variables
 * that all child objects will inherit, as well as the default
 * functions.
 */
function Drawable() {
	this.init = function(x, y, width, height) {
		// Default variables
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}
	this.speed = 0;	// # of pixels object can move each frame
	this.canvasWidth = 0;
	this.canvasHeight = 0;
	//this.context

	// Define abstract function to be implemented in child objects
	this.draw = function() {
	};
}

function Unit() {
	this.init = function(x, y, hp, width, height) {
		this.
	}
	this.health = 100;

}
Unit.prototype = new Drawable();

/**
 * Creates the Background object which will become a child of
 * the Drawable object. This background is drawn on the "background"
 * canvas and creates the illusion of moving by panning the image.
 */

function Background() {
	this.speed = 0; // Redefine the speed of background for panning.
	this.draw = function() {
		this.context.drawImage(imageRepository.background, this.x, this.y);
	};
}
// Set Background to inherit properties from drawable
Background.prototype = new Drawable();

/**
 * Creates the Game object which will hold all objects and data for
 * the game.
 */
function Game() {
	/**
	 * Gets canvas information and context and sets up all game
	 * objects.
	 * Returns true if the canvas is supported and false if it
	 * is not. This is to stop the animation script from constantly
	 * running on old browsers.
	 */
	this.init = function() {
		// Get the Canvas element
		this.bgCanvas = document.getElementById('background');
		// Test to see if canvas is supported
		if (this.bgCanvas.getContext) {
			this.bgContext = this.bgCanvas.getContext('2d');
			// Initialize objects to contain their context and canvas
			// information
			Background.prototype.context = this.bgContext;
			Background.prototype.canvasWidth = this.bgCanvas.width;
			Background.prototype.canvasHeight = this.bgCanvas.height;
			// Initialize the background object
			this.background = new Background();
			this.background.init(0,0); // Set draw point to 0,0
			return true;
		} else {
			return false;
		}
	};

	// Start the animation loop
	this.start = function() {
		animate();
	};
}

/**
 * The animation loop. Calls the requestAnimationFrame shim to
 * optimize the game loop and draws all game objects. This
 * function must be a global function and cannot be within an
 * object.
 */
function animate() {
	requestAnimFrame( animate );
	game.background.draw();
}

/**
 * requestAnim shim layer by Paul Irish
 * Finds the first API that works to optimize the animation loop,
 * otherwise defaults to setTimeout().
 */
window.requestAnimFrame = (function() {
	return window.requestAnimationFrame		||
		window.webkitRequestAnimationFrame	||
		window.mozRequestAnimationFrame		||
		window.oRequestAnimationFrame		||
		window.msRequestAnimationFrame		||
		function(/* function */ callback, /* DOMElement */ element){
			window.setTimeout(callback, 1000 / 60);
		};
})();

/**
 * Initialize the Game and starts it.
 */
var game = new Game();

function init() {
	if(game.init())
		game.start();
}




















