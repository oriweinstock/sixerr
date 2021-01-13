import React from 'react'
import { connect } from 'react-redux'


class _GigDetails extends React.Component {

    state = {
        gig: {
            name: '',
            type: 'All',
            price: ''
        }
    }

    componentDidMount() {
    }
    render() {
        return (
            <>
            <h1>GIG DETAILS</h1>
            </>
        )
    }
}

const mapGlobalStateToProps = (state) => {
    return {
        gigs: state.gigModule.gigs,
    }
}

const mapDispatchToProps = {

}

export const GigDetails = connect(mapGlobalStateToProps, mapDispatchToProps)(_GigDetails)