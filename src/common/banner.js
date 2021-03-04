import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, FlatList, ImageBackground} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import styled from 'styled-components/native';
import {Block} from '../components';
import {config} from '../utils/config';
const {width} = Dimensions.get('window');

const Banner = ({data}) => {
  const [indexValue, setIndex] = useState(0);
  const [slider, setSlider] = useState(0);
  const flatListref = useRef();
  const onScrollEnd = (e) => {
    const {contentOffset} = e.nativeEvent;
    const viewSize = e.nativeEvent.layoutMeasurement;
    const pageNum = Math.floor(contentOffset.x / viewSize.width);
    setIndex(pageNum);

    // setSlider(pageNum);
  };

  // const scrollToIndex = (index, animated) => {
  //   flatListref.current?.scrollToIndex({index, animated});
  // };

  // useEffect(() => {
  //   setInterval(() => {
  //     const maxSlider = 2;
  //     let nextIndex = 0;

  //     if (slider < maxSlider) {
  //       nextIndex = slider + 1;
  //     }

  //     scrollToIndex(nextIndex, true);
  //     setSlider(nextIndex);
  //   }, 3000);
  // }, []);

  // console.log(slider);

  return (
    <Block
      center
      border={[20, 20, 20, 20]}
      flex={false}
      margin={[hp(2), 0, hp(2), 0]}
      color="transparent">
      <FlatList
        data={data}
        horizontal
        pagingEnabled
        decelerationRate="fast"
        bounces={false}
        ref={flatListref}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScrollEnd}
        renderItem={({item}) => {
          return (
            <BackgroundImage
              source={{uri: `${config.banner_image_url}${item.image}`}}>
              <FlatList
                data={data}
                horizontal
                pagingEnabled
                style={flatlistStyle}
                renderItem={({index}) => {
                  return (
                    <Block
                      border={10}
                      flex={false}
                      style={indexValue === index ? activeStyle : inactiveStyle}
                    />
                  );
                }}
              />
            </BackgroundImage>
          );
        }}
      />
    </Block>
  );
};

const BackgroundImage = styled(ImageBackground)({
  height: hp(20),
  width: wp(100),
  justifyContent: 'flex-end',
  alignItems: 'flex-end',
});
const flatlistStyle = {
  alignSelf: 'center',
  marginBottom: hp(1),
  flexDirection: 'row',
};
const activeStyle = {
  height: 7,
  width: wp(3),
  backgroundColor: '#78A942',
  marginHorizontal: wp(0.5),
};
const inactiveStyle = {
  height: 7,
  width: 10,
  alignSelf: 'center',
  backgroundColor: '#748560',
  marginHorizontal: wp(0.5),
};
export default Banner;
