#🌟 Exercise 6: Tuple of integers : Given a tuple of integers, try to add more integers to the tuple.
fruit_tuple = (1, 2, 3, 4, 5)
 
fruit_list = list(fruit_tuple)
fruit_list.append(6)
fruit_list.append(7)
fruit_tuple = tuple(fruit_list) 
print("Updated tuple:", fruit_tuple)