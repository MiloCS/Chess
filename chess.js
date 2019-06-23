//["p", "N", "B", "R", "Q", "K"]
let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

ctx.font = "10px Arial"

let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
let numbers = [8, 7, 6, 5, 4, 3, 2, 1]

const width = canvas.width;
const height = canvas.height;

const squarewidth = width/8;
const squareheight = height/8
const white = true;

function toCoordinates(letter, number) {
	return {x: numbers.indexOf(number), y: letters.indexOf(letter)}
}

function toAlgNotation(x, y) {
	return letters[x] + numbers[y];
}


for (let i=0; i<8; i++) {
	for (let j=0; j<8; j++) {
		if ((i+j)%2 == 0) {
			ctx.fillStyle = "#665548";
			ctx.fillRect(i*squarewidth, j*squareheight, (i+1)*squarewidth, (j+1)*squareheight);
			ctx.fillStyle = "white";
			ctx.fillText(toAlgNotation(i, j), i*squarewidth + 5, (j+1)*squareheight - 5);
		}
		else {
			ctx.fillStyle = "#d3b6a0";
			ctx.fillRect(i*squarewidth, j*squareheight, (i+1)*squarewidth, (j+1)*squareheight);
			ctx.fillStyle = "black";
			ctx.fillText(toAlgNotation(i, j), i*squarewidth + 5, (j+1)*squareheight - 5);
		}
	}
}
//should be separated into separate file for organization
let positions = Array(8);
for (let i=0; i<8; i++) {
	positions[i] = Array(8);
	for (let j=0; j<8; j++) {
		positions[i][j] = "empty";
	}
}

//piece initialization
for (let i=0; i<8; i++) {
	positions[6][i] = "whitepawn";
}
positions[7][0] = "whiterook";
positions[7][7] = "whiterook";
positions[7][1] = "whiteknight";
positions[7][6] = "whiteknight";
positions[7][2] = "whitebishop";
positions[7][5] = "whitebishop";
positions[7][3] = "whiteking";
positions[7][4] = "whitequeen";

for (let i=0; i<8; i++) {
	positions[1][i] = "blackpawn";
}
positions[0][0] = "blackrook";
positions[0][7] = "blackrook";
positions[0][1] = "blackknight";
positions[0][6] = "blackknight";
positions[0][2] = "blackbishop";
positions[0][5] = "blackbishop";
positions[0][3] = "blackqueen";
positions[0][4] = "blackking";

///game logic (commands)
function submitCommand() {
	let commandbox = document.getElementById("commandbox");
	let command = commandbox.value;
	commandbox.value = "";
	//actual logic call

	let outputbox = document.getElementById("interpretedcommand");
	outputbox.innerHTML = returnStringCommand(command)
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
	else if (/^[abcdefgh]x[abcdefgh][0-8]\+?$/i) {
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

function drawImages() {
	//redraw board too
	for (let i=0; i<8; i++) {
		let xcoord = i * squarewidth;
		for (let j=0; j<8; j++) {
			let ycoord = j * squareheight;
			if (!(positions[j][j] === "empty")) {
				let filename = "images\\" + positions[j][i] + ".png";
				let image = new Image();
				image.src = filename;
				image.onload = function () {
					ctx.drawImage(image, xcoord, ycoord, squarewidth, squareheight);
				}
			} 
		}
	}
}

drawImages();
