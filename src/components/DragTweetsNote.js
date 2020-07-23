import React from 'react';

import './dragTweetsNote.scss';

export default function DragTweetsNote() {
    return (
        <div className="drag-tweets-note">
            <div className="info-panel">Drag tweets to save</div>
            <i className="fas fa-long-arrow-alt-right fa-3x"></i>
        </div>
    );
}
