function Button(x, y, xw, yw, btext = 0, color = [0])
{
	this.x = x;
	this.y = y;
	this.xw = xw;
	this.yw = yw;
	this.btext = btext;
	this.bcolor = [];
	this.bselected = false;
	this.show = function() {
		if (this.bselected == true) {
			fill(180);
			stroke(190);
		} else {
			fill(200);
			stroke(10);
		}
		rect(this.x, this.y, this.xw, this.yw);
		if (this.btext != 0) {
			fill(10);
			textSize(12);
			text(this.btext, this.x + this.xw / 10, this.y + this.yw / 1.5);
		}
	}
	this.itenteract = function(x, y) {
		if (!(x < this.x || x > this.x + this.xw || y < this.y || y > this.y + this.yw))
			return 1;
	}
}

function getFalse() {
	for (var j = 0; j < bdot.length; j++)	bdot[j].bselected = false;
	for (var j = 0; j < bline.length; j++)	bline[j].bselected = false;
}

function bshow() {
	stroke(10);
	line(wight * 2 / 3, 0, wight * 2 / 3, hight);
	for (var i = 0; i < bdot.length; i++)	bdot[i].show();
	for (var i = 0; i < bline.length; i++)	bline[i].show();
	for (var i = 0; i < bor.length; i++)	bor[i].show();
	for (var i = 0; i < bres.length; i++)	bres[i].show();
	for (var i = 0; i < bsave.length; i++)	bsave[i].show();
}
