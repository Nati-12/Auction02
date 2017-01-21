var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var imageFilenamesRouter = express.Router();
imageFilenamesRouter.use(bodyParser.json());

var files = fs.readdirSync('../app/images/items/');

var fiesListObject = array2object(files);
imageFilenamesRouter.route('/')
    .get(function (req, res, next) {
       // if (err) throw err;
        res.json(fiesListObject);
    });

module.exports = imageFilenamesRouter;



function array2object(arr) {
    var result = {};
    for (var iloop = 0; iloop < arr.length; ++iloop)
        result[iloop] = arr[iloop];
    return result;
}