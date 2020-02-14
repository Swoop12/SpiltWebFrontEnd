import React from 'react';
import ImageView from '../Elements/ImageView';
import Card from '../Elements/Card'
import { Title3, Caption1, InternalLink } from '../Elements/Typography';
import AppContext from '../../../contexts/AppContext';
import { products } from '../../../services/Mock/MockDatabase'


class ProductCard extends React.Component {
    static contextType = AppContext

    static defaultProps = {
        product: products[0]
    }
    render() {
        return (
            <Card style={{
                padding: "0",
                flexBasis: "300px",
                flexGrow: "1",
                maxWidth: "400px",
            }}>
                <InternalLink to={this.props.linkTo}>
                    <div className="vertical-container">
                        <div className="square">
                            <ImageView
                                className="square-content"
                                src={this.props.product.photoUrl}
                            />
                        </div>
                        <div style={{ padding: "8px" }}>
                            <Title3>{this.props.product.name}</Title3>
                            <Caption1>{this.props.product.price}</Caption1>
                        </div>
                    </div>
                </InternalLink>
            </Card>
        );
    }
}

export default ProductCard;