import React from 'react';
import Quill from '../../images/quill.svg'
import Trash from '../../images/trash.svg';
import Inspect from '../../images/inspect.svg'

function FloatingEditor(props) {
    return (
        <div className="floating-editor">
                <img src={Inspect} 
                    alt="Inspect"
                    className="editor-icon2"
                    onMouseDown={(e) => {
                    e.preventDefault()
                    props.displayEditorPopUp(e, "inspect")
                }}/>
                <img src={Quill} 
                    alt="Quill"
                    className="editor-icon1"
                    onMouseDown={(e) => {
                    e.preventDefault()
                    props.displayEditorPopUp(e, "editor")
                }}/>
                <img src={Trash} 
                    alt="Trash"
                    className="editor-icon2"
                    onMouseDown={(e) => {
                    e.preventDefault()
                    props.displayEditorPopUp(e, "trash")
                }}/>
        </div>
    )
}

export default FloatingEditor;
