# Instructions
# Write a function that finds the longest 
# word in a sentence. If two or more words are found,
# return the first longest word.
# Characters such as apostrophe, comma, period 
# count as part of the word (e.g. O’Connor is 8 characters long).

def longest_word(sentence):
    if not sentence:
        return None
    words = sentence.split()
    longest = ""    
    for word in words:
        # Check if the current word is longer than the longest found so far
        if len(word) > len(longest):
            longest = word
    return longest

# Example usage

if __name__ == "__main__":
    sentence = input("Enter a sentence: ")
    result = longest_word(sentence)
    if result:
        print("The longest word is:", result)
    else:
        print("No words found in the sentence.")
