import React from 'react';
import FeaturedContent from '../components/FeaturedContent';
import { serviceFactory } from '../../../services/ServiceFactory';
import PostList from '../../../containers/PostList';
import SectionHeader from '../Elements/SectionHeader';
import Spinner from 'react-spinkit'
import AppContext from '../../../contexts/AppContext';
import { CreateButton } from '../Elements/Buttons';

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
        const query = { status: "published" }
        this.setState({ loading: true })
        serviceFactory.postService().loadPosts(query)
            .then(posts => {
                this.setState({
                    posts,
                    loading: false
                })
            })
    }

    render() {
        if (this.state.loading) {
            return <Spinner name='chasing-dots' />
        } else {
            return (
                <div style={{ backgroundColor: this.context.theme.background }}>
                    <FeaturedContent />
                    <SectionHeader>Recent Posts</SectionHeader>
                    <div className="light-container">
                        <PostList posts={this.state.posts} />
                    </div>
                    <CreateButton
                        link={"/posts/new"}
                        style={{
                            position: "fixed",
                            left: "90vw",
                            bottom: "32px"
                        }} />
                </div>
            )
        }
    }
}

export default LearnPage;