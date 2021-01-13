import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';

import { gigService } from '../services/gigService'
import { saveGig, removeGig } from '../store/actions/gigActions'
import { loadReviews, addReview } from '../store/actions/reviewActions'

class _GigDetails extends React.Component {

    state = {
        gig: {
            name: '',
            type: 'All',
            price: ''
        }
    }

    componentDidMount() {
        if (this.props.match.params.gigId) this.loadGig()
        // console.log(this.state.gig._id);
        // this.props.loadReviews(this.state.gig._id).then(reviews => console.log(reviews))
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.gigId !== this.props.match.params.gigId) {
            this.loadGig()
        }
    }

    loadGig = () => {
        const { gigId } = this.props.match.params
        gigService.getById(gigId)
            .then(gig => {
                this.setState({ gig })
            })
            .then(() => {
                console.log(this.state.gig)
                this.props.loadReviews(this.state.gig._id)
            })

    }

    handleInput = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState(prevState => {
            return {
                gig: {
                    ...prevState.gig,
                    [field]: value
                }
            }
        })
    }

    onSaveGig = (ev) => {
        ev.preventDefault()
        this.props.saveGig(this.state.gig)
            .then(() => this.props.history.push('/gigs'))
    }

    onRemoveGig = () => {
        this.props.removeGig(this.state.gig._id)
            .then(() => this.props.history.push('/gigs'))
    }

    onAddReview = () => {
        const content = prompt('Enter your review please...')
        const reviewToAdd = {
            content,
            gigId: this.state.gig._id
        }
        this.props.addReview(reviewToAdd)
    }

    render() {
        if (!this.state.gig) return <div>No gig...</div>
        const { gig } = this.state
        return (
            <>
                <form onSubmit={this.onSaveGig} className="gig-edit-form">
                    <div className="flex align-base mrg-start mrg-top mrg-bottom">
                        <label htmlFor="name">Gig Name:</label>
                        <input className="mrg-end" type="text" name="name" value={gig.name} onChange={this.handleInput} />
                        <label htmlFor="price">Price:</label>
                        <input className="mrg-end" type="text" name="price" value={gig.price} onChange={this.handleInput} />
                        <label htmlFor="type">Gig Type:</label>
                        <select className="mrg-start" name="type" id="type" onChange={this.handleChange} value={gig.type} onChange={this.handleInput}>

                            {this.props.gigTypes && this.props.gigTypes.map(type => {
                                return <option key={type} value={type}>{type}</option>
                            })}

                        </select>
                    </div>
                    <div>
                        <div className="details-buttons flex space-between">
                        </div>

                    </div>
                <Link to="/gigs">
                    <Button className="mrg-start" variant="outlined" color="primary">Go Back</Button>
                </Link>

                </form>
                <h2>Book Reviews:</h2>
                <ul className="gig-reviews-list flex clean-list">
                    {this.props.reviews.map(review => {
                        return <li className="shadow" key={review._id}>
                            <h4>Reviewer name...</h4>
                            <p>{review.content}</p>
                        </li>
                    })}
                </ul>
            </>
        )
    }
}

const mapGlobalStateToProps = (state) => {
    return {
        gigs: state.gigModule.gigs,
        gigTypes: state.gigModule.gigTypes,
        reviews: state.reviewModule.reviews
    }
}

const mapDispatchToProps = {
    saveGig,
    removeGig,
    loadReviews,
    addReview
}

export const GigDetails = connect(mapGlobalStateToProps, mapDispatchToProps)(_GigDetails)