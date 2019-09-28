import React, { Component } from 'react'
import SpiltLogo from '../images/SpiltLogo.jpg';

class AuthContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: "",
            password: "",
            name: "",
            confirmPassword: ""
        }
        this.onFormValueChange = this.onFormValueChange.bind(this)
    }

    handleFormSubmit = e => {
        e.preventDefault()
        this.props.history.push('/')
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

export default AuthContainer
