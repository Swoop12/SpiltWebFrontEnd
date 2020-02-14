import React from 'react';

function ErrorPage(props) {
    return (
        <div>
            Error: {props.errorMessage}
        </div>
    )
}

export default ErrorPage;
