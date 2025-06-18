# Exercise 1: Converting Lists into Dictionaries

keys = ['Ten', 'Twenty', 'Thirty']
values = [10, 20, 30]
# Using the zip function to combine the two lists into a dictionary
result_dict = dict(zip(keys, values))
print(result_dict)