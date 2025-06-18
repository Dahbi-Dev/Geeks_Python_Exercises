class Zoo:
    def __init__(self, zoo_name):
        self.zoo_name = zoo_name
        self.animals = []
        print(f"Welcome to {self.zoo_name}!")
    
    def add_animal(self, new_animal):
        if new_animal not in self.animals:
            self.animals.append(new_animal)
            print(f"{new_animal} has been added to {self.zoo_name}")
        else:
            print(f"{new_animal} is already in the zoo!")
    
    def get_animals(self):
        if self.animals:
            print(f"Animals in {self.zoo_name}: {self.animals}")
        else:
            print(f"No animals in {self.zoo_name} yet.")
    
    def sell_animal(self, animal_sold):
        if animal_sold in self.animals:
            self.animals.remove(animal_sold)
            print(f"{animal_sold} has been sold and removed from {self.zoo_name}")
        else:
            print(f"{animal_sold} is not in the zoo, cannot sell!")
    
    def sort_animals(self):
        # Sort animals alphabetically
        sorted_animals = sorted(self.animals, key=str.lower)
        
        # Group by first letter
        animal_groups = {}
        for animal in sorted_animals:
            first_letter = animal[0].upper()
            if first_letter not in animal_groups:
                animal_groups[first_letter] = []
            animal_groups[first_letter].append(animal)
        
        # Store the grouped animals for use by get_groups()
        self.animal_groups = animal_groups
        return animal_groups
    
    def get_groups(self):
        # Call sort_animals to ensure we have current groupings
        groups = self.sort_animals()
        
        if groups:
            print(f"Animals in {self.zoo_name} grouped alphabetically:")
            for letter in sorted(groups.keys()):
                print(f"{letter}: {groups[letter]}")
        else:
            print("No animals to group!")

# Step 2: Create a Zoo instance
ramat_gan_safari = Zoo("Ramat Gan Safari")

print("\n=== Adding Animals ===")
# Step 3: Use the Zoo methods
ramat_gan_safari.add_animal("Giraffe")
ramat_gan_safari.add_animal("Bear")
ramat_gan_safari.add_animal("Baboon")
ramat_gan_safari.add_animal("Lion")
ramat_gan_safari.add_animal("Zebra")
ramat_gan_safari.add_animal("Cat")
ramat_gan_safari.add_animal("Cougar")

print("\n=== Current Animals ===")
ramat_gan_safari.get_animals()

print("\n=== Trying to Add Duplicate ===")
ramat_gan_safari.add_animal("Bear")  # Should not be added

print("\n=== Selling an Animal ===")
ramat_gan_safari.sell_animal("Bear")

print("\n=== Animals After Sale ===")
ramat_gan_safari.get_animals()

print("\n=== Trying to Sell Non-existent Animal ===")
ramat_gan_safari.sell_animal("Elephant")

print("\n=== Grouped Animals ===")
ramat_gan_safari.get_groups()

# Bonus: Demonstrate with another zoo
print("\n" + "="*50)
print("=== Bonus: Another Zoo Example ===")

central_park_zoo = Zoo("Central Park Zoo")
central_park_zoo.add_animal("Penguin")
central_park_zoo.add_animal("Polar Bear")
central_park_zoo.add_animal("Sea Lion")
central_park_zoo.add_animal("Snow Leopard")
central_park_zoo.add_animal("Puffin")

print("\nAnimals in Central Park Zoo:")
central_park_zoo.get_animals()

print("\nGrouped animals:")
central_park_zoo.get_groups()

# Bonus method: Get zoo statistics
def get_zoo_stats(zoo):
    total_animals = len(zoo.animals)
    if hasattr(zoo, 'animal_groups'):
        groups_count = len(zoo.animal_groups)
        print(f"\n=== {zoo.zoo_name} Statistics ===")
        print(f"Total animals: {total_animals}")
        print(f"Animal groups: {groups_count}")
        if zoo.animal_groups:
            most_common_letter = max(zoo.animal_groups.keys(), key=lambda k: len(zoo.animal_groups[k]))
            print(f"Most common starting letter: {most_common_letter} ({len(zoo.animal_groups[most_common_letter])} animals)")

print("\n=== Zoo Statistics ===")
get_zoo_stats(ramat_gan_safari)
get_zoo_stats(central_park_zoo)