import React from 'react';
import {
    View, StyleSheet, ImageBackground, TouchableNativeFeedback, Dimensions
} from 'react-native';
import TitleText from './TitleText';

const PlaceItem = (props) => {
    const { name, onSelect } = props;
    return (
        <TouchableNativeFeedback
        onPress={onSelect}
        >
            <View style={styles.card}>
                <ImageBackground
                source={{ uri: 'https://cdn.pixabay.com/photo/2015/05/23/16/59/homestead-780767_960_720.jpg' }}
                style={styles.image}
                // ImageBackground style prop is used by view that wraps the image
                // so it accepts only height and width, no border radius.
                // To give the boder radius to image inside ImageBackground, pass this in imageStyle
                imageStyle={{ borderRadius: 10 }}
                blurRadius={4}
                >
                    <View style={styles.titleContainer}>
                        <TitleText style={styles.title}>{name}</TitleText>
                    </View>
                </ImageBackground>
            </View>
        </TouchableNativeFeedback>
    );
};

const styles = StyleSheet.create({
    card: {
        width: Dimensions.get('window').width > 300 ? Dimensions.get('window').width : 300,
        height: 300,
        paddingHorizontal: 10,
        paddingTop: 10,
        paddingBottom: 5,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    titleContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 40,
        color: 'white'
    }
});

export default PlaceItem;
