from flask import Flask, current_app, request, send_from_directory

app = Flask(__name__)

@app.route('/')
def main_page():
	return current_app.send_static_file('chess.html')

@app.route('/<path:path>')
def send_statics(path):
	return send_from_directory('static', path)

@app.route('/images/<path:path>')
def serve_images(path):
	return send_from_directory('images', path)

if __name__ == "__main__":
	app.run(threaded=True)
