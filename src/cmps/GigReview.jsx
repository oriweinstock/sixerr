import React, { Component } from 'react'
import { connect } from 'react-redux'

export class GigReview extends Component {


    state = {
        gig: null,
        reviews: {
            id: "madeId",
            rating: 5,
            txt: "Thank you for a job well done. You exceeded my expectations. I will definitely work with this designer in the future.",
            createdAt: "timestamp",
            purchasedAt: "timestamp",
            seller: {
                communication: 5,
                recommend: 5,
                asDescribed: 5
            },
            // by: {
            //     _id: u102,
            //     fullname: "user2",
            //     imgUrl: "/img/img2.jpg"
            // }
        }
    }



    componentDidMount() {
        const { gig } = this.props
            this.setState({ gig })
    }

    render() {
        return (
            <div>
                gig review
            </div>
        )
    }
}
