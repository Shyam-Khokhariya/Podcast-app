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
import {FlatList} from 'react-native-gesture-handler';

export default function HomeScreen({navigation}) {
  const images = [
    // require('../assets/images/slider_image.png'),
    require('../assets/images/image_1.png'),
    require('../assets/images/image_2.png'),
    require('../assets/images/image_3.png'),
  ];

  const sliderList = [
    {
      albumArtUrl: require('../assets/images/image_1.png'),
      title: 'ATTENTION',
      artist: 'Charlie Puth',
      audioUrl:
        'http://russprince.com/hobbies/files/13%20Beethoven%20-%20Fur%20Elise.mp3',
      _id: 1,
    },
    {
      albumArtUrl: require('../assets/images/image_2.png'),
      title: 'FAMOUS CRYP',
      artist: 'Blueface',
      audioUrl:
        'http://russprince.com/hobbies/files/13%20Beethoven%20-%20Fur%20Elise.mp3',
      _id: 2,
    },
    {
      albumArtUrl: require('../assets/images/image_3.png'),
      title: 'BORN TO DIE',
      artist: 'Lana Del Rey',
      audioUrl:
        'http://russprince.com/hobbies/files/13%20Beethoven%20-%20Fur%20Elise.mp3',
      _id: 3,
    },
  ];

  const musicList = [
    {
      albumArtUrl: require('../assets/images/musicList_1.png'),
      title: 'THE JORDAN HAR',
      artist: 'Celeste Headlee',
      audioUrl:
        'http://russprince.com/hobbies/files/13%20Beethoven%20-%20Fur%20Elise.mp3',
      _id: 1,
    },
    {
      albumArtUrl: require('../assets/images/musicList_2.png'),
      title: 'FROM NEGATIVE TO POSITIVE',
      artist: 'The King of Miami',
      audioUrl:
        'http://russprince.com/hobbies/files/13%20Beethoven%20-%20Fur%20Elise.mp3',
      _id: 2,
    },
    {
      albumArtUrl: require('../assets/images/musicList_3.png'),
      title: 'I SURVIVED',
      artist: 'Cold Case Files',
      audioUrl:
        'http://russprince.com/hobbies/files/13%20Beethoven%20-%20Fur%20Elise.mp3',
      _id: 3,
    },
  ];

  const songList = [
    {
      albumArtUrl: require('../assets/images/Card_small_1.png'),
      title: "Expeditiously with tip 'T.I.' Harris",
      artist: 'Greenwood Online Banking For Us By Us',
      audioUrl:
        'http://russprince.com/hobbies/files/13%20Beethoven%20-%20Fur%20Elise.mp3',
      _id: 1,
    },
    {
      albumArtUrl: require('../assets/images/Card_small_2.png'),
      title: "Superman's not coming witn Erin Brockovich",
      artist: 'Lunchbreak with Yasmi...',
      audioUrl:
        'http://russprince.com/hobbies/files/13%20Beethoven%20-%20Fur%20Elise.mp3',
      _id: 2,
    },
    {
      albumArtUrl: require('../assets/images/Card_small_3.png'),
      title: "That's awesome with Steve Burton & Bradfor...",
      artist: 'Talking GH and Days With BRANDON BAR...',
      audioUrl:
        'http://russprince.com/hobbies/files/13%20Beethoven%20-%20Fur%20Elise.mp3',

      _id: 3,
    },
  ];

  return (
    <View style={styles.loginContainer}>
      <ScrollView style={{flex: 1}}>
        <StatusBar barStyle="light-content" backgroundColor="#2D2C3C" />
        <View style={styles.imageContainer}>
          <SliderBox
            images={images}
            sliderBoxHeight={250}
            onCurrentImagePressed={(index) =>
              navigation.navigate('PlayerScreen', {tracks: sliderList, index})
            }
            dotColor="#FFEE58"
            inactiveDotColor="#90A4AE"
            paginationBoxVerticalPadding={20}
            autoplay
            circleLoop
            paginationBoxStyle={{
              // position: 'absolute',
              flexDirection: 'column',
              left: 0,
              top: 0,
              alignItems: 'center',
              alignSelf: 'center',
              justifyContent: 'center',
              // backgroundColor:'blue'
            }}
            dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              // marginHorizontal: 0,
              margin: 10,
              // padding:20,
              // backgroundColor: 'red',
            }}
          />
        </View>
        <View style={styles.welcomeContainer}>
          <FlatList
            horizontal
            data={musicList}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  style={styles.musicItem}
                  onPress={() =>
                    navigation.navigate('PlayerScreen', {
                      tracks: musicList,
                      index,
                    })
                  }>
                  <Image
                    source={item.albumArtUrl}
                    style={styles.itemPhoto}
                    resizeMode="cover"
                  />
                  <View style={{flexDirection: 'row'}}>
                    <CustomText style={styles.welcome}>{item.title}</CustomText>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <CustomText style={styles.loginText}>
                      {item.artist}
                    </CustomText>
                  </View>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item) => item._id}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View style={styles.broadContainer}>
          <View style={{flexDirection: 'row'}}>
            <CustomText style={styles.broadText}>Similar Broadcast</CustomText>
          </View>
          <View style={styles.songList}>
            <FlatList
              data={songList}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    style={styles.songItem}
                    onPress={() =>
                      navigation.navigate('PlayerScreen', {
                        tracks: songList,
                        index,
                      })
                    }>
                    <Image
                      source={item.albumArtUrl}
                      style={styles.songPhoto}
                      resizeMode="cover"
                    />
                    <View style={styles.songDetail}>
                      <View style={{flexDirection: 'row'}}>
                        <CustomText style={styles.songText}>
                          {item.title}
                        </CustomText>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <CustomText style={styles.songSubText}>
                          {item.artist}
                        </CustomText>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item) => item._id}
              showsHorizontalScrollIndicator={false}
            />
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
  },

  logoImage: {
    height: 250,
    width: Dimensions.get('window').width,
    resizeMode: 'cover',
  },
  welcomeContainer: {
    flex: 1,
    marginTop: -60,
    height: 210,
  },
  broadContainer: {
    marginTop: 40,
  },
  musicItem: {
    flex: 1,
    height: 200,
    width: 150,
    marginRight: 20,
  },
  songItem: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 5,
    backgroundColor: '#0B0B15',
    borderRadius: 20,
    flexDirection: 'row',
  },
  songPhoto: {
    margin: 15,
    height: 60,
    width: 60,
  },
  songDetail: {
    marginVertical: 15,
    width: '80%',
    justifyContent: 'center',
    // height: 60,
    // width: 60,
  },
  songText: {
    // fontWeight: 'bold',
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    // paddingLeft: 30,
  },
  songSubText: {
    fontSize: 12,
    color: '#7477A0',
  },
  welcome: {
    // fontWeight: 'bold',
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    marginTop: -20,
    paddingLeft: 30,
  },
  broadText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
    marginTop: -20,
    paddingLeft: 30,
  },
  loginText: {
    fontSize: 12,
    color: '#7477A0',
    paddingLeft: 30,
  },
});
