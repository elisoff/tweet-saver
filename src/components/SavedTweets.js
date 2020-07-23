import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';

import TweetList from './TweetList';

import {
    DND_TYPE_TWEET,
    SAVE_TWEET_ID,
    SAVED_TWEETS_KEY,
    REMOVE_TWEET_ID,
    CLEAR_ALL_SAVED_TWEETS_IDS,
} from '../constants';

import './savedTweets.scss';
import { useAppReducer } from '../useAppState';
import { retrieveSavedTweetsFromLS, clearSavedTweetsFromLS } from '../utils';
import ConfirmationModal from './ConfirmationModal';

export default function SavedTweets() {
    const [savedTweets, setSavedTweets] = useState(new Map());
    const [confirmationModalHandler, setConfirmationModalHandler] = useState({
        handler: null,
    });
    const appReducer = useAppReducer();

    useEffect(() => {
        setSavedTweets(retrieveSavedTweetsFromLS());
    }, []);

    const [, drop] = useDrop({
        accept: DND_TYPE_TWEET,
        drop: (item, monitor) => {
            const didDrop = monitor.didDrop();

            if (didDrop) {
                return;
            }

            saveTweetToLocalStorage(item);
            appReducer({
                type: SAVE_TWEET_ID,
                tweetId: item.id,
            });
        },
    });

    const saveTweetToLocalStorage = (tweet) => {
        const newSavedTweets = new Map(savedTweets);
        newSavedTweets.set(tweet.id, tweet);
        setSavedTweets(newSavedTweets);

        localStorage.setItem(
            SAVED_TWEETS_KEY,
            JSON.stringify(Array.from(newSavedTweets))
        );
    };

    function removeTweetFromLocalStorage(tweetId) {
        const newSavedTweets = new Map(savedTweets);
        newSavedTweets.delete(tweetId);
        setSavedTweets(newSavedTweets);

        closeConfirmationModal();

        appReducer({
            type: REMOVE_TWEET_ID,
            tweetId,
        });

        localStorage.setItem(
            SAVED_TWEETS_KEY,
            JSON.stringify(Array.from(newSavedTweets))
        );
    }

    function handleClearAllClick() {
        clearSavedTweetsFromLS();
        setSavedTweets(new Map());
        closeConfirmationModal();

        appReducer({ type: CLEAR_ALL_SAVED_TWEETS_IDS });
    }

    function closeConfirmationModal() {
        setConfirmationModalHandler({ handler: null });
    }

    const showConfirmationModalClearAll = () => {
        setConfirmationModalHandler({ handler: handleClearAllClick });
    };
    const showConfirmationModalRemoveOne = (tweetId) => {
        setConfirmationModalHandler({
            handler: removeTweetFromLocalStorage.bind(this, tweetId),
        });
    };

    return (
        <div className="saved-tweets-container">
            <ConfirmationModal
                onCancel={closeConfirmationModal}
                onConfirm={confirmationModalHandler.handler}
            >
                Are you sure? Saved tweet will be permanently removed.
            </ConfirmationModal>

            <div className="level">
                <div className="level-left">
                    <h1 className="title">Saved Tweets</h1>
                </div>
                <div className="level-right">
                    <button
                        type="button"
                        className="button"
                        onClick={showConfirmationModalClearAll}
                        disabled={savedTweets.size === 0}
                    >
                        Clear All
                    </button>
                </div>
            </div>
            <div ref={drop} className="saved-tweets-list">
                <TweetList
                    tweets={Array.from(savedTweets.values())}
                    onRemoveTweet={(tweetId) =>
                        showConfirmationModalRemoveOne(tweetId)
                    }
                    isRemoveButtonEnabled={true}
                />
            </div>
        </div>
    );
}
