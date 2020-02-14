import React, { Component } from 'react'
import '../styles/ProfileStyles.css'
import ProfileEmptyState from '../images/profile.svg'
import ArticleImg from '../images/article.svg'
import CartImg from '../images/cart.svg'
import ShopImg from '../images/shop.svg'
import Avatar from './Avatar'
import PostList from '../containers/PostList'
import { Switch, Link, Route, Redirect } from 'react-router-dom'
import { serviceFactory } from '../services/ServiceFactory'
import Modal from '@material-ui/core/Modal';
import UploadImagePopup from '../containers/UploadImagePopup'

const postService = serviceFactory.postService()

class ProfilePage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            contentItems: ["posts", "shop", "locations"],
            selectedItem: "posts",
            open: false
        }
    }

    imageFor(contentType) {
        switch (contentType) {
            case "posts":
                return ArticleImg
            case "shop":
                return CartImg
            case "locations":
                return ShopImg
            default:
                return null
        }
    }

    handleOpen = () => {
        this.setState({ open: true })
    };

    handleClose = () => {
        this.setState({ open: false })
    };

    profileIcons() {
        let contentImages = this.state.contentItems.map((contentType) => {
            var style
            console.dir(this.props)
            if (contentType === this.state.selectedItem) {
                style = { fill: "#5D8277 !important" }
                console.log(style)
            }
            return (
                <Link to={`${this.props.match.url}/${contentType}`}>
                    <img
                        src={this.imageFor(contentType)}
                        alt={contentType}
                        className="icon-button"
                        style={style}
                        onClick={() => this.setSelected(contentType)} />
                </Link>
            )
        })
        return (
            <div className="horizontal-container space-even profile-icons">
                {contentImages}
            </div>
        )
    }

    setSelected = (item) => {
        this.setState({
            selectedItem: item
        })
    }

    postPromise = () => {
        const authorId = this.props.currentUser.user.id
        const authorPredicate = { author: authorId }
        return postService.loadPosts(authorPredicate)
    }

    contentList = () => {
        return (
            <Switch>
                <Route exact path={`${this.props.match.path}`} render={props =>
                    <Redirect to={`${this.props.match.path}/posts`} />} />
                <Route path={`${this.props.match.path}/posts`} render={props => {
                    return (
                        <div style={{ width: '90%' }}>
                            <PostList {...props}
                                posts={this.postPromise()} />
                        </div>
                    )
                }} />
                <Route path={`${this.props.match.path}/shop`} render={props => <PostList />} />
                <Route path={`${this.props.match.path}/locations`} render={props => <PostList />} />
            </Switch>
        )
    }

    handleImageUploadCallback = (photo, error) => {
        alert("Image callback")
    }

    render() {
        const { currentUser } = this.props
        const avatarStyle = {
            maxWidth: "50%",
        }
        return (
            <div className="profile-container">
                <div onClick={this.handleOpen}
                    className="center-container">
                    <Avatar userId={currentUser.user.id}
                            imageStyle={avatarStyle} />
                </div>
                <div>
                    <h4>{currentUser.name}</h4>
                </div>
                {this.profileIcons()}
                {this.contentList()}
                <Modal
                    open={this.state.open}
                    onClose={this.handleClose}>
                    <UploadImagePopup 
                        onUploadCallback={this.handleImageUploadCallback}
                        uploadId={this.props.currentUser.user.id}
                        onCancel={this.handleClose}/>
                </Modal>
            </div>
        )
    }
}

ProfilePage.defaultProps = {
    currentUser: {
        name: "Steve Wazniak",
        profileImageUrl: ProfileEmptyState,
        posts: [],
        products: [],
        shops: []
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser
    }
}

const mapDispatchToProps = {
    fetchPosts: postService.fetchPosts
}

export default ProfilePage;
