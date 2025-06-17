#🌟 Exercise 5 : Favorite Numbers
# Create a set with your favorite numbers
my_fav_numbers = {7, 13, 21}
print("My favorite numbers:", my_fav_numbers)

my_fav_numbers.add(42)
my_fav_numbers.add(88)
print("After adding two numbers:", my_fav_numbers)

# Remove the last number added (we assume 88 here)
my_fav_numbers.remove(88)
print("After removing the last added number:", my_fav_numbers)

# Create another set for your friend's favorite numbers
friend_fav_numbers = {3, 14, 21}
print("Friend's favorite numbers:", friend_fav_numbers)

# Concatenate both sets using union
our_fav_numbers = my_fav_numbers.union(friend_fav_numbers)
print("Our favorite numbers:", our_fav_numbers)
