var keys = require('./keys.js');
var request = require('request');
var twitter = require('twitter');
var spotify = require('spotify');
var fs = require('fs');

var client = new twitter(keys.twitterKeys)

var params = {screen_name: 'hkdmjack'};
client.get('statuses/user_timeline', params, function(error, tweets, response ){
    if (!error) {
        console.log(tweets);
    }
});