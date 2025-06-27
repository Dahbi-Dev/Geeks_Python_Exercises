# db_setup.py
import psycopg2

def setup_database():
    try:
        # Connect to the database
        conn = psycopg2.connect(
            dbname='restaurant_db', 
            user='postgres', 
            password='root', 
            host='localhost', 
            port='7070'
        )
        conn.autocommit = True
        cursor = conn.cursor()
        print("✅ Connected to PostgreSQL database 'restaurant_db'")
        
        # Check if table exists
        cursor.execute("""
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_schema = 'public' 
                AND table_name = 'menu_items'
            );
        """)
        
        table_exists = cursor.fetchone()[0]
        
        if table_exists:
            print("✅ Table 'menu_items' already exists")
            
            # Show current table structure
            cursor.execute("""
                SELECT column_name, data_type, is_nullable
                FROM information_schema.columns 
                WHERE table_name = 'menu_items'
                ORDER BY ordinal_position;
            """)
            
            columns = cursor.fetchall()
            print("\nCurrent table structure:")
            for col in columns:
                print(f"  - {col[0]} ({col[1]}) {'NULL' if col[2] == 'YES' else 'NOT NULL'}")
                
        else:
            print("❌ Table 'menu_items' does not exist. Creating it...")
            
            # Create the table
            cursor.execute("""
                CREATE TABLE menu_items (
                    id SERIAL PRIMARY KEY,
                    item_name VARCHAR(100) NOT NULL UNIQUE,
                    item_price INTEGER NOT NULL CHECK (item_price >= 0)
                );
            """)
            
            print("✅ Table 'menu_items' created successfully")
        
        # Show existing data (if any)
        cursor.execute("SELECT COUNT(*) FROM menu_items;")
        count = cursor.fetchone()[0]
        print(f"\nCurrent number of items in menu: {count}")
        
        if count > 0:
            cursor.execute("SELECT item_name, item_price FROM menu_items;")
            items = cursor.fetchall()
            print("\nExisting menu items:")
            for item in items:
                print(f"  - {item[0]}: {item[1]} MAD")
        
        cursor.close()
        conn.close()
        print("\n✅ Database setup completed successfully!")
        
    except Exception as e:
        print(f"❌ Error setting up database: {e}")

if __name__ == "__main__":
    setup_database()