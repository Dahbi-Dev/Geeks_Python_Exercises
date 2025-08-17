import React, { useState } from "react";
import "./App.css";
import {
    DataFetcher,
    RecipesByIngredients,
    RecipeSearch,
    RandomRecipes,
} from "./components/DataFetcher";

interface ApiConfigProps {
    apiKey: string;
    onApiKeyChange: (key: string) => void;
}

const ApiConfig: React.FC<ApiConfigProps> = ({ apiKey, onApiKeyChange }) => (
    <div className="api-config">
        <h3>API Configuration</h3>
        <div className="api-key-input">
            <label htmlFor="apiKey">Spoonacular API Key:</label>
            <input
                id="apiKey"
                type="text"
                value={apiKey}
                onChange={(e) => onApiKeyChange(e.target.value)}
                placeholder="Enter your Spoonacular API key"
            />
        </div>
        <p className="api-info">
            Get your free API key from{" "}
            <a
                href="https://spoonacular.com/food-api"
                target="_blank"
                rel="noopener noreferrer"
            >
                Spoonacular API
            </a>
        </p>
    </div>
);

function App() {
    const [apiKey, setApiKey] = useState("");
    const [activeTab, setActiveTab] = useState<
        "random" | "search" | "ingredients" | "generic"
    >("random");

    // For generic data fetcher demonstration
    const [customEndpoint, setCustomEndpoint] = useState("/recipes/random");
    const [customParams, setCustomParams] = useState('{"number": 3}');

    const parseCustomParams = (): Record<string, string | number> => {
        try {
            return JSON.parse(customParams);
        } catch {
            return {};
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Generic Data Fetcher for Recipe API</h1>
                <p>
                    A React TypeScript application demonstrating generic data
                    fetching with the Spoonacular Recipe API
                </p>
            </header>

            <ApiConfig apiKey={apiKey} onApiKeyChange={setApiKey} />

            <nav className="tab-navigation">
                <button
                    className={activeTab === "random" ? "active" : ""}
                    onClick={() => setActiveTab("random")}
                >
                    Random Recipes
                </button>
                <button
                    className={activeTab === "search" ? "active" : ""}
                    onClick={() => setActiveTab("search")}
                >
                    Recipe Search
                </button>
                <button
                    className={activeTab === "ingredients" ? "active" : ""}
                    onClick={() => setActiveTab("ingredients")}
                >
                    Recipes by Ingredients
                </button>
                <button
                    className={activeTab === "generic" ? "active" : ""}
                    onClick={() => setActiveTab("generic")}
                >
                    Generic Fetcher
                </button>
            </nav>

            <main className="main-content">
                {activeTab === "random" && (
                    <div className="tab-content">
                        <RandomRecipes apiKey={apiKey} autoFetch={!!apiKey} />
                    </div>
                )}

                {activeTab === "search" && (
                    <div className="tab-content">
                        <RecipeSearch
                            apiKey={apiKey}
                            query="pasta"
                            number={8}
                        />
                    </div>
                )}

                {activeTab === "ingredients" && (
                    <div className="tab-content">
                        <RecipesByIngredients
                            apiKey={apiKey}
                            ingredients="chicken,rice,onion"
                            number={6}
                        />
                    </div>
                )}

                {activeTab === "generic" && (
                    <div className="tab-content">
                        <div className="generic-config">
                            <h3>Generic Data Fetcher Configuration</h3>
                            <div className="config-input">
                                <label htmlFor="endpoint">API Endpoint:</label>
                                <input
                                    id="endpoint"
                                    type="text"
                                    value={customEndpoint}
                                    onChange={(e) =>
                                        setCustomEndpoint(e.target.value)
                                    }
                                    placeholder="/recipes/random"
                                />
                            </div>
                            <div className="config-input">
                                <label htmlFor="params">
                                    Query Parameters (JSON):
                                </label>
                                <textarea
                                    id="params"
                                    value={customParams}
                                    onChange={(e) =>
                                        setCustomParams(e.target.value)
                                    }
                                    placeholder='{"number": 3, "tags": "vegetarian"}'
                                    rows={3}
                                />
                            </div>
                        </div>

                        <DataFetcher
                            endpoint={customEndpoint}
                            queryParams={parseCustomParams()}
                            apiKey={apiKey}
                            renderData={(data: unknown) => (
                                <div className="generic-results">
                                    <h3>Generic API Response</h3>
                                    <pre className="json-display">
                                        {JSON.stringify(data, null, 2)}
                                    </pre>
                                </div>
                            )}
                            renderLoading={() => (
                                <div className="custom-loading">
                                    <div className="spinner"></div>
                                    <p>
                                        Fetching data from {customEndpoint}...
                                    </p>
                                </div>
                            )}
                            renderError={(error) => (
                                <div className="custom-error">
                                    <h3>API Error</h3>
                                    <p>{error}</p>
                                    <details>
                                        <summary>Debugging Information</summary>
                                        <p>Endpoint: {customEndpoint}</p>
                                        <p>Parameters: {customParams}</p>
                                    </details>
                                </div>
                            )}
                        />
                    </div>
                )}
            </main>

            {!apiKey && (
                <div className="api-warning">
                    <h3>⚠️ API Key Required</h3>
                    <p>
                        Please enter your Spoonacular API key above to start
                        fetching recipe data.
                    </p>
                </div>
            )}
        </div>
    );
}

export default App;
