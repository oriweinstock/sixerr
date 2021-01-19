import React, { Component } from 'react'
import { connect } from 'react-redux'
import { utilService } from '../services/utilService.js'
import { addGig, updateGig, loadGig } from '../store/actions/gigActions'
import { HoverRating } from '../cmps/HoverRating.jsx'


class _GigAddReview extends Component {


    state = {
        gig: null,
        user: null,
        review: '',
    }

    componentDidMount() {
        const { gig } = this.props
        const { user } = this.props
        const review = this.createReviewTemplate(gig, user)
        this.setState({ gig, user, review })
    }

    createReviewTemplate = (gig, user) => {
        const by = { _id: user._id, fullname: user.fullname, imgUrl: user.imgUrl }
        const id = utilService.makeId()
        const review = { id, rating: '', txt: '', createdAt: null, purchasedAt: null, seller: gig.owner, by }
        return review
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState(prevState => {
            return {
                review: {
                    ...prevState.review,
                    [field]: value
                }
            }
        })
    }
    handleRate = (rate) => {
        const { review } = { ...this.state }
        review.rating = rate
        this.setState({ review })
    }

    onAddReview = () => {
        const { review } = this.state
        const { gig } = this.state
        let reviewToAdd = { ...review }
        // todo: add purchase date when we have data
        const purchasedAt = "purchase At"
        const date = Date.now()
        reviewToAdd.createdAt = date
        reviewToAdd.purchasedAt = purchasedAt
        gig.reviews.unshift(reviewToAdd)
        this.props.updateGig(gig).then(() => {
            this.setState({review:null})
            console.log('review added succefully')
        })

    }

    render() {
        const {review } = this.state
        if(!review) return <div></div>
        return (
            <>
                 <HoverRating className="stars-rate" handleRate={this.handleRate} val={review.rating} />
                <textarea rows="6" cols="60" type="text" name="txt" placeholder='enter review...' value={review.txt}  onChange={this.handleChange} required />
                <button className="add-review" onClick={() => this.onAddReview()}>Add Review</button>
            </>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        gigs: state.gigModule.gigs,
        user: state.userModule.user
    }
}

const mapDispatchToProps = {
    addGig,
    updateGig,
    loadGig,
}

export const GigAddReview = connect(mapStateToProps, mapDispatchToProps)(_GigAddReview)