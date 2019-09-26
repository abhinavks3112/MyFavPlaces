import React, { useState, useEffect, useCallback } from 'react';
import {
 ScrollView, View, TextInput, StyleSheet
} from 'react-native';
import { useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import TitleText from '../components/TitleText';
import CustomHeaderButton from '../components/CustomHeaderButton';
import ImagePicker from '../components/ImageSelector';
import LocationPicker from '../components/LocationPicker';

import { addPlace } from '../store/actions/placesAction';

const NewPlaceScreen = (props) => {
    const { navigation } = props;
    const [titleValue, setTitleValue] = useState('');
    const [imageValue, setImageValue] = useState('');
    const dispatch = useDispatch();

    const saveButtonHandler = useCallback(() => {
        dispatch(addPlace(titleValue, '', imageValue, ''));
        navigation.navigate('Places');
    }, [dispatch, titleValue, imageValue]);

    useEffect(() => {
        navigation.setParams({ save: saveButtonHandler });
    }, [saveButtonHandler]);

    const takenImageHandler = (image) => {
        setImageValue(image);
    };

    return (
        <ScrollView style={styles.screen}>
            <View style={styles.form}>
                <TitleText style={styles.label}>Title</TitleText>
                <TextInput
                    style={styles.input}
                    value={titleValue}
                    onChangeText={(text) => setTitleValue(text)}
                />
                <ImagePicker onImageTaken={takenImageHandler} />
                <LocationPicker navigation={navigation} />
            </View>
        </ScrollView>
    );
};

NewPlaceScreen.navigationOptions = (navData) => {
    const { navigation } = navData;
    const save = navigation.getParam('save');

    return {
        headerTitle: 'New Place',
        headerRight: (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
            iconName="save"
            title="Save Place"
            onPress={() => save()}
            />
        </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    form: {
        margin: 30
    },
    label: {
        marginBottom: 10
    },
    input: {
        borderBottomColor: '#777',
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingVertical: 4,
        paddingHorizontal: 2
    }
});

export default NewPlaceScreen;
