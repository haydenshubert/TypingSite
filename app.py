from flask import Flask, render_template, request, jsonify, Response
import requests

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

session = requests.Session()
OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL = "llama3.2"

@app.route('/ask', methods=['POST'])
def ask_ollama():
    prompt = request.json.get("prompt", "")
    res = session.post(OLLAMA_URL, json={
        "model": MODEL,
        "prompt": prompt,
        "stream": False
    })
    if res.ok:
        return jsonify({"response": res.json()["response"]})
    else:
        return jsonify({"error": res.text}), res.status_code