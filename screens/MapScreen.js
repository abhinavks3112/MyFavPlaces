import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = (props) => {
    const { navigation } = props;
    const [selectedLocation, setSelectedLocation] = useState();
    const location = navigation.getParam('location');
    let mapRegion = null;
    if (!location) {
    // default region
        mapRegion = {
        latitude: 37.5,
        longitude: -122.43,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    };
    } else {
        mapRegion = location;
    }

    const selectLocationHandler = (event) => {
        setSelectedLocation(event.nativeEvent.coordinate);
    };

    let markerCoordinate;

    if(selectedLocation) {
        markerCoordinate = selectedLocation
    }

    return (
    <MapView
    style={styles.map}
    region={mapRegion}
    onPress={selectLocationHandler}
    >
       {markerCoordinate && (
           <Marker
            title='Picked Location'
            coordinate={markerCoordinate}
            ></Marker>
        )}
    </MapView>
    );
};

MapScreen.navigationOptions = () => ({
        headerTitle: 'Map'
});

const styles = StyleSheet.create({
    map: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default MapScreen;
