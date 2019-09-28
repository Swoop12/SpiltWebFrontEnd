import React from 'react'

export const Link = (props) => {
  const { url } = props.contentState.getEntity(props.entityKey).getData();
  return (
    <a href={url} style={{ "color": "blue" }}>
      {props.children}
    </a>
  );
};

export const Image = (props) => {
    const { url } = props.contentState.getEntity(props.entityKey).getData()
    return (
        <img src={url} alt="User Generated"/>
    )
}

export const Header1 = props => {
    return <h1>{props.children}</h1>
}

export const Header2 = props => {
    return <h2>{props.children}</h2>
}

export const Header3 = props => {
    return <h3>{props.children}</h3>
}

export const Header4 = props => {
    return <h4>{props.children}</h4>
}

export const Span = props => {
    const {cssStyle} = props.contentState.getEntity(props.entityKey).getData()
    return <span className={cssStyle}>{props.children}</span>
}