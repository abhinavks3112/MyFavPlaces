import { ADD_PLACE } from '../actions/types';
import Place from '../../models/Place';

const INITIAL_STATE = {
    places: []
};

const placesReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_PLACE: {
            const newPlace = new Place(
                action.place.id.toString(),
                action.place.name,
                action.place.location,
                action.place.image,
                action.place.description
            );
            return ({
                ...state,
                places: state.places.concat(newPlace)
            });
        }
        default: return state;
    }
};

export default placesReducer;
