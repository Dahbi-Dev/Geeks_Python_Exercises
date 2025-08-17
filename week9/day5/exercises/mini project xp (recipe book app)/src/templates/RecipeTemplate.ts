import { RecipeItem } from "../model/RecipeItem.js";

export class RecipeTemplate {
    static renderRecipeCard(recipe: RecipeItem): string {
        const favoriteIcon = recipe.isFavorite ? "❤️" : "🤍";
        const favoriteClass = recipe.isFavorite ? "favorite" : "";

        return `
            <div class="recipe-card ${favoriteClass}" data-id="${recipe.id}">
                <div class="recipe-header">
                    <h3 class="recipe-title">${recipe.title}</h3>
                    <button class="favorite-btn" onclick="toggleFavorite('${
                        recipe.id
                    }')" title="Toggle Favorite">
                        ${favoriteIcon}
                    </button>
                </div>
                <div class="recipe-content">
                    <div class="ingredients-section">
                        <h4>Ingredients:</h4>
                        <ul class="ingredients-list">
                            ${recipe.ingredients
                                .map((ingredient) => `<li>${ingredient}</li>`)
                                .join("")}
                        </ul>
                    </div>
                    <div class="instructions-section">
                        <h4>Instructions:</h4>
                        <div class="instructions-text">${
                            recipe.instructions
                        }</div>
                    </div>
                </div>
                <div class="recipe-actions">
                    <button class="details-btn" onclick="toggleDetails('${
                        recipe.id
                    }')">Show/Hide Details</button>
                    <button class="delete-btn" onclick="deleteRecipe('${
                        recipe.id
                    }')">Delete</button>
                </div>
            </div>
        `;
    }

    static renderAllRecipes(recipes: RecipeItem[]): string {
        if (recipes.length === 0) {
            return '<p class="no-recipes">No recipes found. Add your first recipe!</p>';
        }

        return recipes.map((recipe) => this.renderRecipeCard(recipe)).join("");
    }

    static updateRecipeContainer(
        container: HTMLElement,
        recipes: RecipeItem[]
    ): void {
        container.innerHTML = this.renderAllRecipes(recipes);
    }
}
