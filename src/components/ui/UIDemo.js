import React, { Component } from 'react'
import StackedFilter from './Elements/StackedFilter'
import { Switch, Route } from "react-router-dom";
import Components from './components/Components';
import Elements from './Elements/Elements'
import { ThemedButton } from './Elements/Buttons'
import AppContext from '../../contexts/AppContext'

class UIDemo extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    onDemoSelectionChange = selections => {
        let selection = selections[0]
        console.log(this.props)
        this.props.history.push(`${this.props.match.url}/${selection}`)
    }

    render() {
        return (
            <AppContext.Consumer>
                {
                    ({ theme, toggleTheme }) => (
                        <div>

                <div style={{ display: 'flex', alignItems: 'flexEnd', margin: '16px' }}>
                    <ThemedButton
                        onClick={toggleTheme}>
                        {theme.name}
                    </ThemedButton>
                </div>
                            <StackedFilter
                                optionTree={["Elements", "Components"]}
                                selected={["Elements"]}
                                onChange={this.onDemoSelectionChange}
                            />
                            <Switch>
                                <Route path={`${this.props.match.path}/elements`} render={props => (<Elements theme={theme} {...props}/>)} />
                                <Route path={`${this.props.match.path}/components`} render={props => (<Components theme={theme} {...props}/>)} />
                            </Switch>
                        </div>
                    )}
            </AppContext.Consumer>
        )
    }
}

export default UIDemo
