const http = require("http");
const fs = require("fs");

let mainHTML= fs.readFileSync("./client/main.html").toString();
let welcomeHTML = fs.readFileSync("./client/welcome.html").toString();
let styleCSS = fs.readFileSync("./client/style.css").toString();
let fIcon = fs.readFileSync("./client/favicon.ico");
//console.log(mainHTML);

let name
let address
let number
let email

var user = {
    name,
    address,
    number,
    email
}
http.createServer((req,res)=>{
    //#region GET
    if(req.method == "GET"){
        console.log("req ",req.url)
            switch(req.url){
                case "/main.html":
                    res.setHeader("Access-Control-Allow-Origin","*");
                    res.write(mainHTML);
                break;
                case "/welcom.html":
                    console.log("here")
                    //res.setHeader("Access-Control-Allow-Origin","*");
                    res.write(welcomeHTML);
                break;
                case "/style.css":
                    res.writeHead(200,"Ok",{"content-type":"text/css"})
                    res.write(styleCSS)
                break;
                case "/favicon.ico":
                    res.writeHead(200,"ok",{"content-type":"image/vnd.microsoft.icon"})
                    res.write(fIcon)
                break;
                case "/clients.json":
                    console.log("request is here ")
                    res.writeHead(200,"Ok",{"content-type":"application/json"})
                    res.write(JSONFile)
                    break;
                default:
                    res.write("<h1>No Page Found</h1>")
                break;
            }
            res.end();
    }
    // //#endregion
    // //#region POST
    else if(req.method == "POST"){//url
            console.log(req.url)
            req.on("data",(data)=>{
                let values =[];
                let dataString = data.toString().split("&")
                dataString.forEach(element => {
                   let pairs= element.split("=")
                   values.push(pairs[1])
                });
                user.name = decodeURIComponent(values[0].replaceAll("+", " "))
                user.email = decodeURIComponent(values[1])
                user.address = decodeURIComponent(values[2].replaceAll("+", " "))
                user.number = values[3]
                console.log(user);
            })
            req.on("end",()=>{
                console.log("on end here ")
                welcomeHTML = welcomeHTML.replace("{name}",user.name)
                welcomeHTML = welcomeHTML.replace("{address}",user.address)
                welcomeHTML = welcomeHTML.replace("{email}",user.email)
                welcomeHTML = welcomeHTML.replace("{number}",user.number)
                 res.write(welcomeHTML);
                res.end();
            })
}}) .listen("7000",
() => {
    console.log("Lisining on Port 7000")
}
)