def calculate_bmi(height_cm, weight_kg):
    height_m = height_cm / 100
    return round(weight_kg / (height_m ** 2), 2)

def get_body_type(bmi):
    if bmi < 18.5:
        return "Underweight"
    elif 18.5 <= bmi < 24.9:
        return "Normal"
    elif 25 <= bmi < 29.9:
        return "Overweight"
    else:
        return "Obese"

def get_advice(body_type):
    if body_type == "Underweight":
        return "Eat more high-protein and carb-rich foods."
    elif body_type == "Normal":
        return "Maintain your current healthy habits!"
    elif body_type == "Overweight":
        return "Reduce sugar and processed foods, increase cardio."
    else:
        return "Low-carb diet, daily exercise, consult a nutritionist."
