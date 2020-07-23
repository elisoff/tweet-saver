import React from 'react';
import PropTypes from 'prop-types';

import Tweet from './Tweet';
import { TWEETS_PROPTYPE } from '../constants';
import { useAppState } from '../useAppState';

import './tweetList.scss';

export default function TweetList({
    tweets,
    onRemoveTweet,
    isRemoveButtonEnabled,
}) {
    const { savedTweetsIds } = useAppState();

    const isTweetAlreadySaved = (tweetId) => {
        return savedTweetsIds.includes(tweetId);
    };

    return (
        <div className="tweet-list" data-testid="tweetList">
            {tweets.length > 0 ? (
                tweets.map((tweet) => {
                    return (
                        <Tweet
                            value={tweet}
                            key={tweet.id}
                            isDraggable={!isTweetAlreadySaved(tweet.id)}
                            onRemoveTweet={onRemoveTweet}
                            isSavedTweet={isRemoveButtonEnabled}
                        />
                    );
                })
            ) : (
                <div className="section has-text-centered">
                    Nothing to see here...
                </div>
            )}
        </div>
    );
}

TweetList.defaultProps = {
    isRemoveButtonEnabled: false,
};

TweetList.propTypes = {
    tweets: TWEETS_PROPTYPE.isRequired,
    onRemoveTweet: PropTypes.func,
    isRemoveButtonEnabled: PropTypes.bool,
};
