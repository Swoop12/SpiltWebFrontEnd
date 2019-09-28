import React from 'react';
import PostService from '../services/PostService';
import { Redirect } from 'react-router-dom';
import Canvas from './Draft-js/Canvas'

class CreatePost extends React.Component {

  postService = new PostService()
  blankState = {
    title: '',
    imageUrl: '',
    content: '',
    isLoading: false,
    isEditorShowing: false,
  }

  constructor(props) {
    super(props);
    this.state = this.blankState

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSubmit(event) {
    const state = this.state;
    this.setState({ isLoading: true })
    this.postService.addPost(state.title, state.content, state.imageUrl, 0)
      .then(() => {
        this.setState(this.blankState)
        return <Redirect exact="true" to="/" />
      }).catch((error) => {
        alert(error)
      })
    event.preventDefault();
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    if (this.state.isLoading === true) { return <h1>Loading...</h1> }
    return (
      <div className="container full-canvas">
        <Canvas />
        {/* <MyEditor /> */}
        
        {/* <h1 className="page-header">Add a New Post</h1>
        <Canvas />
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input type="text"
              name="title"
              onChange={this.handleInputChange}
              placeholder="Title" />
          </div>
          <hr></hr>
          <div class="form-group">
            <textarea class="textarea-input"
              name="content"
              onChange={this.handleInputChange}
              placeholder="Your Content Goes Here (:" />
          </div>
          <input class="btn btn-lrg solid-button"
            type="submit"
            value="Submit" />
        </form> */}
      </div>
    );
  }
}

export default CreatePost;