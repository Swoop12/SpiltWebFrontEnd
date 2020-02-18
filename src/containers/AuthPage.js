import React from 'react';
import AuthForm from '../components/AuthForm';
import SlideShow from '../components/SlideShow';
import appScreenShots from '../images/appScreenShot';
import { SimpleButton } from '../components/ui/Elements/Buttons';
import { InternalLink } from '../components/ui/Elements/Typography';

function AuthPage(props) {
    console.log("AUTH PAGE PROPS", props)
    return (
        <div className="auth-page">
            <div className="top-right-item">
                <InternalLink to="/">
                    <SimpleButton>
                        Try App
                    </SimpleButton>
                </InternalLink>
            </div>
            <SlideShow photos={appScreenShots} />
            <div className="auth-subpage">
                <AuthForm {...props} />
            </div>
        </div>
    )
}

export default AuthPage;
