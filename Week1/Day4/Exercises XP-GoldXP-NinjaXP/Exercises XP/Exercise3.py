# 🌟 Exercise 3: Dogs Domesticated
from Exercise2 import Dog

class PetDog(Dog):
    def __init__(self, name, age, weight, trained=False):
        super().__init__(name, age, weight)
        self.trained = trained

    def train(self):
        self.trained = True
        print(self.bark() + " and is now trained.")

dog = PetDog("Rex", 4, 30)
print(dog.bark())       
dog.train()             
