from apps.home import blueprint
from flask import render_template, request, jsonify
from flask_login import login_required
from jinja2 import TemplateNotFound
from flask_login import (
    current_user,
    login_required
)
from apps.home.dbfuncs import select_data, update_data, select_all_columns_with_condition, get_best_score_by_level
from apps.authentication.models import Users
from apps.authentication.util import hash_pass

from apps.home.dbfuncs import select_all_columns
from apps.home import dbfuncs

from flask_login import (
    current_user
)

# Helper - Extract current page name from request


def get_segment(request):

    try:

        segment = request.path.split('/')[-1]

        if segment == '':
            segment = 'index'

        return segment

    except:
        return None


@blueprint.route('/index')
@login_required
def index():

    return render_template('home/index.html', segment='index')


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
            data = select_data(table_name="users", filterBy=[
                               'username'], filterVal=[str(current_user)])
            # Detect the current page
            segment = get_segment(request)
            # Serve the file (if exists) from app/templates/home/FILE.html
            return render_template("home/" + template, segment=segment, data=data)

        elif template == 'levelselect.html':
            data = get_best_score_by_level("attempts", "level_id", "level_id")
            segment = get_segment(request)
            return render_template("home/" + template, segment=segment, data=data)

        # Detect the current page
        segment = get_segment(request)
        # Serve the file (if exists) from app/templates/home/FILE.html
        return render_template("home/" + template, segment=segment)

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


@blueprint.route('/game', methods=['GET', 'POST'])
def game():
    if request.method == "GET":
        return render_template('game/game.html')
    elif request.method == "POST":
        if(request.is_json):
            print(request.data)
            some = request.get_json()
            print(some)
            return jsonify({"msg": "Success"}), 200
        else:
            return jsonify({"msg": "Missing JSON in request"}), 400


@blueprint.route('/instructions')
def instructions():
    return render_template('home/instructions.html')


@blueprint.route('/custom_levels')
def custom_levels():
    return render_template('home/customlevels.html')


@blueprint.route('/attempt_history', methods=['GET', 'POST'])
def attempt_history():
    if request.method == "POST":
        level_id = request.form['level_id']
        level_type = request.form['level_type']

        mycursor = dbfuncs.mydb.cursor()
        print(level_id)
        if (level_id == "0"):
            sql = f"SELECT a.attempt_id, a.score, a.time_taken, a.energy_left, a.level_status, a.date, l.name, l.level_type, l.energy_level FROM levels l, attempts a WHERE a.level_id = l.level_id AND l.level_type = '{level_type}' AND a.uid = '{current_user.id}'"
        else:
            sql = f"SELECT a.attempt_id, a.score, a.time_taken, a.energy_left, a.level_status, a.date, l.name, l.level_type, l.energy_level FROM levels l, attempts a WHERE a.level_id = l.level_id AND l.level_type = '{level_type}' AND a.level_id = '{level_id}' AND a.uid = {current_user.id}"

        mycursor.execute(sql)
        level_attempts = mycursor.fetchall()

        return jsonify({'attempts': level_attempts})
    else:
        mycursor = dbfuncs.mydb.cursor()
        sql = f"SELECT a.attempt_id, a.score, a.time_taken, a.energy_left, a.level_status, a.date, l.name, l.level_type, l.energy_level FROM levels l, attempts a WHERE a.level_id = l.level_id AND l.level_type = 'custom' AND a.uid = {current_user.id}"
        mycursor.execute(sql)
        custom_level_attempts = mycursor.fetchall()

        sql = f"SELECT a.attempt_id, a.score, a.time_taken, a.energy_left, a.level_status, a.date, l.name, l.level_type, l.energy_level FROM levels l, attempts a WHERE a.level_id = l.level_id AND l.level_type = 'default' AND a.uid = {current_user.id}"
        mycursor.execute(sql)
        default_level_attempts = mycursor.fetchall()

        return render_template('home/attempthistory.html', custom_level_attempts=custom_level_attempts, default_level_attempts=default_level_attempts)


@blueprint.route('/get_levels', methods=['POST'])
def get_level_attempts():
    if request.method == "POST":
        level_type = request.form['level_type']

        mycursor = dbfuncs.mydb.cursor()
        sql = f"SELECT name, level_id FROM levels where level_type = '{level_type}'"
        mycursor.execute(sql)
        levels = mycursor.fetchall()

        return jsonify({'levels': levels})
