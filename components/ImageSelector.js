import React, { useState } from 'react';
import {
 View, Button, StyleSheet, Image, Alert
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import Colors from '../constants/Colors';

import BodyText from './BodyText';

const ImageSelector = (props) => {
    const { onImageTaken } = props;
    const [pickedImage, setPickedImage] = useState();
    /* If the use has granted permissions already then,
     it will just return true and false and no alert */
    const verifyPermissions = async () => {
        /* Need to get permissions for both camera and gallery(camera roll) in IOS */
        const result = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
        if (result.status !== 'granted') {
            Alert.alert(
            'Insufficient Permissions',
            'You need to grant camera permissions for this app!!',
            [{ text: 'Okay' }]
            );
            return false;
        }
        return true;
    };

    const takeImageHandler = async () => {
        try {
            const hasPermissions = await verifyPermissions();
            if (!hasPermissions) {
                return;
            }
            const image = await ImagePicker.launchCameraAsync({
                mediaTypes: 'Images',
                quality: 0.5,
                allowsEditing: true,
                aspect: [16, 9]
            });
            setPickedImage(image.uri);
            onImageTaken(image.uri);
        } catch (err) {
           Alert.alert('Error', 'Something unexpected has happened!!', [{ text: 'Okay' }]);
        }
    };

    return (
        <View style={styles.imagePicker}>
            <View style={styles.imagePreview}>
               {!pickedImage ? <BodyText>No Image picked yet!!</BodyText>
                : (
                    <Image
                    style={styles.image}
                    source={{ uri: pickedImage }}
                    />
                )}
            </View>
            <Button
            title="Take Image"
            color={Colors.Primary}
            onPress={takeImageHandler}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    imagePicker: {
        alignItems: 'center'
    },
    imagePreview: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1
    },
    image: {
        width: '100%',
        height: '100%'
    }
});

export default ImageSelector;
