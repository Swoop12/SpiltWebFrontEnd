import React from 'react'
import { dropShadow } from './Theme';
import AppContext from '../../../contexts/AppContext'
import './Elements.css';


class Card extends React.Component {
    static contextType =  AppContext
    render() {
        let theme = this.context.theme
        console.log(this.context)
        let optionalShadow = theme.name === 'Light' ? dropShadow : {}
        return (
            <div className={'background-card ' + this.props.className}
                style={{background: theme.foreground,
                    ...this.props.style,
                    ...optionalShadow}}>
                {this.props.children}
            </div>
        )
    }
}

export default Card;