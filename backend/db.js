const mongoose = require("mongoose")
const dbURI = 'mongodb://localhost:27017/TodoListV01'

mongoose.connect(dbURI)


// Extra

const db = mongoose.connection

db.on('error',(err)=>{
    console.log('ERROR in mongoDB ..')
})

db.on('connected',()=>{
    console.log('mongoDB is CONNECTED ..')
})

