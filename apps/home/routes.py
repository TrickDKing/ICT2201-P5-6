from apps.home import blueprint
from flask import render_template, request
from flask_login import login_required
from jinja2 import TemplateNotFound
from flask_login import (
    current_user,
    login_required
)
from apps.home.dbfuncs import select_data, update_data, select_all_columns_with_condition, get_best_score_by_level
from apps.authentication.models import Users
from apps.authentication.util import hash_pass
from operator import itemgetter
from itertools import groupby

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
            #data = select_all_columns_with_condition("highScore","totalScore")
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
            data = get_best_score_by_level("attempts","level_id","level_id")
            attempts = select_data(table_name="attempts")
            # print(attempts)
            # attempts = sorted(attempts, key=itemgetter('level_id'))
            # Display data grouped by grade
            # level_attempts = {"1": [],"2": [],"3": [],"4": [],"5": [], "6": [],"7": [],"8": [],"9": []}
            # for key, value in groupby(attempts, key=itemgetter('level_id')):
            #     print(key)
            #     for k in value:
            #         print(k)
            segment = get_segment(request)
            return render_template("home/" + template, segment=segment, data=data)
        # SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));
        # Whenever the groupby or complicated sql statements fail, execute this to allow nonaggregate queries

        elif template == 'attempthistory.html':
            data = select_all_columns_with_condition("attempts", "attempt_id")
            segment = get_segment(request)
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


@blueprint.route('/settings', methods=['GET', 'POST'])
@login_required
def saveSettings():
    # speed = request.form['speed']
    print("Updating profile...")
    if request.method == 'POST':
        data = {
            "speed": request.form['speed']
        }
        print(data)
        if request.form['speed']:
            update_data(table_name="Settings", data=data,
                        identifier="settings_id", identifier_value="1")

            result = "Speed updated successfully!"
        else:
            result = "Updating failed"

        return render_template('home/settings.html')
    else:
        settings = select_data(table_name="Settings")
        return render_template('home/settings.html', speed=settings[0]["speed"])
