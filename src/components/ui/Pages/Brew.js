import React, { Component } from 'react'
import Banner from '../components/Banner'
import StackedFilter from '../Elements/StackedFilter'
import { recipes } from '../../../services/Mock/MockDatabase'
import RecipeList from '../Elements/RecipeList'
import AppContext from '../../../contexts/AppContext'
import { CreateButton } from '../Elements/Buttons'
import { Route } from 'react-router-dom';
import { serviceFactory } from '../../../services/ServiceFactory'

let brewFilters = ["Pour Over", "Chemex", "French Press", "Espresso"]

class Brew extends Component {

    static contextType = AppContext
    recipeService = serviceFactory.recipeService()

    static defaultProps = {
        banner: {
            title: "The Spilt Pour Over",
            linkTitle: "by Fellow",
            link: "https://www.linkedin.com/in/patrick-adcock-3b96a5105/",
            photoUrl: "https://cdn.shopify.com/s/files/1/0057/6235/1219/articles/BHxFellow_InitialSelects_Edited_-10_600x.jpg?v=1573092289"
        },
        recipes: []
    }

    constructor(props) {
        super(props)
        this.state = { recipes: [] }
    }

    componentDidMount() {
        this.recipeService.loadRecipes()
            .then(recipes => {
                debugger
                this.setState({ recipes })
            })
    }

    render() {
        return (
            <div
                style={{ background: this.context.theme.background }}>
                <Banner
                    props={this.props.banner}
                />
                <StackedFilter
                    optionTree={brewFilters}
                    selected={[brewFilters[0]]} />
                <div className="container">
                    <RecipeList
                        {...this.props}
                        recipes={this.state.recipes}
                    />
                </div>
                <CreateButton
                    link={this.props.match.path + "/new"}
                    style={{
                        position: "fixed",
                        left: "90vw",
                        bottom: "32px"
                    }} />
            </div>
        )
    }
}

export default Brew
