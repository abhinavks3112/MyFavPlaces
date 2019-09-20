import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PlaceDetailsScreen = () => {
    return (
    <View style={styles.screen}>
        <Text>Places Details Screen</Text>
    </View>
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default PlaceDetailsScreen;
