class Farm:
    def __init__(self, farm_name):
        self.name = farm_name
        self.animals = {}
    
    def add_animal(self, animal_type, count=1):
        if animal_type in self.animals:
            self.animals[animal_type] += count
        else:
            self.animals[animal_type] = count
    
    def get_info(self):
        result = f"{self.name}'s farm\n\n"
        for animal, count in self.animals.items():
            result += f"{animal} : {count}\n"
        result += "\n    E-I-E-I-0!\n"
        return result
    
    def get_animal_types(self):
        return sorted(self.animals.keys())
    
    def get_short_info(self):
        animal_types = self.get_animal_types()
        animal_names = []
        
        for animal in animal_types:
            if self.animals[animal] > 1:
                animal_names.append(animal + "s")
            else:
                animal_names.append(animal)
        
        if len(animal_names) == 1:
            animals_str = animal_names[0]
        elif len(animal_names) == 2:
            animals_str = f"{animal_names[0]} and {animal_names[1]}"
        else:
            animals_str = ", ".join(animal_names[:-1]) + f" and {animal_names[-1]}"
        
        return f"{self.name}'s farm has {animals_str}."


# Test the code
macdonald = Farm("McDonald")
macdonald.add_animal('cow', 5)
macdonald.add_animal('sheep')
macdonald.add_animal('sheep')
macdonald.add_animal('goat', 12)

print(macdonald.get_info())
print("Animal types:", macdonald.get_animal_types())
print(macdonald.get_short_info())