class Song:
    def __init__(self, lyrics):
        self.lyrics = lyrics
    
    def sing_me_a_song(self):
        for line in self.lyrics:
            print(line)

# Step 2: Create Song Objects with original lyrics
# Example 1: A simple original song
morning_song = Song([
    "The sun rises bright and new",
    "Birds are singing in the sky so blue",
    "Another day begins for me and you",
    "Let's make the most of what we do"
])

# Example 2: Another original song
coding_song = Song([
    "Lines of code flow through my mind",
    "Debugging errors I must find",
    "Functions calling, loops that spin",
    "Programming is where I begin"
])

# Example 3: A shorter song
simple_song = Song([
    "Hello world, hello day",
    "Let's go out and play"
])

# Step 3: Demonstrate the sing_me_a_song() method
print("=== Morning Song ===")
morning_song.sing_me_a_song()

print("\n=== Coding Song ===")
coding_song.sing_me_a_song()

print("\n=== Simple Song ===")
simple_song.sing_me_a_song()

# Bonus: Add a method to get song info
class EnhancedSong(Song):
    def __init__(self, lyrics, title="Untitled", artist="Unknown"):
        super().__init__(lyrics)
        self.title = title
        self.artist = artist
    
    def get_song_info(self):
        print(f"Title: {self.title}")
        print(f"Artist: {self.artist}")
        print(f"Number of lines: {len(self.lyrics)}")
    
    def sing_me_a_song(self):
        print(f"♪ Now playing: {self.title} by {self.artist} ♪")
        super().sing_me_a_song()

# Example with enhanced song class
my_song = EnhancedSong([
    "Walking down the street today",
    "Sunshine lighting up my way",
    "Every step feels bright and free",
    "This is how life's meant to be"
], "Sunny Day", "Code Composer")

print("\n=== Enhanced Song Demo ===")
my_song.get_song_info()
print()
my_song.sing_me_a_song()