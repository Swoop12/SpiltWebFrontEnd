import React from 'react';
import { Editor, EditorState, RichUtils, CompositeDecorator, Modifier } from 'draft-js';
import 'draft-js/dist/Draft.css'
import LinkPlaceholder from './LinkPlaceholder';
import FloatingEditor from './FloatingEditor'
import EditorMenu from '../EditorMenu'

import { Link, Image, Header1, Header2, Header3, Header4 } from './DraftComponents'
import { LINK, BOLD, ITALICIZED, UNDERLINE, IMG, H1, H2, H3, H4 } from './DraftComponentTypes'
import { entityStrategyFor, decorator, basicDecorator } from './DecoratorStrategies'

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(new CompositeDecorator([
        decorator(entityStrategyFor(LINK), Link),
        decorator(entityStrategyFor(IMG), Image),
        basicDecorator(H1, Header1)
      ])
      ),
      showURLInputFor: false,
      isEditorShowing: false
    };
    this.onChange = (editorState) => this.setState({ editorState });
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.onTextStyleButtonClick = this.onTextStyleButtonClick.bind(this)
    this.handleSubmitLink = this.handleKeyCommand.bind(this)
    this.promptForLink = this.promptForLink.bind(this)
    this.handleLinkButtonPressed = this.handleLinkButtonPressed.bind(this)
    this.logState = this.logState.bind(this);
  }

  onTextStyleButtonClick(type) {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, type));
  }

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  promptForLink(e, type) {
    e.preventDefault();
    const { editorState } = this.state;
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      this.setState({
        showURLInputFor: type,
      });
    }
  }

  handleLinkButtonPressed(link) {
    const { editorState } = this.state;
    const contentState = editorState.getCurrentContent();
    let componentType = this.state.showURLInputFor
    const contentStateWithEntity = contentState.createEntity(
      componentType,
      'MUTABLE',
      { url: link }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
    this.setState({
      editorState: RichUtils.toggleLink(
        newEditorState,
        newEditorState.getSelection(),
        entityKey
      ),
      showURLInputFor: false
    });
  }

  applyEntityToSelection(componentType, data) {
    const { editorState } = this.state
    const contentState = editorState.getCurrentContent()
    const contentStateWithEntity = contentState.createEntity(
      componentType,
      'Mutable',
      data
    )
    const newEntityKey = contentStateWithEntity.getLastCreatedEntityKey()
    const contentStateWithHeader = Modifier.applyEntity(
      contentStateWithEntity,
      editorState.getSelection(),
      newEntityKey
    )
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithHeader })
    this.setState({
      editorState: newEditorState
    })
  }

  logState() {
    console.log(this.state.editorState.toJS())
  }

  editorPopUp = (editorType) => {
    this.setState({
      isEditorShowing: true
    })
  }

  handleH1Selection = () => {
    this.applyEntityToSelection(H1)
    this.setState({
      isEditorShowing: false
    })
  }

  render() {
    return (
      <div>
        <button onClick={() => this.onTextStyleButtonClick(BOLD)}>Bold</button>
        <button onClick={() => this.onTextStyleButtonClick(ITALICIZED)}>Italics</button>
        <button onClick={() => this.onTextStyleButtonClick(UNDERLINE)}>Underline</button>
        <button onClick={(e) => this.promptForLink(e, LINK)}>Link</button>
        <button onClick={(e) => this.promptForLink(e, IMG)}>Image</button>
        <button onClick={(e) => this.applyEntityToSelection(H1)}>Header</button>
        <FloatingEditor
          displayEditorPopUp={this.editorPopUp}
        />
        {this.state.showURLInputFor && (
          <LinkPlaceholder
            submitLink={this.handleLinkButtonPressed}
            placeholder="Link to..." />
        )}
        <Editor editorState={this.state.editorState}
          handleKeyCommand={this.handleLinkButtonPressed}
          onChange={this.onChange}
          blockStyleFn={this.myBlockStyleFn} />
        <button onClick={this.logState} >Log State</button>
        {this.state.isEditorShowing && (
          <EditorMenu 
          handleEditorItemSelection={this.handleH1Selection}/>
        )}
      </div>
    );
  }
}

export default MyEditor