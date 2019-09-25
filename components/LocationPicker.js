import React, { useState } from 'react';
import {
 View, Button, ActivityIndicator, Alert, StyleSheet
} from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

import BodyText from './BodyText';
import Colors from '../constants/Colors';

const LocationPicker = () => {
    const [isFetching, setIsFetching] = useState(false);
    const [pickedLocation, setPickedLocation] = useState();

    /* If the use has granted permissions already then,
     it will just return true and false and no alert */
     const verifyPermissions = async () => {
        /* Need to get permissions for both camera and gallery(camera roll) in IOS */
        const result = await Permissions.askAsync(Permissions.LOCATION);
        if (result.status !== 'granted') {
            Alert.alert(
            'Insufficient Permissions',
            'You need to grant location permission for this app!!',
            [{ text: 'Okay' }]
            );
            return false;
        }
        return true;
    };

    const getLocationHandler = async () => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }
        try {
          setIsFetching(true);
          const location = await Location.getCurrentPositionAsync({ timeout: 5000 });
          setPickedLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
          });
        } catch (err) {
            Alert.alert('Could not fetch location', 'Please try again later or pick the location on map.',
             [{ text: 'Okay' }]);
        }
        setIsFetching(false);
    };
    return (
        <View style={styles.locationPicker}>
            <View style={styles.mapPreview}>
                {isFetching
                ? <ActivityIndicator size="large" color={Colors.Primary} />
                : <BodyText>No Location chosen yet!!</BodyText>}
            </View>
            <Button
            title="Get User Location"
            color={Colors.Primary}
            onPress={getLocationHandler}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    locationPicker: {
        marginBottom: 15,
        alignItems: 'center'
    },
    mapPreview: {
        marginBottom: 10,
        width: '100%',
        height: 150,
        borderWidth: 1,
        borderColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default LocationPicker;
