import { ADD_PLACE } from './types';

export const addPlace = (name, location, image, description) => ({
    type: ADD_PLACE,
    place: {
        name,
        location,
        image,
        description
    }
});

export const updatePlace = () => ({});
