const GET_COMMENT = 'comments/GET_COMMENT'
const ADD_COMMENT = 'comments/ADD_COMMENT'
const DELETE_COMMENT = 'comments/DELETE_COMMENT'


const getAllComments = (comments) => ({
    type: GET_COMMENT,
    comments
})

const addComment = (comment) => ({
    type: ADD_COMMENT,
    comment
})

const deleteComment = (id) => ({
    type: DELETE_COMMENT,
    id
})


const initialState = {}


export const getAllCommentsThunk = (recipeId) => async (dispatch) => {
    const response = await fetch(`/api/recipes/${recipeId}/comments`)

    if (response.ok) {
        const comments = await response.json()
        dispatch(getAllComments(comments))
        return comments
    }
}

export const addCommentThunk = (commentData, image) => async (dispatch) => {
    const response = await fetch('/api/comments/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(commentData)
    })

    const addImage = await fetch('/api/')

    if (response.ok) {
        const comment = await response.json();
        dispatch(addComment(comment));
        return comment;
    };
};

export const deleteCommentThunk = (id) => async (dispatch) => {
    const response = await fetch(`/api/comments/${id}`, {
        method: 'DELETE',
    })

    if (response.ok) {
        const deleted = response.json()
        dispatch(deleteComment(id))
        return deleted
    }
}


export default function commentsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_COMMENT:
            return {...action.comments}

        case ADD_COMMENT:
            return { ...state, [action.comment.id]: action.comment}

        case DELETE_COMMENT:
            let newState = {...state}
            delete newState[action.id]
            return newState

        default:
            return state;
    };
};
