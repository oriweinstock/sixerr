import React from 'react'
import { connect } from 'react-redux'
import { GigReview } from '../cmps/GigReview.jsx'
import { PackageList } from '../cmps/PackageList.jsx'
import { SellerPreview } from '../cmps/SellerPreview'
// import { Link } from 'react-router-dom'
// import { gigService } from '../services/gigService'
import { addGig, loadGig, updateGig } from '../store/actions/gigActions'
import Avatar from '@material-ui/core/Avatar';
import StarRateIcon from '@material-ui/icons/StarRate';


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

    handleChange = (ev, field) => {
        console.log("field", field)
        const value = ev.target.innerText
        console.log("value", value)
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
        console.log("reviews", reviews)
        const sumRate = reviews.reduce((acc, review) => {
            return acc += review.rating
        }, 0)
        const avg = Math.floor(sumRate / reviews.length)

        return avg;
        // {/* </div> */ }
        // return <div>{(<StarRateIcon />).repeat(avg)}</div>
    }

    async onAddReview(gig, review) {
        // let date = new Date()
        // const CreatedAt = date.now()
        gig.reviews.push(review)
        this.props.updateGig(gig).then(() => {
            console.log('review added succefully');
        })
    }


    render() {
        const { isGigOwner } = this.state
        const { gig } = this.state
        const { user } = this.props
        // console.log("render , reviews", reviews)
        if (!gig) return <div>No gig...</div>
        return (
            <section className="gig-details main-layout">
                <div>
                    {/* <div onInput={(ev) => this.handleChange(ev, 'title')}> */}
                        {/* <h1 className="gig-title" contentEditable suppressContentEditableWarning={`${isGigOwner}`}>{gig.title}</h1> */}
                    {/* </div> */}
                        <h1 className="gig-title" >{gig.title}</h1>
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
                    {user && <GigReview gig={gig} user={user} onAddReview={this.onAddReview} />}
                    <SellerPreview seller={gig.owner} />
                    <PackageList packages={gig.packages} />
                    {/* sellerPreview */}
                    {/* reviews */}
                </div>
                <div className="sidebar">
                    <div className="package-content flex space-between">
                        <h3> Best SEO Off Page Backlinks Service</h3>
                        <h3>${gig.packages[0].price}0</h3>
                    </div>
                </div>
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
