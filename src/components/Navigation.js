import React from 'react';
import { Route, Link, Switch, NavLink } from "react-router-dom";
import CreatePost from './CreatePost';
import Home from './Home';

class Navigation extends React.Component {
    render() {
        return (
            <div>
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <Link class="navbar-brand" to="/">Spilt Coffee</Link>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav mr-auto">
                            <li class="nav-item">
                                <NavLink exact className="nav-link" to="/">Home</NavLink>
                            </li>
                            <li class="nav-item">
                                <NavLink className="nav-link" to="/shop">Shop</NavLink>
                            </li>
                            <li class="nav-item">
                                <NavLink className="nav-link" to="/brew">Brew</NavLink>
                            </li>
                            <li class="nav-item">
                                <NavLink className="nav-link" to="/posts">Learn</NavLink>
                            </li>
                            <li class="nav-item">
                                <NavLink className="nav-link" to="/roasters">Roasters</NavLink>
                            </li>
                            <li class="nav-item">
                                <NavLink className="nav-link" to="/posts/new">Create Post</NavLink>
                            </li>
                        </ul>
                        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Log In</button>
                        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Sign Up</button>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Navigation;