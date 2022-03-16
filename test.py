from fastai.vision.all import *
import pathlib
temp = pathlib.PosixPath
pathlib.PosixPath = pathlib.WindowsPath
# from pathlib import Path

# file = open("Data/stage1.pkl", "rb")
# folder_path = Path(r"E:\AnimalBreedClassificationBackend\Data\stage1.pkl")
# path=Path('model.pkl')
mdl = load_learner("Data\model.pkl")
# print("hello")
print(mdl.predict("Input/JerseyCow.jpg")[0])