from flask import Flask, current_app, request, send_from_directory, session
import json
import os

app = Flask(__name__)

#for encrypting user sessions
app.secret_key = os.urandom(16)

####
#this section is for serving the actual page files
@app.route('/')
def main_page():
	if 'data' not in session:
		print('data not in session yet')
		session['data'] = 1
	else:
		print('data already in session')
	return current_app.send_static_file('chess.html')

@app.route('/static/<path:path>')
def send_statics(path):
	return send_from_directory('static', path)

@app.route('/images/<path:path>')
def serve_images(path):
	return send_from_directory('images', path)

####
#testing session routing
@app.route('/sessionid')
def ses_id():
	if 'data' not in session:
		print('session retrieval failure')
		return 'fail'
	return str(session['data'])

@app.route('/inc')
def inc():
	if 'data' not in session:
		print('session retrival failure')
		return 'fail'
	session['data'] += 1
	return str(session['data'])

####
#this section is for handling api requests like new game and makemove
@app.route('/newgame')
def new_game():
	#implement this once sessions are implemented
	return 'success'

if __name__ == "__main__":
	app.run(threaded=True)
