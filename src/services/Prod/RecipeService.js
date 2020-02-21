
class RecipeService {

    constructor(networkingService, errorService) {
        this.networkingService = networkingService
        this.errorService = errorService
    }

    loadRecipes = (predicate) => {
        const path = 'recipes'
        return this.networkingService.networkCall('get', path, null, predicate)
            .catch(error => {
                this.errorService.addError(error)
                return error
            })
    }

    fetchRecipeDetailsWitId = recipeId => {
        const path = `recipes/${recipeId}`
        return this.networkingService.networkCall('get', path)
            .catch(error => {
                this.errorService.addError(error)
                throw error
            })
    }

    createRecipes = (title, coverPhotoUrl, brewTime, authorId, instructions, videoLink) => {
        const newRecipe = {
            title,
            coverPhotoUrl,
            videoLink,
            author: authorId,
            brewTime: brewTime,
            instructions
        }
        const path = 'recipes'
        return this.networkingService.networkCall('post', path, newRecipe)
            .catch(error => {
                this.errorService.addError(error)
                throw error
            })
    }

    updateRecipeWithId = (recipeId, updates) => {
        const path = `recipes/${recipeId}`
        return this.networkingService.networkCall('put', path, updates)
            .catch(error => {
                this.errorService.addError(error)
                throw error
            })
    }

    deleteRecipeWithId = (recipeId) => {
        const path = `recipes/${recipeId}`
        return this.networkingService.networkCall('delete', path)
            .catch(error => {
                this.errorService.addError(error)
                throw error
            })
    }
}

export default RecipeService