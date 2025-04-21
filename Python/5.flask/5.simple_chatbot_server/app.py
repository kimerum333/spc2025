import time
from flask import Flask,jsonify, url_for, request
from flask_cors import CORS

import random

app = Flask(__name__, static_folder='static')
CORS(app, origins=["http://localhost:3000"])
#올바르게 허용하는 방법은, 내가 아는 서버만 접속 가능하게 제한적으로 허용하는 것.

@app.route('/api/chat', methods=['GET','POST'])
def echo_chat():
    data = request.get_json()
    message = data.get('question')
    
    time.sleaep(1)
    answer = {
        "echo" : "Python: "+message,
        
    }

    return jsonify(answer)

if __name__ == '__main__':
    app.run(port=5000,debug=True)
    
