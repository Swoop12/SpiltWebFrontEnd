import React, { Component } from 'react'
import SpiltLogo from '../images/SpiltLogo.jpg';
import { serviceFactory } from '../services/ServiceFactory';
import AppContext from '../contexts/AppContext';

class AuthForm extends Component {

    static contextType = AppContext

    constructor(props) {
        super(props)

        this.state = {
            email: "",
            password: "",
            name: "",
            confirmPassword: ""
        }
        this.authService = serviceFactory.authenticationService()
        this.onFormValueChange = this.onFormValueChange.bind(this)
    }

    handleFormSubmit = e => {
        e.preventDefault()
        console.log("ATUHFORM PROPS", this.props)
        console.log("ATUHFORM State", this.state)
        const { email, password, name, confirmPassword } = this.state
        if (this.props.signIn) {
            this.authService.loginUser(email, password)
                .then(user => {
                    this.context.setCurrentUser(user)
                    this.props.history.push('/')
                })
        } else {
            this.authService.signUpUser(email, name, password, confirmPassword)
                .then(user => {
                    this.context.setCurrentUser(user)
                    this.props.history.push('/')
                })
        }
    }

    onFormValueChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    emailInput() {
        return (
            <input type="email"
                className="text-input"
                name="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.onFormValueChange}
            />)
    }

    passwordInput() {
        return (
            <input type="password"
                className="text-input"
                name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.onFormValueChange} />
        )
    }

    confirmPasswordInput() {
        return (
            <input type="password"
                name="confirmPassword"
                className="text-input"
                placeholder="Confirm Password"
                value={this.state.confirmPassword}
                onChange={this.onFormValueChange} />
        )
    }

    nameInput() {
        return (
            <input type="text"
                className="text-input"
                name="name"
                placeholder="Full Name"
                value={this.state.name}
                onChange={this.onFormValueChange} />
        )
    }

    signUpInputs() {
        return (
            [this.emailInput(),
            this.nameInput(),
            this.passwordInput(),
            this.confirmPasswordInput()]
        )
    }

    signInInputs() {
        return (
            [this.emailInput(),
            this.passwordInput()]
        )
    }

    onSignIn = () => {
        const { email, password } = this.state
        this.authenticationService.loginUser(email, password)
            .then()
            .catch()
    }

    render() {
        return (
            <div className="auth-container content-card">
                <img className="logo-image"
                    src={SpiltLogo}
                    alt="Spilt.Coffee Logo" />
                <form className="auth-form"
                    onSubmit={this.handleFormSubmit}>
                    {this.props.signIn ? this.signInInputs() : this.signUpInputs()}
                    <button className="outline-button">
                        {this.props.signIn ? "Sign In" : "Sign Up"}
                    </button>
                </form>
            </div>
        )
    }
}

export default AuthForm;
