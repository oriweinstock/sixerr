import React from 'react'
import { connect } from 'react-redux'
import { GigAddReview } from '../cmps/GigAddReview.jsx'
import { PackageList } from '../cmps/PackageList.jsx'
import { SellerPreview } from '../cmps/SellerPreview'
// import { Link } from 'react-router-dom'
// import { gigService } from '../services/gigService'
import { addGig, loadGig, updateGig } from '../store/actions/gigActions'
import Avatar from '@material-ui/core/Avatar';
import StarRateIcon from '@material-ui/icons/StarRate';
import SideBar from '../cmps/SideBar.jsx'
import ReviewList from '../cmps/ReviewList.jsx'
import EditIcon from '@material-ui/icons/Edit';


// import { loadReviews, addReview } from '../store/actions/reviewActions'

class _GigDetails extends React.Component {

    state = {
        gig: null,
        isGigOwner: true,
        isTitleEditble: false,
        isDescEditble: false,
        numImgChoosen: 0
    }

    async componentDidMount() {
        const gigId = this.props.match.params.gigId
        const gig = await loadGig(gigId)
        this.setState({ gig })

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

    getAvgRate = () => {
        const { reviews } = this.state.gig
        const sumRate = reviews.reduce((acc, review) => {
            return acc += review.rating
        }, 0)
        const avg = Math.floor(sumRate / reviews.length)
        return avg;
        // {/* </div> */ }
        // return <div>{(<StarRateIcon />).repeat(avg)}</div>
    }

    // onAddReview = (review, gig) => {
    //     console.log("onAddReview , gig", gig)
    //     let reviewToAdd = { ...review }
    //     // let date = new Date()
    //     // const CreatedAt = Date.now()
    //     const purchasedAt = "purchase At"
    //     const date = Date.now()
    //     reviewToAdd.createdAt = date
    //     reviewToAdd.purchasedAt = purchasedAt
    //     console.log("onAddReview , review", reviewToAdd)
    //     // gig.reviews.push(reviewToAdd)
    //     // this.props.updateGig(gig).then(() => {
    //     // console.log("onAddReview , gig", gig)
    //     //     console.log('review added succefully');
    //     // })
    // }


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

    toggleIsTitleEditble = (isTitleEditble) => {
        isTitleEditble = !isTitleEditble
        this.setState({ isTitleEditble })
    }

    toggleIsDescEditble = (isDescEditble) => {
        isDescEditble = !isDescEditble
        this.setState({ isDescEditble })
    }

    render() {
        const { gig, numImgChoosen, isTitleEditble, isGigOwner, isDescEditble } = this.state
        const { user } = this.props
        if (!gig) return <div>No gig...</div>
        return (
            <section className="gig-details main-layout">

                <div className="main-details">
                    {/* <div onInput={(ev) => this.handleChange(ev, 'title')}> 
                    <h1 className="gig-title" contentEditable suppressContentEditableWarning={`${isGigOwner}`}>{gig.title}</h1>
                    </div> */}
                    <div className="flex">
                        {isGigOwner && <h1 className="gig-title" onInput={(ev) => this.handleChange(ev, 'title')} contentEditable={isTitleEditble}>{gig.title}</h1>}
                        < EditIcon className="edit-icon" onClick={() => this.toggleIsTitleEditble(isTitleEditble)} />
                    </div>
                    {isTitleEditble && <button onClick={this.onEdit}>Save</button>}
                    <div className="seller-overview">
                        <Avatar alt="Remy Sharp" src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light" />
                        <small>{gig.owner.fullname}</small>
                        <span>|</span>
                        {/* todo print it multiple times */}
                        <div className="flex">
                            <StarRateIcon />
                            <StarRateIcon />
                            <StarRateIcon />
                            <StarRateIcon />
                        </div>
                        <span>{this.getAvgRate()}</span>
                        <span>({gig.reviews.length})</span>
                        <span>|</span>
                        {/* get orders from gig */}
                        <span className="order-count">1 Orders in Queue</span>
                    </div>
                    <div className="img-details-conatiner">
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
                    <div className="short-review flex">
                        <div className="avatar-container">
                            {/* <img src={gig.reviews[0].seller.imgUrl} /> */}
                            <Avatar  alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        </div>
                        <div className="content">
                            <h6>{gig.owner.fullname}</h6>
                            {/* <p>{gig.reviews[0].txt}</p> */}
                            <p>On your service has provided great service for me the last 30 days. All posts are in my niche and engagement has increased across all platforms. I will be</p>
                        </div>
                    </div>
                    <div className="desc">
                        <h2>About This Gig</h2>
                        <div className="flex">
                            {isGigOwner && <h4 className="gig-desc" onInput={(ev) => this.handleChange(ev, 'desc')} contentEditable={isDescEditble} >{gig.desc}</h4>}
                            < EditIcon className="edit-icon" onClick={() => this.toggleIsDescEditble(isDescEditble)} />
                        </div>
                    </div>
                    {isDescEditble && <button onClick={this.onEdit}>Save</button>}

                    {/* packagesList */}
                    <SellerPreview seller={gig.owner} />
                    <PackageList packages={gig.packages} />
                    {/* sellerPreview */}
                    <ReviewList gig={gig} user={user} />
                    {user && <GigAddReview gig={gig} user={user} onAddReview={this.onAddReview} />}
                    {/* reviews */}
                </div>
                <SideBar gig={gig} />
            </section>
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

export const GigDetails = connect(mapStateToProps, mapDispatchToProps)(_GigDetails)


//with input
{/* {isTitleEditble || isGigOwner && <h1>{gig.title} {isGigOwner && <button onClick={() => this.makeEditable()}>Edit</button>}</h1>}
                {isTitleEditble && <form action=""> */}
{/* <input className="title-input" type="text" /> */ }
{/* </form>} */ }



// {/* <div key={idx} className={`${todo.isDone && 'todo-done'} flex space-between`} onInput={(ev) => { onNoteChosen(ev, idx) }}>
//                     <p contentEditable suppressContentEditableWarning={true}>{todo.text}</p>
//                     <img className={`${!todo.isDone && 'my-active'} pointer`} onClick={() => { onTodoDone(idx) }} src="apps/Keep/assets/img/V.png" />
//                 </div> */}



                // onUpdateNote = (ev, noteId, todoIdx) => {
                //     if (!ev) return
                //     const text = ev.target.innerText
                //     noteService.getNoteById(noteId)
                //         .then(noteToEdit => {
                //             switch (noteToEdit.type) {
                //                 case 'noteText':
                //                     noteToEdit.info.text = text;
                //                     noteService.save(noteToEdit)
                //                     break
                //                 case 'noteTodos':
                //                     noteToEdit.info.todos[todoIdx].text = text;
                //                     noteService.save(noteToEdit)
                //                     break;
                //                 case 'noteImg':
                //                 case 'noteVideo':
                //                     noteToEdit.info.title = text;
                //                     noteService.save(noteToEdit)
                //             }
                //         })
                // }
