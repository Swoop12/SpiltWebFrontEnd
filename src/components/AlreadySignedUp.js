import React from 'react';
import { Title3, InternalLink } from './ui/Elements/Typography';
import Card from './ui/Elements/Card';
import AppContext from '../contexts/AppContext';

function AlreadySignedUp(props) {
    const { theme } = React.useContext(AppContext)
    const title = props.signIn ? "Don't have an account?" : "Already have an account"
    const linkTitle = props.signIn ? "Create One" : "Sign In"
    return (
        <Card className="flexer space-between standard-spacing-container">
            <Title3>{title}</Title3>
            <InternalLink 
                to={props.signIn ? "/signup" : "/signin"}
                style={{ color: theme.primary }}>
                {linkTitle}
            </InternalLink>
        </Card>
    )
}

export default AlreadySignedUp;
