from flask import Flask, render_template, request

app = Flask(__name__)   # telling flask to create an app that starts here


# this is a route decorator that tells flask when someone visites the root URL (/) run the function below
# also allows both GET and POST HTTP methods
@app.route('/', methods=['GET', 'POST'])
def index():
    message = ""    # initialize message to be empty
    if request.method == 'POST':
        name = request.form['name']     # access the form input the user submitted
        message = f"Hello {name}, the message worked!"      # this uses and f-string (formatted string)
    return render_template('index.html', message=message)


if __name__ == '__main__':
    app.run(debug=True)     # this starts the development server

# run it with ``python app.py``
# go to the provided server to test it