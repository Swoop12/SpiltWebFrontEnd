import { LOAD_POSTS, CREATE_POST, DELETE_POST } from '../ActionTypes'

const DEFAULT_STATE = {
    posts: []
}

function PostReducer(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case LOAD_POSTS:
            return {
                posts: action.posts
            }
        case CREATE_POST:
            return {
                posts: [...state.posts, action.post]
            }
        case DELETE_POST:
            return {
                posts: state.posts.filter(post => post.id !== action.id)
            }
        default: return state
    }
}

export default PostReducer