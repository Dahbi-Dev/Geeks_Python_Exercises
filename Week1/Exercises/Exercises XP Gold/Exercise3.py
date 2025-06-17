
# 🌟 Exercise 3: While Loop

# Print a message saying "Hello, [name]!" when the loop stops.
name = input("Enter your name: ")
while name != "YourName":  # Replace "YourName" with your actual name
    name = input("That's not my name. Please enter your name again: ")
print(f"Hello, {name}!")