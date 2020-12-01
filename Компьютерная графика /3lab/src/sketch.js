'use strict'
new p5();
//sizes of window
let WIDTH = 1200, HEIGHT = 800;

function drawPiramid (h, R, x, y, z) {
	let n = document.getElementById('n_number_of_sides').value;
	if (n < 3) {
		return;
	}
	let arr = []
	for (let i = 0; i < n; i++) {
		arr.push({x: cos(i * 2 * PI / n) * R + (x || 0),y: 0 + (y || 0),z: -(sin(i * 2 * PI / n) * R) + (z || 0)})
	}

	let top_point = {x: 0 + (x || 0), y: - h + (y || 0), z: 0 + (z || 0)};

	beginShape(TRIANGLES);
	vertex(top_point.x, top_point.y, top_point.z);
	vertex(arr[arr.length - 1].x, arr[arr.length - 1].y, arr[arr.length - 1].z);
	vertex(arr[0].x, arr[0].y, arr[0].z);
	endShape();

	for (let i = 1; i < n; i++) {
		beginShape(TRIANGLES);
		vertex(top_point.x, top_point.y, top_point.z);
		vertex(arr[i - 1].x, arr[i - 1].y, arr[i - 1].z);
		vertex(arr[i].x, arr[i].y, arr[i].z);
		endShape();
	}

	beginShape();
	for (let i = 0; i < n; i++) {
		vertex(arr[i].x, arr[i].y, arr[i].z);
	}
	endShape(CLOSE);
}

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

function drawConus(h, r, x, y, z) {
	let step = int(document.getElementById('n_number_of_sides').value);

	// y = y * cos(frameCount * 0.1 + y);

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
		vertex(	x + cos(fi / 360 * 2 * PI) * r / 2,
				y - h / 2,
				z + sin(fi / 360 * 2 * PI) * r / 2);
		vertex(	x + cos((fi + step) / 360 * 2 * PI) * r / 2,
				y - h / 2,
				z + sin((fi + step) / 360 * 2 * PI) * r / 2);
		endShape();

		beginShape();
		vertex(	x + cos(fi / 360 * 2 * PI) * r / 2,
				y - h / 2,
				z + sin(fi / 360 * 2 * PI) * r / 2);

		vertex(	x + cos(fi / 360 * 2 * PI) * r,
				y + h / 2,
				z + sin(fi / 360 * 2 * PI) * r);

		vertex(	x + cos((fi + step) / 360 * 2 * PI) * r,
				y + h / 2,
				z + sin((fi + step) / 360 * 2 * PI) * r);

		vertex(	x + cos((fi + step) / 360 * 2 * PI) * r / 2,
				y - h / 2,
				z + sin((fi + step) / 360 * 2 * PI) * r / 2);
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
	// stroke(255,69,5);
	stroke(0,0,200);
	strokeWeight(1);

	background(200);
	ambientLight(0,200,200);

	let x1 = map(mouseX, 0, WIDTH, -200, 200);
	let x2 = map(mouseY, 0, HEIGHT, 200, -200);

	directionalLight(100, 100, 100, x1, x2, 200);
	ambientMaterial(255,69,0);
	// ambientMaterial(100,30,43);
	orbitControl();
	// drawConus(300, 200, 0, -20, 0);
	// drawPiramid(300, 200, 300, -20, 300);

	rotateX(frameCount % 600 / 100);
	rotateY(frameCount % 600 / 100);
	box(100);
}
