#🌟 Exercise 8: Pizza Toppings

toppings = []
price_per_topping = 2.50
base_price = 10.00

print("Welcome to the Pizza Builder!")
print("Enter your toppings one by one. Type 'quit' to finish.\n")

while True:
    topping = input("Enter a topping: ").strip()
    
    if topping.lower() == 'quit':
        break
    if topping == '':
        continue  # Skip empty input

    toppings.append(topping)
    print(f"Adding {topping} to your pizza.")

# Final summary
total_price = base_price + len(toppings) * price_per_topping

print("\n--- Pizza Summary ---")
print("Toppings added:")
for t in toppings:
    print(f"- {t}")
print(f"Total cost: ${total_price:.2f}")
