import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

const MapPreview = (props) => {
    const { location, children, style } = props;
    // Default area
    const mapRegion = {
        latitude: 37.5,
        longitude: -122.43,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    };
    return (
        location
        ? (
            <MapView
            style={styles.map}
            initialRegion={mapRegion}
            region={location}
            />
        )
        : (
        <View style={{ ...styles.mapPreview, style }}>
            {children}
        </View>
)
    );
};

/* When displaying the map in a small view, position of map needs
to be absolute with top,.., left 0 otherwise it would show white screen
*/
const styles = StyleSheet.create({
    mapPreview: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    map: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }
});

export default MapPreview;
