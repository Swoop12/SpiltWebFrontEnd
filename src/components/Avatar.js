import React from 'react';
import '../styles/ProfileStyles.css'
import ProfileEmptyState from '../images/profile.svg'

function Avatar(props) {

    return (

            <div className="profile-img"
                style={props.style}>
                <img
                    src={ProfileEmptyState}
                    alt="User Profile"
                    style={{
                        width: "100%",
                        margin: 'auto',
                    }}
                />
            </div>
    )
}

export default Avatar;
