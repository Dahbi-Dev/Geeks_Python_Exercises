import React, { useState, useEffect } from "react";
import { fetchFromEndpoint } from "../api/api";

interface DataFetcherProps<T> {
    endpoint: string;
    queryParams?: Record<string, string | number>;
    apiKey?: string;
    renderData: (data: T) => React.ReactNode;
    renderLoading?: () => React.ReactNode;
    renderError?: (error: string) => React.ReactNode;
    autoFetch?: boolean;
    onSuccess?: (data: T) => void;
    onError?: (error: string) => void;
}

export function DataFetcher<T>({
    endpoint,
    queryParams = {},
    apiKey,
    renderData,
    renderLoading,
    renderError,
    autoFetch = false,
    onSuccess,
    onError,
}: DataFetcherProps<T>) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async (
        customParams?: Record<string, string | number>
    ) => {
        setLoading(true);
        setError(null);

        try {
            const params = { ...queryParams, ...customParams };
            const response = await fetchFromEndpoint<T>(
                endpoint,
                params,
                apiKey
            );

            if (response.status === "error") {
                setError(response.message || "Failed to fetch data");
                if (onError) {
                    onError(response.message || "Failed to fetch data");
                }
            } else {
                setData(response.data || null);
                if (onSuccess && response.data) {
                    onSuccess(response.data);
                }
            }
        } catch (err) {
            const errorMessage =
                err instanceof Error
                    ? err.message
                    : "An unknown error occurred";
            setError(errorMessage);
            if (onError) {
                onError(errorMessage);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (autoFetch) {
            fetchData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [autoFetch]);

    const clearData = () => {
        setData(null);
        setError(null);
    };

    // Default loading component
    const defaultLoading = () => (
        <div className="data-fetcher-loading">
            <div className="spinner"></div>
            <p>Loading...</p>
        </div>
    );

    // Default error component
    const defaultError = (errorMessage: string) => (
        <div className="data-fetcher-error">
            <h3>Error</h3>
            <p>{errorMessage}</p>
            <button onClick={() => fetchData()} className="retry-button">
                Retry
            </button>
        </div>
    );

    return (
        <div className="data-fetcher">
            {/* Manual fetch controls */}
            <div className="data-fetcher-controls">
                <button
                    onClick={() => fetchData()}
                    disabled={loading}
                    className="fetch-button"
                >
                    {loading ? "Fetching..." : "Fetch Data"}
                </button>

                <button
                    onClick={clearData}
                    disabled={loading}
                    className="clear-button"
                >
                    Clear Data
                </button>
            </div>

            {/* Render content based on state */}
            {loading && (renderLoading ? renderLoading() : defaultLoading())}

            {error &&
                !loading &&
                (renderError ? renderError(error) : defaultError(error))}

            {data && !loading && !error && renderData(data)}

            {!data && !loading && !error && (
                <div className="data-fetcher-empty">
                    <p>
                        No data available. Click "Fetch Data" to load content.
                    </p>
                </div>
            )}
        </div>
    );
}

// Specific component implementations for common use cases

interface RecipeSearchProps {
    apiKey?: string;
    autoFetch?: boolean;
    ingredients?: string;
    query?: string;
    number?: number;
}

interface RecipeData {
    id: number;
    title: string;
    image: string;
    usedIngredientCount?: number;
    missedIngredientCount?: number;
    likes?: number;
    readyInMinutes?: number;
    servings?: number;
    healthScore?: number;
    summary?: string;
}

interface SearchResultsData {
    results: RecipeData[];
    totalResults: number;
}

interface RandomRecipesData {
    recipes: RecipeData[];
}

export const RecipesByIngredients: React.FC<RecipeSearchProps> = ({
    apiKey,
    autoFetch = false,
    ingredients = "chicken,rice",
    number = 10,
}) => {
    return (
        <DataFetcher<RecipeData[]>
            endpoint="/recipes/findByIngredients"
            queryParams={{
                ingredients,
                number,
                ranking: 1,
                ignorePantry: "true",
            }}
            apiKey={apiKey}
            autoFetch={autoFetch}
            renderData={(data: RecipeData[]) => (
                <div className="recipes-grid">
                    <h2>Recipes by Ingredients ({ingredients})</h2>
                    <div className="recipes-list">
                        {data.map((recipe: RecipeData) => (
                            <div key={recipe.id} className="recipe-card">
                                {recipe.image && (
                                    <img
                                        src={recipe.image}
                                        alt={recipe.title}
                                    />
                                )}
                                <h3>{recipe.title}</h3>
                                <p>
                                    Used ingredients:{" "}
                                    {recipe.usedIngredientCount || 0}
                                </p>
                                <p>
                                    Missing ingredients:{" "}
                                    {recipe.missedIngredientCount || 0}
                                </p>
                                <p>Likes: {recipe.likes || 0}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            renderLoading={() => (
                <div className="loading-recipes">
                    <div className="spinner"></div>
                    <p>
                        Searching for recipes with ingredients: {ingredients}...
                    </p>
                </div>
            )}
        />
    );
};

export const RecipeSearch: React.FC<RecipeSearchProps> = ({
    apiKey,
    autoFetch = false,
    query = "pasta",
    number = 10,
}) => {
    return (
        <DataFetcher<SearchResultsData>
            endpoint="/recipes/complexSearch"
            queryParams={{
                query,
                number,
                addRecipeInformation: "true",
                fillIngredients: "true",
            }}
            apiKey={apiKey}
            autoFetch={autoFetch}
            renderData={(data: SearchResultsData) => (
                <div className="recipe-search-results">
                    <h2>Search Results for "{query}"</h2>
                    <p>Found {data.totalResults} recipes</p>
                    <div className="recipes-grid">
                        {data.results?.map((recipe: RecipeData) => (
                            <div key={recipe.id} className="recipe-card">
                                {recipe.image && (
                                    <img
                                        src={recipe.image}
                                        alt={recipe.title}
                                    />
                                )}
                                <h3>{recipe.title}</h3>
                                <p>
                                    Ready in: {recipe.readyInMinutes || "N/A"}{" "}
                                    minutes
                                </p>
                                <p>Servings: {recipe.servings || "N/A"}</p>
                                <p>
                                    Health Score: {recipe.healthScore || "N/A"}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        />
    );
};

export const RandomRecipes: React.FC<RecipeSearchProps> = ({
    apiKey,
    autoFetch = true,
    number = 6,
}) => {
    return (
        <DataFetcher<RandomRecipesData>
            endpoint="/recipes/random"
            queryParams={{ number }}
            apiKey={apiKey}
            autoFetch={autoFetch}
            renderData={(data: RandomRecipesData) => (
                <div className="random-recipes">
                    <h2>Random Recipes</h2>
                    <div className="recipes-grid">
                        {data.recipes?.map((recipe: RecipeData) => (
                            <div key={recipe.id} className="recipe-card">
                                {recipe.image && (
                                    <img
                                        src={recipe.image}
                                        alt={recipe.title}
                                    />
                                )}
                                <h3>{recipe.title}</h3>
                                <p>
                                    Ready in: {recipe.readyInMinutes || "N/A"}{" "}
                                    minutes
                                </p>
                                <p>
                                    Health Score: {recipe.healthScore || "N/A"}
                                </p>
                                {recipe.summary && (
                                    <div
                                        className="recipe-summary"
                                        dangerouslySetInnerHTML={{
                                            __html:
                                                recipe.summary.substring(
                                                    0,
                                                    100
                                                ) + "...",
                                        }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        />
    );
};
