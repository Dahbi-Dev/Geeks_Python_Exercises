from flask import Flask, jsonify, request, send_file
from flask_cors import CORS, cross_origin
from db import (create_complete_user_record, get_all_users, get_user_by_id, 
               search_users_by_name, get_user_statistics, init_database, get_default_advice,
               create_competition, get_all_competitions, get_eligible_users_for_competition,
               register_user_for_competition, get_competition_participants, get_competition_statistics)
from models import calculate_bmi, get_body_type
import visualizer
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Create static directory if it doesn't exist
os.makedirs('static', exist_ok=True)

# Initialize database on startup
try:
    init_database()
    print("Database initialized successfully!")
except Exception as e:
    print(f"Database initialization error: {e}")


@app.route("/user-data", methods=["POST", "GET"])
def user_data():
    if request.method == "POST":
        try:
            data = request.json
            if not data:
                return jsonify({"error": "No JSON data provided"}), 400
            
            height = data.get("height")
            weight = data.get("weight")
            age = data.get("age")
            name = data.get("name", "Anonymous")

            if not all([height, weight, age]):
                return jsonify({"error": "Missing height, weight, or age"}), 400

            # Validate input types and ranges
            try:
                height = float(height)
                weight = float(weight)
                age = int(age)
            except (ValueError, TypeError):
                return jsonify({"error": "Invalid data types"}), 400

            if height <= 0 or weight <= 0 or age <= 0:
                return jsonify({"error": "Values must be positive"}), 400

            # Calculate BMI and get body type
            bmi = calculate_bmi(height, weight)
            body_type = get_body_type(bmi)
            
            # Get default advice for the body type
            advice = get_default_advice(body_type)
            
            # Create complete user record with all data
            user_id = create_complete_user_record(
                name, height, weight, age, bmi, body_type,
                advice['food_advice'], advice['exercise_advice']
            )
            
            return jsonify({
                "user_id": user_id,
                "BMI": round(bmi, 2),
                "Body Type": body_type,
                "Food Advice": advice['food_advice'],
                "Exercise Advice": advice['exercise_advice']
            })
        except Exception as e:
            return jsonify({"error": f"Server error: {str(e)}"}), 500
    else:
        try:
            users = get_all_users()
            if not users:
                return jsonify({"message": "No users in database"}), 404
            graph_path = visualizer.generate_user_graph(users)
            return send_file(graph_path, mimetype="image/png")
        except Exception as e:
            return jsonify({"error": f"Failed to generate graph: {str(e)}"}), 500

@app.route("/search-users", methods=["GET"])
def search_users():
    """Search for users by name"""
    try:
        query = request.args.get('name', '').strip()
        if not query:
            return jsonify({"error": "Name parameter is required"}), 400
        
        users = search_users_by_name(query)
        if not users:
            return jsonify({"message": f"No users found matching '{query}'"}), 404
        
        # Format the response
        formatted_users = []
        for user in users:
            formatted_users.append({
                "id": user['id'],
                "name": user['name'],
                "height": user['height'],
                "weight": user['weight'],
                "age": user['age'],
                "bmi": round(user['bmi'], 2) if user['bmi'] else None,
                "body_type": user['body_type'],
                "food_advice": user['food_advice'],
                "exercise_advice": user['exercise_advice'],
                "created_at": user['created_at'].isoformat() if user['created_at'] else None
            })
        
        return jsonify({
            "query": query,
            "count": len(formatted_users),
            "users": formatted_users
        })
    except Exception as e:
        return jsonify({"error": f"Search error: {str(e)}"}), 500

@app.route("/user/<int:user_id>", methods=["GET"])
def get_user(user_id):
    """Get a specific user by ID"""
    try:
        user = get_user_by_id(user_id)
        if not user:
            return jsonify({"error": "User not found"}), 404
        
        return jsonify({
            "id": user['id'],
            "name": user['name'],
            "height": user['height'],
            "weight": user['weight'],
            "age": user['age'],
            "bmi": round(user['bmi'], 2) if user['bmi'] else None,
            "body_type": user['body_type'],
            "food_advice": user['food_advice'],
            "exercise_advice": user['exercise_advice'],
            "created_at": user['created_at'].isoformat() if user['created_at'] else None
        })
    except Exception as e:
        return jsonify({"error": f"Error fetching user: {str(e)}"}), 500

@app.route("/users", methods=["GET"])
def get_all_users_json():
    try:
        users = get_all_users()
        if not users:
            return jsonify({"message": "No users found"}), 404

        formatted_users = []
        for user in users:
            formatted_users.append({
                "id": user["id"],
                "name": user["name"],
                "height": user["height"],
                "weight": user["weight"],
                "age": user["age"],
                "bmi": round(user["bmi"], 2) if user["bmi"] else None,
                "body_type": user["body_type"],
                "food_advice": user["food_advice"],
                "exercise_advice": user["exercise_advice"]
            })

        return jsonify(formatted_users)
    except Exception as e:
        return jsonify({"error": f"Failed to retrieve users: {str(e)}"}), 500

@app.route("/statistics", methods=["GET"])
def statistics():
    """Get database statistics"""
    try:
        stats = get_user_statistics()
        return jsonify({
            "total_users": stats['total_users'],
            "average_bmi": round(stats['avg_bmi'], 2) if stats['avg_bmi'] else None,
            "min_bmi": round(stats['min_bmi'], 2) if stats['min_bmi'] else None,
            "max_bmi": round(stats['max_bmi'], 2) if stats['max_bmi'] else None,
            "distribution": {
                "underweight": stats['underweight_count'],
                "normal": stats['normal_count'],
                "overweight": stats['overweight_count'],
                "obese": stats['obese_count']
            }
        })
    except Exception as e:
        return jsonify({"error": f"Error fetching statistics: {str(e)}"}), 500

# === VISUALIZATION ENDPOINTS ===

@app.route("/public-user-data")
@cross_origin()
def public_user_data():
    """Generate and return user BMI chart"""
    try:
        users = get_all_users()
        if not users:
            return "No users in the database", 404
        graph_path = visualizer.generate_user_graph(users)
        return send_file(graph_path, mimetype='image/png')
    except Exception as e:
        return f"Error generating user graph: {str(e)}", 500

@app.route("/public-food")
@cross_origin()
def public_food():
    """Generate and return food recommendations chart"""
    try:
        graph_path = visualizer.generate_food_graph()
        return send_file(graph_path, mimetype="image/png")
    except Exception as e:
        return f"Error generating food graph: {str(e)}", 500

@app.route("/public-exercises")
@cross_origin()
def public_exercises():
    """Generate and return exercise recommendations chart"""
    try:
        graph_path = visualizer.generate_exercise_graph()
        return send_file(graph_path, mimetype="image/png")
    except Exception as e:
        return f"Error generating exercise graph: {str(e)}", 500

@app.route("/public-bmi-distribution")
@cross_origin()
def public_bmi_distribution():
    """Generate and return BMI distribution pie chart"""
    try:
        users = get_all_users()
        if not users:
            return "No users in the database", 404
        graph_path = visualizer.generate_bmi_distribution_pie(users)
        return send_file(graph_path, mimetype="image/png")
    except Exception as e:
        return f"Error generating BMI distribution chart: {str(e)}", 500

@app.route("/public-age-distribution")
@cross_origin()
def public_age_distribution():
    """Generate and return age distribution chart"""
    try:
        users = get_all_users()
        if not users:
            return "No users in the database", 404
        graph_path = visualizer.generate_age_distribution_graph(users)
        return send_file(graph_path, mimetype="image/png")
    except Exception as e:
        return f"Error generating age distribution chart: {str(e)}", 500

@app.route("/public-bmi-age-scatter")
@cross_origin()
def public_bmi_age_scatter():
    """Generate and return BMI vs Age scatter plot"""
    try:
        users = get_all_users()
        if not users:
            return "No users in the database", 404
        graph_path = visualizer.generate_bmi_vs_age_scatter(users)
        return send_file(graph_path, mimetype="image/png")
    except Exception as e:
        return f"Error generating BMI vs Age scatter plot: {str(e)}", 500

@app.route("/public-competitions")
@cross_origin()
def public_competitions():
    """Generate and return competition visualization"""
    try:
        competitions = get_all_competitions()
        if not competitions:
            return "No competitions in the database", 404
        graph_path = visualizer.generate_competition_graph(competitions)
        return send_file(graph_path, mimetype='image/png')
    except Exception as e:
        return f"Error generating competition graph: {str(e)}", 500

# === COMPETITION ENDPOINTS ===

@app.route("/competitions", methods=["GET", "POST"])
def competitions():
    """Handle competition creation and listing."""
    if request.method == "POST":
        try:
            data = request.json
            if not data or not data.get("name"):
                return jsonify({"error": "Competition name is required"}), 400
            
            competition_id = create_competition(
                name=data["name"],
                description=data.get("description", ""),
                target_body_type=data.get("target_body_type"),
                min_age=data.get("min_age"),
                max_age=data.get("max_age"),
                start_date=data.get("start_date"),
                end_date=data.get("end_date"),
                max_participants=data.get("max_participants", 50)
            )
            
            return jsonify({
                "competition_id": competition_id,
                "message": "Competition created successfully"
            })
        except Exception as e:
            return jsonify({"error": f"Failed to create competition: {str(e)}"}), 500
    else:
        try:
            competitions = get_all_competitions()
            formatted_competitions = []
            for comp in competitions:
                formatted_competitions.append({
                    "id": comp['id'],
                    "name": comp['name'],
                    "description": comp['description'],
                    "target_body_type": comp['target_body_type'],
                    "min_age": comp['min_age'],
                    "max_age": comp['max_age'],
                    "start_date": comp['start_date'].isoformat() if comp['start_date'] else None,
                    "end_date": comp['end_date'].isoformat() if comp['end_date'] else None,
                    "max_participants": comp['max_participants'],
                    "participant_count": comp['participant_count'],
                    "status": comp['status'],
                    "created_at": comp['created_at'].isoformat() if comp['created_at'] else None
                })
            
            return jsonify({"competitions": formatted_competitions})
        except Exception as e:
            return jsonify({"error": f"Failed to retrieve competitions: {str(e)}"}), 500

@app.route("/competitions/<int:competition_id>/eligible-users", methods=["GET"])
def get_eligible_users(competition_id):
    """Get users eligible for a specific competition."""
    try:
        users = get_eligible_users_for_competition(competition_id)
        formatted_users = []
        for user in users:
            formatted_users.append({
                "id": user['id'],
                "name": user['name'],
                "height": user['height'],
                "weight": user['weight'],
                "age": user['age'],
                "bmi": round(user['bmi'], 2) if user['bmi'] else None,
                "body_type": user['body_type']
            })
        
        return jsonify({
            "competition_id": competition_id,
            "eligible_users": formatted_users,
            "count": len(formatted_users)
        })
    except Exception as e:
        return jsonify({"error": f"Failed to get eligible users: {str(e)}"}), 500

@app.route("/competitions/<int:competition_id>/register", methods=["POST"])
def register_for_competition(competition_id):
    """Register a user for a competition."""
    try:
        data = request.json
        if not data or not data.get("user_id"):
            return jsonify({"error": "User ID is required"}), 400
        
        success, message = register_user_for_competition(competition_id, data["user_id"])
        
        if success:
            return jsonify({"message": message})
        else:
            return jsonify({"error": message}), 400
    except Exception as e:
        return jsonify({"error": f"Registration failed: {str(e)}"}), 500

@app.route("/competitions/<int:competition_id>/participants", methods=["GET"])
def get_participants(competition_id):
    """Get all participants for a specific competition."""
    try:
        participants = get_competition_participants(competition_id)
        formatted_participants = []
        for participant in participants:
            formatted_participants.append({
                "id": participant['id'],
                "name": participant['name'],
                "height": participant['height'],
                "weight": participant['weight'],
                "age": participant['age'],
                "bmi": round(participant['bmi'], 2) if participant['bmi'] else None,
                "body_type": participant['body_type'],
                "registration_date": participant['registration_date'].isoformat() if participant['registration_date'] else None
            })
        
        return jsonify({
            "competition_id": competition_id,
            "participants": formatted_participants,
            "count": len(formatted_participants)
        })
    except Exception as e:
        return jsonify({"error": f"Failed to get participants: {str(e)}"}), 500

@app.route("/competitions-statistics", methods=["GET"])
def competition_statistics():
    """Get competition statistics."""
    try:
        stats = get_competition_statistics()
        return jsonify({
            "total_competitions": stats['total_competitions'],
            "active_competitions": stats['active_competitions'],
            "total_registrations": stats['total_registrations'],
            "avg_participants_per_competition": round(stats['avg_participants_per_competition'], 2) if stats['avg_participants_per_competition'] else 0
        })
    except Exception as e:
        return jsonify({"error": f"Failed to get competition statistics: {str(e)}"}), 500

# === HOME AND HEALTH CHECK ===

@app.route("/")
def home():
    return "Welcome to the Health Tracker API!"

if __name__ == "__main__":
    app.run(debug=True)