import React from 'react'

class Select extends React.Component {
    static displayName = "Select"

    constructor(props) {
        super(props)
        this.selectedElement = React.createRef()
    }

    handleClick = () => {
        const { left, top, height } = this.selectedElement.current.getBoundingClientRect()
        this.props.getPosition(left, top, height)
        this.props.open()
    }

    render() {
        const { children } = this.props
        return React.cloneElement(children, { ref: this.selectedElement, onClick: this.handleClick })
    }
}

export default Select;