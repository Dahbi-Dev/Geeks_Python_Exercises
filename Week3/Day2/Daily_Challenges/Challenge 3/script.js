const numbers = [5, 0, 9, 1, 7, 4, 2, 6, 3, 8];

let string1 = numbers.toString();
console.log("Using toString():", string1);  

console.log("Join with '+':", numbers.join('+'));     
console.log("Join with space:", numbers.join(' '));   
console.log("Join with empty string:", numbers.join(''));

let sortedNumbers = [...numbers];  
for (let i = 0; i < sortedNumbers.length; i++) {
  for (let j = 0; j < sortedNumbers.length - 1 - i; j++) {
    if (sortedNumbers[j] < sortedNumbers[j + 1]) {
      let temp = sortedNumbers[j];
      sortedNumbers[j] = sortedNumbers[j + 1];
      sortedNumbers[j + 1] = temp;

      console.log(`Swapped ${sortedNumbers[j + 1]} and ${sortedNumbers[j]}:`, [...sortedNumbers]);
    }
  }
}

console.log("Sorted array (Descending):", sortedNumbers); 
