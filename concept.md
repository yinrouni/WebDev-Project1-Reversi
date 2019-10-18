# Project Concept -- Reversi

Chihao Sun, Rouni Yin

## Reversi

Reversi is a strategy board game for two players, played on an 8×8 uncheckered 
board. There are sixty-four identical game pieces called disks (often spelled 
"discs"), which are light on one side and dark on the other. Players take turns
placing disks on the board with their assigned color facing up. During a play, 
any disks of the opponent's color that are in a straight line and bounded by 
the disk just placed and another disk of the current player's color are turned 
over to the current player's color.The object of the game is to have the 
majority of disks turned to display your color when the last playable empty 
square is filled.

## How the game goes on

#### Start of the game

Before starting players decide which color will use each of them.
Next 4 pieces have to be placed in the central squares of the board, so that 
each pair of pieces of the same color form a diagonal between them.
The player with black pieces moves first; one only move is made every turn.
#### Moves
A move consists in placing from outside one piece on the board. Placed pieces 
can never be moved to another square later in the game.
The incorporation of the pieces must be made according to the following rules:

- The incorporated piece must outflank one or more of the opponent placed pieces
- To outflank means that a single piece or one straight row (vertical, 
horizontal or diagonal) of pieces of the opponent is in both sides next to own 
pieces, with no empty squares between all 
those pieces
- The player who makes the move turns the outflanked pieces over, becoming all 
of them in own pieces
- If there is more than one outflanked row, all the involved pieces in those 
rows have to be flipped
- If it´s not possible to make this kind of move, turn is forfeited and the 
opponent repeats another move
#### Final
The game is over when all the squares of the board are taken or none of the 
players can move. In any case the winner is the player who has more pieces on
the board.
The game ends in a draw when both players have the same number of pieces on the 
board.

## Functionality
- Time control: There is a clock used to limit the length of the game. It count 
the time each 
player takes for making his every move separately. If a player run out of time, 
he gives up a move by default, and it’s time for the opponent to take a move.

- Undo: Each player has only one chance to undo. When a player ask for “undo”, 
the agreement of the opponent is needed. If agree, the state of the board will 
return to what it is used to be before the current move of the player; 
Otherwise, “undo” is declined, and the player still has the chance to ask for
another undo. A player can undo before or after the opponent 
takes a move, but there Is only one chance to do so.

- Resignation: When a player commits a resignation, the game ends up with his 
failure.

- When a player quit the game accidentally, if he can come back in 1 minute, 
resume the game;
otherwise he will commit a resignation automatically.

- When any of the above occurs, there is an alert message in the chat text.

## Challenge
- When a player asks for “undo”, the opponent should make a decision. A confirm 
box will pop up only on the page of the opponent, which is not shared by all 
the people in the game room.
- The audience of the game can only observe the game and communicate by text 
chat. They don’t have access to the game board and any functionality for 
players. And server will block information that interferes with the game.
- When a player quit the game accidentally, if he can come back in 1 minute, 
resume the game; Other players can't join the game during this time.

## Reference
- http://www.ludoteka.com/reversi-en.html
- https://en.wikipedia.org/wiki/Reversi

