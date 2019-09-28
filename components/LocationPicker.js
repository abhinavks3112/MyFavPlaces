import React, { useState, useEffect } from 'react';
import {
 View, Button, ActivityIndicator, Alert, StyleSheet, TouchableNativeFeedback
} from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

import BodyText from './BodyText';
import MapPreview from './MapPreview';
import Colors from '../constants/Colors';

const LocationPicker = (props) => {
    const { navigation, onLocationPicked } = props;
    const [isFetching, setIsFetching] = useState(false);
    const [pickedLocation, setPickedLocation] = useState();

    const markedLocation = navigation.getParam('pickedLocation');

    useEffect(() => {
        if (markedLocation) {
            setPickedLocation({
                latitude: markedLocation.latitude,
                longitude: markedLocation.longitude
            });
            onLocationPicked(markedLocation);
        }
    }, [markedLocation, onLocationPicked]);

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
          onLocationPicked(pickedLocation);
        } catch (err) {
            Alert.alert('Could not fetch location', 'Please try again later or pick the location on map.',
             [{ text: 'Okay' }]);
        }
        setIsFetching(false);
    };

    const pickOnMapHandler = () => {
        navigation.navigate('Map', { location: pickedLocation });
    };

    return (
        <View style={styles.locationPicker}>
            <TouchableNativeFeedback onPress={pickOnMapHandler}>
                <View style={styles.mapPreview}>
                    <MapPreview location={pickedLocation}>
                        {isFetching
                        ? <ActivityIndicator size="large" color={Colors.Primary} />
                        : <BodyText>No Location chosen yet!!</BodyText>}
                    </MapPreview>
                </View>
            </TouchableNativeFeedback>
            <View style={styles.mapActions}>
                <View styles={styles.buttonContainer}>
                    <Button
                    title="Pick on Map"
                    color={Colors.Primary}
                    onPress={pickOnMapHandler}
                    />
                </View>
                <View styles={styles.buttonContainer}>
                    <Button
                    title="Get User Location"
                    color={Colors.Primary}
                    onPress={getLocationHandler}
                    />
                </View>
            </View>
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
        height: 200,
        borderWidth: 1,
        borderColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center'
    },
    mapActions: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    buttonContainer: {
       width: '40%',
       padding: 5,
       marginHorizontal: 5
    }
});

export default LocationPicker;
