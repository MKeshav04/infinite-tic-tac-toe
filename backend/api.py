# first activate venv from backend then uvicorn api:app --reload

from fastapi.middleware.cors import CORSMiddleware  
from fastapi import FastAPI, HTTPException 
from pydantic import BaseModel
from game_logic import GameLogic

# Defines the structure for our move request
class Move(BaseModel):
    position: int

# Create an instance of the FastAPI application
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001", "http://localhost:3002"], # Allows your React app to talk to the API
    allow_credentials=True,
    allow_methods=["*"], # Allows all methods (GET, POST, etc)
    allow_headers=["*"],
)

# Define our first API endpoint
@app.get("/")
def read_root():
    return {"message": "Welcome to the Infinite Tic-Tac-Toe API!"}


games = {} #for now instead of using database to store we are using dict    


@app.post("/new-game")
def create_new_game():
    # Generate a simple, unique ID for the new game
    game_id = f"game_{len(games) + 1}"
    
    # Create a new game instance from our GameLogic class
    new_game = GameLogic()
    
    # Store the new game in our 'games' dictionary with its ID
    games[game_id] = new_game
    
    # Return the new game's ID and a welcome message
    return {"game_id": game_id, "message": "New game created successfully."}


@app.post("/game/{game_id}/move")
def make_a_move(game_id: str, move: Move):
    # 1. Find the correct game instance
    if game_id not in games:
        raise HTTPException(status_code=404, detail="Game not found")
    
    game = games[game_id]
    
    # 2. Call our engine's make_move method
    result = game.make_move(move.position)
    
    # 3. Return a response based on the result from our engine
    if result == True:
        return {"message": "Move successful", "board": game.board, "current_player": game.current_player}
    elif result == False:
        raise HTTPException(status_code=400, detail="Invalid move. Spot may be taken.")
    elif result in ['X', 'O']:
        return {"message": f"Player {result} wins!", "board": game.board}

@app.get("/game/{game_id}")
def get_game_state(game_id: str):
    # 1. Find the correct game instance
    if game_id not in games:
        raise HTTPException(status_code=404, detail="Game not found")
    
    game = games[game_id]
    
    # 2. Return the current state of that game
    return {"board": game.board, "current_player": game.current_player}

