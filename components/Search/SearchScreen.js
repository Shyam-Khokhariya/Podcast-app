import React, { useState } from 'react';
import {StyleSheet} from 'react-native';
import {TextInput, View, Text, TouchableOpacity} from 'react-native';

export default function SearchScreen() {
  // updated 2019
  const [closes,setCloses] = useState(false)
  const [square,setSquare] = useState(false)

  const expand = () => {
    setCloses(!closes);
    setSquare(!square);
    // const input = document.getElementById('search-input');
    // const searchBtn = document.getElementById('search-btn');
    // searchBtn.classList.toggle('close');
    // input.classList.toggle('square');
  };

  return (
    <View style={styles.body}>
      <View id="content" style={styles.content}>
        <TextInput
          style={[styles.input, closes ? styles.closes : {}]}
          type="text"
          name="input"
          class="input"
          id="search-input"
        />
        <TouchableOpacity
          style={[styles.search, square ? styles.square : {}]}
          type="reset"
          class="search"
          onPress={expand}
          id="search-btn"></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex:1,
    justifyContent:'center',
    alignItems:"center",
    backgroundColor: '#ff9800',
    color: '#fff',
    margin: 0,
  },
  content: {
    // position: "absolute",
    height: 50,
    width: 300,
    // marginLeft: 170,
    // top: '50%',
    // left: '50%',
    // transform: translate('-50%', '-50%'),
  },

  // content.on {
  //   -webkit-animation-name: in-out,
  //   animation-name: in-out,
  //   -webkit-animation-duration: 0.7s,
  //   animation-duration: 0.7s,
  //   -webkit-animation-timing-function: linear,
  //   animation-timing-function: linear,
  //   -webkit-animation-iteration-count: 1,
  //   animation-iteration-count: 1,
  // },

  input: {
    // boxSizing: borderBox,
    width: 50,
    height: 50,
    borderWidth: 4,
    borderColor: '#fff',

    borderRadius: 2,
    backgroundColor: "transparent",
    color: '#fff',
    fontSize: 16,
    fontWeight: "400",
    // outline: 0,
    // -webkit-transition: width 0.4s ease-in-out, border-radius 0.8s ease-in-out,
    //   padding 0.2s,
    // transition: width 0.4s ease-in-out, border-radius 0.8s ease-in-out,
    //   padding 0.2s,
    // -webkit-transition-delay: 0.4s,
    // transition-delay: 0.4s,
    // -webkit-transform: translate(-100%, -50%),
    // -ms-transform: translate(-100%, -50%),
    // transform: translate('-100%', '-50%'),
  },

  search: {
    backgroundColor: "transparent",
    position: "absolute",
    top: 0,
    left: 0,
    height: 50,
    width: 50,
    padding: 0,
    borderRadius: 2,
    // outline: 0,
    // border: 0,
    // color: inherit,
    // cursor: pointer,
    // -webkit-transition: 0.2s ease-in-out,
    // transition: 0.2s ease-in-out,
    // -webkit-transform: translate(-100%, -50%),
    // -ms-transform: translate(-100%, -50%),
    // transform: translate('-100%', '-50%'),
  },

  // search:before {
  //   content: "",
  //   position: absolute,
  //   width: 20,
  //   height: 4,
  //   background-color: #fff,
  //   -webkit-transform: rotate(45deg),
  //   -ms-transform: rotate(45deg),
  //   transform: rotate(45deg),
  //   margin-top: 26,
  //   margin-left: 17,
  //   -webkit-transition: 0.2s ease-in-out,
  //   transition: 0.2s ease-in-out,
  // },

  close: {
    // -webkit-transition: 0.4s ease-in-out,
    // transition: 0.4s ease-in-out,
    // -webkit-transition-delay: 0.4s,
    // transition-delay: 0.4s,
  },

  // .close:before {
  //   content: "",
  //   position: absolute,
  //   width: 27,
  //   height: 4,
  //   margin-top: -1,
  //   margin-left: -13,
  //   background-color: #fff,
  //   -webkit-transform: rotate(45deg),
  //   -ms-transform: rotate(45deg),
  //   transform: rotate(45deg),
  //   -webkit-transition: 0.2s ease-in-out,
  //   transition: 0.2s ease-in-out,
  // },

  // .close:after {
  //   content: "",
  //   position: absolute,
  //   width: 27,
  //   height: 4,
  //   background-color: #fff,
  //   margin-top: -1,
  //   margin-left: -13,
  //   cursor: pointer,
  //   -webkit-transform: rotate(-45deg),
  //   -ms-transform: rotate(-45deg),
  //   transform: rotate(-45deg),
  // },

  square: {
    // boxSizing: borderBox,
    padding: 0,
    width: 300,
    height: 50,
    borderWidth: 4,
    borderColor: '#fff',
    borderRadius: 0,
    backgroundColor: "transparent",
    color: '#fff',
    fontSize: 16,
    fontWeight: "400",
    // outline: 0,
    // -webkit-transition: width 0.4s ease-in-out, border-radius 0.4s ease-in-out,
    // padding 0.2s,
    // transition: width 0.4s ease-in-out, border-radius 0.4s ease-in-out,
    // padding 0.2s,
    // -webkit-transition-delay: 0.4s, 0s, 0.4s,
    // transition-delay: 0.4s, 0s, 0.4s,
    // -webkit-transform: translate(-100%, -50%),
    // -ms-transform: translate(-100%, -50%),
    // transform: translate('-100%', '-50%'),
  },
});
