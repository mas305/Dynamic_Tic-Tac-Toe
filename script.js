let currentPlayer = "X";
let NUMBER_OF_ROWS = 3;
let turns = NUMBER_OF_ROWS ** 2;
let turns_counter = 0;
const resetButton = document.querySelector("#reset");
const DynamicBtn = document.querySelector(".submit_btn");
const DynamicInput = document.querySelector(".numOfRows");

const updateBoardSize = () => {
  const numRows = parseInt(DynamicInput.value);
  NUMBER_OF_ROWS = numRows;
  turns = NUMBER_OF_ROWS ** 2;
  resetBoard();
};

DynamicBtn.addEventListener("click", updateBoardSize);

const createBoardArray = () => {
  let board = [];
  for (let row = 0; row < NUMBER_OF_ROWS; row++) {
    board.push(Array.from({ length: NUMBER_OF_ROWS }, () => "_"));
  }
  return board;
};

let board = createBoardArray();

const getCellplacment = (index, numOfRows) => {
  const row = Math.floor(index / NUMBER_OF_ROWS);
  const col = index % NUMBER_OF_ROWS;

  return [row, col];
};

const checkRows = (currentPlayer) => {
  let col = 0;

  for (let row = 0; row < NUMBER_OF_ROWS; row++) {
    while (col < NUMBER_OF_ROWS) {
      if (board[row][col] !== currentPlayer) {
        col = 0;
        break;
      }
      col++;
    }
  }
  //   (col === NUMBER_OF_ROWS) ? true : false;
  if (col === NUMBER_OF_ROWS) return true;
};
const checkcol = (currentPlayer) => {
  let row = 0;

  for (let col = 0; col < NUMBER_OF_ROWS; col++) {
    while (row < NUMBER_OF_ROWS) {
      if (board[row][col] !== currentPlayer) {
        row = 0;
        break;
      }
      row++;
    }
  }
  //   (col === NUMBER_OF_ROWS) ? true : false;
  if (row === NUMBER_OF_ROWS) return true;
};
const checkDiagonals = (currentPlayer) => {
  let count = 0;

  while (count < NUMBER_OF_ROWS) {
    if (board[count][count] !== currentPlayer) break;

    count++;
  }

  if (count === NUMBER_OF_ROWS) return true;
};
const checkReversDiagonals = (currentPlayer) => {
  let count1 = 0;
  let count2 = NUMBER_OF_ROWS - 1;

  while (count1 < NUMBER_OF_ROWS) {
    if (board[count1][count2] !== currentPlayer) break;

    count1++;
    count2--;
  }
  if (count1 === NUMBER_OF_ROWS) return true;
};

const checkWin = (currentPlayer) => {
  return (
    checkRows(currentPlayer) ||
    checkcol(currentPlayer) ||
    checkDiagonals(currentPlayer) ||
    checkReversDiagonals(currentPlayer)
  );
};

const runWinEvent = (currentPlayer) => {
  setTimeout(() => {
    alert(`Player ${currentPlayer} Won`);
    resetBoard();
  }, 100);
};
const runDrawEvent = () => {
  setTimeout(() => {
    alert("Draw");
    resetBoard();
  }, 100);
};
const resetBoard = () => {
  document.querySelector(".board").remove();
  createBoard();
  board = createBoardArray();
  currentPlayer = "X";
  turns_counter = 0;
};
const drawMarkInCell = (cell, currentPlayer) => {
  cell.querySelector(".value").textContent = currentPlayer;
  cell.classList.add(`cell--${currentPlayer}`);
};

const cellClickHandler = (event, index) => {
  const cell = event.target;
  const [row, col] = getCellplacment(index, NUMBER_OF_ROWS);

  if (board[row][col] === "_") {
    turns_counter++;
    board[row][col] = currentPlayer;

    drawMarkInCell(cell, currentPlayer);

    if (checkWin(currentPlayer)) runWinEvent(currentPlayer);
    else {
      if (turns_counter === turns) runDrawEvent();

      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  }
  //   console.log({ row });
  //   console.log({ col });
};

const createCell = (i) => {
  const cellElementString = `<div class="cell" role="button" tabindex= ${
    i + 1
  }><span class="value"></span></div>`;
  const cellElement = document
    .createRange()
    .createContextualFragment(cellElementString);

  cellElement.querySelector(".cell").onclick = (event) =>
    cellClickHandler(event, i);

  cellElement.querySelector(".cell").onkeydown = (event) => {
    if (event.key === "Enter") cellClickHandler(event, i);
  };
  return cellElement;
};

const createBoard = () => {
  const container = document.querySelector(".container");
  const board = document.createElement("div");
  board.classList.add("board");

  for (let i = 0; i < turns; i++) {
    const cellElement = createCell(i);
    board.appendChild(cellElement);
    document.documentElement.style.setProperty("--grid-rows", NUMBER_OF_ROWS);
  }
  container.insertAdjacentElement("afterbegin", board);
};
resetButton.addEventListener("click", resetBoard);

createBoard();
