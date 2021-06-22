import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';

export default function SplashScreen({navigation}) {
  const getUserToken = async () => {
    const res = await AsyncStorage.getItem('token');
    if (res) {
      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{name: 'HomeNavigatorScreen'}],
        });
      }, 1000);
    } else {
      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{name: 'LoginScreen'}],
        });
      }, 1000);
    }
  };

  useEffect(() => {
    const navigateTo = getUserToken();
  }, []);
  return (
    <View style={styles.splashContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#2D2C3C" hidden />
      <Image source={require('../assets/images/log-removebg-preview.png')} />
    </View>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2D2C3C',
  },
});
