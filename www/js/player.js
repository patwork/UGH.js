// player.js

const PLAYER_WIDTH = 64;
const PLAYER_HEIGHT = 64;
const PLAYER_HALF_WIDTH = PLAYER_WIDTH / 2;
const PLAYER_HALF_HEIGHT = PLAYER_HEIGHT / 2;

const PLAYER_FORCE_VERTICAL = 0.3;
const PLAYER_FORCE_HORIZONTAL = 0.15;

const PLAYER_FRICTION_VERTICAL = 0.98;
const PLAYER_FRICTION_HORIZONTAL = 0.98;

class Player {

	// -----------------------------------------------------
	constructor(context, position) {
		this.context = context;
		this.position = position;
		this.velocity = new Vector();
		this.acceleration = new Vector();
		this.temp = new Vector();
		this.data = DATA.player;
	}

	// -----------------------------------------------------
	update(key, map) {

		// akceleracja
		this.acceleration.zero();
		this.updateKeyboard(key);
		this.acceleration.addXY(0, GAME_FORCE_GRAVITY);

		if (this.position.y > map.getWaterY()) {
			this.acceleration.addXY(0, GAME_FORCE_WATER);
		}

		// prędkość
		this.velocity.add(this.acceleration);
		this.velocity.mulXY(PLAYER_FRICTION_HORIZONTAL, PLAYER_FRICTION_VERTICAL);

		// pozycja
		this.temp.set(this.position);
		this.position.add(this.velocity);
		this.outOfScreen();

		// TODO sprawdzic kolizje etc

	}

	// -----------------------------------------------------
	updateKeyboard(key) {

		if (key.isPressed(KEY_LEFT)) {
			this.velocity.subXY(PLAYER_FORCE_HORIZONTAL, 0);
		}

		if (key.isPressed(KEY_RIGHT)) {
			this.velocity.addXY(PLAYER_FORCE_HORIZONTAL, 0);
		}

		if (key.isPressed(KEY_UP)) {
			this.velocity.subXY(0, PLAYER_FORCE_VERTICAL);
		}

		if (key.isPressed(KEY_DOWN)) {
			this.velocity.addXY(0, PLAYER_FORCE_VERTICAL);
		}

	}

	// -----------------------------------------------------
	outOfScreen() {

		if (this.position.x < 0) {
			this.velocity.setX(0);
			this.position.setX(0);
		}

		if (this.position.x > GAME_SCREEN_WIDTH) {
			this.velocity.setX(0);
			this.position.setX(GAME_SCREEN_WIDTH);
		}

		if (this.position.y < 0) {
			this.velocity.setY(0);
			this.position.setY(0);
		}

		if (this.position.y > GAME_SCREEN_HEIGHT + PLAYER_HEIGHT) {
			this.velocity.setY(0);
			this.position.setY(GAME_SCREEN_HEIGHT + PLAYER_HEIGHT);
		}

	}

	// -----------------------------------------------------
	render() {
		this.context.drawImage(this.data.image, this.position.x - PLAYER_HALF_WIDTH, this.position.y - PLAYER_HALF_HEIGHT);
	}

	// -----------------------------------------------------
	debug() {
		this.context.lineWidth = 1;
		this.context.strokeStyle = '#EEEEEE';

		this.context.beginPath();
		this.context.rect(this.position.x - PLAYER_HALF_WIDTH, this.position.y - PLAYER_HALF_HEIGHT, PLAYER_WIDTH, PLAYER_HEIGHT);
		this.context.stroke();
	}

}

// EoF
