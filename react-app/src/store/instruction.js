const GET_INSTRUCTION = 'instructions/GET_INSTRUCTION'
const ADD_INSTRUCTION = 'instructions/ADD_INSTRUCTION'
const DELETE_INSTRUCTION = 'instructions/DELETE_INSTRUCTION'


const getInstruction = (instructions) => ({
    type: GET_INSTRUCTION,
    instructions
})

const addInstruction = (instruction) => ({
    type: ADD_INSTRUCTION,
    instruction
})

const deleteInstruction = (id) => ({
    type: DELETE_INSTRUCTION,
    id
})


const initialState = {}


export const getInstructionThunk = (recipeId) => async (dispatch) => {
    const response = await fetch(`/api/recipes/${recipeId}/instructions`)

    if(response.ok){
        const instructions = await response.json()
        dispatch(getInstruction(instructions))
        return instructions
    }
}

export const addInstructionThunk = (instruction) => async (dispatch) => {
    const response = await fetch('/api/instructions/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(instruction)
    })

    if (response.ok){
        const instruction = await response.json()
        dispatch(addInstruction(instruction))
        return instruction
    }
}

export const editInstructionThunk = (id, instruction) => async (dispatch) => {
    const response = await fetch(`/api/instructions/${id}/edit`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(instruction)
    })

    if (response.ok){
        const instruction = await response.json()
        dispatch(addInstruction(instruction))
        return instruction
    }
}

export const deleteInstructionThunk = (id) => async (dispatch) => {
    const response = await fetch(`/api/instructions/${id}/delete`, {
        method: 'DELETE'
    })

    if(response.ok){
        const step = await response.json()
        dispatch(deleteInstruction(id))
        return step
    }
}


export default function instructionsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_INSTRUCTION:
            return {...action.instructions}

        case ADD_INSTRUCTION:
            return {...state, [action.instruction.id]: action.instruction}

        case DELETE_INSTRUCTION:
            const newState = {...state}
            delete newState[action.id]
            return newState

        default:
            return state
    }
}
