import  { v4 as uuidv4 }  from "uuid";

export class RecipeItem {
    id: string;
    title: string;
    ingredients: string[];
    instructions: string;
    isFavorite: boolean;

    constructor(title: string, ingredients: string[], instructions: string) {
        this.id = uuidv4();
        this.title = title;
        this.ingredients = ingredients;
        this.instructions = instructions;
        this.isFavorite = false;
    }

    toggleFavorite(): void {
        this.isFavorite = !this.isFavorite;
    }

    toJSON(): any {
        return {
            id: this.id,
            title: this.title,
            ingredients: this.ingredients,
            instructions: this.instructions,
            isFavorite: this.isFavorite,
        };
    }

    static fromJSON(data: any): RecipeItem {
        const recipe = new RecipeItem(
            data.title,
            data.ingredients,
            data.instructions
        );
        recipe.id = data.id;
        recipe.isFavorite = data.isFavorite || false;
        return recipe;
    }
}
