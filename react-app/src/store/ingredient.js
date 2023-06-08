const GET_INGREDIENT = 'ingredients/GET_INGREDIENT'
const ADD_INGREDIENT = 'ingredients/ADD_INGREDIENT'
const DELETE_INGREDIENT = 'ingredients/DELETE_INGREDIENT'


const getIngredient = (ingredient) => ({
    type: GET_INGREDIENT,
    ingredient
})

const addIngredient = (ingredient) => ({
    type: ADD_INGREDIENT,
    ingredient
})

const deleteIngredient = (id) => ({
    type: DELETE_INGREDIENT,
    id
})


const initialState = {}


export const getIngredientThunk = (recipeId) => async (dispatch) => {
    const response = await fetch(`/api/ingredients/${recipeId}`)

    if (response.ok){
        const ingredient = await response.json()
        dispatch(getIngredient(ingredient))
        return ingredient
    }
}

export const addIngredientThunk = (ingredientData) => async (dispatch) => {
    const response = await fetch(`/api/ingredients/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ingredientData)
    });

    if (response.ok){
        const newIngredient = await response.json();
        dispatch(addIngredient(newIngredient));
        return newIngredient
    };
}

export const deleteIngredientThunk = (id) => async (dispatch) => {
    const response = await fetch(`/api/ingredients/${id}/delete`, {method: 'DELETE'})

    if (response.ok){
        const ingredient = await response.json()
        dispatch(deleteIngredient(id))
        return ingredient
    }
}


export default function ingredientsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_INGREDIENT:
            return {...action.ingredient}

        case ADD_INGREDIENT:
            return { ...state, [action.ingredient.id]: action.ingredient}

        case DELETE_INGREDIENT:
            const newState = {...state}
            delete newState[action.id]
            return newState

        default:
            return state;
    }
}
