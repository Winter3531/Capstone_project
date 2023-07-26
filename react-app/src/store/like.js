const GET_LIKES = 'like/GET_LIKES'
const ADD_LIKE = 'like/ADD_LIKE'
const DELETE_LIKE = 'like/DELETE_LIKE'


const getLikes = (likes) => ({
    type:GET_LIKES,
    likes
})

const newLike = (like) => ({
    type: ADD_LIKE,
    like
})

const deleteLike = (id) => ({
    type: DELETE_LIKE,
    id
})


export const getLikesThunk = (userId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}/likes`)

    // console.log(userId)

    if (response.ok){
        const likes = await response.json();
        dispatch(getLikes(likes))
        return likes
    }
}

export const newLikeThunk = (likeData) => async (dispatch) => {
    const response = await fetch('/api/likes/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(likeData)
    })

    if (response.ok){
        const like = await response.json()
        dispatch(newLike(like))
        return like
    }
}

export const deleteLikeThunk = (likeId) => async (dispatch) => {
    const response = await fetch(`/api/likes/${likeId}/delete`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })

    if (response.ok){
        const deletedLike = await response.json()
        dispatch(deleteLike(likeId))
        return deletedLike
    }
}


const initialState = {}


export default function likesReducer(state = initialState, action) {
    switch (action.type) {
        case GET_LIKES:
            return {...action.likes}

        case ADD_LIKE:
            return {...state, [action.like.id]: action.like}

        case DELETE_LIKE:
            let newState = {...state}
            delete newState[action.id]
            return newState

        default:
            return state;
    }
}
