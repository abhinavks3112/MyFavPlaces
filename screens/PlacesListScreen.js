import React from 'react';
import {
 View, Text, StyleSheet, Button
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import Colors from '../constants/Colors';
import CustomHeaderButton from '../components/CustomHeaderButton';

const PlacesListScreen = (props) => {
    const { navigation } = props;
    return (
    <View style={styles.screen}>
        <Text>Places List Screen</Text>
        <Button
        title="Place Details"
        color={Colors.Primary}
        onPress={() => navigation.navigate('PlaceDetails')}
        />
    </View>
    );
};

PlacesListScreen.navigationOptions = (navData) => {
    const { navigation } = navData;
    return {
        headerTitle: 'Your Fav Places',
        headerRight: (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                iconName="add"
                title="Add Place"
                onPress={() => navigation.navigate('NewPlace')}
                />
            </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default PlacesListScreen;
