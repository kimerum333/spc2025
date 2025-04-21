from flask import Flask, request, redirect, render_template, url_for

#스태틱 폴더 옵션을 변경 가능.
#app = Flask(__name__, static_folder=None) 끄기
app = Flask(__name__, static_folder='static')

@app.route('/')
def home():
    return render_template('index.html')


@app.route('/login',methods=['GET','POST'])
def login():
    if request.method == "POST":
        user = request.form['name']
        print(f"입력값 : {user}")
        return redirect(url_for("user", user = user))
    else:
        return render_template('login.html')

@app.route('/user')
@app.route('/user/<user>')  
def user(user=None):
    return render_template('user.html', user=user)


if __name__ == '__main__':
    app.run(port=5000,debug=True)
