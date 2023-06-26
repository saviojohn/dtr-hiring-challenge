var prompt = require("prompt-sync")();

let names = [];
let number_of_names = prompt("Enter a number : ");
for (let i = 0; i < number_of_names; i++) {
  names.push(prompt("Enter a name : "));
}
console.log("intial names : ", names);
names.sort((a, b) => b.length - a.length);
console.log("the longest name : ", names[0]);
