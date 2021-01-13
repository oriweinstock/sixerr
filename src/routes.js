import {SixerrApp} from './pages/SixerrApp.jsx'
import {GigDetails} from './pages/GigDetails.jsx'
// import { UserProfile } from './pages/UserProfile.jsx'

export const routes = [
    {
        path:'/gig/:gigId',
        component: GigDetails
    },
    {
        path:'/gig',
        component: SixerrApp
    },
    // {
    //     path:'/profile',
    //     component: UserProfile
    // }
]