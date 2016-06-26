var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');

app.use(bodyParser.json());  

app.post('/new', function (req, res) {
    var addItem = {
        "id": id++,
        "barcode": req.body.barcode,
        "price": req.body.price,
        "unit": req.body.unit
    };

    if (judgeType(addItem)) {

        fs.readFile('./app.json', 'UTF-8', function (err, data) {
            if (err) throw err;

            data = JSON.parse(data);
            data.splice(data.length, 0, addItem);
            
            fs.writeFile('./items.json', JSON.stringify(data));
        });

        res.json(addItem);

        res.status(201).end();
    }
    else {
        res.status(400).end();
    }
});

function judgeType(item) {
    if (typeof (item.barcode) === 'string' &&
        typeof (item.price) === 'number' &&
        typeof (item.unit) === 'string') {

        return true;
    }
}

module.exports = app;