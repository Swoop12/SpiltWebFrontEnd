import React from 'react';
import '../styles/ProfileStyles.css'
import {Link} from 'react-router-dom'

function FloatingMenu(props) {
    debugger
    return (
        <div className="floating-menu">
            <div className="content-card floating-content">
                <Link to={`/profile/${props.currentUser._id}/posts`} 
                    className="editor-item">Profile</Link>
                <div to="/signin" 
                    className="editor-item">
                    <div onClick={ () => {
                        props.logout()
                        props.history.push("/signin")
                    }}>
                        Sign Out
                    </div>
                </div>
                <Link to="/settings" className="editor-item">Settings</Link>
            </div>
        </div>
    )
}

export default FloatingMenu;
