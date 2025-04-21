from flask import Flask, render_template

app = Flask(__name__)

users = ['Alice', 'Bob', 'Chalie', 'David', 'Eve']

@app.route('/')
def home():
    return render_template('index.html', name='john')
    # return send_from_directory('index.html')

@app.route('/users')
def get_users():
    return render_template('users.html', users=users)
    # return send_from_directory('index.html')

if __name__ == '__main__':
    app.run(port=3000,host='0.0.0.0', debug=True)