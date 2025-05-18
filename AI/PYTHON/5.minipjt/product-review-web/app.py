from flask import Flask, render_template
from dotenv import load_dotenv
import os
from openai import OpenAI

# 1. Load environment variables from .env file
load_dotenv()

# 2. Set OpenAI API key (v1.0+)
llm = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# 3. Flask app setup
app = Flask(__name__, static_folder='public', template_folder='public')

# 4. Serve public/index.html at root
@app.route('/')
def home():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)