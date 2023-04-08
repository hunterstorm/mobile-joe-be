const http = require('http');
const express = require ('express')
const app = express();

app.get('/hello',(req,res)=>{
    res.send('welcome to my app!');
})

app.listen(3000,()=>{
    console.log('app listening');
})