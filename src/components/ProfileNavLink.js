import React, { useContext } from 'react';
import FloatingMenu from './FloatingMenu'
import Controller from '../containers/Controller';
import Select from '../containers/Select'
import AppContext from '../contexts/AppContext';
import { NavItem } from './Navigation';


function ProfileNavLink(props) {
    debugger
    const { currentUser, logout } = useContext(AppContext)
    return (
            <Controller>
                <Select>
                    <div className="nav-itemz">Profile</div>
                </Select>
                <div>
                    <FloatingMenu
                        logout={logout}
                        history={props.history}
                        currentUser={currentUser} />
                </div>
            </Controller>
    )
}

export default ProfileNavLink;
