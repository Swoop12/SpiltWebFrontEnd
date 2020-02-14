import { ADD_ERROR, REMOVE_ERROR } from '../ActionTypes'

export function addError(error) {
    return {
        type: ADD_ERROR,
        error
    }
}

export function removeError(){
    return {
        type: REMOVE_ERROR
    }
}

export function getError() {
    return {
        type: "GET_ERROR"
    }
}