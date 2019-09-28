import React from 'react';
import AuthContainer from './AuthContainer';
import SlideShow from '../components/SlideShow';
import appScreenShots from '../images/appScreenShot';

function AuthPage(props) {
    return (
        <div className="auth-page">
            <SlideShow photos={appScreenShots} />
            <AuthContainer {...props} />
        </div>
    )
}

export default AuthPage;
