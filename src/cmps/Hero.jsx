import React from 'react';
import { connect } from 'react-redux'
import StarRateIcon from '@material-ui/icons/StarRate';
import { GigStrip } from './GigStrip.jsx';
import { loadGigs } from "../store/actions/gigActions.js";
import { updateUser } from "../store/actions/userActions.js";
import { GigList } from './GigList.jsx';


class _Hero extends React.Component {

    state = {
        currHeroIdx: 0,
        heros: [
            {
                imgUrl: 'https://images.unsplash.com/photo-1569124589354-615739ae007b',
                whoAmI: 'woman',
                username: 'Andrea',
                occupation: 'Video Editor',
                rating: 5
            },
            {
                imgUrl: 'https://images.unsplash.com/photo-1581368135153-a506cf13b1e1',
                whoAmI: 'man',
                username: 'Zach',
                occupation: 'Narrator'
            },
            {
                imgUrl: 'https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5',
                whoAmI: 'woman',
                username: 'Hiluli',
                occupation: 'DevOps'
            },
            {
                imgUrl: 'https://images.unsplash.com/photo-1567468219153-4b1dea5227ea',
                whoAmI: 'woman',
                username: 'Puka bat David',
                occupation: 'React JS Expert',
                rating: 5
            }
        ]
    }

    heroInterval

    componentDidMount() {
        this.heroInterval = setInterval(this.nextHero, 6000)
        this.props.loadGigs()
    }

    componentWillUnmount() {
        clearInterval(this.heroInterval)
    }

    onUserViewGig = (gigId) => {
        const user = { ...this.props.user }
        if (user.viewedGigIds) {
            if (!user.viewedGigIds.find(viewedGigId => viewedGigId === gigId)) user.viewedGigIds.push(gigId)
        } else user.viewedGigIds = [gigId]
        this.props.updateUser(user)
    }

    nextHero = () => {
        const herosCount = this.state.heros.length
        const nextHero = (this.state.currHeroIdx === herosCount - 1) ?
            0 : this.state.currHeroIdx + 1
        this.setState({ currHeroIdx: nextHero })
    }

    render() {
        const { heros, currHeroIdx } = this.state
        const hero = heros[currHeroIdx]

        const jsGigs = [...this.props.gigs.slice(3)]
        const musicGigs = [...this.props.gigs.slice(6)]
        const suggestedGigs = [...this.props.gigs.slice(9)]
        return (
            <>
                <section className="hero">
                    <h1 className="main-layout">Find the perfect <span>freelance</span> for your business</h1>
                    <img src={hero.imgUrl} alt="" />
                    <div className="hero-snippet">
                        <div className="stars">
                            <StarRateIcon />
                            <StarRateIcon />
                            <StarRateIcon />
                            <StarRateIcon />
                            <StarRateIcon />
                        </div>
                        <span>{hero.username}</span>, {hero.occupation}
                    </div>
                    {/* <SixerrApp /> */}
                    <GigStrip title={'Design'}
                        gigs={this.props.gigs}
                        onUserViewGig={this.onUserViewGig}
                        onFavoriteToggle={this.onFavoriteToggle}
                        user={this.props.user}
                        onDelete={this.onDelete} />
                    <GigStrip title={'Software'}
                        bgColor={'#eeeeee'}
                        gigs={jsGigs}
                        onUserViewGig={this.onUserViewGig}
                        onFavoriteToggle={this.onFavoriteToggle}
                        user={this.props.user}
                        onDelete={this.onDelete} />
                    <GigStrip title={'Music'}
                        gigs={musicGigs}
                        onUserViewGig={this.onUserViewGig}
                        onFavoriteToggle={this.onFavoriteToggle}
                        user={this.props.user}
                        onDelete={this.onDelete} />
                    <GigStrip title={'Video'}
                        bgColor={'#eeeeee'}
                        gigs={this.props.gigs}
                        onUserViewGig={this.onUserViewGig}
                        onFavoriteToggle={this.onFavoriteToggle}
                        user={this.props.user}
                        onDelete={this.onDelete} />
                    <h2>Suggested</h2>
                    <GigList gigs={suggestedGigs} onDelete={this.onDelete} onUserViewGig={() => { }} onFavoriteToggle={this.onFavoriteToggle} isSmallPreview={true} />

                </section>
            </>
        )
    }
}



const mapStateToProps = (state) => {
    return {
        gigs: state.gigModule.gigs,
        // user: state.userModule.user
    }
}

const mapDispatchToProps = {
    loadGigs,
    updateUser
    // addGig,
    // updateGig
}

export const Hero = connect(mapStateToProps, mapDispatchToProps)(_Hero)