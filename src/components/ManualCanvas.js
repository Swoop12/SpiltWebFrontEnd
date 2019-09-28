import React, { Component } from 'react'
import LinkPlaceholder from './LinkPlaceholder';

class Canvas extends Component {
    constructor(props) {
        super(props)
        this.state = {
            content: [
                {
                    type: "text",
                    value: "This is a test",
                    name: "test"
                },
                {
                    type: "image",
                    value: "https://cdn.allbirds.com/image/fetch/q_auto,f_auto/w_1000,f_auto,q_auto,b_rgb:F2F2F2/https://cdn.shopify.com/s/files/1/1104/4168/products/Allbirds_M_Wool_Runner_Kotare_WHITE_ANGLE_37a26ca9-c795-459d-97c0-f9fbef1eaa54.png?v=1542061580",
                    name: "all birds"
                }
            ]
        }
        this.addElement = this.addElement.bind(this)
    }

    elements(){
        return this.state.content.map( item => this.elementFor(item) )
    }

    elementFor(item){
        let handleEnter = this.handleEnterEvent
        switch(item.type){
            case "text":
                return <textarea 
                    placeholder="Type text here" 
                    name={item.name}
                    className="canvas-text">{item.value}</textarea>
            case "image":
                return <img src={item.value} alt={item.name}/>
            case "link":
                return <a href={item.value}>{item.name}</a>
            case "linkPlaceholder":
                return <LinkPlaceholder handleEnterEvent={handleEnter} placeholder="Your new Link" />
            default: 
                return <textarea name={item.name} cols="30" rows="10">{item.value}</textarea>
        }
    }

    handleEnterEvent = (e, linkText) => {
        var key = e.which || e.keyCode;
        if (key === 13) { // 13 is enter
            this.setState(prevState => {
                let oldContent = prevState.content
                console.log(`Old Content ${oldContent}`)
                //Copy the array removing the last piece
                let newContent = oldContent.filter(element => (element.type !== "linkPlaceholder"))
                console.log(`New Content`)
                console.log(newContent)
                let newImageElement = {
                    type: "image",
                    value: linkText,
                    name: "Image"
                }
                let newPlaceholderText = {
                    type: "text",
                    value: "",
                    name: "More Text"
                }
                let newerContent = newContent.concat([newImageElement, newPlaceholderText])
                console.log(newerContent)
                return {content: newerContent}
            })
        }
    }

    addElement(type, value="", name="") {
        let element = {
            type,
            value,
            name
        }
        this.setState(prevState => {
            return {content: prevState.content.concat(element)}
        })
    }

    render() {
        let addElement = this.addElement
        return (
            <div>
                <div>
                    <button onClick={() => addElement("text")}>Text</button>
                    <button onClick={() => addElement("linkPlaceholder")}>Image</button>
                    <button onClick={() => addElement("linkPlaceholder")}>Link</button>
                </div>
                {this.elements()}
            </div>
        )
    }
}

export default Canvas
