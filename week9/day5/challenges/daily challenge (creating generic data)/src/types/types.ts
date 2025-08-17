// Base interface for API responses
export interface ApiResponse<T> {
    status: "success" | "error";
    data?: T;
    message?: string;
}

// Recipe interfaces
export interface Recipe {
    id: number;
    title: string;
    image?: string;
    imageType?: string;
    usedIngredientCount?: number;
    missedIngredientCount?: number;
    missedIngredients?: Ingredient[];
    usedIngredients?: Ingredient[];
    unusedIngredients?: Ingredient[];
    likes?: number;
}

export interface Ingredient {
    id: number;
    amount: number;
    unit: string;
    unitLong: string;
    unitShort: string;
    aisle: string;
    name: string;
    original: string;
    originalString: string;
    originalName: string;
    metaInformation: string[];
    meta: string[];
    image: string;
}

// Detailed recipe information
export interface RecipeDetails {
    id: number;
    title: string;
    image: string;
    servings: number;
    readyInMinutes: number;
    license: string;
    sourceName: string;
    sourceUrl: string;
    spoonacularSourceUrl: string;
    aggregateLikes: number;
    healthScore: number;
    spoonacularScore: number;
    pricePerServing: number;
    analyzedInstructions: AnalyzedInstruction[];
    cheap: boolean;
    creditsText: string;
    cuisines: string[];
    dairyFree: boolean;
    diets: string[];
    gaps: string;
    glutenFree: boolean;
    instructions: string;
    ketogenic: boolean;
    lowFodmap: boolean;
    occasions: string[];
    sustainable: boolean;
    vegan: boolean;
    vegetarian: boolean;
    veryHealthy: boolean;
    veryPopular: boolean;
    whole30: boolean;
    weightWatcherSmartPoints: number;
    dishTypes: string[];
    extendedIngredients: ExtendedIngredient[];
    summary: string;
    winePairing: WinePairing;
}

export interface AnalyzedInstruction {
    name: string;
    steps: Step[];
}

export interface Step {
    number: number;
    step: string;
    ingredients: StepIngredient[];
    equipment: Equipment[];
    length?: Length;
}

export interface StepIngredient {
    id: number;
    name: string;
    localizedName: string;
    image: string;
}

export interface Equipment {
    id: number;
    name: string;
    localizedName: string;
    image: string;
    temperature?: Temperature;
}

export interface Temperature {
    number: number;
    unit: string;
}

export interface Length {
    number: number;
    unit: string;
}

export interface ExtendedIngredient {
    aisle: string;
    amount: number;
    consitency: string;
    id: number;
    image: string;
    measures: Measures;
    meta: string[];
    name: string;
    nameClean: string;
    original: string;
    originalName: string;
    unit: string;
}

export interface Measures {
    metric: Metric;
    us: Us;
}

export interface Metric {
    amount: number;
    unitLong: string;
    unitShort: string;
}

export interface Us {
    amount: number;
    unitLong: string;
    unitShort: string;
}

export interface WinePairing {
    pairedWines: string[];
    pairingText: string;
    productMatches: ProductMatch[];
}

export interface ProductMatch {
    id: number;
    title: string;
    description: string;
    price: string;
    imageUrl: string;
    averageRating: number;
    ratingCount: number;
    score: number;
    link: string;
}

// Redux state interfaces
export interface DataState<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

export interface RootState {
    recipes: DataState<Recipe[]>;
    recipeDetails: DataState<RecipeDetails>;
}

// API endpoints configuration
export interface ApiEndpoint {
    url: string;
    method: "GET" | "POST" | "PUT" | "DELETE";
    headers?: Record<string, string>;
}

// Generic data fetcher props
export interface DataFetcherProps<T> {
    endpoint: string;
    apiKey?: string;
    queryParams?: Record<string, string | number>;
    onSuccess?: (data: T) => void;
    onError?: (error: string) => void;
    renderData: (data: T) => React.ReactNode;
    renderLoading?: () => React.ReactNode;
    renderError?: (error: string) => React.ReactNode;
}
