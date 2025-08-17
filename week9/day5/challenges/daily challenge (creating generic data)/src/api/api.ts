import type { ApiResponse } from "../types/types";

// Base API configuration
const BASE_URL = "https://api.spoonacular.com";
const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY || "YOUR_API_KEY_HERE";

// Generic API fetch function
export async function fetchData<T>(
    endpoint: string,
    queryParams: Record<string, string | number> = {},
    apiKey: string = API_KEY
): Promise<ApiResponse<T>> {
    try {
        // Build query string
        const params = new URLSearchParams();
        params.append("apiKey", apiKey);

        Object.entries(queryParams).forEach(([key, value]) => {
            params.append(key, value.toString());
        });

        const url = `${BASE_URL}${endpoint}?${params.toString()}`;

        console.log("Fetching from:", url);

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        return {
            status: "success",
            data: data as T,
        };
    } catch (error) {
        console.error("API fetch error:", error);
        return {
            status: "error",
            message:
                error instanceof Error
                    ? error.message
                    : "An unknown error occurred",
        };
    }
}

// Specific API functions for recipes

// Search recipes by ingredients
export async function searchRecipesByIngredients(
    ingredients: string,
    number: number = 10,
    apiKey?: string
) {
    return fetchData(
        "/recipes/findByIngredients",
        {
            ingredients,
            number,
            ranking: 1,
            ignorePantry: "true",
        },
        apiKey
    );
}

// Get recipe information by ID
export async function getRecipeInformation(
    id: number,
    includeNutrition: boolean = false,
    apiKey?: string
) {
    return fetchData(
        `/recipes/${id}/information`,
        {
            includeNutrition: includeNutrition ? "true" : "false",
        },
        apiKey
    );
}

// Search recipes by query
export async function searchRecipes(
    query: string,
    number: number = 10,
    cuisine?: string,
    diet?: string,
    apiKey?: string
) {
    const params: Record<string, string | number> = {
        query,
        number,
        addRecipeInformation: "true",
        fillIngredients: "true",
    };

    if (cuisine) params.cuisine = cuisine;
    if (diet) params.diet = diet;

    return fetchData("/recipes/complexSearch", params, apiKey);
}

// Get random recipes
export async function getRandomRecipes(
    number: number = 10,
    tags?: string,
    apiKey?: string
) {
    const params: Record<string, string | number> = {
        number,
    };

    if (tags) params.tags = tags;

    return fetchData("/recipes/random", params, apiKey);
}

// Get recipe nutrition by ID
export async function getRecipeNutrition(id: number, apiKey?: string) {
    return fetchData(`/recipes/${id}/nutritionWidget.json`, {}, apiKey);
}

// Get similar recipes
export async function getSimilarRecipes(
    id: number,
    number: number = 3,
    apiKey?: string
) {
    return fetchData(`/recipes/${id}/similar`, { number }, apiKey);
}

// Autocomplete recipe search
export async function autocompleteRecipeSearch(
    query: string,
    number: number = 10,
    apiKey?: string
) {
    return fetchData(
        "/recipes/autocomplete",
        {
            query,
            number,
        },
        apiKey
    );
}

// Get recipe equipment by ID
export async function getRecipeEquipment(id: number, apiKey?: string) {
    return fetchData(`/recipes/${id}/equipmentWidget.json`, {}, apiKey);
}

// Get recipe ingredients by ID
export async function getRecipeIngredients(id: number, apiKey?: string) {
    return fetchData(`/recipes/${id}/ingredientWidget.json`, {}, apiKey);
}

// Generic function to fetch from any endpoint
export async function fetchFromEndpoint<T>(
    endpoint: string,
    queryParams: Record<string, string | number> = {},
    apiKey?: string
): Promise<ApiResponse<T>> {
    return fetchData<T>(endpoint, queryParams, apiKey);
}
