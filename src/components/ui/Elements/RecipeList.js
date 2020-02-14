import React from 'react';
import RecipeCard from '../Elements/RecipeCard'

function RecipeList(props) {
    const recipeListItems = () => {
        return props.recipes.map(recipe => {
            const route = props.match.path + "/" + recipe._id
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

    return (
        <div className="flexer justify-center">
            {recipeListItems()}
        </div>
    )
}

export default RecipeList;
