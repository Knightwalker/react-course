import mongoose from "mongoose";

const connectDB = async () => {
    const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING; // This is being loaded runtime. TODO: figure out how to load all env variables asap

    try {
        await mongoose.connect(DB_CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected...");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
};

export default connectDB;