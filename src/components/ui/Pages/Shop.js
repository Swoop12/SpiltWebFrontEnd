import React, { Component, useContext } from 'react'
import AppContext from '../../../contexts/AppContext'
import Banner, { BannerViewModelFromProduct } from '../components/Banner'
import StackedFilter from '../Elements/StackedFilter'
import ProductList from './ProductList'
import {CreateButton} from '../Elements/Buttons'
import { serviceFactory } from '../../../services/ServiceFactory'

const optionsTree = ["Kettles", "Brewing", "Beans", "Grinders"]

class Shop extends Component {

    static contextType = AppContext


    componentDidMount = () => {
        serviceFactory.productService().fetchProducts()
        .then(productResponse => {
            const {products, featured} = productResponse
            this.setState({ products, featured })
        })
    }

    constructor(props) {
        super(props)
        this.state = {
            products: [],
            filterSelection: [optionsTree[0]]
        }
    }

    onFilterSelectionChange = selections => {
        this.setState({filterSelection: selections})
    }

    render() {
        const theme = this.context.theme
        const bannerViewModel = BannerViewModelFromProduct(this.state.featured)
        return (
            <div style={{ background: theme.background }}>
                <Banner {...bannerViewModel} />
                {/* <StackedFilter
                    optionTree={optionsTree}
                    selected={this.state.filterSelection}
                    onChange={this.onFilterSelectionChange} /> */}
                <ProductList 
                    {...this.props}
                    products={this.state.products}
                />
                {this.context.currentUser && (

                <CreateButton 
                    link={this.props.match.path + "/new"}
                    style={{
                        position: "fixed",
                        right: "32px",
                        bottom: "32px"
                    }}/>
                )}
            </div>
        )
    }
}

export default Shop
