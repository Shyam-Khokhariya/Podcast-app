import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

export default PlayerHeader = ({
  message,
  onDownPress,
  onQueuePress,
  onMessagePress,
}) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onDownPress}>
      <Image style={styles.button}
        source={require('../assets/images/ic_keyboard_arrow_down_white.png')} />
    </TouchableOpacity>
    <Text onPress={onMessagePress}
      style={styles.message}>{message.toUpperCase()}</Text>
    <TouchableOpacity onPress={onQueuePress}>
      <Image style={styles.button}
        source={require('../assets/images/ic_queue_music_white.png')} />
    </TouchableOpacity>
  </View>
);


const styles = StyleSheet.create({
  container: {
    // height: 72,
    // flex:1,
    paddingTop: 20,
    paddingLeft: 12,
    paddingRight: 12,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'center'
  },
  message: {
    flex: 1,
    textAlign: 'center',
    alignItems:'center',
    color: 'rgba(255, 255, 255, 0.72)',
    fontWeight: 'bold',
    fontSize: 16,
  },
  button: {
    opacity: 0.72
  }
});