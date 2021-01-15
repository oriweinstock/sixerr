import { cloudinaryService } from "../../services/cloudinaryService.js";
import { userService } from "../../services/userService.js";


// export function loadUser(userCreds) {
//     return (dispatch) => {
//         return userService.login(userCreds)
//             .then(user => {
//                 const action = {
//                     type: 'SET_USER',
//                     user
//                 }
//                 dispatch(action)
//             })
//     }
// }
export function login(userCreds) {
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
            .then(() => {
                const action = {
                    type: 'SET_NO_USER'
                }
                dispatch(action)
            })
    }
}
export function addUser(user) {
    // Add default empty fields
    user.imgUrl = '/img/img1.jpg'
    user.isAdmin = false
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
export function onImageChange(ev) {
    return (dispatch, getState) => {
        return cloudinaryService.uploadImg(ev)
            .then(data => {
                const user = { ...getState().userModule.user }
                console.log(user)
                user.imgUrl = data.secure_url
                userService.update(user).then(
                    user => {
                        const action = {
                            type: 'SET_USER',
                            user
                        }
                        dispatch(action)
                    }
                )
            })
    }
}
export function viewGig(gigId) {
    return (dispatch, getState) => {
        const user = { ...getState().userModule.user }
        if (user.viewedGigIds) {
            if (!user.viewedGigIds.find(viewedGigId => viewedGigId === gigId)) user.viewedGigIds.push(gigId)
        } else user.viewedGigIds = [gigId]
        return userService.update(user)
            .then(user => {
                const action = {
                    type: 'SET_USER',
                    user
                }
                dispatch(action)
            }
            )
    }
}
export function updateUser(user) {
    return (dispatch) => {
        return userService.update(user)
            .then(user => {
                const action = {
                    type: 'SET_USER',
                    user
                }
                dispatch(action)
            }
            )
    }
}

