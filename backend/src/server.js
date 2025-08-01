import express from 'express';
// const express = require('express');
import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from './config/db.js';
import dotenv from "dotenv"; // to use env variables
import rateLimiter from "./middleware/rateLimiter.js"
import cors from "cors"
import path, { join } from "path"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve() // for combining backend and frontend

if(process.env.NODE_ENV !== "production"){ // cors used only if 2 diff domains for front and backend i.e during dev
    app.use(cors({ // for cors error
        origin:"http://localhost:5173",
    }));
}
// middleware
app.use(express.json()); // this middleware will parse json bodies : req.body
app.use(rateLimiter);

// our simple custom middleware
// app.use((req, res, next) => {
//     console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
//     next();
// });

app.use("/api/notes", notesRoutes);

if(process.env.NODE_ENV === "production"){ // do only if in render (deployed)
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    })
}

// app.use("/api/product", productRoutes); // can create another routes in future
// app.use("/api/post", postRoutes);
// app.use("/api/payment", paymentRoutes);
// app.use("/api/emails", emailsRoutes);


// // a route or endpoint
// app.get('/api/notes', (req, res) => {
//     res.status(200).send('You got 10 Notes.')
// });
// // send creates a html response

// app.post('/api/notes', (req, res) => {
//     res.status(201).json('Note Created')
// });
// // json response

// app.put('/api/notes/:id', (req, res) => {
//     res.status(200).send('Note Updated')
// });

// app.delete('/api/notes/:id', (req, res) => {
//     res.status(200).json('Note Deleted')
// });

connectDB().then(() => {
    app.listen(5000, () => {
        console.log('Server is running on port 5000')
    })
});

