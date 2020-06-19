import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import io from 'socket.io-client';
import HomeScreen from './src/screens/HomeScreen';

const App = () => {
  return (
    <>
      <HomeScreen />
    </>
  );
};

export default App;
