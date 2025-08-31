# Starting your workday
# cd path/to/your/infinite-tic-tac-toe/backend
# Navigates into your project folder.
# On Windows: venv\Scripts\activate

from collections import deque

class GameLogic:
    def __init__(self):
        self.board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ]
        self.current_player = 'X'
        self.moves_made = 0
        self.move_history = {'X':deque(), 'O':deque()}
    
    def print_board(self):
        print("---------")  # Print a top border
        for row in self.board:
            # Join the elements of the row with " | " and print
            print(" | ".join(row))
            print("---------") # Print a separator line after each row

    def make_move(self, position):
        # position is 1-9 whichuser enters
        row = ((position - 1)//3)
        col = ((position - 1 ) % 3)

        if self.board[row][col]!= '':
            print('Invalid move. That spot is already taken')
            return False
        
         # 1. CHECK IF WE NEED TO REMOVE A PIECE
    # Before we place the new piece, we check if the player already has 3 pieces down.
        if len(self.move_history[self.current_player]) == 3:
            oldest_move = self.move_history[self.current_player].popleft()
            oldest_row , oldest_col = oldest_move
            self.board[oldest_row][oldest_col] = ''    

        self.board[row][col] = self.current_player

        self.move_history[self.current_player].append((row, col))

        self.moves_made+=1

        winner = self.check_win()
        if winner:
            return winner

        self.current_player = 'X' if self.current_player == 'O' else 'O'
        return True
    
    def check_win(self):
        # there could be 8 ways of winning, 3 horizontal, 3 vertical, 2 diagonal

        # checking horizontal matches wins
        for i in range(3):
            if self.board[i][0] == self.board[i][1] == self.board[i][2] and self.board[i][0] != '':
                return self.board[i][0] 
        
        # checking vertical wins 
        for i in range(3):
            if self.board[0][i] == self.board[1][i] == self.board[2][i] and self.board[0][i] != '':
                return self.board[0][i]
            
        # checking diagonals
        if self.board[0][0] == self.board[1][1] == self.board[2][2] and self.board[0][0] != '':
            return self.board[0][0]
        if self.board[0][2] == self.board[1][1] == self.board[2][0] and self.board[1][1]!= '':
            return self.board[1][1]
        
        return None

if __name__ == "__main__":
    game = GameLogic()
    while True:
        move = int(input(f'Player {game.current_player}"s turn. Select a move between 1-9 \n'))
        result = game.make_move(move)

        if result == True:
            game.print_board()
        elif result == 'X' or result == 'O':
            game.print_board()
            print(f"Player {result} wins!")
            break
        # niche wala is only for readibility, can exclude it 
        elif result == False:
            continue
