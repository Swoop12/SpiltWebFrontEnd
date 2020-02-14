import React from 'react';

function GradientBackground(props) {
    const gradientStyle = {
        background: `linear-gradient(to ${props.direction}, ${props.start}, ${props.end} 100%`,
        ...props.style
    }
    return (
        <div style={gradientStyle} className="gradient">
            {props.children}
        </div>
    )
}

export default GradientBackground;
