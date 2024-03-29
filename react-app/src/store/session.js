// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const COLLECTION_USER = "session/COLLECTION_USER"

const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

const removeUser = () => ({
	type: REMOVE_USER,
});

const setCollectionUser = (collectionUser) => ({
	type: COLLECTION_USER,
	payload: collectionUser
})

const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const login = (email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		dispatch(removeUser());
	}
};

export const signUp = (firstName, lastName, username, email, password, userImage) => async (dispatch) => {
	const first_name = firstName
	const last_name = lastName
	const user_image = userImage
	const response = await fetch("/api/auth/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			first_name,
			last_name,
			username,
			email,
			password,
			user_image,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const collectionUserThunk = (userId) => async (dispatch) => {
	const response = await fetch(`/api/users/${userId}`, {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok){
		const collectionUser = await response.json();
		dispatch(setCollectionUser(collectionUser));
		return collectionUser
	}
}

export default function sessionReducer(state = initialState, action) {
	switch (action.type) {
		case SET_USER:
			return { user: action.payload };
		case REMOVE_USER:
			let newState = {...state}
			delete newState.user
			newState.user = null
			return newState
		case COLLECTION_USER:
			return {...state, collectionUser: action.payload}
		default:
			return state;
	}
}
