# Exercise 3: Working on a paragraph

paragraph = "In the heart of the bustling city, where skyscrapers kissed the clouds and the streets buzzed with life, there was a small, unassuming café. This café, known only to a few, was a sanctuary for those seeking solace from the chaos outside. The aroma of freshly brewed coffee wafted through the air, mingling with the sweet scent of pastries that lined the glass display case."
# Calculate the number of characters
num_characters = len(paragraph) 
# Calculate the number of sentences
num_sentences = paragraph.count('.') + paragraph.count('!') + paragraph.count('?')  # Simple sentence count based on punctuation
# Calculate the number of words
num_words = len(paragraph.split())
# Calculate the number of unique words
unique_words = set(paragraph.lower().split())
num_unique_words = len(unique_words)
# Calculate the number of non-whitespace characters
num_non_whitespace_chars = len(paragraph.replace(" ", "").replace("\n", ""))
# Calculate the average number of words per sentence
average_words_per_sentence = num_words / num_sentences if num_sentences > 0 else 0
# Calculate the number of non-unique words
non_unique_words = num_words - num_unique_words
# Print the results
print(f"Paragraph Analysis:")
print(f"Total characters: {num_characters}")
print(f"Total sentences: {num_sentences}")  
print(f"Total words: {num_words}")
print(f"Unique words: {num_unique_words}")
print(f"Non-whitespace characters: {num_non_whitespace_chars}")
print(f"Average words per sentence: {average_words_per_sentence:.2f}")
print(f"Non-unique words: {non_unique_words}")
