var express = require('express');
var router = express.Router();
var User = require('../models/User');
var mongoose = require('mongoose');

/* GET users listing. */
router.get('/:userString', function (req, res) {
	var userParam = req.params.userString;
    User.find({userName: userParam}, function (err, docs) {
        res.json(docs);
    });
});

module.exports = router;