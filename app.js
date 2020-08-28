var path = require('path');
var express = require('express');
var app = express();
const exphbs = require('express-handlebars');
const request = require('request');
var bodyParser = require('body-Parser');
// Register Handlebars view engine
app.engine('.hbs', exphbs({extname: '.hbs',defaultLayout:'main',layoutDir:'./views/layouts'}));
app.set('view engine', '.hbs');
app.enable('view cache');

//public path to read public files
app.use(express.static('public'));
//setting the bodyParser
app.use(bodyParser.urlencoded({ extended: false }));

//views
app.get('/',(req,res)=>{
    res.render('index');
});


//vars to hold values
var current_temp;
var current_desc;
var data;
var full_data;
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



  //method to get curret temperature
  weather.getTemperature(function(err, temp){
    current_temp = temp;
    });
  //method to get curret city description
weather.getDescription(function(err, desc){
       current_desc = desc;
   });
//get all the JSON file returned from server (rich of info)
    weather.getAllWeather(function(err, JSONObj){
       full_data = JSONObj;
        
    });
data = {
  full_data,
  current_desc
};
console.log(data);
res.render('index',{
  dat:data
});



        });

   



app.listen(process.env.PORT || 3000);