// game.js

const GAME_SCREEN_WIDTH = 640;
const GAME_SCREEN_HEIGHT = 400;
const GAME_SCREEN_MENU = 16;

const GAME_FORCE_GRAVITY = 0.1;
const GAME_FORCE_WATER = -0.2;

class Game {

	// -----------------------------------------------------
	constructor(context) {
		this.context = context;
		this.key = new Key();
		this.map = new Map(context);
		this.player = new Player(context, this.map.getPlayerStart());
	}

	// -----------------------------------------------------
	async setup() {
		DATA.map.image = await preloadImage(DATA.map.file);
		DATA.player.image = await preloadImage(DATA.player.file);
		DATA.stats.image = await preloadImage(DATA.stats.file);
	}

	// -----------------------------------------------------
	update() {
		this.player.update(this.key, this.map);
	}

	// -----------------------------------------------------
	render() {
		this.map.render(0);
		this.player.render();
		this.map.render(1);
		this.renderStats();

		if (this.key.isPressed(KEY_SHIFT)) {
			this.map.debug();
			this.player.debug();
		}
	}

	// -----------------------------------------------------
	renderStats() {
		this.context.drawImage(DATA.stats.image, 0, GAME_SCREEN_HEIGHT - GAME_SCREEN_MENU);
	}

}

// EoF
