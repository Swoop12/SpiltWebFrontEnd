import React from 'react'
import ReactDOM from 'react-dom'

class Controller extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            style: {
                position: "absolute",
                top: 0,
                left: 0,
            }
        }
    }

    open = () => {
        this.setState({ isOpen: true })
    }

    close = () => {
        this.setState({ isOpen: false })
    }

    getPosition = (left, top, height) => {
        this.setState(prevState => ({ style: { ...prevState.style, left, top: top + height + 8 } }))
    }

    componentDidUpdate() {
        setTimeout(() => {
            if(this.state.isOpen){
              window.addEventListener('click', this.close)
            }
            else{
              window.removeEventListener('click', this.close)
            }
          }, 0)
    }

    render() {
        const { children } = this.props
        const { isOpen, style } = this.state
        const inputChildren = React.Children.map(children, child => {
            if (child.type.displayName === "Select") {
                return React.cloneElement(child, { open: this.open, getPosition: this.getPosition })
            }
            else {
                return (
                    isOpen && ReactDOM.createPortal(
                        <span style={style}>{React.cloneElement(child)}</span>, document.body
                    )
                )
            }
        })
        return inputChildren
    }
}

export default Controller;