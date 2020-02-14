
class UserMessageService {

    _currentError = null
    _successMessage = null

    currentMessage() {
        if(!this._successMessage && !this._currentError) { return null }
        return {
            success: this._successMessage,
            error: this._currentError
        }
    }

    setCurrentError(error) {
        this._successMessage = null
        this._currentError = error
    }

    setSuccessMessage(message) {
        this._currentError = null
        this._successMessage = message
    }

    resetUserMessages() {
        this._currentError = null
        this._successMessage = null
    }
}

export default UserMessageService;