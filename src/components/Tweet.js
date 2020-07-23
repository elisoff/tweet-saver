import React from 'react';
import PropTypes from 'prop-types';

import { useDrag } from 'react-dnd';
import { TWEET_PROPTYPE_SHAPE, DND_TYPE_TWEET } from '../constants';
import { formatDateToTwitterFormat } from '../utils';

function Star({ isButton, buttonProps }) {
    return isButton ? (
        <button
            type="button"
            title="Remove from saved tweets"
            className="button is-small is-rounded is-pulled-right ml-4"
            {...buttonProps}
        >
            <span className="icon is-small has-text-warning">
                <i className="fas fa-star"></i>
            </span>
        </button>
    ) : (
        <span className="is-pulled-right ml-4">
            <span className="icon is-small has-text-warning">
                <i className="fas fa-star"></i>
            </span>
        </span>
    );
}

Star.propTypes = {
    isButton: PropTypes.bool.isRequired,
    buttonProps: PropTypes.shape({
        onClick: PropTypes.func,
    }),
};

export default function Tweet({
    value,
    value: { user },
    isDraggable,
    isSavedTweet,
    onRemoveTweet,
}) {
    const [{ opacity, cursor }, dragRef] = useDrag({
        item: { type: DND_TYPE_TWEET, ...value },
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.5 : 1,
            cursor: monitor.canDrag() ? 'pointer' : 'default',
        }),
        canDrag: () => isDraggable,
    });

    return (
        <>
            {value && (
                <div ref={dragRef} style={{ opacity, cursor }} className="box">
                    <article className="media">
                        <figure className="media-left">
                            <p className="image is-64x64">
                                <img
                                    src={user.profile_image_url_https}
                                    alt={user.screen_name}
                                />
                            </p>
                        </figure>
                        <div className="media-content">
                            <div className="content">
                                <p>
                                    <strong>{user.name}</strong>{' '}
                                    <small>@{user.screen_name}</small>
                                    {'  '}
                                </p>
                                <p>{value.text}</p>
                            </div>
                        </div>
                        <div className="media-right">
                            {!isDraggable && (
                                <Star
                                    isButton={isSavedTweet}
                                    buttonProps={{
                                        onClick: () =>
                                            onRemoveTweet &&
                                            onRemoveTweet(value.id),
                                    }}
                                />
                            )}
                            <small>
                                {formatDateToTwitterFormat(value.created_at)}
                            </small>
                        </div>
                    </article>
                </div>
            )}
        </>
    );
}

Tweet.defaultProps = {
    isDraggable: true,
    isSavedTweet: false,
};

Tweet.propTypes = {
    value: TWEET_PROPTYPE_SHAPE.isRequired,
    isDraggable: PropTypes.bool,
    isSavedTweet: PropTypes.bool,
    onRemoveTweet: PropTypes.func,
};
