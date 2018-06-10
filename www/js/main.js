// main.js

document.addEventListener('DOMContentLoaded', function() {

	let elCanvasFront = document.getElementById('game');
	let elContextFront = elCanvasFront.getContext('2d');

	let elCanvasBack = document.createElement('canvas');
	let elContextBack = elCanvasBack.getContext('2d');

	let width = elCanvasFront.width;
	let height = elCanvasFront.height;

	elCanvasBack.width = width;
	elCanvasBack.height = height;

	DEBUG('UGH!');

	let game = new Game(elContextBack);
	game.setup().then(mainloop);

	function mainloop() {
		game.update();
		game.render();
		elContextFront.drawImage(elCanvasBack, 0, 0);
		window.requestAnimationFrame(mainloop);
	}

});

// EoF
