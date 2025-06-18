# Exercise 2: Birthdays Advanced

birthdays = {
    "Alice": "1990/01/15",
    "Bob": "1985/05/22",
    "Charlie": "1992/09/30",
    "Diana": "1988/12/05",
    "Ethan": "1995/07/19"
}

print("Here are the names you can look up:")
for name in birthdays.keys():
    print(name)
    
print("Welcome to the Birthday Look-up!")
name = input("Please enter a person's name: ")
if name in birthdays:
    birthday = birthdays[name]
    print(f"{name}'s birthday is on {birthday}.")
else:
    print(f"Sorry, we don’t have the birthday information for {name}. Please try another name.")
    
