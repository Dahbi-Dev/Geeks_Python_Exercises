#🌟 Exercise 3 : What’s your name ?
# Replace "Houss" with your actual name if you want
my_name = "Houss"

user_name = input("Hey! What's your name? ")

if user_name.strip().lower() == my_name.lower():
    print("Whoa! We have the same name 🤯 Are you my clone?")
else:
    print(f"Nice to meet you, {user_name}! But I have to say... my name is cooler 😎")
