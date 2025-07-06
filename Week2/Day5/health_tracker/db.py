import psycopg2
from psycopg2.extras import RealDictCursor
from dotenv import load_dotenv
import os
from contextlib import contextmanager

# Load environment variables from .env file
load_dotenv()

# Read variables
DB_NAME = os.getenv("DB_NAME")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")

def get_connection():
    """Get a database connection."""
    return psycopg2.connect(
        dbname=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD,
        host=DB_HOST,
        port=DB_PORT,
        cursor_factory=RealDictCursor
    )

@contextmanager
def get_db_cursor():
    """Context manager for database operations."""
    conn = None
    try:
        conn = get_connection()
        cur = conn.cursor()
        yield cur
        conn.commit()
    except Exception as e:
        if conn:
            conn.rollback()
        raise e
    finally:
        if conn:
            conn.close()

def create_user(name, height, weight, age):
    """Create a new user in the database and return user ID."""
    with get_db_cursor() as cur:
        cur.execute("""
            INSERT INTO users (name, height, weight, age)
            VALUES (%s, %s, %s, %s)
            RETURNING id
        """, (name, height, weight, age))
        return cur.fetchone()['id']

def create_bmi_record(user_id, bmi_value):
    """Create a BMI record for a user."""
    with get_db_cursor() as cur:
        cur.execute("""
            INSERT INTO bmi_records (user_id, bmi_value)
            VALUES (%s, %s)
            RETURNING id
        """, (user_id, bmi_value))
        return cur.fetchone()['id']

def create_advice_record(user_id, body_type, food_advice, exercise_advice):
    """Create an advice record for a user."""
    with get_db_cursor() as cur:
        cur.execute("""
            INSERT INTO advice_records (user_id, body_type, food_advice, exercise_advice)
            VALUES (%s, %s, %s, %s)
            RETURNING id
        """, (user_id, body_type, food_advice, exercise_advice))
        return cur.fetchone()['id']

def get_all_users():
    """Get all users with their BMI data and advice information."""
    with get_db_cursor() as cur:
        cur.execute("""
            SELECT 
                u.id,
                u.name,
                u.height,
                u.weight,
                u.age,
                u.created_at,
                b.bmi_value as bmi,
                a.body_type,
                a.food_advice,
                a.exercise_advice
            FROM users u
            LEFT JOIN bmi_records b ON u.id = b.user_id
            LEFT JOIN advice_records a ON u.id = a.user_id
            ORDER BY u.id
        """)
        return cur.fetchall()

def get_user_by_id(user_id):
    """Get a specific user by ID with all related data."""
    with get_db_cursor() as cur:
        cur.execute("""
            SELECT 
                u.id,
                u.name,
                u.height,
                u.weight,
                u.age,
                u.created_at,
                b.bmi_value as bmi,
                a.body_type,
                a.food_advice,
                a.exercise_advice
            FROM users u
            LEFT JOIN bmi_records b ON u.id = b.user_id
            LEFT JOIN advice_records a ON u.id = a.user_id
            WHERE u.id = %s
        """, (user_id,))
        return cur.fetchone()

def search_users_by_name(name_query):
    """Search users by name (case-insensitive partial match)."""
    with get_db_cursor() as cur:
        cur.execute("""
            SELECT 
                u.id,
                u.name,
                u.height,
                u.weight,
                u.age,
                u.created_at,
                b.bmi_value as bmi,
                a.body_type,
                a.food_advice,
                a.exercise_advice
            FROM users u
            LEFT JOIN bmi_records b ON u.id = b.user_id
            LEFT JOIN advice_records a ON u.id = a.user_id
            WHERE LOWER(u.name) LIKE LOWER(%s)
            ORDER BY u.name
        """, (f"%{name_query}%",))
        return cur.fetchall()

def delete_user(user_id):
    """Delete a user by ID (cascades to BMI records and advice records)."""
    with get_db_cursor() as cur:
        # Delete related records first
        cur.execute("DELETE FROM bmi_records WHERE user_id = %s", (user_id,))
        cur.execute("DELETE FROM advice_records WHERE user_id = %s", (user_id,))
        # Then delete user
        cur.execute("DELETE FROM users WHERE id = %s", (user_id,))
        return cur.rowcount > 0

def get_user_statistics():
    """Get statistics about users and BMI distribution."""
    with get_db_cursor() as cur:
        cur.execute("""
            SELECT 
                COUNT(u.id) as total_users,
                AVG(b.bmi_value) as avg_bmi,
                MIN(b.bmi_value) as min_bmi,
                MAX(b.bmi_value) as max_bmi,
                COUNT(CASE WHEN a.body_type = 'Underweight' THEN 1 END) as underweight_count,
                COUNT(CASE WHEN a.body_type = 'Normal' THEN 1 END) as normal_count,
                COUNT(CASE WHEN a.body_type = 'Overweight' THEN 1 END) as overweight_count,
                COUNT(CASE WHEN a.body_type = 'Obese' THEN 1 END) as obese_count
            FROM users u
            LEFT JOIN bmi_records b ON u.id = b.user_id
            LEFT JOIN advice_records a ON u.id = a.user_id
        """)
        return cur.fetchone()

def get_default_advice(body_type):
    """Get default advice for a body type."""
    advice_map = {
        'Underweight': {
            'food_advice': 'Eat more calorie-dense foods: nuts, avocados, whole grains, protein shakes, and dairy products. Focus on frequent, nutritious meals.',
            'exercise_advice': 'Focus on strength training to build muscle mass. Include compound exercises like squats, deadlifts, and bench press. Limit excessive cardio.'
        },
        'Normal': {
            'food_advice': 'Maintain a balanced diet with fruits, vegetables, lean proteins, whole grains, and healthy fats. Stay hydrated and eat regular meals.',
            'exercise_advice': 'Maintain current activity with a mix of cardio and strength training. Aim for 150 minutes of moderate exercise weekly.'
        },
        'Overweight': {
            'food_advice': 'Focus on portion control, increase vegetables and fruits, choose lean proteins, and limit processed foods. Consider consulting a nutritionist.',
            'exercise_advice': 'Increase cardio activities like brisk walking, swimming, or cycling. Add strength training 2-3 times per week. Gradually increase intensity.'
        },
        'Obese': {
            'food_advice': 'Consult healthcare professionals for a comprehensive plan. Focus on whole foods, reduce calorie intake, and avoid sugary drinks and processed foods.',
            'exercise_advice': 'Start with low-impact activities like walking or swimming. Gradually increase duration and intensity. Consider working with a fitness professional.'
        }
    }
    return advice_map.get(body_type, {
        'food_advice': 'Consult with a healthcare professional for personalized advice.',
        'exercise_advice': 'Consult with a fitness professional for personalized advice.'
    })

# def init_database():
#     """Initialize the database with all required tables."""
#     with get_db_cursor() as cur:
#         # Create users table
#         cur.execute("""
#             CREATE TABLE IF NOT EXISTS users (
#                 id SERIAL PRIMARY KEY,
#                 name VARCHAR(100) NOT NULL DEFAULT 'Anonymous',
#                 height FLOAT NOT NULL CHECK (height > 0),
#                 weight FLOAT NOT NULL CHECK (weight > 0),
#                 age INTEGER NOT NULL CHECK (age > 0),
#                 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
#             )
#         """)
        
#         # Create bmi_records table
#         cur.execute("""
#             CREATE TABLE IF NOT EXISTS bmi_records (
#                 id SERIAL PRIMARY KEY,
#                 user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
#                 bmi_value FLOAT NOT NULL CHECK (bmi_value > 0),
#                 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
#             )
#         """)
        
#         # Create advice_records table
#         cur.execute("""
#             CREATE TABLE IF NOT EXISTS advice_records (
#                 id SERIAL PRIMARY KEY,
#                 user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
#                 body_type VARCHAR(20) NOT NULL,
#                 food_advice TEXT NOT NULL,
#                 exercise_advice TEXT NOT NULL,
#                 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
#             )
#         """)

def create_complete_user_record(name, height, weight, age, bmi, body_type, food_advice, exercise_advice):
    """Create a complete user record with BMI and advice."""
    with get_db_cursor() as cur:
        # Create user
        cur.execute("""
            INSERT INTO users (name, height, weight, age)
            VALUES (%s, %s, %s, %s)
            RETURNING id
        """, (name, height, weight, age))
        user_id = cur.fetchone()['id']
        
        # Create BMI record
        cur.execute("""
            INSERT INTO bmi_records (user_id, bmi_value)
            VALUES (%s, %s)
        """, (user_id, bmi))
        
        # Create advice record
        cur.execute("""
            INSERT INTO advice_records (user_id, body_type, food_advice, exercise_advice)
            VALUES (%s, %s, %s, %s)
        """, (user_id, body_type, food_advice, exercise_advice))
        
        return user_id


def create_competition_table():
    """Create competition table in database initialization."""
    with get_db_cursor() as cur:
        cur.execute("""
            CREATE TABLE IF NOT EXISTS competitions (
                id SERIAL PRIMARY KEY,
                name VARCHAR(200) NOT NULL,
                description TEXT,
                target_body_type VARCHAR(20),
                min_age INTEGER,
                max_age INTEGER,
                start_date DATE,
                end_date DATE,
                max_participants INTEGER DEFAULT 50,
                status VARCHAR(20) DEFAULT 'active',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        
        cur.execute("""
            CREATE TABLE IF NOT EXISTS competition_participants (
                id SERIAL PRIMARY KEY,
                competition_id INTEGER NOT NULL REFERENCES competitions(id) ON DELETE CASCADE,
                user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                UNIQUE(competition_id, user_id)
            )
        """)

def create_competition(name, description, target_body_type=None, min_age=None, max_age=None, 
                      start_date=None, end_date=None, max_participants=50):
    """Create a new competition."""
    with get_db_cursor() as cur:
        cur.execute("""
            INSERT INTO competitions (name, description, target_body_type, min_age, max_age, 
                                    start_date, end_date, max_participants)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING id
        """, (name, description, target_body_type, min_age, max_age, start_date, end_date, max_participants))
        return cur.fetchone()['id']

def get_all_competitions():
    """Get all competitions with participant counts."""
    with get_db_cursor() as cur:
        cur.execute("""
            SELECT c.*, COUNT(cp.user_id) as participant_count
            FROM competitions c
            LEFT JOIN competition_participants cp ON c.id = cp.competition_id
            GROUP BY c.id
            ORDER BY c.created_at DESC
        """)
        return cur.fetchall()

def get_eligible_users_for_competition(competition_id):
    """Get users eligible for a specific competition."""
    with get_db_cursor() as cur:
        cur.execute("""
            SELECT c.target_body_type, c.min_age, c.max_age
            FROM competitions c
            WHERE c.id = %s
        """, (competition_id,))
        
        competition = cur.fetchone()
        if not competition:
            return []
        
        # Build query based on competition criteria
        query = """
            SELECT u.id, u.name, u.height, u.weight, u.age, u.created_at,
                   b.bmi_value as bmi, a.body_type, a.food_advice, a.exercise_advice
            FROM users u
            LEFT JOIN bmi_records b ON u.id = b.user_id
            LEFT JOIN advice_records a ON u.id = a.user_id
            WHERE 1=1
        """
        params = []
        
        if competition['target_body_type']:
            query += " AND a.body_type = %s"
            params.append(competition['target_body_type'])
        
        if competition['min_age']:
            query += " AND u.age >= %s"
            params.append(competition['min_age'])
        
        if competition['max_age']:
            query += " AND u.age <= %s"
            params.append(competition['max_age'])
        
        # Exclude users already registered
        query += """
            AND u.id NOT IN (
                SELECT cp.user_id FROM competition_participants cp 
                WHERE cp.competition_id = %s
            )
        """
        params.append(competition_id)
        
        query += " ORDER BY u.name"
        
        cur.execute(query, params)
        return cur.fetchall()

def register_user_for_competition(competition_id, user_id):
    """Register a user for a competition."""
    with get_db_cursor() as cur:
        # Check if competition exists and has space
        cur.execute("""
            SELECT c.max_participants, COUNT(cp.user_id) as current_participants
            FROM competitions c
            LEFT JOIN competition_participants cp ON c.id = cp.competition_id
            WHERE c.id = %s AND c.status = 'active'
            GROUP BY c.id, c.max_participants
        """, (competition_id,))
        
        result = cur.fetchone()
        if not result:
            return False, "Competition not found or inactive"
        
        if result['current_participants'] >= result['max_participants']:
            return False, "Competition is full"
        
        # Register user
        cur.execute("""
            INSERT INTO competition_participants (competition_id, user_id)
            VALUES (%s, %s)
            RETURNING id
        """, (competition_id, user_id))
        
        return True, "User registered successfully"

def get_competition_participants(competition_id):
    """Get all participants for a specific competition."""
    with get_db_cursor() as cur:
        cur.execute("""
            SELECT u.id, u.name, u.height, u.weight, u.age,
                   b.bmi_value as bmi, a.body_type,
                   cp.registration_date
            FROM competition_participants cp
            JOIN users u ON cp.user_id = u.id
            LEFT JOIN bmi_records b ON u.id = b.user_id
            LEFT JOIN advice_records a ON u.id = a.user_id
            WHERE cp.competition_id = %s
            ORDER BY cp.registration_date
        """, (competition_id,))
        return cur.fetchall()

def get_competition_statistics():
    """Get competition statistics."""
    with get_db_cursor() as cur:
        cur.execute("""
            SELECT 
                COUNT(c.id) as total_competitions,
                COUNT(CASE WHEN c.status = 'active' THEN 1 END) as active_competitions,
                COUNT(cp.user_id) as total_registrations,
                AVG(participant_counts.count) as avg_participants_per_competition
            FROM competitions c
            LEFT JOIN competition_participants cp ON c.id = cp.competition_id
            LEFT JOIN (
                SELECT competition_id, COUNT(user_id) as count
                FROM competition_participants
                GROUP BY competition_id
            ) participant_counts ON c.id = participant_counts.competition_id
        """)
        return cur.fetchone()

# Update your init_database function to include competition tables
def init_database():
    """Initialize the database with all required tables."""
    with get_db_cursor() as cur:
        # Existing tables...
        cur.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL DEFAULT 'Anonymous',
                height FLOAT NOT NULL CHECK (height > 0),
                weight FLOAT NOT NULL CHECK (weight > 0),
                age INTEGER NOT NULL CHECK (age > 0),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        
        cur.execute("""
            CREATE TABLE IF NOT EXISTS bmi_records (
                id SERIAL PRIMARY KEY,
                user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                bmi_value FLOAT NOT NULL CHECK (bmi_value > 0),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        
        cur.execute("""
            CREATE TABLE IF NOT EXISTS advice_records (
                id SERIAL PRIMARY KEY,
                user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                body_type VARCHAR(20) NOT NULL,
                food_advice TEXT NOT NULL,
                exercise_advice TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        
        # New competition tables
        cur.execute("""
            CREATE TABLE IF NOT EXISTS competitions (
                id SERIAL PRIMARY KEY,
                name VARCHAR(200) NOT NULL,
                description TEXT,
                target_body_type VARCHAR(20),
                min_age INTEGER,
                max_age INTEGER,
                start_date DATE,
                end_date DATE,
                max_participants INTEGER DEFAULT 50,
                status VARCHAR(20) DEFAULT 'active',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        
        cur.execute("""
            CREATE TABLE IF NOT EXISTS competition_participants (
                id SERIAL PRIMARY KEY,
                competition_id INTEGER NOT NULL REFERENCES competitions(id) ON DELETE CASCADE,
                user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                UNIQUE(competition_id, user_id)
            )
        """)


if __name__ == "__main__":
    # Initialize database when run directly
    try:
        init_database()
        print("Database initialized successfully!")
        print("Tables created:")
        print("- users: stores user basic information (id, name, height, weight, age)")
        print("- bmi_records: stores BMI calculations (user_id, bmi_value)")
        print("- advice_records: stores body type and advice (user_id, body_type, food_advice, exercise_advice)")
    except Exception as e:
        print(f"Error initializing database: {e}")