#Exercise 2: What’s your name?


def get_full_name(first_name, last_name, middle_name=None):
    
    # Capitalize each name component
    first = first_name.capitalize()
    last = last_name.capitalize()
    
    if middle_name:
        middle = middle_name.capitalize()
        return f"{first} {middle} {last}"
    else:
        return f"{first} {last}"


# Example usage:
print(get_full_name(first_name="john", middle_name="hooker", last_name="lee"))
# Output: John Hooker Lee

print(get_full_name(first_name="bruce", last_name="lee"))
# Output: Bruce Lee

# Additional test cases:
print(get_full_name("jane", "doe"))
# Output: Jane Doe

print(get_full_name("mary", "smith", "elizabeth"))
# Output: Mary Elizabeth Smith