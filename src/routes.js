import {SixerrApp} from './pages/SixerrApp.jsx'
import {GigDetails} from './pages/GigDetails.jsx'
import {GigEdit} from './pages/GigEdit.jsx'
import { Login } from './pages/Login.jsx'


export const routes = [
    {
        path:'/gig/:gigId',
        component: GigDetails
    },
    {
        path:'/gig',
        component: SixerrApp
    },
    {
        path:'/gig/edit/:gigId?',
        component: GigEdit
    },
    {
        path:'/login',
        component: Login
    }
]