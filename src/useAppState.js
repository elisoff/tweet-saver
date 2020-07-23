import React, { useContext, useReducer } from 'react';
import { SAVE_TWEET_ID, REMOVE_TWEET_ID, SET_ERROR_MESSAGE, CLEAR_ALL_SAVED_TWEETS_IDS } from './constants';
import { retrieveSavedTweetsFromLS, savedTweetsToTweetsIds } from './utils';

const AppStateContext = React.createContext(null);

export function useAppReducer() {
    return useContext(AppStateContext)[1];
}

export function useAppState() {
    return useContext(AppStateContext)[0];
}

function appStateReducer(state, action) {
    switch (action.type) {
        case SAVE_TWEET_ID: {
            const { tweetId } = action;

            if (state.savedTweetsIds.includes(tweetId)) {
                return state;
            }

            return {
                ...state,
                savedTweetsIds: [...state.savedTweetsIds, tweetId],
            };
        }
        case REMOVE_TWEET_ID: {
            const { tweetId } = action;
            const savedTweetsIds = [...state.savedTweetsIds];
            const tweetIdIndex = savedTweetsIds.indexOf(tweetId);

            if (tweetIdIndex === -1) {
                return state;
            }

            savedTweetsIds.splice(tweetIdIndex, 1);

            return {
                ...state,
                savedTweetsIds,
            };
        }
        case CLEAR_ALL_SAVED_TWEETS_IDS: {
            return {
                ...state,
                savedTweetsIds: []
            }
        }
        case SET_ERROR_MESSAGE: {
            return {
                ...state,
                errorMessage: action.errorMessage,
            };
        }
        default:
            return state;
    }
}

export function AppStateProvider({ children }) {
    const savedTweets = retrieveSavedTweetsFromLS();

    const initialState = {
        savedTweetsIds: savedTweetsToTweetsIds(savedTweets),
        errorMessage: null,
    };

    const value = useReducer(appStateReducer, initialState);

    return (
        <AppStateContext.Provider value={value}>
            {children}
        </AppStateContext.Provider>
    );
}
