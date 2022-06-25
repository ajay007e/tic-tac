const player = document.querySelector(".player");
const resetBtn = document.querySelector(".reset");
const cells = document.querySelectorAll(".game-cells");


let isGameOver = false;
let isXisNext = true;
let click = 9
let winner={}

const gamer = function () {
  return isXisNext ? "x" : "o";
};

const getCell = function (cell, sign) {
  return document.querySelector(`.${cell}`).classList.contains(`${sign}`);
};

const checkCell = function (v1, v2, v3, sign) {
  //   console.log(v1, v2, v3, sign);
  if (getCell(v1, sign) && getCell(v2, sign) && getCell(v3, sign)){
   winner ={"1":v1,"2":v2,"3":v3}
    return true;
  }
  else false;
};
const selectWinner = function () {
  if (
    checkCell("c1", "c2", "c3", gamer()) ||
    checkCell("c4", "c5", "c6", gamer()) ||
    checkCell("c7", "c8", "c9", gamer()) ||
    checkCell("c1", "c4", "c7", gamer()) ||
    checkCell("c5", "c2", "c8", gamer()) ||
    checkCell("c9", "c6", "c3", gamer()) ||
    checkCell("c7", "c5", "c3", gamer()) ||
    checkCell("c1", "c5", "c9", gamer())
  )
    return true;
  else false;
};
const gameover = function () {
  if (selectWinner() || click===0) {
    isGameOver = true;
    return true;
  } else return false;
};

const cellClicked = function (e) {
  const cell = e.target;
  click--;
  // console.log(click);
  if (!isGameOver) {
    if (!cell.classList.contains("x") && !cell.classList.contains("o")) {
      isXisNext ? cell.classList.add("x") : cell.classList.add("o");
      if (gameover()) {
        document.querySelector('.title').style.color="white"
        document.querySelector(".game-cell").style.removeProperty("cursor");
        for (const [key, value] of Object.entries(winner)) {
          // console.log(value);
          document.querySelector(`.${value}`).classList.add("winner")

        }
        
        if (click===0) {
          player.innerHTML =""
          document.querySelector('.title').innerHTML="Match Draw"
        }else{
          player.innerHTML = "";
          document.querySelector('.title').innerHTML = isXisNext ? "x Wins" : "o Wins";
        }

      }else {
        isXisNext = !isXisNext;
        player.innerHTML = isXisNext ? "x play next" : "o play next";
      }
    }
  }
};

cells.forEach((cell) => {
  cell.addEventListener("click", cellClicked);
});
resetBtn.addEventListener("click", function () {
  location.reload();
});
