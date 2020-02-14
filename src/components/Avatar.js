import React from 'react';
import '../styles/ProfileStyles.css'
import ProfileEmptyState from '../images/profile.svg'
import ImageView from './ui/Elements/ImageView';

function Avatar(props) {
    return (
        <div className="center-container">
            <div className="profile-img">
                <ImageView
                    photoId={props.userId}
                    emptyState={ProfileEmptyState}
                    alt="User Profile"
                    imageStyle={props.imageStyle || {width: "100%"}}
                />
            </div>
        </div>
    )
}

export default Avatar;
