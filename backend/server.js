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
// filter to completed or not completed

app.get("/filter",(req,res)=>{
    Todo.find({ isCompleted:req.query.isCompleted }, (err, data)=> {
        if(err){
            console.log(`Error: ${err}`)
        }else{
            res.send(data)
        }  
      })
})

app.post("/todos/",(req,res)=>{
    // console.log(req.body)
    Todo.create(req.body, (err, newTask)=>{
        if(err){
            console.log(`Error: ${err}`)  
        }else{
          res.status(201).json(newTask)  
        }
    })
})

app.put("/todos/:id", (req,res)=>{
    Todo.updateOne(
        {_id: req.params.id},
        {title:req.body.title},
        (err,updateObj)=>{
            if(err){
                console.log(`Error: ${err}`)
                res.status(400).json(err)
            }else{
                console.log(updateObj)
                updateObj.matchedCount === 1
                ?res.json('update this todo')
                :res.status(404).json("This todo is not found")
            }
        }
    )
})
// Edit to status of completed
app.put('status')

app.delete("/todos/:id", (req,res)=>{
    Todo.deleteOne({_id:req.params.id},(err, deleteObj)=>{
        if(err){
            console.log(`Error: ${err}`)
        }else{
            deleteObj.deletedCount === 1
            ?res.json('Delete this todo')
            :res.status(404).json("This todo is not found")
        }
    })
})
// delete all incomplete tasks
app.delete("/delete_complete",(req,res)=>{
    Todo.deleteMany({Completed:true},(err, deleteObj)=>
    {
        if(err){
            console.log(`Error: ${err}`)
        }else{
            deleteObj.deletedCount === 0
            ?res.status(400).json('no completed tasks')
            :res.status(200).json("deleted complete tasks")
        }
    })
})

app.listen(5000,()=>{
    console.log("app is listen to port 5000")
})