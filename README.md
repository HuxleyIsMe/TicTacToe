## TIC TAC TOE GAME

Hello there

this is my version of the classic tic tac toe game! Please go ahead and have fun!

## Design

The Game is composed of four classes:

- Board : handles rendering of the board and the game state
- Commentator : simply gives us feed back on whats happening
- ScoreBoard : tracks players scores over time
- PubSub : allows us to communicate altogether

## Future steps

### logic

I plan to eventually split out the Board and Game logic. I haven't done this yet because they are currently tightly coupled: the Board exists to serve the Game, and separating them would mainly amount to moving code around without improving flexibility. We can't easily swap in a different Board without changing the Game logic, so for now they are treated as a single unit. If we later introduce different types of games or boards, splitting them would make more sense — at that point, the separation would provide real value rather than being just syntactic sugar.

Lastly, it's worth noting that this is a solo project. Since I'm highly familiar with the problem space, optimizing for maintainability right now would be premature. However, if others were to join the project, paying the cost of separation earlier could make maintenance easier and more worthwhile.

### style

I will continue working on styling and adding fun celebration animations!
