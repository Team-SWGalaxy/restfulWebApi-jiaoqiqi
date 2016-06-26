var express = require('express');
var app = express();
var fs = require('fs');

global.id = 1;

var addItems = require('./addItems');
var readItems = require('./readItems');
var deleteItems = require('./deleteItems');
var updateItems = require('./updateItems');

fs.exists('./app.json', function (exists) {
    if (!exists) {
        if (!fs.createWriteStream('app.json', {encoding: "utf8"})) {
            console.log('error error');
        }

        fs.writeFile('./app.json', JSON.stringify([]));
    }
});

app.use('/data', addItems);
app.use('/data', readItems);
app.use('/data', deleteItems);
app.use('/data', updateItems);

var server = app.listen(8080, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

});

module.exports = app;

