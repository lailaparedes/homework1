const holdBtn = document.getElementById("hold");
const rollBtn = document.getElementById("roll");

holdBtn.addEventListener("click", hold);
rollBtn.addEventListener("click", roll);

let holdValue = 0;
// let score = 0;
let currentPlayer = 1;
let recordedScores = [0, 0]; // store both player 1 and player 2 scores in array 
const winLimit = 100;

function switchPlayer() {
  holdValue = 0; // reset turn total
  currentPlayer = currentPlayer === 1 ? 2 : 1; // switch player
  document.getElementById("result").innerText = `Player-${currentPlayer} turn!`;
  document.getElementById("p1-hold").style.width = "0%";
  document.getElementById("p2-hold").style.width = "0%";
}

function roll() {
  const faceValue = Math.floor(Math.random() * 6) + 1;
  const output = "&#x268" + (faceValue - 1) + "; ";
  const die = document.getElementById("die");
  die.innerHTML = output;

  if (faceValue === 1) {
    // when 1 is rolled, reset turn total and switch player
    holdValue = 0;
    switchPlayer();
  } else {
    // add to turn tota l and update bar ui for the active player
    holdValue += faceValue;
    document.getElementById(`p${currentPlayer}-hold`).style.width = holdValue + "%";
    document.getElementById(`p${currentPlayer}-hold`).innerText = holdValue;
  }
}

function hold() {
  // turn total gets added to total score
  recordedScores[currentPlayer - 1] += holdValue;
  document.getElementById(`p${currentPlayer}-score`).style.width = recordedScores[currentPlayer - 1] + "%";
  document.getElementById(`p${currentPlayer}-score`).innerText = recordedScores[currentPlayer - 1];

  // check if score reaches winLimit
  if (recordedScores[currentPlayer - 1] >= winLimit) {
    document.getElementById(`p${currentPlayer}-score`).style.width = "100%";
    document.getElementById(`p${currentPlayer}-score`).innerText = "100 🎉";
    document.getElementById(`p${currentPlayer}-score`).style.backgroundColor = "green";
    document.getElementById(`p${currentPlayer}-hold`).style.width = "0%";
    rollBtn.disabled = true;
    holdBtn.disabled = true;
    return;
  }

  //reset and swith player 
  holdValue = 0;
  document.getElementById(`p${currentPlayer}-hold`).style.width = "0%";
  switchPlayer();
}
