const { response } = require("express");
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    const query = req.body.cityName;
    const apiKey = "8da95e93d8f38ffdddf225aebbb5fad2";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
    
    https.get(url, function(response){
        console.log(response.statusCode);
    
        response.on("data", function(data){
            console.log("Well done Ali!");
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescr = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h1>Weather API</h1>");
            res.write("<p>The weather is currently <strong>" + weatherDescr + "</strong></p>");
            res.write("<p>" + query + " Temp is <strong>" + temp + "</strong></p>");
            res.write("<img src=" + imageUrl + ">");
            res.write("<a href='javascript:history.back()'>Go Back</a>");
            res.send();
        });
    });
});



app.listen(39, function(){
    console.log("Servier 39 is Active...")
});