from flask import Flask, render_template

#스태틱 폴더 옵션을 변경 가능.
#app = Flask(__name__, static_folder=None) 끄기
app = Flask(__name__, static_folder='static')

@app.route('/')
def home():
    return render_template('home.html', text = 'hello')


@app.route('/user')
def user():
    return render_template('user.html', text = '유우저엇')


if __name__ == '__main__':
    app.run(port=5000,debug=True)
