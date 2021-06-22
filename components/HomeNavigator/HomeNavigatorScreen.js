import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DashboardScreen from '../Dashboard/DashboardScreen';
import TutorialScreen from '../Tutorial/TutorialScreen';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from '../Home/HomeScreen';
import PlayerScreen from '../Player/PlayerScreen';

const Tab = createBottomTabNavigator();

export default function HomeNavigatorScreen() {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      tabBarOptions={{
        activeTintColor: '#F11775',
        tabStyle: {
          backgroundColor: '#181A26',
          elevation: 15,
          paddingBottom: 7,
        },
        labelStyle: {
          fontSize: 18,
        },
        style: {
          elevation: 20,
          height: 75,
          borderTopWidth: 0,
          //   paddingBottom:10,
        },
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size, focused}) => (
            <MaterialCommunityIcons
              name="home-outline"
              color={color}
              size={size + 10}
              style={{
                paddingTop: 5,
                borderTopWidth: focused ? 2 : 0,
                borderTopColor: focused ? '#F11775' : '#181A26',
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="DashboardScreen"
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({color, size, focused}) => (
            <MaterialCommunityIcons
              name="view-dashboard-outline"
              color={color}
              size={size + 10}
              style={{
                paddingTop: 5,
                borderTopWidth: focused ? 2 : 0,
                borderTopColor: focused ? '#F11775' : '#181A26',
              }}
            />
          ),
        }}
      />
      
      <Tab.Screen
        name="PlayerScreen"
        component={PlayerScreen}
        options={{
          tabBarLabel: 'Player',
          tabBarIcon: ({color, size, focused}) => (
            <MaterialCommunityIcons
              name="play-circle-outline"
              color={color}
              size={size + 10}
              style={{
                paddingTop: 5,
                borderTopWidth: focused ? 2 : 0,
                borderTopColor: focused ? '#F11775' : '#181A26',
              }}
            />
          ),
        }}
      />
      
      <Tab.Screen
        name="TutorialScreen"
        component={TutorialScreen}
        options={{
          tabBarLabel: 'Tutorial',
          tabBarIcon: ({color, size, focused}) => (
            <MaterialCommunityIcons
              name="bell-outline"
              color={color}
              size={size + 10}
              style={{
                paddingTop: 5,
                borderTopWidth: focused ? 2 : 0,
                borderTopColor: focused ? '#F11775' : '#181A26',
              }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="HomeNavigatorScreen"
        component={HomeNavigatorScreen}
        nav
        options={{
          tabBarLabel: 'Logout',

          tabBarIcon: ({color, size, focused}) => (
            <MaterialCommunityIcons
              name="power"
              color={color}
              size={size + 10}
              style={{
                paddingTop: 5,
                borderTopWidth: focused ? 2 : 0,
                borderTopColor: focused ? '#F11775' : '#181A26',
              }}
            />
          ),
        }}
        listeners={({navigation, route}) => ({
          tabPress: (e) => {
            e.preventDefault();

            return Alert.alert(
              // Shows up the alert without redirecting anywhere
              'Confirm Logout',
              'Do you really want to logout?',
              [
                {
                  text: 'Accept',
                  onPress: async () => {
                    await AsyncStorage.removeItem('token');
                    navigation.reset({
                      index: 0,
                      routes: [{name: 'SplashScreen'}],
                    });
                  },
                },
                {
                  text: 'Cancel',
                },
              ],
            );
          },
        })}
      />
    </Tab.Navigator>
  );
}
