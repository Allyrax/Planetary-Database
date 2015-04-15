// app/models/bear.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var TweetSchema   = new Schema({
	hashtag: String,
	sentence: String
});

module.exports = mongoose.model('Tweet', TweetSchema);