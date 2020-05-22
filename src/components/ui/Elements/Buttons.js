import React, { useContext } from 'react';
import SectionHeader from './SectionHeader';
import { themes, dropShadow } from './Theme';
import AppContext from '../../../contexts/AppContext'
import { Link } from 'react-router-dom';
import { relative } from 'path';
import Card from './Card'
import { EditOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons"
import { Button } from 'antd';

export class SimpleButton extends React.Component {
    static contextType = AppContext
    render() {
        const props = this.props
        const style = { color: this.context.theme.secondary }
        return (
            <button onClick={props.onClick}
                style={style}>
                {props.children}
            </button>
        )
    }
}

export class OutlineButton extends React.Component {
    static contextType = AppContext
    render() {
        const props = this.props
        const primary = this.context.theme.primary
        const style = {
            color: primary,
            borderRadius: "8px",
            padding: "8px 16px",
            border: `1px solid ${primary}`
        }
        return (
            <button onClick={props.onClick}
                style={style}>
                {props.children}
            </button>
        )
    }
}

export class PrimaryButton extends React.Component {
    static contextType = AppContext
    render() {
        const props = this.props
        const theme = this.context.theme
        const primary = theme.primary
        var optionalShadow = theme === themes.light ? dropShadow : {}
        const style = {
            backgroundColor: primary,
            color: "#ffffff",
            borderRadius: "8px",
            padding: "8px 16px",
            ...optionalShadow
        }
        console.log("STYLE:", style)
        return (
            <button onClick={props.onClick}
                style={style}>
                {props.children}
            </button>
        )
    }
}

export class ThemedButton extends React.Component {
    static contextType = AppContext
    render() {
        const theme = this.context.theme
        const { foreground, secondary } = theme
        var optionalShadow = theme === themes.light ? dropShadow : {}
        const style = {
            backgroundColor: foreground,
            color: secondary,
            borderRadius: "8px",
            padding: "8px 16px",
            ...optionalShadow
        }
        return (
            <button onClick={this.props.onClick}
                style={style}>
                {this.props.children}
            </button>
        )
    }
}

function ActionButton(props) {
    const theme = useContext(AppContext).theme
    let optionalShadow = theme.name === 'Light' ? dropShadow : {}

    const icon = () => {
        return (<i className={props.icon + " fa-2x"}
            style={{
                height: "100%",
                width: "100%",
                position: 'absolute',
                color: 'white',
                top: '9px',
                left: '11px'
            }}></i>)
    }

    const views = () => {
        if (props.link) {
            return (<Link to={props.link}>{icon()}</Link>)
        } else {
            return (
                <i className={props.icon + " fa-2x"}
                    onClick={props.action}
                    style={{
                        height: "100%",
                        width: "100%",
                        position: 'absolute',
                        color: 'white',
                        top: '9px',
                        left: '11px'
                    }}></i>
            )
        }
    }

    return (
        <div
            style={{
                height: '50px',
                width: '50px',
                background: theme[props.color],
                borderRadius: '50%',
                position: "relative",
                ...optionalShadow,
                ...props.style
            }}>
            {views()}
        </div >
    )
}

export function CreateButton(props) {
    return (
        <Link to={props.link}>
            <Button type="primary" shape="round" size="large"  {...props} >
                CREATE
            </Button>
        </Link>
    )
}

export function EditButton(props) {
    return (
        <Link to={props.link}>
            <Button type="primary" shape="round" size="large"{...props} >EDIT</Button>
        </Link>

    )

}

export function DeleteButton(props) {
    return (
        <Link to={props.link}>
            <Button type="danger" shape="round" size="large" {...props} >DELETE</Button>
        </Link>
    )
}

CreateButton.defaultProps = { link: "/new" }

export class ButtonSampler extends React.Component {
    static contextType = AppContext
    render() {
        return (
            <div>
                <SectionHeader>Buttons</SectionHeader>
                <div className="horizontal-even-spacing wrap standard-spacing-container">
                    <SimpleButton>Simple Button</SimpleButton>
                    <OutlineButton>Outline Button</OutlineButton>
                    <PrimaryButton>Primary Button</PrimaryButton>
                    <ThemedButton>Themed Button</ThemedButton>
                    <Card>
                        <CreateButton style={{
                            margin: "8px auto"
                        }} />
                        Create Button
                    </Card>
                    <Card>
                        <EditButton style={{
                            margin: "8px auto"
                        }} />
                        Edit Button
                    </Card>
                    <Card>
                        <DeleteButton style={{
                            margin: "8px auto"
                        }} />
                        Delete Button
                    </Card>
                </div>
            </div>
        )
    }
}