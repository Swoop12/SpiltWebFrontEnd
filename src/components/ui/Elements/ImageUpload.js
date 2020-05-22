import React from 'react';
import { OutlineButton } from './Buttons'
import { serviceFactory } from '../../../services/ServiceFactory';
import ImageView from './ImageView'

class ImageConverter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            imgSrc: null
        }
    }

    urlForImageSelection = event => {
        let photo = event.target.files[0]
        if (!photo) { return }
        let url = URL.createObjectURL(photo)
        return url
    }

    onImageSelection = event => {
        console.log(event)
        const file = event.target.files[0];
        const reader = new FileReader()
        reader.onload = () => {
            this.setState({ imgSrc: reader.result })
            serviceFactory.fileUploadService().uploadPhoto(file)
                .then((url) => {
                    if (this.props.onUpload) {
                        this.props.onUpload(url)
                    }
                }).catch(error => {
                    // TODO: - Error Handling
                    alert(error)
                })
        }
        reader.readAsDataURL(file)
    }

    onError = () => {
        this.setState({imgSrc: null})
    }

    views = () => {
        const src = this.state.imgSrc || this.props.src
        if (src) {
            return <img
                src={src}
                alt="uploaded"
                onError={this.onError}
                style={{
                    width: "100%",
                    maxWidth: "400px",
                    margin: "auto"
                }} />
        } else {
            return (
                <OutlineButton>
                    {this.props.title || this.props.children || "Upload"}
                </OutlineButton>
            )
        }
    }

    render() {
        return (
            <div className="hidden-fileupload-container">
                <input type="file"
                    className="hidden-fileupload"
                    accept="image/png, image/jpeg"
                    onChange={this.onImageSelection}>
                </input>
                {this.views()}
            </div>
        )
    }
}


export default ImageConverter;
