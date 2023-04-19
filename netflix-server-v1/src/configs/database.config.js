import mongoose from "mongoose";

const connectionString = "mongodb+srv://codegigas:e6ZrTLHCHskAASzn@sandbox.7lffu.mongodb.net/netflix-clone";

const connectDB = async () => {
  try {
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected...");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

export default connectDB;