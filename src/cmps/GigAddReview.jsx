import React, { Component } from 'react'
import { connect } from 'react-redux'
import { utilService } from '../services/utilService.js'
import { addGig, updateGig, loadGig } from '../store/actions/gigActions'
import StarIcon from '@material-ui/icons/Star';
// import Rating from '../cmps/HoverRating.jsx'
import { HoverRating } from '../cmps/HoverRating.jsx'
import setValue from '../cmps/HoverRating.jsx'
import Rating from '@material-ui/lab/Rating';
import {HalfRating} from './HoverRating.jsx'

class _GigAddReview extends Component {


    state = {
        gig: null,
        user: null,
        review: '',
        value: '0',
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
        console.log("rate", rate)
        const { review } = { ...this.state }
        review.rating = rate
        console.log("review", review)
        this.setState({ review })
    }

    onAddReview = () => {
        const { review } = this.state
        const { gig } = this.state
        const { user } = this.state
        let reviewToAdd = { ...review }
        const purchasedAt = "purchase At"
        const date = Date.now()
        reviewToAdd.createdAt = date
        reviewToAdd.purchasedAt = purchasedAt
        console.log("reviewToAdd", reviewToAdd)
        gig.reviews.unshift(reviewToAdd)
        this.props.updateGig(gig).then(() => {
            this.setState({review:null})
            console.log('review added succefully')
        })

    }
    logValue = (value) => {
        console.log('value!!!', value);
    }

    onSave = (ev, value) => {
        console.log("value", value)
        console.log("ev", ev)
        console.log('hey');
    }

    render() {
        const { user, gig, review } = this.state
        console.log("render , review", review)
        console.log("render , review", review)
        // console.log("render , value", value)
        if(!review) return <div></div>
        return (
            <>
                 <HoverRating className="stars-rate" handleRate={this.handleRate} newHover={this.state.value} />
                {/* <Rating name="half-rating" defaultValue={2.5} precision={0.5} handleRate={this.handleRate}  /> */}
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