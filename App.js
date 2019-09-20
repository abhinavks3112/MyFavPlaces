import React, { useState } from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { useScreens } from 'react-native-screens';
import { Provider } from 'react-redux';

import PlacesNavigator from './navigation/MyFavPlacesNavigator';
import configureStore from './store/configureStore';

useScreens(true);

const fetchFonts = () => (Font.loadAsync({
    'amita-bold': require('./assets/fonts/amita-bold.ttf'),
    amita: require('./assets/fonts/amita-regular.ttf')
  }));

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
      startAsync={fetchFonts}
      onFinish={() => setFontLoaded(true)}
      />
    );
  }

  const store = configureStore();
  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  );
}
