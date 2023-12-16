import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import userRoute from "./routes/userRoute.js"
import listingRoute from "./routes/listingRoute.js"
import cookieParser from 'cookie-parser';
import path from 'path';

const port = process.env.PORT || 5000

const app = express();
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

dotenv.config()
connectDB()

const __dirname = path.resolve();

app.use('/api/users', userRoute)
app.use('/api/listing', listingRoute)

// app.use(express.static(path.join(__dirname, '/frontend/build')))

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, "frontend", 'build', 'index.html'))
// })

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '/frontend/build')))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, "frontend", 'build', 'index.html'))
    })
}

app.use(notFound);
app.use(errorHandler)

app.listen(port, () => console.log(`app is listening on port ${port}`));