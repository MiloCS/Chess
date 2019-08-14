#include <stdio.h>
#include <stdlib.h>

#define BLANK 0
#define PAWN 1
#define ROOK 2
#define KNIGHT 3
#define BISHOP 4
#define QUEEN 5
#define KING 6

#define BLACK -10
#define WHITE 10

#define SIDELENGTH 8

typedef struct pair {
	int x, y;
} pair;

typedef struct move {
	pair start, end;
} move;

// int *get_squares_in_the_way(pair source, pair dest) {
// 	//dynamically allocate in here or fill preallocated buffer
// 	int x = 10;
// 	return &x;
// }

int diff(int a, int b) {
	return abs(a - b);
}

int is_valid_pawn_move(pair source, pair dest) {
	return 0;
}

int is_valid_bishop_move(pair source, pair dest) {
	if (diff(source.x, dest.x) == diff(source.y, dest.y)) {
		return 1;
	}
	return 0;
}

int is_valid_knight_move(pair source, pair dest) {
	int diffx = diff(source.x, dest.x);
	int diffy = diff(source.y, dest.y);

	if ((diffx == 2 && diffy == 1) || (diffx == 1 && diffy == 2)) {
		return 1;
	}
	return 0;
}

int is_valid_rook_move(pair source, pair dest) {
	int diffx = diff(source.x, dest.x);
	int diffy = diff(source.y, dest.y);

	if (diffx == 0 || diffy == 0) {
		return 1;
	}
	return 0;
}

int is_valid_queen_move(pair source, pair dest) {
	return (is_valid_bishop_move(source, dest) || is_valid_rook_move(source, dest));
}

int is_valid_king_move(pair source, pair dest) {
	int diffx = diff(source.x, dest.x);
	int diffy = diff(source.y, dest.y);

	return (diffx <= 1 && diffy <=1);
}

int validate_move(int type, pair source, pair dest) {
	//if it puts the king in check, return false
	//find piece type
	//check if it is a valid move for that piece type
	//check if there are no pieces in the way and that if there is a piece on dest, it is opposite color
	if (type == BLANK) {
		return -1;
	}
	else if (type == PAWN) {
		return 0;
	}
	return 0;
}

void generate_moves_for_piece(pair piece) {
	printf("%d\n%d\n", piece.x, piece.y);
}

void generate_moves(int **board, int color) {
	for (int i=0; i<SIDELENGTH; i++){
		for (int j=0; j<SIDELENGTH; j++) {
			printf("%d\n", board[i][j]);
		}
		printf("\n");
	}
}

int main() {
	pair test;
	test.x = 5;
	test.y = 4;
	int **board = malloc(SIDELENGTH * sizeof(int**));
	for (int i=0; i<SIDELENGTH; i++) {
		board[i] = malloc(SIDELENGTH * sizeof(int*));
	}

	for (int i=0; i<SIDELENGTH; i++){
		for (int j=0; j<SIDELENGTH; j++) {
			board[i][j] = 0;
		}
	}

	board[0][0] = 5;
	//printf("%d\n", board[0][0]);

	generate_moves(board, 10);
}

