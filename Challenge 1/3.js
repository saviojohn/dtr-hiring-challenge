var prompt = require("prompt-sync")();

let a = prompt("Enter a word : ");
let c = prompt("Enter a word : ");
let l = a.length;
let arr = [];
for (let i = 0; i < l; i++) {
  for (let j = i + 1; j <= l; j++) {
    arr.push(a.substring(i, j));
  }
}

for (let k = 0; k < arr.length; k++) {
  arr.sort((a, b) => b.length - a.length);
}

for (let r = 0; r < arr.length; r++) {
  if (c.indexOf(arr[r]) != -1) {
    console.log(arr[r]);
    console.log(arr[r].length);
    break;
  }
}
