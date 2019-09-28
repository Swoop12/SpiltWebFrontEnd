import React, { Component } from 'react'

class LinkPlaceholder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            link: ""
        }
    }

    handleChange = event => {
        this.setState({
            link: event.target.value
        })
    }

    render() {
        return (
            <div>
                <input type="text"
                    className="link-placeholder"
                    placeholder={this.props.placeholder}
                    value={this.state.link}
                    onChange={this.handleChange}
                    //onKeyDown={(event) => this.props.handleEnterEvent(event, this.state.link)} 
                    />
                    <button onClick={() => {
                        this.props.submitLink(this.state.link)
                        }}>LINK</button>
            </div>
        )
    }
}

export default LinkPlaceholder
