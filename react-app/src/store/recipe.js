const GET_RECIPES = 'recipe/GET_RECIPES'
const ADD_RECIPE = 'recipe/ADD_RECIPE'
const DELETE_RECIPE = 'recipe/DELETE_RECIPE'


const getRecipes = (recipes) => ({
    type: GET_RECIPES,
    recipes
})

const addRecipe = (recipe) => ({
    type: ADD_RECIPE,
    recipe
})

const deleteRecipe = (id) => ({
    type: DELETE_RECIPE,
    id
})


const initialState = {}


export const allRecipesThunk = () => async (dispatch) => {
    const response = await fetch('/api/recipes/', {
        headers: {
			"Content-Type": "application/json",
		},
    });
    if (response.ok) {
        const recipes = await response.json();
        dispatch(getRecipes(recipes))
        return recipes
    }
}

export const addRecipeThunk = (recipeData, ingredients, instructions, image) => async (dispatch) => {
    const {owner_id, recipe_title, recipe_type, preperation_time, notes} = recipeData
    const response = await fetch('/api/recipes/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            owner_id,
            recipe_type,
            recipe_title,
            preperation_time,
            notes
        })
    });

    const recipe = await response.json();
    const recipe_id = recipe.id
    // key into recipe ID with recipe.id

    const imageData = {
        'image_type': 'recipe',
        'imageable_id': recipe.id,
        'preview': true,
        'image': image,
    }

    const addImage = await fetch('/api/images/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(imageData)
    })

    if(response.ok ) {
        dispatch(addRecipe(recipe))
        return recipe
    }else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
}

export const updateRecipeThunk = (id, recipeData, imageId, image) => async (dispatch) => {
    const {owner_id, recipe_title, recipe_type, preperation_time, notes, ingredients, instructions } = recipeData

    const response = await fetch(`/api/recipes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            owner_id,
            recipe_type,
            recipe_title,
            preperation_time,
            notes
        })
    })

    // const imageData = {
    //     'image_type': 'recipe',
    //     'imageable_id': id,
    //     'preview': true,
    //     'image': image,
    // }

    // const editImage = await fetch(`/api/images/${imageId}`, {
    //     method: 'PUT',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(imageData)
    // })

    if(response.ok) {
        const recipe = await response.json()
        dispatch(addRecipe(recipe))
        return recipe
    }
}

export const deleteRecipeThunk = (id) => async (dispatch) => {
    const response = await fetch(`/api/recipes/${id}/delete`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })

    if(response.ok){
        const recipe = await response.json()
        dispatch(deleteRecipe(id))
        return recipe
    }
}


export default function recipesReducer(state = initialState, action) {
    switch (action.type) {
        case GET_RECIPES:
            return {...action.recipes}

        case ADD_RECIPE:
            return {...state, [action.recipe.id]: action.recipe}

        case DELETE_RECIPE:
            const newState = {...state}
            delete newState[action.id]
            return newState

        default:
            return state;
    };
};
