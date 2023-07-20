const GET_FOLLOWS = 'follow/GET_FOLLOWS'


const getFollows = (follows) => ({
    type: GET_FOLLOWS,
    follows
})


export const getFollowsThunk = (userId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}/follows`)

    if (response.ok){
        const follows = await response.json();
        dispatch(getFollows(follows))
        return follows
    }
}


const initialState = {}


export default function followsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_FOLLOWS:
            return {...action.follows};

        default:
            return state;
    }
}
