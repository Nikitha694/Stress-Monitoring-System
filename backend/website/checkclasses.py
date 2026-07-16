import joblib

encoders = joblib.load("../model/label_encoders.pkl")

for name, encoder in encoders.items():
    print(f"{name}:")
    print(encoder.classes_)
    print()