const app = require('./app')
const port=5000



app.listen(port, ()=>{
    console.log("connected server");
}).on('error', ()=>{
    console.log("error while connecting");
})
