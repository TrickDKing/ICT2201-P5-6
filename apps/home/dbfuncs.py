import mysql.connector
import os

# Database connection
mydb = mysql.connector.connect(
    host=os.getenv('DB_HOST'),
    user=os.getenv('DB_USERNAME'),
    password=os.getenv('DB_PASS'),
    database=os.getenv('DB_NAME')
)

cursor = mydb.cursor(buffered=True, dictionary=True)

def listToStr(listOfData):
    """Convert list to a string with coma separated"""
    return ",".join(listOfData)


def concatList(list1: list = None, list2: list = None, char: str = "="):
    combine = zip(list1, list2)
    result = []
    for ele1, ele2 in combine:
        result.append(ele1 + char + "'" + ele2 + "'")
    return result[0]


# Retrieves data from all the columns from "table_name"
# SQL = SELECT * FROM "table_name"


# def select_all_columns(table_name):
# def select_all_columns(table_name):
#     print(table_name)
#     mycursor = mydb.cursor(dictionary=True)
#     mycursor.execute("SELECT * FROM {}".format(table_name))

#     myresult = mycursor.fetchall()

#     print("selected all columns from {} table.".format(table_name))
#     return myresult


def select_data(getheaders: list = None, filterBy: list = None, filterVal: list = None, table_name: str = None):
    """SQL Query data based on 3 inputs headers, values and table name.

    headers: Type of list. Header name
    col_values: Type of list. Values corresponding to given headers
    table_name: Type of str. String representation of table
    ."""
    if table_name is None or table_name.isspace():
        raise ValueError(
            "Table name cannot be Null value or whitespace characters")

    if getheaders is None and filterBy is None and filterVal is None:
        cursor.execute(f"SELECT * from {table_name}")
    else:
        if len(filterBy) != len(filterVal):
            raise ValueError(
                "Lists of filterBy and filterVal have different length")

        if filterBy is None:
            cols = listToStr(getheaders)
            cursor.execute(f"SELECT {cols} from {table_name}")
        elif getheaders is None:
            where = concatList(filterBy, filterVal)
            cursor.execute(f"SELECT * from {table_name} WHERE {where}")

    result = cursor.fetchall()
    return result


def update_data(table_name: str, data: dict, identifier: str, identifier_value: str):
    if table_name is None or table_name.isspace():
        raise ValueError(
            "Table name cannot be Null value or whitespace characters")

    if data is not None:
        for key, value in data.items():
            sql = ""

            if type(value) == str:
                sql = f'UPDATE {table_name} SET `{key}`="{value}" WHERE {identifier}="{identifier_value}"'
            else:
                sql = f'UPDATE {table_name} SET `{key}`={value} WHERE {identifier}="{identifier_value}"'

            cursor.execute(sql)

        mydb.commit()
        print(f"{table_name} table updated successfully.")


# SQL = SELECT * FROM "table_name" order by "table_column"  EN DING PART
def select_all_columns_with_condition(table_name,table_column):
    print(table_name)
    mycursor = mydb.cursor(dictionary=True)
    mycursor.execute("SELECT * FROM {} ORDER BY {} DESC".format(table_name,table_column))

    myresult = mycursor.fetchall()

    #print("selected all columns from {} table.".format(table_name))
    return myresult


def get_best_score_by_level(table_name,table_column,table_column2):
    print(table_name)
    mycursor = mydb.cursor(dictionary=True)
    mycursor.execute("SELECT * FROM {} INNER JOIN levels ON levels.level_id=attempts.level_id GROUP BY attempts.{} ORDER BY attempts.{} ".format(table_name,table_column,table_column2))

    myresult = mycursor.fetchall()

    return myresult


# Retrieves data from specified columns "column_names" from "table_name"
# SQL = SELECT "column_names" FROM "table_name"
def select_certain_columns(table_name, column_names):
    mycursor = mydb.cursor()
    mycursor.execute("SELECT {} FROM {}".format(column_names, table_name))

    myresult = mycursor.fetchall()

    print("selected {} columns from {}.".format(column_names, table_name))
    return myresult


# Updates "table_name" by setting the "column_name" = "value" where the "identifier" = "identifier_value"
# SQL = UPDATE "table_name" SET "column_name" = "value" WHERE "identifier" = "identifier_value"
def update_data(table_name, identifier, identifier_value, column_name, value):
    mycursor = mydb.cursor()
    mycursor.execute("UPDATE {} SET {} = '{}' WHERE {} = '{}'".format(
        table_name, column_name, value, identifier, identifier_value))

    mydb.commit()

    print("{} table updated successfully.".format(table_name))


# Deletes the row from "table_name" where the "identifier" = "identifier_value"
# SQL = DELETE FROM "table_name" WHERE "identifier" = "identifier_value"
def delete_data(table_name, identifier, identifier_value):
    mycursor = mydb.cursor()

    isinstance(identifier_value, str)

    if (not isinstance):
        mycursor.execute("DELETE FROM {} WHERE {} = {}".format(
            table_name, identifier, identifier_value))
    else:
        mycursor.execute("DELETE FROM {} WHERE {} = '{}'".format(
            table_name, identifier, identifier_value))

    mydb.commit()

    print("data deleted from {} table successfully.".format(table_name))


# Deletes all data in "table_name"
# SQL = DELETE FROM "table_name"
def delete_all(table_name):
    mycursor = mydb.cursor()
    mycursor.execute("DELETE FROM {}".format(table_name))

    mydb.commit()

    reset_index(table_name)

    print("deleted all data from {} table successfully".format(table_name))


# Resets auto-increment index of "table_name" *Don't use (mainly for delete_all function)
def reset_index(table_name):
    mycursor = mydb.cursor()
    mycursor.execute("ALTER TABLE {} AUTO_INCREMENT = 1".format(table_name))

    mydb.commit()


# Inserts data values into "table_name"
# SQL = INSERT INTO "table_name" (columns) VALUES (values)
# data is a dictionary for e.g.
# data = {
#     "name": "William",
#     "desc": "person3"
# }
def insert_data(table_name, data):
    columns = []
    values = []

    for key, value in data.items():
        columns.append(key)
        values.append(value)

    columns_string = ', '.join(f"`{w}`" for w in columns)
    values_string = ', '.join(f"'{w}'" for w in values)

    mycursor = mydb.cursor()
    sql = "INSERT INTO " + table_name + \
        " (" + columns_string + ") VALUES (" + values_string + ")"

    mycursor.execute(sql)
    mydb.commit()

    print("data inserted to {} table successfully.".format(table_name))

def get_best_score_by_level(table_name,table_column,table_column2):
    print(table_name)
    mycursor = mydb.cursor(dictionary=True)
    mycursor.execute("SELECT * FROM {} INNER JOIN levels ON levels.level_id=attempts.level_id GROUP BY attempts.{} ORDER BY attempts.{} ".format(table_name,table_column,table_column2))

    myresult = mycursor.fetchall()

    return myresult

