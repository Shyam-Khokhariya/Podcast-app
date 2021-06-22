import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomText from '../custom/CustomText';
import {SliderBox} from 'react-native-image-slider-box';
import FastImage from 'react-native-fast-image';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DashboardScreen({navigation}) {
  

    return (
    <View style={styles.loginContainer}>
      <ScrollView style={{flex: 1}}>
        <StatusBar barStyle="light-content" backgroundColor="#2D2C3C" />
        <View style={styles.imageContainer}>
          <Image
            style={styles.logoImage}
            source={require('../assets/images/3d_Image_with_Elements.png')}
          />
        </View>
        <View style={styles.welcomeContainer}>
          <View>
            <CustomText style={styles.welcome}>Dashboard</CustomText>
          </View>

        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#13131A',
  },

  imageContainer: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginInputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  termsContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    height: 90,
    // marginBottom: 80,
  },

  logoImage: {
    height: 550,
    width: Dimensions.get('window').width,
    // flex:1,
    resizeMode: 'cover',
  },
  welcome: {
    // fontWeight: 'bold',
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
  },
  loginText: {
    fontSize: 14,
    color: '#7477A0',
    marginHorizontal: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1D192C',
    margin: 10,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1D192C',
    margin: 10,
    marginHorizontal: 20,
    marginTop: 0,
    borderRadius: 10,
  },
  textInput: {
    backgroundColor: '#1D192C',
    flex: 1,
    borderRadius: 10,
    paddingRight: 10,
    paddingLeft: 10,
    height: 50,
    fontSize: 16,
    color: '#fff',
  },
  icon: {
    padding: 15,
  },

  rememberView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    // paddingHorizontal: 20,
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberText: {
    marginTop: 4,
    fontSize: 14,
    color: '#7477A0',
  },
  forgotText: {
    flex: 1,
    marginTop: 4,
    textAlign: 'right',
    fontSize: 14,
    color: '#7477A0',
  },
  loginButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonView: {
    flex: 1,
    elevation: 10,
    marginTop: 10,
    marginBottom: 15,
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#F11775',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 22,
    textAlign: 'center',
  },
  orView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  orText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#7477A0',
  },
  clickText: {
    fontSize: 14,
    color: '#F11775',
  },
  googleButton: {
    flex: 1,
    flexDirection: 'row',
  },
  googleButtonView: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 15,
    padding: 10,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 10,
  },
  googleButtonIcon: {
    height: 30,
    width: 40,
    resizeMode: 'contain',
  },
  googleButtonText: {
    color: '#000',
    fontSize: 18,
    textAlign: 'center',
  },
  facebookButton: {
    flex: 1,
    flexDirection: 'row',
  },
  facebookButtonView: {
    flex: 1,
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 10,
    backgroundColor: '#3b5998',
  },
  facebookButtonIcon: {
    paddingRight: 10,
    paddingVertical: 5,
  },
  facebookButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});
