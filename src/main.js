let game = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

console.log("text[0]");

const { promises: fsPromises } = require("fs");

async function asyncReadFile(filename) {
  try {
    const contents = await fsPromises.readFile(filename, "utf-8");

    const words = contents.split(/\r?\n/);

    return words;
  } catch (err) {
    console.log(err);
  }
}

const words = asyncReadFile("../resources/words.txt");
console.log(text[0]);
