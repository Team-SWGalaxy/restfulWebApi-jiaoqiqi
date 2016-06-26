var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.put('/:id', function (req, res) {
    var id = req.params.id;

    fs.readFile('./app.json', 'utf8', function (err, data) {
        if (err) throw err;

        data = JSON.parse(data);
        var sameItems = findSame(data, JSON.parse(id));

        if (sameItems === null) {
            res.status(404).end();
        }
        else {
            var item = {
                "id": req.body.id,
                "barcode": req.body.barcode,
                "price": req.body.price,
                "unit": req.body.unit
            }
        }

        if (judgeType(item)) {
            data[sameItems] = updated(data[sameItems], item);
            fs.writeFile('./app.json', JSON.stringify(data));
            res.json(data[sameItems]);
            res.status(200).end();
        }
        else {
            res.status(400).end();
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

function judgeType(item) {
    if (
        typeof (item.barcode) === 'string' &&
        typeof (item.price) === 'number' &&
        typeof (item.unit) === 'string') {

        return true;
    }
}

function updated(data, item) {
    data.barcode = item.barcode;
    data.price = item.price;
    data.unit = item.unit;

    return data;
}

module.exports = app;