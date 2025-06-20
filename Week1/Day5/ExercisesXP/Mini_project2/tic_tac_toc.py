# tic_tac_toe.py

def display_board(board):
    print("\n")
    print("   0   1   2")
    for i, row in enumerate(board):
        print(i, " | ".join(row))
        if i < 2:
            print("  ---+---+---")
    print("\n")

def player_input(player):
    while True:
        try:
            row = int(input(f"Player {player}, enter row (0, 1, or 2): "))
            col = int(input(f"Player {player}, enter column (0, 1, or 2): "))
            if row in range(3) and col in range(3):
                return row, col
            else:
                print("Invalid input. Please enter numbers between 0 and 2.")
        except ValueError:
            print("Invalid input. Please enter a valid number.")

def check_win(board, mark):
    # Check rows
    for row in board:
        if all(cell == mark for cell in row):
            return True

    # Check columns
    for col in range(3):
        if all(board[row][col] == mark for row in range(3)):
            return True

    # Check diagonals
    if all(board[i][i] == mark for i in range(3)):
        return True
    if all(board[i][2 - i] == mark for i in range(3)):
        return True

    return False

def is_full(board):
    return all(cell in ['X', 'O'] for row in board for cell in row)

def play():
    board = [[" " for _ in range(3)] for _ in range(3)]
    current_player = "X"

    print("Welcome to Tic Tac Toe!")
    display_board(board)

    while True:
        row, col = player_input(current_player)

        if board[row][col] == " ":
            board[row][col] = current_player
        else:
            print("That cell is already taken. Choose another.")
            continue

        display_board(board)

        if check_win(board, current_player):
            print(f"🎉 Player {current_player} wins!")
            break

        if is_full(board):
            print("It's a draw! 🤝")
            break

        # Switch player
        current_player = "O" if current_player == "X" else "X"

if __name__ == "__main__":
    play()
