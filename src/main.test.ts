describe("tic tac toe", () => {
  describe("board", () => {
    it.todo("looks like a tic tac toe board");
    it.todo("will mark a square with the correct users token on click");
    it.todo("already marked squares can not be clicked on");
  });
  describe("Game", () => {
    it.todo("tells a player whos turn it is");
    it.todo("starts with crosses first");
    it.todo("will display a winner well done message if a player wins");
  });
});

/****
 *
 * draw board
 * have a matrix representing board
 * ensure each square in the board matches up to there square in the matrix
 * on click of square
 *          - the square displays the correct token
 *          - the matrix is updated
 *          - check against the winning options
 *          - if wone display and allow user to play again
 *          - else redraw board
 *          - change player
 *          - disable buttons from boards that are filled
 */
