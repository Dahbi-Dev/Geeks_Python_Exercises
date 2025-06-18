# Exercise 2: Cinemax 

family = input("Enter family members' names and ages in the format 'name:age,name:age,...': ")
family = dict(item.split(':') for item in family.split(','))

total_cost = 0
for name, age in family.items():
    age = int(age)  # Convert age to integer for comparison
    if age < 3:
        cost = 0
    elif 3 <= age <= 12:
        cost = 10
    else:
        cost = 15
    total_cost += cost
print(f"Total cost for movie tickets: ${total_cost}")