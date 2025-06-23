# 🌟 Exercise 2: Dogs

class Dog:
    def __init__(self, name, age, weight):
        self.name = name
        self.age = age
        self.weight = weight
    
    def bark(self):
        return f"{self.name} is barking"
    
    def run_speed(self):
        return self.weight / self.age * 10
    
    def fight(self, other_dog):
        self_speed = self.run_speed() * self.weight
        other_speed = other_dog.run_speed() * other_dog.weight
        
        if self_speed > other_speed:
            return f"{self.name} wins the fight against {other_dog.name}"
        elif self_speed < other_speed:
            return f"{other_dog.name} wins the fight against {self.name}"
        else:
            return "It's a tie!"
        
    
    
    
dog1 = Dog("Buddy", 5, 20)
print(dog1.bark())
dog2 = Dog("Max", 3, 25)
print(dog2.bark())

print(dog1.fight(dog2))
print("---------------------")
