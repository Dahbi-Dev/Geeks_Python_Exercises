import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000";

export const registerUser = async (email, password) => {
    try {
        const response = await axios.post("/users", { email, password });
        if (response.status === 200) {
            return response.data;
        }
        else {
            throw new Error("Invalid credentials");
        }
    }
    catch (error) {
        console.log(error);
    }
};

export const getUsers = async () => {
    try {
        const response = await axios.get("/users");
        if (response.status === 200) {
            return response.data;
        }
        else {
            throw new Error("Failed to fetch users");
        }
    }
    catch (error) {
        console.log(error);
    }
};
