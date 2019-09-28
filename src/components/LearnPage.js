import React from 'react';
import FeaturedContent from './FeaturedContent';
import PostCard from '../components/PostCard'
import SectionHeader from '../components/SectionHeader'
// import PostService from '../services/PostService';
import { serviceFactory } from '../services/ServiceFactory';

class LearnPage extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            posts : []
        }
    }

    componentDidMount() {
        this.loadPosts()
    }

    loadPosts(){
        let postService = serviceFactory.postService()
        postService.fetchPosts()
        .then((posts) => {
            if(typeof posts === "undefined") { return }
            this.setState({
                posts : posts
            })
        }).catch(function(error){
            alert(error)
        })
    }

    render() {
        let posts = this.state.posts
        if(posts.length === 0 || typeof posts === "undefined") { return <h1>Loading...</h1> }
        var featurePost;
        let postCards = posts.map((post) => {
            featurePost = post
            return (
            <li key={post._id} style={{listStyleType: "none"}}>
                <PostCard post={post} />
            </li>
            )
        })

        return (
            <div>
                <div class="row">
                    <div className="col-sm-12 content-card">
                        <FeaturedContent post={featurePost} />
                    </div>
                </div>
                <SectionHeader />
                <ol>{postCards}</ol>
            </div>
        );
    }    
}

export default LearnPage