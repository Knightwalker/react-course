import mongoose from "mongoose";

const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;

// mongoose.connection.on("disconnected", () => {
//     console.error("MongoDB connection lost. Exiting...");
//     process.exit(1);
// });

// mongoose.connection.on("error", (err) => {
//     console.error("MongoDB connection error: ${err}. Exiting...");
//     process.exit(1);
// });

const connectDB = async () => {
    try {
        await mongoose.connect(DB_CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB connected at ${DB_CONNECTION_STRING}`);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        throw new Error("Error connecting to MongoDB");
    }
};

export default connectDB;