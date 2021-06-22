import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default class CustomText extends Component {
  static propTypes = {
    children:PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.string,
    ]).isRequired,
    // style: PropTypes.object
  };

  render() {
    const {style, children} = this.props;
    return <Text style={[styles.text, style]}>{children}</Text>;
  }
}

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    fontFamily:'Poppins-Light'
  },
});
