var express = require('express');
var bodyParser = require('body-parser');

var Items = require('../models/auctionItem');

var itemsRouter = express.Router();
itemsRouter.use(bodyParser.json());

// group routes
itemsRouter.route('/')
    .get(function (req, res, next) { // gets list of all items registered in database
        Items.find({}, function (err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    })
    .post(function (req, res, next) { // adds new item to the database
        //console.log('ENTERED post request...', req.body);
        Items.create(req.body, function (err, resp) {
            if (err) throw err;
            var id = resp._id;
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            // var addedIDs = [], str1='';
            // if (resp.length > 1) {
            //     for (var iloop=0; iloop<resp.length; iloop++) addedIDs.push(resp[iloop]._id);
            //     str1 = addedIDs.join(", ");
            // }
            // else {
            //     addedIDs.push = resp._id;
            //     str1 = resp._id;
            // }
            //res.end('Auction database updated with new item(s). \n' + str1);
            console.log(typeof resp._id.toString(), resp._id.toString());
            res.end(resp._id.toString());
        })
    })

    .delete(function (req, res, next) { // deletes ALL items from auction database
        Items.remove({}, function (err, resp) {
            if (err) throw err;
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('All auction items removed from database.\nResponce result follows:\nok:'
                + resp.result.ok + ' n:' + resp.result.n);
        });
    });

// routes to manage individual items by id
itemsRouter.route('/:itemId')
    .get(function (req, res, next) {
        Items.findById(req.params.itemId, function (err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    })
    .put(function (req, res, next) {
        Items.findByIdAndUpdate(req.params.itemId, {$set: req.body}, {new: true}, function (err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    })
    .delete(function (req, res, next) {
        Items.findByIdAndRemove(req.params.itemId, function (err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });

itemsRouter.route('/addata/getimagefilenames')
    .get(function (req, res, next) {
        console.log('hererre...1');
        if (err) throw err;
        var fs = require('fs');
        console.log('hererre...2');
        var files = fs.readdirSync('/Users/Yuri/WebProjects/Auction01/app/images/items/');
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end(files);
    });

module.exports = itemsRouter;
