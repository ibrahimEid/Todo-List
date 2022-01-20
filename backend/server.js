const express = require("express")
const app = express()

const db = require('./db')
const Todo = require('./todo')
// console.log(Todo)
app.use(express.json())
app.get("/", (req,res)=>{
    res.json('Get / is working')
})

app.get("/todos", (req,res)=>{
    Todo.find({}, (err, data)=> {
        if(err){
            console.log(`Error: ${err}`)
        }else{
            res.send(data)
        }  
      })
})

app.post("/todos",(req,res)=>{
    // console.log(req.body)
    Todo.create(req.body, (err, newTask)=>{
        if(err){
            console.log(`Error: ${err}`)  
        }else{
          res.status(201).json(newTask)  
        }
    })
})

app.listen(5000,()=>{
    console.log("app is listen to port 5000")
})