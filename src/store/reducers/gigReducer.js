const initialState = {
    gigs: [{_id: 'u101', title: 'GIGI 123', price: 100},{_id: 'u102', title: 'GIGIYAHOO 123456', price: 200}],
    filterBy: { type: 'all', text: '' }
}


export function gigReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_GIGS':
            console.log('set', action)
            return { ...state, gigs: action.gigs }
        case 'SAVE_GIG':
            return {
                ...state,
                gigs: state.gigs.map(gig => (gig._id === action.gig._id) ? action.gig : gig)
            }
        case 'ADD_GIG':
            return {
                ...state,
                gigs: [...state.gigs, action.gig]
            }
        case 'FILTER_GIGS':
            return { ...state, filterBy: action.filterBy }
        case 'REMOVE_GIG':
            return { ...state, gigs: state.gigs.filter(gig => gig._id !== action.gigId) }
        default:
            console.log('state')
            return state
    }
}
