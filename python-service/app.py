# my-nlp-app/python-service/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from translator import translate_text
from nlp_summarizer import summarize_text

app = Flask(__name__)
CORS(app)

@app.route("/summarize", methods=["POST"])
def summarize():
    data = request.get_json()
    input_text = data.get("text") or data.get("inputText")
    summary_type = data.get("summary_type") or data.get("summaryType", "abstractive")
    summary_length = data.get("summary_length") or data.get("summaryLength", "medium")  # New

    if not input_text:
        return jsonify({"error": "Input text is required"}), 400

    result = summarize_text(input_text, summary_type, summary_length)
    return jsonify(result), 200 if "summary" in result else 400

@app.route("/translate", methods=["POST"])
def translate():
    data = request.get_json()
    text = data.get("text") or data.get("inputText")
    source_lang = data.get("source_lang") or data.get("inputLanguage", "en")
    target_lang = data.get("target_lang") or data.get("outputLanguage", "kn")

    if not text:
        return jsonify({"error": "Input text is required"}), 400

    try:
        translated = translate_text(text, source_lang, target_lang)
        return jsonify({"translatedText": translated})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
