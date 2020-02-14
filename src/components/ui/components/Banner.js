import React, { Component } from 'react'
import AppContext from '../../../contexts/AppContext'
import GradientBackground from '../Elements/Gradients'
import { Title1, ExternalLink } from '../Elements/Typography'
import ImageView from '../Elements/ImageView'

class Banner extends Component {

    static contextType = AppContext

    static defaultProps = {
        title: "The Spilt Pour Over",
        linkTitle: "by Fellow",
        link: "https://www.linkedin.com/in/patrick-adcock-3b96a5105/",
        photoUrl: "https://cdn.shopify.com/s/files/1/0057/6235/1219/articles/BHxFellow_InitialSelects_Edited_-10_600x.jpg?v=1573092289"
    }

    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        let topGradientColor = "#000000"
        let bottomGradientColor = "#EEEEEE00"
        return (
            <ImageView src={this.props.photoUrl}
                style={{
                    height: "40vh",
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'flex-end',
                }}>
                    <GradientBackground
                        start={topGradientColor}
                        end={bottomGradientColor}
                        direction="top"
                        style={{
                            padding: "8px",
                            color: "white",
                            height: "50%",
                            position: "absolute",
                            top: '50%',
                            display: "flex",
                            flexDirection: "column"
                        }} >
                        <div style={{flexGrow: "20"}}/>
                        <div className="flexer"
                            style={{width: "100%",
                                    alignItems: "baseline",
                                    padding: "0 16px"}}>
                            <Title1 style={{
                                color: "white",
                                flexGrow: "1",
                                textAlign: "center"
                            }}>
                                {this.props.title}
                            </Title1>
                            <ExternalLink
                                href={this.props.link}
                            >{this.props.linkTitle}
                            </ExternalLink>
                        </div>
                    </GradientBackground>
            </ImageView>
        )
    }
}

export default Banner
