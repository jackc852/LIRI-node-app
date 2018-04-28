var keys = require('./keys.js');
var request = require('request');
var twitter = require('twitter');
var Spotify = require('node-spotify-api');
// var spotify = require('spotify');
var fs = require('fs');

var getTweets = function() {
    var client = new twitter(keys.twitterKeys)
    
    var params = {screen_name: 'hkdmjack'};
    client.get('statuses/user_timeline', params, function(error, tweets, response ){
        if (!error) {
            // console.log(tweets);
            for(var i=0; i<tweets.length; i++) {
                console.log(tweets[i].created_at);
                console.log(' ');
                console.log(tweets[i].test);
            }
        }
    });
    
}

var getArtist = function(artist) {
    return artist.name;
}

var getSpotify = function(songName) {   
    
    var spotify = new Spotify(keys.spotifyKeys);
    
    spotify.search({ type: 'track', query: 'songName' }, function(err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }
        
        var songs = data.tracks.items;
		for (var i = 0; i < songs.length; i++) {
            console.log(i);
            console.log('artist(s) ' + songs[i].artists.map(getArtistNames));
            console.log('song name: ' + songs[i].name);
            console.log('preview song: ' + songs[i].preview_url);
            console.log('album: ' + songs[i].album.name);
        }
    });
}

var getMovie = function(movieName) {
    
    request('http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&apikey=trilogy', function (error, response, body) {
    if(!error && response.statusCode == 200) {
        
        var jsonData = JSON.parse(body);
        
        console.log('Title: ' +jsonData.Title);
        console.log('Year: ' +jsonData.Year);
        console.log('Rated: ' + jsonData.Rated);
        console.log('IMDB Rating: ' +jsonData.imdbRating);
        console.log('Country: ' + jsonData.Country);
        console.log('Language: ' + jsonData.Language);
        console.log('Plot: ' + jsonData.Plot);
        console.log('Actors: ' + jsonData.Actors);
        console.log('Rotten Tomatoes rating: ' + jsonData.tomatoRating);
        console.log('Rotten Tomatoes URL ' + jsonData.tomatoURL);
    }
});
}

/* var doWhatItSays = function() {
    
    fs.readFile('random.txt', 'utf8', function (err, data) {
        if (err) throw err;
        
        var dataArr = data.split(',');
        
        if (dataArr.length == 2) {
            pick(dataArr[0], dataArr[1]);
        } else if (dataArr.length == 1) {
            pick(dataArr[0]);
        }
    });
} */

var choice = function(caseData, functionData) {
    switch(caseData) {
        case 'my-tweets' :
        getTweets();
        break;
        case 'spotify-this-song':
        getSpotify(functionData);
        break;
        case 'movie-this':
        getMovie(functionData);
        //case 'do-what-it-says':
        // doWhatItSays();
        break;
        default:
        console.log('LIRI cannot do that');
    }
}

var runTHis = function(argOne, argTwo) {
    choice(argOne, argTwo);
};

runTHis(process.argv[2], process.argv[3]);

