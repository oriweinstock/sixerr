import { loadGigs, addGig } from '../store/actions/gigActions.js';
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { gigService } from '../services/gigService.js'


class _GigEdit extends Component {

    state = {
        gig: {
            title: '',
            desc: '',
            // package: '',
            tags: '',
        }
    }

    componentDidMount() {
        console.log('hey');
        const gigId = this.props.match.params.gigId
        console.log("componentDidMount , gigId", gigId)
        if (gigId) {
            gigService.getById(gigId).then((gig) => {
                console.log("gigService.getById , gig", gig)
                this.setState({ gig })
            })
        }
    }
    onSavedGig = (ev) => {
        console.log('on saved gig func :)');
        ev.preventDefault()
        const { gig } = this.state
        this.props.addGig(gig).then(() => {
            console.log('one line before history');
            this.props.history.push('/gig');
        })
    }

    handleInput = ({ target }) => {
        const field = target.name
        console.log("field", field)
        const value = target.value
        console.log("value", value)
        this.setState(prevState => {
            return {
                gig: {
                    ...prevState.gig,
                    [field]: value
                }
            }
        })
    }

    render() {
        const { gig } = this.state
        console.log("render , gig", gig)
        return (
            <form onSubmit={this.onSavedGig} className="flex column justify-center">
                <h4>Edit Title</h4>
                <textarea name="title" autoFocus rows="3" cols="60" value={gig.title} type="text" placeholder="Enter Gig Title..." value={gig.title} onChange={this.handleInput} required autoComplete="off" />
                <h4>Edit Desc</h4>
                <textarea name="desc" autoFocus rows="3" cols="60" value={gig.title} type="text" placeholder="Enter Gig Desc..." value={gig.desc} onChange={this.handleInput} required autoComplete="off" />
                <select onChange={this.handleInput} name="tags">
                    <option value="graphicDesign">graphic design </option>
                    <option value="minimalist">minimalist</option>
                    <option value="flat">flat</option>
                    <option value="modern">modern</option>
                    <option value="book">book</option>
                    <option value="logo design">logo design</option>
                    <option value="cover">cover</option>
                </select>
                <div>
                    <button>Save</button>
                </div>
            </form>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        gigs: state.gigModule.gigs,
    }
}

const mapDispatchToProps = {
    addGig,
}

export const GigEdit = connect(mapStateToProps, mapDispatchToProps)(_GigEdit)