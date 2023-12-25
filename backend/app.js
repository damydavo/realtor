import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import userRoute from "./routes/userRoute.js"
import listingRoute from "./routes/listingRoute.js"
import cookieParser from 'cookie-parser';
import cors from 'cors'

const port = process.env.PORT || 5000

app.use(cors(
    {
        origin: ["https://localhost:5000"],
        method: ["POST", "GET"],
        credentials: true
    }
))

const app = express();
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



dotenv.config()
connectDB()

app.use('/api/users', userRoute)
app.use('/api/listing', listingRoute)

app.get('/', (req, res) => {
    res.json("Hello")
})

app.use(notFound);
app.use(errorHandler)

app.listen(port, () => console.log(`app is listening on port ${port}`));