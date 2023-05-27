const GET_RECIPES = 'recipe/GET_RECIPES'
const ADD_RECIPE = 'recipe/ADD_RECIPE'


const getRecipes = (recipes) => ({
    type: GET_RECIPES,
    recipes
})

const addRecipe = (recipe) => ({
    type: ADD_RECIPE,
    recipe
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

export const addRecipeThunk = (recipeData) => async (dispatch) => {
    const {owner_id, recipe_title, recipe_type, preperation_time, notes, ingredients, instructions } = recipeData
    const response = await fetch('/api/recipes/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            owner_id,
            recipe_type,
            recipe_title,
            preperation_time,
            notes,
            ingredients,
            instructions
        })
    });

    if(response.ok) {
        const recipe = await response.json()
        dispatch(addRecipe(recipe))
        return recipe
    }
}


export default function recipesReducer(state = initialState, action) {
    switch (action.type) {
        case GET_RECIPES:
            return {...state, ...action.recipes}

        case ADD_RECIPE:
            return {...state, [action.recipe.id]: action.recipe}

        default:
            return state;
    }
}
