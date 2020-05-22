import React from 'react';
import QuillEditor from './QuillEditor'
import { EditButton } from './ui/Elements/Buttons';
import { serviceFactory } from '../services/ServiceFactory';
import ImageView from './ui/Elements/ImageView';
import AppContext from '../contexts/AppContext';
import Spinner from 'react-spinkit';
import '../styles/TextEditor.css'

class PostDetail extends React.Component {

    static contextType = AppContext

    postService = serviceFactory.postService()

    constructor(props) {
        super(props)
        if (props.post) {
            this.state = { post: props.post }
        } else {
            this.state = {}
        }
    }

    componentDidMount = () => {
        const postId = this.props.match.params.id
        this.postService.fetchPostWithId(postId, ["author", "content"])
            .then(post => {
                this.setState({ post })
            })
    }

    render() {
        if (!this.state.post) {
            return (
                <div className="container-center">
                    <Spinner name='chasing-dots' />
                </div>
            )
        }
        const { title, content, coverPhotoUrl } = this.state.post
        const formattedContent = this.postService.formatOps(content.body)

        const editButton = () => {
            const user = this.context.currentUser
            const post = this.state.post
            debugger
            if (!user || !post) { return }
            if (user.id === post.author._id) {
                return (<EditButton
                    link={this.props.match.url + "/edit"}
                    style={{
                        position: "fixed",
                        left: "90vw",
                        bottom: "32px"
                    }} />)
            }
        }

        return (
            <div style={{
                textAlign: "center",
                background: this.context.theme.background,
                color: this.context.theme.text
            }}>
                <h1>{title}</h1>
                <hr style={{ backgroundColor: this.context.theme.text }} />
                <ImageView
                    src={coverPhotoUrl}
                    style={{
                        height: '200px'
                    }}
                />
                <div id="quill-reader" className="container quill-reader">
                    <QuillEditor
                        readonly={true}
                        content={formattedContent}
                    />
                </div>
                {editButton()}
            </div>
        )
    }
}

export default PostDetail;
