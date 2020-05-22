import React from 'react';
import PostService from '../services/Prod/PostService';
import QuillEditor from './QuillEditor'
import { serviceFactory } from '../services/ServiceFactory'
import AppContext from '../contexts/AppContext'
import Saving from './ui/Elements/Previews/Saving';
import ImageConverter from './ui/Elements/ImageUpload';

class CreatePost extends React.Component {

  postService = serviceFactory.postService()

  static contextType = AppContext

  constructor(props) {
    super(props);
    this.state = {
      title: "",
      coverArt: false,
      lastSavedContent: {},
      saving: "Unsaved",
      edit: this.props.edit || false,
      delta: null,
      selection: null
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.quillRef = React.createRef()
  }

  componentDidMount = () => {
    this.quillEditor = this.quillRef.current
    if (this.props.edit) {
      this.fetchPostToEdit()
        .then(() => {
          this.beginPeriodicSave()
        })
    } else {
      this.saveInitialPost().then(() => {
        this.beginPeriodicSave()
      })
    }
  }

  componentWillUnmount = () => {
    clearInterval(this.state.savingIntervalId)
  }

  beginPeriodicSave = () => {
    let savingIntervalId = setInterval(() => {
      this.onPeriodicSave()
    }, 10000)
    this.setState({ savingIntervalId })
  }

  fetchPostToEdit = () => {
    const postId = this.props.match.params.id
    return this.postService.fetchPostWithId(postId, ["author", "content"])
      .then(post => {
        debugger
        this.setContent(post.content.body)
        this.setState({
          ...post,
          contentId: post.content._id,
        })
      })
  }

  setContent = contentBody => {
    let formattedOps = this.postService.formatOps(contentBody)
    this.quillEditor.setContent(formattedOps)
  }

  saveInitialPost = () => {
    const initialContent = this.state.delta
    const authorId = this.context.currentUser.id
    return this.postService.createPost("Untitled", "", authorId, initialContent)
      .then(post => {
        this.props.history.replace(`${post._id}/edit`, "Draft Post")
        debugger
        this.setState({
          ...post,
          edit: true,
          contentId: post.content,
          content: {}
        })
      }).catch(error => {
        console.log(error)
        alert("Something went wrong... This is awkward")
      })
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      saving: "Unsaved"
    });
  }

  onPeriodicSave = (content) => {
    if (!this) { return }
    this.setState({ saving: "Saving..." })
    this.savePost().then(promiseReturnArray => {
      let [post, contentReturn] = promiseReturnArray
      debugger
      this.setState({
        lastSavedContent: contentReturn.content.body,
        saving: "Saved"
      })
    })
  }

  onEditorTextEdit = () => {
    this.setState({ saving: "Unsaved" })
  }

  savePost = () => {
    debugger
    const content = this.quillEditor.getContent()
    const contentId = this.state.contentId
    const postId = this.state._id
    let updatedTitle = { title: this.state.title }
    let titlePromise = this.postService.updatePost(postId, updatedTitle)
    let contentPromise = this.postService.updateContent(contentId, content)
    return Promise.all([titlePromise, contentPromise])
  }

  handleImageInsert = (event) => {
    const file = event.target.files[0]
    return serviceFactory.fileUploadService().uploadPhoto(file)
  }

  coverArtUploadCallback = (url) => {
    this.setState({
      coverPhotoUrl: url
    })
  }

  handlePublish = () => {
    const { title, coverPhotoUrl } = this.state
    if (title.length < 1) {
      alert("Your post must have a title")
      return
    }

    const content = this.quillEditor.getContent()
    if (content.ops.length < 2) {
      alert("Your post must have a some content")
      return
    }

    if (coverPhotoUrl.length < 1) {
      alert("This post must have cover art")
      return
    }

    const id = this.state._id
    var postUpdates = {
      title,
      coverPhotoUrl: this.state.coverPhotoUrl,
      status: 'published'
    }

    this.postService.updatePost(id, postUpdates).then(() => {
      this.props.history.push('/posts')
    })
  }

  titleValue = () => {
    return this.state.title === "Untitled" ? "" : this.state.title
  }

  render() {
    if (this.state.isLoading === true) { return <h1>Loading...</h1> }
    return (
      <div
        className="medium-container full-canvas"
        style={{
          color: this.context.theme.text,
          backgroundColor: this.context.theme.background
        }}
      >
        <input type="text"
          placeholder="Your Title"
          name="title"
          className='editor-input'
          value={this.titleValue()}
          onChange={this.handleInputChange}
          style={{ color: this.context.theme.text }} />
        <div style={{ width: "100%" }}>
          <ImageConverter
            onUpload={this.coverArtUploadCallback}
            src={this.state.coverPhotoUrl}
          >
            Cover Photo Upload
        </ImageConverter>
        </div>
        <QuillEditor
          handleImageInsert={this.handleImageInsert}
          onTextEdit={this.onEditorTextEdit}
          ref={this.quillRef}
        />
        <div className="container-center">
          <button id="publish-button"
            className="outline-button"
            onClick={this.handlePublish}>
            Publish
          </button>
          <Saving
            saving={this.state.saving}
            onClick={this.onPeriodicSave}
            style={{
              position: "absolute",
              bottom: '8px',
              right: '8px'
            }}
          />
        </div>
      </div>
    );
  }
}

export default CreatePost;