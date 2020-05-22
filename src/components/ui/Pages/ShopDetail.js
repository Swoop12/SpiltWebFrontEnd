import React, { Component } from 'react'
import ImageView from '../Elements/ImageView'
import { products } from '../../../services/Mock/MockDatabase'
import { Title3, Caption1, ExternalLink, Body } from '../Elements/Typography'
import { PrimaryButton, EditButton } from '../Elements/Buttons'
import AppContext from '../../../contexts/AppContext'
import ImageConverter from '../Elements/ImageUpload'
import TextField from '../Elements/TextField'
import { serviceFactory } from '../../../services/ServiceFactory'
import { Link } from 'react-router-dom'
import { Button } from 'antd'

class ShopDetail extends Component {

    static contextType = AppContext
    constructor(props) {
        super(props)

        this.state = {
            name: "",
            price: "",
            seller: "",
            description: "",
            sellerUrl: "",
            productLink: "",
            photoUrl: "",
        }
    }

    componentDidMount = () => {
        const productId = this.props.match.params.id
        serviceFactory.productService().fetchProductById(productId)
            .then(product => {
                debugger
                this.setState(product)
            }).catch(error => {
                debugger
                alert(error)
            })
    }

    readViews = () => {
        return ([
            <ImageView
                style={{
                    height: "400px",
                    width: "33vw",
                    minWidth: "350px",
                    borderRadius: '8px'
                }}
                src={this.state.photoUrl} />,
            <Title3>{this.state.name}</Title3>,
            <Caption1>${this.state.price}</Caption1>,
            <ExternalLink href={this.state.sellerUrl}>
                {this.state.seller}
            </ExternalLink>,
            <Body>{this.state.description}</Body>,
            <a href={this.state.productLink}>
                <Button size="large" type="primary">
                    See Seller Website
                </Button>
            </a>,
        ])
    }

    views = () => {
        return this.readViews()
    }

    render() {
        return (
            <div
                className="container vertical-container align-all-center standard-spacing-container"
                style={{
                    background: this.context.theme.background,
                    padding: "24px 0",
                }}>
                {this.views()}
                <EditButton
                    link={this.props.match.url + "/edit"}
                    style={{
                        position: "fixed",
                        left: "90vw",
                        bottom: "32px"
                    }} />
            </div>
        )
    }
}

export default ShopDetail
