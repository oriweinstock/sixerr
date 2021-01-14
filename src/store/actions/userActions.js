import { userService } from "../../services/userService.js";


export function login(userCreds ) {
    return (dispatch) => {
        return userService.login(userCreds)
            .then(user => {
                const action = {
                    type: 'SET_USER',
                    user
                }
                dispatch(action)
            })
    }
}
export function logout() {
    return (dispatch) => {
        return userService.logout()
            .then( () => {
                const action = {
                    type: 'SET_NO_USER'
                }
                dispatch(action)
            })
    }}
export function addUser(user) {
    console.log(user)
    return (dispatch) => {
        return userService.signup(user)
            .then(user => {
                const action = {
                    type: 'SET_USER',
                    user
                }
                dispatch(action)
            })
    }
}


 
export function updateUserActivities(activity, text) {
    return (dispatch) => {
        return userService.updateUserActivities(activity, text)
            .then((user) => {
                const action = {
                    type: 'UPDATE_ACTIVITIES',
                    user
                }
                dispatch(action)
            })
    }
}

export function updateUserPreferences (username, prefs) {
    return (dispatch) => {
        return userService.updateUserPreferences(username, prefs)
            .then((user) => {
                const action = {
                    type: 'UPDATE_PREFS',
                    user
                }
                dispatch(action)
            })
    }
}
