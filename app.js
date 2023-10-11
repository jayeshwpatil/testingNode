const express = require("express");
const app = express();
const axios = require("axios");
const bodyParser  = require("body-parser");
app.use(bodyParser.urlencoded({extended:true})); 
//console.log(parser);

app.get("/", (req, res)=>{
   res.sendFile(`${__dirname}/index.html`);
   
});

app.post("/", (req,res)=>{
   
   //console.log(`${req.body.cityname} - request`);
   const query = req.body.cityname;
   const apikey = "ca7ca0ce34047a2884cc32fbb9cc81b4";
   const unit = "metric";
   const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apikey}&units=${unit}`;
   const iconUrl = "https://openweathermap.org/img/wn/";   //03d@2x.png

   axios.get(apiUrl).then(response=>{
      //response = JSON.parse(response);
      console.log(response.data);
      console.log(` ${response.data.name}   - temparature is ${response.data.main.temp}  `);
      res.write(`<h1>todays temprature is ${response.data.main.temp} </h1>`);
      res.write(`<img src= ${iconUrl}${response.data.weather[0].icon}@2x.png >`)
      //res.write("<img src ="+iconUrl+response.data.weather[0].icon+"@2x.png border='1' >")
      res.send();
   })
   .catch(error=>{
      console.log(error);
   })
})








app.listen( process.env.PORT || 3000, ()=>{console.log("server start : port 3000")});