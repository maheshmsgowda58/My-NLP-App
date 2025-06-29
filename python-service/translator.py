from flask import Flask, request, jsonify
from transformers import pipeline
from googletrans import Translator
import logging

app = Flask(__name__)

DEFAULT_SOURCE_LANG = "en"
DEFAULT_TARGET_LANG = "kn"

# Updated: Use fallback multilingual Hugging Face model
FALLBACK_MODEL = "Helsinki-NLP/opus-mt-en-mul"

def translate_using_huggingface(text, source_lang, target_lang):
    try:
        # Multilingual model for most Indian and low-resource languages
        model_name = FALLBACK_MODEL
        logging.info(f"Using Hugging Face model: {model_name}")
        translator = pipeline("translation", model=model_name)
        result = translator(text, max_length=512)
        return result[0]['translation_text']
    except Exception as e:
        logging.error(f"Hugging Face translation error: {e}")
        return None

def translate_using_google(text, source_lang, target_lang):
    try:
        translator = Translator()
        translated = translator.translate(text, src=source_lang, dest=target_lang)
        return translated.text
    except Exception as e:
        logging.error(f"Google Translate error from {source_lang} to {target_lang}: {e}")
        return None

def translate_text(text, source_lang=None, target_lang=None):
    source_lang = source_lang or DEFAULT_SOURCE_LANG
    target_lang = target_lang or DEFAULT_TARGET_LANG

    logging.info(f"Translating from {source_lang} to {target_lang}: {text}")

    translated_text = translate_using_google(text, source_lang, target_lang)

    # If Google fails or returns empty
    if not translated_text or "Error" in str(translated_text) or translated_text is None:
        translated_text = translate_using_huggingface(text, source_lang, target_lang)

    return translated_text or "Translation failed"

@app.route('/translate', methods=['POST'])
def handle_translation():
    data = request.get_json()
    input_text = data.get('inputText')
    input_lang = data.get('inputLanguage')
    output_lang = data.get('outputLanguage')

    if not input_text:
        return jsonify({"error": "No input text provided"}), 400

    translated = translate_text(input_text, input_lang, output_lang)

    if translated:
        return jsonify({"outputText": translated}), 200
    else:
        return jsonify({"error": "Translation failed"}), 500

if __name__ == '__main__':
    app.run(debug=True)
