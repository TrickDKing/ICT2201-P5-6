import mysql.connector
import os

# Database connection
mydb = mysql.connector.connect(
    host = os.getenv('DB_HOST'),
    user = os.getenv('DB_USERNAME'),
    password = os.getenv('DB_PASS'),
    database = os.getenv('DB_NAME')
)

# Retrieves data from all the columns from "table_name"
# SQL = SELECT * FROM "table_name"
def select_all_columns(table_name):
    print(table_name)
    mycursor = mydb.cursor(dictionary=True)
    mycursor.execute("SELECT * FROM {}".format(table_name))

    myresult = mycursor.fetchall()

    print("selected all columns from {} table.".format(table_name))
    return myresult
