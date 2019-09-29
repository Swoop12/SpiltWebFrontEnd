import React from 'react'
import LinkIcon from '../../images/link.svg'

export const LinkComponent = (props) => {
  const { editUrl, handleLinkEdit, componentID } = props.contentState.getEntity(props.entityKey).getData();
  const absoluteUrl = "http://"+editUrl.url
  return (
    <p style={{display: "inline"}}
        ref={componentID}>
         [ <a href={absoluteUrl} style={{ "color": "darkGreen" }}>
      {props.children}
    </a>] 
        (<img src={LinkIcon} 
            alt="Link"
            className="text-inline-icon"
            onClick={() => handleLinkEdit(componentID, editUrl)}/>)
     </p>
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