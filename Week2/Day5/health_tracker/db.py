import psycopg2
from psycopg2.extras import RealDictCursor
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Read variables
DB_NAME = os.getenv("DB_NAME")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")

# Connect to database
conn = psycopg2.connect(
    dbname=DB_NAME,
    user=DB_USER,
    password=DB_PASSWORD,
    host=DB_HOST,
    port=DB_PORT,
    cursor_factory=RealDictCursor
)

cur = conn.cursor()

def create_user(height, weight, age, bmi, body_type, advice):
    cur.execute("""
        INSERT INTO users (height, weight, age, bmi, body_type, advice)
        VALUES (%s, %s, %s, %s, %s, %s)
    """, (height, weight, age, bmi, body_type, advice))
    conn.commit()

def get_all_users():
    cur.execute("SELECT * FROM users")
    return cur.fetchall()
