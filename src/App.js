import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import DragTweetsNote from './components/DragTweetsNote';
import ErrorMessage from './components/ErrorMessage';
import Hero from './components/Hero';
import SavedTweets from './components/SavedTweets';

import { useAppState } from './useAppState';

import './app.scss';
import SearchedTweets from './components/SearchedTweets';

export default function App() {
    const { errorMessage } = useAppState();

    return (
        <>
            <Hero />
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            <section className="section">
                <div className="tile is-ancestor full-height">
                    <div className="tile is-parent">
                        <DndProvider backend={HTML5Backend}>
                            <div className="tile is-child is-5 mr-4">
                                <div className="tile is-parent is-vertical full-height">
                                    <SearchedTweets />
                                </div>
                            </div>
                            <div className="tile is-2 is-child">
                                <DragTweetsNote />
                            </div>
                            <div className="tile is-child is-5">
                                <div className="tile is-parent is-vertical full-height">
                                    <SavedTweets />
                                </div>
                            </div>
                        </DndProvider>
                    </div>
                </div>
            </section>
        </>
    );
}
