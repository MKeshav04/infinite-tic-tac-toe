def evaluate(board):
    """
    Checks the board for a winner and returns a score.
    +10 for 'X' win, -10 for 'O' win, 0 for no winner yet.
    """
    # Check rows
    for i in range(3):
        if board[i][0] == board[i][1] == board[i][2] and board[i][0] != '':
            return 10 if board[i][0] == 'X' else -10
    # Check columns
    for i in range(3):
        if board[0][i] == board[1][i] == board[2][i] and board[0][i] != '':
            return 10 if board[0][i] == 'X' else -10
    # Check diagonals
    if board[0][0] == board[1][1] == board[2][2] and board[0][0] != '':
        return 10 if board[0][0] == 'X' else -10
    if board[0][2] == board[1][1] == board[2][0] and board[0][2] != '':
        return 10 if board[0][2] == 'X' else -10
    
    return 0 # No winner yet

# Add this function below evaluate()

def is_moves_left(board):
    """Checks if there are any empty cells left on the board."""
    for i in range(3):
        for j in range(3):
            if board[i][j] == '':
                return True
    return False

def minimax(board, depth, is_max):
    """
    The recursive minimax function.
    'board': the current game state
    'depth': how many moves into the future we are looking
    'is_max': boolean, is it the Maximizer's (X) turn?
    """
    score = evaluate(board)

    # Base case: If a player has won, return the score
    if score == 10:
        return score - depth
    if score == -10:
        return score + depth
    
    # Base case: If it's a draw (no moves left)
    if not is_moves_left(board):
        return 0

    # If it's the Maximizer's turn (X)
    if is_max:
        best = -1000 # A very low number
        for i in range(3):
            for j in range(3):
                if board[i][j] == '':
                    board[i][j] = 'X' # Make the move
                    best = max(best, minimax(board, depth + 1, not is_max)) # Call minimax recursively
                    board[i][j] = '' # Undo the move
        return best
    
    # If it's the Minimizer's turn (O)
    else:
        best = 1000 # A very high number
        for i in range(3):
            for j in range(3):
                if board[i][j] == '':
                    board[i][j] = 'O' # Make the move
                    best = min(best, minimax(board, depth + 1, not is_max)) # Call minimax recursively
                    board[i][j] = '' # Undo the move
        return best
    

# Add this function below minimax()

def find_best_move(board):
    """
    Finds the best possible move for the AI ('O') to play.
    """
    best_val = 1000
    best_move = (-1, -1)

    # Traverse all cells, evaluate minimax function for all empty cells.
    # And return the cell with optimal value.
    for i in range(3):
        for j in range(3):
            if board[i][j] == '':
                board[i][j] = 'O' # Make a temporary move
                move_val = minimax(board, 0, True) # Call minimax for the Maximizer's turn
                board[i][j] = '' # Undo the move

                # If the value of the current move is less than the best value,
                # then update best
                if move_val < best_val:
                    best_move = (i, j)
                    best_val = move_val
    
    return best_move