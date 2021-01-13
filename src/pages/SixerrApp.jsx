import React from 'react'
import { connect } from 'react-redux'
import { GigList } from '../cmps/GigList.jsx';
import { loadGigs, setFilter, removeGig } from "../store/actions/gigActions.js";


class _SixerrApp extends React.Component {

    componentDidMount() {

    }

    onDelete = () => {}

    render() {
        return (
            <>
                <h1>Welcome to Sixerr</h1>
                <GigList gigs={this.props.gigs} onDelete={this.onDelete} />
            </>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        gigs: state.gigModule.gigs,
        filterBy: state.gigModule.filterBy
        // user: state.userModule.user
    }
}

const mapDispatchToProps = {
    loadGigs,
    setFilter,
    removeGig
}

export const SixerrApp = connect(mapStateToProps, mapDispatchToProps)(_SixerrApp)
