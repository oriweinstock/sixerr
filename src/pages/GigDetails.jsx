import React from 'react'
import { connect } from 'react-redux'
import { GigReview } from '../cmps/GigReview.jsx'
import { PackageList } from '../cmps/PackageList.jsx'
import { SellerPreview } from '../cmps/SellerPreview'
// import { Link } from 'react-router-dom'
// import { gigService } from '../services/gigService'
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


    render() {
        const { isGigOwner } = this.state
        const { gig } = this.state
        console.log("render , gig", gig)
        // console.log("render , reviews", reviews)
        if (!gig) return <div>No gig...</div>
        return (
            <section className="gig-details main-layout">
                <div onInput={(ev) => this.handleChange(ev, 'title')}>
                    <h1 contentEditable suppressContentEditableWarning={`${isGigOwner}`}>{gig.title}</h1>
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
                <GigReview gig={gig} />
                <SellerPreview seller={gig.owner} />
                <PackageList packages={gig.packages} />
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
