import React, { useContext } from 'react';
import AppContext from '../../../../contexts/AppContext';
import { Callout } from '../Typography';

function Saving(props) {

    const { theme } = useContext(AppContext)
    const isSaved = props.saving === "Saved"
    const color = isSaved ? theme.primary : theme.text
    const icon = () => {
        if (isSaved) {
            return (<i class="fas fa-check"></i>)
        }
    }
    return (
        <div
            className="flexer align-all-center"
            onMouseDown={props.onClick}
            style={{
                color: color,
                ...props.style
            }}>
            <Callout style={{
                color: color,
                padding: '8px'
            }}>{props.saving}  {icon()}</Callout>
        </div>
    )
}

export default Saving;
