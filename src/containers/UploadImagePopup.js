import React, { Component } from 'react'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import Button from '@material-ui/core/Button';
import { serviceFactory } from '../services/ServiceFactory'
import EmptyState from '../images/coffeeBlankState.png'
import LinearProgress from '@material-ui/core/LinearProgress';

class UploadImagePopup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            image: this.props.currentImage,
            imageToUpload: null,
            localPreview: null,
            uploading: false
        }
    }

    readSelectedFile = (event) => {
        let input = event.target
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = (e) => {
                this.setState({
                    localPreview: e.target.result,
                    imageToUpload: input.files[0]
                })
            }
            reader.readAsDataURL(input.files[0]);
        }
    }

    onUpload = () => {
        this.setState({ uploading: true })
        const onUploadCallback = this.props.onUploadCallback
        let photo = this.state.imageToUpload
        if (photo) {
            serviceFactory.fileUploadService().uploadPhoto(photo, 'image/x-png')
                .then(photo => {
                    onUploadCallback(photo)
                }).catch(error => {
                    onUploadCallback(null, error)
                }).finally(() => this.setState({ uploading: false }))
        }
    }

    render() {
        const imageSrc = this.state.localPreview || this.state.image || EmptyState
        return (
            <div className="modal-container">
                <div className="modal-popup content-card vertical-container flex-center">
                    <div className="hidden-fileupload-container vertical-container flex-center">
                        <h4>{this.props.titleOverride || 'Upload an Image'}</h4>
                        <img
                            src={imageSrc}
                            alt="Upload"
                            style={{
                                width: "80%"
                            }} />
                        <input
                            type="file"
                            accept="image/x-png,image/gif,image/jpeg"
                            className="hidden-fileupload"
                            onChange={this.readSelectedFile} />
                        Select Image
                    </div>
                    {this.state.uploading && (
                        <LinearProgress />
                    )}
                    <div className="horizontal-container align-end">
                        <Button size="small"
                            color="secondary"
                            onClick={this.props.onCancel}>
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            color="default"
                            startIcon={<CloudUploadIcon />}
                            onClick={this.onUpload}>
                            Upload
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default UploadImagePopup
