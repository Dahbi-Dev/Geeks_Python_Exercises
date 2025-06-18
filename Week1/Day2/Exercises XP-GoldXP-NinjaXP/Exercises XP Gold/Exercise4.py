# Exercise 4: Double Dice

import random

# Step 1: Simulate rolling a single die
def throw_dice():
    return random.randint(1, 6)

# Step 2: Keep rolling until doubles are thrown
def throw_until_doubles():
    count = 0
    while True:
        die1 = throw_dice()
        die2 = throw_dice()
        count += 1
        if die1 == die2:
            break
    return count

# Step 3: Run 100 simulations, store and analyze results
def main():
    all_throws = []

    for _ in range(100):
        throws_needed = throw_until_doubles()
        all_throws.append(throws_needed)

    total_throws = sum(all_throws)
    average_throws = round(total_throws / 100, 2)

    print(f"Total throws to get 100 doubles: {total_throws}")
    print(f"Average throws to reach doubles: {average_throws}")

# Run the program
main()
