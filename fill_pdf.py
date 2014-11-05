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

	#applicant
	if request.form.get('applicant_name'):
		fields.append(('IMM_5406[0].#subform[0].TextField[0]', request.form['applicant_name']))
		fields.append(('IMM_5406[0].#subform[0].dob[0]', request.form['applicant_dob']))
	 	fields.append(('IMM_5406[0].#subform[0].TextField[1]', request.form['applicant_pob']))
	 	fields.append(('IMM_5406[0].#subform[0].TextField[2]', request.form['applicant_marital']))
	 	fields.append(('IMM_5406[0].#subform[0].TextField[3]', request.form['applicant_address']))

	#spouse
	if request.form.get('spouse_name'):
		fields.append(('IMM_5406[0].#subform[0].TextField[4]', request.form['spouse_name']))
		fields.append(('IMM_5406[0].#subform[0].dob[1]', request.form['spouse_dob']))
		fields.append(('IMM_5406[0].#subform[0].TextField[5]', request.form['spouse_pob']))
		fields.append(('IMM_5406[0].#subform[0].TextField[6]', request.form['spouse_marital']))
		fields.append(('IMM_5406[0].#subform[0].TextField[7]', request.form['spouse_address']))
		fields.append(('IMM_5406[0].#subform[0].TextField[8]', request.form['spouse_email']))

	#mother
	if request.form.get('mother_name'):
		fields.append(('IMM_5406[0].#subform[0].TextField[9]', request.form['mother_name']))
		fields.append(('IMM_5406[0].#subform[0].dob[2]', request.form['mother_dob']))
		fields.append(('IMM_5406[0].#subform[0].TextField[12]', request.form['mother_pob']))
		fields.append(('IMM_5406[0].#subform[0].TextField[11]', request.form['mother_marital']))
		fields.append(('IMM_5406[0].#subform[0].TextField[10]', request.form['mother_address']))

	#father
	if request.form.get('father_name'):
		fields.append(('IMM_5406[0].#subform[0].TextField[13]', request.form['father_name']))
		fields.append(('IMM_5406[0].#subform[0].dob[3]', request.form['father_dob']))
		fields.append(('IMM_5406[0].#subform[0].TextField[16]', request.form['father_pob']))
		fields.append(('IMM_5406[0].#subform[0].TextField[15]', request.form['father_marital']))
		fields.append(('IMM_5406[0].#subform[0].TextField[14]', request.form['father_address']))

	#children
	if request.form.get('child_name'):
		fields.append(('IMM_5406[0].#subform[0].TextField[17]', request.form['child_name']))
		fields.append(('IMM_5406[0].#subform[0].TextField[18]', request.form['child_relationship']))
		fields.append(('IMM_5406[0].#subform[0].TextField[19]', request.form['child_pob']))
		fields.append(('IMM_5406[0].#subform[0].dob[4]', request.form['child_dob']))
		fields.append(('IMM_5406[0].#subform[0].TextField[20]', request.form['child_marital']))
		fields.append(('IMM_5406[0].#subform[0].TextField[21]', request.form['child_address']))
		fields.append(('IMM_5406[0].#subform[0].TextField[62]', request.form['child_email']))
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
