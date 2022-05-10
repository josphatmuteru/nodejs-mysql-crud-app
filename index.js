import express from 'express'
import mysql from 'mysql'
const app = express()
const port = 5000
app.use(express.urlencoded({extended: true}))
app.use(express.json())
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
app.post('/create-user', (req, res)=>{
    console.log(req.body)
    const { id, username, password, email}= req.body
    let sql =`insert into userinfo(username,email, password) values('${username}','${email}', '${password}')`
    dbConnection.query(sql,(err,result)=>{
        if(!result){
           res.send(err)
        }else {
            res.json({
                data:result
            })
        }
    })
})
//update
app.put('/update', (req, res)=>{
    console.log(req.body)
    const {id, username, password, email} = req.body
    let sql = `update userinfo set username = '${username}' , password = '${password}' , email = '${email}' where id = ${id} `

    dbConnection.query(sql, (err, result)=>{
        if(!result){
            res.send(err)
        }else{
            res.json({
                data:result
            })
        }
    })
})

//delete
app.delete('/delete', (req, res)=>{
    console.log(req.body)
    const {id}=  {body}
    let sql = `delete  from userinfo where id = ${id} `

    dbConnection.query(sql, (err, result)=>{
        if(!result){
            res.send(err)
        }else{
            res.json({
                data:result
            })
        }
    })
})





app.listen(port, console.log(`server is running on port ${port}`))

