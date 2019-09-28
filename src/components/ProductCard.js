import React from 'react';
import '../styles/publicStyles.css'

class ProductCard extends React.Component {
    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <img className="img-fluid" src="https://cdn.shopify.com/s/files/1/0057/6235/1219/products/stagg-stovetop-matte-600_900x.png?v=1564707912"></img>
                    <h3 className="card-title">Stag Pour-Over Set</h3>
                    <p className="card-text">$24.99</p>
                </div>
            </div>
        );
    }
}

export default ProductCard;