# Chess

This is a personal implementation of the game of chess. It's mostly for me to play around with JavaScript, plus a little bit of AI/logic stuff.

## Application Structure

The general structure of this application is as follows: the frontend is Javascript/jQuery which handles all UI stuff and some basic logic (so, for example, a user doesn't try to make an invalid move and then have to wait for the server to tell them it's invalid). The backend is in python, using Flask for a relatively simple server structure. The flask server maintains the user's gamestate in a session variable, allowing multiple users to use this web app at once. When the server gets a move command from the UI, it passes it to an executable and gets the result, sending back the result.
This application is purposefully structured so that it would be at least somewhat scalable/deployable (at least in theory), hence the use of some client-side logic checks and the use of sessions in the flask server.

## AI Component

The intention of the application structure is to be able to pass a gamestate into the executable and have it return a move, eventually hopefully a good move that is strategically sound.

## Reference Materials

https://en.wikipedia.org/wiki/Algebraic_notation_(chess)  
https://chess.stackexchange.com/questions/1817/how-are-pgn-ambiguities-handled  
https://en.wikipedia.org/wiki/Minimax