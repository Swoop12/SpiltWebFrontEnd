import React from 'react'
import { Editor, EditorState, RichUtils, getDefaultKeyBinding } from 'draft-js';
import FloatingEditor from './FloatingEditor';
import EditorMenu from './EditorMenu'
import 'draft-js/dist/Draft.css'

class Canvas extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
            isEditorShowing: false
        };
        this.focus = () => this.refs.editor.focus();
        this.onChange = (editorState) => this.setState({ editorState });
        this.handleKeyCommand = this._handleKeyCommand.bind(this);
        this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
        this.toggleBlockType = this._toggleBlockType.bind(this);
        this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
        this.editorPopUp = this.editorPopUp.bind(this)
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    /**
 * Set the wrapper ref
 */
    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    /**
     * Alert if clicked on outside of element
     */
    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.hideEditor(event)
        }
    }

    _handleKeyCommand(command, editorState) {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return true;
        }
        return false;
    }

    _mapKeyToEditorCommand(e) {
        if (e.keyCode === 9 /* TAB */) {
            const newEditorState = RichUtils.onTab(
                e,
                this.state.editorState,
                4, /* maxDepth */
            );
            if (newEditorState !== this.state.editorState) {
                this.onChange(newEditorState);
            }
            return;
        }
        return getDefaultKeyBinding(e);
    }

    _toggleBlockType(styleItem, type) {
        debugger
        if (type === "inline") {
            this.onChange(
                RichUtils.toggleInlineStyle(
                    this.state.editorState,
                    styleItem.style
                )
            );
        } else {
            this.onChange(
                RichUtils.toggleBlockType(
                    this.state.editorState,
                    styleItem.style
                )
            );
        }
        this.setState({
            isEditorShowing: false
        })
    }

    _toggleInlineStyle(inlineStyle) {
        this.onChange(
            RichUtils.toggleInlineStyle(
                this.state.editorState,
                inlineStyle
            )
        );
    }

    hideEditor = (e) => {
        this.setState({
            isEditorShowing: false
        })
        setTimeout(this.focus, 100);
    }

    editorPopUp = (event, editorType) => {
        event.stopPropagation()
        // eslint-disable-next-line default-case
        switch (editorType) {
            case "editor":
                this.setState({
                    isEditorShowing: true
                })
        }
    }

    currentBlockType = () => {
        const currentSelection = this.state.editorState.getSelection()
        const blockType = this.state.editorState
                                .getCurrentContent()
                                .getBlockForKey(currentSelection.getStartKey())
                                .getType()
        return blockType
    }

    updateListWithActiveProp = (styles) => {
        let currentBlockType = this.currentBlockType()
        const currentInlineStyles = this.state.editorState.getCurrentInlineStyle()
        return styles.map((item) => {
            let blockActive = item.style === currentBlockType
            let inlineActive = currentInlineStyles.has(item.style)
            let isActive =  blockActive || inlineActive
            return {...item, isActive}
        })
    }

    updateAllStylesWithActiveProp = (allStyles) => {
        const keys = Object.keys(allStyles)
        var newObject = {}
        for(const key of keys){
            newObject[key] = this.updateListWithActiveProp(allStyles[key])
        }
        return newObject
    }

    render() {
        const { editorState } = this.state;
        let className = 'RichEditor-editor';
        return (
            <div className="canvas-root"
                ref={this.setWrapperRef}
                onMouseDown={this.hideEditor}>
                <FloatingEditor
                    displayEditorPopUp={this.editorPopUp}
                    onUnfocus={this.hideEditor}
                    onClick={(e) => {
                        alert("FLoating editor CLick")
                        e.stopDOMPropagation()
                    }} />
                <div className={className} onClick={this.focus}>
                    <Editor
                        blockStyleFn={getBlockStyle}
                        customStyleMap={styleMap}
                        editorState={editorState}
                        handleKeyCommand={this.handleKeyCommand}
                        keyBindingFn={this.mapKeyToEditorCommand}
                        onChange={this.onChange}
                        placeholder="Tell a story..."
                        ref="editor"
                        spellCheck={true}
                    />
                </div>
                {this.state.isEditorShowing && (
                    <EditorMenu
                        handleEditorItemSelection={this.toggleBlockType}
                        options={this.updateAllStylesWithActiveProp(ALL_STYLES)} />
                )}
            </div>
        );
    }
}


// Custom overrides for "code" style.
const styleMap = {
    CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2,
    },
};

function getBlockStyle(block) {
    switch (block.getType()) {
        case 'blockquote': return 'RichEditor-blockquote';
        default: return null;
    }
}

const BLOCK_TYPES = [
    { label: 'H1',              style: 'header-one',          },
    { label: 'H2',              style: 'header-two',          },
    { label: 'H3',              style: 'header-three',        },
    { label: 'Line Separator',  style: 'line-separator',      },
    { label: 'Image',           style: 'image',               },
    { label: 'Blockquote',      style: 'blockquote',          },
    { label: 'UL',              style: 'unordered-list-item', },
    { label: 'OL',              style: 'ordered-list-item',   },
    { label: 'Code Block',      style: 'code-block',          },
    { label: 'Preview Link',    style: 'preview-link',        }
];

var INLINE_STYLES = [
    { label: 'Bold',            style: 'BOLD',     },
    { label: 'Italic',          style: 'ITALIC',   },
    { label: 'Underline',       style: 'UNDERLINE',},
    { label: 'Link',            style: 'link',     }
];

export const ALL_STYLES = {
    inlineStyles: INLINE_STYLES,
    blockStyles: BLOCK_TYPES
}

export default Canvas;