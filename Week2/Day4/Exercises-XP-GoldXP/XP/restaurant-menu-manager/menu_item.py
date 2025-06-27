# menu_item.py
import psycopg2
from psycopg2 import sql

try:
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
except Exception as e:
    print("❌ Failed to connect to database:", e)
    exit()

class MenuItem:
    def __init__(self, name, price):
        self.name = name
        self.price = price

    def save(self):
        try:
            cursor.execute("INSERT INTO menu_items (item_name, item_price) VALUES (%s, %s)", (self.name, self.price))
            print(f"✅ Item '{self.name}' saved successfully")
        except psycopg2.errors.UniqueViolation:
            print(f"❌ Item '{self.name}' already exists in the menu")
        except Exception as e:
            print(f"❌ Error saving item: {e}")

    def delete(self):
        try:
            cursor.execute("DELETE FROM menu_items WHERE item_name = %s", (self.name,))
            if cursor.rowcount > 0:
                print(f"✅ Item '{self.name}' deleted successfully")
            else:
                print(f"❌ Item '{self.name}' not found")
        except Exception as e:
            print(f"❌ Error deleting item: {e}")

    def update(self, new_name, new_price):
        try:
            cursor.execute("UPDATE menu_items SET item_name = %s, item_price = %s WHERE item_name = %s",
                           (new_name, new_price, self.name))
            if cursor.rowcount > 0:
                print(f"✅ Item updated from '{self.name}' to '{new_name}' with price {new_price} MAD")
                self.name = new_name
                self.price = new_price
            else:
                print(f"❌ Item '{self.name}' not found")
        except psycopg2.errors.UniqueViolation:
            print(f"❌ Item name '{new_name}' already exists")
        except Exception as e:
            print(f"❌ Error updating item: {e}")