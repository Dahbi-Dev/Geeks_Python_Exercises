# auth_cli.py
import psycopg2
import bcrypt

# Connect to PostgreSQL
def get_connection():
    return psycopg2.connect(
        dbname='auth_db',  # You can use the same DB as the menu manager
        user='postgres',
        password='root',
        host='localhost',
        port='7070'
    )

def init_user_table():
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("""
                CREATE TABLE IF NOT EXISTS users (
                    username VARCHAR(50) PRIMARY KEY,
                    password TEXT NOT NULL
                )
            """)

# Hash password
def hash_password(password):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

# Verify password
def verify_password(password, hashed):
    return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))

# Sign up user
def signup():
    with get_connection() as conn:
        with conn.cursor() as cur:
            while True:
                username = input("Choose a username: ")
                cur.execute("SELECT * FROM users WHERE username = %s", (username,))
                if cur.fetchone():
                    print("Username already taken. Try another.")
                else:
                    break
            password = input("Choose a password: ")
            hashed = hash_password(password)
            cur.execute("INSERT INTO users (username, password) VALUES (%s, %s)", (username, hashed))
            print("Signup successful.")

# Login user
def login():
    with get_connection() as conn:
        with conn.cursor() as cur:
            username = input("Username: ")
            password = input("Password: ")
            cur.execute("SELECT password FROM users WHERE username = %s", (username,))
            result = cur.fetchone()
            if result and verify_password(password, result[0]):
                print("You are now logged in.")
                return username
            else:
                print("Invalid credentials.")
                return None

def main():
    init_user_table()
    logged_in = None
    while True:
        command = input("Enter command (login/signup/exit): ").lower()
        if command == "exit":
            print("Exiting...")
            break
        elif command == "login":
            logged_in = login()
        elif command == "signup":
            signup()
        else:
            print("Invalid command.")

if __name__ == "__main__":
    main()
