# words  bag,hello,without,world
words = input("Enter words separated by commas: ").split(',')
# Sort the words in alphabetical order
sorted_words = sorted(words)
# Print the sorted words    
print("Sorted words:", ', '.join(sorted_words))