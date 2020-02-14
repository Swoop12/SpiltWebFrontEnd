import { SET_CURRENT_USER, LOGOUT } from '../ActionTypes'
import { addError, removeError } from './ErrorActions'
import { serviceFactory } from '../../services/ServiceFactory'

const authService = serviceFactory.authenticationService()

export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    }
}

export function loginUser(userData) {
    console.log("USERDATA", userData)
    return (dispatch) => {
        const {email, password} = userData
        return authService.loginUser(email, password)
        .then(user => {
            dispatch(removeError())
            dispatch(setCurrentUser(user))
            return user
        }).catch(error => {
            dispatch(addError(error.message))
            throw error
        })
    }
}

export function signUpUser(userData) {
    return (dispatch) => {
        const {email, name, password, confirmPassword} = userData
        return authService.signUpUser(email, name, password, confirmPassword)
        .then(user => {
            dispatch(removeError())
            dispatch(setCurrentUser(user))
            return user
        }).catch(error => {
            dispatch(addError(error.message))
            throw error
        })
    }
}

export function logout() {
    return dispatch => {
        authService.setTokenHeader(false)
        dispatch({
            type: LOGOUT
        })
    }
}