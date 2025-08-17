# Generic Recipe Data Fetcher

A React TypeScript application demonstrating generic data fetching with Redux, showcasing integration with the Spoonacular Recipe - Food - Nutrition API.

## 🚀 Features

-   **Generic Data Fetcher Component**: Reusable component for fetching data from any API endpoint
-   **Type-Safe TypeScript**: Full TypeScript integration with proper typing
-   **Redux State Management**: Centralized state management with Redux Toolkit
-   **Recipe API Integration**: Multiple recipe endpoints from Spoonacular API
-   **Beautiful UI**: Modern, responsive design with CSS Grid and Flexbox
-   **Error Handling**: Comprehensive error handling with user-friendly messages
-   **Loading States**: Elegant loading indicators and skeleton screens
-   **Configurable Components**: Customizable API endpoints and parameters

## 🏗️ Project Structure

```
src/
├── api/
│   └── api.ts                 # API functions and fetch utilities
├── features/
│   ├── store.ts              # Redux store configuration
│   └── dataSlice.ts          # Redux slice for data management
├── components/
│   └── DataFetcher.tsx       # Generic data fetching component
├── types/
│   └── types.ts              # TypeScript type definitions
├── App.tsx                   # Main application component
├── App.css                   # Application styles
└── main.tsx                  # Application entry point
```

## 🛠️ Technology Stack

-   **React 19** - UI library
-   **TypeScript** - Type-safe JavaScript
-   **Redux Toolkit** - State management
-   **React Redux** - React bindings for Redux
-   **Vite** - Build tool and development server
-   **CSS3** - Styling with modern features

## 📦 Installation

1. **Clone the repository**

    ```bash
    git clone <repository-url>
    cd daily-challenge-creating-generic-data
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Set up environment variables**

    ```bash
    # Copy the example environment file
    cp .env.example .env

    # Edit .env and add your Spoonacular API key
    VITE_SPOONACULAR_API_KEY=your_api_key_here
    ```

4. **Get a Spoonacular API Key**

    - Visit [Spoonacular API](https://spoonacular.com/food-api)
    - Create a free account
    - Get your API key from the dashboard
    - Add it to your `.env` file

5. **Start the development server**
    ```bash
    npm run dev
    ```

## 🔑 API Setup

This application uses the Spoonacular Food API. To get started:

1. **Sign up** at [https://spoonacular.com/food-api](https://spoonacular.com/food-api)
2. **Get your API key** from the dashboard
3. **Add it to your environment** variables (see installation steps)

### Free Tier Limits

-   150 requests per day
-   No commercial use
-   Perfect for development and learning

## 🎯 Usage Examples

### Basic Data Fetcher

```tsx
import { DataFetcher } from "./components/DataFetcher";

<DataFetcher
    endpoint="/recipes/random"
    queryParams={{ number: 5 }}
    apiKey="your-api-key"
    renderData={(data) => <div>{JSON.stringify(data)}</div>}
/>;
```

### Recipe Search

```tsx
import { RecipeSearch } from "./components/DataFetcher";

<RecipeSearch
    apiKey="your-api-key"
    query="pasta"
    number={10}
    autoFetch={true}
/>;
```

### Recipes by Ingredients

```tsx
import { RecipesByIngredients } from "./components/DataFetcher";

<RecipesByIngredients
    apiKey="your-api-key"
    ingredients="chicken,rice,onion"
    number={8}
/>;
```

## 🔧 API Endpoints

The application supports multiple Spoonacular API endpoints:

-   **Random Recipes**: `/recipes/random`
-   **Recipe Search**: `/recipes/complexSearch`
-   **Find by Ingredients**: `/recipes/findByIngredients`
-   **Recipe Information**: `/recipes/{id}/information`
-   **Recipe Nutrition**: `/recipes/{id}/nutritionWidget.json`

## 📱 Features Overview

### 1. Random Recipes Tab

-   Fetches random recipes automatically
-   Displays recipe cards with images and basic info
-   Configurable number of recipes

### 2. Recipe Search Tab

-   Search recipes by name or keywords
-   Advanced filtering options
-   Paginated results

### 3. Recipes by Ingredients Tab

-   Find recipes based on available ingredients
-   Shows used vs. missing ingredients
-   Helpful for meal planning

### 4. Generic Fetcher Tab

-   Test any API endpoint
-   Configure custom parameters
-   JSON response viewer
-   Great for API exploration

## 🎨 Styling

The application features:

-   **Modern Design**: Clean, professional interface
-   **Responsive Layout**: Works on desktop, tablet, and mobile
-   **CSS Grid & Flexbox**: Modern layout techniques
-   **Smooth Animations**: Hover effects and transitions
-   **Loading States**: Beautiful spinners and skeleton screens
-   **Error Handling**: User-friendly error messages

## 🔄 State Management

Uses Redux Toolkit for state management:

```typescript
// Example state structure
interface DataState<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}
```

## 🧪 Development

### Available Scripts

-   `npm run dev` - Start development server
-   `npm run build` - Build for production
-   `npm run preview` - Preview production build
-   `npm run lint` - Run ESLint

### Adding New API Endpoints

1. **Add types** to `src/types/types.ts`
2. **Create API function** in `src/api/api.ts`
3. **Add Redux action** in `src/features/dataSlice.ts`
4. **Use in component** with `DataFetcher`

Example:

```typescript
// 1. Add type
interface NewDataType {
    id: number;
    name: string;
}

// 2. Add API function
export async function fetchNewData(params: any) {
    return fetchFromEndpoint("/new-endpoint", params);
}

// 3. Use in component
<DataFetcher<NewDataType>
    endpoint="/new-endpoint"
    queryParams={params}
    renderData={(data) => <div>{data.name}</div>}
/>;
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Environment Variables for Production

Make sure to set your environment variables in your deployment platform:

-   `VITE_SPOONACULAR_API_KEY` - Your Spoonacular API key

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

-   [Spoonacular API](https://spoonacular.com/food-api) for the recipe data
-   [Redux Toolkit](https://redux-toolkit.js.org/) for state management
-   [Vite](https://vitejs.dev/) for the amazing build tool
-   [React](https://reactjs.org/) for the UI framework

## 📞 Support

If you have any questions or issues:

1. Check the [API documentation](https://spoonacular.com/food-api/docs)
2. Review the code examples in this README
3. Open an issue in this repository

---

**Happy Cooking! 🍳**
