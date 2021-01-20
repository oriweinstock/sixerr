import React from 'react'
import { connect } from 'react-redux'
import { GigAddReview } from '../cmps/GigAddReview.jsx'
// import { PackageList } from '../cmps/PackageList.jsx'
import { SellerPreview } from '../cmps/SellerPreview'
import { addGig, loadGig, updateGig, removeGig, loadGigs } from '../store/actions/gigActions'
import { orderGig } from '../store/actions/orderActions'
import StarRateIcon from '@material-ui/icons/StarRate';
import SideBar from '../cmps/SideBar.jsx'
import ReviewList from '../cmps/ReviewList.jsx'
import { GigImgLightBox } from '../cmps/GigImgLightBox';
import { EditableElement } from '../cmps/EditableElement.jsx'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { SellerOverview } from '../cmps/SellerOverview'
import { ReviewStats } from '../cmps/ReviewStats.jsx'
import { ShortReviewList } from '../cmps/ShortReviewList.jsx'
import { ImgGallery } from '../cmps/ImgGallery.jsx'
import { CarouselImgs } from '../cmps/Carousel.jsx'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import RichTextEditor from '../cmps/RichTextEditor.jsx'
import { GigList } from '../cmps/GigList.jsx'

class _GigDetails extends React.Component {

    state = {
        gig: null,
        isGigOwner: true,
        isTitleEditble: false,
        isDescEditble: false,
        numImgChoosen: 0,
        isLightBoxOpen: false,
        currImg: "",
        currShortReviewIdx: 0,
        shortReviewSize: 39.4189375,
        isFullSizeScreen: true,
        htmlDesc: '',
        suggestedGigs:[],
        mobileStarStats:false,
    }

    async componentDidMount() {
        const gigId = this.props.match.params.gigId
        const gig = await loadGig(gigId)
        const gigs = await loadGigs() // TODO: CHANGE all waits to first go and then get all at the end....
        console.log("componentDidMount , gigs", gigs)
        // console.log("componentDidMount , gigs", gigs)
        // const suggestedGigs = gigs.filter((gig, idx) => !(idx % 3));
        // console.log("componentDidMount , suggestedGigs", suggestedGigs)
        const { numImgChoosen } = this.state
        const currImg = gig.imgUrls[numImgChoosen]
        if (currImg) this.setState({ gig, currImg })
        this.onSetSizes()
        this.setState({ gig})
    }

    onSetSizes = () => {
        let isFullSizeScreen = true;
        let shortReviewSize;
        let mobileStarStats = false;
        const windowWitdh = window.innerWidth
        if (windowWitdh > 1200) shortReviewSize = 39.4189375;
        if (windowWitdh < 1200 && windowWitdh >= 1040) shortReviewSize = 39.4189375
        if (windowWitdh < 1040 && windowWitdh >= 860) shortReviewSize = 45
        if (windowWitdh < 860) shortReviewSize = 30
        if (windowWitdh <= 1040) isFullSizeScreen = false
        if(windowWitdh <= 700){} mobileStarStats=true;
        this.setState({ shortReviewSize, isFullSizeScreen,mobileStarStats })
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
        // isDescEditble = !isDescEditble
        isDescEditble = !this.state.isDescEditble
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
        if (currShortReviewIdx === 0) currShortReviewIdx = -reviews.length
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

    onGigOrder = () => {
        this.props.orderGig(this.state.gig, this.props.user)
    }


    onSaveHtml = (htmlDesc) => {
        this.setState({ htmlDesc })
        this.toggleIsDescEditble()
    }



    render() {
        const { gig, numImgChoosen, isTitleEditble, isGigOwner, isDescEditble, isLightBoxOpen, isFullSizeScreen, shortReviewSize } = this.state
        const { user } = this.props
        const { currImg } = this.state
        const htmlStars = this.getAvgRate()
        console.log('this.props.gigs', this.props.gigs);
        if (!gig) return <div>Loading...</div>
        return (
            <>
                {/* <div className="main-layout">
                    <CarouselImgs imgUrls={gig.imgUrls} />
                </div> */}
                {/* <div className="add-remove-btn-container main-layout">
                    <Link className="edit-link" to={`/gig/edit/${gig._id}`}><button>Edit Gig</button></Link>
                    {user && <Link to='/gig/edit'  ><button className="add-btn">Add Gig</button></Link>}
                    <button className="remove-btn" onClick={this.onRemoveGig}>Remove Gig</button>
                </div> */}
                {/* <div dangerouslySetInnerHTML={{ __html: `${this.state.htmlDesc}` }}>
                </div> */}
                {/* <RichTextEditor desc={'<h1>tomer<h1>'} onSaveHtml={this.onSaveHtml} /> */}
                {/* <PrintEditor html={gig.desc} /> */}
                {isLightBoxOpen && <GigImgLightBox gig={gig} onToggleImgLightbox={this.onToggleImgLightbox} currImg={currImg} onNextPageLightBox={this.onNextPageLightBox} onPrevPageLightBox={this.onPrevPageLightBox} />}
                <div className="details-wrapper main-layout">
                    <section className="gig-details main-layout">
                        <div className="main-details">
                            <EditableElement field={'title'} type={'h1'} text={gig.title} save={this.onSave} editable={isTitleEditble} />
                            {isTitleEditble && <button onClick={this.onEdit}>Save</button>}
                            <SellerOverview gig={gig} htmlStars={htmlStars} />
                            {!isFullSizeScreen && <div className="carousle-container" >
                                <CarouselImgs imgUrls={gig.imgUrls} />
                                <h1></h1>
                            </div>}
                            {isFullSizeScreen && <ImgGallery gig={gig} numImgChoosen={numImgChoosen} onChooseImg={this.onChooseImg} onToggleImgLightbox={this.onToggleImgLightbox} />}
                            <div className="responsive-side-bar-container">
                                {!isFullSizeScreen && <SideBar gig={gig} onGigOrder={this.onGigOrder} />}
                            </div>
                            <div className="short-review-header flex space-between">
                                <h2 >What people loved about this seller</h2>
                                <AnchorLink href='#reviews'>See all reviews</AnchorLink>
                            </div>
                            {gig.reviews && <div className="short-review-main">
                                <ShortReviewList shortReviewSize={shortReviewSize} currShortReviewIdx={this.state.currShortReviewIdx} gig={gig} reviews={gig.reviews} />
                                {gig.reviews.length > 1 && <ChevronLeftIcon className="slide-left-review" onClick={() => this.onNextShortReview()} />}
                                {gig.reviews.length > 1 && <ChevronRightIcon className="slide-right-review" onClick={() => this.onPrevShortReview()} />}
                            </div>}
                            <div id="description" className="desc">
                                <h2>About This Gig</h2>
                                <div className="about flex">
                                    {isGigOwner && <EditableElement dangerouslySetInnerHTML={{ __html: `${this.state.htmlDesc}` }} className="gig-desc" field={'desc'} type={'h4'} text={gig.desc} save={this.onSave} editable={isDescEditble} />}
                                    {/* {!isDescEditble && <div dangerouslySetInnerHTML={{ __html: `${this.state.htmlDesc}` }}>
                                    </div>}
                                    {isDescEditble &&
                                        <RichTextEditor desc={'<h1>tomer<h1>'} onSaveHtml={this.onSaveHtml} />
                                    } */}
                                </div>
                                {/* {!isDescEditble && < button onClick={this.toggleIsDescEditble}>edit</button>} */}
                            </div>
                            <SellerPreview seller={gig.owner} />
                            {/* <PackageList packages={gig.packages} /> */}
                            <ReviewStats htmlStars={htmlStars} />
                            {/* <h1>Suggested</h1> */}
                            {/* <GigList onUserViewGig={() => { }} onFavoriteToggle={this.onFavoriteToggle} user={user} /> */}
                            {user && <GigAddReview gig={gig} user={user} onAddReview={this.onAddReview} mobileStarStats={this.state.mobileStarStats} />}
                            <ReviewList gig={gig} user={user} />
                        </div>
                        {isFullSizeScreen && <SideBar gig={gig} onGigOrder={this.onGigOrder} />}
                    </section>
                </div>
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
    orderGig,
}

export const GigDetails = connect(mapStateToProps, mapDispatchToProps)(_GigDetails)

