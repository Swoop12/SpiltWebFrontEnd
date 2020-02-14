import React from 'react';
import { Headline } from './Typography';
import AppContext from '../../../contexts/AppContext'

class SectionHeader extends React.Component {
    static contextType = AppContext
    render() {
        const color = this.context.theme.text
        return (
            <div className="section-header"
                style={{color}}>
                <Headline>{this.props.children}</Headline>
                <hr style={{borderTop: `1px solid ${color}`}}/>
            </div>
        )
    }
}

export default SectionHeader;
