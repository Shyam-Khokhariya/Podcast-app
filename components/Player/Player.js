import React, {Component, useEffect, useRef, useState} from 'react';
import {View, Text, StatusBar} from 'react-native';
import AlbumArt from './AlbumArt';
import TrackDetails from './TrackDetails';
import SeekBar from './SeekBar';
import Controls from './Controls';
import Video from 'react-native-video';
import PlayerHeader from './PlayerHeader';

export default function Player(props) {
  const [paused, setpaused] = useState(true);
  const [totalLength, settotalLength] = useState(1);
  const [currentPosition, setcurrentPosition] = useState(0);
  const [selectedTrack, setselectedTrack] = useState(props.selectedIndex);
  const [repeatOn, setrepeatOn] = useState(false);
  const [shuffleOn, setshuffleOn] = useState(false);
  const [isChanging, setisChanging] = useState();

  const audioElement = useRef(null);

  useEffect(() => {
    setselectedTrack(props.selectedIndex);
  }, [props.selectedIndex]);

  const setDuration = (data) => {
    console.log("duration",data);
    settotalLength(Math.floor(data.duration));
  };

  const setTime = (data) => {
    //console.log(data);
    setcurrentPosition(Math.floor(data.currentTime));
  };

  const seek = (time) => {
    time = Math.round(time);
    audioElement && audioElement.current.seek(time);
    setcurrentPosition(time);
    setpaused(false);
  };

  const onBack = () => {
    if (currentPosition < 10 && selectedTrack > 0) {
      audioElement && audioElement.current.seek(0);
      setisChanging(true);
      setTimeout(() => {
        setcurrentPosition(0);
        setpaused(false);
        settotalLength(1);
        setisChanging(false);
        setselectedTrack(selectedTrack - 1);
      }, 0);
    } else {
      audioElement.current.seek(0);
      setcurrentPosition(0);
    }
  };

  const onForward = () => {
    if (selectedTrack < props.tracks.length - 1) {
      audioElement && audioElement.current.seek(0);
      setisChanging(true);
      setTimeout(() => {
        setcurrentPosition(0);
        settotalLength(1);
        setpaused(false);
        setisChanging(false);
        setselectedTrack(selectedTrack + 1);
      }, 0);
    }
  };

  const onDownPress = () => {
    props.navigation.goBack();
  };

  const track = props.tracks[selectedTrack];
  const video = isChanging ? null : (
    <Video
      source={{uri:track.audioUrl}} // Can be a URL or a local file.
      ref={audioElement}
      paused={paused} // Pauses playback entirely.
      resizeMode="cover" // Fill the whole screen at aspect ratio.
      repeat={true} // Repeat forever.
      onLoad={setDuration} // Callback when video loads
      onProgress={setTime} // Callback every ~250ms with currentTime
      style={styles.audioElement}
      ignoreSilentSwitch={'ignore'}
      playWhenInactive={true}
      playInBackground={true}
    />
  );
  return (
    <View style={styles.container}>
      <View style={{flex: 6}}>
        <StatusBar hidden={true} />
        <PlayerHeader message="Playing From Charts" onDownPress={onDownPress} />
        <AlbumArt url={track.albumArtUrl} />
      </View>
      <View style={{flex: 4, backgroundColor: '#0B0B15'}}>
        <TrackDetails title={track.title} artist={track.artist} />
        <SeekBar
          onSeek={seek}
          trackLength={totalLength}
          onSlidingStart={() => setpaused(true)}
          currentPosition={currentPosition}
        />
        <Controls
          onPressRepeat={() => setrepeatOn(!repeatOn)}
          repeatOn={repeatOn}
          shuffleOn={shuffleOn}
          forwardDisabled={selectedTrack === props.tracks.length - 1}
          onPressShuffle={() => setshuffleOn(!shuffleOn)}
          onPressPlay={() => setpaused(false)}
          onPressPause={() => setpaused(true)}
          onBack={onBack}
          onForward={onForward}
          paused={paused}
        />
      </View>
      {video}
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#13131A',
  },
  audioElement: {
    height: 0,
    width: 0,
  },
};
