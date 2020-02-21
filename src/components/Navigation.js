import React, { useContext } from 'react';
import { NavLink } from "react-router-dom";
import ProfileNavLink from './ProfileNavLink'
import AppContext from '../contexts/AppContext';
import { InternalLink } from './ui/Elements/Typography';

export function NavItem(props) {

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
        { link: '/posts', text: 'Learn' },
        { link: '/shop', text: 'Shop' },
        { link: '/brew', text: 'Brew' },
        { link: '/about', text: 'About' },
    ]


    navItems = () => {
        return this.navItemModels.map(model => {
            var isSelected = this.props.currentPath.includes(model.link)
            const { currentPath } = this.props
            if (this.context.currentUser && currentPath.includes(`profile/${this.context.currentUser.id}`)) {
                isSelected = false
            } else if (model.link === "/") {
                isSelected = currentPath === model.link
            }
            return (
                <NavItem to={model.link}
                    isSelected={isSelected}>
                    {model.text}
                </NavItem>
            )
        })
    }

    render() {
        let rightNavItems = () => {
            const { currentUser } = this.context
            if (currentUser) {
                return (
                    <div style={{
                        marginRight: '16px',
                        cursor: 'default'
                    }}>
                        <ProfileNavLink
                            currentUser={currentUser}
                        />
                    </div>
                )
            } else {
                return (
                    [<NavItem to="/signin">Log In</NavItem>,
                    <NavItem to="/signup">Sign Up</NavItem>]
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
                    height: '75px',
                    justifyContent: 'space-between'
                }}>
                <div className="flexer">
                    {this.navItems()}
                </div>
                <div className="flexer">
                    {rightNavItems()}
                </div>
            </div>
        )
    }
}

export default Navigation;