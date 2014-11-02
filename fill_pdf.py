from fdfgen import forge_fdf
import subprocess
import sys
import re

fdf_dir = "/tmp/fdf/"
form_dir = "/tmp/form/"
out_dir = "/tmp/pdf/"

BUCKET_NAME = 'filledforms'
AWS_ACCESS_KEY_ID = "AKIAIL4Q6NNURD5OVDIQ"
AWS_SECRET_ACCESS_KEY = "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"

# create the fdf with the data in the form
# return the location of the fdf
def create_fdf(request):
	fdf_file_name = fdf_dir + "data.fdf"
	fields = generate_fields(request)
	fdf = forge_fdf("",fields,[],[],[])
	fdf_file = open(fdf_dir + "data.fdf","w")
	fdf_file.write(fdf)
	fdf_file.close()
	return fdf_file_name
	
#TODO map the rest of the variables
def generate_fields(request):
	fields = []
	fields.append(('IMM_5406[0].#subform[0].TextField[0]', request.form['applicant_name']))
	return fields


# merge the fdf with the form
def create_pdf(request):
	form = form_dir + "IMM5406E.pdf" #hardcode for now
	output_file = out_dir + "filled_form.pdf" # same here
	fdf_file = create_fdf(request)

	command = 'pdftk {0} fill_form {1} output {2}'.format(form, fdf_file, output_file)
	print command
	subprocess.call(command.split(), shell=False)

	s3_url = send_to_s3(output_file)
	return s3_url

def send_to_s3(output_file):
	#try:
	import boto
	from boto.s3.key import Key
	import logging

	# set boto lib debug to critical
	logging.getLogger('boto').setLevel(logging.CRITICAL)
	bucket_name = BUCKET_NAME
	# connect to the bucket
	conn = boto.connect_s3(AWS_ACCESS_KEY_ID,
	                AWS_SECRET_ACCESS_KEY)
	bucket = conn.get_bucket(bucket_name)
	# go through each version of the file
	key = 'filled_form.pdf'
	fn = output_file
	# create a key to keep track of our file in the storage 
	k = Key(bucket)
	k.key = key
	k.set_contents_from_filename(fn)
	# we need to make it public so it can be accessed publicly
	# using a URL like http://s3.amazonaws.com/bucket_name/key
	k.make_public()
	return "http://s3-us-west-2.amazonaws.com/{0}/{1}".format(BUCKET_NAME, key)
	# except:
	# 	return "failed to upload to s3"
