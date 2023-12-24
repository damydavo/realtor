import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import userRoute from "./routes/userRoute.js"
import listingRoute from "./routes/listingRoute.js"
import cookieParser from 'cookie-parser';

const app = express();
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

dotenv.config()
connectDB()

app.use('/api/users', userRoute)
app.use('/api/listing', listingRoute)

app.get('/', (req, res) => {
    res.send("project started")
})

app.use(notFound);
app.use(errorHandler)

export default app;
