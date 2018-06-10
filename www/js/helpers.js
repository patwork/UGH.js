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

// EoF
