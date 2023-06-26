var prompt = require("prompt-sync")();

let word = prompt("Enter a word : ");
let r = "";
let b = "";
for (let i = 0; i < word.length; i++) {
  if (i == 0) {
    r = r + word[i];
  } else if (word[i] == " ") {
    b = b + word[i + 1];
  }
}
console.log(r + b);
