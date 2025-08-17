import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { fetchFromEndpoint } from "../api/api";
import type { ApiResponse, DataState } from "../types/types";

// Generic async thunk for fetching data
export const fetchGenericData = createAsyncThunk<
    unknown,
    {
        endpoint: string;
        queryParams?: Record<string, string | number>;
        apiKey?: string;
    },
    { rejectValue: string }
>(
    "data/fetchGenericData",
    async ({ endpoint, queryParams = {}, apiKey }, { rejectWithValue }) => {
        try {
            const response: ApiResponse<unknown> = await fetchFromEndpoint(
                endpoint,
                queryParams,
                apiKey
            );

            if (response.status === "error") {
                return rejectWithValue(
                    response.message || "Failed to fetch data"
                );
            }

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error instanceof Error
                    ? error.message
                    : "An unknown error occurred"
            );
        }
    }
);

// Specific async thunks for common operations

// Fetch recipes by ingredients
export const fetchRecipesByIngredients = createAsyncThunk<
    unknown,
    {
        ingredients: string;
        number?: number;
        apiKey?: string;
    },
    { rejectValue: string }
>(
    "data/fetchRecipesByIngredients",
    async ({ ingredients, number = 10, apiKey }, { rejectWithValue }) => {
        try {
            const response = await fetchFromEndpoint(
                "/recipes/findByIngredients",
                {
                    ingredients,
                    number,
                    ranking: 1,
                    ignorePantry: "true",
                },
                apiKey
            );

            if (response.status === "error") {
                return rejectWithValue(
                    response.message || "Failed to fetch recipes"
                );
            }

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error instanceof Error
                    ? error.message
                    : "An unknown error occurred"
            );
        }
    }
);

// Fetch recipe details
export const fetchRecipeDetails = createAsyncThunk<
    unknown,
    {
        id: number;
        includeNutrition?: boolean;
        apiKey?: string;
    },
    { rejectValue: string }
>(
    "data/fetchRecipeDetails",
    async ({ id, includeNutrition = false, apiKey }, { rejectWithValue }) => {
        try {
            const response = await fetchFromEndpoint(
                `/recipes/${id}/information`,
                {
                    includeNutrition: includeNutrition ? "true" : "false",
                },
                apiKey
            );

            if (response.status === "error") {
                return rejectWithValue(
                    response.message || "Failed to fetch recipe details"
                );
            }

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error instanceof Error
                    ? error.message
                    : "An unknown error occurred"
            );
        }
    }
);

// Search recipes
export const searchRecipes = createAsyncThunk<
    unknown,
    {
        query: string;
        number?: number;
        cuisine?: string;
        diet?: string;
        apiKey?: string;
    },
    { rejectValue: string }
>(
    "data/searchRecipes",
    async (
        { query, number = 10, cuisine, diet, apiKey },
        { rejectWithValue }
    ) => {
        try {
            const params: Record<string, string | number> = {
                query,
                number,
                addRecipeInformation: "true",
                fillIngredients: "true",
            };

            if (cuisine) params.cuisine = cuisine;
            if (diet) params.diet = diet;

            const response = await fetchFromEndpoint(
                "/recipes/complexSearch",
                params,
                apiKey
            );

            if (response.status === "error") {
                return rejectWithValue(
                    response.message || "Failed to search recipes"
                );
            }

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error instanceof Error
                    ? error.message
                    : "An unknown error occurred"
            );
        }
    }
);

// Get random recipes
export const fetchRandomRecipes = createAsyncThunk<
    unknown,
    {
        number?: number;
        tags?: string;
        apiKey?: string;
    },
    { rejectValue: string }
>(
    "data/fetchRandomRecipes",
    async ({ number = 10, tags, apiKey }, { rejectWithValue }) => {
        try {
            const params: Record<string, string | number> = { number };
            if (tags) params.tags = tags;

            const response = await fetchFromEndpoint(
                "/recipes/random",
                params,
                apiKey
            );

            if (response.status === "error") {
                return rejectWithValue(
                    response.message || "Failed to fetch random recipes"
                );
            }

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error instanceof Error
                    ? error.message
                    : "An unknown error occurred"
            );
        }
    }
);

// Initial state
const initialState: DataState<unknown> = {
    data: null,
    loading: false,
    error: null,
};

// Data slice
const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        clearData: (state) => {
            state.data = null;
            state.error = null;
        },
        clearError: (state) => {
            state.error = null;
        },
        setData: (state, action: PayloadAction<unknown>) => {
            state.data = action.payload;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Generic data fetching
        builder
            .addCase(fetchGenericData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGenericData.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(fetchGenericData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch data";
            });

        // Recipes by ingredients
        builder
            .addCase(fetchRecipesByIngredients.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRecipesByIngredients.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(fetchRecipesByIngredients.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch recipes";
            });

        // Recipe details
        builder
            .addCase(fetchRecipeDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRecipeDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(fetchRecipeDetails.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.payload || "Failed to fetch recipe details";
            });

        // Search recipes
        builder
            .addCase(searchRecipes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchRecipes.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(searchRecipes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to search recipes";
            });

        // Random recipes
        builder
            .addCase(fetchRandomRecipes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRandomRecipes.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(fetchRandomRecipes.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.payload || "Failed to fetch random recipes";
            });
    },
});

export const { clearData, clearError, setData } = dataSlice.actions;
export default dataSlice.reducer;
