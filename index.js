import express from 'express'
import mysql from 'mysql'
const app = express()
const port = 5000

const dbConnection = mysql.createConnection({
    user: "root",
    database: 'users',
    password: "",
    host: 'localhost',

    
})

dbConnection.connect(error=>{
    if(error) {
        console.log(error)
    }
    console.log('db connected')
})
app.get('/test', (req, res)=>{
    res.send('app is working')
})
//get users
app.get('/', (req, res)=>{
    let sql ='select * from userinfo'

    dbConnection.query(sql, (error, result)=>{
        if(!result){
            res.json({
                message:'no data'
            })
        }else {
            res.json({
                data:result
            })
        }
    })
})


//create

//update
//delete
app.listen(port, console.log(`server is running on port ${port}`))

