import { RecipeItem } from "./RecipeItem.js";

export class RecipeCollection {
    private recipes: RecipeItem[] = [];

    constructor() {
        this.loadFromStorage();
    }

    addRecipe(recipe: RecipeItem): void {
        this.recipes.push(recipe);
        this.saveToStorage();
    }

    removeRecipe(id: string): boolean {
        const index = this.recipes.findIndex((recipe) => recipe.id === id);
        if (index !== -1) {
            this.recipes.splice(index, 1);
            this.saveToStorage();
            return true;
        }
        return false;
    }

    toggleFavorite(id: string): boolean {
        const recipe = this.recipes.find((recipe) => recipe.id === id);
        if (recipe) {
            recipe.toggleFavorite();
            this.saveToStorage();
            return true;
        }
        return false;
    }

    getAllRecipes(): RecipeItem[] {
        return [...this.recipes];
    }

    clearAllRecipes(): void {
        this.recipes = [];
        this.saveToStorage();
    }

    private saveToStorage(): void {
        try {
            const recipesData = this.recipes.map((recipe) => recipe.toJSON());
            localStorage.setItem("recipes", JSON.stringify(recipesData));
        } catch (error) {
            console.error("Failed to save recipes to storage:", error);
        }
    }

    private loadFromStorage(): void {
        try {
            const stored = localStorage.getItem("recipes");
            if (stored) {
                const recipesData = JSON.parse(stored);
                this.recipes = recipesData.map((data: any) =>
                    RecipeItem.fromJSON(data)
                );
            }
        } catch (error) {
            console.error("Failed to load recipes from storage:", error);
            this.recipes = [];
        }
    }
}
