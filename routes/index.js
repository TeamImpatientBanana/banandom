var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User');


/* GET home page. */
router.get('/', function(req, res) {
	var usersFromDatabase;
	User.find(function (err, users) {
		usersFromDatabase = users;
		res.render('index', {
			title: 'Banandom',
			users: usersFromDatabase
		});
	});
});

router.post('/addscore', function(req, res) {
	var reqUserName = req.body.userName;
	var reqSeedWord = req.body.seedWord;

	var insertUser = new User({
    	userName: reqUserName,
		score: reqSeedWord
    });

	insertUser.save(insertUser);

	res.redirect('/scoreboard');
});

module.exports = router;