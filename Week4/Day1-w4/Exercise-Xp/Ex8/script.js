function makeJuice(size) {
    const ingredients = [];

    function addIngredients([ing1, ing2, ing3]) {
        ingredients.push(ing1, ing2, ing3);
        document.getElementById("message").textContent = `The client wants a
         ${size} juice, containing ${ing1}, 
        ${ing2}, ${ing3}`;
    }

    function displayJuice() {
        document.getElementById("display").textContent = `The client wants a
        ${size} juice, containing ${ingredients.join(", ")}`;
    }

    addIngredients(["chocolate", "caramel", "apple"]);
    addIngredients(["banana", "mango", "orange"]);
    displayJuice();
}

makeJuice("Small");