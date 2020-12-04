'use strict'
new p5();
//sizes of window
let WIDTH = 1200, HEIGHT = 800;


function drawCylinder(h, r, x, y, z) {
	let step = int(document.getElementById('n_number_of_sides').value);

	y = y * cos(frameCount * 0.1 + y);

	for (var fi = 0; fi < 360; fi += step) {
		beginShape();
		vertex(x, y + h / 2, z);
		vertex(	x + cos(fi / 360 * 2 * PI) * r,
				y + h / 2,
				z + sin(fi / 360 * 2 * PI) * r);
		vertex(	x + cos((fi + step) / 360 * 2 * PI) * r,
				y + h / 2,
				z + sin((fi + step) / 360 * 2 * PI) * r);
		endShape();

		beginShape();
		vertex(x, y - h / 2, z);
		vertex(	x + cos(fi / 360 * 2 * PI) * r,
				y - h / 2,
				z + sin(fi / 360 * 2 * PI) * r);
		vertex(	x + cos((fi + step) / 360 * 2 * PI) * r,
				y - h / 2,
				z + sin((fi + step) / 360 * 2 * PI) * r);
		endShape();

		beginShape();
		vertex(	x + cos(fi / 360 * 2 * PI) * r,
				y - h / 2,
				z + sin(fi / 360 * 2 * PI) * r);

		vertex(	x + cos(fi / 360 * 2 * PI) * r,
				y + h / 2,
				z + sin(fi / 360 * 2 * PI) * r);

		vertex(	x + cos((fi + step) / 360 * 2 * PI) * r,
				y + h / 2,
				z + sin((fi + step) / 360 * 2 * PI) * r);

		vertex(	x + cos((fi + step) / 360 * 2 * PI) * r,
				y - h / 2,
				z + sin((fi + step) / 360 * 2 * PI) * r);
		endShape();
	}
}

function setup() {
	createCanvas(WIDTH, HEIGHT, WEBGL);
	background(200);
	debugMode(AXES);
}

function draw() {
	// noStroke();
	stroke(255,69,5);
	strokeWeight(1);

	background(200);
	ambientLight(0,200,200);

	let x1 = map(mouseX, 0, WIDTH, -200, 200);
	let x2 = map(mouseY, 0, HEIGHT, 200, -200);

	directionalLight(100, 100, 100, x1, x2, 200);
	ambientMaterial(255,69,0);
	orbitControl();
	drawPiramid(300, 200, 300, -20, 300);
}
