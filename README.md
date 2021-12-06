# ICT2201-P5-6
## ICT ISxSE Collab Lab P5 Team 6
Group Members:
1. Xavier Lim Gui Ming (2000952)
2. Jimeno Johanna Charissa Mortel (2002171)
3. Carlton Anthoni Foo (2000621)
4. Lee Xian Fu (2001995)
5. Han En Ding (2000512)

<br />

# How to install dependencies and run (for windows)

Make sure you have Python 3.9 installed

1. Clone the repo to anywhere you want
2. To install and run the project, run in order:
    ```
    1. py -3.9 -m venv venv
    2. venv\Scripts\activate 
    3. pip install -r requirements.txt
    4. flask run --host=0.0.0.0 --port=5000
    ```
    This will install the various dependencies needed. The full list of dependencies can be found in ```./requirements.txt```
5. The application should be live on http://localhost:5000
6. Refer to [this webpage](https://appseed.us/admin-dashboards/flask-gradient-able) and [this repo](https://github.com/app-generator/flask-gradient-able) for the structure of this repo.

<br />

# How to run (After installing dependencies)
1.  Run the following in order to enable venv and run the flask application:
    ```
    1. venv\Scripts\activate
    2. flask run --host=0.0.0.0 --port=5000
    ```

## Notes
- Ensure virtual environment (venv) is enabled before staring the project or installing dependencies with ```venv\Scripts\activate```. If need to, you can disable it with ```venv\Scripts\deactivate```
- If the database is unaccessible, do contact us through the #team-p5-6 slack channel
- Ensure a .env file is present in the root folder with correct configurations to be able to connect to the database. The variables are as shown below.

### .env
The .env file will have the following variables:
```
FLASK_APP=run.py
FLASK_ENV=development
DEBUG=True
DB_ENGINE=mysql
DB_NAME=SIT
DB_HOST=172.24.117.56
DB_PORT=3306
DB_USERNAME=monty
DB_PASS=Password123!
```

<br />

## Code-base structure

The project is coded using blueprints, app factory pattern, dual configuration profile (development and production) and an intuitive structure presented bellow:

```bash
< PROJECT ROOT >
   |
   |-- apps/
   |    |
   |    |-- home/                           # A simple app that serve HTML files
   |    |    |-- routes.py                  # Define app routes
   |    |    |-- dbfuncs.py                 # Functions for database functionality
   |    |    |-- commands.py                # Getter and setter for commands
   |    |
   |    |-- authentication/                 # Handles auth routes (login and register)
   |    |    |-- routes.py                  # Define authentication routes  
   |    |    |-- models.py                  # Defines models  
   |    |    |-- forms.py                   # Define auth forms (login and register) 
   |    |
   |    |-- static/
   |    |    |-- assets/js/game             # P5.js Game functions and classes
   |    |    |-- <css, JS, images>          # CSS files, Javascripts files
   |    |
   |    |-- templates/                      # Templates used to render pages
   |    |    |-- includes/                  # HTML chunks and components
   |    |    |    |-- navigation.html       # Top menu component
   |    |    |    |-- sidebar.html          # Sidebar component
   |    |    |    |-- scripts.html          # Scripts common to all pages
   |    |    |
   |    |    |-- layouts/                   # Master pages
   |    |    |    |-- base-fullscreen.html  # Used by Authentication pages
   |    |    |    |-- base.html             # Used by common pages
   |    |    |
   |    |    |-- accounts/                  # Authentication pages
   |    |    |    |-- login.html            # Login page
   |    |    |    |-- register.html         # Register page
   |    |    |
   |    |    |-- home/                      # UI Kit Pages
   |    |         |-- index.html            # Index page
   |    |         |-- 404-page.html         # 404 page
   |    |         |-- *.html                # All other pages
   |    |    
   |  config.py                             # Set up the app
   |    __init__.py                         # Initialize the app
   |
   |-- requirements.txt                     # Dependency modules
   |
   |-- .env                                 # Inject Configuration via Environment
   |-- run.py                               # Start the app - WSGI gateway
   |
```

<br />

# Development Workflow

For our development workflow, we have adapted the Git Feature Branch Workflow. The gist of this workflow is that developers will create a new "feature/\<feature_name>" branch from "main" when working on a new feature, and only merge back to "main" when their feature is completed. Here is a graph to depict this workflow:

![Git Feature Branch Workflow](./apps/static/Feature-Branch-git-workflow-4.png)

We chose to adopt this workflow as it allows us to work on different features concurrently without worrying about conflicts, as well as without waiting for other features to be done before merging to "main", and since it also allows for faster developemnt and code maintenance. We also choose it for its relative simplicity as most of us are new to Git workflows, and might be confused when using other more complex workflows.

Our Git Graph is as such:

![Git Feature Branch Workflow](./apps/static/gitgraph.jpg )
<br /> 

# UAT
## Use Case Diagram

![Use Case Diagra](./apps/static/usecase.png)

<br />

## System State Diagram
### Web Portal
![System State - Web Portal](./apps/static/systemstate_wp.png)

### Game
![System State - Game](./apps/static/systemstate_game.png)

### Robotic Car
![System State - Robotic Car](./apps/static/systemstate_car.png)

<br />

## System Test Cases

<br /> 

# Whitebox Testing

The class we choose to demonstrate our whitebox testing is our "Game" class from the ```sketch.js``` file in ```apps/static/assets/js/game/```. We choose this class as it is the main basis of our game, and is meaningful, with many interactions with other classes.

## Code Coverage Statistics


## How to run the test suite
1. cd to ```apps/static/assets/js/game/```
2. Run the following in order:
```
    1. npm install
    2. npm test
```
3. The output of the test suite, wih code coverage statistics, should be visible in the console.


## Test case example



### Notes
Using this library, we could not test some lines of code due to the need to instantiate the entire project, which the test suite does not do.

