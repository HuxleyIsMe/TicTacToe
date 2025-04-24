const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const generateBoardFromMatrix = (root: string) => {
  let map = {
    a: 0,
    b: 1,
    c: 2,
    d: 3,
    e: 4,
    f: 5,
    g: 6,
    h: 7,
    i: 8,
  };
  let matrix = [{}, {}, {}, {}, {}, {}, {}, {}, {}];
  let turn = "X";

  document.querySelector<HTMLDivElement>(root)!.innerHTML = `
        <div class='row border-bottom'>
            <div id='a' class='col'  data-hover-text="pick me im number 1"></div>
            <div id='b' class='col col-mid' data-hover-text="second the best"></div>
            <div id='c' class='col' data-hover-text="your foe is quaking"></div>
        </div>
        <div class='row'>
            <div  id='d' class='col ' data-hover-text="such art this game"></div>
            <div  id='e' class='col col-mid' data-hover-text="you will always win"></div>
            <div  id='f' class='col ' data-hover-text="neutral good"></div>
        </div>
        <div class='row border-top'>
            <div id='g' class='col' data-hover-text="pick me"></div>
            <div id='h'  class='col col-mid' data-hover-text="no me"></div>
            <div id='i'  class='col' data-hover-text="pick the other one"></div>
        </div>
    
    `;

  const weHaveAWinner = () => {
    let isWinner = false;
    winningCombos.some(([a, b, c]) => {
      if (matrix[a] == matrix[b] && matrix[b] == matrix[c]) {
        isWinner = true;
        return true;
      }
    });

    return isWinner;
  };

  // nice to have a game over

  const handleClick = (element) => {
    if (document.querySelector(element).innerHTML) {
      // element already clciked do nothing
      console.log("element already clicked");
      return;
    }
    document.querySelector(element)!.innerHTML = `<span>${turn}</span>`;

    let selector = element.slice(1);
    console.log({ selector });
    matrix[map[selector]] = turn;
    console.log({ matrix });

    const isWinner = weHaveAWinner();
    if (isWinner) {
      console.log("we have a winner");
    }
    turn = turn === "X" ? "O" : "X";
  };

  document
    .querySelector("#a")!
    .addEventListener("click", () => handleClick("#a"));
  document
    .querySelector("#b")!
    .addEventListener("click", () => handleClick("#b"));
  document
    .querySelector("#c")!
    .addEventListener("click", () => handleClick("#c"));
  document
    .querySelector("#d")!
    .addEventListener("click", () => handleClick("#d"));
  document
    .querySelector("#e")!
    .addEventListener("click", () => handleClick("#e"));
  document
    .querySelector("#f")!
    .addEventListener("click", () => handleClick("#f"));
  document
    .querySelector("#g")!
    .addEventListener("click", () => handleClick("#g"));
  document
    .querySelector("#h")!
    .addEventListener("click", () => handleClick("#h"));
  document
    .querySelector("#i")!
    .addEventListener("click", () => handleClick("#i"));
};
