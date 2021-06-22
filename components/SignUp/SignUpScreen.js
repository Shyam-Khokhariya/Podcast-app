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
import Font5Icon from 'react-native-vector-icons/FontAwesome5';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Picker} from '@react-native-picker/picker';
import {ApiGet, ApiPost} from '../utils/APIS';
import {useForm, Controller} from 'react-hook-form';

export default function SignUpScreen({navigation}) {
  const [personalInfo, setPersonalInfo] = useState(true);
  const [companyType, setCompanyType] = useState('');
  const [countryList, setCountryList] = useState([]);
  const [showState, setShowState] = useState(false);
  const [stateList, setStateList] = useState([]);
  const [showCity, setShowCity] = useState(false);
  const [cityList, setCityList] = useState([]);
  const [personalData, setPersonalData] = useState();
  const [signUpLoading, setSignUpLoading] = useState(false);
  const {control, handleSubmit, errors} = useForm();
  const {
    control: control2,
    handleSubmit: handleSubmit2,
    errors: errors2,
    setValue: setValue2,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    setPersonalData(data);
    setPersonalInfo(false);
  };
  const onSubmit2 = async (data) => {
    let allData = {
      city: '',
      state: '',
      country: '',
      other_company_type: '',
      ...personalData,
      ...data,
      mobile_no: personalData.phone,
    };
    setPersonalData(allData);
    console.log('All Data:', allData);

    setSignUpLoading(true);
    try {
      const res = await ApiPost('customer/signup', allData);
      console.log('response', res.data);
      if (!res.data.error_status) {
        if (res.data.status_code === 'REGISTRATION_SUCCESS_200') {
          navigation.navigate('SplashScreen');
          ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
        } else {
          setSignUpLoading(false);
          ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
        }
      } else {
        setSignUpLoading(false);
        ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
      }
    } catch (err) {
      setSignUpLoading(false);

      console.log('Error Logging In...', err);
    }
  };

  const getCountries = async () => {
    try {
      const res = await ApiGet('customer/countryList');
      if (!res.data.error_status) {
        setCountryList(res.data.data);
      } else {
        ToastAndroid.show('Error fetching Countries', ToastAndroid.SHORT);
      }
    } catch (err) {
      console.log('Error Fetching country...', err);
    }
  };

  useEffect(() => {
    getCountries();
  }, []);

  const getStates = async (country_id) => {
    try {
      console.log('countryId', country_id);
      const res = await ApiGet(`customer/stateList/${country_id}`);
      if (!res.data.error_status) {
        setStateList(res.data.data);
      } else {
        ToastAndroid.show('Error fetching States', ToastAndroid.SHORT);
      }
    } catch (err) {
      console.log('Error Fetching state...', err);
    }
  };

  const CountryChange = (itemValue, itemIndex) => {
    setStateList([]);
    setCityList([]);
    setShowCity(false);
    // setSelectedState('');
    setValue2('state', '');
    setValue2('city', '');
    // setSelectedCity('');
    if (itemValue !== '') {
      setShowState(true);
      getStates(itemValue);
    } else {
      setShowState(false);
    }
    // setSelectedCountry(itemValue);
  };

  const getCities = async (city_id) => {
    try {
      console.log('cityID', city_id);
      const res = await ApiGet(`customer/cityList/${city_id}`);
      if (!res.data.error_status) {
        // if (typeof res.data.data === Array) {
        setCityList(res.data.data);
        // }
        // setCityList([]);
      } else {
        ToastAndroid.show('Error fetching States', ToastAndroid.SHORT);
      }
    } catch (err) {
      console.log('Error Fetching state...', err);
    }
  };

  const StateChange = (itemValue, itemIndex) => {
    setCityList([]);
    setValue2('city', '');

    // setSelectedCity('');
    if (itemValue !== '') {
      setShowCity(true);
      getCities(itemValue);
    } else {
      setShowCity(false);
    }
    // setSelectedState(itemValue);
  };

  return (
    <View style={styles.signupContainer}>
      <ScrollView style={{flex: 1}}>
        <StatusBar barStyle="light-content" backgroundColor="#2D2C3C" />
        <View style={styles.imageContainer}></View>
        <View style={styles.welcomeContainer}>
          <View>
            <CustomText style={styles.welcome}>Sign Up</CustomText>
          </View>
          <View>
            <CustomText style={styles.signupText}>
              Sign Up and Start Learning
            </CustomText>
          </View>
        </View>
        {personalInfo ? (
          <View style={styles.signupInputContainer}>
            <View style={styles.titleContainer}>
              <CustomText style={styles.titleText}>Personal Info</CustomText>
            </View>

            <Controller
              control={control}
              render={({onChange, onBlur, value}) => (
                <View style={styles.userContainer}>
                  <FontIcon
                    style={styles.icon}
                    name="user-o"
                    size={26}
                    color="#7B7B8B"
                  />
                  <TextInput
                    placeholder="First Name"
                    style={styles.textInput}
                    placeholderTextColor="#7B7B8B"
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                  />
                </View>
              )}
              name="fname"
              rules={{
                required: {
                  value: true,
                  message: 'First Name is required.',
                },
              }}
              defaultValue=""
            />
            {errors.fname && (
              <View style={styles.errorView}>
                <Text style={styles.errorText}>{errors.fname.message}</Text>
              </View>
            )}

            <Controller
              control={control}
              render={({onChange, onBlur, value}) => (
                <View style={styles.userContainer}>
                  <FontIcon
                    style={styles.icon}
                    name="user-o"
                    size={26}
                    color="#7B7B8B"
                  />
                  <TextInput
                    placeholder="Last Name"
                    style={styles.textInput}
                    placeholderTextColor="#7B7B8B"
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                  />
                </View>
              )}
              name="lname"
              rules={{
                required: {
                  value: true,
                  message: 'Last Name is required.',
                },
              }}
              defaultValue=""
            />
            {errors.lname && (
              <View style={styles.errorView}>
                <Text style={styles.errorText}>{errors.lname.message}</Text>
              </View>
            )}

            <Controller
              control={control}
              render={({onChange, onBlur, value}) => (
                <View style={styles.userContainer}>
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
              name="email"
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
            {errors.email && (
              <View style={styles.errorView}>
                <Text style={styles.errorText}>{errors.email.message}</Text>
              </View>
            )}

            <Controller
              control={control}
              render={({onChange, onBlur, value}) => (
                <View style={styles.userContainer}>
                  <MatIcon
                    style={styles.icon}
                    name="phone"
                    size={26}
                    color="#7B7B8B"
                  />
                  <TextInput
                    keyboardType="numeric"
                    placeholder="Phone No."
                    style={styles.textInput}
                    placeholderTextColor="#7B7B8B"
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                  />
                </View>
              )}
              name="phone"
              rules={{
                required: {
                  value: true,
                  message: 'Phone No. is required.',
                },
                pattern: {
                  value: /^[0-9]*$/i,
                  message: 'Enter Valid Number.',
                },
                minLength: {
                  value: 10,
                  message: 'Invalid Phone No. ',
                },
                maxLength: {
                  value: 10,
                  message: 'Invalid Phone No. ',
                },
              }}
              defaultValue=""
            />
            {errors.phone && (
              <View style={styles.errorView}>
                <Text style={styles.errorText}>{errors.phone.message}</Text>
              </View>
            )}

            <Controller
              control={control}
              render={({onChange, onBlur, value}) => (
                <View style={styles.userContainer}>
                  <MatIcon
                    style={styles.icon}
                    name="office-building"
                    size={26}
                    color="#7B7B8B"
                  />
                  <TextInput
                    placeholder="Company Name"
                    style={styles.textInput}
                    placeholderTextColor="#7B7B8B"
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                  />
                </View>
              )}
              name="company_name"
              rules={{
                required: {
                  value: true,
                  message: 'Company Name is required.',
                },
              }}
              defaultValue=""
            />
            {errors.company_name && (
              <View style={styles.errorView}>
                <Text style={styles.errorText}>
                  {errors.company_name.message}
                </Text>
              </View>
            )}

            <Controller
              control={control}
              render={({onChange, onBlur, value}) => (
                <View style={styles.userContainer}>
                  <MatIcon
                    style={styles.icon}
                    name="office-building"
                    size={26}
                    color="#7B7B8B"
                  />
                  <Picker
                    selectedValue={value}
                    style={[
                      styles.textInput,
                      {color: value === '' ? '#7B7B8B' : '#fff'},
                    ]}
                    onBlur={onBlur}
                    onValueChange={(itemValue, itemIndex) => {
                      onChange(itemValue);
                      setCompanyType(itemValue);
                    }}>
                    <Picker.Item
                      style={styles.textInput}
                      label="Select Company Type"
                      value=""
                    />
                    <Picker.Item label="Retailer" value={1} />
                    <Picker.Item label="Manufacturer" value={2} />
                    <Picker.Item label="Wholeseller" value={3} />
                    <Picker.Item label="Other" value={4} />
                  </Picker>
                </View>
              )}
              name="company_type"
              rules={{
                required: {
                  value: true,
                  message: 'Select Company Type',
                },
              }}
              defaultValue=""
            />
            {errors.company_type && (
              <View style={styles.errorView}>
                <Text style={styles.errorText}>
                  {errors.company_type.message}
                </Text>
              </View>
            )}

            {companyType === 4 && (
              <Controller
                control={control}
                render={({onChange, onBlur, value}) => (
                  <View style={styles.userContainer}>
                    <MatIcon
                      style={styles.icon}
                      name="office-building"
                      size={26}
                      color="#7B7B8B"
                    />
                    <TextInput
                      placeholder="Other Company Type"
                      style={styles.textInput}
                      placeholderTextColor="#7B7B8B"
                      onBlur={onBlur}
                      onChangeText={(value) => onChange(value)}
                      value={value}
                    />
                  </View>
                )}
                name="other_company_type"
                rules={{
                  required: {
                    value: true,
                    message: 'Other Company Tyre required.',
                  },
                }}
                defaultValue=""
              />
            )}
            {errors.other_company_type && (
              <View style={styles.errorView}>
                <Text style={styles.errorText}>
                  {errors.other_company_type.message}
                </Text>
              </View>
            )}

            <View style={styles.submitContainer}>
              <TouchableOpacity
                style={styles.signupButton}
                onPress={handleSubmit(onSubmit)}

                // onPress={() => setPersonalInfo(false)}
              >
                <View style={styles.signupButtonView}>
                  <Text style={styles.signupButtonText}>Next</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.signupInputContainer}>
            <View style={styles.titleContainer}>
              <CustomText style={styles.titleText}>Contact Info</CustomText>
            </View>

            <View style={{flexDirection: 'row'}}>
              <Controller
                control={control2}
                render={({onChange, onBlur, value}) => (
                  <View style={[styles.userContainer, {width: '25%'}]}>
                    <TextInput
                      placeholder="Plot No"
                      style={[styles.textInput, {marginLeft: 10}]}
                      placeholderTextColor="#7B7B8B"
                      onBlur={onBlur}
                      onChangeText={(value) => onChange(value)}
                      value={value}
                    />
                  </View>
                )}
                name="plot_no"
                rules={{
                  required: {
                    value: true,
                    message: 'Plot No is required.',
                  },
                }}
                defaultValue=""
              />

              <Controller
                control={control2}
                render={({onChange, onBlur, value}) => (
                  <View
                    style={[
                      styles.userContainer,
                      {width: '60%', marginLeft: 0},
                    ]}>
                    <FontIcon
                      style={styles.icon}
                      name="building-o"
                      size={26}
                      color="#7B7B8B"
                    />
                    <TextInput
                      placeholder="Building Name"
                      style={styles.textInput}
                      placeholderTextColor="#7B7B8B"
                      onBlur={onBlur}
                      onChangeText={(value) => onChange(value)}
                      value={value}
                    />
                  </View>
                )}
                name="building"
                rules={{
                  required: {
                    value: true,
                    message: 'Building Name is required.',
                  },
                }}
                defaultValue=""
              />
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={[styles.errorView, {width: '25%'}]}>
                {errors2.plot_no && (
                  <Text style={styles.errorText}>
                    {errors2.plot_no.message}
                  </Text>
                )}
              </View>

              <View style={[styles.errorView, {width: '60%', marginLeft: 0}]}>
                {errors2.building && (
                  <Text style={styles.errorText}>
                    {errors2.building.message}
                  </Text>
                )}
              </View>
            </View>

            <Controller
              control={control2}
              render={({onChange, onBlur, value}) => (
                <View style={styles.userContainer}>
                  <FontIcon
                    style={styles.icon}
                    name="road"
                    size={26}
                    color="#7B7B8B"
                  />
                  <TextInput
                    placeholder="Street Name"
                    style={styles.textInput}
                    placeholderTextColor="#7B7B8B"
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                  />
                </View>
              )}
              name="street"
              rules={{
                required: {
                  value: true,
                  message: 'Street is required.',
                },
              }}
              defaultValue=""
            />
            {errors2.street && (
              <View style={styles.errorView}>
                <Text style={styles.errorText}>{errors2.street.message}</Text>
              </View>
            )}

            <Controller
              control={control2}
              render={({onChange, onBlur, value}) => (
                <View style={styles.userContainer}>
                  <Font5Icon
                    style={styles.icon}
                    name="landmark"
                    size={26}
                    color="#7B7B8B"
                  />
                  <TextInput
                    placeholder="Landmark"
                    style={styles.textInput}
                    placeholderTextColor="#7B7B8B"
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                  />
                </View>
              )}
              name="landmark"
              rules={{
                required: {
                  value: true,
                  message: 'Landmark is required.',
                },
              }}
              defaultValue=""
            />
            {errors2.landmark && (
              <View style={styles.errorView}>
                <Text style={styles.errorText}>{errors2.landmark.message}</Text>
              </View>
            )}

            <Controller
              control={control2}
              render={({onChange, onBlur, value}) => (
                <View style={styles.userContainer}>
                  <MatIcon
                    style={styles.icon}
                    name="city"
                    size={26}
                    color="#7B7B8B"
                  />
                  <Picker
                    // selectedValue={selectedCountry}
                    style={[
                      styles.textInput,
                      {color: value === '' ? '#7B7B8B' : '#fff'},
                    ]}
                    onBlur={onBlur}
                    // onChangeText={(value) => onChange(value)}
                    selectedValue={value}
                    onValueChange={(itemValue, itemIndex) => {
                      CountryChange(itemValue, itemIndex);
                      onChange(itemValue);
                    }}>
                    <Picker.Item
                      style={styles.textInput}
                      label="Country"
                      value=""
                    />
                    {countryList.map((obj, index) => (
                      <Picker.Item
                        key={index}
                        label={obj.name}
                        value={obj.id}
                      />
                    ))}
                  </Picker>
                </View>
              )}
              name="country"
              rules={{
                required: {
                  value: true,
                  message: 'Country is required.',
                },
              }}
              defaultValue=""
            />
            {errors2.country && (
              <View style={styles.errorView}>
                <Text style={styles.errorText}>{errors2.country.message}</Text>
              </View>
            )}

            {showState && stateList.length > 0 && (
              <Controller
                control={control2}
                render={({onChange, onBlur, value}) => (
                  <View style={styles.userContainer}>
                    <MatIcon
                      style={styles.icon}
                      name="city-variant-outline"
                      size={26}
                      color="#7B7B8B"
                    />
                    <Picker
                      style={[
                        styles.textInput,
                        {color: value === '' ? '#7B7B8B' : '#fff'},
                      ]}
                      onBlur={onBlur}
                      selectedValue={value}
                      onValueChange={(itemValue, itemIndex) => {
                        StateChange(itemValue, itemIndex);
                        onChange(itemValue);
                      }}>
                      <Picker.Item label="State" value="" />
                      {stateList.map((obj, index) => (
                        <Picker.Item
                          key={index}
                          label={obj.name}
                          value={obj.state_id}
                        />
                      ))}
                    </Picker>
                  </View>
                )}
                name="state"
                rules={{
                  required: {
                    value: true,
                    message: 'State is required.',
                  },
                }}
                defaultValue=""
              />
            )}
            {errors2.state && (
              <View style={styles.errorView}>
                <Text style={styles.errorText}>{errors2.state.message}</Text>
              </View>
            )}

            {showCity && cityList.length > 0 && (
              <Controller
                control={control2}
                render={({onChange, onBlur, value}) => (
                  <View style={styles.userContainer}>
                    <MatIcon
                      style={styles.icon}
                      name="home-city-outline"
                      size={26}
                      color="#7B7B8B"
                    />
                    <Picker
                      style={[
                        styles.textInput,
                        {color: value === '' ? '#7B7B8B' : '#fff'},
                      ]}
                      onBlur={onBlur}
                      selectedValue={value}
                      onValueChange={(itemValue, itemIndex) => {
                        // setSelectedCity(itemValue);
                        onChange(itemValue);
                      }}>
                      <Picker.Item
                        style={styles.textInput}
                        label="City"
                        value=""
                      />
                      {cityList.map((obj, index) => (
                        <Picker.Item
                          key={index}
                          label={obj.city_name}
                          value={obj.id}
                        />
                      ))}
                    </Picker>
                  </View>
                )}
                name="city"
                rules={{
                  required: {
                    value: true,
                    message: 'City is required.',
                  },
                }}
                defaultValue=""
              />
            )}
            {errors2.city && (
              <View style={styles.errorView}>
                <Text style={styles.errorText}>{errors2.city.message}</Text>
              </View>
            )}

            <Controller
              control={control2}
              render={({onChange, onBlur, value}) => (
                <View style={styles.userContainer}>
                  <MatIcon
                    style={styles.icon}
                    name="lock-outline"
                    size={26}
                    color="#7B7B8B"
                  />
                  <TextInput
                    // secureTextEntry={true}
                    keyboardType="numeric"
                    placeholder="Zip"
                    style={styles.textInput}
                    placeholderTextColor="#7B7B8B"
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                  />
                </View>
              )}
              name="zip"
              rules={{
                required: {
                  value: true,
                  message: 'Zip is required.',
                },
              }}
              defaultValue=""
            />
            {errors2.zip && (
              <View style={styles.errorView}>
                <Text style={styles.errorText}>{errors2.zip.message}</Text>
              </View>
            )}

            <Controller
              control={control2}
              render={({onChange, onBlur, value}) => (
                <View style={styles.userContainer}>
                  <MatIcon
                    style={styles.icon}
                    name="file-document-outline"
                    size={26}
                    color="#7B7B8B"
                  />
                  <TextInput
                    keyboardType="numeric"
                    placeholder="GST Number"
                    style={styles.textInput}
                    placeholderTextColor="#7B7B8B"
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                  />
                </View>
              )}
              name="gst_no"
              rules={{
                required: {
                  value: true,
                  message: 'GST Number is required.',
                },
              }}
              defaultValue=""
            />
            {errors2.gst_no && (
              <View style={styles.errorView}>
                <Text style={styles.errorText}>{errors2.gst_no.message}</Text>
              </View>
            )}

            <Controller
              control={control2}
              render={({onChange, onBlur, value}) => (
                <View style={styles.userContainer}>
                  <MatIcon
                    style={styles.icon}
                    name="ear-hearing"
                    size={26}
                    color="#7B7B8B"
                  />
                  <Picker
                    style={[
                      styles.textInput,
                      {color: value === '' ? '#7B7B8B' : '#fff'},
                    ]}
                    selectedValue={value}
                    onBlur={onBlur}
                    onValueChange={(itemValue, itemIndex) =>
                      onChange(itemValue)
                    }>
                    <Picker.Item
                      // style={{color:'red'}}
                      // color = "red"
                      label="Where did you hear about us..."
                      value=""
                    />
                    <Picker.Item label="Social Media" value={1} />
                    <Picker.Item label="Magazine" value={2} />
                    <Picker.Item label="SRK Website" value={3} />
                    <Picker.Item label="Friend" value={4} />
                    <Picker.Item label="Internet Search" value={5} />
                  </Picker>
                </View>
              )}
              name="hear_about_us"
              rules={{
                required: {
                  value: true,
                  message: 'Select one from where you heard about us.',
                },
              }}
              defaultValue=""
            />
            {errors2.hear_about_us && (
              <View style={styles.errorView}>
                <Text style={styles.errorText}>
                  {errors2.hear_about_us.message}
                </Text>
              </View>
            )}

            <View style={styles.submitContainer}>
              {/* <TouchableOpacity
                style={styles.signupButton}
                onPress={() => setPersonalInfo(true)}>
                <View style={styles.signupButtonView}>
                  <Text style={styles.signupButtonText}>Previous</Text>
                </View>
              </TouchableOpacity> */}
              {signUpLoading ? (
                <TouchableOpacity style={styles.signupButton}>
                  <View style={[styles.signupButtonView, {opacity: 0.7}]}>
                    <ActivityIndicator size="large" color="#fff" />
                    {/* <Text style={styles.loginButtonText}>Loading...</Text> */}
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.signupButton}
                  onPress={handleSubmit2(onSubmit2)}>
                  <View style={styles.signupButtonView}>
                    <Text style={styles.signupButtonText}>Register</Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
        <View style={styles.orView}>
          <CustomText style={styles.orText}>Don't have an account? </CustomText>
          <TouchableOpacity
            style={styles.orText}
            onPress={() => navigation.navigate('LoginScreen')}>
            <CustomText style={styles.clickText}>Log In</CustomText>
          </TouchableOpacity>
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
  signupContainer: {
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
  signupInputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
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
    fontSize: 24,
  },
  titleContainer: {
    marginTop: 20,
  },
  titleText: {
    // fontWeight: 'bold',
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
  },
  signupText: {
    fontSize: 14,
    color: '#7477A0',
  },
  userContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1D192C',
    // margin: 10,
    marginTop: 10,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  emailContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1D192C',
    marginTop: 10,
    marginHorizontal: 20,
    // marginTop: 0,
    borderRadius: 10,
  },
  errorView: {
    flexDirection: 'row',
    marginTop: 5,
    // marginBottom: 10,
    marginHorizontal: 20,
  },
  errorText: {
    flex: 1,
    paddingRight: 10,
    paddingLeft: 10,
    fontSize: 14,
    color: '#fc441d',
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
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  rememberText: {
    // marginTop: 4,
    fontSize: 14,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    color: '#7477A0',
  },
  forgotText: {
    flex: 1,
    marginTop: 4,
    textAlign: 'right',
    fontSize: 14,
    color: '#7477A0',
  },
  signupButton: {
    flex: 1,
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
