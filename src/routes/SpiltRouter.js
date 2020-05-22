import Home from "../components/ui/Pages/Home";
import React, { Component } from "react";
import { BrowserRouter, Route, Switch, withRouter, Link, Redirect } from "react-router-dom";
import CreatePost from "../components/CreatePost";
import Navigation from '../components/Navigation'
import LearnPage from '../components/ui/Pages/LearnPage'
import AuthPage from "../containers/AuthPage";
import UserMessage from "../components/UserMessage";
import ProfilePage from "../components/ProfilePage";
import PostDetail from "../components/PostDetail";
import About from '../components/About'
import UIDemo from "../components/ui/UIDemo";
import Brew from "../components/ui/Pages/Brew";
import AppContext from '../contexts/AppContext';
import BrewNew from "../components/ui/Pages/BrewNew";
import Shop from '../components/ui/Pages/Shop'
import ShopDetail from "../components/ui/Pages/ShopDetail";
import ShopTemplate from "../components/ui/Pages/ShopNew";
import BrewDetail from "../components/ui/Pages/BrewDetail";
import NotFoundPage from "../components/NotFoundPage";

class SpiltRouter extends Component {

    static contextType = AppContext

    render() {
        const userMessage = (errorMessage) => {
            if (errorMessage) {
                return <UserMessage error={errorMessage} />
            }
        }

        console.log("SPILT ROUTER PROPS", this.props)
        const { signUpUser, loginUser, error } = this.props
        return (
            <BrowserRouter>
                <Route path="/"
                    render={props => {
                        console.log(props)
                        debugger
                        if (!props.location.pathname.includes("signin") && !props.location.pathname.includes("signup")) {
                            return (<Navigation {...props} currentPath={props.location.pathname} />)
                        }
                    }
                    } />
                <Switch>
                    <Route exact path="/signup"
                        render={props => <AuthPage {...props}
                            signIn={false}
                            signUpUser={signUpUser} />} />
                    <Route exact path="/signin"
                        {...this.props}
                        render={props => <AuthPage {...props}
                            signIn={true}
                            loginUser={loginUser} />} />
                    <Route exact path="/" >
                        <Redirect to="/posts" />
                    </Route>

                    <Route exact path="/shop"
                        render={props => {
                            return (<Shop {...props} />)
                        }} />
                    <Route exact path="/shop/new"
                        render={props => {
                            return (<ShopTemplate {...props} />)
                        }} />
                    <Route exact path="/shop/:id"
                        render={props => {
                            return (<ShopDetail {...props} />)
                        }} />
                    <Route exact path="/shop/:id/edit"
                        render={props => {
                            return (<ShopTemplate {...props} />)
                        }} />

                    <Route exact path="/brew"
                        render={props => {
                            return (<Brew {...props} />)
                        }} />
                    <Route path={"/brew/new"}
                        render={props => {
                            if (!this.context.currentUser) { return <Redirect to={{ pathname: "/signin", from: props.location }} /> }
                            return (<BrewNew {...props} />)
                        }} />
                    <Route exact path="/brew/:recipeId"
                        render={props => {
                            return (<BrewDetail {...props} />)
                        }} />
                    <Route path="/posts/:id/edit"
                        render={props => {
                            if (!this.context.currentUser) { return <Redirect to={{ pathname: "/signin", from: props.location }} /> }
                            return (<CreatePost edit={true} {...props} />)
                        }} />
                    <Route path="/posts/new"
                        render={props => <CreatePost {...props} />} />
                    <Route exact path="/posts"
                        component={LearnPage} />
                    <Route path="/posts/:id"
                        render={props => {
                            console.log("PROPS FOR POST DETAIL", props)
                            return (<PostDetail {...props} />)
                        }} />
                    <Route path={`/profile/:userId`} component={ProfilePage} />
                    <Route path="/about"
                        render={props => {
                            return (<About {...props} />)
                        }} />
                    <Route path="/ui"
                        render={props => {
                            return (<UIDemo {...props} />)
                        }} />
                    <Route path="/">
                        <NotFoundPage />
                    </Route>
                </Switch>
            </BrowserRouter>
        )
    }

}

export default SpiltRouter;