import React from 'react'
import { connect } from 'react-redux'
import {PackageList} from '../cmps/PackageList.jsx'
import { SellerPreview } from '../cmps/SellerPreview'
// import { Link } from 'react-router-dom'
// import { gigService } from '../services/gigService'
// import { saveGig, removeGig } from '../store/actions/gigActions'
// import { loadReviews, addReview } from '../store/actions/reviewActions'

export class GigDetails extends React.Component {

    state = {
        gig: {
            _id: "s107",
            title: "I will design interior, redering every space in your house",
            desc: "I will make 3d interior design and 3d rendering with sketchup in 24 hour Hello thanks for coming to my gigs    I have specialized in creating 3D model and rendering for real estate projects, apartement, house, office, kitchen, bathroom etc  Fast delivery within a day , PLEASE send me message before order for discuss and got best quotation for your project",
            tags: [
                "Graphic Design"
            ],
            packages: [
                {
                    type: "basic",
                    desc: "",
                    priceUsd: 10,
                    revisionsCount: 3,
                    deliveryDays: 1,
                    features: [
                        "3D Modeling"
                    ]
                },
                {
                    type: "standard",
                    desc: "",
                    priceUsd: 15,
                    revisionsCount: 2,
                    deliveryDays: 2,
                    features: [
                        "3D Modeling",

                    ]
                }
            ],
            owner: {
                _id: "u103",
                fullname: "user3",
                imgUrl: "https://avataaars.io/?avatarStyle=Circle&topType=WinterHat3&accessoriesType=Prescription01&hatColor=Blue02&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
            },
            imgUrls: [
                "https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/attachments/delivery/asset/e8cfa66347588df9974bf45b90878c3f-1605225818/5/design-every-space-in-your-house.jpg",
                "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs2/172622641/original/ee2c7f2455cc937a1a406f42ed7a4cb6ce4e78e3/design-every-space-in-your-house.jpg",
                "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs3/172622641/original/8e42a2552f44e4a92c2f2be51eeceda842e5c1b1/design-every-space-in-your-house.jpg"
            ],

            reviews: [
                {
                    id: "madeId",
                    rating: 5,
                    txt: "Very fast delivery and beautiful montage. I had one change request which was implemented fast and as requested. I like the design and I guess he will get to do the design of the other side of the room too!",
                    createdAt: "timestamp",
                    purchasedAt: "timestamp",
                    seller: {
                        communication: 4,
                        recommend: 4,
                        asDescribed: 4,
                        imgUrl:'https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light'
                    },
                    by: {
                        _id: "u102",
                        fullname: "user2",
                        imgUrl: "/img/img2.jpg"
                    }
                }
            ]
        }
    }

    render() {
        const { gig } = this.state
        if (!gig) return <div>No gig...</div>
        console.log("render , gig.packages", gig.packages)
        return (
            <section className="gig-details">
                <h1>{gig.title}</h1>
                <div className="img-details-conatiner">
                    <img src={gig.imgUrls[0]} />
                </div>
                <div className="short-review flex">
                    <div className="owner-img-container">
                        <img src={gig.reviews[0].seller.imgUrl} />
                    </div>
                    <div>
                        <h5>{gig.owner.fullname}</h5>
                        <p>{gig.reviews[0].txt}</p>
                    </div>
                </div>
                <div className="desc">
                    <h2>About This Gig</h2>
                    <h4>{gig.desc}</h4>
                </div>
                {/* packagesList */}
                {/* <PackageList packages={gig.packages}/> */}
                <SellerPreview seller={gig.owner} />
                {/* sellerPreview */}
                {/* reviews */}
            </section>
        )
    }
}

// const mapGlobalStateToProps = (state) => {
//     return {
//         gigs: state.gigModule.gigs,
//     }
// }

// const mapDispatchToProps = {

// }

// export const GigDetails = connect(mapGlobalStateToProps, mapDispatchToProps)(_GigDetails)