const express = require('express');
const app = express()
const path = require("path");
const fs = require("fs");
let welcomeHTML = fs.readFileSync("./client/welcome.html").toString();
var PORT = process.env.PORT || 7000;
app.use(express.json());
app.use(express.urlencoded({extended:false}));

function getPath(url){
    return path.join(__dirname,url);
}

//GET Method
app.get("/main.html",(req,res)=>{
    res.sendFile(getPath("./client/main.html"));
})
app.get("/style.css",(req,res)=>{
    res.sendFile(getPath("./client/style.css"));
})
app.get("/welcome.html",(req,res)=>{
    res.sendFile(getPath("./client/welcome.html"));
})
app.get("/favicon.ico",(req,res)=>{
    res.sendFile(getPath("./client/favicon.ico"));
})

app.post("/welcome.html",(req,res,next)=>{
    var name = req.body["name"];
    var email = req.body["email"];
    var address = req.body["address"];
    var number = req.body["number"];

    welcomeHTML= welcomeHTML.replace('{name}',name).replace('{number}',number).replace('{email}',email).replace('{address}',address);
    res.send( welcomeHTML);
});

app.listen(PORT,console.log("localhost:7000"));