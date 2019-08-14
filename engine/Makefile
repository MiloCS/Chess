CC = gcc
CFLAGS = -g -Wall

default: game
	
game: game.o
	$(CC) $(CFLAGS) -o game game.o

game.o: game.c
	$(CC) $(CFLAGS) -c game.c

clean:
	$(RM) game *.o ~