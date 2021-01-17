import React from 'react'
import { connect } from 'react-redux'
import { GigAddReview } from '../cmps/GigAddReview.jsx'
import { PackageList } from '../cmps/PackageList.jsx'
import { SellerPreview } from '../cmps/SellerPreview'
import { addGig, loadGig, updateGig, removeGig } from '../store/actions/gigActions'
import StarRateIcon from '@material-ui/icons/StarRate';
import SideBar from '../cmps/SideBar.jsx'
import ReviewList from '../cmps/ReviewList.jsx'
import { GigImgLightBox } from '../cmps/GigImgLightBox';
import { Link } from 'react-router-dom'
import { EditableElement } from '../cmps/EditableElement.jsx'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { SellerOverview } from '../cmps/SellerOverview'
import { ReviewStats } from '../cmps/ReviewStats.jsx'
import { ShortReviewList } from '../cmps/ShortReviewList.jsx'
import { ImgGallery } from '../cmps/ImgGallery.jsx'


class _GigDetails extends React.Component {

    state = {
        gig: null,
        isGigOwner: true,
        isTitleEditble: false,
        isDescEditble: false,
        numImgChoosen: 0,
        isLightBoxOpen: false,
        currImg: "",
        currShortReviewIdx: 0
    }

    async componentDidMount() {
        const gigId = this.props.match.params.gigId
        const gig = await loadGig(gigId)
        const { numImgChoosen } = this.state
        const currImg = gig.imgUrls[numImgChoosen]
        if (currImg) this.setState({ gig, currImg })
        this.setState({ gig })

    }

    onToggleImgLightbox = () => {
        const { isLightBoxOpen } = this.state
        const { numImgChoosen } = this.state
        const currImg = this.state.gig.imgUrls[numImgChoosen]
        this.setState({ isLightBoxOpen: !isLightBoxOpen, currImg })
    }

    toggleIsTitleEditble = (isTitleEditble) => {
        isTitleEditble = !isTitleEditble
        this.setState({ isTitleEditble })
    }

    toggleIsDescEditble = (isDescEditble) => {
        isDescEditble = !isDescEditble
        this.setState({ isDescEditble })
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
        this.setState({ numImgChoosen: imgIdx })
    }

    onNextShortReview = () => {
        let { currShortReviewIdx } = this.state
        const { reviews } = this.state.gig
        if (currShortReviewIdx == 0) currShortReviewIdx = -reviews.length
        currShortReviewIdx++
        this.setState({ currShortReviewIdx })
    }

    onPrevShortReview = () => {
        let { currShortReviewIdx } = this.state
        const { reviews } = this.state.gig
        if (currShortReviewIdx === -(reviews.length - 1)) currShortReviewIdx = 1
        currShortReviewIdx--
        this.setState({ currShortReviewIdx })
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
        if (avg > 5) avg = 5
        for (var i = 0; i < avg; i++) {
            stars.push(<StarRateIcon key={`${i}`} className="seller-star" ></StarRateIcon>)
        }
        return stars
    }

    onSave = (field, value) => {
        const gig = { ...this.state.gig }
        gig[field] = value
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
        const { gig, numImgChoosen, isTitleEditble, isGigOwner, isDescEditble, isLightBoxOpen } = this.state
        const { user } = this.props
        const { currImg } = this.state
        const htmlStars = this.getAvgRate()
        if (!gig) return <div>Loading...</div>
        return (
            <>
                <div className="add-remove-btn-container main-layout">
                    <Link className="edit-link" to={`/gig/edit/${gig._id}`}><button>Edit Gig</button></Link>
                    {user && <Link to='/gig/edit'  ><button className="add-btn">Add Gig</button></Link>}
                    <button className="remove-btn" onClick={this.onRemoveGig}>Remove Gig</button>
                </div>
                {isLightBoxOpen && <GigImgLightBox onToggleImgLightbox={this.onToggleImgLightbox} currImg={currImg} onNextPageLightBox={this.onNextPageLightBox} onPrevPageLightBox={this.onPrevPageLightBox} />}
                <section className="gig-details main-layout">
                    <div className="main-details">
                        <EditableElement field={'title'} type={'h1'} text={gig.title} save={this.onSave} editable={isTitleEditble} />
                        {isTitleEditble && <button onClick={this.onEdit}>Save</button>}
                        <SellerOverview gig={gig} htmlStars={htmlStars} />
                        <ImgGallery gig={gig} numImgChoosen={numImgChoosen} onChooseImg={this.onChooseImg} onToggleImgLightbox={this.onToggleImgLightbox} />
                        <h2 className="short-review-header">What people loved about this seller</h2>
                        {gig.reviews && <div className="short-review-main">
                            <div className="slide flex" style={{ transform: `translateX(${this.state.currShortReviewIdx * 38.381275}rem)` }}>
                                <div className="list">
                                    <ShortReviewList gig={gig} reviews={gig.reviews} />
                                </div>
                            </div>
                            {/* <div className="slide flex" style={{ transform: `translateX(${this.state.currShortReviewIdx * 616.188}px)` }}>
                                <div className="list">
                                    <ShortReviewList gig={gig} reviews={gig.reviews} />
                                </div>
                            </div> */}
                            {gig.reviews.length > 1 && <ChevronLeftIcon className="slide-left-review" onClick={() => this.onNextShortReview()} />}
                            {gig.reviews.length > 1 && <ChevronRightIcon className="slide-right-review" onClick={() => this.onPrevShortReview()} />}
                        </div>}
                        <div className="desc">
                            <h2>About This Gig</h2>
                            <div className="about flex">
                                {isGigOwner && <EditableElement className="gig-desc" field={'desc'} type={'h4'} text={gig.desc} save={this.onSave} editable={isDescEditble} />}
                            </div>
                        </div>
                        <SellerPreview seller={gig.owner} />
                        {/* <PackageList packages={gig.packages} /> */}
                        {/* <ReviewStats /> */}
                        {user && <GigAddReview gig={gig} user={user} onAddReview={this.onAddReview} />}
                        <ReviewList gig={gig} user={user} />
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

