var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser=require('body-parser');

app.use(bodyParser.json());

app.get('/:id', function (req, res) {
    fs.readFile( __dirname + "/" + "app.json", 'utf8', function (err, data) {
        data = JSON.parse( data );
        var user = data[req.params.id];
        console.log( user );
        res.json(user);
    });
});

app.get('/',function (req,res) {

    fs.readFile("./app.json",'utf8',function (err,data) {
        if(err)
        {
            res.status(404).end();
        }
        else
        {
            data = JSON.parse(data);
            console.log(data);
            res.json(data);
        }
    });
});

module.exports=app;