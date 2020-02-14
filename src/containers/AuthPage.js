import React from 'react';
import AuthForm from '../components/AuthForm';
import SlideShow from '../components/SlideShow';
import appScreenShots from '../images/appScreenShot';

function AuthPage(props) {
    console.log("AUTH PAGE PROPS", props)
    return (
        <div className="auth-page">
            <SlideShow photos={appScreenShots} />
            <div className="auth-subpage">
                <AuthForm {...props} />
            </div>
        </div>
    )
}

export default AuthPage;
