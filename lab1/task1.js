const http = require("http");
const fs = require("fs");
const { json } = require("stream/consumers");

http.createServer((req,res)=>{
    if(req.url != "/favicon.ico"){
        let operation = req.url.split("/")
        operation.shift()
        let operator= operation[0];
        //console.log(operator);
        let numbers= operation.splice(1)
        //console.log("numbers",numbers);
        numbers = numbers.map((strnumb)=>parseInt(strnumb));
        let result=0;
        switch(operator){
            case "add":
                result=0;
                for(let i = 0; i < numbers.length; i++){
                    result += numbers[i];
                }
                res.write(`<h1>${numbers.join(" + ")} = ${result}</h1>`);
                break;

                case "sub":
                    result=0;
                    for(let i = 0; i < numbers.length; i++){
                        result = numbers[i]-result;
                    }
                    res.write(`<h1>${numbers.join(" - ")} = ${result}</h1>`);
                    break;
                
                case "mul":
                    result = 1;
                    for(let i = 0; i < numbers.length; i++){
                        result *= numbers[i];
                    }
                   
                    res.write(`<h1>${numbers.join(" * ")} = ${result}</h1>`);
                    break; 
                    
                case "div":
                    result= numbers[0];
                    if(result!=0){
                        for(let i = 1; i < numbers.length; i++){
                            result /= numbers[i];
                        }
                        res.write(`<h1>${numbers.join(" / ")} = ${result}</h1>`);
                        break;
                    }else{
                        res.write("can't divide over Zero");
                        break;
                    }

                default:
                    res.write("invalid operation");
                    break;
        }
        fs.appendFileSync("result.txt",`The Result Of ${operator} ${numbers} equal ${result}\n`);
    }

    res.end();
})
.listen("7000",()=>{
    console.log("Listening on port 7000...")
})