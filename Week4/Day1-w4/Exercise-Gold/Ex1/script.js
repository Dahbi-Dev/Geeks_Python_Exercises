let landscape = () =>{

 let result = "";

 let flat = (x)  =>{
   for(let count = 0; count<x; count++){
     result +=  "_"
   }
 }

 let mountain = (x) =>{
   result += "/"
   for(let counter = 0; counter<x; counter++){
     result+= "'" 
   }
   result += "\\" 
 }

 flat(4);
 mountain(4);
 flat(4)

 return result;
}
console.log(landscape())



// 1. The variable 'result' is initialized to an empty string: ""
// 2. Using the 'flat' function, 4 underscores ("____") are added to 'result'.
// 3. Using the 'mountain' function, it adds:
//    - a forward slash "/"
//    - then 4 apostrophes "''''"
//    - then a backslash "\"
// 4. Calling 'flat(4)' again adds 4 more underscores "____" to 'result'.

// So the sequence of function calls:
// flat(4) → adds "____"
// mountain(4) → adds "/''''\"
// flat(4) → adds "____"

// Final result: "____/''''\____"


