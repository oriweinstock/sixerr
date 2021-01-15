import React from 'react';
import { connect } from 'react-redux'
import StarRateIcon from '@material-ui/icons/StarRate';

const heros = [
    {
        imgUrl: 'https://images.unsplash.com/photo-1569124589354-615739ae007b',
        whoAmI: 'woman',
        username: 'Andrea',
        occupation: 'Video Editor',
        rating: 5
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
    },
    {
        imgUrl: 'https://images.unsplash.com/photo-1581368135153-a506cf13b1e1',
        whoAmI: 'man',
        username: 'Zach',
        occupation: 'Narrator'
    }
]
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
        this.heroInterval = setInterval(this.nextHero, 3000)
    }

    componentWillUnmount() {
        clearInterval(this.heroInterval)
    }

    nextHero = () => {
        const herosCount = this.state.heros.length
        const nextHero = (this.state.currHeroIdx === herosCount - 1) ?
            0 : this.state.currHeroIdx + 1
        this.setState({currHeroIdx: nextHero})
    }

    render() {
        const { heros, currHeroIdx } = this.state
        const hero = heros[currHeroIdx]
        const whoAmI = heros[currHeroIdx].whoAmI
        return (
            <>
                <section className="hero">
                    <h1 className="main-layout">Find the perfect {whoAmI} for your perfect business</h1>
                    <img src={hero.imgUrl} alt="" />
                    <div className="hero-snippet">
                        <div>
                            {/* <StarRateIcon />
                            <StarRateIcon />
                            <StarRateIcon />
                            <StarRateIcon /> */}
                        </div>
                        <span>{hero.username}</span>, {hero.occupation}
                    </div>
                </section>
            </>
        )
    }
}



const mapStateToProps = (state) => {
    return {
        // gigs: state.gigModule.gigs,
        // user: state.userModule.user
    }
}

const mapDispatchToProps = {
    // addGig,
    // updateGig
}

export const Hero = connect(mapStateToProps, mapDispatchToProps)(_Hero)