from flask import Flask, jsonify, request
from flask_cors import CORS


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

userDatabase = []

@app.route('/')
def index():
    return jsonify({"message": "Welcome to the Flask API!"})

@app.route('/users', methods=['GET'])
def get_users():
    return jsonify({"users": userDatabase}), 200

@app.route('/users', methods=['POST'])
def add_user():
    user = request.json
    userDatabase.append(user)
    return jsonify({"message": "User added successfully!"}), 201

@app.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    if user_id < 0 or user_id >= len(userDatabase):
        return jsonify({"error": "User not found"}), 404
    return jsonify({"user": userDatabase[user_id]}), 200    

@app.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    if user_id < 0 or user_id >= len(userDatabase):
        return jsonify({"error": "User not found"}), 404
    user = request.json
    userDatabase[user_id] = user
    return jsonify({"message": "User updated successfully!"}), 200

@app.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    if user_id < 0 or user_id >= len(userDatabase):
        return jsonify({"error": "User not found"}), 404
    userDatabase.pop(user_id)
    return jsonify({"message": "User deleted successfully!"}), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
