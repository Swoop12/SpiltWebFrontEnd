import React from 'react';
import { Link } from 'react-router-dom'

function withLink(component, path) {
    return class extends React.Component {

        render() {
            return (
                <Link path={path}>
                    {component}
                </Link >
            )
        }
    }
}

export default withLink;
