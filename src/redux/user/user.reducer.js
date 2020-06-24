const INITIAL_STATE = { //we have to have an initial state of some sort for when we first start the app.
    currentUser: null
}

const userReducer = (state = INITIAL_STATE, action) => { //this state=INITIAL_STATE lets us add currentUser property to our state when we first start the app. This is a new feature where we're setting it a default parameter which lets us set a default value to state if state is undefined or is not set. Null is a value btw.
    switch (action.type) {
        case 'SET_CURRENT_USER':
            return {
                ...state, //spreading everything else in the state, because we only change the values that we care about.
                currentUser: action.payload
            }
        default:
            return state; //we use this default to return state because in redux every single reducer gets every single action that is fired, even if its not related to the reducer. So for any other action for other reducer fires, we have to make sure that this reducer knows what to do, which is to just return the current state and not change it and rerender anything.
    }
}

export default userReducer;