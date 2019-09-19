import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MapScreen = () => {
    return (
    <View style={styles.screen}>
        <Text>Map Screen</Text>
    </View>
    );
};

MapScreen.navigationOptions = () => {
    return {
        headerTitle: 'Map'
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default MapScreen;
