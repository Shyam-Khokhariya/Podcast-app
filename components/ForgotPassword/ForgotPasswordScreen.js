import React, {useState} from 'react';
import {
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
import Icon from 'react-native-vector-icons/Fontisto';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {CheckBox} from 'react-native-elements';
export default function ForgotPasswordScreen({navigation}) {
  const [checked, setChecked] = useState();
  return (
    <View style={styles.signupContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#2D2C3C" />
      <View style={styles.welcomeContainer}>
        <View>
          <CustomText style={styles.welcome}>Forget Password</CustomText>
        </View>
        <View>
          <CustomText style={styles.signupText}>
            Enter your email address below. We'll look for your account and send
            you a password reset email.
          </CustomText>
        </View>
        <View style={styles.emailContainer}>
          <Icon style={styles.icon} name="email" size={26} color="#7B7B8B" />
          <TextInput
            placeholder="Email Address"
            style={styles.textInput}
            placeholderTextColor="#7B7B8B"
          />
        </View>
        <TouchableOpacity style={styles.signupButton}>
          <View style={styles.signupButtonView}>
            <Text style={styles.signupButtonText}>Send Password Reset</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.socialContainer}>
        <View style={styles.orView}>
          <CustomText style={styles.orText}>
            Already have an account?{' '}
          </CustomText>
          <TouchableOpacity
            style={styles.orText}
            onPress={() => navigation.navigate('LoginScreen')}>
            <CustomText style={styles.clickText}>Log In</CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  signupContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2D2C3C',
  },

  welcomeContainer: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },

  socialContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    // fontWeight: 'bold',
    fontFamily: 'Poppins-Medium',
    fontSize: 24,
  },
  signupText: {
    fontSize: 14,
    color: '#7477A0',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },

  emailContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1D192C',
    // margin: 10,
    marginHorizontal: 20,
    // marginTop: 0,
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

  signupButton: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupButtonView: {
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
  signupButtonText: {
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
});
