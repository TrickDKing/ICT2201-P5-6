import json

class Commands:
    def __init__(self):
        self.commands = dict()
        self.commands = {
            "Commands" : ["move forward", "move backward"]
        }

    def setCommands(self, jsonstring):
        try:
            self.commands = json.loads(jsonstring)
        except ValueError:
            return

    def getCommands(self):
        if not self.commands:
            return "Empty"
            
        else:
            return self.commands