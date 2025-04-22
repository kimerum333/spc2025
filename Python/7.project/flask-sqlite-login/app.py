from flask import Flask,jsonify, url_for, request, send_file
import dao

app = Flask(__name__, static_folder='static')


@app.route('/', methods=['GET'])
def home():
    return send_file('static/index.html')

@app.route('/login', methods=['POST'])
def handle_login():
    username = request.form.get('username')
    password = request.form.get('password')
    
    count = dao.login(username,password)
    if count==0:
        return 'NO'
    else:
        return 'OK'    

if __name__ == '__main__':
    app.run(port=3000,debug=True)
    
