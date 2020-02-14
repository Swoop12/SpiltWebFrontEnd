import { combineReducers } from 'redux'
import UserReducer from './UserReducer'
import ErrorReducer from './ErrorReducer'
import PostReducer from './PostReducer'

const RootReducer = combineReducers({
    currentUser: UserReducer,
    error: ErrorReducer,
    posts: PostReducer
})

export default RootReducer