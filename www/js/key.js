// key.js

const KEY_LEFT = 37;
const KEY_UP = 38;
const KEY_RIGHT = 39;
const KEY_DOWN = 40;
const KEY_SHIFT = 16;

class Key {

	// -----------------------------------------------------
	constructor() {
		this.pressed = {};
		window.addEventListener('keydown', this.onKeyDown.bind(this));
		window.addEventListener('keyup', this.onKeyUp.bind(this));
	}

	// -----------------------------------------------------
	onKeyDown(event) {
		this.pressed[event.keyCode] = true;
	}

	// -----------------------------------------------------
	onKeyUp(event) {
		delete this.pressed[event.keyCode];
	}

	// -----------------------------------------------------
	isPressed(key) {
		return (this.pressed[key]);
	}

}

// EoF
