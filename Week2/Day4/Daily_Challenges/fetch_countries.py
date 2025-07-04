from flask import Flask, jsonify
import requests
import random
from db import get_connection  # your existing db.py

app = Flask(__name__)

@app.route("/save-countries", methods=["GET"])
def fetch_and_save_countries():
    url = "https://restcountries.com/v3.1/all?fields=name,capital,flags,subregion,population"
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        countries = response.json()
    except Exception as e:
        print(f"API fetch error: {e}")
        return jsonify({"error": "Failed to fetch countries"}), 500

    selected = random.sample(countries, min(11, len(countries)))
    data = []
    for c in selected:
        name = c.get("name", {}).get("common", "Unknown")
        capital_list = c.get("capital")
        capital = capital_list[0] if capital_list and len(capital_list) > 0 else "Unknown"
        flag = c.get("flags", {}).get("png", "")
        subregion = c.get("subregion", "Unknown")
        population = c.get("population", 0)
        data.append((name, capital, flag, subregion, population))

    try:
        conn = get_connection()
        cur = conn.cursor()

        # Create table if not exists
        cur.execute("""
            CREATE TABLE IF NOT EXISTS countries (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) UNIQUE NOT NULL,
                capital VARCHAR(255),
                flag TEXT,
                subregion VARCHAR(255),
                population BIGINT
            )
        """)

        inserted = 0
        for d in data:
            cur.execute("""
                INSERT INTO countries (name, capital, flag, subregion, population)
                VALUES (%s, %s, %s, %s, %s)
                ON CONFLICT (name) DO NOTHING
            """, d)
            if cur.rowcount > 0:
                inserted += 1

        conn.commit()

        # Fetch all countries after insert
        cur.execute("SELECT * FROM countries ORDER BY name")
        all_countries = cur.fetchall()

        cur.close()
        conn.close()

        return jsonify({
            "inserted": inserted,
            "total": len(all_countries),
            "countries": all_countries
        })

    except Exception as e:
        print(f"DB error: {e}")
        return jsonify({"error": "Database error"}), 500



@app.route("/", methods=["GET"])
def home():
    return """
    <h1>Welcome to the Countries API!</h1>
    <p><a href="/save-countries">Fetch and Save 10 Random Countries</a></p>
    """
   

if __name__ == "__main__":
   

    app.run(debug=True, port=5000)
