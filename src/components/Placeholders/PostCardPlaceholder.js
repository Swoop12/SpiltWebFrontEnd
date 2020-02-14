import React from 'react';
import CoverArt from '../../images/coffeeBlankState.png'

function PostCardPlaceholder(props) {
    return (
        <div className="vertical-container content-card post-blankstate-container">
            <div className="coverart">
                <div className="titles-container">
                    <div className="title-blank-state" />
                    <div className="title-blank-state" />
                </div>
            </div>
                <div className="text-blank-state" />
                <div className="text-blank-state" />
                <div className="text-blank-state" />
        </div>
    )
}

export default PostCardPlaceholder;
