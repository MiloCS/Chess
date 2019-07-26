//should be updated on king movement
let kingPosition = {x: 4, y:0};

function isValidMove(start, end) {
	let result = doesNotHitOwnPiece(start, end) &&
		 validForType(start, end) &&
		 //remove this and put it in the validForType for Rook and Bishop
		 noPiecesInWay(start, end) &&
		 kingNotChecked(start, end) &&
		 doesActuallyMove(start, end);
	return result;
}

function sign(num) {
	if (num < 0) {
		return -1;
	}
	else if (num > 0) {
		return 1;
	}
	else {
		return 0;
	}
}

function doesActuallyMove(start, end) {
	//checking that it's not trying to evaluate off-board moves
	if (start.x > 7 || start.x < 0 || end.x > 7 || end.x < 0 || start.y > 7 || start.y < 0 || end.y > 7 || end.y < 0) {
		return false;
	}
	//making sure move doesn't stay in the same place
	if (!(start.x == end.x && start.y == end.y)) {
		return true;	
	}
	else {
		return false;
	}
}

function attacking(start, end) {
	return validForType(start, end) &&
	       noPiecesInWay(start, end);
}

function isBeingAttacked(location) {
	let piece = positions[location];
	let piecesign = sign(piece);
	for (let i=0; i<8; i++) {
		for (let j=0; j<8; j++) {
			if (piece == 0 || sign(positions[i][j]) == piecesign)
				continue;
			if(attacking({x:i, y:j}, position)) {
				return true;
			}
		}
	}
	return false;	
}

function kingNotChecked(start, end) {
	//deep copy of positions array, make the move
	return !isBeingAttacked(kingPosition);
}

function doesNotHitOwnPiece(start, end) {
	if (positions[start] < 0) {
		if (positions[end] < 0) {
			return false;
		}
		else {
			return true;
		}
	}
	else if(positions[start] > 0) {
		if (positions[end] > 0) {
			return false;
		}
		else {
			return true;
		}
	}
	else {
		return false;
	}
}

function validForType(start, end) {
	if (positions[start] == 1) {
		return isValidPawnMove(start, end);
	}
	else if (positions[start] == 2) {
		return isValidRookMove(start, end);
	}
	else if (positions[start] == 3) {
		return isValidKnightMove(start, end);
	}
	else if (positions[start] == 4) {
		return isValidBishopMove(start, end);
	}
	else if (positions[start] == 5) {
		return isValidQueenMove(start, end);
	}
	else if (positions[start] == 6) {
		return isValidKingMove(start, end);
	}
	else {
		return false;
	}
}

function getSquaresBetween(start, end) {
	let deltax = end.x - start.x;
	let deltay = end.y - start.y;
	let incx = sign(deltax);
	let incy = sign(deltay);
	let resultList = new Array();
	let xcoord = start.x;
	let ycoord = start.y;
	for (let i=0; i < Math.max(Math.abs(deltax), Math.abs(deltay)) - 1, i++) {
		xcoord += incx;
		ycoord += incy;
		resultList.push({x:xcoord, y:ycoord});
	}
	return resultList;
}

function isTaking(start, end) {
	if (positions[start] < 0) {
		if (positions[end] > 0) {
			return true;
		}
		else {
			return false;
		}
	}
	else if(positions[start] > 0) {
		if (positions[end] < 0) {
			return true;
		}
		else {
			return false;
		}
	}
	else {
		return false;
	}
}

function isValidPawnMove(start, end) {
	let diffx = Math.abs(start.x - end.x);
	let deltay = end.y - start.y;
	if (diffx == 0 && deltay == 1 && positions[end] == 0) {
		return true;
	}
	if (diffx == 1 && deltay == 1 && isTaking(start, end)) {
		return true;
	}
	if (diffx == 0 && deltay == 2 && (start.y == 1 || start.y == 6) && position[start.x][average(start.y, end.y)] == 0) {
		return true;
	}
	return false;
}

function isValidRookMove(start, end) {
	if (start.x == end.x || start.y == end.y) {
		return true;
	}
	else {
		return false;
	}
}

function isValidBishopMove(start, end) {
	let diffx = Math.abs(start.x - end.x);
	let diffy = Math.abs(start.y - end.y);
	if (diffx == diffy) {
		return true;
	}
	else {
		return false;
	}
}

function isValidKnightMove(start, end) {
	let diffx = Math.abs(start.x - end.x);
	let diffy = Math.abs(start.y - end.y);
	if ((diffx == 2 && diffy == 1) || (diffy == 2 && diffx == 1)) {
		return false;
	}
}

function isValidQueenMove(start, end) {
	return isValidRookMove(start, end) || isValidBishopMove(start, end);
}

function isValidKingMove(start, end) {
	let diffx = Math.abs(start.x - end.x);
	let diffy = Math.abs(start.y - end.y);
	return (diffx <= 1) && (diffy <= 1);
}