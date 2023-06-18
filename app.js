const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/" , function(req , res){

    res.sendFile(__dirname + "/signup.html");

});

app.post("/" , function(req , res){

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const emailId = req.body.emailId;

    const data = {
        members : [
            {
                email_address : emailId,
                status : "subscribed",
                merge_fields:{
                    FNAME : firstName,
                    LNAME : lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/687d6aeb5e"; 

    const options = {
        method : "POST",
        auth : "tarun:ade0cfd6312d1b90f4c9e9d1849bdbdfb-us21"
    }

    const request = https.request(url,options, function(response){

        if(response.statusCode === 200){

            res.sendFile(__dirname + "/success.html");
            
        }else{

            res.sendFile(__dirname + "/failure.html");
            
        }

        response.on("data" , function(data){
            console.log(JSON.parse(data));
        })
    });

    request.write(jsonData);

    // request.send("sended the data thanks");
    request.end();

});

app.post("/failure",function(req , res){
    // res.sendFile(__dirname + "/signup.html");   // or we can perform the given below one
    res.redirect("/")
});

app.listen(process.env.PORT || 3000,function(){
    console.log("server is running on port 3000.");
});



// API Key
// de0cfd6312d1b90f4c9e9d1849bdbdfb-us21

// audience id
// 687d6aeb5e