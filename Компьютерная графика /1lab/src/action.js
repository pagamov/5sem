document.getElementById('import').onclick = function() {
	var files =
document.getElementById('selectFiles').files;
  console.log(files);
  if (files.length <= 0)	return false;
  var fr = new FileReader();
  fr.onload = function(e) {
  console.log(e);
    var resulted = JSON.parse(e.target.result), formatted = JSON.stringify(resulted, null, 2);
		dotArr = [];
		for (var i = 0; i < resulted.length; i++) {
			dotArr.push(new Dot_(resulted[i].x, resulted[i].y));
			for (var j = 0; j < resulted[i].path.length; j++)
				dotArr[i].path.push(resulted[i].path[j]);
			dotsize++;
		}
  }
  fr.readAsText(files.item(0));
};

var nodesRePosPass = 0;
function nodeDistance(A, B){return sqrt(pow(abs(A.x - B.x), 2) + pow(abs(A.y - B.y), 2));}
function nodeDistanceX(A, B){return abs(A.x - B.x);}
function nodeDistanceY(A, B){return abs(A.y - B.y);}
function xRel(A, B){if (A.x > B.x)return 1;else return -1;}
function yRel(A, B){if (A.y > B.y)return 1;else return -1;}
function inArr(a, arr){for (var i = 0; i < arr.length; i++){if(arr[i] == a)return 1;}return 0;}

function collectGradient(arrOfDots, number) {
  var res = [0, 0], F;
  for (var i = 0; i < arrOfDots.length; i++)
    if (i != number) {
      F = 5000/(nodeDistance(arrOfDots[i], arrOfDots[number]) * nodeDistance(arrOfDots[i], arrOfDots[number]));
      res[0] += F*(nodeDistanceX(arrOfDots[number], arrOfDots[i])/nodeDistance(arrOfDots[number], arrOfDots[i]))*xRel(arrOfDots[number], arrOfDots[i]);
      res[1] += F*(nodeDistanceY(arrOfDots[number], arrOfDots[i])/nodeDistance(arrOfDots[number], arrOfDots[i]))*yRel(arrOfDots[number], arrOfDots[i]);
    }
  for (var i = 0; i < arrOfDots.length; i++)
    if ((i != number) && inArr(i, arrOfDots[number].path)) {
			F = (nodeDistance(arrOfDots[i], arrOfDots[number]));
      res[0] -= 0.5*(nodeDistanceX(arrOfDots[number], arrOfDots[i])/nodeDistance(arrOfDots[number], arrOfDots[i]))*xRel(arrOfDots[number], arrOfDots[i]);
      res[1] -= 0.5*(nodeDistanceY(arrOfDots[number], arrOfDots[i])/nodeDistance(arrOfDots[number], arrOfDots[i]))*yRel(arrOfDots[number], arrOfDots[i]);
    }
  return res;
}

function nodesRePos() //меняет позиции всех нодов
{
  var rePos = [];
  for (var i = 0; i < dotArr.length; i++)
    rePos.push(collectGradient(dotArr, i));
  for (var i = 0; i < dotArr.length; i++)
    for (var j = 0; j < dotArr.length; j++)
			if (i != j) {
				if (dotArr[i].x + rePos[i][0] + dotArr[i].fat < wight * 2 / 3 && dotArr[i].x + rePos[i][0] - dotArr[i].fat > 0)	dotArr[i].x += rePos[i][0];
				if (dotArr[i].y + rePos[i][1] + dotArr[i].fat < hight && dotArr[i].y + rePos[i][1] - dotArr[i].fat > 0)	dotArr[i].y += rePos[i][1];
			}
}
