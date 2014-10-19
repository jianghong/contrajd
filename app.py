from flask import Flask, request
import watson

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello World!'

@app.route('/ask')
def post_question():
	question = request.args.get('q', '')
	return watson.ask_watson(question)

if __name__ == '__main__':
    app.run(host='0.0.0.0',debug=True)

