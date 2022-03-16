from flask import Flask
from flask import render_template
import json
from flask import request
import os
import time
from flask import redirect
from fastai.vision.all import *
import pathlib
from flask_cors import CORS
temp = pathlib.PosixPath

pathlib.PosixPath = pathlib.WindowsPath
app = Flask(__name__)
CORS(app)

AnimalKeyJson = {}


def read():
    Animal = os.listdir("Data")
    global AnimalKeyJson
    for animal in Animal:
        try:
            AnimalKeyJson[animal[:-5]] = json.load(open("Data/" + animal))
        except:
            pass
    # Case Insensitive lowercase + strip key
    AnimalKeyJson = dict(
        map(lambda keyv: ((keyv[0].lower()).strip(), keyv[1]), AnimalKeyJson.items())
    )


read()


@app.route("/all")
def printAll():
    return AnimalKeyJson

@app.route("/predict", methods=['POST', 'GET'])
def predict():
    if request.method == 'POST':
        file = request.files['file']
 
        file_name = file.filename
        file_format = file_name.split('.')[1]
        filename = file.filename
        folder_name = f"input/"
        os.makedirs(folder_name,exist_ok=True)
        file.save(f"{folder_name}/{filename}")

        path = Path(f"{folder_name}/{filename}")

        print(path)
        mdl = load_learner("Data\model.pkl")
        predicted=mdl.predict(path)[0]

        return predicted
    else:
        return render_template('predict.html')
@app.route("/AddData", methods=["GET", "POST"])
def AddDetail():
    ExistAnimal = [x[:-5] for x in os.listdir("Data/")]
    if request.method == "POST":
        data = request.json
        print(data)
        dic = {}
        try:
            dic["Format"] = data["Format"]
        except:
            dic = data["Breed"]

        fileName = data["AnimalName"]
        if os.path.exists("Data/" + fileName + ".json"):
            mode = "r+"  # append if already exists
        else:
            mode = "w"
        with open("Data/" + fileName + ".json", mode) as fp:
            try:
                file_data = json.load(fp)
            except:
                file_data = {}
            keys = tuple(dic.keys())[0]
            file_data[keys] = dic[keys]
            fp.seek(0)
            print(file_data)
            json.dump(file_data, fp, indent=4)
        read()

        # # dd = request.data
        # print("asd")
        return "done"
    else:
        # return "dsd"
        return render_template("Form.html", ExistAnimal=ExistAnimal)


@app.route("/animal/<animal>")
def printAnimal(animal):
    breed = request.args.get("breed")
    queryAnimal = (animal.lower()).strip()
    if queryAnimal in AnimalKeyJson:
        BreedKeyV = dict(
            map(
                lambda keyv: ((keyv[0].lower()).strip(), keyv[1]),
                AnimalKeyJson[queryAnimal].items(),
            )
        )
        if not breed is None:
            queryBreed = (breed.lower()).strip()
            if queryBreed in BreedKeyV:
                return BreedKeyV[queryBreed]
            else:
                return "Breed " + breed + " Not Found"

        return AnimalKeyJson[queryAnimal]
    return "Animal :: Not Exist " + animal + " Dataset "


@app.route("/animal/<animal>/")
def redirects(animal):
    return redirect("/animal/" + animal)


@app.route("/")
@app.route("/home")
def descApi():
    return render_template("index.html")


# print("ddd")


if __name__ == "__main__":
    app.run(debug=True)


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
# # data = request.json
#         data = request.get_json()
#         try:
#             print(request.data, "asdf", request.values)
#             try:
#                 print(request.get_data())
#                 print(request.values.get("target"))
#             except:
#                 pass
#         except:
#             pass

#         ff = request.form
#     if request.method == "POST":
#         data = request.json
#         ff = request.form
#         dd = request.data
#         print(data, ff, dd)
#     return "hello"
