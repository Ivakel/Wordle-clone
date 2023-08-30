let game = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

const word = "needs";
const wordSet = new Set(word);

let row = 0;
let col = 0;

const validInput = new Set(
  "qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM"
);
const currWord = "";
let allWords = new Set(["needs"]);

function showWord() {
  const wordBox = document.getElementById("word");
  wordBox.innerText = word.toUpperCase;
  wordBox.classList.add("show-word");
}

function gameOver() {
  showWord();
}

function lost() {
  showWord();
}

function enterPress() {
  if (col === 4) {
    // all the boxes are filled
    if (allWords.has(currWord)) {
      //the word is a valid existing word
      row++;
      for (let i = 0; i < 5; i++) {
        const letterBox = document.getElementById(`l${row + 1}${i + 1}`);
        if (currWord[col] === word[col]) {
          //Correct Letter in the correct pos
          letterBox.classList.add("correct");
        } else {
          if (wordSet.has(currWord[col])) {
            //correct letter, incorrect pos
            letterBox.classList.add("incorrect-pos");
          } else {
            //correct letter
            letterBox.classList.add("incorrect-letter");
          }
        }
      }
      if (currWord === word) {
        //the game is over
        gameOver();
      }
      if (row === 5) {
        //you've lost the game
        lost();
      }
    } else {
      return;
    }
  }
  return;
}

function backspace() {
  if (col === 0) {
    game[row][col] = "";
    const span = document.getElementById(`l${row + 1}${col + 1}`);
    span.innerHTML = "";
    return;
  }
  game[row][col] = "";
  const span = document.getElementById(`l${row + 1}${col + 1}`);
  span.innerHTML = "";
  col--;
}

//for the device keyboard
document.body.addEventListener("keyup", (ev) => {
  const letter = ev.key.toLowerCase();
  console.log("column", col);

  if (letter === "backspace") {
    backspace();
    return;
  }

  if (!validInput.has(letter)) {
    return;
  }

  //if enter is pressed
  if (letter === "enter") {
    enterPress();
    return;
  }
  //the row is full
  if (col === 4) {
    const letterBox = document.getElementById(`l${row + 1}${col + 1}`);
    if (letterBox.innerHTML === "") {
      letterBox.innerHTML = letter.toUpperCase();
    }
    return;
  }

  game[row][col] = letter;
  const letterBox = document.getElementById(`l${row + 1}${col + 1}`);
  console.log(`l${row + 1}${col + 1}`, letterBox);
  letterBox.innerHTML = letter.toUpperCase();
  col++;
});

//for the app keyboard
function btnClicked(el) {
  const letter = el.innerText.toLowerCase();
  console.log(letter);
  return;

  //the backspace is pressed
  if (letter === "") {
    backspace();
    return;
  }
  //enter is pressed
  if (letter === "enter") {
    enterPress();
    return;
  }
  //the row is full
  if (col >= 5) {
    return;
  }
  currWord += letter;
  game[row][col] = letter;
  const letterBox = document.getElementById(`l${row + 1}${col + 1}`);
  letterBox.innerText = letter.toUpperCase();
  col++;
}
