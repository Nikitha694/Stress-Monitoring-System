import pandas as pd
import joblib
from sklearn.preprocessing import LabelEncoder

# Read the ORIGINAL CSV (text values)
data = pd.read_csv("../dataset/stress_detection_data.csv")

categorical_columns = [
    "Gender",
    "Occupation",
    "Marital_Status",
    "Wake_Up_Time",
    "Bed_Time",
    "Alcohol_Intake",
    "Smoking_Habit",
    "Meditation_Practice",
    "Exercise_Type",
    "Stress_Detection"
]

encoders = {}

for column in categorical_columns:
    encoder = LabelEncoder()

    encoder.fit(data[column])      # IMPORTANT: fit only on original text

    encoders[column] = encoder

joblib.dump(encoders, "../model/label_encoders.pkl")

print("Encoders recreated successfully.")