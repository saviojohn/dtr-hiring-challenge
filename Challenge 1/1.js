var prompt = require("prompt-sync")();

let word = prompt("Enter a word : ");
let r = "";
for (let i = 0; i < word.length; i++) {
  if (i % 2 == 0) {
    r = r + word[i];
  }
}
console.log(r);
