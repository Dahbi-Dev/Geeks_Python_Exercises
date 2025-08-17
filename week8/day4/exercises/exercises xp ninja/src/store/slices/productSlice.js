import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const mockProducts = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 99.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop",
        description: "High-quality wireless headphones with noise cancellation",
        category: "Electronics",
        stock: 15,
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 249.99,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop",
        description: "Advanced smartwatch with health monitoring features",
        category: "Electronics",
        stock: 8,
    },
    {
        id: 3,
        name: "Laptop Backpack",
        price: 39.99,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=200&fit=crop",
        description: "Durable laptop backpack with multiple compartments",
        category: "Accessories",
        stock: 25,
    },
    {
        id: 4,
        name: "Coffee Maker",
        price: 129.99,
        image: "https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?w=300&h=200&fit=crop",
        description: "Automatic coffee maker with programmable settings",
        category: "Home & Kitchen",
        stock: 12,
    },
    {
        id: 5,
        name: "Running Shoes",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=200&fit=crop",
        description: "Comfortable running shoes with advanced cushioning",
        category: "Sports",
        stock: 20,
    },
    {
        id: 6,
        name: "Bluetooth Speaker",
        price: 59.99,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=200&fit=crop",
        description: "Portable bluetooth speaker with excellent sound quality",
        category: "Electronics",
        stock: 18,
    },
];

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async (_, { rejectWithValue }) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            return mockProducts;
        } catch (error) {
            console.log(error)
            return rejectWithValue("Failed to fetch products");
        }
    }
);

export const fetchProductById = createAsyncThunk(
    "products/fetchProductById",
    async (productId, { rejectWithValue }) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            const product = mockProducts.find(
                (p) => p.id === parseInt(productId)
            );
            if (!product) {
                throw new Error("Product not found");
            }
            return product;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

const initialState = {
    items: [],
    selectedProduct: null,
    loading: false,
    error: null,
    categories: [
        "All",
        "Electronics",
        "Accessories",
        "Home & Kitchen",
        "Sports",
    ],
    selectedCategory: "All",
};

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload;
        },
        clearSelectedProduct: (state) => {
            state.selectedProduct = null;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchProductById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedProduct = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setSelectedCategory, clearSelectedProduct, clearError } =
    productSlice.actions;

export default productSlice.reducer;
