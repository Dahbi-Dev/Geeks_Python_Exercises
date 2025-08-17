import "./style.css";
import { RecipeItem } from "./model/RecipeItem.js";
import { RecipeCollection } from "./model/RecipeCollection.js";
import { RecipeTemplate } from "./templates/RecipeTemplate.js";

// Initialize the recipe collection
const recipeCollection = new RecipeCollection();

// Get DOM elements
const app = document.querySelector<HTMLDivElement>("#app")!;

// Set up the HTML structure
app.innerHTML = `
  <div class="recipe-app">
    <h1>Recipe Book App</h1>
    
    <form id="recipeEntryForm">
      <input type="text" id="recipeTitle" placeholder="Recipe Title" required />
      <textarea
        id="ingredients"
        placeholder="Enter ingredients (one per line)"
        required
      ></textarea>
      <textarea
        id="instructions"
        placeholder="Enter cooking instructions"
        required
      ></textarea>
      <button type="submit">Add Recipe</button>
    </form>

    <div id="recipeContainer"></div>

    <button id="clearRecipesButton">Clear All Recipes</button>
  </div>
`;

// Get references to form elements
const form = document.getElementById("recipeEntryForm") as HTMLFormElement;
const titleInput = document.getElementById("recipeTitle") as HTMLInputElement;
const ingredientsInput = document.getElementById(
    "ingredients"
) as HTMLTextAreaElement;
const instructionsInput = document.getElementById(
    "instructions"
) as HTMLTextAreaElement;
const recipeContainer = document.getElementById(
    "recipeContainer"
) as HTMLDivElement;
const clearButton = document.getElementById(
    "clearRecipesButton"
) as HTMLButtonElement;

function renderRecipes(): void {
    const recipes = recipeCollection.getAllRecipes();
    RecipeTemplate.updateRecipeContainer(recipeContainer, recipes);
}

function clearForm(): void {
    titleInput.value = "";
    ingredientsInput.value = "";
    instructionsInput.value = "";
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = titleInput.value.trim();
    const ingredientsText = ingredientsInput.value.trim();
    const instructions = instructionsInput.value.trim();

    if (title && ingredientsText && instructions) {
        // Split ingredients by lines and filter empty lines
        const ingredients = ingredientsText
            .split("\n")
            .map((ingredient) => ingredient.trim())
            .filter((ingredient) => ingredient.length > 0);

        // Create new recipe
        const recipe = new RecipeItem(title, ingredients, instructions);
        recipeCollection.addRecipe(recipe);

        // Clear form and re-render
        clearForm();
        renderRecipes();
    }
});

// Handle clear all recipes
clearButton.addEventListener("click", () => {
    if (confirm("Are you sure you want to clear all recipes?")) {
        recipeCollection.clearAllRecipes();
        renderRecipes();
    }
});

// Global functions for template buttons (need to be on window object)
declare global {
    interface Window {
        toggleFavorite: (id: string) => void;
        toggleDetails: (id: string) => void;
        deleteRecipe: (id: string) => void;
    }
}

window.toggleFavorite = (id: string) => {
    recipeCollection.toggleFavorite(id);
    renderRecipes();
};

window.toggleDetails = (id: string) => {
    const card = document.querySelector(`[data-id="${id}"]`);
    if (card) {
        const content = card.querySelector(".recipe-content");
        if (content) {
            content.classList.toggle("expanded");
        }
    }
};

window.deleteRecipe = (id: string) => {
    if (confirm("Are you sure you want to delete this recipe?")) {
        recipeCollection.removeRecipe(id);
        renderRecipes();
    }
};

// Initial render
renderRecipes();
