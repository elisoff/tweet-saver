const TwitterAPI = require('./twitterapi');
const Twitter = require('twitter-lite');

jest.mock('twitter-lite', () => {
    const searchResponse = require('../__mock__/mockSearch.json');
    return class Twitter {
        get() {
            return new Promise((resolve, reject) => {
                resolve(searchResponse);
            });
        }
    };
});

describe('TweetAPI', () => {
    function initTwitterAPI(twitterClient) {
        return TwitterAPI(twitterClient);
    }

    test('throws an error if no credentials are sent', () => {
        const errorRegex = /^twitter client is required/i;

        expect(initTwitterAPI).toThrow(errorRegex);
        expect(initTwitterAPI.bind({})).toThrow(errorRegex);
    });

    test('returns an object with the available methods', () => {
        const twitter = new Twitter({
            bearer_token: '',
        });
        const twitterAPI = initTwitterAPI(twitter);

        expect(twitterAPI.getSearchTweets).not.toBeUndefined();
    });

    test('getSearchTweets returns a list of tweets when `q` parameter is specified', async () => {
        const twitter = new Twitter({
            bearer_token: '',
        });

        const { getSearchTweets } = initTwitterAPI(twitter);

        const result = await getSearchTweets('test');

        expect(result.statuses.length).toBeGreaterThan(0);
    });

    test('getSearchTweets throws an error when `q` parameter is missing', async () => {
        const twitter = new Twitter({
            bearer_token: '',
        });

        const { getSearchTweets } = initTwitterAPI(twitter);
        const errorRegex = /^q parameter is required/i;

        expect(await getSearchTweets).toThrow(errorRegex);
    });
});
