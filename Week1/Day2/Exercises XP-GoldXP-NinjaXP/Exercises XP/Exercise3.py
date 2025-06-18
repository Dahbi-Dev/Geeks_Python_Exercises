#  Exercise 3: Zara
# Step 1: Create the dictionary
brand = {
    "name": "Zara",
    "creation_date": 1975,
    "creator_name": "Amancio Ortega Gaona",
    "type_of_clothes": ["men", "women", "children", "home"],
    "international_competitors": ["Gap", "H&M", "Benetton"],
    "number_stores": 7000,
    "major_color": {
        "France": "blue",
        "Spain": "red",
        "US": ["pink", "green"]
    }
}

# Step 2: Modify and access the dictionary

# Change number of stores
brand["number_stores"] = 2

# Describe Zara’s clients
print(f"Zara's clients are: {', '.join(brand['type_of_clothes'])}.")

# Add country_creation
brand["country_creation"] = "Spain"

# Add “Desigual” if international_competitors exists
if "international_competitors" in brand:
    brand["international_competitors"].append("Desigual")

# Delete creation_date
brand.pop("creation_date")

# Print last item in international_competitors
print("Last international competitor:", brand["international_competitors"][-1])

# Print major colors in the US
print("Major colors in the US:", ', '.join(brand["major_color"]["US"]))

# Print number of keys
print("Number of keys in brand dictionary:", len(brand))

# Print all keys
print("All keys in brand dictionary:", list(brand.keys()))

# BONUS: Merge with more_on_zara
more_on_zara = {
    "creation_date": 1975,
    "number_stores": 10000
}

brand.update(more_on_zara)

# Print updated brand dictionary
print("\nUpdated brand dictionary:")
for key, value in brand.items():
    print(f"{key}: {value}")
