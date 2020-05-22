import React, { Component } from 'react'
import '../styles/ProfileStyles.css'
import ProfileEmptyState from '../images/profile.svg'
import PostList from '../containers/PostList'
import { Switch, Route, Redirect } from 'react-router-dom'
import { serviceFactory } from '../services/ServiceFactory'
import ProductList from './ui/Pages/ProductList'
import RecipeList from './ui/Elements/RecipeList'
import AppContext from '../contexts/AppContext'
import ImageConverter from './ui/Elements/ImageUpload'
import StackedFilter from './ui/Elements/StackedFilter'
import { Title1 } from './ui/Elements/Typography'

const postService = serviceFactory.postService()
const productService = serviceFactory.productService()
const recipeService = serviceFactory.recipeService()
const authService = serviceFactory.authenticationService()

class ProfilePage extends Component {

    static contextType = AppContext

    constructor(props) {
        super(props)
        this.state = {
            contentItems: ["posts", "products", "recipes"],
            selectedItem: "posts",
            open: false,
            filterSelection: ["Posts"]
        }
    }

    componentDidMount() {
        const userId = this.props.match.params.userId
        const pathComponents = this.props.location.pathname.split('/')
        const idIndex = pathComponents.indexOf(userId)
        const filterComponents = pathComponents.slice(idIndex + 1).flat(1)
        this.setState({filterSelection: filterComponents})
    }

    options = 
        {"Posts": [
            "Draft",
            "Published"
        ],
        "Recipes": {}
        }


    onFilterSelectionChange = selections => {
        debugger
        const pathComponents = selections.join('/')
        this.props.history.push(`${this.props.match.url}/${pathComponents}`)
        this.setState({filterSelection: selections})
    }

    handleOpen = () => {
        this.setState({ open: true })
    };

    handleClose = () => {
        this.setState({ open: false })
    };

    setSelected = (item) => {
        this.setState({
            selectedItem: item
        })
    }

    authorPredicate = () => {
        const authorId = this.props.match.params.userId
        debugger
        return { author: authorId }
    }

    fetchPosts = () => {
        postService.loadPosts(this.authorPredicate(), ['author'])
            .then(postResponse => {
                this.setState({ posts: postResponse.posts })
            })
    }

    fetchProducts = () => {
        productService.fetchProducts(this.authorPredicate())
            .then(productResponse => {
                this.setState({ products: productResponse.products })
            })
    }

    fetchRecipes = () => {
        recipeService.loadRecipes(this.authorPredicate())
            .then(recipes => {
                this.setState({ recipes })
            })
    }

    filterPosts = (status) => {
        if (!this.state.posts) { return null }
        return this.state.posts.filter(post => post.status.toLowerCase() === status.toLowerCase())
    }

    contentList = () => {
        const postStatusFilter = this.state.filterSelection[1]
        const displayedPosts = postStatusFilter ? this.filterPosts(postStatusFilter) : this.state.posts
        return (
            <Switch>
                <Route exact path={`${this.props.match.path}`} render={props =>
                    <Redirect to={`${this.props.match.url}/posts`} />} />
                <Route path={`${this.props.match.path}/posts`} render={props => {
                    if (!this.state.posts) { this.fetchPosts() }
                    debugger
                    return (
                        <div className="medium-container" style={{ width: "100%" }}>
                            <PostList {...props}
                                posts={displayedPosts || []} />
                        </div>
                    )
                }} />
                <Route path={`${this.props.match.path}/products`} render={props => {
                    if (!this.state.products) { this.fetchProducts() }
                    return (
                        <ProductList
                            products={this.state.products || []}
                        />
                    )
                }} />
                <Route
                    path={`${this.props.match.path}/recipes`}
                    render={props => {
                        if (!this.state.recipes) { this.fetchRecipes() }
                        return (
                            <RecipeList
                                recipes={this.state.recipes || []} />
                        )
                    }} />
            </Switch>
        )
    }

    handleImageUploadCallback = (url) => {
        const updates = { profileImageUrl: url }
        const userId = this.props.match.params.userId
        authService.updateUserInfo(userId, updates)
            .then(user => {
                debugger
                this.context.setCurrentUser(user)
            })
    }

    render() {
        const { currentUser, theme } = this.context
        const avatarStyle = {
            maxWidth: "50%",
            width: "300px"
        }
        return (
            <div className="profile-container standard-spacing-container" style={{ background: theme.background }}>
                <div onClick={this.handleOpen}
                    className="center-container profile-img">
                    <ImageConverter
                        src={currentUser.profileImageUrl}
                        style={avatarStyle}
                        onUpload={this.handleImageUploadCallback}
                    >Profile Photo</ImageConverter>
                </div>
                <div>
                    <Title1>{currentUser.name}</Title1>
                </div>
                <StackedFilter
                    optionTree={this.options}
                    selected={this.state.filterSelection}
                    onChange={this.onFilterSelectionChange}
                />
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
