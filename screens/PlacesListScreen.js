import React, { useEffect } from 'react';
import {
 FlatList
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import CustomHeaderButton from '../components/CustomHeaderButton';
import PlaceItem from '../components/PlaceItem';

import { loadPlaces } from '../store/actions/placesAction';


const PlacesListScreen = (props) => {
    const { navigation } = props;
    const places = useSelector((state) => state.places.places);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadPlaces());
    }, [dispatch]);

    const onPlaceSelectHandler = (itemData) => (
            <PlaceItem
             id={itemData.item.id}
             name={itemData.item.name}
             image={itemData.item.image}
             location={itemData.item.location}
             onSelect={() => navigation.navigate('PlaceDetails', {
                 placeId: itemData.item.id,
                 placeName: itemData.item.name
             })}
            />
    );

    return (
    <FlatList
    data={places}
    keyExtractor={(item) => item.id}
    renderItem={onPlaceSelectHandler}
    />
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

export default PlacesListScreen;
