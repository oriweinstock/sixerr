import { loadGigs, addGig } from '../store/actions/gigActions.js';
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { gigService } from '../services/gigService.js'
import { utilService } from '../services/utilService.js'



class _GigEdit extends Component {

    state = {
        gig: {
            title: '',
            desc: '',
            packages: null,
            tags: '',
        }
    }

    componentDidMount() {
        const gigId = this.props.match.params.gigId
        console.log("componentDidMount , gigId", gigId)
        if (gigId) {
            gigService.getById(gigId).then((gig) => {
                console.log("gigService.getById , gig", gig)
                this.setState({ gig })
            })
        }
        else {
            // const packages = this.createTemplatePackages()
            const gig = this.createGigTemplate()
            console.log("componentDidMount , gig", gig)
            this.setState({ gig })
            // todo call createGig from service and then setState
        }
    }
    onSaveNewGig = (ev) => {
        console.log('on saved gig func :)');
        ev.preventDefault()
        const { gig } = this.state
        console.log("gig on saved gig!", gig)
        this.props.addGig(gig).then(() => {
            console.log('one line before history');
            this.props.history.push('/gig');
        })
    }

    createTemplatePackages = () => {
        return [{ type: 'basic', desc: '', price: null, revisionCount: null, deliveryDays: null, features: [] }]
    }

    createGigTemplate = () => {
        const { user } = this.props
        console.log("user", user)
        const packages = this.createTemplatePackages()
        const defaultImgUrl = "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs3/176041336/original/f83ff537301d6eeb9c0cac8300bfa078098e95fb/design-and-develop-an-eye-catchy-website.jpg"
        const gig = {
            title: "",
            desc: "",
            tags: [],
            packages,
            owner: user,
            imgUrls: [defaultImgUrl],
            reviews: []
        }
        return gig
    }

    handleInput = ({ target }) => {
        const field = target.name
        console.log("field", field)
        let value = target.value
        if (field === 'tags') {
            const tags = [value]
            value = tags
        }
        console.log("value", value)
        this.setState(prevState => {
            return {
                gig: {
                    ...prevState.gig,
                    [field]: value
                }
            }
        })
    }
    handlePackagesInputs = ({ target }) => {
        const field = target.name
        let value;
        if (target.type === 'number') value = +target.value
        else value = target.value
        const { packages } = this.state.gig
        const pack = { ...packages[0] }
        pack[field] = value
        packages[0] = { ...pack }
        console.log("packages", packages)
        this.setState(prevState => {
            return {
                gig: {
                    ...prevState.gig,
                    packages

                }
            }
        })

    }
    handlePackageFeatures = (value) => {
        console.log("value", value)
        const { gig } = this.state
        const { features } = gig.packages[0]
        console.log("features", features)
        if (!features.includes(value)) {
            features.push(value)
            gig.features = features
            console.log("gig", gig)
            this.setState(prevState => {
                return {
                    gig: {
                        ...prevState.gig,
                    }
                }
            })
        }
    }

    render() {
        const { gig } = this.state
        const { packages } = gig
        console.log("render!!!! , gig", gig)
        console.log("render , packages", packages)
        if (!gig.packages) return <div>loading</div>
        return (
            <>
                <form onSubmit={this.onSaveNewGig} className="flex column justify-center">
                    <h4>Edit Title</h4>
                    <textarea name="title" autoFocus rows="3" cols="60" type="text" placeholder="Enter Gig Title..." value={gig.title} onChange={this.handleInput} required autoComplete="off" />
                    <h4>Edit Desc</h4>
                    <textarea name="desc" rows="3" cols="60" type="text" placeholder="Enter Gig Desc..." value={gig.desc} onChange={this.handleInput} required autoComplete="off" />
                    <h4>Choose Tag</h4>
                    <select onChange={this.handleInput} name="tags" required>
                        <option value="graphic design">graphic design </option>
                        <option value="minimalist">minimalist</option>
                        <option value="flat">flat</option>
                        <option value="modern">modern</option>
                        <option value="book">book</option>
                        <option value="logo design">logo design</option>
                        <option value="cover">cover</option>
                    </select>
                    <h4>Package</h4>
                    <textarea name="desc" rows="3" cols="60" value={gig.packages[0].desc} type="text" placeholder="Enter package Desc..." onChange={this.handlePackagesInputs} required autoComplete="off" />
                    <input type="number" name="price" placeholder="enter packPrice" value={gig.packages[0].price} onChange={this.handlePackagesInputs} required autoComplete="off" />
                    <input type="number" name="revisionCount" placeholder="enter Revision Count..." value={gig.packages[0].revisionCount} onChange={this.handlePackagesInputs} required autoComplete="off" />
                    <input type="number" name="deliveryDays" placeholder="enter Revision Count..." value={gig.packages[0].deliveryDays} onChange={this.handlePackagesInputs} required autoComplete="off" />
                    <div>
                        <button type="button" onClick={() => this.handlePackageFeatures("3D Modeling")}>3D Modeling</button>
                        <button type="button" onClick={() => this.handlePackageFeatures("Include Environment")}>Include Environment</button>
                    </div>
                    <div>
                        <button>Save</button>
                    </div>
                </form>
            </>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        gigs: state.gigModule.gigs,
        user: state.userModule.user
    }
}

const mapDispatchToProps = {
    addGig,
}

export const GigEdit = connect(mapStateToProps, mapDispatchToProps)(_GigEdit)