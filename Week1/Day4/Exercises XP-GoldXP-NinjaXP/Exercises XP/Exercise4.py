# 🌟 Exercise 4: Family and Person Classes


class Person:
    def __init__(self, first_name, age, last_name=""):
        self.first_name = first_name
        self.age = age
        self.last_name = last_name 
    
    def is_18(self):
        if self.age >= 18:
            print("Person is 18 or older.")
            return True
        else:
            print("Person is younger than 18.")
            return False
class Family:
    def __init__(self, last_name):
        self.last_name = last_name
        self.members = []
    
    def born(self, first_name, age):
        new_person = Person(first_name, age, self.last_name)
        self.members.append(new_person)
    
    def check_majority(self, first_name):
        for member in self.members:
            if member.first_name == first_name:
                if member.is_18():
                    print(f"You are over 18, your parents {self.members[0].first_name} and {self.members[1].first_name} accept that you will go out with your friends")
                else:
                    print("Sorry, you are not allowed to go out with your friends.")
                return
        print(f"No member found with the name {first_name}.")
    
    def family_presentation(self):
        print(f"Family Name: {self.last_name}")
        print("Members:", len(self.members))
        for member in self.members:
            print(f"{member.first_name}, Age: {member.age}, Last Name: {member.last_name}")
        

p1 = Person("Mustafa", 45, "Dahbi")
p1 = Person("Rachida", 45, "El Idrissi")
print("----------------")
print(p1.is_18()) 
family = Family("Dahbi")
print("-------------")
family.born("Houssam", 18)
family.born("Meriem", 16)
print("-----------------")
family.check_majority("Houssam") 
family.check_majority("Meriem")  
print("--------------")
family.family_presentation()

        
    
            
        

   