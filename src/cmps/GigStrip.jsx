import React from 'react'

import { GigPreview } from "./GigPreview"

export class GigStrip extends React.Component {

    state = {
        // gigs: [],
        posX: 0,
        clientWidth: 0
    }

    elCard = React.createRef()
    
    componentDidMount() {
        const { clientWidth } = document.body
        this.setState({
            posX: 0,
            clientWidth,
        })
        
        // console.log('computed style', window.getComputedStyle(this.elCard.current));
    }
    
    scrollRight = () => {
        console.log(this.elCard)
        const newPosX = this.state.posX - this.state.clientWidth
        this.setState({ ...this.state, posX: newPosX })
    }

    scrollLeft = () => {
        const newPosX = this.state.posX + this.state.clientWidth
        this.setState({ ...this.state, posX: newPosX })
    }

    render() {
        const { gigs, posX } = this.state
        const inlineStyle = { transform: `translateX(${posX}px)` }
        return (
            <section className="gig-strip">
                <button onClick={this.scrollLeft}>LEFT</button>
                <button onClick={this.scrollRight}>RIGHT</button>
                <ul className="strip-wrap clean-list" style={inlineStyle}>
                    {this.props.gigs.map(gig =>
                        <GigPreview key={gig._id}
                            gig={gig}
                            onUserViewGig={this.props.onUserViewGig}
                            onFavoriteToggle={this.props.onFavoriteToggle}
                            user={this.props.user}
                            />
                    )}
                </ul>
            </section>
        )
    }
}