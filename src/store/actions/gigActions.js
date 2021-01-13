import { gigService } from "../../services/gigService.js";

export function loadGigs() {
    return (dispatch, getState) => {
        const {filterBy} = getState().gigModule
        return gigService.query(filterBy)
            .then(gigs => {
                const action = {
                    type: 'SET_GIGS',
                    gigs
                }
                dispatch(action)
            })
    }
}

export function getById(gigId) {
    return gigService.getById(gigId)
}

export function removeGig(gigId) {
    return (dispatch) => {
        return gigService.deleteGig(gigId)
            .then(() => {
                const action = {
                    type: 'REMOVE_GIG',
                    gigId
                }
                dispatch(action)
            })
    }
}
export function addGig(gig) {
    return (dispatch) => {
        return gigService.save(gig)
            .then((savedGig) => {
                const action = {
                    type: 'ADD_GIG',
                    savedGig
                }
                dispatch(action)
            })
    }
}
export function updateGig(gig) {
    return (dispatch) => {
        return gigService.save(gig)
            .then((gig) => {
                const action = {
                    type: 'SAVE_GIG',
                    gig
                }
                dispatch(action)
            })
    }
}

export function setFilter(filterBy) {
    return (dispatch) => {
        const action = {
            type: 'FILTER_GIGS',
            filterBy
        }
        dispatch(action)
    }
}
