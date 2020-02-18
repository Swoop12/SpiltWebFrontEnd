import React, { useContext } from 'react';
import './Typography.css'
import AppContext from '../../../contexts/AppContext'
import { Link } from 'react-router-dom'

export function LargeTitle(props) {
    const context = useContext(AppContext)
    return <h1 className="large-title-text"
        style={props.style || { color: context.theme.secondary }}>
        {props.children}
    </h1>
}

export function Title1(props) {
    const context = useContext(AppContext)
    return (
        <h1 className="title1-text"
            style={props.style || { color: context.theme.secondary }}>
            {props.children}
        </h1>
    )
}

export function Title2(props) {
    const context = useContext(AppContext)
    return (
        <h2 className="title2-text typography"
            style={props.style || { color: context.theme.secondary }}>
            {props.children}
        </h2>
    )
}

export function Title3(props) {
    const context = useContext(AppContext)
    return (
        <h3 className="title3-text typography"
            style={props.style || { color: context.theme.text }}>
            {props.children}
        </h3>
    )
}

export function Headline(props) {
    const context = useContext(AppContext)
    return (
        <h5 className="headline-text typography"
            style={props.style || { color: context.theme.secondary }}>
            {props.children}
        </h5>
    )
}

export function Body(props) {
    const context = useContext(AppContext)
    return (
        <p className="body-text typography"
            style={props.style || { color: context.theme.text }}>
            {props.children}
        </p>
    )
}

export function Callout(props) {
    const context = useContext(AppContext)
    const classNames = props.className + " callout-text"
    return (
        <p className={classNames}
            style={props.style || { color: context.theme.text }}>
            {props.children}
        </p>
    )
}

export function Subhead(props) {
    const context = useContext(AppContext)
    return <h5 className="subhead-text typography"
        style={{ color: context.theme.text, ...props.style }}>
        {props.children}
    </h5>
}


export function Footnote(props) {
    const context = useContext(AppContext)
    return (
        <p className="footnote-text typography"
            style={{
                color: context.theme.text,
                ...props.style
            }}>
            {props.children}
        </p>
    )
}


export function Caption1(props) {
    const context = useContext(AppContext)
    return (
        <p className="caption1-text typography"
            style={props.style || { color: context.theme.text }}>
            {props.children}
        </p>
    )
}

export function Caption2(props) {
    const context = useContext(AppContext)
    return (
        <p className="caption2-text typography"
            style={props.style || { color: context.theme.text }}>
            {props.children}
        </p>
    )
}

export function ExternalLink(props) {
    const context = useContext(AppContext)
    return (
        <a href={props.href}>
            <Callout
                style={{ color: context.theme.primary }}>
                {props.children}
            </Callout>
        </a>
    )
}

export function InternalLink(props) {
    return (
        <Link
            style={{ textDecoration: "none", ...props.style }}
            to={props.to} >
            {props.children}
        </Link>
    )
}

/* Large (Default)
Style	Weight	Size (Points)	Leading (Points)	Tracking (1/1000em)
Large Title	Regular	34	41	+11
Title 1	Regular	28	34	+13
Title 2	Regular	22	28	+16
Title 3	Regular	20	25	+19
Headline	Semi-Bold	17	22	-24
Body	Regular	17	22	-24
Callout	Regular	16	21	-20
Subhead	Regular	15	20	-16
Footnote	Regular	13	18	-6
Caption 1	Regular	12	16	0
Caption 2	Regular	11	13	+6 */