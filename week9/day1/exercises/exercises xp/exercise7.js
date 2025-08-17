function demonstrateTypeAssertion() {
    var inputElement = document.createElement("input");
    inputElement.type = "text";
    inputElement.id = "myInput";
    var typedInput = inputElement;
    typedInput.value = "Hello from TypeScript!";
    console.log("Input element created and value set:", typedInput.value);
    console.log("Input element type:", typedInput.type);
    console.log("Input element ID:", typedInput.id);
    var alternativeAssertion = inputElement;
    alternativeAssertion.placeholder = "Enter your text here";
    console.log("Placeholder set using alternative syntax:", alternativeAssertion.placeholder);
}
demonstrateTypeAssertion();
console.log("Type assertion demonstration completed!");
