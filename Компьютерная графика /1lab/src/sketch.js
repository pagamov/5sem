'use strict'
new p5();
//sizes of window
var wight = 1000, hight = wight * 2 / 3;
//
var fat = 25, dotArr = [], dotsize = 0, linesArr = [];
//buttons arr
var bdot = [], bline = [], bor = [], bres = [], bsave = [];
//
var pivetXY = [];
//matrix
var smegMatrix, nMatrix, oneMatrix, gamPath, drawGamPathPass = 0;
//
var number2letter = new Array(26);
//var selected button
var bstatus = null, bstatusColor = null, bstatusR = "OR", dmoveindex = -1, dataDotArr;

function setup () {
	createCanvas(wight, hight);
	background(220);
	var start = wight * 2 / 3;
	var h1 = 8; //10
	var h2 = 40; //50
	var d1 = 58; //68
	var d2 = 50; //60
	number2letter = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
	bdot.push(new Button(start + h1, h2, 2*d1+h1, d2, "Dot mode"));
	bdot.push(new Button(start + 3*h1 + 2*d1, h2, d1, d2, "Dot dell"));
	bdot.push(new Button(start + 4*h1 + 3*d1, h2, d1, d2, "Dot move"));
	bline.push(new Button(start + h1, 2*h2+d2, 2*d1 + h1, d2, "Line mode"));
	bline.push(new Button(start + 3*h1 + 2*d1, 2*h2+d2, d1, d2, "Line dell"));
	bres.push(new Button(start + h1, 3*h2+2*d2, 2* d1 + h1, d2, "Res"));
	bres.push(new Button(start + 3*h1 + 2*d1, 3*h2+2*d2, 2* d1 + h1, d2, "RePos"));
	bor.push(new Button(start + 4*h1 + 3*d1, 2*h2+d2, d1, d2, "OR"));
	bor.push(new Button(start + 5*h1 + 4*d1, 2*h2+d2, d1, d2, "nOR"));
	bsave.push(new Button(start + h1, hight - d2 - h2, d1, d2, "Save"));
}

function draw () {
	background(220);
	lineShow();
	for (var i = 0; i < dotsize; i++)	dotArr[i].show(i);
	if (nodesRePosPass != 0)	nodesRePos();
	if (drawGamPathPass) drawGamPath();
	whenPressed();
	bshow();
}
