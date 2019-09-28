import React from 'react';
import {
 ScrollView, View, StyleSheet, Image, TouchableNativeFeedback
} from 'react-native';
import { useSelector } from 'react-redux';

import MapPreview from '../components/MapPreview';
import BodyText from '../components/BodyText';
import { convertDMS } from '../components/LatLongToDMS';

const PlaceDetailsScreen = (props) => {
    const { navigation } = props;
    const placeId = navigation.getParam('placeId');
    const selectedPlace = useSelector(
        (state) => state.places.places.find((place) => place.id === placeId)
    );

    const formattedCoords = convertDMS(
        selectedPlace.location.latitude, selectedPlace.location.longitude
    );

    const onMapPreviewTouchHandler = () => {
        navigation.navigate('Map', { location: selectedPlace.location });
    };

    return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.screen}>
        <View style={styles.imageContainer}>
            <Image source={{ uri: selectedPlace.image }} style={styles.image} />
        </View>
        <View style={styles.contentContainer}>
            <View style={styles.locationContainer}>
                <BodyText style={styles.location}>{formattedCoords}</BodyText>
            </View>
            <TouchableNativeFeedback onPress={onMapPreviewTouchHandler}>
                <View style={styles.mapPreview}>
                    <MapPreview location={selectedPlace.location} scrollEnabled={false} />
                </View>
            </TouchableNativeFeedback>
        </View>
    </ScrollView>
    );
};

PlaceDetailsScreen.navigationOptions = (navData) => {
    const { navigation } = navData;
    const title = navigation.getParam('placeName');
    return {
        headerTitle: title
    };
};

const styles = StyleSheet.create({
    screen: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        height: 300,
        width: '100%',
        marginBottom: 10
    },
    image: {
        width: '100%',
        height: '100%'
    },
    contentContainer: {
        width: '90%',

        shadowColor: '#ccc',
        shadowOffset: {
            height: 1,
            width: 0
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 1,

        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
        margin: 10,
        overflow: 'hidden'
    },
    locationContainer: {
        alignItems: 'center'
    },
    location: {
        color: 'grey'
    },
    mapPreview: {
        height: 300,
        width: '100%',
        borderColor: '#ccc',
        borderWidth: 1
    }
});

export default PlaceDetailsScreen;
