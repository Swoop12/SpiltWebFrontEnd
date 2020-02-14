import Quill from 'quill';
import React, { Component } from 'react'
import EditorToolbar from './EditorToolbar'
import { UniqueId, cleanUrl } from '../services/Utils'
import { serviceFactory } from '../services/ServiceFactory'

import 'quill/dist/quill.bubble.css';
import '../styles/TextEditor.css'
import { relative } from 'path';

// MARK: - INLINE BLOTS
let Inline = Quill.import('blots/inline');

class LinkBlot extends Inline {

    static create(value) {
        let node = super.create();
        // Sanitize url value if desired
        node.setAttribute('href', value);
        // Okay to set other non-format related attributes
        // These are invisible to Parchment so must be static
        node.setAttribute('target', '_blank');
        node.classList.add('my-link')
        return node;
    }

    static formats(node) {
        // We will only be called with a node already
        // determined to be a Link blot, so we do
        // not need to check ourselves
        return node.getAttribute('href');
    }
}

LinkBlot.blotName = 'link'
LinkBlot.tagName = 'a'

Quill.register(LinkBlot)

// MARK: - BLOCK BLOTS
let Block = Quill.import('blots/block');

class BlockquoteBlot extends Block {
    static create(value) {
        let node = super.create()
        node.classList.add('editor-blockquote')
        return node
    }
}

BlockquoteBlot.blotName = 'blockquote';
BlockquoteBlot.tagName = 'blockquote';

class HeaderBlot extends Block { }

HeaderBlot.blotName = "header"
HeaderBlot.tagName = ["h1", "h2"]

Quill.register(BlockquoteBlot)
Quill.register(HeaderBlot)

// MARK: - BlockEmbeded Blots
let BlockEmbed = Quill.import('blots/block/embed');

class DividerBlot extends BlockEmbed { }
DividerBlot.blotName = 'divider';
DividerBlot.tagName = 'hr';

class ImageBlot extends BlockEmbed {
    static create(value) {
        let node = super.create(value)
        node.setAttribute('src', value.url)
        node.setAttribute('alt', value.alt)
        node.classList.add('editor-image')
        return node;
    }

    static formats(node) {
        return {
            src: node.getAttribute('src'),
            alt: node.getAttribute('alt'),
        }
    }
}

ImageBlot.blotName = 'image'
ImageBlot.tagName = 'img'

class VideoBlot extends BlockEmbed {
    static create(url) {
        let node = super.create();
        node.setAttribute('src', url);
        // Set non-format related attributes with static values
        node.setAttribute('frameborder', '0');
        node.setAttribute('allowfullscreen', true);

        node.classList.add('video-blot')
        return node;
    }

    static formats(node) {
        // We still need to report unregistered embed formats
        let format = {};
        if (node.hasAttribute('height')) {
            format.height = node.getAttribute('height');
        }
        if (node.hasAttribute('width')) {
            format.width = node.getAttribute('width');
        }
        return format;
    }

    static value(node) {
        return node.getAttribute('src');
    }

    format(name, value) {
        // Handle unregistered embed formats
        if (name === 'height' || name === 'width') {
            if (value) {
                this.domNode.setAttribute(name, value);
            } else {
                this.domNode.removeAttribute(name, value);
            }
        } else {
            super.format(name, value);
        }
    }
}
VideoBlot.blotName = 'video';
VideoBlot.tagName = 'iframe';

class TweetBlot extends BlockEmbed {
    static create(id) {
        let node = super.create();
        node.dataset.id = id;
        // Allow twitter library to modify our contents
        //   twttr.widgets.createTweet(id, node);
        return node;
    }

    static value(domNode) {
        return domNode.dataset.id;
    }
}
TweetBlot.blotName = 'tweet';
TweetBlot.tagName = 'div';
TweetBlot.className = 'tweet';

Quill.register(DividerBlot)
Quill.register(ImageBlot)
Quill.register(VideoBlot)

var FontAttributor = Quill.import('attributors/class/font');
FontAttributor.whitelist = ['roboto'];
Quill.register(FontAttributor, true);

class QuillEditor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selection: {},
        }
        this.editorRef = React.createRef()
    }

    componentDidMount() {
        const { readonly } = this.props
        readonly ? this.setUpReadOnly() : this.setUpReadWrite()
    }

    setUpReadOnly() {
        var options = {
            debug: 'info',
            readOnly: true,
            theme: 'bubble'
        };
        this.editor = new Quill(this.editorRef.current, options)
        this.editor.setContents(this.props.content)
    }

    setUpReadWrite() {
        const toolbarOptions = [
            ['bold', 'italic', 'underline', 'blockquote'],
            [],
            [{ 'header': 1 }, { 'header': 2 }, 'link'],
            [],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [],
            [{ align: '' }, { align: 'center' }, { align: 'right' }]
        ]

        var options = {
            debug: 'info',
            placeholder: "What's brewing?",
            readOnly: false,
            theme: 'bubble',
            modules: {
                toolbar: toolbarOptions
            }
        };
        this.editor = new Quill(this.editorRef.current, options)

        this.editor.on('editor-change', (source) => {
            const selection = this.editor.getSelection()
            const content = this.editor.getContents()
            this.setState({ selection, content })
            if (this.props.onEditorChange) {
                this.props.onEditorChange(content, selection)
            }
        })

        this.editor.on('text-change', (delta, oldDelta, source) => {
            if (this.props.onTextEdit) {
                this.props.onTextEdit()
            }
        })
    }

    toggleStyle = (style) => {
        const currentFormat = this.editor.getFormat()
        const toggleOn = !currentFormat[style]
        this.editor.format(style, toggleOn);
    }

    toggleHeader = (headerNumber) => {
        this.editor.format('header', headerNumber)
    }

    insertEmbeded = (embed, data) => {
        const embeddedData = data || true
        let range = this.editor.getSelection(true);
        this.editor.insertText(range.index, '\n', Quill.sources.USER);
        this.editor.insertEmbed(range.index + 1, embed, embeddedData, Quill.sources.USER);
        this.editor.formatText(range.index + 1, 1, { align: 'center' });
        this.editor.format('align', 'center')
        this.editor.setSelection(range.index + 2, Quill.sources.SILENT);
    }

    promptForLink = () => {
        let value = prompt('Enter link URL');
        this.editor.format('link', value);
    }

    promptForVideo = () => {
        let value = prompt('Enter a link for embedded content')
        if (value && value !== "") {
            this.insertEmbeded('video', cleanUrl(value))
        }
    }

    cleanUrlInputString = (rawUrl) => {
        var parser = document.createElement('a');
        parser.href = rawUrl
        console.log(parser)
    }

    getContent = () => {
        if (!this.editor) { return {} }
        return this.editor.getContents()
    }

    setContent = (content) => {
        if (!this.editor) { return {} }
        this.editor.setContents(content, "external")
    }

    updateContent = (content) => {
        this.editor.updateContents(content)
    }

    logContents = () => {
        console.log(this.editor.getContents())
    }

    insertImage = (event) => {
        this.props.handleImageInsert(event)
            .then((url) => {
                this.insertEmbeded('image', {
                    url: (url),
                    alt: 'User Upload'
                })
            }).catch(error => {
                // TODO: - Error Handling
                alert(error)
            })
    }

    isSelectingNewLine = () => {
        if (!this.editor) { return }
        const selection = this.state.selection
        const length = this.editor.getLength()
        if (!selection || selection.length !== 0 || length <= 1) { return false }
        const lastText = this.editor.getText(selection.index - 1, 1)
        return lastText.includes("\n")
    }

    toolBar = () => {
        if (this.props.readonly || !this.state.selection) { return }
        if (!this.isSelectingNewLine()) { return }

        const cursorPosition = this.editor.getBounds(this.state.selection.index)
        const position = {
            left: cursorPosition.left,
            top: cursorPosition.top
        }
        return (
            <EditorToolbar
                toggleStyle={this.toggleStyle}
                promptForLink={this.promptForLink}
                toggleHeader={this.toggleHeader}
                insertEmbeded={this.insertEmbeded}
                readUrl={this.insertImage}
                promptForVideo={this.promptForVideo}
                position={position} />
        )
    }

    render() {
        return (
            <div style={{
                'flex-grow': '2',
                'position': 'relative'
            }}>
                <div id="editor"
                    ref={this.editorRef}>
                </div>
                {this.toolBar()}
            </div>
        )
    }
}

export default QuillEditor;
