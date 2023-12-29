import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import userRoute from "./routes/userRoute.js"
import listingRoute from "./routes/listingRoute.js"
import cookieParser from 'cookie-parser';
import path from 'path'

const port = process.env.PORT || 5000

const app = express();
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

dotenv.config()
connectDB()

app.use('/api/users', userRoute)
app.use('/api/listing', listingRoute)

//serve the frontend
if(process.env.NODE_ENV === 'production') {
    //set build folder as static
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => res.sendFile(__dirname, '../', 'frontend', 'build', 'index.html'))
} else {
    app.get('/', (req, res) => {
        res.status(200).json({ message: "Welcome to realtor" })
    })
}

app.use(notFound);
app.use(errorHandler)

app.listen(port, () => console.log(`app is listening on port ${port}`));