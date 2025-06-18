# Challenge 2 : String and Lists
# 

string = input("Enter a string: ")
new_string = ""
for i in range(len(string)):
    if i == 0 or string[i] != string[i - 1]:
        new_string += string[i]
print("New string with consecutive duplicates removed:", new_string)