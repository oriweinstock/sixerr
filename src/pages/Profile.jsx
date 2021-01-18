import React from 'react';
import { connect } from 'react-redux'

import { updateUser, onImageChange } from "../store/actions/userActions.js";
import { loadGigs, getGigs } from "../store/actions/gigActions.js";
import { GigList } from '../cmps/GigList.jsx';
import { EditableElement } from '../cmps/EditableElement.jsx';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';

class _Profile extends React.Component {

    state = {
        from: 'IL',
        memberSince: '2021',
        lastViewed: [],
        suggestedGigs: [],
        favoriteGigs: []

    }

    async componentDidMount() {
        await this.props.loadGigs() // TODO: REMOVE FROM HERE WHEN IMPLEMENTING BETTER MECHANISM FOR SUGGESTED
        const {user} = this.props
        const lastViewed = user.viewedGigIds? await getGigs(user.viewedGigIds): []          
        const favoriteGigs = user.favoriteIds? await getGigs(user.favoriteIds): []          
        this.setState(prevState =>
        ({
            ...prevState,
            suggestedGigs: this.props.gigs.filter((gig, idx) => !(idx % 3)),
            lastViewed,
            favoriteGigs
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

    onFavoriteToggle = (ev, gigId) => { 
        ev.stopPropagation()
        const user = {...this.props.user}
        if (user.favoriteIds) {
            if (user.favoriteIds.find(favoriteId => favoriteId === gigId)) user.favoriteIds = user.favoriteIds.filter(favoriteId => favoriteId !== gigId)
            else user.favoriteIds.push(gigId)
        } else user.favoriteIds = [gigId]
        this.props.updateUser(user)
    }

    onRemoveViewed = (gigId) => {
        const user = { ...this.props.user }
        user.viewedGigIds = user.viewedGigIds.filter(viewedGigId => viewedGigId !==gigId)
        this.props.updateUser(user)
        const lastViewed = this.state.lastViewed.filter(gig => gig._id !==gigId)
        this.setState({lastViewed})
    }



    render() {
        const { from, memberSince, lastViewed, suggestedGigs, favoriteGigs } = this.state
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
                            <PhotoCameraIcon className="camera-icon"/>
                        </label>
                        <EditableElement field={'fullname'} save={this.onSave} type={'h1'} text={user.fullname} />

                        <p>From {from}</p>
                        <p>Member since {memberSince}</p>
                        <button>Send Message</button>
                    </div>
                {lastViewed.length !== 0 &&
                    <div className="recently-viewed flex column">
                        <h1>Last viewed</h1>
                        <GigList gigs={lastViewed} onDelete={this.onDelete} onUserViewGig={() => { }} onFavoriteToggle={this.onFavoriteToggle} user={user} removeViewed={this.onRemoveViewed}/>
                    </div>}
                </div>
                <h1>Favorites</h1>
                <GigList gigs={favoriteGigs} onDelete={this.onDelete} onUserViewGig={() => { }} onFavoriteToggle={this.onFavoriteToggle} user={user}/>
                <h1>Suggested</h1>
                <GigList gigs={suggestedGigs} onDelete={this.onDelete} onUserViewGig={() => { }} onFavoriteToggle={this.onFavoriteToggle} user={user} />
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


