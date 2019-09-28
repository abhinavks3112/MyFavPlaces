import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/CustomHeaderButton';

const MapScreen = (props) => {
    const { navigation } = props;
    const [selectedLocation, setSelectedLocation] = useState();
    const location = navigation.getParam('location');
    const latitudeDelta = 0.0922;
    const longitudeDelta = 0.0421;
    let markerCoordinate;

    let mapRegion = null;

    if (!location) {
    // default region
        mapRegion = {
        latitude: 37.5,
        longitude: -122.43,
        latitudeDelta,
        longitudeDelta
    };
    } else {
        mapRegion = {
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta,
            longitudeDelta
        };
        markerCoordinate = location;
    }

    const selectLocationHandler = (event) => {
        setSelectedLocation(event.nativeEvent.coordinate);
    };

    const saveMarkedLocationHandler = useCallback(() => {
        if (!selectedLocation && !location) {
            Alert.alert('No Location Chosen', 'Please choose a location and then save!!', [{ text: 'Okay' }]);
            return;
        }
        navigation.navigate('NewPlace', {
            pickedLocation: selectedLocation
        });
    }, [selectedLocation]);

    useEffect(() => {
        navigation.setParams({
            save: saveMarkedLocationHandler
        });
    }, [saveMarkedLocationHandler]);

    if (selectedLocation) {
        markerCoordinate = selectedLocation;
        mapRegion = {
            latitude: selectedLocation.latitude,
            longitude: selectedLocation.longitude,
            latitudeDelta,
            longitudeDelta
        };
    }

    return (
    <MapView
    style={styles.map}
    region={mapRegion}
    onPress={selectLocationHandler}
    >
       {markerCoordinate && (
           <Marker
            title="Picked Location"
            coordinate={markerCoordinate}
           />
        )}
    </MapView>
    );
};

MapScreen.navigationOptions = (navData) => {
    const { navigation } = navData;
    const save = navigation.getParam('save');
    return ({
        headerTitle: 'Map',
        headerRight: <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                        <Item
                        iconName="save"
                        title="Save Marker"
                        onPress={save}
                        />
                     </HeaderButtons>
    });
};

const styles = StyleSheet.create({
    map: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default MapScreen;
