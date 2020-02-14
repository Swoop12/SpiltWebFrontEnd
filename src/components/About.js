import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../contexts/AppContext';
import { Title1, Body, Subhead, Title3, LargeTitle } from './ui/Elements/Typography';
import AppStoreImage from '../images/appstore.svg'
import { PrimaryButton, OutlineButton } from './ui/Elements/Buttons';

function About(props) {

    const context = useContext(AppContext)
    const { background } = context.theme
    return (
        <div className="medium-container"
            style={{
                position: 'relative',
                minHeight: '100vh',
                backgroundColor: background
            }}>
            <div className="vertical-container text-container"
                style={{ width: "80%", textAlign: "left", zIndex: '1' }}>
                <LargeTitle>Welcome to Generic Coffee</LargeTitle>
                <hr/>
                <Title3>
                    We’re a coffee app made for coffee people.
                </Title3>
                <Title3>
                    Let’s learn, share, discover, and brew together.
                </Title3>
                <div style={{height: '50px'}}/>
                <Body>
                    Hi there,
                </Body>
                <Body>
                    I’m Patrick, the founder of Spilt.Coffee and I’m so glad you’re here!
                </Body>
                <Body>
                    I’d love to share what we’re building and where we’re headed.
                </Body>
                <Body>
                    I created Spilt with my best friend and brother Trevor out of my passion for coffee.
                </Body>
                <Body>
                    I love coffee.
                </Body>
                <Body>
                    There’s something beautiful about it to me. Without getting to “out there”, coffee, to me, has always been a way to bring people together. And bringing people together is the whole reason we are here.
                </Body>
                <Body>
                    Our community is built around learning, discovering, sharing, and of course brewing.
                </Body>
                <Body>
                    No matter what your coffee knowledge or experience, you are welcome here.
                </Body>
                <Body>
                    I couldn’t be more excited to have you as a part of our community.
                </Body>
                <Body>
                    Sincerely,
                </Body>
                <Body>
                    Patrick
            </Body>
            </div>
            <img
                className="desktop-only"
                style={{
                    position: 'absolute',
                    bottom: '10%',
                    right: '32px',
                    height: 'auto',
                    width: '20%',
                }}
                src='https://pngriver.com/wp-content/uploads/2018/03/Download-Coffee-Mug-Top-PNG-Transparent-Picture-For-Designing-Projects.png' alt='coffee mug'/>
            <div style={{height: '50px'}}/>
            <div className="container">
                <div className="horizontal-container space-even"
                    style={{ 
                        width: "50%", 
                        minWidth: "400px", 
                        margin: "auto" }}>

                    {!context.currentUser && (
                        [<Link to='/signup'>
                            <PrimaryButton>
                                Sign Up
                            </PrimaryButton>
                        </Link>,
                        <Link to='/signin'>
                            <OutlineButton>
                                Sign In
                            </OutlineButton>
                        </Link>]
                    )}
                    <a href="http://apple.com">
                        <img src={AppStoreImage} alt="Download on the App Store" />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default About;
