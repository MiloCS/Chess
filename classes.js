class Pair {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}

class Piece {
	constructor(color, name) {
		this.filename = "images\\" color + name + ".png";
		this.hasMoved = false;
	}

	isValidMove(place1, place2) {
		return true;
	}
}

class Queen extends Piece {
	constructor(color) {
		this.color = color;
		this.name = 'queen';
		this.filename = "images\\" color + name + ".png";
		this.hasMoved = false;
	}

	isValidMove(place1, place2) {
		return true;
	}
}

class King extends Piece {

}

class Bishop extends Piece {

}

class Knight extends Piece {

}

class Rook extends Piece {

}

class Pawn extends Piece {

}

let myqueen = new Queen('black','queen')