import React, { Component, useContext } from 'react'
import AppContext from '../../../contexts/AppContext'
import Banner from '../components/Banner'
import StackedFilter from '../Elements/StackedFilter'
import ProductList from './ProductList'
import {CreateButton} from '../Elements/Buttons'
import { serviceFactory } from '../../../services/ServiceFactory'

const optionsTree = ["Kettles", "Brewing", "Beans", "Grinders"]

class Shop extends Component {

    static contextType = AppContext


    componentDidMount = () => {
        serviceFactory.productService().fetchProducts()
        .then(products => {
            this.setState({ products })
        })
    }

    constructor(props) {
        super(props)
        this.state = {
            products: []
        }
    }

    render() {
        const theme = this.context.theme
        return (

            <div style={{ background: theme.background }}>
                <Banner />
                <StackedFilter
                    optionTree={optionsTree} />
                <ProductList 
                    {...this.props}
                    products={this.state.products}
                />
                <CreateButton 
                    link={this.props.match.path + "/new"}
                    style={{
                        position: "fixed",
                        right: "32px",
                        bottom: "32px"
                    }}/>
            </div>
        )
    }
}

export default Shop
