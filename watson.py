import requests
import json

watson_url = "https://watson-wdc01.ihost.com/instance/507/deepqa/v1/question"
def ask_watson(question):
	payload = {"question": {"questionText": question} }
	headers = {'Content-Type': 'application/json', 'Accept': 'application/json', 'X-SyncTimeout': 30, 'Authorization' : 'Basic dXRfc3R1ZGVudDU6OUp3WGFjUEg='}
	r = requests.post(watson_url, params=payload)

	return testing


