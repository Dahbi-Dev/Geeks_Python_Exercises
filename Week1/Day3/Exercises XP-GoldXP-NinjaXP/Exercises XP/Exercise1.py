class Cat:
    def __init__(self, cat_name, cat_age):
        self.name = cat_name
        self.age = cat_age

# Step 1: Create cat objects
cat1 = Cat("Whiskers", 5)
cat2 = Cat("Luna", 8)
cat3 = Cat("Max", 3)

# Step 2: Create a function to find the oldest cat
def find_oldest_cat(cat1, cat2, cat3):
    # Start by assuming the first cat is the oldest
    oldest = cat1
    
    # Compare with the second cat
    if cat2.age > oldest.age:
        oldest = cat2
    
    # Compare with the third cat
    if cat3.age > oldest.age:
        oldest = cat3
    
    return oldest

# Step 3: Print the oldest cat's details
oldest_cat = find_oldest_cat(cat1, cat2, cat3)
print(f"The oldest cat is {oldest_cat.name}, and is {oldest_cat.age} years old.")

# Bonus: Let's also print all cats for comparison
print("\nAll cats:")
print(f"- {cat1.name} is {cat1.age} years old")
print(f"- {cat2.name} is {cat2.age} years old")
print(f"- {cat3.name} is {cat3.age} years old")