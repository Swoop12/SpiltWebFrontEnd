import React from 'react';
import RecipeCard from '../Elements/RecipeCard'
import Spinner from 'react-spinkit'

function RecipeList(props) {
    const recipeListItems = () => {
        debugger
        return props.recipes.map(recipe => {
            const route = "/brew/" + recipe._id
            return (
                <RecipeCard
                    style={{
                        flex: '1 0 300px',
                        minWidth: '40%',
                    }}
                    route={route}
                    {...recipe} />
            )
        })
    }

    const views = () => {
        if(!props.recipes) {
            return (<Spinner name='chasing-dots' />)
        } else {
            return recipeListItems()
        }
    }

    return (
        <div className="flexer justify-center">
            {views()}
        </div>
    )
}

export default RecipeList;
