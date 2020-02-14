import React, { Component } from 'react'
import { Title3, Caption1, ExternalLink, Body } from '../Elements/Typography'
import { PrimaryButton, DeleteButton } from '../Elements/Buttons'
import AppContext from '../../../contexts/AppContext'
import ImageConverter from '../Elements/ImageUpload'
import TextField from '../Elements/TextField'
import { serviceFactory } from '../../../services/ServiceFactory'

class ShopTemplate extends Component {

    static contextType = AppContext

    componentDidMount = () => {
        const productId = this.props.match.params.id
        if (productId) {
            serviceFactory.productService().fetchProductById(productId)
                .then(product => {
                    this.setState({
                        edit: true,
                        ...product
                    })
                }).catch(error => {
                    alert("Error fetching this product")
                })
        }
    }

    constructor(props) {
        super(props)

        this.state = {
            name: "",
            price: null,
            seller: "",
            description: "",
            sellerUrl: "",
            productLink: "",
            photoUrl: "",
            edit: false
        }
    }

    onSubmit = () => {
        this.state.edit ? this.onUpdate() : this.onCreate()
    }

    onUpdate = () => {
        const updatedProduct = this.state
        updatedProduct.edit = null
        serviceFactory.productService().updateProduct(this.state._id, updatedProduct)
            .then(updatedPost => {
                this.props.history.push(`/shop/${updatedPost._id}`)
            }).catch(error => {
                alert(error)
            })
    }

    onCreate = e => {
        const seller = {
            name: this.state.seller,
            url: this.state.sellerUrl
        }
        serviceFactory.productService().createProduct(
            this.state.name,
            this.state.price,
            seller,
            this.state.description,
            this.state.photoUrl,
            this.state.productLink
        ).then(product => {
            this.props.history.push('/shop')
        }).catch(error => {
            alert(error)
        })
    }

    onDelete = e => {
        serviceFactory.productService().deleteProductWithId(this.state._id)
            .then(this.props.history.push('/shop'))
            .catch(error => alert(error))
    }

    onTextFieldEdit = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        debugger
        return (
            <div
                style={{
                    background: this.context.theme.background,
                    padding: "24px 0"
                }}
                className="container vertical-container align-all-center standard-spacing-container">
                <ImageConverter
                    src={this.state.photoUrl}
                    onUpload={url => this.setState({ photoUrl: url })} />
                <TextField
                    label="Title"
                    name="name"
                    value={this.state.name}
                    onChange={this.onTextFieldEdit} />
                <TextField
                    label="Price"
                    name="price"
                    value={this.state.price}
                    onChange={this.onTextFieldEdit}
                />,
            <TextField
                    label="Seller"
                    name="seller"
                    value={this.state.seller}
                    onChange={this.onTextFieldEdit} />
                <TextField
                    label="Seller website"
                    name="sellerUrl"
                    value={this.state.sellerUrl}
                    onChange={this.onTextFieldEdit} />
                <TextField label="Link to Product"
                    name="productLink"
                    value={this.state.productLink}
                    onChange={this.onTextFieldEdit} />
                <TextField label="Description"
                    name="description"
                    value={this.state.description}
                    onChange={this.onTextFieldEdit} />
                <PrimaryButton
                    onClick={this.onSubmit}>
                    {this.state.edit ? "Update" : "Create"}
                </PrimaryButton>
                {this.state.edit && (
                    <DeleteButton
                        action={this.onDelete}
                        style={{
                            position: "fixed",
                            left: "90vw",
                            bottom: "32px"
                        }} />
                )}
            </div>
        )
    }
}

export default ShopTemplate
