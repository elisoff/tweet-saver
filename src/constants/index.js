import PropTypes from 'prop-types';

const TWITTER_USER_PROPTYPE_SHAPE = PropTypes.shape({
    id: PropTypes.number,
    id_str: PropTypes.string,
    name: PropTypes.string,
    screen_name: PropTypes.string,
    profile_image_url_https: PropTypes.string,
});

export const TWEET_PROPTYPE_SHAPE = PropTypes.shape({
    created_at: PropTypes.string,
    id: PropTypes.number,
    id_str: PropTypes.string,
    text: PropTypes.string,
    truncated: PropTypes.bool,
    source: PropTypes.string,
    user: TWITTER_USER_PROPTYPE_SHAPE,
});

export const TWEETS_PROPTYPE = PropTypes.arrayOf(TWEET_PROPTYPE_SHAPE);

export const DND_TYPE_TWEET = 'tweet';

export const SAVE_TWEET_ID = 'save-tweet-id';
export const REMOVE_TWEET_ID = 'remove-tweet-id';
export const SET_ERROR_MESSAGE = 'set-error-message';
export const CLEAR_ALL_SAVED_TWEETS_IDS = 'clear-all-saved-tweets-ids';

export const SAVED_TWEETS_KEY = 'saved-tweets';
