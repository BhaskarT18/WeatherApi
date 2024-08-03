const express= require("express");
const https=require("https");
const bodyPaser=require("body-parser")
const dotenv=require("dotenv");
dotenv.config();
const app=express();


app.use(bodyPaser.urlencoded({extended:true}));


app.get("/",function(req,res){
 res.sendFile(__dirname+ "/index.html");
});

app.post("/", function(req ,res){

 const query= req.body.cityName;
const uniKey="process.env.WEATHER_KEY";
const unit="metric";

const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+uniKey+"&units="+unit;
https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
       const weatherData= JSON.parse(data);
       const temp =weatherData.main.temp;
       const weatherDecrip= weatherData.weather[0].description;
       const icon= weatherData.weather[0].icon; 
       const imgUrl="https://openweathermap.org/img/wn/"+icon+"@2x.png"
       res.write("<p>The current description is   "  +weatherDecrip+"  </p>");
       res.write("<h1>The current temprature in "+query + "    is "  +  temp +"  degree celcius </h1>")
       res.write("<img src="+ imgUrl+ ">");
       res.send();

    });

});
   

})



 
app.listen(process.env.PORT,function(){
    console.log("The server is running ");
});