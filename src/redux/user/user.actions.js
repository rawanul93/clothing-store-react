export const setCurrentUser = user => ({ //is a function that receieves a user object and returns that user as a payload which we use in our reducer to update the user state/reducer
    type: 'SET_CURRENT_USER',
    payload: user
})