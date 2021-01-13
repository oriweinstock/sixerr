import { gigService } from "../../services/gigService.js";

export function loadGigs() {
    return async (dispatch, getState) => {
        const { filterBy } = getState().gigModule
        const gigs = await gigService.query(filterBy)
        const action = {
            type: 'SET_GIGS',
            gigs
        }
        dispatch(action)
    }
}

export function loadGig(gigId) {
    return gigService.getById(gigId)
}

export function removeGig(gigId) {
    return async (dispatch) => {
        await gigService.deleteGig(gigId)
        const action = {
            type: 'REMOVE_GIG',
            gigId
        }
        dispatch(action)

    }
}

export function addGig(gig) {
    return async (dispatch) => {
        const savedGig = await gigService.save(gig)
        const action = {
            type: 'ADD_GIG',
            savedGig
        }
        dispatch(action)

    }
}
export function updateGig(gig) {
    return async (dispatch) => {
        const savedGig = await gigService.save(gig)
        const action = {
            type: 'SAVE_GIG',
            savedGig
        }
        dispatch(action)

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
