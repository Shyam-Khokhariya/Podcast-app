import React from 'react';
import {View, ScrollView} from 'react-native';
import {Stat} from './Stat';
import {styles} from './styles';

export const Carousel = (props) => {
  const {items, style} = props;
  const itemsPerInterval =
    props.itemsPerInterval === undefined ? 1 : props.itemsPerInterval;

  const [intervals, setIntervals] = React.useState(1);
  const [width, setWidth] = React.useState(0);

  const init = (width) => {
    // initialise width
    setWidth(width);
    // initialise total intervals
    const totalItems = items.length;
    setIntervals(Math.ceil(totalItems / itemsPerInterval));
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        contentContainerStyle={{
          ...styles.scrollView,
          width: `${100 * intervals}%`,
        }}
        showsHorizontalScrollIndicator={false}
        onContentSizeChange={(w, h) => init(w)}
        scrollEventThrottle={200}
        pagingEnabled
        decelerationRate="fast">
        {items.map((item, index) => {
          switch (style) {
            case 'stats':
              return (
                <Stat
                  key={index}
                  index={index}
                  label={item.label}
                  value={item.value}
                />
              );

            default:
              return (
                <Stat
                  key={index}
                  index={index}
                  label={item.label}
                  value={item.value}
                />
              );
          }
        })}
      </ScrollView>
    </View>
  );
};

export default Carousel;
