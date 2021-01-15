// import React, { Component } from 'react'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { Login } from '../pages/Login'
import { logout } from '../store/actions/userActions'


class _AppHeader extends React.Component {

    state = {
        isLoginOpen: false
    }

    componentDidMount() {
    }
    // logout = async () => {
    //     await this.props.logout()
    //     // console.log('user logged out. frontend')
    // }


    onToggleLogin = () => {
        this.setState({ isLoginOpen: !this.state.isLoginOpen })
    }

    render() {
        const { user } = this.props
        const { isLoginOpen } = this.state
        return (
            <>
                <section className="app-header flex space-between align-center main-layout">
                    <h1>Sixerr<span>.</span></h1>
                    <ul className="header-nav clean-list flex align-center bold">

                        <NavLink className="fast-trans" to="/"><li>Home</li></NavLink>
                        <NavLink className="fast-trans" to="/gig"><li>Explore</li></NavLink>
                        <NavLink className="fast-trans" to="/chat"><li>Messages</li></NavLink>
                        <NavLink className="fast-trans" to="/order"><li>Orders</li></NavLink>
                        {user && <NavLink className="fast-trans" to="#" onClick={this.props.logout}>
                            <li>Logout</li>
                        </NavLink>}
                        {!user &&
                            <NavLink className="" to="#" onClick={this.onToggleLogin}>
                                <li>Login</li>
                            </NavLink>}
                        {user && <h3>{user.username}</h3>}
                    </ul>

                </section>
                {isLoginOpen && !user && <Login toggleLogin={this.onToggleLogin} />}
            </>
        )
    }
}

const mapGlobalStateToProps = (state) => {
    return {
        user: state.userModule.user
    }
}

const mapDispatchToProps = {
    logout
}

export const AppHeader = connect(mapGlobalStateToProps, mapDispatchToProps)(_AppHeader)