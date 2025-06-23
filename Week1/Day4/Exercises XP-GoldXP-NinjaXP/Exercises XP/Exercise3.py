# Create a class called PetDog that inherits from the Dog class.
# Add a trained attribute to the __init__ method, with a default value of False.
# trained means that the dog is trained to do some tricks.
# Implement a train() method that prints the output of bark() and sets trained to True.
# Implement a play(*args) method that prints “ all play together”.
# *args on this method is a list of dog instances.
# Implement a do_a_trick() method that prints a random trick if trained is True.
# Use this list for the ramdom tricks:
# tricks = ["does a barrel roll", "stands on his back legs", "shakes your hand", "plays dead"]
# Choose a rendom index from it each time the method is called.
# tricks = ["does a barrel roll", "stands on his back legs", "shakes your hand", "plays dead"]



# 🌟 Exercise 3: Dogs Domesticated
from Exercise2 import Dog

class PetDog(Dog):
    def __init__(self, name, age, weight, trained=False):
        super().__init__(name, age, weight)
        self.trained = trained

    def train(self):
        self.trained = True
        print(self.bark() + " and is now trained.")
    def play(self, *args):
        print(f"{self.name} plays with " + ", ".join(dog.name for dog in args) + " all play together.")
        

dog = PetDog("Rex", 4, 30)
print(dog.bark())       
dog.train()             
