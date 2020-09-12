function Dot_(x, y)
{
	this.x = x;
	this.y = y;
	this.fat = fat;
	this.path = [];

	this.show = function(number) {
		fill(255);
		stroke(10);
		ellipse(this.x, this.y, this.fat, this.fat);
		fill(10);
		textSize(this.fat / 1.5);
		text(number2letter[number], this.x - this.fat / 2, this.y - this.fat / 2);
	}
}

function searchInter(x, y) {for (var i = 0; i < dotsize; i++)	if (sqrt((x - dotArr[i].x)**2 + (y - dotArr[i].y)**2) < dotArr[i].fat)	return i;	return -1;}

function lineDell(index, povet) {
  for (var i = dotArr[povet].path.length - 1; i >= 0; i--)	if (dotArr[povet].path[i] == index)	dotArr[povet].path.splice(i, 1);
  for (var i = dotArr[index].path.length; i >= 0 ; i--)	if (dotArr[index].path[i] == povet)	dotArr[index].path.splice(i, 1);
}

function lineShow() {
  for (var i = 0; i < dotsize; i++) {
    for (var j = 0; j < dotArr[i].path.length; j++) {
      stroke(10);
      line(dotArr[i].x, dotArr[i].y, dotArr[dotArr[i].path[j]].x, dotArr[dotArr[i].path[j]].y);
      var s = [(dotArr[dotArr[i].path[j]].x + dotArr[i].x)/2, (dotArr[dotArr[i].path[j]].y + dotArr[i].y)/2];
      var n = [dotArr[dotArr[i].path[j]].y - dotArr[i].y, - dotArr[dotArr[i].path[j]].x + dotArr[i].x];
      var nap = [dotArr[dotArr[i].path[j]].x - dotArr[i].x, dotArr[dotArr[i].path[j]].y - dotArr[i].y];
      line(s[0] + n[0]/40 - nap[0]/20, s[1] + n[1]/40 - nap[1]/20, s[0] + n[0]/40 + nap[0]/20, s[1] + n[1]/40 + nap[1]/20);
      line(s[0] + n[0]/40 + nap[0]/20, s[1] + n[1]/40 + nap[1]/20, s[0] + 2*n[0]/60, s[1] + 2*n[1]/60);
    }
  }
}

function checkLine(index, search) {for (var i = 0; i < dotArr[index].path.length; i++)	if (dotArr[index].path[i] == search)	return 1;	return 0;}
function letterToInt(target) {for (var i = 0; i < number2letter.length; i++)	if (number2letter[i] == target)	return i;}
function drawGamPath() {for (var i = 0; i < gamPath.length - 1; i++) {stroke(255, 165, 0);line(dotArr[letterToInt(gamPath[i])].x, dotArr[letterToInt(gamPath[i])].y, dotArr[letterToInt(gamPath[i+1])].x, dotArr[letterToInt(gamPath[i+1])].y);}}
