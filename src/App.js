import React, { Component } from 'react';
import './App.css';
import SpiltRouter from './routes/SpiltRouter';
import { BrowserRouter as Router } from "react-router-dom";
import { serviceFactory } from './services/ServiceFactory'
import AppContext from './contexts/AppContext';
import { themes } from './components/ui/Elements/Theme'

const authService = serviceFactory.authenticationService()
const userFromLocalStorage = authService.loadUserFromLocalStorageToken()

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      theme: themes.light,
      toggleTheme: this.toggleTheme,
      currentUser: userFromLocalStorage,
      setCurrentUser: this.setCurrentUser,
      errorService: serviceFactory.errorService(),
      logout: this.logout,
      login: this.login
    }
  }

  toggleTheme = () => {
    const newTheme = this.state.theme === themes.light ? themes.dark : themes.light
    this.setState({
      theme: newTheme
    })
  }

  setCurrentUser = user => {
    const userId = user.id || user._id
    const currentUser = { ...user, id: userId, _id: userId }
    this.setState({ currentUser: currentUser })
  }

  login = (email, password) => {
    return authService.loginUser(email, password)
      .then(user => {
        this.setCurrentUser(user)
        return user
      })
  }

  logout = () => {
    authService.logout()
    this.setState({ currentUser: null })
  }

  render() {
    return (
      <AppContext.Provider value={this.state}>
        <Router>
          <div>
            <SpiltRouter />
          </div>
        </Router>
      </AppContext.Provider>

    );
  }
}

export default App;
