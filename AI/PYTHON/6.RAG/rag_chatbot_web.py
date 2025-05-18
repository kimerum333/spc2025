from flask import Flask, render_template, request, jsonify
from werkzeug.utils import secure_filename
import os

from rag_chatbot_rag import ingest_file, get_answer

app = Flask(__name__)
UPLOAD_FOLDER = "./uploaded_docs"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/", methods=["GET"])
def index():
    return render_template("index.html")


@app.route("/upload", methods=["POST"])
def upload_file():
    file = request.files.get("file")
    if not file:
        return "파일이 없습니다.", 400

    filename = secure_filename(file.filename)
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    file.save(filepath)

    try:
        ingest_file(filepath)
        return f"{filename} 업로드 및 처리 완료"
    except Exception as e:
        return f"처리 중 오류 발생: {str(e)}", 500


@app.route("/ask", methods=["POST"])
def ask_question():
    data = request.get_json()
    question = data.get("question", "")
    if not question:
        return jsonify({"answer": "질문이 비어 있습니다."}), 400

    try:
        answer = get_answer(question)
        return jsonify({"answer": answer})
    except Exception as e:
        return jsonify({"answer": f"오류 발생: {str(e)}"}), 500


if __name__ == "__main__":
    app.run(debug=True)
