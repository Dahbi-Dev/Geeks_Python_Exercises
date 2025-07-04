from flask import Flask, jsonify, request
from db import create_user, get_all_users
from models import calculate_bmi, get_body_type, get_advice
import visualizer

app = Flask(__name__)

@app.route("/")
def home():
    return '''
    <h1>Health Tracker API</h1>
    <ul>
        <li><a href="/user-data">User Data + BMI Graph</a></li>
        <li><a href="/food">Food Recommendations Graph</a></li>
        <li><a href="/exercises">Exercise Graph</a></li>
    </ul>
    '''

@app.route("/user-data", methods=["POST", "GET"])
def user_data():
    if request.method == "POST":
        data = request.json
        height = data.get("height")
        weight = data.get("weight")
        age = data.get("age")

        if not all([height, weight, age]):
            return jsonify({"error": "Missing height, weight, or age"}), 400

        bmi = calculate_bmi(height, weight)
        body_type = get_body_type(bmi)
        advice = get_advice(body_type)

        create_user(height, weight, age, bmi, body_type, advice)
        return jsonify({
            "BMI": bmi,
            "Body Type": body_type,
            "Advice": advice
        })
    else:
        users = get_all_users()
        graph_path = visualizer.generate_user_graph(users)
        return f'<img src="{graph_path}" alt="BMI Plot">'

@app.route("/food")
def food_graph():
    graph_path = visualizer.generate_food_graph()
    return f'<img src="{graph_path}" alt="Food Graph">'

@app.route("/exercises")
def exercise_graph():
    graph_path = visualizer.generate_exercise_graph()
    return f'<img src="{graph_path}" alt="Exercise Graph">'
