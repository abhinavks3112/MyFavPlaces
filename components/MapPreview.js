import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapPreview = (props) => {
    const {
        location, children, style, scrollEnabled
    } = props;
    const latitudeDelta = 0.0922;
    const longitudeDelta = 0.0421;

    return (
        location
        ? (
            <MapView
            scrollEnabled={scrollEnabled}
            style={styles.map}
            region={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta,
                longitudeDelta
                }}
            >
                {location.latitude && location.longitude && (
                    <Marker
                        title="Picked Location"
                        coordinate={{
                                    latitude: location.latitude,
                                    longitude: location.longitude
                                    }}
                    />
                )}
            </MapView>
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
