# Exercise 6: Number Guessing Game

user_number = int(input("Enter a number from 1 to 9: "))
print("You entered:", user_number)

for i in range(1, 10):
    random_number = i
    print("Random number is:", random_number)
    if user_number == random_number:
        print("Winner")
        break
    else:
        print("Better luck next time.")
        continue
    