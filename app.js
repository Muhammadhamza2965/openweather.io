var path = require('path');
var express = require('express');
var app = express();
const exphbs = require('express-handlebars');
const request = require('request');
var bodyParser = require('body-Parser');
app.enable('view cache');

// Register Handlebars view engine
app.set('views',path.join(__dirname,"views"));
app.set("view engine","hbs");


//setting the bodyParser
app.use(bodyParser.urlencoded({ extended: false }));

//views
app.get('/',(req,res)=>{
    res.render('index');
});



app.post('/',(req,res)=>{
    //Setu the api key to laod data
let apiKey = '268781312897442505ba1ea738924c77';
let city = req.body.form;
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    request(url, function (err, response, body) {
        if(err){
          res.redirect('index');
        }
         else {
          
          let weather = JSON.parse(body);
          let message = `It's ${weather.main.temp} degrees in
          ${weather.name} Region ${weather.sys.country}
          Humidity ${weather.main.humidity}
          ` ;
          res.render('index',{
              weather:weather
          });
        }
      });
  })

   




app.listen(3000,()=>{
    console.log('Server is running...');
});