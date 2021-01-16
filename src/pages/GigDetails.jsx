import React from 'react'
import { connect } from 'react-redux'
import { GigAddReview } from '../cmps/GigAddReview.jsx'
import { PackageList } from '../cmps/PackageList.jsx'
import { SellerPreview } from '../cmps/SellerPreview'
// import { Link } from 'react-router-dom'
// import { gigService } from '../services/gigService'
import { addGig, loadGig, updateGig, removeGig } from '../store/actions/gigActions'
import Avatar from '@material-ui/core/Avatar';
import StarRateIcon from '@material-ui/icons/StarRate';
import SideBar from '../cmps/SideBar.jsx'
import ReviewList from '../cmps/ReviewList.jsx'
import EditIcon from '@material-ui/icons/Edit';
import { GigImgLightBox } from '../cmps/GigImgLightBox';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import { gigEdit } from '../pages/GigEdit'
import { Link } from 'react-router-dom'
import { EditableElement } from '../cmps/EditableElement.jsx'
// import { ThreeSixty } from '@material-ui/icons'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';


// import { loadReviews, addReview } from '../store/actions/reviewActions'

class _GigDetails extends React.Component {

    state = {
        gig: null,
        isGigOwner: true,
        isTitleEditble: false,
        isDescEditble: false,
        numImgChoosen: 0,
        isLightBoxOpen: false,
        currImg: "",
        reviewChoosenIdx: 0
    }

    async componentDidMount() {
        const gigId = this.props.match.params.gigId
        const gig = await loadGig(gigId)
        const { numImgChoosen } = this.state
        const currImg = gig.imgUrls[numImgChoosen]
        this.setState({ gig, currImg })
    }

    handleChange = (ev, field) => {
        const value = ev.target.innerText
        this.setState(prevState => {
            return {
                gig: {
                    ...prevState.gig,
                    [field]: value
                }
            }
        })
    }
    onToggleImgLightbox = () => {
        console.log('toggle img lightBox');
        const { isLightBoxOpen } = this.state
        const { numImgChoosen } = this.state
        const currImg = this.state.gig.imgUrls[numImgChoosen]
        this.setState({ isLightBoxOpen: !isLightBoxOpen, currImg })
    }


    onEdit = (ev) => {
        ev.preventDefault()
        const { isTitleEditble, isDescEditble } = this.state
        if (isTitleEditble) this.toggleIsTitleEditble(isTitleEditble)
        if (isDescEditble) this.toggleIsDescEditble(isDescEditble)
        const { gig } = this.state
        this.props.addGig(gig).then(() => {
            console.log('adeed sucessfully');
        })
    }

    onChooseImg = (imgIdx) => {
        // console.log("imgIdx", imgIdx)
        this.setState({ numImgChoosen: imgIdx })
    }

    onNextReview = (reviewChoosenIdx) => {
        console.log("reviewChoosenIdx", reviewChoosenIdx)
        const { reviews } = this.state.gig
        const reviewsLength = reviews.length
        reviewChoosenIdx++
        if (reviewChoosenIdx === reviewsLength) reviewChoosenIdx = 0
        this.setState({ reviewChoosenIdx })
    }
    onPrevReview = (reviewChoosenIdx) => {
        const { reviews } = this.state.gig
        const reviewsLength = reviews.length
        reviewChoosenIdx--
        if (reviewChoosenIdx < 0) reviewChoosenIdx = reviewsLength - 1
        this.setState({ reviewChoosenIdx })
    }

    toggleIsTitleEditble = (isTitleEditble) => {
        isTitleEditble = !isTitleEditble
        this.setState({ isTitleEditble })
    }

    toggleIsDescEditble = (isDescEditble) => {
        isDescEditble = !isDescEditble
        this.setState({ isDescEditble })
    }
    onNextPageLightBox = (ev) => {
        ev.stopPropagation()
        let { numImgChoosen } = this.state
        const { gig } = this.state
        numImgChoosen++
        if (numImgChoosen === gig.imgUrls.length) numImgChoosen = 0
        const currImg = gig.imgUrls[numImgChoosen]
        this.setState({ numImgChoosen, currImg })
    }
    onPrevPageLightBox = (ev) => {
        ev.stopPropagation()
        let { numImgChoosen } = this.state
        const { gig } = this.state
        numImgChoosen--
        if (numImgChoosen === -1) numImgChoosen = gig.imgUrls.length - 1
        const currImg = gig.imgUrls[numImgChoosen]
        this.setState({ numImgChoosen, currImg })
    }
    getAvgRate = () => {
        if (!this.state.gig) return
        const { reviews } = this.state.gig
        const sumRate = reviews.reduce((acc, review) => {
            return acc += review.rating
        }, 0)
        let avg = Math.floor(sumRate / reviews.length)
        let stars = []
        if(avg>5) avg=5
        for (var i = 0; i < avg; i++) {
            stars.push(<StarRateIcon className="seller-star" ></StarRateIcon>)
        }
        return stars
    }

    onSave = (field, value) => {
        const gig = { ...this.state.gig }
        gig[field] = value
        console.log("gig", gig)
        this.props.updateGig(gig).then(() => {
            console.log('updated successfuuly');
        })
    }

    onRemoveGig = () => {
        const { gig } = this.state
        this.props.removeGig(gig._id).then(() => {
            this.props.history.push('/gig');
            console.log('remove succefully');
        })
    }



    render() {
        const { gig, numImgChoosen, isTitleEditble, isGigOwner, isDescEditble, isLightBoxOpen, reviewChoosenIdx } = this.state
        const { user } = this.props
        const { currImg } = this.state
        if (!this.getAvgRate) var avgRate = this.getAvgRate()
        const htmlStars = this.getAvgRate()
        if (!gig) return <div>No gig...</div>
        return (
            <>
                <div className="add-remove-btn-container">
                    <Link className="edit-link" to={`/gig/edit/${gig._id}`}>Full Edit</Link>
                    {user && <Link to='/gig/edit'  ><button className="add-btn">Add Gig</button></Link>}
                    <button className="remove-btn" onClick={this.onRemoveGig}>Remove Gig</button>
                </div>
                {isLightBoxOpen && <GigImgLightBox onToggleImgLightbox={this.onToggleImgLightbox} currImg={currImg} onNextPageLightBox={this.onNextPageLightBox} onPrevPageLightBox={this.onPrevPageLightBox} />}
                <section className="gig-details main-layout">
                    <div className="main-details">
                        <EditableElement className="gig-title" field={'title'} type={'h1'} text={gig.title} save={this.onSave} editable={isTitleEditble} />
                        {isTitleEditble && <button onClick={this.onEdit}>Save</button>}
                        <div className="seller-overview">
                            <Avatar alt="Remy Sharp" src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light" />
                            <small>{gig.owner.fullname}</small>
                            <span>|</span>
                            {/* todo print it multiple times */}
                            <div className="seller-stars-container flex">
                                {<div>{htmlStars.map((star) => {
                                    return star
                                })}</div>}
                            </div>
                            <span>({gig.reviews.length})</span>
                            <span>|</span>
                            {/* get orders from gig */}
                            <span className="order-count">1 Orders in Queue</span>
                        </div>
                        <div className="img-details-conatiner" onClick={() => this.onToggleImgLightbox()}>
                            <FullscreenIcon className="full-screen-icon" />
                            {/* {!gig.videoSrc && <video controls >
                                {/* <source src={gig.videoSrc} /> */}
                            {/* <source src="https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/jkj847uw28tkz4ruicat" /> */}
                            {/* </video>} */}
                            <img src={gig.imgUrls[numImgChoosen]} />
                        </div>
                        <div className="imgs-gallery-container flex">
                            {gig.imgUrls.map((imgUrl, idx) => {
                                var className = "img-gallery"
                                if (numImgChoosen === idx) className += " active"
                                return <div key={idx} onClick={() => this.onChooseImg(idx)} className={className}>
                                    <img src={imgUrl} />
                                </div>
                            })}
                        </div>
                        <h2 className="short-review-header">What people loved about this seller</h2>
                        {gig.reviews && gig.reviews.length > 0 && <div className="short-review flex">
                            <div className="avatar-container">
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                            </div>
                             <div className="content">
                                <h6>{gig.owner.fullname}</h6>
                                {gig.reviews.length > 0 && <span>{gig.reviews[reviewChoosenIdx].txt}</span>}
                            </div>
                             {/* <div className="content">
                                <h6>{gig.owner.fullname}</h6>
                                {gig.reviews.length > 0 && <p>{gig.reviews[reviewChoosenIdx].txt}</p>}
                            </div> */}
                            {gig.reviews.length > 1 && <ChevronLeftIcon className="slide-left-review" onClick={() => this.onNextReview(reviewChoosenIdx)} />}
                            {gig.reviews.length > 1 && <ChevronRightIcon className="slide-right-review" onClick={() => this.onPrevReview(reviewChoosenIdx)} />}
                        </div>}
                        {/* <button onClick={() => this.onPrevReview(reviewChoosenIdx)}>Prev</button> */}
                        {/* <button onClick={() => this.onNextReview(reviewChoosenIdx)}>Next</button> */}
                        <div className="desc">
                            <h2>About This Gig</h2>
                            <div className="about flex">
                                {isGigOwner && <EditableElement className="gig-desc" field={'desc'} type={'h4'} text={gig.desc} save={this.onSave} editable={isTitleEditble} />}
                                {isTitleEditble && <button onClick={this.onEdit}>Save</button>}
                                {/* {isGigOwner && <h4 className="gig-desc" onInput={(ev) => this.handleChange(ev, 'desc')} contentEditable={isDescEditble} >{gig.desc}</h4>} */}
                                {/* < EditIcon className="edit-icon" onClick={() => this.toggleIsDescEditble(isDescEditble)} /> */}
                            </div>
                        </div>
                        {/* {isDescEditble && <button onClick={this.onEdit}>Save</button>} */}
                        <SellerPreview seller={gig.owner} />
                        {/* <PackageList packages={gig.packages} /> */}
                        <ReviewList gig={gig} user={user} />
                        {user && <GigAddReview gig={gig} user={user} onAddReview={this.onAddReview} />}
                        {/* reviews */}
                    </div>
                    <SideBar gig={gig} />
                </section>
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
    removeGig,
}

export const GigDetails = connect(mapStateToProps, mapDispatchToProps)(_GigDetails)

