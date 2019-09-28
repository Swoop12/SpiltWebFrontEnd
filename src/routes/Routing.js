import Home from "../components/Home";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CreatePost from "../components/CreatePost";
import Navigation from '../components/Navigation'
import LearnPage from '../components/LearnPage'
import AuthPage from "../containers/AuthPage";

function SpiltRouter(props) {
    return (
        <BrowserRouter>
            <Navigation />
            <Switch>
                <Route exact path="/signup" render={props => <AuthPage {...props} signIn={false} />} />
                <Route exact path="/signin" render={props => <AuthPage {...props} signIn={true} />} />
                <Route exact path="/" component={Home} />
                <Route path="/posts/new" render={props => <CreatePost {...props} />} />
                <Route path="/posts" component={LearnPage} />
            </Switch>
        </BrowserRouter>
    )
}

export { SpiltRouter };