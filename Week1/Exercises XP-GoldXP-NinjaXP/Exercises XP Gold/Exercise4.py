# Exercise 4: Check the index
# Using this variable:

# names = ['Samus', 'Cortana', 'V', 'Link', 'Mario', 'Cortana', 'Samus']

# Ask a user for their name, if their name is in the names list print out the index of the first occurrence of the name.

# Example: if input is Cortana we should be printing the index 1
names = ['Samus', 'Cortana', 'V', 'Link', 'Mario', 'Cortana', 'Samus']
user_input = input("Enter your name: ")
if user_input in names:
    index = names.index(user_input)
    print(f"The index of '{user_input}' is: {index}")
else:
    print(f"'{user_input}' is not in the list.")