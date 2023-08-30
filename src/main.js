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
let col = -1;

const validInput = new Set("qwertyuioplkjhgfdsazxcvbnm");
let currWord = "";

let colFull = false; //checks if i can still insert a letter

let allWords = new Set([
  "needs",
  "which",
  "there",
  "their",
  "about",
  "would",
  "these",
  "other",
  "words",
  "could",
  "write",
  "first",
  "water",
  "after",
  "where",
  "right",
  "think",
  "three",
  "years",
  "place",
  "sound",
  "great",
  "again",
  "still",
  "every",
  "small",
  "found",
  "those",
  "never",
  "under",
  "might",
  "while",
  "house",
  "world",
  "below",
  "asked",
  "going",
  "large",
  "until",
  "along",
  "shall",
  "being",
  "nerds",
]);

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
  if (currWord.length === 5) {
    // all the boxes are filled

    if (allWords.has(currWord)) {
      //the word is a valid existing word

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
            //incorrect letter
            letterBox.classList.add("incorrect-letter");
          }
        }
      }
      if (currWord === word) {
        //the game is over
        gameOver();
        return;
      }
      if (row === 6) {
        //you've lost the game
        lost();
      }
      currWord = "";
      row++;
    } else {
      return;
    }
  }
  return;
}

function reduceWord() {
  let w = "";
  for (let i = 0; i < currWord.length - 1; i++) {
    w += currWord[i];
  }
  currWord = w;
  col--;
}
function increaseWord(letter) {
  currWord += letter;

  col++;
  game[row][col] = letter;
}

function backspace() {
  if (col < 0) {
    return;
  }
  game[row][col] = "";
  const span = document.getElementById(`l${row + 1}${col + 1}`);
  span.innerHTML = "";
  reduceWord();
}

//for the device keyboard
document.body.addEventListener("keyup", (ev) => {
  const letter = ev.key.toLowerCase();

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
  insertLetter(letter);
});

function insertLetter(letter) {
  if (col === 4) {
    return;
  }
  increaseWord(letter);
  game[row][col] = letter;
  let letterBox = document.getElementById(`l${row + 1}${col + 1}`);
  letterBox.innerText = letter.toUpperCase();
}
//for the app keyboard
function btnClicked(el) {
  const letter = el.innerText.toLowerCase();

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
  insertLetter(letter);
}
