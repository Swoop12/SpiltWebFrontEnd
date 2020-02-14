import React from 'react'

const AppContext = React.createContext({
    currentUser: {},
    setCurrentUser: () => {},
    theme: {},
    toggleTheme: () => {},
    errorService: {},
    setErrorService: () => {}
})

export default AppContext;