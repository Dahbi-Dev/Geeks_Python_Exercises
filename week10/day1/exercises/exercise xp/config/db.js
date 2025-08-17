// database connection file to MongoDB
import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI || '');
        console.log(`mongodb connected: 🟢 `);
    } catch (error) {
        console.log(`Error: ${error.message} 🔴`);
        process.exit(1);
    }
};

export default connectDB;
