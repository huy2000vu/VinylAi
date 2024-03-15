from flask import Flask, render_template, jsonify
from getimage import search_file

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('home.html')


@app.route('/get_random_image')
def get_random_image(genre):
    image_id = search_file(genre)
    image_url = f"https://drive.google.com/thumbnail?id={image_id}&sz=w500"
    return jsonify({"image_url": image_url})



if __name__ == '__main__':
    app.run(debug=True)