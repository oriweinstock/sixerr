import {SixerrApp} from './pages/SixerrApp.jsx'
import {GigDetails} from './pages/GigDetails.jsx'
import {GigEdit} from './pages/GigEdit.jsx'
import { Login } from './pages/Login.jsx'


export const routes = [
    {
        path:'/gig/edit/:gigId?',
        component: GigEdit
    },
    {
        path:'/gig/:gigId',
        component: GigDetails
    },
    {
        path:'/gig',
        component: SixerrApp
<<<<<<< HEAD
    },
    {
        path:'/gig/edit/:gigId?',
        component: GigEdit
    },
    {
        path:'/login',
        component: Login
=======
>>>>>>> 6ba7c5b66fdd7970a8e524f94fcdea6bc229247b
    }
]