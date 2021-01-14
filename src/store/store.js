import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'

import { gigReducer } from './reducers/gigReducer.js'
import { userReducer } from './reducers/userReducer.js';
// import { userReducer } from './reducers/userReducer.js'

<<<<<<< HEAD
const rootReducer = combineReducers({
    gigModule: gigReducer,
    userModule: userReducer
});


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
=======
    const rootReducer = combineReducers({
        gigModule: gigReducer
        // userModule: userReducer
    });
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
>>>>>>> 6ba7c5b66fdd7970a8e524f94fcdea6bc229247b
