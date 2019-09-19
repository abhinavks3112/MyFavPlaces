import React, { useState } from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { useScreens } from 'react-native-screens';
import PlacesNavigator from './navigation/MyFavPlacesNavigator';

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

  return (
      <PlacesNavigator />
  );
}
