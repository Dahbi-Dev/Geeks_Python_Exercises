# menu_manager.py
from menu_item import MenuItem, cursor

class MenuManager:
    @classmethod
    def get_by_name(cls, name):
        cursor.execute("SELECT item_name, item_price FROM menu_items WHERE item_name = %s", (name,))
        row = cursor.fetchone()
        if row:
            return MenuItem(row[0], row[1])
        return None

    @classmethod
    def all_items(cls):
        cursor.execute("SELECT item_name, item_price FROM menu_items")
        rows = cursor.fetchall()
        return [MenuItem(row[0], row[1]) for row in rows]

