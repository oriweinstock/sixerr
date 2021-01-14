import { Component } from 'react';
import { connect } from 'react-redux'

import { login, logout, addUser } from "../store/actions/userActions.js"

class _Login extends Component {

    state = {
        msg: '',
        loginCred: {
            username: '',
            password: ''
        },
        signupCred: {
            username: '',
            password: '',
            fullname: ''
        }
    }

    // componentDidMount () {

    // }

    loginHandleChange = ev => {
        const { name, value } = ev.target
        this.setState(prevState => ({
            loginCred: {
                ...prevState.loginCred,
                [name]: value
            }
        }))
    }

    signupHandleChange = ev => {
        const { name, value } = ev.target
        this.setState(prevState => ({
            signupCred: {
                ...prevState.signupCred,
                [name]: value
            }
        }))
    }

    doLogin = async ev => {
        ev.preventDefault()
        const userCreds = this.state.loginCred
        if (!userCreds.username || !userCreds.password) {
            return this.setState({ loginCred: { username: '', password: '' }, msg: 'Please enter user/password' })
        }
        try {
            await this.props.login(userCreds)
            this.setState(
                {
                    loginCred: { username: '', password: '' },
                }, () => { this.props.history.push('/gig') })

        }
        catch (err) {
            console.log('ERR', err)
            this.setState(prevState => ({
                loginCred: {
                    ...prevState.loginCred,
                    password: ''
                },
                msg: 'Wrong username or password, please try again'
            }))
        }
    }

    doLogout = () => {
        this.props.logout()
    }

    doSignup = async ev => {
        ev.preventDefault()
        const { username, password, fullname } = this.state.signupCred
        if (!username || !password || !fullname) {
            return this.setState({ msg: 'All inputs are required' })
        }
        try {
            await this.props.addUser({ username, password, fullname })
            this.setState(
                {
                    signupCred: { username: '', password: '', fullname: '' },
                }, () => { this.props.history.push('/gig') })
        }
        catch (err) {
            console.log('ERR', err)
            this.setState(prevState => ({
                signupCred: {
                    ...prevState.signupCred,
                    password: ''
                },
                msg: 'Could not sign up please try again'
            }))
        }
    }

    render() {

        const loggedInUser = this.props.user //TODO pay attention later 
        console.log(loggedInUser)

        let signupSection = (
            <form className="frm" onSubmit={this.doSignup}>
                <input
                    type="text"
                    name="fullname"
                    value={this.state.signupCred.fullname}
                    onChange={this.signupHandleChange}
                    placeholder="Full name"
                />
                <input
                    name="password"
                    type="password"
                    value={this.state.signupCred.password}
                    onChange={this.signupHandleChange}
                    placeholder="Password"
                />
                <input
                    type="text"
                    name="username"
                    value={this.state.signupCred.username}
                    onChange={this.signupHandleChange}
                    placeholder="Username"
                />
                <br />
                <button>Signup</button>
            </form>
        )
        let loginSection = (
            <form className="frm" onSubmit={this.doLogin}>
                <input
                    type="text"
                    name="username"
                    value={this.state.loginCred.username}
                    onChange={this.loginHandleChange}
                    placeholder="Username"
                />
                <br />
                <input
                    type="password"
                    name="password"
                    value={this.state.loginCred.password}
                    onChange={this.loginHandleChange}
                    placeholder="Password"
                />
                <br />
                <button className="rounded">Continue</button>
                <hr/>
                <h4>Not a member yet? <span>Join now</span></h4>
            </form>
        )


        return (
            <div className="login main-layout shadow rounded">
                <h1>
                    Sign In to Sixerr
                </h1>
                <p>{this.state.msg}</p>
                {loggedInUser && (
                    <div>
                        <h3>
                            Welcome {loggedInUser.fullname}
                            <button onClick={this.doLogout}>Logout</button>
                        </h3>
                    </div>
                )}
                {!loggedInUser && loginSection}
                {/* {!loggedInUser && signupSection} */}


            </div>
        )
    }


}

const mapStateToProps = (state) => {
    return {
        user: state.userModule.user
    }
}

const mapDispatchToProps = {
    login,
    logout,
    addUser,
}

export const Login = connect(mapStateToProps, mapDispatchToProps)(_Login)




