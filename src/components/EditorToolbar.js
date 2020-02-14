import React, { Component } from 'react'
import "@fortawesome/fontawesome-free/css/all.css"
import "../styles/TextEditor.css"
import AppContext from '../contexts/AppContext'


class EditorToolbar extends Component {

    static contextType = AppContext

    render() {
        const { position } = this.props
        return (
            <div id="sidebar-controls"
                style={{
                    left: position.left,
                    top: position.top
                }}>
                <span style={{ color: this.context.theme.text }}
                    className="hidden-fileupload-container">
                    <input
                        type="file"
                        accept="image/x-png,image/gif,image/jpeg"
                        className="hidden-fileupload"
                        onChange={this.props.readUrl} />
                    <i class="fa fa-images"></i>
                </span>
                <button id="video-button"
                    style={{ color: this.context.theme.text }}
                    onClick={this.props.promptForVideo}>
                    <i className="fa fa-link"></i>
                </button>
                <button id="divider-button"
                    style={{ color: this.context.theme.text }}
                    onClick={() => this.props.insertEmbeded('divider')}>
                    <i className="fa fa-minus"></i>
                </button>

            </div >
        )
    }
}

export default EditorToolbar;
