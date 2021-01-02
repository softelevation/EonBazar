/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Block, ImageComponent} from '../../components';
import {getCurrencyDetailsRequest} from '../../redux/action';

const Splash = () => {
  const dispatch = useDispatch();
  const nav = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      nav.navigate('Home');
    }, 2000);
  }, []);

  useEffect(() => {
    dispatch(getCurrencyDetailsRequest());
  }, []);
  return (
    <Block secondary center middle>
      {/* <Block flex={false} borderWidth={3} borderRadius={5} alignSelf="center"> */}
      <ImageComponent name="logo" height={100} width={150} />
      {/* </Block> */}
    </Block>
  );
};
export default Splash;
