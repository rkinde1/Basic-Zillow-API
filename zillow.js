var express = require('express');
var app = express();

var port = process.argv[2];
app.listen(port);
console.log("app is listening on port " + port);

app.get('/v1/zillow/zestimate', function(req, res){
    if (!req.query.sqft) {
        res.status(404).send("sqft is required");
    }
    else {
        var sqft = req.query.sqft;
    }

    if (!req.query.bed) {
        res.status(404).send("bed is required");
    }
    else {
        var bed = req.query.bed;
    }
    if (!req.query.bath) {
        res.status(404).send("bath is required");
    }
    else {
        var bath = req.query.bath;
    }

    var Zestimate = sqft * bed * bath *10;
    var result = {
        'zestimate' : Zestimate
    }
    res.status(200).send(result);
});

var data = [ 
    {price: 240000, city: 'baltimore' }, 
    {price: 300000, city: 'austin'},
    {price: 400000, city: 'austin'}, 
    {price: 1000000, city: 'seattle'}, 
    {price: 325000, city: 'baltimore'}, 
    {price: 550000, city: 'seattle'}, 
    {price: 250000, city: 'boston'} ]


app.get('/v1/zillow/houses', function(req, res) {
    var city;
    var array = [];
    var newArray = [];
    if (req.query.city) {
        city = req.query.city;
        array = data;
        for (var i = 0; i < array.length; i++) {
            if (array[i].city == city) {
                newArray.push(array[i]);
            }
        }
        res.status(200).send(newArray);
    }
    else {
        res.status(404).send(array);
    }

});

app.get('/v1/zillow/prices', function(req, res){
    var newArray = [];
    var usd;
    if (!req.query.usd) {
        res.status(404).send("404 Error: USD parameter is REQUIRED");
    }
    else {
        usd = req.query.usd;
        for (var i = 0; i < data.length; i++) {
            if (data[i].price <= usd ) {
                newArray.push(data[i]);
            }
        }
        res.status(200).send(newArray);
    }
});