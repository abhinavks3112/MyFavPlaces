import * as FileSystem from 'expo-file-system';
import { ADD_PLACE, SET_PLACES } from './types';
import { insertPlace, fetchPlaces } from '../../helpers/db';

export const addPlace = (name, location, image, description) => async (dispatch) => {
    /* Split the image path into array of segments and take the last segment eg
    myFolder/myImage.jpeg => ['myFolder', 'myImage.jpeg'] */
    const fileName = image.split('/').pop();
    const newPath = FileSystem.documentDirectory + fileName;
    try {
        // Moving the iamge to a permanent location on device
        await FileSystem.moveAsync({ from: image, to: newPath });
        const dbResult = await insertPlace(
            name,
            'Dummy Address',
            15.6,
            12.3,
            newPath,
            description
        );
        dispatch({
                type: ADD_PLACE,
                place: {
                    id: dbResult.insertId,
                    name,
                    location,
                    image: newPath,
                    description
                }
        });
    } catch (error) {
        throw new Error('Something unexpected happened when adding the place ', error);
    }
};

export const loadPlaces = () => async (dispatch) => {
    try {
        const dbResult = await fetchPlaces();
        dispatch({
                type: SET_PLACES,
                places: dbResult.rows._array
        });
    } catch (error) {
        throw new Error('Something unexpected happened when loading places ', error);
    }
};

export const updatePlace = () => ({});
