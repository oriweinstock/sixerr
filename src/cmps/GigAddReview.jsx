import React, { Component } from 'react'
import { connect } from 'react-redux'
import { utilService } from '../services/utilService.js'
import { addGig, updateGig } from '../store/actions/gigActions'
import StarIcon from '@material-ui/icons/Star';
class _GigAddReview extends Component {


    state = {
        gig: null,
        user: null,
        review: null,
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
            this.setState({review:''})
            console.log('review added succefully');
        })
    }


    render() {
        const { user, gig, review } = this.state
        return (
            <>
                {/* Require on Button....  */}
                <div className="flex">
                    <StarIcon className="star" onClick={() => this.handleRate('1')} ></StarIcon>
                    <StarIcon className="star" onClick={() => this.handleRate('2')} ></StarIcon>
                    <StarIcon className="star" onClick={() => this.handleRate('3')} ></StarIcon>
                    <StarIcon className="star" onClick={() => this.handleRate('4')} ></StarIcon>
                    <StarIcon className="star" onClick={() => this.handleRate('5')} ></StarIcon>
                </div>
                <textarea type="text" name="txt" placeholder='enter review...' onChange={this.handleChange} required />
                <button onClick={() => this.onAddReview()}>Add Review</button>
                {/* <form onSubmit={this.onAddReview()} className="flex column justify-center"> */}
                {/* </form> */}

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
    updateGig
}

export const GigAddReview = connect(mapStateToProps, mapDispatchToProps)(_GigAddReview)