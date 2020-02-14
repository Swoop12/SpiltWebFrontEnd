import {SET_CURRENT_USER, LOGOUT } from '../ActionTypes'

const DEFAULT_STATE = {
    isAuthenticated: false, // true when the logged in.
    user: {} // all the user info when logged in
}

const userReducer = function(state = DEFAULT_STATE, action) {
    switch(action.type){
        case SET_CURRENT_USER:
        return {
            isAuthenticated: !!Object.keys(action.user).length,
            user: action.user
        };
        case LOGOUT:
        return {
            isAuthenticated: false,
            user: {}
        }
        default:
        return state
    }
}

export default userReducer