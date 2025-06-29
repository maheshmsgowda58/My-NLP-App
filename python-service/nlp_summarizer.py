import re
from transformers import pipeline
from difflib import SequenceMatcher
from summarizer import Summarizer

summarizer_abstractive = pipeline("summarization", model="facebook/bart-large-cnn")

summarizer_extractive = Summarizer()


def get_length_params(length):
    if length == "short":
        return 60, 120
    elif length == "long":
        return 200, 360
    return 100, 240  


def get_num_sentences(length):
    if length == "short":
        return 2
    elif length == "long":
        return 6
    return 4


def is_similar(sent1, sent2, threshold=0.6):
    return SequenceMatcher(None, sent1.lower(), sent2.lower()).ratio() >= threshold


def clean_summary(raw_summary, input_text):
    cleaned = re.sub(r'(<n>|\n|\s{2,})', ' ', raw_summary).strip()
    summary_sentences = re.split(r'(?<=[.!?]) +', cleaned)
    input_sentences = re.split(r'(?<=[.!?]) +', input_text.strip())

    unique_sentences = []
    for sentence in summary_sentences:
        sentence = sentence.strip()
        if not sentence:
            continue

        
        if any(is_similar(sentence, seen) for seen in unique_sentences):
            continue

        
        if any(is_similar(sentence, original) for original in input_sentences):
            continue

        unique_sentences.append(sentence)

    return " ".join(unique_sentences)


def summarize_text(text, summary_type="abstractive", summary_length="medium"):
    try:
        if len(text.strip().split()) < 10:
            return {"summary": text.strip()}

        if len(text) > 1024:
            text = text[:1024]

        min_len, max_len = get_length_params(summary_length)

        if summary_type == "abstractive":
            result = summarizer_abstractive(text, max_length=max_len, min_length=min_len, do_sample=False)
            raw_summary = result[0]["summary_text"]
        elif summary_type == "extractive":
            num_sents = get_num_sentences(summary_length)
            raw_summary = summarizer_extractive(text, num_sentences=num_sents)
        else:
            return {"error": "Invalid summary_type. Choose 'abstractive' or 'extractive'."}

        final_summary = clean_summary(raw_summary, text)

        if not final_summary:
            final_summary = raw_summary.strip()

        return {"summary": final_summary}

    except Exception as e:
        return {"error": f"Summarization failed: {str(e)}"}
