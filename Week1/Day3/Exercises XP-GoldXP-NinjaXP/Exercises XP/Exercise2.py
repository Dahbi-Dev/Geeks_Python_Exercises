class Dog:
    def __init__(self, name, height):
        self.name = name
        self.height = height
    
    def bark(self):
        print(f"{self.name} goes woof!")
    
    def jump(self):
        jump_height = self.height * 2
        print(f"{self.name} jumps {jump_height} cm high!")

# Step 2: Create Dog Objects
davids_dog = Dog("Buddy", 30)
sarahs_dog = Dog("Luna", 25)

# Step 3: Print Dog Details and Call Methods
print("=== Dog Details ===")
print(f"David's dog: {davids_dog.name}, Height: {davids_dog.height} cm")
print(f"Sarah's dog: {sarahs_dog.name}, Height: {sarahs_dog.height} cm")

print("\n=== Dog Actions ===")
# Call methods for David's dog
davids_dog.bark()
davids_dog.jump()

# Call methods for Sarah's dog
sarahs_dog.bark()
sarahs_dog.jump()

# Step 4: Compare Dog Sizes
print("\n=== Size Comparison ===")
if davids_dog.height > sarahs_dog.height:
    print(f"{davids_dog.name} is taller than {sarahs_dog.name}")
elif sarahs_dog.height > davids_dog.height:
    print(f"{sarahs_dog.name} is taller than {davids_dog.name}")
else:
    print(f"{davids_dog.name} and {sarahs_dog.name} are the same height")

# Bonus: Find the taller dog and show the height difference
if davids_dog.height != sarahs_dog.height:
    taller_dog = davids_dog if davids_dog.height > sarahs_dog.height else sarahs_dog
    shorter_dog = sarahs_dog if davids_dog.height > sarahs_dog.height else davids_dog
    height_difference = abs(davids_dog.height - sarahs_dog.height)
    print(f"{taller_dog.name} is {height_difference} cm taller than {shorter_dog.name}")