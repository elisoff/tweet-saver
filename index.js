const express = require('express');
const app = express();
const path = require('path');

const port = process.env.PORT || 5000;

const Twitter = require('twitter-lite');
const TwitterAPI = require('./server/twitterapi');

app.use(express.json());

let twitterClient = null;

app.get('/api/tweets', async (req, res) => {
    const { q } = req.query;

    if (!q) {
        res.status(400).send(formatErrorMessage('Missing q parameter'));
    }

    try {
        const { getSearchTweets } = TwitterAPI(twitterClient);
        const tweets = await getSearchTweets(q);

        res.status(200).send(tweets);
    } catch (error) {
        console.error(error);
        res.status(500).send(
            formatErrorMessage(
                'Something wrong happened while making the request'
            )
        );
    }
});

app.use(function (req, res, next) {
    res.status(404).send(formatErrorMessage('Not found.'));
});

app.listen(port, () => {
    twitterClient = new Twitter({
        bearer_token: process.env.BEARER_TOKEN,
    });

    console.log(`App listening at http://localhost:${port}`);
});

function formatErrorMessage(message) {
    return {
        message,
    };
}
