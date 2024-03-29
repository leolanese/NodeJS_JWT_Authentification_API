// change package.json "type": "module",
// to use imports

import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { connectDB } from './config/db.js';
import userRoutes from './route/routes.js';

// Calling dotenv's config method to load environment variables from a .env file into process.env.
dotenv.config();

// Connecting to the database.
connectDB()

// Creating a new express application.
const app = express()

// Checking if the application is in development mode.
// If it is, morgan middleware is added to the express application to log HTTP requests.
if(process.env.MODE === 'development'){
    app.use(morgan('dev'))  
}

// Using express.json middleware. This allows the app to parse incoming requests with JSON payloads.
app.use(express.json());

// Setting up the userRoutes to be used with the path '/api'.
app.use('/api/', userRoutes)

// Getting the port from environment variables or defaulting to 5050 if it doesn't exist.
const PORT = process.env.PORT || 5050;

// Starting the express server and listening for connections on the specified port.
app.listen(PORT, (err) =>  
    (err) ? console.error(`Failed to start server: ${err}`) :  console.log(`Server running on: ${PORT}`)
);


// Route for the root ('/') of the application. When this route is hit, it sends back a message.
app.get('/', (req, res) => {
    res.send('YAY! API is running good')
});
