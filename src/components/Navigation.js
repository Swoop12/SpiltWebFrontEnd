import React, { useContext } from 'react';
import { NavLink } from "react-router-dom";
import ProfileNavLink from './ProfileNavLink'
import AppContext from '../contexts/AppContext';
import { InternalLink } from './ui/Elements/Typography';

function NavItem(props) {

    const { theme } = useContext(AppContext)
    const color = props.isSelected ? theme.primary : theme.text
    const backgroundColor = props.isSelected ? theme.background : theme.foreground
    return (
        <InternalLink
            to={props.to}
            style={{
                display: 'flex',
                color: color,
                background: backgroundColor
            }}
        >
            <div className="nav-itemz">{props.children}</div>
        </InternalLink>
    )
}

class Navigation extends React.Component {

    static contextType = AppContext

    navItemModels = [
        { link: '/', text: 'Generic Coffee' },
        { link: 'posts', text: 'Learn' },
        { link: 'shop', text: 'Shop' },
        { link: 'brew', text: 'Brew' },
        { link: 'about', text: 'About' },
    ]

    navItems = () => {
        return this.navItemModels.map(model => {
            var isSelected = this.props.currentPath.includes(model.link)
            if(model.link === "/") {
                isSelected = this.props.currentPath === model.link
            }
            debugger
            return (
                <NavItem to={model.link} isSelected={isSelected}>
                    {model.text}
                </NavItem>
            )
        })
    }

    render() {
        let rightNavItems = () => {
            const { currentUser } = this.context
            if (currentUser) {
                return ([
                    <NavLink className="outline-button nav-right-btn" to="/posts/new">Create Post</NavLink>,
                    <ProfileNavLink
                        userId={currentUser.id}
                        name={currentUser.name}
                        logout={this.props.logout}
                        history={this.props.history} />
                ])

            } else {
                return (
                    [<NavLink className="outline-button nav-right-btn" to="/signin">Log In</NavLink>,
                    <NavLink className="outline-button nav-right-btn" to="/signup">Sign Up</NavLink>]
                )
            }
        }

        const theme = this.context.theme

        return (
            <div
                className="flexer"
                style={{
                    background: theme.foreground,
                    color: theme.text,
                    height: '75px'
                }}>
                {this.navItems()}
                {/*             
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
                                <NavLink className="nav-link" to="/about">About</NavLink>
                            </li>
                        </ul>
                        {rightNavItems()} */}
                {/* </div>
                </nav> */}
            </div>
        )
    }
}

export default Navigation;