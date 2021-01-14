import React from 'react'
import { connect } from 'react-redux'
import { PackageList } from '../cmps/PackageList.jsx'
import { SellerPreview } from '../cmps/SellerPreview'
// import { Link } from 'react-router-dom'
import { gigService } from '../services/gigService'
import { addGig, loadGig } from '../store/actions/gigActions'
// import { loadReviews, addReview } from '../store/actions/reviewActions'

class _GigDetails extends React.Component {

    state = {
        gig: null,
        isGigOwner: true,
        isTitleEditble: false
    }

    async componentDidMount() {
        const gigId = this.props.match.params.gigId
        const gig = await loadGig(gigId)
        this.setState({ gig })

    }

    handleChange = (value, field) => {
        console.log('field', field);
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
        let { isGigOwner } = this.state
        console.log("render , isGigOwner", isGigOwner)
        const { gig } = this.state
        if (!gig) return <div>No gig...</div>
        return (
            <section className="gig-details">
                {/* {isTitleEditble || isGigOwner && <h1>{gig.title} {isGigOwner && <button onClick={() => this.makeEditable()}>Edit</button>}</h1>}
                {isTitleEditble && <form action=""> */}
                {/* <input className="title-input" type="text" /> */}
                {/* </form>} */}
                <h1 ref="textarea" onKeyDown={() => this.handleChange(gig.title, 'title')} contenteditable={`${isGigOwner}`}>{gig.title}</h1>
                <h2 contenteditable={true}>hey</h2>
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
                <SellerPreview seller={gig.owner} />
                <PackageList packages={gig.packages}/>
                {/* sellerPreview */}
                {/* reviews */}
            </section>
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

export const GigDetails = connect(mapStateToProps, mapDispatchToProps)(_GigDetails)