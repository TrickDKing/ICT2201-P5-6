from apps.home import blueprint
from flask import render_template, request, jsonify
from flask_login import login_required
from jinja2 import TemplateNotFound

from apps.home.dbfuncs import select_all_columns


@blueprint.route('/index')
@login_required
def index():

    return render_template('home/index.html', segment='index')


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


@blueprint.route('/gameData', methods=['GET', 'POST'])
def gameLeaderboard():
    if request.method == "GET":
        str = [{"id": 1, "name": "Sloane", "email": "sloveridge0@aol.com", "score": 22},
               {"id": 2, "name": "Orv Heskins", "slack_name": "Orv",
                   "email": "oheskins1@fotki.com", "score": 2},
               {"id": 3, "name": "Nadya McBeath", "slack_name": "Nadya",
                   "email": "nmcbeath2@google.it", "score": 25},
               {"id": 4, "name": "Nadya McBeath", "slack_name": "Nadya",
                   "email": "nmcbeath2@google.it", "score": 25},

               {"id": 5, "name": "Nadya McBeath", "slack_name": "Nadya",
                   "email": "nmcbeath2@google.it", "score": 25}]
        return jsonify(str), 200
    elif request.method == "POST":
        return jsonify({"msg": "Missing JSON in request"}), 400


@blueprint.route('/<template>')
@login_required
def route_template(template):

    try:

        if not template.endswith('.html'):
            template += '.html'

        if template == 'profile.html':
            data = select_all_columns("users")

        # Detect the current page
        segment = get_segment(request)

        # Serve the file (if exists) from app/templates/home/FILE.html
        return render_template("home/" + template, segment=segment, data=data)

    except TemplateNotFound:
        return render_template('home/page-404.html'), 404

    except:
        return render_template('home/page-500.html'), 500


# Helper - Extract current page name from request
def get_segment(request):

    try:

        segment = request.path.split('/')[-1]

        if segment == '':
            segment = 'index'

        return segment

    except:
        return None
