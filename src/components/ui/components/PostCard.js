import React from 'react';
import PostCardPlaceholder from '../../Placeholders/PostCardPlaceholder';
import ImageView from '../Elements/ImageView';
import Card from '../Elements/Card';
import { Subhead, Title1, Body, InternalLink } from '../Elements/Typography';
import '../../ui/Elements/Typography.css'
import AppContext from '../../../contexts/AppContext';

class PostCard extends React.Component {

    static contextType = AppContext

    static defaultProps = {
        post: {
            id: "123456",
            title: "Welcome to Spilt.Coffee",
            subtitle: "A Coffee App for Coffee People",
            bodyText: "We like coffee.  We hope you do too.",
            date: 'January 4th, 2020',
            isFeatured: true,
            coverPhotoUrl: "https://cdn.cnn.com/cnnnext/dam/assets/150929101049-black-coffee-stock-super-tease.jpg",
            author: {
                name: "Patrick Adcock",
                _id: "3519Z"
            }
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            post: false
        }
    }

    componentDidMount() {
        const { post } = this.props
        if (post) {
            this.setState({ post })
        } else if (this.props.postPromise) {
            this.props.postPromise
                .then(post => this.setState({ post }))
        }
    }

    render() {

        const post = this.state.post
        if (!post) {
            return <PostCardPlaceholder />
        }
        const date = new Date(post.date)
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        debugger
        return (
            <InternalLink to={`/posts/${post._id}`}>
                <Card className="horizontal-container space-between"
                    style={{
                        padding: '0',
                        margin: '0'
                    }}>
                    <div className="flexer"
                        style={{ width: "100%" }}>
                        {(post.coverPhotoUrl.length > 1) && (
                            <img
                                className="post-card-image img-fluid"
                                src={post.coverPhotoUrl}
                                alt={post.title}
                            />)}
                        <div className="vertical-container text-group"
                            style={{
                                margin: 'auto 0',
                                padding: '8px 16px',
                                textAlign: 'left',
                                alignItems: 'flexStart'
                            }}>
                            <Title1>{post.title}</Title1>
                            <Subhead>
                                {date.toLocaleDateString('en-US', options)}
                            </Subhead>
                            <InternalLink to={`roasters/${post.author._id}`}>
                                <Body
                                    style={{color: this.context.theme.primary}}
                                >{post.author.name}</Body>
                            </InternalLink>
                        </div>
                    </div >
                </Card >
            </InternalLink >
        )
    }
}

export default PostCard;