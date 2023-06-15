import mongoose from "mongoose";

/**
 * Connect to MongoDB
 * @param {boolean} exitOnError Whether to exit the process if a connection error occurs
 * @returns {Promise<void>}
 */
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        console.log(`MongoDB is Connected successfully: ${conn.connection.host}`)
    } catch (error) {
        console.error(`MongoDB Error: ${error.message}`)
        process.exit(1)
    }
}

export { connectDB };
