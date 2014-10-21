import base64
import requests
import json

watson_url = "https://watson-wdc01.ihost.com/instance/507/deepqa/v1/question"
username ="ut_student1"
password = "Q72lSnoC"
def ask_watson(question):
	base64string = base64.encodestring(
                "%s:%s" % (username, password))[:-1]
	authheader =  "Basic %s" % base64string
	payload = {"question": {"questionText": question} }
	headers = {"Content-Type": "application/json", "Accept": "application/json", "X-SyncTimeout": 30}

	r = requests.post(watson_url, auth=(username, password), headers=headers, json=payload)

	return r.content