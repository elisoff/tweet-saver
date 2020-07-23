const Twitter = require('twitter-lite');

function TwitterAPI(twitterClient) {
    if (!(twitterClient instanceof Twitter)) {
        throw new Error('Twitter client is required to access the API');
    }

    return {
        getSearchTweets(q, count = 10) {
            if (!q) {
                throw new Error('q parameter is required to perform search');
            }

            try {
                return twitterClient.get('/search/tweets', { q, count });
            } catch (error) {
                throw error;
            }
        },
    };
}

module.exports = TwitterAPI;
