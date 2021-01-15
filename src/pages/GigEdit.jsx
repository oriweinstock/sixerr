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

    createGigTemplate = () => {
        const _id = utilService.makeId()
        return { _id, title: "", desc: "", tags: [], packages: [{ type: "basic", desc: "", price: null, revisionsCount: null, deliveryDays: null, features: [], owner: {} }] }
    }

    // {
    //     "_id": "s105",
    //     "title": "I will create luxury geometric patterns, background for you",
    //     "desc": "I will design INCREDIBLY BEAUTIFUL geometric line or dots pattern, for personal and commercial use starting from 5$ ONLY. As VECTOR files they will be editable for you. I want to make your product simple, but special and unforgettable.",
    //     "tags": [
    //       "graphic design",
    //       "flat",
    //       "modern"
    //     ],
    //     "packages": [
    //       {
    //         "type": "basic",
    //         "desc": "",
    //         "price": 20,
    //         "revisionsCount": 2,
    //         "deliveryDays": 1,
    //         "features": [
    //           "Source File"
    //         ]
    //       }
    //     ],
    //     "owner": {
    //       "_id": "u103",
    //       "fullname": "user3",
    //       "imgUrl": "/img/img3.jpg"
    //     },
    //     "imgUrls": [
    //       "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/156162379/original/9c48c36d227033912ad3098440e9a90f8503d9d4/create-luxury-geometric-patterns-and-background-for-you.png",
    //       "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/attachments/delivery/asset/b9d0a4a0fc3c4807eccc781ecfadc97c-1597784095/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202020-08-18%20%D0%B2%2023.51.35/cr",
    //       "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs2/156162379/original/9087a56206fcc647d954fbe88c28fc61d673b936/create-luxury-geometric-patterns-and-background-for-you.png"
    //     ],
    //     "reviews": [
    //       {
    //         "id": "madeId",
    //         "rating": 5,
    //         "txt": "Thank you for a job well done. You exceeded my expectations. I will definitely work with this designer in the future.",
    //         "createdAt": "timestamp",
    //         "purchasedAt": "timestamp",
    //         "seller": {
    //           "communication": 5,
    //           "recommend": 5,
    //           "asDescribed": 5
    //         },
    //         "by": {
    //           "_id": "u102",
    //           "fullname": "user2",
    //           "imgUrl": "/img/img2.jpg"
    //         }
    //       }
    //     ]
    //   },




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
        user: state.userModule.user
    }
}

const mapDispatchToProps = {
    addGig,
}

export const GigEdit = connect(mapStateToProps, mapDispatchToProps)(_GigEdit)