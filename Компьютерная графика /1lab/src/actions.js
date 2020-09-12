function mouseReleased() {
	switch (bstatus) {
		case "Dot mode":
			if (mouseX < wight * 2 / 3 - fat && dotArr.length < 26) {dotArr.push(new Dot_(mouseX, mouseY));dotsize++;smegMatrix = reOplyMatrixSmeG(dotsize);if (drawGamPathPass) drawGamPathPass = 0;}
			break;
		case "Dot dell":
    	var povet = searchInter(mouseX, mouseY);
			if (povet >= 0) {
        for (var i = 0; i < dotsize; i++) {
					if (i == povet)continue;
          for (var j = 0; j < dotArr[i].path.length; j++)if (dotArr[i].path[j] == povet)dotArr[i].path.splice(j, 1);
        }
        for (var i = 0; i < dotsize; i++)	for (var j = 0; j < dotArr[i].path.length; j++)	if (povet < dotArr[i].path[j])	dotArr[i].path[j]--;
				dotArr.splice(povet, 1);
        dotsize--;
				smegMatrix = reOplyMatrixSmeG(dotsize);
				if (drawGamPathPass) drawGamPathPass = 0;
			}
			break;
		case "Dot move":
			dmoveindex = -1;
			break;
    case "Line mode":
      var povet = searchInter(mouseX, mouseY);
      if (pivetXY[2] == -1) {
        pivetXY[0] = null;	pivetXY[1] = null;	pivetXY[2] = null;
      } else {
        if (povet >= 0 && povet != pivetXY[2]) {
					if (drawGamPathPass) drawGamPathPass = 0;
          if (bstatusR == "OR") {
            if (!checkLine(povet, pivetXY[2])) {dotArr[povet].path.push(pivetXY[2]);	dotArr[povet].path.sort();}
            if (!checkLine(pivetXY[2], povet)) {dotArr[pivetXY[2]].path.push(povet);	dotArr[pivetXY[2]].path.sort();}
          } else if (bstatusR == "nOR") {
            if (!checkLine(pivetXY[2], povet)) {dotArr[pivetXY[2]].path.push(povet);	dotArr[pivetXY[2]].path.sort();}
          }
        }
        pivetXY[0] = null;	pivetXY[1] = null;	pivetXY[2] = null;	smegMatrix = reOplyMatrixSmeG(dotsize);
      }
      break;
    case "Line dell":
      var povet = searchInter(mouseX, mouseY);
      if (povet >= 0 && povet != pivetXY[2]) {if (drawGamPathPass) drawGamPathPass = 0;	lineDell(pivetXY[2], povet);}
      pivetXY[0] = null;	pivetXY[1] = null;	pivetXY[2] = null;	smegMatrix = reOplyMatrixSmeG(dotsize);
      break;
	}
}

function mouseClicked() {
	if (mouseX > wight * 2 / 3) {
		for (var i = 0; i < bdot.length; i++) {
			if (bdot[i].itenteract(mouseX, mouseY)) {getFalse();	bdot[i].bselected = true;	bstatus = bdot[i].btext;}
		}
		for (var i = 0; i < bline.length; i++) {
			if (bline[i].itenteract(mouseX, mouseY)) {getFalse();	bline[i].bselected = true;	bstatus = bline[i].btext;}
		}
		for (var i = 0; i < bor.length; i++) {
			if (bor[i].itenteract(mouseX, mouseY)) {for (var j = 0; j < bor.length; j++)	bor[j].bselected = false;	bor[i].bselected = true;	bstatusR = bor[i].btext;}
		}
		for (var i = 0; i < bres.length; i++)
			if (bres[i].itenteract(mouseX, mouseY))
				if (i == 0) {
					galminton();
				} else if (i == 1) {
					switch (nodesRePosPass) {
						case 0: nodesRePosPass = 1; break;
						case 1: nodesRePosPass = 0; break;
					}
				}
		for (var i = 0; i < bsave.length; i++) {if (bsave[i].itenteract(mouseX, mouseY)) {if (dotArr.length != 0) {var json = dotArr;	saveJSON(json, 'dotArr.json');}}}
	}
}

function mousePressed() {
  switch (bstatus) {
    case "Line mode":pivetXY[0] = mouseX;	pivetXY[1] = mouseY;	pivetXY[2] = searchInter(mouseX, mouseY);	break;
    case "Line dell":pivetXY[0] = mouseX;	pivetXY[1] = mouseY;	pivetXY[2] = searchInter(mouseX, mouseY);	break;
    case "Mass mode":pivetXY[0] = mouseX;	pivetXY[1] = mouseY;	pivetXY[2] = searchInter(mouseX, mouseY);	break;
  }
}

function whenPressed() {
	if (mouseIsPressed) {
		switch (bstatus) {
			case "Dot mode":	if (mouseX < wight * 2 / 3 - fat) {fill(255);	stroke(3);	ellipse(mouseX, mouseY, fat, fat);}	break;
			case "Dot move":	if (mouseX < wight * 2 / 3 - fat) {dmoveindex = searchInter(mouseX, mouseY);	if (searchInter(mouseX, mouseY) >= 0) {dotArr[dmoveindex].x = mouseX;	dotArr[dmoveindex].y = mouseY;}}break;
      case "Line mode":	stroke(10);	line(pivetXY[0], pivetXY[1], mouseX, mouseY); break;
      case "Line dell":	stroke(10);	line(pivetXY[0], pivetXY[1], mouseX, mouseY);	break;
      case "Mass mode":	stroke(10);	line(pivetXY[0], pivetXY[1], mouseX, mouseY);	break;
		}
	}
}
