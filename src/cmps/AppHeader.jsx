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
            <div className="flex space-between align-base mrg-start mrg-end">
                <h1>GIGS HEADER!!! <span className="flip">R'</span> SIXERR</h1>
                {/* <ul className="clean-list flex">

                    <NavLink to="/"><li className="mrg-end">HOME/LOGO</li></NavLink>
                    <NavLink to="/gig"><li className="mrg-end">Explore</li></NavLink>
                    <NavLink to="/chat"><li className="mrg-end">Messages</li></NavLink>
                    <NavLink to="/order"><li className="mrg-end">Orders</li></NavLink>
                    <NavLink to="/userprofile"><li className="mrg-end">My Account</li></NavLink>
                </ul>
                {user && <h3>Welcome {user.username}</h3>}*/}
            </div> 
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