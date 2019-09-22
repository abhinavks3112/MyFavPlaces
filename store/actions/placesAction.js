import * as FileSystem from 'expo-file-system';
import { ADD_PLACE } from './types';

export const addPlace = (name, location, image, description) => async (dispatch) => {
    /* Split the image path into array of segments and take the last segment eg
    myFolder/myImage.jpeg => ['myFolder', 'myImage.jpeg'] */
    const fileName = image.split('/').pop();
    const newPath = FileSystem.documentDirectory + fileName;
    try {
        // Moving the iamge to a permanent location on device
        await FileSystem.moveAsync({ from: image, to: newPath });
    } catch (error) {
        throw new Error('Something unexpected happened when moving the file');
    }
    dispatch({
        type: ADD_PLACE,
        place: {
            name,
            location,
            image: newPath,
            description
        }
    });
};

export const updatePlace = () => ({});
