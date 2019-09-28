import React from 'react';

function menuItemFor(item, styleType, handleSelection) {
    let itemClassName = item.isActive ? "editor-item active-editor-item" : "editor-item"
        return (
            <li className={itemClassName}
                key={item.label}
                onMouseDown={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    handleSelection(item, styleType)
                }}>{item.label}</li>
        )
}

function EditorMenu(props) {
    console.log(props)
    const { inlineStyles, blockStyles } = props.options
    
    let inlineItems = inlineStyles.map(item => menuItemFor(item, "inline", props.handleEditorItemSelection))
    let blockItems = blockStyles.map(item => menuItemFor(item, "block", props.handleEditorItemSelection))
    return (
        <div className="content-card popup">
            <ul className="editor-list">
                {inlineItems}
                <div className="divider" />
                {blockItems}
            </ul>
        </div>
    )
}

export default EditorMenu;
