import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from './components/Splash/SplashScreen';
import {StyleSheet, View} from 'react-native';
import LoginScreen from './components/Login/LoginScreen';
import SignUpScreen from './components/SignUp/SignUpScreen';
import ForgotPasswordScreen from './components/ForgotPassword/ForgotPasswordScreen';
import TutorialScreen from './components/Tutorial/TutorialScreen';
import DashboardScreen from './components/Dashboard/DashboardScreen';
import HomeNavigatorScreen from './components/HomeNavigator/HomeNavigatorScreen';
import PlayerScreen from './components/Player/PlayerScreen';
import SearchScreen from './components/Search/SearchScreen';

const RootStack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* <View style={styles.mainComponent}> */}
        <RootStack.Navigator initialRouteName="SplashScreen">
          <RootStack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{headerShown: false}}
          />
          {/* <LoginStack.Navigator initialRouteName="LoginScreen"> */}
          <RootStack.Screen  
            name="LoginScreen"
            component={LoginScreen}
            options={{headerShown: false}}
          />
          <RootStack.Screen
            name="SignUpScreen"
            component={SignUpScreen}
            options={{headerShown: false}}
          />
          <RootStack.Screen
            name="ForgotPasswordScreen"
            component={ForgotPasswordScreen}
            options={{headerShown: false}}
          />
          {/* </LoginStack.Navigator> */}

          {/* <HomeStack.Navigator initialRouteName="DashboardScreen"> */}
          <RootStack.Screen
            name="TutorialScreen"
            component={TutorialScreen}
            options={{headerShown: false}}
          />

          <RootStack.Screen
            name="DashboardScreen"
            component={DashboardScreen}
            options={{headerShown: false}}
          />
          <RootStack.Screen
            name="HomeNavigatorScreen"
            component={HomeNavigatorScreen}
            options={{headerShown: false}}
          />
          
          <RootStack.Screen
            name="PlayerScreen"
            component={PlayerScreen}
            options={{headerShown: false}}
          />
          
          <RootStack.Screen
            name="SearchScreen"
            component={SearchScreen}
            options={{headerShown: false}}
          />
          {/* </HomeStack.Navigator> */}
        </RootStack.Navigator>
      {/* </View> */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  mainComponent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2D2C3C',
  },
});
