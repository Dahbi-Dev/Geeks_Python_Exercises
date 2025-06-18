#Exercise 3: From English to Morse

# Morse code dictionary
morse_dict = {
    'A': '.-',    'B': '-...',  'C': '-.-.', 
    'D': '-..',   'E': '.',     'F': '..-.',
    'G': '--.',   'H': '....',  'I': '..',
    'J': '.---',  'K': '-.-',   'L': '.-..',
    'M': '--',    'N': '-.',    'O': '---',
    'P': '.--.',  'Q': '--.-',  'R': '.-.',
    'S': '...',   'T': '-',     'U': '..-',
    'V': '...-',  'W': '.--',   'X': '-..-',
    'Y': '-.--',  'Z': '--..',
    '0': '-----', '1': '.----', '2': '..---',
    '3': '...--', '4': '....-', '5': '.....',
    '6': '-....', '7': '--...', '8': '---..',
    '9': '----.', ' ': '/',     # space becomes slash
}

# Reversed dictionary for decoding
reverse_dict = {value: key for key, value in morse_dict.items()}

# Function to convert text to Morse code
def text_to_morse(text):
    text = text.upper()
    morse = [morse_dict.get(char, '') for char in text]
    return ' '.join(morse)

# Function to convert Morse code to text
def morse_to_text(morse):
    words = morse.split(' / ')  # split words
    decoded = []
    for word in words:
        letters = word.split()  # split letters
        decoded_word = ''.join([reverse_dict.get(letter, '') for letter in letters])
        decoded.append(decoded_word)
    return ' '.join(decoded)

# Test examples
english = "hello world"
morse = text_to_morse(english)
print(f"English to Morse: {morse}")

decoded = morse_to_text(morse)
print(f"Morse to English: {decoded}")
