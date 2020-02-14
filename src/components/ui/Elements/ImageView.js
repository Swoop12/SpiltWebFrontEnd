import React, { useEffect } from 'react';
import { serviceFactory } from '../../../services/ServiceFactory'
import coffeeBlackState from '../../../images/coffeeBlankState.png'
function ImageView(props) {
    const [currentPhotoId, setCurrentPhotoId] = React.useState(null)
    const [photo, setPhoto] = React.useState(null)
    const [error, setError] = React.useState(null)
    const [loading, setLoading] = React.useState(false)

    const views = () => {
        let source = props.src || props.emptyState || coffeeBlackState
        return (
            <div
                alt={props.alt || "User Upload"}
                style={{
                    backgroundImage: `url(${source})`,
                    ...props.style
                }}
                className={"image-view " + props.className}>
                {props.children}
            </div>
        )
    }

    return (
        <div>
            {views()}
        </div>
    )
}

export default ImageView;
