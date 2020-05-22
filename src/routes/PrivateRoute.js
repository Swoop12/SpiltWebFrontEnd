import React from 'react';
import { Route, Redirect } from 'react-router';
import AppContext from '../contexts/AppContext';

function PrivateRoute({ children, ...rest }) {

    return (
        <AppContext.Consumer>
            {context =>
                <Route
                    {...rest}
                    render={() => (
                        context.currentUser ? (children) : (<Redirect to={{
                            pathname: "/login"
                        }} />)
                    )}
                />
            }
        </AppContext.Consumer>
    )
}

export default PrivateRoute;
