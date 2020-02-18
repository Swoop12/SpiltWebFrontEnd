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
import ProductList from './ui/Pages/ProductList'
import RecipeList from './ui/Elements/RecipeList'
import AppContext from '../contexts/AppContext'
import ImageConverter from './ui/Elements/ImageUpload'

const postService = serviceFactory.postService()
const productService = serviceFactory.productService()
const recipeService = serviceFactory.recipeService()

class ProfilePage extends Component {

    static contextType = AppContext

    constructor(props) {
        super(props)
        this.state = {
            contentItems: ["posts", "shop", "recipes"],
            selectedItem: "posts",
            posts: [],
            open: false
        }
    }

    imageFor(contentType) {
        switch (contentType) {
            case "posts":
                return ArticleImg
            case "shop":
                return CartImg
            case "recipes":
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

    authorPredicate = () => {
        const authorId = this.props.currentUser.id
        return { author: authorId }
    }

    fetchPosts = () => {
        postService.loadPosts(this.authorPredicate())
            .then(posts => {
                this.setState({ posts })
            })
    }

    fetchProducts = () => {
        productService.fetchProducts()
            .then(products => {
                this.setState({ products })
            })
    }

    fetchRecipes = () => {
        recipeService.loadRecipes()
            .then(recipes => {
                this.setState({ recipes })
            })
    }

    contentList = () => {
        return (
            <Switch>
                <Route exact path={`${this.props.match.path}`} render={props =>
                    <Redirect to={`${this.props.match.url}/posts`} />} />
                <Route path={`${this.props.match.path}/posts`} render={props => {
                    this.fetchPosts()
                    return (
                        <PostList {...props}
                            posts={this.state.posts} />
                    )
                }} />
                <Route path={`${this.props.match.path}/shop`} render={props => {
                    this.fetchProducts()
                    return (
                        <ProductList
                            products={this.state.products || []}
                        />
                    )
                }} />
                <Route
                    path={`${this.props.match.path}/recipes`}
                    render={props => {
                        this.fetchRecipes()
                        return (
                            <RecipeList
                                recipes={this.state.recipes || []} />
                        )
                    }} />
            </Switch>
        )
    }

    handleImageUploadCallback = (photo, error) => {
        alert("Image callback")
    }

    render() {
        const { currentUser } = this.context
        const avatarStyle = {
            maxWidth: "50%",
            width: "300px"
        }
        return (
            <div className="profile-container">
                <div onClick={this.handleOpen}
                    className="center-container">
                    <ImageConverter
                        src={currentUser.profileImageUrl}
                        style={avatarStyle}
                        onUpload={this.handleImageUploadCallback}
                    >Profile Photo</ImageConverter>
                </div>
                <div>
                    <h4>{currentUser.name}</h4>
                </div>
                {this.profileIcons()}
                {this.contentList()}
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

export default ProfilePage;
