const arrayNum = [1, 2, 4, 5, 8, 9];
const newArray = arrayNum.map((num, i) => {
    console.log(num, i);
    alert(num);
    return num * 2;
})




// The Value of i is the index of the arrayNum (0,1,2,3,4,5)
// and output is alert 1 → 2 → 4 → 5 → 8 → 9