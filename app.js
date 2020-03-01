var path = require('path');
var express = require('express');
var app = express();
const exphbs = require('express-handlebars');
const request = require('request');
var bodyParser = require('body-Parser');
// Register Handlebars view engine
app.set('views',path.join(__dirname,"views"));
app.set("view engine","hbs");
app.enable('view cache');


//setting the bodyParser
app.use(bodyParser.urlencoded({ extended: false }));

//views
app.get('/',(req,res)=>{
    res.render('index');
});



app.post('/',(req,res)=>{
var weather = require('openweather-apis');

//set the weather api lang to the english
weather.setLang('en');
//Setu the api key to laod data
var ownKey = "e7e8f6d4af62f966dd497dc7538614f9";
weather.setAPPID(ownKey);
//require the city from the form
var city = req.body.city;

//set the city for search
  weather.setCity(city);


//variables to hold weather valures
  var current_temp,current_desc;
  //method to get curret temperature
  weather.getTemperature(function(err, temp){
    current_temp = temp;
        console.log(temp);
    });
  //method to get curret city description
weather.getDescription(function(err, desc){
        current_desc = desc
        console.log(desc);
    });


// get all the JSON file returned from server (rich of info)
    weather.getAllWeather(function(err, JSONObj){
        console.log(JSONObj);
    });


//object to hold all the data and then push it to the hbs

          var weather = {
            'current_temp':current_temp
          }
          //render the data to the index
          res.render('index',{
              weather:weather
          });
        });

   



var port = 3000;
app.listen(port,()=>{
    console.log(`Server is running...${port}`);
});
