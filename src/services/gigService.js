// import { storageService } from './storageService.js';
// import { utilService } from './utilService.js';
import Axios from 'axios'
var axios = Axios.create({
    withCredentials: true
})

export const gigService = {
    query,
    deleteGig,
    save,
    getById
}

// JSON-SERVER const baseUrl = 'http://localhost:3003/gig';
const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3030/api/gig' : '/api/gig'

async function query(filterBy) {
    console.log(filterBy)
    const queryString = Object.keys(filterBy).map(key => `${key}=${filterBy[key]}`).join('&');
    try {
        // return axios.get(baseUrl, {params:filterBy})
        const res = await axios.get(`${baseUrl}/?${queryString}`)
        return res.data
    }
    catch (err) {
        console.log('Error in gig query', err)
    }
}

async function getById(gigId) {
    try {
        const res = await axios.get(`${baseUrl}/${gigId}`)
        return res.data
    }
    catch (err) {
        console.log('Error in get gig by ID', err)
    }
}

async function deleteGig(gigId) {
    try {
        const res = await axios.delete(`${baseUrl}/${gigId}`)
        return res.data
    }
    catch (err) {
        console.log('Error in Delete gig', err)
    }
}

async function save(gigToSave) {
    if (gigToSave._id) {
        // UPDATE
        try {
            const res = await axios.put(`${baseUrl}/${gigToSave._id}`, gigToSave)
            return res.data
        }
        catch (err) {
            console.log('Error in Update gig', err)
        }
    } else {
        // CREATE
        try {
            const res = await axios.post(baseUrl, gigToSave)
            return res.data
        }
        catch (err) {
            console.log('Error in Creating a gig', err)
        }
    }
}
