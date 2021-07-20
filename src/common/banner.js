/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Block} from '../components';
import {config} from '../utils/config';
import {SliderBox} from 'react-native-image-slider-box';
import {light} from '../components/theme/colors';

const Banner = ({data}) => {
  const [slider, setSlider] = useState([]);
  useEffect(() => {
    var i;
    var imgArray = [];
    for (i = 0; i < data.length; i++) {
      imgArray.push(config.banner_image_url + data[i].image);
    }
    setSlider(imgArray);
  }, []);

  return (
    <Block
      center
      border={[20, 20, 20, 20]}
      flex={false}
      margin={[hp(2), 0, hp(2), 0]}
      color="transparent">
      <SliderBox
        images={slider}
        sliderBoxHeight={200}
        loop={true}
        autoplay={true}
        resizeMethod={'resize'}
        resizeMode={'cover'}
        dotColor="#ffffff"
        inactiveDotColor="#90A4AE"
        imageLoadingColor={light.secondary}
      />
    </Block>
  );
};
export default Banner;
