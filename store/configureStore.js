import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import PlacesReducer from './reducers/placesReducer';

const configureStore = () => {
    const rootReducer = combineReducers({
        places: PlacesReducer
    });

    const middleware = applyMiddleware(ReduxThunk);
    const store = createStore(rootReducer, composeWithDevTools(middleware));

    return store;
};

export default configureStore;
