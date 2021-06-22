import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomText from '../custom/CustomText';
import Icon from 'react-native-vector-icons/Fontisto';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {CheckBox} from 'react-native-elements';
import {useForm, Controller} from 'react-hook-form';
import {ApiPost} from '../utils/APIS';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({navigation}) {
  const [checked, setChecked] = useState();
  const [loginLoading, setLoginLoading] = useState(false);
  const {control, handleSubmit, errors, setValue} = useForm();

  const onSubmit = async (data) => {
    let postData = {...data, device_id: '12344535656768798'};
    setLoginLoading(true);
    try {
      const res = await ApiPost('customer/login', postData);
      if (!res.data.error_status) {
        if (res.data.status_code === "LOGIN_SUCCESS_200") {
          await AsyncStorage.setItem('token', res.data.data.token);
          navigation.navigate('SplashScreen');
          ToastAndroid.show('Successful Login', ToastAndroid.SHORT);
        } else {
          setLoginLoading(false);
          ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
        }
      } else {
        setLoginLoading(false);
        ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
      }
    } catch (err) {
      setLoginLoading(false);

      console.log('Error Logging In...', err);
    }
  };

  useEffect(() => {
    setValue('email_id', 'sandip.dankhara@scrumstart.net');
  }, []);

  return (
    <View style={styles.loginContainer}>
      <ScrollView style={{flex: 1}}>
        <StatusBar barStyle="light-content" backgroundColor="#2D2C3C" />
        <View style={styles.imageContainer}>
          <Image
            style={styles.logoImage}
            source={require('../assets/images/log-removebg-preview.png')}
          />
        </View>
        <View style={styles.welcomeContainer}>
          <View>
            <CustomText style={styles.welcome}>Welcome Back!</CustomText>
          </View>
          <View>
            <CustomText style={styles.loginText}>
              Login to continue Podcast App
            </CustomText>
          </View>
        </View>
        <View style={styles.loginInputContainer}>
          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <View style={styles.inputContainer}>
                <Icon
                  style={styles.icon}
                  name="email"
                  size={26}
                  color="#7B7B8B"
                />
                <TextInput
                  placeholder="Email Address"
                  style={styles.textInput}
                  placeholderTextColor="#7B7B8B"
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              </View>
            )}
            name="email_id"
            rules={{
              required: {
                value: true,
                message: 'Email is required.',
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid Email Address',
              },
            }}
            defaultValue=""
          />
          {errors.email_id && (
            <View style={styles.errorView}>
              <Text style={styles.errorText}>{errors.email_id.message}</Text>
            </View>
          )}

          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <View style={styles.passwordContainer}>
                <IonIcon
                  style={styles.icon}
                  name="lock-outline"
                  size={26}
                  color="#7B7B8B"
                />
                <TextInput
                  secureTextEntry={true}
                  placeholder="Password"
                  style={styles.textInput}
                  placeholderTextColor="#7B7B8B"
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              </View>
            )}
            name="password"
            rules={{
              required: {
                value: true,
                message: 'Password is required.',
              },
              minLength: {
                value: 6,
                message: 'Password must have at least 6 characters',
              },
            }}
            defaultValue=""
          />
          {errors.password && (
            <View style={styles.errorView}>
              <Text style={styles.errorText}>{errors.password.message}</Text>
            </View>
          )}

          <View style={styles.rememberView}>
            <TouchableOpacity
              style={styles.rememberContainer}
              onPress={() => setChecked(!checked)}>
              <CheckBox
                // title="Remember me"
                checked={checked}
                uncheckedIcon="circle"
                uncheckedColor="#1D192C"
                checkedIcon="check-circle"
                checkedColor="#F11775"
                onPress={() => setChecked(!checked)}
                textStyle={styles.rememberText}
                fontFamily="Poppins-Light"
                containerStyle={{margin: 0, padding: 0}}
              />

              <CustomText style={styles.rememberText}>Remember me</CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.forgotText}
              onPress={() => navigation.navigate('ForgotPasswordScreen')}>
              <CustomText style={styles.forgotText}>
                Forgot password?
              </CustomText>
            </TouchableOpacity>
          </View>
          {loginLoading ? (
            <TouchableOpacity activeOpacity={1} style={styles.loginButton}>
              <View style={[styles.loginButtonView, {opacity: 0.7}]}>
                <ActivityIndicator size="large" color="#fff" />
                {/* <Text style={styles.loginButtonText}>Loading...</Text> */}
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              style={styles.loginButton}>
              <View style={styles.loginButtonView}>
                <Text style={styles.loginButtonText}>Log In</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.socialContainer}>
          <View style={styles.orView}>
            <CustomText style={styles.orText}>OR</CustomText>
          </View>

          <TouchableOpacity style={styles.googleButton}>
            <View style={styles.googleButtonView}>
              <Image
                source={require('../assets/images/google_logo1.png')}
                style={styles.googleButtonIcon}
              />
              <Text style={styles.googleButtonText}>Continue with Google</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.facebookButton}>
            <View style={styles.facebookButtonView}>
              <FontIcon
                name="facebook"
                size={20}
                color="#fff"
                style={styles.facebookButtonIcon}
              />
              <Text style={styles.facebookButtonText}>
                Continue with Facebook
              </Text>
            </View>
          </TouchableOpacity>
          <View style={styles.orView}>
            <CustomText style={styles.orText}>
              Don't have an account?{' '}
            </CustomText>
            <TouchableOpacity
              style={styles.orText}
              onPress={() => navigation.navigate('SignUpScreen')}>
              <CustomText style={styles.clickText}>Sign Up</CustomText>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.termsContainer}>
          <View style={styles.orView}>
            <CustomText style={styles.orText}>
              By signing up you indicate that you have read and agreed to the
              Patch{' '}
              <CustomText style={styles.clickText}>
                {' '}
                Terms of Service
              </CustomText>
            </CustomText>
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
    backgroundColor: '#2D2C3C',
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
    height: 100,
    // flex:1,
    resizeMode: 'contain',
  },
  welcome: {
    // fontWeight: 'bold',
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
  },
  loginText: {
    fontSize: 14,
    color: '#7477A0',
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
  errorView: {
    flexDirection: 'row',
    marginTop: -5,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  errorText: {
    flex: 1,
    paddingRight: 10,
    paddingLeft: 10,
    fontSize: 14,
    color: '#fc441d',
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
