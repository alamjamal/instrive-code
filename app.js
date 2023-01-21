const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
const {dbConnect, closeDB } =  require('./_helper/dbConn');
const { db } = require('./model/user.model');



app.use(cors())
app.use(bodyParser.json({extended:true}))
app.use(bodyParser.urlencoded({extended:true, limit:500}))


app.use('/user', require('./route/user.route'))

app.use((req, res, next) => {
  next(createError.NotFound())
})
  



const port=5000

app.listen(port, ()=>{
    console.log("connected server");
    dbConnect()
}).on('error', ()=>{
    console.log("error while connecting");
})

module.exports = app