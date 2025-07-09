function mergeWords(word) {
  return function next(nextWord) {
    if (nextWord === undefined) {
      return word; 
    } else {
      return mergeWords(word + ' ' + nextWord); 
    }
  };
}

console.log(mergeWords('There')('is')('no')('spoon.')())