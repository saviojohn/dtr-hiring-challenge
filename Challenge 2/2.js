var prompt = require("prompt-sync")();

test_case = prompt("Enter a number of test case to be performed : ");
for (let j = 0; j < test_case; j++) {
  array_length = prompt("Enter an array length : ");
  arr = [];
  for (let i = 0; i < array_length; i++) {
    arr.push(prompt("Enter a number for place " + (i + 1) + " : "));
  }
  k = prompt("Enter a number to find out the smallest kth element : ");
  if (k < arr.length) {
    arr.sort((a, b) => a - b);
  } else {
    k = prompt("Enter a number again to find out the smallest kth element : ");
    arr.sort((a, b) => a - b);
  }
  console.log("the smallest " + k + "th element : ", arr[k - 1]);
}
