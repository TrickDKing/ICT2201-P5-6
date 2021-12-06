from apps.home import blueprint
from flask import json, render_template, request, jsonify
from flask_login import login_required
from jinja2 import TemplateNotFound
from flask_login import (
    current_user,
    login_required
)
from apps.home import dbfuncs
from apps.home.dbfuncs import select_data, update_data, select_all_columns_with_condition, get_best_score_by_level, select_level
from apps.authentication.models import Users
from apps.authentication.util import hash_pass
from apps.home.commands import Commands

import operator

# Helper - Extract current page name from request

# Initializes a new commands object to handle post and get requests between game and car
commands = Commands()


def get_segment(request):

    try:
        segment = request.path.split('/')[-1]

        if segment == '':
            segment = 'index'

        return segment

    except:
        return None


@blueprint.route('/index/<level_id>', methods=['GET', 'POST'])
@login_required
def index(level_id):
    if request.method == "GET":
        return render_template('home/index.html', segment='index', level_id=level_id)
    elif request.method == "POST":
        if(request.is_json):
            print(request.data)
            some = request.get_json()
            print(some)
            return jsonify({"msg": "Success"}), 200
        else:
            return jsonify({"msg": "Missing JSON in request"}), 400


@blueprint.route('/game', methods=['GET', 'POST'])
def game():
    if request.method == "GET":
        return render_template('home/index.html')
    elif request.method == "POST":
        if(request.is_json):
            # print(request.data)
            some = request.get_json()
            # print(some)
            return jsonify({"msg": "Success"}), 200
        else:
            return jsonify({"msg": "Missing JSON in request"}), 400


@blueprint.route('/gameLeaderboard', methods=['GET', 'POST'])
def gameLeaderboard():
    if request.method == "POST":
        level_id = request.form['level_id']
        mycursor = dbfuncs.cursor
        sql = f"SELECT users.name, attempts.score FROM users, attempts WHERE users.id = attempts.uid AND level_id = '{level_id}'"
        mycursor.execute(sql)
        
        attempts = mycursor.fetchall()
        return jsonify({"msg": "leaderboard loaded!", "attempts": attempts})
    elif request.method == "POST":
        
        return jsonify({"msg": "Missing JSON in request"}), 400


@blueprint.route('/gameMaps', methods=['GET', 'POST'])
def maps():
    '''Route to get game maps from database'''
    if request.method == "GET":
        print(request.data)
        mapData = select_level(1)
        print(mapData)
        return mapData
    if request.method == "POST":

        print(type(request.data))
        mapData = select_level(1)
        print(mapData)
        return jsonify(mapData)
    return jsonify("A")

@blueprint.route('/commands', methods=['GET', 'POST'])
def sendCommands():
    print(request.headers['Sec-Ch-Ua-Platform'])
   # if(request.headers['Sec-Ch-Ua-Platform'] == "Windows"):

    if request.method == "GET":
        return commands.getCommands()
    if request.method == "POST":
        if(request.is_json):
            print(request.data)
            commands.setCommands(request.data)
        return jsonify("Something")


@blueprint.route('/<template>')
@login_required
def route_template(template):

    try:

        if not template.endswith('.html'):
            template += '.html'

        if template == 'profile.html':
            data = select_data(table_name="users", filterBy=[
                               'username'], filterVal=[str(current_user)])

        elif template == 'scoreboard.html':  # MUST INCLUDE THIS TO WORK, BECAUSE DATA IS ABSENT EN DING PART
            # data = select_all_columns_with_condition("highScore","totalScore")
            data = select_all_columns_with_condition("attempts", "score")
            segment = get_segment(request)
            return render_template("home/" + template, segment=segment, data=data)

        elif template == 'instructions.html':
             data = select_data(table_name="users", filterBy=['username'], filterVal=[str(current_user)])
             # Detect the current page
             segment = get_segment(request)
             # Serve the file (if exists) from app/templates/home/FILE.html
             return render_template("home/" + template, segment=segment, data=data)
        

        elif template == 'levelselect.html':                    
            data = get_best_score_by_level("attempts","level_id","level_id")
            segment = get_segment(request)
            return render_template("home/" + template, segment=segment, data=data)
        
        # Detect the current page
        segment = get_segment(request)
        # Serve the file (if exists) from app/templates/home/FILE.html
        return render_template("home/" + template, segment=segment, data=data)

    except TemplateNotFound:
        return render_template('home/page-404.html'), 404

    except:
        return render_template('home/page-500.html'), 500


@blueprint.route('/updateprofile', methods=['POST'])
@login_required
def saveDetails():
    print("Updating profile...")
    if request.method == 'POST':

        userexist = Users.query.filter_by(
            username=request.form['username']).first()

        data = {
            "name": str(request.form['name'])
        }

        if request.form['username'] == str(current_user):

            if request.form['password']:
                password = str(request.form['password'])
                passhash = str(hash_pass(password)).split("'")[1]

                data["password"] = passhash

            update_data(table_name="users", data=data,
                        identifier="username", identifier_value=str(current_user))

            result = "Profile updated successfully!"

        elif not userexist:

            data["username"] = str(request.form['username'])

            if request.form['password']:
                password = str(request.form['password'])
                passhash = str(hash_pass(password)).split("'")[1]

                data["password"] = passhash

            update_data(table_name="users", data=data,
                        identifier="username", identifier_value=str(current_user))

            result = "Profile updated successfully!"

            data = select_data(table_name="users", filterBy=['username'], filterVal=[
                               str(request.form['username'])])
            return render_template('home/profile.html', data=data)

        else:
            result = "Username exists"

        print(result)
        data = select_data(table_name="users", filterBy=[
                           'username'], filterVal=[str(current_user)])
        return render_template('home/profile.html', data=data)
