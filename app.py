## To run the server type: `flask run` ##
from flask import Flask, render_template, request, jsonify, Response
import requests

app = Flask(__name__)   # telling flask to create an app that starts here

@app.route('/')     # opens index.html when server is live
def home():
    return render_template('index.html')

session = requests.Session()    # this creates a session so TCP connection is reused
OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL = "llama3.2"

@app.route('/ask', methods=['POST'])    # when a request is sent to '/ask' the ask_ollama function is triggered
def ask_ollama():
    prompt = request.json.get("prompt", "") # gers prompt value from JSON body of request, defaults to ""
    res = session.post(OLLAMA_URL, json={   # sends a post request to Ollama's API
        "model": MODEL,
        "prompt": prompt,
        "stream": False
    })
    if res.ok:  # is Ture if HTTP status code is 200-299
        return jsonify({"response": res.json()["response"]})    # response fiedl from Ollama is returned in a proper JSON response
    else:
        return jsonify({"error": res.text}), res.status_code    # if request failed, it returns error message and status code to the client