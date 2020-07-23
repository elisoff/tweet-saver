import React, { createContext, createRef } from 'react';
import { render } from '@testing-library/react';

import TweetList from './TweetList';
import { AppStateProvider, useAppState } from '../useAppState';
import { useDrag } from 'react-dnd';

import mockTweetsList from '../../__mock__/mockSearch.json';

jest.mock('../useAppState');
jest.mock('react-dnd');

describe('TweetList', () => {
    beforeEach(() => {
        const AppContext = createContext(null);

        AppStateProvider.mockImplementation(({ children }) => {
            return <AppContext.Provider>{children}</AppContext.Provider>;
        });
    });

    test('renders a list of tweets', () => {
        useDrag.mockReturnValue([
            { opacity: 1, cursor: 'pointer' },
            createRef(),
        ]);

        useAppState.mockReturnValue({
            savedTweetsIds: [1, 2, 3],
            errorMessage: null,
        });

        const { getByTestId } = render(
            <TweetList tweets={mockTweetsList.statuses} />
        );

        const tweetListEl = getByTestId('tweetList');
        const firstTweetText = mockTweetsList.statuses[0].text;
        const secondTweetText = mockTweetsList.statuses[1].text;

        expect(tweetListEl.children.length).toBe(2);
        expect(tweetListEl.textContent).toContain(firstTweetText);
        expect(tweetListEl.textContent).toContain(secondTweetText);
    });

    test('renders an empty state view when there are not tweets', () => {
        useAppState.mockReturnValue({
            savedTweetsIds: [],
            errorMessage: null,
        });

        const { getByTestId } = render(<TweetList tweets={[]} />);

        const tweetListEl = getByTestId('tweetList');

        expect(tweetListEl.textContent).toContain('Nothing to see here');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
});
