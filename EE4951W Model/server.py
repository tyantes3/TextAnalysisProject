

from sys import argv
from flask import Flask, flash, redirect, render_template, request, session, abort, jsonify
from flask_cors import CORS, cross_origin
from model_api import *


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
  
  summary = callLarge(input_data['model'], input_data['modelInputType'], input_data['modelSelector'])
  print(summary)
  # return summary
  return jsonify({"summary": summary})






if __name__ == "__main__":
    app.run(host="localhost", port=5000)