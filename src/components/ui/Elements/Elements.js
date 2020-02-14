import React from 'react';
import { Title1, LargeTitle, Title2, Title3, Headline, Body, Callout, Subhead, Footnote, Caption1, Caption2 } from './Typography'
import { ButtonSampler, ThemedButton } from './Buttons';
import { dropShadow } from './Theme'
import AppContext from '../../../contexts/AppContext'
import SectionHeader from './SectionHeader';
import StackedFilter from './StackedFilter';
import GradientBackground from './Gradients';
import TextField from './TextField';
import Card from './Card';
import '../../../styles/publicStyles.css'
import ImageViewDemo from './ImageViewDemo'
import { PlaceholderPhoto } from '../../../images/coffeeBlankState.png'
import ImageConverter from './ImageUpload';
import ImageUploadPreview from './Previews/ImageUploadPreview';

function SectionPadding() {
    return <div style={{ padding: "16px" }} />
}

function ColorBox(props) {
    const boxStyle = {
        height: '100px',
        width: '100px',
        backgroundColor: props.hex,
    }
    const optionalShadow = props.theme.name === 'Light' ? dropShadow : {}
    const divStyle = {
        backgroundColor: props.background,
        color: props.text,
        margin: '16px',
        padding: '16px',
        ...optionalShadow
    }
    return (
        <div className="vertical-container flex-center" style={divStyle}>
            <div style={boxStyle} />
            <Callout>{props.name}</Callout>
            <Caption2>{props.hex}</Caption2>
        </div>
    )
}

function ColorDisplay(props) {
    const { background, text, foreground } = props.theme
    const colors = Object.keys(props.theme).map((key, index) => {
        if (key === 'name' || key === 'background') { return null }
        const name = key.charAt(0).toUpperCase() + key.slice(1)
        return <ColorBox
            name={name}
            hex={props.theme[key]}
            background={props.theme.name === 'Light' ? background : foreground}
            text={text}
            theme={props.theme} />
    })
    return (
        <div style={{ color: text }}>
            <div className="vertical-container center-container">
                <Callout>background</Callout>
                <Caption2>{background}</Caption2>
            </div>
            <div className="flexer space-even">
                {colors}
            </div>
        </div >
    )
}

function Elements(props) {
    console.log(props)
    const sampleFilterOptions = {
        numbers: [1, 2, 3],
        colors: ['blue', 'red', 'green', 'yellow', 'orange'],
        food: {
            dairy: ['milk', 'cheese', 'yogurt'],
            protein: ['fish', 'chicken', 'beef', 'pork'],
            vegetables: ['broccoli', 'carrots'],
            fruits: ['apples']
        }
    }
    var [color1, setColor1] = React.useState("#5D827700")
    var [color2, setColor2] = React.useState("#BFACAA")
    var [gradientDirection, setGradientDirection] = React.useState(["top"])
    let theme = props.theme
    return (
        <div style={{ backgroundColor: theme.background, padding: '24px' }}>
            <div className="container">

                <SectionPadding />

                <SectionHeader>Typography</SectionHeader>

                <div style={{ color: theme.text }}>
                    <LargeTitle>Large Title - 34pt</LargeTitle>
                    <Title1>Title 1 - 28pt</Title1>
                    <Title2>Title 2 - 22pt</Title2>
                    <Title3>Title 3 - 20pt</Title3>
                    <Headline>Headline - 17pt Bold</Headline>
                    <Body>Body - 17pt</Body>
                    <Callout>Callout - 16pt</Callout>
                    <Subhead>Subhead - 15pt</Subhead>
                    <Footnote>Footnote - 13pt</Footnote>
                    <Caption1>Caption 1 - 12pt</Caption1>
                    <Caption2>Caption 2 - 11pt</Caption2>
                </div>

                <SectionPadding />

                <ButtonSampler />

                <SectionPadding />

                <SectionHeader>Card</SectionHeader>
                <div className='space-even'>
                    <Card> Card </Card>
                    <Card> Cards provide default foreground behavior. </Card>
                    <Card> They have standard margin and padding, but otherwise behave like standard divs. </Card>
                </div>

                <SectionPadding />

                <SectionHeader>Colors</SectionHeader>
                <ColorDisplay theme={theme} />

                <SectionPadding />

                <SectionHeader>Text Fields</SectionHeader>
                <TextField label="Standard" />

                <SectionPadding />

                <SectionHeader>Image View</SectionHeader>
                <ImageViewDemo />
                <SectionPadding />

                <SectionHeader>Image Upload</SectionHeader>
                <ImageUploadPreview />

                <SectionHeader>Stacked Filter</SectionHeader>
                <StackedFilter optionTree={sampleFilterOptions} />

                <SectionPadding />

                <SectionHeader>Gradient Background</SectionHeader>
                <div className="vertical-container" >
                    <div className="flexer" style={{ padding: '16px' }}>
                        <TextField
                            label="Start"
                            value={color1}
                            onChange={setColor1}
                        />
                        <TextField
                            label="End"
                            value={color2}
                            onChange={setColor2}
                        />
                    </div>
                    <Card style={{ height: '400px', position: "relative" }}>
                        <Title1> Gradients </Title1>
                        <GradientBackground
                            start={color1}
                            end={color2}
                            direction="top" />
                    </Card>
                    <div style={{ marginTop: '8pt' }}>
                        <StackedFilter
                            optionTree={['top', 'right', 'top right', 'bottom right']}
                            selected={gradientDirection}
                            onChange={setGradientDirection} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Elements;
