import axios from "axios";
import { useState, type ReactNode } from "react";
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-foreground/80">
        {label}
      </span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

const inputCls =
  "w-full rounded-xl border border-border bg-white/70 px-4 py-3 backdrop-blur focus:outline-none focus:ring-2 focus:ring-primary";

function Input(
  props: React.InputHTMLAttributes<HTMLInputElement>
) {
  return <input {...props} className={inputCls} />;
}

function Select({
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select {...props} className={inputCls}>
      {children}
    </select>
  );
}

function Prediction() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);

    const form = new FormData(e.currentTarget);

    const payload = {
      Age: Number(form.get("Age")),
      Gender: form.get("Gender"),
      Occupation: form.get("Occupation"),
      Marital_Status: form.get("Marital_Status"),

      Sleep_Duration: Number(form.get("Sleep_Duration")),
      Sleep_Quality: Number(form.get("Sleep_Quality")),

      Wake_Up_Time: form.get("Wake_Up_Time"),
      Bed_Time: form.get("Bed_Time"),

      Physical_Activity: Number(form.get("Physical_Activity")),
      Screen_Time: Number(form.get("Screen_Time")),

      Caffeine_Intake: Number(form.get("Caffeine_Intake")),

      Alcohol_Intake: form.get("Alcohol_Intake"),
      Smoking_Habit: form.get("Smoking_Habit"),

      Work_Hours: Number(form.get("Work_Hours")),
      Travel_Time: Number(form.get("Travel_Time")),

      Social_Interactions: Number(
        form.get("Social_Interactions")
      ),

      Meditation_Practice: form.get(
        "Meditation_Practice"
      ),

      Exercise_Type: form.get("Exercise_Type"),

      Blood_Pressure: Number(
        form.get("Blood_Pressure")
      ),

      Cholesterol_Level: Number(
        form.get("Cholesterol_Level")
      ),

      Blood_Sugar_Level: Number(
        form.get("Blood_Sugar_Level")
      ),
    };

    try {
      const res = await axios.post(
        "https://stress-monitoring-system.onrender.com/predict",
        payload
      );

      navigate("/result", {
  state: {
    prediction: res.data.prediction,
  },
});
    } catch (err) {
      console.error(err);
      alert("Prediction Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-up">
      <header>
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-primary">
          <Sparkles className="h-4 w-4" />
          Prediction Form
        </div>

        <h1 className="mt-4 text-4xl font-bold">
          Stress Prediction
        </h1>

        <p className="mt-2 text-muted-foreground">
          Fill all the details below to predict your stress
          level.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="glass-card rounded-3xl p-8 space-y-8"
      >
        {/* Personal Information */}
<section>
  <h2 className="text-xl font-bold mb-5">Personal Information</h2>

  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

    <Field label="Age">
      <Input
        type="number"
        name="Age"
        placeholder="e.g. 25"
        required
      />
    </Field>

    <Field label="Gender">
      <Select name="Gender" required>
        <option value="">Select Gender</option>
        <option>Male</option>
        <option>Female</option>
      </Select>
    </Field>

    <Field label="Occupation">
      <Select name="Occupation" required>
        <option value="">Select Occupation</option>
        <option>Software Engineer</option>
        <option>Marketing Manager</option>
        <option>Data Scientist</option>
        <option>Teacher</option>
        <option>Doctor</option>
        <option>Graphic Designer</option>
        <option>Civil Engineer</option>
        <option>Business Owner</option>
        <option>Nurse</option>
        <option>Software Developer</option>
        <option>Research Assistant</option>
        <option>Architect</option>
        <option>Lawyer</option>
        <option>Physician</option>
        <option>Engineer</option>
        <option>Business Consultant</option>
        <option>Retired</option>
        <option>Student</option>
      </Select>
    </Field>

    <Field label="Marital Status">
      <Select name="Marital_Status" required>
        <option>Single</option>
        <option>Married</option>
        <option>Divorced</option>
      </Select>
    </Field>

  </div>
</section>

{/* Sleep Details */}
<section>

  <h2 className="text-xl font-bold mb-5">
    Sleep Details
  </h2>

  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

    <Field label="Sleep Duration (Hours)">
      <Input
        type="number"
        step="0.5"
        name="Sleep_Duration"
        placeholder="e.g. 7"
        required
      />
    </Field>

    <Field label="Sleep Quality (1-5)">
      <Input
        type="number"
        min="1"
        max="5"
        name="Sleep_Quality"
        placeholder="1 - 5"
        required
      />
    </Field>

    <Field label="Wake Up Time">
      <Select
        name="Wake_Up_Time"
        required
      >
        <option>4:30 AM</option>
        <option>5:00 AM</option>
        <option>5:30 AM</option>
        <option>6:00 AM</option>
        <option>6:30 AM</option>
        <option>7:00 AM</option>
        <option>7:30 AM</option>
        <option>8:00 AM</option>
        <option>8:30 AM</option>
        <option>9:00 AM</option>
        
      </Select>
    </Field>

    <Field label="Bed Time">
      <Select
        name="Bed_Time"
        required
      >
        <option>10:00 PM</option>
        <option>10:30 PM</option>
        <option>11:00 PM</option>
        <option>11:30 PM</option>
        <option>12:00 AM</option>
      </Select>
    </Field>

  </div>

</section>
{/* Lifestyle */}
<section>

  <h2 className="text-xl font-bold mb-5">
    Lifestyle Information
  </h2>

  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

    <Field label="Physical Activity (1-5)">
      <Input
        type="number"
        min="1"
        max="5"
        name="Physical_Activity"
        placeholder="1 - 5"
        required
      />
    </Field>

    <Field label="Screen Time (Hours)">
      <Input
        type="number"
        step="0.5"
        name="Screen_Time"
        placeholder="e.g. 6"
        required
      />
    </Field>

    <Field label="Caffeine Intake (cups/day)">
      <Input
        type="number"
        min="0"
        name="Caffeine_Intake"
        placeholder="e.g. 2"
        required
      />
    </Field>

    <Field label="Alcohol Intake">
  <Select name="Alcohol_Intake" required>
    <option value="0">No</option>
    <option value="1">Occasionally</option>
    <option value="2">Regularly</option>
  </Select>
</Field>

    <Field label="Smoking Habit">
      <Select
        name="Smoking_Habit"
        required
      >
        <option>No</option>
        <option>Yes</option>
      </Select>
    </Field>

    <Field label="Work Hours">
      <Input
        type="number"
        name="Work_Hours"
        placeholder="e.g. 8"
        required
      />
    </Field>

    <Field label="Travel Time (Hours)">
      <Input
        type="number"
        step="0.5"
        name="Travel_Time"
        placeholder="e.g. 1.5"
        required
      />
    </Field>

    <Field label="Social Interactions (1-5)">
      <Input
        type="number"
        min="1"
        max="5"
        name="Social_Interactions"
        placeholder="1 - 5"
        required
      />
    </Field>

    <Field label="Meditation Practice">
      <Select
        name="Meditation_Practice"
        required
      >
        <option>No</option>
        <option>Yes</option>
      </Select>
    </Field>

    <Field label="Exercise Type">
      <Select
        name="Exercise_Type"
        required
      >
        <option>Walking</option>
        <option>Yoga</option>
        <option>Cardio</option>
        <option>Strength Training</option>
        <option>Pilates</option>
        <option>Aerobics</option>
        <option>Meditation</option>
      </Select>
    </Field>

  </div>

</section>

{/* Health Information */}

<section>

  <h2 className="text-xl font-bold mb-5">
    Health Information
  </h2>

  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

    <Field label="Blood Pressure">
      <Input
        type="number"
        name="Blood_Pressure"
        placeholder="120"
        required
      />
    </Field>

    <Field label="Cholesterol Level">
      <Input
        type="number"
        name="Cholesterol_Level"
        placeholder="180"
        required
      />
    </Field>

    <Field label="Blood Sugar Level">
      <Input
        type="number"
        name="Blood_Sugar_Level"
        placeholder="90"
        required
      />
    </Field>

  </div>

</section>
        <div className="flex justify-center pt-6">

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-full gradient-hero px-10 py-4 text-lg font-semibold text-white shadow-elegant transition-transform hover:scale-105 disabled:opacity-60"
          >
            <Sparkles className="h-5 w-5" />

            {loading ? "Predicting..." : "Predict Stress"}

          </button>

        </div>

      </form>

    </div>
  );
}

export default Prediction;