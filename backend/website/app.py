from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import os
app = Flask(__name__)
CORS(app)


BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

model = joblib.load(os.path.join(BASE_DIR, "model", "stress_model.pkl"))
label_encoders = joblib.load(os.path.join(BASE_DIR, "model", "label_encoders.pkl"))

@app.route("/predict", methods=["POST"])
def predict():

    data = request.get_json()

    age = int(data["Age"])
    gender = encoders["Gender"].transform([data["Gender"]])[0]
    occupation = encoders["Occupation"].transform([data["Occupation"]])[0]
    marital_status = encoders["Marital_Status"].transform([data["Marital_Status"]])[0]
    sleep_duration = float(data["Sleep_Duration"])
    sleep_quality = float(data["Sleep_Quality"])
    wake_up_time = encoders["Wake_Up_Time"].transform([data["Wake_Up_Time"]])[0]
    bed_time = encoders["Bed_Time"].transform([data["Bed_Time"]])[0]
    physical_activity = float(data["Physical_Activity"])
    screen_time = float(data["Screen_Time"])
    caffeine = int(data["Caffeine_Intake"])
    alcohol = int(data["Alcohol_Intake"])
    smoking = encoders["Smoking_Habit"].transform([data["Smoking_Habit"]])[0]
    work_hours = int(data["Work_Hours"])
    travel = float(data["Travel_Time"])
    social = int(data["Social_Interactions"])
    meditation = encoders["Meditation_Practice"].transform([data["Meditation_Practice"]])[0]
    exercise = encoders["Exercise_Type"].transform([data["Exercise_Type"]])[0]
    bp = int(data["Blood_Pressure"])
    cholesterol = int(data["Cholesterol_Level"])
    sugar = int(data["Blood_Sugar_Level"])

    input_data = pd.DataFrame(
        [[
            age, gender, occupation, marital_status,
            sleep_duration, sleep_quality,
            wake_up_time, bed_time,
            physical_activity, screen_time,
            caffeine, alcohol, smoking,
            work_hours, travel,
            social, meditation,
            exercise, bp,
            cholesterol, sugar
        ]],
        columns=[
            "Age", "Gender", "Occupation", "Marital_Status",
            "Sleep_Duration", "Sleep_Quality",
            "Wake_Up_Time", "Bed_Time",
            "Physical_Activity", "Screen_Time",
            "Caffeine_Intake", "Alcohol_Intake",
            "Smoking_Habit", "Work_Hours",
            "Travel_Time", "Social_Interactions",
            "Meditation_Practice", "Exercise_Type",
            "Blood_Pressure", "Cholesterol_Level",
            "Blood_Sugar_Level"
        ]
    )

    prediction = model.predict(input_data)

    labels = {
        0: "High Stress",
        1: "Low Stress",
        2: "Medium Stress"
    }

    result = labels[prediction[0]]

    return jsonify({
        "prediction": result
    })


if __name__ == "__main__":
    app.run(debug=True)
