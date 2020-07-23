import React, { useState } from 'react';
import SearchBar from './SearchBar';
import TweetList from './TweetList';
import APIAccess from '../api';
import { useAppReducer } from '../useAppState';
import { SET_ERROR_MESSAGE } from '../constants';

export default function SearchedTweets() {
    const appReducer = useAppReducer();
    const [tweets, setTweets] = useState([]);

    const setErrorMessage = (message) => {
        appReducer({
            type: SET_ERROR_MESSAGE,
            errorMessage: message,
        });
    };

    const handleSearch = async (q) => {
        const { getSearchTweets } = APIAccess();

        setErrorMessage(null);

        try {
            const response = await getSearchTweets(q);
            setTweets(response.statuses);
        } catch (error) {
            setErrorMessage(
                'Something went wrong fetching tweets. Please try again.'
            );
        }
    };

    return (
        <>
            <div className="mb-4">
                <SearchBar onSearch={handleSearch} />
            </div>
            <TweetList tweets={tweets} />
        </>
    );
}
