// map.js

const MAP_TILE_WIDTH = 32;
const MAP_TILE_HEIGHT = 24;

class Map {

	// -----------------------------------------------------
	constructor(context) {
		this.context = context;
		this.level = DATA.map;
	}

	// -----------------------------------------------------
	update() {}

	// -----------------------------------------------------
	render(layer) {

		if (layer == 0) {
			// tło
			this.context.drawImage(this.level.image, 0, 0);

		} else if (layer == 1) {
			// woda
			this.context.globalAlpha = 0.4;
			this.context.fillStyle = '#2E5CB8';
			this.context.beginPath();
			this.context.rect(0, this.level.watery, GAME_SCREEN_WIDTH, GAME_SCREEN_HEIGHT - GAME_SCREEN_MENU - this.level.watery);
			this.context.fill();
			this.context.globalAlpha = 1;

		}

	}

	// -----------------------------------------------------
	debug() {
		this.context.lineWidth = 1;
		this.context.strokeStyle = '#888888';
		this.context.fillStyle = '#996633';

		for (let y = 0; y < this.level.tiles.length; y++) {
			for (let x = 0; x < this.level.tiles[y].length; x++) {
				this.context.beginPath();
				this.context.rect(x * MAP_TILE_WIDTH, y * MAP_TILE_HEIGHT, MAP_TILE_WIDTH - 1, MAP_TILE_HEIGHT - 1);
				if (this.level.tiles[y][x] == 1) {
					this.context.fill();
				}
				this.context.stroke();
			}
		}
	}

	// -----------------------------------------------------
	getPlayerStart() {
		return new Vector(this.level.playerx, this.level.playery);
	}

	// -----------------------------------------------------
	getWaterY() {
		return this.level.watery;
	}

}

// EoF
