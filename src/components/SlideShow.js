import React, { Component } from 'react'
// import appScreenShots from '../images/appScreenShot'

class SlideShow extends Component {
    constructor(props) {
        super(props)
        // console.log(appScreenShots)
        this.state = {
            photos: this.props.photos,
            currentIndex: 0
        }
    }

    intervalId

    componentDidMount() {
        this.intervalId = setInterval(() => {
            this.setState( (prevState) => {
                if(prevState.currentIndex === (prevState.photos.length - 1)) {
                    return {currentIndex: 0}
                } else {
                    return {currentIndex: prevState.currentIndex + 1}
                }   
            })
        }, 3000)
    }

    componentWillUnmount() {
        clearInterval(this.intervalId)
    }

    currentPhoto(){
        return this.state.photos[this.state.currentIndex]
    }

    render() {
        console.log(this.currentPhoto());
        return (
            <div className="slideshow">
                <img src={this.currentPhoto()} 
                    alt="Promotional App"/>
            </div>
        )
    }
}

export default SlideShow
