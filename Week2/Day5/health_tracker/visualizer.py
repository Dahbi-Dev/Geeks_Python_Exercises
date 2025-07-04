import matplotlib.pyplot as plt
import uuid
import json
import os

def generate_user_graph(users):
    weights = [u['weight'] for u in users]
    heights = [u['height'] for u in users]
    bmis = [u['bmi'] for u in users]

    plt.figure(figsize=(6, 4))
    plt.scatter(heights, weights, c=bmis, cmap='coolwarm', edgecolors='black')
    plt.xlabel("Height (cm)")
    plt.ylabel("Weight (kg)")
    plt.title("BMI Distribution")
    plt.colorbar(label="BMI")

    path = f"static/plot_{uuid.uuid4().hex}.png"
    plt.tight_layout()
    plt.savefig(path)
    plt.close()
    return "/" + path

def generate_food_graph():
    with open("food_data.json") as f:
        food = json.load(f)

    names = [item['name'] for item in food]
    calories = [item['calories'] for item in food]

    plt.figure(figsize=(7, 4))
    plt.barh(names, calories, color="green")
    plt.xlabel("Calories")
    plt.title("Food Calorie Chart")

    path = f"static/food_plot_{uuid.uuid4().hex}.png"
    plt.tight_layout()
    plt.savefig(path)
    plt.close()
    return "/" + path

def generate_exercise_graph():
    with open("exercise_data.json") as f:
        exercises = json.load(f)

    names = [e['name'] for e in exercises]
    burns = [e['calories_burned_per_hour'] for e in exercises]

    plt.figure(figsize=(7, 4))
    plt.bar(names, burns, color="orange")
    plt.ylabel("Calories Burned/hour")
    plt.title("Exercise Efficiency Chart")

    path = f"static/ex_plot_{uuid.uuid4().hex}.png"
    plt.tight_layout()
    plt.savefig(path)
    plt.close()
    return "/" + path
