#🌟 Exercise 7: List Manipulation
basket = ["Banana", "Apples", "Oranges", "Blueberries"]

# remove "Banana" from the list
basket.remove("Banana")
print("After removing Banana:", basket)

# add "Kiwi" to the end of the list
basket.remove("Blueberries")
print("After removing Blueberries:", basket)

# add "Kiwi" to the end of the list
basket.append("Kiwi")
print("After adding Kiwi:", basket)

# insert "Apples" at the beginning of the list
basket.insert(0, "Apples")
print("After inserting Apples at the beginning:", basket)

# check if "Apples" is in the list
basket.count("Apples")
print("Count of Apples:", basket.count("Apples"))

# empty the list
basket.clear()

print("Final basket:", basket)