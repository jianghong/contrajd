from flask import Flask, request
import watson

try:
    from flask.ext.cors import CORS  # The typical way to import flask-cors
except ImportError:
    # Path hack allows examples to be run without installation.
    import os
    parentdir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    os.sys.path.insert(0, parentdir)

    from flask.ext.cors import CORS


app = Flask(__name__)
cors = CORS(app)

@app.route('/')
def hello_world():
    return 'Hello World!'

@app.route('/ask')
def post_question():
	question = request.args.get('q', '')
	resp = watson.ask_watson(question)
	return (resp)

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)

