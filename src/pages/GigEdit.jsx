import React, { Component } from 'react'
import { connect } from 'react-redux'

import { gigService } from '../services/gigService.js'
import { cloudinaryService } from '../services/cloudinaryService.js';
import { addGig } from '../store/actions/gigActions.js';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import ClearIcon from '@material-ui/icons/Clear';

class _GigEdit extends Component {

    state = {
        gig: {
            title: '',
            desc: '',
            packages: null,
            tags: '',
        },
        currFeature: ''
    }

    featureIdx = 0

    componentDidMount() {
        const gig = this.createGigTemplate()
        this.setState({ gig })
        // todo call createGig from service and then setState
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
        const gig = {
            title: "",
            desc: "",
            tags: [],
            packages,
            owner: user,
            imgUrls: ["https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs3/157536980/original/d7411fe67086a183a78e81950000dde20ee5b689/create-3d-model-and-render-your-sketch-or-2d-plan.jpg",
                "https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/attachments/delivery/asset/d91dab5d590614ec0c36060db1ba1c67-1606486728/Stationery%202/do-a-minimalist-logo-business-card-and-stationery.jpg",
                "https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/attachments/delivery/asset/d91dab5d590614ec0c36060db1ba1c67-1606486728/Stationery%202/do-a-minimalist-logo-business-card-and-stationery.jpg",
                "https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/attachments/delivery/asset/d91dab5d590614ec0c36060db1ba1c67-1606486728/Stationery%202/do-a-minimalist-logo-business-card-and-stationery.jpg",
                "https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/attachments/delivery/asset/d91dab5d590614ec0c36060db1ba1c67-1606486728/Stationery%202/do-a-minimalist-logo-business-card-and-stationery.jpg",
                "https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/attachments/delivery/asset/d91dab5d590614ec0c36060db1ba1c67-1606486728/Stationery%202/do-a-minimalist-logo-business-card-and-stationery.jpg",
                "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs2/156162379/original/9087a56206fcc647d954fbe88c28fc61d673b936/create-luxury-geometric-patterns-and-background-for-you.png"],
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

    // handlePackageFeatures = (value) => {
    //     console.log("value", value)
    //     const { gig } = this.state
    //     const { features } = gig.packages[0]
    //     console.log("features", features)
    //     if (!features.includes(value)) {
    //         features.push(value)
    //         gig.features = features
    //         console.log("gig", gig)
    //         this.setState(prevState => {
    //             return {
    //                 gig: {
    //                     ...prevState.gig,
    //                 }
    //             }
    //         })
    //     }
    // }

    addFeature = (ev) => {
        ev.preventDefault()
        const packages = [...this.state.gig.packages]
        const currFeature = ev.target.value
        if (ev.keyCode == 13) {
            packages[0].features[this.featureIdx] = currFeature
            this.setState(prevState => {
                return {
                    gig: {
                        ...prevState.gig,
                        packages
                    },
                    currFeature: ''
                }
            })
            this.featureIdx += 1
            this.state.gig.packages[0].features[this.featureIdx] = ''

            return
        }
        this.setState(prevState => {
            return {
                ...prevState, currFeature
            }
        })
    }


    uploadImage = async (ev) => {
        const data = await cloudinaryService.uploadImg(ev)
        console.log(data)
        const newUrl = data.secure_url;
        const imgUrls = [...this.state.gig.imgUrls, newUrl]
        this.setState(prevState => {
            return {
                gig: {
                    ...prevState.gig,
                    imgUrls
                },
            }
        })
    }

    removeImage = (ev) => {
        console.log('removing image:', ev)
    }
    render() {
        const { gig } = this.state

        if (!gig.packages) return <div>loading</div>
        return (
            <section className="gig-edit main-layout">
                <form className="flex column justify-center">
                    <h4>Edit title</h4>
                    <textarea name="title" autoFocus rows="2" cols="60" type="text" placeholder="Enter Gig Title..." value={gig.title} onChange={this.handleInput} required autoComplete="off" />
                    <h4>Edit description</h4>
                    <textarea name="desc" rows="5" cols="60" type="text" placeholder="Enter Gig Desc..." value={gig.desc} onChange={this.handleInput} required autoComplete="off" />
                    <h4>Add label</h4>
                    <select onChange={this.handleInput} name="tags" required>
                        <option value="graphic design">Graphic design</option>
                        <option value="minimalist">Minimalist</option>
                        <option value="flat">Flat</option>
                        <option value="modern">Modern</option>
                        <option value="book">Book</option>
                        <option value="logo design">Logo design</option>
                        <option value="cover">Cover</option>
                    </select>
                    <h4>Package</h4>
                    <textarea name="desc" rows="3" cols="60"
                        value={gig.packages[0].desc}
                        type="text" placeholder="Enter package Desc..."
                        onChange={this.handlePackagesInputs}
                        required autoComplete="off" />
                    <h4>Add some package features</h4>
                    <div className="package-features flex">
                        <input type="text" name="feature" placeholder="ex: responsive design, multi-language"
                            value={this.state.currFeature} onChange={this.addFeature} onKeyUp={this.addFeature} />
                        <ul className="clean-list flex">
                            {gig.packages[0].features.map(feature => {
                                if (feature.length > 0) return <li key={feature}>{feature}</li>
                            })}
                        </ul>
                    </div>
                    <h4>Package additional details</h4>
                    <input type="number" name="price" placeholder="Package price"
                        value={gig.packages[0].price} onChange={this.handlePackagesInputs} required autoComplete="off" />
                    <input type="number" name="revisionCount" placeholder="Revision Count..."
                        value={gig.packages[0].revisionCount} onChange={this.handlePackagesInputs} required autoComplete="off" />
                    <input type="number" name="deliveryDays" placeholder="Days to deliver..."
                        value={gig.packages[0].deliveryDays} onChange={this.handlePackagesInputs} required autoComplete="off" />

                    <div className="gig-edit-images">
                        <div className="flex">
                            <label className="img-upload pointer" htmlFor="uploadImg">
                                <input onChange={this.uploadImage} type="file" id="uploadImg" hidden />
                                <PhotoCameraIcon className="camera-icon" />
                            </label>
                            <h4>Add some photos</h4>
                        </div>
                        <ul className="clean-list flex">
                            {gig.imgUrls.map(url => {
                                return <li key={url} className="pointer">
                                    <img src={url} alt="" />
                                    <ClearIcon className="clear-icon" onClick={this.removeImage} />
                                </li>
                            })}
                        </ul>
                    </div>

                </form>
                <div>
                    <button className="gig-save" onClick={this.onSaveNewGig} >Save</button>
                </div>
            </section>
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