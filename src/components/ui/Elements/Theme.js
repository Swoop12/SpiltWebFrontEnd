import React, { useState } from 'react'
import AppContext from '../../../contexts/AppContext'

export const themes = {
    light: {
        name: "Light",
        primary: '#5D8277',
        secondary: '#32322C',
        tertiary: '#BFACAA',
        text: '#A5A5A5',
        danger: '#EDA3A3',
        foreground: '#FFFFFF',
        foregroundSelected: '#F0F0F0',
        background: '#F8F8F8'
    },
    dark: {
        name: "Dark",
        primary: '#71AD9B',
        secondary: '#FFFFFF',
        tertiary: '#BFACAA', 
        text: '#FCFCFC',
        danger: '#EDA3A3',
        foreground: '#454545',
        foregroundSelected: '#252525',
        background: '#1F1F1F'
    }
}

export const dropShadow = {
    webkitBoxShadow: "2px 2px 2px 2px rgba(136, 136, 136, 1)",
    mozBoxShadow: "2px 2px 2px 2px rgba(136, 136, 136, 1)",
    boxShadow: "1px 2px 5px 1px rgba(136, 136, 136, 1)"
}

export const ForegroundDiv = props => (
    <AppContext.Consumer>
        {AppContext => {
            const theme = AppContext.theme
            var optionalDropShadow = theme.name === 'Light' ? dropShadow : {}
            const style = {
                color: theme.text,
                backgroundColor: theme.foreground,
                ...props.additionalStyles,
                ...optionalDropShadow
            }
            return (
                <div style={style} onClick={props.onClick} className={props.className}> 
                    {props.children}
                </div>
            )
        }}
    </AppContext.Consumer>
)