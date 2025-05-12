# app.py

from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline
from huggingface_hub import login
from dotenv import load_dotenv
from flask import Flask, request, jsonify
import os

def create_app():
    # Load environment variables
    load_dotenv(dotenv_path='../.env')

    # Hugging Face login
    login(token=os.getenv('HF_LOGIN_KEY'))

    # Model setup
    model_name = 'gpt2'
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    model = AutoModelForCausalLM.from_pretrained(model_name, torch_dtype="auto")

    # Pipeline
    generator = pipeline(
        "text-generation",
        model=model,
        tokenizer=tokenizer,
        temperature=0.7,
        max_new_tokens=128,
        pad_token_id=tokenizer.eos_token_id,
        do_sample=True,
        top_k=50,
        top_p=0.95,
        repetition_penalty=1.2,
        no_repeat_ngram_size=3
    )

    # Create Flask app
    app = Flask(__name__)

    @app.route("/generate", methods=["POST"])
    def generate():
        data = request.json
        prompt = data.get("prompt", "").strip()
        if not prompt:
            return jsonify({"error": "프롬프트를 입력하세요"}), 400
        result = generator(prompt)
        return jsonify({"response": result[0]["generated_text"]})

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(port=5000)
