import React from 'react';
import './Elements.css'
import AppContext from '../../../contexts/AppContext'

class TextField extends React.Component {
    static contextType = AppContext

    constructor(props) {
        super(props)
        this.input = React.createRef()
    }

    render() {
        const theme = this.context.theme
        const baseColor = { color: theme.text }
        const background = { background: theme.text }
        return (
            <label for="inp" class="inp" >
                <input
                    style={baseColor}
                    type="text" className="inp"
                    placeholder="&nbsp;"
                    value={this.props.value}
                    name={this.props.name}
                    onChange={(e) => {
                        if (this.props.onChange) {
                            this.props.onChange(e)
                        }
                    }}
                    ref={this.input}
                />
                <span style={baseColor} class='label'>{this.props.label}</span>
                <span style={background} class='border'></span>
            </label>
        )
    }
}

export default TextField;
