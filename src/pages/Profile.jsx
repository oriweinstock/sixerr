import React from 'react';
import {connect} from 'react-redux'

import { } from "../store/actions/userActions.js";

class _Profile extends React.Component {

    state = {
        username: '',
    }

    componentDidMount() {
    }

    handleInput = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState(prevState => ({...prevState, [field]: value }))
    }


    render() {
        const { username } = this.state
        const { user } = this.props
        if (!user) return <div>Loading...</div>
        return (
            <div>
                <h1>Profile</h1>
                <form onSubmit={ this.onSavePreferences }>
                    <label>Name</label>
                    <input autoFocus type="text" value={ username } onChange={ this.handleInput } name="username" />
                    <button>Save</button>
                </form>
                
            </div >
        )
    }
}


const mapGlobalStateToProps = (state) => {
    return {
        user: state.userModule.user,
    }
}
const mapDispatchToProps = {
}

export const Profile = connect(mapGlobalStateToProps, mapDispatchToProps)(_Profile)


