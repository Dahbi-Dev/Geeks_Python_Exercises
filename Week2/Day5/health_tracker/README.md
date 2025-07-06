# 🩺 Health Tracker App

A simple health monitoring app built with **Flask** for the backend API and **Tkinter** for the GUI frontend. The app calculates BMI, classifies body type, gives health advice, and visualizes data with graphs.

---

## 🚀 Features

- Calculate **BMI** using height and weight
- Classify **Body Type**: Underweight, Normal, Overweight, Obese
- Get **Health Advice** based on body type
- Visualize:
  - BMI distribution (scatter plot)
  - Food calorie values (bar chart)
  - Exercise efficiency (calories burned/hour)
- Use a **Tkinter GUI** to interact with the API
- Store user data in a **PostgreSQL** database
- Seed database with **Faker-generated** user data

---

## 🗂️ Project Structure



health_tracker/
├── app.py # Flask API with routes
├── db.py # PostgreSQL connection logic
├── models.py # BMI & health logic
├── visualizer.py # Graph generation using matplotlib
├── gui.py # Tkinter GUI app
├── seed.py # Faker-based fake user generator
├── food_data.json # Food items + calorie info
├── exercise_data.json # Exercise items + calorie burn info
├── static/ # Auto-generated graph images
├── .env # Environment variables for DB
├── requirements.txt # Python dependencies
└── README.md # Project overview and instructions




---

## ⚙️ Setup Instructions

### 1. Clone the Project

```bash
git clone https://github.com/yourname/health_tracker.git
cd health_tracker


1. Install Requirements
pip install -r requirements.txt

3. Set Up Your PostgreSQL Database
Create a users table in your health_db database:

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    height INTEGER,
    weight INTEGER,
    age INTEGER,
    bmi FLOAT,
    body_type TEXT,
    advice TEXT
);


4. Update your .env file with DB credentials:
DB_NAME=health_db
DB_USER=postgres
DB_PASSWORD=root
DB_HOST=localhost
DB_PORT=7070


5.. Seed the Database (Optional)
python seed.py

6.Run the Flask API
python app.py

7. Run the GUI App
python gui.py


📊 Example Visuals
BMI Scatter Plot

Food Calorie Bar Chart

Exercise Burn Bar Chart

These are auto-generated and saved in the static/ folder.



8. Dependencies
Flask
psycopg2-binary
Faker
requests
matplotlib
plotly
python-dotenv
Pillow


9. Install with:
pip install -r requirements.txt


