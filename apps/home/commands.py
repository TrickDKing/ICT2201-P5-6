import json

class Commands:
    def __init__(self):
        self.commands = dict() #Type must be a string, dict, tuple, Response instance, or WSGI callable, not a list
        #self.commands = {
        #   "Commands" : ["move forward", "move backward"]
        #}

    def setCommands(self, jsonstring):
        try:
            self.commands = json.loads(jsonstring)
        except ValueError:
            return

    def getCommands(self):
        if not self.commands:
            return "Empty"
        else:
            temp = self.commands.copy()
            self.commands.clear()
            return temp