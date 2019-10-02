// app.js
var Twitter = require('twitter');
var config = require('./config.js');

var T = new Twitter(config);

// Set search parameters
var params = {
    q: '#nodejs',
    count: 1,
    result_type: 'recent'
}


//get search request using params, if there is no then error return results, if error is produced then log it
T.get('search/tweets', params, function(err, data, response) {
    if (!err) {
        // Loop through the returned tweets
        for (let i = 0; i < data.statuses.length; i++) {
            // Get the tweet Id from the data returned
            let id = { id: data.statuses[i].id_str }
                // Try to favourite the selected tweet
            T.post('favorites/create', id, function(err, response) {
                // If the favourite failed, log the message
                if (err) {
                    console.log(err[0].message);
                }
                // if the favourite is a success, log the URL of the tweet
                else {
                    let username = response.user.screen_name;
                    let tweetId = response.id_str;
                    console.log('Favorited: ', `https://twitter.com/${username}/status/${tweetId}`)
                }
            });
        }
    } else {
        console.log(err);
    }
})