// const express = require('express');
import express from 'express';
import { connectDB } from './config/db.js';


const app = express();

app.get("/products",(req,res)=>{
    res.send("hi there server is up!");
})

app.listen(3000,()=>{
    connectDB();
    console.log("server started at port http://localhost:3000 hello");
});

