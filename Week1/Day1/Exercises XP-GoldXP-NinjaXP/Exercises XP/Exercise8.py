#🌟 Exercise 8 : Sandwich Orders
sandwich_orders = ["Tuna sandwich", "Pastrami sandwich", "Avocado sandwich", "Pastrami sandwich", "Egg sandwich", "Chicken sandwich", "Pastrami sandwich"]

#remove all occurrences of Pastrami sandwich from sandwich_orders
while "Pastrami sandwich" in sandwich_orders:
    sandwich_orders.remove("Pastrami sandwich")
print("Updated sandwich orders:", sandwich_orders)

#Create an empty list called finished_sandwiches.
finished_sandwiches = []


#Loop through sandwich_orders and move each sandwich to finished_sandwiches.
for sandwich in sandwich_orders:
    finished_sandwiches.append(sandwich)
    print(f"I made your {sandwich.lower()}")
    
    