import React, { Component } from 'react'
import { connect } from 'react-redux'
import { utilService } from '../services/utilService.js'

export class GigAddReview extends Component {


    state = {
        gig: null,
        user: null,
        review: null,
    }


    componentDidMount() {
        const { gig } = this.props
        const { user } = this.props
        const review = this.createReviewTemplate(gig, user)
        console.log("componentDidMount , review", review)
        this.setState({ gig, user, review })
    }

    createReviewTemplate = (gig, user) => {
        const by = { _id: user._id, fullname: user.fullname, imgUrl: user.imgUrl }
        const id = utilService.makeId()
        const review = { id, rating: '', createdAt: null, purchasedAt: null, seller: gig.owner, by }
        return review
    }

    handleChange = ({ target }) => {
        console.log('handle change!');
        const field = target.name
        console.log("field", field)
        const value = target.value
        console.log("value", value)
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
        console.log("review", review)
        review.rating = rate
        this.setState({ review })
    }

    render() {
        const { user } = this.state
        const { gig } = this.state
        const { review } = this.state
        console.log("render , review", review)
        console.log('this.state', this.state);
        return (
            <>
                {/* Require on Button....  */}
                <div className="flex">
                    <button onClick={() => this.handleRate('1')}>*</button>
                    <button onClick={() => this.handleRate('2')}>**</button>
                    <button onClick={() => this.handleRate('3')}>***</button>
                    <button onClick={() => this.handleRate('4')}>****</button>
                    <button onClick={() => this.handleRate('5')}>*****</button>
                </div>
                <form onSubmit={this.onAddReview} className="flex column justify-center">
                    <textarea type="text" name="txt" placeholder='enter review...' onChange={this.handleChange} required />
                </form>

            </>
        )
    }
}
