import "./App.css";
import ErrorBoundary from "./Components/ErrorBoundary";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import PostsList from "./Components/PostsList";
import Example1 from "./Components/Example1";
import Example2 from "./Components/Example2";
import Example3 from "./Components/Example3";

function App() {
    async function handlePostData() {
        const url = "https://webhook.site/18bd2ef3-3249-4619-a617-c655efdae19a";
        const data = {
            key1: "myusername",
            email: "mymail@gmail.com",
            name: "Isaac",
            lastname: "Doe",
            age: 27,
        };

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        console.log("Data posted successfully:", response);
    }
    return (
        <>
            <BrowserRouter>
                <div className="App">
                    <NavBar />
                </div>

                <div className="container mx-auto p-4">
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <ErrorBoundary>
                                    <HomeScreen />
                                </ErrorBoundary>
                            }
                        />
                        <Route
                            path="/profile"
                            element={
                                <ErrorBoundary>
                                    <ProfileScreen />
                                </ErrorBoundary>
                            }
                        />
                        <Route
                            path="/shop"
                            element={
                                <ErrorBoundary>
                                    <ShopScreen />
                                </ErrorBoundary>
                            }
                        />
                    </Routes>
                </div>
            </BrowserRouter>

            <div className="container mx-auto p-4">
                <h1 className="mb-4">Exercise 2: </h1>
                <PostsList />

                <h1 className="mt-4 mb-4">Exercise 3: </h1>
                <div className="flex flex-col gap-4">
                    <Example1 />
                    <Example2 />
                    <Example3 />
                </div>

                <h1 className="mt-4 mb-4">Exercise 4: </h1>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={handlePostData}
                >
                    Post some data
                </button>
            </div>
        </>
    );
}

function HomeScreen() {
    return (
        <div className="home-screen">
            <h1>Welcome to the Home Screen</h1>
            <p>This is the main content area.</p>
        </div>
    );
}
function ProfileScreen() {
    return (
        <div className="profile-screen">
            <h1>User Profile</h1>
            <p>This is the profile content area.</p>
        </div>
    );
}
function ShopScreen() {
    // throw an error during rendition to test the ErrorBoundary
    throw new Error("Test error from ShopScreen");

    return (
        <div className="shop-screen">
            <h1>Shop</h1>
            <p>This is the shop content area.</p>
        </div>
    );
}

export default App;
