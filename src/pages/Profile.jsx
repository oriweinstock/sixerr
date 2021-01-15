import React from 'react';
import { connect } from 'react-redux'

import { updateUser, onImageChange } from "../store/actions/userActions.js";
import { loadGigs, loadGig } from "../store/actions/gigActions.js";
import { GigList } from '../cmps/GigList.jsx';
import { EditableElement } from '../cmps/EditableElement.jsx';

class _Profile extends React.Component {

    state = {
        from: 'IL',
        memberSince: '2021',
        lastViewed: [],
        suggestedGigs: []

    }

    async componentDidMount() {
        await this.props.loadGigs()
        let lastViewed
        if (this.props.user.viewedGigIds) {
            const prmGigs = this.props.user.viewedGigIds.map(viewedGigId => loadGig(viewedGigId))
            lastViewed = await Promise.all(prmGigs)
        } else lastViewed = []
        this.setState(prevState =>
        ({
            ...prevState,
            suggestedGigs: this.props.gigs.filter((gig, idx) => !(idx % 3)),
            lastViewed
        }))
    }

    handleInput = ({ target }) => {
        const value = target.innerText
        this.setState(prevState => ({ ...prevState, fullname: value }))
    }

    onUploadImg = (ev) => {
        this.props.onImageChange(ev)
    }

    onSave = (field, value) => {
        const user = { ...this.props.user }
        user[field] = value
        this.props.updateUser(user)
    }


    render() {
        const { from, memberSince, lastViewed, suggestedGigs } = this.state
        const { user } = this.props
        console.log(user)
        if (!user) return <div>Loading...</div>
        return (
            <section className="profile main-layout mrg-top">
                <div className="flex">
                    <div className="about-user flex column">
                        <label className="img-upload pointer" htmlFor="uploadImg">
                            <img src={user.imgUrl} />
                            <input onChange={this.onUploadImg} type="file" id="uploadImg" hidden />
                        </label>
                        <EditableElement field={'fullname'} save={this.onSave} type={'h1'} text={user.fullname} />

                        <p>From {from}</p>
                        <p>Member since {memberSince}</p>
                        <button>Contact Me</button>
                    </div>
                {lastViewed.length !== 0 &&
                    <div className="recently-viewed flex column">
                        <h1>Last viewed</h1>
                        <GigList gigs={lastViewed} onDelete={this.onDelete} onUserViewGig={() => { }} />
                    </div>}
                </div>
                <h1>Suggested</h1>
                <GigList gigs={suggestedGigs} onDelete={this.onDelete} onUserViewGig={() => { }} />
            </section>
        )
    }
}


const mapGlobalStateToProps = (state) => {
    return {
        user: state.userModule.user,
        gigs: state.gigModule.gigs,
    }
}
const mapDispatchToProps = {
    onImageChange,
    updateUser,
    loadGigs
}

export const Profile = connect(mapGlobalStateToProps, mapDispatchToProps)(_Profile)


