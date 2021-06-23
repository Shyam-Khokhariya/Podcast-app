// import React, {useState} from 'react';
// import {
//   Dimensions,
//   Image,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import AlbumArt from './AlbumArt';
// import Controls from './Controls';
// import PlayerHeader from './PlayerHeader';
// import SeekBar from './SeekBar';
// import TrackDetails from './TrackDetails';

// export default function PlayerScreen({route,navigation}) {

//   const {uri,title,artist} = route.params;

//   return (

//     <View style={styles.container}>
//         <PlayerHeader message="Playing from Charts" />
//         <AlbumArt url={uri} />
//          <TrackDetails title={title} artist={artist} />
//         <SeekBar trackLength={204} currentPosition={156} />
//         <Controls />
//       </View>
//     );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // alignItems: 'center',
//     // justifyContent: 'center',
//     backgroundColor: '#13131A',
//   },
// });

import React, {Component, useEffect} from 'react';
import Player from './Player';

const TRACKS =  [
  {
    albumArtUrl: require('../assets/images/image_1.png'),
    title: 'ATTENTION',
    artist: 'Charlie Puth',
    audioUrl:  'http://russprince.com/hobbies/files/13%20Beethoven%20-%20Fur%20Elise.mp3',
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

export default function PlayerScreen({route, navigation}) {
  let tracks = TRACKS, index = 0;
  
  if (route && route.params) {
    
    tracks = route.params.tracks;
    index = route.params.index;
  }
 
  return (
    <Player tracks={tracks} selectedIndex={index} navigation={navigation} />
  );
}
