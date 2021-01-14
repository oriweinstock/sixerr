// import React, { Component } from 'react'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'


class _AppHeader extends React.Component {
    componentDidMount() {
    }
    // logout = async () => {
    //     await this.props.logout()
    //     // console.log('user logged out. frontend')
    // }
    render() {
        // const { user } = this.props
        return (
            <section className="app-header flex space-between align-center main-layout">
                <h1>Sixerr<span>.</span></h1>
                {/* <h1>GIGS HEADER!!! <span className="flip">R'</span> SIXERR</h1> */}
                <ul className="header-nav clean-list flex align-center bold">

                    <NavLink className="fast-trans" to="/"><li>HOME/LOGO</li></NavLink>
                    <NavLink className="fast-trans" to="/gig"><li>Explore</li></NavLink>
                    <NavLink className="fast-trans" to="/chat"><li>Messages</li></NavLink>
                    <NavLink className="fast-trans" to="/order"><li>Orders</li></NavLink>
                    {/* IF Logged in: */}
                    <NavLink className="fast-trans" to="/userprofile"><li>My Account</li></NavLink>
                    {/* IF logged out: */}
                    <NavLink className="" to="#" onClick={() => alert('!')}>Test</NavLink>
                </ul>
                {/* {user && <h3>Welcome {user.username}</h3>} */}
            </section>
        )
    }
}

const mapGlobalStateToProps = (state) => {
    return {
        // user: state.userModule.user
    }
}

const mapDispatchToProps = {
}

export const AppHeader = connect(mapGlobalStateToProps, mapDispatchToProps)(_AppHeader)