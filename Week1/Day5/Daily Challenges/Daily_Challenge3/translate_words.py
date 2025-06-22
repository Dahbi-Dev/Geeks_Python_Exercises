from translator_data import french_to_english

# Words to translate
french_words = ["Bonjour", "Au revoir", "Bienvenue", "A bientôt"]

# Translate using the dictionary
translated_output = {word: french_to_english.get(word, "Not found") for word in french_words}

# Display result
print("Translated Dictionary:")
print(translated_output)

