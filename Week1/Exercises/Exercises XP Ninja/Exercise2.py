# Exercise 2 : Longest word without a specific character

longest_sentence = ""
while True:
    user_input = input("Enter a sentence without the character 'A': ")
    
    if 'A' in user_input or 'a' in user_input:
        print("Your sentence contains the character 'A'. Please try again.")
        continue
    
    if len(user_input) > len(longest_sentence):
        longest_sentence = user_input
        print(f"Congratulations! Your new longest sentence is: '{longest_sentence}'")
    else:
        print(f"Your sentence is not longer than the current longest sentence: '{longest_sentence}'")