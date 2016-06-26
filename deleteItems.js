var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.delete('/:id', function (req, res) {
    var id = parseInt(req.params.id);
    console.log(id);
    fs.readFile("./app.json", 'utf8', function (err, data) {
        if (err) throw err;

        data = JSON.parse(data);
        var sameItems = findSame(data, JSON.parse(id));
        if (sameItems === null) {
            res.status(404).end();
        }
        else {
            data.splice(sameItems, 1);
            fs.writeFile('./app.json', JSON.stringify(data));
            res.status(204).end();
        }
    });
});

function findSame(data, id) {
    for (var i = 0; i < data.length; i++) {
        if (data[i].id === id) {

            return i;
        }
    }
    return null;
}

module.exports = app;
