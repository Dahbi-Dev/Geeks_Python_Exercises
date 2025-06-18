# 🌟 Exercise 5 : Random
import random

def compare_number(user_number):
    random_number = random.randint(1, 100)
    if user_number == random_number:
        print("Success!")
    else:
        print(f"Fail! Your number: {user_number}, Random number: {random_number}")

# Example call
compare_number(50)
