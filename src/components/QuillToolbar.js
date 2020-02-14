import React from 'react';
import Link from '../images/link.svg'
import Trash from '../images/trash.svg';
import Image from '../images/imageIcon.svg'

function QuillToolbar(props) {
    return (
        <div className="floating-editor">
            <img src={Image}
                alt="Inspect"
                className="editor-icon2"
                onMouseDown={(e) => {
                    e.preventDefault()
                    props.displayEditorPopUp(e, "inspect")
                }} />
            <i class="fas fa-images" />
            <input
                type="file"
                className="hidden-fileupload"
                onChange={props.readUrl} />
            <img src={Trash}
                alt="Trash"
                className="editor-icon2"
                onMouseDown={(e) => {
                    e.preventDefault()
                    props.displayEditorPopUp(e, "trash")
                }} />
        </div>
    )
}

export default QuillToolbar;
