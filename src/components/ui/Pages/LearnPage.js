import React from 'react';
import FeaturedContent from '../components/FeaturedContent';
import { serviceFactory } from '../../../services/ServiceFactory';
import PostList from '../../../containers/PostList';
import SectionHeader from '../Elements/SectionHeader';
import Spinner from 'react-spinkit'
import AppContext from '../../../contexts/AppContext';
import { CreateButton } from '../Elements/Buttons';
import { Button, message } from 'antd';
import { EditOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons"


class LearnPage extends React.Component {

    static contextType = AppContext

    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            posts: []
        }
    }

    componentDidMount = () => {
        const query = { status: "published", featured: "true" }
        this.setState({ loading: true })
        serviceFactory.postService().loadPosts(query)
            .then(postResponse => {
                this.setState({
                    featured: postResponse.featured,
                    posts: postResponse.posts,
                    loading: false
                })
            }).catch(error => {
                message.error("Whoops Something went wrong fetching these posts")
            })
    }

    featured = () => {
        if (this.state.featured) {
            return <FeaturedContent post={this.state.featured} />
        }
    }

    render() {
        if (this.state.loading) {
            return <Spinner name='chasing-dots' />
        } else {
            return (
                <div style={{ backgroundColor: this.context.theme.background }}>
                    {this.featured()}
                    <SectionHeader>Recent Posts</SectionHeader>
                    <div className="light-container">
                        <PostList posts={this.state.posts} />
                    </div>
                    {this.context.currentUser && (<CreateButton
                        link={"/posts/new"}
                        style={{
                            position: "fixed",
                            right: "32px",
                            bottom: "32px"
                        }} />
                    )}
                </div>
            )
        }
    }
}

export default LearnPage;