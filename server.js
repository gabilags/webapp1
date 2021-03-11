const express = require('express')
const app = express()
const weather = require('weather-js');

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('index');
  })

weather.find({search: 'San Francisco, CA', degreeType: 'F'}, function(err, result) {
    if(err) console.log(err);

    console.log(JSON.stringify(result, null, 2));
});
app.listen(3000)