import React from 'react';
import {
    View, StyleSheet, Image, ImageBackground, TouchableNativeFeedback, Dimensions
} from 'react-native';

import { convertDMS } from './LatLongToDMS';
import TitleText from './TitleText';
import BodyText from './BodyText';

const PlaceItem = (props) => {
    const {
    name, image, location, onSelect
    } = props;
    let formattedCoord;
    if (location.latitude && location.longitude) {
        formattedCoord = convertDMS(location.latitude, location.longitude);
    }
    return (
        <TouchableNativeFeedback
        onPress={onSelect}
        >
            <View style={styles.card}>
                <ImageBackground
                source={{ uri: image }}
                blurRadius={4}
                style={styles.imageBackground}
                >
                    <View style={styles.content}>
                        <View style={styles.imageContainer}>
                            <Image
                            source={{ uri: image }}
                            style={styles.image}
                            borderRadius={100}
                            />
                        </View>
                        <View style={styles.captionContainer}>
                            <TitleText style={styles.title}>{name}</TitleText>
                            <BodyText style={styles.address}>{formattedCoord || ''}</BodyText>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        </TouchableNativeFeedback>
    );
};

const styles = StyleSheet.create({
    card: {
        width: Dimensions.get('window').width > 300 ? Dimensions.get('window').width : 300,
        height: 200,
        padding: 10,
        overflow: 'hidden',
        backgroundColor: '#f7f7f7',
        marginBottom: 1
    },
    imageBackground: {
        width: '100%',
        height: '100%'
    },
    content: {
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    },
    imageContainer: {
        marginLeft: 20
    },
    image: {
        width: 110,
        height: 110,
        borderColor: '#777',
        borderWidth: 2
    },
    captionContainer: {
        marginHorizontal: 10,
        justifyContent: 'center'
    },
    title: {
        fontSize: 22,
        marginVertical: 2,
        marginHorizontal: 5,
        color: 'white'
    },
    address: {
        fontSize: 16,
        marginHorizontal: 5,
        color: '#e5e5e5'
    }
});

export default PlaceItem;
