import rootReducer from './reducers/RootReducer'
import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

export function configureStore() {
    const store = createStore(rootReducer,
        compose(applyMiddleware(thunk),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    )
    return store
}
