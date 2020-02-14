import React, { Component } from 'react'
import { ForegroundDiv } from './Theme'
import AppContext from '../../../contexts/AppContext'
import { Callout } from './Typography'

class StackedFilterDataModel {

    optionTree
    encodedOptions = {}

    constructor(optionTree) {
        this.optionsTree = optionTree
        this.encodeDictionary(optionTree, 1, 0)
    }

    encodeDictionary = (option, currentLayerNumber, parent) => {
        if (option === null) { return }
        switch (typeof option) {
            case 'object':
                if (Array.isArray(option)) {
                    this.encodeArrayOption(option, currentLayerNumber, parent)
                } else {
                    this.encodeObjectOption(option, currentLayerNumber, parent)
                }
                break
            default:
                this.encodeValueOption(option, currentLayerNumber, parent)
        }

    }

    encodeObjectOption = (option, currentLayerNumber, parent) => {
        var letterCounter = "a"
        Object.keys(option).forEach(optionKey => {
            this.encodeDictionary(option[optionKey], currentLayerNumber + 1, letterCounter)
            const key = this.encodedKey(currentLayerNumber, parent, letterCounter)
            this.encodedOptions[key] = optionKey
            letterCounter = this.nextLetter(letterCounter)
        })
    }

    encodeValueOption = (option, currentLayerNumber, parent, letterValue) => {
        const encodedKey = this.encodedKey(currentLayerNumber, parent, letterValue)
        this.encodedOptions[encodedKey] = option
    }

    encodeArrayOption = (option, currentLayerNumber, parent) => {
        var currentLetter = "a"
        option.forEach(value => {
            this.encodeValueOption(value, currentLayerNumber, parent, currentLetter)
            currentLetter = this.nextLetter(currentLetter)
        })
    }

    nextLetter = letter => {
        return String.fromCharCode(letter.charCodeAt(0) + 1)
    }

    encodedKey = (level, parent, value) => {
        return [level, parent, value].join(',')
    }
}

class FilterLayer extends Component {
    static contextType = AppContext

    render() {
        var theme = this.context.theme
        const { selected, layerNumber } = this.props
        const filters = this.props.filters.map(filter => {
            var selectedStyle = selected[layerNumber] === filter ? { backgroundColor: theme.foregroundSelected } : {}
            let style = {
                flexGrow: 1,
            }
            let innerStyle = {
                borderRadius: '4px',
                padding: '16px',
                margin: '8px',
                ...selectedStyle,
            }
            return (
                <div style={style} onClick={() => this.props.filterSelected(filter, layerNumber)}>
                    <div style={innerStyle}>
                        <div className="centered">
                            <Callout className="centered">{filter}</Callout>
                        </div>
                    </div>
                </div >
            )
        })

        return (
            <ForegroundDiv className='center-container space-even'>
                {filters}
            </ForegroundDiv>
        )
    }
}

class StackedFilter extends Component {

    constructor(props) {
        super(props)
        if (!props.optionTree) {
            this.state = {
                optionTree: [],
                selected: []
            }
            return
        }

        this.state = {
            optionTree: props.optionTree,
            selected: props.selected || [props.optionTree[0]]
        }
        this.filterSelected = this.filterSelected.bind(this)
    }

    setSelection(selected) {
        this.setState({
            selected: selected
        })
        if (this.props.onChange) {
            this.props.onChange(selected)
        }
    }

    filterSelected = (filter, layerNumber) => {
        const previousSelected = this.state.selected.slice()
        var newSelected
        console.log("PreviousSelection", previousSelected)
        console.log("This", this)
        if (!previousSelected[layerNumber]) {
            newSelected = [...previousSelected, filter]
        } else {
            if (filter === previousSelected[previousSelected.length - 1]) {
                newSelected = previousSelected.slice(0, layerNumber)
            } else {
                newSelected = previousSelected.slice(0, layerNumber + 1)
                newSelected[layerNumber] = filter
            }
        }
        this.setSelection(newSelected)
    }

    buildlayers = () => {
        var selections = this.state.selected.slice()
        var currentTree = this.state.optionTree
        var layers = []
        while (selections) {
            if (!currentTree) {
                break
            } else if (Array.isArray(currentTree)) {
                layers.push(currentTree)
                break
            } else if (typeof currentTree === 'string') {
                layers.push([currentTree])
                break
            } else {
                layers.push(Object.keys(currentTree))
                const upperMostSelection = selections.shift()
                if (upperMostSelection !== 0 && upperMostSelection) {
                    currentTree = currentTree[upperMostSelection]
                } else {
                    selections = null
                }
            }
        }
        return layers
    }

    layersForTree = (tree) => {
        const layers = this.buildlayers()
        return layers.map((layer, index) => (<FilterLayer
            filters={layer}
            filterSelected={this.filterSelected}
            layerNumber={index}
            selected={this.state.selected} />))
    }

    render() {
        return (
            <div>
                {this.layersForTree(this.state.optionTree)}
            </div>
        )
    }
}

export default StackedFilter
