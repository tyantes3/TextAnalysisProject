

from sys import argv
from flask import Flask, flash, redirect, render_template, request, session, abort, jsonify
from flask_cors import CORS, cross_origin
from model_api import *
import json


app = Flask(__name__)
CORS(app, support_credentials=True)
@app.route("/")
def blankPage():
  
    return ("running")

@app.route("/api/queryModel", methods=["POST"])
@cross_origin(supports_credentials=True)
def queryModel():
  
  input_data = request.get_json()
  print(input_data)
  print(input_data['modelInputType'])
  print(input_data['modelSelector'])  
  print(input_data['NER'])
  # if(input_data["modelSelector"] != "NER"):
  #   summary = callLarge(input_data['model'], input_data['modelInputType'], input_data['modelSelector'])
  #   print(summary)
  #   # return summary
  #   return jsonify({"summary": summary})
  # else:
  NER_summary = callLarge(input_data['model'], input_data['modelInputType'], input_data['modelSelector'], input_data['NER'])
  print(NER_summary)
  json_response = json.dumps({
  "Summary": NER_summary['summary'],
  "People": NER_summary['people'],
  'Facilities': NER_summary['fac'],
  'Dates': NER_summary['date'],
  'Geopolitical Entities': NER_summary['gpe']
  }, indent=2)
  return json_response





if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)