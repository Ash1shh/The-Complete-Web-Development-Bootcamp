const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res){
  const query = req.body.cityName;
  const apiKey = "e207492a28d932fce09ac198647fedb6";
  // const unit = "metric";
  const url = "https://samples.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey;
  https.get(url, function(response){
    console.log(response.statusCode);
    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      // const object = {
      //   name: "Angela",
      //   favouritedFodd: "Ramen"
      // }
      // // console.log(whetherData);
      // console.log(JSON.stringify(object));
      const icon = weatherData.weather[0].icon;
      const temp = weatherData.main.temp;
      const WeatherDescription = weatherData.weather[0].description;
      const imageURL = "http://openweathermap.org/img/wn/"+ icon + "@2x.png";
      res.write("<p>The Weather is currently " + WeatherDescription + "<p>");
      res.write("<h1>The temperature in " + query + " is " + temp + "degrees Celcuis.</h1>");
      res.write("<img src=" + imageURL + ">");
      res.send();
    })
  })
})


app.listen(3000, function(){
  console.log("Server is running on port 3000.")
})
