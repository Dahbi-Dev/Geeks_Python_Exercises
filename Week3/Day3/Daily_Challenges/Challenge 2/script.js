function frameWords() {
  // Step 1: Prompt the user
  const input = prompt("Enter words separated by commas:");
  if (!input) return;

  // Step 2: Split and trim the words
  const words = input.split(",").map(word => word.trim());

  // Step 3: Find the length of the longest word
  const maxLength = Math.max(...words.map(word => word.length));

  // Step 4: Create the top and bottom border
  const border = "*".repeat(maxLength + 4);
  console.log(border);

  // Step 5: Print each word inside the frame
  words.forEach(word => {
    const padding = " ".repeat(maxLength - word.length);
    console.log(`* ${word}${padding} *`);
  });

  // Step 6: Print the bottom border
  console.log(border);
}

frameWords();
