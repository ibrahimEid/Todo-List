const express = require("express")
const app = express()

const db = require('./db')
const Todo = require('./todo')
// console.log(Todo)

app.get("/", (req,res)=>{
    res.json('Get / is working')
})

app.get("/todos", (req,res)=>{
    res.json('Get / is working')
})

app.listen(5000,()=>{
    console.log("app is listen to port 5000")
})