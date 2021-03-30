const express = require('express')
const fetch = require("node-fetch");
const mongoose = require('mongoose');
const request = require('request');
const Person = require('./models/person');

let datetime = "";

const app = express()

const dbURI = 'mongodb+srv://jerwjegabilagon:pass1234@nodesa2021.nwaoc.mongodb.net/node-sa2021?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));


app.set('view engine', 'ejs');

app.use(express.static('css'));
app.use(express.static('assets'));
app.use(express.urlencoded({extended: true}));
   
app.get('/', function (req, res) {
    res.render('landing');
})

//api call using Promise.all from node-fetch package
Promise.all([
    fetch('http://worldtimeapi.org/api/timezone/Asia/Manila'),
    fetch('http://worldtimeapi.org/api/timezone/Europe/Moscow'),
    fetch('http://worldtimeapi.org/api/timezone/Asia/Tokyo'),
    fetch('http://worldtimeapi.org/api/timezone/America/Detroit'),
    fetch('http://worldtimeapi.org/api/timezone/Asia/Seoul')
]).then(function (responses) {
    return Promise.all(responses.map(function (response) {
        return response.json();
    }));
}).then(function (data) {
    datetime = data;
}).catch(function (error) {
    console.log(error);
});


app.get('/personlist', function (req, res) {
    Person.find().sort({createdAt: -1})
        .then((result) => {
            res.render('personlist', {dataList: datetime, persons: result});
        })
        .catch((err) => {
            console.log(err);
        });
})

app.post('/personlist', function (req, res) {
    const person = new Person(req.body);

    person.save()
        .then((result) => {
            res.redirect('/personlist');
        })
        .catch((err) => {
            console.log(err);
        })
})


app.get('/personnew', function(req, res){
    res.render('personnew');
})
app.get('/personview', function(req, res){
    res.render('personview');
})

app.get('/personlist/:id', (req, res) => {
    const id = req.params.id;
    Person.findById(id)
        .then(result => {
            res.render('personview', { details: result });
        })
        .catch((err) => {
            console.log(err);
        })
})



