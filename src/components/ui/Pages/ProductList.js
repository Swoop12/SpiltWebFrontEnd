import React, { useContext } from 'react';
import AppContext from '../../../contexts/AppContext';
import ProductCard from '../components/ProductCard';
import { products } from '../../../services/Mock/MockDatabase'
import { Link } from 'react-router-dom'

function ProductList(props) {
    const theme = useContext(AppContext)

    const ProductCards = () => {
        debugger
        return props.products.map(product => {
            return (
                <ProductCard product={product}
                    linkTo={props.match.url + `/${product._id}`} />
            )
        })
    }
    return (
        <div
            className="flexer justify-center"
            style={{ background: theme.background }}>
            {ProductCards()}
        </div>
    )
}

ProductList.defaultProps = {
    products: products
}

export default ProductList;
