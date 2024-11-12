// const express = require('express');
import express from 'express';
import { connectDB } from './config/db.js';
import productRoutes from './routes/productRoute.js'


const app = express();

app.use(express.json());

app.use("/api/products", productRoutes);


app.listen(3000,()=>{
    connectDB();
    console.log("server started at port http://localhost:3000 hello");
});

