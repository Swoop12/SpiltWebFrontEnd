import React from 'react';
import FloatingMenu from './FloatingMenu'
import Avatar from './Avatar';
import Controller from '../containers/Controller';
import Select from '../containers/Select'


function ProfileNavLink(props) {
    return (
        <div className="profile-navlink">
            <Controller>
                <Select>
                    <div className="horizontal-container">
                        <Avatar userId={props.userId}
                                imageStyle={{width: "75px"}}/>
                        <p className="centered"
                            style={{marginLeft: "-30px"}}>{props.name}</p>
                    </div>
                </Select>
                <div>
                    <FloatingMenu 
                        logout={props.logout}
                        history={props.history}/>
                </div>
            </Controller>
        </div>
    )
}

export default ProfileNavLink;
