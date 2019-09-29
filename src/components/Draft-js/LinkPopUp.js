import React, { Component } from 'react'

class LinkPopUp extends Component {
    constructor(props) {
        super(props)

        this.state = {
            url: this.props.url || "",
        }
    }

    listenForEnter = (e) => {
        if(e.keyCode === 13) {
            this.props.hyperlinkSelectionWith({
                text: this.props.text,
                url: this.state.url
            })
        }
    }

    handleURLChange = (e) => {
        this.setState({url: e.target.value})
    }

    render() {
        return (
            <div className="content-card link-popup"
                    style={this.props.position}>
                <div>
                    <p className="info-header">TEXT</p>
                    <p>{this.props.text}</p>
                </div>
                <div>
                    <p className="info-header">URL</p>
                    <input type="text"
                        value={this.state.url}
                        onChange={this.handleURLChange}
                        onKeyDown={this.listenForEnter} />
                </div>
            </div>
        )
    }
}

export default LinkPopUp
