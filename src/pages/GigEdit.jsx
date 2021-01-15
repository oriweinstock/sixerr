import { loadGigs, addGig } from '../store/actions/gigActions.js';
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { gigService } from '../services/gigService.js'


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
            const packages = this.createTemplatePackages()
            // todo call createGig from service and then setState
            this.setState(prevState => {
                return {
                    gig: {
                        ...prevState.gig,
                        packages,
                    }
                }
            })
        }
    }
    onSaveNewGig = (ev) => {
        console.log('on saved gig func :)');
        ev.preventDefault()
        const { gig } = this.state
        this.props.addGig(gig).then(() => {
            console.log('one line before history');
            this.props.history.push('/gig');
        })
    }

    createTemplatePackages = () => {
        return [{ type: 'basic', desc: '', price: null, revisionsCount: null, deliveryDays: null, features: [] }]
    }




    handleInput = ({ target }) => {
        const field = target.name
        console.log("field", field)
        const value = target.value
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
        const { gig } = this.state
        const { features } = gig.packages[0]
        if (!features.includes(value)) {
            features.push(value)
            gig.features = features
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
        console.log("render , gig", gig)
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
    }
}

const mapDispatchToProps = {
    addGig,
}

export const GigEdit = connect(mapStateToProps, mapDispatchToProps)(_GigEdit)