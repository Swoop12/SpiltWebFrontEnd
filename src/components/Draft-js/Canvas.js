import React from 'react'
import { Editor, EditorState, RichUtils, getDefaultKeyBinding, CompositeDecorator } from 'draft-js';
import FloatingEditor from './FloatingEditor';
import EditorMenu from './EditorMenu'
import 'draft-js/dist/Draft.css'
import LinkPopUp from './LinkPopUp';
import { basicDecorator } from './DecoratorStrategies'
import { LinkComponent } from './DraftComponents'
import { positionForReactComponent} from '../ReactHelpers'
import { getTextSelection } from './DraftHelpers'

class Canvas extends React.Component {

    _BLOCK_TYPES = () => ([
        { label: 'H1', style: 'header-one', },
        { label: 'H2', style: 'header-two', },
        { label: 'H3', style: 'header-three', },
        { label: 'Line Separator', style: 'line-separator', },
        { label: 'Image', style: 'image', },
        { label: 'Blockquote', style: 'blockquote', },
        { label: 'UL', style: 'unordered-list-item', },
        { label: 'OL', style: 'ordered-list-item', },
        { label: 'Code Block', style: 'code-block', },
        { label: 'Preview Link', style: 'preview-link', }
    ]);

    _INLINE_STYLES = () => ([
        { label: 'Bold', style: 'BOLD', },
        { label: 'Italic', style: 'ITALIC', },
        { label: 'Underline', style: 'UNDERLINE', },
        { label: 'Link', style: 'link', overrideAction: this.promptForLink }
    ]);

    _ALL_STYLES = () => ({
        inlineStyles: this.INLINE_STYLES,
        blockStyles: this.BLOCK_TYPES
    })

    constructor(props) {
        super(props);
        const decorator = new CompositeDecorator([
            basicDecorator('LINK', LinkComponent)
        ])
        this.state = {
            editorState: EditorState.createEmpty(decorator),
            isEditorShowing: false,
            linkPopupPosition: null
        };
        this.focus = () => this.refs.editor.focus();
        this.onChange = (editorState) => this.setState({ editorState });
        this.componentRefs = []
        this.handleKeyCommand = this._handleKeyCommand.bind(this);
        this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
        this.toggleBlockType = this._toggleBlockType.bind(this);
        this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
        this.editorPopUp = this.editorPopUp.bind(this)
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.INLINE_STYLES = this._INLINE_STYLES.call(this)
        this.BLOCK_TYPES = this._BLOCK_TYPES.call(this)
        this.ALL_STYLES = this._ALL_STYLES.call(this)
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    }

    /**
 * Set the wrapper ref
 */
    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.hideEditor(event)
            this.hideLinkPopup()
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
            isEditorShowing: false,
            linkPopupPosition: null
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

    hideLinkPopup = () => {
        if(!this.state.linkPopupPosition) { return }
        this.setState({
            linkPopupPosition: null
        }, () => setTimeout(() => this.focus(),0))
    }

    hideEditor = (e) => {
        if (!this.state.isEditorShowing) { return }
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
            let isActive = blockActive || inlineActive
            return { ...item, isActive }
        })
    }

    updateAllStylesWithActiveProp = (allStyles) => {
        const keys = Object.keys(allStyles)
        var newObject = {}
        for (const key of keys) {
            newObject[key] = this.updateListWithActiveProp(allStyles[key])
        }
        return newObject
    }

    popupPositionStyleBelow(rect) {
        const { bottom, left, right } = rect
        let topPosition = bottom + 8;
        let leftPosition = ((right + left) / 2) - 125
        let position = {
            position: "fixed",
            zIndex: "2",
            top: topPosition,
            left: leftPosition
        }
        console.log("RECT", rect)
        console.log("POSITION:", position)
        return position
    }

    promptForLink = (e) => {
        function getSelected() {
            var t = '';
            if (window.getSelection) {
                t = window.getSelection();
            } else if (document.getSelection) {
                t = document.getSelection();
            } else if (document.selection) {
                t = document.selection.createRange().text;
            }
            return t;
        }
        var selection = this.state.editorState.getSelection();
        if (selection.isCollapsed()) {
            return this.setState({ isLinkPromptShowing: false });
        } else {
            var selected = getSelected();
            var rect = selected.getRangeAt(0).getBoundingClientRect();
            let popUpPositionStyle = this.popupPositionStyleBelow(rect);
            this.setState({
                linkPopupPosition: popUpPositionStyle,
                isEditorShowing: false,
                editUrl: null
            });
        }
    }

    promptEditLink = (componentID, editUrl) => {
        const component = componentID.current
        const componentRect = positionForReactComponent(component)
        const popUpPositionStyle = this.popupPositionStyleBelow(componentRect)
        this.setState({
            linkPopupPosition: popUpPositionStyle,
            isEditorShowing: false,
            editUrl
        })
    }

    hyperlinkSelectionWith = (editUrl) => {
        const contentState = this.state.editorState.getCurrentContent()
        const linkRef = React.createRef()
        this.componentRefs.push(linkRef)
        const contentStateWithEntity = contentState.createEntity(
            'LINK',
            'MUTABLE',
            {
                editUrl,
                handleLinkEdit: this.promptEditLink,
                componentID: linkRef
        }
        )
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
        const newEditorState = EditorState.set(this.state.editorState,
            { currentContent: contentStateWithEntity })
        this.setState({
            editorState: RichUtils.toggleLink(
                newEditorState,
                newEditorState.getSelection(),
                entityKey
            ),
            isEditorShowing: false,
            linkPopupPosition: null
        })
    }

    selectedText = () => {
        const {editorState} = this.state
        const contentState = editorState.getCurrentContent()
        return getTextSelection(contentState, editorState.getSelection())
    }

    render() {
        debugger
        const { editorState } = this.state;
        let className = 'RichEditor-editor';
        return (
            <div className="canvas-root"
                ref={this.setWrapperRef}
                onMouseDown={this.hideEditor}>
                <FloatingEditor
                    displayEditorPopUp={this.editorPopUp}
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
                        options={this.updateAllStylesWithActiveProp(this.ALL_STYLES)} />
                )}
                {this.state.linkPopupPosition && (
                    <LinkPopUp
                        position={this.state.linkPopupPosition}
                        text={this.state.editUrl ? this.state.editUrl.text : this.selectedText()}
                        hyperlinkSelectionWith={this.hyperlinkSelectionWith}
                        url={this.state.editUrl ? this.state.editUrl.url : ""} />
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

export default Canvas;