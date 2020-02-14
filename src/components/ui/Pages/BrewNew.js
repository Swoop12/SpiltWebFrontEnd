import React, { Component, useContext } from 'react'
import AppContext from '../../../contexts/AppContext'
import TextField from '../Elements/TextField'
import ImageConverter from '../Elements/ImageUpload'
import QuillEditor from '../../QuillEditor'
import { PrimaryButton } from '../Elements/Buttons'
import { serviceFactory } from '../../../services/ServiceFactory'

class BrewNew extends Component {

    static contextType = AppContext

    recipeService = serviceFactory.recipeService()

    constructor(props) {
        super(props)
        this.editorRef = React.createRef()
        this.state = {
            title: props.title,
            brewTime: props.time,
            coverPhotoUrl: props.photoUrl,
            videoLink: props.videoLink
        }
    }

    componentDidMount = () => {
        if(this.props.instructions) {
            this.editorRef.current.setContent(this.props.instructions)
        }
    }

    onTextFieldValueChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onImageUpload = url => {
        this.setState({coverPhotoUrl: url})
    }

    onSave = () => {
        const instructions = this.editorRef.current.getContent()
        const {title, brewTime, coverPhotoUrl, videoLink} = this.state
        const authorId = this.context.currentUser._id
        debugger
        this.recipeService.createRecipes(title, coverPhotoUrl, brewTime, authorId, instructions, videoLink)
            .then(post => {
                debugger
                this.props.history.push('/brew')
            }).catch(error => {
                alert(error)
            })
    }

    render() {
        const theme = this.context.theme
        return (
            <div style={{ background: theme.background }}>
                <div className="container vertical-container align-all-center standard-spacing-container">
                    <TextField label="Title" name="title" value={this.state.title} onChange={this.onTextFieldValueChange} />
                    <ImageConverter title="Cover Photo" onUpload={this.onImageUpload}/>
                    <TextField label="Video Url" name="videoLink" value={this.state.videoLink}  onChange={this.onTextFieldValueChange}/>
                    <TextField label="Brew Time" name="brewTime" value={this.state.brewTime} onChange={this.onTextFieldValueChange}/>
                    <div style={{ width: "100%" }}>
                        <QuillEditor ref={this.editorRef} />
                    </div>
                    <PrimaryButton
                        onClick={this.onSave}>
                        Save
                    </PrimaryButton>
                </div>
            </div>
        )
    }
}

export default BrewNew
