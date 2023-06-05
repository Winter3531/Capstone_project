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

    let newComment = await response.json();
    const imageData = {
        'imageable_id': newComment.id,
        'image': image,
    }

    const addImage = await fetch('/api/images/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(imageData)
    })

    const commentRes = await fetch(`/api/comments/${newComment.id}`)

    if (commentRes.ok) {
        console.log('response OK ************************')
        newComment = await commentRes.json();
        dispatch(addComment(newComment));
        return newComment;
    };
};

export const editCommentThunk = (commentId, commentData, imageId, image) => async (dispatch) => {
    const response = await fetch(`/api/comments/${commentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(commentData)
    })

    let editComment = await response.json();
    const imageData = {
        'imageable_id': commentId,
        'image': image,
    }

    const editImage = await fetch(`/api/images/${imageId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(imageData)

    })

    const commentRes = await fetch(`/api/comments/${commentId}`)

    if(commentRes.ok){
        editComment = await commentRes.json()
        dispatch(addComment(editComment));
        return editComment;
    }
}

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
