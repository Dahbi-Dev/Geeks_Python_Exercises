#Exercise 1: Cars


# Original string
car_string = "Volkswagen, Toyota, Ford Motor, Honda, Chevrolet"

# Convert string to list (automatically)
car_list = [car.strip() for car in car_string.split(",")]

# Print number of companies
print(f"Number of manufacturers: {len(car_list)}")

# Print list in reverse alphabetical order (Z–A)
print("Manufacturers (Z-A):", sorted(car_list, reverse=True))

# Count how many have the letter 'o' (case insensitive)
count_o = sum(1 for car in car_list if 'o' in car.lower())

# Count how many do NOT have the letter 'i'
count_no_i = sum(1 for car in car_list if 'i' not in car.lower())

print(f"Manufacturers with the letter 'o': {count_o}")
print(f"Manufacturers without the letter 'i': {count_no_i}")

# --- BONUS Part ---

# List with duplicates
cars_with_duplicates = ["Honda", "Volkswagen", "Toyota", "Ford Motor", "Honda", "Chevrolet", "Toyota"]

# Remove duplicates while preserving order
seen = set()
unique_cars = []
for car in cars_with_duplicates:
    if car not in seen:
        seen.add(car)
        unique_cars.append(car)

# Print comma-separated string
print("Unique manufacturers:", ", ".join(unique_cars))
print(f"Number of unique manufacturers: {len(unique_cars)}")

# Bonus: A-Z, with each name's letters reversed
reversed_names = [car[::-1] for car in sorted(unique_cars)]
print("Manufacturers (A-Z), letters reversed:", reversed_names)
