const user1 = document.getElementById("user1");
const user2 = document.getElementById("user2");
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".playagain");
let turnO = true;
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const playAgain = () => {
  boxes.forEach((box) => {
    box.innerHTML = "";
    box.disabled = false;
    document.getElementById("winner-display").innerText = "";
  });
  user1.value = "";
  user2.value = "";
  turnO = true;
};
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerHTML = "<img class ='btn1' src='o.png' alt='' / >";
      turnO = false;
    } else {
      box.innerHTML = "<img class ='btn2' src='x.png' alt='' / >";
      turnO = true;
    }
    box.disabled = true;

    checkWinner();
  });
});
const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].querySelector("img")?.src || "";
    let pos2Val = boxes[pattern[1]].querySelector("img")?.src || "";
    let pos3Val = boxes[pattern[2]].querySelector("img")?.src || "";

    if (pos1Val != "" && pos1Val === pos2Val && pos2Val === pos3Val) {
      const user1 = document.getElementById("user1").value || "Player O";
      const user2 = document.getElementById("user2").value || "Player X";

      if (pos1Val.includes("o.png")) {
        document.getElementById(
          "winner-display"
        ).innerText = `🎉 YAY!!! ${user1}, YOU ARE THE WINNER! 🎉`;
      } else if (pos1Val.includes("x.png")) {
        document.getElementById(
          "winner-display"
        ).innerText = `🎉 YAY!!! ${user2}, YOU ARE THE WINNER! 🎉`;
      }
      disableBoxes();

      return;
    }
  }

  const isDraw = Array.from(boxes).every(
    (box) => box.querySelector("img") !== null
  );
  if (isDraw) {
    document.getElementById("winner-display").innerText = "It's a Draw!";
    playAgain();
  }
};
resetBtn.addEventListener("click", playAgain);
