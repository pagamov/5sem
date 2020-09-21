'use strict'
new p5();
//sizes of window
let WIDTH = 600, HEIGHT = WIDTH;

// var a_global = ;

var arr = [];
let multiplier = 4
var step = 10

var funk = function(p) {
	var a = document.getElementById("a_global").value
	return a * cos(3*p*2*PI/360);
}

function drawLine (x_1, y_1, x_2, y_2) {
	var shift = WIDTH / 2
	stroke(10);
	line(x_1 + shift, y_1 + shift, x_2 + shift, y_2 + shift);
}

document.getElementById("param_input_button").onclick = function() {
	document.getElementById("progres_div").style.visibility = 'visible'
}


function setup () {
	createCanvas(WIDTH, HEIGHT);
	background(220);
}

function draw () {
	background(220);
	arr = []
	if (step > 0.1) {
		step -= 0.05
	}
	for (var i = 0; i < 360; i+=step) {
		arr.push({fi:i, ro:funk(i)});
	}

	for (var i = 1; i < arr.length; i++) {
		drawLine(multiplier * cos (arr[i - 1].fi * 2 * PI / 360) * arr[i - 1].ro,
				 multiplier * sin (arr[i - 1].fi * 2 * PI / 360) * arr[i - 1].ro,
				 multiplier * cos (arr[i].fi * 2 * PI / 360) * arr[i].ro,
				 multiplier * sin (arr[i].fi * 2 * PI / 360) * arr[i].ro)

	}
}
