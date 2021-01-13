// import { storageService } from './storageService.js';
// import { utilService } from './utilService.js';
import { httpService } from './httpService'

export const gigService = {
    query,
    deleteGig,
    save,
    getById
}

async function query(filterBy) {
    return httpService.get('gig', filterBy)
}

async function getById(gigId) {
    return httpService.get(`gig/${gigId}`)  
}

async function deleteGig(gigId) {
    return httpService.delete(`gig/${gigId}`)  
}

async function save(gigToSave) {
    console.log("save , gigToSave", gigToSave)
    if (gigToSave._id) {
        return httpService.put(`gig/${gigToSave._id}`, gigToSave) // UPDATE
    } else {
        return httpService.post('gig', gigToSave) // CREATE
    }
}
