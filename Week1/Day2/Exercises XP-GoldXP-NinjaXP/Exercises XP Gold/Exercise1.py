# Exercise 1: Birthday Look-up

birthdays = {
    "Alice": "1990/01/15",
    "Bob": "1985/05/22",
    "Charlie": "1992/09/30",
    "Diana": "1988/12/05",
    "Ethan": "1995/07/19"
}
print("Welcome to the Birthday Look-up!")
print("You can look up the birthdays of the people in the list!")
name = input("Please enter a person's name: ")
if name in birthdays:
    birthday = birthdays[name]
    print(f"{name}'s birthday is on {birthday}.")
else:
    print(f"Sorry, I don't have a birthday for {name}. Please try another name.")
