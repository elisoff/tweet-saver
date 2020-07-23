import { SAVED_TWEETS_KEY } from './constants';
import { DateTime } from 'luxon';

export function retrieveSavedTweetsFromLS() {
    const savedTweets = localStorage.getItem(SAVED_TWEETS_KEY);
    return savedTweets ? new Map((JSON.parse(savedTweets))) : new Map();
}

export function clearSavedTweetsFromLS() {
    localStorage.removeItem(SAVED_TWEETS_KEY);
}

export function savedTweetsToTweetsIds(savedTweets) {
    const savedTweetsIds = [];

    savedTweets.forEach((tweet) => savedTweetsIds.push(tweet.id));

    return savedTweetsIds;
}

export function formatDateToTwitterFormat(date) {
    const jsDate = new Date(date);
    const dateObj = DateTime.fromJSDate(jsDate);
    const now = new Date();

    if (dateObj.year < now.getFullYear()) {
        return dateObj.toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY);
    }

    return dateObj.toRelative();
}

export function formatDateForTooltip(date) {
    const jsDate = new Date(date);
    const dateObj = DateTime.fromJSDate(jsDate);
    return dateObj.toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY);
}
