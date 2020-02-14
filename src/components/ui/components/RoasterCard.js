import React, { Component } from 'react'
import AppContext from '../../../contexts/AppContext'
import Card from '../Elements/Card'
import ImageView from '../Elements/ImageView'
import { Caption1, Headline } from '../Elements/Typography'

class RoasterCard extends Component {

    static contextType = AppContext

    static defaultProps = {
        name: "Patric Adcock",
        location: "Sunnyvale, CA",
        company: "Generic Coffee",
        photoUrl: "https://images.squarespace-cdn.com/content/v1/5b34fa91697a98216d4ac1df/1554926352192-JK3DSV28B4CQOB9GBRS9/ke17ZwdGBToddI8pDm48kMXRibDYMhUiookWqwUxEZ97gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0luUmcNM2NMBIHLdYyXL-Jww_XBra4mrrAHD6FMA3bNKOBm5vyMDUBjVQdcIrt03OQ/_MG_3486re.jpg?format=1500w"
    }

    render() {
        return (
            <Card
                className="flexer"
                style={{
                    padding: 0,
                    flex: "1 0 300px",
                    maxWidth: "400px"
                }}>
                <ImageView
                    src={this.props.photoUrl}
                    style={{
                        flexBasis: "150px",
                        width: "150px",
                        height: "100%",
                    }} />
                <div className="vertical-container"
                    style={{padding: '8px'}}>
                    <Headline>{this.props.name}</Headline>
                    <Caption1>{this.props.location}</Caption1>
                    <Caption1>{this.props.company}</Caption1>
                </div>
            </Card>
        )
    }
}

export default RoasterCard
