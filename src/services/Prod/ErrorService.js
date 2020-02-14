

class ErrorService {
    
    errors = []

    addError = (error) => {
        console.log("Pushing Error:", error)
        const trackedError = error.message || error
        this.errors.push(trackedError)
    }

    currentError = () => {
        const error = this.errors.pop()
        console.log("Popping Error:", error)
        return error
    }
}

export default ErrorService
