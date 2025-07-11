// Exercise 1
const menu = [
  { type: "starter", name: "Houmous with Pita" },
  { type: "starter", name: "Vegetable Soup with Houmous peas" },
  { type: "dessert", name: "Chocolate Cake" }
];

const hasDessert = menu.some(item => item.type === "dessert") ? true : false;
console.log("Has dessert?", hasDessert);

const allStarters = menu.every(item => item.type === "starter");
console.log("All are starters?", allStarters);

const hasMainCourse = menu.some(item => item.type === "main");
if (!hasMainCourse) {
  menu.push({ type: "main", name: "Grilled Chicken" });
}
console.log("Menu after main course check:", menu);

const vegetarian = ["vegetable", "houmous", "eggs", "vanilla", "potatoes"];

menu.forEach(item => {
  const lowerName = item.name.toLowerCase();
  item.vegetarian = vegetarian.some(veg => lowerName.includes(veg));
});

console.log("Menu with vegetarian flag:", menu);

/*
- We check if any item is a dessert → true.
- We check if all are starters → false.
- We add a main course if none exist.
- Then we tag each dish as vegetarian if its name includes any veggie keyword.
*/


// Exercise 2
function string_chop(str, size) {
  const result = [];
  for (let i = 0; i < str.length; i += size) {
    result.push(str.slice(i, i + size));
  }
  return result;
}

console.log(string_chop('developers', 2)); // ["de", "ve", "lo", "pe", "rs"]

/*
- We loop through the string in steps of `size`, and slice it into pieces.
- All chunks are pushed into an array and returned.
*/


// Exercise 3
function search_word(sentence, word) {
  const regex = new RegExp(`\\b${word}\\b`, "gi");
  const matches = sentence.match(regex);
  const count = matches ? matches.length : 0;
  return `'${word}' was found ${count} times.`;
}

console.log(search_word('The quick brown fox jumps over the lazy fox', 'fox'));

/*
- We use a regular expression to find full-word matches.
- If there are matches, we count them; if not, count is 0.
*/


// Exercise 4
function reverseArray(arr) {
  for (let i = 0; i < Math.floor(arr.length / 2); i++) {
    let temp = arr[i];
    arr[i] = arr[arr.length - 1 - i];
    arr[arr.length - 1 - i] = temp;
  }
  return arr;
}

console.log(reverseArray([1, 2, 3, 4, 5]));

/*
- We swap elements from both ends going inward.
- No new array is created, original array is modified in-place.
*/
