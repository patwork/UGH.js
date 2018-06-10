// helpers.js

// -----------------------------------------------------
function DEBUG(txt) {
	let now = new Date();
	console.log(now.toTimeString().substr(0, 8) + ' :: ' + txt); // eslint-disable-line
}

// -----------------------------------------------------
function preloadImage(src) {
	DEBUG(src);
	return new Promise((resolve, reject) => {
		let img = new Image();
		img.onload = () => resolve(img);
		img.onerror = reject;
		img.src = src;
	});
}

// -----------------------------------------------------
function collisionLineLine(x1, y1, x2, y2, x3, y3, x4, y4) {

	let uA =
		((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) /
		((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
	let uB =
		((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) /
		((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));

	if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
		// let intersectionX = x1 + (uA * (x2 - x1));
		// let intersectionY = y1 + (uA * (y2 - y1));
		return true;
	}

	return false;
}

// -----------------------------------------------------
function collisionLineRect(x1, y1, x2, y2, x3, y3, x4, y4) {

	if (collisionLineLine(x1, y1, x2, y2, x3, y3, x4, y3) ||
		collisionLineLine(x1, y1, x2, y2, x3, y4, x4, y4) ||
		collisionLineLine(x1, y1, x2, y2, x3, y3, x3, y4) ||
		collisionLineLine(x1, y1, x2, y2, x4, y3, x4, y4)) {
		return true;
	}

	return false;
}

// EoF
