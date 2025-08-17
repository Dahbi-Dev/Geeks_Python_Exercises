function typeAssertion() {
    const inputElement = document.createElement("input");
    inputElement.type = "text";
    inputElement.id = "myInput";

    const typedInput = inputElement as HTMLInputElement;
    typedInput.value = "Hello from TypeScript!";

    console.log("Input element created and value set:", typedInput.value);
    console.log("Input element type:", typedInput.type);
    console.log("Input element ID:", typedInput.id);

    const alternativeAssertion = <HTMLInputElement>inputElement;
    alternativeAssertion.placeholder = "Enter your text here";

    console.log(
        "Placeholder set using alternative syntax:",
        alternativeAssertion.placeholder
    );
}

typeAssertion();