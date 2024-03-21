

from sys import argv
from flask import Flask, flash, redirect, render_template, request, session, abort
from model_api import *


app = Flask(__name__)
@app.route("/")
def blankPage():
    return ("running")

@app.route("/api/queryModel", methods=["POST"])
def queryModel(data):
  
  summary = callLarge(data)

  return summary






if __name__ == "__main__":
    app.run(host="localhost", port=5000)