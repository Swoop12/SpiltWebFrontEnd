import jwtDecode from 'jwt-decode'
import NetworkingService from './NetworkingService'

class AuthenticationService {

    constructor(messageService, networkingService, tokenDecoder = jwtDecode) {
        this.messageService = messageService
        this.networkingService = networkingService || new NetworkingService()
        this.tokenDecoder = tokenDecoder
    }

    loginUser(email, password) { 
        return this.networkingService.networkCall("post","auth/signin",{email, password})
        .then(({ token, ...user }) => {
            this.setTokenHeader(token)
            return user
        }).catch(error => {
            throw error
        })
    }

    signUpUser = (email, name, password, confirmPassword) => {
            if (password !== confirmPassword) { throw Error("Password do not match") }
            return this.networkingService.networkCall("post",'auth/signup',{ email, name, password })
            .then(({ token, ...user }) => {
                this.setTokenHeader(token)
                return user
            }).catch(error => {
                throw error
            })
    }

    logout = () => {
        localStorage.setItem('jwtToken', null)
        this.networkingService.setTokenHeader(null)
    }

    setTokenHeader = (token) => {
        localStorage.setItem("jwtToken", token)
        this.networkingService.setTokenHeader(token)
    }

    loadUserFromLocalStorageToken = () => {
        const jwtToken = localStorage.jwtToken
        if (jwtToken && jwtToken !== "false") {
            this.setTokenHeader(jwtToken)
            const decodedUser = this.tokenDecoder(jwtToken)
            return decodedUser
        }
    }

    updateUserInfo = (updates) => {
        return this.networkingService.networkCall('put')
    }
}

export default AuthenticationService;
