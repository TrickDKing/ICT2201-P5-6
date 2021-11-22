from flask import Flask, jsonify, request, render_template, url_for, send_from_directory
from flask_mysqldb import MySQL
from flask_cors import CORS
import sys
#from flask_bootstrap import Bootstrap


# Create an application instance
app = Flask(__name__)
CORS(app)

app.config['MYSQL_HOST'] = '172.24.117.56'
app.config['MYSQL_USER'] = 'monty'
app.config['MYSQL_PASSWORD'] = 'Password123!'
app.config['MYSQL_DB'] = 'SIT'

mysql = MySQL(app)

# Define a route to fetch the avaialable articles


@app.route("/allarticles", methods=["GET"], strict_slashes=False)
def articles():
    if request.method == "GET":
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM SIT.users")
        columns = cur.description
        result = [{columns[index][0]:column for index,
                   column in enumerate(value)} for value in cur.fetchall()]
        mysql.connection.commit()
        cur.close()
        return jsonify(result)


@app.route("/articles", methods=["GET"], strict_slashes=False)
def homee():
    if request.method == "GET":
        return("HELLO")


@app.route('/', methods=["GET", "POST"])
def home():
    if request.method == "GET":
        return render_template('home.html')
    elif request.method == "POST":
        if(request.is_json):
            print(request.data)
            some = request.get_json()
            print(some)
            return jsonify({"msg": "Success"}), 200
        else:
            return jsonify({"msg": "Missing JSON in request"}), 400



@app.route('/static/<path:path>')
def send_static(path):
    return send_from_directory('static', path)

# def articles():
# 	if request.method == "POST":
# 		details = request.form
# 		firstName = details['fname']
# 		lastName = details['lname']
# 		cur = mysql.connection.cursor()
# 		result = cur.execute("INSERT INTO MyUsers(firstName, lastName) VALUES (%s, %s)", (firstName, lastName))
# 		mysql.connection.commit()
# 		cur.close()
# 		return jsonify(result)


if __name__ == "__main__":
    app.run(debug=True)
