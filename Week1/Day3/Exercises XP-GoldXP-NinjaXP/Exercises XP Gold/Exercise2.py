class MyList:
    def __init__(self, letters):
        self.letters = letters
    
    def reverse(self):
        return self.letters[::-1]
    
    def sort(self):
        return sorted(self.letters)
    
    def random_numbers(self):
        # Simple random number generator without imports
        seed = 12345
        random_list = []
        for i in range(len(self.letters)):
            seed = (seed * 1103515245 + 12345) % (2**31)
            random_list.append(seed % 100)  # Numbers 0-99
        return random_list

# Testing the MyList class
print("=== MyList Examples ===")

# Create MyList with letters
my_list = MyList(['d', 'a', 'c', 'b', 'e'])
print(f"Original list: {my_list.letters}")
print(f"Reversed: {my_list.reverse()}")
print(f"Sorted: {my_list.sort()}")
print(f"Random numbers: {my_list.random_numbers()}")

print()

# Another example
my_list2 = MyList(['z', 'x', 'a', 'm'])
print(f"Original list: {my_list2.letters}")
print(f"Reversed: {my_list2.reverse()}")
print(f"Sorted: {my_list2.sort()}")
print(f"Random numbers: {my_list2.random_numbers()}")