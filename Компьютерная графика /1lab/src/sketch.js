'use strict'
new p5();
//sizes of window
let WIDTH = 600, HEIGHT = WIDTH;

function draw_coord_lines () {
	stroke(10);
	textSize(10);


	var sh = WIDTH / 2

	line(sh, sh, sh, 0); // up
	line(sh, sh, WIDTH, sh); // left
	line(sh, sh, 0, sh);
	line(sh, sh, sh, HEIGHT);

	var step = 50

	for (var i = sh + step; i < WIDTH; i += step) {
		text(String(i - sh), i, sh);
	}

	for (var i = 0 + step; i < sh; i += step) {
		text(String(i), sh, sh - i);
	}

	line(WIDTH, sh, WIDTH - 10, sh + 10)
	line(WIDTH, sh, WIDTH - 10, sh - 10)

	text('x', WIDTH - 10, sh + 20)

	line(sh, 0, sh + 10, 10)
	line(sh, 0, sh - 10, 10)

	text('y', sh + 20, 10)

}

var funk = function(p) {
	let a = document.getElementById("a_global").value
	return a * cos(3*p*2*PI/360);
}

function count_funk_polar (f, p_min = 0, p_max = 1000, step = 1) {
	var res = []
	for (var i = p_min; i < p_max; i += step) {
		res.push({fi: i, ro: f(i)})
	}
	return res;
}

function count_funk_decard (f, p_min = 0, p_max = 1000, step = 1) {
	var res = []
	for (var i = p_min; i < p_max; i += step) {
		res.push({x: i, y: f(i)})
	}
	return res;
}

function polar_to_decard (coords) { // {fi: value, ro: value}
	var x = cos (coords.fi * 2 * PI / 360) * coords.ro
	var y = sin (coords.fi * 2 * PI / 360) * coords.ro
	return {x: x, y: y};
}

function shift (coords, shift_x, shift_y) {
	// (num, num, {})
	var x = coords.x + (shift_x || document.getElementById("x_shift_global").value)
	var y = coords.y + (shift_y || document.getElementById("y_shift_global").value)
	return {x: x, y: y}
}

function multiply (coords, multiplier_x, multiplier_y) {
	var x = coords.x * (multiplier_x || document.getElementById("x_multiply_global").value)
	var y = coords.y * (multiplier_y || document.getElementById("y_multiply_global").value)
	return {x: x, y: y}
}

function drawLine (coords_1, coords_2) {
	var sh = WIDTH / 2
	let start = shift(coords_1, sh, sh)
	let end = shift(coords_2, sh, sh)
	stroke(10);
	line(start.x, start.y, end.x, end.y);
}

function setup () {
	createCanvas(WIDTH, HEIGHT);
	background(220);
}

function draw () {
	background(220);
	textSize(10);
	var arr = count_funk_polar(funk, 0, 360, 1)
	var cords = []

	for (var i = 0; i < arr.length; i++) {
		cords.push(
			polar_to_decard(arr[i])
		)
	}
	draw_coord_lines()
	for (var i = 1; i < cords.length; i++) {
		drawLine(cords[i - 1], cords[i]);
	}
}
