import random

def compare_number():
    while True:
        user_input = input("Please enter a number between 1 and 100: ")
        if user_input.isdigit():
            user_number = int(user_input)
            if 1 <= user_number <= 100:
                break
            else:
                print("Number must be between 1 and 100. Try again.")
        else:
            print("That is not a valid number. Try again.")

    random_number = random.randint(1, 100)

    if user_number == random_number:
        print("Success!")
    else:
        print(f"Fail! Your number: {user_number}, Random number: {random_number}")

# Run the function
compare_number()
