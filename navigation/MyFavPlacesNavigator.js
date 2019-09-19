import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import PlacesListScreen from '../screens/PlacesListScreen';
import PlaceDetailsScreen from '../screens/PlaceDetailsScreen';
import NewPlaceScreen from '../screens/NewPlaceScreen';
import MapScreen from '../screens/MapScreen';

import Colors from '../constants/Colors';

const defaultHeaderStyles = () => ({
    headerStyle: {
        backgroundColor: Colors.Primary
    },
    headerTintColor: 'white',
    headerTitleStyle: {
       fontFamily: 'amita-bold',
       // Without fontWeight, custom font doesn't appear on anroid
       fontWeight: '400'
    }
});

const PlacesNavigator = createStackNavigator({
    Places: PlacesListScreen,
    PlaceDetails: PlaceDetailsScreen,
    NewPlace: NewPlaceScreen,
    Map: MapScreen
}, {
    defaultNavigationOptions: defaultHeaderStyles
});

const rootNavigator = createAppContainer(PlacesNavigator);

export default rootNavigator;
