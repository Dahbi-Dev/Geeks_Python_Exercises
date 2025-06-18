# Exercise 3: Check the index


names = ['Samus', 'Cortana', 'V', 'Link', 'Mario', 'Cortana', 'Samus']
name = input("Please enter your name: ")
if name in names:
    index = names.index(name)
    print(f"The index of the first occurrence of '{name}' is: {index}")
else:
    print(f"Sorry, '{name}' is not in the list.")
    