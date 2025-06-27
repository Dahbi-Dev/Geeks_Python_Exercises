# menu_editor.py
from menu_item import MenuItem
from menu_manager import MenuManager


def show_user_menu():
    print("\n--- Connected to 'restaurant_db' ---")
    while True:
        print("\n--- Menu Editor ---")
        print("V: View an Item")
        print("A: Add an Item")
        print("D: Delete an Item")
        print("U: Update an Item")
        print("S: Show the Menu")
        print("E: Exit")

        choice = input("Enter your choice: ").upper()

        if choice == 'V':
            name = input("Enter the name of the item to view: ")
            item = MenuManager.get_by_name(name)
            if item:
                print(f"{item.name}: {item.price} MAD")
            else:
                print("Item not found.")
        elif choice == 'A':
            add_item_to_menu()
        elif choice == 'D':
            remove_item_from_menu()
        elif choice == 'U':
            update_item_from_menu()
        elif choice == 'S':
            show_restaurant_menu()
        elif choice == 'E':
            print("Final Restaurant Menu:")
            show_restaurant_menu()
            break
        else:
            print("Invalid choice. Try again.")


def add_item_to_menu():
    name = input("Enter item name: ")
    try:
        price = int(input("Enter item price: "))
        item = MenuItem(name, price)
        item.save()
        print("Item added successfully.")
    except ValueError:
        print("Invalid price. Must be a number.")


def remove_item_from_menu():
    name = input("Enter the name of the item to delete: ")
    item = MenuItem(name, 0)
    item.delete()
    print("Item deleted (if it existed).")


def update_item_from_menu():
    old_name = input("Enter current item name: ")
    item = MenuManager.get_by_name(old_name)
    if not item:
        print("Item not found.")
        return

    new_name = input("Enter new name: ")
    try:
        new_price = int(input("Enter new price: "))
        item.update(new_name, new_price)
        print("Item updated successfully.")
    except ValueError:
        print("Invalid price.")


def show_restaurant_menu():
    items = MenuManager.all_items()
    print("\n--- Restaurant Menu ---")
    for item in items:
        print(f"{item.name}: {item.price} MAD")


if __name__ == "__main__":
    show_user_menu()
