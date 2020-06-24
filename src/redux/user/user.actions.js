import {UserActionTypes} from './user.types'

export const setCurrentUser = user => ({ //is a function that receieves a user object and returns that user as a payload which we use in our reducer to update the user state/reducer
    type: UserActionTypes.SET_CURRENT_USER, 
    payload: user
})

