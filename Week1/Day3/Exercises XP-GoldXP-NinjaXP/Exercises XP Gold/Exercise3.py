class MenuManager:
    def __init__(self):
        self.menu = [
            {"name": "Soup", "price": 10, "spice": "B", "gluten": False},
            {"name": "Hamburger", "price": 15, "spice": "A", "gluten": True},
            {"name": "Salad", "price": 18, "spice": "A", "gluten": False},
            {"name": "French Fries", "price": 5, "spice": "C", "gluten": False},
            {"name": "Beef bourguignon", "price": 25, "spice": "B", "gluten": True}
        ]
    
    def add_item(self, name, price, spice, gluten):
        new_dish = {"name": name, "price": price, "spice": spice, "gluten": gluten}
        self.menu.append(new_dish)
        print(f"Added {name} to the menu")
    
    def update_item(self, name, price, spice, gluten):
        for dish in self.menu:
            if dish["name"] == name:
                dish["price"] = price
                dish["spice"] = spice
                dish["gluten"] = gluten
                print(f"Updated {name}")
                return
        print(f"{name} is not in the menu")
    
    def remove_item(self, name):
        for dish in self.menu:
            if dish["name"] == name:
                self.menu.remove(dish)
                print(f"Removed {name}")
                print("Updated menu:", self.menu)
                return
        print(f"{name} is not in the menu")

# Testing the MenuManager
print("=== Restaurant Menu Manager ===")

# Create menu manager
manager = MenuManager()

# Display initial menu
print("Initial menu:")
for dish in manager.menu:
    print(f"- {dish['name']}: ${dish['price']} (Spice: {dish['spice']}, Gluten: {dish['gluten']})")

print("\n=== Adding Item ===")
manager.add_item("Pizza", 12, "A", True)

print("\n=== Updating Item ===")
manager.update_item("Soup", 12, "A", False)
manager.update_item("Pasta", 20, "B", True)  # Not in menu

print("\n=== Removing Item ===")
manager.remove_item("French Fries")

print("\n=== Trying to Remove Non-existent Item ===")
manager.remove_item("Sushi")