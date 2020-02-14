import React, { Component } from 'react'
import Card from '../Card'
import ImageConverter from '../ImageUpload'
import { ExternalLink } from '../Typography'

class ImageUploadPreview extends Component {
    constructor(props) {
        super(props)

        this.state = {
            uploadUrl: ""
        }
    }

    onUpload = url => {
        debugger
        alert(url)
        this.setState({uploadUrl: url})
    }

    render() {
        const url = this.state.uploadUrl
        return (
            <div>
                <Card>
                    <ImageConverter
                        onUpload={this.onUpload}
                    />
                    {url && (
                        <ExternalLink href={url}>
                            {url}
                        </ExternalLink>
                    )}
                </Card>
            </div>
        )
    }
}

export default ImageUploadPreview
