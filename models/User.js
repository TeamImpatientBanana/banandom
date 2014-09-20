var express = require('express');
var mongoose = require('mongoose');

// Mongoose Schema definition
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    userName: String,
    score: String,
    //twitterUrl: String
    //date
    //twitterpicture
    //facebook
});

module.exports = mongoose.model('User', UserSchema);