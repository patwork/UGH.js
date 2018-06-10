// player.js

const PLAYER_WIDTH = 64;
const PLAYER_HEIGHT = 64;
const PLAYER_HALF_WIDTH = PLAYER_WIDTH / 2;
const PLAYER_HALF_HEIGHT = PLAYER_HEIGHT / 2;

const PLAYER_FORCE_VERTICAL = 0.2;
const PLAYER_FORCE_HORIZONTAL = 0.15;

const PLAYER_FRICTION_VERTICAL = 0.98;
const PLAYER_FRICTION_HORIZONTAL = 0.98;

const PLAYER_ANIM_FRAMES = 4;
const PLAYER_ANIM_SPEED = 5;

class Player {

	// -----------------------------------------------------
	constructor(context, position) {
		this.context = context;
		this.position = position;
		this.velocity = new Vector();
		this.acceleration = new Vector();
		this.temp = new Vector();
		this.data = DATA.player;
		this.animFrame = 0;
		this.animSpeed = PLAYER_ANIM_SPEED;
	}

	// -----------------------------------------------------
	update(key, map) {

		// akceleracja
		this.acceleration.zero();
		this.updateKeyboard(key);

		if (this.acceleration.x != 0 || this.acceleration.y < 0) {
			this.updateAnimation();
		}

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
			this.acceleration.subXY(PLAYER_FORCE_HORIZONTAL, 0);
		}

		if (key.isPressed(KEY_RIGHT)) {
			this.acceleration.addXY(PLAYER_FORCE_HORIZONTAL, 0);
		}

		if (key.isPressed(KEY_UP)) {
			this.acceleration.subXY(0, PLAYER_FORCE_VERTICAL);
		}

		if (key.isPressed(KEY_DOWN)) {
			this.acceleration.addXY(0, PLAYER_FORCE_VERTICAL);
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
	updateAnimation() {
		this.animSpeed -= 1;
		if (this.animSpeed < 0) {
			this.animSpeed = PLAYER_ANIM_SPEED;
			this.animFrame = (this.animFrame + 1) % PLAYER_ANIM_FRAMES;
		}
	}

	// -----------------------------------------------------
	render() {
		this.context.drawImage(this.data.image,
			this.animFrame * PLAYER_WIDTH, 0,
			PLAYER_WIDTH, PLAYER_HEIGHT,
			this.position.x - PLAYER_HALF_WIDTH, this.position.y - PLAYER_HALF_HEIGHT,
			PLAYER_WIDTH, PLAYER_HEIGHT
		);
	}

	// -----------------------------------------------------
	debug() {
		this.context.lineWidth = 1;
		this.context.strokeStyle = '#EEEEEE';

		this.context.beginPath();
		this.context.rect(this.position.x - PLAYER_HALF_WIDTH, this.position.y - PLAYER_HALF_HEIGHT,
			PLAYER_WIDTH, PLAYER_HEIGHT);
		this.context.stroke();
	}

}

// EoF
