//["p", "N", "B", "R", "Q", "K"]
let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

ctx.font = "10px Arial"

let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
let numbers = [8, 7, 6, 5, 4, 3, 2, 1]

const borderwidth = 10;

const width = canvas.width;
const height = canvas.height;

const squarewidth = width/8;
const squareheight = height/8
const white = true;
let positions;

let lastClick = null;
let changedPositions = [];

function toCoordinates(letter, number) {
	return {x: numbers.indexOf(number), y: letters.indexOf(letter)}
}

function toAlgNotation(x, y) {
	return letters[x] + numbers[y];
}
//should be separated into separate file for organization
function initBoard() {
	positions = Array(8);
	for (let i=0; i<8; i++) {
		positions[i] = Array(8);
		for (let j=0; j<8; j++) {
			positions[i][j] = 0; //0
		}
	}

	//piece initialization
	for (let i=0; i<8; i++) {
		positions[i][6] = 1; //1
	}
	positions[0][7] = 2; //2
	positions[7][7] = 2;
	positions[1][7] = 3; //3
	positions[6][7] = 3; 
	positions[2][7] = 4; //4
	positions[5][7] = 4;
	positions[3][7] = 6; //6
	positions[4][7] = 5; //5

	for (let i=0; i<8; i++) {
		positions[i][1] = -1; //-1
	}
	positions[0][0] = -2; //2
	positions[7][0] = -2;
	positions[1][0] = -3; //3
	positions[6][0] = -3; 
	positions[2][0] = -4; //4
	positions[5][0] = -4;
	positions[3][0] = -5; //6
	positions[4][0] = -6;
}

///game logic (commands)

function numToFileName(num) {
	let result = "";
	if (num > 0) {
		result += "white";
	}
	else {
		result += "black";
	}
	let numabs = Math.abs(num);
	if (numabs == 1) {
		result += "pawn";
	}
	else if (numabs == 2) {
		result += "rook";
	}
	else if (numabs == 3) {
		result += "knight";
	}
	else if (numabs == 4) {
		result += "bishop";
	}
	else if (numabs == 5) {
		result += "queen";
	}
	else if (numabs == 6) {
		result += "king";
	}
	else {
		result = "invalid";
	}
	return result;
}

function letterToPieceName(letter) {
	switch(letter.toLowerCase()) {
		case "p":
			return "pawn";
		case "r":
			return "rook";
		case "n":
			return "knight";
		case "b":
			return "bishop";
		case "q":
			return "queen";
		case "k":
			return "king";
	}
}

function makeMove(start, end) {
	let temp = positions[start.x][start.y];
	positions[end.x][end.y] = temp;
	if (start.x !== end.x || start.y !== end.y) {
		positions[start.x][start.y] = 0;
	}
}

//regex to check for validity of any algebraic expression: /^(O-O-O|O-O|(([prnbqk]?x?)([abcdefgh]x?)[abcdefgh][0-8])\+?)$/i
function returnStringCommand(command) {
	if (/^[prnbqk]x[abcdefgh][0-8]\+?$/i.test(command)) {
		let piece = command.substring(0, command.indexOf('x'));
		let square = command.substring(command.indexOf('x') + 1, command.indexOf('x') + 3);
		return letterToPieceName(piece) + " takes " + square;
	}
	else if (/^[prnbqk][abcdefgh][0-8]\+?$/i.test(command)) {
		let piece = command[0];
		let square = command.substring(1, 3);
		return letterToPieceName(piece) + " to " + square;
	}
	else if(/^[abcdefgh][0-8]\+?$/i.test(command)) {
		let piece = "p";
		let square = command.substring(0, 2);
		return letterToPieceName(piece) + " to " + square;
	}
	else if (/^[abcdefgh]x[abcdefgh][0-8]\+?$/i.test(command)) {
		let file = command[0];
		let square = command.substring(2, 4);
		return file + "-file pawn takes " + square
	}
	else if (command === "O-O-O" || command === "O-O") {
		if (command === "O-O-O") {
			return "Queenside Castle";
		}
		else {
			return "Kingside Castle"
		}
	}
	else {
		return "Invalid Command";
	}
}
//spots to put the images

function drawBlankSquare(i, j, isSelected=false) {
	if (isSelected) {
		ctx.fillStyle = "#c85548";
		ctx.fillRect(i*squarewidth, j*squareheight, squarewidth, squareheight);
		ctx.fillStyle = "white";
		ctx.fillText(toAlgNotation(i, j), i*squarewidth + 5, (j+1)*squareheight - 5);
	}
	else if ((i+j)%2 == 0) {
		ctx.fillStyle = "#665548";
		ctx.fillRect(i*squarewidth, j*squareheight, squarewidth, squareheight);
		ctx.fillStyle = "white";
		ctx.fillText(toAlgNotation(i, j), i*squarewidth + 5, (j+1)*squareheight - 5);
	}
	else {
		ctx.fillStyle = "#d3b6a0";
		ctx.fillRect(i*squarewidth, j*squareheight, squarewidth, squareheight);
		ctx.fillStyle = "black";
		ctx.fillText(toAlgNotation(i, j), i*squarewidth + 5, (j+1)*squareheight - 5);
	}
}

function drawPiece(i, j) {
	let xcoord = i * squarewidth;
	let ycoord = j * squareheight;
	if (!(positions[i][j] == 0)) {
		let filename = "images\\" + numToFileName(positions[i][j]) + ".png";
		let image = new Image();
		image.src = filename;
		image.onload = function () {
			ctx.drawImage(image, xcoord, ycoord, squarewidth, squareheight);
		}
	} 
}

function redraw() {
	//redraw board too
	canvas.width = canvas.width;
	for (let i=0; i<8; i++) {
		for (let j=0; j<8; j++) {
			drawBlankSquare(i, j);
		}
	}

	for (let i=0; i<8; i++) {
		for (let j=0; j<8; j++) {
			drawPiece(i, j);
		}
	}
	if (lastClick !== null) {
		drawBlankSquare(lastClick.x, lastClick.y, true);
		drawPiece(lastClick.x, lastClick.y);
		changedPositions.push(lastClick);
	}
}

function minimalRedraw() {
	changedPositions.forEach((pos) => {
		drawBlankSquare(pos.x, pos.y);
		drawPiece(pos.x, pos.y);
	});
	changedPositions = [];
	if (lastClick !== null) {
		drawBlankSquare(lastClick.x, lastClick.y, true);
		drawPiece(lastClick.x, lastClick.y);
		changedPositions.push(lastClick);
	}
}

window.onload = function () {
	canvas.addEventListener('click', (e) => {

		const rect = canvas.getBoundingClientRect();
		const pos = {
				x: e.clientX,
				y: e.clientY
		}
		let myRect = getBoardSquare(pos, rect);
		changedPositions.push(myRect);
		if (lastClick == null) {
			lastClick = myRect;
		}
		else {
			makeMove(lastClick, myRect);
			lastClick = null;
		}
		minimalRedraw();
	});
}


function getBoardSquare(pos, rect) {
	const normalizedX = (pos.x - rect.x);
	const normalizedY = (pos.y - rect.y);
	const square = {
		x: Math.floor(normalizedX / squarewidth),
		y: Math.floor(normalizedY / squarewidth) 
	}
	return square;
}

initBoard();
redraw();
