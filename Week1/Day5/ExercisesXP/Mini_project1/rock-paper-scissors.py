# rock-paper-scissors.py
from game import Game

def get_user_menu_choice():
    print("\nMenu:")
    print("1. Play a new game")
    print("2. Show scores")
    print("3. Quit")
    choice = input("Enter your choice (1/2/3): ").strip()

    if choice == "1":
        return "play"
    elif choice == "2":
        return "scores"
    elif choice == "3":
        return "quit"
    else:
        print("Invalid choice.")
        return None

def print_results(results):
    print("\nGame Summary:")
    print(f"Wins: {results['win']}")
    print(f"Losses: {results['loss']}")
    print(f"Draws: {results['draw']}")
    print("Thanks for playing!")

def main():
    results = {"win": 0, "loss": 0, "draw": 0}

    while True:
        user_choice = get_user_menu_choice()
        if user_choice == "play":
            game = Game()
            result = game.play()
            results[result] += 1
        elif user_choice == "scores":
            print_results(results)
        elif user_choice == "quit":
            print_results(results)
            break

if __name__ == "__main__":
    main()
