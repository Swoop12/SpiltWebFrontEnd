import React, { Component } from 'react'
import { SpiltGreen } from '../styles/Colors'

const successStyle = { 
    backgroundColor: "lightgreen",
    border: `2px solid ${SpiltGreen}`,
}

const errorStyle = {
    backgroundColor: "salmon",
    border: `2px solid red`,
}

function UserMessage(props){
        return (
            <div className="user-message"
                style={props.error ? errorStyle : successStyle}>
                <p className="user-message-p">{props.error || props.success }</p>
            </div>
        )
}

export default UserMessage
