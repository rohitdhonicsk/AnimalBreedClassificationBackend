from flask import Flask
from flask import render_template
import json
from flask import request
import os
import time
from flask import redirect

app = Flask(__name__)


Animal = os.listdir("Data")
AnimalKeyJson = {}
for animal in Animal:
    AnimalKeyJson[animal[:-5]] = json.load(open("Data/" + animal))


@app.route("/all")
def printAll():
    return AnimalKeyJson


@app.route("/animal/<animal>")
def printAnimal(animal):
    breed = request.args.get("breed")
    if animal in AnimalKeyJson:
        if not breed is None:
            if breed in AnimalKeyJson[animal]:
                return AnimalKeyJson[animal][breed]
            else:
                return "Breed " + breed + " Not Found"

        return AnimalKeyJson[animal]
    return "Animal :: Not Exist " + animal + " Dataset "


@app.route("/animal/<animal>/")
def redirects(animal):
    return redirect("/animal/" + animal)


@app.route("/")
@app.route("/home")
def descApi():
    return render_template("index.html")


# print("ddd")


# @app.route("/data$qu=<user>&&<name>", methods=["GET"])
# def hello_world(user, name):
#     print(user)
#     return user + name
# try:
#     user = request.args.get("user")
#     return dicti[user]
# except:
#     print("jheeee")
#     print(request.query_string)
#     print(request.args.get("param"))
#     return request.query_string


if __name__ == "__main__":
    app.run(debug=True)
