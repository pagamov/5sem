//matrix work
function makeMatrixSmeG(size) {
	var arr = new Array(size);
	for (var i = 0; i < size; i++)	arr[i] = new Array(size);
	for (var i = 0; i < size; i++)	for (var j = 0; j < size; j++)	arr[i][j] = 0;
	return arr;
}

function reOplyMatrixSmeG(size) {
	var arr = makeMatrixSmeG(size);
	for (var i = 0; i < dotArr.length; i++)	for (var j = 0; j < dotArr[i].path.length; j++)	arr[i][dotArr[i].path[j]] = 1;
	return arr;
}

function makeLatMatrix(size) {
  if (size == 0)	return null;
	var arr = new Array(size);
	for (var i = 0; i < size; i++) {	arr[i] = new Array(size);	for (var j = 0; j < size; j++)	arr[i][j] = [];}
  for (var i = 0; i < size; i++)	for (var j = 0; j < size; j++)	if (smegMatrix[i][j] != 0)	arr[i][j].push((number2letter[i] + number2letter[j]));
  return arr;
}

function makeLatMatrixDelLeft(size) {
  if (size == 0)	return null;
  arr = new Array(size);
	for (var i = 0; i < size; i++)	arr[i] = new Array(size);
  for (var i = 0; i < size; i++)	for (var j = 0; j < size; j++) {	if (smegMatrix[i][j] != 0)	arr[i][j] = number2letter[j];	else arr[i][j] = "";}
  return arr;
}

function composLatMatrix(mat1, mat2) {
  var size = dotsize, arr = new Array(size);
	for (var i = 0; i < size; i++) {arr[i] = new Array(size);	for (var j = 0; j < size; j++)	arr[i][j] = [];}
  for (var i = 0; i < size; i++)
    for (var j = 0; j < size; j++)
      for (var k = 0; k < size; k++)
        if (mat1[i][k].length != 0 && mat2[k][j] != 0)
          for (var l = 0; l < mat1[i][k].length; l++)
            arr[i][j].push(mat1[i][k][l] + mat2[k][j]);
  return arr;
}

function inStack(arr, target) {
  for (var i = 0; i < arr.length; i++)	if (arr[i] == target)	return 0;
  return 1;
}
function checkPathLite(matrix) {
	var size = dotsize, stringPivet, stack = [];
	for (var i = 0; i < size; i++)
    for (var j = 0; j < size; j++) {
      for (var k = 0; k < matrix[i][j].length; k++)
        for (var l = 0; l < matrix[i][j][k].length - 2; l++) {
          stringPivet = matrix[i][j][k][l];
          for (var q = l + 1; q < matrix[i][j][k].length - 1; q++)	if (matrix[i][j][k][q] == stringPivet)	if (inStack(stack, k))	stack.push(k);
        }
      for (var pp = stack.length - 1; pp >= 0; pp--)	matrix[i][j].splice(stack[pp], 1);	stack = [];
    }
}

function checkPath(matrix) {
  var size = dotsize, stringPivet, stack = [];
  for (var i = 0; i < size; i++)
    for (var j = 0; j < size; j++) {
      for (var k = 0; k < matrix[i][j].length; k++) {
        for (var l = 0; l < matrix[i][j][k].length - 2; l++) {
          stringPivet = matrix[i][j][k][l];
          for (var q = l + 1; q < matrix[i][j][k].length - 1; q++)	if (matrix[i][j][k][q] == stringPivet)	if (inStack(stack, k))	stack.push(k);
        }
        if (matrix[i][j][k][0] != matrix[i][j][k][matrix[i][j][k].length - 1])	if (inStack(stack, k))	stack.push(k);
      }
      for (var pp = stack.length - 1; pp >= 0; pp--)	matrix[i][j].splice(stack[pp], 1);	stack = [];
    }
}

function galminton() {
  if (dotsize == 0)	return null;
  nMatrix = makeLatMatrix(dotsize);
  oneMatrix = makeLatMatrixDelLeft(dotsize);
  for (var i = 0; i < dotsize - 1; i++)	{nMatrix = composLatMatrix(nMatrix, oneMatrix); checkPathLite(nMatrix);}
  checkPath(nMatrix);
  //saveJSON(nMatrix, 'nMatrix.json');
	for (var i = 0; i < nMatrix.length; i++)	for (var j = 0; j < nMatrix[i].length; j++)	if (nMatrix[i][j].length != 0) {gamPath = nMatrix[i][j].pop();drawGamPathPass = 1;}
}
