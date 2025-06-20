# 🌟 Exercise 1: Pets
# Step 1: Provided Classes
class Pets():
    def __init__(self, animals):
        self.animals = animals

    def walk(self):
        for animal in self.animals:
            print(animal.walk())

class Cat():
    is_lazy = True

    def __init__(self, name, age):
        self.name = name
        self.age = age

    def walk(self):
        return f'{self.name} is just walking around'

class Bengal(Cat):
    def sing(self, sounds):
        return f'{sounds}'

class Chartreux(Cat):
    def sing(self, sounds):
        return f'{sounds}'

# ✅ Step 1: Create the Siamese Class
class Siamese(Cat):
    def __init__(self, name, age, color):
        super().__init__(name, age)
        self.color = color  # extra attribute

    def sing(self, sounds):
        return f'{sounds}'

# ✅ Step 2: Create a list of cat instances
bengal_cat = Bengal("Leo", 3)
chartreux_cat = Chartreux("Mia", 2)
siamese_cat = Siamese("Luna", 4, "blue")

all_cats = [bengal_cat, chartreux_cat, siamese_cat]

# ✅ Step 3: Create a Pets instance
sara_pets = Pets(all_cats)

# ✅ Step 4: Take cats for a walk
sara_pets.walk()
