import express, { json } from 'express';
import cors from "cors"
import { config } from 'dotenv';
import router from './routes/auth.js';
import { connectDB } from './config.js';

// Load environment variables from .env file
config();
connectDB()

const app = express();

// Middleware for parsing JSON bodies
app.use(json());
app.use(cors())

let authRoutes = router;

// Default route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the server!' });
});

app.use("/auth", authRoutes);

// Define port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});