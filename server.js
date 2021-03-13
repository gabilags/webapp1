const express = require('express')
const app = express()
const weather = require('weather-js');


app.set('view engine', 'ejs');

app.use(express.static('css'));

app.get('/', function (req, res) {
        weather.find({search: 'Davao, PH', degreeType: 'C'}, function(err, result) {
        if(err) {
          console.log(err)
          res.render('index', {weather: 'Nothing'})
        }
        else{
          res.render('index', {weather: (result)})
        };

    });
})

app.get('/other', function (req, res) {
  res.render('other');
})

app.listen(3000)