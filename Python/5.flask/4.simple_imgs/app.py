from flask import Flask,jsonify, url_for
from flask_cors import CORS

import random

app = Flask(__name__, static_folder='static')
CORS(app, origins=["http://localhost:3000"])
#올바르게 허용하는 방법은, 내가 아는 서버만 접속 가능하게 제한적으로 허용하는 것.

cat_images = [
    "cat1.jpg",
    "cat2.webp",
    "cat3.webp",

]

@app.route('/random-cat')
def random_cat():
    random_image = random.choice(cat_images)
    #image_url = 'static/'+random_image
    image_url = url_for('static',filename = f'images/{random_image}', _external = True)
    print(image_url)

    return jsonify({"url" : image_url})

if __name__ == '__main__':
    app.run(port=5000,debug=True)
