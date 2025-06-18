#DC Gold : Solve The Matrix

# Step 1: Create the matrix from the raw string
raw = [
    "7ii",
    "Tsx",
    "h%?",
    "i #",
    "sM ",
    "$a ",
    "#t%",
    "^r!"
]

# Step 2: Build a 2D list (matrix)
matrix = [list(row) for row in raw]

# Step 3: Go through the matrix column by column, top to bottom
decoded_chars = []
rows = len(matrix)
cols = len(matrix[0])

for col in range(cols):
    for row in range(rows):
        decoded_chars.append(matrix[row][col])

# Step 4: Build final string with rules:
# Only add alphabetic characters directly.
# Replace sequences of non-alphabetic characters *between* letters with a single space.

message = ""
i = 0
while i < len(decoded_chars):
    char = decoded_chars[i]
    if char.isalpha():
        message += char
        i += 1
    else:
        # If it's not a letter, we check ahead for the next letter and add a space
        # Only add space if there's a letter coming next
        found_letter = False
        j = i + 1
        while j < len(decoded_chars):
            if decoded_chars[j].isalpha():
                found_letter = True
                break
            j += 1
        if found_letter:
            message += " "
        i = j  # skip ahead to next letter

# Step 5: Print the final decoded message
print("Decoded message:")
print(message)
