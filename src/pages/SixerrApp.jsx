import React from 'react'
import { connect } from 'react-redux'
import { GigList } from '../cmps/GigList.jsx';
import { Login } from './Login.jsx'
import { loadGigs, setFilter, removeGig } from "../store/actions/gigActions.js";
import { viewGig } from "../store/actions/userActions.js";


class _SixerrApp extends React.Component {

    componentDidMount() {
        this.props.loadGigs()
    }

    onUserViewGig = (gigId) => {
        this.props.viewGig(gigId)
    }

    onDelete = () => { }

    render() {
        return (
            <section className="sixerr-app main-layout">
                <div className="flex space-around align-center mrg-top mrg-bottom">
                    {/* <GigFilter /> */}
                </div>
                <GigList gigs={this.props.gigs} onUserViewGig={this.onUserViewGig} onDelete={this.onDelete} />
            </section>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        gigs: state.gigModule.gigs,
        filterBy: state.gigModule.filterBy,
        user: state.userModule.user
    }
}

const mapDispatchToProps = {
    loadGigs,
    setFilter,
    removeGig,
    viewGig
}

export const SixerrApp = connect(mapStateToProps, mapDispatchToProps)(_SixerrApp)
