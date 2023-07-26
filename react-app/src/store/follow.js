const GET_FOLLOWS = 'follow/GET_FOLLOWS'
const NEW_FOLLOW = 'follow/NEW_FOLLOW'
const DELETE_FOLLOW = 'follow/'


const getFollows = (follows) => ({
    type: GET_FOLLOWS,
    follows
})


const newFollow = (follow) => ({
    type: NEW_FOLLOW,
    follow
})


const deleteFollow = (id) => ({
    type: DELETE_FOLLOW,
    id
})


export const getFollowsThunk = (userId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}/follows`)

    if (response.ok){
        const follows = await response.json();
        dispatch(getFollows(follows))
        return follows
    }
}


export const newFollowThunk = (followData) => async (dispatch) => {
    console.log(followData)
    const response = await fetch('/api/likes/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(followData)
    })


    if (response.ok){
        const follow = await response.json()
        dispatch(newFollow(follow))
        return follow
    }
}

export const deleteFollowThunk = (followId) => async (dispatch) => {
    const response = await fetch(`/api/likes/${followId}/delete`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })

    if (response.ok){
        const deletedFollow = await response.json()
        dispatch(deleteFollow(followId))
        return deletedFollow
    }
}


const initialState = {}


export default function followsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_FOLLOWS:
            return {...action.follows};

        case NEW_FOLLOW:
            return {...state, [action.follow.id]: action.follow}

        case DELETE_FOLLOW:
            let newState = {...state}
            delete newState[action.id]
            return newState

        default:
            return state;
    }
}
