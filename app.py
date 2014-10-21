from flask import Flask, request
import watson

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello World!'

@app.route('/ask')
def post_question():
	question = request.args.get('q', '')
	resp = watson.ask_watson(question)
	return (resp)

if __name__ == '__main__':
    app.run(debug=True)

