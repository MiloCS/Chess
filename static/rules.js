//should be updated on king movement
let blackKingPosition = {x: 4, y:0};
let whiteKingPosition = {x: 3, y:7};

let lastMove = null;

let movedFlags = {
	blackKing = false;
	whiteKing = false;
	whiteKSRook = false;
	whiteQSRook = false;
	blackKSRook = false;
	blackQSRook = false;
}

function isValidMove(start, end) {
	let result = doesNotHitOwnPiece(start, end) &&
		 validForType(start, end) &&
		 //remove this and put it in the validForType for Rook and Bishop
		 //noPiecesInWay(start, end) &&
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
	return validForType(start, end);
}

function isBeingAttacked(location) {
	let piece = positions[location.x][location.y];
	let piecesign = sign(piece);
	for (let i=0; i<8; i++) {
		for (let j=0; j<8; j++) {
			if (piece == 0 || sign(positions[i][j]) == piecesign)
				continue;
			if(attacking({x:i, y:j}, location)) {
				return true;
			}
		}
	}
	return false;	
}

function kingNotChecked(start, end) {
	let currentstart = positions[start.x][start.y];
	let currentend = positions[end.x][end.y];

	if (currentstart == 6) {
		whiteKingPosition = end;
	}
	if (currentstart == -6) {
		blackKingPosition = end;
	}
	//fake moving the piece to check checking
	positions[start.x][start.y] = 0;
	positions[end.x][end.y] = currentstart;

	let result = !isBeingAttacked(sign(currentstart) == -1 ? blackKingPosition : whiteKingPosition);
	positions[start.x][start.y] = currentstart;
	positions[end.x][end.y] = currentend;
	if (currentstart == 6) {
		whiteKingPosition = start;
	}
	if (currentstart == -6) {
		blackKingPosition = start;
	}
	return result;
}

function doesNotHitOwnPiece(start, end) {
	if (positions[start.x][start.y] < 0) {
		if (positions[end.x][end.y] < 0) {
			return false;
		}
		else {
			return true;
		}
	}
	else if(positions[start.x][start.y] > 0) {
		if (positions[end.x][end.y] > 0) {
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
	let piecenum = Math.abs(positions[start.x][start.y]);
	if (piecenum == 1) {
		return isValidPawnMove(start, end);
	}
	else if (piecenum == 2) {
		return isValidRookMove(start, end);
	}
	else if (piecenum == 3) {
		return isValidKnightMove(start, end);
	}
	else if (piecenum == 4) {
		return isValidBishopMove(start, end);
	}
	else if (piecenum == 5) {
		return isValidQueenMove(start, end);
	}
	else if (piecenum == 6) {
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
	for (let i=0; i < Math.max(Math.abs(deltax), Math.abs(deltay)) - 1; i++) {
		xcoord += incx;
		ycoord += incy;
		resultList.push({x:xcoord, y:ycoord});
	}
	return resultList;
}

function isTaking(start, end) {
	if (positions[start.x][start.y] < 0) {
		if (positions[end.x][end.y] > 0) {
			return true;
		}
		else {
			return false;
		}
	}
	else if(positions[start.x][start.y] > 0) {
		if (positions[end.x][end.y] < 0) {
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

function average(x, y) {
	return Math.floor((x+y)/2)
}

function isValidPawnMove(start, end) {
	let diffx = Math.abs(start.x - end.x);
	let deltay = end.y - start.y;
	let startsign = -1 * sign(positions[start.x][start.y]);
	if (diffx == 0 && deltay == startsign && positions[end.x][end.y] == 0) {
		return true;
	}
	if (diffx == 1 && deltay == startsign && (isTaking(start, end) || isEnPassant(start, end))) {
		return true;
	}
	if (diffx == 0 && deltay == 2 * startsign && (start.y == 1 || start.y == 6) && positions[start.x][average(start.y, end.y)] == 0) {
		return true;
	}
	return false;
}

function isValidRookMove(start, end) {
	if (start.x == end.x || start.y == end.y) {
		let result = true;
		getSquaresBetween(start, end).forEach(square => {
			if (positions[square.x][square.y] !== 0) {
				result =  false;
			}
		});
		return result;
	}
	else {
		return false;
	}
}

function isValidBishopMove(start, end) {
	let diffx = Math.abs(start.x - end.x);
	let diffy = Math.abs(start.y - end.y);
	if (diffx == diffy) {
		let result = true;
		getSquaresBetween(start, end).forEach(square => {
			if (positions[square.x][square.y] !== 0) {
				result =  false;
			}
		});
		return result;
	}
	else {
		return false;
	}
}

function isValidKnightMove(start, end) {
	let diffx = Math.abs(start.x - end.x);
	let diffy = Math.abs(start.y - end.y);
	if ((diffx == 2 && diffy == 1) || (diffy == 2 && diffx == 1)) {
		return true;
	}
	return false;
}

function isValidQueenMove(start, end) {
	return isValidRookMove(start, end) || isValidBishopMove(start, end);
}

function isValidKingMove(start, end) {
	let diffx = Math.abs(start.x - end.x);
	let diffy = Math.abs(start.y - end.y);
	return (diffx <= 1) && (diffy <= 1);
}

////function to actually make moves on the board
function makeMove(start, end) {
	if (!isValidMove(start, end)) {
		console.log('invalid move');
		return;
	}
	let temp = positions[start.x][start.y];
	//updating king position
	if (temp == 6) {
		whiteKingPosition = end;
	}
	if (temp == -6) {
		blackKingPosition = end;
	}

	//special cases: pawn promotion, en passant, castling
	if (isPromoting(start, end)) {
		let choice = 5 //await castleChoose();
		temp = sign(temp) * choice;
	}
	if (isEnPassant(start, end)) {
		let positionBeingTaken = {x:end.x, y:start.y}
		console.log(positionBeingTaken);
		positions[end.x][start.y] = 0;
		changedPositions.push(positionBeingTaken);
	}
	//actual movement of piece in board
	positions[end.x][end.y] = temp;
	if (start.x !== end.x || start.y !== end.y) {
		positions[start.x][start.y] = 0;
	}
	setLastMove(start, end);
}

function setLastMove(start, end) {
	if (lastMove !== null) {
		lastMove.start = start;
		lastMove.end = end;
	}
	else {
		lastMove = {start: start, end: end}
	}
}

function isEnPassant(start, end) {
	let diffx = Math.abs(start.x - end.x);
	let diffy = Math.abs(start.y - end.y);
	let positionBeingTaken = {x:end.x, y:start.y}
	if ((diffx !== 1) || (diffy !== 1)) {
		return false;
	}
	if (!isTaking(start, positionBeingTaken)) {
		return false;
	}
	if(!((start.y == 3 || start.y == 4) && (end.y == 2 || end.y == 5))) {
		return false;
	}
	if (!((lastMove.start.y == 1 || lastMove.start.y == 6) && (lastMove.start.x == end.x && lastMove.end.x == end.x) && lastMove.end.y == start.y)) {
		return false;
	}
	console.log()
	return true;
}

//functions for handling special cases: castling, en passant, and pawn promotion
function isPromoting(start, end) {
	return ((start.y == 1 || start.y == 6) && (end.y == 0 || end.y == 7) && Math.abs(positions[start.x][start.y]) == 1)
}