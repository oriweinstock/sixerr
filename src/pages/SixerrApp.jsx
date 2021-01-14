import React from 'react'
import { connect } from 'react-redux'
import { GigList } from '../cmps/GigList.jsx';
import { Login } from './Login.jsx'
import { loadGigs, setFilter, removeGig } from "../store/actions/gigActions.js";


class _SixerrApp extends React.Component {

    componentDidMount() {
        this.props.loadGigs()
    }

    onDelete = () => { }

    render() {
        return (
            <section className="sixerr-app main-layout">
                <div className="flex space-around align-center mrg-top mrg-bottom">
                    {/* <GigFilter /> */}
                </div>
                <GigList gigs={this.props.gigs} onDelete={this.onDelete} />
            </section>

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
