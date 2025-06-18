# 🌟 Exercise 6 : Let’s create some personalized shirts !

def make_shirt(size="large", text="I love Python"):
    print(f"The size of the shirt is {size} and the text is {text}.")

# Step 5: Calling with default and custom values
make_shirt()  # Default: large + "I love Python"
make_shirt("medium")  # Medium + default message
make_shirt("small", "Custom message")  # Custom both

# Step 6: Using keyword arguments
make_shirt(size="extra-large", text="Code Mode: ON")
make_shirt(text="Hello!", size="small")
